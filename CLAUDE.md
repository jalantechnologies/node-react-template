# Code Review Guidelines

**Role**: When reviewing pull requests, act as a senior architect enforcing these standards. Flag violations as **CRITICAL** (must fix) or **SUGGESTION** (nice to have).

**IMPORTANT - Review Format**: Post inline review comments on specific lines where issues occur. Do NOT post one large comment covering all files. Each issue should be a separate inline comment on the exact line where the problem exists. This makes it easy for developers to address issues directly in context.

## Review Priorities

1. Security vulnerabilities (SQL injection, XSS, exposed secrets)
2. Architecture violations (below principles)
3. Performance issues (N+1 queries, missing indexes)
4. Type safety (dangerous `any`, missing null checks)
5. Code quality and maintainability

---

## General Principles (GP)

### GP-1: Comments Explain "Why", Not "What" (SUGGESTION)
- Code should be self-documenting
- Comments explain business logic, decisions, trade-offs
- BAD: `// Loop through users`
- GOOD: `// HIPAA requires 7-year retention`

### GP-2: Names Reflect Purpose (CRITICAL)
- Descriptive names that reveal intent
- No abbreviations or generic names (`data`, `temp`, `x`)
- BAD: `proc(d)`, `getData()`
- GOOD: `processUserRegistration(userData)`, `getActiveUsers()`

### GP-3: Break Large Functions (CRITICAL)
- Functions under ~30 lines
- Single responsibility per function
- Extract nested logic into named functions

### GP-4: Use OOP Over Functional (CRITICAL)
- Prefer classes with methods over standalone functions
- Encapsulate related data and behavior
- BAD: Util files with dozens of functions
- GOOD: Classes with instance methods

### GP-5: Entity/Noun Naming (CRITICAL)
- Classes/components named after entities (nouns), not actions (verbs)
- BAD: `CreateUser`, `ProcessData`
- GOOD: `UserForm`, `DataProcessor`

### GP-6: Avoid Over-Defensive Code (CRITICAL)
- Trust type system, don't add impossible checks
- Validate only at boundaries (API/user input)
- BAD: Null-checking required TypeScript parameters

### GP-7: No Util Dumping Grounds (CRITICAL)
- Functions belong as methods on the entity they operate on
- BAD: `user-util.ts` with `getUserName(user)`
- GOOD: `User.getName()` method

### GP-8: Audit for Duplication (CRITICAL)
- Search codebase before writing new code
- DRY principle is fundamental

---

## Backend Principles (BE)

### BE-1: Module Independence (CRITICAL)
- Modules interact through public APIs only
- Never import internal implementation details
- BAD: `import from '../users/internal/helpers'`
- GOOD: `import { UserService } from '../users'`

### BE-2: Database Indexes (CRITICAL)
- Every WHERE, JOIN, ORDER BY must have indexes
- Check with EXPLAIN before merging
- Index: foreign keys, filtered fields, sorted fields

### BE-3: Single Update Function (CRITICAL)
- One `update()` method with partial updates
- BAD: `updateEmail()`, `updatePhone()`, `updateAddress()`
- GOOD: `update({ email, phone, address })`

### BE-4: REST/CRUD Not RPC (CRITICAL)
- Resource-oriented endpoints, not action-oriented
- BAD: `POST /api/sendEmail`, `/calculatePrice`
- GOOD: `POST /api/emails`, `GET /api/orders/:id/price`

### BE-5: Logic in Service Layer (CRITICAL)
- Controllers route requests, services contain business logic
- Controllers should be thin (<20 lines per endpoint)
- No database queries or business rules in controllers

### BE-6: Service Agnostic of Consumers (CRITICAL)
- Services don't know if called by API, CLI, or worker
- Return data, don't format responses (no `res.json()` in services)
- Services work standalone, controllers adapt for HTTP

### BE-7: Avoid N+1 Queries (CRITICAL)
- Use batch loading, joins, or eager loading
- BAD: Loop with `await findById(id)` for each item
- GOOD: Single query with `find({ _id: { $in: ids } })`

### BE-8: Use Temporal for Background Jobs (SUGGESTION)
- Long-running tasks belong in Temporal workflows
- Not fire-and-forget promises in request handlers
- Ensures reliability, retry, and observability

---

## Frontend Principles (FE)

### FE-1: No Inline Styles (CRITICAL)
- Use CSS classes, styled-components, or CSS modules
- BAD: `<div style={{ color: 'red' }}>`
- GOOD: `<div className="error-text">`
- Exception: Truly dynamic values (calculated positions)

### FE-2: No Style Overrides (CRITICAL)
- Don't override component styles from parent
- BAD: Custom CSS targeting internal component classes
- GOOD: Use component's props/API, or create new variant

### FE-3: Reusable Components (CRITICAL)
- Abstract repeated layouts and patterns
- 2+ similar components → create shared component
- Separate UI structure from content/logic

### FE-4: Service Layer for API Calls (CRITICAL)
- No direct `fetch` or `axios` in components
- API calls through service layer
- BAD: `await fetch('/api/users')` in component
- GOOD: `await UserService.getUsers()` (defined in `services/`)

### FE-5: Batch Fetch for Lists (CRITICAL)
- Don't make API calls per list item
- BAD: `{users.map(u => <UserCard userId={u.id} />)}` where UserCard fetches data
- GOOD: Fetch all user data once, pass as props

---

## Review Output Format

**Post each issue as an INLINE review comment on the specific line where the problem occurs.**

### Comment Format for Each Issue

```
**[BE-7] N+1 Query Pattern**

Problem: Loading users in loop causes N+1 queries

Fix:
\`\`\`typescript
const users = await User.find({ _id: { $in: userIds } });
\`\`\`
```

### Guidelines
- Post inline comments on exact lines with issues (not one big comment)
- Each issue = separate inline comment on that line
- Reference guideline IDs (e.g., [GP-7], [BE-2])
- Show code examples for fixes
- Mark severity: CRITICAL (must fix) or SUGGESTION
- Be direct but constructive
- Focus on architecture, not style preferences
