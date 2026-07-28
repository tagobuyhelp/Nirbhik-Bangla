'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const { locale, t } = useLanguage();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:5000/api/v1/public/news?search=${encodeURIComponent(query.trim())}&lang=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setResults(data.data);
        }
      })
      .catch((err) => console.log('Search fetch error:', err))
      .finally(() => setLoading(false));
  }, [query, locale]);

  const backHomeText = locale === 'en' ? 'Back to Home' : locale === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'হোমপেজে ফিরে যান';
  const searchResultTitle = locale === 'en' ? 'Search Results' : locale === 'hi' ? 'खोज परिणाम' : 'অনুসন্ধানের ফলাফল';

  return (
    <div className="bg-slate-50 py-8 min-h-screen text-slate-900">
      <div className="mx-auto max-w-[1000px] px-4">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#d70b18] mb-6">
          <ArrowLeft size={16} /> {backHomeText}
        </Link>

        <div className="rounded border border-slate-200 bg-white p-6 shadow-sm mb-6 flex items-center gap-3">
          <Search size={24} className="text-[#d70b18]" />
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">{searchResultTitle}</span>
            <h1 className="text-xl font-black text-slate-900">"{query}"</h1>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm font-bold text-slate-500">{t('common.loading')}</div>
        ) : results.length === 0 ? (
          <div className="py-12 text-center text-sm font-bold text-slate-500">{t('common.no_results')}</div>
        ) : (
          <div className="space-y-4">
            {results.map((item) => {
              const formattedDate = item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'hi' ? 'hi-IN' : 'bn-BD', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '';

              return (
                <Link
                  key={item.id}
                  href={`/${locale}/news/${item.slug}`}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded border border-slate-200 bg-white hover:shadow transition-all group"
                >
                  <img
                    src={item.featuredImageUrl || '/placeholder-news.jpg'}
                    alt={item.title}
                    className="h-32 w-full sm:w-48 rounded object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black text-[#d70b18] uppercase tracking-wider block mb-1">
                        {item.categoryName}
                      </span>
                      <h2 className="text-base font-bold text-slate-900 group-hover:text-[#d70b18] transition-colors">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">{item.excerpt}</p>
                    </div>
                    <p className="mt-3 text-[10px] font-semibold text-slate-500">{formattedDate}</p>
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

export default function SearchPage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-600">{t('common.loading')}</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}

