'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';
import {
  Bell,
  BarChart2,
  Bookmark,
  ChevronDown,
  CloudSun,
  Globe2,
  Home,
  LayoutGrid,
  MapPin,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
  Tv,
  X,
} from 'lucide-react';

const desktopNavItems = [
  { label: 'প্রচ্ছদ', href: '/', slug: 'home' },
  { label: 'ব্রেকিং নিউজ', href: '/category/breaking', slug: 'breaking' },
  { label: 'পশ্চিম বর্ধমান', href: '/category/paschim-bardhaman', slug: 'paschim-bardhaman' },
  { label: 'আসানসোল', href: '/category/asansol', slug: 'asansol' },
  { label: 'দুর্গাপুর', href: '/category/durgapur', slug: 'durgapur' },
  { label: 'রাজ্য', href: '/category/rajya', slug: 'rajya' },
  { label: 'দেশ', href: '/category/desh', slug: 'desh' },
  { label: 'বিশ্ব', href: '/category/biswa', slug: 'biswa' },
  { label: 'খেলা', href: '/category/khela', slug: 'khela' },
  { label: 'বিনোদন', href: '/category/binodon', slug: 'binodon' },
  { label: 'লাইফস্টাইল', href: '/category/lifestyle', slug: 'lifestyle' },
  { label: 'প্রযুক্তি', href: '/category/projukti', slug: 'projukti' },
  { label: 'ভিডিও', href: '/category/video', slug: 'video' },
];

