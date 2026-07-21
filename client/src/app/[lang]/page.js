'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bookmark,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clapperboard,
  Clock,
  Cpu,
  Eye,
  Factory,
  Globe2,
  Landmark,
  Mail,
  Map,
  Play,
  Sparkles,
  TrendingUp,
  Trophy,
} from 'lucide-react';

const desktopCategories = [
  { label: 'পশ্চিম বর্ধমান', count: '১৫২৩ খবর', icon: Landmark, color: '#d70b18', slug: 'paschim-bardhaman' },
  { label: 'আসানসোল', count: '৯২৩ খবর', icon: Factory, color: '#f59e0b', slug: 'asansol' },
  { label: 'দুর্গাপুর', count: '৭৫৪ খবর', icon: Landmark, color: '#2878d8', slug: 'durgapur' },
  { label: 'রাজ্য', count: '২৪৫৬ খবর', icon: Map, color: '#45a647', slug: 'rajya' },
  { label: 'দেশ', count: '৫২৩৪ খবর', icon: Landmark, color: '#7c3aed', slug: 'desh' },
  { label: 'বিশ্ব', count: '২৩৪১ খবর', icon: Globe2, color: '#1d7ed8', slug: 'biswa' },
  { label: 'খেলা', count: '১৮৪২ খবর', icon: Trophy, color: '#e3262e', slug: 'khela' },
  { label: 'বিনোদন', count: '৮২৩ খবর', icon: Clapperboard, color: '#f05b98', slug: 'binodon' },
];

const mobileTopCategories = [
  { label: 'পশ্চিম বর্ধমান', icon: Landmark, color: '#d70b18', slug: 'paschim-bardhaman' },
  { label: 'আসানসোল', icon: Factory, color: '#f59e0b', slug: 'asansol' },
  { label: 'দুর্গাপুর', icon: Building2, color: '#2878d8', slug: 'durgapur' },
  { label: 'রাজনীতি', icon: Landmark, color: '#dc2626', slug: 'rajniti' },
  { label: 'পশ্চিমবঙ্গ', icon: Map, color: '#16a34a', slug: 'rajya' },
  { label: 'ভারত', icon: Map, color: '#2563eb', slug: 'desh' },
  { label: 'আন্তর্জাতিক', icon: Globe2, color: '#0284c7', slug: 'biswa' },
  { label: 'খেলা', icon: Trophy, color: '#e11d48', slug: 'khela' },
  { label: 'বিনোদন', icon: Clapperboard, color: '#db2777', slug: 'binodon' },
  { label: 'অর্থনীতি', icon: TrendingUp, color: '#059669', slug: 'arthaniti' },
  { label: 'লাইফস্টাইল', icon: Sparkles, color: '#7c3aed', slug: 'lifestyle' },
  { label: 'প্রযুক্তি', icon: Cpu, color: '#0891b2', slug: 'tech' },
];

const fallbackHeroSlides = [
  {
    slug: 'kolkata-heavy-rain-alert',
    title: 'কলকাতায় আগামী ৩ দিন ভারী বৃষ্টির সতর্কতা',
    excerpt: 'আবহাওয়া দপ্তরের পূর্বাভাস, দক্ষিণবঙ্গের একাধিক জেলায় বজ্রবিদ্যুৎসহ ভারী বৃষ্টির সম্ভাবনা রয়েছে!',
    author: 'নিজস্ব সংবাদদাতা',
    timeAgo: '২ ঘণ্টা আগে',
    views: '১২.৪K ভিউ',
    publishedAt: '২৪ মে ২০২৪, ১০:৩০ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'paschim-bardhaman-new-industrial-park-500-crore',
    title: 'পশ্চিম বর্ধমানে ৫০০ কোটি টাকা ব্যয়ে মেগা শিল্প পার্ক নির্মাণ',
    excerpt: 'জেলা প্রশাসনের বিশেষ উদ্যোগে দুর্গাপুর ও আসানসোলের মধ্যবর্তী স্থানে নতুন ক্ষুদ্র ও মাঝারি শিল্প হাব...',
    author: 'বিশেষ প্রতিনিধি',
    timeAgo: '৪ ঘণ্টা আগে',
    views: '৮.৫K ভিউ',
    publishedAt: '২৪ মে ২০২৪, ১১:১৫ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85',
  },
];

