import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Sparkles } from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import promoImg from '../../assets/images/promo_banner_fashion_1790883679304.jpg';

export const PromoBanner: React.FC = () => {
  const { navigate } = useNavigation();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('RH40');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[380px] sm:min-h-[440px] flex items-center shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={promoImg}
            alt="RH Clothing Mid-Season Campaign"
            className="w-full h-full object-cover object-center filter brightness-[0.7]"
          />
          {/* Subtle multi-layer gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f14] via-[#0d0f14]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14]/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-14 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Global Season Event</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            UP TO 40% OFF <br />
            <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              SELECTED STYLES.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
            Elevate your everyday rotation with archived knitwear, tailored trousers, and outerwear crafted from premium virgin wool and organic loopback cotton.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/shop/sale')}
              className="px-8 py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:opacity-95 text-white font-semibold text-xs uppercase tracking-widest rounded-lg shadow-xl shadow-rose-950/40 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Shop Sale</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Copy Voucher */}
            <button
              onClick={handleCopyCode}
              className="px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-xs font-mono text-slate-200 flex items-center gap-2 transition-colors"
              title="Copy promo code"
            >
              <span>CODE: <strong>RH40</strong></span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
