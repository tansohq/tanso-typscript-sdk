import { BillingResource } from "./resources/billing.js";
import { CreditsResource } from "./resources/credits.js";
import { CustomersResource } from "./resources/customers.js";
import { EntitlementsResource } from "./resources/entitlements.js";
import { EventsResource } from "./resources/events.js";
import { FeaturesResource } from "./resources/features.js";
import { PlansResource } from "./resources/plans.js";
import { SubscriptionsResource } from "./resources/subscriptions.js";
export interface TansoClientOptions {
    /** Override the base URL for the API. */
    baseUrl?: string;
}
export declare class TansoClient {
    readonly customers: CustomersResource;
    readonly subscriptions: SubscriptionsResource;
    readonly plans: PlansResource;
    readonly entitlements: EntitlementsResource;
    readonly events: EventsResource;
    readonly billing: BillingResource;
    readonly features: FeaturesResource;
    readonly credits: CreditsResource;
    constructor(apiKey: string, options?: TansoClientOptions);
}
//# sourceMappingURL=client.d.ts.map