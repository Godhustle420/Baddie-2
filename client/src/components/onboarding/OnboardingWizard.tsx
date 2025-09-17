'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/stores/onboarding';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Store, 
  CreditCard, 
  Truck, 
  Package,
  Sparkles,
  X,
  HelpCircle
} from 'lucide-react';

import WelcomeStep from './steps/WelcomeStep';
import StoreProfileStep from './steps/StoreProfileStep';
import PaymentSetupStep from './steps/PaymentSetupStep';
import ShippingSetupStep from './steps/ShippingSetupStep';
import FirstProductStep from './steps/FirstProductStep';

interface OnboardingWizardProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

const stepIcons = {
  1: Sparkles,
  2: Store,
  3: CreditCard,
  4: Truck,
  5: Package
};

const stepComponents = {
  1: WelcomeStep,
  2: StoreProfileStep,
  3: PaymentSetupStep,
  4: ShippingSetupStep,
  5: FirstProductStep
};

export default function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const { 
    status, 
    isLoading, 
    error,
    fetchOnboardingStatus,
    updateStep,
    completeOnboarding,
    skipOnboarding
  } = useOnboardingStore();

  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const [currentStepData, setCurrentStepData] = useState<any>(null);

  useEffect(() => {
    fetchOnboardingStatus();
  }, [fetchOnboardingStatus]);

  if (isLoading && !status) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Failed to load onboarding status</p>
          <button 
            onClick={fetchOnboardingStatus}
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentStep = status.steps.find(step => step.id === status.currentStep);
  const CurrentStepComponent = stepComponents[status.currentStep as keyof typeof stepComponents];

  const handleNext = async () => {
    if (currentStep && currentStepData) {
      await updateStep(currentStep.id, true, currentStepData);
      setCurrentStepData(null);
    }
  };

  const handlePrevious = () => {
    if (status.currentStep > 1) {
      const previousStep = status.currentStep - 1;
      updateStep(previousStep, false);
    }
  };

  const handleSkip = async () => {
    await skipOnboarding();
    onSkip?.();
  };

  const handleComplete = async () => {
    await completeOnboarding();
    onComplete?.();
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= status.currentStep) {
      updateStep(stepId, false);
    }
  };

  if (status.completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Baddie Thrift Store! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Your store is all set up and ready to go. Start selling your amazing thrift finds!
          </p>
          <button
            onClick={onComplete}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Store Setup</h1>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Skip Setup</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">
              Step {status.currentStep} of {status.totalSteps}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((status.currentStep / status.totalSteps) * 100)}% Complete
            </span>
          </div>
          
          <div className="flex items-center space-x-2 mb-6">
            {status.steps.map((step, index) => {
              const Icon = stepIcons[step.id as keyof typeof stepIcons];
              const isActive = step.id === status.currentStep;
              const isCompleted = step.completed;
              const isAccessible = step.id <= status.currentStep;

              return (
                <React.Fragment key={step.id}>
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all cursor-pointer",
                      isCompleted
                        ? "bg-green-600 border-green-600 text-white"
                        : isActive
                        ? "bg-pink-600 border-pink-600 text-white"
                        : isAccessible
                        ? "bg-white border-gray-300 text-gray-400 hover:border-pink-300"
                        : "bg-gray-100 border-gray-200 text-gray-300"
                    )}
                    onClick={() => handleStepClick(step.id)}
                    onMouseEnter={() => setShowTooltip(step.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                      {showTooltip === step.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10"
                        >
                          {step.title}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {index < status.steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 transition-colors",
                        step.completed ? "bg-green-600" : "bg-gray-200"
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={status.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {CurrentStepComponent && (
                <CurrentStepComponent
                  onDataChange={setCurrentStepData}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  isLoading={isLoading}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={status.currentStep <= 1}
            className={cn(
              "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all",
              status.currentStep <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            {status.currentStep === status.totalSteps ? (
              <button
                onClick={handleComplete}
                disabled={isLoading || !currentStepData}
                className={cn(
                  "flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all",
                  isLoading || !currentStepData
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700"
                )}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>Complete Setup</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isLoading || !currentStepData}
                className={cn(
                  "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all",
                  isLoading || !currentStepData
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-pink-600 text-white hover:bg-pink-700"
                )}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}