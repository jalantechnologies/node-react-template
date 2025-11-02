# BE-4: REST Not RPC

**Severity:** `CRITICAL`

## Principle

Model APIs using REST/CRUD (resources/nouns), not functional endpoints (actions/verbs).

## Why This Matters

- **Consistency**: RESTful APIs follow predictable patterns across all resources
- **Discoverability**: Standard HTTP methods (GET, POST, PATCH, DELETE) convey intent
- **Caching**: REST leverages HTTP caching mechanisms effectively
- **Tooling**: REST APIs work better with standard tools and frameworks
- **Scalability**: Resource-oriented design scales better than action-oriented
- **Industry standard**: REST is the widely accepted standard for web APIs

## Bad Example

```typescript
// RPC-style - action/verb-based endpoints
router.post('/signup', signup);                    // Action: signup
router.post('/login', login);                      // Action: login
router.post('/logout', logout);                    // Action: logout
router.post('/resetPassword', resetPassword);      // Action: resetPassword
router.post('/activateAccount', activateAccount);  // Action: activateAccount
router.post('/sendEmail', sendEmail);              // Action: sendEmail
router.post('/verifyEmail', verifyEmail);          // Action: verifyEmail
router.post('/changePassword', changePassword);    // Action: changePassword
router.post('/updateProfile', updateProfile);      // Action: updateProfile
router.post('/deleteAccount', deleteAccount);      // Action: deleteAccount

// Controller with functional actions
class AccountController {
  static async signup(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    const account = await AccountService.signup(firstName, lastName, email, password);
    res.json(account);
  }

  static async resetPassword(req: Request, res: Response) {
    const { email } = req.body;
    await AccountService.resetPassword(email);
    res.json({ message: 'Password reset email sent' });
  }

  static async activateAccount(req: Request, res: Response) {
    const { token } = req.body;
    await AccountService.activateAccount(token);
    res.json({ message: 'Account activated' });
  }
}
```

**Problems:**
- Endpoints are actions/verbs instead of resources/nouns
- Everything uses POST regardless of the operation type
- No clear resource hierarchy or relationships
- Can't leverage HTTP caching
- Inconsistent patterns make API harder to learn
- Doesn't follow REST conventions
- Poor integration with REST tooling and frameworks

## Good Example

```typescript
// REST-style - resource/noun-based endpoints
// Accounts resource
router.post('/accounts', AccountController.createAccount);           // signup → create account
router.get('/accounts/:id', AccountController.getAccount);
router.patch('/accounts/:id', AccountController.updateAccount);      // updateProfile → update account
router.delete('/accounts/:id', AccountController.deleteAccount);     // deleteAccount → delete account

// Account sub-resources and actions
router.post('/accounts/:id/activation', AccountController.activateAccount);         // activateAccount
router.post('/accounts/:id/password-reset', AccountController.initiatePasswordReset); // resetPassword
router.patch('/accounts/:id/password', AccountController.updatePassword);            // changePassword

// Sessions resource (for login/logout)
router.post('/sessions', SessionController.createSession);           // login → create session
router.delete('/sessions/:id', SessionController.deleteSession);     // logout → delete session

// Email verifications resource
router.post('/email-verifications', EmailController.createVerification);  // sendEmail
router.post('/email-verifications/:id/confirmation', EmailController.confirmVerification); // verifyEmail

// Controller with resource-oriented methods
class AccountController {
  // POST /accounts - Create new account (signup)
  static async createAccount(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    const account = await AccountService.createAccount({
      firstName,
      lastName,
      email,
      password
    });
    res.status(201).json(AccountSerializer.serialize(account));
  }

  // PATCH /accounts/:id - Update account (updateProfile)
  static async updateAccount(req: Request, res: Response) {
    const accountId = req.params.id;
    const updates = req.body;
    const account = await AccountService.updateAccount(accountId, updates);
    res.json(AccountSerializer.serialize(account));
  }

  // POST /accounts/:id/activation - Activate account
  static async activateAccount(req: Request, res: Response) {
    const accountId = req.params.id;
    const { token } = req.body;
    await AccountService.activateAccount(accountId, token);
    res.status(204).send();
  }

  // POST /accounts/:id/password-reset - Initiate password reset
  static async initiatePasswordReset(req: Request, res: Response) {
    const accountId = req.params.id;
    await AccountService.initiatePasswordReset(accountId);
    res.status(204).send();
  }

  // PATCH /accounts/:id/password - Update password
  static async updatePassword(req: Request, res: Response) {
    const accountId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    await AccountService.updatePassword(accountId, currentPassword, newPassword);
    res.status(204).send();
  }

  // DELETE /accounts/:id - Delete account
  static async deleteAccount(req: Request, res: Response) {
    const accountId = req.params.id;
    await AccountService.deleteAccount(accountId);
    res.status(204).send();
  }
}
```

**Benefits:**
- Clear resource hierarchy (accounts, sessions, verifications)
- Proper HTTP methods convey operation semantics
- Standard REST patterns are easy to understand
- Cacheable GET requests
- Idempotent PUT/PATCH operations
- Predictable URL structure
- Works well with REST frameworks and tools

## Additional Context

### REST vs RPC Translation Guide

