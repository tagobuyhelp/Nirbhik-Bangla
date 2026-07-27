import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Radio,
  Users,
  BarChart3,
  Clock,
  FileText,
  Play,
  Square,
  CheckCircle2,
  Globe,
  Plus,
  Send,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Download,
  Calendar,
  Activity,
  ArrowRight,
  Smile,
  Shield,
  ThumbsUp,
  Share2,
  UserCheck,
  Video,
} from 'lucide-react';

export default function GoLivePage() {
  const [toastMessage, setToastMessage] = useState('');
  const [isLive, setIsLive] = useState(true);
  const [chatMessage, setChatMessage] = useState('');

  // Live Chat Data
  const [chatList, setChatList] = useState([
    { id: 1, name: 'Rafiq Hasan', text: 'খুব সুন্দর বিশ্লেষণ! ধন্যবাদ', time: '06:48 PM', likes: 12 },
    { id: 2, name: 'Mst. Jannat', text: 'কোন দল এগিয়ে আছে এখন?', time: '06:48 PM', likes: 8 },
    { id: 3, name: 'Sohag Arif', text: 'Great coverage! Keep it up 👏', time: '06:48 PM', likes: 15 },
    { id: 4, name: 'Tania Islam', text: 'এই ফলাফল কি অনিশ্চিত?', time: '06:48 PM', likes: 6 },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatList([
      ...chatList,
      { id: Date.now(), name: 'Super Admin', text: chatMessage.trim(), time: '06:50 PM', likes: 1 },
    ]);
    setChatMessage('');
  };

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-12">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
              Live TV Dashboard
            </h1>
            <span className="bg-[#eb1c24] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider animate-pulse">
              <Radio size={12} />
              <span>LIVE</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Monitor, manage and broadcast your live news to the world.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <button
            onClick={() => showToast('লাইভ টেস্ট স্ট্রিম স্টার্ট করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <Radio size={14} className="text-slate-500" />
            <span>Test Stream</span>
          </button>

          <Link
            to="/schedule/create"
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <Calendar size={14} className="text-slate-500" />
            <span>Schedule Live</span>
          </Link>

          <button
            onClick={() => showToast('ব্রডকাস্টিং কন্ট্রোল সেন্টার অন করা হলো!')}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Radio size={15} />
            <span>Go Live Now</span>
          </button>
        </div>
      </div>

      {/* 2. Top 6 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* Current Status */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Current Status</p>
            <h3 className="text-sm font-black text-rose-600 mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              LIVE
            </h3>
            <span className="text-[9.5px] font-bold text-slate-400">You are live now</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Radio size={18} />
          </div>
        </div>

        {/* Current Viewers */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Current Viewers</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">15,248</h3>
            <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp size={10} /> ↑ 12.5% vs last 30 min
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
        </div>

        {/* Peak Viewers */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Peak Viewers</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">42,891</h3>
            <span className="text-[9.5px] font-bold text-slate-400">Today 08:15 PM</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BarChart3 size={18} />
          </div>
        </div>

        {/* Watch Time */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Watch Time (Live)</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">125h 36m</h3>
            <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp size={10} /> ↑ 18.3% vs yesterday
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Clock size={18} />
          </div>
        </div>

        {/* Total Broadcasts */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Broadcasts</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">5</h3>
            <span className="text-[9.5px] font-bold text-slate-400">Today</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileText size={18} />
          </div>
        </div>

        {/* Duration */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Duration</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-mono">02:35:28</h3>
            <span className="text-[9.5px] font-bold text-slate-400">Live Since 06:45 PM</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* 3. Upper Grid (3 Columns: Current Live Stream, Stream Health, Live Chat) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Column 1: Current Live Stream (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80"
                alt="Live Broadcast"
                className="w-full h-52 object-cover"
              />

              <span className="absolute top-3 left-3 bg-[#eb1c24] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md">
                LIVE
              </span>

              {/* Lower Third Ticker Banner */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 pt-6 text-white space-y-1">
                <div className="bg-[#eb1c24] text-white text-[10px] font-black px-2 py-0.5 rounded inline-block uppercase font-bangla">
                  লোকসভা নির্বাচন ২০২৪
                </div>
                <p className="text-xs font-bold font-bangla truncate">
                  ভোট গণনা চলছে, সর্বশেষ আপডেট পেতে আমাদের সাথে থাকুন
                </p>
              </div>
            </div>

            {/* Stream Metadata Grid */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400 font-bold">Title</span>
                <span className="font-bangla font-black text-slate-900 truncate max-w-[200px]">লোকসভা নির্বাচন ফলাফল LIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Category</span>
                <span className="font-bangla font-extrabold text-purple-700 bg-purple-100 px-2 py-0.2 rounded text-[10px]">রাজনীতি</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Reporter</span>
                <span className="font-bold text-slate-900">Arif Hossain</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Language</span>
                <span className="font-bangla font-bold text-slate-800">বাংলা</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Started At</span>
                <span className="font-mono text-slate-800 text-[11px]">May 21, 2024 06:45 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Quality</span>
                <span className="font-mono font-bold text-emerald-600">1080p60 (HD)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Bitrate</span>
                <span className="font-mono font-bold text-slate-800">6000 kbps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Connection</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Excellent
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsLive(false);
              showToast('লাইভ সম্প্রচার সফলভাবে সমাপ্ত করা হলো!');
            }}
            className="w-full py-2.5 bg-[#eb1c24] hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer uppercase tracking-wider"
          >
            <Square size={14} fill="white" />
            <span>End Stream</span>
          </button>
        </div>

        {/* Column 2: Stream Health & Real-time Metrics (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Stream Health</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                All systems normal
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-slate-400" />
                  <span>RTMP Connection</span>
                </div>
                <span className="font-bold text-emerald-600">Connected</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video size={15} className="text-slate-400" />
                  <span>Video Bitrate</span>
                </div>
                <span className="font-mono font-bold text-slate-900">6000 kbps</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-slate-400" />
                  <span>Dropped Frames</span>
                </div>
                <span className="font-mono font-bold text-emerald-600">0 (0%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 size={15} className="text-slate-400" />
                  <span>CPU Usage</span>
                </div>
                <span className="font-mono font-bold text-slate-900">23%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-slate-400" />
                  <span>Memory Usage</span>
                </div>
                <span className="font-mono font-bold text-slate-900">46%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-slate-400" />
                  <span>Latency</span>
                </div>
                <span className="font-mono font-bold text-emerald-600">2.3 sec</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={15} className="text-slate-400" />
                  <span>Network</span>
                </div>
                <span className="font-bold text-emerald-600">Excellent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Live Chat Panel (3 Cols) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <MessageSquare size={15} className="text-purple-600" />
              <span>Live Chat</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              🟢 1.2K Online
            </span>
          </div>

          {/* Chat Messages Stream */}
          <div className="space-y-2.5 overflow-y-auto max-h-56 pr-1 custom-scrollbar text-xs">
            {chatList.map((msg) => (
              <div key={msg.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-[11px] font-bangla">{msg.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{msg.time}</span>
                </div>
                <p className="text-[11px] text-slate-700 font-bangla font-semibold leading-tight">{msg.text}</p>
                <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold pt-0.5">
                  <ThumbsUp size={10} className="text-purple-600" />
                  <span>{msg.likes}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendChat} className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#eb1c24] font-bangla"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-[#eb1c24] text-white flex items-center justify-center shadow-2xs hover:bg-red-700 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </div>
            <span className="text-[9.5px] text-slate-400 font-semibold block text-center">
              ⏱ Slow Mode is ON
            </span>
          </form>
        </div>

      </div>

      {/* 4. Middle Row: Multi Platform, Stream Analytics, Live Poll, AI Live Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Widget 1: Multi Platform Streaming */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Multi Platform Streaming
          </h3>

          <div className="space-y-2.5 text-xs font-semibold">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <Globe size={15} className="text-purple-600" />
                <span className="font-bold text-slate-800">Website</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">LIVE</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-red-600 text-white font-black text-[9px] flex items-center justify-center">▶</span>
                <span className="font-bold text-slate-800">YouTube</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">LIVE</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">👁 8,542</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-blue-600 text-white font-black text-[9px] flex items-center justify-center">f</span>
                <span className="font-bold text-slate-800">Facebook</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">LIVE</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">👁 3,128</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-slate-900 text-white font-black text-[9px] flex items-center justify-center">𝕏</span>
                <span className="font-bold text-slate-800">X (Twitter)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">LIVE</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">👁 1,245</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast('নতুন প্ল্যাটফর্ম যোগ করার উইন্ডো খোলা হলো!')}
            className="w-full py-2 bg-purple-50 text-purple-700 font-extrabold text-xs rounded-xl hover:bg-purple-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <Plus size={14} />
            <span>Add Platform</span>
          </button>
        </div>

        {/* Widget 2: Stream Analytics (Live) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Stream Analytics (Live)</h3>
            <button className="text-xs font-bold text-purple-700 hover:underline">View All Analytics →</button>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Live Viewers</span>
              <span className="font-mono text-purple-700 font-black">15,248</span>
            </div>
            {/* SVG Trend Wave */}
            <div className="w-full h-20 pt-1">
              <svg viewBox="0 0 300 80" className="w-full h-full">
                <path d="M0 60 Q 40 40, 80 50 T 160 20 T 240 10 T 300 40 L 300 80 L 0 80 Z" fill="rgba(147, 51, 234, 0.15)" />
                <path d="M0 60 Q 40 40, 80 50 T 160 20 T 240 10 T 300 40" fill="none" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1 text-[9.5px] font-bold text-slate-600 text-center pt-1 border-t border-slate-100">
            <div><span className="block font-mono font-black text-slate-900 text-xs">125h</span>Watch</div>
            <div><span className="block font-mono font-black text-slate-900 text-xs">8,654</span>Likes</div>
            <div><span className="block font-mono font-black text-slate-900 text-xs">2,356</span>Comments</div>
            <div><span className="block font-mono font-black text-slate-900 text-xs">1,248</span>Shares</div>
            <div><span className="block font-mono font-black text-slate-900 text-xs">345</span>Subs</div>
          </div>
        </div>

        {/* Widget 3: Live Poll */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Live Poll</h3>
            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-md">Active</span>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            <h4 className="font-bangla font-black text-slate-900 text-xs">আপনার মতে কোন দল জিতবে?</h4>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bangla font-bold">
                <span>দল A</span>
                <span className="font-mono font-extrabold text-purple-700">62% (1,245)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full w-[62%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bangla font-bold">
                <span>দল B</span>
                <span className="font-mono font-extrabold text-slate-700">28% (562)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-300 rounded-full w-[28%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bangla font-bold">
                <span>দল C</span>
                <span className="font-mono font-extrabold text-slate-700">10% (201)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-300 rounded-full w-[10%]" />
              </div>
            </div>
          </div>

          <span className="text-[10px] text-slate-400 font-bold block pt-1 border-t border-slate-100">
            Total Votes: 2,008
          </span>
        </div>

        {/* Widget 4: AI Live Tools (BETA) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <Sparkles size={15} className="text-purple-600" />
              <span>AI Live Tools</span>
            </h3>
            <span className="bg-purple-100 text-purple-700 text-[9px] font-black px-1.5 py-0.2 rounded">BETA</span>
          </div>

          <div className="space-y-2 text-xs font-semibold text-slate-700">
            <div className="flex justify-between items-center">
              <span>AI Live Captions</span>
              <span className="font-bold text-emerald-600">ON</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AI Translation (EN)</span>
              <span className="font-bold text-emerald-600">ON</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AI Translation (HI)</span>
              <span className="font-bold text-emerald-600">ON</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AI Highlights</span>
              <span className="font-bold text-amber-600 animate-pulse">Detecting...</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AI Moderation</span>
              <span className="font-bold text-emerald-600">Active</span>
            </div>
          </div>

          <button
            onClick={() => showToast('AI ব্রডকাস্ট ডিরেক্টর খোলা হলো!')}
            className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1 mt-1"
          >
            <span>Open AI Broadcast Director</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* 5. Bottom Row (4 Cards Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Upcoming Scheduled Streams */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Upcoming Scheduled Streams</h3>
            <button className="text-[11px] font-bold text-purple-700 hover:underline">View All →</button>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            {[
              { title: 'নির্বাচন - বিশ্লেষণ ও ভবিষ্যৎ', time: 'May 22, 2024 - 07:00 PM' },
              { title: 'আন্তর্জাতিক সংবাদ বুলেটিন', time: 'May 22, 2024 - 09:00 PM' },
              { title: 'খেলার খবর LIVE', time: 'May 23, 2024 - 05:00 PM' },
            ].map((item, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-50 space-y-0.5 border border-slate-200/50">
                <h5 className="font-bangla font-black text-slate-900 text-xs">{item.title}</h5>
                <span className="text-[9.5px] font-mono text-slate-400 block">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Recent Recordings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Recent Recordings</h3>
            <button className="text-[11px] font-bold text-purple-700 hover:underline">View All →</button>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            {[
              { title: 'লোকসভা নির্বাচন ফলাফল LIVE', dur: '02:35:28' },
              { title: 'প্রেস কনফারেন্স LIVE', dur: '01:02:16' },
              { title: 'বিশেষ সাক্ষাৎকার', dur: '45:32' },
            ].map((item, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-200/50">
                <h5 className="font-bangla font-black text-slate-900 text-xs truncate max-w-[150px]">{item.title}</h5>
                <span className="text-[10px] font-mono font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">{item.dur}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: AI Generated Highlights */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">AI Generated Highlights</h3>
            <button className="text-[11px] font-bold text-purple-700 hover:underline">View All →</button>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            {[
              { title: 'Top Moments', dur: '1:00' },
              { title: 'Key Speech', dur: '1:32' },
              { title: 'Breaking Update', dur: '0:45' },
              { title: 'Full Highlights', dur: '3:25' },
            ].map((item, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-200/50">
                <h5 className="font-extrabold text-slate-900 text-xs">{item.title}</h5>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{item.dur}</span>
                  <button className="p-1 text-purple-700 hover:bg-purple-100 rounded cursor-pointer">
                    <Download size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Quick Stats */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Quick Stats</h3>
            <span className="text-[10px] font-bold text-slate-500">This Month ˅</span>
          </div>

          <div className="space-y-2.5 text-xs font-semibold text-slate-700">
            <div className="flex justify-between items-center">
              <span>Total Broadcasts</span>
              <span className="font-mono font-black text-slate-900">32 <span className="text-emerald-600 text-[10px]">↑ 14%</span></span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Watch Time</span>
              <span className="font-mono font-black text-slate-900">1,248h <span className="text-emerald-600 text-[10px]">↑ 18%</span></span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Views</span>
              <span className="font-mono font-black text-slate-900">245,891 <span className="text-emerald-600 text-[10px]">↑ 21%</span></span>
            </div>
            <div className="flex justify-between items-center">
              <span>New Followers</span>
              <span className="font-mono font-black text-slate-900">12,548 <span className="text-emerald-600 text-[10px]">↑ 16%</span></span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
