import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Radio,
  Sparkles,
  Save,
  Play,
  RotateCw,
  Plus,
  Globe,
  Copy,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Activity,
  Check,
  Video,
  Layers,
  Sliders,
  Tv,
  Info,
  X,
  MessageSquare,
  ShieldAlert,
  Share2,
} from 'lucide-react';

export default function GoLivePage() {
  const [toastMessage, setToastMessage] = useState('');
  const [showStreamKey, setShowStreamKey] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  // Form State (Default match reference UI)
  const [title, setTitle] = useState('লোকসভা নির্বাচন ২০২৪ : সর্বশেষ আপডেট LIVE');
  const [description, setDescription] = useState(
    'লোকসভা নির্বাচন ২০২৪ এর সর্বশেষ আপডেট, ফলাফল, বিশ্লেষণ এবং বিভিন্ন দলের প্রতিক্রিয়া নিয়ে আমাদের বিশেষ লাইভ।'
  );
  const [category, setCategory] = useState('রাজনীতি');
  const [reporter, setReporter] = useState('Arif Hossain');
  const [breakingNews, setBreakingNews] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [ageRestriction, setAgeRestriction] = useState(false);

  // Platforms State
  const [platforms, setPlatforms] = useState({
    website: true,
    youtube: true,
    facebook: true,
    twitter: true,
  });

  // Settings State
  const [streamType, setStreamType] = useState('RTMP');
  const [resolution, setResolution] = useState('1080p (Full HD)');
  const [frameRate, setFrameRate] = useState('30 FPS');
  const [bitrate, setBitrate] = useState('6000 kbps');
  const [audio, setAudio] = useState('Stereo');
  const [enableDvr, setEnableDvr] = useState(true);
  const [autoStopHr, setAutoStopHr] = useState('02:00');

  const rtmpUrl = 'rtmp://live.nirbhikbangla.com/live';
  const streamKey = 'live_sk_948102948102948109284';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleStartStream = () => {
    setIsStreaming(!isStreaming);
    if (!isStreaming) {
      showToast('🔴 লাইভ ব্রডকাস্ট সফলভাবে শুরু হয়েছে! (Streaming Live)');
    } else {
      showToast('⏹️ লাইভ স্ট্রিমিং সমাপ্ত করা হয়েছে।');
    }
  };

  const handleAiGenerate = () => {
    setTitle('বিশেষ লাইভ: ২০২৪ এর সর্বশেষ জাতীয় রাজনৈতিক ঘটনা ও নির্বাচন বিশ্লেষণ');
    setDescription(
      'আজকের প্রধান প্রধান খবরের লাইভ কভারেজ। রাজপথের সর্বশেষ হালচাল, নির্বাচন কমিশন ও রাজনৈতিক দলগুলোর সাম্প্রতিক বক্তব্য নিয়ে সরাসরি আলোচনা।'
    );
    showToast('🪄 AI দ্বারা নতুন শিরোনাম ও বিবরণ তৈরি করা হয়েছে!');
  };

  return (
    <div className="space-y-6 text-slate-800 font-sans relative pb-10">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Title & Action Buttons Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#eb1c24]"></span>
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Go Live Now</h1>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Start a live broadcast and stream to multiple platforms.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => showToast('লাইভ কনফিগারেশন ড্রাফট হিসেবে সেভ হয়েছে!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Save size={15} className="text-slate-500" />
            <span>Save as Draft</span>
          </button>

          <button
            type="button"
            onClick={handleStartStream}
            className={`text-white text-xs font-black px-5 py-2 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              isStreaming
                ? 'bg-slate-900 hover:bg-black shadow-slate-900/20'
                : 'bg-[#eb1c24] hover:bg-red-700 shadow-red-500/25 animate-pulse'
            }`}
          >
            <Radio size={16} className={isStreaming ? 'text-emerald-400' : 'text-white'} />
            <span>{isStreaming ? 'Stop Streaming' : '((•)) Start Streaming'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Form Column (~65% - lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section 1: Stream Information */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              1. Stream Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Left Form Input Fields */}
              <div className="md:col-span-7 space-y-3.5 text-xs font-semibold">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-slate-700 font-bold">Title <span className="text-red-500">*</span></label>
                    <span className="text-[10px] text-slate-400 font-mono">{title.length}/100</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-700 font-bold">Description</label>
                    <button
                      type="button"
                      onClick={handleAiGenerate}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-extrabold text-[10px] px-2 py-0.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Sparkles size={11} /> AI Generate
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] resize-none font-bangla text-xs font-medium"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-mono mt-0.5">{description.length}/500</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Category <span className="text-red-500">*</span></label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer font-bangla"
                    >
                      <option value="রাজনীতি">রাজনীতি</option>
                      <option value="বাংলাদেশ">বাংলাদেশ</option>
                      <option value="আন্তর্জাতিক">আন্তর্জাতিক</option>
                      <option value="খেলাধুলো">খেলাধুলো</option>
                      <option value="বিনোদন">বিনোদন</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Reporter / Host</label>
                    <select
                      value={reporter}
                      onChange={(e) => setReporter(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                    >
                      <option value="Arif Hossain">Arif Hossain</option>
                      <option value="Tarik Aziz">Tarik Aziz</option>
                      <option value="Nusrat Jahan">Nusrat Jahan</option>
                    </select>
                  </div>
                </div>

                {/* Checkboxes Row */}
                <div className="flex items-center gap-4 pt-1 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={breakingNews}
                      onChange={(e) => setBreakingNews(e.target.checked)}
                      className="rounded border-slate-300 text-[#eb1c24]"
                    />
                    <span className="font-bold text-slate-800">Breaking News</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded border-slate-300 text-[#eb1c24]"
                    />
                    <span className="font-bold text-slate-800">Featured</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ageRestriction}
                      onChange={(e) => setAgeRestriction(e.target.checked)}
                      className="rounded border-slate-300 text-[#eb1c24]"
                    />
                    <span className="font-medium text-slate-600">Age Restriction (18+)</span>
                  </label>
                </div>
              </div>

              {/* Right Thumbnail Studio Card */}
              <div className="md:col-span-5 space-y-2">
                <label className="block text-xs font-bold text-slate-700">Thumbnail</label>

                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"
                    alt="Live Broadcast Studio"
                    className="w-full h-44 object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Breaking News Overlay Tag */}
                  <div className="absolute top-2.5 right-2.5 bg-[#eb1c24] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-xs tracking-wider">
                    BREAKING NEWS
                  </div>

                  {/* Lower Third Banner */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#eb1c24] text-white font-bangla font-black text-sm px-3 py-1.5 rounded-lg shadow-md text-center">
                    লোকসভা নির্বাচন ২০২৪ LIVE
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => showToast('থাম্বনেইল ইমেজ পরিবর্তন করা হয়েছে!')}
                    className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCw size={13} />
                    <span>Change</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('AI থাম্বনেইল ডিজাইন জেনারেট করা হলো!')}
                    className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Sparkles size={13} />
                    <span>AI Thumbnail</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Select Platforms */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              2. Select Platforms
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs font-semibold">
              {/* Platform 1: Website */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Globe size={16} />
                  </div>
                  <input
                    type="checkbox"
                    checked={platforms.website}
                    onChange={(e) => setPlatforms({ ...platforms, website: e.target.checked })}
                    className="w-4 h-4 rounded text-[#eb1c24] cursor-pointer"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Website</h5>
                  <span className="text-[10px] text-slate-400 block font-normal">nirbhikbangla.com</span>
                </div>
                <select className="w-full bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 px-2 py-1 outline-none cursor-pointer">
                  <option>Public</option>
                  <option>Unlisted</option>
                </select>
              </div>

              {/* Platform 2: YouTube */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-black text-xs">
                    <Video size={16} />
                  </div>
                  <input
                    type="checkbox"
                    checked={platforms.youtube}
                    onChange={(e) => setPlatforms({ ...platforms, youtube: e.target.checked })}
                    className="w-4 h-4 rounded text-[#eb1c24] cursor-pointer"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">YouTube</h5>
                  <span className="text-[10px] text-slate-400 block font-normal">Nirbbik Bangla</span>
                </div>
                <select className="w-full bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 px-2 py-1 outline-none cursor-pointer">
                  <option>Public</option>
                  <option>Unlisted</option>
                </select>
              </div>

              {/* Platform 3: Facebook */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                    f
                  </div>
                  <input
                    type="checkbox"
                    checked={platforms.facebook}
                    onChange={(e) => setPlatforms({ ...platforms, facebook: e.target.checked })}
                    className="w-4 h-4 rounded text-[#eb1c24] cursor-pointer"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Facebook</h5>
                  <span className="text-[10px] text-slate-400 block font-normal">Nirbbik Bangla</span>
                </div>
                <select className="w-full bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 px-2 py-1 outline-none cursor-pointer">
                  <option>Public</option>
                  <option>Unlisted</option>
                </select>
              </div>

              {/* Platform 4: X (Twitter) */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                    𝕏
                  </div>
                  <input
                    type="checkbox"
                    checked={platforms.twitter}
                    onChange={(e) => setPlatforms({ ...platforms, twitter: e.target.checked })}
                    className="w-4 h-4 rounded text-[#eb1c24] cursor-pointer"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">X (Twitter)</h5>
                  <span className="text-[10px] text-slate-400 block font-normal">@NirbbikBangla</span>
                </div>
                <select className="w-full bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 px-2 py-1 outline-none cursor-pointer">
                  <option>Public</option>
                  <option>Unlisted</option>
                </select>
              </div>

              {/* Platform 5: Add Platform */}
              <button
                type="button"
                onClick={() => showToast('নতুন স্ট্রিম প্ল্যাটফর্ম সংযোগ উইন্ডো খুলুন!')}
                className="p-3 rounded-2xl border-2 border-dashed border-slate-200 hover:border-purple-300 flex flex-col items-center justify-center text-purple-600 hover:bg-purple-50/50 transition-all cursor-pointer"
              >
                <Plus size={18} />
                <span className="text-xs font-bold mt-1">+ Add Platform</span>
              </button>
            </div>
          </div>

          {/* Section 3: Stream Settings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              3. Stream Settings
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Stream Type</label>
                <select
                  value={streamType}
                  onChange={(e) => setStreamType(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="RTMP">RTMP</option>
                  <option value="HLS">HLS</option>
                  <option value="SRT">SRT</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Resolution</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="1080p (Full HD)">1080p (Full HD)</option>
                  <option value="720p (HD)">720p (HD)</option>
                  <option value="4K (Ultra HD)">4K (Ultra HD)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Frame Rate</label>
                <select
                  value={frameRate}
                  onChange={(e) => setFrameRate(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="30 FPS">30 FPS</option>
                  <option value="60 FPS">60 FPS</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Bitrate</label>
                <select
                  value={bitrate}
                  onChange={(e) => setBitrate(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="6000 kbps">6000 kbps</option>
                  <option value="4500 kbps">4500 kbps</option>
                  <option value="8000 kbps">8000 kbps</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Audio</label>
                <select
                  value={audio}
                  onChange={(e) => setAudio(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Stereo">Stereo</option>
                  <option value="Mono">Mono</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 text-xs font-semibold">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="dvr"
                  checked={enableDvr}
                  onChange={(e) => setEnableDvr(e.target.checked)}
                  className="w-4 h-4 rounded text-[#eb1c24] cursor-pointer"
                />
                <div>
                  <label htmlFor="dvr" className="font-bold text-slate-900 cursor-pointer">
                    Enable DVR (Recording)
                  </label>
                  <p className="text-[10px] text-slate-400 font-medium">Record live stream for replay and highlights.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  Auto Stop <Info size={12} className="text-slate-400" />
                </span>
                <span className="text-slate-400">After</span>
                <input
                  type="text"
                  value={autoStopHr}
                  onChange={(e) => setAutoStopHr(e.target.value)}
                  className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-center font-mono font-bold"
                />
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-bold outline-none cursor-pointer">
                  <option value="hr">hr</option>
                  <option value="min">min</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Advanced (OBS / RTMP) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              4. Advanced (OBS / RTMP)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">RTMP URL</label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    readOnly
                    value={rtmpUrl}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono text-xs font-bold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => showToast('RTMP URL কপি করা হয়েছে!')}
                    className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shrink-0"
                    title="Copy RTMP URL"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Stream Key</label>
                <div className="flex items-center gap-1">
                  <input
                    type={showStreamKey ? 'text' : 'password'}
                    readOnly
                    value={streamKey}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono text-xs font-bold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowStreamKey(!showStreamKey)}
                    className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shrink-0"
                    title="Toggle Visibility"
                  >
                    {showStreamKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Stream Key কপি করা হয়েছে!')}
                    className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shrink-0"
                    title="Copy Stream Key"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-black flex items-center gap-1">
                  <CheckCircle2 size={15} /> Connection Test Successful
                </span>
                <span className="text-slate-400 text-[10px] font-medium">Last tested: 2 mins ago</span>
              </div>

              <button
                type="button"
                onClick={() => showToast('RTMP কানেকশন টেস্ট সম্পূর্ণ হয়েছে!')}
                className="px-4 py-1.5 border border-purple-200 text-purple-700 hover:bg-purple-50 font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RotateCw size={13} />
                <span>Test Again</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Stream Preview, Stream Health & Checklist (~35% - lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-5">

          {/* 1. Stream Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">Stream Preview</h3>

            {/* Video Live Player Canvas */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-black">
              <img
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"
                alt="Stream Preview"
                className="w-full h-52 object-cover opacity-90"
              />

              {/* Breaking News Lower Third Overlay */}
              <div className="absolute top-3 left-3 bg-[#eb1c24] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                BREAKING NEWS
              </div>

              <div className="absolute bottom-3 left-3 right-3 bg-[#eb1c24] text-white font-bangla font-black text-sm px-3 py-1.5 rounded-lg shadow-md text-center">
                লোকসভা নির্বাচন ২০২৪ LIVE
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Preview is from last stream
              </span>

              <button
                type="button"
                onClick={() => showToast('লাইভ প্রিভিউ ওপেন করা হয়েছে!')}
                className="px-3 py-1 border border-purple-200 text-purple-700 hover:bg-purple-50 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Play size={12} fill="currentColor" />
                <span>Preview Live</span>
              </button>
            </div>
          </div>

          {/* 2. Stream Health Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">Stream Health</h3>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase">
                Excellent
              </span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio size={15} className="text-purple-600" />
                  <span>RTMP Connection</span>
                </div>
                <span className="font-bold text-emerald-600">Connected</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video size={15} className="text-blue-600" />
                  <span>Video Bitrate</span>
                </div>
                <span className="font-mono text-slate-900">6000 kbps</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-rose-600" />
                  <span>Dropped Frames</span>
                </div>
                <span className="font-mono text-emerald-600 font-bold">0 (0%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders size={15} className="text-amber-500" />
                  <span>CPU Usage</span>
                </div>
                <span className="font-mono text-slate-900">18%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={15} className="text-emerald-600" />
                  <span>Network</span>
                </div>
                <span className="font-bold text-emerald-600">Excellent</span>
              </div>
            </div>
          </div>

          {/* 3. Pre-Stream Checklist Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Pre-Stream Checklist
            </h3>

            <div className="space-y-2.5 text-xs font-semibold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Stream Information</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">Completed</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Platforms Selected</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">Completed</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Stream Settings</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">Completed</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>RTMP Connection</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">Connected</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Stream Health</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">Good</span>
              </div>
            </div>

            {/* Everything Looks Good Callout Box */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 mt-2">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
              <div>
                <h5 className="font-extrabold text-emerald-900 text-xs">Everything looks good!</h5>
                <p className="text-[10px] text-emerald-700 font-medium">You are ready to go live.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
