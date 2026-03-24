# @tansohq/sdk

Official TypeScript SDK for the [Tanso](https://tansohq.com) REST API.

## Installation

```bash
npm install @tansohq/sdk
```

## Requirements

- Node.js 18+ (uses native `fetch`)

## Quick Start

```typescript
import { TansoClient } from "@tanso/sdk";

const client = new TansoClient("sk_test_your_api_key");

// Create a customer
const customer = await client.customers.create({
  customerReferenceId: "user_123",
  email: "jane@example.com",
  firstName: "Jane",
  lastName: "Doe",
});

// Create a subscription
const subscription = await client.subscriptions.create({
  customerReferenceId: "user_123",
  planId: "plan_pro",
});

// Check an entitlement
const entitlement = await client.entitlements.check("user_123", "api_access");
console.log(entitlement.allowed); // true

// Ingest a usage event
await client.events.ingest({
  customerReferenceId: "user_123",
  eventName: "api_call",
  eventIdempotencyKey: "evt_unique_123",
  usageUnits: 1,
});
```

## Environment Detection

The SDK automatically detects the environment from your API key prefix:

| Key Prefix  | Base URL                              |
|-------------|---------------------------------------|
| `sk_test_`  | `https://sandbox.api.tansoflow.com`   |
| `sk_live_`  | `https://api.tansoflow.com`           |

You can override this with the `baseUrl` option:

```typescript
const client = new TansoClient("sk_test_key", {
  baseUrl: "http://localhost:8080",
});
```

## Resources

### Customers

```typescript
client.customers.create({ customerReferenceId, email, firstName?, lastName?, phoneNumber?, address? })
client.customers.get(customerReferenceId)
client.customers.update(customerReferenceId, { firstName?, lastName?, email?, phoneNumber? })
```

### Subscriptions

```typescript
client.subscriptions.create({ customerReferenceId, planId, gracePeriod? })
client.subscriptions.cancel(subscriptionId, cancelMode?)  // "END_OF_PERIOD" | "IMMEDIATE"
client.subscriptions.revertCancellation(subscriptionId)
client.subscriptions.changePlan(subscriptionId, { changeToPlanId, changeType })
client.subscriptions.cancelScheduledChange(subscriptionId)
```

### Plans

```typescript
client.plans.list(limit?, offset?)
```

### Features

```typescript
client.features.list(limit?, offset?)
client.features.get(featureKey)
```

### Entitlements

```typescript
client.entitlements.list(customerId, limit?, offset?)
client.entitlements.check(customerId, featureKey, record?)
client.entitlements.evaluate({ customerReferenceId, featureKey, usage?, context? })
```

### Events

```typescript
client.events.ingest({
  customerReferenceId,
  eventName,
  eventIdempotencyKey,
  usageUnits?,
  costAmount?,
  revenueAmount?,
  costInput?,   // { model?, modelProvider?, costUnits? }
  meta?,
  flowId?,
  featureKey?,
})
```

### Billing

```typescript
client.billing.listInvoices(customerId, limit?, offset?)
client.billing.markPaid(invoiceId)
client.billing.createCheckoutSession(invoiceId)
```

### Credits

```typescript
client.credits.listPools(customerReferenceId, limit?, offset?)
client.credits.getPool(customerReferenceId, poolId)
client.credits.listTransactions(customerReferenceId, poolId, limit?, offset?)
client.credits.listGrants(customerReferenceId, poolId, limit?, offset?)
```

## Error Handling

All methods unwrap the API response envelope automatically. On success, the `data` field is returned directly. On failure, a typed error is thrown:

```typescript
import {
  TansoApiError,
  TansoAuthenticationError,
  TansoNotFoundError,
  TansoConflictError,
  TansoNetworkError,
} from "@tanso/sdk";

try {
  await client.customers.get("nonexistent");
} catch (error) {
  if (error instanceof TansoNotFoundError) {
    console.log(error.message);    // "Customer not found"
    console.log(error.statusCode); // 404
    console.log(error.detail);     // optional detail string
  } else if (error instanceof TansoAuthenticationError) {
    // 401 - invalid API key
  } else if (error instanceof TansoConflictError) {
    // 409 - resource conflict
  } else if (error instanceof TansoNetworkError) {
    // Connection/timeout error
  } else if (error instanceof TansoApiError) {
    // Other API error
    console.log(error.statusCode);
  }
}
```

## Error Hierarchy

```
TansoError (base)
  TansoApiError (message, detail, statusCode)
    TansoAuthenticationError (401)
    TansoNotFoundError (404)
    TansoConflictError (409)
  TansoNetworkError (connection/timeout)
```

## Development

```bash
make install   # Install dependencies
make build     # Build ESM + CJS
make test      # Run tests
make lint      # Type-check
make clean     # Remove dist and node_modules
```

## License

MIT
