'use client';

import { useState, useEffect, use } from 'react';
import { useLanguage } from '@/context/LanguageContext';
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
  Flame,
  Globe2,
  Landmark,
  Mail,
  Map,
  MapPin,
  Play,
  Sparkles,
  TrendingUp,
  Trophy,
} from 'lucide-react';

const desktopCategorySlugs = [
  { slug: 'paschim-bardhaman', count: '1523', icon: Landmark, color: '#d70b18' },
  { slug: 'asansol', count: '923', icon: Factory, color: '#f59e0b' },
  { slug: 'durgapur', count: '754', icon: Landmark, color: '#2878d8' },
  { slug: 'rajya', count: '2456', icon: Map, color: '#45a647' },
  { slug: 'desh', count: '5234', icon: Landmark, color: '#7c3aed' },
  { slug: 'biswa', count: '2341', icon: Globe2, color: '#1d7ed8' },
  { slug: 'khela', count: '1842', icon: Trophy, color: '#e3262e' },
  { slug: 'binodon', count: '823', icon: Clapperboard, color: '#f05b98' },
];

const mobileCategorySlugs = [
  { slug: 'paschim-bardhaman', icon: Landmark, color: '#d70b18' },
  { slug: 'asansol', icon: Factory, color: '#f59e0b' },
  { slug: 'durgapur', icon: Building2, color: '#2878d8' },
  { slug: 'rajniti', icon: Landmark, color: '#dc2626' },
  { slug: 'rajya', icon: Map, color: '#16a34a' },
  { slug: 'desh', icon: Map, color: '#2563eb' },
  { slug: 'biswa', icon: Globe2, color: '#0284c7' },
  { slug: 'khela', icon: Trophy, color: '#e11d48' },
  { slug: 'binodon', icon: Clapperboard, color: '#db2777' },
  { slug: 'arthaniti', icon: TrendingUp, color: '#059669' },
  { slug: 'lifestyle', icon: Sparkles, color: '#7c3aed' },
  { slug: 'tech', icon: Cpu, color: '#0891b2' },
];

