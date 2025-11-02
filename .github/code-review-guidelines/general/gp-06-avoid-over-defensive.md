# GP-6: Avoid Over-Defensive Programming

**Severity:** `[CRITICAL]`

## Principle

Avoid unnecessary null checks, optional chaining (`?.`), or defensive if statements without understanding when and why they're needed. Over-defensive code hides bugs, silently fails, and makes debugging harder. Fail fast with explicit errors instead of defensive programming that masks problems.

## Why This Matters

- **Hidden Bugs**: Defensive code can hide errors that should be fixed at the source
- **Debugging Difficulty**: Silent failures make it hard to trace where problems originate
- **False Security**: Defensive checks give false confidence without solving root issues
- **Code Noise**: Excessive defensive code clutters logic and reduces readability
- **Wrong Assumptions**: Defensive programming often indicates uncertain data contracts

## Bad Examples

### Example 1: Hiding Errors with Optional Chaining

```typescript
// User should always exist at this point, but defensive code hides the bug
async function getUserProfile(userId: string) {
  const user = await UserRepository.findById(userId);

  // If user is null, this silently returns 'unknown@email.com'
  // The real bug is WHY user is null - we should fix that!
  const email = user?.email ?? 'unknown@email.com';
  const name = user?.name ?? 'Unknown User';
  const role = user?.role ?? 'guest';

  return { email, name, role };
}

// Later, the bug manifests elsewhere with bad data
await sendEmail(email); // Sends to 'unknown@email.com' - silently wrong!
```

**Problems:**
- Hides the bug that user is null
- Returns fake data instead of failing
- Bug manifests downstream with confusing symptoms
- Makes debugging harder - where did 'unknown@email.com' come from?

### Example 2: Silent Failure in Business Logic

```typescript
async function processOrder(orderId: string) {
  const order = await OrderRepository.findById(orderId);

  // Silently returns if order doesn't exist - hides the problem!
  if (!order) {
    return;
  }

  // If order status is not pending, silently returns
  if (order.status !== 'pending') {
    return;
  }

  // Process order...
  await processPayment(order);
}

// Caller has no idea if order was processed or silently skipped
await processOrder('123'); // Did it work? Who knows!
```

**Problems:**
- No indication of why processing didn't happen
- Caller can't distinguish between success and silent failure
- Business logic errors are hidden
- Debugging is nearly impossible

### Example 3: Defensive Null Checks Everywhere

```typescript
function calculateOrderTotal(order: Order) {
  // Unnecessary checks that hide data contract issues
  if (!order) {
    return 0;
  }

  if (!order.items) {
    return 0;
  }

  if (!order.items.length) {
    return 0;
  }

  let total = 0;
  for (const item of order.items) {
    if (item && item.price && item.quantity) {
      total += item.price * item.quantity;
    }
  }

  return total;
}

// Usage - returns 0 for any error, hiding bugs
const total = calculateOrderTotal(malformedOrder); // Returns 0, bug hidden
```

**Problems:**
- Returns 0 for invalid data instead of failing
- Hides data quality issues
- Impossible to tell if total is legitimately 0 or error
- If Order type requires items, these checks are redundant

### Example 4: Optional Chaining Abuse

```typescript
async function displayUserDashboard(userId: string) {
  const user = await fetchUser(userId);

  // Excessive optional chaining hides when data is actually missing
  const userName = user?.profile?.name ?? 'Guest';
  const userAvatar = user?.profile?.avatar?.url ?? '/default-avatar.png';
  const userBio = user?.profile?.bio ?? '';
  const userSettings = user?.settings?.preferences ?? {};
  const userNotifications = user?.notifications?.unread?.count ?? 0;

  // All this runs even if user is null - is that correct?
  return {
    userName,
    userAvatar,
    userBio,
    userSettings,
    userNotifications,
  };
}
```

**Problems:**
- User being null should be an error, not handled with defaults
- Deep optional chaining indicates uncertain data structure
- Masks API/database issues
- Shows lack of confidence in data contracts

## Good Examples

### Example 1: Fail Fast with Explicit Errors

```typescript
async function getUserProfile(userId: string): Promise<UserProfile> {
  const user = await UserRepository.findById(userId);

  // If user is null, that's a bug - fail explicitly!
  if (!user) {
    throw new UserNotFoundError(`User ${userId} not found`);
  }

  // Type system guarantees these exist now
  return {
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

// Caller knows exactly what happened
try {
  const profile = await getUserProfile('123');
  await sendEmail(profile.email); // Safe - we know email exists
} catch (error) {
  if (error instanceof UserNotFoundError) {
    // Handle appropriately
    logger.error('User not found', { userId: '123' });
    return { error: 'User not found' };
  }
  throw error;
}
```

