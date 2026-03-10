export interface IngestEventParams {
  customerReferenceId: string;
  eventName: string;
  usageUnits: number;
  eventIdempotencyKey: string;
  occurredAt?: string;
  costAmount?: number;
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
