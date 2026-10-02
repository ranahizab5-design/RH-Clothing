import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductSize } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNavigation } from '../../hooks/useNavigation';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice } = useCurrency();
  const { addItem, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { navigate } = useNavigation();

  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImg = product.images[0];
  const secondaryImg = product.images[1] || product.images[0];

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleQuickAdd = (e: React.MouseEvent, size: ProductSize) => {
    e.stopPropagation();
    addItem(product, size, product.colors[0], 1);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setShowQuickAdd(false);
    }, 1200);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
      onClick={handleCardClick}
      className="group relative flex flex-col cursor-pointer transition-all duration-300 rounded-xl bg-white/[0.015] border border-white/[0.06] hover:border-white/20 hover:shadow-xl hover:shadow-black/40 overflow-hidden"
    >
      {/* Visual Canvas Slot */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#12141a]">
        {/* Primary Image */}
        <img
          src={isHovered ? secondaryImg : primaryImg}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
        />

        {/* Top Badges / Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div>
            {product.badge && (
              <span
                className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md pointer-events-auto shadow-sm ${
                  product.badge === 'Sale'
                    ? 'bg-rose-500 text-white'
                    : product.badge === 'New Arrival'
                    ? 'bg-amber-500/90 text-slate-950 font-bold'
                    : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          <button
            onClick={handleWishlistToggle}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`p-2 rounded-full backdrop-blur-md pointer-events-auto transition-all ${
              isFavorited
                ? 'bg-rose-500 text-white shadow-md shadow-rose-900/40'
                : 'bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Add Bar Overlay */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent transition-all duration-200 z-10 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          {showQuickAdd ? (
            <div className="bg-[#181a22] border border-white/20 rounded-lg p-2.5 shadow-xl animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                  Select Size
                </span>
                <span className="text-[10px] text-slate-400">Quick Add</span>
              </div>
              <div className="flex gap-1.5 justify-center">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => handleQuickAdd(e, s)}
                    className="w-8 h-8 rounded text-xs font-semibold bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (product.sizes.length === 1) {
                  handleQuickAdd(e, product.sizes[0]);
                } else {
                  setShowQuickAdd(true);
                }
              }}
              className="w-full py-2.5 bg-white/95 hover:bg-white text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.subcategory}</span>
            {discountPercent && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-rose-400 font-semibold">Save {discountPercent}%</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Color Dots */}
          <div className="flex items-center gap-1.5 mb-3">
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="w-3 h-3 rounded-full border border-white/20 inline-block transition-transform group-hover:scale-110"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <span className="text-[11px] text-slate-400 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        </div>

        {/* Price & Rating Row */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-sm sm:text-base font-bold text-white">
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-200 tabular-nums">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
