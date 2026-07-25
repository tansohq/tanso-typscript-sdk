const BASE_PATH = "/api/v1/client/features";
export class FeaturesResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * List all features (paginated).
     */
    async list(limit, offset) {
        return this.http.get(BASE_PATH, { limit, offset });
    }
    /**
     * Get a feature by its unique key.
     */
    async get(featureKey) {
        return this.http.get(`${BASE_PATH}/${encodeURIComponent(featureKey)}`);
    }
}
//# sourceMappingURL=features.js.map