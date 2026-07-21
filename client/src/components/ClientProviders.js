'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
