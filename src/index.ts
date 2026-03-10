// Client
export { TansoClient } from "./client.js";
export type { TansoClientOptions } from "./client.js";

// Errors
export {
  TansoError,
  TansoApiError,
  TansoAuthenticationError,
  TansoNotFoundError,
  TansoConflictError,
  TansoNetworkError,
} from "./errors.js";

// Types - Common
export type { ApiResponse, PaginatedResponse, PaginationParams } from "./types/common.js";

// Types - Customers
export type { CreateCustomerParams, UpdateCustomerParams, Customer } from "./types/customers.js";

// Types - Subscriptions
export type {
  CreateSubscriptionParams,
  CancelMode,
  ChangeType,
  ChangePlanParams,
  Subscription,
  SubscriptionDetail,
  ScheduledChange,
  SubscribedCustomerResponse,
} from "./types/subscriptions.js";

// Types - Plans
export type {
  Plan,
  PlanDetail,
  PlanFeature,
  FeaturePricing,
  PriceTier,
  CreditAllocation,
} from "./types/plans.js";

// Types - Entitlements
export type {
  Entitlement,
  SubscriptionEntitlements,
  EvaluateEntitlementParams,
  EntitlementEvaluation,
  EntitlementEvaluationUsage,
  EntitlementEvaluationSimulation,
  EntitlementEvaluationCredit,
  EntitlementEvaluationMeta,
} from "./types/entitlements.js";

// Types - Events
export type { IngestEventParams, EventIngestionResponse } from "./types/events.js";

// Types - Billing
export type { Invoice, InvoiceItem, CheckoutSession } from "./types/billing.js";
