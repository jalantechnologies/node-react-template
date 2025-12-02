# Project Overview

Node React Template is a full-stack application that pairs a modular **Node.js + Express** backend with a **React + TypeScript** frontend. MongoDB is the primary data store, and both halves of the stack share a focus on layered, testable architecture and strict module boundaries.

**Stack:**

- **Backend:** Node 22 · Express · TypeScript · MongoDB (via Mongoose)  
- **Frontend:** React + TypeScript
- **Data Store:** MongoDB
- **Config:** `config` npm package (`NODE_CONFIG_ENV`–driven)  
- **Build Tooling:** npm scripts · Prettier · ESLint/TS tooling  
- **Testing:** Backend test suite via `npm test` (unit + integration under `test/`)  
- **Deployment:** Docker · Kubernetes · DigitalOcean Kubernetes

**Key Directories:**

- `/src/apps/backend` – Express application and backend domain modules  
- `/frontend` – React app (pages, components, contexts, services, routes)  
- `/test` – Backend test suite (`test/modules/<module>/...`)  
- `/docs` – Architecture and operational documentation  
- `/config` – Shared configuration and environment settings

---

## Build and Test Commands

```bash
# Dev mode (frontend + backend, hot reload)
npm run serve

# Build production bundles
npm run build

# Start the built app
npm start

# Backend test suite (unit + integration)
npm test

# JavaScript / TypeScript linting
npm run lint

# Markdown linting
npm run lint:md

# Auto-format (Prettier)
npm run fmt
```

For local development, install dependencies with:

- `npm install` (from repo root) to bootstrap backend + frontend tooling.

---

## Architecture Principles

### Backend Architecture

- **Modular Design:**  
  Each domain module (account, authentication, application, task, etc.) under `src/apps/backend/modules` owns its Express REST API (`rest-api/`), service (`*-service.ts`), and persistence layers (`internal/store/`).  

- **Layered Structure:**  
  `HTTP (Express Request)` → `rest-api (router/controller/serializer)` → `Service` → `Reader/Writer` → `Repository (Mongoose/ODM)` → `MongoDB`.

- **Encapsulation:**  
  Only expose:
  - `<module-name>-service.ts` (public API),
  - `types.ts` (DTOs/domain types),
  - module-specific public exceptions/exports via `index.ts`.  
  Everything under `internal/` is private and must not be imported from other modules.

- **Clear Data Models:**  
  - Use TypeScript interfaces/types and DTOs in `types.ts` to validate and document inputs/outputs at module boundaries.  
  - Use Mongoose (or the configured ODM) schemas for persistence concerns only (`internal/store/*-db.ts`).

### Frontend Architecture

- **Layer-Based:**  
  `pages/` → `components/` → `contexts/` → `services/` (aligned with `docs/frontend-architecture.md`).  

- **State Management:**  
  Prefer React Context + hooks for shared state. Avoid adding new global state libraries (Redux-like) without team approval.

- **Service Layer:**  
  All API calls must go through typed service modules under `frontend/services/` (or `frontend/api/` if present) that:
  - Wrap HTTP calls,
  - Normalize/convert JSON into typed models/interfaces,
  - Hide URL, headers, and low-level HTTP details.

---

## Review Guidelines

Codex must treat the following rules as enforceable criteria during pull-request review.  
All rules below are **P1** unless explicitly marked as **P0**.

---

## General Programming Principles

### 1. Code Documentation

- Comments must describe **intent**, invariants, or non-obvious decisions (**P1**).  
- Redundant comments that restate the code should be removed (**P1**).

### 2. Naming Conventions

- **Backend (TypeScript / JavaScript):**
  - `camelCase` for functions, variables, and object properties (**P1**).
  - `PascalCase` for classes, React components, and types/interfaces (**P1**).
  - `SCREAMING_SNAKE_CASE` for constants where appropriate (**P1**).
- **Frontend (TypeScript / React):**
  - React component files and symbols use `PascalCase` (**P1**).
- React components and backend classes must not use verb-based names (**P1**).  
- Functions, methods, and hooks must use verb-based names (e.g. `getAccount`, `useAccount`, `createSession`) (**P1**).

### 3. Function Size & Complexity

- Functions should have a single clear responsibility (**P1**).  
- Functions exceeding ~50 lines or mixing concerns (validation, database, HTTP composition, etc.) should be decomposed (**P1**).  
- If comments explain control flow instead of naming helpers clearly, extraction into smaller helpers is preferred (**P1**).

### 4. Object-Oriented & Layered Design

- Domain behavior must live in services/domain objects/models (**P1**).  
- Logic must not be scattered across shared utilities when it belongs to a specific module (**P1**).  
- Cross-cutting utilities should be intentionally designed (e.g. `logging`, `config`, `http`) and not accumulate domain decisions.

### 5. Defensive Programming

- Inputs must be validated at module boundaries (Express request schemas, DTOs, or explicit validators) (**P1**).  
- Overuse of `undefined`/`null` checks in the core logic instead of validating and normalizing data at the edges is a **P1**.

### 6. Encapsulation

- Logic must live inside the appropriate module, not in broad utility files or cross-module “god” services (**P1**).  
- Each module should expose a narrow, typed public surface via its `<module-name>-service.ts` and `types.ts`.

### 7. Code Reuse

- If functionality exists elsewhere in the codebase, new code must reuse it.  
- Unnecessary duplication (e.g. reimplementing the same query, validation, or mapping in multiple modules) is a **P1**.

