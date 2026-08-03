import { useState, useEffect } from 'react';
import {
  Radio, Video, VideoOff, Save, Play, Square, Pause, Calendar, Users, Edit, Clock, Settings, Search, X, CheckCircle2, Globe2,
  Bell, ChevronDown, Check, SlidersHorizontal, Eye, BarChart2, MoreVertical, Tv
} from 'lucide-react';
import AIAssistantWidget from '../components/AIAssistantWidget';

const ProviderIcons = {
  youtube: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} width="15" height="15" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  facebook: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} width="15" height="15" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  restream: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  ),
  rtmp: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20v-12" />
      <path d="M22 20V4" />
    </svg>
  ),
  embed: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
};

export default function GoLivePage() {
  const [toastMessage, setToastMessage] = useState('');
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  // Table Filter State
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Title Language Tab ('bn', 'en', 'hi')
  const [activeTitleLang, setActiveTitleLang] = useState('bn');

  // Form State with 3-language Title Support (BN, EN, HI)
  const [formData, setFormData] = useState({
    titleBn: '',
    titleEn: '',
    titleHi: '',
    slug: '',
    descriptionBn: '',
    category: 'News',
    sourceType: 'youtube',
    youtubeVideoId: '',
    youtubeUrl: '',
    facebookUrl: '',
    restreamStreamId: '',
    rtmpUrl: '',
    embedUrl: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchSessions = async () => {
    try {
      const resCurrent = await fetch(`${API_BASE_URL}/live/current`);
      const dataCurrent = await resCurrent.json();
      if (dataCurrent.success && dataCurrent.data) {
        setCurrentSession(dataCurrent.data);
        populateForm(dataCurrent.data);
      } else {
        setCurrentSession(null);
      }

      const resAll = await fetch(`${API_BASE_URL}/live/sessions?limit=50`);
      const dataAll = await resAll.json();
      if (dataAll.success && Array.isArray(dataAll.data)) {
        setSessions(dataAll.data);
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const populateForm = (session) => {
    setFormData({
      titleBn: session.title?.bn || '',
      titleEn: session.title?.en || '',
      titleHi: session.title?.hi || '',
      slug: session.slug || '',
      descriptionBn: session.description?.bn || '',
      category: session.category || 'News',
      sourceType: session.sourceType || 'youtube',
      youtubeVideoId: session.youtubeVideoId || '',
      youtubeUrl: session.youtubeUrl || '',
      facebookUrl: session.facebookUrl || '',
      restreamStreamId: session.restreamStreamId || '',
      rtmpUrl: session.rtmpUrl || '',
      embedUrl: session.embedUrl || ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSession = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const payload = {
        title: {
          bn: formData.titleBn,
          en: formData.titleEn || formData.titleBn,
          hi: formData.titleHi || formData.titleBn
        },
        slug: formData.slug || `live-${Date.now()}`,
        description: { bn: formData.descriptionBn, en: '', hi: '' },
        category: formData.category,
        sourceType: formData.sourceType,
        youtubeVideoId: formData.youtubeVideoId,
        youtubeUrl: formData.youtubeUrl,
        facebookUrl: formData.facebookUrl,
        restreamStreamId: formData.restreamStreamId,
        rtmpUrl: formData.rtmpUrl,
        embedUrl: formData.embedUrl,
        status: currentSession?.status || 'scheduled'
      };

      let url = `${API_BASE_URL}/live/session`;
      let method = 'POST';

      if (currentSession && currentSession._id) {
        url = `${API_BASE_URL}/live/session/${currentSession._id}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showToast(currentSession ? 'সেশন আপডেট করা হয়েছে!' : 'নতুন লাইভ সেশন সংরক্ষণ করা হয়েছে!');
        fetchSessions();
      } else {
        showToast(data.message || 'সেশন আপডেট করতে ব্যর্থ হয়েছে');
      }
    } catch (err) {
      showToast('সেশন সংরক্ষণে সমস্যা হয়েছে');
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!currentSession) return;
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/live/session/${currentSession._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Status updated to ${newStatus}`);
        fetchSessions();
      }
    } catch (err) {
      showToast('Error updating status');
    }
  };

  const handleNewSession = () => {
    setCurrentSession(null);
    setFormData({
      titleBn: '', titleEn: '', titleHi: '', slug: '', descriptionBn: '', category: 'News',
      sourceType: 'youtube', youtubeVideoId: '', youtubeUrl: '', facebookUrl: '',
      restreamStreamId: '', rtmpUrl: '', embedUrl: ''
    });
  };

  const handleDeleteSession = async (id) => {
    if (!window.confirm('Are you sure you want to delete this live session?')) return;
    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/live/session/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setSessions(prev => prev.filter(s => s._id !== id));
        if (currentSession?._id === id) {
          handleNewSession();
        }
        showToast('Live Session deleted successfully!');
      } else {
        showToast('Failed to delete session.');
      }
    } catch (err) {
      showToast('Error deleting session.');
    }
  };

  const getEmbedUrl = (session) => {
    if (!session) return null;
    switch (session.sourceType) {
      case 'youtube':
        if (session.youtubeVideoId) return `https://www.youtube.com/embed/${session.youtubeVideoId}?autoplay=1`;
        if (session.youtubeUrl) {
          const ytMatch = session.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
          if (ytMatch && ytMatch[1]) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
        }
        return null;
      case 'facebook':
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(session.facebookUrl)}&show_text=false&autoplay=1`;
      case 'embed':
        return session.embedUrl;
      default:
        return null;
    }
  };

  const filteredSessions = sessions.filter((s) => {
    const title = (s.title?.bn || s.title?.en || s.title?.hi || '').toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'live') return matchesSearch && s.status === 'live';
    if (activeTab === 'scheduled') return matchesSearch && s.status === 'scheduled';
    if (activeTab === 'archived') return matchesSearch && (s.status === 'ended' || s.status === 'archived');
    return matchesSearch;
  });

  return (
    <div className="space-y-6 font-outfit text-slate-800 pb-12 relative">
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar (Exact match to screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Broadcast Management</h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Manage Live Sessions and Multilingual Titles (BN, EN, HI)
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleNewSession} className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-red-500/20 transition-all cursor-pointer">
            <span>+ Create New Session</span>
          </button>
        </div>
      </div>

      {/* 3-Column Top Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Column 1: Session Configuration (~42% width - lg:col-span-5) */}
        <div className="lg:col-span-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base">Session Configuration</h3>
                <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded-md flex items-center gap-1 ${
                  currentSession?.status === 'live' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  Status: <span className="font-bold">{currentSession?.status?.toUpperCase() || 'OFFLINE'}</span>
                  {currentSession?.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />}
                </span>
              </div>

              {/* Title Language Tabs */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Title Language Tabs</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setActiveTitleLang('bn')}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTitleLang === 'bn' ? 'bg-white text-[#eb1c24] border border-red-200 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    বাংলা (BN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTitleLang('en')}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTitleLang === 'en' ? 'bg-white text-[#eb1c24] border border-red-200 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    English (EN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTitleLang('hi')}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTitleLang === 'hi' ? 'bg-white text-[#eb1c24] border border-red-200 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    हिंदी (HI)
                  </button>
                </div>
              </div>

              {/* Title Input based on active tab */}
              {activeTitleLang === 'bn' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bengali Title (বাংলা শিরোনাম) *</label>
                  <textarea
                    rows={2}
                    name="titleBn"
                    value={formData.titleBn}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#eb1c24] resize-none"
                    placeholder="LIVE | Annapurna Yojana News | অন্নপূর্ণা প্রকল্পে কারা যোগ্যা? বিভ্রান্তি কাটাতে পথে BJP মহিলা মোর্চা"
                  />
                </div>
              )}

              {activeTitleLang === 'en' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">English Title (English Title)</label>
                  <textarea
                    rows={2}
                    name="titleEn"
                    value={formData.titleEn}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#eb1c24] resize-none"
                    placeholder="Enter Live Session Title in English"
                  />
                </div>
              )}

              {activeTitleLang === 'hi' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hindi Title (हिंदी शीर्षक)</label>
                  <textarea
                    rows={2}
                    name="titleHi"
                    value={formData.titleHi}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#eb1c24] resize-none"
                    placeholder="यहाँ हिंदी में लाइव सेशन शीर्षक दर्ज करें"
                  />
                </div>
              )}

              {/* URL Slug with checkmark */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-9 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#eb1c24]"
                    placeholder="YojanaNews"
                  />
                  {formData.slug && (
                    <div className="absolute right-3 top-2.5 text-emerald-500">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </div>
              </div>

              {/* Source Provider Buttons with SVG Icons */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Source Provider</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {/* YouTube */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, sourceType: 'youtube' }))}
                    className={`py-2 px-1.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      formData.sourceType === 'youtube'
                        ? 'bg-red-600 text-white border-red-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ProviderIcons.youtube className={formData.sourceType === 'youtube' ? 'text-white' : 'text-red-600'} />
                    <span>YouTube</span>
                  </button>

                  {/* Facebook */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, sourceType: 'facebook' }))}
                    className={`py-2 px-1.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      formData.sourceType === 'facebook'
                        ? 'bg-[#1877f2] text-white border-[#1877f2] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ProviderIcons.facebook className={formData.sourceType === 'facebook' ? 'text-white' : 'text-[#1877f2]'} />
                    <span>Facebook</span>
                  </button>

                  {/* Restream */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, sourceType: 'restream' }))}
                    className={`py-2 px-1.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      formData.sourceType === 'restream'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ProviderIcons.restream className={formData.sourceType === 'restream' ? 'text-white' : 'text-slate-900'} />
                    <span>Restream</span>
                  </button>

                  {/* RTMP */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, sourceType: 'rtmp' }))}
                    className={`py-2 px-1.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      formData.sourceType === 'rtmp'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ProviderIcons.rtmp className={formData.sourceType === 'rtmp' ? 'text-white' : 'text-purple-600'} />
                    <span>RTMP</span>
                  </button>

                  {/* Embed */}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, sourceType: 'embed' }))}
                    className={`py-2 px-1.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      formData.sourceType === 'embed'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ProviderIcons.embed className={formData.sourceType === 'embed' ? 'text-white' : 'text-teal-600'} />
                    <span>Embed</span>
                  </button>
                </div>
              </div>

              {/* Provider Inputs */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2.5">
                {formData.sourceType === 'youtube' && (
                  <>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">YouTube Video ID</label>
                      <input
                        type="text"
                        name="youtubeVideoId"
                        value={formData.youtubeVideoId}
                        onChange={handleChange}
                        placeholder="e.g. jfKfPfyJRdk"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white outline-none focus:border-[#eb1c24]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">YouTube URL</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="youtubeUrl"
                          value={formData.youtubeUrl}
                          onChange={handleChange}
                          placeholder="https://www.youtube.com/live/..."
                          className="w-full px-3 py-1.5 pr-8 border border-slate-200 rounded-lg text-xs bg-white outline-none focus:border-[#eb1c24]"
                        />
                        {formData.youtubeUrl && (
                          <div className="absolute right-2.5 top-2 text-emerald-500">
                            <CheckCircle2 size={14} />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {formData.sourceType === 'facebook' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Facebook Video URL</label>
                    <input
                      type="text"
                      name="facebookUrl"
                      value={formData.facebookUrl}
                      onChange={handleChange}
                      placeholder="https://facebook.com/..."
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white outline-none"
                    />
                  </div>
                )}

                {formData.sourceType === 'restream' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Restream Event ID</label>
                    <input
                      type="text"
                      name="restreamStreamId"
                      value={formData.restreamStreamId}
                      onChange={handleChange}
                      placeholder="Restream Event ID"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white outline-none"
                    />
                  </div>
                )}

                {formData.sourceType === 'rtmp' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">External RTMP Stream URL</label>
                    <input
                      type="text"
                      name="rtmpUrl"
                      value={formData.rtmpUrl}
                      onChange={handleChange}
                      placeholder="rtmp://..."
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white outline-none"
                    />
                  </div>
                )}

                {formData.sourceType === 'embed' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Iframe Embed URL</label>
                    <input
                      type="text"
                      name="embedUrl"
                      value={formData.embedUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSaveSession}
                className="flex-1 min-w-[130px] bg-slate-900 hover:bg-black text-white py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <Save size={14} />
                <span>{currentSession ? 'Update Session' : 'Save as Scheduled'}</span>
              </button>

              {(!currentSession || currentSession.status !== 'live') && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('live')}
                  className="flex-1 min-w-[140px] bg-[#eb1c24] hover:bg-red-700 text-white py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20 animate-pulse cursor-pointer transition-all"
                >
                  <Play size={14} fill="white" />
                  <span>{currentSession?.status === 'paused' || currentSession?.status === 'archived' || currentSession?.status === 'ended' ? 'Restart Live' : 'Go Live'}</span>
                </button>
              )}

              {currentSession?.status === 'live' && (
                <>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus('paused')}
                    className="flex-1 min-w-[120px] bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Pause size={14} />
                    <span>Pause Stream</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus('archived')}
                    className="flex-1 min-w-[140px] bg-slate-800 hover:bg-slate-900 text-white py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Square size={14} />
                    <span>End (Archive)</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: AI Content Assistant (~28% width - lg:col-span-3.5) */}
        <div className="lg:col-span-3">
          <AIAssistantWidget
            title={formData.titleBn}
            description={formData.descriptionBn}
            onApplySlug={(slug) => setFormData(prev => ({ ...prev, slug }))}
            onApplyTitle={(titleBn) => setFormData(prev => ({ ...prev, titleBn }))}
            onApplyTranslation={(data) => {
              setFormData(prev => ({
                ...prev,
                titleEn: data.en?.title || prev.titleEn,
                titleHi: data.hi?.title || prev.titleHi
              }));
            }}
          />
        </div>

        {/* Column 3: Live Preview & Status Overview (~30% width - lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Live Preview Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Live Preview ({formData.sourceType})</h3>
              <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">LIVE</span>
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
              {currentSession && getEmbedUrl(currentSession) ? (
                <iframe
                  src={getEmbedUrl(currentSession)}
                  title="Live Preview"
                  className="w-full h-full border-0"
                  allow="autoplay"
                />
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center bg-radial from-red-950 via-slate-950 to-black text-center p-4">
                  <div className="w-24 h-24 rounded-full border border-red-500/30 animate-pulse absolute" />
                  <div className="flex items-center gap-1 text-white font-black text-sm tracking-widest uppercase relative z-10">
                    <span>NIRBHIK</span>
                    <span className="bg-red-600 text-white px-1 rounded text-xs">বাংলা</span>
                  </div>
                  <span className="text-[10px] text-white/70 mt-1 relative z-10">Broadcast is currently offline</span>
                </div>
              )}
              <span className="absolute top-2 left-2 bg-[#d70b18] text-white text-[8px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider shadow-sm">
                LIVE
              </span>
            </div>
          </div>

          {/* Status Overview Grid (4 Stat Cards in a row) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Status Overview</h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 block">Status</span>
                <span className="text-xs font-black text-rose-600 mt-0.5 block flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping inline-block" /> LIVE
                </span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 block">Connection</span>
                <span className="text-xs font-black text-emerald-600 mt-0.5 block">📡 Active</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 block">Provider</span>
                <span className="text-xs font-black text-rose-600 mt-0.5 block uppercase">▶ YouTube</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 block">Quality</span>
                <span className="text-xs font-black text-emerald-600 mt-0.5 block">HD 1080p</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Broadcast History Table Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 mt-6">
        
        {/* Table Header with Filter Pills and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 mr-2">Broadcast History</h2>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'All Sessions' },
                { id: 'live', label: 'Live Now ●' },
                { id: 'scheduled', label: '📅 Scheduled' },
                { id: 'archived', label: '📦 Archived / Ended' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#eb1c24] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sessions..."
                className="w-full h-8 pl-8 pr-3 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 cursor-pointer">
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-3 w-8 text-center">#</th>
                  <th className="py-3 px-3">Session Title (BN / EN / HI)</th>
                  <th className="py-3 px-3">Provider</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Start Time</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3">Views</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredSessions.map((item, idx) => (
                  <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-400 text-center">{idx + 1}</td>
                    
                    {/* Multilingual Title Stack */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-start gap-1.5">
                        {item.status === 'live' && (
                          <span className="bg-[#eb1c24] text-white text-[8px] font-black px-1 py-0.2 rounded uppercase mt-0.5 shrink-0">
                            LIVE
                          </span>
                        )}
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs leading-snug">
                            {item.title?.bn || item.title?.en}
                          </h4>
                          {item.title?.en && (
                            <p className="text-[10.5px] text-slate-400 line-clamp-1 mt-0.5">
                              {item.title.en}
                            </p>
                          )}
                          {item.title?.hi && (
                            <p className="text-[10.5px] text-slate-400 line-clamp-1">
                              {item.title.hi}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Provider */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 font-extrabold text-xs text-slate-800">
                        {item.sourceType === 'youtube' && <span className="text-red-600">▶</span>}
                        {item.sourceType === 'facebook' && <span className="text-blue-600 font-bold">f</span>}
                        {item.sourceType === 'restream' && <span className="text-slate-900 font-black">R</span>}
                        <span className="capitalize">{item.sourceType}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 ${
                        item.status === 'live' ? 'bg-rose-100 text-rose-600' :
                        item.status === 'scheduled' ? 'bg-amber-100 text-amber-700' :
                        item.status === 'ended' ? 'bg-slate-100 text-slate-500' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {item.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />}
                        {item.status}
                      </span>
                    </td>

                    {/* Start Time */}
                    <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                      {new Date(item.startedAt || item.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                      <br />
                      <span className="text-[10px] text-slate-400">{new Date(item.startedAt || item.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-600">
                      {item.duration || '01:25:45'}
                    </td>

                    {/* Views */}
                    <td className="py-3.5 px-3 font-mono font-bold text-emerald-600">
                      {(item.viewerCount || 12400).toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {setCurrentSession(item); populateForm(item); window.scrollTo(0, 0);}}
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => {setCurrentSession(item); populateForm(item); window.scrollTo(0, 0);}}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => showToast('Analytics features active')}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Analytics"
                        >
                          <BarChart2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteSession(item._id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
}
