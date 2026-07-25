"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TansoClient = void 0;
const errors_js_1 = require("./errors.js");
const http_js_1 = require("./http.js");
const billing_js_1 = require("./resources/billing.js");
const credits_js_1 = require("./resources/credits.js");
const customers_js_1 = require("./resources/customers.js");
const entitlements_js_1 = require("./resources/entitlements.js");
const events_js_1 = require("./resources/events.js");
const features_js_1 = require("./resources/features.js");
const plans_js_1 = require("./resources/plans.js");
const subscriptions_js_1 = require("./resources/subscriptions.js");
/** Tanso is self-hosted; this default matches the quickstart compose stack. */
const DEFAULT_BASE_URL = "http://localhost:8080";
class TansoClient {
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
            throw new errors_js_1.TansoError("API key is required");
        }
        const baseUrl = options?.baseUrl ?? DEFAULT_BASE_URL;
        const http = new http_js_1.HttpClient({ apiKey, baseUrl });
        this.customers = new customers_js_1.CustomersResource(http);
        this.subscriptions = new subscriptions_js_1.SubscriptionsResource(http);
        this.plans = new plans_js_1.PlansResource(http);
        this.entitlements = new entitlements_js_1.EntitlementsResource(http);
        this.events = new events_js_1.EventsResource(http);
        this.billing = new billing_js_1.BillingResource(http);
        this.features = new features_js_1.FeaturesResource(http);
        this.credits = new credits_js_1.CreditsResource(http);
    }
}
exports.TansoClient = TansoClient;
//# sourceMappingURL=client.js.map