# Automated PR Review Rules

This document outlines the coding standards and architectural patterns that should be enforced in PR reviews for the node-react-template project.

## Table of Contents
1. [General Programming Principles](#general-programming-principles)
2. [Backend Rules](#backend-rules)
3. [Frontend Rules](#frontend-rules)
4. [TypeScript Specific Rules](#typescript-specific-rules)
5. [Testing Requirements](#testing-requirements)

---

## General Programming Principles

### GP-001: Comment Quality
**Rule:** Comments must explain "why", not "what" or "how"
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Comments explain what the code does
// Create a new task
const task = await TaskService.createTask(params);

// ✅ GOOD: Comments explain why
// We must create the task before sending notifications to ensure
// the task ID exists for the notification payload
const task = await TaskService.createTask(params);
```
**Detection:**
- Look for comments that duplicate code structure
- Flag comments with obvious statements like "create", "update", "delete" without context
- Require comments for complex business logic to explain rationale

---

### GP-002: Naming Conventions
**Rule:** Function and variable names must accurately reflect their purpose
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Generic or misleading names
const data = await getStuff();
const temp = user.name;
const handler = () => { ... };

// ✅ GOOD: Descriptive names
const activeAccountTasks = await getTasksForAccount();
const formattedUserName = user.name;
const handleTaskDeletion = () => { ... };
```
**Detection:**
- Flag variables named: `data`, `temp`, `tmp`, `val`, `result`, `stuff`, `thing`
- Flag functions named: `handler`, `process`, `doStuff`, `handle` (without context)
- Require verb-noun pattern for functions (e.g., `getUserById`, `createTask`)

---

### GP-003: Function Size and Decomposition
**Rule:** Large functions (>50 lines) should be broken into smaller, focused functions
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: One giant function doing everything
async function handleUserRegistration(userData) {
  // 100+ lines of validation, database operations, email sending, etc.
}

// ✅ GOOD: Decomposed into focused functions
async function handleUserRegistration(userData: UserRegistrationData): Promise<User> {
  const validatedData = validateRegistrationData(userData);
  const hashedPassword = await hashPassword(validatedData.password);
  const user = await createUserAccount(validatedData, hashedPassword);
  await sendWelcomeEmail(user);
  return user;
}
```
**Detection:**
- Flag functions with >50 lines (excluding whitespace and comments)
- Flag functions with >3 levels of nesting
- Flag functions with >5 local variables

---

### GP-004: Prefer OOP over Functional Programming
**Rule:** Use classes with encapsulated methods instead of standalone functions for domain logic
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Functional approach with giant file
function parseExcel(file) { /* 500 lines */ }
function parseSheet(sheet) { /* ... */ }
function parseRow(row) { /* ... */ }

// ✅ GOOD: OOP approach following architecture
class ExcelParser {
  parse(file: File): Workbook { ... }
}

class Workbook {
  constructor(private sheets: Sheet[]) {}
  getSheet(index: number): Sheet { ... }
}

class Sheet {
  constructor(private rows: Row[]) {}
  getRows(): Row[] { ... }
}

class Row {
  constructor(private columns: Column[]) {}
  getColumn(index: number): Column { ... }
}
```
**Detection:**
- Flag files with >10 standalone exported functions (not in classes)
- Require domain logic to use classes (Service, Reader, Writer pattern)
- Allow standalone utility functions only for pure transformations

---

### GP-005: Entity/Noun Convention for Classes
**Rule:** Classes and components should be named with nouns/entities, not verbs
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Verb-based names
class ProcessUser { }
class HandlePayment { }
class CalculateTotal { }

// Frontend
const ProcessUserComponent = () => { };

// ✅ GOOD: Noun-based names
class UserProcessor { }
class PaymentHandler { }
class TotalCalculator { }

// Frontend
const UserProfile = () => { };
const PaymentForm = () => { };
```
**Detection:**
- Flag class names starting with verbs: `Process`, `Handle`, `Calculate`, `Manage`, `Execute`
- Flag React components starting with verbs
- Require class names to end with role suffixes: `Service`, `Handler`, `Manager`, `Calculator`, `Validator`

---

### GP-006: Avoid Over-Defensive Programming
**Rule:** Avoid unnecessary null checks and optional chaining without understanding when nulls occur
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Over-defensive without understanding
function getTaskTitle(task?: Task): string {
  return task?.title ?? '';
}

// ✅ GOOD: Clear contracts
function getTaskTitle(task: Task): string {
  return task.title;
}

// If nullability is needed, make it explicit
function getTaskTitleOptional(task: Nullable<Task>): string {
  if (!task) {
    throw new TaskNotFoundError();
  }
  return task.title;
}
```
**Detection:**
- Flag excessive use of `?.` (>3 in a single expression)
- Flag optional parameters without clear documentation
- Require explicit null handling with error messages
- Flag `|| ''`, `|| []`, `|| {}` without business justification

---

### GP-007: Proper Encapsulation
**Rule:** Avoid utility files; encapsulate behavior in the appropriate domain class
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Utility file with mixed domain logic
// utils/date-utils.ts
export function convertToTimezone(appointment, timezone) { ... }

// ✅ GOOD: Encapsulated in domain class
class Appointment {
  private scheduledTime: Date;
  private location: Location;

  getTimeInLocationTimezone(): Date {
    return convertToTimezone(this.scheduledTime, this.location.timezone);
  }
}
```
**Detection:**
- Flag utility files with domain-specific logic (not pure transformations)
- Require utils to be stateless, pure functions only
- Suggest moving domain logic to appropriate classes

**Exceptions:**
- Pure utility functions are acceptable: `formatCurrency()`, `parsePhoneNumber()`
- Framework-specific utils: `applicationController()`, `ApplicationRepository()`

---

### GP-008: Avoid Code Duplication
**Rule:** Audit code before adding new functions; reuse or refactor existing code
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Duplicate logic
class AccountService {
  static async updateFirstName(accountId: string, firstName: string) {
    return AccountWriter.updateFirstName(accountId, firstName);
  }

  static async updateLastName(accountId: string, lastName: string) {
    return AccountWriter.updateLastName(accountId, lastName);
  }

  static async updateEmail(accountId: string, email: string) {
    return AccountWriter.updateEmail(accountId, email);
  }
}

// ✅ GOOD: Single flexible function
class AccountService {
  static async updateAccountDetails(
    accountId: string,
    updates: Partial<AccountUpdates>
  ): Promise<Account> {
    return AccountWriter.updateAccountDetails(accountId, updates);
  }
}
```
**Detection:**
- Flag similar function names with different suffixes (`updateX`, `updateY`)
- Use code similarity detection for functions with >70% similarity
- Flag copy-pasted code blocks

---

## Backend Rules

### BE-001: Module Independence
**Rule:** One module should NOT depend on internals of other modules
**Severity:** Critical
**Examples:**
```typescript
// ❌ BAD: Accessing another module's internals
import TaskRepository from 'backend/modules/task/internal/store/task-repository';

class AccountService {
  static async getUserTasks(accountId: string) {
    // Directly accessing Task module's repository
    return TaskRepository.find({ account: accountId });
  }
}

// ✅ GOOD: Use public API
import { TaskService } from 'backend/modules/task';

class AccountService {
  static async getUserTasks(accountId: string) {
    return TaskService.getTasksForAccount({ accountId });
  }
}
```
**Detection:**
- Flag imports from `*/internal/*` directories outside the module
- Require all cross-module access through exported public APIs
- Check that only `index.ts` exports are used cross-module

**Architecture Pattern:**
```
module/
  ├── index.ts          # Public API exports only
  ├── {module}-service.ts
  ├── types.ts
  └── internal/         # Private implementation (NOT importable by other modules)
      ├── {module}-reader.ts
      ├── {module}-writer.ts
      └── store/
```

---

### BE-002: Database Index Requirements
**Rule:** Ensure database indexes exist for all query patterns
**Severity:** Critical
**Examples:**
```typescript
// ❌ BAD: Query without index
const TaskDbSchema = new Schema<TaskDB>({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
    // Missing: index: true
  },
  title: { type: String, required: true },
});

// Later in code:
TaskRepository.find({ account: accountId }); // Slow query!

// ✅ GOOD: Index matches query pattern
const TaskDbSchema = new Schema<TaskDB>({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
    index: true,  // ✅ Indexed for queries
  },
  title: { type: String, required: true },
});
```
**Detection:**
- Parse all MongoDB queries (`.find()`, `.findOne()`, etc.)
- Extract query fields
- Verify indexes exist in schema for those fields
- Flag compound queries without compound indexes

---

### BE-003: Single Update Function
**Rule:** Expose one update function with ability to update multiple attributes, not multiple update functions
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Multiple specialized update functions
class AccountService {
  static async updateFirstName(accountId: string, firstName: string) { ... }
  static async updateLastName(accountId: string, lastName: string) { ... }
  static async updateEmail(accountId: string, email: string) { ... }
}

// ✅ GOOD: Single flexible update function
class AccountService {
  static async updateAccountDetails(
    params: UpdateAccountDetailsParams
  ): Promise<Account> {
    const { accountId, firstName, lastName, email } = params;
    await AccountReader.getAccountById(accountId);
    return AccountWriter.updateAccountDetails(accountId, {
      firstName,
      lastName,
      email
    });
  }
}
```
**Detection:**
- Flag multiple methods named `update{Field}` in same class
- Suggest consolidation into single `update()` method

---

### BE-004: CRUD-Based API Design
**Rule:** Model backend APIs using CRUD operations; anything else is a red flag
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Functional endpoints
router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.post('/sendNotification', ctrl.sendNotification);

// ✅ GOOD: Resource-based CRUD
router.post('/accounts', ctrl.createAccount);      // Signup is creating an account
router.post('/sessions', ctrl.createSession);      // Login is creating a session
router.post('/notifications', ctrl.createNotification);

// REST pattern from codebase
router.get('/', ctrl.getTasks);           // GET all
router.post('/', ctrl.createTask);        // CREATE
router.get('/:id', ctrl.getTask);         // GET one
router.patch('/:id', ctrl.updateTask);    // UPDATE
router.delete('/:id', ctrl.deleteTask);   // DELETE
```
**Detection:**
- Flag route paths with verbs: `/signup`, `/login`, `/sendEmail`, `/processPayment`
- Require resource-based paths: `/accounts`, `/sessions`, `/tasks`, `/payments`
- Flag non-CRUD HTTP methods
- Suggest resource modeling for functional endpoints

**Exceptions:**
- `/authenticate` for token operations may be acceptable
- `/health`, `/metrics` for infrastructure

---

### BE-005: Business Logic Outside Execution Context
**Rule:** Write business logic in service layer, not in controllers or workers
**Severity:** Critical
**Examples:**
```typescript
// ❌ BAD: Business logic in controller
class TaskController {
  createTask = applicationController(async (req, res) => {
    // Validation logic
    if (!req.body.title || req.body.title.length < 3) {
      throw new ValidationError('Title too short');
    }

    // Business logic
    const existingTasks = await TaskRepository.find({
      account: req.accountId
    });
    if (existingTasks.length >= 100) {
      throw new TaskLimitError('Maximum 100 tasks per account');
    }

    // Database access
    const task = await TaskRepository.create({
      account: req.accountId,
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).send(task);
  });
}

// ✅ GOOD: Business logic in service layer
class TaskController {
  createTask = applicationController(async (req: Request, res: Response) => {
    const task = await TaskService.createTask({
      accountId: req.accountId!,
      title: req.body.title,
      description: req.body.description,
    });

    const taskJSON = serializeTaskAsJSON(task);
    res.status(HttpStatusCodes.CREATED).send(taskJSON);
  });
}

class TaskService {
  static async createTask(params: CreateTaskParams): Promise<Task> {
    // Business logic here
    await validateTaskLimit(params.accountId);
    return TaskWriter.createTask(params);
  }
}
```
**Detection:**
- Flag controllers with >15 lines of logic
- Flag direct database access in controllers (Repository imports)
- Flag business validation in controllers
- Require controllers to only handle HTTP concerns (parsing, serialization, status codes)

**Architecture Layers:**
1. **Controller:** HTTP handling, serialization, status codes
2. **Service:** Business logic, orchestration, validation
3. **Reader/Writer:** Data access operations
4. **Repository:** Database queries

---

### BE-006: Consumer-Agnostic Services
**Rule:** Services should not know about their consumers
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Service knows about consumers
class AccountService {
  static async createAccountFromCRM1(data: CRM1Data) { ... }
  static async createAccountFromCRM2(data: CRM2Data) { ... }
  static async createAccountFromWebsite(data: WebData) { ... }
}

// ✅ GOOD: Consumer-agnostic service
class AccountService {
  static async createAccount(
    firstName: string,
    lastName: string,
    email: string
  ): Promise<Account> {
    // Generic account creation
  }
}

// Consumers handle their own data transformation
class CRM1Integration {
  async syncAccount(crmData: CRM1Data) {
    const account = await AccountService.createAccount(
      crmData.first_name,
      crmData.last_name,
      crmData.email_address
    );
  }
}
```
**Detection:**
- Flag service methods with consumer names: `fromCRM`, `fromAPI`, `fromWebsite`
- Require generic service methods
- Suggest adapter pattern for consumer-specific transformations

---

### BE-007: Avoid N+1 Query Pattern
**Rule:** Do not perform N database calls for N items in a result set
**Severity:** Critical
**Examples:**
```typescript
// ❌ BAD: N+1 queries
async function getTasksWithAccountDetails(accountIds: string[]) {
  const tasks = [];
  for (const accountId of accountIds) {
    const account = await AccountRepository.findById(accountId);
    const accountTasks = await TaskRepository.find({ account: accountId });
    tasks.push(...accountTasks);
  }
  return tasks;
}

// ✅ GOOD: Single query with population
async function getTasksWithAccountDetails(accountIds: string[]) {
  return TaskRepository.find({
    account: { $in: accountIds }
  }).populate('account');
}
```
**Detection:**
- Flag loops containing `await` statements with Repository/database calls
- Flag sequential database calls in loops
- Suggest batch operations or joins/population

**Common Patterns to Flag:**
```typescript
// Pattern 1: Loop with await
for (const id of ids) {
  const item = await Repository.findById(id);
}

// Pattern 2: Map with await
const items = await Promise.all(
  ids.map(id => Repository.findById(id))
);

// Better: Single query
const items = await Repository.find({ _id: { $in: ids } });
```

---

### BE-008: Use Temporal for Background Jobs
**Rule:** Use Temporal to queue workers, not Kubernetes cron jobs
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Kubernetes cron job
// kubernetes/cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: daily-report
spec:
  schedule: "0 0 * * *"

// ✅ GOOD: Temporal workflow
import { WorkflowClient } from '@temporalio/client';

const client = new WorkflowClient();
await client.start(generateDailyReportWorkflow, {
  taskQueue: 'reports',
  workflowId: 'daily-report',
});
```
**Detection:**
- Flag new Kubernetes CronJob definitions
- Suggest Temporal workflows for background processing

**Note:** This rule requires infrastructure setup and may not be enforceable via static analysis alone.

---

### BE-009: Proper Error Handling with Custom Errors
**Rule:** Use typed error classes extending `ApplicationError`, not generic errors
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Generic errors
if (!task) {
  throw new Error('Task not found');
}

// ✅ GOOD: Typed error classes
if (!task) {
  throw new TaskNotFoundError(taskId);
}

// Error definition
export class TaskNotFoundError extends ApplicationError {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
```
**Detection:**
- Flag `throw new Error()` in backend code
- Require all errors to extend `ApplicationError`
- Ensure error classes define `code` and `httpStatusCode`

---

### BE-010: Consistent Module Export Pattern
**Rule:** Modules must export their public API through `index.ts` only
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Importing directly from internal files
import TaskWriter from 'backend/modules/task/internal/task-writer';

// ✅ GOOD: Import from module's public API
import { TaskService, Task, CreateTaskParams } from 'backend/modules/task';

// backend/modules/task/index.ts
export { default as TaskService } from './task-service';
export * from './types';
export { TaskRouter } from './rest-api/task-router';
export { TaskServer } from './rest-api/task-server';
```
**Detection:**
- Flag imports from module files other than `index.ts`
- Require barrel exports via `index.ts`

---

### BE-011: TypeScript Strict Null Checks
**Rule:** All code must pass TypeScript strict null checks
**Severity:** Critical
**Examples:**
```typescript
// ❌ BAD: Nullable not handled
function getTaskTitle(task: Task | null): string {
  return task.title; // Error: Object is possibly 'null'
}

// ✅ GOOD: Proper null handling
function getTaskTitle(task: Task | null): string {
  if (!task) {
    throw new TaskNotFoundError();
  }
  return task.title;
}

// Or use Nullable type
import { Nullable } from 'backend/types';

function getTaskTitle(task: Nullable<Task>): string {
  if (!task) {
    throw new TaskNotFoundError();
  }
  return task.title;
}
```
**Detection:**
- Run TypeScript compiler with `strictNullChecks: true`
- Flag any type errors

---

### BE-012: Consistent Parameter Patterns
**Rule:** Use parameter objects for functions with >2 parameters
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Too many positional parameters
static async createAccount(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: PhoneNumber
): Promise<Account> { ... }

// ✅ GOOD: Parameter object
static async createAccount(
  params: CreateAccountParams
): Promise<Account> {
  const { firstName, lastName, email, password, phoneNumber } = params;
  ...
}
```
**Detection:**
- Flag functions with >2 parameters
- Suggest parameter object pattern
- Ensure types are defined for parameter objects

---

## Frontend Rules

### FE-001: No Inline Styling
**Rule:** Avoid inline styles; use CSS classes or styled components
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Inline styles
<div style={{ padding: '20px', backgroundColor: '#fff' }}>
  Content
</div>

// ✅ GOOD: CSS classes (Tailwind)
<div className="p-5 bg-white">
  Content
</div>

// ✅ GOOD: Style objects (if needed)
// button.styles.ts
const styles = {
  primary: `
    bg-primary
    text-white
    px-4
    py-2
    rounded-md
  `,
};
```
**Detection:**
- Flag JSX elements with `style` prop
- Suggest className with Tailwind utilities

**Exceptions:**
- Dynamic styles based on props (but prefer CSS variables)
- Third-party component requirements

---

### FE-002: No Component-Specific Style Overrides
**Rule:** Avoid overriding component styles per page; redesign the component instead
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Override component styles per page
// page-a.tsx
<Button className="!bg-red-500 !p-10">Submit</Button>

// page-b.tsx
<Button className="!bg-blue-500 !text-sm">Submit</Button>

// ✅ GOOD: Use component variants
<Button kind={ButtonKind.DANGER} size={ButtonSize.LARGE}>Submit</Button>
<Button kind={ButtonKind.PRIMARY} size={ButtonSize.COMPACT}>Submit</Button>

// button/index.tsx - Component supports variants
interface ButtonProps {
  kind?: ButtonKind;
  size?: ButtonSize;
}
```
**Detection:**
- Flag usage of `!` (important) in Tailwind classes
- Flag className prop on custom components (Button, Input, etc.)
- Require components to support variant props instead

---

### FE-003: Reusable Layouts and Components
**Rule:** Pages should use reusable layouts and components
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Duplicate layout code per page
const TasksPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Tasks</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* content */}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Profile</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* content */}
      </div>
    </div>
  );
};

// ✅ GOOD: Reusable layout components
import { VerticalStackLayout } from 'frontend/components';

const TasksPage = () => {
  return (
    <div className="mx-auto max-w-5xl">
      <VerticalStackLayout gap={7}>
        <HeadingMedium>Tasks</HeadingMedium>
        {/* content */}
      </VerticalStackLayout>
    </div>
  );
};
```
**Detection:**
- Flag duplicate className patterns across pages
- Suggest extracting layout components
- Require use of existing layout components (VerticalStackLayout, HorizontalStackLayout)

---

### FE-004: API Service Layer with Type Conversion
**Rule:** API calls must go through service layer with JSON-to-class conversion
**Severity:** Critical
**Examples:**
```typescript
// ❌ BAD: Direct axios call in component
const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks').then(response => {
      setTasks(response.data); // No type safety!
    });
  }, []);
};

// ✅ GOOD: Service layer with type conversion
// services/task.service.ts
class TaskService extends APIService {
  getTasks = async (): Promise<ApiResponse<Nullable<Task[]>>> => {
    try {
      const response = await this.apiClient.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Convert JSON to typed Task instances
      const tasks: Task[] = (response.data as JsonObject[]).map(
        (taskData) => new Task(taskData)
      );

      return new ApiResponse(tasks, undefined);
    } catch (e) {
      return new ApiResponse(null, new ApiError(e.response.data));
    }
  };
}

// types/task.ts
export class Task {
  id: string;
  title: string;
  description: string;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.title = json.title as string;
    this.description = json.description as string;
  }
}

// Component uses service
const TasksPage = () => {
  const { getTasks, tasksList } = useTaskContext();

  useEffect(() => {
    getTasks(); // Type-safe!
  }, []);
};
```
**Detection:**
- Flag direct axios/fetch calls in components
- Require all API calls through service layer
- Ensure services convert JSON to typed classes
- Flag usage of raw JSON objects from API responses

**Architecture Pattern:**
```
Component → Context → Service → API → Service (type conversion) → Context → Component
```

---

### FE-005: Avoid Multiple Network Calls for List Items
**Rule:** List views should fetch all data in a single request, not per item
**Severity:** Critical
**Examples:**
```typescript
// ❌ BAD: Network call per item
const TaskList = ({ taskIds }: { taskIds: string[] }) => {
  return (
    <div>
      {taskIds.map(id => (
        <TaskItem key={id} taskId={id} />
      ))}
    </div>
  );
};

const TaskItem = ({ taskId }: { taskId: string }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Network call for EACH task!
    taskService.getTask(taskId).then(setTask);
  }, [taskId]);

  return <div>{task?.title}</div>;
};

// ✅ GOOD: Single network call for all items
const TaskList = () => {
  const { tasksList, getTasks } = useTaskContext();

  useEffect(() => {
    getTasks(); // Single API call for all tasks
  }, []);

  return (
    <div>
      {tasksList.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

const TaskItem = ({ task }: { task: Task }) => {
  return <div>{task.title}</div>;
};
```
**Detection:**
- Flag useEffect hooks with API calls inside `.map()`
- Flag components receiving IDs that fetch data independently
- Require list data to be fetched at parent level

---

### FE-006: Proper State Management with Context
**Rule:** Use React Context for shared state, not prop drilling
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Prop drilling
<App>
  <Layout user={user} tasks={tasks}>
    <Header user={user} />
    <TaskList tasks={tasks} user={user}>
      <TaskItem user={user} />
    </TaskList>
  </Layout>
</App>

// ✅ GOOD: Context-based state management
// app.component.tsx
<AuthProvider>
  <TaskProvider>
    <Router>
      <AppRoutes />
    </Router>
  </TaskProvider>
</AuthProvider>

// Any component can access context
const TaskItem = () => {
  const { tasksList } = useTaskContext();
  const { user } = useAuthContext();
};
```
**Detection:**
- Flag props passed through >2 levels of components
- Suggest context for shared state
- Ensure contexts use proper TypeScript types

---

### FE-007: Type Safety for Component Props
**Rule:** All component props must be properly typed
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Untyped or loosely typed props
const Button = (props: any) => { ... };
const Input = ({ value, onChange }) => { ... };

// ✅ GOOD: Properly typed props
interface ButtonProps {
  disabled?: boolean;
  kind?: ButtonKind;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: ButtonSize;
  type?: ButtonType;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  kind = ButtonKind.PRIMARY,
  onClick,
  size,
  type = ButtonType.BUTTON,
}) => { ... };
```
**Detection:**
- Flag components without TypeScript types
- Flag usage of `any` type
- Require interface/type definitions for props

---

### FE-008: Consistent Error Handling
**Rule:** Use consistent error handling pattern with toast notifications
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Inconsistent error handling
const TasksPage = () => {
  const [error, setError] = useState(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      alert('Deleted!');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
};

// ✅ GOOD: Consistent error handling with toast
import toast from 'react-hot-toast';

const TasksPage = () => {
  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId)
      .then(() => {
        setTasksList(tasksList.filter(task => task.id !== taskId));
        toast.success('Task deleted');
      })
      .catch((error) => onError(error as AsyncError));
  };
};
```
**Detection:**
- Flag usage of `alert()` for user messages
- Flag console.error without toast notification
- Require toast notifications for user-facing errors

---

### FE-009: Proper Form Handling with Formik + Yup
**Rule:** Forms must use Formik for state management and Yup for validation
**Severity:** High
**Examples:**
```typescript
// ❌ BAD: Manual form handling
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manual validation
    if (username.length < 3) {
      setErrors({ username: 'Too short' });
    }
  };
};

// ✅ GOOD: Formik + Yup
import { useFormik } from 'formik';
import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      await login(values.username, values.password);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username ? formik.errors.username : undefined}
      />
    </form>
  );
};
```
**Detection:**
- Flag manual form state management (multiple useState for form fields)
- Flag manual validation logic
- Require Formik for forms with >2 fields

---

### FE-010: Component File Organization
**Rule:** Components should follow consistent file structure
**Severity:** Low
**Examples:**
```
// ✅ GOOD: Component structure
components/
  button/
    index.tsx           # Component implementation
    button.styles.ts    # Style definitions
  input/
    index.tsx           # Main input component
    password-input.tsx  # Specialized variant
    text-area.tsx       # Related component
    input.styles.ts     # Shared styles
