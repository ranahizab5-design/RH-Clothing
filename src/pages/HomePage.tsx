import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedCategories } from '../components/sections/FeaturedCategories';
import { TrendingSection } from '../components/sections/TrendingSection';
import { PromoBanner } from '../components/sections/PromoBanner';
import { BrandStory } from '../components/sections/BrandStory';
import { CustomerReviews } from '../components/sections/CustomerReviews';
import { Newsletter } from '../components/sections/Newsletter';
import { SocialGallery } from '../components/sections/SocialGallery';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <TrendingSection />
      <PromoBanner />
      <BrandStory />
      <CustomerReviews />
      <Newsletter />
      <SocialGallery />
    </main>
  );
};
