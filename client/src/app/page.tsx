'use client';

import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import { useState } from 'react';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // In a real app, redirect to dashboard
    console.log('Onboarding completed! Redirecting to dashboard...');
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    // In a real app, redirect to dashboard
    console.log('Onboarding skipped! Redirecting to dashboard...');
  };

  if (showOnboarding) {
    return (
      <OnboardingWizard
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  // Dashboard view after onboarding
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Welcome to Your Thrift Store Dashboard!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your store is now set up and ready to start selling amazing thrift finds.
          </p>
          <button
            onClick={() => setShowOnboarding(true)}
            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all"
          >
            Restart Onboarding Demo
          </button>
        </div>
      </div>
    </div>
  );
}