```
**Detection:**
- Flag components without proper directory structure
- Require style definitions in separate `.styles.ts` files
- Ensure `index.tsx` is the main export

---

## TypeScript Specific Rules

### TS-001: No `any` Type
**Rule:** Avoid using `any` type; use proper types or `unknown`
**Severity:** High
**Examples:**
```typescript
// ❌ BAD
function processData(data: any) { ... }

// ✅ GOOD
function processData(data: JsonObject) { ... }
function processData<T>(data: T) { ... }
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null) {
    // Type guard
  }
}
```
**Detection:**
- Flag all uses of `any` type
- Suggest alternatives: `unknown`, generics, or specific types

---

### TS-002: Explicit Return Types
**Rule:** Functions should have explicit return types
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: Inferred return type
async function getTasks() {
  return TaskService.getTasksForAccount({ accountId });
}

// ✅ GOOD: Explicit return type
async function getTasks(): Promise<Task[]> {
  return TaskService.getTasksForAccount({ accountId });
}
```
**Detection:**
- Flag exported functions without return type annotations
- Require return types for all service methods

---

### TS-003: Use Enums for Constants
**Rule:** Use enums for related constants, not string literals
**Severity:** Medium
**Examples:**
```typescript
// ❌ BAD: String literals
const button = <Button kind="primary" />;

// ✅ GOOD: Enums
export enum ButtonKind {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DANGER = 'danger',
}

const button = <Button kind={ButtonKind.PRIMARY} />;
```
**Detection:**
- Flag repeated string literals
- Suggest enum definitions for related constants

