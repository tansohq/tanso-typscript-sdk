import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type { EntitlementEvaluation, EvaluateEntitlementParams, SubscriptionEntitlements } from "../types/entitlements.js";
export declare class EntitlementsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List entitlements for a customer (paginated).
     */
    list(customerId: string, limit?: number, offset?: number): Promise<PaginatedResponse<SubscriptionEntitlements>>;
    /**
     * Check a single entitlement for a customer.
     * @param record - Whether to record the check (default: true)
     */
    check(customerId: string, featureKey: string, record?: boolean): Promise<EntitlementEvaluation>;
    /**
     * Evaluate an entitlement with optional usage simulation.
     */
    evaluate(params: EvaluateEntitlementParams): Promise<EntitlementEvaluation>;
}
//# sourceMappingURL=entitlements.d.ts.map