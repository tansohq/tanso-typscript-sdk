import type { HttpClient } from "../http.js";
import type { CreateCustomerParams, Customer, UpdateCustomerParams } from "../types/customers.js";

const BASE_PATH = "/api/v1/client/customers";

export class CustomersResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a new customer.
   */
  async create(params: CreateCustomerParams): Promise<Customer> {
    return this.http.post<Customer>(BASE_PATH, params);
  }

  /**
   * Get a customer by external customer ID.
   */
  async get(externalClientCustomerId: string): Promise<Customer> {
    return this.http.get<Customer>(`${BASE_PATH}/${encodeURIComponent(externalClientCustomerId)}`);
  }

  /**
   * Update a customer by external customer ID.
   */
  async update(
    externalClientCustomerId: string,
    params: UpdateCustomerParams
  ): Promise<Customer> {
    return this.http.patch<Customer>(
      `${BASE_PATH}/${encodeURIComponent(externalClientCustomerId)}`,
      params
    );
  }
}
