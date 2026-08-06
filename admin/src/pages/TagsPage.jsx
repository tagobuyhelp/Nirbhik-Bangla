import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Trash2,
} from 'lucide-react';

export default function TagsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTags = async () => {
    try {
      const { data } = await api.get('/tags');
      const formatted = (data.data || []).map((t) => ({
        id: t._id,
        name: t.name?.bn || t.name?.en || 'Tag',
        slug: t.slug,
        posts: t.usageCount || 0,
        status: 'Active', // Tags don't have isActive in schema, default Active
        created: new Date(t.createdAt).toLocaleDateString(),
        icon: TagIcon,
        color: 'bg-[#eb1c24] text-white',
      }));
      setTags(formatted);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);

  const fetchAiSuggestions = async () => {
    setLoadingAi(true);
    try {
      const { data } = await api.get('/ai/suggest-tags');
      const suggestions = (data.data?.suggestions || []).map(s => ({
        ...s,
        icon: Sparkles
      }));
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchAiSuggestions();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleDeleteTag = async (id) => {
    if (!window.confirm('আপনি কি এই ট্যাগটি মুছে ফেলতে চান?')) return;
    try {
      await api.delete(`/tags/${id}`);
      showToast('ট্যাগ মুছে ফেলা হয়েছে!');
      fetchTags();
    } catch (error) {
      showToast('ট্যাগ মুছতে ব্যর্থ হয়েছে');
    }
  };

  const handleAddAiSuggestedTag = async (suggestedTag) => {
    try {
      const slug = suggestedTag.name.toLowerCase().replace(/\s+/g, '-');
      await api.post('/tags', {
        slug,
        name: {
          bn: suggestedTag.name,
          en: suggestedTag.name
        }
      });
      setAiSuggestions(aiSuggestions.filter((s) => s.id !== suggestedTag.id));
      showToast(`AI ট্যাগ "${suggestedTag.name}" ট্যাগের তালিকায় যুক্ত হয়েছে!`);
      fetchTags();
    } catch (error) {
      showToast(error.response?.data?.message || 'ট্যাগ যোগ করতে ব্যর্থ হয়েছে');
    }
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

          <Link
            to="/tags/add"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Tag</span>
          </Link>
        </div>
      </div>

      {/* 2. Main Content: Grid Layout (Table 8 Cols + Sidebar 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Side: Table & Filters (~66% - lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            
            {/* Filter & Action Header */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3 bg-slate-50/50">
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
              </div>
            </div>

            {/* Tags Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Tag Name</th>
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
                        <td className="py-3.5 px-4">
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
                            <Link
                              to={`/tags/edit/${tag.id}`}
                              className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit Tag"
                            >
                              <Pencil size={14} />
                            </Link>
                            <button
                              onClick={() => handleDeleteTag(tag.id)}
                              className="p-1.5 text-slate-400 hover:text-[#eb1c24] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Tag"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Right Side: AI Tag Suggestions (~33% - lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-4">

          {/* 1. AI Tag Suggestions Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-xs text-slate-900">AI Tag Suggestions</h3>
                <span className="text-[9px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded">AI</span>
              </div>
              <button
                onClick={fetchAiSuggestions}
                disabled={loadingAi}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RotateCw size={12} className={loadingAi ? 'animate-spin' : ''} /> Refresh
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
              onClick={fetchAiSuggestions}
              disabled={loadingAi}
              className="w-full py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-1 disabled:opacity-50"
            >
              <Sparkles size={14} className={loadingAi ? 'animate-spin' : ''} />
              <span>{loadingAi ? 'Generating Suggestions...' : 'Generate More Suggestions'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
