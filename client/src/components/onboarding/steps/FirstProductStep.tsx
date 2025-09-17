'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Upload, Tag, DollarSign, FileText } from 'lucide-react';
import { useOnboardingStore } from '@/stores/onboarding';

interface FirstProductStepProps {
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

const categories = [
  'Clothing',
  'Accessories',
  'Shoes',
  'Bags & Purses',
  'Jewelry',
  'Home Decor',
  'Books',
  'Electronics',
  'Vintage Items',
  'Designer Items'
];

export default function FirstProductStep({ onDataChange, onNext, onPrevious, isLoading }: FirstProductStepProps) {
  const { productData, setProductData } = useOnboardingStore();
  
  const [formData, setFormData] = useState({
    productTitle: productData?.productTitle || '',
    description: productData?.description || '',
    price: productData?.price || 0,
    category: productData?.category || '',
    images: productData?.images || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productTitle.trim()) {
      newErrors.productTitle = 'Product title is required';
    } else if (formData.productTitle.length < 3) {
      newErrors.productTitle = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (isValid) {
      setProductData(formData);
      onDataChange(formData);
    } else {
      onDataChange(null);
    }

    return isValid;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = () => {
    // Mock image upload
    const mockImages = [
      'https://via.placeholder.com/400x400/FF69B4/FFFFFF?text=Product+1',
      'https://via.placeholder.com/400x400/9966CC/FFFFFF?text=Product+2'
    ];
    handleInputChange('images', mockImages);
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    handleInputChange('images', newImages);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add your first product</h2>
        <p className="text-gray-600">Let's get your store started with your first amazing thrift find</p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Product Images *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            
            {formData.images.length < 4 && (
              <button
                onClick={handleImageUpload}
                className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-pink-300 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Photo</span>
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Add up to 4 photos. First photo will be your main image.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Product Title *
            </label>
            <input
              type="text"
              value={formData.productTitle}
              onChange={(e) => handleInputChange('productTitle', e.target.value)}
              placeholder="e.g., Vintage 90s Denim Jacket"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${
                errors.productTitle ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.productTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.productTitle}</p>
            )}
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </motion.div>
        </div>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 inline mr-1" />
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${
              errors.category ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your item's condition, size, brand, style, and any unique features..."
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Include details about size, condition, brand, and styling tips to help customers
          </p>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <h3 className="font-medium text-gray-900 mb-4">Product Preview</h3>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                {formData.images.length > 0 ? (
                  <div className="space-y-2">
                    <img
                      src={formData.images[0]}
                      alt="Main product"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {formData.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {formData.images.slice(1).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Product ${index + 2}`}
                            className="w-full h-16 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {formData.productTitle || 'Your Product Title'}
                  </h4>
                  {formData.category && (
                    <span className="inline-block mt-2 px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
                      {formData.category}
                    </span>
                  )}
                </div>
                
                <div className="text-2xl font-bold text-gray-900">
                  {formData.price > 0 ? `$${formData.price.toFixed(2)}` : '$0.00'}
                </div>
                
                <p className="text-gray-600">
                  {formData.description || 'Your product description will appear here...'}
                </p>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips for Your First Listing</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use natural lighting for photos - avoid flash or harsh shadows</li>
            <li>• Include measurements and detailed condition descriptions</li>
            <li>• Research similar items to price competitively</li>
            <li>• Add styling suggestions to help customers envision wearing the item</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}