# BE-6: Service Agnostic to Consumers

**Severity:** `CRITICAL`

## Principle

A module/service should not know about its consumers. Services should provide generic, reusable methods that work regardless of who's calling them. Avoid creating consumer-specific methods like `createAccountFromCRM1()`, `createAccountFromCRM2()`, `createAccountFromWebSignup()`. Instead, create generic methods like `createAccount(params)` and let callers adapt their data.

## Why This Matters

- **Service focus**: Service layer stays focused on domain logic, not consumer-specific concerns
- **Scalability**: Easy to add new consumers (new CRM, new signup flow) without modifying service
- **No coupling**: Service doesn't depend on knowing who will call it
- **Reusability**: Generic methods can be used by any consumer
- **Maintainability**: One method to maintain instead of N consumer-specific methods
- **Single Responsibility**: Service handles business logic, callers handle data adaptation
- **Testability**: Test one generic method instead of many consumer-specific variants

## Bad Example

```typescript
// Service with consumer-specific methods - WRONG!
class AccountService {
  // Separate method for each consumer - BAD
  static async createAccountFromCRM1(crmData: CRM1AccountData): Promise<Account> {
    // CRM1-specific field mapping
    const firstName = crmData.first_name;
    const lastName = crmData.last_name;
    const email = crmData.email_address;
    const phone = crmData.phone_number;

    return AccountWriter.createAccountByUsernameAndPassword(
      firstName,
      lastName,
      'defaultPassword123', // CRM1 default
      email,
      phone
    );
  }

  static async createAccountFromCRM2(crmData: CRM2AccountData): Promise<Account> {
    // CRM2-specific field mapping
    const firstName = crmData.firstName;
    const lastName = crmData.lastName;
    const email = crmData.contactEmail;
    const phone = crmData.mobilePhone;

    return AccountWriter.createAccountByUsernameAndPassword(
      firstName,
      lastName,
      'tempPassword456', // CRM2 default
      email,
      phone
    );
  }

  static async createAccountFromWebSignup(formData: SignupFormData): Promise<Account> {
    // Web signup specific logic
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const email = formData.email;
    const password = formData.password;

    return AccountWriter.createAccountByUsernameAndPassword(
      firstName,
      lastName,
      password,
      email
    );
  }

  static async createAccountFromMobileApp(appData: MobileAppData): Promise<Account> {
    // Mobile app specific logic
    const firstName = appData.given_name;
    const lastName = appData.family_name;
    const email = appData.user_email;
    const phone = appData.phone;

    return AccountWriter.createAccountByUsernameAndPassword(
      firstName,
      lastName,
      appData.pwd,
      email,
      phone
    );
  }

  static async createAccountFromAdminPanel(adminData: AdminCreateData): Promise<Account> {
    // Admin panel specific logic
    return AccountWriter.createAccountByUsernameAndPassword(
      adminData.fname,
      adminData.lname,
      'admin123',
      adminData.username
    );
  }

  // Now every time we integrate a new system, we need to modify AccountService
  // This grows infinitely and couples service to all consumers
}

// Using the service - consumer knows nothing about data transformation
class CRM1Integration {
  async syncAccount(crmData: CRM1AccountData) {
    // Just passes data directly - no transformation
    const account = await AccountService.createAccountFromCRM1(crmData);
    return account;
  }
}
```

**Problems:**
- AccountService knows about CRM1, CRM2, web signup, mobile app, admin panel
- Every new consumer requires modifying AccountService (violates Open/Closed Principle)
- Service has N methods doing essentially the same thing with different field mappings
- Tight coupling between service and all consumers
- Service grows unbounded as more consumers are added
- Difficult to maintain - logic scattered across many methods
- Consumer-specific logic pollutes the service layer
- Service layer should not know or care who is calling it

## Good Example

