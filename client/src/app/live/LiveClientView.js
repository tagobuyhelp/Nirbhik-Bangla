'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
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
import { useLanguage } from '@/context/LanguageContext';

const INITIAL_SCHEDULE = [
  { timeStart: '11:00 AM', timeEnd: '12:00 PM', title: 'দিনের গুরুত্বপূর্ণ খবর', isLive: true },
  { timeStart: '12:00 PM', timeEnd: '01:00 PM', title: 'রাজনীতি বিষয়ক আলোচনা', isLive: false },
  { timeStart: '01:00 PM', timeEnd: '02:00 PM', title: 'আন্তর্জাতিক সংবাদ', isLive: false },
  { timeStart: '02:00 PM', timeEnd: '03:00 PM', title: 'অর্থনীতি ও বাজার বিশ্লেষণ', isLive: false },
  { timeStart: '03:00 PM', timeEnd: '04:00 PM', title: 'খেলার খবর সারাদিন', isLive: false },
  { timeStart: '04:00 PM', timeEnd: '05:00 PM', title: 'দেশের খবর সারাদিন', isLive: false },
  { timeStart: '05:00 PM', timeEnd: '06:00 PM', title: 'সংধ্যার প্রধান সংবাদ', isLive: false },
  { timeStart: '06:00 PM', timeEnd: '07:00 PM', title: 'বিশেষ প্রতিবেদন', isLive: false },
];

const OTHER_SHOWS = [
  {
    id: 1,
    category: 'রাজনীতি আলোচনা',
    title: 'রাজনীতি বিষয়ক আলোচনা',
    time: 'প্রতিদিন 12:00 PM',
    imageBg: 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 50%, #0f172a 100%)',
  },
  {
    id: 2,
    category: 'আন্তর্জাতিক সংবাদ',
    title: 'আন্তর্জাতিক সংবাদ',
    time: 'প্রতিদিন 01:00 PM',
    imageBg: 'linear-gradient(135deg, #1e3a8a 0%, #172554 50%, #030712 100%)',
  },
  {
    id: 3,
    category: 'অর্থনীতি ও বাজার',
    title: 'অর্থনীতি ও বাজার বিশ্লেষণ',
    time: 'প্রতিদিন 02:00 PM',
    imageBg: 'linear-gradient(135deg, #78350f 0%, #451a03 50%, #0f172a 100%)',
  },
  {
    id: 4,
    category: 'খেলার খবর সারাদিন',
    title: 'খেলার খবর সারাদিন',
    time: 'প্রতিদিন 03:00 PM',
    imageBg: 'linear-gradient(135deg, #14532d 0%, #052e16 50%, #022c22 100%)',
  },
];