const videoNewsList = [
  { slug: 'kolkata-traffic-special-report', title: 'কলকাতার যানজট নিয়ে বিশেষ প্রতিবেদন', duration: '02:45', img: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=600&q=80' },
  { slug: 'ipl-final-match-preview', title: 'আইপিএল ২০২৪ ফাইনালে কারা মুখোমুখি?', duration: '01:58', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80' },
  { slug: 'cm-speech-update', title: 'প্রধানমন্ত্রীর বড় ঘোষণা, কী বললেন দেখুন', duration: '03:12', img: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=600&q=80' },
];

const formatArticleDate = (dateStr, loc) => {
  if (!dateStr) return loc === 'en' ? 'Just now' : loc === 'hi' ? 'अभी' : 'এইমাত্র';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString(loc === 'en' ? 'en-US' : loc === 'hi' ? 'hi-IN' : 'bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch (e) {
    return String(dateStr);
  }
};

export default function LanguageHomePage({ params }) {
  const resolvedParams = use(params);
  const lang = resolvedParams?.lang || 'bn';
  const { t } = useLanguage();

  const [articles, setArticles] = useState([]);
  const [specialReports, setSpecialReports] = useState([]);
  const [politicsNews, setPoliticsNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [entNews, setEntNews] = useState([]);
  const [regionalNews, setRegionalNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [economyNews, setEconomyNews] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    // 1. General news
    fetch(`http://localhost:5000/api/v1/public/news?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setArticles(data.data);
        }
      })
      .catch(() => {});

    // 2. Special Reports
    fetch(`http://localhost:5000/api/v1/public/news?isFeatured=true&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setSpecialReports(data.data);
        }
      })
      .catch(() => {});

    // 3. Politics News
    fetch(`http://localhost:5000/api/v1/public/news?category=rajniti&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPoliticsNews(data.data);
        }
      })
      .catch(() => {});

    // 4. Sports News
    fetch(`http://localhost:5000/api/v1/public/news?category=khela&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setSportsNews(data.data);
        }
      })
      .catch(() => {});

    // 5. Entertainment News
    fetch(`http://localhost:5000/api/v1/public/news?category=binodon&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setEntNews(data.data);
        }
      })
      .catch(() => {});

    // 6. Regional News
    fetch(`http://localhost:5000/api/v1/public/news?category=paschim-bardhaman&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setRegionalNews(data.data);
        }
      })
      .catch(() => {});

    // 7. Tech News
    fetch(`http://localhost:5000/api/v1/public/news?category=projukti&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setTechNews(data.data);
        }
      })
      .catch(() => {});

    // 8. Economy News
    fetch(`http://localhost:5000/api/v1/public/news?category=arthaniti&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setEconomyNews(data.data);
        }
      })
      .catch(() => {});

  }, [lang]);

  const slideList = articles;

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

  const staffReporterText = t('category_page.staff_reporter') || (lang === 'en' ? 'Staff Reporter' : lang === 'hi' ? 'निज प्रतिनिधि' : 'নিজস্ব সংবাদদাতা');

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 w-full pb-20 md:pb-12 font-['var(--font-bangla)',sans-serif]">

      {/* ========================================================================= */}
      {/* DESKTOP HOMEPAGE LAYOUT (MD & UP) — FULLY LOCALIZED DYNAMIC SECTIONS */}
      {/* ========================================================================= */}
      <div className="hidden md:block mx-auto max-w-[1360px] px-3 pt-3 space-y-6">
        
        {/* TOP SECTION: Hero Carousel + Latest News Auto Scroll + Right Sidebar */}
        <div className="grid grid-cols-12 gap-4">
          <main className="col-span-8 space-y-4 min-w-0">
            
            {/* Main Hero + Latest News 2-Col Grid */}
            {slideList.length > 0 && (
              <section className="grid grid-cols-12 gap-3">
                {/* Hero Main Feature Card */}
                {currentHero && (
                  <article className="relative h-[350px] max-h-[350px] overflow-hidden rounded-xl bg-slate-900 shadow-sm flex flex-col justify-end col-span-8 group">
                    <Link href={`/${lang}/news/${currentHero.slug}`} className="absolute inset-0 z-10" />
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${currentHero.featuredImageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

                    <div className="relative z-20 p-5 pointer-events-none">
                      <span className="mb-2 inline-block rounded bg-[#d70b18] px-2.5 py-0.5 text-[11px] font-black text-white uppercase tracking-wider shadow-sm">
                        {t('home.main_news') || 'প্রধান খবর'}
                      </span>
                      <h1 className="text-2xl md:text-3xl font-black leading-snug text-white group-hover:text-red-200 transition-colors drop-shadow-xs">
                        {currentHero.title}
                      </h1>
                      {currentHero.excerpt && (
                        <p className="mt-1.5 text-xs font-medium leading-relaxed text-white/90 line-clamp-2">
                          {currentHero.excerpt}
                        </p>
                      )}
                      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-white/80 border-t border-white/10 pt-2.5">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5"><CircleUserRound size={14} /> {currentHero.author || staffReporterText}</span>
                          <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatArticleDate(currentHero.publishedAt, lang)}</span>
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
                )}

                {/* Latest News Container */}
                <div className="col-span-4 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs flex flex-col h-[350px] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d70b18] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d70b18]"></span>
                      </span>
                      <h2 className="text-sm font-black text-slate-900">{t('home.latest_news') || 'সর্বশেষ খবর'}</h2>
                    </div>
                    <Link href={`/${lang}/category/latest`} className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#d70b18]">
                      {t('home.view_all') || 'সবগুলো দেখুন'} <ArrowRight size={13} className="text-[#d70b18]" />
                    </Link>
                  </div>

                  {/* Smooth Vertical Marquee Auto-Scroll */}
                  <div className="flex-1 overflow-hidden relative group">
                    <div className="animate-vertical-scroll space-y-2.5">
                      {articles.map((item, idx) => (
                        <Link key={item.id || idx} href={`/${lang}/news/${item.slug}`} className="flex gap-2.5 items-start group/item border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                          <div className="h-[52px] w-[70px] min-w-[70px] max-w-[70px] overflow-hidden rounded-lg bg-slate-100 shrink-0">
                            <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover/item:scale-105 transition-transform" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-black text-[#d70b18] uppercase">{item.categoryName}</span>
                            <h3 className="line-clamp-2 text-xs font-bold text-slate-900 leading-snug group-hover/item:text-[#d70b18] transition-colors">{item.title}</h3>
                            <p className="mt-0.5 text-[9.5px] text-slate-400 font-medium">{formatArticleDate(item.publishedAt, lang)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Categories 8-Grid Section (বিভাগ সমূহ) */}
            <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
              <h2 className="mb-2.5 text-sm font-black text-slate-900">{t('home.categories_section') || 'বিভাগ সমূহ'}</h2>
              <div className="grid grid-cols-8 gap-2">
                {desktopCategorySlugs.map(({ count, icon: Icon, color, slug }) => (
                  <Link key={slug} href={`/${lang}/category/${slug}`} className="flex h-22 flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white text-center shadow-2xs hover:border-[#d70b18] hover:shadow-xs transition-all group">
                    <Icon size={24} color={color} strokeWidth={2.2} className="group-hover:scale-110 transition-transform" />
                    <span className="mt-1.5 text-[11px] font-extrabold text-slate-900">{t(`category_names.${slug}`)}</span>
                    <span className="text-[9px] text-slate-500 font-semibold mt-0.5">{count} {t('home.news_count_suffix') || 'খবর'}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Special Reports (বিশেষ প্রতিবেদন) — Hide if empty */}
            {specialReports.length > 0 && (
              <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3.5 w-1 bg-[#d70b18] rounded-full" />
                    <h2 className="text-sm font-black text-slate-900">{t('home.special_reports') || 'বিশেষ প্রতিবেদন'}</h2>
                  </div>
                  <Link href={`/${lang}/category/special-report`} className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#d70b18]">
                    {t('home.view_all') || 'সবগুলো দেখুন'} <ArrowRight size={13} className="text-[#d70b18]" />
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {specialReports.slice(0, 4).map((item, idx) => (
                    <Link key={item.id || idx} href={`/${lang}/news/${item.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-2xs hover:shadow-md transition-all">
                      <div className="h-[110px] w-full overflow-hidden bg-slate-100 relative shrink-0">
                        <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute bottom-1.5 left-1.5 rounded bg-[#d70b18] px-1.5 py-0.5 text-[9px] font-black text-white uppercase">
                          {item.categoryName || 'বিশেষ'}
                        </span>
                      </div>
                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <h3 className="line-clamp-2 text-xs font-black text-slate-900 leading-snug group-hover:text-[#d70b18] transition-colors">
                          {item.title}
                        </h3>
                        <span className="mt-2 text-[9.5px] font-semibold text-slate-400">{formatArticleDate(item.publishedAt, lang)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </main>

          {/* Right Sidebar */}
          <aside className="col-span-4 space-y-4">
            {/* Live TV Widget */}
            <div className="rounded-xl bg-[#07090c] p-3.5 text-white shadow-xs border border-slate-800">
              <div className="mb-2.5 flex items-center justify-between">
                <h2 className="text-sm font-black text-white">{t('home.live_tv') || 'লাইভ টিভি'}</h2>
                <Link href={`/${lang}/live`} className="flex items-center gap-1 text-xs font-bold text-white/80 hover:text-red-400 transition-colors">
                  {t('home.view_all') || 'সবগুলো দেখুন'} <ArrowRight size={13} className="text-[#d70b18]" />
                </Link>
              </div>
              <div className="relative h-[165px] w-full overflow-hidden rounded-lg border border-white/10 bg-[#121826] group shrink-0">
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
                <Link href={`/${lang}/live`} className="rounded-lg bg-[#d70b18] px-3 py-1 text-[11px] font-black text-white hover:bg-red-700 transition-colors">
                  {t('home.watch_now') || 'এখনই দেখুন'}
                </Link>
              </div>
            </div>

            {/* Popular News Widget — Hide if empty */}
            {articles.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                  <h2 className="text-sm font-black text-slate-900">{t('home.popular_news') || 'জনপ্রিয় খবর'}</h2>
                  <Link href={`/${lang}/category/popular`} className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#d70b18]">
                    {t('home.view_all') || 'সবগুলো দেখুন'} <ArrowRight size={13} className="text-[#d70b18]" />
                  </Link>
                </div>
                <div className="space-y-2.5">
                  {articles.slice(0, 6).map((item, idx) => (
                    <Link key={item.id || idx} href={`/${lang}/news/${item.slug}`} className="flex items-center gap-2.5 group border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#d70b18] text-[11px] font-black text-white">
                        0{idx + 1}
                      </span>
                      <div className="h-[46px] w-[58px] min-w-[58px] max-w-[58px] overflow-hidden rounded-md bg-slate-100 shrink-0">
                        <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-xs font-bold text-slate-900 group-hover:text-[#d70b18] transition-colors leading-tight">{item.title}</h3>
                        <p className="mt-0.5 text-[9.5px] text-slate-400 font-medium">{formatArticleDate(item.publishedAt, lang)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>


        {/* ========================================================================= */}
        {/* DYNAMIC CATEGORY SECTIONS — FULLY LOCALIZED & CONDITIONAL */}
        {/* ========================================================================= */}

        {/* ── 1. POLITICS SECTION (রাজনীতি) — Hide if empty ── */}
        {politicsNews.length > 0 && (
          <section className="rounded-2xl border-l-4 border-l-[#d70b18] border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-red-100 text-[#d70b18]">
                  <Flame size={18} />
                </span>
                <div>
                  <h2 className="text-base font-black text-slate-900 leading-none">{t('sections.politics_title') || 'রাজনীতি'}</h2>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{t('sections.politics_sub') || 'দেশ ও রাজ্যের রাজনৈতিক আপডেট'}</p>
                </div>
              </div>
              <Link href={`/${lang}/category/rajniti`} className="flex items-center gap-1 text-xs font-extrabold text-[#d70b18] hover:underline">
                {t('sections.all_politics_news') || 'সব রাজনীতি খবর'} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-12 gap-5 items-stretch">
              {/* Main Featured Big Politics Card */}
              <div className="col-span-7 flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xs group">
                <div className="relative h-[210px] w-full overflow-hidden bg-slate-200">
                  <img src={politicsNews[0]?.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-[#d70b18] text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                    {t('sections.top_politics') || 'শীর্ষ রাজনীতি'}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/${lang}/news/${politicsNews[0]?.slug}`}>
                      <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-[#d70b18] transition-colors">
                        {politicsNews[0]?.title}
                      </h3>
                    </Link>
                    {politicsNews[0]?.excerpt && (
                      <p className="mt-1.5 text-xs font-semibold text-slate-600 line-clamp-2">
                        {politicsNews[0]?.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-slate-400 border-t border-slate-200/60 pt-2">
                    <span>{politicsNews[0]?.author || staffReporterText}</span>
                    <span>{formatArticleDate(politicsNews[0]?.publishedAt, lang)}</span>
                  </div>
                </div>
              </div>

              {/* Right Stacked Politics Cards */}
              <div className="col-span-5 flex flex-col justify-between gap-3">
                {politicsNews.slice(1, 3).map((item, i) => (
                  <div key={item.id || i} className="flex-1 flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs hover:shadow-xs transition-all group">
                    <div className="h-[75px] w-[100px] min-w-[100px] rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col justify-between h-full">
                      <Link href={`/${lang}/news/${item.slug}`}>
                        <h4 className="line-clamp-2 text-xs font-black text-slate-900 group-hover:text-[#d70b18] transition-colors leading-snug">
                          {item.title}
                        </h4>
                      </Link>
                      <span className="text-[10px] font-semibold text-slate-400 mt-1">{item.author || staffReporterText}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}


        {/* ── 2. SPORTS SECTION (খেলাধুলা) — Hide if empty ── */}
        {sportsNews.length > 0 && (
          <section className="rounded-2xl bg-[#0a1122] text-white p-5 shadow-lg border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30">
                  <Trophy size={18} />
                </span>
                <div>
                  <h2 className="text-base font-black text-white leading-none">{t('sections.sports_title') || 'খেলাধুলা'}</h2>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{t('sections.sports_sub') || 'ক্রিকেট, ফুটবল, আইপিএল ও খেলার তাজা খবর'}</p>
                </div>
              </div>
              <Link href={`/${lang}/category/khela`} className="flex items-center gap-1 text-xs font-black text-red-400 hover:text-red-300">
                {t('sections.all_sports_news') || 'সব খেলার খবর'} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {sportsNews.slice(0, 4).map((item, idx) => (
                <div key={item.id || idx} className="flex flex-col rounded-xl border border-slate-800 bg-[#121a2d] overflow-hidden group hover:border-red-500/50 transition-all">
                  <div className="relative h-[130px] w-full overflow-hidden bg-slate-900">
                    <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
                      {item.categoryName || 'স্পোর্টস'}
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <Link href={`/${lang}/news/${item.slug}`}>
                      <h3 className="line-clamp-2 text-xs font-black text-slate-100 group-hover:text-red-400 transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </Link>
                    <div className="mt-3 flex items-center justify-between text-[10px] font-extrabold text-slate-400 border-t border-slate-800 pt-2">
                      <span className="text-red-400 font-bold">{formatArticleDate(item.publishedAt, lang)}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-red-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* ── 3. ENTERTAINMENT (বিনোদন) — Hide if empty ── */}
        {entNews.length > 0 && (
          <section className="rounded-2xl border border-pink-200/70 bg-gradient-to-br from-pink-50/40 via-white to-purple-50/30 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-pink-100 text-pink-600">
                  <Clapperboard size={18} />
                </span>
                <div>
                  <h2 className="text-base font-black text-slate-900 leading-none">{t('sections.entertainment_title') || 'বিনোদন'}</h2>
                  <p className="text-[11px] font-semibold text-pink-600 mt-0.5">{t('sections.entertainment_sub') || 'বলিউড, টলিউড ও ওটিটি দুনিয়া'}</p>
                </div>
              </div>
              <Link href={`/${lang}/category/binodon`} className="flex items-center gap-1 text-xs font-black text-pink-600 hover:underline">
                {t('sections.all_entertainment_news') || 'বিনোদনের খবর'} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {entNews.slice(0, 3).map((item, idx) => (
                <div key={item.id || idx} className="flex flex-col rounded-xl overflow-hidden border border-pink-100 bg-white shadow-2xs hover:shadow-md hover:border-pink-300 transition-all group">
                  <div className="relative h-[155px] w-full overflow-hidden bg-slate-100">
                    <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[9.5px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      {item.categoryName || 'বিনোদন'}
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <Link href={`/${lang}/news/${item.slug}`}>
                      <h3 className="line-clamp-2 text-xs font-black text-slate-900 group-hover:text-pink-600 transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </Link>
                    <div className="mt-3 flex items-center justify-between text-[10px] font-extrabold text-pink-600 border-t border-pink-50 pt-2">
                      <span>{formatArticleDate(item.publishedAt, lang)}</span>
                      <Sparkles size={13} className="text-purple-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* ── 4. REGIONAL SPOTLIGHT (পশ্চিম বর্ধমান, আসানসোল, দুর্গাপুর) — Hide if empty ── */}
        {regionalNews.length > 0 && (
          <section className="rounded-2xl border border-amber-200/80 bg-amber-50/30 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500 text-white">
                  <MapPin size={18} />
                </span>
                <div>
                  <h2 className="text-base font-black text-slate-900 leading-none">{t('sections.regional_title') || 'আঞ্চলিক সংবাদ'}</h2>
                  <p className="text-[11px] font-semibold text-amber-800 mt-0.5">{t('sections.regional_sub') || 'পশ্চিম বর্ধমান, আসানসোল ও দুর্গাপুরের সর্বশেষ তথ্য'}</p>
                </div>
              </div>
              <Link href={`/${lang}/category/paschim-bardhaman`} className="flex items-center gap-1 text-xs font-black text-amber-700 hover:underline">
                {t('sections.all_regional_news') || 'সমস্ত আঞ্চলিক খবর'} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {regionalNews.slice(0, 3).map((item, idx) => (
                <div key={item.id || idx} className="flex flex-col rounded-xl border border-amber-200/60 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all group">
                  <div className="relative h-[135px] w-full overflow-hidden bg-slate-100">
                    <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-[9.5px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <MapPin size={10} /> {item.categoryName || 'পশ্চিম বর্ধমান'}
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <Link href={`/${lang}/news/${item.slug}`}>
                      <h3 className="line-clamp-2 text-xs font-black text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-[10px] font-extrabold text-slate-400 flex items-center gap-1">
                      <Building2 size={11} className="text-amber-600" />
                      <span>{formatArticleDate(item.publishedAt, lang)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* ── 5. TECH & ECONOMY DUAL SPLIT SECTION — Hide if both empty ── */}
        {(techNews.length > 0 || economyNews.length > 0) && (
          <section className="grid grid-cols-2 gap-5">

            {/* Left Tech Card Split */}
            {techNews.length > 0 && (
              <div className="rounded-2xl border border-cyan-200/80 bg-cyan-50/20 p-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-cyan-100 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <Cpu size={18} className="text-cyan-600" />
                    <h3 className="text-sm font-black text-slate-900">{t('sections.tech_title') || 'প্রযুক্তি ও গ্যাজেট'}</h3>
                  </div>
                  <Link href={`/${lang}/category/projukti`} className="text-xs font-black text-cyan-700 hover:underline">
                    {t('category_page.more') || 'আরও'} <ArrowRight size={12} className="inline" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {techNews.slice(0, 2).map((item, idx) => (
                    <div key={item.id || idx} className="flex gap-3 rounded-xl border border-cyan-100 bg-white p-2.5 shadow-2xs hover:shadow-xs transition-all group">
                      <div className="h-[65px] w-[90px] min-w-[90px] rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <Link href={`/${lang}/news/${item.slug}`}>
                          <h4 className="line-clamp-2 text-xs font-black text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                            {item.title}
                          </h4>
                        </Link>
                        <span className="text-[9.5px] font-extrabold text-cyan-600">{formatArticleDate(item.publishedAt, lang)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right Economy Card Split */}
            {economyNews.length > 0 && (
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/20 p-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-600" />
                    <h3 className="text-sm font-black text-slate-900">{t('sections.business_title') || 'অর্থনীতি ও বাণিজ্য'}</h3>
                  </div>
                  <Link href={`/${lang}/category/arthaniti`} className="text-xs font-black text-emerald-700 hover:underline">
                    {t('category_page.more') || 'আরও'} <ArrowRight size={12} className="inline" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {economyNews.slice(0, 2).map((item, idx) => (
                    <div key={item.id || idx} className="flex gap-3 rounded-xl border border-emerald-100 bg-white p-2.5 shadow-2xs hover:shadow-xs transition-all group">
                      <div className="h-[65px] w-[90px] min-w-[90px] rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <Link href={`/${lang}/news/${item.slug}`}>
                          <h4 className="line-clamp-2 text-xs font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                            {item.title}
                          </h4>
                        </Link>
                        <span className="text-[9.5px] font-extrabold text-emerald-600">{formatArticleDate(item.publishedAt, lang)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </section>
        )}

      </div>


      {/* ========================================================================= */}
      {/* MOBILE HOMEPAGE LAYOUT (< MD) — ENHANCED ACCESSIBLE SIZE & TYPOGRAPHY */}
      {/* ========================================================================= */}
      <div className="md:hidden space-y-5 px-3.5 pt-3 bg-[#f8fafc]">
        
        {/* Mobile Hero Feature Post — enlarged comfortable card */}
        {slideList.length > 0 && currentHero && (
          <section className="relative h-[270px] overflow-hidden rounded-2xl bg-slate-900 shadow-md flex flex-col justify-end group">
            <Link href={`/${lang}/news/${currentHero.slug}`} className="absolute inset-0 z-10" />
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${currentHero.featuredImageUrl})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
            <div className="relative z-20 p-4 pointer-events-none">
              <span className="mb-1.5 inline-block rounded bg-[#d70b18] px-2.5 py-0.5 text-[10.5px] font-black text-white uppercase shadow-2xs">{t('home.main_news') || 'প্রধান খবর'}</span>
              <h1 className="text-base sm:text-lg font-black leading-snug text-white line-clamp-2">{currentHero.title}</h1>
              <div className="mt-2.5 flex items-center justify-between text-xs text-white/90 font-bold border-t border-white/10 pt-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock size={12} /> {formatArticleDate(currentHero.publishedAt, lang)}</span>
                  <span className="flex items-center gap-1"><Eye size={12} /> {currentHero.viewsCount || '1.2K'} ভিউ</span>
                </div>
                <div className="pointer-events-auto flex items-center gap-1.5">
                  {slideList.map((_, idx) => (
                    <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-4 bg-white' : 'w-2 bg-white/40'}`} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Mobile Top Category Ribbon */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-black text-slate-900">{t('home.top_categories') || 'টপ ক্যাটাগরি'}</h2>
            <Link href={`/${lang}/category/all`} className="flex items-center gap-1 text-xs font-extrabold text-[#d70b18]">
              {t('home.view_all') || 'সবগুলো দেখুন'} <ArrowRight size={13} />
            </Link>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-none pb-1.5 pt-0.5 px-0.5">
            {mobileCategorySlugs.map(({ icon: Icon, color, slug }) => (
              <Link key={slug} href={`/${lang}/category/${slug}`} className="flex flex-col items-center gap-1.5 shrink-0 group">
                <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform" style={{ backgroundColor: `${color}18` }}>
                  <Icon size={22} color={color} strokeWidth={2.2} />
                </div>
                <span className="text-xs font-extrabold text-slate-800 whitespace-nowrap">{t(`category_names.${slug}`)}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Mobile Latest News Auto Scroll */}
        {articles.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d70b18] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d70b18]"></span>
                </span>
                <h2 className="text-sm font-black text-slate-900">{t('home.latest_news') || 'সর্বশেষ খবর'}</h2>
              </div>
              <Link href={`/${lang}/category/latest`} className="flex items-center gap-1 text-xs font-extrabold text-[#d70b18]">{t('home.view_all') || 'সবগুলো দেখুন'} <ArrowRight size={13} /></Link>
            </div>
            <div className="h-[310px] overflow-hidden relative rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xs">
              <div className="animate-vertical-scroll space-y-3">
                {articles.map((item, idx) => (
                  <div key={item.id || idx} className="flex gap-3 items-start border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                    <div className="h-[66px] w-[88px] min-w-[88px] overflow-hidden rounded-xl bg-slate-100 shrink-0">
                      <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <span className="text-[10px] font-black text-[#d70b18] uppercase">{item.categoryName}</span>
                      <Link href={`/${lang}/news/${item.slug}`}>
                        <h3 className="line-clamp-2 text-xs font-black text-slate-900 leading-snug hover:text-[#d70b18]">{item.title}</h3>
                      </Link>
                      <p className="mt-1 text-[10px] text-slate-400 font-semibold">{formatArticleDate(item.publishedAt, lang)}</p>
                    </div>
                    <button onClick={() => toggleBookmark(item.slug)} className="p-1 text-slate-300 hover:text-[#d70b18] shrink-0 mt-0.5" aria-label="Bookmark">
                      <Bookmark size={18} className={bookmarked[item.slug] ? 'fill-[#d70b18] text-[#d70b18]' : ''} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mobile Section 1: Politics Carousel — Hide if empty */}
        {politicsNews.length > 0 && (
          <section className="rounded-2xl border-l-4 border-l-[#d70b18] bg-white p-3.5 shadow-2xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-slate-100">
              <h2 className="text-sm font-black text-[#d70b18] flex items-center gap-1.5">
                <Flame size={16} /> {t('sections.politics_title') || 'রাজনীতি'}
              </h2>
              <Link href={`/${lang}/category/rajniti`} className="text-xs font-extrabold text-slate-700">{t('sections.view_all_arrow') || 'সব দেখুন →'}</Link>
            </div>
            <div className="space-y-2.5">
              {politicsNews.slice(0, 2).map((item, idx) => (
                <Link key={item.id || idx} href={`/${lang}/news/${item.slug}`} className="flex items-center gap-3 group">
                  <div className="h-16 w-22 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-xs font-black text-slate-900 group-hover:text-[#d70b18] leading-snug">{item.title}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">{formatArticleDate(item.publishedAt, lang)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Mobile Section 2: Sports Dark Card — Hide if empty */}
        {sportsNews.length > 0 && (
          <section className="rounded-2xl bg-[#0a1122] text-white p-4 shadow-sm border border-slate-800">
            <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-slate-800">
              <h2 className="text-sm font-black text-red-500 flex items-center gap-1.5">
                <Trophy size={16} /> {t('sections.sports_title') || 'খেলাধুলা'}
              </h2>
              <Link href={`/${lang}/category/khela`} className="text-xs font-extrabold text-slate-300">{t('sections.view_all_arrow') || 'সব দেখুন →'}</Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {sportsNews.slice(0, 2).map((item, idx) => (
                <Link key={item.id || idx} href={`/${lang}/news/${item.slug}`} className="flex flex-col rounded-xl bg-[#121a2d] overflow-hidden border border-slate-800">
                  <div className="h-24 w-full overflow-hidden bg-slate-900">
                    <img src={item.featuredImageUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-2.5">
                    <h3 className="line-clamp-2 text-xs font-black text-slate-100 leading-snug">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Mobile Video News */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-black text-slate-900">{t('home.video_news') || 'ভিডিও খবর'}</h2>
            <Link href={`/${lang}/category/video`} className="flex items-center gap-1 text-xs font-extrabold text-[#d70b18]">{t('home.view_all') || 'সবগুলো দেখুন'} <ArrowRight size={13} /></Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
            {videoNewsList.map((item, idx) => (
              <div key={idx} className="w-44 shrink-0">
                <div className="relative h-[100px] w-full overflow-hidden rounded-xl bg-slate-900">
                  <img src={item.img} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white"><Play size={16} fill="white" className="ml-0.5" /></div>
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-bold text-white">{item.duration}</span>
                </div>
                <h3 className="mt-1.5 line-clamp-2 text-xs font-black text-slate-900 leading-snug">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
