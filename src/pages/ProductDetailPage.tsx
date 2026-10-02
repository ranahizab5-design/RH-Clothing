import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  Ruler,
  ChevronRight,
  Check,
  Plus,
  Minus,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductSize, ProductColor } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigation } from '../hooks/useNavigation';
import { ProductCard } from '../components/product/ProductCard';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { formatPrice, config, currency } = useCurrency();
  const { addItem, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { navigate } = useNavigation();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(product.sizes[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'fit' | 'shipping'>('details');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-white transition-colors">
          Home
        </button>
        <span aria-hidden="true">/</span>
        <button
          onClick={() => navigate(`/shop/${product.gender.toLowerCase()}`)}
          className="hover:text-white transition-colors"
        >
          {product.category}
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-white truncate">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20 items-start">
        {/* Left: Gallery (6 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#12141a] border border-white/10 group">
            <img
              src={product.images[selectedImgIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-white/10 backdrop-blur-md text-white border border-white/20">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIdx(idx)}
                className={`relative w-20 h-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImgIdx === idx
                    ? 'border-rose-500 scale-105'
                    : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Purchase Module (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                {product.category} · {product.subcategory}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full border transition-colors ${
                  isFavorited
                    ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                    : 'border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-white tabular-nums">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} verified reviews)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6 flex items-baseline justify-between tabular-nums">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {formatPrice(product.salePrice ?? product.price)}
                </span>
                {product.salePrice && (
                  <span className="text-sm sm:text-base text-slate-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              {discountPercent && (
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Color: <strong className="text-white">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-transform ${
                        isSelected
                          ? 'border-white scale-110 shadow-lg shadow-white/10'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 drop-shadow" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Select Size
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-bold rounded-lg border transition-all ${
                        isSelected
                          ? 'border-white bg-white text-slate-950 shadow-md font-extrabold'
                          : 'border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/[0.02]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {!selectedSize && (
                <p className="text-[11px] text-amber-400 mt-1.5">
                  Please select a size before adding to bag.
                </p>
              )}
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-3 mb-8">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/10 rounded-xl bg-white/[0.03] px-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-slate-400 hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    !selectedSize
                      ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                      : addedSuccess
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40'
                      : 'bg-white text-slate-950 hover:bg-slate-100 shadow-xl shadow-black/40 hover:scale-[1.01]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Buy Now CTA */}
              <button
                onClick={handleBuyNow}
                disabled={!selectedSize}
                className="w-full py-4 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:opacity-95 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Buy Now with Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="border-t border-white/[0.08] pt-6 space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  Free shipping on orders over {config.symbol}
                  {config.freeShippingThreshold.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-rose-400 shrink-0" />
                <span>30-Day Hassle-Free Returns &amp; Exchanges</span>
              </div>
              {currency === 'PKR' && (
                <div className="flex items-center gap-2.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Cash on Delivery (COD) available for this item</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Details, Materials, Fit, Shipping */}
      <div className="border-t border-white/[0.08] pt-12 mb-20">
        <div className="flex gap-6 border-b border-white/[0.08] pb-4 overflow-x-auto">
          {[
            { id: 'details', label: 'Product Details' },
            { id: 'materials', label: 'Materials & Craft' },
            { id: 'fit', label: 'Fit & Measurements' },
            { id: 'shipping', label: 'Delivery & Returns' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-rose-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li>Artisan silhouette with reinforced internal stitching</li>
                <li>Designed for fluid everyday layering</li>
                <li>Pre-shrunk fabric ensures consistent fit after washing</li>
                <li>Finished with custom matte hardware</li>
              </ul>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4">
              <div>
                <strong className="text-white block mb-1">Fabric Composition:</strong>
                <p className="text-slate-400">{product.material}</p>
              </div>
              <div>
                <strong className="text-white block mb-1">Care Instructions:</strong>
                <p className="text-slate-400">{product.careInstructions}</p>
              </div>
            </div>
          )}

          {activeTab === 'fit' && (
            <div className="space-y-4">
              <div>
                <strong className="text-white block mb-1">Sizing Recommendation:</strong>
                <p className="text-slate-400">{product.fit}</p>
              </div>
              <p className="text-slate-400">
                Male model is 6&apos;1&quot; (185cm) wearing size Large. Female model is 5&apos;9&quot; (175cm) wearing size Small.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <p className="text-slate-400">
                Dispatched within 24 hours from regional fulfillment hubs. Standard shipping delivers in 3–5 business days, Express in 1–3 business days.
              </p>
              <p className="text-slate-400">
                Complimentary 30-day returns on unworn items with original garment tags intact.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t border-white/[0.08] pt-14">
        <h2 className="font-display text-2xl font-bold text-white mb-8">
          Complete Your Ensemble
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Size guide"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-[#12141c] border border-white/10 rounded-2xl max-w-lg w-full p-6 text-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="font-display text-lg font-bold text-white">Garment Size Guide (Inches)</h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-left tabular-nums">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest</th>
                    <th className="py-2">Waist</th>
                    <th className="py-2">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  <tr>
                    <td className="py-2 font-bold text-white">XS</td>
                    <td>34 - 36&quot;</td>
                    <td>28 - 30&quot;</td>
                    <td>26.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-white">S</td>
                    <td>36 - 38&quot;</td>
                    <td>30 - 32&quot;</td>
                    <td>27.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-white">M</td>
                    <td>38 - 40&quot;</td>
                    <td>32 - 34&quot;</td>
                    <td>28.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-white">L</td>
                    <td>40 - 42&quot;</td>
                    <td>34 - 36&quot;</td>
                    <td>29.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-white">XL</td>
                    <td>42 - 45&quot;</td>
                    <td>36 - 39&quot;</td>
                    <td>30.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-white">XXL</td>
                    <td>45 - 48&quot;</td>
                    <td>39 - 42&quot;</td>
                    <td>31.5&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Measurements are in inches. If you fall between sizes, we recommend sizing up for an oversized drape, or sizing down for a closer tailoring fit.
            </p>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Sticky Mobile Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0e1017]/95 backdrop-blur-md border-t border-white/10 p-3 z-30 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-400 block">Total</span>
          <span className="text-sm font-bold text-white tabular-nums">
            {formatPrice(product.salePrice ?? product.price)}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
