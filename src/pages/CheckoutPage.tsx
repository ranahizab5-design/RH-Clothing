import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Banknote,
  Smartphone,
  Tag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useOrders } from '../context/OrderContext';
import { useNavigation } from '../hooks/useNavigation';
import { CustomerDetails, CountryCode, ShippingMethod, PaymentMethod } from '../types';
import { COUNTRY_NAMES } from '../data/currencies';

export const CheckoutPage: React.FC = () => {
  const { items, subtotalUSD, discountUSD, totalUSD, couponCode, clearCart } = useCart();
  const { config, formatPrice, country: activeCountry, setCountry } = useCurrency();
  const { placeOrder } = useOrders();
  const { navigate } = useNavigation();

  // Multi-step state: 1: Details & Address, 2: Shipping & Payment, 3: Review
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form fields
  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 349-8201',
    country: activeCountry,
    address: '742 Evergreen Terrace',
    apartment: 'Apt 4B',
    city: 'Springfield',
    state: 'OR',
    postalCode: '97477',
  });

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Dummy Card Details
  const [cardData, setCardData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'Alex Morgan',
    expiry: '08/28',
    cvv: '849',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Shipping fee in USD
  const standardFeeUSD = config.standardShippingFee / config.exchangeRate;
  const expressFeeUSD = config.expressShippingFee / config.exchangeRate;
  const subtotalLocal = subtotalUSD * config.exchangeRate;
  const isFreeShippingEligible = subtotalLocal >= config.freeShippingThreshold;

  const effectiveShippingUSD =
    isFreeShippingEligible && shippingMethod === 'standard'
      ? 0
      : shippingMethod === 'standard'
      ? standardFeeUSD
      : expressFeeUSD;

  const taxUSD = subtotalUSD * config.taxRate;
  const finalTotalUSD = Math.max(0, subtotalUSD - discountUSD + effectiveShippingUSD + taxUSD);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="font-display text-2xl font-bold text-white mb-3">No Items to Checkout</h2>
        <p className="text-slate-400 text-sm mb-6">Your shopping bag is currently empty.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'country') {
      setCountry(value as CountryCode);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        customer: formData,
        items,
        subtotalUSD,
        shippingFeeUSD: effectiveShippingUSD,
        discountUSD,
        taxUSD,
        totalUSD: finalTotalUSD,
        currency: config.code,
        shippingMethod,
        paymentMethod,
      });

      clearCart();
      setIsProcessing(false);
      navigate(`/order-confirmation/${order.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Checkout Progress Stepper */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 1 ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-400'
              }`}
            >
              1
            </span>
            <span className={step >= 1 ? 'text-white' : ''}>Shipping Details</span>
          </div>
          <div className="h-[1px] w-12 bg-white/10" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 2 ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-400'
              }`}
            >
              2
            </span>
            <span className={step >= 2 ? 'text-white' : ''}>Delivery &amp; Payment</span>
          </div>
          <div className="h-[1px] w-12 bg-white/10" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 3 ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-400'
              }`}
            >
              3
            </span>
            <span className={step >= 3 ? 'text-white' : ''}>Review Order</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Step Forms (Left 7) */}
        <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
          {/* STEP 1: Contact & Shipping Address */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-white mb-1">
                  1. Contact Information
                </h2>
                <p className="text-xs text-slate-400 mb-4">
                  We&apos;ll send your receipt and tracking notifications here.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Phone Number (for carrier dispatch) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="pt-6 border-t border-white/[0.06]">
                <h2 className="font-display text-xl font-bold text-white mb-1">
                  2. Shipping Destination
                </h2>
                <p className="text-xs text-slate-400 mb-4">
                  Where should we dispatch your order?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Country / Region *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#161822] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-rose-500 cursor-pointer"
                    >
                      {(Object.keys(COUNTRY_NAMES) as CountryCode[]).map((cCode) => (
                        <option key={cCode} value={cCode}>
                          {COUNTRY_NAMES[cCode].flag} {COUNTRY_NAMES[cCode].name} ({COUNTRY_NAMES[cCode].currency})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Fashion Blvd, Suite 200"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York, London, Melbourne, Lahore..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500"
                    />
                    {errors.city && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      State / Province / Region
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY, Greater London, VIC, Punjab..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="10001, SW1A 1AA, 3000, 54000"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-rose-500"
                    />
                    {errors.postalCode && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Bag</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-950/40 flex items-center gap-2"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Shipping Method & Payment Selection */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-8">
              {/* Delivery Method */}
              <div>
                <h2 className="font-display text-xl font-bold text-white mb-2">
                  Select Delivery Method
                </h2>
                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-rose-500/60 bg-rose-500/10'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-rose-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">Standard Delivery (3–5 Business Days)</p>
                        <p className="text-[11px] text-slate-400">Tracked local courier with dispatch alert</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white tabular-nums">
                      {isFreeShippingEligible ? (
                        <span className="text-emerald-400">FREE</span>
                      ) : (
                        formatPrice(standardFeeUSD)
                      )}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-rose-500/60 bg-rose-500/10'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-rose-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">Priority Express (1–2 Business Days)</p>
                        <p className="text-[11px] text-slate-400">Air courier express with signature delivery</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white tabular-nums">
                      {formatPrice(expressFeeUSD)}
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-6 border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display text-xl font-bold text-white">
                    Payment Architecture
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Sandbox Encrypted</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Select payment method. Real gateway credentials (e.g. Stripe, COD) are wired securely.
                </p>

                <div className="space-y-3">
                  {/* Credit Card Option */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-rose-500/60 bg-rose-500/10'
                        : 'border-white/10 bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-rose-500"
                        />
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-slate-300" />
                          <span className="text-xs font-bold text-white">Credit / Debit Card</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5 text-[10px] text-slate-400">
                        <span className="px-1.5 py-0.5 rounded bg-white/10">VISA</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/10">MC</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/10">AMEX</span>
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                        <div className="col-span-2">
                          <label className="text-[11px] text-slate-300 block mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardData.cardNumber}
                            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                            className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-300 block mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                            className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-300 block mb-1">CVV</label>
                          <input
                            type="password"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-white font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Apple Pay / Google Pay */}
                  <div
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'applepay'
                        ? 'border-rose-500/60 bg-rose-500/10'
                        : 'border-white/10 bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'applepay'}
                          onChange={() => setPaymentMethod('applepay')}
                          className="accent-rose-500"
                        />
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-slate-300" />
                          <span className="text-xs font-bold text-white">Apple Pay / Google Wallet</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400">1-Touch Biometric</span>
                    </div>
                  </div>

                  {/* Cash on Delivery (COD) for Pakistan or eligible markets */}
                  {config.allowCOD && (
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-emerald-500/60 bg-emerald-500/10'
                          : 'border-white/10 bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="accent-emerald-500"
                          />
                          <div className="flex items-center gap-2">
                            <Banknote className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold text-white">
                              Cash on Delivery (COD) — Pakistan
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-emerald-400 font-semibold">
                          Pay at your doorstep
                        </span>
                      </div>
                      {paymentMethod === 'cod' && (
                        <p className="text-[11px] text-slate-300 mt-2 pl-7">
                          Please have exact cash ready upon delivery by Trax / TCS courier.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-950/40 flex items-center gap-2"
                >
                  <span>Review Final Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-white mb-2">
                  Review &amp; Authorize Order
                </h2>
                <p className="text-xs text-slate-400">
                  Please verify your shipping details before placing the order.
                </p>
              </div>

              {/* Review boxes */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                      Recipient &amp; Address
                    </span>
                    <p className="font-semibold text-white">{formData.fullName}</p>
                    <p className="text-slate-300">{formData.address}, {formData.apartment}</p>
                    <p className="text-slate-300">{formData.city}, {formData.state} {formData.postalCode}</p>
                    <p className="text-slate-400 mt-1">{COUNTRY_NAMES[formData.country].name} · {formData.phone}</p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-rose-400 hover:text-rose-300 underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                      Delivery &amp; Payment Method
                    </span>
                    <p className="font-semibold text-white capitalize">
                      {shippingMethod === 'express' ? 'Priority Express (1–2 Days)' : 'Standard Tracked Delivery (3–5 Days)'}
                    </p>
                    <p className="text-slate-300 capitalize mt-0.5">
                      {paymentMethod === 'card'
                        ? 'Credit Card (Visa ending in 4242)'
                        : paymentMethod === 'cod'
                        ? 'Cash on Delivery (Doorstep settlement)'
                        : 'Apple Pay'}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-rose-400 hover:text-rose-300 underline"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Authorized Disclaimer */}
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  By placing this order, you authorize RH Clothing to dispatch your items with full 30-day exchange coverage.
                </span>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="px-8 py-4 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-rose-950/40 flex items-center gap-2 transition-all hover:scale-[1.01]"
                >
                  {isProcessing ? (
                    <span>Securing Order...</span>
                  ) : (
                    <>
                      <span>Complete Purchase ({formatPrice(finalTotalUSD)})</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary (Right 5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] sticky top-24">
          <h2 className="font-display text-lg font-bold text-white mb-4">
            Items in Order ({items.length})
          </h2>

          <div className="divide-y divide-white/[0.06] max-h-72 overflow-y-auto pr-1 mb-6">
            {items.map((item) => {
              const unitPrice = item.product.salePrice ?? item.product.price;
              return (
                <div key={item.id} className="py-3 flex gap-3 items-center justify-between">
                  <div className="flex gap-3 items-center min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 rounded-lg object-cover bg-slate-900 border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.product.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {item.selectedSize} · {item.selectedColor.name} · Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white tabular-nums">
                    {formatPrice(unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-slate-400 border-t border-white/10 pt-4 mb-4 tabular-nums">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-200">{formatPrice(subtotalUSD)}</span>
            </div>

            {discountUSD > 0 && (
              <div className="flex justify-between text-rose-400 font-semibold">
                <span>Discount ({couponCode})</span>
                <span>-{formatPrice(discountUSD)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-slate-200">
                {effectiveShippingUSD === 0 ? (
                  <strong className="text-emerald-400">FREE</strong>
                ) : (
                  formatPrice(effectiveShippingUSD)
                )}
              </span>
            </div>

            {taxUSD > 0 && (
              <div className="flex justify-between">
                <span>Estimated Tax (Region VAT/Sales)</span>
                <span className="text-slate-200">{formatPrice(taxUSD)}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/[0.08]">
              <span>Grand Total</span>
              <span>{formatPrice(finalTotalUSD)}</span>
            </div>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center gap-2 text-[11px] text-slate-400">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted with bank-grade 256-Bit SSL certificate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
