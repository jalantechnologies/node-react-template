# Code Review Guidelines

Comprehensive architectural and coding standards for automated code review. Each guideline is in a separate file for easy maintenance and expansion.

## Quick Reference

### General Programming Principles

| ID | Principle | Severity | File |
|----|-----------|----------|------|
| GP-1 | Comments Should Explain "Why", Not "What" or "How" | SUGGESTION | [gp-01-comments-explain-why.md](general/gp-01-comments-explain-why.md) |
| GP-2 | Function and Variable Names Must Reflect Their Purpose | CRITICAL | [gp-02-naming-reflects-purpose.md](general/gp-02-naming-reflects-purpose.md) |
| GP-3 | Break Large Functions Into Smaller, Focused Functions | CRITICAL | [gp-03-break-large-functions.md](general/gp-03-break-large-functions.md) |
| GP-4 | Use Object-Oriented Design Over Functional Programming | CRITICAL | [gp-04-use-oop-over-functional.md](general/gp-04-use-oop-over-functional.md) |
| GP-5 | Use Entity/Noun Naming for Classes and Components | CRITICAL | [gp-05-entity-noun-naming.md](general/gp-05-entity-noun-naming.md) |
| GP-6 | Avoid Over-Defensive Programming | CRITICAL | [gp-06-avoid-over-defensive.md](general/gp-06-avoid-over-defensive.md) |
| GP-7 | Follow Encapsulation - Avoid Util Dumping Grounds | CRITICAL | [gp-07-encapsulation-over-utils.md](general/gp-07-encapsulation-over-utils.md) |
| GP-8 | Audit Code for Duplication Before Adding New Functions | CRITICAL | [gp-08-audit-for-duplication.md](general/gp-08-audit-for-duplication.md) |

### Backend Principles

| ID | Principle | Severity | File |
|----|-----------|----------|------|
| BE-1 | Modules Must Not Depend on Internals of Other Modules | CRITICAL | [be-01-module-independence.md](backend/be-01-module-independence.md) |
| BE-2 | Ensure Database Indexes Exist for Query Patterns | CRITICAL | [be-02-database-indexes.md](backend/be-02-database-indexes.md) |
| BE-3 | Expose Single Update Function, Not Field-Specific Updates | CRITICAL | [be-03-single-update-function.md](backend/be-03-single-update-function.md) |
| BE-4 | Model APIs Using REST/CRUD, Not Functional Endpoints | CRITICAL | [be-04-rest-not-rpc.md](backend/be-04-rest-not-rpc.md) |
| BE-5 | Write Business Logic in Service Layer, Not Controllers | CRITICAL | [be-05-logic-in-service-layer.md](backend/be-05-logic-in-service-layer.md) |
| BE-6 | Service Layer Should Not Know About Its Consumers | CRITICAL | [be-06-service-agnostic-consumers.md](backend/be-06-service-agnostic-consumers.md) |
| BE-7 | Avoid N+1 Query Patterns | CRITICAL | [be-07-avoid-n-plus-1.md](backend/be-07-avoid-n-plus-1.md) |
| BE-8 | Use Temporal for Background Jobs | SUGGESTION | [be-08-temporal-for-workers.md](backend/be-08-temporal-for-workers.md) |

### Frontend Principles

| ID | Principle | Severity | File |
|----|-----------|----------|------|
| FE-1 | Avoid Inline Styles | CRITICAL | [fe-01-no-inline-styles.md](frontend/fe-01-no-inline-styles.md) |
| FE-2 | Avoid Per-Component Style Overrides | CRITICAL | [fe-02-no-style-overrides.md](frontend/fe-02-no-style-overrides.md) |
| FE-3 | Abstract Layouts and Components for Reusability | CRITICAL | [fe-03-reusable-components.md](frontend/fe-03-reusable-components.md) |
| FE-4 | API Calls Must Go Through Service Layer | CRITICAL | [fe-04-service-layer-api-calls.md](frontend/fe-04-service-layer-api-calls.md) |
| FE-5 | Avoid Per-Item Network Calls for List Views | CRITICAL | [fe-05-batch-fetch-lists.md](frontend/fe-05-batch-fetch-lists.md) |

## Using These Guidelines

### For Automated Review

The GitHub Actions workflow automatically loads all guidelines and uses them during PR review. Guidelines are concatenated and provided as context to the AI reviewer.

### Adding a New Guideline

1. **Choose the category**: General, Backend, or Frontend
2. **Create a new file**: Use next ID in sequence (e.g., `gp-09-...`, `be-09-...`, `fe-06-...`)
3. **Follow the template**: See [TEMPLATE.md](TEMPLATE.md)
4. **Update this README**: Add entry to the appropriate table above

### Editing a Guideline

Simply edit the markdown file directly. Changes take effect on the next PR review.

### Removing a Guideline

1. Delete the markdown file
2. Remove the entry from this README
3. Consider marking as deprecated first if referenced elsewhere

## Guideline Structure

Each guideline file contains:

- **Principle**: One-sentence description
- **Severity**: `[CRITICAL]` or `[SUGGESTION]`
- **Why This Matters**: Explanation of importance
- **Bad Examples**: Anti-patterns with explanations
- **Good Examples**: Correct approaches with explanations
- **Review Checklist**: Specific items to check

## Severity Levels

- **CRITICAL**: Must be fixed before merge
  - Security vulnerabilities
  - Architecture violations
  - Performance problems
  - Type safety issues

- **SUGGESTION**: Improves quality but not blocking
  - Code style improvements
  - Better naming
  - Refactoring opportunities

## Architecture Context

These guidelines build on our architecture documentation:

- [Backend Architecture](../../docs/backend-architecture.md)
- [Frontend Architecture](../../docs/frontend-architecture.md)
- [Engineering Handbook](https://github.com/jalantechnologies/handbook/blob/main/engineering/index.md)

## Feedback Format

When reviewing PRs, reference guidelines like this:

```
[GP-7] Follow Encapsulation

Location: appointment-util.ts:45-52

Problem: This utility function should be encapsulated in the Appointment class.

Current:
  export function getLocalTime(appointment: Appointment) { ... }

Suggested:
  class Appointment {
    getLocalTime(): Date { ... }
  }
```

## Maintenance

- Keep guidelines focused and atomic
- Update examples when patterns evolve
- Mark deprecated guidelines when architecture changes
- Link to architecture docs for detailed context
- Review and update quarterly

## Statistics

- **Total Guidelines**: 21
- **Critical**: 19
- **Suggestions**: 2
- **Last Updated**: 2025-11-02
