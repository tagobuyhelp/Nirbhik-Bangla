'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Search, X, Sparkles, Calendar, Tag, MapPin, ChevronRight, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { API_BASE_URL } from '@/utils/config';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawQuery = searchParams?.get('q') || searchParams?.get('tag') || searchParams?.get('district') || '';
  const { locale, t } = useLanguage();

  const [inputVal, setInputVal] = useState(rawQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInputVal(rawQuery);
  }, [rawQuery]);

  useEffect(() => {
    if (!rawQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API_BASE_URL}/public/news?search=${encodeURIComponent(rawQuery.trim())}&lang=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setResults(data.data);
        } else {
          setResults([]);
        }
      })
      .catch((err) => {
        console.log('Search error:', err);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [rawQuery, locale]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  const trendingTags = locale === 'en'
    ? ['Asansol', 'Paschim Bardhaman', 'Politics', 'Durgapur', 'Sports', 'Kolkata']
    : locale === 'hi'
    ? ['आसनसोल', 'पश्चिम बर्धमान', 'राजनीति', 'दुर्गापुर', 'खेल', 'कोलकाता']
    : ['আসানসোল', 'পশ্চিম বর্ধমান', 'রাজনীতি', 'দুর্গাপুর', 'খেলা', 'কলকাতা'];

  const backText = locale === 'en' ? 'Back to Home' : locale === 'hi' ? 'मुख्य पृष्ठ' : 'প্রচ্ছদে ফিরে যান';
  const placeholderText = locale === 'en' ? 'Search news headlines, topics, places...' : locale === 'hi' ? 'समाचार, विषय या शहर खोजें...' : 'সংবাদের শিরোনাম, বিষয় বা এলাকা অনুসন্ধান করুন...';
  const foundText = locale === 'en' ? 'news articles found for' : locale === 'hi' ? 'समाचार लेख मिले' : 'টি সংবাদ প্রতিবেদন পাওয়া গেছে';
  const noResultText = locale === 'en' ? 'No news found matching your query.' : locale === 'hi' ? 'आपकी खोज के लिए कोई समाचार नहीं मिला।' : 'আপনার অনুসন্ধানের সাথে মিলে এমন কোনো সংবাদ পাওয়া যায়নি।';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 py-8 px-4 md:px-8 font-outfit">
      <div className="mx-auto max-w-[1050px] space-y-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#eb1c24] transition-colors">
            <ArrowLeft size={16} /> {backText}
          </Link>
          <div className="text-xs font-bold text-slate-400">Nirbhik Bangla Search Engine</div>
        </div>

        {/* Live Search Input Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
          <form onSubmit={handleFormSubmit} className="relative flex items-center">
            <Search size={22} className="absolute left-4 text-[#eb1c24] shrink-0" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={placeholderText}
              className="w-full bg-slate-50 pl-12 pr-28 py-3.5 rounded-full border border-slate-200 font-bold text-sm md:text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all"
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => setInputVal('')}
                className="absolute right-24 text-slate-400 hover:text-slate-700 p-1"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 bg-[#eb1c24] hover:bg-[#c0000f] text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-md transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick Trending Filter Tags */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-extrabold flex items-center gap-1">
              <TrendingUp size={13} className="text-[#eb1c24]" /> Trending:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setInputVal(tag);
                  router.push(`/search?q=${encodeURIComponent(tag)}`);
                }}
                className="bg-slate-100 hover:bg-red-50 hover:text-[#eb1c24] hover:border-red-200 border border-slate-200 text-slate-700 font-bold px-3 py-1 rounded-full text-[11px] transition-all"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary Header */}
        {rawQuery && (
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-lg md:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>"{rawQuery}"</span>
              </h1>
              <p className="text-xs font-semibold text-slate-500">
                {results.length} {foundText} "{rawQuery}"
              </p>
            </div>
          </div>
        )}

        {/* Search Results List */}
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#eb1c24] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-extrabold text-slate-500">Searching news database...</p>
          </div>
        ) : results.length === 0 ? (
          rawQuery ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 bg-red-50 text-[#eb1c24] rounded-full flex items-center justify-center mx-auto">
                <Search size={28} />
              </div>
              <h2 className="text-base font-extrabold text-slate-900">{noResultText}</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">Try searching for keywords like "আসানসোল", "রাজনীতি", "পশ্চিম বর্ধমান" or broader news topic names.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3 shadow-xs">
              <Sparkles size={32} className="text-[#eb1c24] mx-auto" />
              <h2 className="text-base font-extrabold text-slate-900">Search Nirbhik Bangla News Portal</h2>
              <p className="text-xs text-slate-500">Type any headline, category or location above to get instant news reports.</p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 gap-4">
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
                  key={item.id || item._id}
                  href={`/${locale}/news/${item.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-red-200 transition-all flex flex-col sm:flex-row gap-4 group"
                >
                  <img
                    src={item.featuredImageUrl || '/placeholder-news.jpg'}
                    alt={item.title}
                    className="h-44 sm:h-32 w-full sm:w-48 rounded-xl object-cover bg-slate-100 shrink-0 group-hover:scale-[1.02] transition-transform"
                  />
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-red-50 text-[#eb1c24] border border-red-100 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                          {item.categoryName || 'News'}
                        </span>
                        {formattedDate && (
                          <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                            <Calendar size={12} /> {formattedDate}
                          </span>
                        )}
                      </div>
                      <h2 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-[#eb1c24] transition-colors leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.excerpt || item.summary || item.content?.substring(0, 140)}...
                      </p>
                    </div>

                    <div className="flex items-center text-xs font-extrabold text-[#eb1c24] gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Full Report</span>
                      <ChevronRight size={14} />
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

export default function SearchPage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-bold text-slate-500">Loading search engine...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
