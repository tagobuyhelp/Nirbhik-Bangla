'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:5000';

export default function ClientProviders({ children }) {
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
