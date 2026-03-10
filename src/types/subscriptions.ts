import type { Invoice } from "./billing.js";

export interface CreateSubscriptionParams {
  customerReferenceId: string;
  planId: string;
  gracePeriod?: number;
}

export type CancelMode = "END_OF_PERIOD" | "IMMEDIATE";

export type ChangeType = "UPGRADE" | "DOWNGRADE";

export interface ChangePlanParams {
  changeToPlanId: string;
  changeType: ChangeType;
}

export interface SubscriptionDetail {
  id: string;
  isActive: boolean;
  intervalMonths: string;
  customer?: Record<string, unknown>;
  plan?: Record<string, unknown>;
  gracePeriodDays?: number;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelMode?: string;
  cancelEffectiveAt?: string;
  cancelledAt?: string;
  billingAnchorDay?: number;
  metadata?: Record<string, unknown[]>;
  scheduledChange?: ScheduledChange | null;
}

export interface ScheduledChange {
  id: string;
  type: string;
  subscriptionId: string;
  fromPlan: Record<string, unknown>;
  toPlan: Record<string, unknown>;
  status: string;
  effectiveAt: string;
  createdAt: string;
}

export interface SubscribedCustomerResponse {
  subscription: SubscriptionDetail;
  invoice: Invoice;
  metadata?: Record<string, unknown>;
}

/** @deprecated Use SubscriptionDetail instead */
export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  status: string;
  [key: string]: unknown;
}
