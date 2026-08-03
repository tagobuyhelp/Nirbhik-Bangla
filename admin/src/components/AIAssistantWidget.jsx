import { useState } from 'react';
import { Sparkles, Languages, Link2, Wand2, Loader2, Check, ChevronRight } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export default function AIAssistantWidget({
  title,
  description = '',
  onApplySlug,
  onApplyTitle,
  onApplyTranslation
}) {
  const [loadingSlug, setLoadingSlug] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [headlinesList, setHeadlinesList] = useState([]);
  const [showHeadlinesModal, setShowHeadlinesModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // 1. AI Slug Generator
  const handleGenerateSlug = async () => {
    if (!title || !title.trim()) {
      showStatus('দয়া করে শিরোনাম লিখুন');
      return;
    }
    setLoadingSlug(true);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/seo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, lang: 'bn' })
      });
      const data = await res.json();
      if (data.success && data.data?.slug) {
        onApplySlug(data.data.slug);
        showStatus('AI Slug জেনারেট হয়েছে!');
      } else {
        const fallbackSlug = title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '') || `news-${Date.now()}`;
        onApplySlug(fallbackSlug);
        showStatus('Slug জেনারেট হয়েছে');
      }
    } catch (err) {
      const fallbackSlug = `news-${Date.now()}`;
      onApplySlug(fallbackSlug);
      showStatus('Slug তৈরি হয়েছে');
    } finally {
      setLoadingSlug(false);
    }
  };

  // 2. AI Title Optimizer
  const handleOptimizeTitle = async () => {
    if (!title || title.trim().length < 5) {
      showStatus('শিরোনাম অন্ততঃ ৫ অক্ষরের হতে হবে');
      return;
    }
    setLoadingTitle(true);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/headlines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: title, lang: 'bn' })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setHeadlinesList(data.data);
        setShowHeadlinesModal(true);
      } else {
        showStatus('কোন নতুন শিরোনামের পরামর্শ পাওয়া যায়নি');
      }
    } catch (err) {
      showStatus('Title Optimizer সার্ভিস পেতে সমস্যা হচ্ছে');
    } finally {
      setLoadingTitle(false);
    }
  };

  // 3. AI Translation Services
  const handleTranslateServices = async () => {
    if (!title || !title.trim()) {
      showStatus('অনুবাদ করতে শিরোনাম প্রদান করুন');
      return;
    }
    setLoadingTranslate(true);
    try {
      const res = await fetch(`${API_BASE_URL}/ai/translate-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      const data = await res.json();
      if (data.success && data.data) {
        onApplyTranslation(data.data);
        showStatus('AI অনুবাদ সম্পন্ন হয়েছে!');
      } else {
        showStatus('অনুবাদ করা সম্ভব হয়নি');
      }
    } catch (err) {
      showStatus('Translation সার্ভিস পেতে সমস্যা হচ্ছে');
    } finally {
      setLoadingTranslate(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">AI Content Assistant</h3>
            <p className="text-slate-400 text-xs font-medium mt-0.5">Smart Auto-generation Tools</p>
          </div>
          {statusMessage && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
              {statusMessage}
            </span>
          )}
        </div>

        <div className="space-y-3">
          {/* Card 1: AI Slug Generator */}
          <button
            type="button"
            onClick={handleGenerateSlug}
            disabled={loadingSlug}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 hover:border-purple-300 bg-slate-50/50 hover:bg-purple-50/30 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
                {loadingSlug ? <Loader2 size={18} className="animate-spin" /> : <Link2 size={18} />}
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs group-hover:text-purple-700 transition-colors">AI Slug Generator</h4>
                <p className="text-[11px] text-slate-400 font-medium">Generate SEO friendly slugs instantly</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
          </button>

          {/* Card 2: AI Title Optimizer */}
          <button
            type="button"
            onClick={handleOptimizeTitle}
            disabled={loadingTitle}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 hover:border-blue-300 bg-slate-50/50 hover:bg-blue-50/30 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                {loadingTitle ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs group-hover:text-blue-700 transition-colors">AI Title Optimizer</h4>
                <p className="text-[11px] text-slate-400 font-medium">Optimize title for maximum reach</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Card 3: AI Auto Translate */}
          <button
            type="button"
            onClick={handleTranslateServices}
            disabled={loadingTranslate}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 hover:border-emerald-300 bg-slate-50/50 hover:bg-emerald-50/30 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                {loadingTranslate ? <Loader2 size={18} className="animate-spin" /> : <Languages size={18} />}
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs group-hover:text-emerald-700 transition-colors">AI Auto Translate</h4>
                <p className="text-[11px] text-slate-400 font-medium">Auto translate to multiple languages</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* Headlines Selection Modal */}
      {showHeadlinesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 text-slate-900 p-5 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Wand2 size={16} className="text-blue-600" /> AI Suggested Headlines
              </h3>
              <button onClick={() => setShowHeadlinesModal(false)} className="text-slate-400 hover:text-slate-900 font-bold">✕</button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {headlinesList.map((h, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onApplyTitle(h);
                    setShowHeadlinesModal(false);
                    showStatus('শিরোনাম নির্বাচিত হয়েছে!');
                  }}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 cursor-pointer text-xs font-bold transition-all flex items-center justify-between"
                >
                  <span>{h}</span>
                  <Check size={14} className="text-blue-600 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
