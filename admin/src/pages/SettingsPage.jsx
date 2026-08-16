import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';
import api from '../utils/api';
import { Globe, Sliders, Bell, Shield, Layers, Database, AlertTriangle, Key, CheckCircle2, Save, RotateCw, Download, Trash2, Lock, UserX, ExternalLink, BarChart2, Video, DollarSign, Activity, Share2, Sparkles, ArrowRight, Loader2, Camera, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, updateUser } = useAuth();

  // 0. Profile State
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileBio, setProfileBio] = useState(user?.bio || '');
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar || '');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // 1. Website Information State
  const [siteName, setSiteName] = useState('');
  const [siteTagline, setSiteTagline] = useState('');
  const [email, setEmail] = useState('');
  const [primaryLang, setPrimaryLang] = useState('Bangla');
  const [timezone, setTimezone] = useState('(GMT+05:30) Kolkata, India');
  const [dateFormat, setDateFormat] = useState('May 21, 2024 (MMMM DD, YYYY)');

  // 2. Site Settings Toggles
  const [siteSettings, setSiteSettings] = useState({
    siteStatus: true,
    userComments: true,
    autoPublish: false,
    authorBio: true,
    relatedPosts: true,
    enableSearch: true,
  });

  // 3. Notifications Toggles
  const [notifications, setNotifications] = useState({
    commentAlerts: true,
    reporterSignup: true,
    assignmentAlerts: true,
    editorialReview: false,
  });

  // 4. Security State
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30 Minutes');

  // 6. Preferences State
  const [dashLang, setDashLang] = useState('English');
  const [dashTheme, setDashTheme] = useState('Light');
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [defaultLanding, setDefaultLanding] = useState('Dashboard');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        if (data.success && data.data) {
          const s = data.data;
          
          if (s.siteName) setSiteName(s.siteName);
          if (s.siteTagline) setSiteTagline(s.siteTagline);
          if (s.email) setEmail(s.email);
          if (s.primaryLang) setPrimaryLang(s.primaryLang);
          if (s.timezone) setTimezone(s.timezone);
          if (s.dateFormat) setDateFormat(s.dateFormat);
          
          if (s.siteSettings) setSiteSettings(s.siteSettings);
          if (s.notifications) setNotifications(s.notifications);
          
          if (s.twoFactor !== undefined) setTwoFactor(s.twoFactor);
          if (s.sessionTimeout) setSessionTimeout(s.sessionTimeout);
          
          if (s.dashLang) setDashLang(s.dashLang);
          if (s.dashTheme) setDashTheme(s.dashTheme);
          if (s.rowsPerPage) setRowsPerPage(s.rowsPerPage);
          if (s.defaultLanding) setDefaultLanding(s.defaultLanding);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        showToast('সেটিংস লোড করতে সমস্যা হয়েছে।');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSaveAll = async (e) => {
    e.preventDefault();
    try {
      const updates = {
        siteName,
        siteTagline,
        email,
        primaryLang,
        timezone,
        dateFormat,
        siteSettings,
        notifications,
        twoFactor,
        sessionTimeout,
        dashLang,
        dashTheme,
        rowsPerPage,
        defaultLanding
      };
      const { data } = await api.put('/settings', updates);
      if (data.success) {
        showToast('গ্লোবাল ওয়েবসাইট সেটিংস সফলভাবে আপডেট ও সেভ করা হয়েছে!');
      }
    } catch (error) {
      console.error('Save settings error:', error);
      showToast('সেটিংস সেভ করতে সমস্যা হয়েছে।');
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/auth/profile', {
        name: profileName,
        bio: profileBio,
        avatar: profileAvatar
      });
      if (data.success) {
        updateUser({ ...user, ...data.data });
        showToast('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
      }
    } catch (err) {
      console.error('Save profile error:', err);
      showToast('প্রোফাইল আপডেট করতে সমস্যা হয়েছে।');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploadingAvatar(true);

    try {
      const { data } = await api.put('/auth/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data.success) {
        setProfileAvatar(data.data.avatar);
        updateUser({ ...user, avatar: data.data.avatar });
        showToast('ছবি সফলভাবে আপলোড হয়েছে!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast('ছবি আপলোডে সমস্যা হয়েছে।');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const toggleSiteSetting = (key) => {
    setSiteSettings({ ...siteSettings, [key]: !siteSettings[key] });
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-[#eb1c24] animate-spin" />
        <h2 className="text-xl font-bold text-slate-700 font-outfit">Loading Settings...</h2>
        <p className="text-sm text-slate-500 text-center max-w-md font-medium">
          Please wait while we fetch your website configurations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-slate-800 relative pb-12">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders size={22} className="text-purple-600" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Settings</h1>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Manage your website configuration and preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-red-500/20 transition-all cursor-pointer self-start sm:self-auto uppercase tracking-wider"
        >
          <Save size={15} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Section 0: Profile Settings */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 relative">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <User size={18} className="text-[#eb1c24]" />
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Profile Settings</h3>
            <p className="text-[11px] text-slate-400 font-medium">Update your admin profile picture and bio.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative group shrink-0">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 relative bg-slate-100">
              <img 
                src={profileAvatar || `https://ui-avatars.com/api/?name=${profileName || 'Admin'}&background=eb1c24&color=fff`}
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleAvatarUpload}
                disabled={uploadingAvatar}
                accept="image/*"
              />
            </div>
            {uploadingAvatar && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-md border border-slate-200 text-[10px] font-bold text-[#eb1c24] flex items-center gap-1">
                <Loader2 size={10} className="animate-spin" /> Uploading
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-4 w-full">
            <div>
              <label className="block text-slate-700 mb-1 font-bold text-xs">Display Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] text-sm font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 font-bold text-xs">Bio / Designation</label>
              <input
                type="text"
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] text-sm font-medium text-slate-900"
                placeholder="e.g. Super Admin | Head of Editorial"
              />
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleProfileSave}
            className="md:mt-6 bg-slate-900 hover:bg-black text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer w-full md:w-auto"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Section 1: 1. Website Information */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Globe size={18} className="text-purple-600" />
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">1. Website Information</h3>
            <p className="text-[11px] text-slate-400 font-medium">Basic information about your website.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form Inputs (8 Cols) */}
          <div className="lg:col-span-8 space-y-4 text-xs font-semibold">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Website Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Website Tagline</label>
                <input
                  type="text"
                  value={siteTagline}
                  onChange={(e) => setSiteTagline(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Primary Language</label>
                <select
                  value={primaryLang}
                  onChange={(e) => setPrimaryLang(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Bangla">Bangla</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="(GMT+05:30) Kolkata, India">(GMT+05:30) Kolkata, India</option>
                  <option value="(GMT+06:00) Dhaka, Bangladesh">(GMT+06:00) Dhaka, Bangladesh</option>
                  <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Date Format</label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="May 21, 2024 (MMMM DD, YYYY)">May 21, 2024 (MMMM DD, YYYY)</option>
                  <option value="21/05/2024 (DD/MM/YYYY)">21/05/2024 (DD/MM/YYYY)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Logo Upload Box (4 Cols) */}
          <div className="lg:col-span-4 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-xs font-bold text-slate-700">Website Logo</span>

            <div className="w-20 h-20 rounded-full bg-[#eb1c24] text-white flex items-center justify-center shadow-md border-2 border-white">
              <span className="font-black text-2xl tracking-tighter">N</span>
            </div>

            <button
              type="button"
              onClick={() => showToast('নতুন লোগো ছবি নির্বাচন করুন!')}
              className="px-4 py-1.5 bg-white border border-purple-200 text-purple-700 text-xs font-bold rounded-xl hover:bg-purple-50 transition-colors shadow-2xs cursor-pointer"
            >
              Change Logo
            </button>

            <p className="text-[10px] text-slate-400 font-medium max-w-[200px]">
              Recommended size: 512 x 512px JPG, PNG or SVG. Max size 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: 2. Site Settings */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Sliders size={18} className="text-purple-600" />
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">2. Site Settings</h3>
            <p className="text-[11px] text-slate-400 font-medium">Configure general site behavior and default options.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 text-xs font-semibold">
          {/* Card 1 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-slate-900 text-xs">Site Status</h5>
              <p className="text-[10px] text-slate-400 font-normal mt-0.5">Enable or disable the website</p>
            </div>
            <button
              type="button"
              onClick={() => toggleSiteSetting('siteStatus')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${siteSettings.siteStatus ? 'bg-purple-600' : 'bg-slate-300'}`}
            >
              <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${siteSettings.siteStatus ? 'right-0.75' : 'left-0.75'}`} />
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-slate-900 text-xs">Allow User Comments</h5>
              <p className="text-[10px] text-slate-400 font-normal mt-0.5">Enable comments on posts and videos</p>
            </div>
            <button
              type="button"
              onClick={() => toggleSiteSetting('userComments')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${siteSettings.userComments ? 'bg-purple-600' : 'bg-slate-300'}`}
            >
              <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${siteSettings.userComments ? 'right-0.75' : 'left-0.75'}`} />
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-slate-900 text-xs">Auto Publish Posts</h5>
              <p className="text-[10px] text-slate-400 font-normal mt-0.5">Publish posts without review</p>
            </div>
            <button
              type="button"
              onClick={() => toggleSiteSetting('autoPublish')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${siteSettings.autoPublish ? 'bg-purple-600' : 'bg-slate-300'}`}
            >
              <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${siteSettings.autoPublish ? 'right-0.75' : 'left-0.75'}`} />
            </button>
          </div>

          {/* Card 4 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-slate-900 text-xs">Show Author Bio</h5>
              <p className="text-[10px] text-slate-400 font-normal mt-0.5">Display author info below content</p>
            </div>
            <button
              type="button"
              onClick={() => toggleSiteSetting('authorBio')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${siteSettings.authorBio ? 'bg-purple-600' : 'bg-slate-300'}`}
            >
              <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${siteSettings.authorBio ? 'right-0.75' : 'left-0.75'}`} />
            </button>
          </div>

          {/* Card 5 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-slate-900 text-xs">Show Related Posts</h5>
              <p className="text-[10px] text-slate-400 font-normal mt-0.5">Display related posts at article end</p>
            </div>
            <button
              type="button"
              onClick={() => toggleSiteSetting('relatedPosts')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${siteSettings.relatedPosts ? 'bg-purple-600' : 'bg-slate-300'}`}
            >
              <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${siteSettings.relatedPosts ? 'right-0.75' : 'left-0.75'}`} />
            </button>
          </div>

          {/* Card 6 */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-slate-900 text-xs">Enable Search</h5>
              <p className="text-[10px] text-slate-400 font-normal mt-0.5">Allow users to search content</p>
            </div>
            <button
              type="button"
              onClick={() => toggleSiteSetting('enableSearch')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${siteSettings.enableSearch ? 'bg-purple-600' : 'bg-slate-300'}`}
            >
              <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${siteSettings.enableSearch ? 'right-0.75' : 'left-0.75'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: 3. Notifications & 4. Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 3. Notifications */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
              <Bell size={18} className="text-purple-600" />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">3. Notifications</h3>
                <p className="text-[11px] text-slate-400 font-medium">Manage email and system notifications.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">New Comment Alerts</h5>
                  <span className="text-[10px] text-slate-400 font-normal">Receive email on new comments</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('commentAlerts')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${notifications.commentAlerts ? 'bg-purple-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${notifications.commentAlerts ? 'right-0.75' : 'left-0.75'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">New Reporter Signup</h5>
                  <span className="text-[10px] text-slate-400 font-normal">Receive email on new reporter signup</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('reporterSignup')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${notifications.reporterSignup ? 'bg-purple-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${notifications.reporterSignup ? 'right-0.75' : 'left-0.75'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">Assignment Alerts</h5>
                  <span className="text-[10px] text-slate-400 font-normal">Receive email on new assignments</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('assignmentAlerts')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${notifications.assignmentAlerts ? 'bg-purple-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${notifications.assignmentAlerts ? 'right-0.75' : 'left-0.75'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">Editorial Review Alerts</h5>
                  <span className="text-[10px] text-slate-400 font-normal">Receive email on editorial review updates</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('editorialReview')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${notifications.editorialReview ? 'bg-purple-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${notifications.editorialReview ? 'right-0.75' : 'left-0.75'}`} />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showToast('নোটিফিকেশন কনফিগারেশন আপডেট করা হয়েছে!')}
            className="w-full py-2 bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-extrabold rounded-xl transition-colors cursor-pointer mt-2"
          >
            Configure Notifications
          </button>
        </div>

        {/* 4. Security */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
              <Shield size={18} className="text-purple-600" />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">4. Security</h3>
                <p className="text-[11px] text-slate-400 font-medium">Manage password and security preferences.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">Two-Factor Authentication</h5>
                  <span className="text-[10px] text-slate-400 font-normal">Add an extra layer of security</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${twoFactor ? 'bg-purple-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all ${twoFactor ? 'right-0.75' : 'left-0.75'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">Session Timeout</h5>
                  <span className="text-[10px] text-slate-400 font-normal">Automatically logout after inactivity</span>
                </div>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 px-2 py-1 outline-none cursor-pointer"
                >
                  <option value="30 Minutes">30 Minutes</option>
                  <option value="1 Hour">1 Hour</option>
                  <option value="2 Hours">2 Hours</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">Password Policy</h5>
                  <span className="text-[10px] text-slate-400 font-normal">Set strong password policy for users</span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('পাসওয়ার্ড পলিসি কনফিগারেশন খোলা হলো!')}
                  className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer text-xs"
                >
                  Configure
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">Login Activity</h5>
                  <span className="text-[10px] text-slate-400 font-normal">View recent login history</span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('লগইন হিস্ট্রি লগ খোলা হলো!')}
                  className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer text-xs"
                >
                  View Logs
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showToast('সিকিউরিটি সেটিংস আপডেট করা হয়েছে!')}
            className="w-full py-2 bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-extrabold rounded-xl transition-colors cursor-pointer mt-2"
          >
            Update Security Settings
          </button>
        </div>

      </div>

      {/* Section 5: 5. Integrations & Social Connector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-purple-600" />
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">5. Integrations & Social Connector</h3>
              <p className="text-[11px] text-slate-400 font-medium">Manage social media accounts, APIs, and auto-publishing rules.</p>
            </div>
          </div>

          <Link
            to="/social-connector"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer self-start sm:self-auto"
          >
            <Share2 size={14} />
            <span>Open Social Connector Hub</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
          {/* Card 1: Google Analytics */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <BarChart2 size={16} />
                </div>
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">Connected</span>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Google Analytics</h5>
                <p className="text-[10px] text-slate-400 font-normal">Track website analytics</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
              <span className="font-mono text-slate-400">UA-XXXXXXXX-X</span>
              <button
                type="button"
                onClick={() => showToast('Google Analytics সেটিংস খোলা হলো!')}
                className="px-2.5 py-1 bg-white border border-purple-200 text-purple-700 font-bold rounded-lg hover:bg-purple-50 cursor-pointer"
              >
                Manage
              </button>
            </div>
          </div>

          {/* Card 2: Facebook Pixel */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                  f
                </div>
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">Connected</span>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Facebook Pixel</h5>
                <p className="text-[10px] text-slate-400 font-normal">Track ad performance</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
              <span className="font-mono text-slate-400">Pixel ID: 1234567890</span>
              <button
                type="button"
                onClick={() => showToast('Facebook Pixel সেটিংস খোলা হলো!')}
                className="px-2.5 py-1 bg-white border border-purple-200 text-purple-700 font-bold rounded-lg hover:bg-purple-50 cursor-pointer"
              >
                Manage
              </button>
            </div>
          </div>

          {/* Card 3: YouTube API */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Video size={16} />
                </div>
                <span className="text-[9px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">Not Connected</span>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">YouTube API</h5>
                <p className="text-[10px] text-slate-400 font-normal">Manage YouTube integrations</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
              <span className="font-mono text-slate-400">-</span>
              <button
                type="button"
                onClick={() => showToast('YouTube API কানেক্ট করা হলো!')}
                className="px-2.5 py-1 bg-white border border-purple-200 text-purple-700 font-bold rounded-lg hover:bg-purple-50 cursor-pointer"
              >
                Connect
              </button>
            </div>
          </div>

          {/* Card 4: Google AdSense */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <DollarSign size={16} />
                </div>
                <span className="text-[9px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">Not Connected</span>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Google AdSense</h5>
                <p className="text-[10px] text-slate-400 font-normal">Monetize your content</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
              <span className="font-mono text-slate-400">-</span>
              <button
                type="button"
                onClick={() => showToast('Google AdSense কানেক্ট করা হলো!')}
                className="px-2.5 py-1 bg-white border border-purple-200 text-purple-700 font-bold rounded-lg hover:bg-purple-50 cursor-pointer"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 6: 6. Preferences */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Sliders size={18} className="text-purple-600" />
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">6. Preferences</h3>
            <p className="text-[11px] text-slate-400 font-medium">Customize your dashboard and preferences.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-between gap-4 text-xs font-semibold">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1 w-full">
            <div>
              <label className="block text-slate-700 mb-1 font-bold">Dashboard Language</label>
              <select
                value={dashLang}
                onChange={(e) => setDashLang(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-bold">Dashboard Theme</label>
              <select
                value={dashTheme}
                onChange={(e) => setDashTheme(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-bold">Rows Per Page</label>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-bold">Default Landing Page</label>
              <select
                value={defaultLanding}
                onChange={(e) => setDefaultLanding(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
              >
                <option value="Dashboard">Dashboard</option>
                <option value="Posts">Posts</option>
                <option value="Analytics">Analytics</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showToast('ড্যাশবোর্ড প্রেফারেন্স সেভ করা হয়েছে!')}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer shrink-0"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Section 7: 7. Data Management */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Database size={18} className="text-purple-600" />
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">7. Data Management</h3>
            <p className="text-[11px] text-slate-400 font-medium">Manage and export your website data.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <h5 className="font-bold text-slate-900">Export Website Data</h5>
              <p className="text-[10px] text-slate-400 font-normal mt-0.5">Download all your website data</p>
            </div>
            <button
              type="button"
              onClick={() => showToast('সকল ওয়েবসাইট ডাটা ডাউনলোড শুরু হয়েছে!')}
              className="px-3.5 py-1.5 bg-white border border-purple-200 text-purple-700 font-bold rounded-xl hover:bg-purple-50 cursor-pointer shadow-2xs"
            >
              Export
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <h5 className="font-bold text-slate-900">Backup Database</h5>
              <p className="text-[10px] text-slate-400 font-normal mt-0.5">Create a complete database backup</p>
            </div>
            <button
              type="button"
              onClick={() => showToast('ডাটাবেজ ব্যাকআপ সফলভাবে তৈরি হয়েছে!')}
              className="px-3.5 py-1.5 bg-white border border-purple-200 text-purple-700 font-bold rounded-xl hover:bg-purple-50 cursor-pointer shadow-2xs"
            >
              Backup
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <h5 className="font-bold text-slate-900">Clear Cache</h5>
              <p className="text-[10px] text-slate-400 font-normal mt-0.5">Clear system cache and temporary files</p>
            </div>
            <button
              type="button"
              onClick={() => showToast('সিস্টেম ক্যাশ পরিষ্কার করা হয়েছে!')}
              className="px-3.5 py-1.5 bg-white border border-purple-200 text-purple-700 font-bold rounded-xl hover:bg-purple-50 cursor-pointer shadow-2xs"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Section 8: 8. Account Actions */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <AlertTriangle size={18} className="text-rose-600" />
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">8. Account Actions</h3>
            <p className="text-[11px] text-slate-400 font-medium">Important actions for your account.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Lock size={15} />
              </div>
              <div>
                <h5 className="font-bold text-slate-900">Change Password</h5>
                <p className="text-[10px] text-slate-400 font-normal">Update your account password</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('পাসওয়ার্ড পরিবর্তন ফর্ম ওপেন করা হলো!')}
              className="px-3.5 py-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl cursor-pointer shadow-2xs"
            >
              Change
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <UserX size={15} />
              </div>
              <div>
                <h5 className="font-bold text-slate-900">Deactivate Account</h5>
                <p className="text-[10px] text-slate-400 font-normal">Temporarily deactivate account</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('অ্যাকাউন্ট ডিঅ্যাক্টিভেশন অপশন খোলা হলো!')}
              className="px-3.5 py-1.5 bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 font-bold rounded-xl cursor-pointer shadow-2xs"
            >
              Deactivate
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 size={15} />
              </div>
              <div>
                <h5 className="font-bold text-slate-900">Delete Account</h5>
                <p className="text-[10px] text-slate-400 font-normal">Permanently delete your account</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('অ্যাকাউন্ট ডিলিট মোডাল ওপেন করা হলো!')}
              className="px-3.5 py-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl cursor-pointer shadow-2xs"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 font-semibold">
        <span>© 2024 Nirbhik Bangla. All rights reserved.</span>
        <span className="font-mono">Version 1.0.0</span>
      </div>

    </div>
  );
}
