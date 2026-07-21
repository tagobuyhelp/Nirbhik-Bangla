'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import bn from '@/locales/bn';
import hi from '@/locales/hi';
import en from '@/locales/en';

const translations = { bn, hi, en };
const LANG_KEY = 'nirbhik-lang';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window === 'undefined') return 'bn';
    const saved = localStorage.getItem(LANG_KEY);
    return saved && translations[saved] ? saved : 'bn';
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const switchLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLocale(lang);
      localStorage.setItem(LANG_KEY, lang);
      document.documentElement.lang = lang;
    }
  }, []);

  const t = useCallback((key) => {
    // key format: "nav.home" or "home.hero_title"
    const keys = key.split('.');
    let value = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }, [locale]);

  // Helper to get multilingual field from DB objects like { bn: '...', hi: '...', en: '...' }
  const localized = useCallback((obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[locale] || obj.bn || obj.en || '';
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage, t, localized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
