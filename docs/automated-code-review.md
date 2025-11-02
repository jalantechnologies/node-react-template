# Automated Code Review

This template includes a **zero-configuration** automated code review system powered by Claude AI. Simply fork the template, add your API key, and get instant code reviews on every PR - no manual setup required!

Perfect for:
- Maintaining architectural consistency across teams
- Catching security vulnerabilities early
- Reducing manual PR review time by 50-70%

## Overview

When enabled (just add API key), Claude automatically reviews all non-draft pull requests and provides feedback on:

**Built-in Review (Claude's Expertise):**
- Security vulnerabilities (SQL injection, XSS, exposed secrets)
- Bugs and logic errors (edge cases, race conditions)
- Performance issues (N+1 queries, memory leaks)
- Type safety (TypeScript errors, dangerous `any` types)
- Code quality (complexity, readability, error handling)
- Best practices (React hooks, async/await, resource cleanup)
- Testing coverage and quality

**Custom Review (Your Standards):**
- Architecture adherence (21 comprehensive principles)
- Project-specific coding standards
- Module boundaries and encapsulation
- API design patterns
- Component structure and styling

## Setup

The automated code review system works immediately after forking the template. **No manual GitHub App installation required!**

### 1. Add the Anthropic API Key (Only Required Step)

1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Go to your repository's **Settings → Secrets and Variables → Actions**
3. Choose one of the following options:

#### Option A: GitHub Secret (Recommended for Security)

1. Click **New repository secret**
2. Add:
   - **Name**: `CODE_REVIEW_ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key (starts with `sk-ant-...`)

**Best for:** Production use, encrypted storage

#### Option B: GitHub Variable (Easier for Testing)

1. Click on the **Variables** tab
2. Click **New repository variable**
3. Add:
   - **Name**: `CODE_REVIEW_ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key (starts with `sk-ant-...`)

**Best for:** Quick testing, easier to view/update

---

**Priority Order:**
The workflow checks for the API key in this order:
1. GitHub Variable (`vars.CODE_REVIEW_ANTHROPIC_API_KEY`)
2. GitHub Secret (`secrets.CODE_REVIEW_ANTHROPIC_API_KEY`)

> **Note**: If no API key is configured, automated reviews are automatically skipped. This allows you to control when automated reviews are active.

### 2. Verify Setup

1. Create a non-draft pull request
2. Within 30-60 seconds, an automated code review comment will appear
3. That's it

## How It Works

### Automatic Reviews

When a non-draft PR is opened or updated:
1. The CI workflow runs automatically with multiple jobs in parallel: lint, SonarQube, tests, and **review**
2. The **review** job loads all guidelines from `.github/code-review-guidelines/`
3. Collects changed files and their contents
4. Sends everything to Claude API with comprehensive review prompt
5. Claude analyzes using both built-in expertise AND custom guidelines
6. Posts detailed review as a PR comment

**Runs in Parallel:** The AI review runs alongside other checks (lint, tests), providing fast feedback without waiting for other jobs.

**No manual steps, no GitHub App installation, no configuration needed** - just set the API key and it works!

### Review Guidelines

All review criteria are organized in `.github/code-review-guidelines/` with separate files for each principle. This makes them easy to maintain, update, and expand.

**Directory Structure:**
```
.github/code-review-guidelines/
├── README.md              # Index and quick reference
├── TEMPLATE.md            # Template for new guidelines
├── general/               # General programming principles
│   ├── gp-01-comments-explain-why.md
│   ├── gp-02-naming-reflects-purpose.md
│   ├── gp-03-break-large-functions.md
│   ├── gp-04-use-oop-over-functional.md
│   ├── gp-05-entity-noun-naming.md
│   ├── gp-06-avoid-over-defensive.md
│   ├── gp-07-encapsulation-over-utils.md
│   └── gp-08-audit-for-duplication.md
├── backend/               # Backend-specific principles
│   ├── be-01-module-independence.md
│   ├── be-02-database-indexes.md
│   ├── be-03-single-update-function.md
│   ├── be-04-rest-not-rpc.md
│   ├── be-05-logic-in-service-layer.md
│   ├── be-06-service-agnostic-consumers.md
│   ├── be-07-avoid-n-plus-1.md
│   └── be-08-temporal-for-workers.md
└── frontend/              # Frontend-specific principles
    ├── fe-01-no-inline-styles.md
    ├── fe-02-no-style-overrides.md
    ├── fe-03-reusable-components.md
    ├── fe-04-service-layer-api-calls.md
    └── fe-05-batch-fetch-lists.md
```

**21 Comprehensive Principles:**

- **General (GP-1 to GP-8):** Comments explain "why", naming standards, function decomposition, OOP over functional, entity/noun naming, avoiding over-defensive code, proper encapsulation, audit for duplication

- **Backend (BE-1 to BE-8):** Module independence, database indexes, single update functions, RESTful API design, logic in service layer, service agnostic of consumers, avoid N+1 queries, Temporal for workers

- **Frontend (FE-1 to FE-5):** No inline styles, no style overrides, reusable components, service layer for API calls, batch fetching for lists

Each principle includes severity level (`[CRITICAL]` or `[SUGGESTION]`), detailed explanations, multiple good/bad code examples, why it matters, and review checklists.

See [Code Review Guidelines README](../.github/code-review-guidelines/README.md) for complete index and details.

## Customizing Review Concerns

The guidelines are organized into separate files for easy maintenance. Each principle is self-contained and can be independently added, edited, or removed.

### Adding a New Principle

1. **Determine the category:** General, Backend, or Frontend
2. **Choose the next ID:**
   - General: GP-9, GP-10, ...
   - Backend: BE-9, BE-10, ...
   - Frontend: FE-6, FE-7, ...
3. **Create a new file** in the appropriate directory:
   - `.github/code-review-guidelines/general/gp-09-your-principle.md`
   - `.github/code-review-guidelines/backend/be-09-your-principle.md`
   - `.github/code-review-guidelines/frontend/fe-06-your-principle.md`
4. **Use the template** at `.github/code-review-guidelines/TEMPLATE.md`
5. **Update the README** at `.github/code-review-guidelines/README.md` to add your principle to the table

### Example: Adding a New Backend Principle

Create `.github/code-review-guidelines/backend/be-09-soft-deletes.md`:

```markdown
# BE-9: Use Soft Deletes Instead of Hard Deletes

**Severity:** `[CRITICAL]`

## Principle

Never permanently delete data. Use a `deletedAt` timestamp to mark records as deleted.

## Why This Matters

- Enables data recovery from accidental deletions
- Maintains audit trails for compliance
- Prevents cascading data loss
- Allows historical analysis

## Bad Example

\`\`\`typescript
async function deleteAccount(accountId: string) {
  await Account.deleteOne({ _id: accountId });
  // Data is gone forever
}
\`\`\`

**Problems:**
- Cannot recover from mistakes
- Breaks referential integrity
- Loses audit history

## Good Example

\`\`\`typescript
async function deleteAccount(accountId: string) {
  await Account.updateOne(
    { _id: accountId },
    { deletedAt: new Date() }
  );
}

// Always filter out deleted records in queries
Account.find({ deletedAt: null });
\`\`\`

**Benefits:**
- Safe recovery within 90 days
- Complete audit trail
- Can run analytics on deleted data

## Review Checklist

- [ ] Are DELETE operations using soft deletes?
- [ ] Do queries filter out deleted records?
- [ ] Is deletedAt indexed for performance?
```

Then update `.github/code-review-guidelines/README.md`:

```markdown
| BE-9 | Use Soft Deletes Instead of Hard Deletes | CRITICAL | [be-09-soft-deletes.md](backend/be-09-soft-deletes.md) |
```

### Editing a Principle

1. Open the specific guideline file (e.g., `gp-03-break-large-functions.md`)
2. Make your changes
3. Save the file
4. Changes take effect on the next PR review

### Removing a Principle

1. Delete the guideline file
2. Remove the entry from `.github/code-review-guidelines/README.md`
3. Consider marking as deprecated first if widely referenced

### Benefits of Separate Files

- **Easy to maintain:** Each principle is self-contained
- **No conflicts:** Multiple people can edit different principles simultaneously
- **Version control:** Clear history of changes per principle
- **Scalable:** Can add hundreds of principles without file becoming unwieldy
- **Flexible:** Can be as detailed as needed without affecting other guidelines

## Review Output

Claude categorizes feedback into:

**Critical Issues** (should block merge):
- Security vulnerabilities
- Architecture violations
- Potential bugs
- Performance problems (N+1 queries, missing indexes)

**Suggestions** (nice to have):
- Code style improvements
- Better naming conventions
- Refactoring opportunities
- Enhanced error handling

## Manual Reviews

You can also request manual reviews by:
- Commenting `@claude please review this change` on any PR
- Asking specific questions like `@claude is this the right place for this business logic?`
- Requesting focused reviews like `@claude check for security issues`

## Costs

Claude uses the Anthropic API which charges based on tokens processed:
- Small PRs: ~$0.01-0.05 per review
- Medium PRs: ~$0.05-0.15 per review
- Large PRs: ~$0.15-0.50 per review

Monitor your usage in the [Anthropic Console](https://console.anthropic.com/).

## Troubleshooting

### Reviews aren't triggering

**Symptom:** No code review comment appears on PR

**Causes:**
1. PR is marked as draft
2. `CODE_REVIEW_ANTHROPIC_API_KEY` not configured
3. Workflow file syntax error

**Fix:**
1. Mark PR as "Ready for review"
2. Add API key to GitHub Secrets or Variables
3. Check Actions tab for workflow errors in the "ci / review" job

### Reviews are too generic
1. Add more specific criteria to guideline files in `.github/code-review-guidelines/`
2. Include examples of what to look for
3. Reference specific files or patterns in your codebase

### Too many false positives
1. Refine guidelines to be more precise
2. Add counter-examples of acceptable patterns
3. Consider adjusting the review prompt in `.github/workflows/ci.yml` (review job)

## Disabling Automated Reviews

To temporarily disable automated reviews:
1. Go to repository **Settings → Secrets and Variables → Actions**
2. Remove or rename the `CODE_REVIEW_ANTHROPIC_API_KEY` (from both Secrets and Variables)

To permanently disable:
1. Remove the `review` job from `.github/workflows/ci.yml`

## Resources

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code/github-actions)
- [Anthropic API Pricing](https://www.anthropic.com/pricing)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
