# GP-3: Break Large Functions Into Smaller, Focused Functions

**Severity:** `[CRITICAL]`

## Principle

Large functions should be decomposed into smaller, single-purpose functions. Parent functions should describe "what" happens at a high level, while child functions define "how" each step is accomplished.

## Why This Matters

- **Readability**: Small functions are easier to understand at a glance
- **Testability**: Smaller functions are easier to unit test
- **Reusability**: Extracted logic can be reused elsewhere
- **Debugging**: Easier to isolate and fix bugs
- **Cognitive Load**: Functions with >50 lines or >3 levels of nesting overwhelm readers

## Rule of Thumb

- Function should fit on one screen (~50 lines max)
- Maximum 3 levels of nesting
- If you need a comment to explain a section, extract it to a function
- Each function should do ONE thing well

## Bad Example: Monolithic Function

```typescript
async function processOrder(orderId: string) {
  // 200+ lines doing everything...

  // Validation
  const order = await db.orders.findOne({ id: orderId });
  if (!order) {
    throw new Error('Order not found');
  }
  if (order.status !== 'pending') {
    throw new Error('Order already processed');
  }
  if (!order.items || order.items.length === 0) {
    throw new Error('Order has no items');
  }

  // Inventory check
  for (const item of order.items) {
    const product = await db.products.findOne({ id: item.productId });
    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }
  }

  // Reserve inventory
  for (const item of order.items) {
    await db.products.updateOne(
      { id: item.productId },
      { $inc: { stock: -item.quantity, reserved: item.quantity } }
    );
  }

  // Calculate totals
  let subtotal = 0;
  for (const item of order.items) {
    const product = await db.products.findOne({ id: item.productId });
    subtotal += product.price * item.quantity;
  }
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + tax + shipping;

  // Process payment
  const customer = await db.customers.findOne({ id: order.customerId });
  const paymentMethod = await db.paymentMethods.findOne({ id: customer.defaultPaymentMethodId });

  const paymentResult = await stripe.charges.create({
    amount: total * 100,
    currency: 'usd',
    source: paymentMethod.stripeTokenId,
    description: `Order ${orderId}`,
  });

  if (paymentResult.status !== 'succeeded') {
    // Rollback inventory
    for (const item of order.items) {
      await db.products.updateOne(
        { id: item.productId },
        { $inc: { stock: item.quantity, reserved: -item.quantity } }
      );
    }
    throw new Error('Payment failed');
  }

  // Update order
  await db.orders.updateOne(
    { id: orderId },
    {
      $set: {
        status: 'confirmed',
        subtotal,
        tax,
        shipping,
        total,
        processedAt: new Date(),
        paymentId: paymentResult.id,
      }
    }
  );

  // Send confirmation email
  const emailHtml = generateOrderConfirmationEmail(order, customer);
  await sendEmail({
    to: customer.email,
    subject: `Order Confirmation #${order.number}`,
    html: emailHtml,
  });

  // Log analytics
  await analytics.track('order_completed', {
    orderId,
    total,
    itemCount: order.items.length,
    customerId: customer.id,
  });

  return order;
}
```

**Problems:**
- Impossible to understand at a glance
- Can't test individual steps in isolation
- Hard to reuse logic (e.g., inventory reservation)
- Difficult to debug when something fails
- N+1 query problems hidden in the complexity

## Good Example: Decomposed Functions

```typescript
async function processOrder(orderId: string): Promise<Order> {
  // High-level "what" - readable like a story
  const order = await validateAndFetchOrder(orderId);
  const inventory = await reserveInventory(order.items);

  try {
    const totals = calculateOrderTotals(order.items);
    const payment = await processPayment(order.customerId, totals.total, orderId);

    const confirmedOrder = await confirmOrder(orderId, totals, payment.id);
    await sendOrderConfirmationEmail(confirmedOrder);
    await trackOrderAnalytics(confirmedOrder);

    return confirmedOrder;
  } catch (error) {
    await rollbackInventoryReservation(inventory);
    throw error;
  }
}

// Each helper function is focused and testable

async function validateAndFetchOrder(orderId: string): Promise<Order> {
  const order = await OrderRepository.findById(orderId);

  if (!order) {
    throw new OrderNotFoundError(orderId);
  }

  if (order.status !== 'pending') {
    throw new OrderAlreadyProcessedError(orderId, order.status);
  }

  if (!order.items || order.items.length === 0) {
    throw new EmptyOrderError(orderId);
  }

  return order;
}

async function reserveInventory(items: OrderItem[]): Promise<InventoryReservation[]> {
  // Fetch all products in one query (avoid N+1)
  const productIds = items.map(item => item.productId);
  const products = await ProductRepository.findByIds(productIds);
  const productMap = new Map(products.map(p => [p.id, p]));

  // Validate stock availability
  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new ProductNotFoundError(item.productId);
    }
    if (product.stock < item.quantity) {
      throw new InsufficientStockError(product.name, product.stock, item.quantity);
    }
  }

  // Reserve inventory (single batch update would be even better)
  return await InventoryService.reserveItems(items);
}

