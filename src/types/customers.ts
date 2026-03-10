export interface CreateCustomerParams {
  externalClientCustomerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

export interface UpdateCustomerParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export interface Customer {
  id: string;
  externalClientCustomerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  subscriptions?: Record<string, unknown>[];
  creditPools?: Record<string, unknown>[];
  createdAt?: string;
  modifiedAt?: string;
  [key: string]: unknown;
}
