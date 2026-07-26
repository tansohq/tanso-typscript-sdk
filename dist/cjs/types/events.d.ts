import type { WeightMatch } from "./entitlements.js";
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
/**
 * Credit fields are absent when no credit model applies to the feature.
 */
export interface EventIngestionResponse {
    usageLimitExceeded?: boolean;
    message?: string;
    creditsDeducted?: number;
    weightApplied?: number;
    weightId?: string;
    weightMatch?: WeightMatch;
    remainingBalance?: number;
}
//# sourceMappingURL=events.d.ts.map