export interface CreditPool {
  id: string;
  name: string;
  denomination: string;
  currency?: string;
  balance: number;
  totalGranted: number;
  totalConsumed: number;
  totalExpired: number;
  totalReversed: number;
  hardLimit?: boolean | null;
  status: string;
  rolloverPolicy?: string;
  rolloverCap?: number;
  customerId?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  modifiedAt?: string;
}

export interface CreditGrant {
  id: string;
  creditPoolId: string;
  grantType: string;
  amount: number;
  remaining: number;
  expiresAt?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
}

export interface CreditTransaction {
  id: string;
  creditPoolId: string;
  creditGrantId?: string;
  transactionType: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description?: string;
  reversedTransactionId?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
}
