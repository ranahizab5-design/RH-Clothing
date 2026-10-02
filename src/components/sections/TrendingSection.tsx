import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { useNavigation } from '../../hooks/useNavigation';

export const TrendingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'Men' | 'Women' | 'Outerwear'>('all');
  const { navigate } = useNavigation();

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'Men') return p.gender === 'Men';
    if (activeTab === 'Women') return p.gender === 'Women';
    if (activeTab === 'Outerwear') return p.subcategory === 'Jackets' || p.subcategory === 'Hoodies';
    return true;
  }).slice(0, 8);

  return (
    <section className="py-16 lg:py-20 bg-white/[0.015] border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Functional Segmented Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-400 block mb-2">
              Trending Wardrobe
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Most Wanted Essentials
            </h2>
          </div>

          {/* Interactive filter tabs (functional buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Highlights' },
              { id: 'Men', label: "Men's" },
              { id: 'Women', label: "Women's" },
              { id: 'Outerwear', label: 'Outerwear' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
          >
            <span>Explore All 24+ Items</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
