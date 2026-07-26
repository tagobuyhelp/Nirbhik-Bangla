import { useState } from 'react';
import {
  Upload,
  Search,
  Filter,
  Pencil,
  BarChart2,
  MoreVertical,
  Plus,
  Play,
  Eye,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
  Video,
  List,
  LayoutGrid,
  CheckCircle2,
  Radio,
  Calendar,
  Layers,
  Tv,
  Sliders,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Building,
  Trophy,
  Leaf,
  GraduationCap,
  Briefcase,
  HeartPulse,
  Palette,
  MessageSquare,
  X,
} from 'lucide-react';

export default function VideosPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Upload Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('Politics');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Initial Video Dataset (Exact match to reference UI image)
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'লোকসভা নির্বাচন ২০২৪ LIVE',
      subtitle: 'সর্বশেষ আপডেট, ফলাফল, বিশ্লেষণ',
      hashtags: ['#Election', '#Live', '#Politics'],
      category: 'Politics',
      catColor: 'bg-[#eb1c24]/10 text-[#eb1c24] border-red-200',
      duration: '02:35:28',
      views: '125.4K',
      viewsTrend: '+12.5%',
      status: 'LIVE',
      isLive: true,
      date: 'May 21, 2024',
      time: '08:15 PM',
      thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      title: 'নতুন সেতু চালু: বদলে যাবে দক্ষিণবঙ্গ',
      subtitle: 'মুখ্যমন্ত্রীর উদ্বোধন',
      hashtags: ['#Kolkata', '#Development', '#WestBengal'],
      category: 'State',
      catColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      duration: '08:45',
      views: '82.3K',
      viewsTrend: '+8.3%',
      status: 'Published',
      isLive: false,
      date: 'May 21, 2024',
      time: '06:30 PM',
      thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      title: 'বাংলায় প্রবল বর্ষণ: কোন কোন জেলায় সতর্কতা?',
      subtitle: 'আবহাওয়া সংবাদের আপডেট',
      hashtags: ['#Weather', '#Rain', '#Alert'],
      category: 'Environment',
      catColor: 'bg-teal-50 text-teal-700 border-teal-200',
      duration: '06:12',
      views: '68.5K',
      viewsTrend: '+15.7%',
      status: 'Published',
      isLive: false,
      date: 'May 21, 2024',
      time: '04:15 PM',
      thumbnail: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      title: 'ভারত বনাম বাংলাদেশ - ম্যাচ হাইলাইটস',
      subtitle: 'সম্পূর্ণ হাইলাইটস | T20 সিরিজ',
      hashtags: ['#India', '#Bangladesh', '#Cricket'],
      category: 'Sports',
      catColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      duration: '10:28',
      views: '56.2K',
      viewsTrend: '+22.4%',
      status: 'Published',
      isLive: false,
      date: 'May 21, 2024',
      time: '01:20 PM',
      thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 5,
      title: 'বিশেষ সাক্ষাৎকার - শিক্ষা ভবিষ্যৎ ও কর্মসংস্থান',
      subtitle: 'বিশ্ববিদ্যালয়ের উপাচার্যের সঙ্গে বিশেষ আলোচনা',
      hashtags: ['#Education', '#Interview'],
      category: 'Education',
      catColor: 'bg-purple-50 text-purple-700 border-purple-200',
      duration: '18:36',
      views: '42.1K',
      viewsTrend: '+9.8%',
      status: 'Published',
      isLive: false,
      date: 'May 21, 2024',
      time: '11:00 AM',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 6,
      title: 'শেয়ার বাজার আজ কেমন?',
      subtitle: 'বিনিয়োগকারীদের জন্য বিশেষ বিশ্লেষণ',
      hashtags: ['#Business', '#StockMarket'],
      category: 'Business',
      catColor: 'bg-amber-50 text-amber-700 border-amber-200',
      duration: '12:14',
      views: '38.7K',
      viewsTrend: '+6.2%',
      status: 'Published',
      isLive: false,
      date: 'May 20, 2024',
      time: '09:30 PM',
      thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 7,
      title: 'ডেঙ্গু থেকে কীভাবে নিজেকে বাঁচাবেন?',
      subtitle: 'স্বাস্থ্য বিশেষজ্ঞদের পরামর্শ',
      hashtags: ['#Health', '#Dengue', '#Awareness'],
      category: 'Health',
      catColor: 'bg-blue-50 text-blue-700 border-blue-200',
      duration: '09:05',
      views: '34.9K',
      viewsTrend: '+18.6%',
      status: 'Scheduled',
      isLive: false,
      date: 'May 22, 2024',
      time: '09:00 AM',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 8,
      title: 'কলকাতার রং : বইমেলা ২০২৪',
      subtitle: 'সংস্কৃতির উদযাপন',
      hashtags: ['#Kolkata', '#BookFair', '#Culture'],
      category: 'Lifestyle',
      catColor: 'bg-pink-50 text-pink-700 border-pink-200',
      duration: '07:50',
      views: '29.6K',
      viewsTrend: '+11.3%',
      status: 'Draft',
      isLive: false,
      date: 'May 20, 2024',
      time: '05:45 PM',
      thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedVideos(videos.map((v) => v.id));
    } else {
      setSelectedVideos([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedVideos.includes(id)) {
      setSelectedVideos(selectedVideos.filter((i) => i !== id));
    } else {
      setSelectedVideos([...selectedVideos, id]);
    }
  };

  const handleUploadVideo = (e) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    const newVideo = {
      id: Date.now(),
      title: videoTitle.trim(),
      subtitle: 'নতুন আপলোড করা ভিডিও',
      hashtags: ['#NirbhikBangla', '#News'],
      category: videoCategory,
      catColor: 'bg-purple-50 text-purple-700 border-purple-200',
      duration: '05:20',
      views: '0',
      viewsTrend: '0%',
      status: 'Published',
      isLive: false,
      date: 'May 21, 2024',
      time: '10:00 PM',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80',
    };

    setVideos([newVideo, ...videos]);
    setVideoTitle('');
    setShowUploadModal(false);
    showToast(`নতুন ভিডিও "${newVideo.title}" আপলোড করা হয়েছে!`);
  };

  const filteredVideos = videos.filter((vid) => {
    const matchesSearch =
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'published') return matchesSearch && vid.status === 'Published';
    if (activeTab === 'draft') return matchesSearch && vid.status === 'Draft';
    if (activeTab === 'scheduled') return matchesSearch && vid.status === 'Scheduled';
    if (activeTab === 'processing') return matchesSearch && vid.status === 'Processing';
    if (activeTab === 'private') return matchesSearch && vid.status === 'Private';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 text-slate-800 font-sans relative">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Header Title & Action Buttons Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Videos</h1>
            <span className="bg-purple-100 text-purple-700 font-extrabold text-xs px-2 py-0.5 rounded-md">
              126
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Manage and organize all video content in one place.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select className="bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold px-3 py-2 outline-none cursor-pointer">
            <option value="">Bulk Actions</option>
            <option value="delete">Delete Selected</option>
            <option value="publish">Publish Selected</option>
          </select>

          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer">
            <Filter size={14} className="text-slate-500" />
            <span>Filter</span>
          </button>

          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Upload Video</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Tabs & Search / Layout Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
        {/* Tabs Row */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Videos', count: 126 },
            { id: 'published', label: 'Published', count: 98 },
            { id: 'draft', label: 'Draft', count: 12 },
            { id: 'processing', label: 'Processing', count: 6 },
            { id: 'scheduled', label: 'Scheduled', count: 5 },
            { id: 'private', label: 'Private', count: 5 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-purple-200 text-purple-800 font-black' : 'bg-slate-100 text-slate-500'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Layout View Mode Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all font-medium"
            />
          </div>

          <select className="bg-white border border-slate-200 rounded-xl text-xs font-bold px-3 py-2 text-slate-700 outline-none cursor-pointer">
            <option>Newest First</option>
            <option>Most Viewed</option>
            <option>Oldest First</option>
          </select>

          <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-400 hover:text-slate-700'}`}
              title="List View"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-400 hover:text-slate-700'}`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Content: Grid Layout (Videos List 9 Cols + Analytics Sidebar 3 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Side: Videos List Table (~75% - lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedVideos.length === videos.length && videos.length > 0}
                        className="rounded border-slate-300 text-[#eb1c24]"
                      />
                    </th>
                    <th className="py-3 px-3">Video</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Duration</th>
                    <th className="py-3 px-3">Views</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredVideos.map((vid) => (
                    <tr key={vid.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedVideos.includes(vid.id)}
                          onChange={() => handleToggleSelect(vid.id)}
                          className="rounded border-slate-300 text-[#eb1c24]"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-start gap-3 min-w-[280px]">
                          {/* Thumbnail with Duration & Live Badge Overlay */}
                          <div className="relative w-28 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-900 group">
                            <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            
                            {vid.isLive && (
                              <span className="absolute top-1 left-1 bg-[#eb1c24] text-white text-[8px] font-black px-1.5 py-0.2 rounded flex items-center gap-1 shadow-2xs animate-pulse">
                                LIVE
                              </span>
                            )}

                            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                              {vid.duration}
                            </span>

                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-7 h-7 rounded-full bg-[#eb1c24] text-white flex items-center justify-center shadow-md">
                                <Play size={12} fill="white" className="ml-0.5" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-1 font-bangla group-hover:text-[#eb1c24] transition-colors">
                              {vid.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium line-clamp-1 font-bangla">
                              {vid.subtitle}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] text-purple-600 font-bold">
                              {vid.hashtags.map((h, idx) => (
                                <span key={idx}>{h}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${vid.catColor}`}>
                          {vid.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-mono text-slate-600 font-bold">
                        {vid.duration}
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="space-y-0.5">
                          <span className="font-black text-slate-900 block">{vid.views}</span>
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                            <TrendingUp size={10} /> {vid.viewsTrend}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        {vid.isLive ? (
                          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-[#eb1c24] border border-red-200 text-[10px] font-black flex items-center gap-1 w-fit animate-pulse">
                            <Radio size={10} /> LIVE
                          </span>
                        ) : (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            vid.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : vid.status === 'Scheduled'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}>
                            {vid.status}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                        <div>{vid.date}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{vid.time}</div>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => showToast(`Editing video "${vid.title}"`)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Video"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => showToast(`Analytics for "${vid.title}"`)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="View Analytics"
                          >
                            <BarChart2 size={14} />
                          </button>
                          <button
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
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
              <span>Showing 1 to {filteredVideos.length} of 126 videos</span>

              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center shadow-2xs">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  3
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  4
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  5
                </button>
                <span className="px-1 text-slate-400 font-bold">...</span>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  16
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <ChevronRight size={16} />
                </button>
              </div>

              <select className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs outline-none cursor-pointer">
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="50">50 / page</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Side: Video Analytics & Top Performing Videos (~25% - lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">

          {/* 1. Video Analytics Stat Grid Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Video Analytics</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 px-2 py-1 outline-none cursor-pointer">
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400">Total Videos</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-slate-900 text-sm">126</span>
                  <span className="text-[9px] font-bold text-emerald-600">↑14%</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400">Total Views</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-slate-900 text-sm">2.4M</span>
                  <span className="text-[9px] font-bold text-emerald-600">↑21%</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400">Watch Time</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-slate-900 text-sm">18,420h</span>
                  <span className="text-[9px] font-bold text-emerald-600">↑18%</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400">Subscribers</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-slate-900 text-sm">+2,548</span>
                  <span className="text-[9px] font-bold text-emerald-600">↑16%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Top Performing Videos Ranking Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900">Top Performing Videos</h3>

            <div className="space-y-2 text-xs font-bangla">
              {[
                { rank: 1, title: 'লোকসভা নির্বাচন ২০২৪ LIVE', views: '125,400 views', img: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=150&q=80' },
                { rank: 2, title: 'নতুন সেতু চালু: বদলে যাবে দক্ষিণবঙ্গ', views: '82,300 views', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=150&q=80' },
                { rank: 3, title: 'বাংলায় প্রবল বর্ষণ: সতর্কতা', views: '68,500 views', img: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=150&q=80' },
                { rank: 4, title: 'ভারত বনাম বাংলাদেশ - হাইলাইটস', views: '56,200 views', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=150&q=80' },
                { rank: 5, title: 'বিশেষ সাক্ষাৎকার - শিক্ষা ভবিষ্যৎ', views: '42,100 views', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=150&q=80' },
              ].map((item) => (
                <div key={item.rank} className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="font-mono text-xs font-bold text-slate-400 w-3">{item.rank}</span>
                  <img src={item.img} alt={item.title} className="w-12 h-8 rounded-lg object-cover shrink-0 border border-slate-200" />
                  <div className="space-y-0.5 truncate">
                    <h5 className="font-bold text-slate-800 text-xs truncate leading-tight">{item.title}</h5>
                    <p className="text-[10px] text-slate-400 font-semibold">{item.views}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast('Video Analytics page opened!')}
              className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer mt-1"
            >
              <span>View All Analytics</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 3. Video Categories Count List Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900">Video Categories</h3>

            <div className="space-y-1.5 text-xs font-semibold text-slate-700">
              {[
                { name: 'Politics', count: 28, icon: Landmark, color: 'text-purple-600' },
                { name: 'State', count: 24, icon: Building, color: 'text-cyan-600' },
                { name: 'Sports', count: 18, icon: Trophy, color: 'text-emerald-600' },
                { name: 'Environment', count: 12, icon: Leaf, color: 'text-teal-600' },
                { name: 'Education', count: 10, icon: GraduationCap, color: 'text-purple-600' },
                { name: 'Business', count: 8, icon: Briefcase, color: 'text-amber-600' },
                { name: 'Health', count: 6, icon: HeartPulse, color: 'text-rose-600' },
                { name: 'Lifestyle', count: 6, icon: Palette, color: 'text-pink-600' },
                { name: 'Others', count: 14, icon: MessageSquare, color: 'text-slate-500' },
              ].map((c, i) => {
                const CIcon = c.icon;
                return (
                  <div key={i} className="flex items-center justify-between p-1 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <CIcon size={14} className={c.color} />
                      <span>{c.name}</span>
                    </div>
                    <span className="font-bold text-slate-400 font-mono text-[11px]">{c.count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Quick Actions Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 font-bold text-xs text-slate-700">
            <h3 className="font-extrabold text-xs text-slate-900 mb-1">Quick Actions</h3>

            <button onClick={() => setShowUploadModal(true)} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Upload size={15} className="text-purple-600" />
              <span>Upload Video</span>
            </button>
            <button onClick={() => showToast('Playlist creation modal opened!')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Layers size={15} className="text-blue-600" />
              <span>Create Playlist</span>
            </button>
            <button onClick={() => showToast('Syncing with YouTube Channel...')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Tv size={15} className="text-red-600" />
              <span>YouTube Sync</span>
            </button>
            <button onClick={() => showToast('Video settings panel opened!')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Sliders size={15} className="text-slate-600" />
              <span>Video Settings</span>
            </button>
          </div>

        </div>

      </div>

      {/* Upload Video Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900">Upload New Video</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadVideo} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Video Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="ভিডিওর শিরোনাম প্রবেশ করুন..."
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bangla outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Category</label>
                <select
                  value={videoCategory}
                  onChange={(e) => setVideoCategory(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Politics">Politics</option>
                  <option value="State">State</option>
                  <option value="Sports">Sports</option>
                  <option value="Environment">Environment</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center space-y-2 bg-slate-50 cursor-pointer hover:border-purple-300">
                <Upload size={24} className="mx-auto text-purple-600" />
                <p className="text-xs font-bold text-slate-700">Drag and drop video file here</p>
                <span className="text-[10px] text-slate-400 font-semibold block">MP4, MOV, WEBM up to 2GB</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl shadow-md cursor-pointer"
                >
                  Upload Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
