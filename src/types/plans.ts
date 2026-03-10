export interface Plan {
  plan: PlanDetail;
  features: PlanFeature[];
  creditAllocations?: CreditAllocation[];
}

export interface PlanDetail {
  id: string;
  key: string;
  name: string;
  description: string;
  priceAmount: number;
  currency: string;
  intervalMonths: number;
  billingModel: string;
  billingTiming: string;
  metadata?: Record<string, unknown>;
}

export interface PlanFeature {
  featureKey: string;
  featureName: string;
  type: string;
  value?: unknown;
  pricing?: FeaturePricing;
}

export interface FeaturePricing {
  model: string;
  unitAmount?: number;
  tiers?: PriceTier[];
}

export interface PriceTier {
  upTo: number | null;
  unitAmount: number;
  flatAmount?: number;
}

export interface CreditAllocation {
  creditModelId: string;
  creditModelName: string;
  amount: number;
}