---

## Backend-Specific Rules

### 8. Module Independence

- Importing from another module’s `internal/` directory is a **P1** violation.  
- Cross-module imports must use only public surfaces:
  - `<module-name>-service.ts`,
  - `types.ts`,
  - explicitly exported public exceptions or helpers from `index.ts` (**P1**).

### 9. Database Indexes & Data Access

- Every MongoDB query (`find`, `findOne`, aggregations with `$match`, sorted queries, etc.) must be backed by an index (**P1**).  
- Index definitions must exist in `internal/store/*-repository.ts` and/or `internal/store/*-db.ts` (**P1**).  
- Codex should flag:
  - New queries without a corresponding index definition,
  - Filters or sorts that aren’t covered by an index.

### 10. API Design

- API endpoints must follow RESTful semantics (GET, POST, PATCH, DELETE on resource nouns) (**P1**).  
- A resource must provide a single public update operation using a typed DTO (e.g. `UpdateAccountDetailsParams`) instead of ad-hoc partial updates across multiple endpoints (**P1**).  
- Controllers must be thin and delegate to services.

### 11. Business Logic Placement

- Business logic must be placed in **service layers only** (`<module-name>-service.ts`) (**P1**).  
- Express routes, controllers (`rest-api/*-controller.ts`), CLI scripts, and cron/worker scripts must not contain domain rules beyond orchestration and error mapping (**P1**).

### 12. Cron & Background Workloads

- Asynchronous or recurring work must be implemented using the established background mechanism (Kubernetes CronJobs / worker scripts as documented in `docs/running-scripts-in-production.md`) (**P1**).  
- Request/response handlers must not:
  - Spawn arbitrary threads,
  - Run long-running loops,
  - Block on heavy processing.  
  They may enqueue/schedule work only (**P1**).

### 13. Query Efficiency

- Code must avoid N+1 database queries (**P1**).  
- Filtering must occur in the database (Mongo queries / aggregations), not in Node post-processing over large in-memory arrays (**P1**).  
- Codex should flag patterns such as:
  - Loops that issue one query per item,
  - Fetch-everything queries followed by `.filter`/`.map` on large datasets where targeted queries are possible.

---

## Frontend-Specific Rules

### 14. Styling Practices

- Inline styles (`style={{ ... }}`) are prohibited for layout and design concerns (**P1**).  
- Tailwind utility classes and/or shared CSS modules/components must be used instead (**P1**).  
- One-off inline styles are only acceptable for truly dynamic, non-styling concerns (and must be rare).

### 15. Component Contracts & Variants

- Page-level overrides for shared components must be avoided (**P1**).  
- Shared layout primitives must live under `frontend/components/` or `frontend/layouts/` directories (**P1**).  
- Variants (size, color, state) should be modeled as props or clearly defined sub-components, not per-page forks.

### 16. Data Fetching & State Management

- Network calls must use typed service modules under `frontend/services/` or `frontend/api/` (**P1**).  
- API responses must be normalized into typed models before reaching React state or contexts (**P1**).  
- Side-effectful data fetching must not occur during rendering; hooks (`useEffect`, custom hooks) must be used (**P1**).  
- Re-render loops caused by setting state in render or missing dependency arrays in hooks are violations.

### 17. List Rendering Performance

- Rendering a collection must not issue N network calls (e.g. one request per row); batching is required (**P1**).  
- Codex should flag:
  - Data fetching inside item components instead of list-level hooks,
  - Missing pagination/limit when large collections are rendered.

---

## Security Rules

### P0: Blocking Issues

The following are **P0** and must block merges:

- Logging, returning, or echoing PII (personally identifiable information) is a **P0**.  
- Missing validation/sanitization of external input (HTTP requests, query params, headers, body, etc.) is a **P0**.  
- Secrets must never appear in the codebase or logs (API keys, tokens, passwords, private keys, etc.) (**P0**).  
- Raw Mongo query fragments built directly from user input (e.g. concatenating strings into query objects) are a **P0**.  

All other security-related concerns not listed as P0 are **P1**.

---

## Testing Requirements

- New backend endpoints or services must include or update test coverage under `test/modules/<module>/...` (**P1**).  
- Integration tests must live within `test/modules/<module>/` as well, mirroring the backend module structure (**P1**).  
- Coverage below **60%** is a **P1**; Codex should flag PRs that reduce coverage or introduce untested critical paths.  
- Tests must:
  - Use fresh test data and clean up after themselves,
  - Assert behavior and contracts (not implementation details).

---

## PR & Commit Requirements

### Commits

- Commit messages must follow **Conventional Commits** (e.g. `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, etc.) (**P1**).  
- Messages must describe **intent and rationale**, not just “update”, “fix”, or “changes” (**P1**).

### Pull Requests

- PR title must summarize the change clearly (**P1**).  
- PR body must include:
  - **Rationale** (why the change is needed),
  - **Testing evidence** (what was run: `npm test`, manual steps, screenshots) (**P1**).  
- PR must address a single coherent concern; unrelated changes should be split into separate PRs (**P1**).  
- All linting, typing, and test checks must pass (**P1**).

---

## Additional Resources

- [Backend Architecture](docs/backend-architecture.md)  
- [Frontend Architecture](docs/frontend-architecture.md)  
- [Configuration Guide](docs/configuration.md)  
- [Testing Guide](docs/testing.md)  
- [Engineering Handbook](https://github.com/jalantechnologies/handbook/blob/main/engineering/index.md)
