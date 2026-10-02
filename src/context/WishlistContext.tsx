import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductSize, ProductColor } from '../types';
import { useCart } from './CartContext';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product, size?: ProductSize, color?: ProductColor) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rh_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['prod-01', 'prod-07']; // seed with 2 nice items for rich demo
  });

  const { addItem, setIsCartOpen } = useCart();

  useEffect(() => {
    try {
      localStorage.setItem('rh_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const moveToCart = (product: Product, size?: ProductSize, color?: ProductColor) => {
    const defaultSize = size || product.sizes[0] || 'M';
    const defaultColor = color || product.colors[0];
    addItem(product, defaultSize, defaultColor, 1);
    removeFromWishlist(product.id);
    setIsCartOpen(true);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveToCart,
        wishlistCount: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
