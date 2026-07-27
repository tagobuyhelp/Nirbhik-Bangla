import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Radio,
  Tv,
  Play,
  Clock,
  Eye,
  Search,
  Filter,
  Download,
  Pencil,
  MoreVertical,
  Upload,
  CloudUpload,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  X,
  ChevronUp,
} from 'lucide-react';

export default function LiveStreamsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Add Stream Form State
  const [channelName, setChannelName] = useState('');
  const [category, setCategory] = useState('');
  const [streamType, setStreamType] = useState('RTMP');
  const [rtmpUrl, setRtmpUrl] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [status, setStatus] = useState('Live');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Initial Live Streams Dataset (Exact match to reference UI image)
  const [streams, setStreams] = useState([
    {
      id: 1,
      name: 'Nirbbik Bangla LIVE',
      sub: '24x7 Bengali News',
      category: 'News',
      catColor: 'bg-rose-50 text-rose-700 border-rose-200',
      status: 'LIVE',
      viewers: '12.4K',
      started: 'May 21, 2024 10:30 AM',
      logoBg: 'bg-[#eb1c24]',
      logoText: 'NB LIVE',
    },
    {
      id: 2,
      name: 'Nirbbik Bangla News 2',
      sub: 'Breaking News 24x7',
      category: 'News',
      catColor: 'bg-rose-50 text-rose-700 border-rose-200',
      status: 'LIVE',
      viewers: '8.7K',
      started: 'May 21, 2024 09:15 AM',
      logoBg: 'bg-slate-900',
      logoText: 'NB',
    },
    {
      id: 3,
      name: 'Nirbbik Bangla Sports',
      sub: 'Live Sports & Analysis',
      category: 'Sports',
      catColor: 'bg-blue-50 text-blue-700 border-blue-200',
      status: 'LIVE',
      viewers: '5.1K',
      started: 'May 21, 2024 11:00 AM',
      logoBg: 'bg-blue-600',
      logoText: 'NB SPORTS',
    },
    {
      id: 4,
      name: 'Nirbbik Bangla Talk Show',
      sub: 'আলোচনা ও মতামত',
      category: 'Talk Show',
      catColor: 'bg-purple-50 text-purple-700 border-purple-200',
      status: 'LIVE',
      viewers: '3.2K',
      started: 'May 21, 2024 10:00 AM',
      logoBg: 'bg-red-700',
      logoText: 'NB আলোচনা',
    },
    {
      id: 5,
      name: 'Nirbbik Bangla Entertainment',
      sub: 'Movies, Music & More',
      category: 'Entertainment',
      catColor: 'bg-purple-50 text-purple-700 border-purple-200',
      status: 'SCHEDULED',
      viewers: '-',
      started: 'May 21, 2024 03:00 PM',
      logoBg: 'bg-purple-600',
      logoText: 'NB ENTERTAINMENT',
    },
    {
      id: 6,
      name: 'Nirbbik Bangla Documentary',
      sub: 'Documentary & Special',
      category: 'Documentary',
      catColor: 'bg-teal-50 text-teal-700 border-teal-200',
      status: 'OFFLINE',
      viewers: '-',
      started: 'May 20, 2024 Ended 08:45 PM',
      logoBg: 'bg-slate-700',
      logoText: 'NB DOCUMENTARY',
    },
    {
      id: 7,
      name: 'Nirbbik Bangla Kids',
      sub: 'Kids Program',
      category: 'Kids',
      catColor: 'bg-amber-50 text-amber-700 border-amber-200',
      status: 'OFFLINE',
      viewers: '-',
      started: 'May 20, 2024 Ended 06:30 PM',
      logoBg: 'bg-amber-500',
      logoText: 'NB KIDS',
    },
    {
      id: 8,
      name: 'Nirbbik Bangla Islamic',
      sub: 'ইসলামিক অনুষ্ঠান',
      category: 'Religious',
      catColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      status: 'OFFLINE',
      viewers: '-',
      started: 'May 19, 2024 Ended 09:00 PM',
      logoBg: 'bg-emerald-700',
      logoText: 'NB ISLAMIC',
    },
  ]);

  const handleSaveStream = (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    const newStream = {
      id: Date.now(),
      name: channelName.trim(),
      sub: 'Newly Added Stream',
      category: category || 'General',
      catColor: 'bg-blue-50 text-blue-700 border-blue-200',
      status: status.toUpperCase(),
      viewers: status === 'Live' ? '1.0K' : '-',
      started: 'Just now',
      logoBg: 'bg-[#eb1c24]',
      logoText: channelName.substring(0, 2).toUpperCase(),
    };

    setStreams([newStream, ...streams]);
    setChannelName('');
    setRtmpUrl('');
    setStreamKey('');
    showToast(`নতুন লাইভ টিভি চ্যানেল "${newStream.name}" যুক্ত হয়েছে!`);
  };

  const filteredStreams = streams.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sub.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'live') return matchesSearch && s.status === 'LIVE';
    if (activeTab === 'scheduled') return matchesSearch && s.status === 'SCHEDULED';
    if (activeTab === 'offline') return matchesSearch && s.status === 'OFFLINE';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 text-slate-800 font-sans relative pb-10">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Header Title & Top Action Button Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Live TV Streams</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Manage all your live TV channels and streams.
          </p>
        </div>

        <Link
          to="/schedule/create"
          className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <span>+ Add New Stream</span>
        </Link>
      </div>

      {/* 2. Top 5 Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Streams */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Total Streams</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">12</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">All time</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-100 text-[#eb1c24] flex items-center justify-center shadow-xs shrink-0">
            <Radio size={18} />
          </div>
        </div>

        {/* Card 2: Live Now */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Live Now</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">4</h3>
            <span className="text-[9px] font-bold text-emerald-600 mt-0.5 block">Currently live</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs shrink-0">
            <Tv size={18} />
          </div>
        </div>

        {/* Card 3: Total Views */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Total Views</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">125.4K</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">All time views</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs shrink-0">
            <Play size={18} fill="currentColor" />
          </div>
        </div>

        {/* Card 4: Scheduled */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Scheduled</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">3</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">Upcoming streams</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs shrink-0">
            <Clock size={18} />
          </div>
        </div>

        {/* Card 5: Avg. Watch Time */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Avg. Watch Time</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">18m 32s</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">Last 30 days</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-xs shrink-0">
            <Eye size={18} />
          </div>
        </div>
      </div>

      {/* 3. Main Grid Layout (Streams Table 8 Cols + Add Stream Panel 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side: Streams Table (~70% - lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">

          {/* Filter Tabs Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
              {[
                { id: 'all', label: 'All Streams' },
                { id: 'live', label: 'Live Now' },
                { id: 'scheduled', label: 'Scheduled' },
                { id: 'offline', label: 'Offline' },
                { id: 'archived', label: 'Archived' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                    activeTab === tab.id
                      ? 'text-[#eb1c24] border-[#eb1c24]'
                      : 'text-slate-500 border-transparent hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search streams..."
                  className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24]"
                />
              </div>

              <button
                type="button"
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
              >
                <Filter size={14} className="text-slate-500" />
                <span>Filter</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('স্ট্রিমিং তালিকা ডাউনলোড করা হয়েছে!')}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
              >
                <Download size={14} className="text-slate-500" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Streams Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3 w-8 text-center">#</th>
                    <th className="py-3 px-3">Stream / Channel</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Viewers</th>
                    <th className="py-3 px-3">Started / Scheduled</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredStreams.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-400 text-center">
                        {idx + 1}
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5 min-w-[200px]">
                          <div className={`w-10 h-8 rounded-lg ${item.logoBg} text-white font-black text-[9px] flex items-center justify-center shadow-2xs shrink-0 leading-none text-center p-1`}>
                            {item.logoText}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-xs leading-tight group-hover:text-[#eb1c24] transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-[10px] font-medium text-slate-400 block font-bangla">
                              {item.sub}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${item.catColor}`}>
                          {item.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider ${
                            item.status === 'LIVE'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : item.status === 'SCHEDULED'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {item.status === 'LIVE' && '● '}
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                        {item.viewers !== '-' ? (
                          <div className="flex items-center gap-1 text-emerald-600">
                            <span>{item.viewers}</span>
                            <TrendingUp size={12} />
                          </div>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                        {item.started}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => showToast(`Watch live channel "${item.name}"`)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="View Stream"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => showToast(`Edit channel settings for "${item.name}"`)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Stream"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="More Options"
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Pagination Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 bg-slate-50/50">
              <span>Showing 1 to {filteredStreams.length} of 12 streams</span>

              <div className="flex items-center gap-1.5">
                <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <ChevronLeft size={16} />
                </button>
                <button type="button" className="w-8 h-8 rounded-lg bg-[#eb1c24] text-white font-bold flex items-center justify-center shadow-2xs">
                  1
                </button>
                <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  2
                </button>
                <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: "Add New Stream" Panel (~30% - lg:col-span-4) */}
        <div className="lg:col-span-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Add New Stream</h3>
              <ChevronUp size={16} className="text-slate-400 cursor-pointer" />
            </div>

            <form onSubmit={handleSaveStream} className="space-y-3.5 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Stream / Channel Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter channel name"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="">Select category</option>
                  <option value="News">News</option>
                  <option value="Sports">Sports</option>
                  <option value="Talk Show">Talk Show</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Kids">Kids</option>
                  <option value="Religious">Religious</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Stream Type</label>
                <div className="flex items-center gap-4 text-slate-700">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="sType"
                      value="RTMP"
                      checked={streamType === 'RTMP'}
                      onChange={() => setStreamType('RTMP')}
                      className="text-[#eb1c24]"
                    />
                    <span>RTMP</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="sType"
                      value="Embed URL"
                      checked={streamType === 'Embed URL'}
                      onChange={() => setStreamType('Embed URL')}
                      className="text-[#eb1c24]"
                    />
                    <span>Embed URL</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">RTMP URL</label>
                <input
                  type="text"
                  placeholder="rtmp://example.com/live/streamkey"
                  value={rtmpUrl}
                  onChange={(e) => setRtmpUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono text-[11px]"
                />
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Enter your RTMP stream URL</span>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Stream Key <span className="text-slate-400 font-normal">(if required)</span></label>
                <input
                  type="password"
                  placeholder="Enter stream key"
                  value={streamKey}
                  onChange={(e) => setStreamKey(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono text-[11px]"
                />
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Optional</span>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Thumbnail / Logo</label>
                <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-5 text-center space-y-1 hover:border-purple-300 transition-colors cursor-pointer">
                  <CloudUpload size={22} className="mx-auto text-purple-600" />
                  <p className="text-xs font-bold text-slate-700">Click to upload image</p>
                  <span className="text-[9px] text-slate-400 block font-medium">Recommended size: 1280x720px</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Live">Live</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => { setChannelName(''); setRtmpUrl(''); setStreamKey(''); }}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl shadow-md cursor-pointer"
                >
                  Save Stream
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
