import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type { Plan } from "../types/plans.js";
export declare class PlansResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all plans (paginated).
     */
    list(limit?: number, offset?: number): Promise<PaginatedResponse<Plan>>;
}
//# sourceMappingURL=plans.d.ts.map