export interface CostInput {
  model?: string;
  modelProvider?: string;
  /** @deprecated Use inputTokens and outputTokens instead. */
  costUnits?: number;
  inputTokens?: number;
  outputTokens?: number;
}

export interface IngestEventParams {
  customerReferenceId: string;
  eventName: string;
  eventIdempotencyKey: string;
  usageUnits?: number;
  occurredAt?: string;
  costAmount?: number;
  revenueAmount?: number;
  costInput?: CostInput;
  flowId?: string;
  meta?: Record<string, unknown>;
  featureKey?: string;
  featureId?: string;
  customerId?: string;
  subscriptionId?: string;
  entitlementId?: string;
  invoiceId?: string;
}

export interface EventIngestionResponse {
  usageLimitExceeded?: boolean;
  message?: string;
}
