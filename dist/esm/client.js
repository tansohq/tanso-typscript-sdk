import { TansoError } from "./errors.js";
import { HttpClient } from "./http.js";
import { BillingResource } from "./resources/billing.js";
import { CreditsResource } from "./resources/credits.js";
import { CustomersResource } from "./resources/customers.js";
import { EntitlementsResource } from "./resources/entitlements.js";
import { EventsResource } from "./resources/events.js";
import { FeaturesResource } from "./resources/features.js";
import { PlansResource } from "./resources/plans.js";
import { SubscriptionsResource } from "./resources/subscriptions.js";
/** Tanso is self-hosted; this default matches the quickstart compose stack. */
const DEFAULT_BASE_URL = "http://localhost:8080";
export class TansoClient {
    customers;
    subscriptions;
    plans;
    entitlements;
    events;
    billing;
    features;
    credits;
    constructor(apiKey, options) {
        if (!apiKey) {
            throw new TansoError("API key is required");
        }
        const baseUrl = options?.baseUrl ?? DEFAULT_BASE_URL;
        const http = new HttpClient({ apiKey, baseUrl });
        this.customers = new CustomersResource(http);
        this.subscriptions = new SubscriptionsResource(http);
        this.plans = new PlansResource(http);
        this.entitlements = new EntitlementsResource(http);
        this.events = new EventsResource(http);
        this.billing = new BillingResource(http);
        this.features = new FeaturesResource(http);
        this.credits = new CreditsResource(http);
    }
}
//# sourceMappingURL=client.js.map