import React, { useState, useMemo, useEffect } from 'react';
import { Filter, X, SlidersHorizontal, ArrowUpDown, RotateCcw, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { useCurrency } from '../context/CurrencyContext';
import { ProductCategory, ProductSubcategory, ProductSize } from '../types';

interface ShopPageProps {
  initialCategory?: ProductCategory | 'all' | 'new' | 'bestsellers' | 'sale';
  initialSearch?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCategory = 'all', initialSearch = '' }) => {
  const { formatPrice, config } = useCurrency();

  // Filters state
  const [selectedGender, setSelectedGender] = useState<string>(() => {
    if (initialCategory === 'Men' || initialCategory === 'Women' || initialCategory === 'Accessories') {
      return initialCategory;
    }
    return 'all';
  });

  const [selectedSubcategories, setSelectedSubcategories] = useState<ProductSubcategory[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [maxPriceUSD, setMaxPriceUSD] = useState<number>(300);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlySale, setOnlySale] = useState<boolean>(initialCategory === 'sale');
  const [onlyNew, setOnlyNew] = useState<boolean>(initialCategory === 'new');
  const [onlyBestSeller, setOnlyBestSeller] = useState<boolean>(initialCategory === 'bestsellers');
  const [searchFilter, setSearchFilter] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync props if changed
  useEffect(() => {
    if (initialCategory === 'Men' || initialCategory === 'Women' || initialCategory === 'Accessories') {
      setSelectedGender(initialCategory);
    } else if (initialCategory === 'sale') {
      setOnlySale(true);
    } else if (initialCategory === 'new') {
      setOnlyNew(true);
    } else if (initialCategory === 'bestsellers') {
      setOnlyBestSeller(true);
    }
  }, [initialCategory]);

  useEffect(() => {
    setSearchFilter(initialSearch);
  }, [initialSearch]);

  const allSubcategories: ProductSubcategory[] = [
    'Hoodies',
    'Jackets',
    'T-Shirts',
    'Shirts',
    'Jeans',
    'Trousers',
    'Dresses',
    'Knitwear',
    'Accessories',
  ];

  const allSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const allColors = [
    { label: 'All Colors', value: 'all', hex: 'transparent' },
    { label: 'Black / Onyx', value: 'black', hex: '#16171b' },
    { label: 'Cloud / White', value: 'white', hex: '#f0ede6' },
    { label: 'Sand / Taupe', value: 'sand', hex: '#c5bbae' },
    { label: 'Indigo / Navy', value: 'navy', hex: '#1c283d' },
    { label: 'Olive / Green', value: 'olive', hex: '#2b332b' },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchSub = product.subcategory.toLowerCase().includes(q);
        const matchMat = product.material.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchSub && !matchMat) return false;
      }

      // Gender / Category
      if (selectedGender !== 'all') {
        if (selectedGender === 'Accessories') {
          if (product.category !== 'Accessories') return false;
        } else {
          if (product.gender !== selectedGender && product.gender !== 'Unisex') return false;
        }
      }

      // Subcategories
      if (selectedSubcategories.length > 0) {
        if (!selectedSubcategories.includes(product.subcategory)) return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = selectedSizes.some((s) => product.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Color
      if (selectedColor !== 'all') {
        const matchesColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor)
        );
        if (!matchesColor) return false;
      }

      // Max Price
      const effectivePrice = product.salePrice ?? product.price;
      if (effectivePrice > maxPriceUSD) return false;

      // Min Rating
      if (minRating > 0 && product.rating < minRating) return false;

      // Flags
      if (onlySale && !product.salePrice && !product.onSale) return false;
      if (onlyNew && !product.newArrival) return false;
      if (onlyBestSeller && !product.bestSeller) return false;

      return true;
    });
  }, [
    searchFilter,
    selectedGender,
    selectedSubcategories,
    selectedSizes,
    selectedColor,
    maxPriceUSD,
    minRating,
    onlySale,
    onlyNew,
    onlyBestSeller,
  ]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
      case 'price-low':
        return list.sort(
          (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
        );
      case 'price-high':
        return list.sort(
          (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
        );
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const toggleSubcategory = (sub: ProductSubcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedGender('all');
    setSelectedSubcategories([]);
    setSelectedSizes([]);
    setSelectedColor('all');
    setMaxPriceUSD(300);
    setMinRating(0);
    setOnlySale(false);
    setOnlyNew(false);
    setOnlyBestSeller(false);
    setSearchFilter('');
    setSortBy('featured');
  };

  const activeFilterCount =
    (selectedGender !== 'all' ? 1 : 0) +
    selectedSubcategories.length +
    selectedSizes.length +
    (selectedColor !== 'all' ? 1 : 0) +
    (maxPriceUSD < 300 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlySale ? 1 : 0) +
    (onlyNew ? 1 : 0) +
    (onlyBestSeller ? 1 : 0) +
    (searchFilter ? 1 : 0);

  // Render Filter Sidebar / Drawer Content
  const renderFilterControls = () => (
    <div className="space-y-7">
      {/* Category / Gender */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
          Gender &amp; Category
        </h4>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'Men', label: "Men's Apparel" },
            { id: 'Women', label: "Women's Apparel" },
            { id: 'Accessories', label: 'Accessories' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedGender(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                selectedGender === cat.id
                  ? 'bg-rose-500/20 text-rose-300 font-semibold'
                  : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              {selectedGender === cat.id && <Check className="w-3.5 h-3.5 text-rose-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Product Type / Subcategory */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
          Garment Type
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {allSubcategories.map((sub) => {
            const isChecked = selectedSubcategories.includes(sub);
            return (
              <button
                key={sub}
                onClick={() => toggleSubcategory(sub)}
                className={`px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors truncate border ${
                  isChecked
                    ? 'border-rose-500/50 bg-rose-500/10 text-white font-semibold'
                    : 'border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-white/15'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map((s) => {
            const isChecked = selectedSizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={`w-9 h-9 rounded-lg text-xs font-semibold border flex items-center justify-center transition-colors ${
                  isChecked
                    ? 'border-white bg-white text-slate-950 font-bold'
                    : 'border-white/10 text-slate-300 hover:border-white/30'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
            Max Price
          </h4>
          <span className="text-xs font-bold text-white tabular-nums">
            {formatPrice(maxPriceUSD)}
          </span>
        </div>
        <input
          type="range"
          min="40"
          max="300"
          step="5"
          value={maxPriceUSD}
          onChange={(e) => setMaxPriceUSD(Number(e.target.value))}
          className="w-full accent-rose-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 tabular-nums">
          <span>{formatPrice(40)}</span>
          <span>{formatPrice(300)}</span>
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
          Palette
        </h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => {
            const isSelected = selectedColor === color.value;
            return (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${
                  isSelected
                    ? 'border-rose-500/60 bg-rose-500/10 text-white font-medium'
                    : 'border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                {color.hex !== 'transparent' && (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                    style={{ backgroundColor: color.hex }}
                  />
                )}
                <span>{color.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Checkbox Badges */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
          Highlights
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={onlySale}
              onChange={(e) => setOnlySale(e.target.checked)}
              className="accent-rose-500 rounded"
            />
            <span className="text-rose-400 font-semibold">On Sale (Up to 40% Off)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={onlyNew}
              onChange={(e) => setOnlyNew(e.target.checked)}
              className="accent-rose-500 rounded"
            />
            <span>New Season Arrivals</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={onlyBestSeller}
              onChange={(e) => setOnlyBestSeller(e.target.checked)}
              className="accent-rose-500 rounded"
            />
            <span>Best Sellers</span>
          </label>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
          Customer Rating
        </h4>
        <div className="flex gap-2">
          {[
            { val: 0, label: 'All' },
            { val: 4.5, label: '4.5+ ★' },
            { val: 4.8, label: '4.8+ ★' },
          ].map((r) => (
            <button
              key={r.val}
              onClick={() => setMinRating(r.val)}
              className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                minRating === r.val
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold'
                  : 'border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear All */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Top Header Bar */}
      <div className="mb-8 pb-6 border-b border-white/[0.08]">
        {/* Unboxed breadcrumbs metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span>Home</span>
          <span aria-hidden="true">/</span>
          <span>Catalog</span>
          {initialCategory !== 'all' && (
            <>
              <span aria-hidden="true">/</span>
              <span className="text-white capitalize">{initialCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {initialCategory === 'Men'
                ? "Men's Modern Essentials"
                : initialCategory === 'Women'
                ? "Women's Collection"
                : initialCategory === 'sale'
                ? 'Season Archive & Sale'
                : initialCategory === 'new'
                ? 'New Season Arrivals'
                : initialCategory === 'bestsellers'
                ? 'Community Best Sellers'
                : 'All Apparel & Essentials'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing <strong className="text-white tabular-nums">{sortedProducts.length}</strong> styles
              {searchFilter && (
                <span> for &ldquo;{searchFilter}&rdquo;</span>
              )}
            </p>
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Mobile Filter Sheet Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-semibold text-slate-200"
            >
              <SlidersHorizontal className="w-4 h-4 text-rose-400" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sortSelect" className="text-slate-400 font-medium">
                Sort:
              </label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white font-medium outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#12141c] text-white">
                  Featured
                </option>
                <option value="newest" className="bg-[#12141c] text-white">
                  Newest Additions
                </option>
                <option value="price-low" className="bg-[#12141c] text-white">
                  Price: Low to High
                </option>
                <option value="price-high" className="bg-[#12141c] text-white">
                  Price: High to Low
                </option>
                <option value="rating" className="bg-[#12141c] text-white">
                  Highest Rated
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/[0.04]">
            <span className="text-xs text-slate-400">Active filters:</span>
            {selectedGender !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 text-xs text-white">
                {selectedGender}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedGender('all')} />
              </span>
            )}
            {selectedSubcategories.map((sub) => (
              <span
                key={sub}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 text-xs text-white"
              >
                {sub}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleSubcategory(sub)} />
              </span>
            ))}
            {selectedSizes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 text-xs text-white"
              >
                Size {s}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleSize(s)} />
              </span>
            ))}
            {onlySale && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/20 text-xs text-rose-300">
                On Sale
                <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlySale(false)} />
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-400 hover:text-rose-300 underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Layout: Desktop Sidebar (Left) + Product Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
            <span className="font-semibold text-xs uppercase tracking-wider text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-rose-400" />
              <span>Refine Catalog</span>
            </span>
            {activeFilterCount > 0 && (
              <span className="text-[11px] text-slate-400 font-bold tabular-nums">
                ({activeFilterCount} active)
              </span>
            )}
          </div>
          {renderFilterControls()}
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-2xl bg-white/[0.015] border border-white/[0.06]">
              <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                No styles match your filters
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
                Try widening your price range, clearing selected sizes, or removing specific garment types.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-lg"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter catalog"
          className="fixed inset-0 z-50 flex justify-end"
        >
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#10121a] border-l border-white/10 h-full p-6 overflow-y-auto flex flex-col z-10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="font-semibold text-sm text-white">Filter Products</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{renderFilterControls()}</div>
            <div className="pt-4 border-t border-white/10 mt-6">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg"
              >
                Apply Filters ({sortedProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
