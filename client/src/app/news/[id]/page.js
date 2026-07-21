'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  CalendarDays,
  CircleUserRound,
  Eye,
  Share2,
  ThumbsUp,
} from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.id || 'news';

  // Demo article data
  const article = {
    title: 'কলকাতায় আগামী ৩ দিন ভারী বৃষ্টির সম্ভাবনা, সতর্ক বার্তা দিল আবহাওয়া দপ্তর',
    category: 'আবহাওয়া',
    author: 'বিশেষ প্রতিনিধি',
    date: '২৪ মে ২০২৪, ১০:৩০ AM',
    views: '১,৪২০',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=85',
    content: [
      'কলকাতা ও আশেপাশের জেলাগুলিতে আগামী ৩ দিন ভারী থেকে অতি ভারী বৃষ্টির পূর্বাভাস দিল আবহাওয়া দপ্তর। দক্ষিণবঙ্গের একাধিক জেলায় হলুদ সতর্কবার্তা জারি করা হয়েছে।',
      'আবহাওয়াবিদদের মতে, বঙ্গোপসাগরে তৈরি হওয়া গভীর নিম্নচাপের কারণেই এই টানা বৃষ্টিপাতের সম্ভাবনা তৈরি হয়েছে। সমুদ্র উপকূলবর্তী অঞ্চলগুলিতে ঘন্টায় ৪০-৫০ কিমি বেগে ঝোড়ো হাওয়া বইতে পারে।',
      'মৎস্যজীবীদের আগামী তিন দিন সমুদ্রে না যাওয়ার পরামর্শ দেওয়া হয়েছে। আসানসোল, দুর্গাপুর ও পশ্চিম বর্ধমানের নিম্নাঞ্চলগুলিতে জল জমার আশঙ্কা প্রকাশ করা হয়েছে।',
    ],
  };

  return (
    <div className="bg-slate-50 py-8 min-h-screen text-slate-900">
      <div className="mx-auto max-w-[1000px] px-4">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#d70b18] mb-6">
          <ArrowLeft size={16} /> হোমপেজে ফিরে যান
        </Link>

        {/* Article Container */}
        <article className="rounded border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          {/* Tag & Title */}
          <span className="inline-block rounded bg-[#d70b18] px-3 py-1 text-xs font-black text-white uppercase mb-4">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-black leading-tight text-slate-900 mb-4">
            {article.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between border-y border-slate-100 py-3 text-xs text-slate-500 mb-6 gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <CircleUserRound size={15} /> {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} /> {article.date}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-semibold">
                <Eye size={15} /> {article.views} পঠিত
              </span>
              <button className="flex items-center gap-1 text-[#d70b18] font-bold hover:underline" aria-label="Share">
                <Share2 size={15} /> শেয়ার করুন
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="mb-6 overflow-hidden rounded bg-slate-100">
            <img src={article.image} alt={article.title} className="w-full h-auto max-h-[500px] object-cover" />
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-slate-800 font-normal">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Interaction Bar */}
          <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-4">
            <button className="flex items-center gap-2 rounded bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-[#d70b18] hover:text-white transition-colors">
              <ThumbsUp size={16} /> পছন্দ হয়েছে
            </button>
            <button className="flex items-center gap-2 rounded bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors">
              <Share2 size={16} /> সোশ্যাল মিডিয়ায় শেয়ার করুন
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