interface OrderTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

function calculateOrderTotals(items: OrderItem[]): OrderTotals {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
}

async function processPayment(
  customerId: string,
  amount: number,
  orderId: string
): Promise<Payment> {
  const paymentMethod = await PaymentMethodRepository.getDefaultForCustomer(customerId);

  const paymentResult = await PaymentGateway.charge({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    paymentMethod: paymentMethod.gatewayToken,
    description: `Order ${orderId}`,
  });

  if (!paymentResult.succeeded) {
    throw new PaymentFailedError(paymentResult.errorMessage);
  }

  return paymentResult;
}

async function confirmOrder(
  orderId: string,
  totals: OrderTotals,
  paymentId: string
): Promise<Order> {
  return await OrderRepository.update(orderId, {
    status: 'confirmed',
    ...totals,
    paymentId,
    processedAt: new Date(),
  });
}

async function sendOrderConfirmationEmail(order: Order): Promise<void> {
  const customer = await CustomerRepository.findById(order.customerId);
  await EmailService.sendOrderConfirmation(customer.email, order);
}

async function trackOrderAnalytics(order: Order): Promise<void> {
  await AnalyticsService.track('order_completed', {
    orderId: order.id,
    total: order.total,
    itemCount: order.items.length,
    customerId: order.customerId,
  });
}

async function rollbackInventoryReservation(
  reservation: InventoryReservation[]
): Promise<void> {
  await InventoryService.releaseReservation(reservation);
}
```

**Benefits:**
- Main function reads like documentation
- Each helper can be tested independently
- Logic can be reused (e.g., `calculateOrderTotals` elsewhere)
- Easy to add new steps (e.g., fraud detection)
- Clear error handling and rollback
- No N+1 queries

## When to Extract a Function

### 1. Section Needs a Comment

```typescript
// ❌ Bad - section with comment
function analyzeData(data: number[]) {
  // Calculate mean
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / data.length;

  // Calculate standard deviation
  const squaredDiffs = data.map(x => Math.pow(x - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / data.length;
  const stdDev = Math.sqrt(variance);

  return { mean, stdDev };
}

// ✅ Good - extracted functions (comments not needed)
function analyzeData(data: number[]) {
  const mean = calculateMean(data);
  const stdDev = calculateStandardDeviation(data, mean);
  return { mean, stdDev };
}

function calculateMean(data: number[]): number {
  const sum = data.reduce((a, b) => a + b, 0);
  return sum / data.length;
}

function calculateStandardDeviation(data: number[], mean: number): number {
  const squaredDiffs = data.map(x => Math.pow(x - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / data.length;
  return Math.sqrt(variance);
}
```

### 2. Deep Nesting (>3 levels)

```typescript
// ❌ Bad - hard to follow
function processUsers(users: User[]) {
  for (const user of users) {
    if (user.status === 'active') {
      if (user.subscription) {
        if (user.subscription.expiresAt < new Date()) {
          if (user.paymentMethod) {
            // ... deeply nested logic
          }
        }
      }
    }
  }
}

// ✅ Good - extracted and flattened
function processUsers(users: User[]) {
  const activeUsers = users.filter(u => u.status === 'active');

  for (const user of activeUsers) {
    if (shouldRenewSubscription(user)) {
      renewSubscription(user);
    }
  }
}

function shouldRenewSubscription(user: User): boolean {
  return user.subscription &&
         user.subscription.expiresAt < new Date() &&
         user.paymentMethod !== null;
}

function renewSubscription(user: User): void {
  // Focused renewal logic
}
```

### 3. Repeated Logic

```typescript
// ❌ Bad - duplication
function processOrders() {
  for (const order of pendingOrders) {
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    const tax = total * 0.08;
    const grandTotal = total + tax;
    // ... process
  }

  for (const order of refundOrders) {
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    const tax = total * 0.08;
    const grandTotal = total + tax;
    // ... process
  }
}

// ✅ Good - extracted
function processOrders() {
  pendingOrders.forEach(order => processOrder(order));
  refundOrders.forEach(order => processRefund(order));
}

function calculateOrderTotal(order: Order): number {
  const subtotal = order.items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * TAX_RATE;
  return subtotal + tax;
}
```

## Function Size Guidelines

**Ideal:** 5-15 lines
**Acceptable:** Up to 30 lines
**Refactor:** 50+ lines or 3+ levels of nesting

## Review Checklist

- [ ] Is the function longer than 50 lines?
- [ ] Does it have more than 3 levels of nesting?
- [ ] Are there sections that need comments to explain what they do?
- [ ] Could the function be split into "what" (parent) and "how" (helpers)?
- [ ] Can extracted functions be reused elsewhere?
- [ ] Is each function doing only ONE thing?
- [ ] Does the main function read like a clear story?
