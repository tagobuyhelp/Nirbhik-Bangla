import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  ChevronRight,
  UploadCloud,
  CheckCircle2,
  Play,
  Sparkles,
  Link as LinkIcon,
  Radio,
  FileText,
  Tag,
  ListOrdered,
  Eye,
  Sliders,
  Check,
  Save,
  RotateCw,
  ArrowLeft,
  Image as ImageIcon,
  MessageSquare,
  Globe,
  Languages,
  Film,
  Layers,
} from 'lucide-react';

export default function CreateVideoPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  // 1. Source Selection State
  const [sourceType, setSourceType] = useState('upload'); // 'upload', 'yt_single', 'yt_playlist', 'yt_live', 'fb', 'url'

  // 2. Video Info State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [category, setCategory] = useState('');
  const [playlist, setPlaylist] = useState('');
  const [tags, setTags] = useState(['সংবাদ', 'নির্ভীক বাংলা']);
  const [tagInput, setTagInput] = useState('');
  const [ytUrl, setYtUrl] = useState('');

  // 4. Additional Settings State
  const [visibility, setVisibility] = useState('Public');
  const [ageRestriction, setAgeRestriction] = useState("No, it's not made for kids");
  const [commentsPolicy, setCommentsPolicy] = useState('Allow all comments');
  const [embeddable, setEmbeddable] = useState(true);
  const [addToFeatured, setAddToFeatured] = useState(true);
  const [sendNotification, setSendNotification] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    showToast('ভিডিওটি সফলভাবে আপলোড ও ড্রাফট/পাবলিশ করা হয়েছে!');
    setTimeout(() => {
      navigate('/videos');
    }, 1500);
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
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
        <Link to="/videos" className="hover:text-slate-900 transition-colors">
          Videos
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-extrabold">Add New Video</span>
      </div>

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Video size={22} className="text-purple-600" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-outfit">
              Add New Video
            </h1>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Upload a new video or import from YouTube and publish on your platform.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => showToast('ভিডিওটি ড্রাফট হিসেবে সেভ করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <CheckCircle2 size={15} />
            <span>Publish Video</span>
          </button>
        </div>
      </div>

      {/* Section 1: 1. Select Video Source */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
          1. Select Video Source
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs font-semibold">
          {/* Card 1 */}
          <button
            type="button"
            onClick={() => setSourceType('upload')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer ${
              sourceType === 'upload' ? 'border-[#eb1c24] bg-red-50/40 shadow-xs' : 'border-slate-200/80 bg-slate-50/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <UploadCloud size={16} />
              </div>
              <input type="radio" checked={sourceType === 'upload'} readOnly className="text-[#eb1c24]" />
            </div>
            <div>
              <h5 className="font-black text-slate-900 text-xs">Upload Video</h5>
              <p className="text-[10px] text-slate-400 font-medium">Upload from device</p>
            </div>
          </button>

          {/* Card 2 */}
          <button
            type="button"
            onClick={() => setSourceType('yt_single')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer ${
              sourceType === 'yt_single' ? 'border-[#eb1c24] bg-red-50/40 shadow-xs' : 'border-slate-200/80 bg-slate-50/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-black">
                ▶
              </div>
              <input type="radio" checked={sourceType === 'yt_single'} readOnly className="text-[#eb1c24]" />
            </div>
            <div>
              <h5 className="font-black text-slate-900 text-xs">YouTube Video</h5>
              <p className="text-[10px] text-slate-400 font-medium">Import single video</p>
            </div>
          </button>

          {/* Card 3 */}
          <button
            type="button"
            onClick={() => setSourceType('yt_playlist')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer ${
              sourceType === 'yt_playlist' ? 'border-[#eb1c24] bg-red-50/40 shadow-xs' : 'border-slate-200/80 bg-slate-50/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-black">
                ≡
              </div>
              <input type="radio" checked={sourceType === 'yt_playlist'} readOnly className="text-[#eb1c24]" />
            </div>
            <div>
              <h5 className="font-black text-slate-900 text-xs">YouTube Playlist</h5>
              <p className="text-[10px] text-slate-400 font-medium">Import playlist</p>
            </div>
          </button>

          {/* Card 4 */}
          <button
            type="button"
            onClick={() => setSourceType('yt_live')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer ${
              sourceType === 'yt_live' ? 'border-[#eb1c24] bg-red-50/40 shadow-xs' : 'border-slate-200/80 bg-slate-50/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <Radio size={16} />
              </div>
              <input type="radio" checked={sourceType === 'yt_live'} readOnly className="text-[#eb1c24]" />
            </div>
            <div>
              <h5 className="font-black text-slate-900 text-xs">YouTube Live</h5>
              <p className="text-[10px] text-slate-400 font-medium">Import live stream</p>
            </div>
          </button>

          {/* Card 5 */}
          <button
            type="button"
            onClick={() => setSourceType('fb')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer ${
              sourceType === 'fb' ? 'border-[#eb1c24] bg-red-50/40 shadow-xs' : 'border-slate-200/80 bg-slate-50/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                f
              </div>
              <input type="radio" checked={sourceType === 'fb'} readOnly className="text-[#eb1c24]" />
            </div>
            <div>
              <h5 className="font-black text-slate-900 text-xs">Facebook Video</h5>
              <p className="text-[10px] text-slate-400 font-medium">Import from Facebook</p>
            </div>
          </button>

          {/* Card 6 */}
          <button
            type="button"
            onClick={() => setSourceType('url')}
            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer ${
              sourceType === 'url' ? 'border-[#eb1c24] bg-red-50/40 shadow-xs' : 'border-slate-200/80 bg-slate-50/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <LinkIcon size={16} />
              </div>
              <input type="radio" checked={sourceType === 'url'} readOnly className="text-[#eb1c24]" />
            </div>
            <div>
              <h5 className="font-black text-slate-900 text-xs">External URL</h5>
              <p className="text-[10px] text-slate-400 font-medium">Import from URL</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split (Left 8 Cols Form & Right 4 Cols Side Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Middle 2-Column Split: 2A. Upload Video & 2B. Import from YouTube */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 2A. Upload Video Panel */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
                2A. Upload Video
              </h3>

              {/* Dashed Drop Zone */}
              <div className="border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-2xs">
                  <UploadCloud size={24} />
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-700 block">Drag & drop your video file here</span>
                  <span className="text-[10px] text-slate-400 block">or</span>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('ভিডিও ফাইল নির্বাচন করুন!')}
                  className="px-4 py-2 bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Choose File
                </button>

                <p className="text-[9.5px] text-slate-400 font-medium">
                  MP4, MOV, AVI, WEBM (Max: 5GB)
                </p>
              </div>

              {/* Video Information Form */}
              <div className="space-y-3.5 text-xs font-semibold pt-2">
                <div className="font-extrabold text-slate-900 text-xs border-b border-slate-100 pb-1">
                  Video Information
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-700 font-bold">Title <span className="text-red-500">*</span></label>
                    <span className="text-[10px] text-slate-400 font-mono">{videoTitle.length}/100</span>
                  </div>
                  <input
                    type="text"
                    maxLength={100}
                    placeholder="Enter video title..."
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-700 font-bold">Description <span className="text-red-500">*</span></label>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoDesc('নির্ভীক বাংলা এর বিশেষ সংবাদ বুলেটিন। দেশের সর্বশেষ ঘটে যাওয়া গুরুত্বপূর্ণ খবরাখবর জানতে চ্যানেলটি সাবস্ক্রাইব করে সাথেই থাকুন।');
                        showToast('AI ডেসক্রিপশন জেনারেট করা হয়েছে!');
                      }}
                      className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md hover:bg-purple-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles size={11} />
                      <span>AI Generate</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={5000}
                    placeholder="Enter video description..."
                    value={videoDesc}
                    onChange={(e) => setVideoDesc(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] resize-none font-bangla"
                  />
                  <div className="text-right text-[9.5px] text-slate-400 font-mono mt-0.5">{videoDesc.length}/5000</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Category <span className="text-red-500">*</span></label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                    >
                      <option value="">Select category</option>
                      <option value="news">সংবাদ</option>
                      <option value="talk_show">টক শো</option>
                      <option value="sports">খেলাধুলা</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Playlist</label>
                    <select
                      value={playlist}
                      onChange={(e) => setPlaylist(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                    >
                      <option value="">Select playlist (optional)</option>
                      <option value="bulletin">ডেইলি বুলেটিন</option>
                      <option value="special">বিশেষ বুলেটিন</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 items-start">
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Tags</label>
                    <input
                      type="text"
                      placeholder="Add tags and press Enter..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Thumbnail</label>
                    <div className="border border-dashed border-purple-200 bg-purple-50/40 p-2.5 rounded-xl text-center cursor-pointer hover:bg-purple-50 transition-colors">
                      <ImageIcon size={16} className="mx-auto text-purple-600 mb-1" />
                      <span className="text-[10px] font-bold text-purple-700 block">Upload Custom Thumbnail</span>
                      <span className="text-[9px] text-slate-400 block font-medium">or ✨ Auto Generate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2B. Import from YouTube Panel */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
                2B. Import from YouTube
              </h3>

              <div className="space-y-3 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">YouTube URL <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Paste YouTube video URL here..."
                      value={ytUrl}
                      onChange={(e) => setYtUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                    />
                    <button
                      type="button"
                      onClick={() => showToast('ইউটিউব থেকে ভিডিও তথ্য ফেচ করা হচ্ছে...')}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-xs cursor-pointer"
                    >
                      Import
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-900 block">How to get YouTube URL?</span>
                  <ul className="space-y-0.5 font-medium text-slate-500 text-[10px]">
                    <li>• Go to YouTube and open the video.</li>
                    <li>• Copy the video URL from address bar.</li>
                    <li>• Paste the URL above and click Import.</li>
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">Example URL</span>
                  <div className="p-2 bg-slate-100 rounded-xl font-mono text-[10px] text-slate-600 truncate border border-slate-200/60">
                    https://www.youtube.com/watch?v=dQw4w9WgXcQ
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="font-extrabold text-slate-900 text-xs block">Video Details (Auto Fetched)</span>

                  <div className="space-y-1.5 text-[11px] text-slate-500 font-medium">
                    <div className="flex justify-between"><span>Title</span><span className="font-bold text-slate-800">--</span></div>
                    <div className="flex justify-between"><span>Channel</span><span className="font-bold text-slate-800">--</span></div>
                    <div className="flex justify-between"><span>Duration</span><span className="font-mono font-bold text-slate-800">--</span></div>
                    <div className="flex justify-between"><span>Published At</span><span className="font-bold text-slate-800">--</span></div>
                    <div className="flex justify-between"><span>Views</span><span className="font-mono font-bold text-slate-800">--</span></div>
                    <div className="flex justify-between"><span>Description</span><span className="font-bold text-slate-800">--</span></div>
                    <div className="flex justify-between items-center">
                      <span>Thumbnail</span>
                      <div className="w-16 h-10 bg-slate-200 rounded-lg shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Section 3: 3. AI Features */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              3. AI Features
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs font-semibold">
              <button onClick={() => showToast('AI টাইটেল জেনারেট হচ্ছে...')} type="button" className="p-3 rounded-2xl bg-purple-50/50 hover:bg-purple-100/60 border border-purple-200/70 text-left space-y-1 transition-all cursor-pointer">
                <Sparkles size={16} className="text-purple-600" />
                <h5 className="font-bold text-purple-900 text-[11px]">AI Title Suggestion</h5>
                <p className="text-[9px] text-purple-600 font-medium">Get better title ideas</p>
              </button>

              <button onClick={() => showToast('AI ডেসক্রিপশন জেনারেট হচ্ছে...')} type="button" className="p-3 rounded-2xl bg-emerald-50/50 hover:bg-emerald-100/60 border border-emerald-200/70 text-left space-y-1 transition-all cursor-pointer">
                <FileText size={16} className="text-emerald-600" />
                <h5 className="font-bold text-emerald-900 text-[11px]">AI Description</h5>
                <p className="text-[9px] text-emerald-600 font-medium">Generate SEO friendly</p>
              </button>

              <button onClick={() => showToast('AI ট্যাগস যুক্ত করা হচ্ছে...')} type="button" className="p-3 rounded-2xl bg-amber-50/50 hover:bg-amber-100/60 border border-amber-200/70 text-left space-y-1 transition-all cursor-pointer">
                <Tag size={16} className="text-amber-600" />
                <h5 className="font-bold text-amber-900 text-[11px]">AI Tags</h5>
                <p className="text-[9px] text-amber-600 font-medium">Get relevant tags</p>
              </button>

              <button onClick={() => showToast('AI চ্যাপ্টার তৈরি হচ্ছে...')} type="button" className="p-3 rounded-2xl bg-blue-50/50 hover:bg-blue-100/60 border border-blue-200/70 text-left space-y-1 transition-all cursor-pointer">
                <ListOrdered size={16} className="text-blue-600" />
                <h5 className="font-bold text-blue-900 text-[11px]">AI Chapters</h5>
                <p className="text-[9px] text-blue-600 font-medium">Auto generate chapters</p>
              </button>

              <button onClick={() => showToast('AI সাবটাইটেল তৈরি হচ্ছে...')} type="button" className="p-3 rounded-2xl bg-rose-50/50 hover:bg-rose-100/60 border border-rose-200/70 text-left space-y-1 transition-all cursor-pointer">
                <MessageSquare size={16} className="text-rose-600" />
                <h5 className="font-bold text-rose-900 text-[11px]">AI Captions</h5>
                <p className="text-[9px] text-rose-600 font-medium">Generate subtitles</p>
              </button>

              <button onClick={() => showToast('অনুবাদ টুল চালু করা হচ্ছে...')} type="button" className="p-3 rounded-2xl bg-indigo-50/50 hover:bg-indigo-100/60 border border-indigo-200/70 text-left space-y-1 transition-all cursor-pointer">
                <Globe size={16} className="text-indigo-600" />
                <h5 className="font-bold text-indigo-900 text-[11px]">Translation</h5>
                <p className="text-[9px] text-indigo-600 font-medium">Bangla, English, Hindi</p>
              </button>
            </div>
          </div>

          {/* Section 4: 4. Additional Settings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              4. Additional Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Visibility</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Unlisted">Unlisted</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Age Restriction</label>
                <select
                  value={ageRestriction}
                  onChange={(e) => setAgeRestriction(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="No, it's not made for kids">No, it's not made for kids</option>
                  <option value="Yes, restrict to 18+">Yes, restrict to 18+</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Comments</label>
                <select
                  value={commentsPolicy}
                  onChange={(e) => setCommentsPolicy(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Allow all comments">Allow all comments</option>
                  <option value="Hold for review">Hold for review</option>
                  <option value="Disable comments">Disable comments</option>
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addToFeatured}
                    onChange={(e) => setAddToFeatured(e.target.checked)}
                    className="rounded border-slate-300 text-purple-600"
                  />
                  <span>Add to Featured Section</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendNotification}
                    onChange={(e) => setSendNotification(e.target.checked)}
                    className="rounded border-slate-300 text-purple-600"
                  />
                  <span>Send Push Notification</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span>Embeddable</span>
                <button
                  type="button"
                  onClick={() => setEmbeddable(!embeddable)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${embeddable ? 'bg-purple-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${embeddable ? 'right-0.75' : 'left-0.75'}`} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column Preview & AI Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* 1. Video Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Video Preview
            </h3>

            <div className="relative rounded-2xl overflow-hidden shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"
                alt="Video Preview"
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#eb1c24] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                  <Play size={20} className="ml-1" fill="white" />
                </div>
              </div>

              <span className="absolute top-2 left-2 bg-[#eb1c24] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                LIVE
              </span>
              <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                02:35:28
              </span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-600 pt-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Duration:</span>
                <span className="font-mono font-bold text-slate-900">02:35:28</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Resolution:</span>
                <span className="font-mono font-bold text-slate-900">1920 x 1080</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Format:</span>
                <span className="font-bold text-slate-900">MP4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Size:</span>
                <span className="font-mono font-bold text-slate-900">350 MB</span>
              </div>
            </div>
          </div>

          {/* 2. AI & SEO Assistant Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">AI & SEO Assistant</h3>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2 py-0.5 rounded-md font-mono">
                85/100
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                <span>SEO Score</span>
                <span className="text-emerald-600 font-mono">85/100</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
              </div>
            </div>

            <ul className="space-y-1.5 text-xs font-bold text-slate-700 pt-1">
              <li className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={14} />
                <span className="text-slate-800 font-semibold">Title is optimized</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={14} />
                <span className="text-slate-800 font-semibold">Description is good</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={14} />
                <span className="text-slate-800 font-semibold">Tags are relevant</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={14} />
                <span className="text-slate-800 font-semibold">Thumbnail is optimized</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={14} />
                <span className="text-slate-800 font-semibold">Category is selected</span>
              </li>
            </ul>

            <button
              onClick={() => showToast('AI দিয়ে ভিডিও SEO রিফাইন করা হলো!')}
              className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold rounded-xl transition-colors cursor-pointer text-xs flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Improve with AI</span>
              <Sparkles size={14} />
            </button>
          </div>

          {/* 3. Quick Actions Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Quick Actions
            </h3>

            <div className="space-y-2 text-xs font-bold text-slate-700">
              <button
                onClick={() => showToast('ড্রাফট হিসেবে সেভ করা হয়েছে!')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Save size={15} className="text-purple-600" />
                <span>Save as Draft</span>
              </button>

              <button
                onClick={() => showToast('ভিডিও প্রিভিউ মোডাল চালু করা হলো!')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Play size={15} className="text-purple-600" />
                <span>Preview Video</span>
              </button>

              <Link
                to="/videos"
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer block"
              >
                <Film size={15} className="text-purple-600" />
                <span>Go to Videos</span>
              </Link>

              <button
                onClick={() => showToast('ইউটিউব চ্যানেল সিঙ্ক সম্পন্ন হয়েছে!')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCw size={15} className="text-purple-600" />
                <span>YouTube Channel Sync</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
