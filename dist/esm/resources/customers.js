const BASE_PATH = "/api/v1/client/customers";
export class CustomersResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * Create a new customer.
     */
    async create(params) {
        return this.http.post(BASE_PATH, params);
    }
    /**
     * Get a customer by customer reference ID.
     */
    async get(customerReferenceId) {
        return this.http.get(`${BASE_PATH}/${encodeURIComponent(customerReferenceId)}`);
    }
    /**
     * Update a customer by customer reference ID.
     */
    async update(customerReferenceId, params) {
        return this.http.patch(`${BASE_PATH}/${encodeURIComponent(customerReferenceId)}`, params);
    }
}
//# sourceMappingURL=customers.js.map