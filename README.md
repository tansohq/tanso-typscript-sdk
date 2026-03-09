# @tanso/sdk

Official TypeScript SDK for the [Tanso](https://tansoflow.com) REST API.

## Installation

```bash
npm install @tanso/sdk
```

## Requirements

- Node.js 18+ (uses native `fetch`)

## Quick Start

```typescript
import { TansoClient } from "@tanso/sdk";

const client = new TansoClient("sk_test_your_api_key");

// Create a customer
const customer = await client.customers.create({
  externalClientCustomerId: "user_123",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
});

// Create a subscription
const subscription = await client.subscriptions.create({
  externalClientCustomerId: "user_123",
  planId: "plan_pro",
});

// Check an entitlement
const entitlement = await client.entitlements.check("user_123", "api_access");
console.log(entitlement.isAllowed); // true

// Ingest a usage event
await client.events.ingest({
  customerReferenceId: "user_123",
  eventName: "api_call",
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
client.customers.create({ externalClientCustomerId, firstName, lastName, email, phoneNumber? })
client.customers.get(externalClientCustomerId)
client.customers.update(externalClientCustomerId, { firstName?, lastName?, email?, phoneNumber? })
```

### Subscriptions

```typescript
client.subscriptions.create({ externalClientCustomerId, planId })
client.subscriptions.cancel(subscriptionId, cancelMode?)  // "END_OF_PERIOD" | "IMMEDIATE"
client.subscriptions.revertCancellation(subscriptionId)
client.subscriptions.changePlan(subscriptionId, { changeToPlanId, changeType })
client.subscriptions.cancelScheduledChange(subscriptionId)
```

### Plans

```typescript
client.plans.list(limit?, offset?)
```

### Entitlements

```typescript
client.entitlements.list(customerId, limit?, offset?)
client.entitlements.check(customerId, featureKey)
client.entitlements.evaluate({ customerReferenceId, featureKey, usage?, context? })
```

### Events

```typescript
client.events.ingest({ customerReferenceId, eventName, usageUnits, properties?, meta?, eventIdempotencyKey? })
```

### Billing

```typescript
client.billing.listInvoices(customerId, limit?, offset?)
client.billing.markPaid(invoiceId)
client.billing.createCheckoutSession(invoiceId)
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
