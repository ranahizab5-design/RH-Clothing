import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCurrency } from '../../context/CurrencyContext';
import { useNavigation } from '../../hooks/useNavigation';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { formatPrice } = useCurrency();
  const { navigate } = useNavigation();
  const inputRef = useRef<HTMLInputElement>(null);

  const TRENDING_SEARCHES = [
    'Heavyweight Hoodie',
    'Trench Coat',
    'Pleated Trousers',
    'Merino Wool',
    'Selvedge Denim',
    'Mulberry Silk',
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (slug: string) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search catalog"
      className="fixed inset-0 z-50 flex flex-col bg-[#0d0f14]/95 backdrop-blur-xl animate-fade-in text-slate-100"
    >
      {/* Top Bar with Search Input */}
      <div className="border-b border-white/10 px-4 sm:px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Search className="w-6 h-6 text-slate-400 shrink-0" />
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, styles, fabrics (e.g., French Terry, Trench, Trousers)..."
              className="w-full bg-transparent text-lg sm:text-2xl font-medium placeholder:text-slate-500 text-white outline-none focus:ring-0"
            />
          </form>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Clear input"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white border border-white/10 rounded-md hover:border-white/20 transition-colors"
          >
            <span>ESC</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results / Suggestions Container */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {!query.trim() ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {TRENDING_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 text-sm text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <span>{term}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Curated Suggestions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.slug)}
                    className="group cursor-pointer bg-white/[0.02] border border-white/[0.06] hover:border-white/20 rounded-xl p-3 flex gap-3 items-center transition-all hover:translate-y-[-2px]"
                  >
                    <div className="w-14 h-18 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-rose-400 font-medium">{p.category}</p>
                      <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                      <p className="text-xs text-slate-400 tabular-nums mt-0.5">
                        {formatPrice(p.salePrice ?? p.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {filteredProducts.length} Results for &ldquo;{query}&rdquo;
                </p>
                <button
                  onClick={() => {
                    navigate(`/shop?search=${encodeURIComponent(query)}`);
                    onClose();
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium transition-colors"
                >
                  <span>View in full catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => {
                  const effectivePrice = product.salePrice ?? product.price;
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="group cursor-pointer bg-white/[0.03] border border-white/[0.06] hover:border-white/20 rounded-xl overflow-hidden p-3 flex gap-3 items-center transition-all hover:translate-y-[-2px]"
                    >
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                          {product.category} · {product.subcategory}
                        </span>
                        <h4 className="text-sm font-semibold text-white truncate mt-0.5">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 tabular-nums">
                          <span className="text-xs font-bold text-white">
                            {formatPrice(effectivePrice)}
                          </span>
                          {product.salePrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                      <CornerDownLeft className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No matching products found</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try checking the spelling or browse our popular categories.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    navigate('/shop');
                    onClose();
                  }}
                  className="px-5 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Explore All Styles
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
