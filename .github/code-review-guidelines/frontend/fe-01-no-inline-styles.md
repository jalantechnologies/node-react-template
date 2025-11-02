# FE-01: No Inline Styles

**Severity**: CRITICAL

## Principle

Avoid inline styling in React components. Use styled-components or CSS modules instead. Inline styles should only be used in exceptional cases where dynamic positioning or runtime-calculated values are absolutely necessary.

## Why This Matters

1. **Reusability**: Inline styles are locked to a single element and cannot be shared across components
2. **Consistency**: Theme values, spacing, and design tokens cannot be enforced with inline styles
3. **Performance**: Inline styles create new object references on every render, causing unnecessary re-renders
4. **Maintainability**: Scattered style definitions make it impossible to find and update styles systematically
5. **Design System Compliance**: Inline styles bypass the design system, leading to visual inconsistencies
6. **Developer Experience**: No autocomplete, no type safety, no intellisense for theme values
7. **Runtime Overhead**: Inline styles bypass CSS optimization and browser caching

## Bad Examples

### ❌ Inline styles with magic numbers

```tsx
// pages/dashboard/index.tsx
export const Dashboard = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Dashboard
      </h1>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
          }}
        >
          Primary Action
        </button>
      </div>
    </div>
  );
};
```

**Problems**:
- Magic numbers (`20px`, `24px`, `16px`) that don't reference theme
- Hardcoded colors (`#f0f0f0`, `#007bff`) that don't support dark mode
- No reusability - every component duplicates these styles
- No type safety - typos like `backgroudColor` fail silently
- Performance overhead - new style objects on every render

### ❌ Conditional inline styles

```tsx
// components/card/index.tsx
interface CardProps {
  variant?: 'default' | 'elevated';
  children: React.ReactNode;
}

export const Card = ({ variant = 'default', children }: CardProps) => {
  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: variant === 'elevated' ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      {children}
    </div>
  );
};
```

**Problems**:
- Conditional logic mixed with styling
- Hardcoded shadow values
- No access to theme spacing or colors
- Impossible to override or extend

### ❌ Dynamic inline styles that could use CSS variables

```tsx
// components/progress-bar/index.tsx
interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0' }}>
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: '#4caf50',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
};
```

**Problems**:
- Could use CSS custom properties for dynamic values
- Hardcoded colors and dimensions
- No theme integration

## Good Examples

### ✅ Using styled-components with theme

```tsx
// components/card/index.tsx
import styled from 'styled-components';

interface CardProps {
  variant?: 'default' | 'elevated';
  children: React.ReactNode;
}

const StyledCard = styled.div<{ $variant: 'default' | 'elevated' }>`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ $variant, theme }) =>
    $variant === 'elevated' ? theme.shadows.md : 'none'};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Card = ({ variant = 'default', children }: CardProps) => {
  return <StyledCard $variant={variant}>{children}</StyledCard>;
};
```

**Benefits**:
- All values come from theme (spacing, colors, shadows)
- Fully reusable and consistent
- Supports responsive design
- Type-safe theme access
- Can be extended or overridden using styled-components patterns

### ✅ Using styled-components for layout composition

```tsx
// pages/dashboard/index.tsx
import styled from 'styled-components';
import { Card } from '@/components/card';
import { Button } from '@/components/button';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.default};
  min-height: 100vh;
`;

const DashboardHeader = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.h1};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ActionRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardHeader>Dashboard</DashboardHeader>
      <ActionRow>
        <Button variant="primary">Primary Action</Button>
        <Button variant="secondary">Secondary Action</Button>
      </ActionRow>
      <Card variant="elevated">
        {/* Dashboard content */}
      </Card>
    </DashboardContainer>
  );
};
```

**Benefits**:
- Semantic component names (`DashboardContainer`, `DashboardHeader`)
- All spacing and colors from theme
- Easy to understand layout structure
- Fully testable and maintainable

### ✅ Dynamic values with CSS custom properties

```tsx
// components/progress-bar/index.tsx
import styled from 'styled-components';

interface ProgressBarProps {
  percentage: number;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percentage: number; $color: string }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  background-color: ${({ $color }) => $color};
  transition: width 0.3s ease;
  border-radius: inherit;
`;

