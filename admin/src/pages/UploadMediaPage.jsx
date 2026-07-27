import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X,
  RotateCw,
  Image as ImageIcon,
  FileText,
  Tag,
  Folder,
  Calendar,
  Globe,
  Sliders,
  Check,
  Lightbulb,
  Save,
  ArrowLeft,
  Search,
  Zap,
  Eye,
  Info,
} from 'lucide-react';

export default function UploadMediaPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  // File Upload State
  const [fileUploaded, setFileUploaded] = useState(true);
  const [fileName, setFileName] = useState('kolkata-howrah-bridge-sunset.jpg');
  const [fileSize, setFileSize] = useState('1.45 MB');
  const [resolution, setResolution] = useState('1920 x 1080');

  // Basic Info State
  const [title, setTitle] = useState('হাউড়া ব্রিজে সূর্যাস্তের দৃশ্য');
  const [fileType, setFileType] = useState('Image (JPG)');
  const [folder, setFolder] = useState('Uncategorized');
  const [caption, setCaption] = useState('হাউড়া ব্রিজে গঙ্গার উপর সূর্যাস্তের মনোরম দৃশ্য।');
  const [credit, setCredit] = useState('Nirbhik Bangla Team');
  const [location, setLocation] = useState('Howrah, West Bengal, India');

  // AI Content State
  const [altText, setAltText] = useState('হাউড়া ব্রিজে গঙ্গার উপর সূর্যাস্তের দৃশ্য');
  const [aiDesc, setAiDesc] = useState('হাউড়া ব্রিজের উপর সূর্যাস্তের দারুণ দৃশ্য। গঙ্গার উপর সূর্যের আলপনা আভা পড়ে চারপাশকে সুন্দর করে তুলেছে।');
  const [seoFileName, setSeoFileName] = useState('howrah-bridge-sunset-kolkata.jpg');
  const [socialCaption, setSocialCaption] = useState('হাউড়া ব্রিজে সূর্যাস্তের অপরূপ সৌন্দর্য্য 🌅');
  const [focusKeyword, setFocusKeyword] = useState('howrah bridge sunset');
  const [tags, setTags] = useState(['হাউড়া ব্রিজ', 'সূর্যাস্ত', 'গঙ্গা', 'কলকাতা', 'পশ্চিমবঙ্গ', 'ভারত', 'ব্রিজ', 'নদী']);

  // Advanced Settings State
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Active');
  const [access, setAccess] = useState('Public');
  const [priority, setPriority] = useState('Medium');

  // Preview Tab
  const [previewTab, setPreviewTab] = useState('preview');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast('মিডিয়া ফাইলটি সফলভাবে আপলোড ও অপটিমাইজ করা হয়েছে!');
    setTimeout(() => {
      navigate('/media');
    }, 1500);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
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
        <Link to="/media" className="hover:text-slate-900 transition-colors">
          Media Library
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-extrabold">Upload New</span>
      </div>

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
              Upload New Media
            </h1>
            <span className="bg-purple-100 text-purple-700 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={12} />
              <span>AI Powered</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Upload images, videos, documents or audio files. AI will analyze and optimize for you.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <Link
            to="/media"
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Media Library</span>
          </Link>

          <button
            type="button"
            onClick={() => showToast('মিডিয়া ফাইলটি ড্রাফট সেভ করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <UploadCloud size={15} />
            <span>Upload & Save</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column Form Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section 1: 1. Upload Files */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <UploadCloud size={16} className="text-purple-600" />
              <span>1. Upload Files</span>
            </h3>

            {/* Dashed Drop Zone */}
            <div className="border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-purple-50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-2xs">
                <UploadCloud size={24} />
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700">
                  Drag & drop files here or <span className="text-purple-700 underline font-extrabold">click to browse</span>
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Supports: JPG, PNG, WEBP, GIF, MP4, WebM, PDF, MP3 • Max file size: 50MB
                </span>
              </div>
            </div>

            {/* File Uploaded Preview Item */}
            {fileUploaded && (
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=150&q=80"
                    alt="Upload Preview"
                    className="w-14 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h5 className="font-mono font-bold text-slate-900 text-xs">{fileName}</h5>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                      <span>{fileSize}</span>
                      <span>•</span>
                      <span>{resolution}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFileUploaded(false)}
                  className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-slate-200/60 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Section 2: 2. Basic Information */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              2. Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">Title <span className="text-red-500">*</span></label>
                  <span className="text-[10px] text-slate-400 font-mono">{title.length}/200</span>
                </div>
                <input
                  type="text"
                  maxLength={200}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">File Type</label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Image (JPG)">Image (JPG)</option>
                  <option value="Image (PNG)">Image (PNG)</option>
                  <option value="Image (WEBP)">Image (WEBP)</option>
                  <option value="Video (MP4)">Video (MP4)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Folder</label>
                <select
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Uncategorized">Uncategorized</option>
                  <option value="News Images">News Images</option>
                  <option value="Banners">Banners</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold items-start pt-1">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">Caption</label>
                  <span className="text-[10px] text-slate-400 font-mono">{caption.length}/500</span>
                </div>
                <textarea
                  rows={2}
                  maxLength={500}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] resize-none font-bangla"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Credit / Source</label>
                <input
                  type="text"
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Location <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: 3. AI Generated Content */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Sparkles size={16} className="text-purple-600" />
              <span>3. AI Generated Content</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              {/* Field 1: Alt Text */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold">Alt Text (Alternative Text)</label>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24] font-bangla"
                />
                <button type="button" onClick={() => showToast('AI Alt Text রি-জেনারেট করা হলো!')} className="text-[10px] text-purple-700 font-bold flex items-center gap-1 hover:underline pt-0.5">
                  <RotateCw size={10} /> Regenerate
                </button>
              </div>

              {/* Field 2: AI Description */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold">AI Description</label>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
                <input
                  type="text"
                  value={aiDesc}
                  onChange={(e) => setAiDesc(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24] font-bangla"
                />
                <button type="button" onClick={() => showToast('AI ডেসক্রিপশন রি-জেনারেট করা হলো!')} className="text-[10px] text-purple-700 font-bold flex items-center gap-1 hover:underline pt-0.5">
                  <RotateCw size={10} /> Regenerate
                </button>
              </div>

              {/* Field 3: Image Tags */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold">Image Tags / Keywords</label>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
                <div className="p-2 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-wrap gap-1 max-h-16 overflow-y-auto custom-scrollbar">
                  {tags.map((t, idx) => (
                    <span key={idx} className="bg-purple-50 text-purple-700 border border-purple-200 text-[9px] font-bangla font-black px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                      {t}
                      <button type="button" onClick={() => removeTag(t)} className="hover:text-red-600"><X size={8} /></button>
                    </span>
                  ))}
                </div>
                <button type="button" onClick={() => showToast('AI কিওয়ার্ডস রি-জেনারেট করা হলো!')} className="text-[10px] text-purple-700 font-bold flex items-center gap-1 hover:underline pt-0.5">
                  <RotateCw size={10} /> Regenerate
                </button>
              </div>

              {/* Field 4: SEO File Name */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold">SEO File Name</label>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
                <input
                  type="text"
                  value={seoFileName}
                  onChange={(e) => setSeoFileName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] font-mono outline-none focus:border-[#eb1c24]"
                />
                <button type="button" onClick={() => showToast('SEO ফাইল নাম রি-জেনারেট করা হলো!')} className="text-[10px] text-purple-700 font-bold flex items-center gap-1 hover:underline pt-0.5">
                  <RotateCw size={10} /> Regenerate
                </button>
              </div>

              {/* Field 5: Image Caption (Social Media) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold">Image Caption (Social Media)</label>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
                <input
                  type="text"
                  value={socialCaption}
                  onChange={(e) => setSocialCaption(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24] font-bangla"
                />
                <button type="button" onClick={() => showToast('সোশ্যাল মিডিয়া ক্যাপশন রি-জেনারেট করা হলো!')} className="text-[10px] text-purple-700 font-bold flex items-center gap-1 hover:underline pt-0.5">
                  <RotateCw size={10} /> Regenerate
                </button>
              </div>

              {/* Field 6: Focus Keyword */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold">Focus Keyword</label>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24]"
                />
                <button type="button" onClick={() => showToast('ফোকাস কিওয়ার্ড রি-জেনারেট করা হলো!')} className="text-[10px] text-purple-700 font-bold flex items-center gap-1 hover:underline pt-0.5">
                  <RotateCw size={10} /> Regenerate
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: 4. Advanced Settings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              4. Advanced Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="news">সংবাদ</option>
                  <option value="events">অনুষ্ঠান</option>
                </select>
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

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Access</label>
                <select
                  value={access}
                  onChange={(e) => setAccess(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
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
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Publish Date <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="datetime-local"
                  className="w-full px-2 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] text-[11px]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column Side Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* 1. AI Media Tools Card (BETA) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Sparkles size={16} className="text-purple-600" />
                <span>AI Media Tools</span>
              </h3>
              <span className="bg-purple-100 text-purple-700 text-[9px] font-black px-1.5 py-0.2 rounded">BETA</span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2">
                  <FileText size={15} className="text-purple-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Auto Alt Text</h5>
                    <p className="text-[9.5px] text-slate-400 font-medium">Generate alt text for images</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">New</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2">
                  <ImageIcon size={15} className="text-purple-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Image Optimization</h5>
                    <p className="text-[9.5px] text-slate-400 font-medium">Optimize size, quality & format</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">New</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2">
                  <Zap size={15} className="text-purple-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Smart Compression</h5>
                    <p className="text-[9.5px] text-slate-400 font-medium">Reduce file size without quality loss</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">New</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2">
                  <Eye size={15} className="text-purple-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Face & Object Detection</h5>
                    <p className="text-[9.5px] text-slate-400 font-medium">Detect faces, objects & scenes</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">New</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2">
                  <Sliders size={15} className="text-purple-600" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Color & Quality Enhancement</h5>
                    <p className="text-[9.5px] text-slate-400 font-medium">Enhance colors and clarity</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">New</span>
              </div>
            </div>

            <button
              onClick={() => showToast('AI অ্যানালাইসিস শুরু করা হয়েছে!')}
              className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1 mt-1 border border-purple-200"
            >
              <Sparkles size={14} />
              <span>Analyze This Media</span>
            </button>
          </div>

          {/* 2. Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">Preview</h3>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setPreviewTab('preview')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${previewTab === 'preview' ? 'bg-purple-600 text-white font-black' : 'text-slate-500'}`}
                >
                  Image Preview
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('info')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${previewTab === 'info' ? 'bg-purple-600 text-white font-black' : 'text-slate-500'}`}
                >
                  File Info
                </button>
              </div>
            </div>

            {/* Image Preview Window */}
            <div className="relative rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=600&q=80"
                alt="Howrah Bridge Sunset"
                className="w-full h-44 object-cover"
              />
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-600 pt-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Dimensions</span>
                <span className="font-mono font-bold text-slate-900">{resolution}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">File Size</span>
                <span className="font-mono font-bold text-slate-900">{fileSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Format</span>
                <span className="font-bold text-slate-900">JPG</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Aspect Ratio</span>
                <span className="font-mono font-bold text-slate-900">16:9</span>
              </div>
            </div>
          </div>

          {/* 3. Upload Tips Card */}
          <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/80 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-extrabold text-amber-900">
              <Lightbulb size={16} className="text-amber-600" />
              <span>Upload Tips</span>
            </div>

            <ul className="space-y-1.5 font-semibold text-amber-950 text-[11px]">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600">•</span>
                <span>Use high quality images for better results.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600">•</span>
                <span>Recommended size: 1200px or more width.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600">•</span>
                <span>Use descriptive titles and alt text for SEO.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600">•</span>
                <span>WebP format is recommended for web.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
