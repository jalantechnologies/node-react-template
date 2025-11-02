# Node React Template

Boilerplate project for Node.js, Express, React & MongoDB based projects. This README documents the steps necessary to get the application up and running, and various components of the application.

| Build Status                                                                                                                                                                                                                                     |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [![Production Deploy](https://github.com/jalantechnologies/node-react-template/actions/workflows/production_on_push.yml/badge.svg?branch=main)](https://github.com/jalantechnologies/node-react-template/actions/workflows/production_on_push.yml) |

### Environments & URLs
This project has three deployment environments that everyone can access:

- **Production**
  - The live app for end users.
  - URL: [https://node-react-template.platform.bettrhq.com](https://node-react-template.platform.bettrhq.com)

- **Preview (per PR)**
  - A temporary environment for testing the latest changes in each PR
  - A unique URL is generated for every pull request (e.g. `https://<github_sha>.preview.platform.bettrhq.com`).

- **Permanent Preview**
  - Always reflects the latest `main` branch.
  - Useful for ongoing testing of the integrated codebase.
  - URL: [https://preview.node-react-template.platform.bettrhq.com](https://preview.node-react-template.platform.bettrhq.com)

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment. When you open or update a pull request, two independent tracks run in parallel:

### Quality Checks Track (Advisory)
Provides code quality feedback without blocking deployments:

1. **Lint** (~30s) - ESLint checks for code style and potential errors
2. **SonarQube Analysis** (~60s) - Code quality metrics, complexity, and code smells
3. **Code Review** (~90s) - Automated code review (runs only after lint and SonarQube pass)

### Build & Test Track
Validates functionality and deploys preview environments:

1. **Build Docker Image** (~2-3 min) - Creates containerized application
2. **Integration Tests** (~1 min) - Runs `compose:test` with MongoDB
3. **Deploy Preview** (~1 min) - Deploys to `{pr-name}.preview.platform.bettrhq.com`

### Deployment Workflows

- **Preview Environment (PR)** - Automatic preview deployment for each PR
- **Production Deployment** - Deploys to production when code is merged to `main`
- **Permanent Preview Deployment** - Updates permanent preview when `main` changes

**Note:** Code merged to `main` must go through pull requests with passing quality checks. Production and permanent preview deployments skip redundant checks since they've already been validated at the PR level.

## Documentation Directory

- [Getting Started](docs/getting-started.md)
- [Backend Architecture](docs/backend-architecture.md)
- [Frontend Architecture](docs/frontend-architecture.md)
- [Logging](docs/logging.md)
- [Configuration](docs/configuration.md)
- [Testing](docs/testing.md)
- [Deployment](docs/deployment.md)
- [Running Scripts in Production](docs/running-scripts-in-production.md)

## Best Practices

Once you have familiarized yourself with the documentation, head over to the [Engineering Handbook](https://github.com/jalantechnologies/handbook/blob/main/engineering/index.md) to learn about the best practices we follow at Better Software.

PS: Before you start working on the application, these [three git settings](https://spin.atomicobject.com/git-configurations-default/) are a must-have!
