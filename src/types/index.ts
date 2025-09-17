export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  isOnSale: boolean;
  salePercentage?: number;
  saleEndDate?: string;
  condition: 'excellent' | 'good' | 'fair';
  size?: string;
  brand?: string;
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  slug: string;
}

export interface SaleDay {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
  categories: string[];
  isActive: boolean;
}