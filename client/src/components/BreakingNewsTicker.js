'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { API_BASE_URL } from '@/utils/config';

const defaultItems = [
  { text: 'আন্তর্জাতিক যুব দিবস ২০২৬ উপলক্ষ্যে বিএসএফের ১৫ কিলোমিটার সাইকেল র‍যেলি', href: '#' },
  { text: 'আসানসোলে বিজেপির গুরুত্বপূর্ণ বৈঠক ও সংগঠন প্রসারের উদ্যোগ', href: '#' },
  { text: 'পশ্চিম বর্ধমানে পরিকাঠামো উন্নয়ন ও যানজট নিরসনের নতুন পরিকল্পনা', href: '#' },
];

export default function BreakingNewsTicker() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const [tickerItems, setTickerItems] = useState(defaultItems);

  useEffect(() => {
    fetch(`${API_BASE_URL}/public/news?lang=${locale}&limit=8`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((art) => ({
            text: art.title,
            href: `/${locale}/news/${art.slug}`,
          }));
          setTickerItems(mapped);
        }
      })
      .catch((err) => console.log('Breaking news API error, using default items:', err));
  }, [locale]);

  // Hide news ticker on post details page
  if (pathname?.includes('/news/') || pathname?.includes('/article/')) {
    return null;
  }

  const itemsToRender = tickerItems.length > 0 ? tickerItems : defaultItems;
  const repeatedItems = [...itemsToRender, ...itemsToRender];

  return (
    <div className="bg-white border-b border-slate-200 py-1.5 px-3 md:px-4">
      <div className="mx-auto flex max-w-[1360px] items-center gap-2.5 rounded-lg border border-slate-200/80 bg-white p-1 shadow-2xs">
        {/* Red Breaking News Badge */}
        <div className="flex h-7 shrink-0 items-center gap-1.5 bg-[#d70b18] px-3 text-xs font-black text-white rounded-md whitespace-nowrap">
          <span>{t('home.breaking_news') || (locale === 'en' ? 'Breaking News' : locale === 'hi' ? 'ब्रेकिंग न्यूज़' : 'ব্রেকিং নিউজ')}</span>
          <Zap size={13} fill="white" className="text-white shrink-0 animate-pulse" />
        </div>

        {/* Marquee Continuous Scrolling Container */}
        <div className="flex h-7 min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex items-center gap-6 text-xs font-bold text-slate-800">
            {repeatedItems.map((item, index) => (
              <Link
                key={`${item.text}-${index}`}
                href={item.href}
                className="inline-flex items-center gap-2 hover:text-[#d70b18] transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#d70b18] shrink-0" />
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Ticker Controls */}
        <div className="hidden md:flex items-center gap-1 shrink-0 pl-1 border-l border-slate-200">
          <button className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800 transition-colors" aria-label="Previous breaking news">
            <ChevronLeft size={13} />
          </button>
          <button className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800 transition-colors" aria-label="Next breaking news">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

