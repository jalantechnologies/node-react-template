# FE-02: No Style Overrides

**Severity**: CRITICAL

## Principle

Avoid overriding component styles on a per-page or per-usage basis. If you find yourself frequently overriding a component's styles, it indicates one of two problems:

1. **Design system inconsistency**: The component doesn't match the design
2. **Poor component design**: The component lacks necessary variants or flexibility

The solution is to **fix the root cause**, not to scatter overrides throughout the codebase.

## Why This Matters

1. **Maintainability**: Style overrides create hidden dependencies between pages and components
2. **Consistency**: Overrides fragment the design system, making the UI inconsistent
3. **Debugging Difficulty**: When styles break, you must check every override location
4. **Cognitive Load**: Developers must remember which pages have which overrides
5. **Technical Debt**: Each override makes future refactoring harder
6. **Testing Complexity**: Component tests don't cover override scenarios
7. **Design Drift**: Overrides allow the UI to diverge from the design system

## Bad Examples

### ❌ Per-page button overrides

```tsx
// pages/dashboard/index.tsx
import styled from 'styled-components';
import { Button } from '@/components/button';

// Bad: Overriding button styles for this page
const DashboardButton = styled(Button)`
  background-color: #ff6b6b;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 8px;
`;

export const Dashboard = () => {
  return (
    <div>
      <DashboardButton>Custom Styled Button</DashboardButton>
    </div>
  );
};
```

**Problems**:
- Button component doesn't support this style natively
- Other pages will duplicate this override if they need the same style
- Creates inconsistency - some pages have red buttons, others don't
- Impossible to maintain when design changes

### ❌ className override pattern

```tsx
// pages/settings/index.tsx
import { Card } from '@/components/card';
import './settings.css';

export const Settings = () => {
  return (
    <div>
      {/* Bad: Using className to override Card styles */}
      <Card className="settings-card">
        Settings content
      </Card>
    </div>
  );
};

// settings.css
.settings-card {
  padding: 32px !important; /* Using !important to override */
  background-color: #fafafa !important;
  border: 2px solid #e0e0e0 !important;
}
```

**Problems**:
- `!important` indicates fighting with component styles
- `.settings-card` styles are scattered in separate file
- Other developers don't know these overrides exist
- Card component should support these variations natively

### ❌ Multiple pages with same override

```tsx
// pages/dashboard/index.tsx
const DashboardCard = styled(Card)`
  padding: 24px;
  border: 1px solid #e0e0e0;
`;

// pages/analytics/index.tsx
const AnalyticsCard = styled(Card)`
  padding: 24px;
  border: 1px solid #e0e0e0;
`;

// pages/reports/index.tsx
const ReportsCard = styled(Card)`
  padding: 24px;
  border: 1px solid #e0e0e0;
`;
```

**Problems**:
- Same override duplicated across three pages
- Indicates `Card` component should have this variant built-in
- When design changes, must update in three places
- Inconsistent - what if one page uses different values?

### ❌ Overriding component internals

```tsx
// pages/user-profile/index.tsx
import styled from 'styled-components';
import { Input } from '@/components/input';

// Bad: Reaching into component internals
const ProfileInput = styled(Input)`
  & input {
    font-size: 16px;
    padding: 14px;
  }

  & label {
    font-weight: 600;
    color: #333;
  }

  & .error-message {
    display: none; /* Hiding component functionality */
  }
`;
```

**Problems**:
- Depends on internal structure of `Input` component
- Breaks when `Input` component refactors
- Hides error messages, breaking component contract
- Should use Input props or variants instead

## Good Examples

### ✅ Component with proper variants

```tsx
// components/button/index.tsx
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<{
  $variant: ButtonProps['variant'];
  $size: ButtonProps['size'];
}>`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary.main};
          color: ${theme.colors.primary.contrast};
          &:hover {
            background-color: ${theme.colors.primary.dark};
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary.main};
          color: ${theme.colors.secondary.contrast};
          &:hover {
            background-color: ${theme.colors.secondary.dark};
          }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.danger.main};
          color: ${theme.colors.danger.contrast};
          &:hover {
            background-color: ${theme.colors.danger.dark};
          }
        `;
      case 'success':
        return `
          background-color: ${theme.colors.success.main};
          color: ${theme.colors.success.contrast};
          &:hover {
            background-color: ${theme.colors.success.dark};
          }
        `;
      default:
        return '';
    }
  }}

  /* Size styles */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'small':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.sizes.sm};
        `;
      case 'medium':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.sizes.base};
        `;
      case 'large':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.sizes.lg};
        `;
      default:
        return '';
    }
  }}
`;

export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton $variant={variant} $size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
```

