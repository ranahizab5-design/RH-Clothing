import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import { CATEGORIES_DATA } from '../../data/products';

export const FeaturedCategories: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-400 block mb-2">
            Curated Form &amp; Function
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Categories
          </h2>
        </div>
        <button
          onClick={() => navigate('/shop')}
          className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors self-start sm:self-auto group"
        >
          <span>View All 8 Categories</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Grid of 4 Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(cat.link)}
            className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-end p-6"
          >
            {/* Background image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/60 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />

            {/* Content overlay */}
            <div className="relative z-10">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-rose-400 mb-1 block">
                {cat.itemCount}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-rose-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                {cat.tagline}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                <span>Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
