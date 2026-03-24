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
  billingTiming: string;
  metadata?: Record<string, unknown>;
}

export interface PlanFeature {
  id: string;
  name: string;
  key: string;
  description?: string;
  pricingType: string;
  pricing?: FeaturePricing;
}

export interface FeaturePricing {
  model: string;
  pricePerUnit?: number;
  unitLabel?: string;
  maxUsage?: number;
  resetMode?: string;
  tiers?: PriceTier[];
}

export interface PriceTier {
  upTo: number | string | null;
  pricePerUnit: number;
  flatFee?: number;
}

export interface CreditAllocation {
  id: string;
  creditModelId: string;
  creditModelName: string;
  denomination?: string;
  creditAmount: number;
  grantExpiresMonths?: number;
  hardLimit?: boolean | null;
  createdAt?: string;
}
