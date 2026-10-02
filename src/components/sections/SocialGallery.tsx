import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import heroImg from '../../assets/images/hero_fashion_banner_1790883630025.jpg';
import menImg from '../../assets/images/category_men_collection_1790883643682.jpg';
import womenImg from '../../assets/images/category_women_collection_1790883657406.jpg';
import accessoriesImg from '../../assets/images/category_accessories_1790883668455.jpg';
import promoImg from '../../assets/images/promo_banner_fashion_1790883679304.jpg';

export const SocialGallery: React.FC = () => {
  const posts = [
    { id: 1, image: menImg, handle: '@rhclothing', caption: 'Heavyweight loopback Terry in motion. Melbourne, AU.' },
    { id: 2, image: womenImg, handle: '@rhclothing', caption: 'Double-breasted trench layered over fine knit. London, UK.' },
    { id: 3, image: accessoriesImg, handle: '@rhclothing', caption: 'Minimalist full-grain leather architecture.' },
    { id: 4, image: heroImg, handle: '@rhclothing', caption: 'The Autumn / Winter 2026 campaign drop.' },
    { id: 5, image: promoImg, handle: '@rhclothing', caption: 'Brutalist lines meet tailored streetwear.' },
  ];

  return (
    <section className="py-20 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-400 block mb-2">
            Community &amp; Lookbook
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Styled by You #RHClothing
          </h2>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Instagram className="w-4 h-4 text-rose-400" />
          <span>Follow @rhclothing</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer"
          >
            <img
              src={post.image}
              alt="Social lookbook post"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <Instagram className="w-5 h-5 text-white mb-2" />
              <p className="text-[11px] font-semibold text-rose-300">{post.handle}</p>
              <p className="text-[11px] text-white line-clamp-2 mt-0.5 leading-snug">
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
