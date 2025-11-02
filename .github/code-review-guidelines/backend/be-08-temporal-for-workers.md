# BE-8: Use Temporal for Workers

**Severity:** `SUGGESTION`

## Principle

Use Temporal to queue and execute background workers instead of Kubernetes CronJobs or manual job systems. Temporal provides built-in retry logic, observability, state management, and failure recovery that would otherwise need to be implemented manually.

## Why This Matters

- **Observability**: See workflow execution history, current state, and failures in Temporal UI
- **Retry logic**: Built-in exponential backoff and retry policies
- **State management**: Temporal persists workflow state automatically
- **Failure recovery**: Workflows automatically resume after crashes or deployments
- **Debugging**: Replay workflows to debug issues
- **Scheduling**: Cron schedules built into Temporal
- **Versioning**: Handle workflow code changes gracefully
- **Activity timeouts**: Automatic timeout and cancellation handling
- **Signals**: Send messages to running workflows
- **Queries**: Query workflow state without interrupting execution

## Bad Example

```typescript
// Kubernetes CronJob with manual retry logic - NOT RECOMMENDED
// cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: send-daily-digest
spec:
  schedule: "0 9 * * *"  # Every day at 9 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: digest-job
            image: myapp:latest
            command: ["node", "workers/send-daily-digest.js"]

// workers/send-daily-digest.js
class DailyDigestWorker {
  async execute() {
    console.log('Starting daily digest job...');

    try {
      // No visibility into what's happening
      const accounts = await this.getActiveAccounts();

      // Manual retry logic - BAD
      for (const account of accounts) {
        let retries = 0;
        let success = false;

        while (!success && retries < 3) {
          try {
            await this.sendDigest(account);
            success = true;
          } catch (error) {
            retries++;
            console.error(`Failed to send digest to ${account.id}, retry ${retries}`, error);

            if (retries < 3) {
              // Manual backoff
              await this.sleep(Math.pow(2, retries) * 1000);
            }
          }
        }

        if (!success) {
          // What happens to failed accounts? Lost forever.
          console.error(`Gave up sending digest to ${account.id}`);
        }
      }

      console.log('Daily digest job completed');
    } catch (error) {
      // Job fails, no state persisted, no way to resume
      console.error('Daily digest job failed:', error);
      process.exit(1);
    }
  }

  private async getActiveAccounts(): Promise<Account[]> {
    // If this fails partway through, we lose all progress
    return AccountRepository.collection().find({ active: true }).toArray();
  }

  private async sendDigest(account: Account): Promise<void> {
    // What if this times out? No timeout handling.
    const digest = await this.generateDigest(account);
    await EmailService.send({
      to: account.email,
      subject: 'Your Daily Digest',
      html: digest
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

new DailyDigestWorker().execute();
```

**Problems:**
- No visibility into job execution (logs only, no structured history)
- Manual retry logic is error-prone and hard to maintain
- No state persistence - if job crashes, all progress is lost
- If pod is killed mid-execution, job starts from scratch
- No way to query current state or progress
- No way to cancel or signal a running job
- Timeout handling must be implemented manually
- Failed items are lost - no way to retry just the failures
- Can't replay execution to debug issues
- No built-in metrics or monitoring
- Hard to test - need to deploy to Kubernetes to see it work

## Good Example

```typescript
// Temporal workflow and activities - RECOMMENDED
import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

// Define activity stubs with timeout policies
const { getActiveAccounts, sendDigest } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
  retry: {
    initialInterval: '1s',
    maximumInterval: '1m',
    backoffCoefficient: 2,
    maximumAttempts: 3
  }
});

// Workflow definition - orchestrates the process
export async function sendDailyDigestWorkflow(): Promise<void> {
  // Get active accounts (automatically retried on failure)
  const accounts = await getActiveAccounts();

  // Process each account (state is persisted automatically)
  const results = [];
  for (const account of accounts) {
    try {
      // Activity automatically retried with exponential backoff
      await sendDigest(account);
      results.push({ accountId: account.id, status: 'success' });
    } catch (error) {
      // After all retries exhausted, record failure
      results.push({
        accountId: account.id,
        status: 'failed',
        error: error.message
      });
    }
  }

  // Return results (stored in workflow history)
  return results;
}

// activities.ts - actual work happens here
export async function getActiveAccounts(): Promise<Account[]> {
  return AccountRepository.collection().find({ active: true }).toArray();
}

export async function sendDigest(account: Account): Promise<void> {
  const digest = await generateDigest(account);

  await CommunicationService.sendEmail({
    to: account.email,
    subject: 'Your Daily Digest',
    html: digest
  });
}

async function generateDigest(account: Account): Promise<string> {
  const tasks = await TaskService.getRecentTasks(account.id);
  const notifications = await NotificationService.getUnread(account.id);

  return DigestTemplate.render({ account, tasks, notifications });
}

// worker.ts - Run the Temporal worker
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'daily-digest-queue'
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Schedule the workflow (instead of Kubernetes CronJob)
import { Client } from '@temporalio/client';

async function scheduleWorkflow() {
  const client = new Client();

  await client.schedule.create({
    scheduleId: 'daily-digest-schedule',
    spec: {
      cronExpressions: ['0 9 * * *'] // Every day at 9 AM
    },
    action: {
      type: 'startWorkflow',
      workflowType: 'sendDailyDigestWorkflow',
      taskQueue: 'daily-digest-queue'
    }
  });
}
```

