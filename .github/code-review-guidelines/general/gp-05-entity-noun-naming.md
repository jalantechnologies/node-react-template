# GP-5: Use Entity/Noun Naming for Classes and Components

**Severity:** `[CRITICAL]`

## Principle

Classes and components should be named after entities or nouns that represent what they ARE, not verbs that describe what they DO. This applies to both backend classes and React components.

## Why This Matters

- **Clarity**: Classes represent things/entities, not actions
- **Consistency**: Aligns with OOP naming conventions across languages
- **Readability**: `ExcelParser` clearly owns parsing behavior; `ParseExcel` reads like a function
- **Extensibility**: Noun-based classes can grow with related methods without awkward names
- **Convention**: Industry standard - User, Order, PaymentProcessor, not HandleUser, CreateOrder, ProcessPayment

## Bad Examples

### Example 1: Verb-Based Class Names

```typescript
// Backend classes with verb names
class ParseExcel {
  execute(filePath: string) {
    // Parsing logic
  }
}

class HandleAuth {
  verify(token: string) {
    // Auth logic
  }
}

class ProcessPayment {
  run(amount: number) {
    // Payment logic
  }
}

class SendEmail {
  send(email: Email) {
    // Email logic
  }
}

// Usage - awkward and unclear
const parser = new ParseExcel();
const auth = new HandleAuth();
const payment = new ProcessPayment();
```

**Problems:**
- Reads like a function/action, not an entity
- What is "a ParseExcel"? It's not a thing, it's an action
- Doesn't convey what the class represents
- Awkward when adding related methods: `ParseExcel.validate()` vs `ExcelParser.validate()`

### Example 2: Verb-Based React Components

```tsx
// React components with verb names
function RenderUserProfile({ user }: { user: User }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

function DisplayOrderList({ orders }: { orders: Order[] }) {
  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>{order.number}</div>
      ))}
    </div>
  );
}

function HandlePaymentForm({ onSubmit }: { onSubmit: () => void }) {
  return <form onSubmit={onSubmit}>...</form>;
}

// Usage in JSX - redundant and awkward
<RenderUserProfile user={user} />
<DisplayOrderList orders={orders} />
<HandlePaymentForm onSubmit={handleSubmit} />
```

**Problems:**
- "Render" is already implicit in JSX - all components render
- Redundant naming - of course `<RenderUserProfile />` renders
- Doesn't describe what the component IS, just what it does
- Harder to reason about component hierarchy

### Example 3: Mixed Naming Styles

```typescript
// Inconsistent naming across codebase
class UserAuthenticator {
  authenticate() {}
}

class ValidateOrder {  // Should be OrderValidator
  validate() {}
}

class EmailSender {
  send() {}
}

class ProcessRefund {  // Should be RefundProcessor
  process() {}
}
```

**Problems:**
- Inconsistent patterns confuse developers
- Some follow conventions, others don't
- Makes codebase feel unprofessional

## Good Examples

### Example 1: Noun-Based Backend Classes

```typescript
// Entity/noun naming for services and processors
class ExcelParser {
  parse(filePath: string): Workbook {
    // Parsing logic
  }

  validate(filePath: string): ValidationResult {
    // Validation logic
  }

  extract(filePath: string, sheetIndex: number): Sheet {
    // Extraction logic
  }
}

class UserAuthenticator {
  authenticate(credentials: Credentials): AuthToken {
    // Auth logic
  }

  verifyToken(token: string): boolean {
    // Verification logic
  }

  refreshToken(token: string): AuthToken {
    // Refresh logic
  }
}

class PaymentProcessor {
  processPayment(payment: Payment): PaymentResult {
    // Payment processing
  }

  refundPayment(paymentId: string): RefundResult {
    // Refund logic
  }

  validatePaymentMethod(method: PaymentMethod): boolean {
    // Validation logic
  }
}

class EmailService {
  send(email: Email): Promise<void> {
    // Send logic
  }

  sendBatch(emails: Email[]): Promise<void> {
    // Batch send logic
  }

  scheduleEmail(email: Email, sendAt: Date): Promise<void> {
    // Schedule logic
  }
}

// Usage - clear and natural
const parser = new ExcelParser();
const authenticator = new UserAuthenticator();
const processor = new PaymentProcessor();
```

