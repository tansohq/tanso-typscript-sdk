import type { HttpClient } from "../http.js";
import type {
  CancelMode,
  ChangePlanParams,
  CreateSubscriptionParams,
  SubscribedCustomerResponse,
} from "../types/subscriptions.js";

const BASE_PATH = "/api/v1/client/subscriptions";

export class SubscriptionsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a new subscription.
   */
  async create(params: CreateSubscriptionParams): Promise<SubscribedCustomerResponse> {
    return this.http.post<SubscribedCustomerResponse>(BASE_PATH, params);
  }

  /**
   * Cancel a subscription.
   * @param subscriptionId - The subscription ID
   * @param cancelMode - Cancellation mode: END_OF_PERIOD (default) or IMMEDIATE
   */
  async cancel(
    subscriptionId: string,
    cancelMode: CancelMode = "END_OF_PERIOD"
  ): Promise<void> {
    await this.http.post<void>(
      `${BASE_PATH}/cancellation/${encodeURIComponent(subscriptionId)}`,
      undefined,
      { params: { cancelMode } }
    );
  }

  /**
   * Revert a scheduled cancellation.
   */
  async revertCancellation(subscriptionId: string): Promise<void> {
    await this.http.delete<void>(
      `${BASE_PATH}/cancellation/${encodeURIComponent(subscriptionId)}/scheduled`
    );
  }

  /**
   * Change the plan for a subscription.
   */
  async changePlan(subscriptionId: string, params: ChangePlanParams): Promise<void> {
    await this.http.post<void>(
      `${BASE_PATH}/${encodeURIComponent(subscriptionId)}/plan-change`,
      params
    );
  }

  /**
   * Cancel a scheduled plan change.
   */
  async cancelScheduledChange(subscriptionId: string): Promise<void> {
    await this.http.delete<void>(
      `${BASE_PATH}/${encodeURIComponent(subscriptionId)}/plan-change/scheduled`
    );
  }
}
