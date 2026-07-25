import type { HttpClient } from "../http.js";
import type { PaginatedResponse } from "../types/common.js";
import type { CheckoutSession, Invoice } from "../types/billing.js";
export declare class BillingResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List invoices for a customer (paginated).
     */
    listInvoices(customerId: string, limit?: number, offset?: number): Promise<PaginatedResponse<Invoice>>;
    /**
     * Mark an invoice as paid.
     */
    markPaid(invoiceId: string): Promise<void>;
    /**
     * Create a Stripe checkout session for a subscription.
     */
    createCheckoutSession(subscriptionId: string): Promise<CheckoutSession>;
}
//# sourceMappingURL=billing.d.ts.map