import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';
import {
  Share2,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Zap,
  Globe2,
  Clock,
  X,
  Key,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';

// Helper: check if an account has real credentials saved
const hasCredentials = (acc) => {
  if (acc.platform === 'telegram') return !!(acc.botToken && acc.chatId);
  return !!(acc.appId || acc.accessToken);
};

export default function SocialConnectorPage() {
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);

  const [accounts, setAccounts] = useState([]);

  // Credentials Modal
  const [editingAccount, setEditingAccount] = useState(null);
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [appId, setAppId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  // AI Caption Generator
  const [postTitle, setPostTitle] = useState('');
  const [generatedCaptions, setGeneratedCaptions] = useState({
    facebook: '',
    telegram: '',
    twitter: '',
    whatsapp: ''
  });

  // Broadcast Logs
  const [logs, setLogs] = useState([]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const fetchSocialAccounts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/social`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const iconColors = {
          facebook: 'bg-blue-600 text-white',
          telegram: 'bg-cyan-500 text-white',
          youtube: 'bg-red-600 text-white',
          twitter: 'bg-slate-900 text-white',
          whatsapp: 'bg-emerald-600 text-white',
          instagram: 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white'
        };
        setAccounts(data.data.map((acc) => ({
          id: acc._id || acc.platform,
          _id: acc._id,
          platform: acc.platform,
          name: acc.name,
          handle: acc.handle,
          badge: acc.badge || '',
          followerCount: acc.followerCount || '0',
          connected: acc.isConnected,
          autoPost: acc.autoPost,
          botToken: acc.botToken || '',
          chatId: acc.chatId || '',
          appId: acc.appId || '',
          accessToken: acc.accessToken || '',
          iconColor: iconColors[acc.platform] || 'bg-slate-800 text-white'
        })));
      }
    } catch (err) {
      console.error('Error fetching social accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSocialAccounts(); }, []);

  // "Connect" button: only allow if credentials exist — otherwise open config modal
  const handleConnectClick = (acc) => {
    if (acc.connected) {
      // Disconnect — always allowed
      toggleConnection(acc, false);
    } else {
      // Connect — only if API credentials are configured
      if (!hasCredentials(acc)) {
        showToast(`⚠️ প্রথমে ${acc.name} এর API Key / Token সেটআপ করুন!`);
        openConfigModal(acc);
        return;
      }
      toggleConnection(acc, true);
    }
  };

  const toggleConnection = async (accObj, nextConnected) => {
    setAccounts(prev => prev.map(a => a.id === accObj.id ? { ...a, connected: nextConnected } : a));
    try {
      await fetch(`${API_BASE_URL}/social/${accObj._id || accObj.platform}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isConnected: nextConnected })
      });
      showToast(nextConnected ? `✅ ${accObj.name} সফলভাবে কানেক্ট হয়েছে!` : `${accObj.name} ডিসকানেক্ট করা হয়েছে।`);
    } catch (err) {
      showToast('কানেকশন আপডেট করতে সমস্যা হয়েছে!');
    }
  };

  const toggleAutoPost = async (accObj) => {
    if (!accObj.connected) {
      showToast('⚠️ প্রথমে প্ল্যাটফর্মটি কানেক্ট করুন!');
      return;
    }
    const next = !accObj.autoPost;
    setAccounts(prev => prev.map(a => a.id === accObj.id ? { ...a, autoPost: next } : a));
    try {
      await fetch(`${API_BASE_URL}/social/${accObj._id || accObj.platform}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoPost: next })
      });
      showToast(next ? 'অটো-পোস্ট চালু করা হয়েছে!' : 'অটো-পোস্ট বন্ধ করা হয়েছে।');
    } catch (err) {
      showToast('সেটিংস আপডেট করতে সমস্যা হয়েছে!');
    }
  };

  const openConfigModal = (accObj) => {
    setEditingAccount(accObj);
    setBotToken(accObj.botToken || '');
    setChatId(accObj.chatId || '');
    setAppId(accObj.appId || '');
    setAccessToken(accObj.accessToken || '');
  };

  const handleSaveCredentials = async (e) => {
    e?.preventDefault();
    if (!editingAccount) return;

    // Validate required fields
    if (editingAccount.platform === 'telegram') {
      if (!botToken.trim() || !chatId.trim()) {
        showToast('⚠️ Bot Token এবং Chat ID দুটোই আবশ্যক!');
        return;
      }
    } else {
      if (!accessToken.trim()) {
        showToast('⚠️ Access Token / API Secret আবশ্যক!');
        return;
      }
    }

    try {
      const res = await fetch(`${API_BASE_URL}/social/${editingAccount._id || editingAccount.platform}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botToken, chatId, appId, accessToken, isConnected: true })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`✅ ${editingAccount.name} ক্রেডেনশিয়ালস সেভ ও কানেক্ট হয়েছে!`);
        setEditingAccount(null);
        fetchSocialAccounts();
      }
    } catch (err) {
      showToast('ক্রেডেনশিয়ালস সেভ করতে সমস্যা হয়েছে!');
    }
  };

  const handleAiGenerateCaptions = async () => {
    if (!postTitle.trim()) {
      showToast('অনুগ্রহ করে সংবাদের শিরোনাম লিখুন!');
      return;
    }
    try {
      setGeneratingAi(true);
      showToast('🤖 AI ক্যাপশন তৈরি হচ্ছে...');
      const res = await fetch(`${API_BASE_URL}/social/generate-captions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: postTitle, excerpt: postTitle, lang: 'bn' })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedCaptions({
          facebook: data.data.facebook || '',
          telegram: data.data.telegram || '',
          twitter: data.data.twitter || '',
          whatsapp: data.data.whatsapp || ''
        });
        showToast('✨ AI ক্যাপশন জেনারেট সম্পন্ন!');
      } else {
        // Fallback
        setGeneratedCaptions({
          facebook: `🚨 ব্রেকিং নিউজ | ${postTitle}। বিস্তারিত পড়ুন নির্ভীক বাংলায়। #NirbhikBangla`,
          telegram: `⚡ **নির্ভীক বাংলা**\n\n${postTitle}\n\n📌 পড়ুন: https://nirbhikbangla.com`,
          twitter: `🚨 ${postTitle.slice(0, 200)} #NirbhikBangla`,
          whatsapp: `📰 *নির্ভীক বাংলা*\n${postTitle}`
        });
        showToast('✨ ক্যাপশন প্রস্তুত করা হয়েছে!');
      }
    } catch (err) {
      showToast('ক্যাপশন জেনারেট করতে সমস্যা হয়েছে!');
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleBroadcastAll = async () => {
    const connectedPlatforms = accounts.filter(a => a.connected);
    if (connectedPlatforms.length === 0) {
      showToast('⚠️ কোনো প্ল্যাটফর্ম কানেক্ট নেই! প্রথমে API সেটআপ করুন।');
      return;
    }
    if (!postTitle.trim()) {
      showToast('⚠️ ব্রডকাস্ট করতে শিরোনাম লিখুন!');
      return;
    }
    try {
      setPublishing(true);
      showToast('🚀 ব্রডকাস্ট চলছে...');
      const res = await fetch(`${API_BASE_URL}/social/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: postTitle,
          captions: generatedCaptions,
          targetPlatforms: connectedPlatforms.map(a => a.platform)
        })
      });
      const data = await res.json();
      if (data.success) {
        setLogs(prev => [{
          id: Date.now(),
          title: postTitle,
          platform: connectedPlatforms.map(a => a.name).join(', '),
          status: 'Published',
          time: new Date().toLocaleTimeString('bn-BD')
        }, ...prev]);
        showToast('🎉 সকল কানেক্টেড প্ল্যাটফর্মে পাবলিশ হয়েছে!');
      }
    } catch (err) {
      showToast('ব্রডকাস্ট করতে সমস্যা হয়েছে!');
    } finally {
      setPublishing(false);
    }
  };

  const connectedCount = accounts.filter(a => a.connected).length;
  const configuredCount = accounts.filter(a => hasCredentials(a)).length;

  return (
    <div className="max-w-7xl w-full mx-auto space-y-6 font-outfit text-slate-800 relative pb-12">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Share2 size={22} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Social Media Connector</h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              API Key সেটআপ করে প্ল্যাটফর্ম কানেক্ট করুন, তারপর এক ক্লিকে সংবাদ ব্রডকাস্ট করুন।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button onClick={fetchSocialAccounts} className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer" title="Refresh">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleBroadcastAll}
            disabled={publishing || connectedCount === 0}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider disabled:opacity-50"
          >
            <Zap size={16} />
            <span>{publishing ? 'Broadcasting...' : `Broadcast (${connectedCount})`}</span>
          </button>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Globe2 size={18} className="text-blue-600" />
            <span>Social Platforms ({configuredCount} configured, {connectedCount} active)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc) => {
            const configured = hasCredentials(acc);
            return (
              <div
                key={acc.id}
                className={`p-4 rounded-2xl border transition-all space-y-3 ${
                  acc.connected
                    ? 'bg-white border-emerald-200 shadow-sm'
                    : configured
                      ? 'bg-slate-50/50 border-slate-200/80'
                      : 'bg-slate-100/40 border-dashed border-slate-300 opacity-75'
                }`}
              >
                {/* Row 1: Icon + Name + Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${acc.iconColor} flex items-center justify-center shadow-xs shrink-0`}>
                      <Share2 size={18} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-black text-slate-900 text-xs">{acc.name}</h4>
                      <p className="text-[11px] text-slate-400 font-semibold font-mono">{acc.handle}</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {acc.connected ? (
                    <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-0.5">
                      <CheckCircle2 size={10} /> LIVE
                    </span>
                  ) : configured ? (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200">
                      READY
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <ShieldAlert size={10} /> NO API
                    </span>
                  )}
                </div>

                {/* Row 2: Action Buttons */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => openConfigModal(acc)}
                    className="text-[11px] font-bold text-slate-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Key size={13} />
                    <span>{configured ? 'Edit Keys' : 'Setup API'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {acc.connected && (
                      <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-bold text-slate-600">
                        <span>Auto</span>
                        <input
                          type="checkbox"
                          checked={acc.autoPost}
                          onChange={() => toggleAutoPost(acc)}
                          className="rounded text-blue-600 w-3.5 h-3.5 cursor-pointer"
                        />
                      </label>
                    )}

                    <button
                      type="button"
                      onClick={() => handleConnectClick(acc)}
                      className={`text-[11px] font-black px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        acc.connected
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                          : configured
                            ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                            : 'bg-white text-slate-500 border-slate-300 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      {acc.connected ? 'Disconnect' : configured ? 'Connect' : 'Setup →'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Caption Generator + Broadcast Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Caption Generator */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-purple-600" />
                <span>AI Caption Generator</span>
              </h3>
              <button
                type="button"
                disabled={generatingAi || !postTitle.trim()}
                onClick={handleAiGenerateCaptions}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles size={15} className={generatingAi ? 'animate-spin' : ''} />
                <span>{generatingAi ? 'Generating...' : 'AI Generate'}</span>
              </button>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">সংবাদের শিরোনাম *</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="সংবাদ বা ভিডিওর শিরোনাম লিখুন..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-purple-600 font-bangla text-xs font-bold"
                />
              </div>

              {(generatedCaptions.facebook || generatedCaptions.telegram || generatedCaptions.twitter) && (
                <div className="space-y-3 pt-2">
                  {generatedCaptions.facebook && (
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Facebook</label>
                      <textarea rows={2} value={generatedCaptions.facebook} onChange={(e) => setGeneratedCaptions({ ...generatedCaptions, facebook: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none resize-none font-bangla text-xs bg-blue-50/30 focus:border-blue-600" />
                    </div>
                  )}
                  {generatedCaptions.telegram && (
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Telegram</label>
                      <textarea rows={2} value={generatedCaptions.telegram} onChange={(e) => setGeneratedCaptions({ ...generatedCaptions, telegram: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none resize-none font-mono text-xs bg-cyan-50/30 focus:border-cyan-600" />
                    </div>
                  )}
                  {generatedCaptions.twitter && (
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">X / Twitter</label>
                      <textarea rows={2} value={generatedCaptions.twitter} onChange={(e) => setGeneratedCaptions({ ...generatedCaptions, twitter: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none resize-none text-xs bg-slate-50/50 focus:border-slate-900" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Broadcast Logs */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Clock size={18} className="text-slate-600" />
                <span>Broadcast Logs</span>
              </h3>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              {logs.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Clock size={28} className="mx-auto mb-2 opacity-40" />
                  <p className="font-bold">এখনো কোনো ব্রডকাস্ট হয়নি</p>
                  <p className="text-[11px] mt-1">সংবাদ ব্রডকাস্ট করলে এখানে লগ দেখা যাবে।</p>
                </div>
              ) : (
                logs.slice(0, 8).map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50/80 border border-slate-200/70 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {log.platform}
                      </span>
                      <span className="text-slate-400 font-mono">{log.time}</span>
                    </div>
                    <h5 className="font-bold text-slate-900 font-bangla text-xs line-clamp-1">{log.title}</h5>
                    <span className="text-emerald-600 font-bold flex items-center gap-1 text-[10px]">
                      <CheckCircle2 size={11} /> {log.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Credentials Modal */}
      {editingAccount && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl ${editingAccount.iconColor} flex items-center justify-center`}>
                  <Share2 size={14} />
                </div>
                <h3 className="font-black text-sm text-slate-900">{editingAccount.name} API Setup</h3>
              </div>
              <button onClick={() => setEditingAccount(null)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCredentials} className="space-y-4 text-xs font-semibold">
              {editingAccount.platform === 'telegram' ? (
                <>
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Telegram Bot Token <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ..." value={botToken} onChange={(e) => setBotToken(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono outline-none focus:border-cyan-600" />
                    <p className="text-[10px] text-slate-400 mt-1">BotFather থেকে Bot তৈরি করে Token কপি করুন।</p>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Channel Chat ID <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="@NirbhikBanglaNews or -100123456789" value={chatId} onChange={(e) => setChatId(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono outline-none focus:border-cyan-600" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">App ID / Page ID</label>
                    <input type="text" placeholder="Enter App ID or Page ID..." value={appId} onChange={(e) => setAppId(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono outline-none focus:border-blue-600" />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Access Token / API Secret <span className="text-red-500">*</span></label>
                    <input type="password" placeholder="EAACEdEose0cBA..." value={accessToken} onChange={(e) => setAccessToken(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono outline-none focus:border-blue-600" />
                  </div>
                </>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingAccount(null)} className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-md cursor-pointer">Save & Connect</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
