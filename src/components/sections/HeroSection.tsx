import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import heroImg from '../../assets/images/hero_fashion_banner_1790883630025.jpg';

export const HeroSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0f14]">
      {/* Background Image with Layered Gradient Scrim */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] w-full flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="RH Clothing Autumn Winter Campaign"
            className="w-full h-full object-cover object-center filter brightness-[0.78]"
          />
          {/* Subtle directional gradients for readability and sophisticated depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f14]/90 via-[#0d0f14]/40 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            {/* Quiet Lead-in Kicker (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-4">
              <span>Capsule Collection 2026</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Worldwide Drop</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-6">
              STYLE THAT <br />
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                MOVES WITH YOU.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-8">
              Discover modern essentials and architectural silhouettes crafted with heavyweight 480 GSM French Terry, pure Australian Merino, and structured Italian tailoring.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/shop/new')}
                className="px-8 py-4 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:opacity-95 text-white font-semibold text-xs uppercase tracking-widest rounded-lg shadow-xl shadow-rose-950/40 flex items-center gap-3 transition-all hover:scale-[1.02]"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs uppercase tracking-widest rounded-lg backdrop-blur-md transition-all hover:border-white/40"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Marker Bar */}
      <div className="border-y border-white/[0.06] bg-white/[0.015] py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <p className="font-semibold text-slate-200">Express Delivery</p>
              <p className="text-[11px] text-slate-400">USA, UK, AU &amp; Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <p className="font-semibold text-slate-200">30-Day Easy Returns</p>
              <p className="text-[11px] text-slate-400">Doorstep exchange service</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <p className="font-semibold text-slate-200">Certified Craftsmanship</p>
              <p className="text-[11px] text-slate-400">Heavyweight sustainable yarns</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-base">🇵🇰</span>
            <div>
              <p className="font-semibold text-slate-200">Cash on Delivery</p>
              <p className="text-[11px] text-slate-400">Available in Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
