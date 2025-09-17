'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useOnboardingStore } from '@/stores/onboarding';

interface PaymentSetupStepProps {
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

const paymentProviders = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Accept all major credit cards, Apple Pay, Google Pay',
    features: ['2.9% + 30¢ per transaction', 'Instant transfers', 'Built-in fraud protection'],
    logo: '💳',
    recommended: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Let customers pay with PayPal accounts or cards',
    features: ['2.9% + 30¢ per transaction', 'PayPal buyer protection', 'Global reach'],
    logo: '🅿️',
    recommended: false
  },
  {
    id: 'both',
    name: 'Both Stripe & PayPal',
    description: 'Maximize conversions by offering multiple options',
    features: ['Highest conversion rates', 'More customer choice', 'Best for growth'],
    logo: '🔄',
    recommended: false
  }
];

export default function PaymentSetupStep({ onDataChange, onNext, onPrevious, isLoading }: PaymentSetupStepProps) {
  const { paymentSetup, setPaymentSetup } = useOnboardingStore();
  
  const [selectedProvider, setSelectedProvider] = useState<string>(paymentSetup?.paymentProvider || '');
  const [accountConnected, setAccountConnected] = useState(false);

  useEffect(() => {
    if (selectedProvider) {
      const data = { paymentProvider: selectedProvider };
      setPaymentSetup(data);
      onDataChange(data);
    } else {
      onDataChange(null);
    }
  }, [selectedProvider, setPaymentSetup, onDataChange]);

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setAccountConnected(false);
  };

  const handleConnectAccount = () => {
    // Mock account connection
    setAccountConnected(true);
    
    // In a real app, this would redirect to the payment provider's OAuth flow
    console.log(`Connecting to ${selectedProvider} account...`);
    
    // Simulate connection delay
    setTimeout(() => {
      const data = { 
        paymentProvider: selectedProvider,
        connected: true,
        accountId: `${selectedProvider}_account_123`
      };
      setPaymentSetup(data);
      onDataChange(data);
    }, 1000);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure payment methods</h2>
        <p className="text-gray-600">Choose how you want to accept payments from customers</p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {paymentProviders.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
              selectedProvider === provider.id
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleProviderSelect(provider.id)}
          >
            {provider.recommended && (
              <div className="absolute -top-3 left-6">
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Recommended
                </span>
              </div>
            )}

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl border">
                  {provider.logo}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                  {selectedProvider === provider.id && (
                    <CheckCircle className="w-5 h-5 text-pink-600" />
                  )}
                </div>
                <p className="text-gray-600 mb-3">{provider.description}</p>
                
                <div className="space-y-1">
                  {provider.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                  selectedProvider === provider.id
                    ? 'border-pink-500 bg-pink-500'
                    : 'border-gray-300'
                }`}>
                  {selectedProvider === provider.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProvider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mt-8"
        >
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Connect your {paymentProviders.find(p => p.id === selectedProvider)?.name} account
            </h3>

            {!accountConnected ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Secure connection</h4>
                      <p className="text-sm text-blue-800">
                        We'll redirect you to {paymentProviders.find(p => p.id === selectedProvider)?.name} to securely 
                        connect your account. Your payment information is never stored on our servers.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConnectAccount}
                  className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all"
                >
                  Connect {paymentProviders.find(p => p.id === selectedProvider)?.name} Account
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By connecting your account, you agree to the payment provider's terms of service
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Account connected successfully!</h4>
                  <p className="text-gray-600">
                    Your {paymentProviders.find(p => p.id === selectedProvider)?.name} account is now connected 
                    and ready to accept payments.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    ✅ Ready to accept payments
                    <br />
                    ✅ Secure payment processing enabled
                    <br />
                    ✅ Transaction fees: 2.9% + 30¢ per successful charge
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {selectedProvider && !accountConnected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto mt-6"
        >
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> You can always set up additional payment methods later from your dashboard settings.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}