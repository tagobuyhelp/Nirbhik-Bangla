'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { io } from 'socket.io-client';
import { useLanguage } from '@/context/LanguageContext';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Settings,
  Maximize2,
  Tv,
  ArrowRight,
  Home,
  Radio,
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';
const SOCKET_URL = API_BASE_URL.replace('/api/v1', '');

export default function LiveClientView() {
  const { t, localized } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liveSession, setLiveSession] = useState(null);
  const [recentRecordings, setRecentRecordings] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // 1. Fetch Current Live Session
    const fetchCurrentSession = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/live/current`);
        const data = await res.json();
        if (data.success && data.data) {
          setLiveSession(data.data);
        }
      } catch (err) {
        console.error('Error fetching live session:', err);
      }
    };

    fetchCurrentSession();

    // 2. Setup Socket.IO for real-time state changes
    const socket = io(SOCKET_URL);
    socket.on('connect', () => console.log('Live TV Connected to Socket'));
    
    socket.on('live_started', (session) => setLiveSession(session));
    socket.on('live_updated', (session) => setLiveSession(session));
    socket.on('stream_ended', (session) => setLiveSession(session));

    // 3. Fetch schedules
    fetch(`${API_BASE_URL}/schedules`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setSchedules(data.data);
        }
      })
      .catch(console.error);

    // 4. Fetch recent live videos (Video Library reuse for 'archived' streams)
    fetch(`${API_BASE_URL}/live/sessions?status=archived&limit=4`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setRecentRecordings(data.data);
        }
      })
      .catch(console.error);

    return () => socket.disconnect();
  }, []);

  const getEmbedUrl = (session) => {
    if (!session) return null;
    switch (session.sourceType) {
      case 'youtube':
        if (session.youtubeVideoId) return `https://www.youtube.com/embed/${session.youtubeVideoId}?autoplay=1&mute=${isMuted ? 1 : 0}`;
        if (session.youtubeUrl) {
          const ytMatch = session.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
          if (ytMatch && ytMatch[1]) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=${isMuted ? 1 : 0}`;
        }
        return null;
      case 'facebook':
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(session.facebookUrl)}&show_text=false&autoplay=1`;
      case 'embed':
        return session.embedUrl;
      default:
        return null;
    }
  };

  const renderDynamicPlayer = () => {
    if (liveSession?.status === 'live' && isPlaying) {
      const url = getEmbedUrl(liveSession);
      if (url) {
        return (
          <>
            <iframe
              src={url}
              title={localized(liveSession.title) || 'Live Stream'}
              className="w-full h-full border-0 absolute inset-0 z-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex items-center gap-2 pointer-events-none">
              <div className="bg-[#d70b18] text-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-md text-[10px] md:text-xs font-black tracking-wider uppercase flex items-center gap-1 md:gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-ping inline-block" /> LIVE
              </div>
            </div>
          </>
        );
      }
    }
    
    // Offline Poster / Upcoming State
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center select-none"
        style={{ background: 'radial-gradient(circle at center, #7f1d1d 0%, #450a0a 35%, #090d16 85%, #000000 100%)' }}
      >
        <div className="absolute w-[260px] h-[260px] md:w-[500px] md:h-[500px] rounded-full border border-red-500/20 animate-pulse pointer-events-none" />
        <div className="absolute w-[180px] h-[180px] md:w-[360px] md:h-[360px] rounded-full border border-red-600/30 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <div className="flex items-center gap-1.5 md:gap-2 mb-2">
            <span className="text-white font-black text-xl md:text-3xl tracking-widest uppercase">NIRBHIK BANGLA</span>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#d70b18] flex items-center justify-center p-1 md:p-1.5 shadow-lg">
              <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          {liveSession?.status === 'scheduled' ? (
            <div className="mt-4">
              <span className="bg-orange-500 text-white text-xs md:text-sm font-black px-3 py-1 rounded-md uppercase shadow-md mb-2 inline-block">
                {t('live.upcoming')}
              </span>
              <h2 className="text-white font-bold text-lg md:text-xl">{localized(liveSession.title)}</h2>
              <p className="text-white/80 text-sm mt-1">{t('live.starting_soon')}</p>
            </div>
          ) : (
            <div className="mt-2 text-white/70 text-sm">{t('live.offline')}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-3 md:py-6 px-0 md:px-6 pb-20 md:pb-6 font-outfit">
      <div className="max-w-[1360px] mx-auto">
        {/* Breadcrumb & Header with padding on mobile */}
        <div className="px-3 md:px-0">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-3">
            <Home size={13} className="text-slate-600" />
            <Link href="/" className="hover:text-[#d70b18] transition-colors">{t('nav.home')}</Link>
            <span className="text-slate-400">›</span>
            <span className="text-slate-800 font-bold">{t('live.title')}</span>
          </nav>

          <div className="mb-3 md:mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-5 md:h-6 bg-[#d70b18] rounded-full inline-block" />
              <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{t('live.title')}</h1>
            </div>
            <p className="text-xs md:text-sm font-medium text-slate-500 mt-0.5 md:mt-1 pl-4">{t('live.tagline')}</p>
          </div>
        </div>

        {/* Desktop Side-by-Side Grid, Mobile Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Video Player: Zero Margin & Padding + No Rounded Corners on Mobile */}
            <div className="relative w-full aspect-video rounded-none md:rounded-2xl overflow-hidden bg-black shadow-xl md:border md:border-slate-950/20 group">
              {renderDynamicPlayer()}
            </div>

            {/* Session Info with Padding on Mobile */}
            <div className="px-3 md:px-0">
              <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start gap-3 md:gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Radio size={18} className="text-[#d70b18] shrink-0" />
                    <h2 className="text-base md:text-xl font-extrabold text-slate-900">
                      {liveSession ? localized(liveSession.title) : 'Nirbhik Bangla TV'}
                    </h2>
                    {liveSession?.status === 'live' && (
                      <span className="bg-[#d70b18] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">LIVE</span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed mt-2">
                    {localized(liveSession?.description) || t('live.default_desc')}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar / Recent Recordings */}
          <div className="lg:col-span-4 flex flex-col gap-5 md:gap-6 px-3 md:px-0">
            <div>
              <h3 className="font-extrabold text-sm md:text-base text-slate-900 mb-3 px-1">{t('live.recent_videos')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2.5 md:gap-3">
                {recentRecordings.map((video) => (
                  <div key={video._id} className="flex flex-col lg:flex-row gap-2 md:gap-3 bg-white p-2 md:p-2.5 rounded-xl border border-slate-200/80 shadow-2xs cursor-pointer group">
                    <div className="relative w-full lg:w-[120px] aspect-video rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-slate-900">
                      {video.thumbnail && <img src={video.thumbnail} alt="thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />}
                      <span className="absolute top-1 right-1 bg-black/75 backdrop-blur-xs text-white text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded z-10">{video.duration || 'Archive'}</span>
                      <Play size={18} className="text-white/80 group-hover:scale-110 transition-transform z-0 relative" />
                    </div>
                    <div className="flex flex-col justify-between flex-1 px-1 lg:px-0">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#d70b18] transition-colors mt-1 lg:mt-0">{localized(video.title)}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
