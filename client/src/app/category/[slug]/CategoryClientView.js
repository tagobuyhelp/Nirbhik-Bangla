'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react';

const categoryNames = {
  'paschim-bardhaman': 'পশ্চিম বর্ধমান',
  'asansol': 'আসানসোল',
  'durgapur': 'দুর্গাপুর',
  'rajya': 'রাজ্য',
  'desh': 'দেশ',
  'biswa': 'বিশ্ব',
  'khela': 'খেলা',
  'binodon': 'বিনোদন',
  'lifestyle': 'লাইফস্টাইল',
  'projukti': 'প্রযুক্তি',
  'video': 'ভিডিও',
  'breaking': 'ব্রেকিং নিউজ',
  'latest': 'সর্বশেষ খবর',
  'popular': 'জনপ্রিয় খবর',
};

const demoCategoryNews = [
  {
    id: 1,
    slug: 'paschim-bardhaman-new-industrial-park-500-crore',
    title: 'পশ্চিম বর্ধমানে ৫০০ কোটি টাকা ব্যয়ে মেগা শিল্প পার্ক নির্মাণ',
    excerpt: 'জেলা প্রশাসনের বিশেষ উদ্যোগে দুর্গাপুর ও আসানসোলের মধ্যবর্তী স্থানে নতুন ক্ষুদ্র ও মাঝারি শিল্প হাব...',
    date: '২৪ মে ২০২৪',
    timeAgo: '২ ঘণ্টা আগে',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    slug: 'kolkata-heavy-rain-alert',
    title: 'কলকাতায় আগামী ৩ দিন ভারী বৃষ্টির সম্ভাবনা',
    excerpt: 'আবহাওয়া দপ্তরের পূর্বাভাস, দক্ষিণবঙ্গের একাধিক জেলায় ভারী বৃষ্টিপাতের সতর্কতা জারি করেছে...',
    date: '২৪ মে ২০২৪',
    timeAgo: '৪ ঘণ্টা আগে',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    slug: 'lok-sabha-vote-result',
    title: 'লোকসভা ভোটের ফল ঘোষণা আজ, কড়া নিরাপত্তার প্রস্তুতি',
    excerpt: 'সারাদেশে সকাল ৮টা থেকে শুরু হবে ভোট গণনা, নিরাপত্তার চাদরে মোড়া কেন্দ্রসমূহ...',
    date: '২৪ মে ২০২৪',
    timeAgo: '৬ ঘণ্টা আগে',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
  },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug || 'latest';
  const categoryTitle = categoryNames[slug] || slug;

  return (
    <div className="bg-slate-50 py-8 min-h-screen text-slate-900">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#d70b18] mb-6">
          <ArrowLeft size={16} /> হোমপেজে ফিরে যান
        </Link>

        {/* Category Header */}
        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#d70b18]">ক্যাটাগরি</span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">{categoryTitle}</h1>
          </div>
          <span className="rounded bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {demoCategoryNews.length} টি খবর
          </span>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoCategoryNews.map((item) => (
            <Link key={item.id} href={`/news/${item.slug}`} className="group overflow-hidden rounded border border-slate-200 bg-white shadow-xs hover:shadow transition-all flex flex-col">
              <div className="h-[200px] w-full bg-slate-100 overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#d70b18] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-slate-400 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1"><CalendarDays size={13} /> {item.date}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {item.timeAgo}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
