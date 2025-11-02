# BE-1: Module Independence

**Severity:** `CRITICAL`

## Principle

One module should not depend on internals of other modules. Only import from public API (index.ts exports), never from internal/ directories.

## Why This Matters

- **Encapsulation**: Module internals can be refactored without breaking other modules
- **Maintainability**: Clear boundaries make it easier to understand dependencies
- **Testability**: Public APIs are stable contracts that can be mocked reliably
- **Scalability**: Teams can work on modules independently without coordination overhead
- **Code ownership**: Internal implementation details remain private to the module

## Bad Example

```typescript
// Importing from another module's internal directory
import AccountReader from 'backend/modules/account/internal/account-reader';
import AccountWriter from 'backend/modules/account/internal/account-writer';
import { AccountRepository } from 'backend/modules/account/internal/store/account-repository';

// Using internal implementation details
class TaskService {
  async createTask(accountId: string) {
    const account = await AccountReader.getAccountById({ id: accountId });
    // ... task creation logic
  }
}
```

**Problems:**
- Breaks module encapsulation by accessing internal implementation
- Creates tight coupling to internal structure
- Internal refactoring in account module will break task module
- Makes it unclear what the public API contract is
- Violates the module boundary established by the architecture

## Good Example

```typescript
// Only import from the module's public API (index.ts)
import { AccountService, Account, GetAccountParams } from 'backend/modules/account';

// Use the public service interface
class TaskService {
  async createTask(accountId: string) {
    const account = await AccountService.getAccountById({ id: accountId });
    // ... task creation logic
  }
}
```

**Benefits:**
- Respects module boundaries and encapsulation
- Depends only on stable public API contracts
- Internal refactoring won't affect this module
- Clear understanding of module dependencies
- Easier to mock for testing (mock AccountService, not internals)

## Additional Context

### Module Structure Reference

Each module follows this structure:
```
module-name/
├── module-name-service.ts   # Public service API
├── internal/                # Private implementation (DO NOT import from here)
│   ├── store/
│   ├── *-reader.ts
│   ├── *-writer.ts
│   └── *-util.ts
├── types.ts                 # Public type definitions
└── index.ts                 # Public exports ONLY
```

### What Should Be in index.ts

```typescript
// Good: Export public API only
export { default as AccountService } from './account-service';
export * from './types';

// Bad: Do NOT export internal classes
// export { default as AccountReader } from './internal/account-reader';
```

### Exception: Within the Same Module

It's acceptable to import from `internal/` **within the same module**:

```typescript
// In account/account-service.ts - this is OK
import AccountReader from 'backend/modules/account/internal/account-reader';
import AccountWriter from 'backend/modules/account/internal/account-writer';
```

But other modules must use the public API:

```typescript
// In task/task-service.ts - use public API
import { AccountService } from 'backend/modules/account';
```

## Review Checklist

- [ ] No imports from `internal/` directories of other modules
- [ ] Only imports from module's `index.ts` or direct public files
- [ ] Module's `index.ts` only exports public API (service, types)
- [ ] Internal classes/functions are not exported in `index.ts`
- [ ] Cross-module dependencies use the public service layer
