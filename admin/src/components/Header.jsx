import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SearchResultModal from './SearchResultModal';
import {
  Search,
  Moon,
  Sun,
  Bell,
  Plus,
  Radio,
  Globe2,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  Sliders,
  LogOut,
  ExternalLink,
  Menu,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

export default function Header({ isCollapsed, toggleSidebar }) {
  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeLang, setActiveLang] = useState('bn');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Keyboard Listener for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notifications = [
    { id: 1, title: 'নতুন মন্তব্য পাওয়া গেছে', time: '২ মিনিট আগে', type: 'comment', unread: true },
    { id: 2, title: 'ব্রেকিং নিউজ প্রকাশিত হয়েছে', time: '১৫ মিনিট আগে', type: 'news', unread: true },
    { id: 3, title: 'রিপোর্টার রিয়া সাহা নতুন পোস্ট জমা দিয়েছেন', time: '১ ঘণ্টা আগে', type: 'post', unread: true },
    { id: 4, title: 'সিস্টেম ব্যাকআপ সফলভাবে সম্পন্ন হয়েছে', time: '৩ ঘণ্টা আগে', type: 'system', unread: false },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
      
      {/* Left: Sidebar Toggle Button + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar collapse"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-[#eb1c24] flex items-center justify-center border border-slate-200/80 shrink-0 cursor-pointer transition-colors"
        >
          {isCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>

        {/* Global Search Input */}
        <div
          onClick={() => setIsSearchOpen(true)}
          className="relative w-full cursor-pointer"
        >
          <Search size={16} className="absolute left-3.5 top-2.5 text-slate-400" />
          <input
            type="text"
            readOnly
            onClick={() => setIsSearchOpen(true)}
            placeholder="Search posts, videos, reporters, categories..."
            className="w-full h-9 pl-9 pr-16 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none hover:border-[#eb1c24] focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 focus:bg-white transition-all font-semibold cursor-pointer"
          />
          <span className="absolute right-2 top-1.5 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs hidden sm:block pointer-events-none">
            Ctrl + K
          </span>
        </div>
      </div>

      {/* Global Search Result Modal */}
      <SearchResultModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Right: Quick Action Buttons + Controls + Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">

        {/* Quick Add Post Button */}
        <NavLink
          to="/posts/add"
          className="hidden sm:flex items-center gap-1.5 bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-md shadow-red-500/20 transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>New Post</span>
        </NavLink>

        {/* Live TV Shortcut Button */}
        <NavLink
          to="/live-tv"
          className="hidden md:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-2 rounded-xl transition-all cursor-pointer"
        >
          <Radio size={14} className="animate-pulse text-emerald-600" />
          <span>Go Live</span>
        </NavLink>

        {/* View Main Website Shortcut */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs font-bold px-2.5 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          title="Visit Main News Website"
        >
          <span>Website</span>
          <ExternalLink size={13} />
        </a>

        <div className="h-5 w-px bg-slate-200 hidden sm:block" />

        {/* Language Switcher Badge */}
        <button
          onClick={() => setActiveLang(activeLang === 'bn' ? 'en' : 'bn')}
          className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-black flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Globe2 size={14} className="text-slate-500" />
          <span>{activeLang === 'bn' ? 'বাংলা' : 'EN'}</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle dark mode"
          className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          {isDark ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserDropdown(false);
            }}
            aria-label="Notifications"
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors relative cursor-pointer"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 grid h-4 w-4 place-items-center rounded-full bg-[#eb1c24] text-[9px] font-black text-white shadow-xs">
              3
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-black text-xs text-slate-900">Notifications</h4>
                <span className="bg-red-50 text-[#eb1c24] text-[10px] font-black px-2 py-0.5 rounded-md">
                  3 New
                </span>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#eb1c24] mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 font-bangla leading-snug">{item.title}</p>
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <button className="text-xs font-bold text-[#eb1c24] hover:underline cursor-pointer">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-slate-200 mx-0.5" />

        {/* User Profile Dropdown Toggle */}
        <div className="relative">
          <div
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="Super Admin"
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div className="hidden sm:block text-left">
              <h4 className="text-xs font-black text-slate-900 leading-tight">Super Admin</h4>
              <p className="text-[10px] font-semibold text-slate-400">Administrator</p>
            </div>

            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </div>

          {/* User Profile Dropdown Menu */}
          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <h5 className="font-black text-xs text-slate-900">Super Admin</h5>
                <p className="text-[11px] text-slate-400 truncate">admin@nirbhikbangla.com</p>
              </div>

              <div className="space-y-0.5 text-xs font-semibold text-slate-700">
                <NavLink to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                  <User size={15} className="text-slate-500" />
                  <span>Edit Profile</span>
                </NavLink>
                <NavLink to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                  <Sliders size={15} className="text-slate-500" />
                  <span>Portal Settings</span>
                </NavLink>
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors cursor-pointer">
                  <LogOut size={15} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
