'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/config';
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Eye,
  Globe2,
  Link2,
  Mail,
  MessageCircle,
  Play,
  Share2,
  Tag as TagIcon,
  ThumbsUp,
  Volume2,
  VolumeX,
} from 'lucide-react';

const fallbackArticle = {
  slug: 'lok-sabha-vote-result',
  categoryName: 'দেশ',
  title: 'লোকসভা ভোটের ফল ঘোষণা আজ, কড়া নিরাপত্তার প্রস্তুতি',
  excerpt: 'সারা দেশে ৪০০০ কেন্দ্রে ভোটগণনা হবে। কমিশনের পক্ষ থেকে জানানো হয়েছে, ফল প্রকাশ না হওয়া পর্যন্ত কড়া নিরাপত্তা বজায় রাখা হবে।',
  author: 'নিজস্ব সংবাদদাতা',
  authorBio: 'রাজনীতি, শাসনব্যবস্থা & প্রশাসনিক বিষয়ক বিশেষ প্রতিনিধি। ৮ বছরের সাংবাদিকতার অভিজ্ঞতা।',
  authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  publishedAt: '২৪ মে ২০২৪, ০৯:১৬ AM',
  featuredImageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=85',
  imageCaption: '',
  imageCredit: '',
  viewsCount: '১৪.৫K',
  content: `
    <p>আজ দেশের রাজনৈতিক ভবিষ্যৎ নির্ধারণের দিন। লোকসভা নির্বাচনের ফল ঘোষণা হবে আজ, শনিবার। সকাল ৮টা থেকে শুরু হয়েছে ভোটগণনার প্রক্রিয়া। সারা দেশে মোট ৪০০০-এর বেশি কেন্দ্রে ভোটগণনা চলছে। নির্বাচন কমিশন সূত্রে খবর, ফল প্রকাশ না হওয়া পর্যন্ত সর্বত্র কড়া নিরাপত্তা বজায় রাখা হয়েছে।</p>
    <p>নির্বাচন কমিশনের আধিকারিক জানিয়েছেন, "প্রতিটি কেন্দ্রে কেন্দ্রীয় বাহিনী মোতায়েন করা হয়েছে। সংবেদনশীল এলাকাগুলিতে ড্রোন নজরদারি এবং সিসিটিভি পর্যবেক্ষণ চলছে। সাইবার সিকিউরিটিও জোরদার করা হয়েছে।"</p>
    <blockquote class="my-4 border-l-4 border-[#d70b18] bg-slate-50 p-4 text-slate-800 font-bold text-sm leading-relaxed rounded-r">
      "আমরা একটি অবাধ, শান্তিপূর্ণ এবং স্বচ্ছ গণনা নিশ্চিত করতে বদ্ধপরিকর। দেশের প্রতিটি নাগরিকের ভোটের মূল্যায়ন সঠিকভাবে হবে।"
    </blockquote>
    <p>প্রধান নির্বাচন কমিশনার বলেছেন, ফলাফল প্রকাশের পর বিজয়ী মিছিল সংক্রান্ত নির্দেশিকাও সমস্ত রাজ্যের রাজ্যপাল এবং মুখ্যসচিবদের পাঠিয়ে দেওয়া হয়েছে। বিশৃঙ্খলা এড়াতে নির্বাচন কমিশনের পক্ষ থেকে কড়া ব্যবস্থা নেওয়ার সতর্কতা দেওয়া হয়েছে।</p>
    <p>ফলাফেলের সর্বশেষ আপডেট পেতে আমাদের সঙ্গে থাকুন...</p>
  `,
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

export default function ArticleClientView({ lang = 'bn', slug = 'lok-sabha-vote-result' }) {
  const [article, setArticle] = useState(fallbackArticle);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [sidebarLatest, setSidebarLatest] = useState([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [fontSizeClass, setFontSizeClass] = useState('text-base');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likesCount, setLikesCount] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);

  const [sideEmail, setSideEmail] = useState('');
  const [sideSubscribed, setSideSubscribed] = useState(false);

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([
    { name: 'অর্ণব সরকার', comment: 'খুবই গুরুত্বপূর্ণ খবর। নির্ভীক বাংলাকে ধন্যবাদ।', date: '১০ মিনিট আগে' },
    { name: 'সুপ্রিয় মুখার্জি', comment: 'সত্য ও নির্ভীক নিরপেক্ষ সংবাদ প্রকাশের জন্য ধন্যবাদ।', date: '১ ঘণ্টা আগে' }
  ]);
  const [commentAdded, setCommentAdded] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentName.trim() && commentText.trim()) {
      const newObj = { name: commentName.trim(), comment: commentText.trim(), date: 'এইমাত্র' };
      setCommentsList([newObj, ...commentsList]);
      setCommentName('');
      setCommentText('');
      setCommentAdded(true);
      setTimeout(() => setCommentAdded(false), 3000);

      try {
        await fetch(`${API_BASE_URL}/public/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            articleSlug: slug,
            name: newObj.name,
            comment: newObj.comment,
          }),
        });
      } catch (err) {
        console.error('Submit comment error:', err);
      }
    }
  };

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
    fetch(`${API_BASE_URL}/public/comments?articleSlug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCommentsList(data.data.map((c) => ({
            name: c.name,
            comment: c.comment,
            date: new Date(c.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'hi' ? 'hi-IN' : 'bn-BD')
          })));
        }
      })
      .catch((err) => console.log('Fetch comments error:', err));
  }, [slug, lang]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/public/news/by-slug/${slug}?lang=${lang}`)
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
  const audioText = isPlayingAudio
    ? (lang === 'en' ? 'Stop' : lang === 'hi' ? 'रोकें' : 'থামুন')
    : (lang === 'en' ? 'Listen to News' : lang === 'hi' ? 'यह खबर सुनें' : 'শুনুন এই খবর');

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

            {/* Author & Share Bar — Parity Match */}
            <div className="flex items-center justify-between border-y border-slate-100 py-2 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={article.author}
                  className="h-8 w-8 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[11.5px] font-black text-slate-900 truncate">
                    <span className="truncate">{article.author}</span>
                    <CheckCircle size={12} className="text-[#d70b18] fill-[#d70b18] text-white shrink-0" />
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 leading-none mt-0.5 whitespace-nowrap">
                    {formatArticleDate(article.publishedAt, lang)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[11px] font-bold text-slate-500 mr-0.5 hidden sm:inline">{shareText}</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="h-7 w-7 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
                  aria-label="Share on Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="h-7 w-7 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
                  aria-label="Share on Twitter"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="h-7 w-7 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
                  aria-label="Share on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
                <button
                  onClick={handleCopyLink}
                  className="h-7 w-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-300 transition-colors shrink-0"
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

            {/* Audio Reader Widget */}
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs flex items-center justify-between gap-2.5">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="flex items-center gap-2 text-slate-900 font-extrabold text-xs shrink-0 hover:text-[#d70b18] transition-colors"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#d70b18] text-white shadow-xs">
                  {isPlayingAudio ? <VolumeX size={14} /> : <Play size={14} fill="white" className="ml-0.5" />}
                </span>
                <span>{audioText}</span>
              </button>

              {/* Equalizer waveform vertical bars */}
              <div className="flex items-center gap-0.5 h-6 flex-1 min-w-[60px] max-w-[200px] justify-center px-1">
                {[40, 65, 80, 50, 90, 70, 45, 85, 100, 60, 40, 75, 95, 55, 35, 70, 80, 60, 45, 75, 50].map((height, i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-full transition-all ${isPlayingAudio ? (i % 2 === 0 ? 'bg-[#d70b18] animate-pulse' : 'bg-red-400') : i < 9 ? 'bg-[#d70b18]' : 'bg-slate-300'}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-slate-500">
                <span>04:35</span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-extrabold text-slate-700">1.0x</span>
              </div>
            </div>

            {/* Article Content Body */}
            <div
              className={`prose max-w-none text-slate-800 leading-relaxed font-medium bengali-article-content ${fontSizeClass}`}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

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
                src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={article.author}
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-black text-slate-900">
                  <span>{article.author}</span>
                  <CheckCircle size={15} className="text-[#d70b18] fill-[#d70b18] text-white" />
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-600 leading-relaxed">
                  {article.authorBio || 'রাজনীতি, শাসনব্যবস্থা & প্রশাসনিক বিষয়ক বিশেষ প্রতিনিধি। ৮ বছরের সাংবাদিকতার অভিজ্ঞতা।'}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <a href="#" className="h-6 w-6 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-[10px] font-bold">f</a>
                  <a href="#" className="h-6 w-6 rounded-full bg-[#1da1f2] text-white flex items-center justify-center text-[10px] font-bold">𝕏</a>
                  <a href="#" className="h-6 w-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center"><Mail size={12} /></a>
                </div>
              </div>
            </div>

            {/* Interactive Readers Comments Section */}
            <div id="comments" className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                  <MessageCircle size={18} className="text-[#d70b18]" />
                  <span>{lang === 'en' ? 'Reader Comments' : lang === 'hi' ? 'पाठक टिप्पणियाँ' : 'পাঠকদের মতামত ও মন্তব্য'} ({commentsList.length})</span>
                </div>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {commentAdded && (
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle size={14} />
                    <span>{lang === 'en' ? 'Your comment has been posted!' : lang === 'hi' ? 'आपकी टिप्पणी पोस्ट कर दी गई है!' : 'আপনার মন্তব্য প্রকাশ করা হয়েছে!'}</span>
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">{lang === 'en' ? 'Your Name' : lang === 'hi' ? 'आपका नाम' : 'আপনার নাম'}</label>
                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder={lang === 'en' ? 'Enter your name...' : lang === 'hi' ? 'अपना नाम दर्ज करें...' : 'আপনার নাম লিখুন...'}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 outline-none focus:border-[#d70b18] bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">{lang === 'en' ? 'Your Comment / Opinion' : lang === 'hi' ? 'आपकी टिप्पणी' : 'আপনার মতামত'}</label>
                  <textarea
                    rows={3}
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={lang === 'en' ? 'Write your opinion on this news...' : lang === 'hi' ? 'इस खबर पर अपनी राय लिखें...' : 'এই খবরের বিষয়ে আপনার বক্তব্য লিখুন...'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 outline-none focus:border-[#d70b18] bg-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#d70b18] hover:bg-red-700 text-white font-extrabold text-xs px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Post Comment' : lang === 'hi' ? 'टिप्पणी पोस्ट करें' : 'মন্তব্য প্রকাশ করুন'}
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-3 divide-y divide-slate-100 pt-1">
                {commentsList.map((c, i) => (
                  <div key={i} className="pt-2.5 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-900">{c.name}</span>
                      <span className="text-[10px] font-medium text-slate-400">{c.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{c.comment}</p>
                  </div>
                ))}
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
            <div className="rounded-lg bg-[#07090c] p-3.5 text-white shadow-xs">
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-1 rounded bg-[#d70b18]" />
                  <h2 className="text-sm font-extrabold text-white">LIVE TV</h2>
                </div>
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
                  <p className="text-[9.5px] text-white/70">{lang === 'en' ? '24x7 Fearless News' : lang === 'hi' ? '24x7 निष्पक्ष समाचार' : '24x7 নির্ভীক সংবাদ'}</p>
                </div>
                <Link href={`/${lang}/live`} className="rounded bg-[#d70b18] px-3 py-1 text-[11px] font-extrabold text-white hover:bg-red-700 transition-colors">
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
