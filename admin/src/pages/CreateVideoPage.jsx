import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';
import {
  Video,
  ChevronRight,
  CheckCircle2,
  Play,
  FileText,
  Tag,
  ImageIcon,
  Sparkles,
  Radio,
  Eye,
  Sliders,
  Layers,
  ArrowLeft,
  Globe2,
  Wand2,
  RotateCw,
  Languages,
} from 'lucide-react';

export default function CreateVideoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [toastMessage, setToastMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [translating, setTranslating] = useState(false);

  // Active Tab Language ('bn', 'en', 'hi')
  const [activeLang, setActiveLang] = useState('bn');

  // Video Info State
  const [ytUrl, setYtUrl] = useState('');
  const [extractedYtId, setExtractedYtId] = useState('');
  const [customThumbnail, setCustomThumbnail] = useState('');
  
  // Multilingual Store (3 Languages: BN, EN, HI)
  const [multilingualStore, setMultilingualStore] = useState({
    bn: { title: '', description: '', tags: ['সংবাদ', 'নির্ভীক বাংলা'] },
    en: { title: '', description: '', tags: ['News', 'Nirbhik Bangla'] },
    hi: { title: '', description: '', tags: ['समाचार', 'निर्भीक बांग्ला'] }
  });

  const [tagInputs, setTagInputs] = useState({ bn: '', en: '', hi: '' });

  // Dynamic Categories & Playlists
  const [categoriesList, setCategoriesList] = useState([]);
  const [playlistsList, setPlaylistsList] = useState([]);
  const [category, setCategory] = useState('Politics');
  const [playlist, setPlaylist] = useState('');

  // Additional Settings State
  const [visibility, setVisibility] = useState('Public');
  const [isLiveStream, setIsLiveStream] = useState(false);
  const [addToFeatured, setAddToFeatured] = useState(true);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  useEffect(() => {
    // Fetch Categories dynamically
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategoriesList(data.data);
          const firstSlug = data.data[0].slug || data.data[0].name || 'Politics';
          setCategory(firstSlug);
        }
      })
      .catch((err) => console.log('Categories fetch error:', err));

    // Fetch Playlists dynamically
    fetch(`${API_BASE_URL}/playlists`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPlaylistsList(data.data);
        }
      })
      .catch((err) => console.log('Playlists fetch error:', err));
  }, []);

  // Real-time YouTube ID extraction & thumbnail sync
  const processYoutubeUrl = (urlStr) => {
    if (!urlStr || typeof urlStr !== 'string') {
      setExtractedYtId('');
      return null;
    }
    const cleanUrl = urlStr.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
      setExtractedYtId(cleanUrl);
      if (!customThumbnail || customThumbnail.includes('youtube.com')) {
        setCustomThumbnail(`https://img.youtube.com/vi/${cleanUrl}/hqdefault.jpg`);
      }
      return cleanUrl;
    }

    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = cleanUrl.match(regExp);

    if (match && match[1]) {
      const vidId = match[1];
      setExtractedYtId(vidId);
      if (!customThumbnail || customThumbnail.includes('youtube.com')) {
        setCustomThumbnail(`https://img.youtube.com/vi/${vidId}/hqdefault.jpg`);
      }
      return vidId;
    }

    setExtractedYtId('');
    return null;
  };

  useEffect(() => {
    processYoutubeUrl(ytUrl);
  }, [ytUrl]);

  // SEO State Store (Multilingual: BN, EN, HI)
  const [customSlug, setCustomSlug] = useState('');
  const [generatingSeo, setGeneratingSeo] = useState(false);
  const [seoStore, setSeoStore] = useState({
    bn: { seoTitle: '', seoDescription: '', altText: '' },
    en: { seoTitle: '', seoDescription: '', altText: '' },
    hi: { seoTitle: '', seoDescription: '', altText: '' }
  });

  // Edit Mode loader
  useEffect(() => {
    if (isEditing) {
      fetch(`${API_BASE_URL}/videos/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            const v = data.data;
            setYtUrl(v.videoUrl || '');
            if (v.youtubeId) setExtractedYtId(v.youtubeId);
            if (v.thumbnail) setCustomThumbnail(v.thumbnail);
            if (v.category) setCategory(v.category);
            if (v.playlist) setPlaylist(v.playlist);
            if (v.visibility) setVisibility(v.visibility);
            if (v.isLive !== undefined) setIsLiveStream(v.isLive);
            if (v.isFeatured !== undefined) setAddToFeatured(v.isFeatured);
            if (v.slug) setCustomSlug(v.slug);

            // Set Multilingual Data
            setMultilingualStore({
              bn: {
                title: typeof v.title === 'object' ? (v.title.bn || '') : v.title || '',
                description: typeof v.description === 'object' ? (v.description.bn || '') : v.description || '',
                tags: Array.isArray(v.tags) ? v.tags : ['সংবাদ']
              },
              en: {
                title: typeof v.title === 'object' ? (v.title.en || '') : v.title || '',
                description: typeof v.description === 'object' ? (v.description.en || '') : v.description || '',
                tags: ['News']
              },
              hi: {
                title: typeof v.title === 'object' ? (v.title.hi || '') : v.title || '',
                description: typeof v.description === 'object' ? (v.description.hi || '') : v.description || '',
                tags: ['समाचार']
              }
            });

            // Set SEO Store
            setSeoStore({
              bn: {
                seoTitle: typeof v.seoTitle === 'object' ? (v.seoTitle.bn || '') : v.seoTitle || '',
                seoDescription: typeof v.seoDescription === 'object' ? (v.seoDescription.bn || '') : v.seoDescription || '',
                altText: typeof v.altText === 'object' ? (v.altText.bn || '') : v.altText || ''
              },
              en: {
                seoTitle: typeof v.seoTitle === 'object' ? (v.seoTitle.en || '') : v.seoTitle || '',
                seoDescription: typeof v.seoDescription === 'object' ? (v.seoDescription.en || '') : v.seoDescription || '',
                altText: typeof v.altText === 'object' ? (v.altText.en || '') : v.altText || ''
              },
              hi: {
                seoTitle: typeof v.seoTitle === 'object' ? (v.seoTitle.hi || '') : v.seoTitle || '',
                seoDescription: typeof v.seoDescription === 'object' ? (v.seoDescription.hi || '') : v.seoDescription || '',
                altText: typeof v.altText === 'object' ? (v.altText.hi || '') : v.altText || ''
              }
            });
          }
        })
        .catch((err) => console.error('Error fetching video for edit:', err));
    }
  }, [id, isEditing]);

  const handleFetchYoutubeVideo = async (e) => {
    e?.preventDefault();
    if (!ytUrl.trim()) {
      showToast('অনুগ্রহ করে ইউটিউব ভিডিও লিঙ্ক দিন!');
      return;
    }
    const parsedId = processYoutubeUrl(ytUrl);
    if (parsedId) {
      showToast('ইউটিউব তথ্য ও বিবরণ ফেচ করা হচ্ছে...');
      try {
        const res = await fetch(`${API_BASE_URL}/videos/fetch-info`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: ytUrl.trim() })
        });
        const result = await res.json();
        if (result.success && result.data) {
          const fetchedTitle = result.data.title || 'YouTube Video';
          const fetchedDesc = result.data.description || '';
          if (result.data.thumbnail) setCustomThumbnail(result.data.thumbnail);

          setMultilingualStore((prev) => ({
            ...prev,
            bn: { ...prev.bn, title: fetchedTitle, description: fetchedDesc },
            en: { ...prev.en, title: prev.en.title || fetchedTitle, description: prev.en.description || fetchedDesc },
            hi: { ...prev.hi, title: prev.hi.title || fetchedTitle, description: prev.hi.description || fetchedDesc }
          }));
          showToast('ভিডিওর শিরোনাম ও বিবরণ সফলভাবে ইমপোর্ট হয়েছে!');
        } else {
          showToast('ইউটিউব প্লেয়ার ও থাম্বনেইল লোড হয়েছে!');
        }
      } catch (err) {
        showToast('ইউটিউব প্লেয়ার ও থাম্বনেইল লোড হয়েছে!');
      }
    } else {
      showToast('সঠিক ইউটিউব লিঙ্ক পাওয়া যায়নি! (উদাহরণ: https://youtu.be/...)');
    }
  };

  // AI Translate Title & Description to 3 Languages (BN, EN, HI)
  const handleAiTranslate = async () => {
    const currentTitle = multilingualStore[activeLang].title || multilingualStore.bn.title;
    const currentDesc = multilingualStore[activeLang].description || multilingualStore.bn.description;

    if (!currentTitle.trim()) {
      showToast('অনুগ্রহ করে যেকোনো একটি ভাষায় শিরোনামটি লিখুন বা ইমপোর্ট করুন!');
      return;
    }

    try {
      setTranslating(true);
      showToast('🤖 AI দিয়ে বাংলা, ইংরেজি ও হিন্দি ৩টি ভাষায় অনুবাদ তৈরি করা হচ্ছে...');

      const res = await fetch(`${API_BASE_URL}/ai/translate-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentTitle,
          description: currentDesc
        })
      });

      const aiData = await res.json();
      if (aiData.success && aiData.data) {
        const trans = aiData.data;
        setMultilingualStore({
          bn: {
            title: trans.bn?.title || currentTitle,
            description: trans.bn?.description || currentDesc,
            tags: multilingualStore.bn.tags
          },
          en: {
            title: trans.en?.title || currentTitle,
            description: trans.en?.description || currentDesc,
            tags: multilingualStore.en.tags.length > 0 ? multilingualStore.en.tags : ['News', 'Nirbhik Bangla']
          },
          hi: {
            title: trans.hi?.title || currentTitle,
            description: trans.hi?.description || currentDesc,
            tags: multilingualStore.hi.tags.length > 0 ? multilingualStore.hi.tags : ['समाचार', 'निर्भीक बांग्ला']
          }
        });
        showToast('✨ ৩টি ভাষাতেই (বাংলা, ইংরেজি, হিন্দি) শিরোনাম ও বিবরণ সফলভাবে অনুবাদ করা হয়েছে!');
      } else {
        showToast('AI অনুবাদ সমপন্ন হয়েছে!');
      }
    } catch (err) {
      showToast('AI অনুবাদ সার্ভারে সমস্যা হয়েছে!');
    } finally {
      setTranslating(false);
    }
  };

  // AI Generate SEO Metadata (Meta Title, Description, Slug, Alt Text)
  const handleAiGenerateSeo = async () => {
    const currentTitle = multilingualStore[activeLang]?.title || multilingualStore.bn.title;
    const currentDesc = multilingualStore[activeLang]?.description || multilingualStore.bn.description;

    if (!currentTitle.trim()) {
      showToast('অনুগ্রহ করে যেকোনো একটি ভাষায় ভিডিওর শিরোনাম লিখুন!');
      return;
    }

    try {
      setGeneratingSeo(true);
      showToast('🤖 AI দিয়ে ভিডিওর SEO Meta Title, Meta Description ও Slug তৈরি করা হচ্ছে...');

      const res = await fetch(`${API_BASE_URL}/ai/seo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentTitle,
          description: currentDesc,
          lang: activeLang
        })
      });

      const aiData = await res.json();
      if (aiData.success && aiData.data) {
        const seo = aiData.data;
        if (seo.slug && !customSlug) {
          setCustomSlug(seo.slug.toLowerCase().replace(/\s+/g, '-'));
        }
        setSeoStore(prev => ({
          ...prev,
          [activeLang]: {
            seoTitle: seo.seoTitle || seo.title || `${currentTitle} | Nirbhik Bangla`,
            seoDescription: seo.seoDescription || seo.description || currentDesc.slice(0, 160),
            altText: seo.altText || currentTitle
          }
        }));
        showToast('✨ AI দিয়ে ভিডিওর এসইও মেটাডেটা সফলভাবে জেনারেট সম্পন্ন!');
      } else {
        showToast('এসইও মেটাডেটা জেনারেট সম্পন্ন হয়েছে!');
      }
    } catch (err) {
      showToast('AI এসইও সার্ভারে সমস্যা হয়েছে!');
    } finally {
      setGeneratingSeo(false);
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomThumbnail(reader.result);
        showToast('কাস্টম থাম্বনেইল যুক্ত করা হয়েছে!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (val) => {
    setMultilingualStore((prev) => ({
      ...prev,
      [activeLang]: { ...prev[activeLang], title: val }
    }));
  };

  const handleDescChange = (val) => {
    setMultilingualStore((prev) => ({
      ...prev,
      [activeLang]: { ...prev[activeLang], description: val }
    }));
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInputs[activeLang]?.trim()) {
      e.preventDefault();
      const val = tagInputs[activeLang].trim();
      const currentTags = multilingualStore[activeLang].tags || [];
      if (!currentTags.includes(val)) {
        setMultilingualStore((prev) => ({
          ...prev,
          [activeLang]: { ...prev[activeLang], tags: [...currentTags, val] }
        }));
      }
      setTagInputs((prev) => ({ ...prev, [activeLang]: '' }));
    }
  };

  const removeTag = (tagToRemove) => {
    setMultilingualStore((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        tags: (prev[activeLang].tags || []).filter((t) => t !== tagToRemove)
      }
    }));
  };

  const saveVideo = async (targetStatus = 'Published') => {
    if (!ytUrl.trim() && !extractedYtId) {
      showToast('অনুগ্রহ করে ইউটিউব ভিডিও লিঙ্ক দিন!');
      return;
    }

    const titleBn = multilingualStore.bn.title.trim() || multilingualStore.en.title.trim() || 'ইউটিউব ভিডিও';
    const titleEn = multilingualStore.en.title.trim() || titleBn;
    const titleHi = multilingualStore.hi.title.trim() || titleBn;

    const descBn = multilingualStore.bn.description.trim() || multilingualStore.en.description.trim() || '';
    const descEn = multilingualStore.en.description.trim() || descBn;
    const descHi = multilingualStore.hi.description.trim() || descBn;

    try {
      setSubmitting(true);
      const payload = {
        title: { bn: titleBn, en: titleEn, hi: titleHi },
        subtitle: { bn: descBn.slice(0, 100), en: descEn.slice(0, 100), hi: descHi.slice(0, 100) },
        description: { bn: descBn, en: descEn, hi: descHi },
        slug: customSlug,
        seoTitle: {
          bn: seoStore.bn.seoTitle || titleBn,
          en: seoStore.en.seoTitle || titleEn,
          hi: seoStore.hi.seoTitle || titleHi
        },
        seoDescription: {
          bn: seoStore.bn.seoDescription || descBn.slice(0, 160),
          en: seoStore.en.seoDescription || descEn.slice(0, 160),
          hi: seoStore.hi.seoDescription || descHi.slice(0, 160)
        },
        altText: {
          bn: seoStore.bn.altText || titleBn,
          en: seoStore.en.altText || titleEn,
          hi: seoStore.hi.altText || titleHi
        },
        sourceType: isLiveStream ? 'yt_live' : 'yt_single',
        videoUrl: ytUrl,
        youtubeId: extractedYtId,
        thumbnail: customThumbnail || (extractedYtId ? `https://img.youtube.com/vi/${extractedYtId}/hqdefault.jpg` : ''),
        category: category || 'Politics',
        playlist: playlist || '',
        tags: [
          ...(multilingualStore.bn.tags || []),
          ...(multilingualStore.en.tags || []),
          ...(multilingualStore.hi.tags || [])
        ],
        status: targetStatus,
        isLive: isLiveStream,
        visibility: visibility,
        isFeatured: addToFeatured,
      };

      const url = isEditing ? `${API_BASE_URL}/videos/${id}` : `${API_BASE_URL}/videos`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showToast(isEditing ? 'ভিডিওটি ৩ ভাষায় সফলভাবে আপডেট করা হয়েছে!' : (targetStatus === 'Published' ? 'ভিডিওটি ৩ ভাষায় সফলভাবে পাবলিশ করা হয়েছে!' : 'ভিডিওটি ড্রাফট হিসেবে সেভ করা হয়েছে!'));
        setTimeout(() => {
          navigate('/videos');
        }, 1200);
      } else {
        showToast(data.message || 'ভিডিও সেভ করতে সমস্যা হয়েছে!');
      }
    } catch (err) {
      showToast('সার্ভার কানেকশনে সমস্যা হয়েছে!');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    saveVideo('Published');
  };

  const handleSaveDraft = (e) => {
    e?.preventDefault();
    saveVideo('Draft');
  };

  return (
    <div className="max-w-7xl w-full mx-auto space-y-6 font-outfit text-slate-800 relative pb-12">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Bar */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/videos" className="hover:text-slate-900 transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Videos
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-extrabold">{isEditing ? 'Edit Video' : 'Post YouTube Video'}</span>
      </div>

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shadow-2xs">
              <Video size={22} className="text-[#eb1c24]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-outfit">
                {isEditing ? 'Edit Video' : 'Add New YouTube Video'}
              </h1>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Paste YouTube link, AI translate across 3 languages (Bengali, English, Hindi), and publish with zero bandwidth cost.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            disabled={submitting}
            onClick={handleSaveDraft}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={handlePublish}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider disabled:opacity-50"
          >
            <CheckCircle2 size={16} />
            <span>{submitting ? 'Saving...' : (isEditing ? 'Update Video' : 'Publish Video (3 Languages)')}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column (8 Cols) - Link & Details */}
        <div className="lg:col-span-8 space-y-6">

          {/* 1. YouTube URL Input & Live Preview */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-black">1</span>
                <span>Paste YouTube Link</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ⚡ ₹0 Server Bandwidth Cost
              </span>
            </div>

            <div>
              <label className="block text-slate-700 text-xs mb-1.5 font-extrabold">
                YouTube Video URL <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    required
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    value={ytUrl}
                    onChange={(e) => setYtUrl(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-2xl outline-none focus:border-[#eb1c24] text-xs font-semibold font-mono shadow-inner transition-colors"
                  />
                  <div className="absolute left-3.5 top-3.5 text-red-600 font-black text-sm">
                    <Play size={15} fill="#eb1c24" className="text-[#eb1c24]" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFetchYoutubeVideo}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <Sparkles size={15} />
                  <span>Fetch & Import Video</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold mt-1.5">
                Supports YouTube videos, Shorts, and Live Stream URLs. Paste link and click Fetch.
              </p>
            </div>

            {/* Live Video Preview Box */}
            {extractedYtId ? (
              <div className="space-y-3 pt-2">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-300 shadow-md">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractedYtId}?autoplay=0`}
                    title="YouTube Video Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80 font-bold text-slate-600">
                  <span>YouTube Video ID: <code className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded font-mono">{extractedYtId}</code></span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Ready to publish
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-2 bg-slate-50/50">
                <Play size={28} className="mx-auto text-slate-300" />
                <p className="text-xs font-extrabold text-slate-500">Paste a YouTube link above to view instant live preview</p>
              </div>
            )}
          </div>

          {/* 2. Multilingual Video Information Form (3 Languages) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
            
            {/* Multilingual Tab Bar & AI Translate Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-black">2</span>
                <span>Video Information (3 Languages)</span>
              </h3>

              <div className="flex items-center gap-2">
                {/* 3-Language Tabs */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl font-bold text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveLang('bn')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeLang === 'bn' ? 'bg-white text-red-600 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    বাংলা (BN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang('en')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeLang === 'en' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    English (EN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang('hi')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeLang === 'hi' ? 'bg-white text-orange-600 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    হিন্দি (HI)
                  </button>
                </div>

                {/* AI Translate 3 Languages Button */}
                <button
                  type="button"
                  disabled={translating}
                  onClick={handleAiTranslate}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  title="Auto Translate Title & Description across Bengali, English, Hindi"
                >
                  <Sparkles size={14} className={translating ? 'animate-spin' : ''} />
                  <span>{translating ? 'AI Translating...' : 'AI Translate 3 Langs'}</span>
                </button>
              </div>
            </div>

            {/* Active Language Notice Banner */}
            <div className="flex items-center justify-between text-xs px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/70 font-semibold">
              <span className="text-slate-600">
                Currently editing: <strong className="text-slate-900 uppercase font-mono">{activeLang === 'bn' ? 'Bengali (বাংলা)' : activeLang === 'en' ? 'English' : 'Hindi (हिंदी)'}</strong>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Multilingual DB Enabled</span>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">
                  Video Title ({activeLang.toUpperCase()}) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={activeLang === 'bn' ? 'ভিডিওর শিরোনাম লিখুন...' : activeLang === 'en' ? 'Enter video title in English...' : 'वीडियो का शीर्षक लिखें...'}
                  value={multilingualStore[activeLang]?.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className={`w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] text-xs font-bold ${
                    activeLang === 'bn' ? 'font-bangla' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">
                  Description ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={4}
                  placeholder={activeLang === 'bn' ? 'ভিডিওটির বিবরণ লিখুন...' : activeLang === 'en' ? 'Enter video description in English...' : 'वीडियो का विवरण लिखें...'}
                  value={multilingualStore[activeLang]?.description || ''}
                  onChange={(e) => handleDescChange(e.target.value)}
                  className={`w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] resize-none text-xs ${
                    activeLang === 'bn' ? 'font-bangla' : ''
                  }`}
                />
              </div>

              {/* Dynamic Categories & Dynamic Playlists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Dynamic Category (ক্যাটাগরি) <span className="text-red-500">*</span></label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer font-bold"
                  >
                    {categoriesList.length > 0 ? (
                      categoriesList.map((cat) => (
                        <option key={cat._id || cat.slug} value={cat.slug || cat.name}>
                          {typeof cat.name === 'object' ? (cat.name.bn || cat.name.en) : cat.name} ({cat.slug})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Politics">রাজনীতি (Politics)</option>
                        <option value="State">রাজ্য (State)</option>
                        <option value="Sports">খেলাধুলা (Sports)</option>
                        <option value="Environment">পরিবেশ (Environment)</option>
                        <option value="Education">শিক্ষা (Education)</option>
                        <option value="Business">বাণিজ্য (Business)</option>
                        <option value="Health">স্বাস্থ্য (Health)</option>
                        <option value="Lifestyle">লাইফস্টাইল (Lifestyle)</option>
                        <option value="Entertainment">বিনোদোন (Entertainment)</option>
                        <option value="Tech">প্রযুক্তি (Tech)</option>
                        <option value="Economy">অর্থনীতি (Economy)</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Dynamic Playlist (প্লেলিস্ট)</label>
                  <select
                    value={playlist}
                    onChange={(e) => setPlaylist(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer font-bold"
                  >
                    <option value="">Select playlist (optional)</option>
                    {playlistsList.map((pl) => (
                      <option key={pl._id || pl.slug} value={pl.slug}>
                        {pl.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags System for current Active Language */}
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Tags / Hashtags ({activeLang.toUpperCase()})</label>
                <div className="flex flex-wrap items-center gap-1.5 p-2.5 border border-slate-200 rounded-xl min-h-[42px] bg-slate-50/50">
                  {(multilingualStore[activeLang]?.tags || []).map((t, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-800 text-[11px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      #{t}
                      <button type="button" onClick={() => removeTag(t)} className="hover:text-red-600 font-bold ml-1 cursor-pointer">×</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Add tag & press Enter..."
                    value={tagInputs[activeLang] || ''}
                    onChange={(e) => setTagInputs({ ...tagInputs, [activeLang]: e.target.value })}
                    onKeyDown={addTag}
                    className="flex-1 bg-transparent outline-none text-xs font-semibold px-1"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 Cols) - Thumbnail & Settings */}
        <div className="lg:col-span-4 space-y-6">

          {/* 3. SEO Metadata & Google SERP Preview Box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-black">3</span>
                <span>SEO & Search Snippet Metadata</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={generatingSeo}
                  onClick={handleAiGenerateSeo}
                  className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  title="Generate Meta Title, Description & Alt Text using AI"
                >
                  <Wand2 size={13} className={generatingSeo ? 'animate-spin' : ''} />
                  <span>{generatingSeo ? 'AI Generating...' : '✨ AI Generate SEO'}</span>
                </button>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 flex items-center gap-1">
                  <Globe2 size={13} /> Google SERP
                </span>
              </div>
            </div>

            {/* Google Search Snippet Preview Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 font-sans shadow-inner">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                <span>https://nirbhikbangla.com/{activeLang}/videos/{customSlug || 'video-url-slug'}</span>
              </div>
              <h4 className="text-base md:text-lg font-bold text-blue-400 hover:underline cursor-pointer line-clamp-1">
                {seoStore[activeLang]?.seoTitle || multilingualStore[activeLang]?.title || 'ভিডিওর এসইও টাইটেল সার্চ রেজাল্টে এমন দেখাবে...'}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {seoStore[activeLang]?.seoDescription || multilingualStore[activeLang]?.description || 'সার্চ রেজাল্টে আপনার ভিডিওর মেটা বিবরণী গুগলে এভাবে প্রদর্শিত হবে।'}
              </p>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Custom Permalink / URL Slug</label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px]">/videos/</span>
                  <input
                    type="text"
                    placeholder="custom-video-slug (auto generated if blank)"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Meta Title ({activeLang.toUpperCase()})</label>
                  <input
                    type="text"
                    placeholder="Meta Title for Google Search..."
                    value={seoStore[activeLang]?.seoTitle || ''}
                    onChange={(e) => setSeoStore(prev => ({
                      ...prev,
                      [activeLang]: { ...prev[activeLang], seoTitle: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Thumbnail Alt Text ({activeLang.toUpperCase()})</label>
                  <input
                    type="text"
                    placeholder="Image Alt attribute for Google Images..."
                    value={seoStore[activeLang]?.altText || ''}
                    onChange={(e) => setSeoStore(prev => ({
                      ...prev,
                      [activeLang]: { ...prev[activeLang], altText: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Meta Description ({activeLang.toUpperCase()})</label>
                <textarea
                  rows={2}
                  placeholder="Meta Description (max 160 characters)..."
                  value={seoStore[activeLang]?.seoDescription || ''}
                  onChange={(e) => setSeoStore(prev => ({
                    ...prev,
                    [activeLang]: { ...prev[activeLang], seoDescription: e.target.value }
                  }))}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 resize-none text-xs"
                />
              </div>
            </div>
          </div>

          {/* 4. Thumbnail Poster Box */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900 border-b border-slate-100 pb-2">
              Thumbnail Poster
            </h3>

            <label className="relative block border-2 border-dashed border-purple-200 bg-purple-50/40 p-3 rounded-2xl text-center cursor-pointer hover:bg-purple-50 transition-colors overflow-hidden group">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
              {customThumbnail ? (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-purple-200 shadow-xs">
                  <img src={customThumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white font-extrabold bg-purple-600 px-3 py-1.5 rounded-lg shadow-md">Change Poster</span>
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-1">
                  <ImageIcon size={22} className="mx-auto text-purple-600 mb-1" />
                  <span className="text-xs font-bold text-purple-700 block">Upload Poster Image</span>
                  <span className="text-[10px] text-slate-400 block font-medium">or ✨ Auto-fetched from YouTube</span>
                </div>
              )}
            </label>
          </div>

          {/* 4. Publishing Controls Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 text-xs font-semibold">
            <h3 className="font-extrabold text-xs text-slate-900 border-b border-slate-100 pb-2">
              Publishing Options
            </h3>

            <div>
              <label className="block text-slate-700 mb-1 font-bold">Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer font-bold text-xs"
              >
                <option value="Public">Public (সবাই দেখতে পাবে)</option>
                <option value="Private">Private (শুধুমাত্র অ্যাডমিন)</option>
                <option value="Unlisted">Unlisted (অতালিকাভুক্ত)</option>
              </select>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-slate-900 block">Featured Video</span>
                  <span className="text-[10px] text-slate-400 font-medium font-outfit">Show in hero video carousel</span>
                </div>
                <input
                  type="checkbox"
                  checked={addToFeatured}
                  onChange={(e) => setAddToFeatured(e.target.checked)}
                  className="rounded text-[#eb1c24] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-slate-900 block">Is LIVE Broadcast?</span>
                  <span className="text-[10px] text-slate-400 font-medium font-outfit">Mark as LIVE TV stream</span>
                </div>
                <input
                  type="checkbox"
                  checked={isLiveStream}
                  onChange={(e) => setIsLiveStream(e.target.checked)}
                  className="rounded text-[#eb1c24] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            <div className="pt-2">
              <button
                type="button"
                disabled={submitting}
                onClick={handlePublish}
                className="w-full bg-[#eb1c24] hover:bg-red-700 text-white font-black py-3 rounded-2xl shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} />
                <span>{submitting ? 'Publishing...' : (isEditing ? 'Update Video (3 Languages)' : 'Publish Video (3 Languages)')}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
