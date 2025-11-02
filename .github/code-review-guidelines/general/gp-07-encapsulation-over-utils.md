# GP-7: Encapsulation Over Utils - Find the Right Owner for Behavior

**Severity:** `[CRITICAL]`

## Principle

Instead of creating utility functions that operate on data, find the right class or object to own the behavior. Avoid "util" files that become dumping grounds for loosely related functions. Behavior should live with the data it operates on.

## Why This Matters

- **Discoverability**: Methods on classes are discoverable via IDE autocomplete
- **Cohesion**: Related data and behavior stay together
- **Type Safety**: Methods have direct access to private fields, better encapsulation
- **Maintainability**: Changes to entity behavior are localized to one place
- **Prevents Bloat**: Utils files grow unbounded; classes enforce organization
- **Clear Ownership**: No ambiguity about where logic belongs

## Bad Examples

### Example 1: Util Dumping Ground

```typescript
// appointment-util.ts - grows to 500+ lines
export function convertAppointmentToLocationTimezone(
  appointment: Appointment,
  location: Location
): Date {
  const timezone = location.timezone;
  return convertTimezone(appointment.startTime, appointment.timezone, timezone);
}

export function formatAppointmentTime(appointment: Appointment): string {
  return format(appointment.startTime, 'h:mm a');
}

export function getAppointmentDuration(appointment: Appointment): number {
  return appointment.endTime.getTime() - appointment.startTime.getTime();
}

export function isAppointmentOverlapping(
  appointment1: Appointment,
  appointment2: Appointment
): boolean {
  return appointment1.startTime < appointment2.endTime &&
         appointment1.endTime > appointment2.startTime;
}

export function canCancelAppointment(
  appointment: Appointment,
  currentUser: User
): boolean {
  const hoursUntilStart = (appointment.startTime.getTime() - Date.now()) / (1000 * 60 * 60);
  return appointment.customerId === currentUser.id && hoursUntilStart > 24;
}

export function rescheduleAppointment(
  appointment: Appointment,
  newStartTime: Date
): Appointment {
  const duration = getAppointmentDuration(appointment);
  return {
    ...appointment,
    startTime: newStartTime,
    endTime: new Date(newStartTime.getTime() + duration),
  };
}

// Usage - have to know all these functions exist
const duration = getAppointmentDuration(appointment);
const localTime = convertAppointmentToLocationTimezone(appointment, location);
const canCancel = canCancelAppointment(appointment, user);
const rescheduled = rescheduleAppointment(appointment, newTime);
```

**Problems:**
- All appointment logic scattered in util file
- No discoverability - how do you know these functions exist?
- Can't extend Appointment behavior without modifying utils
- No encapsulation - everything public
- Unclear ownership - who maintains this?
- File grows unbounded

### Example 2: User Utils Chaos

```typescript
// user-util.ts
export function getUserFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

export function isUserActive(user: User): boolean {
  return user.status === 'active' && user.deletedAt === null;
}

export function getUserAge(user: User): number {
  const now = new Date();
  const birthDate = new Date(user.dateOfBirth);
  return now.getFullYear() - birthDate.getFullYear();
}

export function canUserAccessResource(user: User, resource: Resource): boolean {
  return user.role === 'admin' || resource.ownerId === user.id;
}

// Somewhere else: user-helper.ts (duplicate util file!)
export function formatUserName(user: User): string {
  return `${user.firstName} ${user.lastName}`;  // Duplicate!
}

export function getUserDisplayName(user: User): string {
  return user.preferredName || `${user.firstName} ${user.lastName}`;
}

// Usage - scattered, inconsistent
const name = getUserFullName(user);
const displayName = getUserDisplayName(user);
const age = getUserAge(user);
const canAccess = canUserAccessResource(user, resource);
```

**Problems:**
- Multiple util files for same entity (user-util.ts, user-helper.ts)
- Duplicate logic (getUserFullName vs formatUserName)
- No single source of truth
- Can't find all user-related behavior in one place

### Example 3: Order Processing Utils

```typescript
// order-util.ts
export function calculateOrderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function calculateOrderTax(order: Order): number {
  const subtotal = calculateOrderTotal(order);
  return subtotal * 0.08;
}

export function calculateOrderShipping(order: Order): number {
  const subtotal = calculateOrderTotal(order);
  return subtotal > 50 ? 0 : 10;
}

export function getOrderGrandTotal(order: Order): number {
  const subtotal = calculateOrderTotal(order);
  const tax = calculateOrderTax(order);
  const shipping = calculateOrderShipping(order);
  return subtotal + tax + shipping;
}

export function isOrderEligibleForDiscount(order: Order): boolean {
  return calculateOrderTotal(order) > 100;
}

// Usage - calculating total multiple times
const total = calculateOrderTotal(order);
const tax = calculateOrderTax(order);  // Recalculates total!
const shipping = calculateOrderShipping(order);  // Recalculates total again!
const grandTotal = getOrderGrandTotal(order);  // Recalculates everything!
```

**Problems:**
- Repeated calculations (inefficient)
- No caching or memoization possible
- Logic spread across functions
- Can't compose behavior easily

