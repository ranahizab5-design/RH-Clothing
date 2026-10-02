# RH Clothing — Production E-Commerce Platform

A modern, high-converting international fashion e-commerce storefront for **RH Clothing**.

Designed for fashion-conscious shoppers across **USA**, **United Kingdom**, **Australia**, and **Pakistan**.

---

## 🌟 Key Features

### 1. Internationalization & Currency Engine
- **Supported Currencies**: `USD` ($), `GBP` (£), `AUD` (A$), `PKR` (Rs.).
- **Localized Thresholds**: Free shipping rules adapted per country ($75 USD, £60 GBP, A$110 AUD, Rs. 18,000 PKR).
- **Payment Methods**: Card simulator (Visa, Mastercard, AMEX), Apple/Google Pay, and **Cash on Delivery (COD)** for Pakistan.

### 2. High-Converting Storefront
- **Top Announcement Bar**: Rotating campaign announcements with currency-aware free delivery progress.
- **Hero Section**: High-fashion campaign banner with clean typography and direct collection CTAs.
- **Featured Categories**: Men's Essentials, Women's Collection, New Season Capsule, and Minimal Accessories.
- **Trending Products**: Tabbed filter showcase with live ratings, wishlist toggles, and instant quick-add drawer.
- **Promotional Gradient Banner**: "Up to 40% Off Selected Styles" with 1-click coupon code copy (`RH40`).
- **Brand Story & Pillars**: Focus on 480 GSM French Terry, Australian Merino, and ethical global logistics.
- **Verified Customer Reviews**: Real international feedback with star ratings and purchase markers.
- **VIP Newsletter**: 1-click welcome discount coupon (`WELCOME10`) applied automatically to bag.
- **Community Lookbook**: Instagram/social gallery styled with `#RHClothing`.

### 3. Product Discovery & Catalog (Shop)
- **Multi-Filter Sidebar (Desktop) & Bottom Sheet (Mobile)**:
  - Gender & Category (`Men`, `Women`, `Unisex`, `Accessories`)
  - Garment Type (`Hoodies`, `Jackets`, `T-Shirts`, `Shirts`, `Jeans`, `Trousers`, `Dresses`, `Knitwear`, `Accessories`)
  - Sizes (`XS`, `S`, `M`, `L`, `XL`, `XXL`)
  - Colors with visual swatches
  - Max price slider
  - Minimum rating filter
  - Quick badges (`On Sale`, `New Arrivals`, `Best Sellers`)
- **Live Sorting**: Featured, Newest, Price: Low to High, Price: High to Low, Highest Rated.
- **Active Filter Chips**: Individual dismissal and 1-click reset.

### 4. Interactive Search
- Instant modal overlay (`Esc` to close).
- Live query matching across garment name, category, fabric, and material.
- Popular search shortcuts and curated recommendations.

### 5. Product Detail Page (PDP)
- Multi-angle gallery with thumbnail switching.
- Variant selectors for Color and Size with validation before bag addition.
- Interactive Size Guide modal with imperial and metric measurements.
- Quantity stepper, Add to Bag feedback, and Buy Now express flow.
- Detailed accordions for Fabric Composition, Care Instructions, Fit Advice, and Delivery Guarantees.
- Related products recommendations.
- Sticky mobile purchase bar.

### 6. Shopping Bag & Wishlist
- Slide-over `CartDrawer` accessible anywhere in the application.
- Dedicated `/cart` page with line item quantity controls and promo voucher system (`WELCOME10`, `RH40`, `VIP20`).
- Saved Wardrobe (`/wishlist`) with 1-click Move-to-Bag functionality.

### 7. Checkout Journey & Receipt
- **Step 1**: Contact info & International shipping address (US, GB, AU, PK).
- **Step 2**: Shipping speed (Standard vs. Priority Express) & Payment architecture (Card, Apple Pay, COD).
- **Step 3**: Order Review & Authorization.
- **Order Confirmation Page**: Detailed receipt, order reference (e.g. `#RH-84920`), real-time tracking code, and printable invoice.

### 8. Customer Account & Order History
- Login & Register with 1-Click Demo Sign In for **Alex Morgan** (RH Circle Gold Member).
- Account Dashboard with VIP tier points, address book, and complete order history tracking.

### 9. Legal & Trust Pages
- `/about`: Brand craftsmanship & ethical mill sourcing story.
- `/contact`: Interactive concierge contact form with response guarantee.
- `/faq`: Categorized accordion help center.
- `/shipping`: Country-by-country delivery matrix and customs transparency.
- `/returns`: 30-day worldwide guarantee and return instructions.
- `/privacy` & `/terms`: Full legal policies.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 with custom fonts (`Syne` display + `Plus Jakarta Sans` body)
- **Icons**: Lucide React
- **Build Tool**: Vite 8
- **State Management**: React Context (`CurrencyContext`, `CartContext`, `WishlistContext`, `AuthContext`, `OrderContext`, `NavigationContext`) with local storage persistence.

---

## 🚀 Development & Build

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run TypeScript linter
npm run lint

# Production build
npm run build
```
