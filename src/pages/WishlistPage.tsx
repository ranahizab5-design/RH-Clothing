import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNavigation } from '../hooks/useNavigation';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, removeFromWishlist, moveToCart } = useWishlist();
  const { formatPrice } = useCurrency();
  const { navigate } = useNavigation();

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-6 text-slate-400">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
          Your Wishlist is Empty
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Save your favorite garments, tailored silhouettes, and essentials here to revisit or move to your shopping bag anytime.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-semibold text-xs uppercase tracking-widest rounded-lg shadow-xl shadow-rose-950/40"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.08] mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Saved Wardrobe
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            <strong className="text-white tabular-nums">{savedProducts.length}</strong> items in your personal wishlist
          </p>
        </div>
        <button
          onClick={() => navigate('/shop')}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Continue browsing
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {savedProducts.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 overflow-hidden flex flex-col justify-between transition-all"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-900 cursor-pointer" onClick={() => navigate(`/product/${product.slug}`)}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-rose-400 transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400">
                  {product.category}
                </span>
                <h3
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="font-semibold text-sm text-white hover:text-rose-400 cursor-pointer truncate mt-1"
                >
                  {product.name}
                </h3>
                <p className="text-xs font-bold text-white tabular-nums mt-1">
                  {formatPrice(product.salePrice ?? product.price)}
                </p>
              </div>

              <button
                onClick={() => moveToCart(product)}
                className="w-full py-2.5 bg-white/10 hover:bg-white text-white hover:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
