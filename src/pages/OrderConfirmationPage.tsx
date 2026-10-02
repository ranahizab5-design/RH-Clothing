import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, Home, Printer } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNavigation } from '../hooks/useNavigation';

interface OrderConfirmationPageProps {
  orderId?: string;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId }) => {
  const { orders } = useOrders();
  const { formatPrice } = useCurrency();
  const { navigate } = useNavigation();

  const order = (orderId ? orders.find((o) => o.id === orderId) : null) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center px-4">
        <h2 className="text-xl font-bold text-white mb-2">No Recent Order Found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-6 py-2.5 bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Top Banner */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-fade-in">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
          Payment &amp; Order Confirmed
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Thank you for choosing RH Clothing.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          We&apos;ve sent a full confirmation receipt and carrier dispatch link to{' '}
          <strong className="text-white">{order.customer.email}</strong>.
        </p>
      </div>

      {/* Order Status Box */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs tabular-nums pb-6 border-b border-white/[0.06]">
          <div>
            <span className="text-slate-400 block text-[11px]">Order Reference</span>
            <strong className="text-white font-mono text-sm">{order.orderNumber}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Order Date</span>
            <strong className="text-white">{order.date}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Tracking Code</span>
            <strong className="text-rose-400 font-mono text-xs">{order.trackingNumber}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Estimated Delivery</span>
            <strong className="text-emerald-400 font-semibold">{order.estimatedDelivery}</strong>
          </div>
        </div>

        {/* Tracking Milestone Bar */}
        <div className="pt-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Package className="w-3.5 h-3.5" /> Order Placed
            </span>
            <span className="text-rose-400 font-bold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> In Preparation
            </span>
            <span>Dispatched</span>
            <span>Delivered</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-rose-500 w-2/5 rounded-full" />
          </div>
        </div>
      </div>

      {/* Order Receipt Details */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-8">
        <h3 className="font-display text-base font-bold text-white mb-4">
          Order Items ({order.items.length})
        </h3>

        <div className="divide-y divide-white/[0.06]">
          {order.items.map((item) => {
            const unitPrice = item.product.salePrice ?? item.product.price;
            return (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover rounded-lg bg-slate-900 border border-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{item.product.name}</p>
                    <p className="text-[11px] text-slate-400">
                      Size: {item.selectedSize} · Color: {item.selectedColor.name} · Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-white tabular-nums">
                  {formatPrice(unitPrice * item.quantity)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pricing Totals */}
        <div className="border-t border-white/10 pt-4 mt-2 space-y-2 text-xs text-slate-400 tabular-nums">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-slate-200">{formatPrice(order.subtotalUSD)}</span>
          </div>
          {order.discountUSD > 0 && (
            <div className="flex justify-between text-rose-400">
              <span>Promotional Discount</span>
              <span>-{formatPrice(order.discountUSD)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-slate-200">
              {order.shippingFeeUSD === 0 ? (
                <strong className="text-emerald-400">FREE</strong>
              ) : (
                formatPrice(order.shippingFeeUSD)
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/[0.06]">
            <span>Total Paid</span>
            <span>{formatPrice(order.totalUSD)}</span>
          </div>
        </div>
      </div>

      {/* Recipient Address & Payment details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-xs text-slate-400">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Dispatch Address
          </span>
          <p className="font-semibold text-white">{order.customer.fullName}</p>
          <p>{order.customer.address}, {order.customer.apartment}</p>
          <p>{order.customer.city}, {order.customer.state} {order.customer.postalCode}</p>
          <p className="mt-1">{order.customer.phone}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Payment &amp; Delivery Method
          </span>
          <p className="font-semibold text-white capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod === 'card' ? 'Credit Card (Visa ending 4242)' : 'Apple Pay'}</p>
          <p className="capitalize mt-0.5">{order.shippingMethod} Shipping (Standard 3–5 Days)</p>
          <p className="text-emerald-400 font-semibold mt-2">Delivery Guaranteed</p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-2"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Receipt</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/account/orders')}
            className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-white rounded-lg text-xs font-semibold"
          >
            View in Order History
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
