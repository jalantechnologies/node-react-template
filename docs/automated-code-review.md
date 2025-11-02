# Automated Code Review

This project uses a centralized AI-powered code review system that automatically reviews every pull request using Claude AI.

## Overview

All code reviews are powered by the [node-react-template-review-agent](https://github.com/jalantechnologies/node-react-template-review-agent) repository, which provides:

- **21 comprehensive review guidelines** (general, backend, frontend)
- **Built-in security and bug detection** using Claude's expertise
- **Consistent standards** across all node-react-template projects
- **Automatic updates** when guidelines are improved
- **90% cost reduction** via prompt caching

## Setup

**Only 1 step required:**

Add `CODE_REVIEW_ANTHROPIC_API_KEY` to your repository secrets or variables:

1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Go to **Settings → Secrets and Variables → Actions**
3. Add as **Secret** (recommended) or **Variable**:
   - Name: `CODE_REVIEW_ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key (starts with `sk-ant-...`)

That's it! Reviews will automatically appear on every non-draft PR.

## How It Works

### Review Process

1. You open a PR → CI workflow triggers
2. CI calls centralized review agent
3. Agent loads 21 architectural guidelines (cached)
4. Agent analyzes your PR changes
5. Claude reviews for security, bugs, architecture, performance
6. Review posted as PR comment (30-60 seconds)

### What's Reviewed

**Claude's Built-in Expertise:**
- Security vulnerabilities (SQL injection, XSS, exposed secrets)
- Bugs and logic errors (edge cases, race conditions)
- Performance issues (N+1 queries, memory leaks)
- Type safety (TypeScript errors, dangerous `any` types)
- Code quality (complexity, readability, error handling)
- Best practices (React hooks, async/await, resource cleanup)
- Testing coverage and quality

**Project-Specific Guidelines:**
- **GP-1 to GP-8**: General principles (naming, OOP, encapsulation, etc.)
- **BE-1 to BE-8**: Backend principles (module independence, indexes, REST design, etc.)
- **FE-1 to FE-5**: Frontend principles (no inline styles, reusable components, etc.)

See [complete guidelines](https://github.com/jalantechnologies/node-react-template-review-agent/blob/main/code-review-guidelines/README.md).

## Review Output

Reviews are categorized as:

### Critical Issues (Should Block Merge)
- Security vulnerabilities
- Architecture violations (with guideline ID like [GP-7])
- Bugs and logic errors
- Performance problems (N+1 queries, missing indexes)

### Suggestions (Improvements)
- Code style improvements
- Better naming
- Refactoring opportunities

## Example Review

```markdown
## 🤖 Automated Code Review

### Critical Issues (Must Fix Before Merge)

**[BE-7] N+1 Query Pattern Detected**

Location: `src/services/user-service.ts:45-52`

Problem: Loading user profiles in a loop causes N+1 queries.

Current:
\`\`\`typescript
for (const userId of userIds) {
  const user = await User.findById(userId);
  profiles.push(user);
}
\`\`\`

Fix:
\`\`\`typescript
const users = await User.find({ _id: { $in: userIds } });
\`\`\`

### Suggestions (Improvements)

No suggestions at this time.
```

## Cost

Using prompt caching, review costs are optimized:

- First review: ~$0.60
- Subsequent reviews (within 5 min): ~$0.06
- **Average: $0.10-0.15 per review**

Perfect for active development with multiple commits per PR.

## Guidelines Updates

The review guidelines are maintained in the centralized agent repository. When guidelines are updated:

1. Your project automatically uses the latest version on next PR
2. No code changes needed in your project
3. All forks benefit from improvements simultaneously

To use a specific guideline version (for stability), update `.github/workflows/ci.yml`:

```yaml
uses: jalantechnologies/node-react-template-review-agent/.github/workflows/review.yml@v1.0.0
```

## Troubleshooting

### Reviews not appearing

**Check:**
1. PR is not marked as draft
2. `CODE_REVIEW_ANTHROPIC_API_KEY` is configured
3. Check Actions tab for workflow errors

### Reviews are too generic

Guidelines are maintained centrally. To suggest improvements:
1. Go to [review-agent repository](https://github.com/jalantechnologies/node-react-template-review-agent)
2. Open an issue or PR with suggested guideline improvements
3. Once merged, all projects automatically benefit

### API costs too high

The system uses prompt caching for 90% cost reduction during active development. If costs are still concerning:
1. Remove the `CODE_REVIEW_ANTHROPIC_API_KEY` to disable reviews temporarily
2. Configure reviews to only run on specific labels or branches

## Disabling Reviews

To temporarily disable:
1. Remove `CODE_REVIEW_ANTHROPIC_API_KEY` from secrets/variables

To permanently disable:
1. Remove the `review` job from `.github/workflows/ci.yml`

## Resources

- [Review Agent Repository](https://github.com/jalantechnologies/node-react-template-review-agent) - Guidelines and workflow
- [Complete Guidelines](https://github.com/jalantechnologies/node-react-template-review-agent/blob/main/code-review-guidelines/README.md) - All 21 principles
- [Anthropic Pricing](https://www.anthropic.com/pricing) - API costs and limits
