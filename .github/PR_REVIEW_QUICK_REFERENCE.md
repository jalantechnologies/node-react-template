# PR Review Quick Reference

## 🚀 Quick Commands

```bash
# Before creating a PR
npm run lint              # Run ESLint with custom rules
npm run review:architecture  # Run architecture analysis
npm run review:local      # Run both

# Auto-fix what's possible
npm run lint:fix          # Fix ESLint violations
npm run fmt              # Format code with Prettier
```

## 🔴 Critical Violations (Must Fix)

### BE-001: Module Independence
```typescript
// ❌ Don't import from other module's internal
import TaskRepository from 'backend/modules/task/internal/store/task-repository';

// ✅ Use public API
import { TaskService } from 'backend/modules/task';
```

### BE-002: Database Indexes
```typescript
// ❌ Reference field without index
account: {
  type: Schema.Types.ObjectId,
  ref: 'Account',
  required: true,
}

// ✅ Add index for queries
account: {
  type: Schema.Types.ObjectId,
  ref: 'Account',
  required: true,
  index: true,  // ✅
}
```

### BE-005: Business Logic Location
```typescript
// ❌ Business logic in controller
class TaskController {
  createTask = async (req, res) => {
    const task = await TaskRepository.create({...});
    res.send(task);
  };
}

// ✅ Logic in service, controller handles HTTP
class TaskController {
  createTask = async (req, res) => {
    const task = await TaskService.createTask({...});
    res.status(201).send(serializeTaskAsJSON(task));
  };
}
```

### BE-007: N+1 Query Pattern
```typescript
// ❌ N database calls in loop
for (const id of accountIds) {
  const account = await AccountRepository.findById(id);
}

// ✅ Single batch query
const accounts = await AccountRepository.find({
  _id: { $in: accountIds }
});
```

### FE-004: API Service Layer
```typescript
// ❌ Direct axios in component
const TaskList = () => {
  useEffect(() => {
    axios.get('/api/tasks').then(res => setTasks(res.data));
  }, []);
};

// ✅ Use context + service
const TaskList = () => {
  const { tasksList, getTasks } = useTaskContext();
  useEffect(() => { getTasks(); }, []);
};
```

## ⚠️ High Priority Warnings

### GP-002: Naming Conventions
```typescript
// ❌ Generic names
const data = await fetchStuff();
const temp = user.name;
const handler = () => {...};

// ✅ Descriptive names
const activeTasks = await getActiveTasksForAccount();
const formattedUserName = user.name;
const handleTaskDeletion = () => {...};
```

### GP-007: Proper Encapsulation
```typescript
// ❌ Utility function with domain logic
export function getTaskTimeInTimezone(task, timezone) {...}

// ✅ Encapsulated in class
class Task {
  getTimeInTimezone(timezone: string): Date {...}
}
```

### BE-004: CRUD-Based API Design
```typescript
// ❌ Verb-based routes
router.post('/signup', ctrl.signup);
router.post('/sendEmail', ctrl.sendEmail);

// ✅ Resource-based CRUD
router.post('/accounts', ctrl.createAccount);  // Signup = create account
router.post('/emails', ctrl.createEmail);      // Send = create email
```

### BE-009: Error Handling
```typescript
// ❌ Generic Error
throw new Error('Task not found');

// ✅ Typed error class
export class TaskNotFoundError extends ApplicationError {
  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

throw new TaskNotFoundError(taskId);
```

### FE-001: No Inline Styles
```typescript
// ❌ Inline styles
<div style={{ padding: '20px', color: 'red' }}>

// ✅ Tailwind classes
<div className="p-5 text-red-500">
```

### TS-001: No `any` Type
```typescript
// ❌ any type
function process(data: any) {...}

// ✅ Proper types
function process(data: TaskData) {...}
function process<T>(data: T) {...}
function process(data: unknown) {
  if (isTaskData(data)) {...}
}
```

## 📋 Common Patterns

### Backend Service Pattern
```typescript
// Service: Public API
class TaskService {
  static async createTask(params: CreateTaskParams): Promise<Task> {
    return TaskWriter.createTask(params);
  }
}

// Writer: Mutations (internal)
class TaskWriter {
  static async createTask(params: CreateTaskParams): Promise<Task> {
    const task = await TaskRepository.create({...});
    return TaskUtil.convertTaskDBToTask(task);
  }
}

// Reader: Queries (internal)
class TaskReader {
  static async getTaskById(taskId: string): Promise<Task> {
    const taskDb = await TaskRepository.findOne({ _id: taskId });
    if (!taskDb) throw new TaskNotFoundError(taskId);
    return TaskUtil.convertTaskDBToTask(taskDb);
  }
}
```

### Frontend Component Pattern
```typescript
// Page Component
const TasksPage = () => {
  const { tasksList, getTasks } = useTaskContext();

  useEffect(() => {
    getTasks().catch(error => toast.error(error.message));
  }, []);

  return (
    <VerticalStackLayout gap={7}>
      <HeadingMedium>Tasks</HeadingMedium>
      <TaskList tasks={tasksList} />
    </VerticalStackLayout>
  );
};

// Service Layer
class TaskService extends APIService {
  getTasks = async (): Promise<ApiResponse<Task[]>> => {
    const response = await this.apiClient.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Convert JSON to typed classes
    const tasks = response.data.map(json => new Task(json));
    return new ApiResponse(tasks, undefined);
  };
}

// Type Class
export class Task {
  id: string;
  title: string;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.title = json.title as string;
  }
}
```

### Router Pattern
```typescript
class TaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new TaskController();

    // Apply auth middleware
    router.use(accessAuthMiddleware);

    // CRUD routes
    router.get('/', ctrl.getTasks);         // List
    router.post('/', ctrl.createTask);      // Create
    router.get('/:id', ctrl.getTask);       // Read
    router.patch('/:id', ctrl.updateTask);  // Update
    router.delete('/:id', ctrl.deleteTask); // Delete
  }
}
```

## 🧪 Testing Requirements

```typescript
// TEST-001: Service tests required
describe('TaskService', () => {
  describe('createTask', () => {
    it('should create task with valid params', async () => {...});
    it('should throw error when account not found', async () => {...});
  });
});

// TEST-002: API integration tests required
describe('Task API', () => {
  describe('GET /tasks', () => {
    it('should return tasks for authenticated user', async () => {
      const res = await chai
        .request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
    });
  });
});
```

## 🎯 Severity Levels

| Icon | Level | Action |
|------|-------|--------|
| 🚨 | **Critical** | **MUST FIX** before merge |
| ⚠️ | **High** | Should fix before merge |
| ⚠️ | **Medium** | Should fix soon |
| ℹ️ | **Low** | Nice to have |

## 🔧 Disable Rules (Use Sparingly!)

```typescript
// Disable specific rule with justification
// eslint-disable-next-line local-rules/no-any-type -- External library lacks types
const result: any = externalLib.parse(data);

// Disable for whole file (rarely needed)
/* eslint-disable local-rules/no-internal-imports */
// ... imports ...
/* eslint-enable local-rules/no-internal-imports */
```

## 📚 Full Documentation

- [Complete PR Review Rules](.github/pr-review-rules.md)
- [Setup Guide](.github/PR_REVIEW_SETUP.md)

## 🆘 Need Help?

1. Check rule documentation: `.github/pr-review-rules.md`
2. Search for rule ID (e.g., "BE-001")
3. Ask team for clarification
4. Open issue if rule seems incorrect

---

**💡 Tip:** Run `npm run review:local` before creating PR to catch issues early!