## Good Examples

### Example 1: Appointment Class Owns Behavior

```typescript
// appointment.ts
export class Appointment {
  constructor(
    private id: string,
    private customerId: string,
    private startTime: Date,
    private endTime: Date,
    private timezone: string,
    private status: AppointmentStatus
  ) {}

  // Time operations
  getLocalTime(targetTimezone: string): Date {
    return convertTimezone(this.startTime, this.timezone, targetTimezone);
  }

  getFormattedTime(): string {
    return format(this.startTime, 'h:mm a');
  }

  getDuration(): number {
    return this.endTime.getTime() - this.startTime.getTime();
  }

  // Business logic
  isOverlappingWith(other: Appointment): boolean {
    return this.startTime < other.endTime && this.endTime > other.startTime;
  }

  canBeCancelledBy(user: User): boolean {
    if (this.customerId !== user.id) {
      return false;
    }

    const hoursUntilStart = (this.startTime.getTime() - Date.now()) / (1000 * 60 * 60);
    return hoursUntilStart > 24;
  }

  reschedule(newStartTime: Date): void {
    const duration = this.getDuration();
    this.startTime = newStartTime;
    this.endTime = new Date(newStartTime.getTime() + duration);
  }

  cancel(): void {
    if (this.status === 'cancelled') {
      throw new AppointmentAlreadyCancelledError(this.id);
    }
    this.status = 'cancelled';
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getCustomerId(): string {
    return this.customerId;
  }

  getStatus(): AppointmentStatus {
    return this.status;
  }
}

// Usage - discoverable, intuitive
const duration = appointment.getDuration();
const localTime = appointment.getLocalTime(location.timezone);
const canCancel = appointment.canBeCancelledBy(user);
appointment.reschedule(newTime);
```

**Benefits:**
- All appointment behavior in one place
- Discoverable through IDE autocomplete
- Encapsulation - private fields
- Easy to extend with new methods
- Clear ownership

### Example 2: User Class with Encapsulation

```typescript
// user.ts
export class User {
  constructor(
    private id: string,
    private email: string,
    private firstName: string,
    private lastName: string,
    private preferredName: string | null,
    private dateOfBirth: Date,
    private role: UserRole,
    private status: UserStatus,
    private deletedAt: Date | null
  ) {}

  // Name operations
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getDisplayName(): string {
    return this.preferredName || this.getFullName();
  }

  getInitials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }

  // Status checks
  isActive(): boolean {
    return this.status === 'active' && this.deletedAt === null;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  // Computed properties
  getAge(): number {
    const now = new Date();
    let age = now.getFullYear() - this.dateOfBirth.getFullYear();
    const monthDiff = now.getMonth() - this.dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < this.dateOfBirth.getDate())) {
      age--;
    }

    return age;
  }

  // Authorization
  canAccessResource(resource: Resource): boolean {
    return this.isAdmin() || resource.ownerId === this.id;
  }

  canEditUser(otherUser: User): boolean {
    return this.isAdmin() || this.id === otherUser.id;
  }

  // Actions
  updateProfile(updates: ProfileUpdates): void {
    if (updates.firstName) this.firstName = updates.firstName;
    if (updates.lastName) this.lastName = updates.lastName;
    if (updates.preferredName !== undefined) this.preferredName = updates.preferredName;
  }

  deactivate(): void {
    this.status = 'inactive';
  }

  softDelete(): void {
    this.deletedAt = new Date();
    this.status = 'deleted';
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): UserRole {
    return this.role;
  }
}

// Usage - clean, discoverable
const name = user.getDisplayName();
const age = user.getAge();
const canAccess = user.canAccessResource(resource);
if (user.isActive()) {
  // ...
}
```

**Benefits:**
- Single source of truth for User behavior
- No duplicate util files
- All user logic discoverable in one place
- Strong encapsulation

### Example 3: Order Class with Calculated Properties

```typescript
// order.ts
export class Order {
  private subtotal: number | null = null;
  private tax: number | null = null;
  private shipping: number | null = null;
  private grandTotal: number | null = null;

  constructor(
    private id: string,
    private customerId: string,
    private items: OrderItem[],
    private status: OrderStatus
  ) {
    // Calculate totals once at construction
    this.calculateTotals();
  }

  private calculateTotals(): void {
    this.subtotal = this.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    this.tax = this.subtotal * TAX_RATE;
    this.shipping = this.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
    this.grandTotal = this.subtotal + this.tax + this.shipping;
  }

  // Getters - no recalculation needed
  getSubtotal(): number {
    return this.subtotal!;
  }

  getTax(): number {
    return this.tax!;
  }

  getShipping(): number {
    return this.shipping!;
  }

  getGrandTotal(): number {
    return this.grandTotal!;
  }

  // Business logic
  isEligibleForDiscount(): boolean {
    return this.subtotal! > DISCOUNT_THRESHOLD;
  }

  applyDiscount(discountPercent: number): void {
    this.subtotal = this.subtotal! * (1 - discountPercent / 100);
    this.calculateTotals(); // Recalculate dependent values
  }

  addItem(item: OrderItem): void {
    this.items.push(item);
    this.calculateTotals(); // Recalculate
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter(item => item.id !== itemId);
    this.calculateTotals(); // Recalculate
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getItems(): OrderItem[] {
    return [...this.items]; // Return copy
  }

  getStatus(): OrderStatus {
    return this.status;
  }
}

// Usage - efficient, clean
const total = order.getSubtotal();
const tax = order.getTax();  // No recalculation
const shipping = order.getShipping();  // No recalculation
const grandTotal = order.getGrandTotal();  // No recalculation
```