| RPC Style (Bad) | REST Style (Good) | HTTP Method |
|----------------|-------------------|-------------|
| POST /signup | POST /accounts | POST |
| POST /login | POST /sessions | POST |
| POST /logout | DELETE /sessions/:id | DELETE |
| POST /resetPassword | POST /accounts/:id/password-reset | POST |
| POST /activateAccount | POST /accounts/:id/activation | POST |
| POST /updateProfile | PATCH /accounts/:id | PATCH |
| POST /deleteAccount | DELETE /accounts/:id | DELETE |
| POST /getUser | GET /accounts/:id | GET |
| POST /listUsers | GET /accounts | GET |
| POST /sendEmail | POST /email-verifications | POST |
| POST /verifyEmail | POST /email-verifications/:id/confirmation | POST |

### HTTP Method Semantics

Use the correct HTTP method for each operation:

- **GET**: Retrieve resources (safe, idempotent, cacheable)
  ```typescript
  GET /accounts/:id        // Get single account
  GET /accounts            // List accounts
  GET /accounts/:id/tasks  // Get account's tasks
  ```

- **POST**: Create new resources or trigger actions
  ```typescript
  POST /accounts                    // Create account
  POST /accounts/:id/activation     // Trigger activation action
  POST /sessions                    // Create session (login)
  ```

- **PATCH**: Partial update of resources
  ```typescript
  PATCH /accounts/:id          // Update account fields
  PATCH /accounts/:id/password // Update password
  ```

- **PUT**: Complete replacement of resources (less common)
  ```typescript
  PUT /accounts/:id  // Replace entire account
  ```

- **DELETE**: Remove resources
  ```typescript
  DELETE /accounts/:id  // Delete account
  DELETE /sessions/:id  // Delete session (logout)
  ```

### Resource Naming Conventions

1. **Use nouns, not verbs**
   - Good: `/accounts`, `/tasks`, `/sessions`
   - Bad: `/getAccount`, `/createTask`, `/doLogin`

2. **Use plural nouns for collections**
   - Good: `/accounts`, `/tasks`
   - Bad: `/account`, `/task`

3. **Use sub-resources for relationships**
   - Good: `/accounts/:id/tasks`, `/organizations/:id/members`
   - Bad: `/getTasksForAccount`, `/getOrgMembers`

4. **Use actions as sub-resources when needed**
   - Good: `/accounts/:id/activation`, `/accounts/:id/password-reset`
   - Acceptable for non-CRUD operations

### Status Codes

Use proper HTTP status codes:

```typescript
// Success
200 OK              // GET, PATCH (with response body)
201 Created         // POST (created new resource)
204 No Content      // DELETE, PATCH (no response body)

// Client errors
400 Bad Request     // Invalid input
401 Unauthorized    // Not authenticated
403 Forbidden       // Not authorized
404 Not Found       // Resource doesn't exist
409 Conflict        // Duplicate or conflicting resource

// Server errors
500 Internal Server Error
```

### When Actions Are Acceptable

Some operations don't fit pure CRUD. Use sub-resource actions:

```typescript
// OK: Actions that don't map to CRUD
POST /accounts/:id/activation        // Activate account
POST /accounts/:id/password-reset    // Initiate password reset
POST /accounts/:id/suspension        // Suspend account
POST /tasks/:id/completion           // Mark task complete
POST /orders/:id/cancellation        // Cancel order
POST /invoices/:id/payment           // Pay invoice

// Still use resource noun + action as sub-resource
// Pattern: POST /{resource}/:id/{action}
```

### RESTful API Example Structure

```typescript
// Users/Accounts
GET    /accounts           // List accounts
POST   /accounts           // Create account (signup)
GET    /accounts/:id       // Get account
PATCH  /accounts/:id       // Update account
DELETE /accounts/:id       // Delete account

// Authentication (Sessions)
POST   /sessions           // Login (create session)
DELETE /sessions/:id       // Logout (delete session)
GET    /sessions/current   // Get current session

// Account Actions
POST   /accounts/:id/activation      // Activate
POST   /accounts/:id/password-reset  // Reset password
PATCH  /accounts/:id/password        // Change password

// Tasks (nested under accounts)
GET    /accounts/:id/tasks          // List account's tasks
POST   /accounts/:id/tasks          // Create task
GET    /tasks/:id                   // Get task
PATCH  /tasks/:id                   // Update task
DELETE /tasks/:id                   // Delete task

// Organizations
GET    /organizations               // List orgs
POST   /organizations               // Create org
GET    /organizations/:id           // Get org
PATCH  /organizations/:id           // Update org
DELETE /organizations/:id           // Delete org
GET    /organizations/:id/members   // List members
POST   /organizations/:id/members   // Add member
```

## Review Checklist

- [ ] Endpoints use resource nouns, not action verbs
- [ ] HTTP methods match operation semantics (GET, POST, PATCH, DELETE)
- [ ] Resource collections use plural nouns (e.g., `/accounts`)
- [ ] Related resources use sub-resource paths (e.g., `/accounts/:id/tasks`)
- [ ] Actions that don't fit CRUD use sub-resource pattern (e.g., `/accounts/:id/activation`)
- [ ] Status codes are appropriate (201 for creation, 204 for no content, etc.)
- [ ] GET requests are safe and idempotent
- [ ] No verbs in URL paths (except as action sub-resources)
- [ ] Consistent resource hierarchy and naming
- [ ] URLs represent resources, not operations
