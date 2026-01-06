# Security Scanning Policy

## Overview
This project implements a **zero-tolerance policy** for new security vulnerabilities introduced in pull requests.

## CI Security Scanning

### Scan Coverage
The CI pipeline scans:
- **Changed Files**: Only files modified in the PR (filesystem scan)
- **IaC Changes**: Kubernetes manifests in `lib/kube/` directory
- **Docker Image**: Built from the PR's Dockerfile

### Severity-Based Gating

| Severity | Policy | Action |
|----------|--------|--------|
| **CRITICAL** | ❌ Zero Tolerance | CI fails immediately |
| **HIGH** | ❌ Zero Tolerance | CI fails immediately |
| **MEDIUM/LOW** | ⚠️ Warning Only | CI passes, comment posted |

### Key Principles

1. **Zero Tolerance for New Vulnerabilities**
   - ANY HIGH or CRITICAL vulnerability in changed files fails CI
   - No threshold - even 1 HIGH vulnerability is unacceptable in new code
   - Encourages developers to fix vulnerabilities before merging

2. **Fail-Fast Approach**
   - Scans fail immediately when vulnerabilities are detected
   - Saves CI time and provides faster feedback
   - Clear error messages in GitHub Actions UI

3. **Visibility**
   - GitHub Actions annotations (`::error::` and `::warning::`)
   - PR comments with detailed vulnerability reports
   - Scan results visible without scrolling through logs

## Concurrency Control

Multiple commits to the same PR trigger automatic cancellation:
- Latest commit's CI run continues
- Previous runs are cancelled automatically
- Saves CI resources and reduces queue time

## Scan Types

### 1. Filesystem Scan
- **Target**: Changed files in the PR
- **Tool**: Trivy
- **Scope**: Dependencies in `package-lock.json`, source code
- **Fails on**: Any CRITICAL or HIGH vulnerability

### 2. IaC Scan
- **Target**: Kubernetes manifests in `lib/kube/`
- **Tools**: Trivy + Checkov
- **Scope**: Misconfigurations, security issues
- **Fails on**: Any CRITICAL or HIGH vulnerability, or Checkov failures

### 3. Docker Image Scan
- **Target**: Docker image built from PR
- **Tool**: Trivy
- **Scope**: Base image vulnerabilities, installed packages
- **Fails on**: Any CRITICAL or HIGH vulnerability

## Developer Workflow

### When CI Fails

1. **Check GitHub Actions UI**
   - Look for `::error::` annotations in the workflow summary
   - Shows vulnerability count and severity

2. **Review PR Comment**
   - Detailed vulnerability report posted automatically
   - Includes CVE IDs, affected packages, and fix versions

3. **Fix Vulnerabilities**
   - Update dependencies to fixed versions
   - Remove vulnerable packages if possible
   - Use `.trivyignore` only for false positives (requires review)

### Example Error Messages

```
::error::Found 3 CRITICAL vulnerabilities in changed files
```

```
❌ Found 2 HIGH vulnerabilities in Docker image!
Policy: Zero tolerance for new vulnerabilities. Any HIGH or CRITICAL vulnerability fails CI.
CI is failing immediately. Check the PR comment for details.
```

## Suppressing False Positives

Use `.trivyignore` file to suppress false positives:

```
# False positive - package not actually used in production
CVE-2023-12345

# Vulnerability in dev dependency with no fix available
CVE-2023-67890
```

**Important**: All `.trivyignore` entries should be reviewed and approved in code review.

## Best Practices

1. **Keep Dependencies Updated**
   - Regularly update `package-lock.json`
   - Use Dependabot for automated updates

2. **Review Security Advisories**
   - Check GitHub Security Advisories
   - Monitor CVE databases for your dependencies

3. **Minimize Attack Surface**
   - Remove unused dependencies
   - Use minimal base images for Docker

4. **Fix Before Merge**
   - Don't merge PRs with known vulnerabilities
   - Security is not negotiable

## Questions?

Contact the DevOps team or open an issue in this repository.
