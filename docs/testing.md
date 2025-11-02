# Testing

## Backend Testing

Backend unit and integration tests live under:

```
test/
└─ modules/
   ├─ account/
   ├─ application/
   └─ … (one folder per backend module)
```

Each module mirrors the structure of `src/apps/backend/modules`, keeping test code close to the implementation it exercises.

---

## Running the Test Suite

### Backend Tests

```bash
npm run test
```

This command runs the backend test suite using the configured test framework.

---

## Conventions & Guidelines

| Topic              | Convention                                                                                  |
|--------------------|---------------------------------------------------------------------------------------------|
| **Test discovery** | Standard test framework discovery patterns.                                                  |
| **Database**       | Each test should use fresh test data; clean up after tests.                                 |
| **Naming**         | Test methods use clear, descriptive names; organize tests by feature/module.                |
