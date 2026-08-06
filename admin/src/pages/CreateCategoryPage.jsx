import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import {
  FolderPlus,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X,
  RotateCw,
  Plus,
  Globe,
  Upload,
  Eye,
  Check,
  ArrowRight,
  TrendingUp,
  Sliders,
  Layers,
  Palette,
  Landmark,
  Copy,
  FileText,
  Search,
  CheckCircle,
} from 'lucide-react';

export default function CreateCategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [toastMessage, setToastMessage] = useState('');

  // 1. Basic Information State
  const [categoryName, setCategoryName] = useState('');
  const [slug, setSlug] = useState('');
  const [color, setColor] = useState('#eb1c24');

  useEffect(() => {
    if (id) {
      api.get('/categories')
        .then((res) => {
          const list = res.data.data || [];
          const found = list.find((c) => c._id === id || c.id === id);
          if (found) {
            const bnName = found.translations?.bn?.name || (typeof found.name === 'object' ? found.name?.bn : found.name) || '';
            setCategoryName(bnName);
            setSlug(found.slug || '');
            setColor(found.color || '#eb1c24');
            setTranslations({
              en: {
                name: found.translations?.en?.name || (typeof found.name === 'object' ? found.name?.en : '') || '',
                slug: found.translations?.en?.slug || '',
                desc: found.translations?.en?.description || ''
              },
              hi: {
                name: found.translations?.hi?.name || (typeof found.name === 'object' ? found.name?.hi : '') || '',
                slug: found.translations?.hi?.slug || '',
                desc: found.translations?.hi?.description || ''
              }
            });
            if (found.seo) {
              setSeoTitle(found.seo.title || '');
              setMetaDesc(found.seo.metaDesc || '');
              setCanonicalUrl(found.seo.canonicalUrl || '');
              setOgTitle(found.seo.ogTitle || '');
              setOgDesc(found.seo.ogDesc || '');
            }
          }
        })
        .catch((err) => console.error('Error fetching category details:', err));
    }
  }, [id]);

  // 2. Multi-language Translations State
  const [activeLangTab, setActiveLangTab] = useState('bn');
  const [translations, setTranslations] = useState({
    en: {
      name: '',
      slug: '',
      desc: '',
    },
    hi: {
      name: '',
      slug: '',
      desc: '',
    },
  });

  // 3. SEO & Metadata State
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDesc, setOgDesc] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Tags State
  const [focusKeywords, setFocusKeywords] = useState([]);
  const [newFocusKeyword, setNewFocusKeyword] = useState('');
  
  const [relatedCategories, setRelatedCategories] = useState([]);
  const [newRelatedCat, setNewRelatedCat] = useState('');
  
  const [searchKeywords, setSearchKeywords] = useState([]);
  const [newSearchKeyword, setNewSearchKeyword] = useState('');

  // Preview Mode
  // Removed preview card

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleAiTranslate = async () => {
    if (!categoryName) return showToast('Please enter category name in Bengali first!');
    showToast('AI Translation in progress...');
    try {
      const [enRes, hiRes] = await Promise.all([
        api.post('/ai/translate', { text: categoryName, fromLang: 'bn', toLang: 'en' }),
        api.post('/ai/translate', { text: categoryName, fromLang: 'bn', toLang: 'hi' })
      ]);
      setTranslations(prev => ({
        ...prev,
        en: { ...prev.en, name: enRes.data.data.translation, slug: enRes.data.data.translation.toLowerCase().replace(/\\s+/g, '-') },
        hi: { ...prev.hi, name: hiRes.data.data.translation, slug: hiRes.data.data.translation.toLowerCase().replace(/\\s+/g, '-') }
      }));
      showToast('AI Translation completed!');
    } catch (err) {
      showToast('Failed to generate translation');
    }
  };

  const handleAiSeo = async () => {
    if (!categoryName) return showToast('Please enter category name first!');
    showToast('AI SEO Generation in progress...');
    try {
      const res = await api.post('/ai/seo', { text: categoryName });
      const { seoTitle: generatedTitle, seoDescription: generatedDesc, keywords } = res.data.data;
      setSeoTitle(generatedTitle || '');
      setMetaDesc(generatedDesc || '');
      setOgTitle(generatedTitle || '');
      setOgDesc(generatedDesc || '');
      setFocusKeywords(keywords || []);
      showToast('AI SEO Generation completed!');
    } catch (err) {
      showToast('Failed to generate SEO metadata');
    }
  };

  const handleAiTagsAndCategories = async () => {
    if (!categoryName) return showToast('Please enter category name first!');
    showToast('AI Suggesting Related Categories & Keywords...');
    try {
      const res = await api.post('/ai/suggest-tags', { text: categoryName, lang: 'bn' });
      const { tags } = res.data.data;
      // Just split them equally between related categories and search keywords for UI effect
      if (tags && tags.length > 0) {
        setRelatedCategories(tags.slice(0, Math.ceil(tags.length / 2)));
        setSearchKeywords(tags.slice(Math.ceil(tags.length / 2)));
      }
      showToast('AI Suggestions loaded!');
    } catch (err) {
      showToast('Failed to generate suggestions');
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        slug: slug || categoryName.toLowerCase().replace(/\\s+/g, '-'),
        translations: {
          bn: { name: categoryName, description: metaDesc },
          en: { name: translations.en.name, description: translations.en.desc },
          hi: { name: translations.hi.name, description: translations.hi.desc }
        },
        color,
        seo: { title: seoTitle, metaDesc, canonicalUrl, ogTitle, ogDesc },
        priority,
        focusKeywords,
        relatedCategories,
        searchKeywords,
        isActive: true
      };

      if (isEditing) {
        await api.put(`/categories/${id}`, payload);
        showToast('ক্যাটাগরি সফলভাবে আপডেট করা হয়েছে!');
      } else {
        await api.post('/categories', payload);
        showToast('নতুন ক্যাটাগরি সফলভাবে তৈরি ও পাবলিশ করা হয়েছে!');
      }
      setTimeout(() => {
        navigate('/categories');
      }, 1200);
    } catch (error) {
      showToast(error.response?.data?.message || 'ক্যাটাগরি তৈরি করতে ব্যর্থ হয়েছে');
    }
  };

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-12">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Bar */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-slate-900 transition-colors">
          Dashboard
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link to="/categories" className="hover:text-slate-900 transition-colors">
          Categories
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-extrabold">{isEditing ? 'Edit Category' : 'Add New Category'}</span>
      </div>

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
              {isEditing ? 'Edit Category' : 'Add New Category'}
            </h1>
            <span className="bg-purple-100 text-purple-700 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={12} />
              <span>AI Powered</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            {isEditing ? 'Modify category settings, translations, and SEO metadata.' : 'Create a new category with AI assistance and multi-language support.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <button
            type="button"
            onClick={handlePublish}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Sparkles size={15} />
            <span>Publish Category</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column Form Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section 1: Basic Information */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-bold">Category Name (বাংলা) <span className="text-red-500">*</span></label>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    {categoryName.length}/100 <CheckCircle2 size={12} className="text-emerald-500" />
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={100}
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla font-bold text-slate-900 text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-bold">Slug <span className="text-slate-400 font-normal">(Auto-generated)</span></label>
                  <CheckCircle2 size={12} className="text-emerald-500" />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono text-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const baseName = translations.en.name || categoryName;
                      if (!baseName.trim()) return showToast('আগে ক্যাটাগরি নাম লিখুন!');
                      setSlug(baseName.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^\w\u0980-\u09FF-]/g, ''));
                      showToast('Slug জেনারেট করা হলো!');
                    }}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-extrabold px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <RotateCw size={13} />
                    <span>Generate</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Row of Controls (Color) */}
            <div className="pt-2 border-t border-slate-100">
              <div className="w-1/3">
                <label className="block text-slate-700 mb-1 font-bold">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer border-0 p-0"
                  />
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none font-mono font-bold text-slate-800 uppercase"
                  >
                    <option value="#7C3AED">#7C3AED</option>
                    <option value="#EB1C24">#EB1C24</option>
                    <option value="#059669">#059669</option>
                    <option value="#2563EB">#2563EB</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Multi-language Translations Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveLangTab('bn')}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold cursor-pointer ${activeLangTab === 'bn' ? 'bg-purple-100 text-purple-700' : 'text-slate-500'}`}
                >
                  বাংলা
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab('en')}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold cursor-pointer ${activeLangTab === 'en' ? 'bg-purple-100 text-purple-700' : 'text-slate-500'}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab('hi')}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold cursor-pointer ${activeLangTab === 'hi' ? 'bg-purple-100 text-purple-700' : 'text-slate-500'}`}
                >
                  हिन्दी
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAiTranslate}
                  className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>AI Translate</span>
                </button>

                <select className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs outline-none cursor-pointer">
                  <option>Auto Detect</option>
                </select>
              </div>
            </div>

            {/* 2 Translation Cards Grid (English & Hindi) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              {/* English (AI Generated) */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-slate-900 flex items-center gap-1 text-xs">
                    <span>English</span>
                    <span className="text-[9px] text-purple-700 bg-purple-100 font-black px-1.5 py-0.2 rounded">AI Generated</span>
                  </h5>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Category Name *</label>
                  <input
                    type="text"
                    value={translations.en.name}
                    onChange={(e) => setTranslations({ ...translations, en: { ...translations.en, name: e.target.value } })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Slug</label>
                  <input
                    type="text"
                    value={translations.en.slug}
                    onChange={(e) => setTranslations({ ...translations, en: { ...translations.en, slug: e.target.value } })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Description (AI Generated)</label>
                  <textarea
                    rows={3}
                    value={translations.en.desc}
                    onChange={(e) => setTranslations({ ...translations, en: { ...translations.en, desc: e.target.value } })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none text-[11px] resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAiTranslate}
                  className="text-[10px] text-purple-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCw size={10} /> Regenerate
                </button>
              </div>

              {/* हिन्दी (AI Generated) */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-slate-900 flex items-center gap-1 text-xs">
                    <span>हिन्दी</span>
                    <span className="text-[9px] text-purple-700 bg-purple-100 font-black px-1.5 py-0.2 rounded">AI Generated</span>
                  </h5>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Category Name *</label>
                  <input
                    type="text"
                    value={translations.hi.name}
                    onChange={(e) => setTranslations({ ...translations, hi: { ...translations.hi, name: e.target.value } })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Slug</label>
                  <input
                    type="text"
                    value={translations.hi.slug}
                    onChange={(e) => setTranslations({ ...translations, hi: { ...translations.hi, slug: e.target.value } })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Description (AI Generated)</label>
                  <textarea
                    rows={3}
                    value={translations.hi.desc}
                    onChange={(e) => setTranslations({ ...translations, hi: { ...translations.hi, desc: e.target.value } })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none text-[11px] resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAiTranslate}
                  className="text-[10px] text-purple-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCw size={10} /> Regenerate
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: SEO & Metadata (AI Generated) Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Sparkles size={15} className="text-purple-600" />
                <span>SEO & Metadata</span>
                <span className="text-[9px] text-purple-700 bg-purple-100 font-black px-1.5 py-0.2 rounded">AI Generated</span>
              </h3>
              <button
                type="button"
                onClick={handleAiSeo}
                className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles size={13} /> Generate SEO
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold pt-2">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-700 font-bold">SEO Title</label>
                    <CheckCircle2 size={13} className="text-emerald-500" />
                  </div>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla text-xs font-bold"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-700 font-bold">Meta Description</label>
                    <CheckCircle2 size={13} className="text-emerald-500" />
                  </div>
                  <textarea
                    rows={3}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla text-[11px] resize-none"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Focus Keywords</label>
                  <div className="p-2 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-wrap gap-1">
                    {focusKeywords.map((k, i) => (
                      <span key={i} className="bg-white border border-slate-200 text-slate-700 text-[10px] font-bangla font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        {k}
                        <button type="button" onClick={() => setFocusKeywords(focusKeywords.filter((item) => item !== k))} className="text-slate-400 hover:text-red-600"><X size={10} /></button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="+ Add Keyword"
                      value={newFocusKeyword}
                      onChange={(e) => setNewFocusKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newFocusKeyword.trim()) {
                          e.preventDefault();
                          if (!focusKeywords.includes(newFocusKeyword.trim())) {
                            setFocusKeywords([...focusKeywords, newFocusKeyword.trim()]);
                          }
                          setNewFocusKeyword('');
                        }
                      }}
                      className="text-[10px] bg-transparent outline-none border-none placeholder:text-purple-400 text-purple-700 font-extrabold px-1 py-0.5 w-24"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-700 font-bold">Canonical URL</label>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      <button type="button" onClick={() => {
                        navigator.clipboard.writeText(canonicalUrl || `https://nirbhikbangla.com/category/${slug}`);
                        showToast('URL কপি করা হয়েছে!');
                      }} className="text-slate-400 hover:text-purple-600 cursor-pointer"><Copy size={12} /></button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none font-mono text-[11px] text-slate-700"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-700 font-bold">OG Title</label>
                    <CheckCircle2 size={13} className="text-emerald-500" />
                  </div>
                  <input
                    type="text"
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla text-xs"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-700 font-bold">OG Description</label>
                    <CheckCircle2 size={13} className="text-emerald-500" />
                  </div>
                  <input
                    type="text"
                    value={ogDesc}
                    onChange={(e) => setOgDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row Grid (Related Categories, Priority, Search Keywords) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold pt-3 border-t border-slate-100">
              <div>
                <h5 className="font-bold text-slate-800 mb-1">Related Categories <span className="text-[9px] text-purple-700 font-normal">(AI Suggested)</span></h5>
                <div className="flex flex-wrap gap-1">
                  {relatedCategories.map((cat, i) => (
                    <span key={i} className="bg-purple-50 text-purple-800 border border-purple-200 text-[9.5px] font-bangla px-2 py-0.5 rounded-md flex items-center gap-1">
                      {cat}
                      <button type="button" onClick={() => setRelatedCategories(relatedCategories.filter((item) => item !== cat))} className="text-purple-400 hover:text-red-600"><X size={10} /></button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="+ Add Related Category"
                    value={newRelatedCat}
                    onChange={(e) => setNewRelatedCat(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newRelatedCat.trim()) {
                        e.preventDefault();
                        if (!relatedCategories.includes(newRelatedCat.trim())) {
                          setRelatedCategories([...relatedCategories, newRelatedCat.trim()]);
                        }
                        setNewRelatedCat('');
                      }
                    }}
                    className="text-[9.5px] bg-transparent outline-none border-none placeholder:text-purple-400 text-purple-700 font-extrabold px-1 py-0.5 w-32"
                  />
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-800 mb-1">Category Priority <span className="text-[10px] text-slate-400 font-normal">(?)</span></h5>
                <p className="text-[9.5px] text-slate-400 mb-1.5">AI suggests priority based on content volume and importance</p>
                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                    <input type="radio" name="prio" checked={priority === 'High'} onChange={() => setPriority('High')} className="text-purple-600" />
                    <span>High</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                    <input type="radio" name="prio" checked={priority === 'Medium'} onChange={() => setPriority('Medium')} className="text-purple-600" />
                    <span>Medium</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                    <input type="radio" name="prio" checked={priority === 'Low'} onChange={() => setPriority('Low')} className="text-purple-600" />
                    <span>Low</span>
                  </label>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-800 mb-1">Search Keywords <span className="text-[9px] text-purple-700 font-normal">(AI Generated)</span></h5>
                <div className="flex flex-wrap gap-1">
                  {searchKeywords.map((kw, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 text-[9.5px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                      {kw}
                      <button type="button" onClick={() => setSearchKeywords(searchKeywords.filter((item) => item !== kw))} className="text-slate-400 hover:text-red-600"><X size={10} /></button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="+ Add Keyword"
                    value={newSearchKeyword}
                    onChange={(e) => setNewSearchKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSearchKeyword.trim()) {
                        e.preventDefault();
                        if (!searchKeywords.includes(newSearchKeyword.trim())) {
                          setSearchKeywords([...searchKeywords, newSearchKeyword.trim()]);
                        }
                        setNewSearchKeyword('');
                      }
                    }}
                    className="text-[9.5px] bg-transparent outline-none border-none placeholder:text-purple-400 text-purple-700 font-extrabold px-1 py-0.5 w-24"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column Side Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* 1. AI Suggestions Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              AI Suggestions
            </h3>

            <div className="space-y-2 text-xs font-semibold">
              {[
                { title: 'Translation', sub: 'AI has translated to 2 languages', icon: Globe, action: handleAiTranslate },
                { title: 'SEO & Keywords', sub: 'AI has generated SEO data', icon: Search, action: handleAiSeo },
                { title: 'Related Categories & Keywords', sub: 'AI has suggested related items', icon: FolderPlus, action: handleAiTagsAndCategories },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon size={15} className="text-purple-600 shrink-0" />
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{item.title}</h5>
                      <p className="text-[9.5px] text-slate-400 font-medium">{item.sub}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if(item.action) item.action();
                        else showToast(`${item.title} accepted!`);
                      }}
                      className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-[10px] font-black px-2.5 py-1 rounded-lg border border-purple-200 cursor-pointer"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
