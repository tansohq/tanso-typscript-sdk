export interface Invoice {
  id: string;
  createdAt: string;
  modifiedAt: string;
  amount: number;
  dueDate: string;
  currency: string;
  subscription?: Record<string, unknown>;
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
  [key: string]: unknown;
}
