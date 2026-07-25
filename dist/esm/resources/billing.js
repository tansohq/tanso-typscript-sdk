const BASE_PATH = "/api/v1/client/billing/invoices";
export class BillingResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * List invoices for a customer (paginated).
     */
    async listInvoices(customerId, limit, offset) {
        return this.http.get(`${BASE_PATH}/${encodeURIComponent(customerId)}`, { limit, offset });
    }
    /**
     * Mark an invoice as paid.
     */
    async markPaid(invoiceId) {
        await this.http.post(`${BASE_PATH}/${encodeURIComponent(invoiceId)}/mark-paid`);
    }
    /**
     * Create a Stripe checkout session for a subscription.
     */
    async createCheckoutSession(subscriptionId) {
        return this.http.post(`/api/v1/client/billing/subscriptions/${encodeURIComponent(subscriptionId)}/stripe/checkout`);
    }
}
//# sourceMappingURL=billing.js.map