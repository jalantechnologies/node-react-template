# GP-2: Function and Variable Names Must Correctly Reflect Their Purpose

**Severity:** `[CRITICAL]`

## Principle

Every function and variable name should accurately describe what it represents or what operation it performs. Misleading or vague names are worse than generic names because they create false expectations and bugs.

## Why This Matters

- Prevents bugs caused by misunderstanding what a variable contains or function does
- Reduces time spent reading implementation to understand purpose
- Makes code reviews faster and more effective
- Misleading names can persist for years, causing repeated confusion

## Bad Examples

### Example 1: Vague Generic Names

```typescript
function process(data: any) {
  // What does it process? Orders? Payments? Users?
  // What is the output?
}

function handle(item: any) {
  // Handle how? Save? Delete? Validate?
}

const temp = getUserById(id);
const data = await fetchData();
const result = calculate(x, y);
```

**Problem:** These names provide no information about purpose or content.

### Example 2: Misleading Names

```typescript
// This function actually creates AND sends an email, not just creates it
function createEmail(recipient: string, subject: string) {
  const email = formatEmail(recipient, subject);
  await sendEmail(email); // Surprise side effect!
  return email;
}

// This actually returns active users, not all users
function getUsers(): User[] {
  return users.filter(u => u.status === 'active');
}

// This variable holds a user object, not just a flag
const isValid = validateUser(userId);
// Later... isValid.email (treating boolean as object - bug!)
```

**Problem:** Names promise one thing but deliver another, leading to bugs.

### Example 3: Abbreviated Names That Lose Meaning

```typescript
const usr = await getUser(); // Is this user or users?
const acc = await getAccount(); // Account or accumulator?
const cnt = items.length; // Count or content?
const mgr = new Manager(); // Manager or messenger?
const proc = processOrder(); // Process or processor?
```

## Good Examples

### Example 1: Descriptive Function Names

```typescript
// Clear what it does and returns
function calculateMonthlySubscriptionRevenue(subscriptions: Subscription[]): number {
  return subscriptions
    .filter(s => s.billingPeriod === 'monthly')
    .reduce((sum, s) => sum + s.price, 0);
}

// Clear about the side effects
async function createOrderAndNotifyCustomer(orderData: OrderData): Promise<Order> {
  const order = await OrderService.createOrder(orderData);
  await NotificationService.notifyCustomer(order.customerId, order);
  return order;
}

// Boolean functions clearly indicate they return true/false
function isUserEligibleForDiscount(user: User): boolean {
  return user.totalPurchases > 1000 && user.membershipLevel === 'premium';
}
```

### Example 2: Descriptive Variable Names

```typescript
// Clear what data it holds
const authenticatedUser = await getUserById(id);
const unpaidInvoices = invoices.filter(inv => inv.status === 'unpaid');
const maxAllowedFileSize = 10 * 1024 * 1024; // 10MB

// Clear what the boolean represents
const isUserActive = user.status === 'active';
const hasValidSubscription = subscription && subscription.expiresAt > new Date();
const canEditDocument = user.role === 'admin' || document.createdBy === user.id;
```

### Example 3: Collection Names

```typescript
// Plural for arrays/lists
const activeUsers = users.filter(u => u.status === 'active');
const pendingOrders = await OrderRepository.findPendingOrders();
const errorMessages: string[] = [];

// Singular for maps/objects
const userById = new Map<string, User>();
const configByEnvironment: Record<string, Config> = {};
```

### Example 4: Class and Type Names (Nouns)

```typescript
// Use entity/noun naming for classes
class ExcelParser {
  parseWorkbook(filePath: string): Workbook { }
}

class UserAuthenticator {
  authenticate(credentials: Credentials): AuthToken { }
}

class PaymentProcessor {
  processPayment(amount: number): PaymentResult { }
}

// Not verb-based
// ❌ class ParseExcel
// ❌ class HandleAuthentication
// ❌ class ProcessPayment
```

## Naming Patterns to Follow

### Boolean Variables

```typescript
// Prefix with is, has, can, should, will
const isAuthenticated = checkAuth();
const hasPermission = user.permissions.includes('write');
const canEditPost = post.authorId === user.id;
const shouldRetry = attempt < MAX_ATTEMPTS;
const willExpireSoon = subscription.expiresAt < addDays(new Date(), 7);
```

### Functions That Return Booleans

```typescript
// Use is, has, can, should prefixes
function isValidEmail(email: string): boolean
function hasAccess(user: User, resource: Resource): boolean
function canDeleteAccount(account: Account): boolean
function shouldSendReminder(user: User): boolean
```

### Functions That Retrieve Data

```typescript
// Use get, fetch, find, retrieve
function getUserById(id: string): Promise<User>
function fetchActiveSubscriptions(): Promise<Subscription[]>
function findOrderByNumber(orderNumber: string): Promise<Order | null>
```

### Functions That Create or Modify

```typescript
// Use create, update, delete, add, remove, save
function createAccount(data: AccountData): Promise<Account>
function updateUserProfile(userId: string, updates: ProfileUpdates): Promise<User>
function deleteOrder(orderId: string): Promise<void>
function addItemToCart(item: CartItem): Cart
```

### Functions with Side Effects

```typescript
// Name should indicate the side effect
function sendEmailAndLogEvent(email: Email): Promise<void>
function saveUserAndInvalidateCache(user: User): Promise<User>
function deleteAccountAndNotifyUser(accountId: string): Promise<void>
```

## Common Mistakes to Avoid

### 1. Using 'flag' or 'temp'

```typescript
// ❌ Bad
const flag = user.status === 'active';
const temp = calculateTotal();

// ✅ Good
const isUserActive = user.status === 'active';
const orderTotal = calculateTotal();
```

### 2. Single Letter Variables (Outside Loops)

```typescript
// ❌ Bad
const u = await getUser();
const p = calculatePrice();

// ✅ Good
const user = await getUser();
const price = calculatePrice();

// ✅ Acceptable in short loops
users.map(u => u.name)
items.filter((item, i) => i < 10)
```

### 3. Inconsistent Naming Across Codebase

```typescript
// ❌ Bad - same concept, different names
function getUserName(user: User): string
function getAccountFullName(account: Account): string
function fetchCustomerDisplayName(customer: Customer): string

// ✅ Good - consistent pattern
function getUserFullName(user: User): string
function getAccountFullName(account: Account): string
function getCustomerFullName(customer: Customer): string
```

## TypeScript-Specific Guidelines

```typescript
// Interfaces and Types use PascalCase
interface UserProfile { }
type PaymentMethod = 'card' | 'bank' | 'paypal';

// Enums use PascalCase for name and keys
enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Shipped = 'shipped',
}

// Constants use SCREAMING_SNAKE_CASE for true constants
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';

// Regular const uses camelCase
const userEmail = user.email;
const defaultTimeout = 5000;
```

## Review Checklist

- [ ] Do function names clearly indicate what they do?
- [ ] Do variable names accurately describe what they contain?
- [ ] Are boolean variables prefixed with is/has/can/should?
- [ ] Are collection names plural (arrays) and singular (maps)?
- [ ] Are there any misleading names that promise one thing but do another?
- [ ] Are abbreviated names causing confusion?
- [ ] Is naming consistent across similar functions/variables?
- [ ] Do class/component names use nouns, not verbs?
