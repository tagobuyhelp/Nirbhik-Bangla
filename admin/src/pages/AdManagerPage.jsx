import { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';

export default function AdManagerPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAds, setSelectedAds] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Create Ad Form State
  const [adName, setAdName] = useState('');
  const [adPlacement, setAdPlacement] = useState('Homepage - Top Banner (970x90)');
  const [adType, setAdType] = useState('Image');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Initial Ads Dataset (Exact match to reference UI image)
  const [ads, setAds] = useState([
    {
      id: 1,
      name: 'Dhanlaxmi Bank',
      code: 'ID: AD-00067',
      placement: 'Homepage - Top Banner',
      dimension: '970 x 90',
      type: 'Image',
      status: 'Active',
      date: 'May 20, 2024',
      time: '10:00 AM',
      impressions: '320,450',
      clicks: '2,450',
      ctr: '0.76%',
      logoBg: 'bg-blue-600',
      logoText: 'D',
    },
    {
      id: 2,
      name: 'Tesla Model 3',
      code: 'ID: AD-00066',
      placement: 'Article Page - Sidebar',
      dimension: '300 x 250',
      type: 'Image',
      status: 'Active',
      date: 'May 18, 2024',
      time: '09:30 AM',
      impressions: '245,670',
      clicks: '1,987',
      ctr: '0.81%',
      logoBg: 'bg-red-600',
      logoText: 'T',
    },
    {
      id: 3,
      name: 'MyGP App',
      code: 'ID: AD-00065',
      placement: 'Homepage - Middle',
      dimension: '728 x 90',
      type: 'Image',
      status: 'Active',
      date: 'May 17, 2024',
      time: '08:00 AM',
      impressions: '410,230',
      clicks: '3,126',
      ctr: '0.76%',
      logoBg: 'bg-purple-600',
      logoText: 'GP',
    },
    {
      id: 4,
      name: 'Walton Smart TV (Video)',
      code: 'ID: AD-00064',
      placement: 'Article Page - In-Content',
      dimension: '640 x 360',
      type: 'Video',
      status: 'Scheduled',
      date: 'May 23, 2024',
      time: '12:00 AM',
      impressions: '-',
      clicks: '-',
      ctr: '-',
      logoBg: 'bg-indigo-600',
      logoText: 'W',
      isVideo: true,
    },
    {
      id: 5,
      name: 'ACI Motors',
      code: 'ID: AD-00063',
      placement: 'Homepage - Bottom',
      dimension: '970 x 90',
      type: 'Image',
      status: 'Active',
      date: 'May 16, 2024',
      time: '11:15 AM',
      impressions: '210,340',
      clicks: '1,426',
      ctr: '0.68%',
      logoBg: 'bg-emerald-600',
      logoText: 'ACI',
    },
    {
      id: 6,
      name: 'Bashundhara Tissue',
      code: 'ID: AD-00062',
      placement: 'Article Page - Sidebar',
      dimension: '300 x 250',
      type: 'Image',
      status: 'Expired',
      date: 'May 10, 2024',
      time: '11:59 PM',
      impressions: '155,300',
      clicks: '980',
      ctr: '0.63%',
      logoBg: 'bg-amber-600',
      logoText: 'BT',
    },
    {
      id: 7,
      name: 'Evaly Anniversary Sale',
      code: 'ID: AD-00061',
      placement: 'Homepage - Top Banner',
      dimension: '970 x 90',
      type: 'Image',
      status: 'Draft',
      date: 'May 24, 2024',
      time: '02:00 PM',
      impressions: '-',
      clicks: '-',
      ctr: '-',
      logoBg: 'bg-slate-900',
      logoText: 'evaly',
    },
    {
      id: 8,
      name: 'Prime Bank',
      code: 'ID: AD-00060',
      placement: 'Article Page - In-Content',
      dimension: '640 x 360',
      type: 'Image',
      status: 'Pending Approval',
      date: 'May 20, 2024',
      time: '02:30 PM',
      impressions: '-',
      clicks: '-',
      ctr: '-',
      logoBg: 'bg-teal-600',
      logoText: 'PB',
    },
  ]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAds(ads.map((a) => a.id));
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

  const handleCreateAd = (e) => {
    e.preventDefault();
    if (!adName.trim()) return;

    const newAd = {
      id: Date.now(),
      name: adName.trim(),
      code: `ID: AD-000${ads.length + 68}`,
      placement: adPlacement.split('(')[0].trim(),
      dimension: adPlacement.includes('(') ? adPlacement.split('(')[1].replace(')', '') : '300 x 250',
      type: adType,
      status: 'Active',
      date: 'May 21, 2024',
      time: '10:00 PM',
      impressions: '0',
      clicks: '0',
      ctr: '0.00%',
      logoBg: 'bg-[#eb1c24]',
      logoText: adName.substring(0, 2).toUpperCase(),
    };

    setAds([newAd, ...ads]);
    setAdName('');
    setShowCreateModal(false);
    showToast(`নতুন বিজ্ঞাপন ক্যাম্পেইন "${newAd.name}" চালু হয়েছে!`);
  };

  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      ad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.placement.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && ad.status === 'Active';
    if (activeTab === 'scheduled') return matchesSearch && ad.status === 'Scheduled';
    if (activeTab === 'expired') return matchesSearch && ad.status === 'Expired';
    if (activeTab === 'draft') return matchesSearch && ad.status === 'Draft';
    if (activeTab === 'pending') return matchesSearch && ad.status === 'Pending Approval';
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
          <h3 className="text-xl font-black text-slate-900">67</h3>
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
            <h3 className="text-xl font-black text-slate-900">32</h3>
            <span className="text-[9px] font-bold text-emerald-600">↑ 12.5%</span>
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
          <h3 className="text-xl font-black text-slate-900">14</h3>
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
          <h3 className="text-xl font-black text-slate-900">16</h3>
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
          <h3 className="text-xl font-black text-slate-900">2.45M</h3>
          <span className="text-[9px] font-semibold text-slate-400 block">This month</span>
        </div>

        {/* Card 6: Total Clicks */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Total Clicks</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <MousePointer size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">18,742</h3>
          <span className="text-[9px] font-semibold text-slate-400 block">This month</span>
        </div>
      </div>

      {/* 3. Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
        {/* Tabs Row */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Ads', count: 67 },
            { id: 'active', label: 'Active', count: 32 },
            { id: 'scheduled', label: 'Scheduled', count: 14 },
            { id: 'expired', label: 'Expired', count: 16 },
            { id: 'draft', label: 'Draft', count: 5 },
            { id: 'pending', label: 'Pending Approval', count: 3 },
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
                  {filteredAds.map((ad) => (
                    <tr key={ad.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedAds.includes(ad.id)}
                          onChange={() => handleToggleSelect(ad.id)}
                          className="rounded border-slate-300 text-[#eb1c24]"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5 min-w-[180px]">
                          <div className={`w-10 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs ${ad.logoBg} shadow-2xs shrink-0 uppercase tracking-tighter`}>
                            {ad.isVideo ? <Play size={14} fill="white" /> : ad.logoText}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-xs leading-tight group-hover:text-purple-700 transition-colors">
                              {ad.name}
                            </h4>
                            <span className="text-[10px] font-mono font-medium text-slate-400 block">
                              {ad.code}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-800 text-xs block">{ad.placement}</span>
                          <span className="text-[10px] font-mono text-slate-400 font-semibold">{ad.dimension}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-slate-600">
                        {ad.type}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            ad.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : ad.status === 'Scheduled'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : ad.status === 'Expired'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : ad.status === 'Pending Approval'
                              ? 'bg-orange-50 text-orange-700 border border-orange-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {ad.status === 'Active' && '● '}
                          {ad.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                        <div>{ad.date}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{ad.time}</div>
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                        {ad.impressions}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-indigo-600">
                        {ad.clicks}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-extrabold text-slate-900">
                        {ad.ctr}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => showToast(`Viewing ad stats for "${ad.name}"`)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="View Preview"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => showToast(`Edit campaign "${ad.name}"`)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Ad"
                          >
                            <Pencil size={14} />
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

      {/* Create New Ad Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900">Create New Ad Campaign</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAd} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Campaign / Advertiser Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dhanlaxmi Bank, Tesla Model 3..."
                  value={adName}
                  onChange={(e) => setAdName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Placement Zone</label>
                <select
                  value={adPlacement}
                  onChange={(e) => setAdPlacement(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Homepage - Top Banner (970x90)">Homepage - Top Banner (970x90)</option>
                  <option value="Article Page - Sidebar (300x250)">Article Page - Sidebar (300x250)</option>
                  <option value="Homepage - Middle (728x90)">Homepage - Middle (728x90)</option>
                  <option value="Article Page - In-Content (640x360)">Article Page - In-Content (640x360)</option>
                  <option value="Homepage - Bottom (970x90)">Homepage - Bottom (970x90)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Ad Format / Type</label>
                <select
                  value={adType}
                  onChange={(e) => setAdType(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Image">Image Banner</option>
                  <option value="Video">Video Ad</option>
                  <option value="HTML5">HTML5 Interactive</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl shadow-md cursor-pointer"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
