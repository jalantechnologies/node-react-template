# FE-03: Reusable Components and Layouts

**Severity**: CRITICAL

## Principle

To build a page, break it down into layouts and components. The application should have a **finite set of reusable layouts and components** that are composed to create all pages. Pages should be thin orchestration layers, not monolithic markup files.

This principle ensures that as the application grows, complexity remains manageable and the UI stays consistent.

## Why This Matters

1. **Maintainability**: Changes to a component automatically propagate to all pages using it
2. **Consistency**: Reusing components ensures consistent UI patterns across the app
3. **Velocity**: Building new pages becomes faster as component library grows
4. **Testing**: Test components once, use everywhere with confidence
5. **Onboarding**: New developers learn a finite set of components, not per-page patterns
6. **Design System Compliance**: Reusable components enforce design system constraints
7. **Code Reuse**: Avoid duplicating markup, styles, and logic across pages

The goal is to have a **component library**, not a collection of page-specific markup.

## Bad Examples

### ❌ Monolithic page with inline markup

```tsx
// pages/dashboard/index.tsx (500+ lines)
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const TableContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// ... 50+ more styled components for this page only

export const Dashboard = () => {
  return (
    <Container>
      <Header>
        <Title>Dashboard</Title>
        <button>Export</button>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatLabel>Total Revenue</StatLabel>
          <StatValue>$45,231</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Active Users</StatLabel>
          <StatValue>1,234</StatValue>
        </StatCard>
        {/* Repeated stat card markup */}
      </StatsGrid>

      <ChartContainer>
        {/* 200 lines of chart markup */}
      </ChartContainer>

      <TableContainer>
        {/* 200 lines of table markup */}
      </TableContainer>
    </Container>
  );
};
```

**Problems**:
- 500+ lines in single file
- All components defined inline, not reusable
- StatCard markup duplicated 4 times
- No component library - analytics page will duplicate this
- Testing requires mounting entire page
- Can't reuse StatCard, ChartContainer, or TableContainer elsewhere

### ❌ Duplicated components across pages

```tsx
// pages/dashboard/index.tsx
const DashboardCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Dashboard = () => {
  return (
    <DashboardCard>
      {/* content */}
    </DashboardCard>
  );
};

// pages/analytics/index.tsx
const AnalyticsCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Analytics = () => {
  return (
    <AnalyticsCard>
      {/* content */}
    </AnalyticsCard>
  );
};

// pages/reports/index.tsx
const ReportCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Reports = () => {
  return (
    <ReportCard>
      {/* content */}
    </ReportCard>
  );
};
```

**Problems**:
- Same card component defined 3 times
- Updating card styles requires changing 3 files
- Inconsistencies will emerge over time
- No single source of truth

### ❌ Page-specific layouts

```tsx
// pages/dashboard/index.tsx
const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #1a1a1a;
  color: white;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 24px;
`;

// pages/analytics/index.tsx - duplicating layout
const AnalyticsLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AnalyticsSidebar = styled.div`
  width: 250px;
  background: #1a1a1a;
  color: white;
`;

const AnalyticsMainContent = styled.div`
  flex: 1;
  padding: 24px;
`;
```

**Problems**:
- Layout logic duplicated across pages
- Should have a single `AppLayout` component
- No reusability

## Good Examples

### ✅ Component library approach

```tsx
// components/card/index.tsx
import styled from 'styled-components';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const StyledCard = styled.div<{ $variant: string; $padding: string }>`
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'elevated':
        return `box-shadow: ${theme.shadows.md};`;
      case 'outlined':
        return `border: 1px solid ${theme.colors.border.light};`;
      default:
        return `box-shadow: ${theme.shadows.sm};`;
    }
  }}

  ${({ $padding, theme }) => {
    switch ($padding) {
      case 'small':
        return `padding: ${theme.spacing.sm};`;
      case 'large':
        return `padding: ${theme.spacing.lg};`;
      default:
        return `padding: ${theme.spacing.md};`;
    }
  }}
`;

export const Card = ({ variant = 'default', padding = 'medium', children }: CardProps) => {
  return <StyledCard $variant={variant} $padding={padding}>{children}</StyledCard>;
};
```

```tsx
// components/stat-card/index.tsx
import styled from 'styled-components';
import { Card } from '@/components/card';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { direction: 'up' | 'down' | 'neutral'; value: string };
  icon?: React.ReactNode;
}

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const StatTrend = styled.span<{ $direction: 'up' | 'down' | 'neutral' }>`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ $direction, theme }) => {
    switch ($direction) {
      case 'up': return theme.colors.success.main;
      case 'down': return theme.colors.danger.main;
      default: return theme.colors.text.secondary;
    }
  }};
`;