**Benefits:**
- Calculated once, cached
- No repeated calculations
- Clear ownership of calculation logic
- Easy to maintain consistency

## When Utils ARE Appropriate

Utils are appropriate for cross-cutting concerns and pure functions without natural entity ownership:

### 1. Cross-Cutting Utilities

```typescript
// logger.ts - ✅ Good use of util
export const logger = {
  info(message: string, meta?: object): void {
    console.log(JSON.stringify({ level: 'info', message, ...meta }));
  },
  error(message: string, error?: Error, meta?: object): void {
    console.error(JSON.stringify({ level: 'error', message, error, ...meta }));
  },
  warn(message: string, meta?: object): void {
    console.warn(JSON.stringify({ level: 'warn', message, ...meta }));
  },
};

// config.ts - ✅ Good use of util
export const config = {
  get(key: string): string | undefined {
    return process.env[key];
  },
  require(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new ConfigError(`Required config ${key} is missing`);
    }
    return value;
  },
};
```

### 2. Pure Mathematical Functions

```typescript
// math-utils.ts - ✅ Good use of util
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function roundToDecimal(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}
```

### 3. Date/Time Pure Functions

```typescript
// date-utils.ts - ✅ Good use of util
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function diffInDays(date1: Date, date2: Date): number {
  const diff = date1.getTime() - date2.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}
```

### 4. Format/Parse Functions

```typescript
// currency-utils.ts - ✅ Good use of util
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]+/g, ''));
}
```

## Migration Strategy: From Utils to Classes

### Step 1: Identify Entity

```typescript
// Before: appointment-util.ts
export function getAppointmentDuration(appointment: Appointment): number {
  return appointment.endTime.getTime() - appointment.startTime.getTime();
}

// After: Identify that Appointment is the natural owner
class Appointment {
  getDuration(): number {
    return this.endTime.getTime() - this.startTime.getTime();
  }
}
```

### Step 2: Move Related Functions

```typescript
// Before: Multiple scattered utils
// appointment-util.ts
export function formatAppointmentTime(appointment: Appointment): string { }
export function rescheduleAppointment(appointment: Appointment, time: Date): Appointment { }

// appointment-validator.ts
export function canCancelAppointment(appointment: Appointment, user: User): boolean { }

// After: All in Appointment class
class Appointment {
  getFormattedTime(): string { }
  reschedule(newTime: Date): void { }
  canBeCancelledBy(user: User): boolean { }
}
```

### Step 3: Update Call Sites

```typescript
// Before
const duration = getAppointmentDuration(appointment);
const formatted = formatAppointmentTime(appointment);
const canCancel = canCancelAppointment(appointment, user);

// After
const duration = appointment.getDuration();
const formatted = appointment.getFormattedTime();
const canCancel = appointment.canBeCancelledBy(user);
```

## Red Flags for Util Abuse

### 1. Util File Named After Entity

```typescript
// 🚩 Red flag
// user-util.ts
// order-util.ts
// appointment-util.ts

// Better: Create entity classes
// user.ts with User class
// order.ts with Order class
// appointment.ts with Appointment class
```

### 2. Function Takes Entity as First Param

```typescript
// 🚩 Red flag - should be a method
export function getUserFullName(user: User): string { }
export function calculateOrderTotal(order: Order): number { }

// Better
class User {
  getFullName(): string { }
}
class Order {
  calculateTotal(): number { }
}
```

### 3. Multiple Util Files for Same Entity

```typescript
// 🚩 Red flag
// user-util.ts
// user-helper.ts
// user-formatter.ts
// user-validator.ts

// Better - consolidate into User class
class User {
  // All user behavior here
}
```

### 4. Passing Entity Fields Instead of Entity

```typescript
// 🚩 Red flag
export function calculateAge(dateOfBirth: Date): number { }

// Caller
const age = calculateAge(user.dateOfBirth);

// Better
class User {
  getAge(): number {
    // Calculate from this.dateOfBirth
  }
}

// Caller
const age = user.getAge();
```

## Review Checklist

- [ ] Are there util files named after entities (user-util.ts, order-util.ts)?
- [ ] Do util functions take an entity as the first parameter?
- [ ] Could functions be methods on the entity they operate on?
- [ ] Are there multiple util files for the same entity?
- [ ] Is behavior discoverable, or must you know function names?
- [ ] Are utils limited to cross-cutting concerns and pure functions?
- [ ] Would moving logic to a class improve encapsulation?
- [ ] Is there duplicate logic across util files?
