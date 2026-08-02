'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Eye, Calendar, Sparkles, Filter, RefreshCw, ArrowLeft, Tag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export default function VideosClientView({ lang = 'bn' }) {
  const { t } = useLanguage();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredVideoId, setHoveredVideoId] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/videos?limit=24`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setVideos(data.data);
      }
    } catch (err) {
      console.error('Error loading video list:', err);
    } finally {
      setLoading(false);
    }
  };

  // Categories extraction
  const categories = ['all', ...new Set(videos.map(v => v.category).filter(Boolean))];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  const featuredVideo = filteredVideos[0];
  const remainingVideos = filteredVideos.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-outfit text-slate-800">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href={`/${lang}`} className="hover:text-red-600 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> হোম
            </Link>
            <span>/</span>
            <span className="text-red-600 font-extrabold">ভিডিও মিডিয়া হাব</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-bangla flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-red-600 text-white shadow-md">
              <Play size={22} fill="white" className="ml-0.5" />
            </span>
            <span>{t('home.video_news') || 'নির্ভীক বাংলা ভিডিও মিডিয়া হাব'}</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-bangla mt-1">
            সর্বশেষ ভিডিও বুলেটিন, এক্সক্লুসিভ গ্রাউন্ড কভারেজ ও খবরের ভিডিও গ্যালারি।
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white border-red-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-red-300 hover:text-red-600'
              }`}
            >
              {cat === 'all' ? 'সব ভিডিও' : cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-500">ভিডিও তালিকা লোড হচ্ছে...</p>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
          <p className="text-base font-bold text-slate-700">কোনো ভিডিও পাওয়া যায়নি!</p>
          <button
            onClick={fetchVideos}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700"
          >
            <RefreshCw size={14} /> পুনরায় চেষ্টা করুন
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Featured Hero Video Card */}
          {featuredVideo && (
            <div className="bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-0 group">
              <div className="lg:col-span-8 relative aspect-video bg-black overflow-hidden">
                {hoveredVideoId === featuredVideo._id && featuredVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${featuredVideo.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                    title={featuredVideo.title?.[lang] || featuredVideo.title?.bn || ''}
                    className="w-full h-full border-0 pointer-events-none scale-105"
                    allow="autoplay"
                  />
                ) : (
                  <>
                    <img
                      src={featuredVideo.thumbnail || 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80'}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Link
                        href={`/${lang}/videos/${featuredVideo.slug || featuredVideo._id}`}
                        className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110"
                      >
                        <Play size={28} fill="white" className="ml-1" />
                      </Link>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono px-2 py-0.5 rounded-md border border-slate-700">
                      {featuredVideo.duration || '05:20'}
                    </span>
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
                      {featuredVideo.category || 'Featured'}
                    </span>
                  </>
                )}
              </div>

              <div
                className="lg:col-span-4 p-6 md:p-8 flex flex-col justify-between space-y-4 bg-gradient-to-b from-slate-900 to-slate-950"
                onMouseEnter={() => setHoveredVideoId(featuredVideo._id)}
                onMouseLeave={() => setHoveredVideoId(null)}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600/20 text-red-500 border border-red-500/30 text-[10px] font-mono font-black px-2 py-0.5 rounded-full uppercase">
                      বিশেষ কভারেজ
                    </span>
                  </div>
                  <Link href={`/${lang}/videos/${featuredVideo.slug || featuredVideo._id}`}>
                    <h2 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-red-400 transition-colors leading-snug font-bangla">
                      {featuredVideo.title?.[lang] || featuredVideo.title?.bn || featuredVideo.title}
                    </h2>
                  </Link>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed line-clamp-3 font-bangla">
                    {featuredVideo.description?.[lang] || featuredVideo.description?.bn || featuredVideo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-4 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {new Date(featuredVideo.createdAt || Date.now()).toLocaleDateString('bn-BD')}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300 font-bold">
                    <Eye size={14} /> {(featuredVideo.views || 0).toLocaleString()} ভিউ
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Videos Grid */}
          {remainingVideos.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 font-bangla border-b border-slate-200 pb-2">
                আরও ভিডিও কভারেজ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {remainingVideos.map((vid, idx) => {
                  const titleStr = typeof vid.title === 'object' ? (vid.title[lang] || vid.title.bn) : vid.title;
                  const slugStr = vid.slug || vid._id;
                  const isHovered = hoveredVideoId === (vid._id || idx);

                  return (
                    <div
                      key={vid._id || idx}
                      onMouseEnter={() => setHoveredVideoId(vid._id || idx)}
                      onMouseLeave={() => setHoveredVideoId(null)}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs group flex flex-col justify-between hover:shadow-xl hover:border-red-200 transition-all duration-300"
                    >
                      <div className="relative h-[160px] w-full overflow-hidden bg-slate-900">
                        {isHovered && vid.youtubeId ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                            title={titleStr}
                            className="w-full h-full border-0 pointer-events-none scale-105"
                            allow="autoplay"
                          />
                        ) : (
                          <>
                            <img
                              src={vid.thumbnail || 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=400&q=80'}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                              <Link
                                href={`/${lang}/videos/${slugStr}`}
                                className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-110"
                              >
                                <Play size={18} fill="white" className="ml-0.5" />
                              </Link>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] font-mono px-1.5 py-0.2 rounded">
                              {vid.duration || '03:00'}
                            </span>
                            {vid.category && (
                              <span className="absolute top-2 left-2 bg-red-600 text-white text-[8.5px] font-black px-2 py-0.5 rounded uppercase shadow-xs">
                                {vid.category}
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <Link href={`/${lang}/videos/${slugStr}`}>
                          <h4 className="line-clamp-2 text-xs md:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug font-bangla">
                            {titleStr}
                          </h4>
                        </Link>
                        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2 font-mono">
                          <span>{new Date(vid.createdAt || Date.now()).toLocaleDateString('bn-BD')}</span>
                          <span className="flex items-center gap-1 text-slate-500 font-bold">
                            <Eye size={11} /> {(vid.views || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
