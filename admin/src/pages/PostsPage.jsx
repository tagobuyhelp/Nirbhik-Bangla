import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import {
  Download,
  Plus,
  ChevronDown,
  Calendar,
  Filter,
  Search,
  ArrowUpDown,
  Eye,
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Clock,
  Trash2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const [postsList, setPostsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const { data } = await api.get('/articles');
      const formatted = (data.data || []).map((art) => ({
        id: art._id,
        title: art.translations?.bn?.title || art.translations?.en?.title || 'Untitled Article',
        category: art.category?.translations?.bn?.name || 'Uncategorized',
        catBg: 'bg-rose-50 text-rose-700 border-rose-200',
        reporter: art.author?.name || 'Admin',
        reporterEmail: art.author?.email || '',
        reporterAvatar: art.author?.avatar || 'https://ui-avatars.com/api/?name=' + (art.author?.name || 'Admin'),
        image: art.featuredImage?.url || 'https://via.placeholder.com/120',
        status: (art.status || 'DRAFT').toUpperCase(),
        views: art.viewsCount || 0,
        date: new Date(art.createdAt).toLocaleDateString(),
        time: new Date(art.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
      setPostsList(formatted);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  const handleDeletePost = async (id) => {
    if (!window.confirm('আপনি কি এই পোস্টটি মুছে ফেলতে চান?')) return;
    try {
      await api.delete(`/articles/${id}`);
      showToast('পোস্ট সফলভাবে মুছে ফেলা হয়েছে!');
      fetchArticles();
    } catch (error) {
      showToast('পোস্ট মুছতে ব্যর্থ হয়েছে');
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

  const filteredPosts = postsList.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'published') return matchesSearch && p.status === 'PUBLISHED';
    if (activeTab === 'draft') return matchesSearch && p.status === 'DRAFT';
    if (activeTab === 'scheduled') return matchesSearch && p.status === 'SCHEDULED';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-10">

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
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
            Posts Management
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Manage and organize all your news articles and posts from one central hub.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => showToast('সকল পোস্ট ডাটা এক্সপোর্ট করা হয়েছে!')}
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

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Posts</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">1,248</h3>
            <span className="text-[9.5px] font-bold text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <TrendingUp size={10} /> ↑ 12% this month
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <FileText size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Published</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">1,120</h3>
            <span className="text-[9.5px] font-bold text-slate-400 mt-0.5">89.7% of total</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Drafts</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">84</h3>
            <span className="text-[9.5px] font-bold text-amber-600 mt-0.5">In progress</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Clock size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Scheduled</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">32</h3>
            <span className="text-[9.5px] font-bold text-blue-600 mt-0.5">Upcoming release</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Calendar size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Trash</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">12</h3>
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
              { id: 'all', label: 'All Posts', count: 1248 },
              { id: 'published', label: 'Published', count: 1120 },
              { id: 'draft', label: 'Draft', count: 84 },
              { id: 'scheduled', label: 'Scheduled', count: 32 },
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

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    checked={selectedPosts.length === postsList.length && postsList.length > 0}
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
              {filteredPosts.map((post) => (
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
                    <div className="flex items-center gap-3 min-w-[260px]">
                      <img src={post.image} alt="" className="w-12 h-10 rounded-lg object-cover border border-slate-200 shrink-0 shadow-2xs" />
                      <h4 className="font-bangla font-extrabold text-slate-900 text-xs leading-snug line-clamp-2 group-hover:text-[#eb1c24] transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bangla font-extrabold border ${post.catBg}`}>
                      {post.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <img src={post.reporterAvatar} alt="" className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0" />
                      <div>
                        <h5 className="font-bangla font-bold text-slate-900 text-xs leading-tight">{post.reporter}</h5>
                        <span className="text-[10px] text-slate-400 font-normal block">{post.reporterEmail}</span>
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
                      <button
                        onClick={() => showToast(`পোস্টটি ওয়েবসাইট প্রিভিউ করা হলো!`)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="View Preview"
                      >
                        <Eye size={14} />
                      </button>
                      <Link
                        to={`/posts/edit/${post.id}`}
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Article"
                      >
                        <Pencil size={14} />
                      </Link>
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
          <span>Showing 1 to {filteredPosts.length} of 1,248 posts</span>

          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#eb1c24] text-white font-bold flex items-center justify-center shadow-2xs">
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
              125
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
  );
}
