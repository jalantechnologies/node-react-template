# BE-7: Avoid N+1 Queries

**Severity:** `CRITICAL`

## Principle

Avoid the N+1 query pattern where you perform one query to fetch N items, then perform N additional queries (one per item) to fetch related data. Instead, use eager loading, joins, batch queries, or populate mechanisms to fetch all needed data efficiently.

## Why This Matters

- **Performance**: N+1 queries cause severe performance degradation as datasets grow
- **Scalability**: 1000 items = 1001 database queries instead of 1-2 queries
- **Database load**: Excessive queries overwhelm database connections and resources
- **Response time**: API endpoints become slow and unresponsive
- **Cost**: More database queries = higher cloud database costs
- **User experience**: Slow page loads and API responses frustrate users

## Bad Example

```typescript
// N+1 query pattern - WRONG!
class OrderService {
  static async getOrdersWithCustomers(): Promise<OrderWithCustomer[]> {
    // First query: Get all orders (1 query)
    const orders = await OrderRepository.collection().find({}).toArray();

    // N additional queries: Get customer for each order
    const ordersWithCustomers = [];
    for (const order of orders) {
      // Database query inside loop - BAD!
      const customer = await CustomerRepository.collection().findOne({
        _id: order.customerId
      });

      ordersWithCustomers.push({
        ...order,
        customer
      });
    }

    return ordersWithCustomers;
  }
}

// If you have 100 orders, this makes 101 queries:
// 1 query for orders + 100 queries for customers = 101 queries

// Even worse: Nested N+1
class TaskService {
  static async getTasksWithAccountsAndOrganizations(): Promise<TaskDetails[]> {
    // Query 1: Get all tasks
    const tasks = await TaskRepository.collection().find({}).toArray();

    const taskDetails = [];
    for (const task of tasks) {
      // Query N: Get account for each task
      const account = await AccountRepository.collection().findOne({
        _id: task.accountId
      });

      // Query N: Get organization for each account
      const organization = await OrganizationRepository.collection().findOne({
        _id: account.organizationId
      });

      taskDetails.push({
        ...task,
        account,
        organization
      });
    }

    return taskDetails;
  }
}

// With 50 tasks: 1 + 50 + 50 = 101 queries!

// Another common pattern: Fetching in controller/service
class AccountController {
  static async listAccounts(req: Request, res: Response) {
    const accounts = await AccountRepository.collection().find({}).toArray();

    // N+1: Fetching task count for each account
    const accountsWithTaskCounts = [];
    for (const account of accounts) {
      const taskCount = await TaskRepository.collection().countDocuments({
        accountId: account._id
      });

      accountsWithTaskCounts.push({
        ...account,
        taskCount
      });
    }

    res.json(accountsWithTaskCounts);
  }
}
```

**Problems:**
- 100 orders = 101 database queries (1 for orders + 100 for customers)
- Each query has latency overhead (network, database processing)
- Database connection pool gets exhausted with many concurrent requests
- Scales terribly: 10,000 orders = 10,001 queries
- Slow response times (especially noticeable with remote databases)
- Wastes database resources and increases costs

## Good Example

### Solution 1: MongoDB Populate/Aggregation

```typescript
// Using Mongoose populate - CORRECT!
class OrderService {
  static async getOrdersWithCustomers(): Promise<OrderWithCustomer[]> {
    // Single query with population - 1 query (or 2 with separate collection)
    const orders = await OrderModel.find({})
      .populate('customerId') // Mongoose automatically joins
      .lean()
      .exec();

    return orders;
  }
}

// Using MongoDB aggregation for complex joins - CORRECT!
class TaskService {
  static async getTasksWithAccountsAndOrganizations(): Promise<TaskDetails[]> {
    // Single aggregation pipeline - 1 query
    const tasks = await TaskModel.aggregate([
      {
        $lookup: {
          from: 'accounts',
          localField: 'accountId',
          foreignField: '_id',
          as: 'account'
        }
      },
      {
        $unwind: '$account'
      },
      {
        $lookup: {
          from: 'organizations',
          localField: 'account.organizationId',
          foreignField: '_id',
          as: 'organization'
        }
      },
      {
        $unwind: '$organization'
      }
    ]);

    return tasks;
  }
}

// With 50 tasks: Just 1 query instead of 101!
```

### Solution 2: Manual Batching