**Benefits:**
- Clear error when user doesn't exist
- No silent failures or fake data
- Caller can handle error appropriately
- Easy to debug - error points to source

### Example 2: Validate Upfront, Then Trust

```typescript
async function processOrder(orderId: string): Promise<ProcessedOrder> {
  const order = await OrderRepository.findById(orderId);

  // Validate upfront with clear errors
  if (!order) {
    throw new OrderNotFoundError(`Order ${orderId} not found`);
  }

  if (order.status !== 'pending') {
    throw new OrderAlreadyProcessedError(
      `Order ${orderId} has status ${order.status}, expected 'pending'`
    );
  }

  if (!order.items || order.items.length === 0) {
    throw new EmptyOrderError(`Order ${orderId} has no items`);
  }

  // After validation, trust the data and process
  const payment = await processPayment(order);
  const updatedOrder = await confirmOrder(order, payment);

  return updatedOrder;
}

// Caller gets clear feedback
try {
  const result = await processOrder('123');
  logger.info('Order processed successfully', { orderId: result.id });
} catch (error) {
  if (error instanceof OrderAlreadyProcessedError) {
    // Handle duplicate processing attempt
    logger.warn('Order already processed', { error });
  } else if (error instanceof OrderNotFoundError) {
    // Handle missing order
    logger.error('Order not found', { error });
  } else {
    // Unexpected error
    throw error;
  }
}
```

**Benefits:**
- Clear, explicit error messages
- Caller knows exactly what went wrong
- Easy to add monitoring/alerting on specific errors
- No silent failures

### Example 3: Use Type System to Prevent Null

```typescript
// Define clear contracts with types
interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];  // Array, never null/undefined
  status: OrderStatus;
  total: number;
}

interface OrderItem {
  productId: string;
  quantity: number;    // Always present
  price: number;       // Always present
}

function calculateOrderTotal(order: Order): number {
  // No defensive checks needed - type system guarantees structure
  return order.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}

// Repository guarantees the contract
class OrderRepository {
  async findById(id: string): Promise<Order | null> {
    const data = await db.orders.findOne({ id });

    if (!data) {
      return null;
    }

    // Validate and transform to guarantee Order contract
    if (!data.items || !Array.isArray(data.items)) {
      throw new InvalidOrderDataError(`Order ${id} has invalid items`);
    }

    // Return only if it matches Order contract
    return {
      id: data.id,
      customerId: data.customerId,
      items: data.items,
      status: data.status,
      total: data.total,
    };
  }
}
```

**Benefits:**
- Types document expectations
- Defensive checks only at boundaries (repository)
- Business logic trusts the contract
- Clear separation of validation and processing

### Example 4: Optional Data Should Be Explicitly Optional

```typescript
// Make optionality explicit in types
interface UserProfile {
  id: string;
  email: string;           // Required
  name: string;            // Required
  bio?: string;            // Optional - it's OK for this to be undefined
  avatarUrl?: string;      // Optional
  phoneNumber?: string;    // Optional
}

async function displayUserDashboard(userId: string): Promise<Dashboard> {
  const user = await fetchUser(userId);

  // Fail if user doesn't exist - this is an error
  if (!user) {
    throw new UserNotFoundError(`User ${userId} not found`);
  }

  // Fail if required fields are missing - data quality issue
  if (!user.email || !user.name) {
    throw new InvalidUserDataError(`User ${userId} has incomplete required data`);
  }

  // Optional chaining is appropriate for truly optional fields
  return {
    userName: user.name,                              // Required, no check
    userEmail: user.email,                            // Required, no check
    userBio: user.bio ?? 'No bio provided',          // Optional, default OK
    userAvatar: user.avatarUrl ?? '/default.png',    // Optional, default OK
    hasPhone: user.phoneNumber !== undefined,         // Optional, explicit check
  };
}
```

**Benefits:**
- Clear distinction between required and optional data
- Optional chaining only for truly optional fields
- Errors for missing required data
- Type system documents expectations

## When Defensive Code IS Appropriate

### 1. Truly Optional Callbacks

```typescript
interface ButtonProps {
  onClick?: () => void;  // Explicitly optional
  onHover?: () => void;  // Explicitly optional
}

function Button({ onClick, onHover }: ButtonProps) {
  return (
    <button
      onClick={() => onClick?.()}     // ✅ Appropriate - callback is optional
      onMouseEnter={() => onHover?.()} // ✅ Appropriate - callback is optional
    >
      Click me
    </button>
  );
}
```

### 2. User Preferences and Settings

```typescript
interface UserSettings {
  theme?: 'light' | 'dark';      // Optional preference
  language?: string;              // Optional preference
  notifications?: boolean;        // Optional preference
}

function applyUserSettings(settings: UserSettings) {
  // ✅ Appropriate - these are optional user preferences with defaults
  const theme = settings.theme ?? 'light';
  const language = settings.language ?? 'en';
  const notifications = settings.notifications ?? true;

  applyTheme(theme);
  setLanguage(language);
  toggleNotifications(notifications);
}
```

