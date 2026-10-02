import React from 'react';
import { useNavigation, Link } from '../../hooks/useNavigation';
import { useCurrency } from '../../context/CurrencyContext';
import { Globe, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { COUNTRY_NAMES } from '../../data/currencies';
import { CountryCode } from '../../types';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const { country, setCountry, currency } = useCurrency();

  return (
    <footer className="bg-[#090a0e] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-white mb-4 block"
            >
              RH CLOTHING
            </Link>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              International modern essentials, tailored streetwear, and elevated everyday apparel designed for confidence. Seamless fulfillment across USA, UK, Australia, and Pakistan.
            </p>

            {/* Country Selector in Footer */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl max-w-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-rose-400" />
                <span>Delivery Country &amp; Currency</span>
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(COUNTRY_NAMES) as CountryCode[]).map((cCode) => {
                  const item = COUNTRY_NAMES[cCode];
                  const active = country === cCode;
                  return (
                    <button
                      key={cCode}
                      onClick={() => setCountry(cCode)}
                      className={`px-2.5 py-1.5 rounded text-left flex items-center gap-2 border transition-colors ${
                        active
                          ? 'border-rose-500/50 bg-rose-500/10 text-white font-medium'
                          : 'border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span>{item.flag}</span>
                      <span className="truncate">{item.currency}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/shop/men" className="hover:text-white transition-colors">
                  Men&apos;s Essentials
                </Link>
              </li>
              <li>
                <Link href="/shop/women" className="hover:text-white transition-colors">
                  Women&apos;s Collection
                </Link>
              </li>
              <li>
                <Link href="/shop/new" className="hover:text-white transition-colors">
                  New Season Drops
                </Link>
              </li>
              <li>
                <Link href="/shop/bestsellers" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop/sale" className="text-rose-400 hover:text-rose-300 transition-colors font-medium">
                  Sale (Up to 40% Off)
                </Link>
              </li>
              <li>
                <Link href="/shop/accessories" className="hover:text-white transition-colors">
                  Minimal Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns &amp; Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand & Legal Column */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-4">
              Brand &amp; Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About RH Clothing
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accepted Payment Methods */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-[11px]">
            &copy; {new Date().getFullYear()} RH Clothing Inc. All rights reserved. Designed for international fashion-conscious shoppers.
          </p>

          <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
            <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08]">VISA</span>
            <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08]">Mastercard</span>
            <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08]">AMEX</span>
            <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08]">Apple Pay</span>
            <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08]">Google Pay</span>
            {currency === 'PKR' && (
              <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                Cash on Delivery (COD)
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
