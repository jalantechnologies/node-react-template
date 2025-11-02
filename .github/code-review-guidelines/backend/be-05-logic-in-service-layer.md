# BE-5: Logic in Service Layer

**Severity:** `CRITICAL`

## Principle

Write business logic outside execution context - in the service layer, not in controllers or workers. Controllers should only validate input and call services. All domain logic, data orchestration, and business rules belong in the service layer.

## Why This Matters

- **Testability**: Business logic can be tested without HTTP context, mocking requests/responses, or worker infrastructure
- **Reusability**: Same logic can be called from REST API, GraphQL, CLI scripts, background workers, cron jobs
- **Separation of concerns**: Controllers handle HTTP/transport, services handle business logic
- **Maintainability**: Logic in one place, easier to find and modify
- **Independence**: Service layer is framework-agnostic, can migrate from Express to another framework without rewriting logic
- **Debugging**: Easier to debug business logic without dealing with HTTP request/response lifecycle

## Bad Example

```typescript
// Controller with all logic inline - WRONG!
class AccountController {
  static async createAccount(req: Request, res: Response) {
    const { firstName, lastName, username, password, phoneNumber } = req.body;

    // Validation logic in controller - BAD
    if (!firstName || firstName.length < 2) {
      return res.status(400).json({ error: 'First name must be at least 2 characters' });
    }
    if (!lastName || lastName.length < 2) {
      return res.status(400).json({ error: 'Last name must be at least 2 characters' });
    }
    if (!username || username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Phone number formatting logic in controller - BAD
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }
    const formattedPhone = {
      countryCode: '+1',
      number: cleanPhone
    };

    // Database access directly in controller - BAD
    const existingAccount = await AccountRepository.collection().findOne({
      username
    });
    if (existingAccount) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Password hashing in controller - BAD
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Database insert in controller - BAD
    const account = await AccountRepository.collection().insertOne({
      firstName,
      lastName,
      username,
      hashedPassword,
      phoneNumber: formattedPhone,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Email sending in controller - BAD
    const transporter = nodemailer.createTransport(config.smtp);
    await transporter.sendMail({
      to: username, // assuming username is email
      subject: 'Welcome!',
      html: `<p>Welcome ${firstName}!</p>`
    });

    // Notification sending in controller - BAD
    await twilioClient.messages.create({
      to: `${formattedPhone.countryCode}${formattedPhone.number}`,
      from: config.twilioNumber,
      body: 'Welcome to our app!'
    });

    res.status(201).json({
      id: account.insertedId,
      firstName,
      lastName,
      username,
      phoneNumber: formattedPhone
    });
  }
}

// Worker with duplicated logic - BAD
class AccountCreationWorker {
  async execute(params: CreateAccountParams) {
    // Same validation logic duplicated - BAD
    if (!params.firstName || params.firstName.length < 2) {
      throw new Error('First name must be at least 2 characters');
    }
    // ... all the same logic duplicated again
  }
}
```

**Problems:**
- All business logic is in the controller, tightly coupled to HTTP
- Cannot test business logic without mocking Express Request/Response
- Cannot reuse account creation from CLI, workers, or other contexts
- Validation logic would need to be duplicated in workers, CLI scripts
- Password hashing, database access, email sending all mixed with HTTP handling
- No separation of concerns
- Hard to maintain - logic scattered across controllers
- Cannot call account creation programmatically without HTTP context

## Good Example

