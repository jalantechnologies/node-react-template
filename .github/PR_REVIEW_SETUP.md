# Automated PR Review System - Setup Guide

This document explains how to set up and use the automated PR review system for the node-react-template project.

## Overview

The automated PR review system helps enforce architectural patterns and coding standards by:

1. **Automated Checks:** Running on every PR automatically via GitHub Actions
2. **Custom ESLint Rules:** Enforcing architecture patterns at development time
3. **Danger.js Bot:** Providing detailed PR comments with violations
4. **Architecture Analysis:** Deep code analysis beyond what linters can catch

## Components

### 1. PR Review Rules (`.github/pr-review-rules.md`)

Comprehensive documentation of all coding standards and architectural patterns organized by:
- General Programming Principles (GP-*)
- Backend Rules (BE-*)
- Frontend Rules (FE-*)
- TypeScript Rules (TS-*)
- Testing Requirements (TEST-*)

Each rule includes:
- Severity level (Critical, High, Medium, Low)
- Examples of violations and correct patterns
- Detection strategies

### 2. GitHub Actions Workflow (`.github/workflows/pr-review-automation.yml`)

Runs automatically on every PR and performs:
- ESLint with custom rules
- TypeScript type checking
- Architecture analysis script
- Danger.js PR review
- Test coverage analysis

### 3. Danger.js Configuration (`dangerfile.ts`)

Automated PR reviewer that:
- Analyzes changed files
- Detects architectural violations
- Posts detailed comments on PRs
- Blocks merging on critical violations

### 4. Custom ESLint Rules (`eslint-rules/index.js`)

Custom ESLint rules for:
- Module independence (BE-001)
- Naming conventions (GP-002)
- Business logic location (BE-005)
- Error handling (BE-009)
- TypeScript any type (TS-001)
- Inline styles (FE-001)
- API service layer (FE-004)
- Function size (GP-003)

### 5. Architecture Analysis Script (`scripts/architecture-review.ts`)

Deep analysis tool that checks:
- Database indexes (BE-002)
- N+1 query patterns (BE-007)
- Test coverage (TEST-001, TEST-002)
- Complex architectural patterns

## Installation

### Step 1: Install Dependencies

```bash
npm install --save-dev danger eslint-plugin-local-rules
```

### Step 2: Configure ESLint Plugin

Create `eslint-plugin-local-rules.js` in the root directory:

```javascript
module.exports = require('./eslint-rules');
```

### Step 3: Update `.eslintrc`

Merge the custom rules configuration into your existing `.eslintrc`:

```json
{
  "plugins": ["local-rules"],
  "rules": {
    "local-rules/no-internal-imports": "error",
    "local-rules/no-generic-names": "warn",
    "local-rules/no-repository-in-controller": "error",
    "local-rules/require-error-classes": "warn",
    "local-rules/no-any-type": "warn",
    "local-rules/no-inline-styles-react": "warn",
    "local-rules/no-direct-axios-in-components": "error",
    "local-rules/max-function-lines": ["warn", { "max": 50 }]
  }
}
```

### Step 4: Add NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "review:architecture": "ts-node scripts/architecture-review.ts",
    "review:local": "npm run lint && npm run review:architecture"
  }
}
```

### Step 5: Configure GitHub Actions

The workflow file is already created at `.github/workflows/pr-review-automation.yml`.

Ensure your repository has the following permissions:
- Settings → Actions → General → Workflow permissions
- Select "Read and write permissions"
- Check "Allow GitHub Actions to create and approve pull requests"

### Step 6: Set Up Branch Protection (Optional but Recommended)

1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable "Require status checks to pass before merging"
4. Select "Automated PR Review" as required check

## Usage

### For Developers

#### Running Checks Locally

Before creating a PR, run:

```bash
# Run ESLint with custom rules
npm run lint

# Run full architecture review
npm run review:architecture

