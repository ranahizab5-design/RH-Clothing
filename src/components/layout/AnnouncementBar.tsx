import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { config, currency } = useCurrency();
  const [currentIdx, setCurrentIdx] = useState(0);

  const messages = [
    `Complimentary Shipping on all orders over ${config.symbol}${config.freeShippingThreshold.toLocaleString()}`,
    `New Season Capsule: Heavyweight French Terry 480 GSM now live`,
    `Welcome to the RH Circle: Use code WELCOME10 for 10% off`,
    currency === 'PKR' ? `Cash on Delivery (COD) available nationwide in Pakistan` : `Global express delivery via DHL Express & FedEx`,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <aside aria-label="Store announcement" className="bg-[#12141c] border-b border-white/[0.06] text-xs text-slate-300 py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span className="font-medium text-slate-200">International Express</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-3 overflow-hidden text-center">
          <button
            onClick={() => setCurrentIdx((prev) => (prev - 1 + messages.length) % messages.length)}
            className="p-0.5 hover:text-white transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          
          <div className="h-5 flex items-center justify-center font-medium tracking-wide">
            <span className="animate-fade-in line-clamp-1">{messages[currentIdx]}</span>
          </div>

          <button
            onClick={() => setCurrentIdx((prev) => (prev + 1) % messages.length)}
            className="p-0.5 hover:text-white transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-slate-400 text-xs">
          <span>{config.flag} {config.code}</span>
          <span className="text-white/20">|</span>
          <span className="hover:text-white transition-colors cursor-pointer">Track Order</span>
        </div>
      </div>
    </aside>
  );
};