```typescript
// Manual batching when populate isn't available - CORRECT!
class OrderService {
  static async getOrdersWithCustomers(): Promise<OrderWithCustomer[]> {
    // Query 1: Get all orders
    const orders = await OrderRepository.collection().find({}).toArray();

    // Query 2: Get all unique customer IDs and batch fetch
    const customerIds = [...new Set(orders.map(order => order.customerId))];
    const customers = await CustomerRepository.collection().find({
      _id: { $in: customerIds }
    }).toArray();

    // Create lookup map for O(1) access
    const customerMap = new Map(
      customers.map(customer => [customer._id.toString(), customer])
    );

    // Map in memory (no additional queries)
    const ordersWithCustomers = orders.map(order => ({
      ...order,
      customer: customerMap.get(order.customerId.toString())
    }));

    return ordersWithCustomers;
  }
}

// 100 orders with 50 unique customers: 2 queries instead of 101!

// More complex example with multiple relations
class TaskService {
  static async getTasksWithDetails(): Promise<TaskDetails[]> {
    // Query 1: Get all tasks
    const tasks = await TaskRepository.collection().find({}).toArray();

    // Query 2: Batch fetch all accounts
    const accountIds = [...new Set(tasks.map(t => t.accountId))];
    const accounts = await AccountRepository.collection().find({
      _id: { $in: accountIds }
    }).toArray();

    // Query 3: Batch fetch all organizations
    const orgIds = [...new Set(accounts.map(a => a.organizationId))];
    const organizations = await OrganizationRepository.collection().find({
      _id: { $in: orgIds }
    }).toArray();

    // Create lookup maps
    const accountMap = new Map(accounts.map(a => [a._id.toString(), a]));
    const orgMap = new Map(organizations.map(o => [o._id.toString(), o]));

    // Assemble in memory
    return tasks.map(task => {
      const account = accountMap.get(task.accountId.toString());
      const organization = account
        ? orgMap.get(account.organizationId.toString())
        : null;

      return {
        ...task,
        account,
        organization
      };
    });
  }
}

// 50 tasks: 3 queries instead of 101!
```

### Solution 3: DataLoader Pattern (for GraphQL or Complex Batching)

```typescript
// DataLoader for automatic batching and caching - CORRECT!
import DataLoader from 'dataloader';

class CustomerLoader {
  private loader: DataLoader<string, Customer>;

  constructor() {
    this.loader = new DataLoader(async (customerIds: readonly string[]) => {
      // Batch load all requested customers in single query
      const customers = await CustomerRepository.collection().find({
        _id: { $in: customerIds }
      }).toArray();

      // Return in same order as requested IDs
      const customerMap = new Map(
        customers.map(c => [c._id.toString(), c])
      );

      return customerIds.map(id => customerMap.get(id) || null);
    });
  }

  async load(customerId: string): Promise<Customer | null> {
    return this.loader.load(customerId);
  }
}

// Usage
class OrderService {
  static async getOrdersWithCustomers(
    customerLoader: CustomerLoader
  ): Promise<OrderWithCustomer[]> {
    const orders = await OrderRepository.collection().find({}).toArray();

    // DataLoader automatically batches these into single query
    const ordersWithCustomers = await Promise.all(
      orders.map(async order => ({
        ...order,
        customer: await customerLoader.load(order.customerId.toString())
      }))
    );

    return ordersWithCustomers;
  }
}
```

### Solution 4: Denormalization (for frequently accessed data)

```typescript
// Store frequently accessed data together - CORRECT!
interface Order {
  _id: ObjectId;
  customerId: ObjectId;
  // Denormalized customer data for quick access
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
}

class OrderService {
  static async createOrder(
    customerId: string,
    items: OrderItem[]
  ): Promise<Order> {
    // Fetch customer once
    const customer = await CustomerRepository.collection().findOne({
      _id: new ObjectId(customerId)
    });

    // Store denormalized data
    const order = await OrderRepository.collection().insertOne({
      customerId: customer._id,
      customerName: `${customer.firstName} ${customer.lastName}`,
      customerEmail: customer.email,
      items,
      total: this.calculateTotal(items),
      createdAt: new Date()
    });

    return order;
  }

  static async getOrders(): Promise<Order[]> {
    // Single query, customer name/email already available
    return OrderRepository.collection().find({}).toArray();
  }
}

// Trade-off: Update denormalized data when customer changes
class CustomerService {
  static async updateCustomer(
    customerId: string,
    updates: UpdateCustomerParams
  ): Promise<Customer> {
    const customer = await CustomerRepository.collection().findOneAndUpdate(
      { _id: new ObjectId(customerId) },
      { $set: updates },
      { returnDocument: 'after' }
    );

    // Update denormalized data in orders
    if (updates.firstName || updates.lastName || updates.email) {
      await OrderRepository.collection().updateMany(
        { customerId: customer._id },
        {
          $set: {
            customerName: `${customer.firstName} ${customer.lastName}`,
            customerEmail: customer.email
          }
        }
      );
    }

    return customer;
  }
}
```

**Benefits:**
- Dramatically fewer database queries (2-3 instead of 100+)
- Better performance and faster response times
- Reduced database load and connection usage
- Scales well with dataset size
- Lower cloud database costs
- Better user experience

