import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import {
  Download,
  Plus,
  Calendar,
  Filter,
  Search,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Clock,
  Trash2,
  TrendingUp,
} from 'lucide-react';

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [postsList, setPostsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination & Filter states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [kpiCounts, setKpiCounts] = useState({ total: 0, published: 0, draft: 0, scheduled: 0, trash: 0 });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const fetchArticles = async (page = currentPage, limit = itemsPerPage, tab = activeTab, search = searchQuery) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      if (tab && tab !== 'all') params.append('status', tab);
      if (search && search.trim()) params.append('search', search.trim());

      const { data } = await api.get(`/articles?${params.toString()}`);
      const formatted = (data.data || []).map((art) => {
        const bnData = art.translations?.bn || {};
        const hiData = art.translations?.hi || {};
        const enData = art.translations?.en || {};
        const statusVal = art.status || bnData.status || hiData.status || enData.status || 'published';
        const categoryVal = art.categoryName || art.category?.translations?.bn?.name || art.category?.name || 'সাধারণ';
        const reporterVal = art.authorName || art.author?.name || 'Abdul Haque';
        const reporterEmailVal = art.author?.email || 'news@nirbhikbangla.com';
        const reporterAvatarVal = art.authorAvatar || art.author?.avatar || 'https://res.cloudinary.com/tw5058et/image/upload/v1786858841/nirbhik_bangla/avatars/gtchkpcote1qsauuc6ou.webp';
        const pubDate = art.publishedAt || art.createdAt || Date.now();

        return {
          id: art._id,
          title: bnData.title || hiData.title || enData.title || art.title || 'Untitled Article',
          slug: bnData.slug || hiData.slug || enData.slug || art.slug || '',
          category: categoryVal,
          catBg: 'bg-purple-50 text-purple-700 border-purple-200',
          reporter: reporterVal,
          reporterEmail: reporterEmailVal,
          reporterAvatar: reporterAvatarVal,
          image: art.featuredImageUrl || art.featuredImage?.url || art.featuredImage || 'https://via.placeholder.com/120',
          status: statusVal.toUpperCase(),
          views: art.viewsCount || art.views || 0,
          date: new Date(pubDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: new Date(pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      });

      setPostsList(formatted);
      const metaData = data.meta || data.pagination;
      if (metaData) {
        setTotalPostsCount(metaData.total || 0);
        setTotalPages(metaData.pages || Math.ceil((metaData.total || 0) / itemsPerPage) || 1);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      showToast('পোস্ট লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, itemsPerPage, activeTab, searchQuery);
  }, [currentPage, itemsPerPage, activeTab]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchArticles(1, itemsPerPage, activeTab, searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Action Handlers
  const handleDeletePost = async (id) => {
    if (!window.confirm('আপনি কি এই পোস্টটি মুছে ফেলতে চান?')) return;
    try {
      await api.delete(`/articles/${id}`);
      showToast('পোস্ট সফলভাবে মুছে ফেলা হয়েছে!');
      fetchArticles(currentPage, itemsPerPage, activeTab, searchQuery);
    } catch (error) {
      showToast('পোস্ট মুছতে ব্যর্থ হয়েছে');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return;
    if (!window.confirm(`আপনি কি নির্বাচিত ${selectedPosts.length} টি পোস্ট মুছে ফেলতে চান?`)) return;
    try {
      await Promise.all(selectedPosts.map((id) => api.delete(`/articles/${id}`).catch(() => null)));
      showToast(`${selectedPosts.length} টি পোস্ট সফলভাবে মুছে ফেলা হয়েছে!`);
      setSelectedPosts([]);
      fetchArticles(currentPage, itemsPerPage, activeTab, searchQuery);
    } catch (err) {
      showToast('একাধিক পোস্ট মুছতে ব্যর্থ হয়েছে');
    }
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPosts(postsList.map((p) => p.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const toggleSelect = (id) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter((i) => i !== id));
    } else {
      setSelectedPosts([...selectedPosts, id]);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (postsList.length === 0) return showToast('কোনো পোস্ট ডাটা নেই!');
    const headers = ['ID', 'Title', 'Category', 'Reporter', 'Status', 'Views', 'Date'];
    const rows = postsList.map((p) => [
      `"${p.id}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.reporter}"`,
      `"${p.status}"`,
      p.views,
      `"${p.date} ${p.time}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nirbhik_bangla_posts_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV ফাইল সফলভাবে ডাউনলোড করা হয়েছে!');
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = postsList; // Server already paginates!
  const filteredPosts = postsList;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage <= 4) {
        end = 5;
      } else if (currentPage >= totalPages - 3) {
        start = totalPages - 4;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }
    return pages;
  };

  const totalCount = totalPostsCount;
  const publishedCount = totalPostsCount;
  const draftCount = postsList.filter((p) => p.status === 'DRAFT').length;
  const scheduledCount = postsList.filter((p) => p.status === 'SCHEDULED').length;
  const trashCount = postsList.filter((p) => p.status === 'TRASH' || p.status === 'ARCHIVED').length;

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-10">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Bulk Action Bar */}
      {selectedPosts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-800 animate-in fade-in slide-in-from-bottom-3">
          <span>{selectedPosts.length} টি পোস্ট নির্বাচিত হয়েছে</span>
          <div className="h-4 w-px bg-slate-700" />
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Delete Selected</span>
          </button>
          <button
            onClick={() => setSelectedPosts([])}
            className="text-slate-400 hover:text-white px-2 py-1 transition-colors cursor-pointer"
          >
            Deselect All
          </button>
        </div>
      )}

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
            Posts Management
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Manage and organize all your news articles and posts from one central hub.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer font-outfit"
          >
            <Download size={15} className="text-slate-500" />
            <span>Export CSV</span>
          </button>

          <Link
            to="/posts/add"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer font-outfit uppercase tracking-wider"
          >
            <Plus size={16} />
            <span>PUBLISH NEW POST</span>
          </Link>
        </div>
      </div>

      {/* 2. Dynamic Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Posts</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">{totalCount}</h3>
            <span className="text-[9.5px] font-bold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <TrendingUp size={10} /> Live Stats
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <FileText size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Published</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">{publishedCount}</h3>
            <span className="text-[9.5px] font-bold text-slate-400 mt-0.5">
              {totalCount > 0 ? ((publishedCount / totalCount) * 100).toFixed(1) : 0}% of total
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Drafts</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">{draftCount}</h3>
            <span className="text-[9.5px] font-bold text-amber-600 mt-0.5">In progress</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Clock size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Scheduled</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">{scheduledCount}</h3>
            <span className="text-[9.5px] font-bold text-blue-600 mt-0.5">Upcoming release</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Calendar size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Trash</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">{trashCount}</h3>
            <span className="text-[9.5px] font-bold text-slate-400 mt-0.5">Archived items</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Trash2 size={18} />
          </div>
        </div>
      </div>

      {/* 3. Filter Controls & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Posts', count: totalCount },
              { id: 'published', label: 'Published', count: publishedCount },
              { id: 'draft', label: 'Draft', count: draftCount },
              { id: 'scheduled', label: 'Scheduled', count: scheduledCount },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
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

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search articles, reporters..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] font-medium"
              />
            </div>

            <button className="bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
              <Filter size={14} className="text-slate-500" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100 font-outfit">
              <tr>
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selectedPosts.length === paginatedPosts.length && paginatedPosts.length > 0}
                    className="rounded border-slate-300 text-[#eb1c24]"
                  />
                </th>
                <th className="py-3 px-3">Article Details</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Reporter</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Views</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400 font-bold">
                    পোস্ট লোড করা হচ্ছে...
                  </td>
                </tr>
              ) : paginatedPosts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400 font-bold">
                    কোনো পোস্ট পাওয়া যায়নি!
                  </td>
                </tr>
              ) : (
                paginatedPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => toggleSelect(post.id)}
                        className="rounded border-slate-300 text-[#eb1c24]"
                      />
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3 min-w-[280px]">
                        <img src={post.image} alt="" className="w-12 h-10 rounded-lg object-cover border border-slate-200 shrink-0 shadow-2xs" />
                        <h4 className="font-bangla font-extrabold text-slate-900 text-[14px] leading-snug line-clamp-2 group-hover:text-[#eb1c24] transition-colors">
                          {post.title}
                        </h4>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bangla font-extrabold border ${post.catBg}`}>
                        {post.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5 min-w-[150px]">
                        <img src={post.reporterAvatar} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 shadow-2xs" />
                        <div className="min-w-0">
                          <h5 className="font-bangla font-bold text-slate-900 text-xs leading-tight truncate">{post.reporter}</h5>
                          <span className="text-[10px] text-slate-400 font-medium block truncate max-w-[150px]">{post.reporterEmail}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider ${
                          post.status === 'PUBLISHED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : post.status === 'SCHEDULED'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                      {post.views}
                    </td>

                    <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                      <div>{post.date}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{post.time}</div>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`${(import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')}/bn/news/${post.slug || post.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="View Live Article"
                        >
                          <Eye size={14} />
                        </a>
                        <Link
                          to={`/posts/edit/${post.id}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Post"
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

        {/* Dynamic Table Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
          <span>
            Showing {totalPostsCount > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, totalPostsCount)} of {totalPostsCount.toLocaleString()} posts
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            
            {getPageNumbers().map((pageNum, idx) => (
              pageNum === '...' ? (
                <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold">
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#eb1c24] text-white shadow-2xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {pageNum}
                </button>
              )
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
            className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs outline-none cursor-pointer font-bold"
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </div>
      </div>

    </div>
  );
}
