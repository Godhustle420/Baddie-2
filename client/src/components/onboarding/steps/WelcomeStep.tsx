'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Store, CreditCard, Truck, Package, CheckCircle } from 'lucide-react';

interface WelcomeStepProps {
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

const features = [
  {
    icon: Store,
    title: 'Beautiful Store Design',
    description: 'Create a stunning online store with our modern, responsive themes'
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Accept payments through Stripe, PayPal, and more with top-notch security'
  },
  {
    icon: Truck,
    title: 'Smart Shipping',
    description: 'Automated shipping calculations and label printing for all major carriers'
  },
  {
    icon: Package,
    title: 'Easy Product Management',
    description: 'Add, edit, and organize your thrift finds with our intuitive tools'
  }
];

export default function WelcomeStep({ onDataChange, onNext, onPrevious, isLoading }: WelcomeStepProps) {
  useEffect(() => {
    // Auto-set data for welcome step
    onDataChange({ welcomed: true });
  }, [onDataChange]);

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-gray-900 mb-4"
      >
        Welcome to Baddie Thrift Store! 🎉
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
      >
        We're excited to help you create an amazing online thrift store. This setup wizard will guide you through everything you need to start selling in just a few minutes.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 text-left"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <Icon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
      >
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <h4 className="font-medium text-blue-900 mb-1">What you'll set up:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your store profile and branding</li>
              <li>• Payment methods (Stripe, PayPal)</li>
              <li>• Shipping options and rates</li>
              <li>• Your first product listing</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-gray-500 text-sm"
      >
        This should take about 5-10 minutes. Ready to get started?
      </motion.p>
    </div>
  );
}