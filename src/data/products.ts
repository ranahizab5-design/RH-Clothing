import { Product } from '../types';

// Real generated campaign image paths
import menCategoryImg from '../assets/images/category_men_collection_1790883643682.jpg';
import womenCategoryImg from '../assets/images/category_women_collection_1790883657406.jpg';
import accessoriesCategoryImg from '../assets/images/category_accessories_1790883668455.jpg';
import promoFashionImg from '../assets/images/promo_banner_fashion_1790883679304.jpg';
import heroFashionImg from '../assets/images/hero_fashion_banner_1790883630025.jpg';

/**
 * High-definition SVG fashion illustrations providing crisp, reliable visuals
 * for every variant and hover state, guaranteeing ZERO broken images in any sandbox.
 */
function createFashionVisual(type: string, primaryColor: string, accentColor: string, detailText: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#16181f" />
        <stop offset="50%" stop-color="#121318" />
        <stop offset="100%" stop-color="#0b0c10" />
      </linearGradient>
      <radialGradient id="spotlight" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="garmentShade" x1="0%" y1="0%" x2="100%" y2="80%">
        <stop offset="0%" stop-color="${primaryColor}" />
        <stop offset="50%" stop-color="${primaryColor}" />
        <stop offset="100%" stop-color="${accentColor}" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>
    
    <!-- Background Canvas -->
    <rect width="600" height="750" fill="url(#bg)" />
    <circle cx="300" cy="360" r="280" fill="url(#spotlight)" />

    <!-- Minimal Geometric Studio Grid Frame -->
    <line x1="60" y1="60" x2="60" y2="690" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1" />
    <line x1="540" y1="60" x2="540" y2="690" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1" />
    <line x1="60" y1="60" x2="540" y2="60" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1" />
    <line x1="60" y1="690" x2="540" y2="690" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1" />

    <!-- Minimal Brand Seal -->
    <text x="500" y="95" font-family="'Syne', sans-serif" font-weight="700" font-size="12" fill="#ffffff" fill-opacity="0.25" text-anchor="end" letter-spacing="4">RH STUDIO</text>
    
    <!-- Stylized Minimalist Garment Silhouettes -->
    ${getGarmentPath(type)}

    <!-- Typography Bottom Label -->
    <text x="300" y="660" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="13" fill="#ffffff" fill-opacity="0.4" text-anchor="middle" letter-spacing="3">${detailText.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getGarmentPath(type: string): string {
  switch (type) {
    case 'hoodie':
      return `
        <!-- Minimalist Luxury Boxy Hoodie -->
        <g filter="url(#shadow)" transform="translate(150, 150)">
          <!-- Hood -->
          <path d="M 110,60 C 110,20 190,20 190,60 C 210,65 215,90 200,120 L 100,120 C 85,90 90,65 110,60 Z" fill="url(#garmentShade)" />
          <!-- Torso & Sleeves -->
          <path d="M 60,115 L 20,240 L 55,250 L 80,180 L 80,360 L 220,360 L 220,180 L 245,250 L 280,240 L 240,115 L 195,115 C 190,140 110,140 105,115 Z" fill="url(#garmentShade)" />
          <!-- Kangaroo Pocket -->
          <path d="M 105,270 L 195,270 L 210,330 L 90,330 Z" fill="#000000" fill-opacity="0.25" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
          <!-- Ribbed hem -->
          <rect x="80" y="348" width="140" height="16" fill="#000000" fill-opacity="0.3" rx="2" />
        </g>
      `;
    case 'jacket':
    case 'trench':
      return `
        <!-- Structured Tailored Trench / Overcoat -->
        <g filter="url(#shadow)" transform="translate(145, 130)">
          <!-- Shoulders & Coat Body -->
          <path d="M 60,80 L 15,280 L 55,290 L 80,200 L 75,440 L 235,440 L 230,200 L 255,290 L 295,280 L 250,80 L 195,75 L 155,140 L 115,75 Z" fill="url(#garmentShade)" />
          <!-- Lapels -->
          <polygon points="115,75 155,170 120,240 90,120" fill="#000000" fill-opacity="0.35" />
          <polygon points="195,75 155,170 190,240 220,120" fill="#000000" fill-opacity="0.2" />
          <!-- Belt / Storm Flap Accent -->
          <rect x="75" y="270" width="160" height="14" fill="#000000" fill-opacity="0.4" />
          <rect x="145" y="265" width="20" height="24" fill="#ffffff" fill-opacity="0.2" rx="2" />
        </g>
      `;
    case 'trousers':
    case 'jeans':
      return `
        <!-- Wide-Leg Pleated Trousers -->
        <g filter="url(#shadow)" transform="translate(170, 150)">
          <!-- Waistband -->
          <rect x="40" y="50" width="180" height="20" fill="url(#garmentShade)" rx="2" />
          <!-- Trousers Legs -->
          <path d="M 40,70 L 20,430 L 115,430 L 130,190 L 145,430 L 240,430 L 220,70 Z" fill="url(#garmentShade)" />
          <!-- Pleat Lines -->
          <line x1="75" y1="70" x2="65" y2="430" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1.5" />
          <line x1="185" y1="70" x2="195" y2="430" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1.5" />
        </g>
      `;
    case 'dress':
      return `
        <!-- Sculptural Ribbed Maxi Dress -->
        <g filter="url(#shadow)" transform="translate(175, 130)">
          <!-- Bodice -->
          <path d="M 90,60 L 70,160 L 60,300 L 40,450 L 210,450 L 190,300 L 180,160 L 160,60 Z" fill="url(#garmentShade)" />
          <!-- Neckline cut -->
          <path d="M 90,60 C 110,90 140,90 160,60 Z" fill="#000000" fill-opacity="0.5" />
          <!-- Slit Accent -->
          <line x1="160" y1="280" x2="175" y2="450" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2" />
        </g>
      `;
    case 'knitwear':
    case 'sweater':
      return `
        <!-- Oversized Heavyweight Chunky Knit -->
        <g filter="url(#shadow)" transform="translate(145, 140)">
          <!-- Crewneck Collar -->
          <ellipse cx="155" cy="85" rx="45" ry="18" fill="#000000" fill-opacity="0.4" stroke="url(#garmentShade)" stroke-width="8" />
          <!-- Sweater Torso & Dropped Sleeves -->
          <path d="M 60,105 L 10,240 L 48,255 L 75,185 L 75,370 L 235,370 L 235,185 L 262,255 L 300,240 L 250,105 Z" fill="url(#garmentShade)" />
          <!-- Knit Rib Textures -->
          <line x1="105" y1="130" x2="105" y2="360" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2" />
          <line x1="155" y1="130" x2="155" y2="360" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2" />
          <line x1="205" y1="130" x2="205" y2="360" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2" />
          <rect x="75" y="358" width="160" height="14" fill="#000000" fill-opacity="0.25" />
        </g>
      `;
    case 'shirt':
    case 'tshirt':
    default:
      return `
        <!-- Heavyweight Boxy Tee -->
        <g filter="url(#shadow)" transform="translate(150, 150)">
          <!-- Crew Neck -->
          <ellipse cx="150" cy="80" rx="40" ry="15" fill="#000000" fill-opacity="0.4" stroke="url(#garmentShade)" stroke-width="7" />
          <!-- Sleeves and Hem -->
          <path d="M 60,95 L 15,190 L 65,205 L 85,150 L 85,360 L 215,360 L 215,150 L 235,205 L 285,190 L 240,95 Z" fill="url(#garmentShade)" />
          <line x1="85" y1="350" x2="215" y2="350" stroke="#ffffff" stroke-opacity="0.1" stroke-width="2" />
        </g>
      `;
  }
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'heavyweight-oversized-hoodie',
    name: 'Heavyweight Studio Hoodie (480 GSM)',
    description: 'Constructed from custom-developed 480 GSM organic loopback French Terry. Features an architectural double-layered hood without drawstrings, dropped shoulders, and relaxed boxy drape tailored for daily wear.',
    category: 'Men',
    subcategory: 'Hoodies',
    gender: 'Men',
    price: 98,
    salePrice: 78,
    currency: 'USD',
    images: [
      menCategoryImg,
      createFashionVisual('hoodie', '#1e222d', '#111318', '480 GSM French Terry · Slate'),
      createFashionVisual('hoodie', '#383b42', '#22252a', 'Oversized Boxy Cut'),
    ],
    colors: [
      { name: 'Washed Onyx', hex: '#1c1e24' },
      { name: 'Oatmeal Heather', hex: '#d6cfc5' },
      { name: 'Forest Shadow', hex: '#26342d' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 142,
    stock: 24,
    badge: 'Best Seller',
    material: '100% Organic Heavyweight French Terry Cotton (480 GSM)',
    careInstructions: 'Machine wash cold inside out with like colors. Hang dry in shade. Do not tumble dry.',
    fit: 'Boxy, dropped shoulders. Fits slightly oversized. Take your true size for intended drape.',
    featured: true,
    bestSeller: true,
    onSale: true,
  },
  {
    id: 'prod-02',
    slug: 'architectural-wool-trench-coat',
    name: 'Architectural Double-Breasted Trench',
    description: 'Refined double-breasted longline coat crafted from water-resistant bonded Italian wool blend. Features sharp notch lapels, removable storm flap, waist-cinching tonal sash belt, and deep welt pockets.',
    category: 'Women',
    subcategory: 'Jackets',
    gender: 'Women',
    price: 245,
    salePrice: 195,
    currency: 'USD',
    images: [
      womenCategoryImg,
      heroFashionImg,
      createFashionVisual('trench', '#c2b29f', '#8f8070', 'Italian Bonded Wool · Sand'),
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#b7a896' },
      { name: 'Midnight Charcoal', hex: '#1d212a' },
      { name: 'Espresso', hex: '#3e2e26' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviewCount: 88,
    stock: 12,
    badge: 'New Arrival',
    material: '70% Virgin Wool, 25% Polyamide, 5% Cashmere with Bionic-Finish water resistance',
    careInstructions: 'Specialist dry clean only. Steam gently.',
    fit: 'Relaxed tailored silhouette designed to layer effortlessly over knitwear.',
    featured: true,
    newArrival: true,
    onSale: true,
  },
  {
    id: 'prod-03',
    slug: 'relaxed-double-pleated-trousers',
    name: 'Relaxed Double-Pleated Trousers',
    description: 'Impeccably tailored wide-leg trousers featuring deep front knife pleats, side adjusters, and a clean hook-and-bar closure. Fluid drape with crease resistance.',
    category: 'Men',
    subcategory: 'Trousers',
    gender: 'Men',
    price: 120,
    currency: 'USD',
    images: [
      createFashionVisual('trousers', '#2b2f3a', '#181b22', 'Wide Leg Tailoring · Charcoal'),
      menCategoryImg,
      createFashionVisual('trousers', '#3e424e', '#23262e', 'Double Knife Pleats'),
    ],
    colors: [
      { name: 'Deep Graphite', hex: '#23262f' },
      { name: 'Raw Sand', hex: '#c5bbae' },
      { name: 'Dark Olive', hex: '#2b332b' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 65,
    stock: 18,
    badge: 'Best Seller',
    material: '62% Wool, 34% Recycled Polyester, 4% Elastane stretch twill',
    careInstructions: 'Dry clean recommended or gentle cold hand wash. Low iron with pressing cloth.',
    fit: 'High-rise with a fluid, wide-leg taper through the hem.',
    featured: true,
    bestSeller: true,
  },
  {
    id: 'prod-04',
    slug: 'chunky-ribbed-merino-knit',
    name: 'Chunky Ribbed Wool Fisherman Knit',
    description: 'Spun from 100% fine Australian Merino wool with a tactile 5-gauge brioche rib stitch. Exceptionally thermal yet breathable, featuring a snug mock crewneck and reinforced cuffs.',
    category: 'Unisex',
    subcategory: 'Knitwear',
    gender: 'Unisex',
    price: 140,
    salePrice: 112,
    currency: 'USD',
    images: [
      promoFashionImg,
      createFashionVisual('knitwear', '#e3ddd3', '#b8b0a2', 'Pure Australian Merino · Chalk'),
      createFashionVisual('knitwear', '#272b35', '#16181f', '5-Gauge Brioche Rib'),
    ],
    colors: [
      { name: 'Chalk White', hex: '#e8e4dc' },
      { name: 'Deep Navy', hex: '#1a2233' },
      { name: 'Forest', hex: '#1f2e24' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 94,
    stock: 15,
    badge: 'Sale',
    material: '100% Extra-Fine Australian Merino Wool (Responsible Wool Standard certified)',
    careInstructions: 'Hand wash cold with wool detergent. Dry flat on a clean towel. Store folded.',
    fit: 'Relaxed unisex fit with gentle shoulder drop.',
    featured: true,
    onSale: true,
  },
  {
    id: 'prod-05',
    slug: 'sculptural-ribbed-maxi-dress',
    name: 'Sculptural Column Rib Maxi Dress',
    description: 'An elongated body-skimming column silhouette rendered in a compact modal-cotton blend. Designed with clean square neckline, sleeveless silhouette, and subtle walking slit at the back hem.',
    category: 'Women',
    subcategory: 'Dresses',
    gender: 'Women',
    price: 110,
    currency: 'USD',
    images: [
      createFashionVisual('dress', '#191b22', '#0d0e12', 'Column Rib Silhouette · Pitch Black'),
      womenCategoryImg,
      createFashionVisual('dress', '#333845', '#1f222b', 'Side Leg Slit Accent'),
    ],
    colors: [
      { name: 'Matte Black', hex: '#16171b' },
      { name: 'Terracotta Earth', hex: '#87493a' },
      { name: 'Bone Ivory', hex: '#e3dfd7' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewCount: 52,
    stock: 22,
    badge: 'New Arrival',
    material: '58% Micro-Modal, 36% Organic Cotton, 6% Spandex',
    careInstructions: 'Cold gentle cycle. Lay flat to dry.',
    fit: 'Form-fitting column drape with supportive stretch.',
    newArrival: true,
  },
  {
    id: 'prod-06',
    slug: 'vintage-wash-selvedge-denim',
    name: '14oz Raw Vintage Selvedge Jeans',
    description: 'Woven on shuttle looms in Okayama using premium ring-spun long-staple cotton. Classic straight leg with a slight taper, button fly, and signature copper rivets that age with personal patina.',
    category: 'Men',
    subcategory: 'Jeans',
    gender: 'Men',
    price: 155,
    currency: 'USD',
    images: [
      createFashionVisual('jeans', '#202a3d', '#131b28', '14oz Okayama Selvedge · Indigo'),
      menCategoryImg,
      createFashionVisual('jeans', '#2f3c54', '#1d2637', 'Shuttle Loom Woven'),
    ],
    colors: [
      { name: 'Raw Indigo', hex: '#1c283d' },
      { name: 'Washed Stone', hex: '#48576f' },
      { name: 'Faded Black', hex: '#2b2d33' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewCount: 79,
    stock: 30,
    badge: 'Best Seller',
    material: '100% Japanese Selvedge Cotton (14 oz heavyweight twill)',
    careInstructions: 'Wear for 6 months before first wash. Soak cold inside out with minimal agitation.',
    fit: 'Mid-rise, straight leg fit with traditional 32-inch inseam.',
    bestSeller: true,
  },
  {
    id: 'prod-07',
    slug: 'minimalist-leather-crossbody-bag',
    name: 'Minimalist Architectural Crossbody Bag',
    description: 'Clean-lined leather shoulder bag crafted from full-grain Italian vegetable-tanned leather. Features magnetic hidden closure, internal card organizer, and an adjustable webbing strap with matte black hardware.',
    category: 'Accessories',
    subcategory: 'Accessories',
    gender: 'Unisex',
    price: 135,
    salePrice: 105,
    currency: 'USD',
    images: [
      accessoriesCategoryImg,
      createFashionVisual('jacket', '#191b20', '#101114', 'Italian Full-Grain Leather'),
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#121316' },
      { name: 'Cognac Saddle', hex: '#63381e' },
      { name: 'Olive Green', hex: '#2d382e' },
    ],
    sizes: ['M'],
    rating: 4.9,
    reviewCount: 118,
    stock: 14,
    badge: 'Limited Edition',
    material: '100% Italian Full-Grain Vegetable-Tanned Leather, Cotton Twill Lining',
    careInstructions: 'Treat periodically with natural leather conditioner. Avoid extended soaking.',
    fit: 'Compact profile (22cm x 16cm x 6cm). Fits smartphones, keys, wallet, passport.',
    featured: true,
    onSale: true,
  },
  {
    id: 'prod-08',
    slug: 'boxy-heavyweight-essential-tee',
    name: 'Signature 280 GSM Boxy Heavy Tee',
    description: 'The definitive daily t-shirt. Cut in a contemporary boxy silhouette with clean drop shoulders, thick 1.2-inch ribbed collar that never sags, and high-density combed cotton with a velvety pre-shrunk finish.',
    category: 'Men',
    subcategory: 'T-Shirts',
    gender: 'Men',
    price: 45,
    currency: 'USD',
    images: [
      createFashionVisual('tshirt', '#20232c', '#13151b', '280 GSM Compact Jersey · Black'),
      menCategoryImg,
      createFashionVisual('tshirt', '#e4dfd7', '#cac4ba', 'Pre-Shrunk Velvety Finish'),
    ],
    colors: [
      { name: 'Pure Onyx', hex: '#15161b' },
      { name: 'Off-White Optic', hex: '#f0ede6' },
      { name: 'Washed Sage', hex: '#58695d' },
      { name: 'Heather Smoke', hex: '#5a5d66' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 310,
    stock: 65,
    badge: 'Best Seller',
    material: '100% GOTS Certified Organic Combed Cotton (280 GSM)',
    careInstructions: 'Machine wash 30°C. Tumble dry low or air dry.',
    fit: 'Boxy streetwear fit. True to size for modern roominess.',
    featured: true,
    bestSeller: true,
  },
  {
    id: 'prod-09',
    slug: 'silk-blend-camp-collar-shirt',
    name: 'Mulberry Silk-Blend Resort Shirt',
    description: 'Relaxed resort-style camp collar shirt woven with silk and lyocell for a liquid-like drape and cool hand feel. Detailed with genuine mother-of-pearl buttons and clean straight hem.',
    category: 'Men',
    subcategory: 'Shirts',
    gender: 'Men',
    price: 95,
    currency: 'USD',
    images: [
      createFashionVisual('shirt', '#323742', '#1b1d24', 'Mulberry Silk & Lyocell Blend'),
      promoFashionImg,
      createFashionVisual('shirt', '#4b5263', '#2a2e38', 'Camp Collar Resort Cut'),
    ],
    colors: [
      { name: 'Midnight Eclipse', hex: '#181b22' },
      { name: 'Sand Drift', hex: '#d1c7b8' },
      { name: 'Sage Green', hex: '#4f5e52' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 46,
    stock: 20,
    badge: 'New Arrival',
    material: '40% Mulberry Silk, 60% TENCEL™ Lyocell',
    careInstructions: 'Dry clean or cold delicate cycle with silk detergent. Cool iron.',
    fit: 'Fluid relaxed fit with straight hem and subtle side splits.',
    newArrival: true,
  },
  {
    id: 'prod-10',
    slug: 'cropped-wool-bomber-jacket',
    name: 'Cropped Melton Wool Bomber',
    description: 'A modern proportion study on the classic flight jacket. Crafted with insulating 600 GSM Italian Melton wool, heavy gauge 2-way RiRi zip closure, and dense ribbed knit waistband.',
    category: 'Men',
    subcategory: 'Jackets',
    gender: 'Men',
    price: 210,
    salePrice: 168,
    currency: 'USD',
    images: [
      createFashionVisual('jacket', '#191b22', '#0f1015', 'Italian Melton Wool 600 GSM'),
      menCategoryImg,
      createFashionVisual('jacket', '#2f3442', '#1b1d26', '2-Way Hardware Zipper'),
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#1c1e24' },
      { name: 'Deep Olive', hex: '#262f27' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviewCount: 38,
    stock: 10,
    badge: 'Limited Edition',
    material: '80% Recycled Wool, 20% Polyamide, 100% Cupro lining',
    careInstructions: 'Specialist dry clean only.',
    fit: 'Cropped torso with voluminous sleeves and dropped shoulders.',
    featured: true,
    onSale: true,
  },
  {
    id: 'prod-11',
    slug: 'ribbed-knit-polo-sweater',
    name: 'Fine Ribbed Knit Open Polo',
    description: 'Lightweight tactile polo with an open Johnny collar and elongated sleeves. Knitted from breathable Supima cotton and silk blend for year-round layering under tailoring.',
    category: 'Women',
    subcategory: 'Knitwear',
    gender: 'Women',
    price: 88,
    currency: 'USD',
    images: [
      createFashionVisual('knitwear', '#c4baa9', '#8a7f6f', 'Supima Cotton & Silk Knit'),
      womenCategoryImg,
      createFashionVisual('knitwear', '#272b35', '#161920', 'Open Johnny Collar'),
    ],
    colors: [
      { name: 'Alabaster Stone', hex: '#dbd5ca' },
      { name: 'Dark Truffle', hex: '#3b2f29' },
      { name: 'Noir', hex: '#16171b' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewCount: 39,
    stock: 16,
    badge: 'New Arrival',
    material: '70% Supima Cotton, 30% Silk',
    careInstructions: 'Machine wash delicate cycle in a wash bag. Reshape whilst damp.',
    fit: 'Slim tailored silhouette with natural vertical stretch.',
    newArrival: true,
  },
  {
    id: 'prod-12',
    slug: 'oversized-poplin-tailored-shirt',
    name: 'Crisp Oversized Poplin Shirt',
    description: 'An effortless wardrobe foundational piece. Cut in crisp 100% organic cotton poplin with dropped shoulders, structured cuffs, and extended curved shirttail hem.',
    category: 'Women',
    subcategory: 'Shirts',
    gender: 'Women',
    price: 85,
    currency: 'USD',
    images: [
      womenCategoryImg,
      createFashionVisual('shirt', '#e8e5dc', '#beb6a8', 'Crisp Cotton Poplin · Cloud'),
      createFashionVisual('shirt', '#202636', '#141824', 'Deep Shirttail Hem'),
    ],
    colors: [
      { name: 'Crisp Cloud', hex: '#f2f0ea' },
      { name: 'Classic Sky Stripe', hex: '#adc2db' },
      { name: 'Midnight Onyx', hex: '#171920' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.9,
    reviewCount: 67,
    stock: 25,
    badge: 'Best Seller',
    material: '100% Long-Staple Organic Cotton Poplin (Mercerized finish)',
    careInstructions: 'Machine wash 40°C. Medium iron with steam for sharp crispness.',
    fit: 'Generous oversized boyfriend cut. Size down if you prefer a closer fit.',
    bestSeller: true,
  },
];

export const CATEGORIES_DATA = [
  {
    id: 'men',
    name: "Men's Collection",
    tagline: 'Tailored Streetwear & Heavyweight Staples',
    image: menCategoryImg,
    itemCount: '48 Styles',
    link: '/shop/men',
    categoryKey: 'Men' as const,
  },
  {
    id: 'women',
    name: "Women's Collection",
    tagline: 'Sculptural Silhouettes & Refined Outerwear',
    image: womenCategoryImg,
    itemCount: '54 Styles',
    link: '/shop/women',
    categoryKey: 'Women' as const,
  },
  {
    id: 'new',
    name: 'New Season Drop',
    tagline: 'The Autumn / Winter Capsule 2026',
    image: promoFashionImg,
    itemCount: '26 Styles',
    link: '/shop/new',
    categoryKey: 'Unisex' as const,
  },
  {
    id: 'accessories',
    name: 'Minimal Accessories',
    tagline: 'Full-Grain Leather, Hardware & Eyewear',
    image: accessoriesCategoryImg,
    itemCount: '18 Styles',
    link: '/shop/accessories',
    categoryKey: 'Accessories' as const,
  },
];

export const CUSTOMER_REVIEWS: Array<{
  id: string;
  author: string;
  location: string;
  productName: string;
  rating: number;
  date: string;
  quote: string;
  verified: boolean;
}> = [
  {
    id: 'rev-1',
    author: 'Julian Henderson',
    location: 'Melbourne, Australia',
    productName: 'Heavyweight Studio Hoodie (480 GSM)',
    rating: 5,
    date: 'September 2026',
    quote: 'The 480 GSM weight is unreal. It maintains that boxy architectural hood shape all day without slouching. Easily competes with $300 designer streetwear brands at a fraction of the cost.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Clara Sterling',
    location: 'London, United Kingdom',
    productName: 'Architectural Double-Breasted Trench',
    rating: 5,
    date: 'August 2026',
    quote: 'The Italian wool hand-feel and water repellency survived a wet London autumn commute without a stain. The sash belt cinches cleanly without bulk. RH Clothing has become my default brand.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Hamza Tariq',
    location: 'Lahore, Pakistan',
    productName: 'Relaxed Double-Pleated Trousers',
    rating: 5,
    date: 'September 2026',
    quote: 'Cash on delivery worked seamlessly in Lahore within 3 days. The drape of these trousers is sensational with loafers or chunky sneakers. Sizing was exact according to the chart.',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Marcus Vance',
    location: 'New York, USA',
    productName: '14oz Raw Vintage Selvedge Jeans',
    rating: 5,
    date: 'July 2026',
    quote: 'Authentic Japanese shuttle-loom denim that fades with real character. Customer care responded within 10 minutes when I had an exchange question.',
    verified: true,
  },
];