```typescript
// Generic service interface - CORRECT!
interface CreateAccountParams {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phoneNumber?: PhoneNumber;
}

// Service with generic method - CORRECT!
class AccountService {
  /**
   * Creates a new account
   * Generic method that works for ANY consumer
   */
  static async createAccount(params: CreateAccountParams): Promise<Account> {
    // Generic validation (applies to all consumers)
    this.validateAccountParams(params);

    // Generic account creation logic
    return AccountWriter.createAccountByUsernameAndPassword(
      params.firstName,
      params.lastName,
      params.password,
      params.username,
      params.phoneNumber
    );
  }

  private static validateAccountParams(params: CreateAccountParams): void {
    if (!params.firstName || params.firstName.length < 2) {
      throw new InvalidFirstNameError('First name must be at least 2 characters');
    }
    if (!params.lastName || params.lastName.length < 2) {
      throw new InvalidLastNameError('Last name must be at least 2 characters');
    }
    if (!params.username || !this.isValidEmail(params.username)) {
      throw new InvalidUsernameError('Username must be a valid email');
    }
    if (!params.password || params.password.length < 8) {
      throw new WeakPasswordError('Password must be at least 8 characters');
    }
  }
}

// Each consumer adapts their data to standard params - CORRECT!
class CRM1Integration {
  async syncAccount(crmData: CRM1AccountData): Promise<Account> {
    // Consumer-specific transformation happens in the consumer
    const accountParams: CreateAccountParams = {
      firstName: crmData.first_name,
      lastName: crmData.last_name,
      username: crmData.email_address,
      password: this.generateSecurePassword(), // CRM1 logic
      phoneNumber: this.formatCRM1Phone(crmData.phone_number)
    };

    // Call generic service method
    return AccountService.createAccount(accountParams);
  }

  private generateSecurePassword(): string {
    // CRM1-specific password generation
    return crypto.randomBytes(16).toString('hex');
  }

  private formatCRM1Phone(phone: string): PhoneNumber {
    // CRM1-specific phone formatting
    return {
      countryCode: '+1',
      number: phone.replace(/\D/g, '')
    };
  }
}

class CRM2Integration {
  async syncAccount(crmData: CRM2AccountData): Promise<Account> {
    // CRM2-specific transformation
    const accountParams: CreateAccountParams = {
      firstName: crmData.firstName,
      lastName: crmData.lastName,
      username: crmData.contactEmail,
      password: this.generateCRM2Password(), // CRM2 logic
      phoneNumber: {
        countryCode: crmData.countryCode || '+1',
        number: crmData.mobilePhone
      }
    };

    return AccountService.createAccount(accountParams);
  }

  private generateCRM2Password(): string {
    // CRM2-specific password generation
    return 'CRM2-' + Math.random().toString(36).substring(2);
  }
}

class AccountController {
  static async createAccount(req: Request, res: Response) {
    // Web signup transformation
    const accountParams: CreateAccountParams = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.email,
      password: req.body.password, // User provided password
      phoneNumber: req.body.phoneNumber
    };

    const account = await AccountService.createAccount(accountParams);
    res.status(201).json(AccountSerializer.serialize(account));
  }
}

class MobileAccountController {
  async createAccount(appData: MobileAppData): Promise<Account> {
    // Mobile app transformation
    const accountParams: CreateAccountParams = {
      firstName: appData.given_name,
      lastName: appData.family_name,
      username: appData.user_email,
      password: appData.pwd,
      phoneNumber: appData.phone
    };

    return AccountService.createAccount(accountParams);
  }
}

class AdminAccountController {
  async createAccount(adminData: AdminCreateData): Promise<Account> {
    // Admin panel transformation
    const accountParams: CreateAccountParams = {
      firstName: adminData.fname,
      lastName: adminData.lname,
      username: adminData.username,
      password: this.generateAdminPassword(),
      phoneNumber: adminData.phone
    };

    return AccountService.createAccount(accountParams);
  }

  private generateAdminPassword(): string {
    // Admin-specific password generation
    return 'Admin-' + crypto.randomBytes(12).toString('base64');
  }
}
```

