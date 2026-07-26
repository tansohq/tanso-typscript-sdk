export interface Entitlement {
    featureKey: string;
    allowed: boolean;
}
export interface SubscriptionEntitlements {
    subscriptionId: string;
    entitlements: Entitlement[];
}
export interface EvaluateEntitlementParams {
    customerReferenceId: string;
    featureKey: string;
    usage?: {
        usageUnits?: number;
        /**
         * Selects the credit weight row for the quote. Must exactly match the
         * `costInput.model` string sent on the corresponding event ingestion.
         */
        model?: string;
        eventName?: string;
        meta?: Record<string, unknown>;
    };
    context?: {
        idempotencyKey?: string;
        flowId?: string;
    };
}
export interface EntitlementEvaluationUsage {
    used: number;
    limit: number;
    remaining: number;
}
export interface EntitlementEvaluationSimulation {
    requestedUsage: number;
    projectedUsage: number;
    projectedRemaining: number;
    wouldExceedLimit: boolean;
}
export interface EntitlementEvaluationCredit {
    denomination: string;
    balance: number;
    totalGranted: number;
    totalConsumed: number;
    hardLimit?: boolean | null;
}
/**
 * How the credit weight was resolved: an exact (feature, model) row, the
 * feature's default row, or no row (identity weight 1.0).
 */
export type WeightMatch = "MODEL" | "FEATURE_DEFAULT" | "NONE";
/**
 * A quote, not a promise: resolved at request time. The actual charge
 * resolves at the event's occurredAt, so a tariff change between quote and
 * charge can change the outcome.
 */
export interface EntitlementEvaluationCreditQuote {
    weight: number;
    estimatedCredits: number;
    weightId: string | null;
    weightMatch: WeightMatch;
}
export interface EntitlementEvaluationMeta {
    reason?: {
        description: string;
    };
}
export interface EntitlementEvaluation {
    referenceCustomerId: string;
    featureKey: string;
    allowed: boolean;
    flowId: string;
    meta?: EntitlementEvaluationMeta;
    usage?: EntitlementEvaluationUsage;
    simulation?: EntitlementEvaluationSimulation;
    credit?: EntitlementEvaluationCredit;
    creditQuote?: EntitlementEvaluationCreditQuote;
}
//# sourceMappingURL=entitlements.d.ts.map