const colorMap = {
  primary: (theme: any) => theme.colors.primary.main,
  success: (theme: any) => theme.colors.success.main,
  warning: (theme: any) => theme.colors.warning.main,
  danger: (theme: any) => theme.colors.danger.main,
};

export const ProgressBar = ({ percentage, color = 'primary' }: ProgressBarProps) => {
  const theme = useTheme();
  const fillColor = colorMap[color](theme);

  return (
    <ProgressContainer>
      <ProgressFill $percentage={percentage} $color={fillColor} />
    </ProgressContainer>
  );
};
```

**Benefits**:
- Dynamic `percentage` prop properly handled
- Color variants mapped to theme
- Clean separation of structure and styling
- Fully reusable across the app

### ✅ Acceptable inline style usage (exceptional case)

```tsx
// components/draggable-item/index.tsx
import styled from 'styled-components';

interface DraggableItemProps {
  position: { x: number; y: number };
  children: React.ReactNode;
}

const ItemContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: move;
`;

export const DraggableItem = ({ position, children }: DraggableItemProps) => {
  // Acceptable: Runtime-calculated positioning that can't be predetermined
  return (
    <ItemContainer
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </ItemContainer>
  );
};
```

**Why this is acceptable**:
- `position` is runtime-calculated based on user interaction (drag)
- Cannot be predetermined or defined in theme
- All other styles still use styled-components
- Minimal inline style usage for truly dynamic values

## Migration Path

If you find inline styles in existing code:

1. **Audit the inline styles**: Identify all properties being set
2. **Map to theme values**: Find equivalent theme tokens (spacing, colors, typography)
3. **Create styled-component**: Extract to a styled-component with theme references
4. **Handle dynamic values**: Use props for conditional styling
5. **Test thoroughly**: Ensure visual parity before and after

### Migration Example

**Before**:
```tsx
<div style={{ padding: '16px', backgroundColor: '#ffffff', marginBottom: '20px' }}>
  Content
</div>
```

**After**:
```tsx
const ContentBox = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

<ContentBox>Content</ContentBox>
```

## Review Checklist

When reviewing code, check for:

- [ ] No `style={{}}` props on JSX elements (except exceptional cases)
- [ ] All styling uses styled-components or CSS modules
- [ ] All spacing values reference `theme.spacing.*`
- [ ] All colors reference `theme.colors.*`
- [ ] All typography values reference `theme.typography.*`
- [ ] Dynamic styling uses props, not inline conditionals
- [ ] Exceptional inline styles (drag-and-drop, animations) are documented with comments

## Exceptions

Inline styles are acceptable **only** when:

1. **Runtime positioning**: Drag-and-drop, animations, canvas positioning
2. **Third-party integration**: Library requires inline styles (document why)
3. **Server-side rendering**: SSR-critical styles (rare, document thoroughly)

In all cases, add a comment explaining why inline styles are necessary:

```tsx
// Inline style required: position is calculated at runtime based on drag state
<div style={{ transform: `translate(${x}px, ${y}px)` }}>
```

## Related Guidelines

- **FE-02**: No Style Overrides - Avoid overriding component styles per page
- **FE-03**: Reusable Components - Build with composable, styled primitives
- Backend Architecture: `/docs/frontend-architecture.md` (Components section)

## References

- Frontend Architecture: `/Users/jjalan/Developer/jalantechnologies/node-react-template/docs/frontend-architecture.md`
- Component examples: `/frontend/components/`
- Theme definition: Check your project's theme configuration
- styled-components docs: https://styled-components.com/docs/basics

## Common Questions

**Q: What about vendor libraries that require inline styles?**
A: Document the requirement with a comment. Wrap the vendor component in a styled-component to minimize inline style usage.

**Q: Can I use inline styles for one-off prototypes?**
A: No. Even prototypes should follow the architecture. It's harder to refactor later.

**Q: What about `style` prop for third-party component libraries?**
A: Many libraries accept `className` - use styled-components and pass `className`. If only `style` works, wrap the component.

**Q: How do I handle truly dynamic values like animation offsets?**
A: Use CSS custom properties (variables) or the acceptable inline style pattern with documentation.

---

**Last Updated**: 2025-11-02
**Severity**: CRITICAL
**Auto-reject**: Yes - Code with inline styles should be rejected in PR review
