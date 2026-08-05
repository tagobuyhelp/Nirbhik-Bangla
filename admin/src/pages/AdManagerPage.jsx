import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  Plus,
  Search,
  Filter,
  Pencil,
  Eye,
  MoreVertical,
  Sliders,
  ShieldCheck,
  BarChart2,
  MousePointer,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  LayoutGrid,
  List,
  Layers,
  Shield,
  CheckSquare,
  Globe2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  FileText,
  DollarSign,
  Trash2,
} from 'lucide-react';

export default function AdManagerPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAds, setSelectedAds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/ads');
      setAds(res.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching ads:', err);
      setError('বিজ্ঞাপন লোড করতে সমস্যা হয়েছে');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAd = async (id) => {
    if (window.confirm('আপনি কি নিশ্চিত যে আপনি এই বিজ্ঞাপনটি মুছে ফেলতে চান?')) {
      try {
        await api.delete(`/ads/${id}`);
        showToast('বিজ্ঞাপন সফলভাবে মুছে ফেলা হয়েছে!');
        fetchAds();
      } catch (err) {
        console.error('Error deleting ad:', err);
        showToast('বিজ্ঞাপন মুছতে সমস্যা হয়েছে');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await api.put(`/ads/${id}`, { isActive: !currentStatus });
      showToast(currentStatus ? 'বিজ্ঞাপন নিষ্ক্রিয় করা হয়েছে!' : 'বিজ্ঞাপন সক্রিয় করা হয়েছে!');
      fetchAds();
    } catch (err) {
      console.error('Error toggling status:', err);
      showToast('স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAds(ads.map((a) => a._id));
    } else {
      setSelectedAds([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedAds.includes(id)) {
      setSelectedAds(selectedAds.filter((i) => i !== id));
    } else {
      setSelectedAds([...selectedAds, id]);
    }
  };

  const getAdStatus = (ad) => {
    if (!ad.isActive) return 'Paused';
    if (ad.endDate && new Date(ad.endDate) < new Date()) return 'Expired';
    if (ad.startDate && new Date(ad.startDate) > new Date()) return 'Scheduled';
    return 'Active';
  };

  const filteredAds = ads.filter((ad) => {
    const status = getAdStatus(ad);
    const matchesSearch =
      (ad.title && ad.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ad.locationSlot && ad.locationSlot.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && status === 'Active';
    if (activeTab === 'scheduled') return matchesSearch && status === 'Scheduled';
    if (activeTab === 'expired') return matchesSearch && status === 'Expired';
    if (activeTab === 'paused') return matchesSearch && status === 'Paused';
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
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Ad Manager</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Create, manage and monitor all advertisements.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => showToast('Ad Settings Panel opened!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Sliders size={14} className="text-slate-500" />
            <span>Ad Settings</span>
          </button>

          <button
            onClick={() => showToast('Ad Approval Queue opened (3 pending)!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <ShieldCheck size={14} className="text-slate-500" />
            <span>Ad Approval</span>
          </button>

          <Link
            to="/ads-manager/create"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Create New Ad</span>
          </Link>
        </div>
      </div>

      {/* 2. Top 6 Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Total Ads */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Total Ads</span>
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Layers size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">{ads.length}</h3>
          <span className="text-[9px] font-semibold text-slate-400 block">All advertisements</span>
        </div>

        {/* Card 2: Active Ads */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Active Ads</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 size={14} />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-xl font-black text-slate-900">{ads.filter(a => getAdStatus(a) === 'Active').length}</h3>
          </div>
          <span className="text-[9px] font-semibold text-slate-400 block">Currently running</span>
        </div>

        {/* Card 3: Scheduled Ads */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Scheduled Ads</span>
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Clock size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">{ads.filter(a => getAdStatus(a) === 'Scheduled').length}</h3>
          <span className="text-[9px] font-semibold text-slate-400 block">Upcoming ads</span>
        </div>

        {/* Card 4: Expired Ads */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Expired Ads</span>
            <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <AlertCircle size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">{ads.filter(a => getAdStatus(a) === 'Expired').length}</h3>
          <span className="text-[9px] font-semibold text-slate-400 block">Completed / Expired</span>
        </div>

        {/* Card 5: Total Impressions */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Total Impressions</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <BarChart2 size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">{ads.reduce((acc, curr) => acc + (curr.impressionsCount || 0), 0).toLocaleString()}</h3>
          <span className="text-[9px] font-semibold text-slate-400 block">All time</span>
        </div>

        {/* Card 6: Total Clicks */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Total Clicks</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <MousePointer size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">{ads.reduce((acc, curr) => acc + (curr.clicksCount || 0), 0).toLocaleString()}</h3>
          <span className="text-[9px] font-semibold text-slate-400 block">All time</span>
        </div>
      </div>

      {/* 3. Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
        {/* Tabs Row */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Ads' },
            { id: 'active', label: 'Active' },
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'expired', label: 'Expired' },
            { id: 'paused', label: 'Paused' },
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
            </button>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ads..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all font-medium"
            />
          </div>

          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
            <Filter size={14} className="text-slate-500" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* 4. Main Content: Grid Layout (Ads Table 9 Cols + Overview Sidebar 3 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Side: Ads Table (~75% - lg:col-span-9) */}
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
                        checked={selectedAds.length === ads.length && ads.length > 0}
                        className="rounded border-slate-300 text-[#eb1c24]"
                      />
                    </th>
                    <th className="py-3 px-3">Ad Details</th>
                    <th className="py-3 px-3">Placement</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Impressions</th>
                    <th className="py-3 px-3">Clicks</th>
                    <th className="py-3 px-3">CTR</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {isLoading ? (
                    <tr>
                      <td colSpan="10" className="text-center py-10 text-slate-500 font-bold">
                        লোড হচ্ছে...
                      </td>
                    </tr>
                  ) : filteredAds.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center py-10 text-slate-500 font-bold">
                        কোনো বিজ্ঞাপন পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    filteredAds.map((ad) => {
                      const status = getAdStatus(ad);
                      const ctr = ad.impressionsCount > 0 ? ((ad.clicksCount / ad.impressionsCount) * 100).toFixed(2) + '%' : '-';
                      
                      const colors = ['bg-blue-600', 'bg-red-600', 'bg-purple-600', 'bg-indigo-600', 'bg-emerald-600', 'bg-amber-600', 'bg-teal-600'];
                      const logoBg = colors[ad.title.charCodeAt(0) % colors.length] || 'bg-slate-600';

                      return (
                    <tr key={ad._id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedAds.includes(ad._id)}
                          onChange={() => handleToggleSelect(ad._id)}
                          className="rounded border-slate-300 text-[#eb1c24]"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5 min-w-[180px]">
                          <div className={`w-10 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs ${logoBg} shadow-2xs shrink-0 uppercase tracking-tighter`}>
                            {ad.adType === 'Video' ? <Play size={14} fill="white" /> : ad.title.substring(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-xs leading-tight group-hover:text-purple-700 transition-colors">
                              {ad.title}
                            </h4>
                            <span className="text-[10px] font-mono font-medium text-slate-400 block">
                              ID: {ad._id.substring(ad._id.length - 6).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-800 text-xs block">{ad.locationSlot}</span>
                          <span className="text-[10px] font-mono text-slate-400 font-semibold">{ad.adCategory || 'Standard'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-slate-600">
                        {ad.adType}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : status === 'Scheduled'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : status === 'Expired'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {status === 'Active' && '● '}
                          {status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-medium text-slate-600 text-xs min-w-[100px]">
                        <span className="block text-slate-800 font-bold">{new Date(ad.createdAt).toLocaleDateString()}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{new Date(ad.createdAt).toLocaleTimeString()}</span>
                      </td>

                      <td className="py-3.5 px-3 font-bold text-slate-700">{ad.impressionsCount || '-'}</td>
                      <td className="py-3.5 px-3 font-bold text-slate-700">{ad.clicksCount || '-'}</td>
                      <td className="py-3.5 px-3 font-black text-[#eb1c24]">{ctr}</td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleToggleStatus(ad._id, ad.isActive)} title={ad.isActive ? "Pause Ad" : "Activate Ad"} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer">
                            <Clock size={15} />
                          </button>
                          <Link to={`/ads-manager/create?edit=${ad._id}`} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                            <Pencil size={15} />
                          </Link>
                          <button onClick={() => handleDeleteAd(ad._id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            {/* Table Pagination Footer */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
              <span>Showing 1 to {filteredAds.length} of 67 ads</span>

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
                <span className="px-1 text-slate-400 font-bold">...</span>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  9
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

        {/* Right Side: Ad Overview Donut, Top Performing Ads & Quick Actions (~25% - lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">

          {/* 1. Ad Overview Donut Chart Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Ad Overview</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 px-2 py-1 outline-none cursor-pointer">
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            {/* Donut SVG Chart */}
            <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#059669" strokeWidth="16" strokeDasharray="113 238" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray="50 238" strokeDashoffset="-113" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#e11d48" strokeWidth="16" strokeDasharray="57 238" strokeDashoffset="-163" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#64748b" strokeWidth="16" strokeDasharray="18 238" strokeDashoffset="-220" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-black text-slate-900 leading-none">67</span>
                <span className="text-[9px] font-bold text-slate-400 mt-0.5">Total Ads</span>
              </div>
            </div>

            {/* Legend List */}
            <div className="space-y-1.5 text-[11px] pt-1 border-t border-slate-100 font-semibold text-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>Active</span>
                </div>
                <span className="font-extrabold text-slate-500">32 (47.8%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>Scheduled</span>
                </div>
                <span className="font-extrabold text-slate-500">14 (20.9%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  <span>Expired</span>
                </div>
                <span className="font-extrabold text-slate-500">16 (23.9%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                  <span>Draft</span>
                </div>
                <span className="font-extrabold text-slate-500">5 (7.5%)</span>
              </div>
            </div>
          </div>

          {/* 2. Top Performing Ads Ranking Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Top Performing Ads</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 px-2 py-1 outline-none cursor-pointer">
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { rank: 1, name: 'Dhanlaxmi Bank', impr: '320,450', ctr: '0.76%', clicks: '2,450 Clicks' },
                { rank: 2, name: 'MyGP App', impr: '410,230', ctr: '0.76%', clicks: '3,126 Clicks' },
                { rank: 3, name: 'Tesla Model 3', impr: '245,670', ctr: '0.81%', clicks: '1,987 Clicks' },
                { rank: 4, name: 'ACI Motors', impr: '210,340', ctr: '0.68%', clicks: '1,426 Clicks' },
                { rank: 5, name: 'Bashundhara Tissue', impr: '155,300', ctr: '0.63%', clicks: '980 Clicks' },
              ].map((item) => (
                <div key={item.rank} className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400 w-3">{item.rank}</span>
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs leading-tight">{item.name}</h5>
                      <span className="text-[10px] text-slate-400 font-medium">Impr: {item.impr}  CTR: {item.ctr}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md shrink-0">
                    {item.clicks}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast('Ad Performance Report downloaded!')}
              className="w-full py-2 text-purple-700 text-xs font-extrabold hover:underline flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View All Reports</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 3. Quick Actions Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 text-xs font-bold text-slate-700">
            <h3 className="font-extrabold text-xs text-slate-900 mb-1">Quick Actions</h3>

            <button onClick={() => setShowCreateModal(true)} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Plus size={15} className="text-purple-600" />
              <span>Create New Ad</span>
            </button>
            <button onClick={() => showToast('Ad Placements Manager opened!')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Sliders size={15} className="text-blue-600" />
              <span>Manage Ad Placements</span>
            </button>
            <button onClick={() => showToast('Block Ad Manager opened!')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Shield size={15} className="text-rose-600" />
              <span>Block Ads</span>
            </button>
            <button onClick={() => showToast('Approval Queue opened!')} className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <div className="flex items-center gap-2">
                <CheckSquare size={15} className="text-emerald-600" />
                <span>Ad Approval Queue</span>
              </div>
              <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded">3</span>
            </button>
            <button onClick={() => showToast('Ad Networks config opened!')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Globe2 size={15} className="text-amber-600" />
              <span>Ad Networks</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
