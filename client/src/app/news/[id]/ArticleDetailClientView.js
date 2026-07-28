'use client';

import { useState, useEffect } from 'react';
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
import { useLanguage } from '@/context/LanguageContext';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.id || 'news';
  const { locale, t } = useLanguage();

  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(12);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/public/news/by-slug/${slug}?lang=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setArticleData(data.data);
        }
      })
      .catch((err) => console.log('Article detail fetch error:', err))
      .finally(() => setLoading(false));
  }, [slug, locale]);

  const backHomeText = locale === 'en' ? 'Back to Home' : locale === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'হোমপেজে ফিরে যান';
  const shareText = locale === 'en' ? 'Share' : locale === 'hi' ? 'शेयर करें' : 'শেয়ার করুন';
  const likeText = locale === 'en' ? 'Like' : locale === 'hi' ? 'पसंद करें' : 'পছন্দ হয়েছে';
  const socialShareText = locale === 'en' ? 'Share on Social Media' : locale === 'hi' ? 'सोशल मीडिया पर शेयर करें' : 'সোশ্যাল মিডিয়ায় শেয়ার করুন';
  const readSuffix = locale === 'en' ? 'views' : locale === 'hi' ? 'बार पढ़ा गया' : 'পঠিত';

  if (loading) {
    return (
      <div className="bg-slate-50 py-16 min-h-screen text-center text-slate-500 font-bold">
        {t('common.loading')}
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="bg-slate-50 py-16 min-h-screen text-center">
        <h2 className="text-lg font-bold text-slate-700">{t('common.no_results')}</h2>
        <Link href={`/${locale}`} className="mt-4 inline-block text-xs font-bold text-[#d70b18] hover:underline">
          {backHomeText}
        </Link>
      </div>
    );
  }

  const formattedDate = articleData.publishedAt
    ? new Date(articleData.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'hi' ? 'hi-IN' : 'bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className="bg-slate-50 py-8 min-h-screen text-slate-900">
      <div className="mx-auto max-w-[1000px] px-4">
        {/* Back Link */}
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#d70b18] mb-6">
          <ArrowLeft size={16} /> {backHomeText}
        </Link>

        {/* Article Container */}
        <article className="rounded border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          {/* Tag & Title */}
          <span className="inline-block rounded bg-[#d70b18] px-3 py-1 text-xs font-black text-white uppercase mb-4">
            {articleData.categoryName}
          </span>
          <h1 className="text-2xl md:text-4xl font-black leading-tight text-slate-900 mb-4">
            {articleData.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between border-y border-slate-100 py-3 text-xs text-slate-500 mb-6 gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <CircleUserRound size={15} /> {articleData.author || 'নিজস্ব সংবাদদাতা'}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} /> {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-semibold">
                <Eye size={15} /> {articleData.viewsCount || 0} {readSuffix}
              </span>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(window.location.href);
                    alert(locale === 'en' ? 'Link copied!' : locale === 'hi' ? 'लिंक कॉपी हो गया!' : 'লিঙ্ক কপি করা হয়েছে!');
                  }
                }}
                className="flex items-center gap-1 text-[#d70b18] font-bold hover:underline"
                aria-label="Share article"
              >
                <Share2 size={15} /> {shareText}
              </button>
            </div>
          </div>

          {/* Main Image */}
          {articleData.featuredImageUrl && (
            <div className="mb-6 overflow-hidden rounded bg-slate-100">
              <img src={articleData.featuredImageUrl} alt={articleData.title} className="w-full h-auto max-h-[500px] object-cover" />
            </div>
          )}

          {/* Excerpt callout if present */}
          {articleData.excerpt && (
            <p className="mb-6 text-base font-bold text-slate-700 border-l-4 border-[#d70b18] pl-4 py-1 italic bg-slate-50 rounded-r">
              {articleData.excerpt}
            </p>
          )}

          {/* Body Paragraphs / HTML content */}
          {articleData.content ? (
            <div
              className="prose max-w-none space-y-4 text-base md:text-lg leading-relaxed text-slate-800 font-normal bengali-article-content"
              dangerouslySetInnerHTML={{ __html: articleData.content }}
            />
          ) : (
            <p className="text-slate-500 italic">No content available.</p>
          )}

          {/* Interaction Bar */}
          <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-4">
            <button
              onClick={() => {
                setHasLiked(!hasLiked);
                setLikes(hasLiked ? likes - 1 : likes + 1);
              }}
              className={`flex items-center gap-2 rounded px-4 py-2 text-xs font-bold transition-colors ${
                hasLiked ? 'bg-[#d70b18] text-white' : 'bg-slate-100 text-slate-700 hover:bg-[#d70b18] hover:text-white'
              }`}
            >
              <ThumbsUp size={16} /> {likeText} ({likes})
            </button>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(window.location.href);
                  alert(locale === 'en' ? 'Link copied to clipboard!' : locale === 'hi' ? 'क्लिपबोर्ड पर लिंक कॉपी किया गया!' : 'লিঙ্ক কপি করা হয়েছে!');
                }
              }}
              className="flex items-center gap-2 rounded bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Share2 size={16} /> {socialShareText}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

