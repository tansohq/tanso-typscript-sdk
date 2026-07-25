"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditsResource = void 0;
const BASE_PATH = "/api/v1/client/credits";
class CreditsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * List credit pools for a customer (paginated).
     */
    async listPools(customerReferenceId, limit, offset) {
        return this.http.get(`${BASE_PATH}/${encodeURIComponent(customerReferenceId)}/pools`, { limit, offset });
    }
    /**
     * Get a specific credit pool.
     */
    async getPool(customerReferenceId, poolId) {
        return this.http.get(`${BASE_PATH}/${encodeURIComponent(customerReferenceId)}/pools/${encodeURIComponent(poolId)}`);
    }
    /**
     * List transactions for a credit pool (paginated).
     */
    async listTransactions(customerReferenceId, poolId, limit, offset) {
        return this.http.get(`${BASE_PATH}/${encodeURIComponent(customerReferenceId)}/pools/${encodeURIComponent(poolId)}/transactions`, { limit, offset });
    }
    /**
     * List grants for a credit pool (paginated).
     */
    async listGrants(customerReferenceId, poolId, limit, offset) {
        return this.http.get(`${BASE_PATH}/${encodeURIComponent(customerReferenceId)}/pools/${encodeURIComponent(poolId)}/grants`, { limit, offset });
    }
}
exports.CreditsResource = CreditsResource;
//# sourceMappingURL=credits.js.map