**Benefits:**
- Classes clearly represent entities
- Methods describe actions the entity can perform
- Natural to extend with related methods
- Follows industry conventions

### Example 2: Noun-Based React Components

```tsx
// Entity naming for components
function UserProfile({ user }: { user: User }) {
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
}

function OrderList({ orders }: { orders: Order[] }) {
  return (
    <div className="order-list">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="order-card">
      <h3>{order.number}</h3>
      <p>Total: ${order.total}</p>
    </div>
  );
}

function PaymentForm({ onSubmit }: { onSubmit: (data: PaymentData) => void }) {
  return (
    <form onSubmit={handleSubmit}>
      <input name="cardNumber" />
      <input name="cvv" />
      <button type="submit">Pay</button>
    </form>
  );
}

// Usage - clean and semantic
<UserProfile user={user} />
<OrderList orders={orders} />
<PaymentForm onSubmit={handlePayment} />
```

**Benefits:**
- Components are self-describing entities
- No redundant "Render" or "Display" prefixes
- Easier to understand component hierarchy
- Follows React community conventions

### Example 3: Domain Model Classes

```typescript
// Rich domain models with noun names
class Invoice {
  constructor(
    private id: string,
    private customerId: string,
    private items: InvoiceItem[],
    private status: InvoiceStatus
  ) {}

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  markAsPaid(): void {
    this.status = 'paid';
  }

  isOverdue(): boolean {
    return this.status === 'unpaid' && this.dueDate < new Date();
  }

  addItem(item: InvoiceItem): void {
    this.items.push(item);
  }
}

class Appointment {
  constructor(
    private id: string,
    private customerId: string,
    private startTime: Date,
    private endTime: Date,
    private timezone: string
  ) {}

  getLocalTime(targetTimezone: string): Date {
    // Convert timezone logic
  }

  getDuration(): number {
    return this.endTime.getTime() - this.startTime.getTime();
  }

  isConflictingWith(other: Appointment): boolean {
    return this.startTime < other.endTime && this.endTime > other.startTime;
  }

  reschedule(newStartTime: Date): void {
    const duration = this.getDuration();
    this.startTime = newStartTime;
    this.endTime = new Date(newStartTime.getTime() + duration);
  }
}

class ShoppingCart {
  private items: CartItem[] = [];

  addItem(product: Product, quantity: number): void {
    const existing = this.items.find(item => item.productId === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ productId: product.id, quantity, price: product.price });
    }
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.productId !== productId);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }
}
```

## Naming Patterns to Follow

### For Backend Classes

```typescript
// Processors and Handlers
class PaymentProcessor { }      // ✅ Not: ProcessPayment
class OrderValidator { }         // ✅ Not: ValidateOrder
class DataTransformer { }        // ✅ Not: TransformData
class EmailSender { }            // ✅ Not: SendEmail

// Services
class UserService { }            // ✅ Not: HandleUser
class NotificationService { }    // ✅ Not: SendNotification
class AuthenticationService { }  // ✅ Not: AuthenticateUser

// Parsers and Formatters
class ExcelParser { }            // ✅ Not: ParseExcel
class JSONFormatter { }          // ✅ Not: FormatJSON
class MarkdownRenderer { }       // ✅ Not: RenderMarkdown

// Domain Entities
class User { }                   // ✅ Not: CreateUser
class Order { }                  // ✅ Not: ProcessOrder
class Invoice { }                // ✅ Not: GenerateInvoice
class Appointment { }            // ✅ Not: ScheduleAppointment
```

### For React Components

