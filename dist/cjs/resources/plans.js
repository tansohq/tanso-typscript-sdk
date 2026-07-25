"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansResource = void 0;
const BASE_PATH = "/api/v1/client/plans";
class PlansResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * List all plans (paginated).
     */
    async list(limit, offset) {
        return this.http.get(BASE_PATH, { limit, offset });
    }
}
exports.PlansResource = PlansResource;
//# sourceMappingURL=plans.js.map