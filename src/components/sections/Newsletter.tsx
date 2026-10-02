import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { applyCoupon } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      applyCoupon('WELCOME10');
    }
  };

  return (
    <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#161822] via-[#12131b] to-[#0c0d12] border border-white/10 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Community Access</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Stay in the RH Circle
          </h2>

          <p className="text-sm text-slate-300 mb-8 leading-relaxed">
            Subscribe for private seasonal drop alerts, lookbook previews, and receive{' '}
            <strong className="text-white">10% off your first purchase</strong> with code WELCOME10.
          </p>

          {isSubmitted ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm flex items-center justify-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Welcome to the circle! Your 10% discount code <strong>WELCOME10</strong> has been applied to your bag.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border border-white/15 focus:border-rose-500/60 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:opacity-95 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shrink-0"
              >
                <span>Join &amp; Save 10%</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-400 mt-4">
            Zero spam. Unsubscribe at any time with one click.
          </p>
        </div>
      </div>
    </section>
  );
};