const BROADCAST_VIDEOS = [
  {
    id: 1,
    title: 'দিনের গুরুত্বপূর্ণ খবর',
    time: '11:00 AM',
    viewers: '1.2K watching',
    isLive: true,
  },
  {
    id: 2,
    title: 'সকালের শীর্ষ সংবাদ',
    time: '10:00 AM',
    viewers: '850 watching',
    isLive: false,
  },
  {
    id: 3,
    title: 'বিশেষ প্রতিবেদন',
    time: '09:00 AM',
    viewers: '620 watching',
    isLive: true,
  },
  {
    id: 4,
    title: 'রাজনৈতিক আপডেট',
    time: '08:00 AM',
    viewers: '510 watching',
    isLive: true,
  },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export default function LiveClientView() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeShowIndex, setActiveShowIndex] = useState(0);
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULE);

  useEffect(() => {
    fetch(`${API_BASE_URL}/schedules`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map(item => ({
            timeStart: item.startTime || '11:00 AM',
            timeEnd: item.endTime || '12:00 PM',
            title: typeof item.title === 'object' ? (item.title.bn || item.title.en) : item.title,
            isLive: item.isLive || item.status === 'Live Now'
          }));
          setSchedules(mapped);
        }
      })
      .catch(err => console.error('Error loading live schedule:', err));
  }, []);

  const currentProgram = schedules[activeShowIndex] || INITIAL_SCHEDULE[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-4 md:py-6 px-3 md:px-6 pb-20 md:pb-6">
      <div className="max-w-[1360px] mx-auto">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-3">
          <Home size={13} className="text-slate-600" />
          <Link href="/" className="hover:text-[#d70b18] transition-colors">
            হোম
          </Link>
          <span className="text-slate-400">›</span>
          <span className="text-slate-800 font-bold">লাইভ টিভি</span>
        </nav>

        {/* Page Title & Subtitle */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-5 md:h-6 bg-[#d70b18] rounded-full inline-block" />
            <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              লাইভ টিভি
            </h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-slate-500 mt-0.5 md:mt-1 pl-4">
            সত্য প্রকাশে নির্ভীক, জনগণের কণ্ঠস্বর
          </p>
        </div>

        {/* Main Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">

          {/* LEFT MAIN COLUMN (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-4">

            {/* 1. Main Video Player Box */}
            <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-black shadow-xl border border-slate-950/20 group">

              {/* Player Canvas Graphic / Poster Backdrop */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center select-none"
                style={{
                  background: 'radial-gradient(circle at center, #7f1d1d 0%, #450a0a 35%, #090d16 85%, #000000 100%)',
                }}
              >
                {/* Tech Ring Background Animations */}
                <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-red-500/20 animate-pulse pointer-events-none" />
                <div className="absolute w-[220px] h-[220px] md:w-[360px] md:h-[360px] rounded-full border border-red-600/30 pointer-events-none" />

                {/* Central Poster Branding */}
                <div className="relative z-10 flex flex-col items-center text-center px-4">
                  {/* NIRBHIK BANGLA Header Logo */}
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <span className="text-white font-black text-xl md:text-3xl tracking-widest uppercase">
                      NIRBHIK
                    </span>
                    <span className="text-white font-black text-xl md:text-3xl tracking-widest uppercase">
                      BANGLA
                    </span>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#d70b18] flex items-center justify-center p-1 md:p-1.5 shadow-lg">
                      <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  </div>

                  {/* LIVE TV Button graphic */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-[#d70b18] text-white text-xs md:text-lg font-black px-2.5 py-0.5 md:px-3.5 md:py-1 rounded-md uppercase tracking-wider shadow-md">
                      LIVE
                    </span>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#d70b18] hover:bg-[#b90813] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Play Live TV"
                    >
                      {isPlaying ? (
                        <Pause size={20} className="fill-white md:w-6 md:h-6" />
                      ) : (
                        <Play size={20} className="fill-white ml-0.5 md:w-6 md:h-6" />
                      )}
                    </button>
                    <span className="text-white text-base md:text-2xl font-black tracking-widest uppercase">
                      TV
                    </span>
                  </div>
                </div>
              </div>

              {/* Player Top Left Badges Overlay */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex items-center gap-2">
                <div className="bg-[#d70b18] text-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-md text-[10px] md:text-xs font-black tracking-wider uppercase flex items-center gap-1 md:gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-ping inline-block" />
                  LIVE
                </div>
                <div className="bg-black/65 backdrop-blur-md text-white/95 px-2 py-0.5 md:px-3 md:py-1 rounded-md text-[10px] md:text-xs font-semibold flex items-center gap-1 border border-white/10 shadow-sm">
                  <Eye size={12} className="text-white/80 md:w-3.5 md:h-3.5" />
                  1.2K
                </div>
              </div>

              {/* Player Top Right Fullscreen Expand Icon (Mobile screenshot exact match) */}
              <div className="absolute top-3 right-3 z-20">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-md bg-black/40 backdrop-blur-xs text-white border border-white/20 hover:bg-black/60 transition-colors cursor-pointer"
                  aria-label="Fullscreen"
                >
                  <Maximize2 size={15} />
                </button>
              </div>

              {/* Player Bottom Control Bar Overlay */}
              <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-6 md:pt-10 pb-2.5 md:pb-3 px-3 md:px-4 flex flex-col justify-end text-white">
                {/* Progress bar */}
                <div className="w-full h-1 md:h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer relative mb-2 md:mb-3 transition-all">
                  <div className="h-full bg-[#d70b18] rounded-full w-[35%] relative">
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 bg-white rounded-full shadow-md transform scale-100 group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* Control buttons row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Toggle Play"
                    >
                      {isPlaying ? <Pause size={16} className="md:w-4.5 md:h-4.5" /> : <Play size={16} className="md:w-4.5 md:h-4.5" />}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Toggle Mute"
                    >
                      {isMuted ? <VolumeX size={16} className="md:w-4.5 md:h-4.5" /> : <Volume2 size={16} className="md:w-4.5 md:h-4.5" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5 md:gap-3 text-xs">
                    <div className="flex items-center gap-1 text-[#d70b18] font-extrabold uppercase text-[11px] md:text-xs">
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d70b18]" />
                      LIVE
                    </div>
                    <button className="hover:text-red-400 transition-colors cursor-pointer flex items-center gap-0.5">
                      <Settings size={14} className="md:w-3.5 md:h-3.5" />
                    </button>
                    <button className="hover:text-red-400 transition-colors cursor-pointer hidden md:block">
                      <Tv size={15} />
                    </button>
                    <button className="hover:text-red-400 transition-colors cursor-pointer">
                      <Maximize2 size={14} className="md:w-3.5 md:h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Program Details Card (Below Player) */}
            <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start gap-3 md:gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Radio size={18} className="text-[#d70b18] shrink-0" />
                  <h2 className="text-base md:text-xl font-extrabold text-slate-900">
                    {currentProgram.title}
                  </h2>
                  <span className="bg-[#d70b18] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] md:text-xs font-bold text-slate-500 mt-1 mb-1.5 md:mb-2">
                  {currentProgram.timeStart} - {currentProgram.timeEnd}
                </p>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  দেশ-বিদেশের সর্বশেষ ও গুরুত্বপূর্ণ খবর জানুন আমাদের লাইভ সম্প্রচারে।
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-start mt-1 sm:mt-0">
                <button
                  onClick={() => alert('শেয়ারের লিংক কপি করা হয়েছে!')}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 size={13} className="text-slate-600" />
                  <span>শেয়ার</span>
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`border text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-red-50 border-red-200 text-[#d70b18]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <Bookmark size={13} className={isBookmarked ? 'fill-[#d70b18] text-[#d70b18]' : 'text-slate-600'} />
                  <span>{isBookmarked ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}</span>
                </button>
              </div>
            </div>

            {/* 3. Channel Info / Publisher Card */}
            <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3">
              {/* Top row: Avatar & channel name on left, Subscribe button on right */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5 md:gap-3">
                  {/* Red Circular Lion Avatar */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d70b18] flex items-center justify-center p-2 text-white shadow-sm shrink-0">
                    <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-slate-900 text-sm md:text-base">
                        Nirbhik Bangla TV
                      </h3>
                      <CheckCircle2 size={15} className="text-[#d70b18] fill-[#d70b18]" />
                    </div>
                    <p className="text-[11px] md:text-xs text-slate-500 font-medium mt-0.5">
                      1.25M সাবস্ক্রাইবার
                    </p>
                  </div>
                </div>

                {/* Red Subscribe Button */}
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`px-3.5 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                    isSubscribed
                      ? 'bg-slate-200 text-slate-800'
                      : 'bg-[#d70b18] hover:bg-[#b90813] text-white'
                  }`}
                >
                  <Bell size={14} className={isSubscribed ? 'text-slate-700' : 'fill-white text-white'} />
                  <span>{isSubscribed ? 'সাবস্ক্রাইবড' : 'সাবস্ক্রাইব করুন'}</span>
                </button>
              </div>

              {/* Bottom Row: Social links */}
              <div className="flex items-center gap-2.5 text-xs text-slate-500 pt-1 border-t border-slate-100 md:border-none">
                <span className="font-semibold text-slate-600 text-[11px] md:text-xs">
                  আমাদের সাথে যুক্ত থাকুন
                </span>
                <div className="flex items-center gap-2 ml-auto md:ml-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-6.5 h-6.5 md:w-7 md:h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs font-black"
                    aria-label="Facebook"
                  >
                    f
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-6.5 h-6.5 md:w-7 md:h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-[10px] font-black"
                    aria-label="YouTube"
                  >
                    ▶
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-6.5 h-6.5 md:w-7 md:h-7 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center text-[11px] font-black"
                    aria-label="Twitter"
                  >
                    𝕏
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-6.5 h-6.5 md:w-7 md:h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-xs font-black"
                    aria-label="Instagram"
                  >
                    ◎
                  </a>
                </div>
              </div>
            </div>

            {/* 4. "অন্যান্য অনুষ্ঠানসমূহ" (Other Programs Carousel Grid - Hidden on small mobile screens if desired or shown cleanly) */}
            <div className="mt-2 md:mt-4 hidden md:block">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-extrabold text-slate-900">
                  অন্যান্য অনুষ্ঠানসমূহ
                </h3>
                <div className="flex items-center gap-1.5">
                  <button
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    aria-label="Previous show"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    aria-label="Next show"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {OTHER_SHOWS.map((show) => (
                  <div
                    key={show.id}
                    className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <div
                      className="relative w-full aspect-[16/9] flex items-center justify-center p-3 text-center"
                      style={{ background: show.imageBg }}
                    >
                      <span className="text-white font-extrabold text-base md:text-lg drop-shadow-md group-hover:scale-105 transition-transform">
                        {show.category}
                      </span>
                    </div>

                    <div className="p-3">
                      <h4 className="font-bold text-xs md:text-sm text-slate-900 line-clamp-1 group-hover:text-[#d70b18] transition-colors">
                        {show.title}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-1">
                        {show.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR COLUMN (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-5 md:gap-6">

            {/* 1. "আজকের সম্প্রচার সূচি" (Today's Broadcast Schedule) */}
            <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="font-extrabold text-sm md:text-base text-slate-900">
                  আজকের সম্প্রচার সূচি
                </h3>
                <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer">
                  <Calendar size={13} className="text-slate-600" />
                  <span>সম্পূর্ণ সূচি দেখুন</span>
                </button>
              </div>

              {/* Schedule List */}
              <div className="flex flex-col gap-1 md:gap-1.5">
                {schedules.slice(0, 6).map((item, index) => {
                  const isActive = index === activeShowIndex;
                  return (
                    <div
                      key={index}
                      onClick={() => setActiveShowIndex(index)}
                      className={`p-2.5 md:p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                        isActive
                          ? 'bg-red-50 border-l-4 border-[#d70b18] shadow-2xs'
                          : 'hover:bg-slate-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        {/* Time Column (Stacked on mobile view) */}
                        <div className="text-[10px] md:text-xs font-bold text-slate-500 leading-tight w-20 md:w-32 shrink-0">
                          <div>{item.timeStart}</div>
                          <div>- {item.timeEnd}</div>
                        </div>

                        {/* Program Title */}
                        <h4
                          className={`text-xs md:text-sm font-bold ${
                            isActive ? 'text-slate-900 font-extrabold' : 'text-slate-800'
                          }`}
                        >
                          {item.title}
                        </h4>
                      </div>

                      {isActive && (
                        <span className="bg-[#d70b18] text-white text-[9px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ml-1 shadow-xs">
                          LIVE
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. "লাইভে সম্প্রচারিত ভিডিও" (Broadcasted Videos Section) */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-extrabold text-sm md:text-base text-slate-900">
                  লাইভে সম্প্রচারিত ভিডিও
                </h3>
                <Link
                  href="/video"
                  className="text-xs font-bold text-[#d70b18] hover:underline flex items-center gap-0.5"
                >
                  <span>সব দেখুন</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Videos Container: Responsive Horizontal 4-Card Row on Mobile (< lg) / Vertical List on Desktop (>= lg) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2.5 md:gap-3">
                {BROADCAST_VIDEOS.map((video) => (
                  <div
                    key={video.id}
                    className="flex flex-col lg:flex-row gap-2 md:gap-3 bg-white p-2 md:p-2.5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    {/* Thumbnail Box */}
                    <div
                      className="relative w-full lg:w-[120px] aspect-video rounded-lg overflow-hidden shrink-0 flex items-center justify-center shadow-xs"
                      style={{
                        background: 'linear-gradient(135deg, #450a0a 0%, #1e1b4b 50%, #090d16 100%)',
                      }}
                    >
                      {/* Live Badge on top-left of thumbnail */}
                      {video.isLive && (
                        <span className="absolute top-1 left-1 bg-[#d70b18] text-white text-[8px] md:text-[9px] font-black px-1.5 py-0.5 rounded uppercase z-10">
                          LIVE
                        </span>
                      )}

                      {/* Time Tag on top-right of thumbnail */}
                      <span className="absolute top-1 right-1 bg-black/75 backdrop-blur-xs text-white text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded z-10">
                        {video.time}
                      </span>

                      {/* Viewers Count INSIDE thumbnail bottom-left (Mobile screenshot match) */}
                      <div className="absolute bottom-1 left-1 bg-black/75 backdrop-blur-xs text-white/95 text-[8px] md:text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1 z-10">
                        <Eye size={10} className="text-white/80" />
                        <span>{video.viewers}</span>
                      </div>

                      <Play size={18} className="text-white/80 group-hover:scale-110 transition-transform fill-white/20 z-0" />
                    </div>

                    {/* Video Info (Below thumbnail on mobile / Beside thumbnail on desktop) */}
                    <div className="flex flex-col justify-between flex-1 px-1 lg:px-0">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#d70b18] transition-colors mt-1 lg:mt-0">
                        {video.title}
                      </h4>
                      <p className="hidden lg:flex text-[11px] font-medium text-slate-500 mt-1 items-center gap-1">
                        <Eye size={12} className="text-slate-400" />
                        <span>{video.viewers}</span>
                      </p>
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
