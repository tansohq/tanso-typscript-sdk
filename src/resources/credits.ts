import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type { CreditGrant, CreditPool, CreditTransaction } from "../types/credits.js";

const BASE_PATH = "/api/v1/client/credits";

export class CreditsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List credit pools for a customer (paginated).
   */
  async listPools(
    customerReferenceId: string,
    limit?: number,
    offset?: number
  ): Promise<PaginatedResponse<CreditPool>> {
    return this.http.get<PaginatedResponse<CreditPool>>(
      `${BASE_PATH}/${encodeURIComponent(customerReferenceId)}/pools`,
      { limit, offset }
    );
  }

  /**
   * Get a specific credit pool.
   */
  async getPool(
    customerReferenceId: string,
    poolId: string
  ): Promise<CreditPool> {
    return this.http.get<CreditPool>(
      `${BASE_PATH}/${encodeURIComponent(customerReferenceId)}/pools/${encodeURIComponent(poolId)}`
    );
  }

  /**
   * List transactions for a credit pool (paginated).
   */
  async listTransactions(
    customerReferenceId: string,
    poolId: string,
    limit?: number,
    offset?: number
  ): Promise<PaginatedResponse<CreditTransaction>> {
    return this.http.get<PaginatedResponse<CreditTransaction>>(
      `${BASE_PATH}/${encodeURIComponent(customerReferenceId)}/pools/${encodeURIComponent(poolId)}/transactions`,
      { limit, offset }
    );
  }

  /**
   * List grants for a credit pool (paginated).
   */
  async listGrants(
    customerReferenceId: string,
    poolId: string,
    limit?: number,
    offset?: number
  ): Promise<PaginatedResponse<CreditGrant>> {
    return this.http.get<PaginatedResponse<CreditGrant>>(
      `${BASE_PATH}/${encodeURIComponent(customerReferenceId)}/pools/${encodeURIComponent(poolId)}/grants`,
      { limit, offset }
    );
  }
}
