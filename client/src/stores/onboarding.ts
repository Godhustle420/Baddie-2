import { create } from 'zustand';
import { OnboardingStatus, StoreProfile, PaymentSetup, ShippingOption, ProductData } from '@/types/onboarding';

interface OnboardingStore {
  // State
  status: OnboardingStatus | null;
  storeProfile: StoreProfile | null;
  paymentSetup: PaymentSetup | null;
  shippingOptions: ShippingOption[];
  productData: ProductData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchOnboardingStatus: () => Promise<void>;
  updateStep: (stepId: number, completed: boolean, data?: any) => Promise<void>;
  setStoreProfile: (profile: StoreProfile) => void;
  setPaymentSetup: (payment: PaymentSetup) => void;
  setShippingOptions: (options: ShippingOption[]) => void;
  setProductData: (product: ProductData) => void;
  completeOnboarding: () => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  // Initial state
  status: null,
  storeProfile: null,
  paymentSetup: null,
  shippingOptions: [],
  productData: null,
  isLoading: false,
  error: null,

  // Fetch onboarding status
  fetchOnboardingStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/onboarding/status', {
        headers: {
          'user-id': 'demo-user-123' // Mock user ID
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch onboarding status');
      }
      
      const result = await response.json();
      set({ status: result.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      });
    }
  },

  // Update onboarding step
  updateStep: async (stepId: number, completed: boolean, data?: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/onboarding/step/${stepId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': 'demo-user-123' // Mock user ID
        },
        body: JSON.stringify({ completed, data })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update onboarding step');
      }
      
      const result = await response.json();
      
      // Update status
      const { status } = get();
      if (status) {
        const updatedSteps = status.steps.map(step => 
          step.id === stepId ? { ...step, completed } : step
        );
        
        const nextIncompleteStep = updatedSteps.find(step => !step.completed);
        const currentStep = nextIncompleteStep ? nextIncompleteStep.id : status.totalSteps;
        const allCompleted = updatedSteps.every(step => step.completed);
        
        set({ 
          status: {
            ...status,
            steps: updatedSteps,
            currentStep,
            completed: allCompleted
          },
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      });
    }
  },

  // Set store profile
  setStoreProfile: (profile: StoreProfile) => {
    set({ storeProfile: profile });
  },

  // Set payment setup
  setPaymentSetup: (payment: PaymentSetup) => {
    set({ paymentSetup: payment });
  },

  // Set shipping options
  setShippingOptions: (options: ShippingOption[]) => {
    set({ shippingOptions: options });
  },

  // Set product data
  setProductData: (product: ProductData) => {
    set({ productData: product });
  },

  // Complete onboarding
  completeOnboarding: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': 'demo-user-123' // Mock user ID
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }
      
      const { status } = get();
      if (status) {
        set({ 
          status: { ...status, completed: true },
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      });
    }
  },

  // Skip onboarding
  skipOnboarding: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/onboarding/skip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': 'demo-user-123' // Mock user ID
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to skip onboarding');
      }
      
      const { status } = get();
      if (status) {
        set({ 
          status: { ...status, completed: true },
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      });
    }
  },

  // Reset onboarding
  resetOnboarding: () => {
    set({
      status: null,
      storeProfile: null,
      paymentSetup: null,
      shippingOptions: [],
      productData: null,
      isLoading: false,
      error: null
    });
  }
}));