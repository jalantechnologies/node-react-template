# BE-3: Single Update Function

**Severity:** `CRITICAL`

## Principle

Instead of exposing multiple functions like update_field_1, update_field_2, prefer one update function accepting params object with optional fields.

## Why This Matters

- **API simplicity**: One update endpoint/function instead of many specialized ones
- **Flexibility**: Clients can update multiple fields in a single request
- **Maintainability**: Adding new updatable fields doesn't require new functions
- **Atomicity**: Multiple field updates happen in one database transaction
- **Reduced code**: Less boilerplate for each updateable field
- **Better testing**: One function to test instead of many

## Bad Example

```typescript
// Separate function for each field - anti-pattern
class AccountWriter {
  async updateFirstName(accountId: string, firstName: string): Promise<Account> {
    return await AccountModel.findByIdAndUpdate(
      accountId,
      { firstName },
      { new: true }
    );
  }

  async updateLastName(accountId: string, lastName: string): Promise<Account> {
    return await AccountModel.findByIdAndUpdate(
      accountId,
      { lastName },
      { new: true }
    );
  }

  async updateEmail(accountId: string, email: string): Promise<Account> {
    return await AccountModel.findByIdAndUpdate(
      accountId,
      { email },
      { new: true }
    );
  }

  async updatePhoneNumber(accountId: string, phoneNumber: string): Promise<Account> {
    return await AccountModel.findByIdAndUpdate(
      accountId,
      { phoneNumber },
      { new: true }
    );
  }

  // ... 10+ more similar functions
}

// Multiple API endpoints
router.patch('/accounts/:id/first-name', updateFirstName);
router.patch('/accounts/:id/last-name', updateLastName);
router.patch('/accounts/:id/email', updateEmail);
router.patch('/accounts/:id/phone-number', updatePhoneNumber);
// ... many more routes

// Client needs multiple requests to update multiple fields
await fetch('/accounts/123/first-name', {
  method: 'PATCH',
  body: JSON.stringify({ firstName: 'John' })
});
await fetch('/accounts/123/last-name', {
  method: 'PATCH',
  body: JSON.stringify({ lastName: 'Doe' })
});
await fetch('/accounts/123/email', {
  method: 'PATCH',
  body: JSON.stringify({ email: 'john@example.com' })
});
```

**Problems:**
- Massive code duplication (one function per field)
- Explosion of API endpoints
- Requires multiple HTTP requests for multi-field updates
- Each update is a separate database transaction (not atomic)
- Adding new fields requires new functions and routes
- More surface area for bugs and testing
- Inconsistent error handling across functions

## Good Example

```typescript
// Single update function with params object
interface UpdateAccountParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  // ... other optional fields
}

class AccountWriter {
  async updateAccount(
    accountId: string,
    params: UpdateAccountParams
  ): Promise<Account> {
    // Build update object with only provided fields
    const updateFields: Partial<Account> = {};

    if (params.firstName !== undefined) {
      updateFields.firstName = params.firstName;
    }
    if (params.lastName !== undefined) {
      updateFields.lastName = params.lastName;
    }
    if (params.email !== undefined) {
      updateFields.email = params.email;
    }
    if (params.phoneNumber !== undefined) {
      updateFields.phoneNumber = params.phoneNumber;
    }

    const updatedAccount = await AccountModel.findByIdAndUpdate(
      accountId,
      updateFields,
      { new: true }
    );

    if (!updatedAccount) {
      throw new AccountNotFoundError(accountId);
    }

    return updatedAccount;
  }
}

// Single API endpoint
router.patch('/accounts/:id', AccountController.updateAccount);

// Service layer
class AccountService {
  static async updateAccount(
    accountId: string,
    params: UpdateAccountParams
  ): Promise<Account> {
    return await AccountWriter.updateAccount(accountId, params);
  }
}

// Client can update one or multiple fields in single request
await fetch('/accounts/123', {
  method: 'PATCH',
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  })
});
```

**Benefits:**
- Single function handles all field updates
- One API endpoint instead of many
- Update multiple fields atomically in one request
- Adding new fields just requires updating the params interface
- Less code, easier to maintain
- Single place for validation and error handling
- Better performance (one request vs many)

## Additional Context

### Validation in Single Update Function

```typescript
interface UpdateAccountParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

class AccountWriter {
  async updateAccount(
    accountId: string,
    params: UpdateAccountParams
  ): Promise<Account> {
    // Validate only the fields that are being updated
    if (params.email !== undefined) {
      this.validateEmail(params.email);
    }
    if (params.phoneNumber !== undefined) {
      this.validatePhoneNumber(params.phoneNumber);
    }

    // Build update object
    const updateFields: Partial<Account> = {};
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        updateFields[key] = params[key];
      }
    });

    return await AccountModel.findByIdAndUpdate(
      accountId,
      updateFields,
      { new: true }
    );
  }

  private validateEmail(email: string): void {
    // Email validation logic
  }

  private validatePhoneNumber(phoneNumber: string): void {
    // Phone validation logic
  }
}
```

### When to Create Separate Update Functions

There are valid exceptions when a separate function makes sense:

1. **Complex business logic**: If updating a field requires significant additional logic
   ```typescript
   // OK: Complex password reset with hashing, validation, notification
   async resetPassword(accountId: string, params: ResetPasswordParams) {
     const hashedPassword = await AccountUtil.hashPassword(params.newPassword);
     // ... additional validation
     // ... send notification
     return await this.updateAccount(accountId, { hashedPassword });
   }
   ```

2. **Different authorization**: If some fields require different permissions
   ```typescript
   // OK: Admin-only function for sensitive updates
   async updateAccountRole(accountId: string, role: string) {
     // Check admin permissions
     return await this.updateAccount(accountId, { role });
   }
   ```

3. **Side effects**: If updating requires orchestrating other services
   ```typescript
   // OK: Email change requires verification flow
   async updateEmailWithVerification(accountId: string, newEmail: string) {
     // Send verification email
     // Create pending email change record
     // ... complex flow
   }
   ```

But for simple field updates, use the single update function.

### Controller Example

```typescript
class AccountController {
  static async updateAccount(req: Request, res: Response) {
    const accountId = req.params.id;
    const params: UpdateAccountParams = req.body;

    // Single function handles all updates
    const updatedAccount = await AccountService.updateAccount(accountId, params);

    res.json(AccountSerializer.serialize(updatedAccount));
  }
}
```

### Type Safety

Use TypeScript to enforce which fields are updatable:

```typescript
// Define exactly which fields can be updated
interface UpdateAccountParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  // Note: id, createdAt, etc. are NOT here - not updatable
}

// Use Partial<Pick<>> for more control
type UpdateAccountParams = Partial<Pick<Account,
  'firstName' | 'lastName' | 'email' | 'phoneNumber'
>>;
```

## Review Checklist

- [ ] Single update function instead of multiple field-specific functions
- [ ] Update function accepts params object with optional fields
- [ ] Params interface clearly defines updatable fields
- [ ] Single PATCH endpoint (e.g., `PATCH /accounts/:id`)
- [ ] Validation handles partial updates correctly
- [ ] Only provided fields are updated (undefined fields ignored)
- [ ] Complex updates with business logic are separate functions (documented exceptions)
- [ ] Type safety ensures only valid fields can be updated
