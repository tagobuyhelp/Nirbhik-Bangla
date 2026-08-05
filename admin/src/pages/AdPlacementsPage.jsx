import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  Plus,
  Search,
  Filter,
  Pencil,
  MoreVertical,
  GripVertical,
  Sliders,
  CheckCircle2,
  BarChart2,
  MousePointer,
  Percent,
  Monitor,
  Smartphone,
  TrendingUp,
  Clock,
  Sparkles,
  LayoutGrid,
  List,
  Layers,
  Globe2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  Shield,
  Layout,
  Maximize2,
  Ban,
  FileBarChart,
} from 'lucide-react';

export default function AdPlacementsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlacements, setSelectedPlacements] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Form State
  const [placeName, setPlaceName] = useState('');
  const [placeType, setPlaceType] = useState('Banner');
  const [placeLocation, setPlaceLocation] = useState('Homepage - Top');
  const [placeSize, setPlaceSize] = useState('970 x 90');

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const res = await api.get('/placements');
      setPlacements(res.data.data);
    } catch (err) {
      console.error('Failed to fetch placements', err);
      showToast('প্লেসমেন্ট ডাটা লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };


  const handleToggleSelect = (id) => {
    if (selectedPlacements.includes(id)) {
      setSelectedPlacements(selectedPlacements.filter((i) => i !== id));
    } else {
      setSelectedPlacements([...selectedPlacements, id]);
    }
  };

  const deletePlacement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this placement?')) return;
    try {
      await api.delete(`/placements/${id}`);
      setPlacements(placements.filter(p => p._id !== id));
      showToast('প্লেসমেন্ট ডিলিট করা হয়েছে');
    } catch (err) {
      console.error('Delete error', err);
      showToast('ডিলিট করতে সমস্যা হয়েছে');
    }
  };

  const filteredPlacements = placements.filter((p) => {
    if (!p) return false;
    const searchVal = (searchQuery || '').toLowerCase();
    const matchesSearch =
      (p.placementName || '').toLowerCase().includes(searchVal) ||
      (p.location || '').toLowerCase().includes(searchVal);

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && p.isActive === true;
    if (activeTab === 'inactive') return matchesSearch && p.isActive === false;
    return matchesSearch;
  });

  const totalPlacements = placements.length;
  const activePlacementsCount = placements.filter(p => p && p.isActive).length;
  const totalImpr = placements.reduce((acc, curr) => acc + (curr?.impressionsCount || 0), 0);
  const totalClicks = placements.reduce((acc, curr) => acc + (curr?.clicksCount || 0), 0);
  const totalCtr = totalImpr > 0 ? ((totalClicks / totalImpr) * 100).toFixed(2) : '0.00';
  
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6 text-slate-800 font-sans relative">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <NavLink to="/ads-manager" className="hover:text-[#eb1c24] transition-colors">Ad Manager</NavLink>
        <span>›</span>
        <span className="text-slate-900 font-bold">Ad Placements</span>
      </nav>

      {/* 1. Header Title & Top Action Buttons Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Ad Placements</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Manage all advertisement placements on your website and apps.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => showToast('Placement Settings Panel opened!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Sliders size={14} className="text-slate-500" />
            <span>Placement Settings</span>
          </button>

          <Link
            to="/ad-placements/create"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Placement</span>
          </Link>
        </div>
      </div>

      {/* 2. Top 5 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Placements */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Total Placements</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">{totalPlacements}</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">All ad spaces</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Layout size={18} />
          </div>
        </div>

        {/* Card 2: Active Placements */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Active Placements</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">{activePlacementsCount}</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">
              {totalPlacements > 0 ? Math.round((activePlacementsCount/totalPlacements)*100) : 0}% of total
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <CheckCircle2 size={18} />
          </div>
        </div>

        {/* Card 3: Impressions (This Month) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Total Impressions</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-xl font-black text-slate-900 mt-0.5">{formatNumber(totalImpr)}</h3>
            </div>
            <span className="text-[9px] font-bold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <TrendingUp size={10} /> ↑ 18.6% vs last month
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <BarChart2 size={18} />
          </div>
        </div>

        {/* Card 4: Clicks (This Month) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Total Clicks</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-xl font-black text-slate-900 mt-0.5">{formatNumber(totalClicks)}</h3>
            </div>
            <span className="text-[9px] font-bold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <TrendingUp size={10} /> ↑ 12.4% vs last month
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <MousePointer size={18} />
          </div>
        </div>

        {/* Card 5: CTR (This Month) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Avg CTR</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-xl font-black text-slate-900 mt-0.5">{totalCtr}%</h3>
            </div>
            <span className="text-[9px] font-bold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <TrendingUp size={10} /> ↑ 5.2% vs last month
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Percent size={18} />
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
        {/* Tabs Row */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Placements', count: totalPlacements },
            { id: 'active', label: 'Active', count: activePlacementsCount },
            { id: 'inactive', label: 'Inactive', count: totalPlacements - activePlacementsCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
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
              placeholder="Search placements..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all font-medium"
            />
          </div>

          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
            <Filter size={14} className="text-slate-500" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* 4. Main Content: Grid Layout (Placements Table 9 Cols + Overview Sidebar 3 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Side: Placements Table (~75% - lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3 w-8 text-center"></th>
                    <th className="py-3 px-3">Placement Name</th>
                    <th className="py-3 px-3">Placement Type</th>
                    <th className="py-3 px-3">Location</th>
                    <th className="py-3 px-3">Size</th>
                    <th className="py-3 px-3 text-center">Devices</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Performance (This Month)</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredPlacements.map((place) => {
                    const placeCode = place._id ? `ID: PL-${place._id.substring(place._id.length - 4).toUpperCase()}` : 'ID: NEW';
                    const isStatusActive = place.isActive;
                    const ctrValue = place.impressionsCount > 0 ? ((place.clicksCount / place.impressionsCount) * 100).toFixed(2) + '%' : '0.00%';
                    let typeColor = 'bg-slate-50 text-slate-700 border-slate-200';
                    if (place.placementType === 'Banner') typeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                    else if (place.placementType === 'Sidebar') typeColor = 'bg-blue-50 text-blue-700 border-blue-200';
                    else if (place.placementType === 'In-Content') typeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    else if (place.placementType === 'Pop-up') typeColor = 'bg-rose-50 text-rose-700 border-rose-200';
                    else if (place.placementType === 'Sticky') typeColor = 'bg-purple-50 text-purple-700 border-purple-200';

                    return (
                    <tr key={place._id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="py-3.5 px-3 text-center">
                        <GripVertical size={14} className="text-slate-300 cursor-grab group-hover:text-slate-400 mx-auto" />
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5 min-w-[160px]">
                          <div className="w-9 h-7 rounded-md border border-slate-300 bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                            <Layout size={14} />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-xs leading-tight group-hover:text-purple-700 transition-colors">
                              {place.placementName}
                            </h4>
                            <span className="text-[10px] font-mono font-medium text-slate-400 block">
                              {placeCode}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${typeColor}`}>
                          {place.placementType || 'Banner'}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-700 font-semibold text-xs">
                        {place.location}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                        {place.adSize}
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-slate-600">
                          {place.devices?.desktop && <Monitor size={15} title="Desktop Compatible" />}
                          {place.devices?.mobile && <Smartphone size={14} title="Mobile Compatible" />}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            isStatusActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {isStatusActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        {isStatusActive ? (
                          <div className="space-y-0.5">
                            <div className="flex items-baseline gap-1 text-slate-900 font-bold">
                              <span>{place.impressionsCount} Impr.</span>
                              <span className="text-[10px] text-emerald-600 font-extrabold">{ctrValue} CTR</span>
                            </div>
                            <span className="text-[10px] font-mono font-semibold text-slate-400 block">
                              {place.clicksCount} Clicks
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-400">0 Impr. | 0 Clicks</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/ad-placements/create?edit=${place._id}`}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer inline-flex"
                            title="Edit Placement"
                          >
                            <Pencil size={14} />
                          </Link>
                          <button
                            onClick={() => deletePlacement(place._id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Placement"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>

            {/* Table Pagination Footer */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
              <span>Showing 1 to {filteredPlacements.length} of 28 placements</span>

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
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <ChevronRight size={16} />
                </button>
              </div>

              <select className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs outline-none cursor-pointer">
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Side: Placement Overview Donut, Top Performing Placements & Quick Actions (~25% - lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">

          {/* 1. Placement Overview Donut Chart Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900">Placement Overview</h3>

            {/* Donut SVG Chart */}
            <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#059669" strokeWidth="16" strokeDasharray="178 238" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray="60 238" strokeDashoffset="-178" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-black text-slate-900 leading-none">28</span>
                <span className="text-[9px] font-bold text-slate-400 mt-0.5">Total</span>
              </div>
            </div>

            {/* Legend List */}
            <div className="space-y-1.5 text-[11px] pt-1 border-t border-slate-100 font-semibold text-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>Active (21)</span>
                </div>
                <span className="font-extrabold text-slate-500">75%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>Inactive (7)</span>
                </div>
                <span className="font-extrabold text-slate-500">25%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Draft (0)</span>
                </div>
                <span className="font-extrabold text-slate-500">0%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>Archived (0)</span>
                </div>
                <span className="font-extrabold text-slate-500">0%</span>
              </div>
            </div>
          </div>

          {/* 2. Top Performing Placements Ranking Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Top Performing Placements</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 px-2 py-1 outline-none cursor-pointer">
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { rank: 1, name: 'Top Banner', sub: '1.25M Impr. • 9,850 Clicks', ctr: '0.79% CTR' },
                { rank: 2, name: 'Article Sidebar 1', sub: '820K Impr. • 6,250 Clicks', ctr: '0.76% CTR' },
                { rank: 3, name: 'In-Content Ad', sub: '640K Impr. • 4,950 Clicks', ctr: '0.77% CTR' },
                { rank: 4, name: 'Mobile In-Article', sub: '410K Impr. • 3,120 Clicks', ctr: '0.76% CTR' },
                { rank: 5, name: 'Below Post', sub: '380K Impr. • 2,860 Clicks', ctr: '0.75% CTR' },
              ].map((item) => (
                <div key={item.rank} className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400 w-3">{item.rank}</span>
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs leading-tight">{item.name}</h5>
                      <span className="text-[10px] text-slate-400 font-medium">{item.sub}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md shrink-0">
                    {item.ctr}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast('Placement Performance Report downloaded!')}
              className="w-full py-2 text-purple-700 text-xs font-extrabold hover:underline flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View All Performance</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 3. Quick Actions Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 text-xs font-bold text-slate-700">
            <h3 className="font-extrabold text-xs text-slate-900 mb-1">Quick Actions</h3>

            <button onClick={() => setShowAddModal(true)} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Plus size={15} className="text-purple-600" />
              <span>Add New Placement</span>
            </button>
            <button onClick={() => showToast('Ad Networks config opened!')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Globe2 size={15} className="text-blue-600" />
              <span>Manage Ad Networks</span>
            </button>
            <button onClick={() => showToast('Placement Settings opened!')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Sliders size={15} className="text-amber-600" />
              <span>Placement Settings</span>
            </button>
            <button onClick={() => showToast('Ad Reports opened!')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <FileBarChart size={15} className="text-emerald-600" />
              <span>View Ad Reports</span>
            </button>
            <button onClick={() => showToast('Block Placements opened!')} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <Ban size={15} className="text-rose-600" />
              <span>Block Placements</span>
            </button>
          </div>

        </div>

      </div>

      {/* Add New Placement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900">Add New Placement</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPlacement} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Placement Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Header Leaderboard, Article Footer..."
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Placement Type</label>
                <select
                  value={placeType}
                  onChange={(e) => setPlaceType(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Banner">Banner</option>
                  <option value="Sidebar">Sidebar</option>
                  <option value="In-Content">In-Content</option>
                  <option value="Sticky">Sticky</option>
                  <option value="Pop-up">Pop-up</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Dimension / Size</label>
                <input
                  type="text"
                  placeholder="e.g. 970 x 90, 300 x 250..."
                  value={placeSize}
                  onChange={(e) => setPlaceSize(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl shadow-md cursor-pointer"
                >
                  Save Placement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
