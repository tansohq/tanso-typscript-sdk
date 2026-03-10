import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type { Plan } from "../types/plans.js";

const BASE_PATH = "/api/v1/client/plans";

export class PlansResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all plans (paginated).
   */
  async list(limit?: number, offset?: number): Promise<PaginatedResponse<Plan>> {
    return this.http.get<PaginatedResponse<Plan>>(BASE_PATH, { limit, offset });
  }
}