---

## Testing Requirements

### TEST-001: Test Coverage for Services
**Rule:** All service methods must have unit tests
**Severity:** High
**Examples:**
```typescript
// ✅ GOOD: Comprehensive service tests
describe('TaskService', () => {
  describe('createTask', () => {
    it('should create a task with valid params', async () => { ... });
    it('should throw error when account not found', async () => { ... });
  });

  describe('updateTask', () => {
    it('should update task title and description', async () => { ... });
  });
});
```
**Detection:**
- Measure test coverage with Istanbul/NYC
- Require >80% coverage for service files
- Flag uncovered service methods

---

### TEST-002: API Integration Tests
**Rule:** All API endpoints must have integration tests
**Severity:** High
**Examples:**
```typescript
// ✅ GOOD: API integration tests
describe('Task API', () => {
  describe('GET /tasks', () => {
    it('should return list of tasks for authenticated user', async () => {
      const res = await chai
        .request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
    });

    it('should return 401 without auth token', async () => { ... });
  });
});
```
**Detection:**
- Ensure test file exists for each router
- Verify all routes have corresponding tests
- Check HTTP status codes are tested

---

### TEST-003: E2E Tests for Critical Paths
**Rule:** Critical user flows must have Cypress E2E tests
**Severity:** Medium
**Examples:**
```typescript
// ✅ GOOD: E2E test for critical flow
describe('Task Management', () => {
  it('should allow user to create, edit, and delete task', () => {
    cy.login();
    cy.visit('/tasks');

    // Create
    cy.get('[data-testid="add-task-btn"]').click();
    cy.get('[data-testid="title"]').type('New Task');
    cy.get('[data-testid="description"]').type('Description');
    cy.get('[data-testid="submit"]').click();

    // Verify
    cy.contains('New Task').should('be.visible');
  });
});
```
**Detection:**
- Require E2E tests for authentication flows
- Require E2E tests for CRUD operations
- Flag missing test-id attributes on interactive elements