export const StatCard = ({ label, value, trend, icon }: StatCardProps) => {
  return (
    <Card variant="outlined" padding="medium">
      <StatContainer>
        <StatHeader>
          <StatLabel>{label}</StatLabel>
          {icon && <div>{icon}</div>}
        </StatHeader>
        <StatValue>{value}</StatValue>
        {trend && (
          <StatTrend $direction={trend.direction}>
            {trend.value}
          </StatTrend>
        )}
      </StatContainer>
    </Card>
  );
};
```

```tsx
// components/data-table/index.tsx
import styled from 'styled-components';
import { Card } from '@/components/card';

interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.light};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DataTable = <T,>({
  columns,
  data,
  emptyMessage = 'No data available',
}: DataTableProps<T>) => {
  return (
    <Card padding="none">
      {data.length === 0 ? (
        <EmptyState>{emptyMessage}</EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col.key}>{col.header}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <Td key={col.key}>{col.render(row)}</Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};
```

**Benefits**:
- Three reusable components: `Card`, `StatCard`, `DataTable`
- Can be used across dashboard, analytics, reports, admin pages
- Tested once, used everywhere
- Consistent UI patterns

### ✅ Layout composition

```tsx
// components/layouts/app-layout/index.tsx
import styled from 'styled-components';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.surface.dark};
  position: fixed;
  height: 100vh;
  overflow-y: auto;
`;

const MainContainer = styled.main`
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.surface.primary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <LayoutContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Content>{children}</Content>
      </MainContainer>
    </LayoutContainer>
  );
};
```

```tsx
// components/layouts/content-area/index.tsx
import styled from 'styled-components';

