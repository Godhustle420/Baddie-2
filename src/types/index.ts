// Core application types for the thrift store

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider?: 'facebook' | 'tiktok' | 'google' | 'email';
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    shareActivity: boolean;
    showPurchases: boolean;
  };
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  size?: string;
  condition: 'like-new' | 'good' | 'fair' | 'needs-tlc';
  tags: string[];
  stock: number;
  sellerId: string;
  seller: User;
  featured: boolean;
  views: number;
  likes: number;
  sharesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple-pay' | 'google-pay';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

export interface Wishlist {
  id: string;
  userId: string;
  productIds: string[];
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSale {
  id: string;
  title: string;
  description: string;
  productIds: string[];
  products: Product[];
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  maxQuantity?: number;
  soldQuantity: number;
}

export interface Bundle {
  id: string;
  title: string;
  description: string;
  productIds: string[];
  products: Product[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  isActive: boolean;
  maxQuantity?: number;
  soldQuantity: number;
}

export interface ReferralCode {
  id: string;
  code: string;
  userId: string;
  user: User;
  discountPercentage: number;
  maxUses: number;
  currentUses: number;
  expiresAt?: Date;
  isActive: boolean;
  earnings: number;
}

export interface SocialShare {
  id: string;
  userId: string;
  productId: string;
  platform: 'facebook' | 'tiktok' | 'instagram' | 'twitter';
  shareType: 'story' | 'reel' | 'post';
  engagements: number;
  clicks: number;
  conversions: number;
  createdAt: Date;
}

export interface LiveShoppingEvent {
  id: string;
  title: string;
  description: string;
  hostId: string;
  host: User;
  productIds: string[];
  products: Product[];
  scheduledAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  status: 'scheduled' | 'live' | 'ended';
  viewers: number;
  maxViewers: number;
  streamUrl?: string;
  chatEnabled: boolean;
}

export interface Review {
  id: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  rating: number;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'flash-sale' | 'wishlist' | 'social' | 'general';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: Product[];
  topCategories: { name: string; sales: number }[];
  socialShares: { platform: string; count: number }[];
  trafficSources: { source: string; visitors: number }[];
}

export interface SearchFilters {
  query?: string;
  category?: string;
  priceRange?: { min: number; max: number };
  condition?: string[];
  size?: string[];
  brand?: string[];
  color?: string[];
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'newest' | 'popular';
}