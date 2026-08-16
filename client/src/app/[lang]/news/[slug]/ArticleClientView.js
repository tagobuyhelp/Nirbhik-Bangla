'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ArticlePhotoGallery from '@/components/ArticlePhotoGallery';
import { API_BASE_URL } from '@/utils/config';
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  Globe2,
  Link2,
  Mail,
  MessageCircle,
  Play,
  Share2,
  Tag as TagIcon,
  ThumbsUp,
} from 'lucide-react';

const fallbackArticle = {
  slug: '',
  categoryName: 'সংবাদ',
  title: 'নির্ভীক বাংলা সংবাদ',
  excerpt: 'বিস্তারিত প্রতিবেদন পড়তে লিংক এ ক্লিক করুন।',
  author: 'Abdul Haque',
  authorBio: 'প্রধান সম্পাদক ও প্রকাশক, নির্ভীক বাংলা।',
  authorAvatar: 'https://res.cloudinary.com/tw5058et/image/upload/v1786858841/nirbhik_bangla/avatars/gtchkpcote1qsauuc6ou.webp',
  publishedAt: new Date().toISOString(),
  featuredImageUrl: '/placeholder-news.jpg',
  imageCaption: '',
  imageCredit: 'নির্ভীক বাংলা ফটো',
  viewsCount: '১.২K',
  content: `<p>সংবাদটি সম্পূর্ণভাবে লোড হচ্ছে...</p>`,
  tags: [],
};

const fallbackRelatedNews = [
  {
    slug: 'election-result-political-debate',
    cat: 'দেশ',
    title: 'নির্বাচনের ফল নিয়ে রাজনৈতিক মহলে তরজা তুঙ্গে',
    date: '২৩ মে ২০২৪',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'bjp-tmc-clash-update',
    cat: 'রাজনীতি',
    title: 'বিজেপি-তৃণমূলের সমর্থকদের মধ্যে বচসা, উত্তেজনা',
    date: '২৩ মে ২০২৪',
    img: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'new-government-delhi-prep',
    cat: 'দেশ',
    title: 'নতুন সরকার গঠনের প্রস্তুতি শুরু দিল্লিতে',
    date: '২৩ মে ২০২৪',
    img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'us-election-date-announce',
    cat: 'আন্তর্জাতিক',
    title: 'যুক্তরাষ্ট্রে প্রেসিডেন্ট নির্বাচনের তারিখ ঘোষণা',
    date: '২৩ মে ২০২৪',
    img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
  },
];

