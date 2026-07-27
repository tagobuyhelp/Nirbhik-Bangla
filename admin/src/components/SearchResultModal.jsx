import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Search,
  X,
  FileText,
  Video,
  User,
  Folder,
  ArrowUpRight,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
} from 'lucide-react';

export default function SearchResultModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('india vs england test');

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container Card */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/90 font-outfit max-h-[88vh] flex flex-col">

        {/* 1. Top Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
          <div className="flex items-center gap-3 flex-1">
            <Search size={20} className="text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, videos, reporters, categories..."
              className="w-full text-sm font-semibold text-slate-800 outline-none bg-transparent placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2 py-1 text-[11px] font-black text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
            >
              ESC
            </button>
          </div>
        </div>

        {/* Scrollable Results Area */}
        <div className="overflow-y-auto custom-scrollbar p-5 space-y-6 flex-1 bg-slate-50/40">

          {/* ========================================= */}
          {/* SECTION 1: TOP RESULTS                   */}
          {/* ========================================= */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Top Results
            </h4>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden">
              
              {/* Item 1: Post */}
              <NavLink
                to="/posts"
                onClick={onClose}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-[#eb1c24] border border-red-100 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-extrabold text-slate-900 group-hover:text-[#eb1c24] transition-colors truncate font-bangla">
                      ভারত-ইল্যান্ড টেস্ট সিরিজ: দ্বিতীয় টেস্ট ভারতের ঐতিহাসিক জয়
                    </h5>
                    <span className="text-[11px] font-bold text-red-500 block">Post</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-[11px] font-bold text-slate-400">
                  <span>2 hours ago</span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-[#eb1c24] transition-colors" />
                </div>
              </NavLink>

              {/* Item 2: Video */}
              <NavLink
                to="/videos"
                onClick={onClose}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Video size={18} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors truncate font-outfit">
                      India vs England 2nd Test Highlights 2024
                    </h5>
                    <span className="text-[11px] font-bold text-emerald-600 block">Video</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-[11px] font-bold text-slate-400">
                  <span>5 hours ago</span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              </NavLink>

              {/* Item 3: Reporter */}
              <NavLink
                to="/reporters"
                onClick={onClose}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                    <User size={18} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors truncate font-bangla">
                      রোহিত শর্মা
                    </h5>
                    <span className="text-[11px] font-bold text-purple-600 block">Reporter</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-[11px] font-bold text-slate-400">
                  <span>1 day ago</span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </NavLink>

              {/* Item 4: Category */}
              <NavLink
                to="/categories"
                onClick={onClose}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                    <Folder size={18} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors truncate font-bangla">
                      খেলা &gt; ক্রিকেট &gt; আন্তর্জাতিক ক্রিকেট
                    </h5>
                    <span className="text-[11px] font-bold text-amber-600 block">Category</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-[11px] font-bold text-slate-400">
                  <span>3 days ago</span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
                </div>
              </NavLink>

            </div>

            {/* View All Top Results Link */}
            <div className="text-center pt-1">
              <NavLink
                to="/posts"
                onClick={onClose}
                className="text-xs font-bold text-[#eb1c24] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>View all top results →</span>
              </NavLink>
            </div>
          </div>

          {/* ========================================= */}
          {/* SECTION 2: POSTS (12)                    */}
          {/* ========================================= */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Posts (12)
              </h4>
              <NavLink
                to="/posts"
                onClick={onClose}
                className="text-xs font-bold text-[#eb1c24] hover:underline cursor-pointer"
              >
                View all
              </NavLink>
            </div>

            <div className="space-y-2.5">
              
              {/* Post Card 1 */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=200&auto=format&fit=crop&q=80"
                    alt="Cricket players"
                    className="w-24 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                  />
                  <div className="min-w-0 space-y-1">
                    <h5 className="text-xs font-black text-slate-900 group-hover:text-[#eb1c24] transition-colors truncate font-bangla">
                      ভারত-ইল্যান্ড টেস্ট সিরিজ: দ্বিতীয় টেস্ট ভারতের ঐতিহাসিক জয়
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1 font-bangla">
                      দ্বিতীয় টেস্ট অসাধারণ পারফরম্যান্সের মাধ্যমে ইংল্যান্ডকে ২৮০ রানে হারিয়ে সিরিজ...
                    </p>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="px-2 py-0.5 text-[9.5px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-md">
                        Published
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 hidden sm:block">May 21, 2024</span>
                  <button className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Post Card 2 */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&auto=format&fit=crop&q=80"
                    alt="Cricket action"
                    className="w-24 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                  />
                  <div className="min-w-0 space-y-1">
                    <h5 className="text-xs font-black text-slate-900 group-hover:text-[#eb1c24] transition-colors truncate font-bangla">
                      ইংল্যান্ডের মাটিতে টেস্ট জয়, ইতিহাস গড়ল ভারত
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1 font-bangla">
                      ভারতীয় দলের হয়ে রোহিত শর্মা ও যশপ্রীত বুমরাহর দুর্দান্ত পারফরম্যান্সে...
                    </p>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="px-2 py-0.5 text-[9.5px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-md">
                        Published
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 hidden sm:block">May 20, 2024</span>
                  <button className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Post Card 3 */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-24 h-16 rounded-xl bg-slate-900 text-white shrink-0 flex items-center justify-center p-2 font-black text-[10px] tracking-widest text-center border border-slate-800">
                    <span className="text-red-400 font-black">ENG</span>
                    <span className="text-slate-400 mx-1">VS</span>
                    <span className="text-blue-400 font-black">IND</span>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <h5 className="text-xs font-black text-slate-900 group-hover:text-[#eb1c24] transition-colors truncate font-outfit">
                      India vs England Test Series Schedule 2024
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1 font-bangla">
                      সম্পূর্ণ সময়সূচি, ভেন্যু ও দল সম্পর্কে বিস্তারিত জানুন।
                    </p>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="px-2 py-0.5 text-[9.5px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-md">
                        Published
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 hidden sm:block">May 10, 2024</span>
                  <button className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

            </div>

            {/* View All Posts Link */}
            <div className="text-center pt-1">
              <NavLink
                to="/posts"
                onClick={onClose}
                className="text-xs font-bold text-[#eb1c24] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>View all posts →</span>
              </NavLink>
            </div>
          </div>

          {/* ========================================= */}
          {/* SECTION 3: VIDEOS (8)                    */}
          {/* ========================================= */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Videos (8)
              </h4>
              <NavLink
                to="/videos"
                onClick={onClose}
                className="text-xs font-bold text-[#eb1c24] hover:underline cursor-pointer"
              >
                View all
              </NavLink>
            </div>

            <div className="space-y-2.5">
              {/* Video Card 1 */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&auto=format&fit=crop&q=80"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-slate-900/90 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        12:45
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <h5 className="text-xs font-black text-slate-900 group-hover:text-emerald-600 transition-colors truncate font-outfit">
                      India vs England 2nd Test Highlights 2024
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1 font-outfit">
                      Full match highlights and key moments from the 2nd test
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 hidden sm:block">May 21, 2024</span>
                  <button className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* View All Videos Link */}
            <div className="text-center pt-1">
              <NavLink
                to="/videos"
                onClick={onClose}
                className="text-xs font-bold text-[#eb1c24] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>View all videos →</span>
              </NavLink>
            </div>
          </div>

        </div>

        {/* 4. Bottom Footer Bar */}
        <div className="p-3.5 px-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-6 h-6 rounded-lg bg-red-50 text-[#eb1c24] flex items-center justify-center shrink-0">
              <Search size={13} />
            </div>
            <span className="text-[11px]">
              <strong className="text-slate-800">Search tips:</strong> Try searching by Post title, Reporter name, Category, or Keywords
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] font-bold text-slate-400">
            <div className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200">
                <ArrowUp size={11} className="inline" />
              </span>
              <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200">
                <ArrowDown size={11} className="inline" />
              </span>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200">
                <CornerDownLeft size={11} className="inline" />
              </span>
              <span>Select</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
