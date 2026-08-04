import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  Users,
  UserCheck,
  Briefcase,
  FileText,
  Award,
  Download,
  Plus,
  Search,
  Filter,
  List,
  Grid,
  MapPin,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  UserPlus,
  Calendar,
  BarChart2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';

// Specialization color map
const SPEC_COLORS = {
  Politics: 'bg-purple-50 text-purple-700 border-purple-200',
  Crime: 'bg-pink-50 text-pink-700 border-pink-200',
  Education: 'bg-blue-50 text-blue-700 border-blue-200',
  Health: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Sports: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Environment: 'bg-green-50 text-green-700 border-green-200',
  Business: 'bg-amber-50 text-amber-700 border-amber-200',
  Culture: 'bg-rose-50 text-rose-700 border-rose-200',
  Technology: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  International: 'bg-sky-50 text-sky-700 border-sky-200',
  National: 'bg-slate-100 text-slate-700 border-slate-200',
};

const ROWS_PER_PAGE = 15;

export default function ReportersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedReporters, setSelectedReporters] = useState([]);
  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' });
  const [page, setPage] = useState(1);

  // Data state
  const [reporters, setReporters] = useState([]);
  const [stats, setStats] = useState(null);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // reporter id to confirm delete

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage({ text: '', type: 'success' }), 3500);
  };

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const res = await api.get('/reporters/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to fetch reporter stats', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch reporters list
  const fetchReporters = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: ROWS_PER_PAGE,
        ...(activeTab !== 'all' && { status: activeTab }),
        ...(searchQuery && { search: searchQuery }),
      };
      const res = await api.get('/reporters', { params });
      setReporters(res.data.data || []);
      setMeta(res.data.meta || { total: 0, totalPages: 1 });
    } catch (err) {
      console.error('Failed to fetch reporters', err);
      showToast('রিপোর্টারদের তালিকা লোড করা যায়নি', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, activeTab, searchQuery]);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchReporters(); }, [fetchReporters]);

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
    setSelectedReporters([]);
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReporters(reporters.map((r) => r._id));
    } else {
      setSelectedReporters([]);
    }
  };

  const toggleSelect = (id) => {
    if (selectedReporters.includes(id)) {
      setSelectedReporters(selectedReporters.filter((i) => i !== id));
    } else {
      setSelectedReporters([...selectedReporters, id]);
    }
  };

  const handleDeleteReporter = async (id) => {
    try {
      await api.delete(`/reporters/${id}`);
      showToast('রিপোর্টার সফলভাবে মুছে ফেলা হয়েছে!');
      setDeleteConfirm(null);
      fetchReporters();
      fetchStats();
    } catch (err) {
      showToast(err?.response?.data?.message || 'মুছে ফেলতে সমস্যা হয়েছে', 'error');
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedReporters.length) return;
    try {
      await Promise.all(selectedReporters.map((id) => api.delete(`/reporters/${id}`)));
      showToast(`${selectedReporters.length}জন রিপোর্টার মুছে ফেলা হয়েছে!`);
      setSelectedReporters([]);
      fetchReporters();
      fetchStats();
    } catch (err) {
      showToast('বাল্ক ডিলিট করতে সমস্যা হয়েছে', 'error');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/reporters/${id}/status`, { reporterStatus: newStatus });
      showToast('স্ট্যাটাস আপডেট হয়েছে!');
      fetchReporters();
      fetchStats();
    } catch (err) {
      showToast('স্ট্যাটাস পরিবর্তন করা যায়নি', 'error');
    }
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Designation', 'Specialization', 'Location', 'Status'],
      ...reporters.map((r) => [r.name, r.email, r.phone || '', r.designation || '', r.specialization || '', r.location || '', r.reporterStatus || ''])
    ].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporters_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('রিপোর্টারদের তালিকা CSV হিসেবে ডাউনলোড হচ্ছে!');
  };

  const tabCounts = {
    all: meta.total,
    active: stats?.active ?? '…',
    assignment: stats?.onAssignment ?? '…',
    inactive: stats?.inactive ?? '…',
  };

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-12">

      {/* Toast Notification */}
      {toastMessage.text && (
        <div className={`fixed top-20 right-6 z-50 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border ${toastMessage.type === 'error' ? 'bg-red-600 border-red-700' : 'bg-slate-900 border-slate-700'}`}>
          {toastMessage.type === 'error'
            ? <AlertCircle size={16} className="text-white" />
            : <CheckCircle2 size={16} className="text-emerald-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <Trash2 size={20} className="text-[#eb1c24]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">রিপোর্টার মুছে ফেলবেন?</h3>
                <p className="text-xs text-slate-500 mt-0.5">এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 text-xs cursor-pointer">
                বাতিল করুন
              </button>
              <button onClick={() => handleDeleteReporter(deleteConfirm)} className="px-4 py-2 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl text-xs cursor-pointer">
                হ্যাঁ, মুছুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">Reporters</h1>
            <span className="bg-purple-100 text-purple-700 text-xs font-black px-2.5 py-0.5 rounded-full">
              {statsLoading ? '…' : stats?.total ?? 0}
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Manage all reporters — profiles, assignments and activities.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          {selectedReporters.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <Trash2 size={14} /> Delete Selected ({selectedReporters.length})
            </button>
          )}
          <button
            onClick={handleExport}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export CSV</span>
          </button>
          <Link
            to="/reporters/create"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Plus size={16} />
            <span>Add Reporter</span>
          </Link>
        </div>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {/* Total */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Reporters</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
              {statsLoading ? <Loader2 size={20} className="animate-spin text-slate-400" /> : stats?.total ?? 0}
            </h3>
            <span className="text-[9.5px] font-bold text-slate-400">All roles</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Users size={18} /></div>
        </div>

        {/* Active */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
              {statsLoading ? <Loader2 size={20} className="animate-spin text-slate-400" /> : stats?.active ?? 0}
            </h3>
            <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp size={10} /> Currently active</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><UserCheck size={18} /></div>
        </div>

        {/* On Assignment */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">On Assignment</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
              {statsLoading ? <Loader2 size={20} className="animate-spin text-slate-400" /> : stats?.onAssignment ?? 0}
            </h3>
            <span className="text-[9.5px] font-bold text-amber-600">On field</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><Briefcase size={18} /></div>
        </div>

        {/* Inactive */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Inactive</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
              {statsLoading ? <Loader2 size={20} className="animate-spin text-slate-400" /> : stats?.inactive ?? 0}
            </h3>
            <span className="text-[9.5px] font-bold text-slate-500">Not active</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><FileText size={18} /></div>
        </div>

        {/* Top Performer */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Top Performer</p>
            {statsLoading ? (
              <Loader2 size={16} className="animate-spin text-slate-400 mt-1" />
            ) : stats?.topPerformer ? (
              <>
                <h3 className="text-sm font-black text-slate-900 mt-0.5 truncate">{stats.topPerformer.name}</h3>
                <span className="text-[9.5px] font-bold text-purple-600">{stats.topPerformer.designation}</span>
              </>
            ) : (
              <h3 className="text-sm font-black text-slate-400 mt-0.5">—</h3>
            )}
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0"><Award size={18} /></div>
        </div>
      </div>

      {/* 3. Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Reporters' },
              { id: 'active', label: 'Active' },
              { id: 'assignment', label: 'On Assignment' },
              { id: 'inactive', label: 'Inactive' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                {tabCounts[tab.id] !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-purple-200 text-purple-800 font-black' : 'bg-slate-100 text-slate-500'}`}>
                    {tabCounts[tab.id]}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="নাম, ইমেইল বা স্থান খুঁজুন..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Reporters Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        onChange={toggleSelectAll}
                        checked={selectedReporters.length === reporters.length && reporters.length > 0}
                        className="rounded border-slate-300 text-[#eb1c24]"
                      />
                    </th>
                    <th className="py-3 px-3">Reporter</th>
                    <th className="py-3 px-3">Location</th>
                    <th className="py-3 px-3">Specialization</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Joined</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center">
                        <Loader2 size={28} className="animate-spin text-[#eb1c24] mx-auto" />
                        <p className="text-xs text-slate-400 mt-2 font-semibold">রিপোর্টারদের তালিকা লোড হচ্ছে...</p>
                      </td>
                    </tr>
                  ) : reporters.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center">
                        <Users size={36} className="text-slate-200 mx-auto mb-3" />
                        <p className="text-sm font-bold text-slate-400">কোনো রিপোর্টার পাওয়া যায়নি</p>
                        <Link to="/reporters/create" className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#eb1c24] hover:underline">
                          <Plus size={14} /> নতুন রিপোর্টার যোগ করুন
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    reporters.map((reporter) => (
                      <tr key={reporter._id} className="hover:bg-slate-50/70 transition-colors group">
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={selectedReporters.includes(reporter._id)}
                            onChange={() => toggleSelect(reporter._id)}
                            className="rounded border-slate-300 text-[#eb1c24]"
                          />
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            {reporter.avatar ? (
                              <img src={reporter.avatar} alt={reporter.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center shrink-0">
                                {reporter.name?.[0]?.toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-extrabold text-slate-900 text-xs leading-tight group-hover:text-[#eb1c24] transition-colors">{reporter.name}</h4>
                                {reporter.designation && (
                                  <span className="bg-purple-100 text-purple-700 text-[9px] font-black px-1.5 py-0.5 rounded hidden sm:inline">{reporter.designation}</span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 block">{reporter.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-[11px] text-slate-600">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-slate-400 shrink-0" />
                            <span className="truncate max-w-[130px]">{reporter.location || '—'}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          {reporter.specialization ? (
                            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${SPEC_COLORS[reporter.specialization] || SPEC_COLORS.National}`}>
                              {reporter.specialization}
                            </span>
                          ) : <span className="text-slate-400">—</span>}
                        </td>

                        <td className="py-3.5 px-3">
                          <select
                            value={reporter.reporterStatus || 'Active'}
                            onChange={(e) => handleStatusChange(reporter._id, e.target.value)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider border outline-none cursor-pointer ${
                              reporter.reporterStatus === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : reporter.reporterStatus === 'On Assignment'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            <option value="Active">Active</option>
                            <option value="On Assignment">On Assignment</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                          {reporter.createdAt ? new Date(reporter.createdAt).toLocaleDateString('en-BD', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => navigate(`/reporters/create?edit=${reporter._id}`)}
                              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Edit Reporter"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(reporter._id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Reporter"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
              <span>
                Showing {reporters.length} of {meta.total} reporters
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                  .filter((p) => Math.abs(p - page) <= 2)
                  .map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                        p === page
                          ? 'bg-[#eb1c24] text-white shadow-2xs'
                          : 'border border-slate-200 bg-white hover:bg-slate-100 cursor-pointer'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                <button
                  onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                  disabled={page >= meta.totalPages}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Side Panels */}
        <div className="lg:col-span-4 space-y-6">

          {/* Overview Donut */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">Reporter Overview</h3>
            {statsLoading ? (
              <div className="flex items-center justify-center py-10"><Loader2 size={24} className="animate-spin text-slate-300" /></div>
            ) : (
              <>
                <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
                  {(() => {
                    const total = stats?.total || 1;
                    const activeR = stats?.active || 0;
                    const assignmentR = stats?.onAssignment || 0;
                    const inactiveR = stats?.inactive || 0;
                    const circumference = 2 * Math.PI * 38; // r=38
                    const activePct = (activeR / total) * circumference;
                    const assignPct = (assignmentR / total) * circumference;
                    const inactivePct = (inactiveR / total) * circumference;
                    return (
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#22c55e" strokeWidth="18"
                          strokeDasharray={`${activePct} ${circumference}`} strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="18"
                          strokeDasharray={`${assignPct} ${circumference}`} strokeDashoffset={`-${activePct}`} />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#94a3b8" strokeWidth="18"
                          strokeDasharray={`${inactivePct} ${circumference}`} strokeDashoffset={`-${activePct + assignPct}`} />
                      </svg>
                    );
                  })()}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-black text-slate-900 leading-tight">{stats?.total || 0}</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                  {[
                    { label: 'Active', color: 'bg-emerald-500', count: stats?.active, pct: stats?.total ? Math.round((stats.active / stats.total) * 100) : 0 },
                    { label: 'On Assignment', color: 'bg-amber-500', count: stats?.onAssignment, pct: stats?.total ? Math.round((stats.onAssignment / stats.total) * 100) : 0 },
                    { label: 'Inactive', color: 'bg-slate-400', count: stats?.inactive, pct: stats?.total ? Math.round((stats.inactive / stats.total) * 100) : 0 },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${row.color}`} />
                        <span>{row.label}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">
                        {row.count ?? 0} <span className="text-slate-400 font-normal text-[10px]">({row.pct}%)</span>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Top Locations */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <MapPin size={16} className="text-purple-600" /> Top Locations
              </h3>
            </div>
            {statsLoading ? (
              <div className="py-6 flex items-center justify-center"><Loader2 size={20} className="animate-spin text-slate-300" /></div>
            ) : (
              <div className="space-y-2 text-xs font-semibold text-slate-700">
                {(stats?.locationBreakdown || []).length === 0
                  ? <p className="text-slate-400 text-center py-4 italic">কোনো ডেটা নেই</p>
                  : stats.locationBreakdown.map((loc, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                      <span className="font-bold text-slate-800">{loc.name?.trim() || 'Unknown'}</span>
                      <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{loc.count}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">Quick Actions</h3>
            <div className="space-y-2 text-xs font-bold text-slate-700">
              <Link
                to="/reporters/create"
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer block"
              >
                <div className="flex items-center gap-2">
                  <UserPlus size={15} className="text-purple-600" />
                  <span>Add New Reporter</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </Link>
              <button
                onClick={() => showToast('পারফরম্যান্স রিপোর্ট জেনারেট করা হচ্ছে...')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BarChart2 size={15} className="text-purple-600" />
                  <span>View Performance Report</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
              <button
                onClick={() => showToast('ক্যালেন্ডার প্যানেল শীঘ্রই আসছে!')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-purple-600" />
                  <span>Reporter Attendance</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