# Run both
npm run review:local
```

#### Understanding Violations

When a violation is detected, you'll see:

```
❌ GP-002: Generic variable name `data` in `src/apps/backend/modules/task/task-service.ts:45`
```

Format: `[Icon] [Rule ID]: [Message]`

- 🚨 = Critical (must fix before merge)
- ⚠️ = Warning (should fix)
- ℹ️ = Info (nice to have)

#### Fixing Common Violations

**BE-001: Module Independence**
```typescript
// ❌ BAD
import TaskRepository from 'backend/modules/task/internal/store/task-repository';

// ✅ GOOD
import { TaskService } from 'backend/modules/task';
```

**BE-005: Business Logic in Controller**
```typescript
// ❌ BAD - Controller
class TaskController {
  createTask = async (req, res) => {
    const task = await TaskRepository.create({ ... });
    res.send(task);
  };
}

// ✅ GOOD - Controller delegates to Service
class TaskController {
  createTask = async (req, res) => {
    const task = await TaskService.createTask({ ... });
    res.send(serializeTaskAsJSON(task));
  };
}

// ✅ GOOD - Service contains logic
class TaskService {
  static async createTask(params: CreateTaskParams): Promise<Task> {
    // Validation, business logic here
    return TaskWriter.createTask(params);
  }
}
```

**FE-004: API Service Layer**
```typescript
// ❌ BAD - Component
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get('/api/tasks').then(res => setTasks(res.data));
  }, []);
};

// ✅ GOOD - Use Context + Service
const TaskList = () => {
  const { tasksList, getTasks } = useTaskContext();
  useEffect(() => {
    getTasks();
  }, []);
};
```

### For Code Reviewers

#### Understanding PR Review Comments

When a PR is created, the automated reviewer will:

1. **Post a summary comment** with all violations grouped by severity
2. **Block merging** if critical violations exist
3. **Provide links** to the full rule documentation

Example comment:

```markdown
## 🤖 Automated Code Review

**Total Issues:** 5
- 🚨 Critical: 2
- ⚠️ Warnings: 3

### 🚨 Critical Issues (Must Fix)

#### BE-001: Module independence violation in `src/apps/backend/modules/account/account-service.ts`
- Importing from `task/internal/*`
- Use public API from `backend/modules/task` instead.

### ⚠️ Warnings (Should Fix)

#### GP-002: Generic variable name `data` in `src/apps/backend/modules/task/task-service.ts`

---
📖 See [PR Review Rules](.github/pr-review-rules.md) for detailed guidelines.
```

#### Manual Review Checklist

Even with automation, manually verify:

1. **Business Logic Correctness:** Does the code solve the right problem?
2. **Security:** Any potential vulnerabilities?
3. **Performance:** Any obvious performance issues?
4. **User Experience:** Does the UI/UX make sense?
5. **Documentation:** Are complex parts documented?

### For Project Maintainers

#### Customizing Rules

To add or modify rules:

1. **Update rule documentation** in `.github/pr-review-rules.md`
2. **Add detection logic** in `dangerfile.ts` or `eslint-rules/index.js`
3. **Update severity** in the rule definition
4. **Test locally** with `npm run review:local`

#### Monitoring Rule Effectiveness

Track metrics:
- Number of violations per PR
- Most common violations
- Time to fix violations
- False positive rate

Use this data to:
- Refine rule definitions
- Improve detection accuracy
- Focus on high-impact rules

#### Adding New Rules

Example: Adding a new backend rule

1. **Document in `.github/pr-review-rules.md`:**

```markdown
### BE-013: Consistent Date Handling
**Rule:** Always use UTC for database timestamps
**Severity:** High
**Examples:**
\`\`\`typescript
// ❌ BAD
const now = new Date().toLocaleString();

// ✅ GOOD
const now = new Date().toISOString();
\`\`\`
```

2. **Add to `dangerfile.ts`:**

