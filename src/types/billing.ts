import type { SubscriptionDetail } from "./subscriptions.js";

export interface Invoice {
  id: string;
  createdAt: string;
  modifiedAt: string;
  amount: number;
  dueDate: string;
  currency: string;
  subscription?: SubscriptionDetail;
  status: string;
  metadata?: Record<string, unknown>;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  createdAt: string;
  modifiedAt: string;
  chargeAmount: number;
  description: string;
}

export interface CheckoutSession {
  url: string;
}
