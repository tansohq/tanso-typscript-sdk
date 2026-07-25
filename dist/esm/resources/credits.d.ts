import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type { CreditGrant, CreditPool, CreditTransaction } from "../types/credits.js";
export declare class CreditsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List credit pools for a customer (paginated).
     */
    listPools(customerReferenceId: string, limit?: number, offset?: number): Promise<PaginatedResponse<CreditPool>>;
    /**
     * Get a specific credit pool.
     */
    getPool(customerReferenceId: string, poolId: string): Promise<CreditPool>;
    /**
     * List transactions for a credit pool (paginated).
     */
    listTransactions(customerReferenceId: string, poolId: string, limit?: number, offset?: number): Promise<PaginatedResponse<CreditTransaction>>;
    /**
     * List grants for a credit pool (paginated).
     */
    listGrants(customerReferenceId: string, poolId: string, limit?: number, offset?: number): Promise<PaginatedResponse<CreditGrant>>;
}
//# sourceMappingURL=credits.d.ts.map