import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNavigation, Link } from '../hooks/useNavigation';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
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

  const subtotalLocal = subtotalUSD * config.exchangeRate;
  const freeThreshold = config.freeShippingThreshold;
  const remainingLocal = Math.max(0, freeThreshold - subtotalLocal);
  const progressPercent = Math.min(100, (subtotalLocal / freeThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      const success = applyCoupon(inputCoupon);
      if (success) setInputCoupon('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-6 text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven&apos;t added any garments to your bag yet. Explore our latest arrivals or community best sellers.
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.08] mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Shopping Bag
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            <strong className="text-white tabular-nums">{itemCount}</strong> items currently selected
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-rose-400 transition-colors self-start sm:self-auto"
        >
          Clear entire bag
        </button>
      </div>

      {/* Free Shipping Meter */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-8">
        {remainingLocal <= 0 ? (
          <p className="text-xs font-semibold text-emerald-400">
            🎉 You have qualified for Complimentary Express Delivery!
          </p>
        ) : (
          <p className="text-xs text-slate-300">
            Add{' '}
            <strong className="text-white tabular-nums">
              {config.symbol}
              {Math.round(remainingLocal).toLocaleString()}
            </strong>{' '}
            more to unlock <span className="font-semibold text-rose-400">Complimentary Shipping</span>
          </p>
        )}
        <div className="w-full h-1.5 bg-white/10 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Grid: Cart Items (Left 8) + Summary (Right 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const unitPrice = item.product.salePrice ?? item.product.price;
            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Thumb + Title */}
                <div className="flex gap-4 items-center min-w-0">
                  <div
                    onClick={() => navigate(`/product/${item.product.slug}`)}
                    className="w-20 h-24 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0 cursor-pointer"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-400">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => navigate(`/product/${item.product.slug}`)}
                      className="font-semibold text-sm sm:text-base text-white hover:text-rose-400 cursor-pointer truncate transition-colors"
                    >
                      {item.product.name}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <strong className="text-white">{item.selectedColor.name}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 tabular-nums mt-1 sm:hidden">
                      {formatPrice(unitPrice)} each
                    </p>
                  </div>
                </div>

                {/* Quantity + Price + Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                  {/* Stepper */}
                  <div className="flex items-center border border-white/10 rounded-lg bg-white/[0.03]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-slate-400 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-slate-400 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right tabular-nums min-w-[80px]">
                    <span className="text-sm sm:text-base font-bold text-white">
                      {formatPrice(unitPrice * item.quantity)}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-4">
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] sticky top-24">
          <h2 className="font-display text-lg font-bold text-white mb-4">
            Order Summary
          </h2>

          {/* Coupon */}
          <div className="mb-6">
            {couponCode ? (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-rose-300 font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo <strong>{couponCode}</strong> applied ({discountPercent}% off)</span>
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
                  placeholder="Promo Code (WELCOME10)"
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-white uppercase tracking-wider outline-none focus:border-rose-500/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 rounded-lg text-xs font-semibold text-white"
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
          <div className="space-y-3 text-xs text-slate-400 mb-6 pb-6 border-b border-white/[0.08] tabular-nums">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="text-slate-200 font-medium">{formatPrice(subtotalUSD)}</span>
            </div>

            {discountUSD > 0 && (
              <div className="flex justify-between text-rose-400 font-semibold">
                <span>Discount ({couponCode})</span>
                <span>-{formatPrice(discountUSD)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Standard Shipping</span>
              <span className="text-slate-200 font-medium">
                {remainingLocal <= 0 ? (
                  <span className="text-emerald-400 font-bold">FREE</span>
                ) : (
                  formatPrice(config.standardShippingFee / config.exchangeRate)
                )}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/[0.06]">
              <span>Estimated Total</span>
              <span>{formatPrice(totalUSD)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-rose-950/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted checkout via international payment gateways</span>
          </div>
        </div>
      </div>
    </div>
  );
};
