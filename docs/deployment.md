# Deployment

This project deploys on **Kubernetes** via **GitHub Actions** using workflows defined in [github-ci](https://github.com/jalantechnologies/github-ci).

---

## Deployment Environments

### Per PR (Preview) Deployment

Each pull request triggers a temporary, isolated environment with:

- A unique URL generated for every pull request (e.g., `https://<github_sha>.preview.platform.bettrhq.com`)
- Automatic deployment on every push to the PR
- Automatic cleanup when the PR is closed

This ensures every PR can be tested independently before merging.

### Permanent Preview

- Always reflects the latest `main` branch
- Useful for ongoing testing of the integrated codebase
- URL: [https://preview.node-react-template.platform.bettrhq.com](https://preview.node-react-template.platform.bettrhq.com)

### Production

- The live app for end users
- Deploys automatically on merge to the `main` branch
- URL: [https://node-react-template.platform.bettrhq.com](https://node-react-template.platform.bettrhq.com)

---

## Deployment Pipeline

Deployments are handled via **GitHub Actions** and [github-ci](https://github.com/jalantechnologies/github-ci).

- Preview deploys run per PR
- Production deploys are triggered on merge to the main branch
- All credentials and secrets are securely managed via environment variables
