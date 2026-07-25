import type { HttpClient } from "../http.js";
import type { CreateCustomerParams, Customer, UpdateCustomerParams } from "../types/customers.js";
export declare class CustomersResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * Create a new customer.
     */
    create(params: CreateCustomerParams): Promise<Customer>;
    /**
     * Get a customer by customer reference ID.
     */
    get(customerReferenceId: string): Promise<Customer>;
    /**
     * Update a customer by customer reference ID.
     */
    update(customerReferenceId: string, params: UpdateCustomerParams): Promise<Customer>;
}
//# sourceMappingURL=customers.d.ts.map