```typescript
// Service layer with all business logic - CORRECT!
class AccountService {
  /**
   * Creates a new account with username and password
   * Can be called from REST API, workers, CLI, GraphQL, etc.
   */
  static async createAccountByUsernameAndPassword(
    firstName: string,
    lastName: string,
    password: string,
    username: string,
    phoneNumber?: PhoneNumber
  ): Promise<Account> {
    // Validation logic in service
    this.validateAccountCreationParams(firstName, lastName, username, password);

    // Phone number formatting in service
    const formattedPhone = phoneNumber
      ? this.formatPhoneNumber(phoneNumber)
      : undefined;

    // Use writer to handle database logic
    const account = await AccountWriter.createAccountByUsernameAndPassword(
      firstName,
      lastName,
      password, // Writer will hash the password
      username,
      formattedPhone
    );

    // Send welcome email via CommunicationService
    await CommunicationService.sendWelcomeEmail({
      accountId: account.id,
      email: username,
      firstName: account.firstName
    });

    // Send SMS notification if phone provided
    if (formattedPhone) {
      await CommunicationService.sendWelcomeSMS({
        accountId: account.id,
        phoneNumber: formattedPhone
      });
    }

    return account;
  }

  private static validateAccountCreationParams(
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ): void {
    if (!firstName || firstName.length < 2) {
      throw new InvalidFirstNameError('First name must be at least 2 characters');
    }
    if (!lastName || lastName.length < 2) {
      throw new InvalidLastNameError('Last name must be at least 2 characters');
    }
    if (!username || username.length < 3) {
      throw new InvalidUsernameError('Username must be at least 3 characters');
    }
    if (!password || password.length < 8) {
      throw new WeakPasswordError('Password must be at least 8 characters');
    }
  }

  private static formatPhoneNumber(phoneNumber: PhoneNumber | string): PhoneNumber {
    if (typeof phoneNumber === 'string') {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        throw new InvalidPhoneNumberError('Phone number must be 10 digits');
      }
      return {
        countryCode: '+1',
        number: cleanPhone
      };
    }
    return phoneNumber;
  }
}

// Thin controller - just HTTP handling - CORRECT!
class AccountController {
  static async createAccount(req: Request, res: Response) {
    // Extract and parse parameters from request
    const { firstName, lastName, username, password, phoneNumber } = req.body;

    // Call service layer - all logic happens here
    const account = await AccountService.createAccountByUsernameAndPassword(
      firstName,
      lastName,
      password,
      username,
      phoneNumber
    );

    // Serialize response and send
    res.status(201).json(AccountSerializer.serialize(account));
  }
}

// Worker can reuse same service - CORRECT!
class AccountCreationWorker {
  async execute(params: CreateAccountParams) {
    // Same service call - no logic duplication
    const account = await AccountService.createAccountByUsernameAndPassword(
      params.firstName,
      params.lastName,
      params.password,
      params.username,
      params.phoneNumber
    );

    return account;
  }
}

// CLI script can reuse same service - CORRECT!
async function createAccountFromCLI() {
  const account = await AccountService.createAccountByUsernameAndPassword(
    'John',
    'Doe',
    'securePassword123',
    'john.doe@example.com'
  );

  console.log(`Created account: ${account.id}`);
}
```

**Benefits:**
- All business logic centralized in AccountService
- Controller is thin - only handles HTTP concerns (parsing, serialization)
- Service can be tested without HTTP context
- Same logic reused from controllers, workers, CLI, GraphQL resolvers
- Easy to maintain - one place for account creation logic
- Clear separation: controller = transport, service = business logic
- Service methods are framework-agnostic
- Can call service methods directly in tests, scripts, REPL

## Additional Context

### Service Layer Responsibilities

The service layer should handle:

1. **Business logic and rules**
   ```typescript
   // Discount eligibility, pricing calculations, etc.
   static async calculateOrderTotal(orderId: string): Promise<number> {
     const order = await OrderReader.getOrderById({ id: orderId });
     let total = order.items.reduce((sum, item) => sum + item.price, 0);

     // Business rule: 10% discount for orders over $100
     if (total > 100) {
       total *= 0.9;
     }

     return total;
   }
   ```

2. **Data validation**
   ```typescript
   private static validateOrderParams(params: CreateOrderParams): void {
     if (!params.items || params.items.length === 0) {
       throw new EmptyOrderError('Order must contain at least one item');
     }
     if (params.items.some(item => item.quantity <= 0)) {
       throw new InvalidQuantityError('Item quantity must be positive');
     }
   }
   ```

3. **Orchestration of multiple data sources**
   ```typescript
   static async getAccountDashboard(accountId: string): Promise<Dashboard> {
     // Orchestrate multiple readers/services
     const account = await AccountReader.getAccountById({ id: accountId });
     const tasks = await TaskReader.getTasksByAccountId(accountId);
     const notifications = await NotificationReader.getRecentNotifications(accountId);
     const stats = await AnalyticsService.getAccountStats(accountId);

     return {
       account,
       tasks,
       notifications,
       stats
     };
   }
   ```

4. **Cross-service coordination**
   ```typescript
   static async closeAccount(accountId: string): Promise<void> {
     // Coordinate across multiple services
     await TaskService.cancelAllTasksForAccount(accountId);
     await PaymentService.refundPendingCharges(accountId);
     await NotificationService.sendAccountClosureEmail(accountId);
     await AccountWriter.deactivateAccount(accountId);
   }
   ```

