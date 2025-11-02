# GP-8: Audit for Duplication - Search Before Adding New Functions

**Severity:** `[CRITICAL]`

## Principle

Before adding new functions, methods, or components, search the codebase for existing similar implementations. When duplication is found, refactor to reuse rather than duplicate. Duplication increases maintenance burden and creates inconsistency bugs.

## Why This Matters

- **Maintenance**: One bug fix is better than fixing the same bug in 5 places
- **Consistency**: Single implementation ensures consistent behavior across the app
- **Code Bloat**: Duplication makes codebases larger and harder to navigate
- **Bug Risk**: Subtle differences in duplicates create inconsistent behavior
- **Discovery**: Developers copy-paste because they don't know similar code exists

## Bad Examples

### Example 1: Duplicate Formatting Functions

```typescript
// user-service.ts
function formatUserName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

// customer-service.ts
function getCustomerFullName(customer: Customer): string {
  return `${customer.firstName} ${customer.lastName}`;
}

// admin-panel.tsx
function displayName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

// profile-page.tsx
const userName = `${user.firstName} ${user.lastName}`;

// order-details.tsx
const customerName = user.firstName + ' ' + user.lastName;
```

**Problems:**
- Same logic implemented 5 different ways
- Inconsistent naming: formatUserName, getCustomerFullName, displayName
- If business rule changes (e.g., add middle name), must update 5 places
- Some implementations might have bugs others don't

### Example 2: Duplicate Validation Logic

```typescript
// registration-form.tsx
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// user-settings.tsx
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// invite-user.tsx
function checkEmail(email: string): boolean {
  if (!email.includes('@')) return false;
  if (!email.includes('.')) return false;
  return true;
}

// api/users.ts
function validateUserEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}
```

**Problems:**
- Four different email validation implementations
- Different regex patterns - some more strict than others
- Inconsistent behavior across the app
- User might be allowed to register with email that fails validation elsewhere

### Example 3: Duplicate Date Calculations

```typescript
// appointment-service.ts
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// subscription-service.ts
function addDaysToDate(date: Date, numDays: number): Date {
  const newDate = new Date(date.getTime());
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

// reminder-scheduler.ts
function calculateFutureDate(startDate: Date, daysToAdd: number): Date {
  const futureDate = new Date(startDate);
  futureDate.setDate(startDate.getDate() + daysToAdd);
  return futureDate;
}

// trial-period.ts
const expiryDate = new Date(startDate);
expiryDate.setDate(expiryDate.getDate() + 30);
```

**Problems:**
- Same date math implemented 4 times
- Slightly different implementations (new Date(date) vs new Date(date.getTime()))
- Hard to find when you need this functionality
- Can't improve or fix bugs in one place

### Example 4: Duplicate React Components

```tsx
// components/UserAvatar.tsx
function UserAvatar({ user }: { user: User }) {
  return (
    <div className="avatar">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.name} />
      ) : (
        <div className="avatar-initials">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}

// components/ProfilePicture.tsx
function ProfilePicture({ user }: { user: User }) {
  return (
    <div className="profile-pic">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.name} />
      ) : (
        <span className="initials">
          {user.name[0].toUpperCase()}
        </span>
      )}
    </div>
  );
}

// components/CustomerIcon.tsx
function CustomerIcon({ customer }: { customer: Customer }) {
  if (customer.photoUrl) {
    return <img src={customer.photoUrl} alt={customer.name} />;
  }
  return <div className="icon">{customer.name.substring(0, 1).toUpperCase()}</div>;
}
```

**Problems:**
- Three components doing the same thing with minor variations
- Different class names, same functionality
- Inconsistent user experience
- Must update three places to change avatar logic

## Good Examples

### Example 1: Centralized Formatting

```typescript
// user.ts - Single source of truth
export class User {
  constructor(
    private id: string,
    private firstName: string,
    private lastName: string,
    private middleName?: string
  ) {}

  getFullName(): string {
    if (this.middleName) {
      return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }
    return `${this.firstName} ${this.lastName}`;
  }

  getInitials(): string {
    if (this.middleName) {
      return `${this.firstName[0]}${this.middleName[0]}${this.lastName[0]}`.toUpperCase();
    }
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }

  getFormalName(): string {
    return `${this.lastName}, ${this.firstName}`;
  }
}

// Usage everywhere
const name = user.getFullName();
const initials = user.getInitials();
const formal = user.getFormalName();
```

**Benefits:**
- Single implementation
- Discoverable via autocomplete
- Change once, applies everywhere
- Handles edge cases (middle name) consistently

### Example 2: Shared Validation Library

