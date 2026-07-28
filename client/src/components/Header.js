'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';
import {
  Bell,
  Bookmark,
  Building2,
  ChevronDown,
  CloudSun,
  Cpu,
  Film,
  Flag,
  Flame,
  Globe,
  Globe2,
  HeartPulse,
  Home,
  Landmark,
  LayoutGrid,
  MapPin,
  Menu,
  Moon,
  Plus,
  Search,
  Sparkles,
  Sun,
  TrendingUp,
  Trophy,
  Tv,
  Video,
  X,
  Zap,
} from 'lucide-react';

const categoryIcons = {
  home: Home,
  breaking: Flame,
  latest: TrendingUp,
  'paschim-bardhaman': MapPin,
  asansol: Building2,
  durgapur: Landmark,
  rajya: Flag,
  desh: Landmark,
  biswa: Globe,
  khela: Trophy,
  binodon: Film,
  lifestyle: Sparkles,
  projukti: Cpu,
  tech: Cpu,
  video: Video,
};

const getCategoryIcon = (slug) => {
  return categoryIcons[slug] || Zap;
};

const getMobileNavItems = (lang) => [
  { label: lang === 'en' ? 'Home' : lang === 'hi' ? 'मुख्य पृष्ठ' : 'প্রচ্ছদ', slug: 'home', href: '/' },
  { label: lang === 'en' ? 'Latest' : lang === 'hi' ? 'ताज़ा खबरें' : 'সর্বশেষ', slug: 'latest', href: '/category/latest' },
  { label: lang === 'en' ? 'Bengal' : lang === 'hi' ? 'बंगाल' : 'বাংলা', slug: 'paschim-bardhaman', href: '/category/paschim-bardhaman' },
  { label: lang === 'en' ? 'India' : lang === 'hi' ? 'भारत' : 'ভারত', slug: 'desh', href: '/category/desh' },
  { label: lang === 'en' ? 'World' : lang === 'hi' ? 'दुनिया' : 'দুনিয়া', slug: 'biswa', href: '/category/biswa' },
  { label: lang === 'en' ? 'Sports' : lang === 'hi' ? 'खेल' : 'খেলা', slug: 'khela', href: '/category/khela' },
  { label: lang === 'en' ? 'Entertainment' : lang === 'hi' ? 'मनोरंजन' : 'বিনোদন', slug: 'binodon', href: '/category/binodon' },
];

