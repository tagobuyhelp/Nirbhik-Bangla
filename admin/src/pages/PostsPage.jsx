import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Plus,
  ChevronDown,
  Calendar,
  Filter,
  RefreshCw,
  Search,
  ArrowUpDown,
  Eye,
  Pencil,
  MoreVertical,
  ChevronRight,
} from 'lucide-react';
import { postsKpis, tablePosts } from '../mockData/postsData';

export default function PostsPage() {
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [dateRange] = useState('May 21, 2024 - Jun 20, 2024');

  const toggleSelectPost = (id) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter((item) => item !== id));
    } else {
      setSelectedPosts([...selectedPosts, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === tablePosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(tablePosts.map((p) => p.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Posts
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Manage and organize all your posts from one place.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer">
            <Download size={15} className="text-slate-600" />
            <span>Export</span>
          </button>

          <div className="relative flex items-center">
            <Link
              to="/posts/add"
              className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Add New Post</span>
              <ChevronDown size={14} className="ml-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards (5 Cards Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {postsKpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${kpi.bgIcon}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 leading-none">
                    {kpi.title}
                  </p>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 mt-1 tracking-tight">
                    {kpi.value}
                  </h3>
                  <p className="text-[10px] font-bold mt-1 flex items-center gap-1">
                    <span className={kpi.isUp ? 'text-emerald-600' : 'text-rose-600'}>
                      {kpi.isUp ? `↑ ${kpi.trend}` : `↓ ${kpi.trend}`}
                    </span>
                    <span className="text-slate-400 font-normal">vs last 30 days</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Filter Controls Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Dropdowns group */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer hover:border-slate-300">
            <option>All Status</option>
            <option>Published</option>
            <option>Scheduled</option>
            <option>Draft</option>
          </select>

          <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer hover:border-slate-300">
            <option>All Categories</option>
            <option>রাজনীতি</option>
            <option>খেলা</option>
            <option>বিজ্ঞান ও প্রযুক্তি</option>
            <option>বিনোদন</option>
            <option>দেশ</option>
            <option>অর্থনীতি</option>
          </select>

          <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer hover:border-slate-300">
            <option>All Authors</option>
            <option>Riya Saha</option>
            <option>Arindam Das</option>
            <option>Sports Desk</option>
            <option>Tech Desk</option>
          </select>

          <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer hover:border-slate-300">
            <option>All Tags</option>
            <option>Breaking</option>
            <option>Election</option>
            <option>Cricket</option>
          </select>

          <button className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-100 transition-colors cursor-pointer">
            <span>{dateRange}</span>
            <Calendar size={14} className="text-slate-500" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer">
            <Filter size={14} />
            <span>Filters</span>
          </button>

          <button className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer">
            <RefreshCw size={13} />
            <span>Reset</span>
          </button>

          <button className="bg-rose-50/70 border border-rose-200 text-[#eb1c24] hover:bg-rose-100 text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer">
            <Search size={14} />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* 4. Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-bold select-none">
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedPosts.length === tablePosts.length}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-[#eb1c24] focus:ring-red-200 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                    <span>Title</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                    <span>Author</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                    <span>Category</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                    <span>Status</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                    <span>Views</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                    <span>Date</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {tablePosts.map((post) => {
                const isChecked = selectedPosts.includes(post.id);
                return (
                  <tr
                    key={post.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isChecked ? 'bg-red-50/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelectPost(post.id)}
                        className="rounded border-slate-300 text-[#eb1c24] focus:ring-red-200 cursor-pointer"
                      />
                    </td>

                    <td className="py-3.5 px-3 max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.image}
                          alt=""
                          className="w-14 h-11 rounded-lg object-cover bg-slate-100 shrink-0 shadow-2xs border border-slate-200/50"
                        />
                        <h4 className="font-bold text-slate-900 leading-snug line-clamp-2 hover:text-[#eb1c24] transition-colors cursor-pointer">
                          {post.title}
                        </h4>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {post.authorType === 'img' ? (
                          <img
                            src={post.authorAvatar}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${post.authorAvatarBg}`}>
                            {post.authorInitials}
                          </div>
                        )}
                        <span className="font-bold text-slate-700">{post.author}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${post.categoryBg}`}>
                        {post.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${post.statusBg}`}>
                        {post.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap font-bold text-slate-600">
                      {post.views}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="text-[11px] font-semibold text-slate-600 leading-tight">
                        <div>{post.date}</div>
                        <div className="text-[10px] text-slate-400">{post.time}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 text-slate-400">
                        <button className="p-1.5 hover:text-[#eb1c24] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                          <Eye size={15} />
                        </button>
                        <button className="p-1.5 hover:text-[#eb1c24] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                          <Pencil size={15} />
                        </button>
                        <button className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination Bar */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 bg-slate-50/40">
          <div>
            Showing <span className="font-extrabold text-slate-800">1</span> to{' '}
            <span className="font-extrabold text-slate-800">10</span> of{' '}
            <span className="font-extrabold text-slate-800">1,248</span> posts
          </div>

          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-lg bg-[#eb1c24] text-white font-black flex items-center justify-center shadow-xs">
              1
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center transition-colors">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center transition-colors">
              125
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center transition-colors ml-1">
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span>Show</span>
            <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>per page</span>
          </div>
        </div>
      </div>
    </div>
  );
}
