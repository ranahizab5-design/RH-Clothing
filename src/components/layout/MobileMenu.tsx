import React from 'react';
import { X, ChevronRight, User, Heart, HelpCircle, Package, Globe } from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { COUNTRY_NAMES } from '../../data/currencies';
import { CountryCode } from '../../types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { navigate } = useNavigation();
  const { country, setCountry, currency } = useCurrency();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleLink = (path: string) => {
    navigate(path);
    onClose();
  };

  const navLinks = [
    { label: 'Shop All', href: '/shop' },
    { label: "Men's Essentials", href: '/shop/men' },
    { label: "Women's Collection", href: '/shop/women' },
    { label: 'New Arrivals', href: '/shop/new', tag: 'New' },
    { label: 'Best Sellers', href: '/shop/bestsellers' },
    { label: 'Sale — Up to 40% Off', href: '/shop/sale', tag: 'Sale', highlight: true },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#101218] border-r border-white/10 flex flex-col h-full z-10 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <span className="font-display font-bold text-xl tracking-wider text-white">
            RH CLOTHING
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md border border-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="py-6 flex flex-col gap-1 border-b border-white/10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLink(link.href)}
              className={`flex items-center justify-between py-3 px-3 rounded-lg text-left text-base font-medium transition-colors ${
                link.highlight
                  ? 'text-rose-400 hover:bg-rose-500/10'
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>{link.label}</span>
              <div className="flex items-center gap-2">
                {link.tag && (
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      link.highlight
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {link.tag}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </button>
          ))}
        </nav>

        {/* User Account / Wishlist */}
        <div className="py-5 border-b border-white/10 flex flex-col gap-1">
          <button
            onClick={() => handleLink(user ? '/account' : '/login')}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-slate-400" />
              <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => handleLink('/wishlist')}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-slate-400" />
              <span>Saved Items</span>
            </div>
            {wishlistCount > 0 && (
              <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleLink('/account/orders')}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-slate-400" />
              <span>Order Tracking</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* International Country / Currency Selector */}
        <div className="py-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-rose-400" />
            <span>Select Market &amp; Currency</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(COUNTRY_NAMES) as CountryCode[]).map((cCode) => {
              const item = COUNTRY_NAMES[cCode];
              const isSelected = country === cCode;
              return (
                <button
                  key={cCode}
                  onClick={() => setCountry(cCode)}
                  className={`p-2 rounded-lg text-xs font-medium border text-left flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'border-rose-500/50 bg-rose-500/10 text-white'
                      : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  <span className="text-base">{item.flag}</span>
                  <div className="truncate">
                    <p className="font-semibold text-white leading-tight">{item.currency}</p>
                    <p className="text-[10px] text-slate-400 truncate">{item.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <button onClick={() => handleLink('/about')} className="hover:text-white">
            About Us
          </button>
          <span>·</span>
          <button onClick={() => handleLink('/contact')} className="hover:text-white">
            Contact
          </button>
          <span>·</span>
          <button onClick={() => handleLink('/faq')} className="hover:text-white">
            FAQ
          </button>
        </div>
      </div>
    </div>
  );
};
