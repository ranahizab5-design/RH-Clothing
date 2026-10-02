import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-20 bg-white/[0.015] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-bold text-slate-200 ml-2">4.9 / 5.0 Rating</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Voices from the RH Circle
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real feedback from verified shoppers across USA, United Kingdom, Australia, and Pakistan.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#11131a] border border-white/[0.06] hover:border-white/15 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{rev.author}</span>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{rev.location}</p>
                <p className="text-[11px] text-rose-400 font-medium truncate mt-1">
                  {rev.productName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
