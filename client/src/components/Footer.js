'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { locale } = useLanguage();

  const aboutText = locale === 'en'
    ? 'West Bengal’s reliable digital news portal. Latest news, breaking updates, politics, sports, entertainment from Asansol, Durgapur, and Paschim Bardhaman - all in one place.'
    : locale === 'hi'
    ? 'पश्चिम बंगाल का विश्वसनीय डिजिटल समाचार पोर्टल। आसनसोल, दुर्गापुर और पश्चिम बर्धमान की ताज़ा ख़बरें, ब्रेकिंग न्यूज़, राजनीति, खेल, मनोरंजन - सब एक जगह।'
    : 'পশ্চিমবঙ্গের নির্ভরযোগ্য ডিজিটাল নিউজ পোর্টাল। আসানসোল, দুর্গাপুর ও পশ্চিম বর্ধমানের সর্বশেষ খবর, ব্রেকিং নিউজ, রাজনীতি, খেলাধুলা, বিনোদন - সব এক জায়গায়।';

  const quickLinksTitle = locale === 'en' ? 'Quick Links' : locale === 'hi' ? 'त्वरित लिंक' : 'দ্রুত লিঙ্ক';
  const contactTitle = locale === 'en' ? 'Contact' : locale === 'hi' ? 'संपर्क' : 'যোগাযোগ';
  const newsletterTitle = locale === 'en' ? 'Newsletter' : locale === 'hi' ? 'न्यूज़लेटर' : 'নিউজলেটার';
  const newsletterSub = locale === 'en' ? 'Get daily top news delivered directly to your inbox.' : locale === 'hi' ? 'दैनिक मुख्य समाचार सीधे अपने ईमेल में प्राप्त करें।' : 'প্রতিদিনের প্রধান সংবাদ সরাসরি আপনার ইমেইলে পান।';
  const emailPlaceholder = locale === 'en' ? 'Enter your email' : locale === 'hi' ? 'अपना ईमेल दर्ज करें' : 'আপনার ইমেইল লিখুন';
  const addressText = locale === 'en' ? 'Asansol, Paschim Bardhaman,\nWest Bengal, India' : locale === 'hi' ? 'आसनसोल, पश्चिम बर्धमान,\nपश्चिम बंगाल, भारत' : 'আসানসোল, পশ্চিম বর্ধমান,\nপশ্চিমবঙ্গ, ভারত';
  const copyrightText = locale === 'en' ? '© 2026 Nirbhik Bangla. All rights reserved.' : locale === 'hi' ? '© 2026 निर्भीक बांग्ला। सर्वाधिकार सुरक्षित।' : '© ২০২৬ নির্ভীক বাংলা। সর্বস্বত্ব সংরক্ষিত।';
  const privacyText = locale === 'en' ? 'Privacy Policy' : locale === 'hi' ? 'गोपनीयता नीति' : 'গোপনীয়তা নীতি';
  const termsText = locale === 'en' ? 'Terms of Use' : locale === 'hi' ? 'उपयोग की शर्तें' : 'ব্যবহারের শর্তাবলী';
  const advertiseText = locale === 'en' ? 'Advertise' : locale === 'hi' ? 'विज्ञापन दें' : 'বিজ্ঞাপন দিন';

  const quickLinks = [
    { label: locale === 'en' ? 'Paschim Bardhaman' : locale === 'hi' ? 'पश्चिम बर्धमान' : 'পশ্চিম বর্ধমান', href: '/category/paschim-bardhaman' },
    { label: locale === 'en' ? 'Asansol' : locale === 'hi' ? 'आसनसोल' : 'আসানসোল', href: '/category/asansol' },
    { label: locale === 'en' ? 'Durgapur' : locale === 'hi' ? 'दुर्गापुर' : 'দুর্গাপুর', href: '/category/durgapur' },
    { label: locale === 'en' ? 'State' : locale === 'hi' ? 'राज्य' : 'রাজ্য', href: '/category/rajya' },
    { label: locale === 'en' ? 'National' : locale === 'hi' ? 'देश' : 'দেশ', href: '/category/desh' },
    { label: locale === 'en' ? 'World' : locale === 'hi' ? 'विश्व' : 'বিশ্ব', href: '/category/biswa' },
    { label: locale === 'en' ? 'Sports' : locale === 'hi' ? 'खेल' : 'খেলা', href: '/category/khela' },
    { label: locale === 'en' ? 'Entertainment' : locale === 'hi' ? 'मनোরঞ্জন' : 'বিনোদন', href: '/category/binodon' },
  ];

  return (
    <footer className="w-full bg-[#05070a] text-slate-400 mt-auto border-t border-slate-900">
      {/* Main Footer */}
      <div className="max-w-[1360px] mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <Link href={`/${locale}`} className="inline-block mb-4">
            <img
              src="/images/logos/Nirbhik-Bangla-Logo-No-Bg.png"
              alt="Nirbhik Bangla"
              className="h-14 w-auto object-contain brightness-125 contrast-125"
            />
          </Link>
          <p className="text-xs leading-relaxed text-slate-400 mb-5">
            {aboutText}
          </p>
          <div className="flex items-center gap-3">
            {[
              { label: 'Facebook', short: 'f', href: 'https://facebook.com' },
              { label: 'YouTube', short: '▶', href: 'https://youtube.com' },
              { label: 'Twitter', short: '𝕏', href: 'https://twitter.com' },
              { label: 'Instagram', short: '◎', href: 'https://instagram.com' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white/70 text-xs font-bold transition-all hover:text-white hover:bg-[#d70b18]"
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">{quickLinksTitle}</h3>
          <ul className="space-y-2 text-xs">
            {quickLinks.map(item => (
              <li key={item.label}>
                <Link href={`/${locale}${item.href}`} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">{contactTitle}</h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="shrink-0 text-[#d70b18] mt-0.5" />
              <span className="whitespace-pre-line">{addressText}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-[#d70b18]" />
              <span>+৯১ ৯৮৭৬৫ ৪৩Mj১০</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-[#d70b18]" />
              <span>contact@nirbhikbangla.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">{newsletterTitle}</h3>
          <p className="text-xs text-slate-400 mb-4">{newsletterSub}</p>
          <form onSubmit={(e) => { e.preventDefault(); alert(locale === 'en' ? 'Thank you for subscribing!' : locale === 'hi' ? 'न्यूज़लेटर की सदस्यता लेने के लिए धन्यवाद!' : 'ধন্যবাদ! আপনি নিউজলেটার সাবস্ক্রাইব করেছেন।'); }} className="flex rounded overflow-hidden">
            <input
              type="email"
              required
              placeholder={emailPlaceholder}
              className="flex-1 px-3 py-2 text-xs bg-white/5 text-white outline-none placeholder:text-slate-500 border border-slate-800 rounded-l"
            />
            <button
              type="submit"
              className="px-3.5 bg-[#d70b18] flex items-center justify-center text-white font-bold text-xs hover:bg-red-700 transition-colors shrink-0"
              aria-label="Subscribe"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-[#030406]">
        <div className="max-w-[1360px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>{copyrightText}</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">{privacyText}</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">{termsText}</Link>
            <Link href="/advertise" className="hover:text-slate-300 transition-colors">{advertiseText}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