```typescript
// validation/email-validator.ts
export class EmailValidator {
  // RFC 5322 compliant regex
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  static isValid(email: string): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }

    const trimmed = email.trim();
    if (trimmed.length === 0) {
      return false;
    }

    return this.EMAIL_REGEX.test(trimmed);
  }

  static validate(email: string): ValidationResult {
    if (!this.isValid(email)) {
      return {
        valid: false,
        error: 'Please enter a valid email address',
      };
    }

    return { valid: true };
  }

  static normalize(email: string): string {
    return email.trim().toLowerCase();
  }
}

// Usage everywhere
if (!EmailValidator.isValid(email)) {
  throw new ValidationError('Invalid email');
}

const normalizedEmail = EmailValidator.normalize(email);
```

**Benefits:**
- Single validation logic
- Consistent across entire app
- Easy to update regex if requirements change
- Additional helper methods (normalize)

### Example 3: Centralized Date Utilities

```typescript
// utils/date-utils.ts
export class DateUtils {
  static addDays(date: Date, days: number): Date {
    const result = new Date(date.getTime()); // Clone to avoid mutation
    result.setDate(result.getDate() + days);
    return result;
  }

  static addMonths(date: Date, months: number): Date {
    const result = new Date(date.getTime());
    result.setMonth(result.getMonth() + months);
    return result;
  }

  static diffInDays(date1: Date, date2: Date): number {
    const diff = date1.getTime() - date2.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  static isToday(date: Date): boolean {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  static isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  static isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  static getStartOfDay(date: Date): Date {
    const result = new Date(date.getTime());
    result.setHours(0, 0, 0, 0);
    return result;
  }

  static getEndOfDay(date: Date): Date {
    const result = new Date(date.getTime());
    result.setHours(23, 59, 59, 999);
    return result;
  }
}

// Usage everywhere
const expiryDate = DateUtils.addDays(startDate, 30);
const reminderDate = DateUtils.addMonths(purchaseDate, 1);
const daysDiff = DateUtils.diffInDays(endDate, startDate);
```

**Benefits:**
- Comprehensive date utilities in one place
- Consistent behavior (always clones dates to avoid mutation)
- Easy to discover related functions
- Can add more as needed

### Example 4: Reusable Avatar Component

```tsx
// components/Avatar.tsx
interface AvatarProps {
  user: User;
  size?: 'small' | 'medium' | 'large';
  showOnlineStatus?: boolean;
}

export function Avatar({ user, size = 'medium', showOnlineStatus = false }: AvatarProps) {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-12 h-12 text-sm',
    large: 'w-16 h-16 text-base',
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]}`}>
      <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.getFullName()}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-semibold text-gray-700">
            {user.getInitials()}
          </span>
        )}
      </div>

      {showOnlineStatus && user.isOnline && (
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
      )}
    </div>
  );
}

// Usage everywhere - consistent
<Avatar user={user} size="small" />
<Avatar user={user} size="large" showOnlineStatus />
```

**Benefits:**
- Single component for all avatar displays
- Consistent styling and behavior
- Configurable with props
- Easy to add features (online status, badges, etc.)

## Search Before You Code Process

### Step 1: Search for Similar Functionality

Before writing a new function, search for existing implementations:

```bash
# Searching for email validation
git grep -i "email.*valid"
git grep -i "validate.*email"

# Searching for date utilities
git grep -i "adddays\|add.*days"
git grep -i "date.*add"

# Searching for user name formatting
git grep -i "firstname.*lastname"
git grep -i "fullname\|full.*name"
```

### Step 2: Check Common Locations

Look in these places for existing utilities:

```typescript
// Check utils/helpers directories
utils/
  date-utils.ts
  string-utils.ts
  validation.ts
  formatters.ts

// Check class methods
models/
  user.ts          // User.getFullName()
  order.ts         // Order.calculateTotal()

// Check shared components
components/
  common/
    Avatar.tsx
    Button.tsx
```

### Step 3: Evaluate Existing Implementation

When you find similar code, ask:

```typescript
// Questions to ask:
// 1. Is this exactly what I need?
// 2. Can I use it as-is?
// 3. Can I extend it to support my use case?
// 4. Should I refactor it to be more generic?

// Example: Found this
function formatUserName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

// My need: Format with middle name
// Option 1: Extend existing function
function formatUserName(user: User, includeMiddle = false): string {
  if (includeMiddle && user.middleName) {
    return `${user.firstName} ${user.middleName} ${user.lastName}`;
  }
  return `${user.firstName} ${user.lastName}`;
}