**Benefits**:
- Supports 4 color variants and 3 sizes out of the box
- No need for overrides - use props instead
- Consistent across entire application
- Single source of truth for button styles

### ✅ Using button variants in pages

```tsx
// pages/dashboard/index.tsx
import { Button } from '@/components/button';

export const Dashboard = () => {
  return (
    <div>
      <Button variant="primary" size="large">
        Primary Action
      </Button>
      <Button variant="danger" size="medium">
        Delete
      </Button>
      <Button variant="secondary" size="small">
        Cancel
      </Button>
    </div>
  );
};

// pages/settings/index.tsx
import { Button } from '@/components/button';

export const Settings = () => {
  return (
    <div>
      <Button variant="success" size="medium">
        Save Settings
      </Button>
    </div>
  );
};
```

**Benefits**:
- No style overrides needed
- All pages use the same button component
- Consistent button styles everywhere
- Easy to update globally

### ✅ Card component with spacing variants

```tsx
// components/card/index.tsx
import styled from 'styled-components';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const StyledCard = styled.div<{
  $variant: CardProps['variant'];
  $padding: CardProps['padding'];
}>`
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'elevated':
        return `
          box-shadow: ${theme.shadows.md};
        `;
      case 'outlined':
        return `
          border: 1px solid ${theme.colors.border.light};
        `;
      case 'default':
      default:
        return `
          box-shadow: ${theme.shadows.sm};
        `;
    }
  }}

  /* Padding styles */
  ${({ $padding, theme }) => {
    switch ($padding) {
      case 'none':
        return 'padding: 0;';
      case 'small':
        return `padding: ${theme.spacing.sm};`;
      case 'medium':
        return `padding: ${theme.spacing.md};`;
      case 'large':
        return `padding: ${theme.spacing.lg};`;
      default:
        return `padding: ${theme.spacing.md};`;
    }
  }}
`;

export const Card = ({
  variant = 'default',
  padding = 'medium',
  children,
}: CardProps) => {
  return (
    <StyledCard $variant={variant} $padding={padding}>
      {children}
    </StyledCard>
  );
};
```

**Benefits**:
- Supports different visual treatments and spacing
- No need for per-page overrides
- Encapsulates all valid card variations

### ✅ Creating specialized components instead of overriding

```tsx
// components/stat-card/index.tsx
import styled from 'styled-components';
import { Card } from '@/components/card';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatCardContainer = styled(Card)`
  /* Specialized styling for stat cards */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 200px;
`;

const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatTrend = styled.span<{ $trend: 'up' | 'down' | 'neutral' }>`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ $trend, theme }) => {
    switch ($trend) {
      case 'up':
        return theme.colors.success.main;
      case 'down':
        return theme.colors.danger.main;
      case 'neutral':
      default:
        return theme.colors.text.secondary;
    }
  }};
`;

export const StatCard = ({ label, value, trend, trendValue }: StatCardProps) => {
  return (
    <StatCardContainer variant="outlined" padding="medium">
      <StatLabel>{label}</StatLabel>
      <StatValue>{value}</StatValue>
      {trend && trendValue && <StatTrend $trend={trend}>{trendValue}</StatTrend>}
    </StatCardContainer>
  );
};
```

**Benefits**:
- Builds on top of base `Card` component
- Creates reusable `StatCard` for specific use case
- No per-page overrides needed
- Can be used consistently across dashboard, analytics, reports

### ✅ Using StatCard in pages

```tsx
// pages/dashboard/index.tsx
import { StatCard } from '@/components/stat-card';

export const Dashboard = () => {
  return (
    <div>
      <StatCard
        label="Total Revenue"
        value="$45,231"
        trend="up"
        trendValue="+12.5%"
      />
      <StatCard
        label="Active Users"
        value="1,234"
        trend="down"
        trendValue="-3.2%"
      />
      <StatCard
        label="Conversion Rate"
        value="3.24%"
        trend="neutral"
        trendValue="0.0%"
      />
    </div>
  );
};
```

**Benefits**:
- No style overrides anywhere
- Dashboard uses specialized component
- Consistent stat display across all dashboards

## Decision Framework

When you're tempted to override a component's styles, ask:

### 1. Is this a one-time need or widespread?

- **One page needs it**: Consider if it's truly unique or if others will need it soon
- **Multiple pages need it**: Definitely add variant to component

### 2. Is the component poorly designed?

- **Component lacks variants**: Add proper variant props
- **Component is too rigid**: Refactor to accept composition or children

### 3. Is the design inconsistent?

- **Design has one-offs**: Work with design team to standardize
- **Component doesn't match design**: Update component to match design system

### 4. Should this be a new component?

- **Significantly different behavior**: Create new specialized component
- **Just styling differences**: Add variants to existing component