**Benefits:**
- Temporal UI shows all workflow executions, current state, and history
- Built-in retry logic with configurable policies
- State automatically persisted - workflow can resume after crashes
- Activity timeouts handled automatically
- Can query workflow state while it's running
- Can send signals to modify behavior of running workflows
- Failed workflows can be retried from last successful activity
- Workflow history is queryable and exportable
- Can replay workflows to debug issues
- Built-in metrics and observability
- Easy to test locally without Kubernetes

## Additional Context

### Temporal Workflow Features

**1. Automatic Retry with Backoff:**
```typescript
const { processPayment } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
  retry: {
    initialInterval: '1s',        // First retry after 1 second
    maximumInterval: '1m',         // Max wait between retries
    backoffCoefficient: 2,         // Double wait time each retry
    maximumAttempts: 5             // Try up to 5 times
  }
});

// Activity will automatically retry on failure:
// Attempt 1: Immediate
// Attempt 2: After 1s
// Attempt 3: After 2s
// Attempt 4: After 4s
// Attempt 5: After 8s
// If still failing: workflow can handle the error
```

**2. Durable State:**
```typescript
export async function processOrderWorkflow(orderId: string): Promise<void> {
  // State 1: Create order
  const order = await createOrder(orderId);

  // State 2: Charge payment (if workflow crashes here, it resumes from here)
  await chargePayment(order);

  // State 3: Send confirmation
  await sendConfirmation(order);

  // State 4: Update inventory
  await updateInventory(order);

  // All state transitions are persisted
  // If pod restarts, workflow continues from last completed activity
}
```

**3. Signals and Queries:**
```typescript
import { defineSignal, defineQuery, setHandler } from '@temporalio/workflow';

// Define signals and queries
const cancelSignal = defineSignal('cancel');
const progressQuery = defineQuery<number>('progress');

export async function longRunningWorkflow(): Promise<void> {
  let cancelled = false;
  let progress = 0;

  // Handle cancel signal
  setHandler(cancelSignal, () => {
    cancelled = true;
  });

  // Handle progress query
  setHandler(progressQuery, () => progress);

  const tasks = await getTasks();

  for (let i = 0; i < tasks.length; i++) {
    if (cancelled) {
      throw new Error('Workflow cancelled by user');
    }

    await processTask(tasks[i]);
    progress = ((i + 1) / tasks.length) * 100;
  }
}

// Send signal from client
await workflowHandle.signal(cancelSignal);

// Query from client
const progress = await workflowHandle.query(progressQuery);
console.log(`Workflow is ${progress}% complete`);
```

**4. Child Workflows:**
```typescript
import { startChild } from '@temporalio/workflow';

export async function processMultipleAccountsWorkflow(
  accountIds: string[]
): Promise<void> {
  // Start child workflow for each account
  const childWorkflows = accountIds.map(accountId =>
    startChild(processAccountWorkflow, {
      workflowId: `process-account-${accountId}`,
      args: [accountId]
    })
  );

  // Wait for all to complete
  await Promise.all(childWorkflows);
}
```

**5. Workflow Versioning:**
```typescript
import { patched } from '@temporalio/workflow';

export async function myWorkflow(): Promise<void> {
  // Old code
  await oldActivity();

  // New code (only runs for workflows started after this version)
  if (patched('add-new-step')) {
    await newActivity();
  }

  // Continue with rest of workflow
  await finalActivity();
}
```

### Temporal vs Kubernetes CronJob

