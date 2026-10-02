import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useNavigation } from '../../hooks/useNavigation';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    subtotalUSD,
    discountUSD,
    totalUSD,
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    couponError,
    itemCount,
  } = useCart();
  const { config, formatPrice } = useCurrency();
  const { navigate } = useNavigation();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  // Free shipping calculation in local currency
  const subtotalLocal = subtotalUSD * config.exchangeRate;
  const freeThreshold = config.freeShippingThreshold;
  const remainingLocal = Math.max(0, freeThreshold - subtotalLocal);
  const progressPercent = Math.min(100, (subtotalLocal / freeThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      const ok = applyCoupon(inputCoupon);
      if (ok) setInputCoupon('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
      className="fixed inset-0 z-50 flex justify-end animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#0e1017] border-l border-white/10 flex flex-col h-full z-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-rose-400" />
            <span className="font-display font-bold text-lg text-white">Your Shopping Bag</span>
            <span className="text-xs text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded-full font-semibold">
              {itemCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-md border border-white/10 hover:border-white/20 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-6 py-3.5 bg-white/[0.02] border-b border-white/[0.06]">
          {remainingLocal <= 0 ? (
            <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <span>🎉 You unlocked Complimentary Express Shipping!</span>
            </p>
          ) : (
            <p className="text-xs text-slate-300">
              Add{' '}
              <span className="font-bold text-white tabular-nums">
                {config.symbol}
                {Math.round(remainingLocal).toLocaleString()}
              </span>{' '}
              more to qualify for <span className="font-semibold text-rose-400">Free Delivery</span>
            </p>
          )}
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/[0.06]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 text-slate-400">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Your bag is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mb-6">
                Explore our new season essentials and tailored garments.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:opacity-95 text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-all"
              >
                Shop New Arrivals
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = item.product.salePrice ?? item.product.price;
              return (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate(`/product/${item.product.slug}`);
                    }}
                    className="w-20 h-24 rounded-lg overflow-hidden bg-slate-900 border border-white/10 shrink-0 cursor-pointer group"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate(`/product/${item.product.slug}`);
                          }}
                          className="text-sm font-semibold text-white hover:text-rose-400 transition-colors cursor-pointer truncate"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>Size: <strong className="text-slate-200">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <strong className="text-slate-200">{item.selectedColor.name}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/10 rounded-md bg-white/[0.03]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-right tabular-nums">
                        <span className="text-sm font-bold text-white">
                          {formatPrice(unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 bg-[#0b0c10]/80">
            {/* Promo Code Form */}
            <div className="mb-4">
              {couponCode ? (
                <div className="flex items-center justify-between p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs">
                  <div className="flex items-center gap-2 text-rose-300 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{couponCode}</strong> applied ({discountPercent}% off)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-white underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Promo code (e.g. WELCOME10)"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500 uppercase tracking-wider outline-none focus:border-rose-500/50"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 rounded-lg text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>
              )}
            </div>

            {/* Price lines */}
            <div className="space-y-1.5 text-xs text-slate-400 mb-4 tabular-nums">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-200">{formatPrice(subtotalUSD)}</span>
              </div>
              {discountUSD > 0 && (
                <div className="flex justify-between text-rose-400">
                  <span>Discount ({couponCode})</span>
                  <span>-{formatPrice(discountUSD)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-slate-200">
                  {remainingLocal <= 0 ? 'Complimentary' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Estimated Total</span>
                <span>{formatPrice(totalUSD)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:opacity-95 text-white font-semibold text-xs tracking-widest uppercase rounded-lg shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="hover:text-white transition-colors underline"
                >
                  View Full Bag
                </button>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
