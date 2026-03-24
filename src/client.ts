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

const SANDBOX_BASE_URL = "https://sandbox.api.tansoflow.com";
const LIVE_BASE_URL = "https://api.tansoflow.com";

export interface TansoClientOptions {
  /** Override the base URL for the API. */
  baseUrl?: string;
}

export class TansoClient {
  public readonly customers: CustomersResource;
  public readonly subscriptions: SubscriptionsResource;
  public readonly plans: PlansResource;
  public readonly entitlements: EntitlementsResource;
  public readonly events: EventsResource;
  public readonly billing: BillingResource;
  public readonly features: FeaturesResource;
  public readonly credits: CreditsResource;

  constructor(apiKey: string, options?: TansoClientOptions) {
    if (!apiKey) {
      throw new TansoError("API key is required");
    }

    const baseUrl = options?.baseUrl ?? this.detectBaseUrl(apiKey);
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

  private detectBaseUrl(apiKey: string): string {
    if (apiKey.startsWith("sk_test_")) {
      return SANDBOX_BASE_URL;
    }
    if (apiKey.startsWith("sk_live_")) {
      return LIVE_BASE_URL;
    }
    return LIVE_BASE_URL;
  }
}
