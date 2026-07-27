import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  // 1. Basic Info State
  const [tagName, setTagName] = useState('নির্বাচন');
  const [slug, setSlug] = useState('nirbachon');
  const [description, setDescription] = useState('নির্বাচন সম্পর্কিত সকল সংবাদ, বিশ্লেষণ, আপডেট ও তথ্য।');

  // 2. Multi-language State
  const [selectedLangTab, setSelectedLangTab] = useState('bn');
  const [translations, setTranslations] = useState({
    bn: { name: 'নির্বাচন', slug: 'nirbachon', desc: 'নির্বাচন সম্পর্কিত সকল সংবাদ, বিশ্লেষণ, আপডেট ও তথ্য।' },
    en: { name: 'Election', slug: 'election', desc: 'All news, analysis, updates and information related to elections.' },
    hi: { name: 'चुनाव', slug: 'chunav', desc: 'चुनाव से संबंधित सभी समाचार, विश्लेषण, अपडेट और जानकारी।' },
  });

  // 3. Additional Settings State
  const [selectedIcon, setSelectedIcon] = useState('tag');
  const [tagColor, setTagColor] = useState('#6F42C1');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Active');

  // Preview Mode
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    showToast('নতুন ট্যাগটি সফলভাবে পাবলিক ও অপটিমাইজ করা হয়েছে!');
    setTimeout(() => {
      navigate('/tags');
    }, 1500);
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
        <span className="text-slate-900 font-extrabold">Add New Tag</span>
      </div>

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
              Add New Tag
            </h1>
            <span className="bg-purple-100 text-purple-700 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={12} />
              <span>AI Powered</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Create a new tag with AI assistance and multi-language support.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <button
            type="button"
            onClick={() => showToast('ট্যাগটি ড্রাফট সেভ করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => showToast('ট্যাগ প্রিভিউ সক্রিয় করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Eye size={15} />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Sparkles size={15} />
            <span>Publish Tag</span>
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
                  onChange={(e) => setTagName(e.target.value)}
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
                      setSlug('nirbachon');
                      showToast('Slug সিঙ্ক করা হলো!');
                    }}
                    className="absolute right-2.5 text-slate-400 hover:text-purple-600 cursor-pointer"
                  >
                    <RotateCw size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700 font-bold text-xs">Description <span className="text-slate-400 font-normal">(Optional)</span></label>
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
                onClick={() => showToast('AI দ্বারা সকল অনুবাদ সম্পন্ন হলো!')}
                className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-extrabold px-3 py-1 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <Sparkles size={13} />
                <span>AI Translate All</span>
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

          {/* Section 3: 3. Additional Settings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              3. Additional Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Tag Icon <span className="text-slate-400 font-normal">(Optional)</span></label>
                <div className="flex items-center gap-1.5">
                  {['🏷', '🏛', '🗳', '📊', '📰'].map((ic, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedIcon(ic)}
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center text-sm cursor-pointer ${selectedIcon === ic ? 'border-purple-600 bg-purple-50' : 'border-slate-200 bg-slate-50'}`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => showToast('আইকন আপলোড করা হলো!')}
                  className="mt-2 text-[10px] font-bold text-slate-600 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Upload size={12} /> Upload Icon
                </button>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Tag Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
                <span className="text-[9.5px] text-slate-400 font-semibold block mt-0.5">Higher priority tags will be shown first.</span>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer font-bold text-emerald-700"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: 4. AI Generated Suggestions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Sparkles size={16} className="text-purple-600" />
                <span>4. AI Generated Suggestions</span>
              </h3>

              <button
                type="button"
                onClick={() => showToast('সকল সাজেশন রি-জেনারেট করা হলো!')}
                className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
              >
                <RotateCw size={12} /> Regenerate All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-semibold">
              <div className="p-3 rounded-xl bg-purple-50/30 border border-purple-200/60 space-y-1.5">
                <h5 className="font-bold text-purple-900 text-xs flex items-center gap-1">
                  <span>Related Tags</span>
                  <span className="text-[9px] text-purple-600 font-black">AI</span>
                </h5>
                <div className="flex flex-wrap gap-1">
                  {['ভোট', 'নির্বাচনী প্রচার', 'প্রার্থী', 'ভোটগ্রহণ', 'ফলাফল'].map((t, i) => (
                    <span key={i} className="bg-white border border-purple-200 text-purple-800 text-[9px] font-bangla px-1.5 py-0.2 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/30 border border-purple-200/60 space-y-1.5">
                <h5 className="font-bold text-purple-900 text-xs flex items-center gap-1">
                  <span>SEO Title</span>
                  <span className="text-[9px] text-purple-600 font-black">AI</span>
                </h5>
                <p className="text-[10.5px] font-bangla text-slate-800 font-bold leading-tight">
                  নির্বাচন | সর্বশেষ নির্বাচন সংবাদ ও আপডেট
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/30 border border-purple-200/60 space-y-1.5">
                <h5 className="font-bold text-purple-900 text-xs flex items-center gap-1">
                  <span>Meta Description</span>
                  <span className="text-[9px] text-purple-600 font-black">AI</span>
                </h5>
                <p className="text-[10px] font-bangla text-slate-700 leading-tight">
                  নির্বাচন সম্পর্কিত সর্বশেষ খবর, বিশ্লেষণ, ফলাফল ও আপডেট পেতে আমাদের সাথে থাকুন।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/30 border border-purple-200/60 space-y-1.5">
                <h5 className="font-bold text-purple-900 text-xs flex items-center gap-1">
                  <span>Focus Keywords</span>
                  <span className="text-[9px] text-purple-600 font-black">AI</span>
                </h5>
                <div className="flex flex-wrap gap-1">
                  {['নির্বাচন', 'ভোট', 'প্রচার', 'প্রার্থী', 'ফলাফল'].map((t, i) => (
                    <span key={i} className="bg-white border border-purple-200 text-purple-800 text-[9px] font-bangla px-1.5 py-0.2 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column Side Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* 1. AI Suggestions Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">AI Suggestions Preview</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">AI has analyzed your tag and generated the following suggestions.</p>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Related Tags</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => showToast('সকল সম্পর্কিত ট্যাগ গ্রহণ করা হলো!')} className="text-[10px] text-purple-700 font-extrabold hover:underline">Accept All</button>
                    <button type="button" className="text-slate-400 hover:text-purple-600"><RotateCw size={11} /></button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['ভোট', 'নির্বাচনী প্রচার', 'প্রার্থী', 'ভোটগ্রহণ', 'ফলাফল'].map((t, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 text-[9.5px] font-bangla px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">SEO Title</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => showToast('SEO টাইটেল গ্রহণ করা হলো!')} className="text-[10px] text-purple-700 font-extrabold hover:underline">Accept</button>
                    <button type="button" className="text-slate-400 hover:text-purple-600"><RotateCw size={11} /></button>
                  </div>
                </div>
                <p className="text-[11px] font-bangla text-slate-700 font-bold">
                  নির্বাচন | সর্বশেষ নির্বাচন সংবাদ ও আপডেট
                </p>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Meta Description</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => showToast('মেটা ডেসক্রিপশন গ্রহণ করা হলো!')} className="text-[10px] text-purple-700 font-extrabold hover:underline">Accept</button>
                    <button type="button" className="text-slate-400 hover:text-purple-600"><RotateCw size={11} /></button>
                  </div>
                </div>
                <p className="text-[10.5px] font-bangla text-slate-600">
                  নির্বাচন সম্পর্কিত সর্বশেষ খবর, বিশ্লেষণ, ফলাফল ও আপডেট পেতে আমাদের সাথে থাকুন।
                </p>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Focus Keywords</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => showToast('ফোকাস কিওয়ার্ডস গ্রহণ করা হলো!')} className="text-[10px] text-purple-700 font-extrabold hover:underline">Accept All</button>
                    <button type="button" className="text-slate-400 hover:text-purple-600"><RotateCw size={11} /></button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['নির্বাচন', 'ভোট', 'নির্বাচনী প্রচার', 'প্রার্থী', 'ফলাফল'].map((t, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 text-[9.5px] font-bangla px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Tag Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">Tag Preview</h3>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${previewDevice === 'desktop' ? 'bg-purple-600 text-white font-black' : 'text-slate-500'}`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${previewDevice === 'mobile' ? 'bg-purple-600 text-white font-black' : 'text-slate-500'}`}
                >
                  Mobile
                </button>
              </div>
            </div>

            {/* Tag Visual Box */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/60 space-y-2">
              <span className="bg-purple-700 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full inline-block font-bangla">
                {tagName || 'নির্বাচন'}
              </span>
              <h4 className="font-bangla font-black text-slate-900 text-base">{tagName || 'নির্বাচন'}</h4>
              <p className="text-xs font-bangla text-slate-600 leading-snug">{description}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-1">
                <span>248 posts</span>
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
                  <path className="text-emerald-500" strokeWidth="3.5" strokeDasharray="92, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-base font-black text-slate-900 font-mono">92%</span>
                  <span className="text-[8px] font-black text-emerald-600 block uppercase">Excellent</span>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-1 text-xs font-semibold text-slate-700 grid grid-cols-2 gap-x-2">
                <div className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={13} /> <span>Name</span></div>
                <div className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={13} /> <span>Translations</span></div>
                <div className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={13} /> <span>Slug</span></div>
                <div className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={13} /> <span>Description</span></div>
                <div className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={13} /> <span>SEO</span></div>
                <div className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={13} /> <span>Related Tags</span></div>
              </div>
            </div>

            <p className="text-[10.5px] text-emerald-700 font-extrabold flex items-center gap-1 pt-2 border-t border-slate-100">
              <Sparkles size={12} className="text-emerald-600" />
              <span>Great! Your tag is optimized and ready to publish.</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
