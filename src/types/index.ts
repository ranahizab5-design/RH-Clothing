export type Currency = 'USD' | 'GBP' | 'AUD' | 'PKR';
export type CountryCode = 'US' | 'GB' | 'AU' | 'PK';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  flag: string;
  exchangeRate: number; // relative to USD base = 1.0
  freeShippingThreshold: number; // in target currency
  standardShippingFee: number;
  expressShippingFee: number;
  taxRate: number; // e.g. 0.08 for 8%
  allowCOD: boolean;
}

export type ProductCategory = 'Men' | 'Women' | 'Unisex' | 'Accessories';

export type ProductSubcategory =
  | 'T-Shirts'
  | 'Shirts'
  | 'Hoodies'
  | 'Jackets'
  | 'Jeans'
  | 'Trousers'
  | 'Dresses'
  | 'Knitwear'
  | 'Accessories';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  gender: 'Men' | 'Women' | 'Unisex';
  price: number; // Base USD price
  salePrice?: number; // Base USD sale price if discounted
  currency: 'USD';
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: 'New Arrival' | 'Sale' | 'Limited Edition' | 'Best Seller';
  material: string;
  careInstructions: string;
  fit: string;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  onSale?: boolean;
}

export interface CartItem {
  id: string; // unique item key: `${productId}-${size}-${color}`
  productId: string;
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  country: CountryCode;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
}

export type ShippingMethod = 'standard' | 'express';
export type PaymentMethod = 'card' | 'applepay' | 'cod';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotalUSD: number;
  shippingFeeUSD: number;
  discountUSD: number;
  taxUSD: number;
  totalUSD: number;
  currency: Currency;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Confirmed';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserReview {
  id: string;
  productId?: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  defaultAddress?: Partial<CustomerDetails>;
  tier: 'RH Circle Silver' | 'RH Circle Gold' | 'RH Circle Platinum';
  points: number;
}
