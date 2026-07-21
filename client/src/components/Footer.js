'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#05070a] text-slate-400 mt-auto border-t border-slate-900">
      {/* Main Footer */}
      <div className="max-w-[1360px] mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <img
              src="/images/logos/Nirbhik-Bangla-Logo-No-Bg.png"
              alt="Nirbhik Bangla"
              className="h-14 w-auto object-contain brightness-125 contrast-125"
            />
          </Link>
          <p className="text-xs leading-relaxed text-slate-400 mb-5">
            পশ্চিমবঙ্গের নির্ভরযোগ্য ডিজিটাল নিউজ পোর্টাল। আসানসোল, দুর্গাপুর ও পশ্চিম বর্ধমানের সর্বশেষ খবর, ব্রেকিং নিউজ, রাজনীতি, খেলাধুলা, বিনোদন - সব এক জায়গায়।
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
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">দ্রুত লিঙ্ক</h3>
          <ul className="space-y-2 text-xs">
            {[
              { label: 'পশ্চিম বর্ধমান', href: '/category/paschim-bardhaman' },
              { label: 'আসানসোল', href: '/category/asansol' },
              { label: 'দুর্গাপুর', href: '/category/durgapur' },
              { label: 'রাজ্য', href: '/category/rajya' },
              { label: 'দেশ', href: '/category/desh' },
              { label: 'বিশ্ব', href: '/category/biswa' },
              { label: 'খেলা', href: '/category/khela' },
              { label: 'বিনোদন', href: '/category/binodon' },
            ].map(item => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">যোগাযোগ</h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="shrink-0 text-[#d70b18] mt-0.5" />
              <span>আসানসোল, পশ্চিম বর্ধমান,<br />পশ্চিমবঙ্গ, ভারত</span>
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
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">নিউজলেটার</h3>
          <p className="text-xs text-slate-400 mb-4">প্রতিদিনের প্রধান সংবাদ সরাসরি আপনার ইমেইলে পান।</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('ধন্যবাদ! আপনি নিউজলেটার সাবস্ক্রাইব করেছেন।'); }} className="flex rounded overflow-hidden">
            <input
              type="email"
              required
              placeholder="আপনার ইমেইল লিখুন"
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
          <span>© ২০২৪ নির্ভীক বাংলা। সর্বস্বত্ব সংরক্ষিত।</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">গোপনীয়তা নীতি</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">ব্যবহারের শর্তাবলী</Link>
            <Link href="/advertise" className="hover:text-slate-300 transition-colors">বিজ্ঞাপন দিন</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