const mobileNavItems = [
  { label: 'প্রচ্ছদ', slug: 'home', href: '/' },
  { label: 'সর্বশেষ', slug: 'latest', href: '/category/latest' },
  { label: 'বাংলা', slug: 'paschim-bardhaman', href: '/category/paschim-bardhaman' },
  { label: 'ভারত', slug: 'desh', href: '/category/desh' },
  { label: 'দুনিয়া', slug: 'biswa', href: '/category/biswa' },
  { label: 'খেলা', slug: 'khela', href: '/category/khela' },
  { label: 'বিনোদন', slug: 'binodon', href: '/category/binodon' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(desktopNavItems);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { locale, switchLanguage } = useLanguage();

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/public/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const dynamicItems = data.data.map((cat) => ({
            label: typeof cat.name === 'object' ? (cat.name[locale] || cat.name.bn) : cat.name,
            href: cat.slug === 'home' ? '/' : `/category/${cat.slug}`,
            slug: cat.slug,
          }));
          setCategories(dynamicItems);
        }
      })
      .catch((err) => console.log('Using fallback categories:', err));
  }, [locale]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleLangChange = (targetLang) => {
    switchLanguage(targetLang);
    setLangMenuOpen(false);

    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      if (['bn', 'en', 'hi'].includes(segments[0])) {
        segments[0] = targetLang;
        router.push('/' + segments.join('/'));
      } else {
        router.push(`/${targetLang}`);
      }
    } else {
      router.push(`/${targetLang}`);
    }
  };

  const langNames = {
    bn: 'বাংলা',
    en: 'English',
    hi: 'हिंदी',
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs w-full">
      {/* ===== DESKTOP HEADER (MD & UP) ===== */}
      <div className="hidden md:block">
        {/* Top Meta Bar */}
        <div className="bg-[#070a0f] text-white border-b border-slate-800/60">
          <div className="mx-auto flex h-[34px] max-w-[1360px] items-center justify-between px-3 text-xs font-semibold">
            <div className="flex items-center gap-3 text-slate-300">
              <span className="text-white">সোমবার, ২৪ মে ২০২৪</span>
              <span className="h-3 w-px bg-slate-800" />
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin size={13} className="text-[#d70b18] fill-[#d70b18]" />
                আসানসোল, পশ্চিম বর্ধমান
              </span>
              <span className="h-3 w-px bg-slate-800" />
              <span className="flex items-center gap-1.5 text-slate-300">
                <CloudSun size={15} className="text-amber-400" />
                ৩২°C
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-300">
              <Link href="/about" className="hover:text-[#d70b18] transition-colors">আমাদের সম্পর্কে</Link>
              <span className="h-3 w-px bg-slate-800" />
              <Link href="/advertise" className="hover:text-[#d70b18] transition-colors">বিজ্ঞাপন দিন</Link>
              <span className="h-3 w-px bg-slate-800" />
              <Link href="/contact" className="hover:text-[#d70b18] transition-colors">যোগাযোগ করুন</Link>
              <span className="h-3 w-px bg-slate-800" />
              <div className="flex items-center gap-3 text-xs">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-[#d70b18] font-black transition-colors">f</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[#d70b18] text-[10px] transition-colors">▶</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-[#d70b18] font-black transition-colors">𝕏</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#d70b18] font-black transition-colors">◎</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Logo & Search & LIVE TV Bar */}
        <div className="bg-white border-b border-slate-200/80 shadow-2xs">
          <div className="mx-auto flex h-[82px] max-w-[1360px] items-center justify-between gap-6 px-3">
            <Link href={`/${locale}`} className="flex items-center shrink-0 py-1" aria-label="Nirbhik Bangla">
              <img
                src="/images/logos/Nirbhik-Bangla-Logo-No-Bg.png"
                alt="Nirbhik Bangla"
                className="h-16 md:h-18 w-auto object-contain max-w-[270px] hover:opacity-95 transition-opacity"
              />
            </Link>

            <form onSubmit={handleSearch} className="flex flex-1 max-w-[520px] h-10.5 items-center border border-slate-200 focus-within:border-[#d70b18] focus-within:ring-2 focus-within:ring-red-100 rounded-full overflow-hidden bg-slate-50/70 transition-all">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="খবর খুঁজুন..."
                className="flex-1 px-4 text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-400 font-medium"
              />
              <button type="submit" className="w-11 h-full flex items-center justify-center text-slate-600 hover:text-[#d70b18] transition-colors" aria-label="Search">
                <Search size={18} />
              </button>
            </form>

            <Link
              href={`/${locale}/live`}
              className="flex items-center gap-2.5 bg-[#d70b18] hover:bg-[#b90813] text-white px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white/15">
                <Tv size={18} className="animate-pulse text-white" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-black text-sm uppercase tracking-wider">LIVE TV</span>
                <span className="text-[9.5px] font-semibold text-white/90">এখন সরাসরি সম্প্রচার দেখুন</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Dark Nav Ribbon Bar */}
        <nav className="bg-[#090d16] text-white border-t border-b border-slate-800/80 w-full relative">
          <div className="mx-auto flex h-[40px] max-w-[1360px] items-center px-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center h-[40px] w-[42px] bg-[#141923] text-white hover:bg-[#d70b18] transition-colors shrink-0 mr-1.5"
              aria-label="Categories menu"
            >
              <Menu size={18} />
            </button>

            <div className="flex items-center h-full overflow-x-auto scrollbar-none whitespace-nowrap flex-1 gap-0.5">
              {categories.map((item) => {
                const isActive = item.slug === 'home' || pathname === `/${locale}${item.href}`;
                return (
                  <Link
                    key={item.slug}
                    href={item.slug === 'home' ? `/${locale}` : `/${locale}${item.href}`}
                    className={`flex items-center h-full px-3.5 text-xs font-extrabold shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#d70b18] text-white shadow-inner'
                        : 'text-slate-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="ml-2 flex items-center gap-2 shrink-0 relative">
              <button
                onClick={toggleTheme}
                className="p-1.5 text-slate-300 hover:text-white transition-colors rounded-md hover:bg-white/10"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-[11px] font-extrabold text-white cursor-pointer transition-colors"
                >
                  <Globe2 size={13} className="text-red-400" />
                  <span>{langNames[locale] || 'বাংলা'}</span>
                  <ChevronDown size={11} />
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-1.5 w-28 bg-[#090d16] border border-slate-700 rounded-lg shadow-xl py-1 z-50 text-xs font-bold">
                    <button onClick={() => handleLangChange('bn')} className="w-full text-left px-3 py-1.5 hover:bg-[#d70b18] text-white transition-colors">বাংলা</button>
                    <button onClick={() => handleLangChange('en')} className="w-full text-left px-3 py-1.5 hover:bg-[#d70b18] text-white transition-colors">English</button>
                    <button onClick={() => handleLangChange('hi')} className="w-full text-left px-3 py-1.5 hover:bg-[#d70b18] text-white transition-colors">हिंदी</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ===== MOBILE HEADER (ONLY ON SCREEN < MD) ===== */}
      <div className="md:hidden">
        {/* Top App Bar */}
        <div className="bg-white border-b border-slate-100 px-3 py-1.5 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center shrink-0" aria-label="Nirbhik Bangla">
            <img
              src="/images/logos/Nirbhik-Bangla-Logo-No-Bg.png"
              alt="Nirbhik Bangla"
              className="h-8.5 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-slate-300 text-[10px] font-extrabold text-slate-800 bg-slate-50 hover:bg-slate-100"
              >
                <Globe2 size={12} className="text-[#d70b18]" />
                <span className="uppercase">{locale}</span>
                <ChevronDown size={10} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-1 w-24 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50 text-xs font-bold text-slate-800">
                  <button onClick={() => handleLangChange('bn')} className={`w-full text-left px-3 py-1 hover:bg-slate-100 flex items-center justify-between ${locale === 'bn' ? 'text-[#d70b18]' : ''}`}>
                    <span>বাংলা</span>
                    {locale === 'bn' && <span className="text-[10px]">✓</span>}
                  </button>
                  <button onClick={() => handleLangChange('en')} className={`w-full text-left px-3 py-1 hover:bg-slate-100 flex items-center justify-between ${locale === 'en' ? 'text-[#d70b18]' : ''}`}>
                    <span>English</span>
                    {locale === 'en' && <span className="text-[10px]">✓</span>}
                  </button>
                  <button onClick={() => handleLangChange('hi')} className={`w-full text-left px-3 py-1 hover:bg-slate-100 flex items-center justify-between ${locale === 'hi' ? 'text-[#d70b18]' : ''}`}>
                    <span>हिंदी</span>
                    {locale === 'hi' && <span className="text-[10px]">✓</span>}
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => setSearchOpen(!searchOpen)} className="p-0.5 text-slate-800 hover:text-[#d70b18]" aria-label="Search">
              <Search size={20} />
            </button>

            <div className="relative">
              <button className="p-0.5 text-slate-800 hover:text-[#d70b18] relative" aria-label="Notifications">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#d70b18] text-[8px] font-black text-white">
                  5
                </span>
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-0.5 text-slate-800 rounded hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="px-3 py-1.5 bg-slate-50 flex items-center gap-2 border-b border-slate-200">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="খবর খুঁজুন..."
              className="flex-1 px-2.5 py-1 text-xs border rounded bg-white"
              autoFocus
            />
            <button type="submit" className="px-2.5 py-1 bg-[#d70b18] text-white rounded text-[11px] font-bold">খুঁজুন</button>
          </form>
        )}

        {/* Mobile Nav Horizontal Scroll Ribbon (Hidden on post detail pages) */}
        {!pathname?.includes('/news/') && !pathname?.includes('/article/') && (
          <div className="bg-white border-b border-slate-200 px-3 flex items-center justify-between h-9 overflow-x-auto scrollbar-none gap-2 text-xs font-bold text-slate-800 w-full">
            {mobileNavItems.map((item) => {
              const isActive = item.slug === 'home';
              return (
                <Link
                  key={item.slug}
                  href={`/${locale}${item.href}`}
                  className={`h-full flex items-center shrink-0 border-b-2 font-bold px-0.5 ${
                    isActive ? 'text-[#d70b18] border-[#d70b18]' : 'border-transparent text-slate-700 hover:text-[#d70b18]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button className="flex items-center justify-center h-5 w-5 rounded-full bg-slate-100 text-slate-600 shrink-0 ml-1">
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Embedded Breaking News Ticker Component inside Header */}
      <BreakingNewsTicker />

      {/* Mobile Drawer Menu (When Toggle Pressed) */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 p-3 grid grid-cols-2 gap-1.5 text-xs text-white">
          {desktopNavItems.map((item) => (
            <Link
              key={item.slug}
              href={item.slug === 'home' ? `/${locale}` : `/${locale}${item.href}`}
              className="px-2.5 py-1.5 rounded font-medium bg-white/5 hover:bg-[#d70b18] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Bottom Navigation Bar — Premium App Style (Hidden on post details pages) */}
      {!pathname?.includes('/news/') && !pathname?.includes('/article/') && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-1 py-1 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-around text-[10px] font-bold text-slate-500 h-[54px]">
          {/* Home Tab */}
          <Link
            href={`/${locale}`}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors relative ${
              pathname === `/${locale}` || pathname === '/' ? 'text-[#d70b18] font-black' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Home size={19} strokeWidth={pathname === `/${locale}` || pathname === '/' ? 2.5 : 2} />
            </div>
            <span className="text-[10px] tracking-tight">হোম</span>
            {(pathname === `/${locale}` || pathname === '/') && (
              <span className="absolute top-0 h-0.5 w-6 rounded-full bg-[#d70b18]" />
            )}
          </Link>

          {/* Live TV Tab */}
          <Link
            href={`/${locale}/live`}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors relative ${
              pathname?.includes('/live') ? 'text-[#d70b18] font-black' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Tv size={19} strokeWidth={pathname?.includes('/live') ? 2.5 : 2} />
              <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-red-600 animate-ping" />
              <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-red-600" />
            </div>
            <span className="text-[10px] tracking-tight">লাইভ টিভি</span>
            {pathname?.includes('/live') && (
              <span className="absolute top-0 h-0.5 w-6 rounded-full bg-[#d70b18]" />
            )}
          </Link>

          {/* Bookmark Tab */}
          <Link
            href={`/${locale}/bookmarks`}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors relative ${
              pathname?.includes('/bookmarks') ? 'text-[#d70b18] font-black' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Bookmark size={19} strokeWidth={pathname?.includes('/bookmarks') ? 2.5 : 2} />
            <span className="text-[10px] tracking-tight">বুকমার্ক</span>
            {pathname?.includes('/bookmarks') && (
              <span className="absolute top-0 h-0.5 w-6 rounded-full bg-[#d70b18]" />
            )}
          </Link>

          {/* Category Tab */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors relative ${
              mobileOpen ? 'text-[#d70b18] font-black' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LayoutGrid size={19} strokeWidth={mobileOpen ? 2.5 : 2} />
            <span className="text-[10px] tracking-tight">ক্যাটাগরি</span>
            {mobileOpen && (
              <span className="absolute top-0 h-0.5 w-6 rounded-full bg-[#d70b18]" />
            )}
          </button>

          {/* Profile Tab */}
          <Link
            href={`/${locale}/profile`}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors relative ${
              pathname?.includes('/profile') ? 'text-[#d70b18] font-black' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={pathname?.includes('/profile') ? 2.5 : 2} className="w-[19px] h-[19px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span className="text-[10px] tracking-tight">আমার প্রোফাইল</span>
            {pathname?.includes('/profile') && (
              <span className="absolute top-0 h-0.5 w-6 rounded-full bg-[#d70b18]" />
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
