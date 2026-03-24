export interface Entitlement {
  featureKey: string;
  allowed: boolean;
}

export interface SubscriptionEntitlements {
  subscriptionId: string;
  entitlements: Entitlement[];
}

export interface EvaluateEntitlementParams {
  customerReferenceId: string;
  featureKey: string;
  usage?: {
    usageUnits?: number;
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
  hardLimit?: boolean | null;
}

export interface EntitlementEvaluationMeta {
  reason?: {
    description: string;
  };
}

export interface EntitlementEvaluation {
  referenceCustomerId: string;
  featureKey: string;
  allowed: boolean;
  flowId: string;
  meta?: EntitlementEvaluationMeta;
  usage?: EntitlementEvaluationUsage;
  simulation?: EntitlementEvaluationSimulation;
  credit?: EntitlementEvaluationCredit;
}
