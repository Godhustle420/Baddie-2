'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, Plus, Trash2, MapPin } from 'lucide-react';
import { useOnboardingStore } from '@/stores/onboarding';
import { ShippingOption } from '@/types/onboarding';

interface ShippingSetupStepProps {
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

const predefinedOptions: Omit<ShippingOption, 'id'>[] = [
  {
    name: 'Standard Shipping',
    price: 5.99,
    estimatedDays: '5-7 business days'
  },
  {
    name: 'Express Shipping',
    price: 12.99,
    estimatedDays: '2-3 business days'
  },
  {
    name: 'Free Shipping',
    price: 0,
    estimatedDays: '7-10 business days'
  }
];

export default function ShippingSetupStep({ onDataChange, onNext, onPrevious, isLoading }: ShippingSetupStepProps) {
  const { shippingOptions, setShippingOptions } = useOnboardingStore();
  
  const [options, setOptions] = useState<ShippingOption[]>(
    shippingOptions.length > 0 
      ? shippingOptions 
      : [{ id: '1', ...predefinedOptions[0] }]
  );
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(50);

  useEffect(() => {
    if (options.length > 0) {
      const data = { 
        shippingOptions: options,
        freeShippingThreshold 
      };
      setShippingOptions(options);
      onDataChange(data);
    } else {
      onDataChange(null);
    }
  }, [options, freeShippingThreshold, setShippingOptions, onDataChange]);

  const addShippingOption = () => {
    const newOption: ShippingOption = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      estimatedDays: ''
    };
    setOptions([...options, newOption]);
  };

  const updateOption = (id: string, field: keyof ShippingOption, value: string | number) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, [field]: value } : option
    ));
  };

  const removeOption = (id: string) => {
    if (options.length > 1) {
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const addPredefinedOption = (predefined: Omit<ShippingOption, 'id'>) => {
    const newOption: ShippingOption = {
      id: Date.now().toString(),
      ...predefined
    };
    setOptions([...options, newOption]);
  };

  const isFormValid = options.every(option => 
    option.name.trim() && 
    option.estimatedDays.trim() && 
    option.price >= 0
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Truck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set up shipping options</h2>
        <p className="text-gray-600">Configure how you'll ship items to your customers</p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Quick Setup */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="font-semibold text-blue-900 mb-3">Quick Setup</h3>
          <p className="text-sm text-blue-800 mb-4">
            Add common shipping options to get started quickly:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {predefinedOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => addPredefinedOption(option)}
                className="text-left p-3 bg-white border border-blue-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="font-medium text-gray-900">{option.name}</div>
                <div className="text-sm text-gray-600">${option.price}</div>
                <div className="text-xs text-gray-500">{option.estimatedDays}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Shipping Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Shipping Options</h3>
            <button
              onClick={addShippingOption}
              className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add Option</span>
            </button>
          </div>

          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Method
                  </label>
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) => updateOption(option.id, 'name', e.target.value)}
                    placeholder="e.g., Standard Shipping"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={option.price}
                    onChange={(e) => updateOption(option.id, 'price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Delivery
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option.estimatedDays}
                      onChange={(e) => updateOption(option.id, 'estimatedDays', e.target.value)}
                      placeholder="e.g., 5-7 business days"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                    {options.length > 1 && (
                      <button
                        onClick={() => removeOption(option.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Free Shipping Threshold */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6"
        >
          <h3 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Free Shipping Threshold</span>
          </h3>
          <p className="text-sm text-green-800 mb-4">
            Offer free shipping for orders above a certain amount to increase average order value.
          </p>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-green-900">
              Free shipping on orders over:
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-green-900">$</span>
              <input
                type="number"
                min="0"
                step="1"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(parseInt(e.target.value) || 0)}
                className="w-20 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <h3 className="font-medium text-gray-900 mb-4">Customer Preview</h3>
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-medium text-gray-900 mb-3">Shipping Options</h4>
            <div className="space-y-2">
              {options.filter(opt => opt.name && opt.estimatedDays).map((option) => (
                <div key={option.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{option.name}</div>
                    <div className="text-sm text-gray-600">{option.estimatedDays}</div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                  </div>
                </div>
              ))}
            </div>
            {freeShippingThreshold > 0 && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  🎉 Free shipping on orders over ${freeShippingThreshold}!
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {!isFormValid && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              Please fill in all shipping option details to continue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}