const fallbackLatest = [
  {
    slug: 'lok-sabha-vote-result',
    categoryName: 'দেশ',
    title: 'লোকসভা ভোটের ফল ঘোষণা আজ, কড়া নিরাপত্তার প্রস্তুতি',
    time: '২৪ মে ২০২৪, ০৯:১৫ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=300&q=80',
  },
  {
    slug: 'cm-new-project-announcement',
    categoryName: 'পশ্চিমবঙ্গ',
    title: 'প্রধানমন্ত্রীর নতুন প্রকল্পে মিলবে ১০ লক্ষ টাকা পর্যন্ত সাহায্য',
    time: '২৪ মে ২০২৪, ০৮:৪৫ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=300&q=80',
  },
  {
    slug: 'asansol-accident-update',
    categoryName: 'আবহাওয়া',
    title: 'দক্ষিণবঙ্গে ঝড়-বৃষ্টির সম্ভাবনা, জেলাগুলিতে হলুদ সতর্কতা',
    time: '২৪ মে ২০২৪, ০৮:২০ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80',
  },
  {
    slug: 'finance-minister-budget-next-week',
    categoryName: 'অর্থনীতি',
    title: 'অর্থমন্ত্রী আগামী সপ্তাহে নতুন বাজেট পেশ করবেন',
    time: '২৪ মে ২০২৪, ০৮:১০ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=300&q=80',
  },
  {
    slug: 'ipl-final-kkr-vs-srh',
    categoryName: 'খেলা',
    title: 'আইপিএল ফাইনালে আজ কলকাতা বনাম হায়দরাবাদ',
    time: '২৪ মে ২০২৪, ০৭:৫০ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300&q=80',
  },
  {
    slug: 'gold-price-drop-bengal',
    categoryName: 'ব্যবসা',
    title: 'সোনার দামে স্বস্তি! ভরিতে কমল ৫০০ টাকা',
    time: '২৪ মে ২০২৪, ০৭:২০ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=300&q=80',
  },
  {
    slug: 'railway-vande-bharat-expansion',
    categoryName: 'পরিবহন',
    title: 'হাওড়া থেকে আরও দুটি নতুন বন্দে ভারত এক্সপ্রেস চালু',
    time: '২৪ মে ২০২৪, ০৭:০০ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=300&q=80',
  },
  {
    slug: 'chandrayaan-4-mission-isro',
    categoryName: 'প্রযুক্তি',
    title: 'চন্দ্রযান-৪ মিশন নিয়ে বড় সিদ্ধান্ত নিল ইসরো',
    time: '২৪ মে ২০২৪, ০৬:৪০ AM',
    featuredImageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=300&q=80',
  },
];

