import { Tiro_Bangla, Inter } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const tiroBangla = Tiro_Bangla({
  variable: '--font-bangla',
  subsets: ['bengali', 'latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
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
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logos/Nirbhik-Bangla-Icon.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/logos/Nirbhik-Bangla-Icon.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/logos/Nirbhik-Bangla-Icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/logos/Nirbhik-Bangla-Icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/images/logos/Nirbhik-Bangla-Icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#090d16',
};

import PushNotificationPrompt from '@/components/PushNotificationPrompt';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export default function RootLayout({ children }) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="bn" suppressHydrationWarning className={`${tiroBangla.variable} ${inter.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4059248504896664"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          type="application/javascript"
          src="https://news.google.com/swg/js/v1/swg-basic.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
                basicSubscriptions.init({
                  type: "NewsArticle",
                  isPartOfType: ["Product"],
                  isPartOfProductId: "CAoww8bHDA:openaccess",
                  clientOptions: { theme: "light", lang: "bn" },
                });
              });
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased flex flex-col">
        <ClientProviders>
          {children}
          <PushNotificationPrompt />
        </ClientProviders>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
      </body>
    </html>
  );
}
