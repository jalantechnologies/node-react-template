# GP-1: Comments Should Explain "Why", Not "What" or "How"

**Severity:** `[SUGGESTION]`

## Principle

Code should be self-documenting through clear structure and naming. Comments should explain the business context, rationale behind decisions, or non-obvious trade-offs—not describe what the code does or how it works.

## Why This Matters

- **What** and **how** should be obvious from well-written code
- Comments describing code mechanics become outdated as code evolves
- "Why" comments preserve crucial business context and decision rationale
- Future developers need to understand the reasoning, not just the implementation

## Bad Examples

```typescript
// Increment counter by 1
counter += 1;

// Loop through all users
users.forEach(user => {
  // Send email to user
  sendEmail(user.email);
});

// Get the account
const account = await AccountService.getAccountById(id);

// Check if user is active
if (user.status === 'active') {
  // Process the user
  processUser(user);
}
```

**Why this is bad:** These comments just repeat what the code already says. They add noise without value.

## Good Examples

### Example 1: Business Rule Context

```typescript
// HIPAA compliance requires audit logs to be retained for minimum 7 years
const LOG_RETENTION_DAYS = 7 * 365;

// Per legal requirement, we must retain deleted user data for 90 days
// before permanent deletion to handle potential recovery requests
const SOFT_DELETE_RETENTION_DAYS = 90;
```

### Example 2: Trade-off Explanation

```typescript
// We use eventual consistency here because immediate consistency would
// require distributed transactions across payment and inventory services,
// adding 300ms+ latency per request. Business accepted the trade-off of
// potential 5-second delay in inventory updates for better UX.
await publishEvent('order.created', orderData);
```

### Example 3: Non-Obvious Workaround

```typescript
// Adding 1ms delay to work around race condition in Safari where
// localStorage write happens after navigation starts, causing data loss.
// Bug ticket: https://bugs.webkit.org/show_bug.cgi?id=12345
await new Promise(resolve => setTimeout(resolve, 1));
localStorage.setItem('lastRoute', currentRoute);
```

### Example 4: Performance Optimization Context

```typescript
// Batch size of 100 chosen after load testing showed it provides optimal
// balance between memory usage and query performance. Larger batches (500+)
// caused OOM errors on t2.small instances during peak load.
const BATCH_SIZE = 100;
```

## When Comments Are Appropriate

1. **Business rules and compliance**: GDPR, HIPAA, regulatory requirements
2. **Non-obvious decisions**: Why we chose approach A over approach B
3. **Workarounds**: Temporary fixes for external bugs with ticket references
4. **Performance considerations**: Why certain optimizations were chosen
5. **Complex algorithms**: High-level explanation of the approach (not line-by-line)
6. **Future warnings**: Known limitations or planned refactoring

## When Comments Are NOT Needed

1. **Obvious operations**: Don't comment `i++` or `return user.name`
2. **Function calls**: The function name should be descriptive enough
3. **Standard patterns**: Common forEach, map, filter operations
4. **Type conversions**: `parseInt(value)` doesn't need a comment

## Better Alternative: Self-Documenting Code

Instead of commenting, make the code self-explanatory:

**Bad:**
```typescript
// Calculate total price with tax
const t = p * 1.08;
```

**Good:**
```typescript
const TAX_RATE = 0.08;
const totalPriceWithTax = basePrice * (1 + TAX_RATE);
```

## Review Checklist

- [ ] Are comments explaining "why" rather than "what" or "how"?
- [ ] Could the comment be eliminated by better naming or structure?
- [ ] Does the comment provide business context or decision rationale?
- [ ] Are there code sections that need "why" explanation but lack it?
- [ ] Are there outdated comments that no longer match the code?
