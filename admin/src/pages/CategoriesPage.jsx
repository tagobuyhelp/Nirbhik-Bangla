import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
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
  Landmark,
  Globe2,
  TrendingUp,
  Trophy,
  Film,
  Cpu,
  HeartPulse,
  GraduationCap,
  Building2,
  MessageSquare,
  Sparkles,
  ArrowUpDown,
  Merge,
  Shield,
  Lightbulb,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  FolderTree,
} from 'lucide-react';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatStatus, setNewCatStatus] = useState('Published');

  // Edit Category Form State
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editStatus, setEditStatus] = useState('Published');

  const [bulkAction, setBulkAction] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [categories, setCategories] = useState([]);
  const [uncategorizedCount, setUncategorizedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const [catRes, artRes] = await Promise.all([
        api.get('/categories'),
        api.get('/articles')
      ]);

      const formatted = (catRes.data.data || []).map((cat, idx) => ({
        id: cat._id,
        name: cat.translations?.bn?.name || cat.translations?.en?.name || (typeof cat.name === 'object' ? cat.name?.bn || cat.name?.en : cat.name) || 'Category',
        slug: cat.slug,
        posts: cat.articleCount || 0,
        status: cat.isActive ? 'Published' : 'Draft',
        order: cat.order || idx + 1,
        icon: FolderTree,
        color: cat.color || 'bg-indigo-600 text-white',
      }));
      setCategories(formatted);

      const uncatArticles = (artRes.data.data || []).filter(a => !a.category);
      setUncategorizedCount(uncatArticles.length);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(categories.map((c) => c.id));
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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      const generatedSlug = newCatSlug.trim() || newCatName.trim().toLowerCase().replace(/\s+/g, '-');
      await api.post('/categories', {
        slug: generatedSlug,
        translations: {
          bn: { name: newCatName.trim() }
        },
        isActive: newCatStatus === 'Published'
      });

      showToast('ক্যাটাগরি সফলভাবে যোগ করা হয়েছে!');
      setNewCatName('');
      setNewCatSlug('');
      setShowAddModal(false);
      fetchCategories();
    } catch (error) {
      showToast(error.response?.data?.message || 'ক্যাটাগরি যোগ করতে ব্যর্থ হয়েছে');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('আপনি কি এই ক্যাটাগরিটি মুছে ফেলতে চান?')) return;
    try {
      await api.delete(`/categories/${id}`);
      showToast('ক্যাটাগরি মুছে ফেলা হয়েছে!');
      setOpenDropdownId(null);
      fetchCategories();
    } catch (error) {
      showToast('ক্যাটাগরি মুছতে ব্যর্থ হয়েছে');
    }
  };

  const handleToggleStatus = async (cat) => {
    try {
      const newActive = cat.status !== 'Published';
      await api.put(`/categories/${cat.id}`, { isActive: newActive });
      showToast(`Category "${cat.name}" updated to ${newActive ? 'Published' : 'Draft'}`);
      setOpenDropdownId(null);
      fetchCategories();
    } catch (error) {
      showToast('Could not update status');
    }
  };

  const navigate = useNavigate();

  const handleOpenEditModal = (cat) => {
    navigate(`/categories/edit/${cat.id}`);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editName.trim() || !editingCategory) return;
    try {
      const slugValue = editSlug.trim() || editName.trim().toLowerCase().replace(/\s+/g, '-');
      await api.put(`/categories/${editingCategory.id}`, {
        slug: slugValue,
        translations: {
          bn: { name: editName.trim() }
        },
        isActive: editStatus === 'Published'
      });

      showToast(`Category "${editName}" updated successfully!`);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      showToast(error.response?.data?.message || 'Could not update category');
    }
  };

  const handleApplyBulkActions = async () => {
    if (selectedItems.length === 0) {
      showToast('Select at least one category!');
      return;
    }
    if (!bulkAction) {
      showToast('Select a bulk action!');
      return;
    }

    try {
      if (bulkAction === 'delete') {
        if (!window.confirm(`Delete ${selectedItems.length} categories?`)) return;
        await Promise.all(selectedItems.map((id) => api.delete(`/categories/${id}`)));
        showToast(`${selectedItems.length} categories deleted!`);
      } else if (bulkAction === 'publish') {
        await Promise.all(selectedItems.map((id) => api.put(`/categories/${id}`, { isActive: true })));
        showToast(`${selectedItems.length} categories published!`);
      } else if (bulkAction === 'draft') {
        await Promise.all(selectedItems.map((id) => api.put(`/categories/${id}`, { isActive: false })));
        showToast(`${selectedItems.length} categories marked as draft!`);
      }
      setSelectedItems([]);
      setBulkAction('');
      fetchCategories();
    } catch (error) {
      showToast('Error applying bulk action');
    }
  };

  const handleViewCategory = (slug) => {
    window.open(`http://localhost:3000/bn/category/${slug}`, '_blank');
    setOpenDropdownId(null);
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Categories</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Organize your news content with categories
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => showToast('Categories CSV Template downloaded!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Upload size={14} className="text-slate-500" />
            <span>Import</span>
          </button>

          <button
            onClick={() => showToast('Categories exported successfully!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export</span>
          </button>

          <Link
            to="/categories/add"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Category</span>
          </Link>
        </div>
      </div>

      {/* 2. Top 4 KPI Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Categories */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Total Categories</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{categories.length}</h3>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">All time</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
            <Landmark size={20} />
          </div>
        </div>

        {/* Card 2: Published Categories */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Published</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{categories.filter(c => c.status === 'Published').length}</h3>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">Active categories</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* Card 3: Total Posts Across Categories */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Total Posts</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{categories.reduce((acc, c) => acc + (c.posts || 0), 0)}</h3>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">Across all categories</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <TrendingUp size={20} />
          </div>
        </div>

        {/* Card 4: Uncategorized Posts */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Uncategorized Posts</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{uncategorizedCount}</h3>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">Need attention</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Search size={20} />
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
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl text-xs font-semibold px-3 py-2 text-slate-700 outline-none cursor-pointer"
                >
                  <option value="">Bulk Actions</option>
                  <option value="delete">Delete Selected</option>
                  <option value="publish">Mark as Published</option>
                  <option value="draft">Mark as Draft</option>
                </select>
                <button
                  onClick={handleApplyBulkActions}
                  className="bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
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
                    placeholder="Search categories..."
                    className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all font-medium"
                  />
                </div>

                <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
                  <Filter size={14} className="text-slate-500" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Categories Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedItems.length === categories.length && categories.length > 0}
                        className="rounded border-slate-300 text-[#eb1c24]"
                      />
                    </th>
                    <th className="py-3 px-3">Category Name</th>
                    <th className="py-3 px-3">Slug</th>
                    <th className="py-3 px-3">Posts</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-center">Order</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredCategories.map((cat) => {
                    const CatIcon = cat.icon;
                    return (
                      <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors group">
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <GripVertical size={14} className="text-slate-300 cursor-grab group-hover:text-slate-400" />
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(cat.id)}
                              onChange={() => handleToggleSelect(cat.id)}
                              className="rounded border-slate-300 text-[#eb1c24]"
                            />
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cat.color} shadow-2xs`}>
                              <CatIcon size={16} />
                            </div>
                            <span className="font-bold text-slate-900 font-bangla text-sm">
                              {cat.name}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-slate-500">
                          {cat.slug}
                        </td>

                        <td className="py-3.5 px-3 font-bold text-indigo-600">
                          {cat.posts}
                        </td>

                        <td className="py-3.5 px-3">
                          <button
                            onClick={() => handleToggleStatus(cat)}
                            title="Click to toggle status (Published / Draft)"
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer hover:scale-105 transition-transform ${
                              cat.status === 'Published'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            {cat.status}
                          </button>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <span className="inline-block w-8 py-0.5 text-center font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-md">
                            {cat.order}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-right relative">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditModal(cat)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit Category"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => handleViewCategory(cat.slug)}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              title="View Category on Website"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Category"
                            >
                              <X size={15} />
                            </button>
                            <button
                              onClick={() => setOpenDropdownId(openDropdownId === cat.id ? null : cat.id)}
                              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="More Options"
                            >
                              <MoreVertical size={14} />
                            </button>
                          </div>

                          {/* Options Dropdown Menu */}
                          {openDropdownId === cat.id && (
                            <div className="absolute right-3 top-10 z-30 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1 text-left text-xs font-semibold space-y-0.5 animate-in fade-in zoom-in-95">
                              <button
                                onClick={() => handleOpenEditModal(cat)}
                                className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                              >
                                <Pencil size={13} className="text-indigo-600" />
                                <span>Edit Category</span>
                              </button>
                              <button
                                onClick={() => handleToggleStatus(cat)}
                                className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                              >
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                <span>Toggle Status</span>
                              </button>
                              <button
                                onClick={() => handleViewCategory(cat.slug)}
                                className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2 cursor-pointer"
                              >
                                <Eye size={13} className="text-blue-600" />
                                <span>View Category</span>
                              </button>
                              <div className="border-t border-slate-100 my-0.5" />
                              <button
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="w-full px-3 py-1.5 hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer"
                              >
                                <X size={13} />
                                <span>Delete Category</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Pagination Footer */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
              <span>Showing 1 to {filteredCategories.length} of 32 categories</span>

              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shadow-2xs">
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

        {/* Right Side: Donut Chart, Quick Actions & Top Categories (~25% - lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">

          {/* 1. Category Breakdown Overview */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Category Overview</h3>
              <span className="text-[10px] font-bold text-slate-400">
                {categories.reduce((acc, c) => acc + (c.posts || 0), 0)} Total Posts
              </span>
            </div>

            <div className="space-y-2 text-xs font-bangla">
              {categories.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eb1c24]" />
                    <span className="font-bold text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-500">{item.posts} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Quick Actions Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <h3 className="font-extrabold text-xs text-slate-900 mb-1">Quick Actions</h3>

            <div className="space-y-1.5 text-xs font-bold text-slate-700">
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <Plus size={15} className="text-indigo-600" />
                <span>Add New Category</span>
              </button>

              <button
                onClick={() => showToast('AI category suggestions calculated!')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-purple-600" />
                  <span>AI Suggest Categories</span>
                </div>
                <span className="text-[9px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded">AI</span>
              </button>

              <button
                onClick={() => showToast('Drag handles to reorder categories')}
                className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <ArrowUpDown size={15} className="text-emerald-600" />
                <span>Reorder Categories</span>
              </button>

              <button
                onClick={() => showToast('Select two categories to merge')}
                className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <Merge size={15} className="text-blue-600" />
                <span>Merge Categories</span>
              </button>

              <button
                onClick={() => showToast('Category permissions dialog opened')}
                className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <Shield size={15} className="text-amber-600" />
                <span>Category Permissions</span>
              </button>
            </div>
          </div>

          {/* 3. Top Categories Ranking Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Top Categories</h3>
              <button className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer">View All</button>
            </div>

            <div className="space-y-2 text-xs font-bangla">
              {categories.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-400 w-3">{idx + 1}</span>
                    <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <FolderTree size={12} />
                    </div>
                    <span className="font-bold text-slate-800">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-500 text-[11px]">{item.posts} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Tips Card */}
          <div className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 text-amber-800 font-extrabold text-xs">
              <Lightbulb size={16} className="text-amber-600" />
              <span>Tips</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
              Use categories to organize your content better. AI suggestion can help you find the best category for your posts.
            </p>
          </div>

        </div>

      </div>

      {/* Add New Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900">Add New Category</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Category Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. রাজনীতি, খেলা, স্বাস্থ্য..."
                  value={newCatName}
                  onChange={(e) => {
                    setNewCatName(e.target.value);
                    setNewCatSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                  }}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bangla outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Slug</label>
                <input
                  type="text"
                  placeholder="e.g. politics, sports, health..."
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-mono outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Status</label>
                <select
                  value={newCatStatus}
                  onChange={(e) => setNewCatStatus(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Published">Published</option>
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
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900">Edit Category</h3>
              <button onClick={() => setEditingCategory(null)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Category Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bangla outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Slug</label>
                <input
                  type="text"
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-mono outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
