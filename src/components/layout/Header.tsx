import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, Globe, ChevronDown } from 'lucide-react';
import { useNavigation, Link } from '../../hooks/useNavigation';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { COUNTRY_NAMES } from '../../data/currencies';
import { CountryCode, Currency } from '../../types';
import { SearchOverlay } from '../navigation/SearchOverlay';
import { MobileMenu } from './MobileMenu';
import { AnnouncementBar } from './AnnouncementBar';

export const Header: React.FC = () => {
  const { path, navigate } = useNavigation();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCountry, country } = useCurrency();
  const { user } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Men', href: '/shop/men' },
    { label: 'Women', href: '/shop/women' },
    { label: 'New Arrivals', href: '/shop/new' },
    { label: 'Best Sellers', href: '/shop/bestsellers' },
    { label: 'Sale', href: '/shop/sale', highlight: true },
  ];

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-40 transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-[#0d0f14]/90 backdrop-blur-md border-white/10 shadow-lg shadow-black/20'
            : 'bg-[#0d0f14] border-white/[0.06]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Zone 1: Mobile Hamburger + Brand Wordmark */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link
                href="/"
                className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                RH CLOTHING
              </Link>
            </div>

            {/* Zone 2: Desktop 4–6 Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = path === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      link.highlight
                        ? 'text-rose-400 hover:text-rose-300'
                        : isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Search, Currency Selector, Wishlist, Cart, Account) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Currency Selector (Desktop) */}
              <div className="relative hidden md:block" ref={currencyRef}>
                <button
                  onClick={() => setIsCurrencyDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors"
                  title="Change Currency and Country"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {isCurrencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#161820] border border-white/10 rounded-xl shadow-xl p-2 z-50 animate-fade-in text-xs">
                    <p className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Regional Markets
                    </p>
                    {(Object.keys(COUNTRY_NAMES) as CountryCode[]).map((cCode) => {
                      const item = COUNTRY_NAMES[cCode];
                      const active = country === cCode;
                      return (
                        <button
                          key={cCode}
                          onClick={() => {
                            setCountry(cCode);
                            setIsCurrencyDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                            active
                              ? 'bg-rose-500/20 text-rose-300 font-semibold'
                              : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{item.flag}</span>
                            <span>{item.name}</span>
                          </span>
                          <span className="font-mono text-slate-400">{item.currency}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors"
                aria-label="Search store"
                title="Search (Esc to close)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="p-2 text-slate-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div className="relative hidden sm:block" ref={accountRef}>
                <button
                  onClick={() => setIsAccountDropdownOpen((prev) => !prev)}
                  className="p-2 text-slate-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors"
                  aria-label="User Account"
                >
                  <User className="w-5 h-5" />
                </button>

                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#161820] border border-white/10 rounded-xl shadow-xl p-2 z-50 animate-fade-in text-xs">
                    {user ? (
                      <>
                        <div className="px-3 py-2 border-b border-white/10 mb-1">
                          <p className="font-semibold text-white truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                          <span className="inline-block mt-1 text-[10px] text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded font-medium">
                            {user.tier}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            navigate('/account');
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                        >
                          Account Dashboard
                        </button>
                        <button
                          onClick={() => {
                            navigate('/account/orders');
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                        >
                          Order History &amp; Tracking
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-3 py-2 border-b border-white/10 mb-1">
                          <p className="font-semibold text-white">RH Circle</p>
                          <p className="text-[11px] text-slate-400">Join for exclusive drops &amp; rewards</p>
                        </div>
                        <button
                          onClick={() => {
                            navigate('/login');
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            navigate('/register');
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors font-semibold text-rose-400"
                        >
                          Create Account
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart Drawer Trigger Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-slate-300" />
                <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                  Bag
                </span>
                <span className="w-5 h-5 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
