# AGENTS.md

This file provides instructions for AI coding agents working on the node-react-template project.

## Project Overview

Node React Template is a full-stack TypeScript application using Node.js, Express, React, and MongoDB. It follows a modular monorepo architecture with clear separation between backend and frontend concerns.

**Stack:**
- Backend: Node.js 22 + Express + TypeScript + MongoDB (Mongoose)
- Frontend: React 18 + TypeScript + Tailwind CSS
- Build: Webpack 5
- Testing: Mocha + Chai + Sinon
- Deployment: Docker + Kubernetes

**Key Directories:**
- `/src/apps/backend` - Express API with domain-driven modules
- `/src/apps/frontend` - React SPA
- `/test` - Backend integration tests
- `/config` - Multi-environment configuration
- `/docs` - Architecture documentation

## Build and Test Commands

```bash
# Development (runs both frontend and backend with hot reload)
npm run serve

# Build for production
npm run build

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Lint markdown
npm run lint:md
```

## Architecture Principles

### Backend Architecture
- **Modular Design**: Each module (account, authentication, task, etc.) is self-contained
- **Layered Structure**: HTTP → Controller → Service → Reader/Writer → Repository → Database
- **Encapsulation**: Only service layer and types are exported; internals are private
- **Module Independence**: Modules communicate only through public service APIs

### Frontend Architecture
- **Layer-Based**: pages → components → contexts → services
- **State Management**: React Context API (no Redux)
- **Protected Routing**: Auth guards for authenticated routes
- **Service Layer**: All API calls go through service layer, converting JSON to typed classes

## Review Guidelines

### General Programming Principles

#### 1. Code Documentation
- **DO** write comments that explain **why** code exists or why a particular approach was chosen
- **DON'T** write comments that simply restate what the code does (the code itself should be self-explanatory)
- Example:
  ```typescript
  // GOOD: Calculate discount before tax because promotional codes don't apply to tax amount
  const discountedPrice = applyDiscount(price);

  // BAD: Calculate discounted price
  const discountedPrice = applyDiscount(price);
  ```

#### 2. Naming Conventions
- **DO** use names that accurately describe purpose and behavior
- **DO** use entity/noun names for classes and components (e.g., `UserAccount`, `TaskList`)
- **DON'T** use verb-based names for classes/components (e.g., avoid `ProcessUser`, use `UserProcessor`)
- Function names should be verbs (e.g., `fetchUserData`, `calculateTotal`)

#### 3. Function Size and Complexity
- **DO** break large functions into smaller, focused functions
- Each function should do one thing well and have a clear purpose
- Large functions (>50 lines) should be justified or refactored
- Use descriptive function names to explain **what** each does; implementation explains **how**

#### 4. Object-Oriented Design
- **DO** prefer object-oriented patterns over scattered functional code
- **DO** encapsulate related data and behavior in classes
- Example: For Excel parsing, create `Excel`, `Sheet`, `Row`, `Column` classes with encapsulated methods
- **DON'T** create monolithic functional files that try to do everything

#### 5. Defensive Programming
- **DON'T** add unnecessary null checks or optional chaining (`?.`) without understanding when/why values could be null
- **DO** use TypeScript's type system to make nullability explicit
- Over-defensive code with excessive checks makes code harder to maintain and reason about
- If a value can be null, handle it explicitly once at the boundary, not throughout the codebase

#### 6. Encapsulation Over Utilities
- **DON'T** create utility functions when behavior belongs to a specific class
- **DO** encapsulate behavior in the appropriate domain object
- Example:
  ```typescript
  // BAD: Utility function
  function convertAppointmentToLocalTime(appointment: Appointment): Date {
    return convertToTimeZone(appointment.time, appointment.location.timezone);
  }

  // GOOD: Encapsulated in class
  class Appointment {
    getLocalTime(): Date {
      return convertToTimeZone(this.time, this.location.timezone);
    }
  }
  ```

#### 7. Code Reuse
- **DO** audit existing code before adding new functions
- **DO** look for opportunities to refactor and reuse existing code
- **DON'T** duplicate code; if similar functionality exists, extract common logic
- Check if functionality already exists or can be generalized with minor refactoring

---

### Backend-Specific Guidelines

#### 8. Module Independence
- **DON'T** import from other modules' `internal/` directories
- **DO** use only the public API exported from other modules (service layer)
- Module boundaries must be respected
- Example:
  ```typescript
  // BAD
  import { AccountRepository } from 'backend/modules/account/internal/store/account-repository';

  // GOOD
  import { AccountService } from 'backend/modules/account';
  ```

#### 9. Database Indexes
- **DO** ensure database indexes exist for all query patterns
- **DO** review MongoDB queries and verify appropriate indexes in schema files
- Missing indexes cause severe performance degradation at scale
- Index fields that appear in: `find()`, `findOne()`, `sort()`, aggregation `$match` stages

#### 10. API Design - Update Operations
- **DON'T** create multiple update functions for individual fields (e.g., `updateEmail`, `updatePhone`)
- **DO** create a single `update()` function that accepts partial updates
- Example:
  ```typescript
  // BAD
  updateUserEmail(userId: string, email: string)
  updateUserPhone(userId: string, phone: string)

  // GOOD
  updateUser(userId: string, updates: Partial<UserUpdateDTO>)
  ```

#### 11. API Design - RESTful CRUD
- **DO** model APIs using standard CRUD operations: GET, GET (all/paginated), POST, PATCH, DELETE
- **DO** model operations by identifying the right entities/resources first
- **DON'T** create functional endpoints; use resource-based REST
- Example:
  ```typescript
  // BAD: Functional endpoint
  POST /signup

  // GOOD: Resource-based
  POST /accounts

  // BAD: Action-based
  POST /users/activate

  // GOOD: Resource update
  PATCH /users/:id (with status: 'active')
  ```