const getDesktopNavItems = (lang) => [
  { label: lang === 'en' ? 'Home' : lang === 'hi' ? 'मुख्य पृष्ठ' : 'প্রচ্ছদ', href: '/', slug: 'home' },
  { label: lang === 'en' ? 'Breaking News' : lang === 'hi' ? 'ब्रेकिंग न्यूज़' : 'ব্রেকিং নিউজ', href: '/category/breaking', slug: 'breaking' },
  { label: lang === 'en' ? 'Paschim Bardhaman' : lang === 'hi' ? 'पश्चिम बर्धमान' : 'পশ্চিম বর্ধমান', href: '/category/paschim-bardhaman', slug: 'paschim-bardhaman' },
  { label: lang === 'en' ? 'Asansol' : lang === 'hi' ? 'आसनसोल' : 'আসানসোল', href: '/category/asansol', slug: 'asansol' },
  { label: lang === 'en' ? 'Durgapur' : lang === 'hi' ? 'दुर्गापुर' : 'দুর্গাপুর', href: '/category/durgapur', slug: 'durgapur' },
  { label: lang === 'en' ? 'State' : lang === 'hi' ? 'राज्य' : 'রাজ্য', href: '/category/rajya', slug: 'rajya' },
  { label: lang === 'en' ? 'National' : lang === 'hi' ? 'देश' : 'দেশ', href: '/category/desh', slug: 'desh' },
  { label: lang === 'en' ? 'World' : lang === 'hi' ? 'विश्व' : 'বিশ্ব', href: '/category/biswa', slug: 'biswa' },
  { label: lang === 'en' ? 'Sports' : lang === 'hi' ? 'खेल' : 'খেলা', href: '/category/khela', slug: 'khela' },
  { label: lang === 'en' ? 'Entertainment' : lang === 'hi' ? 'मनोरंजन' : 'বিনোদন', href: '/category/binodon', slug: 'binodon' },
  { label: lang === 'en' ? 'Lifestyle' : lang === 'hi' ? 'जीवन शैली' : 'লাইফস্টাইল', href: '/category/lifestyle', slug: 'lifestyle' },
  { label: lang === 'en' ? 'Technology' : lang === 'hi' ? 'तकनीक' : 'প্রযুক্তি', href: '/category/projukti', slug: 'projukti' },
  { label: lang === 'en' ? 'Video' : lang === 'hi' ? 'वीडियो' : 'ভিডিও', href: '/category/video', slug: 'video' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { locale, switchLanguage } = useLanguage();
  const [categories, setCategories] = useState(() => getDesktopNavItems(locale));

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
        } else {
          setCategories(getDesktopNavItems(locale));
        }
      })
      .catch(() => {
        setCategories(getDesktopNavItems(locale));
      });
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

  const langNames = { bn: 'বাংলা', en: 'English', hi: 'हिंदी' };

  const formattedDate = new Date().toLocaleDateString(
    locale === 'en' ? 'en-US' : locale === 'hi' ? 'hi-IN' : 'bn-BD',
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  );

  const locationText = locale === 'en' ? 'Asansol, Paschim Bardhaman' : locale === 'hi' ? 'आसनसोल, पश्चिम बर्धमान' : 'আসানসোল, পশ্চিম বর্ধমান';
  const aboutText = locale === 'en' ? 'About Us' : locale === 'hi' ? 'हमारे बारे में' : 'আমাদের সম্পর্কে';
  const advertiseText = locale === 'en' ? 'Advertise' : locale === 'hi' ? 'विज्ञापन दें' : 'বিজ্ঞাপন দিন';
  const contactText = locale === 'en' ? 'Contact Us' : locale === 'hi' ? 'संपर्क करें' : 'যোগাযোগ করুন';
  const searchPlaceholder = locale === 'en' ? 'Search news...' : locale === 'hi' ? 'समाचार खोजें...' : 'খবর খুঁজুন...';
  const liveTvSubText = locale === 'en' ? 'Watch Live Now' : locale === 'hi' ? 'लाइव देखें' : 'সরাসরি দেখুন';

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">

      {/* ===== DESKTOP HEADER (MD & UP) ===== */}
      <div className="hidden md:block">

        {/* ── Top Meta Bar ── Black background */}
        <div className="bg-black text-white border-b border-slate-800/80">
          <div className="mx-auto flex h-[32px] max-w-[1360px] items-center justify-between px-4">

            {/* Left: date · location · weather */}
            <div className="flex items-center gap-3.5 text-[11px] font-semibold text-slate-400">
              <span className="text-slate-200 font-bold capitalize tracking-wide">{formattedDate}</span>
              <span className="h-3 w-px bg-slate-700" />
              <span className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors">
                <MapPin size={11} className="text-[#ff2236]" />
                {locationText}
              </span>
              <span className="h-3 w-px bg-slate-700" />
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <CloudSun size={13} />
                <span className="text-slate-300">৩২°C</span>
              </span>
            </div>

            {/* Right: links + social icons */}
            <div className="flex items-center gap-3.5 text-[11px] font-semibold text-slate-400">
              <Link href="/about" className="hover:text-[#ff2236] transition-colors">{aboutText}</Link>
              <span className="h-3 w-px bg-slate-700" />
              <Link href="/advertise" className="hover:text-[#ff2236] transition-colors">{advertiseText}</Link>
              <span className="h-3 w-px bg-slate-700" />
              <Link href="/contact" className="hover:text-[#ff2236] transition-colors">{contactText}</Link>
              <span className="h-3 w-px bg-slate-700" />
              {/* Social icons */}
              <div className="flex items-center gap-2.5">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"
                  className="text-slate-400 hover:text-[#1877f2] transition-colors font-black text-xs">f</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"
                  className="text-slate-400 hover:text-[#ff0000] transition-colors text-[10px]">▶</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X / Twitter"
                  className="text-slate-400 hover:text-white transition-colors font-black text-xs">𝕏</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
                  className="text-slate-400 hover:text-[#e1306c] transition-colors font-black text-xs">◎</a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Logo · Search · Live TV Bar ── bright white strip */}
        <div className="bg-white border-b border-slate-200">
          <div className="mx-auto flex h-[78px] max-w-[1360px] items-center justify-between gap-8 px-4">

            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center shrink-0" aria-label="Nirbhik Bangla">
              <img
                src="/images/logos/Nirbhik-Bangla-Logo-No-Bg.png"
                alt="Nirbhik Bangla"
                className="h-[60px] w-auto object-contain max-w-[260px] hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex flex-1 max-w-[500px] h-[42px] items-center rounded-full border border-slate-200 bg-slate-50 focus-within:border-[#d70b18] focus-within:ring-2 focus-within:ring-red-100 overflow-hidden transition-all duration-200"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 px-4 text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-400 font-medium"
              />
              <button
                type="submit"
                className="w-11 h-full flex items-center justify-center text-slate-500 hover:text-[#d70b18] transition-colors border-l border-slate-200"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Live TV CTA */}
            <Link
              href={`/${locale}/live`}
              className="group flex items-center gap-3 shrink-0 rounded-xl overflow-hidden bg-gradient-to-r from-[#c10010] to-[#e8001c] hover:from-[#a8000d] hover:to-[#cc0018] text-white px-4 py-2.5 shadow-md hover:shadow-lg hover:shadow-red-200 transition-all duration-200 active:scale-95"
            >
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                <Tv size={17} className="text-white" />
                <span className="absolute h-2 w-2 rounded-full bg-white animate-ping opacity-60 ml-4 -mt-4" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-black text-sm uppercase tracking-widest">LIVE TV</span>
                <span className="text-[10px] font-semibold text-white/80">{liveTvSubText}</span>
              </div>
            </Link>
          </div>
        </div>

        {/* ── Navigation Ribbon ── Larger Text + Category Icons */}
        <nav
          suppressHydrationWarning
          style={{ background: 'linear-gradient(90deg, #8b0010 0%, #c0000f 40%, #8b0010 100%)' }}
          className="w-full border-b border-[#6a0008]/60 shadow-inner"
        >
          <div className="mx-auto flex h-[48px] max-w-[1360px] items-center px-2">

            {/* Hamburger — opens mobile drawer on desktop too */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center h-[48px] w-[46px] text-white hover:bg-white/20 shrink-0 mr-1 transition-colors"
              aria-label="Categories menu"
            >
              <Menu size={20} />
            </button>

            {/* Nav links */}
            <div className="flex items-center h-full overflow-x-auto scrollbar-none whitespace-nowrap flex-1 gap-0.5">
              {categories.map((item) => {
                const IconComponent = getCategoryIcon(item.slug);
                const isActive =
                  item.slug === 'home'
                    ? pathname === `/${locale}` || pathname === '/'
                    : pathname?.startsWith(`/${locale}${item.href}`) || pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.slug}
                    href={item.slug === 'home' ? `/${locale}` : `/${locale}${item.href}`}
                    className={`relative flex items-center gap-1.5 h-full px-3.5 text-[14.5px] font-black shrink-0 tracking-wide transition-all duration-150 ${
                      isActive
                        ? 'bg-white text-[#c0000f] shadow-sm'
                        : 'text-white hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <IconComponent size={16} className={isActive ? 'text-[#c0000f]' : 'text-white/90'} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#c0000f] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right controls: theme + language */}
            <div className="ml-2 flex items-center gap-1.5 shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber-300" /> : <Moon size={16} />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/25 text-xs font-black text-white transition-colors"
                >
                  <Globe2 size={14} className="text-white" />
                  <span suppressHydrationWarning>{langNames[locale] || 'বাংলা'}</span>
                  <ChevronDown size={11} className="text-white/80" />
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 rounded-xl border border-red-900/40 bg-[#8b0010] shadow-2xl py-1.5 z-50 overflow-hidden">
                    {['bn', 'en', 'hi'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLangChange(lang)}
                        className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                          locale === lang
                            ? 'text-white bg-white/20'
                            : 'text-white/80 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {langNames[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ===== MOBILE HEADER (< MD) ===== */}
      <div className="md:hidden">

        {/* Mobile Top App Bar */}
        <div className="bg-white border-b border-slate-100 px-3 py-2 flex items-center justify-between shadow-sm">
          <Link href={`/${locale}`} className="flex items-center shrink-0" aria-label="Nirbhik Bangla">
            <img
              src="/images/logos/Nirbhik-Bangla-Logo-No-Bg.png"
              alt="Nirbhik Bangla"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-1.5">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-0.5 px-2 py-1 rounded-lg border border-slate-200 text-xs font-black text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <Globe2 size={12} className="text-[#d70b18]" />
                <span className="uppercase">{locale}</span>
                <ChevronDown size={10} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-28 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 overflow-hidden">
                  {['bn', 'en', 'hi'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangChange(lang)}
                      className={`w-full text-left px-3 py-1.5 text-xs font-bold flex items-center justify-between transition-colors ${
                        locale === lang ? 'text-[#d70b18] bg-red-50' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{langNames[lang]}</span>
                      {locale === lang && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-slate-700 hover:text-[#d70b18] rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            <div className="relative">
              <button className="p-1.5 text-slate-700 hover:text-[#d70b18] rounded-lg hover:bg-slate-100 transition-colors" aria-label="Notifications">
                <Bell size={19} />
                <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 grid place-items-center rounded-full bg-[#d70b18] text-[7px] font-black text-white">5</span>
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Expand */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="px-3 py-2 bg-white border-b border-slate-200 flex items-center gap-2 shadow-sm"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-[#d70b18] text-slate-800"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#d70b18] hover:bg-[#b90813] text-white rounded-lg text-xs font-bold transition-colors"
            >
              {locale === 'en' ? 'Search' : locale === 'hi' ? 'खोजें' : 'খুঁজুন'}
            </button>
          </form>
        )}

        {/* Mobile Category Scroll Ribbon with Icons */}
        {!pathname?.includes('/news/') && !pathname?.includes('/article/') && (
          <div
            className="border-b border-red-900/30 px-2 flex items-center h-11 overflow-x-auto scrollbar-none gap-1"
            style={{ background: 'linear-gradient(90deg, #8b0010, #c0000f, #8b0010)' }}
          >
            {getMobileNavItems(locale).map((item) => {
              const IconComponent = getCategoryIcon(item.slug);
              const isActive =
                item.slug === 'home'
                  ? pathname === `/${locale}` || pathname === '/'
                  : pathname?.startsWith(`/${locale}${item.href}`);
              return (
                <Link
                  key={item.slug}
                  href={`/${locale}${item.slug === 'home' ? '' : item.href}`}
                  className={`h-full flex items-center gap-1.5 shrink-0 px-3 text-[13px] font-black transition-all ${
                    isActive
                      ? 'text-white bg-white/25 rounded-md shadow-xs'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  <IconComponent size={14} className="text-white" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-slate-300 shrink-0 ml-1">
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* Mobile Drawer — full-screen category grid with icons */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-red-900/40 p-3 grid grid-cols-2 gap-2 text-sm text-white"
          style={{ background: 'linear-gradient(135deg, #8b0010, #c0000f)' }}
        >
          {categories.map((item) => {
            const IconComponent = getCategoryIcon(item.slug);
            return (
              <Link
                key={item.slug}
                href={item.slug === 'home' ? `/${locale}` : `/${locale}${item.href}`}
                className="px-3.5 py-2.5 rounded-xl font-bold bg-white/10 hover:bg-white/25 border border-white/10 hover:border-white/30 transition-all text-white flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <IconComponent size={16} className="text-white/90" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      {!pathname?.includes('/news/') && !pathname?.includes('/article/') && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-md border-t border-slate-200 flex items-center justify-around h-[56px] shadow-[0_-2px_20px_rgba(0,0,0,0.08)]">
          {/* Home */}
          <Link
            href={`/${locale}`}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative transition-colors ${
              pathname === `/${locale}` || pathname === '/' ? 'text-[#d70b18]' : 'text-slate-500'
            }`}
          >
            {(pathname === `/${locale}` || pathname === '/') && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[2.5px] w-8 rounded-full bg-[#d70b18]" />
            )}
            <Home size={19} strokeWidth={pathname === `/${locale}` || pathname === '/' ? 2.5 : 1.8} />
            <span className="text-[9.5px] font-bold tracking-tight">{locale === 'en' ? 'Home' : locale === 'hi' ? 'होम' : 'হোম'}</span>
          </Link>

          {/* Live TV */}
          <Link
            href={`/${locale}/live`}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative transition-colors ${
              pathname?.includes('/live') ? 'text-[#d70b18]' : 'text-slate-500'
            }`}
          >
            {pathname?.includes('/live') && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[2.5px] w-8 rounded-full bg-[#d70b18]" />
            )}
            <div className="relative">
              <Tv size={19} strokeWidth={pathname?.includes('/live') ? 2.5 : 1.8} />
              <span className="absolute -top-0.5 -right-1.5 h-2 w-2 rounded-full bg-red-600 animate-ping opacity-70" />
              <span className="absolute -top-0.5 -right-1.5 h-2 w-2 rounded-full bg-red-600" />
            </div>
            <span className="text-[9.5px] font-bold tracking-tight">{locale === 'en' ? 'Live TV' : locale === 'hi' ? 'लाइव' : 'লাইভ'}</span>
          </Link>

          {/* Bookmarks */}
          <Link
            href={`/${locale}/bookmarks`}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative transition-colors ${
              pathname?.includes('/bookmarks') ? 'text-[#d70b18]' : 'text-slate-500'
            }`}
          >
            {pathname?.includes('/bookmarks') && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[2.5px] w-8 rounded-full bg-[#d70b18]" />
            )}
            <Bookmark size={19} strokeWidth={pathname?.includes('/bookmarks') ? 2.5 : 1.8} />
            <span className="text-[9.5px] font-bold tracking-tight">{locale === 'en' ? 'Saved' : locale === 'hi' ? 'सेव' : 'সেভড'}</span>
          </Link>

          {/* Categories */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative transition-colors ${
              mobileOpen ? 'text-[#d70b18]' : 'text-slate-500'
            }`}
          >
            {mobileOpen && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[2.5px] w-8 rounded-full bg-[#d70b18]" />
            )}
            <LayoutGrid size={19} strokeWidth={mobileOpen ? 2.5 : 1.8} />
            <span className="text-[9.5px] font-bold tracking-tight">{locale === 'en' ? 'More' : locale === 'hi' ? 'श्रेणी' : 'বিভাগ'}</span>
          </button>

          {/* Profile */}
          <Link
            href={`/${locale}/profile`}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative transition-colors ${
              pathname?.includes('/profile') ? 'text-[#d70b18]' : 'text-slate-500'
            }`}
          >
            {pathname?.includes('/profile') && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[2.5px] w-8 rounded-full bg-[#d70b18]" />
            )}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={pathname?.includes('/profile') ? 2.5 : 1.8} className="w-[19px] h-[19px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span className="text-[9.5px] font-bold tracking-tight">{locale === 'en' ? 'Profile' : locale === 'hi' ? 'प्रोफ़ाइल' : 'প্রোফাইল'}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
