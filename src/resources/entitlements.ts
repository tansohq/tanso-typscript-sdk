import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type {
  EntitlementEvaluation,
  EvaluateEntitlementParams,
  SubscriptionEntitlements,
} from "../types/entitlements.js";

const BASE_PATH = "/api/v1/client/entitlements";

export class EntitlementsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List entitlements for a customer (paginated).
   */
  async list(
    customerId: string,
    limit?: number,
    offset?: number
  ): Promise<PaginatedResponse<SubscriptionEntitlements>> {
    return this.http.get<PaginatedResponse<SubscriptionEntitlements>>(
      `${BASE_PATH}/${encodeURIComponent(customerId)}`,
      { limit, offset }
    );
  }

  /**
   * Check a single entitlement for a customer.
   * @param record - Whether to record the check (default: true)
   */
  async check(
    customerId: string,
    featureKey: string,
    record?: boolean
  ): Promise<EntitlementEvaluation> {
    return this.http.get<EntitlementEvaluation>(
      `${BASE_PATH}/${encodeURIComponent(customerId)}/${encodeURIComponent(featureKey)}`,
      record !== undefined ? { record: String(record) } : undefined
    );
  }

  /**
   * Evaluate an entitlement with optional usage simulation.
   */
  async evaluate(params: EvaluateEntitlementParams): Promise<EntitlementEvaluation> {
    return this.http.post<EntitlementEvaluation>(BASE_PATH, params);
  }
}
