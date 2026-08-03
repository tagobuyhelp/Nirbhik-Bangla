'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Cookie, Info } from 'lucide-react';

export default function CookiesPolicyPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-outfit">
      <div className="max-w-[1000px] mx-auto bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
        
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-[#eb1c24] font-extrabold text-xs uppercase tracking-wider">
            <Cookie size={18} />
            <span>Cookies & Web Tracking Policy</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Cookies Policy - Nirbhik Bangla
          </h1>
          <p className="text-slate-400 text-xs font-mono">Last Updated: August 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your browser or device when you visit <strong>Nirbhik Bangla (nirbhikbangla.com)</strong>. They help the website remember your preferences, language choices, and improve your overall browsing experience.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">2. How We Use Cookies</h2>
          <p>Nirbhik Bangla uses cookies for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-1 font-medium">
            <li><strong>Essential Cookies:</strong> Necessary for core site functionality, language switching, and secure authentication.</li>
            <li><strong>Analytics Cookies:</strong> Powered by Google Analytics 4 to understand reader traffic patterns and popular news topics.</li>
            <li><strong>Advertising & Third-Party Cookies:</strong> Used by Google AdSense to serve relevant advertisements based on user interests and non-personally identifiable visit history.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">3. Google DoubleClick DART Cookies</h2>
          <p>
            Google, as a third-party vendor, uses DART cookies to serve ads on our site based on users' visits to nirbhikbangla.com and other websites across the Internet. Users may opt out of the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">4. Managing Your Cookie Preferences</h2>
          <p>
            You can control or disable cookies through your browser settings at any time. Please note that disabling essential cookies may impact certain interactive features on our portal.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-4">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">5. Contact Us</h2>
          <p>
            If you have any questions regarding our Cookie Policy, please contact our support desk:
          </p>
          <p className="font-bold text-slate-900">
            Email: nirvikbanglaportal@gmail.com | Phone: 033-68288835 | Address: NH19, ASANSOL, KALIPHARI, PASCHIM BURDWAN, WEST BENGAL, PIN 713303 (Editor: AMAR DEB)
          </p>
        </section>

      </div>
    </div>
  );
}
