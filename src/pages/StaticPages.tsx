import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, ShieldCheck, Globe, Truck, RefreshCw, Clock } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import heroImg from '../assets/images/hero_fashion_banner_1790883630025.jpg';
import promoImg from '../assets/images/promo_banner_fashion_1790883679304.jpg';

/**
 * About Page
 */
export const AboutPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="py-14 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-rose-400 block mb-2">
          The Heritage of RH Clothing
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          Architectural Form. <br />
          Uncompromising Craft.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Founded in 2024, RH Clothing emerged from a single pursuit: to engineer timeless wardrobe foundations that reject seasonal disposable hype in favor of deliberate weight, tailored proportion, and textile longevity.
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden mb-16 border border-white/10 aspect-[16/9] relative shadow-2xl">
        <img
          src={heroImg}
          alt="RH Clothing design atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-300">
            RH Design Atelier · Autumn Winter 2026 Collection
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h3 className="font-display text-base font-bold text-white mb-2">Textile Integrity</h3>
          <p className="text-slate-400">
            We mill our loopback French Terry at a bespoke 480 GSM density and source long-staple combed cotton from certified organic farms, guaranteeing garments that hold structural drape over hundreds of wear cycles.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h3 className="font-display text-base font-bold text-white mb-2">Global Sourcing</h3>
          <p className="text-slate-400">
            From Okayama shuttle-loom selvedge denim to Australian Merino brioche knits and precision Portuguese jersey knitting, our partner mills are chosen exclusively for generational mastery.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h3 className="font-display text-base font-bold text-white mb-2">International Direct</h3>
          <p className="text-slate-400">
            By operating direct localized fulfillment across the USA, UK, Australia, and Pakistan, we bypass traditional luxury wholesale markups, delivering couture-level craftsmanship at transparent prices.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent border border-white/10 text-center">
        <h2 className="font-display text-2xl font-bold text-white mb-3">
          Explore the Current Capsule
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-6">
          Experience the weight and tactile distinction of RH Clothing firsthand.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3.5 bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:bg-slate-100 transition-colors"
        >
          View Collection
        </button>
      </div>
    </div>
  );
};

/**
 * Contact Page
 */