#### 12. Business Logic Placement
- **DO** write business logic in the service layer, not in controllers or workers
- **DON'T** put business logic in execution contexts (controllers, workers, cron jobs)
- Rationale: Service layer code is testable and reusable across different contexts
- Controllers should only handle HTTP concerns (parsing, validation, serialization)

#### 13. Service Layer Design - Consumer Independence
- **DON'T** create service methods specific to consumers (e.g., `createAccountFromCRM1`, `createAccountFromCRM2`)
- **DO** create generic service methods that work for any consumer
- A module should not know about its consumers
- Example:
  ```typescript
  // BAD: Consumer-specific methods
  class AccountService {
    createAccountFromCRM1(data: CRM1Data) { }
    createAccountFromCRM2(data: CRM2Data) { }
  }

  // GOOD: Generic method
  class AccountService {
    createAccount(data: CreateAccountDTO) { }
  }
  ```

#### 14. Service Layer Interface
- **DO** expose standard CRUD operations on service layer: `get`, `getAll` (paginated), `create`, `update`, `delete`
- Keep service interfaces consistent and predictable
- Additional domain-specific operations are acceptable if they represent clear business operations

#### 15. N+1 Query Pattern
- **DON'T** make N database calls to process N items (N+1 query problem)
- **DO** use batch operations, `$lookup` aggregations, or `populate()` in Mongoose
- Example:
  ```typescript
  // BAD: N+1 queries
  const tasks = await Task.find({ userId });
  for (const task of tasks) {
    task.assignee = await User.findById(task.assigneeId); // N queries!
  }

  // GOOD: Single query with population
  const tasks = await Task.find({ userId }).populate('assignee');
  ```

#### 16. Worker Queue Management
- **DO** use Temporal for background workers and queues
- **DON'T** use Kubernetes CronJobs for worker queues
- Temporal provides better reliability, visibility, and retry mechanisms

---

### Frontend-Specific Guidelines

#### 17. Styling Practices
- **DON'T** use inline styles
- **DO** use Tailwind CSS utility classes
- For complex components, create reusable CSS classes if necessary
- Example:
  ```tsx
  // BAD
  <div style={{ padding: '10px', color: 'blue' }}>

  // GOOD
  <div className="p-2.5 text-blue-500">
  ```

#### 18. Component Style Overrides
- **DON'T** override component styles on a per-page basis
- If you need to override styles frequently, the component is poorly designed or there's a design system issue
- **DO** create component variants or different components for different use cases
- Example:
  ```tsx
  // BAD: Per-page overrides
  <Button className="custom-override-for-this-page" />

  // GOOD: Component variant
  <Button variant="large" />
  ```

#### 19. Layout and Component Reusability
- **DO** break pages into reusable layouts and components
- **DO** abstract components so they're reusable across pages
- An application should have a finite set of well-designed, reusable layouts and components
- Avoid creating page-specific components that duplicate existing functionality

#### 20. API Service Layer
- **DO** call APIs through service layer functions
- **DO** convert JSON responses to typed classes/interfaces representing domain models
- **DON'T** use raw API responses directly in components
- Example:
  ```typescript
  // BAD: Direct API call in component
  const response = await axios.get('/api/users');
  setUsers(response.data); // raw JSON

  // GOOD: Through service layer
  const users = await UserService.fetchUsers(); // returns User[] typed classes
  setUsers(users);
  ```

#### 21. List Rendering Performance
- **DON'T** make individual network calls for each item in a list view
- **DO** fetch all data needed for a list in a single API call (or minimal calls)
- Example:
  ```tsx
  // BAD: N network calls for N items
  {tasks.map(task => (
    <TaskItem task={task} owner={fetchOwner(task.ownerId)} /> // N calls!
  ))}

  // GOOD: Single call with populated data
  const tasksWithOwners = await TaskService.fetchTasksWithOwners();
  {tasksWithOwners.map(task => (
    <TaskItem task={task} owner={task.owner} />
  ))}
  ```

---

## Security Considerations

- Never log Personally Identifiable Information (PII)
- Verify authentication middleware wraps every protected route
- Always validate and sanitize user input
- Use parameterized queries to prevent SQL/NoSQL injection
- Store sensitive data (passwords, tokens) securely using bcrypt and proper encryption
- Never commit secrets to version control; use Doppler or environment variables

## Testing Requirements

- Write integration tests for all new backend endpoints
- Test files should live in `/test/spec/{module-name}/`
- Use Mocha, Chai, and Sinon for backend testing
- Minimum code coverage: 60% (target: 80%)
- Tests must pass before merging PRs

## Commit and PR Guidelines

### Commit Messages
- Use conventional commit format: `type: description`
- Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`
- Keep messages concise and focused on **why**, not what
- Example: `feat: add pagination to task list API`

### Pull Request Requirements
- PR title should clearly describe the change
- Include a summary of what changed and why
- Keep diffs small and focused (single concern per PR)
- Ensure all CI checks pass (lint, tests, sonarqube)
- Link related issues or tickets

---

## Additional Resources

- [Backend Architecture](docs/backend-architecture.md)
- [Frontend Architecture](docs/frontend-architecture.md)
- [Configuration Guide](docs/configuration.md)
- [Testing Guide](docs/testing.md)
- [Engineering Handbook](https://github.com/jalantechnologies/handbook/blob/main/engineering/index.md)

---

## Questions or Issues?

If you're unsure about any guideline or need clarification, refer to the documentation in `/docs` or consult with the team.
