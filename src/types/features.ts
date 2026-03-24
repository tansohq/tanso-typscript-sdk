export interface Feature {
  id: string;
  name: string;
  key: string;
  description?: string;
  createdAt?: string;
  modifiedAt?: string;
  isEnabled?: boolean;
  metadata?: Record<string, unknown>;
}
