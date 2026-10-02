import React from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { NavigationProvider, useNavigation } from './hooks/useNavigation';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AuthPage } from './pages/AuthPage';
import { AccountDashboardPage } from './pages/AccountDashboardPage';
import {
  AboutPage,
  ContactPage,
  FaqPage,
  ShippingPolicyPage,
  ReturnsPolicyPage,
  PrivacyPolicyPage,
  TermsPage,
} from './pages/StaticPages';
import { Check, ShoppingBag, X } from 'lucide-react';

/**
 * Global Add-To-Cart Notification Toast
 */
const CartToast: React.FC = () => {
  const { showToast, setShowToast, lastAddedItem, setIsCartOpen } = useCart();
  const { navigate } = useNavigation();

  if (!showToast || !lastAddedItem) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm w-full bg-[#12141c] border border-white/20 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <Check className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-white truncate">Added to Shopping Bag</p>
          <p className="text-[11px] text-slate-400 truncate">
            {lastAddedItem.product.name} ({lastAddedItem.selectedSize})
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            setShowToast(false);
            setIsCartOpen(true);
          }}
          className="px-3 py-1.5 bg-white text-slate-950 font-bold text-[11px] uppercase tracking-wider rounded-lg hover:bg-slate-200 transition-colors"
        >
          View Bag
        </button>
        <button
          onClick={() => setShowToast(false)}
          className="p-1 text-slate-400 hover:text-white"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/**
 * Main Application Router
 */
const AppRouter: React.FC = () => {
  const { path } = useNavigation();

  // Extract query params if available
  const [pathname, searchStr] = path.split('?');
  const searchParams = new URLSearchParams(searchStr || '');
  const querySearch = searchParams.get('search') || '';

  // Route matching
  if (pathname === '/' || pathname === '/home') {
    return <HomePage />;
  }

  // Shop Routes
  if (pathname === '/shop') {
    return <ShopPage initialCategory="all" initialSearch={querySearch} />;
  }
  if (pathname === '/shop/men') {
    return <ShopPage initialCategory="Men" />;
  }
  if (pathname === '/shop/women') {
    return <ShopPage initialCategory="Women" />;
  }
  if (pathname === '/shop/new') {
    return <ShopPage initialCategory="new" />;
  }
  if (pathname === '/shop/bestsellers') {
    return <ShopPage initialCategory="bestsellers" />;
  }
  if (pathname === '/shop/sale') {
    return <ShopPage initialCategory="sale" />;
  }
  if (pathname === '/shop/accessories') {
    return <ShopPage initialCategory="Accessories" />;
  }

  // Product Details
  if (pathname.startsWith('/product/')) {
    const slug = pathname.replace('/product/', '');
    return <ProductDetailPage slug={slug} />;
  }

  // Shopping Bag
  if (pathname === '/cart') {
    return <CartPage />;
  }

  // Wishlist
  if (pathname === '/wishlist') {
    return <WishlistPage />;
  }

  // Checkout
  if (pathname === '/checkout') {
    return <CheckoutPage />;
  }

  // Order Confirmation
  if (pathname.startsWith('/order-confirmation')) {
    const parts = pathname.split('/');
    const orderId = parts[2];
    return <OrderConfirmationPage orderId={orderId} />;
  }

  // Authentication
  if (pathname === '/login') {
    return <AuthPage initialMode="login" />;
  }
  if (pathname === '/register') {
    return <AuthPage initialMode="register" />;
  }

  // Account
  if (pathname === '/account' || pathname === '/account/orders') {
    return <AccountDashboardPage />;
  }

  // Static / Info Pages
  if (pathname === '/about') {
    return <AboutPage />;
  }
  if (pathname === '/contact') {
    return <ContactPage />;
  }
  if (pathname === '/faq') {
    return <FaqPage />;
  }
  if (pathname === '/shipping') {
    return <ShippingPolicyPage />;
  }
  if (pathname === '/returns') {
    return <ReturnsPolicyPage />;
  }
  if (pathname === '/privacy') {
    return <PrivacyPolicyPage />;
  }
  if (pathname === '/terms') {
    return <TermsPage />;
  }

  // Default fallback to Shop
  return <ShopPage initialCategory="all" initialSearch={querySearch} />;
};

export default function App() {
  return (
    <NavigationProvider>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <OrderProvider>
                <div className="flex flex-col min-h-screen bg-[#0d0f14] text-slate-100 selection:bg-rose-500 selection:text-white">
                  <Header />
                  <div className="flex-1">
                    <AppRouter />
                  </div>
                  <Footer />
                  <CartDrawer />
                  <CartToast />
                </div>
              </OrderProvider>
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </NavigationProvider>
  );
}
