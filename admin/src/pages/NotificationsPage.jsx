import { useState, useEffect } from 'react';
import {
  Bell, Send, Users, Smartphone, Monitor, CheckCircle2, AlertCircle, Clock,
  Eye, MousePointer, ShieldCheck, Image, Link, Sparkles, Filter
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export default function NotificationsPage() {
  const [stats, setStats] = useState({
    totalActive: 0,
    totalMobile: 0,
    totalDesktop: 0,
    totalLogs: 0
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: '',
    url: '/',
    target: 'all'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/stats`);
      const data = await res.json();
      if (data.success && data.data) {
        setStats(data.data.stats || {});
        setLogs(data.data.recentLogs || []);
      }
    } catch (err) {
      console.error('Error fetching notification stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) {
      showToast('শিরোনাম ও নোটিফিকেশনের বার্তা দিন');
      return;
    }

    setSending(true);
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/notifications/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        showToast(`পুশ নোটিফিকেশন সফলভাবে পঠানো হয়েছে (${data.data.totalDelivered} ডিভাইসে পৌছেছে)`);
        setFormData({ title: '', body: '', image: '', url: '/', target: 'all' });
        fetchStats();
      } else {
        showToast(data.message || 'নোটিফিকেশন পাঠাতে ব্যর্থ হয়েছে');
      }
    } catch (err) {
      showToast('নোটিফিকেশন সার্ভিসে সমস্যা হয়েছে');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6 font-outfit text-slate-800 pb-12">
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-red-500/30">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Bell size={24} className="text-[#eb1c24]" /> Web Push Notification Manager
        </h1>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">
          পাঠকদের ব্রাউজার ও ডিভাইসে ব্রেকিং নিউজ এবং লাইভ আপডেট নোটিফিকেশন পাঠান।
        </p>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-[#eb1c24] flex items-center justify-center font-black shrink-0">
            <Users size={22} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 block">Total Push Subscribers</span>
            <span className="text-xl font-black text-slate-900">{stats.totalActive.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black shrink-0">
            <Smartphone size={22} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 block">Mobile Devices</span>
            <span className="text-xl font-black text-slate-900">{stats.totalMobile.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black shrink-0">
            <Monitor size={22} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 block">Desktop Devices</span>
            <span className="text-xl font-black text-slate-900">{stats.totalDesktop.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black shrink-0">
            <Send size={22} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 block">Total Broadcasts Sent</span>
            <span className="text-xl font-black text-slate-900">{stats.totalLogs.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Broadcast Composer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form Col (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Send size={18} className="text-[#eb1c24]" /> Compose Push Notification
              </h3>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                Instant Broadcast
              </span>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notification Title (শিরোনাম) *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="ব্রেকিং নিউজ: পশ্চিম বর্ধমানে নতুন সিদ্ধান্ত..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#eb1c24]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notification Body (বার্তা) *</label>
                <textarea
                  rows={3}
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  placeholder="বিস্তারিত জানতে এখনই এখানে ক্লিক করে পুরো সংবাদটি পড়ুন..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#eb1c24] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Link URL (ক্লিক লিংক)</label>
                  <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="/live অথবা /news/slug"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#eb1c24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience (প্রাপক)</label>
                  <select
                    name="target"
                    value={formData.target}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white outline-none focus:border-[#eb1c24]"
                  >
                    <option value="all">All Subscribers (সকল ডিভাইস)</option>
                    <option value="breaking">Breaking News Audience</option>
                    <option value="live">Live TV Viewers</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Image URL (অপশনাল)</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://domain.com/image.jpg"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[#eb1c24] hover:bg-red-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-red-500/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{sending ? 'পাঠানো হচ্ছে...' : 'Send Broadcast Now'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Live Preview Col (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Live Device Push Preview</span>
              <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">LIVE PREVIEW</span>
            </div>

            {/* Mobile Notification Pop Mock */}
            <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 shadow-2xl space-y-3 font-outfit">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#eb1c24] flex items-center justify-center text-white text-[9px] font-black">
                    N
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-300">NIRBHIK BANGLA</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">এখনই</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-white leading-snug">
                  {formData.title || 'ব্রেকিং নিউজ: শিরোনাম এখানে দেখা যাবে...'}
                </h4>
                <p className="text-[11px] text-slate-300 font-medium leading-normal line-clamp-2">
                  {formData.body || 'নোটিফিকেশনের বিস্তারিত বার্তাটি পাঠকদের ডিভাইসে এভাবে প্রদর্শিত হবে।'}
                </p>
              </div>

              {formData.image && (
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-700">
                  <img src={formData.image} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-extrabold text-red-400">
                <span>পড়ুন 📖</span>
                <span className="text-slate-500">বন্ধ করুন</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center font-medium">
              পাঠকরা এই নোটিফিকেশনে ক্লিক করলেই নির্দিষ্ট লিংকে প্রবেশ করবেন।
            </p>
          </div>
        </div>

      </div>

      {/* Broadcast History Table */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <h3 className="text-lg font-black text-slate-900">Broadcast History & Analytics</h3>
        
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Title & Message</th>
                  <th className="py-3 px-4">Target</th>
                  <th className="py-3 px-4">Sent Time</th>
                  <th className="py-3 px-4">Delivered</th>
                  <th className="py-3 px-4">Clicks (CTR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <h4 className="font-extrabold text-slate-900 text-xs">{log.title?.bn || log.title?.en}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{log.body?.bn || log.body?.en}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-extrabold rounded-md uppercase">
                        {log.target}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(log.sentAt).toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-slate-800">
                      {log.totalDelivered} / {log.totalTargeted}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                      {log.totalClicked} ({log.totalDelivered ? Math.round((log.totalClicked / log.totalDelivered) * 100) : 0}%)
                    </td>
                  </tr>
                ))}

                {logs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 text-xs font-semibold">
                      কোনো পূর্ববর্তী নোটিফিকেশন ব্রডকাস্টের হিস্টোরি পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