---

## Summary by Severity

### Critical (Must Fix)
- BE-001: Module Independence
- BE-002: Database Indexes
- BE-005: Business Logic in Service Layer
- BE-007: N+1 Query Pattern
- BE-011: Strict Null Checks
- FE-004: API Service Layer
- FE-005: No Multiple Network Calls

### High (Should Fix)
- GP-002: Naming Conventions
- GP-004: OOP over Functional
- GP-006: Avoid Over-Defensive Programming
- GP-007: Proper Encapsulation
- BE-004: CRUD-Based API Design
- BE-006: Consumer-Agnostic Services
- BE-009: Proper Error Handling
- BE-010: Module Export Pattern
- FE-001: No Inline Styling
- FE-003: Reusable Components
- FE-007: Type Safety
- FE-009: Form Handling
- TS-001: No `any` Type
- TEST-001: Service Test Coverage
- TEST-002: API Integration Tests

### Medium (Nice to Have)
- GP-001: Comment Quality
- GP-003: Function Size
- GP-005: Naming Convention
- GP-008: Code Duplication
- BE-003: Single Update Function
- BE-008: Use Temporal
- BE-012: Parameter Patterns
- FE-002: No Style Overrides
- FE-006: State Management
- FE-008: Error Handling
- TS-002: Explicit Return Types
- TS-003: Use Enums
- TEST-003: E2E Tests

### Low
- FE-010: File Organization
