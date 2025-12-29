# Node React Template
# this is for PR is created for testing
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

## Documentation Directory

- [Getting Started](docs/getting-started.md)
- [Backend Architecture](docs/backend-architecture.md)
- [Frontend Architecture](docs/frontend-architecture.md)
- [Logging](docs/logging.md)
- [Configuration](docs/configuration.md)
- [Testing](docs/testing.md)
- [CI/CD](docs/deployment.md)
- [Running Scripts in Production](docs/running-scripts-in-production.md)

## Best Practices

Once you have familiarized yourself with the documentation, head over to the [Engineering Handbook](https://github.com/jalantechnologies/handbook/blob/main/engineering/index.md) to learn about the best practices we follow at Better Software.

PS: Before you start working on the application, these [three git settings](https://spin.atomicobject.com/git-configurations-default/) are a must-have!
