"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersResource = void 0;
const BASE_PATH = "/api/v1/client/customers";
class CustomersResource {
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
exports.CustomersResource = CustomersResource;
//# sourceMappingURL=customers.js.map