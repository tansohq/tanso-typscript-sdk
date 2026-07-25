import type { HttpClient } from "../http.js";
import type { CancelMode, ChangePlanParams, CreateSubscriptionParams, SubscribedCustomerResponse } from "../types/subscriptions.js";
export declare class SubscriptionsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * Create a new subscription.
     */
    create(params: CreateSubscriptionParams): Promise<SubscribedCustomerResponse>;
    /**
     * Cancel a subscription.
     * @param subscriptionId - The subscription ID
     * @param cancelMode - Cancellation mode: END_OF_PERIOD (default) or IMMEDIATE
     */
    cancel(subscriptionId: string, cancelMode?: CancelMode): Promise<void>;
    /**
     * Revert a scheduled cancellation.
     */
    revertCancellation(subscriptionId: string): Promise<void>;
    /**
     * Change the plan for a subscription.
     */
    changePlan(subscriptionId: string, params: ChangePlanParams): Promise<void>;
    /**
     * Cancel a scheduled plan change.
     */
    cancelScheduledChange(subscriptionId: string): Promise<void>;
}
//# sourceMappingURL=subscriptions.d.ts.map