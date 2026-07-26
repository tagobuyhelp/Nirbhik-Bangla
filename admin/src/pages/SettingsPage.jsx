import { useState } from 'react';
import {
  Globe,
  Shield,
  Bell,
  Palette,
  Database,
  Lock,
  CheckCircle2,
  Save,
  Server,
  Key,
  Sliders,
} from 'lucide-react';

export default function SettingsPage() {
  const [toastMessage, setToastMessage] = useState('');
  const [siteName, setSiteName] = useState('Nirbhik Bangla (নির্ভীক বাংলা)');
  const [tagline, setTagline] = useState('সত্যের সাথে, নির্ভীক কণ্ঠে');
  const [adminEmail, setAdminEmail] = useState('admin@nirbhikbangla.com');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast('গ্লোবাল ওয়েবসাইট সেটিংস সফলভাবে আপডেট করা হয়েছে!');
  };

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-10">

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
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
            Portal Settings
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Configure global website settings, security policies, and notification preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer font-outfit uppercase tracking-wider self-start sm:self-auto"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* 2. Main 2-Column Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Settings Navigation Links (3 Cols) */}
        <div className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs font-bold text-xs">
          <button className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 font-extrabold text-left cursor-pointer">
            <Globe size={16} />
            <span>General Settings</span>
          </button>
          <button onClick={() => showToast('Security Settings Panel opened!')} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors text-left cursor-pointer">
            <Shield size={16} />
            <span>Security & Auth</span>
          </button>
          <button onClick={() => showToast('SEO Settings Panel opened!')} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors text-left cursor-pointer">
            <Sliders size={16} />
            <span>SEO & Meta Tags</span>
          </button>
          <button onClick={() => showToast('Notifications Panel opened!')} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors text-left cursor-pointer">
            <Bell size={16} />
            <span>Notifications</span>
          </button>
          <button onClick={() => showToast('API Keys Panel opened!')} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors text-left cursor-pointer">
            <Key size={16} />
            <span>API & Integrations</span>
          </button>
        </div>

        {/* Settings Form Container (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3">
              General Portal Configuration
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Portal Title (Bangla/English)</label>
                <input
                  type="text"
                  required
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Portal Tagline / Slogan</label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bangla text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Primary Administrator Email</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl shadow-md cursor-pointer font-outfit uppercase tracking-wider text-xs"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}
