export interface Entitlement {
  featureKey: string;
  isAllowed: boolean;
  [key: string]: unknown;
}

export interface SubscriptionEntitlements {
  subscriptionId: string;
  planId: string;
  entitlements: Entitlement[];
}

export interface EvaluateEntitlementParams {
  customerReferenceId: string;
  featureKey: string;
  usage?: {
    usageUnits: number;
    eventName?: string;
    meta?: Record<string, unknown>;
  };
  context?: {
    idempotencyKey?: string;
    flowId?: string;
  };
}

export interface EntitlementEvaluationUsage {
  used: number;
  limit: number;
  remaining: number;
}

export interface EntitlementEvaluationSimulation {
  requestedUsage: number;
  projectedUsage: number;
  projectedRemaining: number;
  wouldExceedLimit: boolean;
}

export interface EntitlementEvaluationCredit {
  denomination: string;
  balance: number;
  totalGranted: number;
  totalConsumed: number;
  hardLimit: boolean;
}

export interface EntitlementEvaluationMeta {
  reason?: {
    description: string;
  };
}

export interface EntitlementEvaluation {
  referenceCustomerId: string;
  featureKey: string;
  isAllowed: boolean;
  flowId: string;
  meta?: EntitlementEvaluationMeta;
  usage?: EntitlementEvaluationUsage;
  simulation?: EntitlementEvaluationSimulation;
  credit?: EntitlementEvaluationCredit;
}
