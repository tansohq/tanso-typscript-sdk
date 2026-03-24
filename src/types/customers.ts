import type { SubscriptionDetail } from "./subscriptions.js";
import type { CreditPool } from "./credits.js";

export interface CreateCustomerParams {
  customerReferenceId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

export interface UpdateCustomerParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface Customer {
  customerReferenceId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  subscriptions?: SubscriptionDetail[];
  creditPools?: CreditPool[];
  createdAt?: string;
  modifiedAt?: string;
}
