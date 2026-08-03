import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';
import {
  MessageSquare,
  Sparkles,
  Download,
  Filter,
  Sliders,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Trash2,
  Search,
  Check,
  Eye,
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Shield,
  ThumbsUp,
  AlertTriangle,
  Copy,
  Zap,
} from 'lucide-react';

export default function CommentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComments, setSelectedComments] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/public/all-comments`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setComments(
            data.data.map((c) => ({
              id: c._id,
              comment: c.comment,
              author: c.name,
              email: c.email || 'N/A',
              postTitle: c.articleSlug || 'Article',
              status: c.status === 'approved' ? 'Approved' : c.status === 'pending' ? 'Pending' : 'Spam',
              date: new Date(c.createdAt).toLocaleDateString(),
              time: new Date(c.createdAt).toLocaleTimeString(),
            }))
          );
        }
      })
      .catch((err) => console.error('Fetch comments error:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedComments(comments.map((c) => c.id));
    } else {
      setSelectedComments([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter((i) => i !== id));
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  const handleApprove = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'Approved' } : c))
    );
    showToast('মন্তব্যটি অনুমোদন (Approved) করা হয়েছে!');
  };

  const handleSpam = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'Spam' } : c))
    );
    showToast('মন্তব্যটি স্প্যাম চিহ্নিত করা হয়েছে!');
  };

  const handleApproveAllPending = () => {
    setComments(
      comments.map((c) => (c.status === 'Pending' ? { ...c, status: 'Approved' } : c))
    );
    showToast('সকল অপেক্ষমাণ মন্তব্য অনুমোদন করা হয়েছে!');
  };

  const filteredComments = comments.filter((c) => {
    const matchesSearch =
      c.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.postTitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && c.status === 'Pending';
    if (activeTab === 'approved') return matchesSearch && c.status === 'Approved';
    if (activeTab === 'spam') return matchesSearch && c.status === 'Spam';
    if (activeTab === 'trash') return matchesSearch && c.status === 'Trash';
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

      {/* 1. Header Title & Top Action Buttons Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Comments</h1>
            <span className="bg-purple-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full shadow-2xs">
              24
            </span>
            <span className="bg-purple-100 text-purple-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={11} /> AI Powered
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Manage and moderate comments across your website.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => showToast('মন্তব্য তালিকা এক্সপোর্ট করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export</span>
          </button>

          <select className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl outline-none shadow-2xs cursor-pointer">
            <option>Bulk Actions</option>
            <option>Approve Selected</option>
            <option>Mark as Spam</option>
            <option>Move to Trash</option>
          </select>

          <button
            type="button"
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Filter size={14} className="text-slate-500" />
            <span>Filter</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Comment Settings panel opened!')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Sliders size={15} />
            <span>Comment Settings</span>
          </button>
        </div>
      </div>

      {/* 2. Top 5 Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Comments */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Total Comments</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">2,458</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">All time</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <MessageSquare size={18} />
          </div>
        </div>

        {/* Card 2: Pending */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Pending</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">24</h3>
            <span className="text-[9px] font-semibold text-amber-600 mt-0.5 block font-bold">Needs review</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Clock size={18} />
          </div>
        </div>

        {/* Card 3: Approved */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Approved</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">2,156</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">87.7% of total</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <CheckCircle2 size={18} />
          </div>
        </div>

        {/* Card 4: Spam */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Spam</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">156</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">6.3% of total</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <ShieldAlert size={18} />
          </div>
        </div>

        {/* Card 5: Trash */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Trash</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">122</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">5% of total</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Trash2 size={18} />
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
        {/* Tabs Row */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All', count: '2,458' },
            { id: 'pending', label: 'Pending', count: '24' },
            { id: 'approved', label: 'Approved', count: '2,156' },
            { id: 'spam', label: 'Spam', count: '156' },
            { id: 'trash', label: 'Trash', count: '122' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-purple-200 text-purple-800 font-black' : 'bg-slate-100 text-slate-500'}`}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search comments..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all font-medium"
            />
          </div>

          <select className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer">
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>

      {/* 4. Main Grid Layout (Comments Table 9 Cols + Overview Sidebar 3 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Side: Comments Table (~75% - lg:col-span-9) */}
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
                        checked={selectedComments.length === comments.length && comments.length > 0}
                        className="rounded border-slate-300 text-[#eb1c24]"
                      />
                    </th>
                    <th className="py-3 px-3">Comment</th>
                    <th className="py-3 px-3">Commenter</th>
                    <th className="py-3 px-3">On</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Submitted</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredComments.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedComments.includes(c.id)}
                          onChange={() => handleToggleSelect(c.id)}
                          className="rounded border-slate-300 text-[#eb1c24]"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-start gap-2.5 max-w-[260px]">
                          {c.avatar ? (
                            <img src={c.avatar} alt={c.author} className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200 mt-0.5" />
                          ) : (
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${c.initialsBg}`}>
                              {c.initials}
                            </div>
                          )}
                          <div className="space-y-0.5">
                            <p className="font-semibold text-slate-800 text-xs leading-snug line-clamp-2 font-bangla">
                              {c.comment}
                            </p>
                            <span className="text-[10px] text-purple-600 font-bold hover:underline cursor-pointer block">
                              {c.lang}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="space-y-0.5 min-w-[130px]">
                          <h5 className="font-extrabold text-slate-900 text-xs leading-tight">{c.author}</h5>
                          <span className="text-[10px] text-slate-400 font-normal block truncate max-w-[140px]">{c.email}</span>
                          <span className="text-[9px] font-mono text-slate-400 font-semibold block">{c.ip}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2 max-w-[180px]">
                          <img src={c.postThumb} alt={c.postTitle} className="w-8 h-6 rounded-md object-cover border border-slate-200 shrink-0" />
                          <span className="font-bold text-slate-800 text-[11px] leading-tight line-clamp-2 font-bangla hover:text-purple-700 cursor-pointer">
                            {c.postTitle}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            c.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : c.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : c.status === 'Spam'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                        <div>{c.date}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{c.time}</div>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {c.status === 'Pending' ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApprove(c.id)}
                                className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer border border-emerald-200"
                                title="Approve Comment"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSpam(c.id)}
                                className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer border border-rose-200"
                                title="Mark Spam"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => showToast(`View comment details for "${c.author}"`)}
                                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                title="View Comment"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => showToast(`Edit comment for "${c.author}"`)}
                                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                title="Edit Comment"
                              >
                                <Pencil size={14} />
                              </button>
                            </>
                          )}
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
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
              <span>Showing 1 to {filteredComments.length} of 2,458 comments</span>

              <div className="flex items-center gap-1.5">
                <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <ChevronLeft size={16} />
                </button>
                <button type="button" className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center shadow-2xs">
                  1
                </button>
                <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  2
                </button>
                <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  3
                </button>
                <span className="px-1 text-slate-400 font-bold">...</span>
                <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  246
                </button>
                <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
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

        {/* Right Side: Comments Overview Donut, Top Commented Posts & AI Moderation (~25% - lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">

          {/* 1. Comments Overview Donut Chart Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Comments Overview</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 px-2 py-1 outline-none cursor-pointer">
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            {/* Donut SVG Chart */}
            <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#059669" strokeWidth="16" strokeDasharray="165 238" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray="13 238" strokeDashoffset="-165" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#e11d48" strokeWidth="16" strokeDasharray="29 238" strokeDashoffset="-178" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#64748b" strokeWidth="16" strokeDasharray="30 238" strokeDashoffset="-207" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-black text-slate-900 leading-none">456</span>
                <span className="text-[9px] font-bold text-slate-400 mt-0.5">Total</span>
              </div>
            </div>

            {/* Legend List */}
            <div className="space-y-1.5 text-[11px] pt-1 border-t border-slate-100 font-semibold text-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>Approved</span>
                </div>
                <span className="font-extrabold text-slate-500">318 (69.7%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Pending</span>
                </div>
                <span className="font-extrabold text-slate-500">24 (5.3%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  <span>Spam</span>
                </div>
                <span className="font-extrabold text-slate-500">56 (12.3%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                  <span>Trash</span>
                </div>
                <span className="font-extrabold text-slate-500">58 (12.7%)</span>
              </div>
            </div>
          </div>

          {/* 2. Top Commented Posts Ranking Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Top Commented Posts</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 px-2 py-1 outline-none cursor-pointer">
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { title: 'ঢাকায় বিএনপির সমাবেশে নেতাকর্মীদের ঢল', count: 89, pct: '90%', thumb: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=120&q=80' },
                { title: 'রিজার্ভ সংকট কাটাতে নতুন পদক্ষেপ সরকারের', count: 67, pct: '70%', thumb: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=120&q=80' },
                { title: 'বাংলাদেশের জয়, সিরিজ নিজেদের করে নিল টাইগাররা', count: 55, pct: '55%', thumb: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=120&q=80' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={item.thumb} alt="" className="w-7 h-6 rounded-md object-cover shrink-0 border border-slate-200" />
                      <h5 className="font-bold text-slate-900 text-xs leading-tight font-bangla line-clamp-1">{item.title}</h5>
                    </div>
                    <span className="font-extrabold text-slate-900 font-mono text-xs">{item.count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: item.pct }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => showToast('সকল পোস্টের মন্তব্য তালিকা খুলুন!')}
              className="w-full py-1.5 text-purple-700 text-xs font-extrabold hover:underline flex items-center justify-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
            >
              <span>View all posts</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 3. AI Moderation Tools Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5">
              <Sparkles size={15} className="text-purple-600" />
              <h3 className="font-extrabold text-xs text-slate-900">AI Moderation Tools</h3>
              <span className="text-[9px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded">BETA</span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={15} className="text-purple-600" />
                  <span>Spam Detection</span>
                </div>
                <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-md">56 detected</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={15} className="text-amber-500" />
                  <span>Offensive Language</span>
                </div>
                <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">3 detected</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <Copy size={15} className="text-blue-600" />
                  <span>Duplicate Comments</span>
                </div>
                <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">12 detected</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-purple-600" />
                  <span>AI Suggestion</span>
                </div>
                <span className="text-[10px] font-black bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md">24 suggestions</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('AI দ্বারা সম্পূর্ণ মন্তব্য স্ক্যান ও মডারেশন শুরু করা হলো!')}
              className="w-full py-2 text-purple-700 text-xs font-extrabold hover:underline flex items-center justify-center gap-1 cursor-pointer pt-1"
            >
              <span>Run AI Analysis</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 4. Quick Actions Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 text-xs font-bold text-slate-700">
            <h3 className="font-extrabold text-xs text-slate-900 mb-1">Quick Actions</h3>

            <button
              type="button"
              onClick={handleApproveAllPending}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2 text-emerald-600 font-bold">
                <CheckCircle2 size={16} />
                <span>Approve All Pending</span>
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => showToast('সকল অপেক্ষমাণ মন্তব্য স্প্যাম করা হয়েছে!')}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2 text-rose-600 font-bold">
                <ShieldAlert size={16} />
                <span>Mark All as Spam</span>
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => showToast('সকল ট্র্যাশ সম্পন্ন করা হয়েছে!')}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2 text-slate-600 font-bold">
                <Trash2 size={16} />
                <span>Move All to Trash</span>
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
