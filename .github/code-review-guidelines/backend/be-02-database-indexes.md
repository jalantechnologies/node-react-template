# BE-2: Database Indexes

**Severity:** `CRITICAL`

## Principle

Make sure indexes exist for query patterns. Every filter, sort, or join needs corresponding index.

## Why This Matters

- **Performance**: Queries without indexes result in full collection scans (O(n) vs O(log n))
- **Scalability**: Applications slow down dramatically as data grows without proper indexes
- **User experience**: Slow queries lead to timeouts and poor response times
- **Cost**: Inefficient queries consume more database resources and increase infrastructure costs
- **Production stability**: Missing indexes can cause database overload under load

## Bad Example

```typescript
// Schema with no indexes
const AccountSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,        // No index on email
  username: String,     // No index on username
  phoneNumber: String,  // No index on phone
  organizationId: ObjectId,  // Foreign key without index
  createdAt: Date,
  active: Boolean,
});

// Queries that will be slow without indexes
async function findByEmail(email: string) {
  // Full collection scan - O(n)
  return AccountModel.findOne({ email });
}

async function findActiveAccountsSorted() {
  // No compound index for filtering + sorting
  return AccountModel.find({ active: true })
    .sort({ createdAt: -1 });
}

async function findByOrganization(organizationId: string) {
  // Foreign key without index - full scan
  return AccountModel.find({ organizationId });
}
```

**Problems:**
- Every query performs a full collection scan
- Performance degrades linearly with data growth
- Common lookup fields (email, username) are not indexed
- Foreign keys lack indexes for join operations
- Compound queries (filter + sort) have no compound index
- Will cause production performance issues at scale

## Good Example

```typescript
// Schema with proper indexes
const AccountSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  phoneNumber: String,
  organizationId: ObjectId,
  createdAt: Date,
  active: Boolean,
});

// Create indexes in repository initialization
class AccountRepository {
  async initialize() {
    const collection = this.collection();

    // Unique indexes for lookup fields
    await collection.createIndex({ email: 1 }, { unique: true });
    await collection.createIndex({ username: 1 }, { unique: true });
    await collection.createIndex({ phoneNumber: 1 }, { unique: true, sparse: true });

    // Foreign key index
    await collection.createIndex({ organizationId: 1 });

    // Compound index for common query pattern (filter + sort)
    await collection.createIndex({ active: 1, createdAt: -1 });

    // Additional indexes based on query patterns
    await collection.createIndex({ createdAt: -1 });
  }
}

// Now queries are efficient
async function findByEmail(email: string) {
  // Uses email index - O(log n)
  return AccountModel.findOne({ email });
}

async function findActiveAccountsSorted() {
  // Uses compound index { active: 1, createdAt: -1 }
  return AccountModel.find({ active: true })
    .sort({ createdAt: -1 });
}

async function findByOrganization(organizationId: string) {
  // Uses organizationId index
  return AccountModel.find({ organizationId });
}
```

**Benefits:**
- All queries use indexes for fast lookups (O(log n))
- Unique constraints prevent duplicate data
- Foreign key queries are optimized
- Compound indexes optimize complex query patterns
- Application remains performant as data grows
- Reduced database load and infrastructure costs

## Additional Context

### Index Types to Consider

1. **Single field indexes**: For simple lookups
   ```typescript
   { email: 1 }  // Ascending
   { createdAt: -1 }  // Descending for recent-first queries
   ```

2. **Compound indexes**: For queries with multiple conditions
   ```typescript
   // For: find({ active: true }).sort({ createdAt: -1 })
   { active: 1, createdAt: -1 }
   ```

3. **Unique indexes**: Enforce data integrity
   ```typescript
   { email: 1 }, { unique: true }
   { username: 1 }, { unique: true }
   ```

4. **Sparse indexes**: For optional fields
   ```typescript
   // Only indexes documents where phoneNumber exists
   { phoneNumber: 1 }, { unique: true, sparse: true }
   ```

5. **Text indexes**: For full-text search
   ```typescript
   { firstName: 'text', lastName: 'text' }
   ```

### Common Index Patterns

```typescript
// Foreign keys - ALWAYS index
{ organizationId: 1 }
{ userId: 1 }
{ accountId: 1 }

// Lookup fields - index for fast queries
{ email: 1 }
{ username: 1 }
{ phoneNumber: 1 }

// Status/filter fields - especially if used with sort
{ active: 1 }
{ status: 1 }

// Timestamp fields - for sorting and range queries
{ createdAt: -1 }
{ updatedAt: -1 }

// Compound patterns
{ organizationId: 1, createdAt: -1 }  // Org's recent items
{ userId: 1, status: 1 }              // User's items by status
{ active: 1, createdAt: -1 }          // Active items, recent first
```

### Index Placement

Create indexes in the repository initialization method:

```typescript
class AccountRepository {
  async initialize() {
    await this.collection().createIndex({ email: 1 }, { unique: true });
    await this.collection().createIndex({ organizationId: 1 });
    // ... more indexes
  }
}
```

### Performance Testing

Before deploying, verify indexes are used:

```typescript
// In MongoDB shell or tests
db.accounts.find({ email: 'test@example.com' }).explain('executionStats')

// Look for:
// - "stage": "IXSCAN" (index scan) ✓
// - "stage": "COLLSCAN" (collection scan) ✗
```

## Review Checklist

- [ ] Foreign key fields have indexes
- [ ] Lookup fields (email, username, phone) have unique indexes
- [ ] WHERE clause fields are indexed
- [ ] Sort fields are indexed
- [ ] Compound queries have compound indexes (filter + sort)
- [ ] Unique constraints are properly defined
- [ ] Optional fields use sparse indexes where appropriate
- [ ] Indexes are created in repository initialization
- [ ] Query patterns match index structure
- [ ] Consider index order for compound indexes (equality first, then sort)
