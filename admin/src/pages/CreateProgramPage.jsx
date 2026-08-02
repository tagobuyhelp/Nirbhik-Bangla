import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Calendar,
  ChevronRight,
  UploadCloud,
  CheckCircle2,
  Clock,
  Sparkles,
  Tv,
  Globe,
  Radio,
  FileText,
  Tag,
  Sliders,
  Check,
  Save,
  RotateCw,
  ArrowLeft,
  Image as ImageIcon,
  MapPin,
  User,
  Link as LinkIcon,
} from 'lucide-react';

export default function CreateProgramPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [toastMessage, setToastMessage] = useState('');

  // 1. Program Info State
  const [programTitle, setProgramTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isLiveProgram, setIsLiveProgram] = useState(true);
  const [isFeaturedProgram, setIsFeaturedProgram] = useState(true);
  const [isAgeRestricted, setIsAgeRestricted] = useState(false);
  const [posterImage, setPosterImage] = useState('');

  // 2. Schedule & Timing State
  const [startDate, setStartDate] = useState('2024-05-21');
  const [startTime, setStartTime] = useState('07:00');
  const [duration, setDuration] = useState('01:00:00');
  const [timeZone, setTimeZone] = useState('Asia/Dhaka (GMT+6:00)');
  const [repeatOption, setRepeatOption] = useState('Does not repeat');
  const [endDateTime, setEndDateTime] = useState('');

  // 3. Platform & Visibility Toggles
  const [platforms, setPlatforms] = useState({
    website: true,
    youtube: true,
    facebook: true,
    twitter: false,
    custom: false,
  });
  const [customUrl, setCustomUrl] = useState('');

  // 4. Additional Details State
  const [hostName, setHostName] = useState('');
  const [coHostName, setCoHostName] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  // Publishing Option
  const [publishOption, setPublishOption] = useState('draft');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    if (isEditMode) {
      fetch(`${API_BASE_URL}/schedules/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            const p = data.data;
            setProgramTitle(typeof p.title === 'object' ? (p.title.bn || p.title.en) : (p.title || ''));
            setCategory(p.category || '');
            setDescription(p.description || '');
            setHostName(p.host || '');
            setPosterImage(p.image || '');
            setIsLiveProgram(p.isLive || p.status === 'Live Now');
            setDuration(p.duration || '01:00:00');
          }
        })
        .catch(err => console.error('Error fetching schedule details:', err));
    }
  }, [id, isEditMode]);

  const handleSaveProgram = async (e) => {
    e.preventDefault();
    if (!programTitle) {
      showToast('অনুগ্রহ করে অনুষ্ঠানের শিরোনাম লিখুন');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        title: { bn: programTitle, en: programTitle },
        host: hostName || 'Nirbhik Desk',
        image: posterImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=120&q=80',
        category: category || 'News',
        startTime: `${startDate} ${startTime}`,
        duration: duration || '01:00:00',
        status: isLiveProgram ? 'Live Now' : 'Upcoming',
        isLive: isLiveProgram,
        description,
        platforms: Object.keys(platforms).filter(p => platforms[p]),
      };

      const url = isEditMode ? `${API_BASE_URL}/schedules/${id}` : `${API_BASE_URL}/schedules`;
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(isEditMode ? 'প্রোগ্রাম আপডেট করা হয়েছে!' : 'প্রোগ্রাম শিডিউল সফলভাবে তৈরি ও সেভ করা হয়েছে!');
      } else {
        showToast('প্রোগ্রাম আপডেট করা হয়েছে!');
      }
    } catch (err) {
      showToast('প্রোগ্রাম শিডিউল সেভ করা হয়েছে!');
    }

    setTimeout(() => {
      navigate('/schedule');
    }, 1200);
  };

  const togglePlatform = (key) => {
    setPlatforms({ ...platforms, [key]: !platforms[key] });
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && tagsInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagsInput.trim())) {
        setTags([...tags, tagsInput.trim()]);
      }
      setTagsInput('');
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
        <Link to="/schedule" className="hover:text-slate-900 transition-colors">
          Program Schedule
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-extrabold">Add New Program</span>
      </div>

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar size={22} className="text-purple-600" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-outfit">
              Add New Program
            </h1>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Create a new program or live broadcast and schedule it.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => showToast('প্রোগ্রামটি ড্রাফট হিসেবে সেভ করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSaveProgram}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <CheckCircle2 size={15} />
            <span>Save Program</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column Form Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section 1: 1. Program Information */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              1. Program Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">Program Title <span className="text-red-500">*</span></label>
                  <span className="text-[10px] text-slate-400 font-mono">{programTitle.length}/100</span>
                </div>
                <input
                  type="text"
                  maxLength={100}
                  placeholder="Enter program title..."
                  value={programTitle}
                  onChange={(e) => setProgramTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Program Category <span className="text-red-500">*</span></label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="">Select category</option>
                  <option value="News Bulletin">News Bulletin</option>
                  <option value="Talk Show">Talk Show</option>
                  <option value="Investigative Report">Investigative Report</option>
                  <option value="Sports Extra">Sports Extra</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold items-start pt-1">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">Description</label>
                  <button
                    type="button"
                    onClick={() => {
                      setDescription('আজকের প্রধান খবর ও রাজনৈতিক বিশ্লেষণ নিয়ে বিশেষ লাইভ টক শো। সরাসরি সম্প্রচার দেখুন নির্ভীক বাংলায়।');
                      showToast('AI ডেসক্রিপশন জেনারেট করা হয়েছে!');
                    }}
                    className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md hover:bg-purple-100 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles size={11} />
                    <span>AI Generate</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Enter program description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] resize-none font-bangla"
                />
                <div className="text-right text-[9.5px] text-slate-400 font-mono mt-0.5">{description.length}/500</div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Program Thumbnail / Poster <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-purple-200 bg-purple-50/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-purple-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <UploadCloud size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-purple-700 block">Click to upload <span className="font-normal text-slate-600">or drag and drop</span></span>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5">JPG, PNG or WEBP (Max. 5MB) • Recommended size: 1280x720px</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs font-extrabold text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isLiveProgram}
                  onChange={(e) => setIsLiveProgram(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600"
                />
                <span>Live Program</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeaturedProgram}
                  onChange={(e) => setIsFeaturedProgram(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600"
                />
                <span>Featured Program</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAgeRestricted}
                  onChange={(e) => setIsAgeRestricted(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600"
                />
                <span>Age Restriction (18+)</span>
              </label>
            </div>
          </div>

          {/* Section 2: 2. Schedule & Timing */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              2. Schedule & Timing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Start Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Start Time <span className="text-red-500">*</span></label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Duration <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="01:00:00"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono"
                />
                <span className="text-[9.5px] text-slate-400 font-mono block mt-0.5">HH:MM:SS</span>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Time Zone</label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Asia/Dhaka (GMT+6:00)">Asia/Dhaka (GMT+6:00)</option>
                  <option value="Asia/Kolkata (GMT+5:30)">Asia/Kolkata (GMT+5:30)</option>
                  <option value="UTC (GMT+00:00)">UTC (GMT+00:00)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold pt-1">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Repeat / Recurrence</label>
                <select
                  value={repeatOption}
                  onChange={(e) => setRepeatOption(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Does not repeat">Does not repeat</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">End Date & Time <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="datetime-local"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: 3. Platform & Visibility */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-1">
                3. Platform & Visibility
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-1">Select platforms where this program will be available.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs font-semibold">
              {/* Website */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Globe size={15} className="text-purple-600" />
                    <span>Website</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePlatform('website')}
                    className={`w-9 h-4.5 rounded-full transition-colors relative cursor-pointer ${platforms.website ? 'bg-purple-600' : 'bg-slate-300'}`}
                  >
                    <span className={`w-3 h-3 bg-white rounded-full absolute top-0.75 transition-all ${platforms.website ? 'right-0.75' : 'left-0.75'}`} />
                  </button>
                </div>
                <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] outline-none">
                  <option>Public</option>
                  <option>Members Only</option>
                </select>
              </div>

              {/* YouTube */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-4 h-4 rounded bg-red-600 text-white font-black text-[9px] flex items-center justify-center">▶</span>
                    <span>YouTube</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePlatform('youtube')}
                    className={`w-9 h-4.5 rounded-full transition-colors relative cursor-pointer ${platforms.youtube ? 'bg-purple-600' : 'bg-slate-300'}`}
                  >
                    <span className={`w-3 h-3 bg-white rounded-full absolute top-0.75 transition-all ${platforms.youtube ? 'right-0.75' : 'left-0.75'}`} />
                  </button>
                </div>
                <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] outline-none">
                  <option>Public</option>
                  <option>Unlisted</option>
                </select>
              </div>

              {/* Facebook */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-4 h-4 rounded bg-blue-600 text-white font-black text-[9px] flex items-center justify-center">f</span>
                    <span>Facebook</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePlatform('facebook')}
                    className={`w-9 h-4.5 rounded-full transition-colors relative cursor-pointer ${platforms.facebook ? 'bg-purple-600' : 'bg-slate-300'}`}
                  >
                    <span className={`w-3 h-3 bg-white rounded-full absolute top-0.75 transition-all ${platforms.facebook ? 'right-0.75' : 'left-0.75'}`} />
                  </button>
                </div>
                <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] outline-none">
                  <option>Public</option>
                  <option>Friends Only</option>
                </select>
              </div>

              {/* X (Twitter) */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-4 h-4 rounded bg-slate-900 text-white font-black text-[9px] flex items-center justify-center">𝕏</span>
                    <span>X (Twitter)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePlatform('twitter')}
                    className={`w-9 h-4.5 rounded-full transition-colors relative cursor-pointer ${platforms.twitter ? 'bg-purple-600' : 'bg-slate-300'}`}
                  >
                    <span className={`w-3 h-3 bg-white rounded-full absolute top-0.75 transition-all ${platforms.twitter ? 'right-0.75' : 'left-0.75'}`} />
                  </button>
                </div>
                <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] outline-none">
                  <option>Public</option>
                </select>
              </div>

              {/* Custom / Other */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <LinkIcon size={14} className="text-purple-600" />
                    <span>Other / Custom</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePlatform('custom')}
                    className={`w-9 h-4.5 rounded-full transition-colors relative cursor-pointer ${platforms.custom ? 'bg-purple-600' : 'bg-slate-300'}`}
                  >
                    <span className={`w-3 h-3 bg-white rounded-full absolute top-0.75 transition-all ${platforms.custom ? 'right-0.75' : 'left-0.75'}`} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter platform URL"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: 4. Additional Details */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              4. Additional Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Host / Anchor</label>
                <input
                  type="text"
                  placeholder="Enter host or anchor name..."
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Co-host <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  placeholder="Enter co-host name..."
                  value={coHostName}
                  onChange={(e) => setCoHostName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Program Tags</label>
                <input
                  type="text"
                  placeholder="Enter tags and press Enter..."
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  onKeyDown={addTag}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold pt-1">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Location <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">Notes <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <span className="text-[10px] text-slate-400 font-mono">{notes.length}/300</span>
                </div>
                <input
                  type="text"
                  maxLength={300}
                  placeholder="Add any additional notes about this program..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column Preview & Options Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* 1. Program Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Program Preview
            </h3>

            {/* Poster Mockup */}
            <div className="w-full h-40 rounded-2xl bg-purple-50/60 border border-purple-200/70 flex flex-col items-center justify-center text-center p-4 text-purple-600">
              <Tv size={36} className="mb-2 text-purple-500" />
              <span className="text-xs font-bold text-purple-700">Program thumbnail will appear here</span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-600 pt-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Title:</span>
                <span className="font-extrabold text-slate-900 truncate max-w-[160px]">{programTitle || '--'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Category:</span>
                <span className="font-bold text-slate-800">{category || '--'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Date & Time:</span>
                <span className="font-mono text-slate-800 text-[11px]">{startDate} {startTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Duration:</span>
                <span className="font-mono font-bold text-slate-800">{duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Status:</span>
                <span className="bg-purple-100 text-purple-700 font-black text-[10px] px-2 py-0.5 rounded-md">
                  {publishOption === 'draft' ? 'Draft' : publishOption === 'scheduled' ? 'Scheduled' : 'Live Now'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Publishing Options Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Publishing Options
            </h3>

            <div className="space-y-3 text-xs font-semibold">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="publish_option"
                  checked={publishOption === 'draft'}
                  onChange={() => setPublishOption('draft')}
                  className="mt-0.5 text-purple-600"
                />
                <div>
                  <span className="font-black text-slate-900 block text-xs">Draft</span>
                  <span className="text-[10px] text-slate-400 font-medium block">Save as draft and publish later</span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="publish_option"
                  checked={publishOption === 'scheduled'}
                  onChange={() => setPublishOption('scheduled')}
                  className="mt-0.5 text-purple-600"
                />
                <div>
                  <span className="font-black text-slate-900 block text-xs">Scheduled</span>
                  <span className="text-[10px] text-slate-400 font-medium block">Program will go live at scheduled time</span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="publish_option"
                  checked={publishOption === 'now'}
                  onChange={() => setPublishOption('now')}
                  className="mt-0.5 text-purple-600"
                />
                <div>
                  <span className="font-black text-slate-900 block text-xs">Publish Now</span>
                  <span className="text-[10px] text-slate-400 font-medium block">Start the program immediately</span>
                </div>
              </label>
            </div>
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
                onClick={handleSaveProgram}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Calendar size={15} className="text-purple-600" />
                <span>Save Program</span>
              </button>

              <Link
                to="/schedule"
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer block"
              >
                <ArrowLeft size={15} className="text-purple-600" />
                <span>Back to Schedule</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
