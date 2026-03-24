import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type { Feature } from "../types/features.js";

const BASE_PATH = "/api/v1/client/features";

export class FeaturesResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all features (paginated).
   */
  async list(limit?: number, offset?: number): Promise<PaginatedResponse<Feature>> {
    return this.http.get<PaginatedResponse<Feature>>(BASE_PATH, { limit, offset });
  }

  /**
   * Get a feature by its unique key.
   */
  async get(featureKey: string): Promise<Feature> {
    return this.http.get<Feature>(`${BASE_PATH}/${encodeURIComponent(featureKey)}`);
  }
}
