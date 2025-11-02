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

### E2E Tests

For end-to-end testing, we use Cypress.

```bash
# Run E2E tests headless
npm run e2e

# Open Cypress Test Runner GUI
npm run cy:open
```

---

## E2E Testing with Cypress

### Pre Requirements

Get the application up and running via following steps in [Getting Started](getting-started.md)

### Running specs from the command line

```shell
# run the entire suite
cypress run

# run headless chrome
cypress run --headless --browser chrome

# run an individual spec file
cypress run --spec "cypress/e2e/login.spec.cy.ts"

# run all specs within the folder matching the glob (Note: Using double quotes is strongly recommended)
cypress run --spec "cypress/e2e/**/*"
```

### Running specs from the GUI

1. Open the Cypress Test Runner and click on any types of testing _E2E Testing_ & _Component Testing_.

```shell
npm run cy:open
```

2. The Cypress Test Runner will open a new window with browser options, select respective browser.

3. The Cypress Test Runner will open a new window with specs, clicking on any spec will execute the test in browser.

---

## Troubleshooting

If you're running into `npm ERR! code ELIFECYCLE npm ERR! err no1` error, follow these steps to fix it:

- `sudo npm cache clean -f` (force) clear your npm cache
- `sudo npm install -g n` install n
- `sudo n stable` upgrade to the current stable version

For more detailed info, check out this official [guide](https://docs.cypress.io/guides/references/troubleshooting) on troubleshooting.

---

## Conventions & Guidelines

| Topic              | Convention                                                                                  |
|--------------------|---------------------------------------------------------------------------------------------|
| **Test discovery** | Standard test framework discovery patterns.                                                  |
| **Database**       | Each test should use fresh test data; clean up after tests.                                 |
| **Naming**         | Test methods use clear, descriptive names; organize tests by feature/module.                |
