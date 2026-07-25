"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesResource = void 0;
const BASE_PATH = "/api/v1/client/features";
class FeaturesResource {
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
exports.FeaturesResource = FeaturesResource;
//# sourceMappingURL=features.js.map