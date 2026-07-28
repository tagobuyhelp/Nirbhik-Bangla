'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const categoryNamesFallback = {
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

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug || 'latest';
  const { locale, t } = useLanguage();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = `http://localhost:5000/api/v1/public/news?lang=${locale}`;
    if (slug !== 'all' && slug !== 'latest') {
      if (slug === 'breaking') {
        url += '&isBreaking=true';
      } else if (slug === 'popular') {
        url += '&isTrending=true';
      } else {
        url += `&category=${encodeURIComponent(slug)}`;
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setArticles(data.data);
        }
      })
      .catch((err) => console.log('Category news fetch error:', err))
      .finally(() => setLoading(false));
  }, [slug, locale]);

  const translatedCatName = t(`category_names.${slug}`);
  const categoryTitle = translatedCatName && !translatedCatName.startsWith('category_names.')
    ? translatedCatName
    : categoryNamesFallback[slug] || slug;

  const backHomeText = locale === 'en' ? 'Back to Home' : locale === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'হোমপেজে ফিরে যান';
  const categoryBadgeText = locale === 'en' ? 'Category' : locale === 'hi' ? 'श्रेणी' : 'ক্যাটাগরি';
  const articlesCountSuffix = locale === 'en' ? 'articles' : locale === 'hi' ? 'खबरें' : 'টি খবর';
  const noArticlesText = locale === 'en' ? 'No articles found in this category' : locale === 'hi' ? 'इस श्रेणी में कोई खबर नहीं मिली' : 'এই বিভাগে কোন খবর পাওয়া যায়নি';

  return (
    <div className="bg-slate-50 py-8 min-h-screen text-slate-900">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Back Link */}
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#d70b18] mb-6">
          <ArrowLeft size={16} /> {backHomeText}
        </Link>

        {/* Category Header */}
        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#d70b18]">{categoryBadgeText}</span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-1 capitalize">{categoryTitle}</h1>
          </div>
          <span className="rounded bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {articles.length} {articlesCountSuffix}
          </span>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="py-12 text-center text-sm font-bold text-slate-500">{t('common.loading')}</div>
        ) : articles.length === 0 ? (
          <div className="py-12 text-center text-sm font-bold text-slate-500">{noArticlesText}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((item) => {
              const itemTitle = item.title || 'শিরোনাম';
              const itemExcerpt = item.excerpt || '';
              const itemImage = item.featuredImageUrl || '/placeholder-news.jpg';
              const formattedDate = item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'hi' ? 'hi-IN' : 'bn-BD', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '';

              return (
                <Link key={item.id} href={`/${locale}/news/${item.slug}`} className="group overflow-hidden rounded border border-slate-200 bg-white shadow-xs hover:shadow transition-all flex flex-col">
                  <div className="h-[200px] w-full bg-slate-100 overflow-hidden shrink-0">
                    <img src={itemImage} alt={itemTitle} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black text-[#d70b18] uppercase tracking-wider block mb-1">
                        {item.categoryName}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#d70b18] transition-colors leading-snug line-clamp-2">
                        {itemTitle}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {itemExcerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-slate-400 border-t border-slate-100 pt-3">
                      <span className="flex items-center gap-1"><CalendarDays size={13} /> {formattedDate}</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {item.author || 'নিজস্ব সংবাদদাতা'}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