## Action Plan for Each Scenario

### Scenario A: Multiple pages override the same component

**Problem**: `Button` is being overridden with same styles in 5 pages

**Solution**: Add variant to Button component

```tsx
// Before: 5 pages with same override
const CustomButton = styled(Button)`
  background-color: #ff6b6b;
  padding: 12px 24px;
`;

// After: Add 'danger' variant to Button
<Button variant="danger" size="large">Delete</Button>
```

### Scenario B: Component needs more flexibility

**Problem**: `Card` padding is overridden because it's too tight

**Solution**: Add padding prop to Card component

```tsx
// Before: Override padding
const WideCard = styled(Card)`
  padding: 32px;
`;

// After: Add padding variants
<Card padding="large">Content</Card>
```

### Scenario C: Specialized use case

**Problem**: Dashboard needs stat cards, overriding Card everywhere

**Solution**: Create specialized StatCard component

```tsx
// Before: Every stat overrides Card
const StatCard = styled(Card)`
  /* custom stat styles */
`;

// After: Create proper StatCard component (see example above)
<StatCard label="Revenue" value="$45k" trend="up" />
```

### Scenario D: Design system inconsistency

**Problem**: Some pages need blue buttons, but design system only has purple

**Solution**: Work with design team, then add variant

1. Discuss with design team - is blue button needed?
2. If yes, add to design system
3. Add `variant="info"` to Button component
4. Update all pages to use new variant

## Migration Path

If you find style overrides in existing code:

1. **Document all overrides**: Search for `styled(ComponentName)` patterns
2. **Group by component**: Find which components are overridden most
3. **Analyze patterns**: What variants are needed?
4. **Update component**: Add proper variants with theme values
5. **Update call sites**: Replace overrides with variant props
6. **Remove overrides**: Delete the override code
7. **Test thoroughly**: Ensure visual parity

### Migration Example

**Before**:
```tsx
// pages/dashboard/index.tsx
const DashboardButton = styled(Button)`
  background-color: #ff6b6b;
`;

// pages/settings/index.tsx
const SettingsButton = styled(Button)`
  background-color: #ff6b6b;
`;
```

**After**:
```tsx
// components/button/index.tsx - Add variant
case 'danger':
  return `
    background-color: ${theme.colors.danger.main};
    color: ${theme.colors.danger.contrast};
  `;

// pages/dashboard/index.tsx
<Button variant="danger">Delete</Button>

// pages/settings/index.tsx
<Button variant="danger">Remove Account</Button>
```

## Review Checklist

When reviewing code, check for:

- [ ] No `styled(ComponentName)` patterns wrapping existing components
- [ ] No `className` overrides on reusable components
- [ ] No `!important` in CSS files
- [ ] Components have sufficient variants to avoid overrides
- [ ] Specialized components are created instead of per-page overrides
- [ ] All variant props use theme values, not magic numbers
- [ ] Overrides are only used for third-party components (documented)

## Exceptions

Overrides are acceptable **only** when:

1. **Third-party components**: Material-UI, Ant Design, etc. (wrap them)
2. **Gradual migration**: Temporary during refactoring (add TODO comment with ticket)
3. **Truly unique one-off**: Documented exceptional case (rare)

In all cases, add a comment explaining why:

```tsx
// TODO: Remove override once Button component supports 'warning' variant (TICKET-123)
const WarningButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.warning.main};
`;
```

## Related Guidelines

- **FE-01**: No Inline Styles - Use styled-components with theme
- **FE-03**: Reusable Components - Build finite set of composable primitives
- Frontend Architecture: `/docs/frontend-architecture.md` (Components section)

## References

- Frontend Architecture: `/Users/jjalan/Developer/jalantechnologies/node-react-template/docs/frontend-architecture.md`
- Component examples: `/frontend/components/`
- Design system documentation: Check your project's design system docs

## Common Questions

**Q: What if I need a button with slightly different padding for one page?**
A: Add a `size` variant to Button. If it's truly one-off, question if the design is consistent.

**Q: Can I override third-party component styles?**
A: Yes, but wrap them in your own component to isolate the override:

```tsx
// components/mui-button-wrapper/index.tsx
import MuiButton from '@mui/material/Button';
import styled from 'styled-components';

export const Button = styled(MuiButton)`
  /* Override MUI styles to match our theme */
`;
```

**Q: What about CSS modules with className?**
A: Same principle - avoid per-page className overrides. Components should have variants.

**Q: How many variants should a component have?**
A: Enough to cover all use cases without overrides. Start with design system variants. Add more as needed, but question design inconsistencies.

---

**Last Updated**: 2025-11-02
**Severity**: CRITICAL
**Auto-reject**: Yes - Widespread style overrides indicate poor component design