## Additional Context

### Detecting N+1 Queries

**Signs of N+1 problems:**
1. Queries inside loops
2. `await` inside `for` or `map` when calling database
3. Slow endpoints that get worse with more data
4. High database query counts in logs/monitoring

**Detection tools:**
```typescript
// Development: Log all database queries
mongoose.set('debug', true);

// Monitor query counts
let queryCount = 0;
mongoose.plugin((schema) => {
  schema.pre(/^find/, function() {
    queryCount++;
    console.log(`Query #${queryCount}:`, this.getQuery());
  });
});

// Alert on N+1 patterns
if (queryCount > 10) {
  console.warn(`⚠️  Possible N+1 query detected: ${queryCount} queries`);
}
```

### MongoDB-Specific Solutions

**Mongoose Populate:**
```typescript
// Single reference
const orders = await OrderModel.find().populate('customerId');

// Multiple references
const tasks = await TaskModel.find()
  .populate('accountId')
  .populate('assignedToId');

// Nested populate
const tasks = await TaskModel.find()
  .populate({
    path: 'accountId',
    populate: {
      path: 'organizationId'
    }
  });

// Selective fields
const orders = await OrderModel.find()
  .populate('customerId', 'firstName lastName email');
```

**Aggregation Pipeline:**
```typescript
const results = await TaskModel.aggregate([
  // Match stage (optional filtering)
  { $match: { status: 'active' } },

  // Lookup stage (join)
  {
    $lookup: {
      from: 'accounts',
      localField: 'accountId',
      foreignField: '_id',
      as: 'account'
    }
  },

  // Unwind (convert array to object)
  { $unwind: '$account' },

  // Nested lookup
  {
    $lookup: {
      from: 'organizations',
      localField: 'account.organizationId',
      foreignField: '_id',
      as: 'organization'
    }
  },

  // Project (shape output)
  {
    $project: {
      title: 1,
      'account.name': 1,
      'organization.name': 1
    }
  }
]);
```

### Batch Fetching Utility

```typescript
// Reusable batch fetch utility
class BatchFetcher {
  static async batchFetch<T extends { _id: ObjectId }>(
    ids: string[],
    repository: { collection: () => Collection<T> }
  ): Promise<Map<string, T>> {
    const uniqueIds = [...new Set(ids)];

    const documents = await repository.collection().find({
      _id: { $in: uniqueIds.map(id => new ObjectId(id)) }
    }).toArray();

    return new Map(
      documents.map(doc => [doc._id.toString(), doc])
    );
  }
}

// Usage
class OrderService {
  static async getOrdersWithCustomers(): Promise<OrderWithCustomer[]> {
    const orders = await OrderRepository.collection().find({}).toArray();

    const customerIds = orders.map(o => o.customerId.toString());
    const customerMap = await BatchFetcher.batchFetch(
      customerIds,
      CustomerRepository
    );

    return orders.map(order => ({
      ...order,
      customer: customerMap.get(order.customerId.toString())
    }));
  }
}
```

### Performance Comparison

**N+1 Query (100 orders):**
```
Query 1: SELECT * FROM orders             → 10ms
Query 2: SELECT * FROM customers WHERE id = 1  → 5ms
Query 3: SELECT * FROM customers WHERE id = 2  → 5ms
...
Query 101: SELECT * FROM customers WHERE id = 100 → 5ms

Total: 10ms + (100 × 5ms) = 510ms
```

**Optimized (100 orders):**
```
Query 1: SELECT * FROM orders             → 10ms
Query 2: SELECT * FROM customers WHERE id IN (1,2,...,100) → 15ms

Total: 10ms + 15ms = 25ms

Speed improvement: 20× faster!
```

### When to Use Each Approach

| Approach | When to Use | Pros | Cons |
|----------|-------------|------|------|
| **Mongoose Populate** | Simple 1:1 or 1:N relations | Easy to use, built-in | Limited control, can be slow for complex queries |
| **Aggregation** | Complex joins, transformations | Powerful, single query | More complex syntax |
| **Manual Batching** | When populate isn't available | Full control, efficient | More code to write |
| **DataLoader** | GraphQL, complex batching needs | Automatic batching + caching | Additional dependency |
| **Denormalization** | Frequently read, rarely updated data | Fastest reads | Data duplication, consistency overhead |

## Review Checklist

- [ ] No database queries inside `for`, `while`, or `map` loops
- [ ] No `await` for database calls inside loops
- [ ] Related data fetched using populate, aggregation, or batch queries
- [ ] Lookup maps used for O(1) in-memory mapping
- [ ] Query count stays constant regardless of result set size
- [ ] Endpoints tested with realistic data volumes (100+, 1000+ records)
- [ ] Database query monitoring in place to detect N+1
- [ ] Consider denormalization for frequently accessed, rarely updated data
