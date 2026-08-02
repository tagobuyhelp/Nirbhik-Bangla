import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';
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
  Trash2,
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
  RefreshCw,
} from 'lucide-react';

export default function VideosPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlaylist, setSelectedPlaylist] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedVideos, setSelectedVideos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  // Dynamic Categories & Playlists list
  const [categoriesList, setCategoriesList] = useState([]);
  const [playlistsList, setPlaylistsList] = useState([]);

  // Simple Upload Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('Politics');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  useEffect(() => {
    // Fetch Categories
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setCategoriesList(data.data);
        }
      })
      .catch(() => {});

    // Fetch Playlists
    fetch(`${API_BASE_URL}/playlists`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPlaylistsList(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const extractYtId = (v) => {
    if (v.youtubeId && v.youtubeId.length === 11) return v.youtubeId;
    if (v.videoUrl) {
      const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = v.videoUrl.match(regExp);
      if (match && match[1]) return match[1];
    }
    return '';
  };

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/videos?status=${activeTab}&search=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const formatted = data.data.map((v) => {
          const ytId = extractYtId(v);
          const rawViewsNum = typeof v.views === 'number' ? v.views : parseInt(v.views || '0', 10);
          return {
            id: v._id,
            _id: v._id,
            youtubeId: ytId,
            videoUrl: v.videoUrl || '',
            playlist: v.playlist || '',
            rawDate: v.createdAt || Date.now(),
            rawViews: rawViewsNum,
            title: typeof v.title === 'object' ? (v.title.bn || v.title.en || v.title.hi || '') : v.title,
            subtitle: typeof v.subtitle === 'object' ? (v.subtitle.bn || v.subtitle.en || '') : (v.subtitle || ''),
            hashtags: Array.isArray(v.tags) && v.tags.length > 0 ? v.tags.map(t => t.startsWith('#') ? t : `#${t}`) : ['#NirbhikBangla', '#News'],
            category: v.category || 'Politics',
            catColor: 'bg-[#eb1c24]/10 text-[#eb1c24] border-red-200',
            duration: v.duration || '05:20',
            views: rawViewsNum > 1000 ? `${(rawViewsNum / 1000).toFixed(1)}K` : `${rawViewsNum}`,
            viewsTrend: v.viewsTrend || '+0%',
            status: v.status || 'Published',
            isLive: v.isLive || false,
            date: new Date(v.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: new Date(v.createdAt || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            thumbnail: v.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=400&q=80'),
          };
        });
        setVideos(formatted);
      }
    } catch (err) {
      console.error('Error fetching videos from server:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [activeTab, searchQuery]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedVideos(filteredVideos.map((v) => v.id));
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

  const handleDeleteVideo = async (id, title) => {
    if (!window.confirm(`আপনি কি "${title}" ভিডিওটি মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/videos/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('ভিডিওটি মুছে ফেলা হয়েছে!');
        fetchVideos();
      }
    } catch (err) {
      showToast('মুছে ফেলতে সমস্যা হয়েছে!');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedVideos.length === 0) return;
    if (!window.confirm(`আপনি কি ${selectedVideos.length}টি ভিডিও মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/videos/bulk-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedVideos })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedVideos([]);
        showToast(`${selectedVideos.length}টি ভিডিও সফলভাবে মুছে ফেলা হয়েছে!`);
        fetchVideos();
      }
    } catch (err) {
      showToast('বাল্ক ডিলিটে সমস্যা হয়েছে!');
    }
  };

  const handleUploadVideo = async (e) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: { bn: videoTitle.trim(), en: videoTitle.trim(), hi: videoTitle.trim() },
          category: videoCategory,
          status: 'Published'
        })
      });
      const data = await res.json();
      if (data.success) {
        setVideoTitle('');
        setShowUploadModal(false);
        showToast(`নতুন ভিডিও "${videoTitle}" সফলভাবে সেভ করা হয়েছে!`);
        fetchVideos();
      }
    } catch (err) {
      showToast('ভিডিও সেভ করতে সমস্যা হয়েছে!');
    }
  };

  // Dynamic Filtering & Sorting
  const filteredVideos = videos
    .filter((vid) => {
      const matchesSearch =
        vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vid.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'published' && vid.status === 'Published') ||
        (activeTab === 'draft' && vid.status === 'Draft') ||
        (activeTab === 'scheduled' && vid.status === 'Scheduled') ||
        (activeTab === 'processing' && vid.status === 'Processing') ||
        (activeTab === 'private' && vid.status === 'Private');

      const matchesCategory =
        selectedCategory === 'all' || vid.category === selectedCategory || vid.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesPlaylist =
        selectedPlaylist === 'all' || vid.playlist === selectedPlaylist;

      return matchesSearch && matchesTab && matchesCategory && matchesPlaylist;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.rawDate) - new Date(a.rawDate);
      if (sortBy === 'oldest') return new Date(a.rawDate) - new Date(b.rawDate);
      if (sortBy === 'views') return (b.rawViews || 0) - (a.rawViews || 0);
      return 0;
    });

  // Dynamic Pagination calculations
  const totalItems = filteredVideos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + itemsPerPage);

  // Dynamic Stats Calculations
  const totalViewsSum = videos.reduce((acc, v) => acc + (v.rawViews || 0), 0);
  const formattedTotalViews = totalViewsSum > 1000000 ? `${(totalViewsSum / 1000000).toFixed(1)}M` : (totalViewsSum > 1000 ? `${(totalViewsSum / 1000).toFixed(1)}K` : `${totalViewsSum}`);
  const topPerformingVideos = [...videos].sort((a, b) => (b.rawViews || 0) - (a.rawViews || 0)).slice(0, 5);

  // Dynamic Category Counts
  const categoryCounts = videos.reduce((acc, v) => {
    const cat = v.category || 'Politics';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6 text-slate-800 font-sans relative pb-12">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shadow-2xs">
              <Video size={20} className="text-[#eb1c24]" />
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-outfit">
              Video Management Hub
            </h1>
          </div>
          <p className="text-xs font-semibold text-slate-500">
            Manage news videos, playlists, YouTube embeds, and real-time streaming analytics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchVideos}
            className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <Link
            to="/videos/create"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Plus size={16} />
            <span>Add New Video</span>
          </Link>
        </div>
      </div>

      {/* 2. Dynamic Filter & Action Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        
        {/* Status Tabs Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 border-b border-slate-100">
          <div className="flex items-center gap-1.5 font-bold text-xs">
            {[
              { id: 'all', label: 'All Videos', count: videos.length },
              { id: 'published', label: 'Published', count: videos.filter(v => v.status === 'Published').length },
              { id: 'draft', label: 'Drafts', count: videos.filter(v => v.status === 'Draft').length },
              { id: 'scheduled', label: 'Scheduled', count: videos.filter(v => v.status === 'Scheduled').length },
              { id: 'private', label: 'Private', count: videos.filter(v => v.status === 'Private').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-2xs font-extrabold'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === tab.id ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {selectedVideos.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 size={14} />
              <span>Delete Selected ({selectedVideos.length})</span>
            </button>
          )}
        </div>

        {/* Dynamic Filters Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-semibold">
          
          {/* Search Box & Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative min-w-[220px] flex-1 md:flex-initial">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by title or category..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] font-medium"
              />
            </div>

            {/* Dynamic Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-2 text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categoriesList.map((cat) => (
                <option key={cat._id || cat.slug} value={cat.slug || cat.name}>
                  {typeof cat.name === 'object' ? (cat.name.bn || cat.name.en) : cat.name}
                </option>
              ))}
            </select>

            {/* Dynamic Playlist Filter */}
            <select
              value={selectedPlaylist}
              onChange={(e) => {
                setSelectedPlaylist(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-2 text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">All Playlists</option>
              {playlistsList.map((pl) => (
                <option key={pl._id || pl.slug} value={pl.slug}>
                  {pl.name}
                </option>
              ))}
            </select>

            {/* Sorting Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-2 text-slate-700 outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-end md:self-auto">
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

      {/* 3. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Side: Videos List / Grid Table (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">
          
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
            
            {loading ? (
              <div className="p-12 text-center space-y-2 text-slate-400">
                <RefreshCw size={24} className="mx-auto animate-spin text-purple-600" />
                <p className="text-xs font-bold">Loading videos from database...</p>
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Video size={36} className="mx-auto text-slate-300" />
                <h4 className="font-extrabold text-slate-700 text-sm">No Videos Found</h4>
                <p className="text-xs text-slate-400 font-medium">Try adjusting your filters or search query.</p>
                <Link
                  to="/videos/create"
                  className="inline-flex items-center gap-1.5 bg-[#eb1c24] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md"
                >
                  <Plus size={15} /> Add New Video
                </Link>
              </div>
            ) : viewMode === 'list' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                    <tr>
                      <th className="p-3 w-10 text-center">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedVideos.length === filteredVideos.length && filteredVideos.length > 0}
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
                    {paginatedVideos.map((vid) => (
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
                            {/* Thumbnail with Player Trigger */}
                            <div
                              onClick={() => setPlayingVideo(vid)}
                              className="relative w-28 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-900 group/thumb cursor-pointer shadow-2xs"
                            >
                              <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform" />
                              
                              {vid.isLive && (
                                <span className="absolute top-1 left-1 bg-[#eb1c24] text-white text-[8px] font-black px-1.5 py-0.2 rounded flex items-center gap-1 shadow-2xs animate-pulse">
                                  LIVE
                                </span>
                              )}

                              <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                                {vid.duration}
                              </span>

                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                                <div className="w-7 h-7 rounded-full bg-[#eb1c24] text-white flex items-center justify-center shadow-md">
                                  <Play size={12} fill="white" className="ml-0.5" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <h4
                                onClick={() => setPlayingVideo(vid)}
                                className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-1 font-bangla group-hover:text-[#eb1c24] transition-colors cursor-pointer"
                              >
                                {vid.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 font-medium line-clamp-1 font-bangla">
                                {vid.subtitle}
                              </p>
                              <div className="flex items-center gap-1 text-[10px] text-purple-600 font-bold">
                                {vid.hashtags.slice(0, 3).map((h, idx) => (
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
                              onClick={() => navigate(`/videos/edit/${vid.id}`)}
                              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Edit Video"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(vid.id, vid.title)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Video"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Grid View Card Layout */
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {paginatedVideos.map((vid) => (
                  <div key={vid.id} className="bg-slate-50/60 border border-slate-200/80 rounded-2xl p-3 space-y-3 group hover:bg-white hover:shadow-md transition-all">
                    <div
                      onClick={() => setPlayingVideo(vid)}
                      className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer"
                    >
                      <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-9 h-9 rounded-full bg-[#eb1c24] text-white flex items-center justify-center shadow-lg">
                          <Play size={16} fill="white" className="ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                        {vid.duration}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                          {vid.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{vid.date}</span>
                      </div>
                      <h4
                        onClick={() => setPlayingVideo(vid)}
                        className="font-extrabold text-slate-900 text-xs line-clamp-2 cursor-pointer hover:text-[#eb1c24]"
                      >
                        {vid.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                      <span className="font-bold text-slate-500 text-[11px]">{vid.views} views</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => navigate(`/videos/edit/${vid.id}`)}
                          className="p-1 text-slate-400 hover:text-slate-800"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(vid.id, vid.title)}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Dynamic Table Pagination Footer */}
            {filteredVideos.length > 0 && (
              <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
                <span>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} videos</span>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      onClick={() => setCurrentPage(pg)}
                      className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-all cursor-pointer ${
                        currentPage === pg ? 'bg-slate-900 text-white shadow-2xs' : 'border border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {pg}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs outline-none cursor-pointer"
                >
                  <option value={10}>10 / page</option>
                  <option value={20}>20 / page</option>
                  <option value={50}>50 / page</option>
                </select>
              </div>
            )}

          </div>
        </div>

        {/* Right Side: Dynamic Video Analytics & Dynamic Top Videos Sidebar (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">

          {/* 1. Dynamic Video Analytics Stat Grid Card */}
          <div className="bg-white p-4.5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900">Video Analytics</h3>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400">Total Videos</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-slate-900 text-sm">{videos.length}</span>
                  <span className="text-[9px] font-bold text-emerald-600">Live</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 font-outfit">Total Views</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-slate-900 text-sm font-outfit">{formattedTotalViews}</span>
                  <span className="text-[9px] font-bold text-emerald-600 font-outfit">↑100%</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 font-outfit">Published</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-slate-900 text-sm font-outfit">
                    {videos.filter(v => v.status === 'Published').length}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-600 font-outfit">Ready</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 font-outfit">Playlists</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-slate-900 text-sm font-outfit">{playlistsList.length}</span>
                  <span className="text-[9px] font-bold text-emerald-600 font-outfit">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Dynamic Top Performing Videos Ranking Card */}
          <div className="bg-white p-4.5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900">Top Performing Videos</h3>

            <div className="space-y-2 text-xs font-bangla">
              {topPerformingVideos.length > 0 ? (
                topPerformingVideos.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setPlayingVideo(item)}
                    className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <span className="font-mono text-xs font-bold text-slate-400 w-3">{idx + 1}</span>
                    <img src={item.thumbnail} alt={item.title} className="w-12 h-8 rounded-lg object-cover shrink-0 border border-slate-200" />
                    <div className="space-y-0.5 truncate">
                      <h5 className="font-bold text-slate-800 text-xs truncate leading-tight group-hover:text-[#eb1c24]">{item.title}</h5>
                      <p className="text-[10px] text-slate-400 font-semibold">{item.views} views</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 font-medium py-2 text-center">No video analytics available</p>
              )}
            </div>
          </div>

          {/* 3. Dynamic Video Categories Count List Card */}
          <div className="bg-white p-4.5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900">Video Categories</h3>

            <div className="space-y-1.5 text-xs font-semibold text-slate-700">
              {Object.keys(categoryCounts).length > 0 ? (
                Object.entries(categoryCounts).map(([catName, count], i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedCategory(catName);
                      setCurrentPage(1);
                    }}
                    className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      <span className="capitalize">{catName}</span>
                    </div>
                    <span className="font-bold text-slate-400 font-mono text-[11px]">{count}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 font-medium py-2 text-center">No categories recorded</p>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Video Player Preview Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-5 space-y-4 shadow-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-sm text-white font-bangla">{playingVideo.title}</h3>
                <span className="text-[11px] text-slate-400 font-medium">{playingVideo.category} • {playingVideo.views} views</span>
              </div>
              <button onClick={() => setPlayingVideo(null)} className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Video Player Iframe / Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-xl">
              {playingVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1`}
                  title={playingVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 font-bold text-xs p-6 text-center space-y-2">
                  <Video size={32} className="text-slate-600" />
                  <p>ইউটিউব আইডি পাওয়া যায়নি</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-800/60 font-bold text-[10px]">
                  {playingVideo.status}
                </span>
                <span className="text-slate-400 font-mono">{playingVideo.duration}</span>
              </div>
              <button
                onClick={() => {
                  const editId = playingVideo.id;
                  setPlayingVideo(null);
                  navigate(`/videos/edit/${editId}`);
                }}
                className="px-4 py-1.5 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Pencil size={13} />
                <span>Edit Video</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
