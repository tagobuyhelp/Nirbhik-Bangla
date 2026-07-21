'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { Suspense } from 'react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  const results = [
    {
      id: 's1',
      slug: 'search-result-1',
      title: `${query} সংক্রান্ত সর্বশেষ খবর ও আপডেট`,
      time: '২৪ মে ২০২৪',
      summary: 'সাম্প্রতিক পাওয়া তথ্যানুযায়ী খবরটির বিস্তারিত বিশ্লেষণ পাওয়া গেছে।',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 's2',
      slug: 'search-result-2',
      title: `${query} নিয়ে প্রশাসনের জরুরি বৈঠক ও সিদ্ধান্ত`,
      time: '২৪ মে ২০২৪',
      summary: 'জেলা প্রশাসনের শীর্ষ আধিকারিকদের উপস্থিতিতে পর্যালোচনা বৈঠক সম্পন্ন হয়।',
      image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="bg-slate-50 py-8 min-h-screen text-slate-900">
      <div className="mx-auto max-w-[1000px] px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#d70b18] mb-6">
          <ArrowLeft size={16} /> হোমপেজে ফিরে যান
        </Link>

        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm mb-6 flex items-center gap-3">
          <Search size={24} className="text-[#d70b18]" />
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">অনুসন্ধানের ফলাফল</span>
            <h1 className="text-xl font-black text-slate-900">"{query}"</h1>
          </div>
        </div>

        <div className="space-y-4">
          {results.map((item) => (
            <Link key={item.id} href={`/news/${item.slug}`} className="flex flex-col sm:flex-row gap-4 p-4 rounded border border-slate-200 bg-white hover:shadow transition-all group">
              <img src={item.image} alt="" className="h-32 w-full sm:w-48 rounded object-cover bg-slate-100 shrink-0" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-[#d70b18] transition-colors">{item.title}</h2>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2">{item.summary}</p>
                </div>
                <p className="mt-3 text-[10px] font-semibold text-slate-500">{item.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-600">লোড হচ্ছে...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
