import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, CurrencyConfig, CountryCode } from '../types';
import { CURRENCY_CONFIGS, COUNTRY_NAMES, formatMoney, convertMoney } from '../data/currencies';

interface CurrencyContextType {
  currency: Currency;
  country: CountryCode;
  config: CurrencyConfig;
  setCurrency: (c: Currency) => void;
  setCountry: (c: CountryCode) => void;
  formatPrice: (amountUSD: number) => string;
  convertPrice: (amountUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('rh_currency');
      if (saved && saved in CURRENCY_CONFIGS) return saved as Currency;
    } catch {
      // ignore
    }
    return 'USD';
  });

  const [country, setCountryState] = useState<CountryCode>(() => {
    try {
      const saved = localStorage.getItem('rh_country');
      if (saved && saved in COUNTRY_NAMES) return saved as CountryCode;
    } catch {
      // ignore
    }
    return 'US';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('rh_currency', c);
    } catch {
      // ignore
    }
  };

  const setCountry = (c: CountryCode) => {
    setCountryState(c);
    const mappedCurrency = COUNTRY_NAMES[c].currency;
    setCurrencyState(mappedCurrency);
    try {
      localStorage.setItem('rh_country', c);
      localStorage.setItem('rh_currency', mappedCurrency);
    } catch {
      // ignore
    }
  };

  const config = CURRENCY_CONFIGS[currency];

  const formatPrice = (amountUSD: number) => {
    return formatMoney(amountUSD, currency);
  };

  const convertPrice = (amountUSD: number) => {
    return convertMoney(amountUSD, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        country,
        config,
        setCurrency,
        setCountry,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