| Feature | Temporal | Kubernetes CronJob |
|---------|----------|-------------------|
| **Retry Logic** | Built-in, configurable | Manual implementation |
| **State Persistence** | Automatic | Manual (database) |
| **Observability** | UI, history, metrics | Logs only |
| **Failure Recovery** | Automatic resume | Restart from scratch |
| **Timeouts** | Built-in | Manual |
| **Cancellation** | Signals | Kill pod |
| **Progress Tracking** | Queries | Manual logging |
| **Debugging** | Replay workflow | Check logs |
| **Testing** | Run locally | Deploy to K8s |
| **Versioning** | Built-in | Manual |

### Real-World Example: Data Migration

**Bad: Manual Script**
```typescript
// migrate-users.ts
async function migrateUsers() {
  const users = await getAllUsers(); // What if this fails partway?

  for (const user of users) {
    try {
      await migrateUser(user);
    } catch (error) {
      console.error(`Failed to migrate user ${user.id}`);
      // What now? Manual retry later?
    }
  }
}
```

**Good: Temporal Workflow**
```typescript
// migration-workflow.ts
export async function migrateUsersWorkflow(): Promise<MigrationResult> {
  const userIds = await getAllUserIds();

  const results = {
    total: userIds.length,
    successful: 0,
    failed: []
  };

  for (const userId of userIds) {
    try {
      await migrateUser(userId);
      results.successful++;
    } catch (error) {
      results.failed.push({ userId, error: error.message });
    }

    // State persisted after each user
    // Can resume if workflow crashes
  }

  return results;
}

// Can query progress while running:
const progress = await workflowHandle.query('progress');

// Can cancel if needed:
await workflowHandle.signal('cancel');

// Can see results in Temporal UI
// Can retry failed users from Temporal UI
```

### Activity Best Practices

**1. Activities should be idempotent:**
```typescript
// Good: Idempotent activity
export async function updateAccountStatus(
  accountId: string,
  status: string
): Promise<void> {
  // Safe to retry - same result every time
  await AccountRepository.collection().updateOne(
    { _id: new ObjectId(accountId) },
    { $set: { status } }
  );
}

// Bad: Non-idempotent activity
export async function incrementLoginCount(accountId: string): Promise<void> {
  // Dangerous to retry - increments multiple times
  const account = await AccountRepository.collection().findOne({
    _id: new ObjectId(accountId)
  });
  await AccountRepository.collection().updateOne(
    { _id: account._id },
    { $set: { loginCount: account.loginCount + 1 } }
  );
}

// Good: Idempotent increment
export async function incrementLoginCount(accountId: string): Promise<void> {
  await AccountRepository.collection().updateOne(
    { _id: new ObjectId(accountId) },
    { $inc: { loginCount: 1 } }
  );
}
```

**2. Activities should be short:**
```typescript
// Bad: Long-running activity
export async function processAllOrders(): Promise<void> {
  const orders = await getAllOrders(); // Could be millions
  for (const order of orders) {
    await processOrder(order); // Takes hours
  }
}

// Good: Break into smaller activities
export async function getOrderBatch(offset: number, limit: number): Promise<string[]> {
  return getOrderIds({ skip: offset, limit });
}

export async function processOrder(orderId: string): Promise<void> {
  // Process single order (can retry individually)
  const order = await getOrder(orderId);
  await calculateTotals(order);
  await updateInventory(order);
}

// Workflow orchestrates
export async function processAllOrdersWorkflow(): Promise<void> {
  let offset = 0;
  const batchSize = 100;

  while (true) {
    const orderIds = await getOrderBatch(offset, batchSize);
    if (orderIds.length === 0) break;

    for (const orderId of orderIds) {
      await processOrder(orderId);
    }

    offset += batchSize;
  }
}
```

### When to Use Temporal

**Use Temporal for:**
- Background jobs that need retry logic
- Long-running processes (minutes to days)
- Jobs that need state persistence
- Jobs where observability is important
- Scheduled/cron jobs
- Multi-step processes with dependencies
- Jobs that need to be cancellable
- Data migrations and batch processing

**Don't need Temporal for:**
- Simple one-off scripts
- Fire-and-forget operations
- Very short tasks (< 1 second)
- Tasks that don't need retry logic
- Tasks where state persistence isn't needed

## Review Checklist

- [ ] Background workers use Temporal instead of manual job systems
- [ ] Workflows are used for orchestration, activities for actual work
- [ ] Activities are idempotent and safe to retry
- [ ] Retry policies are configured appropriately
- [ ] Timeout policies prevent activities from hanging
- [ ] Long-running processes are broken into smaller activities
- [ ] Workflow state is queryable for progress tracking
- [ ] Signals are used for cancellation and control
- [ ] Cron schedules use Temporal schedules, not Kubernetes CronJobs
- [ ] Consider Temporal for any background job that needs reliability
