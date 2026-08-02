'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Eye, Share2, ArrowLeft, Calendar, Tag, Sparkles, CheckCircle2 } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export default function VideoClientView({ lang = 'bn', slug, initialVideo }) {
  const [video, setVideo] = useState(initialVideo || null);
  const [loading, setLoading] = useState(!initialVideo);

  useEffect(() => {
    if (!initialVideo && slug) {
      fetch(`${API_BASE_URL}/videos/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setVideo(data.data);
          }
        })
        .catch(err => console.error('Error loading video:', err))
        .finally(() => setLoading(false));
    }
  }, [slug, initialVideo]);

  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/videos?limit=6`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setRelatedVideos(data.data);
        }
      })
      .catch(err => console.error('Error fetching related videos:', err));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-slate-500">ভিডিও লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">ভিডিওটি পাওয়া যায়নি!</h2>
        <p className="text-sm text-slate-500">অনুরোধকৃত ভিডিওটি মোছা হয়ে থাকতে পারে অথবা ভুল লিঙ্ক ব্যবহার করা হয়েছে।</p>
        <Link href={`/${lang}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors">
          <ArrowLeft size={16} /> হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const title = video.seoTitle?.[lang] || video.title?.[lang] || video.title?.bn || '';
  const description = video.seoDescription?.[lang] || video.description?.[lang] || video.description?.bn || '';
  const altText = video.altText?.[lang] || title;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-5 font-outfit text-slate-800">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href={`/${lang}`} className="hover:text-red-600 transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> হোম
        </Link>
        <span>/</span>
        <span className="text-red-600 font-extrabold">{video.category || 'ভিডিও'}</span>
      </div>

      {/* 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Video Content (Col 8) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Video Player */}
          <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative aspect-video">
            {video.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <img src={video.thumbnail} alt={altText} className="w-full h-full object-cover" />
            )}
          </div>

          {/* Video Info Header */}
          <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full font-black text-[11px] uppercase tracking-wider border border-red-100">
                  {video.category || 'ভিডিও'}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar size={13} /> {new Date(video.createdAt || Date.now()).toLocaleDateString('bn-BD')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-slate-600 font-bold font-mono">
                  <Eye size={14} /> {(video.views || 0).toLocaleString()} ভিউ
                </span>
              </div>
            </div>

            <h1 className="text-lg md:text-2xl font-extrabold text-slate-900 leading-snug font-bangla">
              {title}
            </h1>

            {description && (
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-bangla pt-2 border-t border-slate-100">
                {description}
              </p>
            )}

            {/* Tags */}
            {Array.isArray(video.tags) && video.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {video.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-100 flex items-center gap-1">
                    <Tag size={12} /> #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Recommended Videos (Col 4) */}
        <div className="lg:col-span-4 bg-white p-4 md:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 sticky top-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="p-1.5 rounded-xl bg-red-50 text-red-600">
              <Play size={16} fill="#dc2626" />
            </span>
            <h3 className="text-sm font-extrabold text-slate-900 font-bangla">আরও অন্যান্য ভিডিও</h3>
          </div>

          <div className="space-y-3">
            {relatedVideos
              .filter(v => v._id !== video._id && v.slug !== slug)
              .slice(0, 5)
              .map((item, idx) => {
                const itemTitle = item.title?.[lang] || item.title?.bn || item.title || '';
                const itemSlug = item.slug || item._id;
                return (
                  <Link
                    key={item._id || idx}
                    href={`/${lang}/videos/${itemSlug}`}
                    className="flex gap-3 items-center group hover:bg-slate-50 p-2 rounded-2xl transition-all border border-transparent hover:border-slate-200/80"
                  >
                    <div className="relative h-[65px] w-[105px] min-w-[105px] rounded-xl overflow-hidden bg-slate-900 shrink-0">
                      <img src={item.thumbnail || 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=400&q=80'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                          <Play size={10} fill="white" className="ml-0.5" />
                        </span>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[8px] font-mono px-1 rounded">
                        {item.duration || '03:00'}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="line-clamp-2 text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug font-bangla">
                        {itemTitle}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                        {(item.views || 0).toLocaleString()} ভিউ
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

      </div>

    </div>
  );
}
