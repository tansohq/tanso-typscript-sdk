import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type { CheckoutSession, Invoice } from "../types/billing.js";

const BASE_PATH = "/api/v1/client/billing/invoices";

export class BillingResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List invoices for a customer (paginated).
   */
  async listInvoices(
    customerId: string,
    limit?: number,
    offset?: number
  ): Promise<PaginatedResponse<Invoice>> {
    return this.http.get<PaginatedResponse<Invoice>>(
      `${BASE_PATH}/${encodeURIComponent(customerId)}`,
      { limit, offset }
    );
  }

  /**
   * Mark an invoice as paid.
   */
  async markPaid(invoiceId: string): Promise<void> {
    await this.http.post<void>(
      `${BASE_PATH}/${encodeURIComponent(invoiceId)}/mark-paid`
    );
  }

  /**
   * Create a Stripe checkout session for an invoice.
   */
  async createCheckoutSession(invoiceId: string): Promise<CheckoutSession> {
    return this.http.post<CheckoutSession>(
      `${BASE_PATH}/${encodeURIComponent(invoiceId)}/stripe/checkout`
    );
  }
}
