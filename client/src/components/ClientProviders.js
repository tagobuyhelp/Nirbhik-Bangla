'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const getSocketUrl = () => {
  if (process.env.NEXT_PUBLIC_SOCKET_URL) return process.env.NEXT_PUBLIC_SOCKET_URL;
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL.replace('/api/v1', '');
  if (typeof window !== 'undefined') return window.location.origin;
  return 'http://localhost:5000';
};

export default function ClientProviders({ children }) {
  useEffect(() => {
    const socket = io(getSocketUrl(), {
      path: '/socket.io/',
      transports: ['websocket', 'polling'],
      secure: true,
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