**Benefits:**
- AccountService has ONE generic `createAccount()` method
- Service doesn't know about CRM1, CRM2, web, mobile, admin panel
- Easy to add new consumers - no changes to AccountService
- Each consumer handles its own data transformation logic
- Service stays focused on account creation business logic
- Consumers are responsible for adapting their data format
- Service API is stable and doesn't change as consumers are added
- Clear separation: consumers adapt data, service handles domain logic

## Additional Context

### Service Layer: Generic Operations

Services should expose generic domain operations:

```typescript
class TaskService {
  // Generic methods - don't care who calls them
  static async createTask(params: CreateTaskParams): Promise<Task> { }
  static async updateTask(taskId: string, updates: UpdateTaskParams): Promise<Task> { }
  static async deleteTask(taskId: string): Promise<void> { }
  static async getTaskById(taskId: string): Promise<Task> { }
  static async getTasksByAccount(accountId: string): Promise<Task[]> { }
}

// NOT like this:
class TaskService {
  // Consumer-specific methods - BAD
  static async createTaskFromMobileApp(mobileData: MobileTaskData): Promise<Task> { }
  static async createTaskFromWebApp(webData: WebTaskData): Promise<Task> { }
  static async createTaskFromSlackBot(slackData: SlackTaskData): Promise<Task> { }
  static async createTaskFromCLI(cliData: CLITaskData): Promise<Task> { }
}
```

### Consumer Layer: Data Adaptation

Consumers (controllers, workers, integrations) handle data transformation:

```typescript
// Web controller - adapts HTTP request to service params
class TaskController {
  static async createTask(req: Request, res: Response) {
    const taskParams: CreateTaskParams = {
      title: req.body.title,
      description: req.body.description,
      accountId: req.user.id, // From auth middleware
      dueDate: new Date(req.body.dueDate),
      priority: req.body.priority || 'medium'
    };

    const task = await TaskService.createTask(taskParams);
    res.status(201).json(TaskSerializer.serialize(task));
  }
}

// Mobile controller - adapts mobile app data to service params
class MobileTaskController {
  async createTask(appData: MobileTaskData, userId: string): Promise<Task> {
    const taskParams: CreateTaskParams = {
      title: appData.taskTitle,
      description: appData.taskDescription,
      accountId: userId,
      dueDate: new Date(appData.dueDateTimestamp),
      priority: this.mapMobilePriority(appData.priorityLevel)
    };

    return TaskService.createTask(taskParams);
  }

  private mapMobilePriority(level: number): Priority {
    if (level >= 8) return 'high';
    if (level >= 5) return 'medium';
    return 'low';
  }
}

// Slack integration - adapts Slack command to service params
class SlackTaskIntegration {
  async handleCreateTaskCommand(slackCommand: SlackCommand): Promise<Task> {
    const taskParams: CreateTaskParams = {
      title: slackCommand.text.split('\n')[0],
      description: slackCommand.text.split('\n').slice(1).join('\n'),
      accountId: await this.getAccountIdFromSlackUser(slackCommand.user_id),
      dueDate: this.parseDueDate(slackCommand.text),
      priority: this.extractPriority(slackCommand.text)
    };

    return TaskService.createTask(taskParams);
  }

  private parseDueDate(text: string): Date {
    // Slack-specific date parsing logic
    const match = text.match(/due:(\d{4}-\d{2}-\d{2})/);
    return match ? new Date(match[1]) : new Date();
  }
}
```

### When Consumer-Specific Logic Is Acceptable

Some consumer-specific logic is fine, but it should be in the CONSUMER layer, not service:

