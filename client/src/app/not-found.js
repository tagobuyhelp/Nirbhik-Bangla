'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Search, ArrowLeft, Newspaper, AlertCircle, Sparkles } from 'lucide-react';

const popularCategories = [
  { label: 'ব্রেকিং নিউজ', href: '/category/breaking' },
  { label: 'পশ্চিম বর্ধমান', href: '/category/paschim-bardhaman' },
  { label: 'আসানসোল', href: '/category/asansol' },
  { label: 'দুর্গাপুর', href: '/category/durgapur' },
  { label: 'রাজনীতি', href: '/category/rajniti' },
  { label: 'খেলা', href: '/category/khela' },
];

export default function NotFound() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#f8fafc] flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full text-center">

        {/* 404 Visual Badge */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <span className="text-8xl md:text-9xl font-black text-slate-200 tracking-wider select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#d70b18] text-white flex items-center justify-center shadow-xl shadow-red-500/20 border-4 border-white animate-pulse">
              <AlertCircle size={42} />
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          ক্ষমা করবেন! পৃষ্ঠাটি পাওয়া যায়নি
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
          আপনি যে লিঙ্কটি খুঁজছেন তা হয়তো সরানো হয়েছে, মুছে ফেলা হয়েছে অথবা ইউআরএলটি (URL) ভুল লেখা হয়েছে।
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8 relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="কাঙ্ক্ষিত খবরটি খুঁজতে এখানে টাইপ করুন..."
            className="w-full h-12 pl-4 pr-12 text-sm text-slate-800 bg-white border border-slate-300 rounded-xl shadow-xs outline-none focus:border-[#d70b18] focus:ring-2 focus:ring-red-100 transition-all placeholder:text-slate-400 font-medium"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-[#d70b18] hover:bg-[#b90813] text-white rounded-lg flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
          <Link
            href="/"
            className="px-6 py-3 bg-[#d70b18] hover:bg-[#b90813] text-white rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Home size={18} />
            <span>প্রধান পাতায় ফিরে যান</span>
          </Link>
          <Link
            href="/category/latest"
            className="px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Newspaper size={18} className="text-[#d70b18]" />
            <span>সর্বশেষ খবর দেখুন</span>
          </Link>
        </div>

        {/* Quick Category Chips */}
        <div className="border-t border-slate-200/80 pt-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            জনপ্রিয় বিভাগসমূহ
          </p>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {popularCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="px-3.5 py-1.5 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-700 hover:text-[#d70b18] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
