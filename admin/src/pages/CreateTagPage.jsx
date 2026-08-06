import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import {
  Tag,
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
  CheckCircle,
} from 'lucide-react';

export default function CreateTagPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  // 1. Basic Info State
  const [tagName, setTagName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  // 2. Multi-language State
  const [selectedLangTab, setSelectedLangTab] = useState('bn');
  const [translations, setTranslations] = useState({
    bn: { name: '', slug: '', desc: '' },
    en: { name: '', slug: '', desc: '' },
    hi: { name: '', slug: '', desc: '' },
  });

  // 4. AI Suggestions State
  const [aiSuggestions, setAiSuggestions] = useState({
    relatedTags: ['ভোট', 'নির্বাচনী প্রচার', 'প্রার্থী', 'ভোটগ্রহণ', 'ফলাফল'],
    seoTitle: 'নির্বাচন | সর্বশেষ নির্বাচন সংবাদ ও আপডেট',
    seoDescription: 'নির্বাচন সম্পর্কিত সর্বশেষ খবর, বিশ্লেষণ, ফলাফল ও আপডেট পেতে আমাদের সাথে থাকুন।',
    focusKeywords: ['নির্বাচন', 'ভোট', 'প্রচার', 'প্রার্থী', 'ফলাফল']
  });
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  const generateTagDescription = async () => {
    if (!tagName.trim()) {
      showToast('আগে বাংলা ট্যাগ নাম লিখুন!');
      return;
    }
    setIsGeneratingDesc(true);
    try {
      const res = await api.post('/ai/generate-tag-description', { tagName });
      if (res.data?.data?.description) {
        const descData = res.data.data.description;
        setDescription(descData.bn);
        setTranslations(prev => ({
          ...prev,
          bn: { ...prev.bn, desc: descData.bn },
          en: { ...prev.en, desc: descData.en },
          hi: { ...prev.hi, desc: descData.hi }
        }));
        showToast('AI ডেসক্রিপশন তৈরি হয়েছে!');
      }
    } catch (error) {
      showToast('AI ডেসক্রিপশন তৈরি করতে ব্যর্থ হয়েছে।');
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const generateAiSuggestions = async () => {
    if (!tagName.trim()) {
      showToast('আগে বাংলা ট্যাগ নাম লিখুন!');
      return;
    }
    setIsGeneratingAi(true);
    try {
      const tagsRes = await api.post('/ai/suggest-tags', { text: tagName });
      const relatedTags = tagsRes.data?.data?.tags || [];

      const seoRes = await api.post('/ai/seo', { title: tagName, description: description });
      const seo = seoRes.data?.data || {};

      setAiSuggestions({
        relatedTags: relatedTags.slice(0, 5),
        seoTitle: seo.seoTitle || `${tagName} | Nirbhik Bangla`,
        seoDescription: seo.seoDescription || `${tagName} সম্পর্কিত সর্বশেষ খবর ও আপডেট।`,
        focusKeywords: seo.keywords || [tagName, 'খবর', 'আপডেট']
      });
      showToast('AI সাজেশন সফলভাবে তৈরি হয়েছে!');
    } catch (error) {
      showToast('AI সাজেশন তৈরি করতে ব্যর্থ হয়েছে।');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    const checks = {
      name: false,
      translations: false,
      slug: false,
      description: false,
      seo: false,
      relatedTags: false,
    };

    if (tagName.trim().length > 0) { score += 15; checks.name = true; }
    if (slug.trim().length > 0) { score += 15; checks.slug = true; }
    if (description.trim().length > 5) { score += 15; checks.description = true; }
    if (translations.en.name.trim().length > 0 && translations.hi.name.trim().length > 0) { score += 15; checks.translations = true; }
    if (aiSuggestions.seoTitle.length > 5) { score += 20; checks.seo = true; }
    if (aiSuggestions.relatedTags.length > 0) { score += 20; checks.relatedTags = true; }

    let level = 'Needs Work';
    let levelColor = 'text-red-500';
    let strokeColor = 'text-red-500';
    if (score >= 90) { level = 'Excellent'; levelColor = 'text-emerald-600'; strokeColor = 'text-emerald-500'; }
    else if (score >= 60) { level = 'Good'; levelColor = 'text-amber-600'; strokeColor = 'text-amber-500'; }

    return { score, checks, level, levelColor, strokeColor };
  };

  const { score, checks, level, levelColor, strokeColor } = calculateScore();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchTag();
    } else {
      setTagName('');
      setSlug('');
      setTranslations({
        bn: { name: '', slug: '', desc: '' },
        en: { name: '', slug: '', desc: '' },
        hi: { name: '', slug: '', desc: '' },
      });
    }
  }, [id]);

  const handleAITranslate = async () => {
    if (!tagName.trim()) {
      showToast('আগে বাংলা ট্যাগ নাম লিখুন!');
      return;
    }

    setIsTranslating(true);
    try {
      const { data } = await api.post('/ai/translate-tag', { name: tagName.trim() });
      if (data && data.data) {
        const { en, hi } = data.data;
        const autoSlug = (en || tagName).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\u0980-\u09FF-]/g, '');
        if (!slug) setSlug(autoSlug);
        setTranslations(prev => ({
          ...prev,
          en: { ...prev.en, name: en, slug: autoSlug },
          hi: { ...prev.hi, name: hi }
        }));
        showToast('AI দ্বারা অনুবাদ সফলভাবে সম্পন্ন হয়েছে!');
      }
    } catch (error) {
      showToast('AI অনুবাদ ব্যর্থ হয়েছে');
    } finally {
      setIsTranslating(false);
    }
  };

  const fetchTag = async () => {
    try {
      const { data } = await api.get(`/tags/${id}`);
      const tag = data.data;
      if (tag) {
        setTagName(tag.name?.bn || '');
        setSlug(tag.slug || '');
        setDescription(tag.description?.bn || '');
        setUsageCount(tag.usageCount || 0);
        setTranslations({
          bn: { name: tag.name?.bn || '', slug: tag.slug || '', desc: tag.description?.bn || '' },
          en: { name: tag.name?.en || '', slug: tag.slug || '', desc: tag.description?.en || '' },
          hi: { name: tag.name?.hi || '', slug: tag.slug || '', desc: tag.description?.hi || '' },
        });
        if (tag.seo) {
          setAiSuggestions(prev => ({
            ...prev,
            seoTitle: tag.seo.title || prev.seoTitle,
            seoDescription: tag.seo.description || prev.seoDescription,
            focusKeywords: tag.seo.keywords?.length ? tag.seo.keywords : prev.focusKeywords
          }));
        }
      }
    } catch (error) {
      showToast('Error loading tag data');
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: {
          bn: translations.bn.name || tagName,
          en: translations.en.name || tagName,
          hi: translations.hi.name || ''
        },
        slug: slug || tagName.toLowerCase().replace(/\s+/g, '-'),
        description: {
          bn: translations.bn.desc || description,
          en: translations.en.desc || description,
          hi: translations.hi.desc || ''
        },
        seo: {
          title: aiSuggestions.seoTitle || '',
          description: aiSuggestions.seoDescription || '',
          keywords: aiSuggestions.focusKeywords || []
        }
      };

      if (isEditMode) {
        await api.put(`/tags/${id}`, payload);
        showToast('ট্যাগটি সফলভাবে আপডেট করা হয়েছে!');
      } else {
        await api.post('/tags', payload);
        showToast('নতুন ট্যাগটি সফলভাবে তৈরি করা হয়েছে!');
      }

      setTimeout(() => {
        navigate('/tags');
      }, 1500);
    } catch (error) {
      showToast(error.response?.data?.message || 'Error saving tag');
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
        <Link to="/tags" className="hover:text-slate-900 transition-colors">
          Tags
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-extrabold">{isEditMode ? 'Edit Tag' : 'Add New Tag'}</span>
      </div>

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
              {isEditMode ? 'Edit Tag' : 'Add New Tag'}
            </h1>
            <span className="bg-purple-100 text-purple-700 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={12} />
              <span>AI Powered</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            {isEditMode ? 'Update this tag with AI assistance and multi-language support.' : 'Create a new tag with AI assistance and multi-language support.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <button
            type="button"
            onClick={handlePublish}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Sparkles size={15} />
            <span>{isEditMode ? 'Update Tag' : 'Publish Tag'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column Form Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section 1: 1. Basic Information */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <label className="text-slate-700 font-bold">Tag Name (বাংলা) <span className="text-red-500">*</span></label>
                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.2 rounded">Main Language</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    {tagName.length}/50 <CheckCircle2 size={12} className="text-emerald-500" />
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={50}
                  value={tagName}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTagName(val);
                    const autoSlug = (translations.en.name || val).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\u0980-\u09FF-]/g, '');
                    setSlug(autoSlug);
                    setTranslations(prev => ({
                      ...prev,
                      bn: { ...prev.bn, name: val }
                    }));
                  }}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla font-bold text-slate-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-bold">Slug <span className="text-slate-400 font-normal">(Auto-generated)</span></label>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    {slug.length}/50 <CheckCircle2 size={12} className="text-emerald-500" />
                  </span>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    maxLength={50}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2 pr-8 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSlug = (translations.en.name || tagName).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\u0980-\u09FF-]/g, '');
                      setSlug(newSlug);
                      showToast('Slug সিঙ্ক করা হলো!');
                    }}
                    className="absolute right-2.5 text-slate-400 hover:text-purple-600 cursor-pointer"
                    title="Generate Slug"
                  >
                    <RotateCw size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <label className="text-slate-700 font-bold text-xs">Description <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <button
                    type="button"
                    onClick={generateTagDescription}
                    disabled={isGeneratingDesc}
                    className={`bg-purple-50 hover:bg-purple-100 text-purple-700 text-[10px] font-extrabold px-2 py-0.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${isGeneratingDesc ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Sparkles size={10} className={isGeneratingDesc ? 'animate-spin' : ''} />
                    <span>{isGeneratingDesc ? 'Generating...' : 'AI Generate'}</span>
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  {description.length}/200 <CheckCircle2 size={12} className="text-emerald-500" />
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#eb1c24] resize-none font-bangla"
              />
            </div>
          </div>

          {/* Section 2: 2. Multi-language & AI Translation */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">
                2. Multi-language & AI Translation
              </h3>

              <button
                type="button"
                onClick={handleAITranslate}
                disabled={isTranslating}
                className={`bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-extrabold px-3 py-1 rounded-xl transition-colors cursor-pointer flex items-center gap-1 ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Sparkles size={13} className={isTranslating ? 'animate-spin' : ''} />
                <span>{isTranslating ? 'Translating...' : 'AI Translate All'}</span>
              </button>
            </div>

            {/* Language Selector Header */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setSelectedLangTab('bn')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${selectedLangTab === 'bn' ? 'bg-purple-100 text-purple-800 font-black' : 'bg-slate-50 text-slate-600'}`}
              >
                <span>বাংলা</span>
                <span className="bg-white text-emerald-700 text-[9px] font-black px-1.5 py-0.2 rounded">Default</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLangTab('en')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${selectedLangTab === 'en' ? 'bg-purple-100 text-purple-800 font-black' : 'bg-slate-50 text-slate-600'}`}
              >
                <span>English</span>
                <span className="bg-purple-200 text-purple-800 text-[9px] font-black px-1.5 py-0.2 rounded">AI Generated</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLangTab('hi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${selectedLangTab === 'hi' ? 'bg-purple-100 text-purple-800 font-black' : 'bg-slate-50 text-slate-600'}`}
              >
                <span>हिन्दी</span>
                <span className="bg-purple-200 text-purple-800 text-[9px] font-black px-1.5 py-0.2 rounded">AI Generated</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('নতুন ভাষা নির্বাচন উইন্ডো খোলা হলো!')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-600 border border-dashed border-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} />
                <span>Add Language</span>
              </button>
            </div>

            {/* 3 Translation Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs font-semibold">
              {/* Bangla Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <h5 className="font-bold text-slate-900 flex items-center gap-1 text-xs">
                  <span>বাংলা</span>
                  <span className="text-[9px] text-emerald-600 font-black">● Main</span>
                </h5>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Tag Name *</label>
                  <input
                    type="text"
                    value={translations.bn.name}
                    onChange={(e) => setTranslations({ ...translations, bn: { ...translations.bn, name: e.target.value } })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none font-bangla text-xs"
                  />
                  <div className="text-right text-[9px] text-emerald-600 font-mono mt-0.5">7/50 ✓</div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Slug</label>
                  <input
                    type="text"
                    value={translations.bn.slug}
                    onChange={(e) => setTranslations({ ...translations, bn: { ...translations.bn, slug: e.target.value } })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
                  />
                  <div className="text-right text-[9px] text-emerald-600 font-mono mt-0.5">9/50 ✓</div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    value={translations.bn.desc}
                    onChange={(e) => setTranslations({ ...translations, bn: { ...translations.bn, desc: e.target.value } })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none font-bangla text-[11px] resize-none"
                  />
                  <div className="text-right text-[9px] text-emerald-600 font-mono mt-0.5">61/200 ✓</div>
                </div>
              </div>

              {/* English Card */}
              <div className="p-3.5 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-2.5">
                <h5 className="font-bold text-slate-900 flex items-center gap-1 text-xs">
                  <span>English</span>
                  <span className="text-[9px] text-purple-700 bg-purple-100 font-black px-1 rounded">AI Generated</span>
                </h5>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Tag Name *</label>
                  <input
                    type="text"
                    value={translations.en.name}
                    onChange={(e) => setTranslations({ ...translations, en: { ...translations.en, name: e.target.value } })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none font-bold text-xs"
                  />
                  <div className="text-right text-[9px] text-emerald-600 font-mono mt-0.5">8/50 ✓</div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Slug</label>
                  <input
                    type="text"
                    value={translations.en.slug}
                    onChange={(e) => setTranslations({ ...translations, en: { ...translations.en, slug: e.target.value } })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
                  />
                  <div className="text-right text-[9px] text-emerald-600 font-mono mt-0.5">8/50 ✓</div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    value={translations.en.desc}
                    onChange={(e) => setTranslations({ ...translations, en: { ...translations.en, desc: e.target.value } })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none text-[11px] resize-none"
                  />
                  <div className="text-right text-[9px] text-emerald-600 font-mono mt-0.5">61/200 ✓</div>
                </div>
              </div>

              {/* Hindi Card */}
              <div className="p-3.5 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-2.5">
                <h5 className="font-bold text-slate-900 flex items-center gap-1 text-xs">
                  <span>हिन्दी</span>
                  <span className="text-[9px] text-purple-700 bg-purple-100 font-black px-1 rounded">AI Generated</span>
                </h5>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Tag Name *</label>
                  <input
                    type="text"
                    value={translations.hi.name}
                    onChange={(e) => setTranslations({ ...translations, hi: { ...translations.hi, name: e.target.value } })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none font-bold text-xs"
                  />
                  <div className="text-right text-[9px] text-emerald-600 font-mono mt-0.5">6/50 ✓</div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Slug</label>
                  <input
                    type="text"
                    value={translations.hi.slug}
                    onChange={(e) => setTranslations({ ...translations, hi: { ...translations.hi, slug: e.target.value } })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
                  />
                  <div className="text-right text-[9px] text-emerald-600 font-mono mt-0.5">6/50 ✓</div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    value={translations.hi.desc}
                    onChange={(e) => setTranslations({ ...translations, hi: { ...translations.hi, desc: e.target.value } })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none text-[11px] resize-none"
                  />
                  <div className="text-right text-[9px] text-emerald-600 font-mono mt-0.5">61/200 ✓</div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 pt-1">
              <Sparkles size={11} className="text-purple-600" />
              <span>AI translation is generated automatically. You can edit if needed.</span>
            </p>
          </div>

        </div>

        {/* Right Column Side Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">


          {/* 2. Tag Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">Tag Preview</h3>
            </div>

            {/* Tag Visual Box */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/60 space-y-2">
              <span className="bg-purple-700 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full inline-block font-bangla">
                {tagName || 'ট্যাগ নাম'}
              </span>
              <h4 className="font-bangla font-black text-slate-900 text-base">{tagName || 'ট্যাগ নাম'}</h4>
              <p className="text-xs font-bangla text-slate-600 leading-snug">{description || 'ট্যাগের ডেসক্রিপশন এখানে দেখা যাবে...'}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-1">
                <span>{usageCount} posts</span>
                <span className="text-purple-700 hover:underline flex items-center gap-1">View all →</span>
              </div>
            </div>
          </div>

          {/* 3. Quality Score Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Quality Score
            </h3>

            <div className="flex items-center gap-4">
              {/* Radial Gauge */}
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className={strokeColor} strokeWidth="3.5" strokeDasharray={`${score}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-base font-black text-slate-900 font-mono">{score}%</span>
                  <span className={`text-[8px] font-black ${levelColor} block uppercase`}>{level}</span>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-1 text-xs font-semibold text-slate-700 grid grid-cols-2 gap-x-2">
                <div className={`flex items-center gap-1 ${checks.name ? 'text-emerald-600' : 'text-slate-400'}`}><CheckCircle2 size={13} /> <span>Name</span></div>
                <div className={`flex items-center gap-1 ${checks.translations ? 'text-emerald-600' : 'text-slate-400'}`}><CheckCircle2 size={13} /> <span>Translations</span></div>
                <div className={`flex items-center gap-1 ${checks.slug ? 'text-emerald-600' : 'text-slate-400'}`}><CheckCircle2 size={13} /> <span>Slug</span></div>
                <div className={`flex items-center gap-1 ${checks.description ? 'text-emerald-600' : 'text-slate-400'}`}><CheckCircle2 size={13} /> <span>Description</span></div>
                <div className={`flex items-center gap-1 ${checks.seo ? 'text-emerald-600' : 'text-slate-400'}`}><CheckCircle2 size={13} /> <span>SEO</span></div>
                <div className={`flex items-center gap-1 ${checks.relatedTags ? 'text-emerald-600' : 'text-slate-400'}`}><CheckCircle2 size={13} /> <span>Related Tags</span></div>
              </div>
            </div>

            <p className={`text-[10.5px] font-extrabold flex items-center gap-1 pt-2 border-t border-slate-100 ${score === 100 ? 'text-emerald-700' : 'text-slate-600'}`}>
              <Sparkles size={12} className={score === 100 ? 'text-emerald-600' : 'text-slate-400'} />
              <span>{score === 100 ? 'Great! Your tag is optimized and ready to publish.' : 'Optimize all checks to reach 100% Quality Score.'}</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