interface ContentAreaProps {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ContentArea = ({ title, actions, children }: ContentAreaProps) => {
  return (
    <Container>
      <HeaderRow>
        <Title>{title}</Title>
        {actions && <Actions>{actions}</Actions>}
      </HeaderRow>
      {children}
    </Container>
  );
};
```

**Benefits**:
- Single `AppLayout` used across all protected pages
- Single `ContentArea` for page headers and content
- Consistent structure everywhere

### ✅ Thin page using composable components

```tsx
// pages/dashboard/index.tsx (50 lines, down from 500+)
import { AppLayout } from '@/components/layouts/app-layout';
import { ContentArea } from '@/components/layouts/content-area';
import { StatCard } from '@/components/stat-card';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/button';
import { useAccountContext } from '@/contexts/account.provider';
import { useDashboardData } from './use-dashboard-data.hook';
import styled from 'styled-components';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Dashboard = () => {
  const { accountDetails } = useAccountContext();
  const { stats, recentActivity, isLoading } = useDashboardData();

  const columns = [
    { key: 'date', header: 'Date', render: (row: any) => row.date },
    { key: 'action', header: 'Action', render: (row: any) => row.action },
    { key: 'user', header: 'User', render: (row: any) => row.user },
  ];

  return (
    <AppLayout>
      <ContentArea
        title={`Welcome back, ${accountDetails?.firstName}`}
        actions={
          <Button variant="primary" onClick={() => console.log('export')}>
            Export
          </Button>
        }
      >
        <StatsGrid>
          <StatCard
            label="Total Revenue"
            value={stats.revenue}
            trend={{ direction: 'up', value: '+12.5%' }}
          />
          <StatCard
            label="Active Users"
            value={stats.users}
            trend={{ direction: 'down', value: '-3.2%' }}
          />
          <StatCard
            label="Conversion Rate"
            value={stats.conversionRate}
            trend={{ direction: 'neutral', value: '0.0%' }}
          />
        </StatsGrid>

        <DataTable
          columns={columns}
          data={recentActivity}
          emptyMessage="No recent activity"
        />
      </ContentArea>
    </AppLayout>
  );
};
```

**Benefits**:
- Page is 50 lines instead of 500+
- Composes from reusable components
- Easy to read and understand
- All components are reusable across app
- Testing is straightforward

### ✅ Another page using same components

```tsx
// pages/analytics/index.tsx
import { AppLayout } from '@/components/layouts/app-layout';
import { ContentArea } from '@/components/layouts/content-area';
import { StatCard } from '@/components/stat-card';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/button';
import { useAnalyticsData } from './use-analytics-data.hook';
import styled from 'styled-components';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Analytics = () => {
  const { pageViews, bounceRate, avgSessionDuration, topPages } = useAnalyticsData();

  const columns = [
    { key: 'page', header: 'Page', render: (row: any) => row.page },
    { key: 'views', header: 'Views', render: (row: any) => row.views },
    { key: 'bounceRate', header: 'Bounce Rate', render: (row: any) => row.bounceRate },
  ];

  return (
    <AppLayout>
      <ContentArea
        title="Analytics"
        actions={
          <Button variant="secondary" onClick={() => console.log('filter')}>
            Filter
          </Button>
        }
      >
        <StatsGrid>
          <StatCard label="Page Views" value={pageViews} />
          <StatCard label="Bounce Rate" value={bounceRate} />
          <StatCard label="Avg Session Duration" value={avgSessionDuration} />
        </StatsGrid>

        <DataTable columns={columns} data={topPages} />
      </ContentArea>
    </AppLayout>
  );
};
```

**Benefits**:
- Reuses all components from Dashboard
- Consistent structure and UI
- Fast to build - just compose components
- Automatically consistent with design system

## Component Library Structure

A well-designed frontend should have these categories of components:

### 1. Primitives
Basic building blocks used everywhere:
- `Button` - All button variants
- `Input` - Text inputs, textareas
- `Select` - Dropdowns
- `Checkbox`, `Radio` - Form controls
- `Link` - Styled links

### 2. Layout Components
Structural components for page composition:
- `AppLayout` - Main application shell
- `ContentArea` - Page content with header
- `Grid`, `Flex` - Layout primitives
- `Stack` - Vertical/horizontal stacking
- `Spacer` - Consistent spacing

### 3. Composite Components
Feature-specific reusable components:
- `Card` - Container component
- `StatCard` - Dashboard stat display
- `DataTable` - Tabular data display
- `Modal`, `Dialog` - Overlays
- `Toast` - Notifications

### 4. Domain Components
Business-specific components:
- `UserAvatar` - User profile image
- `OrderSummary` - Order display
- `PaymentMethodCard` - Payment info
- `InvoicePreview` - Invoice display

### 5. Chrome Components
Navigation and UI chrome:
- `Header` - Top navigation
- `Sidebar` - Side navigation
- `Footer` - Page footer
- `Breadcrumbs` - Navigation trail

## Finite Component Library

The goal is to reach a state where:

1. **New pages don't require new components** - just composition
2. **Component library is complete** - covers all design system patterns
3. **Adding features is fast** - compose from existing components
4. **Consistency is automatic** - reusing components enforces design system

This doesn't mean **never** adding components, but new components should be rare as the library matures.

## Review Checklist

When reviewing code, check for:

- [ ] Pages are thin (<150 lines) and compose from reusable components
- [ ] No component definitions inside pages (except grid/layout wrappers)
- [ ] Components are in `/components/` directory, not inline in pages
- [ ] Layout components are reused across pages
- [ ] No duplicated component definitions across pages
- [ ] New components are genuinely reusable, not page-specific
- [ ] Component props make them flexible for multiple use cases
- [ ] Components use theme values, not magic numbers

## Decision Framework

### Should this be a component?

Ask these questions:

1. **Is it used in multiple places?** → Definitely a component
2. **Will it be used in multiple places soon?** → Probably a component
3. **Is it a distinct UI pattern?** → Component
4. **Is it page-specific markup?** → Keep in page unless complex

### Should this be its own component or part of a page?

- **Separate component**: More than 30 lines, reusable, testable independently
- **Page markup**: Simple, truly one-off, less than 20 lines

## Migration Path

If you find monolithic pages:

1. **Identify repeated patterns**: Find markup duplicated across pages
2. **Extract to components**: Create components in `/components/`
3. **Use theme values**: Replace magic numbers with theme tokens
4. **Add variants**: Make components flexible with props
5. **Update pages**: Replace inline markup with component usage
6. **Remove duplication**: Delete now-redundant code
7. **Document components**: Add props interface and usage examples

## Related Guidelines

- **FE-01**: No Inline Styles - Components should use styled-components with theme
- **FE-02**: No Style Overrides - Components should have variants, not overrides
- Frontend Architecture: `/docs/frontend-architecture.md` (Components and Pages sections)

## References

- Frontend Architecture: `/Users/jjalan/Developer/jalantechnologies/node-react-template/docs/frontend-architecture.md`
- Component examples: `/frontend/components/`
- Page examples: `/frontend/pages/`

## Common Questions

**Q: How do I know when I have enough components?**
A: When you can build new pages by composing existing components without creating new ones.

**Q: Should every component be in `/components/`?**
A: Yes, unless it's truly page-specific. Even then, if it's complex, extract it.

**Q: What about very similar components?**
A: Use variants or composition instead of creating multiple similar components.

**Q: How granular should components be?**
A: Granular enough to be reusable, but not so granular that you need 50 components to build a page. Balance is key.

---

**Last Updated**: 2025-11-02
**Severity**: CRITICAL
**Auto-reject**: Yes - Monolithic pages or duplicated components should be rejected in PR review
