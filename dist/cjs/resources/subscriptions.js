"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsResource = void 0;
const BASE_PATH = "/api/v1/client/subscriptions";
class SubscriptionsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * Create a new subscription.
     */
    async create(params) {
        return this.http.post(BASE_PATH, params);
    }
    /**
     * Cancel a subscription.
     * @param subscriptionId - The subscription ID
     * @param cancelMode - Cancellation mode: END_OF_PERIOD (default) or IMMEDIATE
     */
    async cancel(subscriptionId, cancelMode = "END_OF_PERIOD") {
        await this.http.post(`${BASE_PATH}/cancellation/${encodeURIComponent(subscriptionId)}`, undefined, { params: { cancelMode } });
    }
    /**
     * Revert a scheduled cancellation.
     */
    async revertCancellation(subscriptionId) {
        await this.http.delete(`${BASE_PATH}/cancellation/${encodeURIComponent(subscriptionId)}/scheduled`);
    }
    /**
     * Change the plan for a subscription.
     */
    async changePlan(subscriptionId, params) {
        await this.http.post(`${BASE_PATH}/${encodeURIComponent(subscriptionId)}/plan-change`, params);
    }
    /**
     * Cancel a scheduled plan change.
     */
    async cancelScheduledChange(subscriptionId) {
        await this.http.delete(`${BASE_PATH}/${encodeURIComponent(subscriptionId)}/plan-change/scheduled`);
    }
}
exports.SubscriptionsResource = SubscriptionsResource;
//# sourceMappingURL=subscriptions.js.map