5. **State transitions and workflows**
   ```typescript
   static async activateAccount(accountId: string, token: string): Promise<Account> {
     const account = await AccountReader.getAccountById({ id: accountId });

     // Business rule: can't activate already active account
     if (account.active) {
       throw new AccountAlreadyActiveError('Account is already active');
     }

     // Verify token
     const isValid = await AuthenticationService.verifyActivationToken(accountId, token);
     if (!isValid) {
       throw new InvalidTokenError('Activation token is invalid or expired');
     }

     // State transition
     const activatedAccount = await AccountWriter.activateAccount(accountId);

     // Post-activation actions
     await CommunicationService.sendActivationConfirmation(accountId);
     await AnalyticsService.trackAccountActivation(accountId);

     return activatedAccount;
   }
   ```

### Controller Responsibilities

Controllers should ONLY handle:

1. **Request parsing and parameter extraction**
   ```typescript
   const { firstName, lastName, email } = req.body;
   const accountId = req.params.id;
   const { page, limit } = req.query;
   ```

2. **Input validation (basic type/format checks)**
   ```typescript
   // Basic format validation only
   if (!isValidEmail(email)) {
     return res.status(400).json({ error: 'Invalid email format' });
   }
   // Business validation should be in service
   ```

3. **Calling service methods**
   ```typescript
   const account = await AccountService.createAccount(params);
   ```

4. **Response serialization**
   ```typescript
   res.status(201).json(AccountSerializer.serialize(account));
   ```

5. **HTTP status codes**
   ```typescript
   res.status(201).json(data);  // Created
   res.status(204).send();      // No content
   res.status(200).json(data);  // Success
   ```

6. **Error handling and mapping to HTTP responses**
   ```typescript
   try {
     const account = await AccountService.createAccount(params);
     res.status(201).json(AccountSerializer.serialize(account));
   } catch (error) {
     if (error instanceof AccountAlreadyExistsError) {
       return res.status(409).json({ error: error.message });
     }
     throw error; // Let error middleware handle others
   }
   ```

### Testing Benefits

**Service layer (easy to test):**
```typescript
describe('AccountService.createAccountByUsernameAndPassword', () => {
  it('should create account with valid parameters', async () => {
    const account = await AccountService.createAccountByUsernameAndPassword(
      'John',
      'Doe',
      'password123',
      'john@example.com'
    );

    expect(account.firstName).toBe('John');
    expect(account.lastName).toBe('Doe');
    expect(account.username).toBe('john@example.com');
  });

  it('should throw error for weak password', async () => {
    await expect(
      AccountService.createAccountByUsernameAndPassword(
        'John',
        'Doe',
        '123', // too short
        'john@example.com'
      )
    ).rejects.toThrow(WeakPasswordError);
  });
});
```

**Controller (harder to test if it contains logic):**
```typescript
// Would need to mock Request, Response, and all HTTP context
describe('AccountController.createAccount', () => {
  it('should create account', async () => {
    const req = {
      body: { firstName: 'John', lastName: 'Doe', ... }
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await AccountController.createAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});
```

### Migration Benefits

If you need to migrate from Express to another framework (e.g., Fastify, Koa), only the thin controller layer needs to change:

```typescript
// Express controller
class ExpressAccountController {
  static async createAccount(req: Request, res: Response) {
    const account = await AccountService.createAccount(req.body);
    res.status(201).json(AccountSerializer.serialize(account));
  }
}

// Fastify controller - only HTTP handling changes
class FastifyAccountController {
  static async createAccount(request: FastifyRequest, reply: FastifyReply) {
    const account = await AccountService.createAccount(request.body);
    reply.status(201).send(AccountSerializer.serialize(account));
  }
}

// Service layer stays exactly the same!
```

## Review Checklist

- [ ] Controllers only parse requests and call service methods
- [ ] No business logic in controllers (no calculations, validations, rules)
- [ ] No direct database access in controllers (use service layer)
- [ ] No password hashing, encryption, or security logic in controllers
- [ ] No email/SMS sending in controllers (use CommunicationService via service layer)
- [ ] Service methods are framework-agnostic (no Express types)
- [ ] Service methods can be called without HTTP context
- [ ] Business validation is in service layer, not controllers
- [ ] Same logic not duplicated across controllers and workers
- [ ] Service layer can be tested without mocking HTTP requests/responses
