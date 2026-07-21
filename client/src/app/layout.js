import { Hind_Siliguri, Inter } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const hindSiliguri = Hind_Siliguri({
  variable: '--font-bangla',
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'নির্ভীক বাংলা | Nirbhik Bangla',
    template: '%s | Nirbhik Bangla',
  },
  description: 'নির্ভীক বাংলা - পশ্চিম বর্ধমান, আসানসোল, দুর্গাপুর সহ সমগ্র পশ্চিমবঙ্গের বিশ্বস্ত ডিজিটাল সংবাদ মাধ্যম।',
  applicationName: 'Nirbhik Bangla',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Nirbhik Bangla Team' }],
  creator: 'Nirbhik Bangla',
  publisher: 'Nirbhik Bangla',
  icons: {
    icon: '/images/logos/Nirbhik-Bangla-Icon.png',
    shortcut: '/images/logos/Nirbhik-Bangla-Icon.png',
    apple: '/images/logos/Nirbhik-Bangla-Icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#090d16',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 antialiased flex flex-col">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
