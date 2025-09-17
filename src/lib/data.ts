import { Product, Category, SaleDay } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Vintage Pink Blazer',
    description: 'A stunning vintage blazer in soft pink with gold buttons. Perfect for both casual and formal occasions.',
    price: 45,
    originalPrice: 80,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop&flip=h'
    ],
    category: 'blazers',
    isOnSale: true,
    salePercentage: 44,
    saleEndDate: '2024-12-31',
    condition: 'excellent',
    size: 'M',
    brand: 'Vintage Collection',
    tags: ['vintage', 'blazer', 'pink', 'professional'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Gold Statement Necklace',
    description: 'Eye-catching gold statement necklace that adds glamour to any outfit. Chunky chain design with vintage appeal.',
    price: 25,
    originalPrice: 45,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop&flip=h'
    ],
    category: 'jewelry',
    isOnSale: true,
    salePercentage: 44,
    saleEndDate: '2024-12-31',
    condition: 'good',
    brand: 'Retro Glam',
    tags: ['gold', 'statement', 'necklace', 'jewelry'],
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Boho Maxi Dress',
    description: 'Flowy boho maxi dress in earthy tones with intricate patterns. Perfect for festivals or summer days.',
    price: 35,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop'
    ],
    category: 'dresses',
    isOnSale: false,
    condition: 'excellent',
    size: 'L',
    brand: 'Free Spirit',
    tags: ['boho', 'maxi', 'dress', 'festival'],
    createdAt: '2024-01-25'
  },
  {
    id: '4',
    name: 'Designer Handbag',
    description: 'Luxurious designer handbag in rose gold with pink accents. Genuine leather with gold hardware.',
    price: 120,
    originalPrice: 200,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop'
    ],
    category: 'bags',
    isOnSale: true,
    salePercentage: 40,
    saleEndDate: '2024-12-31',
    condition: 'excellent',
    brand: 'Luxury Labels',
    tags: ['designer', 'handbag', 'leather', 'luxury'],
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    name: 'Vintage Band Tee',
    description: 'Authentic vintage band t-shirt with distressed graphics. Soft cotton blend with a lived-in feel.',
    price: 28,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop'
    ],
    category: 'tops',
    isOnSale: false,
    condition: 'good',
    size: 'S',
    brand: 'Rock Vintage',
    tags: ['vintage', 'band', 'tee', 'graphic'],
    createdAt: '2024-02-05'
  },
  {
    id: '6',
    name: 'Pink Satin Heels',
    description: 'Elegant pink satin heels with gold trim. Perfect for special occasions or date nights.',
    price: 55,
    originalPrice: 90,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop'
    ],
    category: 'shoes',
    isOnSale: true,
    salePercentage: 39,
    saleEndDate: '2024-12-31',
    condition: 'excellent',
    size: '8',
    brand: 'Glamour Steps',
    tags: ['heels', 'satin', 'pink', 'formal'],
    createdAt: '2024-02-10'
  }
];

export const sampleCategories: Category[] = [
  {
    id: 'dresses',
    name: 'Dresses',
    description: 'Beautiful dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=300&fit=crop',
    productCount: 15,
    slug: 'dresses'
  },
  {
    id: 'tops',
    name: 'Tops',
    description: 'Stylish tops and blouses',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    productCount: 23,
    slug: 'tops'
  },
  {
    id: 'blazers',
    name: 'Blazers',
    description: 'Professional and casual blazers',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop',
    productCount: 8,
    slug: 'blazers'
  },
  {
    id: 'bags',
    name: 'Bags',
    description: 'Designer and vintage handbags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    productCount: 12,
    slug: 'bags'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    description: 'Stylish footwear for all occasions',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
    productCount: 18,
    slug: 'shoes'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    description: 'Statement pieces and delicate accessories',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
    productCount: 25,
    slug: 'jewelry'
  }
];

export const sampleSaleDays: SaleDay[] = [
  {
    id: '1',
    title: 'Pink Friday Sale',
    description: 'Everything pink is 40% off this Friday!',
    startDate: '2024-11-29',
    endDate: '2024-11-30',
    discountPercentage: 40,
    categories: ['dresses', 'tops', 'shoes'],
    isActive: true
  },
  {
    id: '2',
    title: 'Golden Weekend',
    description: 'All jewelry and accessories on special discount',
    startDate: '2024-12-07',
    endDate: '2024-12-08',
    discountPercentage: 35,
    categories: ['jewelry', 'bags'],
    isActive: false
  }
];