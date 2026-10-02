import React from 'react';
import { Layers, Scissors, Globe2, Sparkles } from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';

export const BrandStory: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Brand Manifesto */}
        <div className="lg:col-span-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-400 block mb-3">
            The Philosophy of RH Clothing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Architectural Form. <br />
            Everyday Movement.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Founded with the belief that luxury clothing should be unpretentious and built to withstand years of rotation, RH Clothing creates enduring garments with deliberate drape, custom-developed fabric weights, and uncompromising international standards.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            From 480 GSM loopback cotton knitted in heritage mills to shuttle-loom Japanese selvedge denim and Australian Merino brioche knitwear, each piece balances tactile presence with minimalist restraint.
          </p>

          <button
            onClick={() => navigate('/about')}
            className="text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 underline underline-offset-4 transition-colors"
          >
            Read Our Full Craftsmanship Story
          </button>
        </div>

        {/* Right Column: Three Pillars */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors">
            <Layers className="w-6 h-6 text-rose-400 mb-4" />
            <h3 className="font-display text-base font-bold text-white mb-2">Heavyweight Textiles</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom-spun 480 GSM French terry and 280 GSM combed jerseys that retain structure wash after wash.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors">
            <Scissors className="w-6 h-6 text-amber-400 mb-4" />
            <h3 className="font-display text-base font-bold text-white mb-2">Tailored Proportions</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Refined dropped shoulders, fluid knife pleats, and double-breasted closures engineered for everyday comfort.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors">
            <Globe2 className="w-6 h-6 text-emerald-400 mb-4" />
            <h3 className="font-display text-base font-bold text-white mb-2">Global Logistics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct localized fulfillment and seamless customs clearance across the USA, UK, Australia, and Pakistan.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors">
            <Sparkles className="w-6 h-6 text-purple-400 mb-4" />
            <h3 className="font-display text-base font-bold text-white mb-2">Conscious Integrity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              GOTS certified organic cotton, RWS certified Merino wool, and plastic-free compostable mailer packaging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
