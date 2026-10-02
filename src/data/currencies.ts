import { Currency, CurrencyConfig, CountryCode } from '../types';

export const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    exchangeRate: 1.0,
    freeShippingThreshold: 75,
    standardShippingFee: 8,
    expressShippingFee: 18,
    taxRate: 0.07, // 7% US avg sales tax
    allowCOD: false,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
    exchangeRate: 0.78,
    freeShippingThreshold: 60,
    standardShippingFee: 5.5,
    expressShippingFee: 12,
    taxRate: 0.0, // Included in price (VAT)
    allowCOD: false,
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    flag: '🇦🇺',
    exchangeRate: 1.52,
    freeShippingThreshold: 110,
    standardShippingFee: 12,
    expressShippingFee: 24,
    taxRate: 0.10, // GST
    allowCOD: false,
  },
  PKR: {
    code: 'PKR',
    symbol: 'Rs. ',
    name: 'Pakistani Rupee',
    flag: '🇵🇰',
    exchangeRate: 278.0,
    freeShippingThreshold: 18000,
    standardShippingFee: 850,
    expressShippingFee: 1800,
    taxRate: 0.0, // Sales tax included
    allowCOD: true,
  },
};

export const COUNTRY_NAMES: Record<CountryCode, { name: string; currency: Currency; flag: string }> = {
  US: { name: 'United States', currency: 'USD', flag: '🇺🇸' },
  GB: { name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  AU: { name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  PK: { name: 'Pakistan', currency: 'PKR', flag: '🇵🇰' },
};

/**
 * Format USD amount to selected target currency string
 */
export function formatMoney(amountInUSD: number, currency: Currency): string {
  const config = CURRENCY_CONFIGS[currency];
  const converted = amountInUSD * config.exchangeRate;

  if (currency === 'PKR') {
    // PKR formatted with no decimals
    return `${config.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  }

  // USD, GBP, AUD with 2 decimals
  return `${config.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Convert USD amount to raw value in target currency
 */
export function convertMoney(amountInUSD: number, currency: Currency): number {
  const config = CURRENCY_CONFIGS[currency];
  return amountInUSD * config.exchangeRate;
}
