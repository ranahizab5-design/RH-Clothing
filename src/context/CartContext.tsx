import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Product, ProductSize, ProductColor } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, selectedSize: ProductSize, selectedColor: ProductColor, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  couponCode: string;
  discountPercent: number;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  itemCount: number;
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
  lastAddedItem: CartItem | null;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_COUPONS: Record<string, number> = {
  WELCOME10: 10, // 10% off
  RH40: 40, // 40% off campaign
  VIP20: 20, // 20% off
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rh_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>(() => {
    try {
      return localStorage.getItem('rh_coupon') || '';
    } catch {
      return '';
    }
  });
  const [couponError, setCouponError] = useState<string | null>(null);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('rh_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('rh_coupon', couponCode);
    } catch {
      // ignore
    }
  }, [couponCode]);

  const discountPercent = couponCode && VALID_COUPONS[couponCode.toUpperCase()] ? VALID_COUPONS[couponCode.toUpperCase()] : 0;

  const addItem = (
    product: Product,
    selectedSize: ProductSize,
    selectedColor: ProductColor,
    quantity = 1
  ) => {
    const itemKey = `${product.id}-${selectedSize}-${selectedColor.name}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: itemKey,
          productId: product.id,
          product,
          selectedSize,
          selectedColor,
          quantity,
        };
        return [...prevItems, newItem];
      }
    });

    const newItemPayload: CartItem = {
      id: itemKey,
      productId: product.id,
      product,
      selectedSize,
      selectedColor,
      quantity,
    };
    setLastAddedItem(newItemPayload);
    setShowToast(true);

    // Auto dismiss toast after 3s
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (VALID_COUPONS[clean]) {
      setCouponCode(clean);
      setCouponError(null);
      return true;
    } else {
      setCouponError('Invalid promo code. Try "WELCOME10" or "RH40".');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponError(null);
  };

  const itemCount = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [items]);

  const subtotalUSD = useMemo(() => {
    return items.reduce((acc, curr) => {
      const unitPrice = curr.product.salePrice ?? curr.product.price;
      return acc + unitPrice * curr.quantity;
    }, 0);
  }, [items]);

  const discountUSD = useMemo(() => {
    if (!discountPercent) return 0;
    return (subtotalUSD * discountPercent) / 100;
  }, [subtotalUSD, discountPercent]);

  const totalUSD = useMemo(() => {
    return Math.max(0, subtotalUSD - discountUSD);
  }, [subtotalUSD, discountUSD]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        discountPercent,
        couponError,
        applyCoupon,
        removeCoupon,
        itemCount,
        subtotalUSD,
        discountUSD,
        totalUSD,
        lastAddedItem,
        showToast,
        setShowToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
