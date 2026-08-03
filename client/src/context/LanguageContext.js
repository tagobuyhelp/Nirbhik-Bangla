'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import bn from '@/locales/bn';
import hi from '@/locales/hi';
import en from '@/locales/en';

const translations = { bn, hi, en };
const LANG_KEY = 'nirbhik-lang';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('bn');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Detect locale from URL pathname first if available
    const segments = pathname ? pathname.split('/') : [];
    const urlLang = segments[1];
    if (urlLang && translations[urlLang]) {
      setLocale(urlLang);
      localStorage.setItem(LANG_KEY, urlLang);
      document.documentElement.lang = urlLang;
    } else {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved && translations[saved]) {
        setLocale(saved);
        document.documentElement.lang = saved;
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const switchLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLocale(lang);
      localStorage.setItem(LANG_KEY, lang);
      document.documentElement.lang = lang;

      // Update URL if starting with a locale prefix
      if (pathname) {
        const segments = pathname.split('/');
        if (segments[1] && translations[segments[1]]) {
          segments[1] = lang;
          const newPath = segments.join('/') || `/${lang}`;
          router.push(newPath);
        } else if (pathname === '/') {
          router.push(`/${lang}`);
        }
      }
    }
  }, [pathname, router]);

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
    <LanguageContext.Provider value={{ locale, switchLanguage, setLanguage: switchLanguage, setLocale: switchLanguage, t, localized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