```tsx
// UI Components
function UserProfile() { }       // ✅ Not: RenderUserProfile
function OrderList() { }         // ✅ Not: DisplayOrders
function PaymentForm() { }       // ✅ Not: HandlePayment
function NavigationBar() { }     // ✅ Not: RenderNavigation

// Composite Components
function DashboardPage() { }     // ✅ Not: ShowDashboard
function SettingsPanel() { }     // ✅ Not: DisplaySettings
function ProductGrid() { }       // ✅ Not: RenderProducts

// Container Components
function UserContainer() { }     // ✅ Not: FetchUser
function OrderContainer() { }    // ✅ Not: LoadOrders
```

## Common Naming Suffixes

Choose appropriate suffixes based on the class's primary responsibility:

```typescript
// Data Processing
class DataParser { }        // Parses data
class DataValidator { }     // Validates data
class DataTransformer { }   // Transforms data
class DataFormatter { }     // Formats data

// Business Logic
class OrderProcessor { }    // Processes orders
class PaymentHandler { }    // Handles payments
class EmailSender { }       // Sends emails
class FileUploader { }      // Uploads files

// Services
class UserService { }       // General user operations
class AuthService { }       // Authentication operations
class StorageService { }    // Storage operations

// Domain Models
class User { }              // Simple entity (no suffix needed)
class Order { }
class Product { }
class Invoice { }
```

## When Entity Names Are Unclear

Sometimes the right entity name isn't obvious. Here are strategies:

### Strategy 1: Think "What IS this, not what does it do"

```typescript
// ❌ Bad - thinking about action
class CalculateTax {
  execute() {}
}

// ✅ Good - thinking about entity
class TaxCalculator {
  calculate() {}
}

// Or even better - if it's a service
class TaxService {
  calculate() {}
  getRate() {}
  validate() {}
}
```

### Strategy 2: Use Domain Language

```typescript
// ❌ Bad - generic action
class ProcessRefund {
  process() {}
}

// ✅ Good - domain entity
class RefundProcessor {
  process() {}
  validate() {}
  notify() {}
}

// Or
class Refund {
  process() {}
  validate() {}
  getStatus() {}
}
```

### Strategy 3: Look at Related Methods

```typescript
// If your class needs multiple related methods, noun naming is better

// ❌ Bad - awkward with multiple methods
class ParseExcel {
  parse() {}
  parseValidate() {}  // Awkward
  parseHeaders() {}   // Awkward
}

// ✅ Good - natural with multiple methods
class ExcelParser {
  parse() {}
  validate() {}
  extractHeaders() {}
  getSheetNames() {}
}
```

## Special Cases

### React Hooks

```typescript
// Hooks use verb naming (by React convention)
function useAuth() { }           // ✅ Correct for hooks
function useFetchUsers() { }     // ✅ Correct for hooks
function useLocalStorage() { }   // ✅ Correct for hooks

// But the components they're used in should still be nouns
function LoginForm() {           // ✅ Not: HandleLogin
  const { login } = useAuth();
  // ...
}
```

### Utility Functions (Not Classes)

```typescript
// Pure utility functions can use verb naming
export function formatCurrency(amount: number) { }  // ✅ OK for functions
export function validateEmail(email: string) { }    // ✅ OK for functions
export function parseJSON(json: string) { }         // ✅ OK for functions

// But if you have multiple related utilities, consider a class
class Currency {                                    // ✅ Better
  static format(amount: number) { }
  static parse(value: string) { }
  static convert(amount: number, from: string, to: string) { }
}
```

## Review Checklist

- [ ] Are all classes named with entity/noun names (not verbs)?
- [ ] Do React component names use nouns (not "Render", "Display", "Handle")?
- [ ] Are class names consistent with similar classes in the codebase?
- [ ] Would methods feel natural on this class with its current name?
- [ ] Does the class name represent what it IS, not what it DOES?
- [ ] Are appropriate suffixes used (-Processor, -Validator, -Service, -Parser)?
- [ ] Do component names clearly convey their purpose without redundant prefixes?
