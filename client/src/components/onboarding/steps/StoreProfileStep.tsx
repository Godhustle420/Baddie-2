'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Store, Upload, Palette } from 'lucide-react';
import { useOnboardingStore } from '@/stores/onboarding';

interface StoreProfileStepProps {
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export default function StoreProfileStep({ onDataChange, onNext, onPrevious, isLoading }: StoreProfileStepProps) {
  const { storeProfile, setStoreProfile } = useOnboardingStore();
  
  const [formData, setFormData] = useState({
    storeName: storeProfile?.storeName || '',
    description: storeProfile?.description || '',
    logo: storeProfile?.logo || '',
    banner: storeProfile?.banner || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.storeName.trim()) {
      newErrors.storeName = 'Store name is required';
    } else if (formData.storeName.length < 2) {
      newErrors.storeName = 'Store name must be at least 2 characters';
    } else if (formData.storeName.length > 50) {
      newErrors.storeName = 'Store name must be less than 50 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Store description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (isValid) {
      const data = { ...formData };
      setStoreProfile(data);
      onDataChange(data);
    } else {
      onDataChange(null);
    }

    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (field: 'logo' | 'banner') => {
    // Mock image upload - in real app, this would upload to a service
    const mockImageUrl = `https://via.placeholder.com/${field === 'logo' ? '200x200' : '800x300'}/FF69B4/FFFFFF?text=${field === 'logo' ? 'Logo' : 'Banner'}`;
    handleInputChange(field, mockImageUrl);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set up your store profile</h2>
        <p className="text-gray-600">Tell customers about your thrift store and make a great first impression</p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Store Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Store Name *
          </label>
          <input
            type="text"
            value={formData.storeName}
            onChange={(e) => handleInputChange('storeName', e.target.value)}
            placeholder="e.g., Baddie's Vintage Finds"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${
              errors.storeName ? 'border-red-300' : 'border-gray-300'
            }`}
            maxLength={50}
          />
          {errors.storeName && (
            <p className="mt-1 text-sm text-red-600">{errors.storeName}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">{formData.storeName.length}/50 characters</p>
        </motion.div>

        {/* Store Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Store Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your store, the types of items you sell, your style, and what makes your thrift finds special..."
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            maxLength={500}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">{formData.description.length}/500 characters</p>
        </motion.div>

        {/* Logo Upload */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Store Logo (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-300 transition-colors">
            {formData.logo ? (
              <div className="space-y-4">
                <img
                  src={formData.logo}
                  alt="Store logo"
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
                <button
                  type="button"
                  onClick={() => handleInputChange('logo', '')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Remove logo
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                <div>
                  <button
                    type="button"
                    onClick={() => handleImageUpload('logo')}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Upload logo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB. Square images work best.</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Banner Upload */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Store Banner (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-300 transition-colors">
            {formData.banner ? (
              <div className="space-y-4">
                <img
                  src={formData.banner}
                  alt="Store banner"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleInputChange('banner', '')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Remove banner
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Palette className="w-8 h-8 text-gray-400 mx-auto" />
                <div>
                  <button
                    type="button"
                    onClick={() => handleImageUpload('banner')}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Upload banner
                  </button>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB. Recommended size: 1200x300px</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <h3 className="font-medium text-gray-900 mb-4">Preview</h3>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            {formData.banner && (
              <img
                src={formData.banner}
                alt="Banner preview"
                className="w-full h-24 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start space-x-4">
                {formData.logo && (
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {formData.storeName || 'Your Store Name'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.description || 'Your store description will appear here...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}