```typescript
function checkDateHandling(file: string, content: string) {
  const violations: string[] = [];

  if (file.includes('backend/') && content.includes('.toLocaleString()')) {
    violations.push(
      `⚠️ **BE-013**: Using toLocaleString() in \`${file}\`.\n` +
      `  - Use toISOString() for UTC timestamps.`
    );
  }

  return violations;
}
```

3. **Add to review execution:**

```typescript
if (backendFiles.includes(file)) {
  allViolations.push(...checkDateHandling(file, content));
}
```

## Troubleshooting

### GitHub Action Fails

**Problem:** Workflow fails to run

**Solution:**
1. Check GitHub Actions permissions
2. Verify `GITHUB_TOKEN` has required permissions
3. Check workflow file syntax

### ESLint Custom Rules Not Working

**Problem:** Custom rules not detected

**Solution:**
1. Verify `eslint-plugin-local-rules.js` exists in root
2. Check plugin is listed in `.eslintrc`
3. Restart your editor/IDE
4. Run `npm run lint` to test

### Danger.js Not Commenting on PRs

**Problem:** No automated comments on PRs

**Solution:**
1. Check GitHub Actions logs for errors
2. Verify Danger.js is installed: `npx danger --version`
3. Ensure `GITHUB_TOKEN` has write permissions
4. Check repository settings for PR comments

### False Positives

**Problem:** Rule flags valid code

**Solution:**
1. Add `eslint-disable` comment with justification:
   ```typescript
   // eslint-disable-next-line local-rules/no-any-type -- External library types unavailable
   const result: any = externalLibrary.parse(data);
   ```

2. Update rule logic to handle edge case
3. Document exception in rule definition

## Advanced Configuration

### Severity Levels

Configure which severity levels block PR merging:

```yaml
# In .github/workflows/pr-review-automation.yml
- name: Check violations
  run: |
    CRITICAL_COUNT=$(grep -c "CRITICAL" architecture-violations.md || true)
    if [ "$CRITICAL_COUNT" -gt 0 ]; then
      echo "Found $CRITICAL_COUNT critical violations"
      exit 1
    fi
```

### Custom Notification Channels

Send violation reports to Slack:

```yaml
- name: Notify Slack
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'PR has architecture violations'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Scheduled Reviews

Review entire codebase weekly:

```yaml
name: Weekly Architecture Audit

on:
  schedule:
    - cron: '0 0 * * 0'  # Every Sunday

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run review:architecture
```

## Best Practices

### For Rule Creation

1. **Start Specific:** Begin with narrow, specific rules
2. **Measure Impact:** Track violations before enforcing
3. **Iterate:** Refine based on false positives
4. **Document:** Always include examples in rule docs

### For Teams

1. **Gradual Rollout:** Start with warnings, then errors
2. **Team Agreement:** Discuss and agree on rules
3. **Regular Review:** Review rules quarterly
4. **Share Knowledge:** Use violations as teaching moments

### For Maintenance

1. **Keep Current:** Update rules with architecture changes
2. **Monitor Performance:** Ensure checks run quickly
3. **Reduce Noise:** Remove low-value rules
4. **Version Control:** Track rule changes in git

## Resources

- [PR Review Rules](.github/pr-review-rules.md) - Complete rule documentation
- [Danger.js Documentation](https://danger.systems/js/)
- [ESLint Custom Rules](https://eslint.org/docs/latest/extend/custom-rules)
- [GitHub Actions](https://docs.github.com/en/actions)

## Getting Help

If you encounter issues:

1. Check this documentation
2. Review GitHub Actions logs
3. Search existing issues
4. Create new issue with:
   - Rule ID
   - Code snippet
   - Expected vs actual behavior
   - Error messages

## Contributing

To improve the review system:

1. **Propose New Rules:** Open issue with use case
2. **Report False Positives:** Submit PR with fix
3. **Improve Detection:** Enhance rule logic
4. **Update Documentation:** Keep docs current

---

**Version:** 1.0
**Last Updated:** 2025-01-02
**Maintainers:** @jalantechnologies
