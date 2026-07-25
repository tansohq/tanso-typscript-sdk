const BASE_PATH = "/api/v1/client/entitlements";
export class EntitlementsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * List entitlements for a customer (paginated).
     */
    async list(customerId, limit, offset) {
        return this.http.get(`${BASE_PATH}/${encodeURIComponent(customerId)}`, { limit, offset });
    }
    /**
     * Check a single entitlement for a customer.
     * @param record - Whether to record the check (default: true)
     */
    async check(customerId, featureKey, record) {
        return this.http.get(`${BASE_PATH}/${encodeURIComponent(customerId)}/${encodeURIComponent(featureKey)}`, record !== undefined ? { record: String(record) } : undefined);
    }
    /**
     * Evaluate an entitlement with optional usage simulation.
     */
    async evaluate(params) {
        return this.http.post(BASE_PATH, params);
    }
}
//# sourceMappingURL=entitlements.js.map