### 3. External API Responses (After Validation)

```typescript
interface ExternalAPIResponse {
  data?: {
    user?: {
      name?: string;
      email?: string;
    };
  };
}

async function fetchUserFromExternalAPI(userId: string): Promise<User> {
  const response: ExternalAPIResponse = await externalAPI.getUser(userId);

  // Validate at boundary - external data is untrusted
  if (!response.data?.user?.email) {
    throw new ExternalAPIError('External API returned incomplete user data');
  }

  // ✅ Appropriate defensive check at system boundary
  // After validation, map to our internal User type
  return {
    id: userId,
    email: response.data.user.email,
    name: response.data.user.name ?? 'Unknown',  // Name truly optional from API
  };
}
```

### 4. Graceful Degradation in UI

```tsx
interface ProductProps {
  product: Product;
  reviews?: Review[];  // Optional - page should work without reviews
}

function ProductPage({ product, reviews }: ProductProps) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <Price amount={product.price} />

      {/* ✅ Appropriate - reviews are optional feature */}
      {reviews && reviews.length > 0 && (
        <ReviewSection reviews={reviews} />
      )}
    </div>
  );
}
```

## Red Flags for Over-Defensive Code

Look for these patterns that indicate over-defensive programming:

### 1. Deep Optional Chaining

```typescript
// 🚩 Red flag - too much optional chaining
const value = obj?.prop1?.prop2?.prop3?.prop4 ?? default;

// Better - validate at boundary and trust structure
if (!obj || !obj.prop1 || !obj.prop1.prop2) {
  throw new Error('Invalid object structure');
}
const value = obj.prop1.prop2.prop3.prop4;
```

### 2. Silent Returns in Business Logic

```typescript
// 🚩 Red flag - silent failure
function processPayment(order: Order) {
  if (!order) return;
  if (!order.amount) return;
  // ... process
}

// Better - explicit errors
function processPayment(order: Order) {
  if (!order) {
    throw new InvalidArgumentError('Order is required');
  }
  if (!order.amount || order.amount <= 0) {
    throw new InvalidOrderError('Order amount must be greater than 0');
  }
  // ... process
}
```

### 3. Returning Default Values for Errors

```typescript
// 🚩 Red flag - hiding errors with defaults
function getUserEmail(userId: string): string {
  const user = findUser(userId);
  return user?.email ?? 'unknown@email.com';
}

// Better - explicit error or null
function getUserEmail(userId: string): string {
  const user = findUser(userId);
  if (!user) {
    throw new UserNotFoundError(`User ${userId} not found`);
  }
  return user.email;
}
```

### 4. Checking for Existence in Loops

```typescript
// 🚩 Red flag - defensive checks in loop
function processItems(items: Item[]) {
  for (const item of items) {
    if (item && item.id && item.name) {
      // process
    }
  }
}

// Better - validate array upfront
function processItems(items: Item[]) {
  if (!items || !Array.isArray(items)) {
    throw new InvalidArgumentError('Items must be an array');
  }

  const invalidItems = items.filter(item => !item.id || !item.name);
  if (invalidItems.length > 0) {
    throw new InvalidItemsError('Some items are missing required fields');
  }

  // Now trust and process
  for (const item of items) {
    processItem(item);
  }
}
```

## Decision Framework

Ask these questions to decide if defensive code is appropriate:

### Is the value TRULY optional?

```typescript
// ✅ Yes - callback is truly optional by design
onClick?.()

// ❌ No - user should always exist here, this is a bug
const name = user?.name ?? 'Unknown'
```

### Would you want to know if this value is missing?

```typescript
// ✅ Yes - should alert/error if order doesn't exist
if (!order) {
  throw new OrderNotFoundError();
}

// ❌ No - it's OK if user hasn't set a preference
const theme = settings.theme ?? 'default'
```

### Is this a system boundary?

```typescript
// ✅ Yes - external API data needs defensive validation
if (!externalResponse?.data?.user) {
  throw new ExternalAPIError();
}

// ❌ No - internal function calls should trust contracts
function internalFunction(order: Order) {
  // No need to check if order.items exists - type guarantees it
}
```

## Review Checklist

- [ ] Is optional chaining (`?.`) used only for truly optional values?
- [ ] Are null checks followed by explicit errors, not silent returns?
- [ ] Do functions fail fast with clear error messages?
- [ ] Are default values only used for optional preferences/settings?
- [ ] Is data validated at system boundaries (API, database)?
- [ ] Do types clearly indicate what's required vs optional?
- [ ] Can errors be traced to their source, or are they hidden?
- [ ] Would a missing value indicate a bug that should be fixed?
