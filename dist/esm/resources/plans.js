const BASE_PATH = "/api/v1/client/plans";
export class PlansResource {
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
//# sourceMappingURL=plans.js.map