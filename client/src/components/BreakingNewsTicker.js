'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const items = [
  { text: 'কলকাতা মেট্রোর নতুন রুটের সূচনা', href: '#' },
  { text: 'পশ্চিমবঙ্গে ভারী বৃষ্টির সতর্কতা', href: '#' },
  { text: 'মুখ্যমন্ত্রীর নতুন প্রকল্প ঘোষণা', href: '#' },
  { text: 'বিশ্বকাপে ভারতের বড় জয়', href: '#' },
];

export default function BreakingNewsTicker() {
  const pathname = usePathname();

  // Hide news ticker on post details page
  if (pathname?.includes('/news/') || pathname?.includes('/article/')) {
    return null;
  }
  return (
    <div className="bg-white border-b border-slate-200 py-1.5 px-3 md:px-4">
      <div className="mx-auto flex max-w-[1360px] items-center gap-2.5 rounded-lg border border-slate-200/80 bg-white p-1 shadow-2xs">
        {/* Red Breaking News Badge */}
        <div className="flex h-7 shrink-0 items-center gap-1 bg-[#d70b18] px-3 text-xs font-black text-white rounded-md">
          <span>ব্রেকিং নিউজ</span>
          <Zap size={13} fill="white" className="text-white shrink-0 animate-pulse" />
        </div>

        {/* Marquee Continuous Scrolling Container */}
        <div className="flex h-7 min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex items-center gap-6 text-xs font-bold text-slate-800">
            {[...items, ...items, ...items, ...items].map((item, index) => (
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
          <button className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800 transition-colors">
            <ChevronLeft size={13} />
          </button>
          <button className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800 transition-colors">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