```typescript
// OK: Consumer-specific logic in consumer layer
class CRM1Integration {
  async syncAccount(crmData: CRM1AccountData): Promise<Account> {
    // CRM1-specific: check if already synced
    if (await this.isAlreadySynced(crmData.crm_id)) {
      return this.updateExistingAccount(crmData);
    }

    // CRM1-specific: transform data
    const accountParams = this.transformCRM1Data(crmData);

    // Generic service call
    const account = await AccountService.createAccount(accountParams);

    // CRM1-specific: store mapping
    await this.storeCRMMapping(crmData.crm_id, account.id);

    return account;
  }

  private transformCRM1Data(crmData: CRM1AccountData): CreateAccountParams {
    return {
      firstName: crmData.first_name,
      lastName: crmData.last_name,
      username: crmData.email_address,
      password: this.generateSecurePassword(),
      phoneNumber: this.formatPhone(crmData.phone_number)
    };
  }

  // All CRM1-specific logic stays in CRM1Integration
  private async isAlreadySynced(crmId: string): Promise<boolean> { }
  private async storeCRMMapping(crmId: string, accountId: string): Promise<void> { }
  private generateSecurePassword(): string { }
  private formatPhone(phone: string): PhoneNumber { }
}
```

### Real-World Example: Payment Processing

**Bad: Service knows about payment providers**
```typescript
class PaymentService {
  // Provider-specific methods - BAD
  static async processStripePayment(stripeData: StripePaymentData): Promise<Payment> { }
  static async processPayPalPayment(paypalData: PayPalPaymentData): Promise<Payment> { }
  static async processBraintreePayment(braintreeData: BraintreeData): Promise<Payment> { }
}
```

**Good: Generic service, providers adapt**
```typescript
// Generic service
class PaymentService {
  static async processPayment(params: ProcessPaymentParams): Promise<Payment> {
    // Generic payment processing logic
  }
}

// Stripe adapter
class StripePaymentAdapter {
  async processPayment(stripeData: StripePaymentData): Promise<Payment> {
    const paymentParams: ProcessPaymentParams = {
      amount: stripeData.amount,
      currency: stripeData.currency,
      customerId: await this.getCustomerId(stripeData.stripe_customer_id),
      paymentMethodId: stripeData.payment_method,
      metadata: {
        provider: 'stripe',
        stripePaymentIntentId: stripeData.payment_intent_id
      }
    };

    return PaymentService.processPayment(paymentParams);
  }
}

// PayPal adapter
class PayPalPaymentAdapter {
  async processPayment(paypalData: PayPalPaymentData): Promise<Payment> {
    const paymentParams: ProcessPaymentParams = {
      amount: paypalData.purchase_units[0].amount.value,
      currency: paypalData.purchase_units[0].amount.currency_code,
      customerId: await this.getCustomerId(paypalData.payer.payer_id),
      paymentMethodId: paypalData.payment_source.paypal.email_address,
      metadata: {
        provider: 'paypal',
        paypalOrderId: paypalData.id
      }
    };

    return PaymentService.processPayment(paymentParams);
  }
}
```

### Benefits for Testing

**Generic service is easy to test:**
```typescript
describe('AccountService.createAccount', () => {
  it('should create account with valid params', async () => {
    const params: CreateAccountParams = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'john@example.com',
      password: 'securePass123'
    };

    const account = await AccountService.createAccount(params);
    expect(account.firstName).toBe('John');
  });

  // One test suite covers all consumers
});
```

**Consumer-specific service requires many tests:**
```typescript
describe('AccountService consumer methods', () => {
  // Need separate test for each consumer method
  it('should create account from CRM1', async () => { });
  it('should create account from CRM2', async () => { });
  it('should create account from web signup', async () => { });
  it('should create account from mobile app', async () => { });
  it('should create account from admin panel', async () => { });
  // Tests grow as consumers grow
});
```

## Review Checklist

- [ ] Service methods are generic, not consumer-specific
- [ ] No method names like `createXFromY()` or `processXForY()`
- [ ] Service doesn't import consumer-specific types (CRM1Data, MobileAppData, etc.)
- [ ] Consumers handle their own data transformation/adaptation
- [ ] Service interfaces use generic domain types (CreateAccountParams, not CRM1AccountData)
- [ ] Adding a new consumer doesn't require modifying the service
- [ ] Consumer-specific logic is in consumer layer, not service layer
- [ ] Service layer is focused on domain logic, not data mapping
- [ ] One generic method instead of N consumer-specific methods
