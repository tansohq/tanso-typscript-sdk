import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type { Feature } from "../types/features.js";
export declare class FeaturesResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all features (paginated).
     */
    list(limit?: number, offset?: number): Promise<PaginatedResponse<Feature>>;
    /**
     * Get a feature by its unique key.
     */
    get(featureKey: string): Promise<Feature>;
}
//# sourceMappingURL=features.d.ts.map