const fallbackSidebarLatest = [
  { slug: 'finance-minister-budget-next-week', title: 'অর্থমন্ত্রী আগামী সপ্তাহে নতুন বাজেট পেশ করবেন', time: '২৪ মে ২০২৪, ০৮:১০ AM', img: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=200&q=80' },
  { slug: 'kolkata-heavy-rain-warning', title: 'পশ্চিমবঙ্গে ভারী বৃষ্টির পূর্বাভাস, সতর্কতা জারি', time: '২৪ মে ২০২৪, ০৮:৫০ AM', img: 'https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=200&q=80' },
  { slug: 'ipl-final-kkr-vs-srh', title: 'আইপিএল ফাইনালে আজ কলকাতা বনাম হায়দরাবাদ', time: '২৪ মে ২০২৪, ০৮:৩০ AM', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=200&q=80' },
  { slug: 'petrol-diesel-price-unchanged', title: 'পেট্রোল-ডিজেলের দাম অপরিবর্তিত থাকছে বলে ঘোষণা', time: '২৪ মে ২০২৪, ০৮:১৬ AM', img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=200&q=80' },
  { slug: 'chandrayaan-4-mission-isro', title: 'চন্দ্রযান-৪ মিশন নিয়ে বড় সিদ্ধান্ত নিল ইসরো', time: '২৪ মে ২০২৪, ০৮:০০ AM', img: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=200&q=80' },
  { slug: 'asansol-highway-traffic-update', title: 'আসানসোল-দুর্গাপুর জাতীয় সড়কে নতুন নিয়ম চালু', time: '২৪ মে ২০২৪, ০৭:৪৫ AM', img: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=200&q=80' },
  { slug: 'gold-price-drop-bengal', title: 'সোনার দামে স্বস্তি! ভরিতে কমল ৫০০ টাকা', time: '২৪ মে ২০২৪, ০৭:২০ AM', img: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=200&q=80' },
  { slug: 'railway-vande-bharat-expansion', title: 'হাওড়া থেকে আরও দুটি নতুন বন্দে ভারত এক্সপ্রেস চালু', time: '২৪ মে ২০২৪, ০৭:০০ AM', img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=200&q=80' },
  { slug: 'madhyamik-result-scrutiny-date', title: 'মাধ্যমিক পরীক্ষার স্ক্রুটিনির ফলাফল ঘোষণা আজ', time: '২৪ মে ২০২৪, ০৬:৪০ AM', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=200&q=80' },
  { slug: 'smart-phone-ai-feature-launch', title: 'কম দামে বাজারে এল এআই সেন্সরযুক্ত নতুন স্মার্টফোন', time: '২৪ মে ২০২৪, ০৬:১৫ AM', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80' },
];

function formatArticleDate(dateStr, currentLang = 'bn') {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const localeCode = currentLang === 'en' ? 'en-US' : currentLang === 'hi' ? 'hi-IN' : 'bn-BD';
    return d.toLocaleDateString(localeCode, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    return dateStr;
  }
}

function cleanAuthorName(name = '') {
  if (!name) return 'Abdul Haque';
  let str = String(name).trim();
  const lines = str.split(/[\n\r]+/);
  str = lines[0].trim();
  const words = str.split(/\s+/);
  if (words.length >= 4) {
    const half = Math.floor(words.length / 2);
    if (words.slice(0, half).join(' ') === words.slice(half).join(' ')) {
      return words.slice(0, half).join(' ');
    }
  }
  return str || 'Abdul Haque';
}

export default function ArticleClientView({ lang = 'bn', slug = 'lok-sabha-vote-result', initialArticle = null }) {
  const [article, setArticle] = useState(initialArticle ? { ...fallbackArticle, ...initialArticle } : fallbackArticle);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [sidebarLatest, setSidebarLatest] = useState([]);
  const [fontSizeClass, setFontSizeClass] = useState('text-base');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likesCount, setLikesCount] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);

  const [sideEmail, setSideEmail] = useState('');
  const [sideSubscribed, setSideSubscribed] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [slug]);

  const handleSideSubscribe = async (e) => {
    e.preventDefault();
    if (sideEmail.trim()) {
      setSideSubscribed(true);
      try {
        await fetch(`${API_BASE_URL}/public/newsletter/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: sideEmail.trim(), source: 'article_sidebar' }),
        });
      } catch (err) {
        console.error('Sidebar subscribe error:', err);
      }
      setTimeout(() => {
        setSideEmail('');
        setSideSubscribed(false);
      }, 4000);
    }
  };



  useEffect(() => {
    const cleanSlug = (slug || '').trim().replace(/\/+$/, '');
    fetch(`${API_BASE_URL}/public/news/by-slug/${cleanSlug}?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setArticle({
            ...fallbackArticle,
            ...data.data,
          });

          // Fetch related news by category
          if (data.data.categorySlug) {
            fetch(`${API_BASE_URL}/public/news?category=${data.data.categorySlug}&lang=${lang}&limit=6`)
              .then((res) => res.json())
              .then((relData) => {
                if (relData.success && Array.isArray(relData.data)) {
                  setRelatedArticles(relData.data.filter((item) => item.slug !== slug));
                }
              })
              .catch((err) => console.log('Related news fetch error:', err));
          }
        }
      })
      .catch((err) => console.log('Using fallback article data:', err));

    // Fetch sidebar latest news
    fetch(`${API_BASE_URL}/public/news?lang=${lang}&limit=10`)
      .then((res) => res.json())
      .then((latestData) => {
        if (latestData.success && Array.isArray(latestData.data)) {
          setSidebarLatest(latestData.data);
        }
      })
      .catch((err) => console.log('Sidebar news fetch error:', err));
  }, [slug, lang]);

  // View Tracking (Fires only after 5 seconds to avoid counting bounce traffic)
  useEffect(() => {
    if (!article.id || article.id === '1') return; // wait until article is fully loaded with real id

    const timer = setTimeout(() => {
      fetch(`${API_BASE_URL}/public/news/${article.id}/view`, { method: 'POST' })
        .catch(err => console.log('View tracking error:', err));
    }, 5000);

    return () => clearTimeout(timer);
  }, [article.id]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const homeBreadcrumb = lang === 'en' ? 'Home' : lang === 'hi' ? 'मुख्य पृष्ठ' : 'প্রচ্ছদ';
  const shareText = lang === 'en' ? 'Share' : lang === 'hi' ? 'शेयर करें' : 'শেয়ার করুন';
  const copyLinkTooltip = copiedLink
    ? (lang === 'en' ? 'Link Copied!' : lang === 'hi' ? 'लिंक कॉपी हो गया!' : 'লিঙ্ক কপি করা হয়েছে!')
    : (lang === 'en' ? 'Copy Link' : lang === 'hi' ? 'लिंक कॉपी करें' : 'লিঙ্ক কপি করুন');

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-12 text-slate-900">
      <div className="mx-auto max-w-[1360px] px-3 pt-3">
        {/* Breadcrumb Row */}
        <nav className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link href={`/${lang}`} className="hover:text-[#d70b18] transition-colors">{homeBreadcrumb}</Link>
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <Link href={`/${lang}/category/${article.categorySlug}`} className="hover:text-[#d70b18] transition-colors">{article.categoryName}</Link>
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <span className="text-slate-800 font-bold truncate max-w-[300px] md:max-w-none">{article.title}</span>
        </nav>

        {/* Main 12-Col Grid */}
        <div className="grid grid-cols-12 gap-5 items-start">
          {/* Main Article Left Column (col-span-12 md:col-span-8) */}
          <main className="col-span-12 md:col-span-8 min-w-0 space-y-3">
            {/* Category Pill & Font Resizer Bar */}
            <div className="flex items-center justify-between">
              <span className="inline-block rounded bg-[#d70b18] px-2.5 py-0.5 text-xs font-black text-white uppercase tracking-wide shadow-2xs">
                {article.categoryName}
              </span>

              {/* Font Resizer Pill */}
              <div className="flex items-center gap-0.5 rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-bold text-slate-600 shadow-2xs">
                <button
                  onClick={() => setFontSizeClass('text-sm')}
                  className={`px-1.5 py-0.5 rounded-full transition-colors ${fontSizeClass === 'text-sm' ? 'bg-slate-200 text-slate-900 font-black' : 'hover:text-slate-900'}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSizeClass('text-base')}
                  className={`px-1.5 py-0.5 rounded-full transition-colors ${fontSizeClass === 'text-base' ? 'bg-slate-200 text-slate-900 font-black' : 'hover:text-slate-900'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSizeClass('text-lg')}
                  className={`px-1.5 py-0.5 rounded-full transition-colors ${fontSizeClass === 'text-lg' ? 'bg-slate-200 text-slate-900 font-black' : 'hover:text-slate-900'}`}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-snug tracking-tight">
              {article.title}
            </h1>

            {/* Subtitle / Excerpt Callout */}
            {article.excerpt && (
              <div className="my-2 rounded-r-lg border-l-4 border-[#d70b18] bg-slate-50 p-3.5 sm:p-4 text-slate-800 shadow-2xs">
                <p className="text-sm sm:text-base font-bold leading-relaxed text-slate-700 italic">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Author & Share Bar — Compact Single Line Mobile & Desktop */}
            <div className="flex items-center justify-between border-y border-slate-200/80 py-2 my-2.5 gap-2 bg-slate-50/60 px-3 rounded-xl min-w-0">
              {/* Left: Author Info */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={article.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author || 'Nirbhik Bangla')}&background=d70b18&color=ffffff&bold=true`}
                    alt={article.author}
                    className="h-8 w-8 rounded-full object-cover border border-white ring-1 ring-red-500/20 shadow-2xs"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 bg-[#d70b18] text-white p-0.2 rounded-full ring-1 ring-white">
                    <CheckCircle size={8} className="fill-[#d70b18] text-white" />
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 font-black text-slate-900 text-xs truncate">
                    <span className="truncate">{cleanAuthorName(article.author)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 leading-none mt-0.5">
                    <Clock size={10} className="text-slate-400 shrink-0" />
                    <span className="truncate">{formatArticleDate(article.publishedAt, lang)}</span>
                  </div>
                </div>
              </div>

              {/* Right: Social Share Buttons (Single Line Row) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold text-slate-500 mr-0.5 hidden md:inline-flex items-center gap-1">
                  <Share2 size={12} className="text-[#d70b18]" />
                  <span>{shareText}</span>
                </span>

                {/* Facebook Button */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="h-7 w-7 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-105 transition-all shadow-2xs shrink-0"
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>

                {/* Twitter / X Button */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center hover:scale-105 transition-all shadow-2xs shrink-0"
                  aria-label="Share on Twitter / X"
                  title="Share on Twitter / X"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>

                {/* WhatsApp Button (Original PNG Icon) */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + currentUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="h-7 w-7 rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-2xs shrink-0 overflow-hidden"
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                >
                  <img src="/icons/whatsapp.png" alt="WhatsApp" className="h-full w-full object-cover" />
                </a>

                {/* Copy Link Button */}
                <button
                  onClick={handleCopyLink}
                  className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-300 hover:scale-105 transition-all shadow-2xs shrink-0"
                  aria-label="Copy link"
                  title={copyLinkTooltip}
                >
                  <Link2 size={13} />
                </button>
              </div>
            </div>

            {/* Featured Image Box */}
            <div className="rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-2xs">
              <div className="h-[220px] sm:h-[320px] md:h-[360px] w-full overflow-hidden">
                <img
                  src={article.featuredImageUrl}
                  alt={article.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {(article.imageCaption || article.imageCredit) && (
                <div className="flex items-center gap-2 bg-slate-50/90 px-3.5 py-2 text-[11px] font-semibold text-slate-400 border-t border-slate-200/60">
                  {article.imageCaption && <span>{article.imageCaption}</span>}
                  {article.imageCaption && article.imageCredit && <span>|</span>}
                  {article.imageCredit && <span>{article.imageCredit}</span>}
                </div>
              )}
            </div>

            {/* Article Content Body */}
            <div
              className={`prose max-w-none text-slate-800 leading-relaxed font-medium bengali-article-content ${fontSizeClass}`}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Interactive Photo Gallery / Lightbox */}
            {(() => {
              const extractContentImages = (htmlContent) => {
                if (!htmlContent) return [];
                const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
                const matches = [];
                let match;
                while ((match = imgRegex.exec(htmlContent)) !== null) {
                  if (match[1] && !matches.includes(match[1])) {
                    matches.push(match[1]);
                  }
                }
                return matches;
              };

              const allGalleryImages = Array.isArray(article.galleryUrls) && article.galleryUrls.length > 0
                ? article.galleryUrls
                : extractContentImages(article.content);

              return <ArticlePhotoGallery images={allGalleryImages} lang={lang} />;
            })()}

            {/* Tags & Bookmark Row */}
            <div className="flex flex-wrap items-center justify-between border-t border-slate-200 pt-4 gap-3">
              {article.tags && article.tags.length > 0 ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black text-slate-900">{lang === 'en' ? 'Tags:' : lang === 'hi' ? 'टैग:' : 'ট্যাগসমূহ:'}</span>
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/${lang}/search?q=${encodeURIComponent(tag)}`}
                      className="rounded bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-[#d70b18] hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              ) : <div />}

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-bold transition-colors ${
                  isBookmarked
                    ? 'border-[#d70b18] bg-red-50 text-[#d70b18]'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-[#d70b18]'
                }`}
              >
                <Bookmark size={14} className={isBookmarked ? 'fill-[#d70b18]' : ''} />
                <span>{isBookmarked ? (lang === 'en' ? 'Saved' : lang === 'hi' ? 'सहेजा गया' : 'সংরক্ষিত') : (lang === 'en' ? 'Bookmark' : lang === 'hi' ? 'बुकमार्क' : 'বুকমার্ক')}</span>
              </button>
            </div>

            {/* Author Bio Card */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 flex items-center gap-4">
              <img
                src={article.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author || 'Nirbhik Bangla')}&background=d70b18&color=ffffff&bold=true`}
                alt={article.author}
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-black text-slate-900">
                  <span>{cleanAuthorName(article.author)}</span>
                  <CheckCircle size={15} className="text-[#d70b18] fill-[#d70b18] text-white" />
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-600 leading-relaxed">
                  {article.authorBio || 'রাজনীতি, শাসনব্যবস্থা & প্রশাসনিক বিষয়ক বিশেষ প্রতিনিধি। ৮ বছরের সাংবাদিকতার অভিজ্ঞতা।'}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <a href="#" className="h-6 w-6 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 transition-all shadow-2xs" title="Facebook" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center hover:scale-110 transition-all shadow-2xs" title="Twitter / X" aria-label="Twitter / X">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" className="h-6 w-6 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-2xs overflow-hidden" title="WhatsApp" aria-label="WhatsApp">
                    <img src="/icons/whatsapp.png" alt="WhatsApp" className="h-full w-full object-cover" />
                  </a>
                  <a href="mailto:contact@nirbhikbangla.com" className="h-6 w-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-300 hover:scale-110 transition-all shadow-2xs" title="Email" aria-label="Email">
                    <Mail size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* Related News Section */}
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                <h2 className="text-sm font-extrabold text-slate-900">{lang === 'en' ? 'Related News' : lang === 'hi' ? 'संबंधित खबरें' : 'সম্পর্কিত খবর'}</h2>
                <Link href={`/${lang}/category/${article.categorySlug}`} className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#d70b18]">
                  {lang === 'en' ? 'View All' : lang === 'hi' ? 'सभी देखें' : 'সব দেখুন'} <ArrowRight size={13} className="text-[#d70b18]" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(relatedArticles.length > 0 ? relatedArticles : fallbackRelatedNews).map((item, idx) => {
                  const formattedDate = item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'hi' ? 'hi-IN' : 'bn-BD', {
                        day: 'numeric',
                        month: 'short',
                      })
                    : (item.date || '২৩ মে ২০২৪');
                  return (
                    <Link key={idx} href={`/${lang}/news/${item.slug}`} className="group flex flex-col overflow-hidden rounded-md border border-slate-100 bg-white shadow-2xs hover:shadow-md transition-all">
                      <div className="h-[105px] w-full overflow-hidden bg-slate-100 relative shrink-0">
                        <img src={item.featuredImageUrl || item.img} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-2 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[9.5px] font-black text-[#d70b18] uppercase">{item.categoryName || item.cat}</span>
                          <h3 className="line-clamp-2 text-xs font-bold text-slate-900 leading-snug group-hover:text-[#d70b18] transition-colors mt-0.5">
                            {item.title}
                          </h3>
                        </div>
                        <span className="mt-2 text-[9px] font-semibold text-slate-400">{formattedDate}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </main>

          {/* Right Sidebar (col-span-12 md:col-span-4) — Sticky Scroll */}
          <aside className="col-span-12 md:col-span-4 space-y-4 md:sticky md:top-[210px] self-start">
            {/* Live TV Widget */}
            <div className="rounded-2xl bg-gradient-to-br from-[#160608] via-[#26090e] to-[#0d0305] p-4 text-white shadow-md border border-red-950/70 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 h-32 w-32 bg-[#d70b18]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="mb-2.5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d70b18]"></span>
                  </span>
                  <h2 className="text-sm font-black text-white">
                    {lang === 'en' ? 'Live TV' : lang === 'hi' ? 'लाइव टीवी' : 'লাইভ টিভি'}
                  </h2>
                </div>
                <Link href={`/${lang}/live`} className="flex items-center gap-1 text-xs font-bold text-red-300 hover:text-white transition-colors">
                  {lang === 'en' ? 'View All' : lang === 'hi' ? 'सभी देखें' : 'সবগুলো দেখুন'} <ArrowRight size={13} className="text-[#d70b18]" />
                </Link>
              </div>
              <div className="relative h-[165px] w-full overflow-hidden rounded-xl border border-white/15 bg-[#170e11] group shrink-0 shadow-inner">
                <img src="/images/live-tv-cover-image.png" alt="Live TV" className="h-full w-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full bg-[#d70b18] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                  LIVE • 1.2K
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="mb-1 text-base font-black tracking-widest text-white drop-shadow-md">NIRBHIK BANGLA</div>
                  <Link href={`/${lang}/live`} className="my-1.5 grid h-11 w-13 place-items-center rounded-xl bg-[#d70b18] hover:bg-red-600 text-white transition-all shadow-lg hover:scale-105 active:scale-95">
                    <Play size={22} fill="white" className="ml-0.5" />
                  </Link>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-xs relative z-10">
                <div>
                  <h3 className="font-black text-white">Nirbhik Bangla Live</h3>
                  <p className="text-[9.5px] font-semibold text-red-200/80">
                    {lang === 'en' ? '24x7 Bengali News Channel' : lang === 'hi' ? '24x7 बंगाली समाचार चैनल' : '24x7 নির্ভীক বাংলা সংবাদ'}
                  </p>
                </div>
                <Link href={`/${lang}/live`} className="rounded-xl bg-[#d70b18] px-3.5 py-1.5 text-[11px] font-black text-white hover:bg-red-600 transition-all shadow-md">
                  {lang === 'en' ? 'Watch Now' : lang === 'hi' ? 'अभी देखें' : 'এখনই দেখুন'}
                </Link>
              </div>
            </div>

            {/* Latest News Sidebar Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d70b18] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d70b18]"></span>
                  </span>
                  <h2 className="text-sm font-extrabold text-slate-900">{lang === 'en' ? 'Latest News' : lang === 'hi' ? 'ताज़ा खबरें' : 'সর্বশেষ খবর'}</h2>
                </div>
                <Link href={`/${lang}/category/latest`} className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-[#d70b18]">
                  {lang === 'en' ? 'View All' : lang === 'hi' ? 'सभी देखें' : 'সব দেখুন'} <ArrowRight size={13} className="text-[#d70b18]" />
                </Link>
              </div>

              {/* Auto-scrolling list container with smooth vertical marquee */}
              <div className="h-[320px] overflow-hidden relative group">
                <div className="animate-vertical-scroll space-y-2.5">
                  {(sidebarLatest.length > 0 ? sidebarLatest : fallbackSidebarLatest).map((item, idx) => {
                    const formattedDate = item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'hi' ? 'hi-IN' : 'bn-BD', {
                          day: 'numeric',
                          month: 'short',
                        })
                      : (item.time || '২৪ মে ২০২৪');
                    return (
                      <Link key={idx} href={`/${lang}/news/${item.slug}`} className="flex items-center gap-2.5 group/item border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                        <div className="h-[48px] w-[62px] min-w-[62px] max-w-[62px] overflow-hidden rounded bg-slate-100 shrink-0">
                          <img src={item.featuredImageUrl || item.img} alt="" className="h-full w-full object-cover group-hover/item:scale-105 transition-transform" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 text-xs font-bold text-slate-900 group-hover/item:text-[#d70b18] transition-colors leading-tight">{item.title}</h3>
                          <p className="mt-0.5 text-[9.5px] text-slate-400 font-medium">{formattedDate}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Ad Banner Box */}
            <div className="rounded-lg bg-gradient-to-br from-[#1e1b4b] to-[#311b92] p-4 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-base font-black leading-snug text-white max-w-[200px]">
                  {lang === 'en' ? 'Best Advertising Platform for Your Business' : lang === 'hi' ? 'आपके व्यवसाय के लिए सर्वश्रेष्ठ विज्ञापन मंच' : 'আপনার ব্যবসার জন্য সেরা বিজ্ঞাপন প্ল্যাটফর্ম'}
                </h2>
                <Link
                  href="/advertise"
                  className="mt-3 inline-block rounded bg-amber-400 px-3.5 py-1.5 text-xs font-black text-slate-900 hover:bg-amber-300 transition-colors shadow-sm"
                >
                  {lang === 'en' ? 'Advertise' : lang === 'hi' ? 'विज्ञापन दें' : 'বিজ্ঞাপন দিন'}
                </Link>
              </div>
              <div className="absolute right-2 bottom-2 opacity-20 pointer-events-none">
                <Globe2 size={90} className="text-white" />
              </div>
            </div>

            {/* Newsletter Subscribe Box */}
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
              <h2 className="text-sm font-extrabold text-slate-900">{lang === 'en' ? 'Subscribe to Newsletter' : lang === 'hi' ? 'न्यूज़लेटर की सदस्यता लें' : 'নিউজলেটার সাবস্ক্রাইব করুন'}</h2>
              <p className="mt-0.5 text-xs text-slate-500 font-medium">{lang === 'en' ? 'Subscribe to get the latest news delivered directly to your email.' : lang === 'hi' ? 'ईमेल में ताज़ा खबरें पाने के लिए सदस्यता लें' : 'সর্বশেষ খবর সরাসরি ইমেইলে পেতে সাবস্ক্রাইব করুন'}</p>
              {sideSubscribed ? (
                <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle size={15} />
                  <span>{lang === 'en' ? 'Subscribed Successfully!' : lang === 'hi' ? 'सदस्यता सफलतापूर्वक ली गई!' : 'সাবস্ক্রাইব সম্পন্ন হয়েছে!'}</span>
                </div>
              ) : (
                <form onSubmit={handleSideSubscribe} className="mt-3 space-y-2">
                  <input
                    type="email"
                    required
                    value={sideEmail}
                    onChange={(e) => setSideEmail(e.target.value)}
                    placeholder={lang === 'en' ? 'Enter your email' : lang === 'hi' ? 'अपना ईमेल दर्ज करें' : 'আপনার ইমেইল দিন'}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#d70b18] focus:bg-white"
                  />
                  <button type="submit" className="w-full rounded bg-[#d70b18] py-2 text-xs font-black uppercase text-white hover:bg-red-700 transition-colors shadow-xs cursor-pointer">
                    {lang === 'en' ? 'Subscribe' : lang === 'hi' ? 'सब्सक्राइब करें' : 'সাবস্ক্রাইব করুন'}
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Fixed Bottom Action Bar — Exact Mockup Match */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#8b0010] via-[#ab0012] to-[#c0000f] text-white/80 backdrop-blur-xl border-t border-x border-red-800/80 rounded-t-2xl px-4 py-2.5 flex items-center justify-around shadow-[0_-6px_30px_rgba(139,0,16,0.4)]">
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-extrabold transition-colors ${isBookmarked ? 'text-white font-black' : 'text-white/80 hover:text-white'}`}
        >
          <Bookmark size={19} className={isBookmarked ? 'fill-white text-white' : 'text-white/80'} />
          <span>{isBookmarked ? (lang === 'en' ? 'Saved' : lang === 'hi' ? 'सहेजा गया' : 'সংরক্ষিত') : (lang === 'en' ? 'Bookmark' : lang === 'hi' ? 'बुकमार्क' : 'বুকমার্ক')}</span>
        </button>

        <a href="#comments" className="flex flex-col items-center gap-0.5 text-[10px] font-extrabold text-white/80 hover:text-white transition-colors">
          <MessageCircle size={19} className="text-white/80" />
          <span>{lang === 'en' ? '12 Comments' : lang === 'hi' ? '12 टिप्पणियां' : '১২ মন্তব্য'}</span>
        </a>

        <button
          onClick={() => {
            setHasLiked(!hasLiked);
            setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1);
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-extrabold transition-colors ${hasLiked ? 'text-white font-black' : 'text-white/80 hover:text-white'}`}
        >
          <ThumbsUp size={19} className={hasLiked ? 'fill-white text-white' : 'text-white/80'} />
          <span>{likesCount} {lang === 'en' ? 'Likes' : lang === 'hi' ? 'पसंद' : 'লাইক'}</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-0.5 text-[10px] font-extrabold text-white/80 hover:text-white transition-colors"
        >
          <Share2 size={19} className="text-white/80" />
          <span>{copiedLink ? (lang === 'en' ? 'Copied' : lang === 'hi' ? 'कॉपी हुआ' : 'কপি হয়েছে') : (lang === 'en' ? 'Share' : lang === 'hi' ? 'शेयर' : 'শেয়ার')}</span>
        </button>
      </div>
    </div>
  );
}