const fallbackPopular = [
  { id: 1, title: 'কলকাতা মেট্রোর সময়সূচিতে বদল, জেনে নিন নতুন সময়', date: '২৪ মে ২০২৪', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=200&q=80' },
  { id: 2, title: 'পশ্চিমবঙ্গে নতুন নিয়ম বিনিয়োগ ৬০০০ কোটি টাকা', date: '২৪ মে ২০২৪', img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=200&q=80' },
  { id: 3, title: 'সোনার দামে ফের বড় পরিবর্তন, জানুন আজকের দাম', date: '২৪ মে ২০২৪', img: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=200&q=80' },
  { id: 4, title: 'টিম ইন্ডিয়ার নতুন কোচ হলেন সৌরভ গাঙ্গুলী', date: '২৪ মে ২০২৪', img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=200&q=80' },
  { id: 5, title: 'গরমের হাত থেকে বাঁচতে কিছু সহজ উপায়', date: '২৪ মে ২০২৪', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80' },
];

const fallbackSpecialReports = [
  { slug: 'kolkata-metro-new-route', cat: 'পরিবহন', title: 'কলকাতা মেট্রোর নতুন রুটের সূচনা, জেনে নিন রুট ও সময়সূচি', date: '২৪ মে ২০২৪', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80' },
  { slug: 'kolkata-heavy-rain-alert', cat: 'আবহাওয়া', title: 'পশ্চিমবঙ্গে ভারী বৃষ্টির সতর্কতা, কোন কোন জেলায় অ্যালার্ট', date: '২৪ মে ২০২৪', img: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=400&q=80' },
  { slug: 'cm-new-project-announcement', cat: 'রাজনীতি', title: 'প্রধানমন্ত্রীর বড় ঘোষণা, রাজ্যের উন্নয়নে নতুন পদক্ষেপ', date: '২৪ মে ২০২৪', img: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=400&q=80' },
  { slug: 'ipl-final-match-update', cat: 'খেলা', title: 'আইপিএল ২০২৪ ফাইনালে কলকাতা বনাম হায়দরাবাদ', date: '২৪ মে ২০২৪', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80' },
];

const videoNewsList = [
  { slug: 'kolkata-traffic-special-report', title: 'কলকাতার যানজট নিয়ে বিশেষ প্রতিবেদন', duration: '02:45', img: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=600&q=80' },
  { slug: 'ipl-final-match-preview', title: 'আইপিএল ২০২৪ ফাইনালে কারা মুখোমুখি?', duration: '01:58', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80' },
  { slug: 'cm-speech-update', title: 'প্রধানমন্ত্রীর বড় ঘোষণা, কী বললেন দেখুন', duration: '03:12', img: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=600&q=80' },
];

export default function LanguageHomePage({ params }) {
  const resolvedParams = use(params);
  const lang = resolvedParams?.lang || 'bn';

  const [articles, setArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/public/news?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setArticles(data.data);
        }
      })
      .catch((err) => console.log('API fallback used'));
  }, [lang]);

  const slideList = articles.length > 0 ? articles : fallbackHeroSlides;

  useEffect(() => {
    if (slideList.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideList.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slideList.length]);

  const currentHero = slideList[currentSlide] || slideList[0];

  const toggleBookmark = (slug) => {
    setBookmarked((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 w-full pb-16 md:pb-8">
      {/* ========================================================================= */}
      {/* DESKTOP HOMEPAGE LAYOUT (MD & UP) — EXACT MOCKUP MATCH */}
      {/* ========================================================================= */}
      <div className="hidden md:grid mx-auto max-w-[1360px] grid-cols-12 gap-4 px-3 pt-3 bg-white">
        <main className="col-span-8 space-y-4 min-w-0">
          {/* Main Hero + Latest News 2-Col Grid */}
          <section className="grid grid-cols-12 gap-3">
            {/* Hero Main Feature Card */}
            <article className="relative h-[350px] max-h-[350px] overflow-hidden rounded-lg bg-slate-900 shadow-xs flex flex-col justify-end col-span-8 group">
              <Link href={`/${lang}/news/${currentHero.slug}`} className="absolute inset-0 z-10" />
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out group-hover:scale-105"
                style={{ backgroundImage: `url(${currentHero.featuredImageUrl || currentHero.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

              <div className="relative z-20 p-5 pointer-events-none">
                <span className="mb-2 inline-block rounded bg-[#d70b18] px-2.5 py-0.5 text-[11px] font-black text-white uppercase tracking-wider">
                  প্রধান খবর
                </span>
                <h1 className="text-2xl md:text-3xl font-black leading-snug text-white group-hover:text-red-200 transition-colors drop-shadow-xs">
                  {currentHero.title}
                </h1>
                <p className="mt-1.5 text-xs font-medium leading-relaxed text-white/90 line-clamp-2">
                  {currentHero.excerpt}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-white/80 border-t border-white/10 pt-2.5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5"><CircleUserRound size={14} /> {currentHero.author || 'নিজস্ব সংবাদদাতা'}</span>
                    <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {currentHero.publishedAt || '২৪ মে ২০২৪, ১০:৩০ AM'}</span>
                  </div>

                  <div className="pointer-events-auto flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      {slideList.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-2.5 rounded-full transition-all ${currentSlide === idx ? 'w-5 bg-[#d70b18]' : 'w-2.5 bg-white/50 hover:bg-white'}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 ml-1.5">
                      <button onClick={() => setCurrentSlide((prev) => (prev === 0 ? slideList.length - 1 : prev - 1))} className="p-1 rounded bg-black/40 hover:bg-[#d70b18] text-white transition-colors">
                        <ChevronLeft size={15} />
                      </button>
                      <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slideList.length)} className="p-1 rounded bg-black/40 hover:bg-[#d70b18] text-white transition-colors">
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Latest News Container */}
            <div className="col-span-4 rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs flex flex-col h-[350px] overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d70b18] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d70b18]"></span>
                  </span>
                  <h2 className="text-sm font-extrabold text-slate-900">সর্বশেষ খবর</h2>
                </div>
                <Link href={`/${lang}/category/latest`} className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#d70b18]">
                  সব দেখুন <ArrowRight size={13} className="text-[#d70b18]" />
                </Link>
              </div>

              {/* Smooth Vertical Marquee Auto-Scroll */}
              <div className="flex-1 overflow-hidden relative group">
                <div className="animate-vertical-scroll space-y-2.5">
                  {[...fallbackLatest, ...fallbackLatest].map((item, idx) => (
                    <Link key={idx} href={`/${lang}/news/${item.slug}`} className="flex gap-2.5 items-start group/item border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                      <div className="h-[52px] w-[70px] min-w-[70px] max-w-[70px] overflow-hidden rounded bg-slate-100 shrink-0">
                        <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover/item:scale-105 transition-transform" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black text-[#d70b18] uppercase">{item.categoryName}</span>
                        <h3 className="line-clamp-2 text-xs font-bold text-slate-900 leading-snug group-hover/item:text-[#d70b18] transition-colors">{item.title}</h3>
                        <p className="mt-0.5 text-[9.5px] text-slate-400 font-medium">{item.time}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Categories 8-Grid Section (বিভাগ সমূহ) */}
          <section className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs">
            <h2 className="mb-2.5 text-sm font-extrabold text-slate-900">বিভাগ সমূহ</h2>
            <div className="grid grid-cols-8 gap-2">
              {desktopCategories.map(({ label, count, icon: Icon, color, slug }) => (
                <Link key={label} href={`/${lang}/category/${slug}`} className="flex h-22 flex-col items-center justify-center rounded border border-slate-200/80 bg-white text-center shadow-2xs hover:border-[#d70b18] hover:shadow-xs transition-all group">
                  <Icon size={24} color={color} strokeWidth={2.2} className="group-hover:scale-110 transition-transform" />
                  <span className="mt-1.5 text-[11px] font-extrabold text-slate-900">{label}</span>
                  <span className="text-[9px] text-slate-500 font-semibold mt-0.5">{count}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Special Reports 4-Col Section (বিশেষ প্রতিবেদন) */}
          <section className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <h2 className="text-sm font-extrabold text-slate-900">বিশেষ প্রতিবেদন</h2>
              <Link href={`/${lang}/category/special-report`} className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#d70b18]">
                সব দেখুন <ArrowRight size={13} className="text-[#d70b18]" />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {fallbackSpecialReports.map((item, idx) => (
                <Link key={idx} href={`/${lang}/news/${item.slug}`} className="group flex flex-col overflow-hidden rounded-md border border-slate-100 bg-white shadow-2xs hover:shadow-md transition-all">
                  <div className="h-[115px] w-full overflow-hidden bg-slate-100 relative shrink-0">
                    <img src={item.img} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-1.5 left-1.5 rounded bg-[#d70b18] px-1.5 py-0.5 text-[9px] font-black text-white uppercase">
                      {item.cat}
                    </span>
                  </div>
                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <h3 className="line-clamp-2 text-xs font-bold text-slate-900 leading-snug group-hover:text-[#d70b18] transition-colors">
                      {item.title}
                    </h3>
                    <span className="mt-2 text-[9.5px] font-semibold text-slate-400">{item.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="col-span-4 space-y-4">
          {/* Live TV Widget */}
          <div className="rounded-lg bg-[#07090c] p-3.5 text-white shadow-xs">
            <div className="mb-2.5 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-white">লাইভ টিভি</h2>
              <Link href={`/${lang}/live`} className="flex items-center gap-1 text-xs font-bold text-white/80 hover:text-red-400 transition-colors">
                সব দেখুন <ArrowRight size={13} className="text-[#d70b18]" />
              </Link>
            </div>
            <div className="relative h-[165px] w-full overflow-hidden rounded border border-white/10 bg-[#121826] group shrink-0">
              <img src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=640&q=80" alt="" className="h-full w-full object-cover opacity-40 group-hover:scale-105 transition-transform" />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                LIVE • 1.2K
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                <div className="mb-1 text-base font-black tracking-widest text-white">NIRBHIK BANGLA</div>
                <Link href={`/${lang}/live`} className="my-1.5 grid h-10 w-12 place-items-center rounded bg-[#d70b18] text-white hover:bg-red-700 transition-colors shadow-lg">
                  <Play size={20} fill="white" className="ml-0.5" />
                </Link>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2.5 text-xs">
              <div>
                <h3 className="font-bold text-white">Nirbhik Bangla Live</h3>
                <p className="text-[9.5px] text-white/70">24x7 Bengali News Channel</p>
              </div>
              <Link href={`/${lang}/live`} className="rounded bg-[#d70b18] px-3 py-1 text-[11px] font-extrabold text-white hover:bg-red-700 transition-colors">
                এখনই দেখুন
              </Link>
            </div>
          </div>

          {/* Popular News Widget */}
          <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
              <h2 className="text-sm font-extrabold text-slate-900">জনপ্রিয় খবর</h2>
              <Link href={`/${lang}/category/popular`} className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#d70b18]">
                সব দেখুন <ArrowRight size={13} className="text-[#d70b18]" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {fallbackPopular.map((item) => (
                <Link key={item.id} href="/news/kolkata-metro-new-route" className="flex items-center gap-2.5 group border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded bg-[#d70b18] text-[11px] font-black text-white">
                    0{item.id}
                  </span>
                  <div className="h-[46px] w-[58px] min-w-[58px] max-w-[58px] overflow-hidden rounded bg-slate-100 shrink-0">
                    <img src={item.img} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-xs font-bold text-slate-900 group-hover:text-[#d70b18] transition-colors leading-tight">{item.title}</h3>
                    <p className="mt-0.5 text-[9.5px] text-slate-400 font-medium">{item.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="rounded-lg bg-gradient-to-br from-[#1e1b4b] to-[#311b92] p-4 text-white shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-black leading-tight text-white">গুরুত্বপূর্ণ খবর</h2>
                <h3 className="text-sm font-extrabold text-amber-300">সবার আগে পেতে</h3>
                <p className="mt-0.5 text-[10.5px] text-white/80">সাবস্ক্রাইব করুন আমাদের নিউজলেটার</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Mail size={22} className="text-amber-300" />
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 space-y-2">
              <input
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="w-full rounded bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 outline-none border border-white/20 placeholder:text-slate-400"
              />
              <button type="submit" className="w-full rounded bg-[#d70b18] py-1.5 text-xs font-black uppercase text-white hover:bg-red-700 transition-colors shadow-xs">
                সাবস্ক্রাইব করুন
              </button>
              <div className="flex items-center gap-1.5 pt-1">
                <input type="checkbox" id="terms" className="h-3 w-3 accent-[#d70b18] rounded cursor-pointer" defaultChecked />
                <label htmlFor="terms" className="text-[9.5px] text-white/80 font-medium cursor-pointer">
                  আমি শর্তাবলী এবং গোপনীয়তা নীতি অনুসরণ করছি
                </label>
              </div>
            </form>
          </div>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HOMEPAGE LAYOUT — EXACT MOCKUP MATCH */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* MOBILE HOMEPAGE LAYOUT — OPTIMAL BALANCED DESIGN */}
      {/* ========================================================================= */}
      <div className="md:hidden space-y-3.5 px-3 pt-2 bg-white">
        {/* Hero Feature Post — balanced height */}
        <section className="relative h-[240px] overflow-hidden rounded-xl bg-slate-900 shadow-sm flex flex-col justify-end group">
          <Link href={`/${lang}/news/${currentHero.slug}`} className="absolute inset-0 z-10" />
          <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${currentHero.featuredImageUrl || currentHero.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative z-20 p-3.5 pointer-events-none">
            <span className="mb-1 inline-block rounded bg-[#d70b18] px-2 py-0.5 text-[9.5px] font-black text-white uppercase">প্রধান খবর</span>
            <h1 className="text-[14px] font-black leading-snug text-white line-clamp-2">{currentHero.title}</h1>
            <div className="mt-2 flex items-center justify-between text-[10px] text-white/80 font-semibold">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Clock size={11} /> {currentHero.timeAgo || '২ ঘণ্টা আগে'}</span>
                <span className="flex items-center gap-1"><Eye size={11} /> {currentHero.views || '১২.৪K ভিউ'}</span>
              </div>
              <div className="pointer-events-auto flex items-center gap-1">
                {slideList.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 rounded-full transition-all ${currentSlide === idx ? 'w-3.5 bg-white' : 'w-1.5 bg-white/40'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top Category — smooth horizontal scrollable ribbon */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[12.5px] font-extrabold text-slate-900">টপ ক্যাটাগরি</h2>
            <Link href={`/${lang}/category/all`} className="flex items-center gap-1 text-[11px] font-bold text-[#d70b18]">
              সব দেখুন <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex items-center gap-3.5 overflow-x-auto scrollbar-none pb-1 pt-0.5 px-0.5">
            {mobileTopCategories.map(({ label, icon: Icon, color, slug }) => (
              <Link key={slug} href={`/${lang}/category/${slug}`} className="flex flex-col items-center gap-1 shrink-0 group">
                <div className="h-11 w-11 rounded-full flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform" style={{ backgroundColor: `${color}18` }}>
                  <Icon size={20} color={color} strokeWidth={2.2} />
                </div>
                <span className="text-[10.5px] font-bold text-slate-800 whitespace-nowrap">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest News — continuous vertical auto-scroll on mobile */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d70b18] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d70b18]"></span>
              </span>
              <h2 className="text-[12.5px] font-extrabold text-slate-900">সর্বশেষ খবর</h2>
            </div>
            <Link href={`/${lang}/category/latest`} className="flex items-center gap-1 text-[11px] font-bold text-[#d70b18]">সব দেখুন <ArrowRight size={12} /></Link>
          </div>
          <div className="h-[280px] overflow-hidden relative rounded-lg border border-slate-100 bg-white p-2 shadow-2xs">
            <div className="animate-vertical-scroll space-y-2">
              {[...fallbackLatest, ...fallbackLatest].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <div className="h-[60px] w-[76px] min-w-[76px] overflow-hidden rounded-md bg-slate-100 shrink-0">
                    <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="text-[9.5px] font-black text-[#d70b18]">{item.categoryName}</span>
                    <Link href={`/${lang}/news/${item.slug}`}>
                      <h3 className="line-clamp-2 text-[12px] font-bold text-slate-900 leading-snug hover:text-[#d70b18]">{item.title}</h3>
                    </Link>
                    <p className="mt-0.5 text-[9.5px] text-slate-400 font-medium">{item.time}</p>
                  </div>
                  <button onClick={() => toggleBookmark(item.slug)} className="p-1 text-slate-300 hover:text-[#d70b18] shrink-0 mt-0.5" aria-label="Bookmark">
                    <Bookmark size={17} className={bookmarked[item.slug] ? 'fill-[#d70b18] text-[#d70b18]' : ''} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video News — optimal balanced spacing */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[12.5px] font-extrabold text-slate-900">ভিডিও সংবাদ</h2>
            <Link href={`/${lang}/category/video`} className="flex items-center gap-1 text-[11px] font-bold text-[#d70b18]">সব দেখুন <ArrowRight size={12} /></Link>
          </div>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-0.5">
            {videoNewsList.map((item, idx) => (
              <div key={idx} className="w-40 shrink-0">
                <div className="relative h-[90px] w-full overflow-hidden rounded-lg bg-slate-900">
                  <img src={item.img} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white"><Play size={14} fill="white" className="ml-0.5" /></div>
                  </div>
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[8.5px] font-bold text-white">{item.duration}</span>
                </div>
                <h3 className="mt-1 line-clamp-2 text-[11.5px] font-bold text-slate-900 leading-snug">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