// Option 2: Move to User class (better)
class User {
  getFullName(includeMiddle = false): string {
    if (includeMiddle && this.middleName) {
      return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }
    return `${this.firstName} ${this.lastName}`;
  }
}
```

### Step 4: Refactor Duplicates

When you find duplicates, consolidate them:

```typescript
// Before: Found 3 implementations
function formatUserName(user: User): string { }
function getCustomerFullName(customer: Customer): string { }
function displayName(user: User): string { }

// After: Consolidate to User class
class User {
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Update all call sites
// Before:
const name1 = formatUserName(user);
const name2 = getCustomerFullName(customer);
const name3 = displayName(user);

// After:
const name1 = user.getFullName();
const name2 = customer.getFullName();
const name3 = user.getFullName();
```

## When Duplication Is Acceptable

Sometimes what looks like duplication isn't:

### 1. Different Domain Concepts

```typescript
// ✅ Acceptable - different business logic
class Order {
  calculateTotal(): number {
    // Order total: items + tax + shipping
    return this.items.reduce(...) + this.tax + this.shipping;
  }
}

class Invoice {
  calculateTotal(): number {
    // Invoice total: line items + adjustments - credits
    return this.lineItems.reduce(...) + this.adjustments - this.credits;
  }
}
```

### 2. Different Validation Rules

```typescript
// ✅ Acceptable - different validation requirements
class UserRegistration {
  validatePassword(password: string): boolean {
    // Registration: strict requirements
    return password.length >= 12 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[^A-Za-z0-9]/.test(password);
  }
}

class PasswordReset {
  validatePassword(password: string): boolean {
    // Reset: more lenient (for existing users)
    return password.length >= 8 &&
           /[A-Za-z]/.test(password) &&
           /[0-9]/.test(password);
  }
}
```

### 3. Intentional Decoupling

```typescript
// ✅ Acceptable - decoupled modules
// payment-service/date-utils.ts
function addDays(date: Date, days: number): Date {
  // Payment service doesn't depend on shared utils
}

// core/utils/date-utils.ts
function addDays(date: Date, days: number): Date {
  // Shared utility
}
```

## Common Duplication Patterns to Watch

### 1. Copy-Paste From Other Files

```typescript
// 🚩 Red flag - code copied from another file
// If you're copying code, extract to shared location instead

// Before: Copying
function processUserData(user: User) {
  // Copied from customer-service.ts
  const formatted = `${user.firstName} ${user.lastName}`;
  // ...
}

// After: Extract and reuse
function processUserData(user: User) {
  const formatted = user.getFullName();
  // ...
}
```

### 2. Similar Function Names

```typescript
// 🚩 Red flag - similar names suggest duplication
formatUserName()
getUserFullName()
displayUserName()
userFullName()

// Better: Single implementation
user.getFullName()
```

### 3. Same Regex Patterns

```typescript
// 🚩 Red flag - same regex in multiple places
/^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Email validation
/^\d{3}-\d{2}-\d{4}$/          // SSN format
/^[0-9]{5}(?:-[0-9]{4})?$/     // ZIP code

// Better: Named constants or validator classes
EmailValidator.REGEX
SSNValidator.REGEX
ZipCodeValidator.REGEX
```

### 4. Repeated Component Patterns

```tsx
// 🚩 Red flag - repeated JSX patterns
// Multiple places with this pattern
<div className="card">
  <div className="card-header">{title}</div>
  <div className="card-body">{children}</div>
</div>

// Better: Extract to component
<Card title={title}>{children}</Card>
```

## Tools for Finding Duplication

### 1. IDE Search

```typescript
// Use IDE's "Find in Files" to search for:
// - Function names
// - Class names
// - Regex patterns
// - Component names
// - Import statements
```

### 2. Git Grep

```bash
# Find email validation
git grep -i "email.*@.*\."

# Find date calculations
git grep -i "setDate\|getDate"

# Find user name formatting
git grep -i "firstName.*lastName"
```

### 3. Code Review Checklist

During code review, ask:
- [ ] Did you search for similar functions before writing this?
- [ ] Are there other implementations that do the same thing?
- [ ] Could this be extracted to a shared utility/class?
- [ ] If this is similar to existing code, why is it different?

## Review Checklist

- [ ] Did you search the codebase before adding new functions?
- [ ] Are there multiple functions with similar names doing the same thing?
- [ ] Could duplicate implementations be consolidated?
- [ ] Are there duplicate validation rules or formatting functions?
- [ ] Are there similar React components that could be unified?
- [ ] Would extracting common logic improve maintainability?
- [ ] Are duplicates truly different, or just slight variations?
- [ ] Could a more generic implementation serve multiple use cases?
