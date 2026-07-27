import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Upload,
  Download,
  Filter,
  Pencil,
  Eye,
  MoreVertical,
  GripVertical,
  Tag as TagIcon,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  RotateCw,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Globe2,
  TrendingUp,
  Trophy,
  Film,
  Cpu,
  HeartPulse,
  GraduationCap,
  Briefcase,
  MessageSquare,
  X,
  ArrowRight,
  Vote,
  Building,
  Coins,
  Scale,
  Flag,
} from 'lucide-react';

export default function TagsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Tag Form State
  const [newTagName, setNewTagName] = useState('');
  const [newTagSlug, setNewTagSlug] = useState('');
  const [newTagStatus, setNewTagStatus] = useState('Active');
  const [toastMessage, setToastMessage] = useState('');

  // Initial Tags Dataset (Exact match to reference UI image)
  const [tags, setTags] = useState([
    { id: 1, name: 'রাজনীতি', slug: 'rajniti', posts: 342, status: 'Active', created: 'May 21, 2024', icon: Landmark, color: 'bg-purple-600 text-white' },
    { id: 2, name: 'আন্তর্জাতিক', slug: 'antorjatik', posts: 198, status: 'Active', created: 'May 20, 2024', icon: Globe2, color: 'bg-emerald-600 text-white' },
    { id: 3, name: 'অর্থনীতি', slug: 'orthoniti', posts: 156, status: 'Active', created: 'May 19, 2024', icon: TrendingUp, color: 'bg-amber-500 text-white' },
    { id: 4, name: 'খেলা', slug: 'khela', posts: 213, status: 'Active', created: 'May 18, 2024', icon: Trophy, color: 'bg-[#eb1c24] text-white' },
    { id: 5, name: 'বিনোদন', slug: 'binodon', posts: 124, status: 'Active', created: 'May 17, 2024', icon: Film, color: 'bg-blue-600 text-white' },
    { id: 6, name: 'প্রযুক্তি', slug: 'projukti', posts: 89, status: 'Active', created: 'May 16, 2024', icon: Cpu, color: 'bg-cyan-600 text-white' },
    { id: 7, name: 'স্বাস্থ্য', slug: 'shastho', posts: 67, status: 'Active', created: 'May 15, 2024', icon: HeartPulse, color: 'bg-rose-600 text-white' },
    { id: 8, name: 'শিক্ষা', slug: 'shikkha', posts: 78, status: 'Active', created: 'May 14, 2024', icon: GraduationCap, color: 'bg-amber-600 text-white' },
    { id: 9, name: 'ব্যবসা', slug: 'bebosha', posts: 95, status: 'Active', created: 'May 13, 2024', icon: Briefcase, color: 'bg-teal-600 text-white' },
    { id: 10, name: 'অন্যান্য', slug: 'onnonno', posts: 86, status: 'Draft', created: 'May 12, 2024', icon: MessageSquare, color: 'bg-slate-600 text-white' },
  ]);

  // AI Suggested Tags Dataset
  const [aiSuggestions, setAiSuggestions] = useState([
    { id: 101, name: 'নির্বাচন', relevance: 'High Relevance', relColor: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: Vote },
    { id: 102, name: 'লোকসভা', relevance: 'High Relevance', relColor: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: Building },
    { id: 103, name: 'বাজেট', relevance: 'Medium', relColor: 'text-amber-700 bg-amber-50 border-amber-200', icon: Coins },
    { id: 104, name: 'সরকার', relevance: 'Medium', relColor: 'text-amber-700 bg-amber-50 border-amber-200', icon: Scale },
    { id: 105, name: 'আওয়ামী লীগ', relevance: 'Medium', relColor: 'text-amber-700 bg-amber-50 border-amber-200', icon: Flag },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(tags.map((t) => t.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    const newTag = {
      id: Date.now(),
      name: newTagName.trim(),
      slug: newTagSlug.trim() || newTagName.trim().toLowerCase().replace(/\s+/g, '-'),
      posts: 0,
      status: newTagStatus,
      created: 'May 21, 2024',
      icon: TagIcon,
      color: 'bg-purple-600 text-white',
    };

    setTags([newTag, ...tags]);
    setNewTagName('');
    setNewTagSlug('');
    setShowAddModal(false);
    showToast(`নতুন ট্যাগ "${newTag.name}" তৈরি হয়েছে!`);
  };

  const handleAddAiSuggestedTag = (suggestedTag) => {
    const newTag = {
      id: Date.now(),
      name: suggestedTag.name,
      slug: suggestedTag.name.toLowerCase().replace(/\s+/g, '-'),
      posts: 0,
      status: 'Active',
      created: 'May 21, 2024',
      icon: suggestedTag.icon,
      color: 'bg-purple-600 text-white',
    };

    setTags([newTag, ...tags]);
    setAiSuggestions(aiSuggestions.filter((s) => s.id !== suggestedTag.id));
    showToast(`AI ট্যাগ "${suggestedTag.name}" ট্যাগের তালিকায় যুক্ত হয়েছে!`);
  };

  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-800 font-sans relative">

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
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Tags</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Manage and organize tags for your content
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => showToast('Tags CSV Template downloaded!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Upload size={14} className="text-slate-500" />
            <span>Import</span>
          </button>

          <button
            onClick={() => showToast('Tags exported successfully!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export</span>
          </button>

          <Link
            to="/tags/add"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Tag</span>
          </Link>
        </div>
      </div>

      {/* 2. Top 4 KPI Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Tags */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Total Tags</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">156</h3>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">All time</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
            <TagIcon size={20} />
          </div>
        </div>

        {/* Card 2: Active Tags */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Active Tags</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">142</h3>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">Used in content</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* Card 3: Total Posts Tagged */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Total Posts Tagged</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">2,458</h3>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">Across all tags</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <FileText size={20} />
          </div>
        </div>

        {/* Card 4: Unused Tags */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Unused Tags</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">14</h3>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">Not used yet</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Clock size={20} />
          </div>
        </div>
      </div>

      {/* 3. Main Content: Grid Layout (Table 9 Cols + Sidebar 3 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Side: Table & Filters (~75% - lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            
            {/* Filter & Action Header */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select className="bg-white border border-slate-200 rounded-xl text-xs font-semibold px-3 py-2 text-slate-700 outline-none cursor-pointer">
                  <option value="">Bulk Actions</option>
                  <option value="delete">Delete Selected</option>
                  <option value="active">Mark as Active</option>
                  <option value="draft">Mark as Draft</option>
                </select>
                <button
                  onClick={() => selectedItems.length > 0 && showToast(`${selectedItems.length} tags updated!`)}
                  className="bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tags..."
                    className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all font-medium"
                  />
                </div>

                <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
                  <Filter size={14} className="text-slate-500" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Tags Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedItems.length === tags.length && tags.length > 0}
                        className="rounded border-slate-300 text-[#eb1c24]"
                      />
                    </th>
                    <th className="py-3 px-3">Tag Name</th>
                    <th className="py-3 px-3">Slug</th>
                    <th className="py-3 px-3">Posts</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Created</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredTags.map((tag) => {
                    const TagIconComp = tag.icon;
                    return (
                      <tr key={tag.id} className="hover:bg-slate-50/70 transition-colors group">
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <GripVertical size={14} className="text-slate-300 cursor-grab group-hover:text-slate-400" />
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(tag.id)}
                              onChange={() => handleToggleSelect(tag.id)}
                              className="rounded border-slate-300 text-[#eb1c24]"
                            />
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tag.color} shadow-2xs`}>
                              <TagIconComp size={16} />
                            </div>
                            <span className="font-bold text-slate-900 font-bangla text-sm">
                              {tag.name}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-slate-500">
                          {tag.slug}
                        </td>

                        <td className="py-3.5 px-3 font-bold text-purple-600">
                          {tag.posts}
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              tag.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {tag.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-slate-500 font-medium">
                          {tag.created}
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => showToast(`Edit tag "${tag.name}"`)}
                              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Edit Tag"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => showToast(`Viewing tag "${tag.name}"`)}
                              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="View Tag"
                            >
                              <Eye size={14} />
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
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Pagination Footer */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
              <span>Showing 1 to {filteredTags.length} of 156 tags</span>

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

        {/* Right Side: AI Tag Suggestions, Top Performing Tags & Tips (~25% - lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">

          {/* 1. AI Tag Suggestions Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-xs text-slate-900">AI Tag Suggestions</h3>
                <span className="text-[9px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded">AI</span>
              </div>
              <button
                onClick={() => showToast('নতুন AI ট্যাগ সাজেশন পাওয়ার কাজ সফল হয়েছে!')}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCw size={12} /> Refresh
              </button>
            </div>

            <p className="text-[11px] font-semibold text-slate-400">Suggested Tags</p>

            <div className="space-y-2 font-bangla">
              {aiSuggestions.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div key={item.id} className="p-2 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-2 hover:bg-white hover:shadow-2xs transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                        <ItemIcon size={13} />
                      </div>
                      <span className="font-bold text-xs text-slate-800">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${item.relColor}`}>
                        {item.relevance}
                      </span>
                      <button
                        onClick={() => handleAddAiSuggestedTag(item)}
                        className="w-5 h-5 rounded-md bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                        title="Add to Tags"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => showToast('অতিরিক্ত ১০টি AI সাজেশন লোড করা হয়েছে!')}
              className="w-full py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-1"
            >
              <Sparkles size={14} />
              <span>Generate More Suggestions</span>
            </button>
          </div>

          {/* 2. Top Performing Tags Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Top Performing Tags</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 px-2 py-1 outline-none cursor-pointer">
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="space-y-3 text-xs font-bangla pt-1">
              {[
                { name: 'রাজনীতি', pct: '90%', count: '342' },
                { name: 'খেলা', pct: '65%', count: '213' },
                { name: 'আন্তর্জাতিক', pct: '60%', count: '198' },
                { name: 'অর্থনীতি', pct: '48%', count: '156' },
                { name: 'প্রযুক্তি', pct: '28%', count: '89' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>{item.name}</span>
                    <span className="font-mono text-slate-500">{item.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full transition-all duration-500" style={{ width: item.pct }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast('Analytics Deep Dive Page Loaded!')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-purple-700 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer mt-1"
            >
              <span>View All Analytics</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 3. Tips Card */}
          <div className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 text-amber-800 font-extrabold text-xs">
              <Lightbulb size={16} className="text-amber-600" />
              <span>Tips</span>
            </div>
            <ul className="text-[11px] text-amber-900 leading-relaxed font-medium space-y-1 list-disc pl-4">
              <li>Use specific tags to improve content discoverability.</li>
              <li>Avoid too many tags for a single post.</li>
              <li>Keep tag names short and relevant.</li>
              <li>Merge similar tags to avoid duplicates.</li>
            </ul>
            <button className="text-xs font-extrabold text-amber-800 hover:underline flex items-center gap-1 pt-1 cursor-pointer">
              <span>Learn More About Tags</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>

      </div>

      {/* Add New Tag Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900">Add New Tag</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTag} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Tag Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. রাজনীতি, খেলা, ব্রেকিং..."
                  value={newTagName}
                  onChange={(e) => {
                    setNewTagName(e.target.value);
                    setNewTagSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                  }}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bangla outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Slug</label>
                <input
                  type="text"
                  placeholder="e.g. rajniti, khela, breaking..."
                  value={newTagSlug}
                  onChange={(e) => setNewTagSlug(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-mono outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Status</label>
                <select
                  value={newTagStatus}
                  onChange={(e) => setNewTagStatus(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
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
                  Create Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