export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-14 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-rose-400 block mb-2">
          Concierge Support
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Get in Touch
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Have an inquiry about garment sizing, customs clearance, or order tracking? Our team is available 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact info (Left 5) */}
        <div className="lg:col-span-5 space-y-6 text-xs text-slate-300">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
            <h3 className="font-display text-base font-bold text-white">Direct Channels</h3>
            
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Client Relations Email</strong>
                <a href="mailto:care@rhclothing.store" className="text-slate-400 hover:text-white underline">
                  care@rhclothing.store
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Toll-Free International Care</strong>
                <span className="text-slate-400">+1 (800) 492-8190</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Operating Hours</strong>
                <span className="text-slate-400">Mon – Fri: 8:00 AM – 9:00 PM EST<br />Sat – Sun: 10:00 AM – 6:00 PM EST</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="font-display text-base font-bold text-white mb-3">Fulfillment Hubs</h3>
            <ul className="space-y-2 text-slate-400">
              <li>🇺🇸 <strong>United States:</strong> 140 Grand St, New York, NY 10013</li>
              <li>🇬🇧 <strong>United Kingdom:</strong> 28 Redchurch St, Shoreditch, London E2 7DD</li>
              <li>🇦🇺 <strong>Australia:</strong> 42 Gertrude St, Fitzroy, VIC 3065</li>
              <li>🇵🇰 <strong>Pakistan:</strong> Gulberg III, MM Alam Road, Lahore 54000</li>
            </ul>
          </div>
        </div>

        {/* Message form (Right 7) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-display text-xl font-bold text-white">Message Dispatched</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Thank you for reaching out. A dedicated RH Clothing concierge will respond to your email within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white mb-1">
                Send an Inquiry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Order Tracking, Exchange Request, Fabric Inquiries..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today?"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg p-3 text-xs text-white outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * FAQ Page
 */
export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which countries do you ship to and what are the delivery times?',
      a: 'RH Clothing operates direct fulfillment to the United States (3–5 days standard, 1–2 days express), United Kingdom (2–4 days), Australia (3–5 days), and Pakistan (2–4 days nationwide via tracked air courier).',
    },
    {
      q: 'Is Cash on Delivery (COD) supported in Pakistan?',
      a: 'Yes, nationwide Cash on Delivery is available across all cities in Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and Peshawar. You can pay cash upon doorstep inspection by the courier.',
    },
    {
      q: 'How does sizing run on your garments?',
      a: 'Our hoodies, sweatshirts, and boxy tees are cut in an intentional relaxed streetwear silhouette with dropped shoulders. If you prefer a tailored fit, size down one size. Our trousers and tailored coats fit true to size. Detailed size charts in inches and centimeters are available on each product page.',
    },
    {
      q: 'What is your returns and exchange policy?',
      a: 'We offer a 30-day hassle-free return and exchange guarantee. All garments must be unworn, unwashed, and in their original packaging with tags intact. We provide prepaid domestic shipping return labels.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and Cash on Delivery (for Pakistan). All electronic payments are processed with bank-level 256-Bit SSL encryption.',
    },
    {
      q: 'Are your fabrics sustainably produced?',
      a: 'Yes. Our cotton is GOTS-certified organic, our Merino wool is RWS (Responsible Wool Standard) certified, and all mailer bags are made from 100% biodegradable cornstarch.',
    },
  ];

  return (
    <div className="py-14 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-rose-400 block mb-2">
          Help Center
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Everything you need to know about international shipping, fabrics, and returns.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-xs sm:text-sm text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-rose-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Shipping Policy Page
 */
export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
        Shipping &amp; Delivery Matrix
      </h1>
      <p className="text-slate-400 mb-8">
        Last updated: October 2026. All deliveries are fully tracked with signature on arrival.
      </p>

      {/* Country Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] mb-10">
        <table className="w-full text-left tabular-nums text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="p-4">Market</th>
              <th className="p-4">Standard Delivery</th>
              <th className="p-4">Priority Express</th>
              <th className="p-4">Complimentary Threshold</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            <tr>
              <td className="p-4 font-bold text-white flex items-center gap-2">
                <span>🇺🇸</span> <span>United States</span>
              </td>
              <td className="p-4">3–5 Business Days ($8.00)</td>
              <td className="p-4">1–2 Business Days ($18.00)</td>
              <td className="p-4 text-emerald-400 font-bold">Orders over $75.00</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-white flex items-center gap-2">
                <span>🇬🇧</span> <span>United Kingdom</span>
              </td>
              <td className="p-4">2–4 Business Days (£5.50)</td>
              <td className="p-4">1–2 Business Days (£12.00)</td>
              <td className="p-4 text-emerald-400 font-bold">Orders over £60.00</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-white flex items-center gap-2">
                <span>🇦🇺</span> <span>Australia</span>
              </td>
              <td className="p-4">3–5 Business Days (A$12.00)</td>
              <td className="p-4">1–2 Business Days (A$24.00)</td>
              <td className="p-4 text-emerald-400 font-bold">Orders over A$110.00</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-white flex items-center gap-2">
                <span>🇵🇰</span> <span>Pakistan (COD Available)</span>
              </td>
              <td className="p-4">2–4 Business Days (Rs. 850)</td>
              <td className="p-4">1–2 Business Days (Rs. 1,800)</td>
              <td className="p-4 text-emerald-400 font-bold">Orders over Rs. 18,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="font-display text-lg font-bold text-white mb-2">Duties &amp; Import Customs</h2>
          <p className="text-slate-400">
            For deliveries to the US, UK, and Australia, all regional duties and import taxes are calculated and guaranteed at checkout with zero unexpected carrier fees.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-white mb-2">Order Dispatch &amp; Tracking</h2>
          <p className="text-slate-400">
            Orders placed before 2:00 PM local time are dispatched the same business day. You will receive an automated tracking link with real-time SMS updates as soon as the courier scans your package.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Returns Policy Page
 */
export const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="py-14 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-6">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
        Returns &amp; Exchanges Policy
      </h1>
      <p className="text-slate-400">
        30-Day Worldwide Guarantee. Your satisfaction with the fit and texture of RH Clothing is paramount.
      </p>

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
        <h2 className="font-display text-base font-bold text-white">How to Initiate a Return</h2>
        <ol className="list-decimal pl-5 space-y-2 text-slate-400">
          <li>Visit your <strong className="text-white">Account Dashboard</strong> or email <strong className="text-white">care@rhclothing.store</strong> with your Order Number (#RH-XXXXX).</li>
          <li>Select the item(s) you wish to exchange or return for a full refund.</li>
          <li>Affix the prepaid carrier return shipping label onto the original reusable mailer.</li>
          <li>Drop off at any local carrier point or schedule a complimentary home pickup.</li>
        </ol>
      </div>

      <div>
        <h2 className="font-display text-base font-bold text-white mb-2">Eligibility Criteria</h2>
        <p className="text-slate-400">
          Garments must be in pristine, unwashed, and unworn condition with all original RH Clothing woven tags attached. Footwear and accessories must include their original dust bags and protective packaging.
        </p>
      </div>
    </div>
  );
};

/**
 * Legal: Privacy Policy & Terms
 */
export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-14 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-6">
      <h1 className="font-display text-3xl font-bold text-white tracking-tight">Privacy Policy</h1>
      <p className="text-slate-400">Effective Date: October 2026</p>
      <p>
        At RH Clothing, we respect your privacy and are committed to protecting personal data collected through our e-commerce platform across the United States, United Kingdom, Australia, and Pakistan.
      </p>
      <h2 className="font-display text-base font-bold text-white mt-4">1. Data We Collect</h2>
      <p className="text-slate-400">
        We collect contact details (name, email, shipping address, telephone) necessary for carrier dispatch, billing, and customs compliance. We do not store raw credit card credentials on our servers.
      </p>
      <h2 className="font-display text-base font-bold text-white mt-4">2. Cookies &amp; Tracking</h2>
      <p className="text-slate-400">
        We use essential cookies to maintain your shopping bag across visits and regional currency preferences.
      </p>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="py-14 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-6">
      <h1 className="font-display text-3xl font-bold text-white tracking-tight">Terms &amp; Conditions</h1>
      <p className="text-slate-400">Effective Date: October 2026</p>
      <p>
        By purchasing from RH Clothing, you agree to these commercial terms. All prices are listed in your selected regional currency (USD, GBP, AUD, or PKR).
      </p>
      <h2 className="font-display text-base font-bold text-white mt-4">1. Order Acceptance</h2>
      <p className="text-slate-400">
        Your receipt of an electronic order confirmation does not signify our final acceptance of your order. RH Clothing reserves the right to accept or decline your order for reasonable inventory or fraud mitigation reasons.
      </p>
      <h2 className="font-display text-base font-bold text-white mt-4">2. Intellectual Property</h2>
      <p className="text-slate-400">
        All designs, visual assets, trademarks, and garment silhouettes displayed on RH Clothing are proprietary intellectual property.
      </p>
    </div>
  );
};
