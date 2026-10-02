import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem, CustomerDetails, ShippingMethod, PaymentMethod, Currency } from '../types';
import { PRODUCTS } from '../data/products';

interface CreateOrderInput {
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
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (data: CreateOrderInput) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_10842',
    orderNumber: 'RH-84920',
    date: '2026-09-28',
    customer: {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 349-8201',
      country: 'US',
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
    },
    items: [
      {
        id: 'prod-01-L-Washed Onyx',
        productId: 'prod-01',
        product: PRODUCTS[0],
        selectedSize: 'L',
        selectedColor: { name: 'Washed Onyx', hex: '#1c1e24' },
        quantity: 1,
      },
      {
        id: 'prod-08-L-Pure Onyx',
        productId: 'prod-08',
        product: PRODUCTS[7],
        selectedSize: 'L',
        selectedColor: { name: 'Pure Onyx', hex: '#15161b' },
        quantity: 2,
      },
    ],
    subtotalUSD: 168,
    shippingFeeUSD: 0,
    discountUSD: 16.8,
    taxUSD: 10.58,
    totalUSD: 161.78,
    currency: 'USD',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    status: 'Delivered',
    trackingNumber: '1Z9999999999999999',
    estimatedDelivery: '2026-10-02',
  },
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('rh_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('rh_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const placeOrder = (data: CreateOrderInput): Order => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `RH-${randomDigits}`;
    const orderId = `ord_${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Delivery estimate: 3 days for express, 5 days for standard
    const deliveryDays = data.shippingMethod === 'express' ? 3 : 5;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + deliveryDays);
    const estimatedDelivery = estDate.toISOString().split('T')[0];

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      date: today,
      customer: data.customer,
      items: data.items,
      subtotalUSD: data.subtotalUSD,
      shippingFeeUSD: data.shippingFeeUSD,
      discountUSD: data.discountUSD,
      taxUSD: data.taxUSD,
      totalUSD: data.totalUSD,
      currency: data.currency,
      shippingMethod: data.shippingMethod,
      paymentMethod: data.paymentMethod,
      status: 'Confirmed',
      trackingNumber: `RH-TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id: string) => orders.find((o) => o.id === id);
  const getOrderByNumber = (num: string) => orders.find((o) => o.orderNumber.toUpperCase() === num.toUpperCase());

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById, getOrderByNumber }}>
      {children}
    </OrderContext.Provider>
  );
};

export function useOrders(): OrderContextType {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
