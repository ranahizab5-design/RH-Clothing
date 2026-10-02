import React, { useState } from 'react';
import { User, Package, MapPin, Award, LogOut, ChevronRight, Truck, Clock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNavigation } from '../hooks/useNavigation';

export const AccountDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const { formatPrice } = useCurrency();
  const { navigate } = useNavigation();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses'>('overview');

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center px-4">
        <h2 className="text-xl font-bold text-white mb-2">Please Sign In</h2>
        <p className="text-slate-400 text-sm mb-6">
          Access your RH Circle membership, saved addresses, and order history.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Top Banner Profile Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171924] via-[#12141c] to-[#0d0f14] border border-white/10 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                {user.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {user.tier}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-auto">
          <div className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">RH Rewards</span>
            <span className="text-base font-bold text-white tabular-nums">{user.points} pts</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-4 mb-8 overflow-x-auto text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2 border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-rose-500 text-white'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Account Overview
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-rose-500 text-white'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Order History ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-2 border-b-2 transition-colors ${
            activeTab === 'addresses'
              ? 'border-rose-500 text-white'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Delivery Addresses
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders Box */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-base font-bold text-white">Recent Orders</h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-rose-400 hover:text-rose-300 underline"
              >
                View all orders
              </button>
            </div>

            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/order-confirmation/${order.id}`)}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer flex flex-col sm:flex-row justify-between sm:items-center gap-4"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono font-bold text-white text-xs">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Placed on {order.date} · {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                  <p className="text-[11px] text-rose-400 mt-1">
                    Tracking: {order.trackingNumber}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="font-bold text-white text-sm tabular-nums">
                    {formatPrice(order.totalUSD)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Membership Tier Perks */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Award className="w-5 h-5" />
              <h3 className="font-display text-base font-bold text-white">RH Circle Benefits</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              As a Gold member, you enjoy priority fulfillment, complimentary international express upgrades on orders over $150, and 24-hour advance access to seasonal archive drops.
            </p>

            <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-white/[0.06]">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Free 30-day home pickup returns</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Double loyalty points on outerwear</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Dedicated concierge WhatsApp support</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white text-sm">
                    {order.orderNumber}
                  </span>
                  <span className="text-xs text-slate-400">Placed on {order.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="font-bold text-white text-sm tabular-nums">
                    {formatPrice(order.totalUSD)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-lg bg-slate-900 border border-white/10 shrink-0"
                    />
                    <div className="min-w-0 text-xs">
                      <p className="font-semibold text-white truncate">{item.product.name}</p>
                      <p className="text-slate-400">
                        Size: {item.selectedSize} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-slate-400">
                  Tracking: <strong className="text-slate-200">{order.trackingNumber}</strong>
                </span>
                <button
                  onClick={() => navigate(`/order-confirmation/${order.id}`)}
                  className="text-rose-400 hover:text-rose-300 font-semibold underline"
                >
                  View Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-rose-500/40 relative">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 absolute top-4 right-4">
              Default Address
            </span>
            <div className="flex items-center gap-2 text-white font-semibold mb-3">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Primary Residence</span>
            </div>
            <p className="text-xs text-white font-semibold">Alex Morgan</p>
            <p className="text-xs text-slate-300">742 Evergreen Terrace, Apt 4B</p>
            <p className="text-xs text-slate-300">Springfield, OR 97477</p>
            <p className="text-xs text-slate-400 mt-1">United States · +1 (555) 349-8201</p>
          </div>
        </div>
      )}
    </div>
  );
};
