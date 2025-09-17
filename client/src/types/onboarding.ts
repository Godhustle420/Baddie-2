export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface OnboardingStatus {
  completed: boolean;
  currentStep: number;
  totalSteps: number;
  steps: OnboardingStep[];
}

export interface StoreProfile {
  storeName: string;
  description: string;
  logo?: string;
  banner?: string;
}

export interface PaymentSetup {
  paymentProvider: 'stripe' | 'paypal' | 'both';
  stripeAccountId?: string;
  paypalMerchantId?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export interface ProductData {
  productTitle: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}