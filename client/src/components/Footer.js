'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail, MapPin, Phone, Send, ChevronRight, ChevronDown, Play, Radio, Flame, Search,
  Globe2, Sparkles, Smartphone, ShieldCheck, Heart, Award, Calendar,
  Clock, Video, History, Rss, FileText, LayoutGrid, Tv, Link2, Globe, Users,
  Tag, Compass, Check, ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const SocialIcons = {
  facebook: ({ className = 'w-3.5 h-3.5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  youtube: ({ className = 'w-3.5 h-3.5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  instagram: ({ className = 'w-3.5 h-3.5' }) => (
    <img src="/icons/instagram.png" alt="Instagram" className={`${className} object-contain`} />
  ),
  twitter: ({ className = 'w-3.5 h-3.5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  telegram: ({ className = 'w-3.5 h-3.5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.836 7.77-1.996 9.409c-.15.67-.547.834-1.11.517l-3.04-2.242-1.467 1.413c-.162.162-.298.298-.61.298l.218-3.093 5.632-5.088c.245-.218-.053-.339-.38-.12L7.042 14.15l-3-.938c-.652-.204-.666-.652.136-.968l11.724-4.52c.544-.197 1.02.13.878.846z"/>
    </svg>
  ),
  whatsapp: ({ className = 'w-3.5 h-3.5' }) => (
    <img src="/icons/whatsapp.png" alt="WhatsApp" className={`${className} object-contain`} />
  ),
  linkedin: ({ className = 'w-3.5 h-3.5' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  googlePlay: ({ className = 'w-4 h-4' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M3.609 1.814L15.426 12 3.61 22.185A2.04 2.04 0 0 1 3 20.732V3.268c0-.573.224-1.09.609-1.454zM16.84 13.2l2.673-2.311a1.5 1.5 0 0 1 0 2.222l-2.673-2.312zm-1.414-2.4l3.195-2.765-13.882-7.93 10.687 10.695zm0 2.4L4.739 23.895l13.882-7.93-3.195-2.765z"/>
    </svg>
  ),
  apple: ({ className = 'w-4 h-4' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.64-.78 1.08-1.85.96-2.92-.93.04-2.06.62-2.73 1.4-.6.7-.1.12-1.78-.97-2.88 1.05-.04 2.12.58 2.74 1.4z"/>
    </svg>
  ),
  flagIndia: ({ className = 'w-4 h-3' }) => (
    <svg viewBox="0 0 640 480" className={`${className} rounded-xs overflow-hidden shadow-2xs`}>
      <path fill="#f93" d="M0 0h640v160H0z"/>
      <path fill="#fff" d="M0 160h640v160H0z"/>
      <path fill="#128807" d="M0 320h640v160H0z"/>
      <circle cx="320" cy="240" r="60" fill="none" stroke="#000080" strokeWidth="6"/>
    </svg>
  ),
  flagUK: ({ className = 'w-4 h-3' }) => (
    <svg viewBox="0 0 640 480" className={`${className} rounded-xs overflow-hidden shadow-2xs`}>
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#fff" d="M0 0l640 480M640 0L0 480" stroke="#fff" strokeWidth="60"/>
      <path fill="#c8102e" d="M0 0l640 480M640 0L0 480" stroke="#c8102e" strokeWidth="40"/>
      <path fill="#fff" d="M260 0h120v480H260zM0 180h640v120H0z"/>
      <path fill="#c8102e" d="M280 0h80v480H280zM0 200h640v80H0z"/>
    </svg>
  )
};

export default function Footer() {
  const { locale, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Accordion state for mobile view
  const [openAccordions, setOpenAccordions] = useState({
    categories: false,
    liveTv: false,
    quickLinks: false,
    languages: false,
    followUs: false,
    popularSearches: false,
    districtNews: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      try {
        await fetch(`${API_BASE_URL}/public/newsletter/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'website_footer' }),
        });
      } catch (err) {
        console.error('Newsletter subscribe error:', err);
      }
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  // Translations dictionary
  const txt = {
    newsletterTitle: locale === 'en' ? 'Stay Updated with Nirbhik Bangla' : locale === 'hi' ? 'निर्भीक बांग्ला से अपडेट रहें' : 'নির্ভীক বাংলার সাথেই থাকুন',
    newsletterSub: locale === 'en' ? 'Get breaking news & important updates directly in your inbox.' : locale === 'hi' ? 'ब्रेकिंग न्यूज़ और महत्वपूर्ण अपडेट सीधे अपने इनबॉक्स में प्राप्त करें।' : 'ব্রেকিং নিউজ ও গুরুত্বপূর্ণ খবরের আপডেট পান সরাসরি আপনার ইনবক্সে।',
    emailPlaceholder: locale === 'en' ? 'Enter your email address...' : locale === 'hi' ? 'अपना ईमेल पता दर्ज करें...' : 'আপনার ইমেইল ঠিকানা দিন...',
    subscribeBtn: locale === 'en' ? 'Subscribe' : locale === 'hi' ? 'सदस्यता लें' : 'সাবস্ক্রাইব',
    subscribedBtn: locale === 'en' ? 'Subscribed!' : locale === 'hi' ? 'सदस्यता ली गई!' : 'সাবস্ক্রাইব করা হয়েছে!',
    downloadApp: locale === 'en' ? 'Download Our App' : locale === 'hi' ? 'हमारा ऐप डाउनलोड करें' : 'আমাদের অ্যাপ ডাউনলোড করুন',
    appSub: locale === 'en' ? 'Fast. Reliable. Fearless.' : locale === 'hi' ? 'तेज़। विश्वसनीय। निर्भीक।' : 'দ্রুত। বিশ্বস্ত। নির্ভীক।',
    categories: locale === 'en' ? 'Categories' : locale === 'hi' ? 'श्रेणियां' : 'ক্যাটাগরি সমূহ',
    liveTv: locale === 'en' ? 'Live TV' : locale === 'hi' ? 'लाइव टीवी' : 'লাইভ টিভি',
    quickLinks: locale === 'en' ? 'Quick Links' : locale === 'hi' ? 'त्वरित लिंक' : 'দ্রুত লিঙ্ক',
    languages: locale === 'en' ? 'Languages' : locale === 'hi' ? 'भाषाएं' : 'ভাষাসমূহ',
    followUs: locale === 'en' ? 'Follow Us' : locale === 'hi' ? 'हमें फॉलो करें' : 'আমাদের অনুসরণ করুন',
    trendingTags: locale === 'en' ? 'Trending Tags' : locale === 'hi' ? 'ट्रेंडिंग टैग्स' : 'ট্রেন্ডিং ট্যাগসমূহ',
    popularSearches: locale === 'en' ? 'Popular Searches' : locale === 'hi' ? 'लोकप्रिय खोजें' : 'জনপ্রিয় অনুসন্ধান',
    districtNews: locale === 'en' ? 'District News (West Bengal)' : locale === 'hi' ? 'जिला समाचार (पश्चिम बंगाल)' : 'জেলার খবর (পশ্চিমবঙ্গ)',
    ourPartners: locale === 'en' ? 'Our Partners' : locale === 'hi' ? 'हमारे भागीदार' : 'আমাদের পার্টনারসমূহ',
    viewAll: locale === 'en' ? 'View All' : locale === 'hi' ? 'सभी देखें' : 'সব দেখুন',
    allDistricts: locale === 'en' ? 'All Districts' : locale === 'hi' ? 'सभी जिले' : 'সব জেলা',
    becomePartner: locale === 'en' ? 'Become a Partner' : locale === 'hi' ? 'भागीदार बनें' : 'পার্টনার হন',
    tagline: locale === 'en' ? 'Fearless Journalism, Trusted Information.' : locale === 'hi' ? 'निर्भीक पत्रकारिता, विश्वसनीय जानकारी।' : 'নির্ভীক সাংবাদিকতা, বিশ্বস্ত তথ্য।',
    subTagline: locale === 'en' ? 'AI Powered Multilingual Digital News Platform.' : locale === 'hi' ? 'एआई संचालित बहुभाषी डिजिटल समाचार मंच।' : 'এআই চালিত বহুমাত্রিক ডিজিটাল সংবাদ মাধ্যম।',
    liveBadge: locale === 'en' ? '24x7 Live News' : locale === 'hi' ? '24x7 लाइव समाचार' : '২৪x৭ লাইভ নিউজ',
    liveNow: locale === 'en' ? 'LIVE NOW' : locale === 'hi' ? 'लाइव चल रहा है' : 'সরাসরি সম্প্রচার',
    watchLive: locale === 'en' ? 'Watch Nirbhik Bangla Live' : locale === 'hi' ? 'निर्भीक बांग्ला लाइव देखें' : 'নির্ভীক বাংলা লাইভ দেখুন',
    breakingNewsSub: locale === 'en' ? '24x7 Breaking News' : locale === 'hi' ? '24x7 ब्रेकिंग न्यूज़' : '২৪x৭ ব্রেকিং নিউজ',
    address: locale === 'en' ? 'NH19, Asansol, Kaliphari, Paschim Burdwan, West Bengal, PIN 713303 (Editor: Amar Deb)' : locale === 'hi' ? 'NH19, आसनसोल, कालीपहाड़ी, पश्चिम बर्धमान, पश्चिम बंगाल, पिन 713303 (संपादक: अमर देब)' : 'NH19, আসানসোল, কালিপাহাড়ী, পশ্চিম বর্ধমান, পশ্চিমবঙ্গ, পিন ৭১৩৩০৩ (সম্পাদক: অমর দেব)',
    copyright: locale === 'en' ? '© 2026 Nirbhik Bangla. All Rights Reserved.' : locale === 'hi' ? '© 2026 निर्भीक बांग्ला। सर्वाधिकार सुरक्षित।' : '© ২০২৬ নির্ভীক বাংলা। সর্বস্বত্ব সংরক্ষিত।',
    madeInIndia: locale === 'en' ? 'Proudly Made in India' : locale === 'hi' ? 'भारत में गर्व से निर्मित' : 'ভারতে গর্বের সাথে তৈরি',
    privacy: locale === 'en' ? 'Privacy Policy' : locale === 'hi' ? 'गोपनीयता नीति' : 'গোপনীয়তা নীতি',
    terms: locale === 'en' ? 'Terms & Conditions' : locale === 'hi' ? 'नियम और शर्तें' : 'শর্তাবলী',
    disclaimer: locale === 'en' ? 'Disclaimer' : locale === 'hi' ? 'अस्वीकरण' : 'ডিসক্লেইমার',
    cookies: locale === 'en' ? 'Cookies Policy' : locale === 'hi' ? 'कुकीज़ नीति' : 'কুকিজ পলিসি',
    dmca: locale === 'en' ? 'DMCA' : locale === 'hi' ? 'डीएमसीए' : 'ডিএমসিএ',
    accessibility: locale === 'en' ? 'Accessibility' : locale === 'hi' ? 'सुलभता' : 'অ্যাক্সেসিবিলিটি',
    sitemap: locale === 'en' ? 'Sitemap' : locale === 'hi' ? 'साइटमैप' : 'সাইটম্যাপ',
    rssFeed: locale === 'en' ? 'RSS Feed' : locale === 'hi' ? 'आरएसएस फीड' : 'আরএসএস ফিড',
    poweredByAi: locale === 'en' ? 'Powered by AI' : locale === 'hi' ? 'एआई द्वारा संचालित' : 'এআই চালিত',

    liveTvList: locale === 'en' ? {
      watchLive: 'Watch Live',
      upcoming: 'Upcoming Broadcast',
      previous: 'Previous Live',
      schedule: 'Program Schedule',
      library: 'Video Library'
    } : locale === 'hi' ? {
      watchLive: 'लाइव देखें',
      upcoming: 'आगामी प्रसारण',
      previous: 'पिछला लाइव',
      schedule: 'कार्यक्रम तालिका',
      library: 'वीडियो लाइब्रेरी'
    } : {
      watchLive: 'লাইভ দেখুন',
      upcoming: 'আগামী সম্প্রচার',
      previous: 'পূর্ববর্তী লাইভ',
      schedule: 'অনুষ্ঠানসূচী',
      library: 'ভিডিও লাইব্রেরি'
    }
  };

  // Workable Category List with Slugs
  const categories = [
    { label: locale === 'en' ? 'Politics' : locale === 'hi' ? 'राजनीति' : 'রাজনীতি', slug: 'politics' },
    { label: locale === 'en' ? 'State' : locale === 'hi' ? 'राज्य' : 'রাজ্য', slug: 'rajya' },
    { label: locale === 'en' ? 'National' : locale === 'hi' ? 'राष्ट्रीय' : 'দেশ', slug: 'desh' },
    { label: locale === 'en' ? 'World' : locale === 'hi' ? 'विश्व' : 'বিশ্ব', slug: 'biswa' },
    { label: locale === 'en' ? 'Business' : locale === 'hi' ? 'व्यापार' : 'ব্যবসা', slug: 'business' },
    { label: locale === 'en' ? 'Sports' : locale === 'hi' ? 'खेल' : 'খেলাধুলা', slug: 'khela' },
    { label: locale === 'en' ? 'Entertainment' : locale === 'hi' ? 'मनोरंजन' : 'বিনোদন', slug: 'binodon' },
    { label: locale === 'en' ? 'Technology' : locale === 'hi' ? 'प्रौद्योगिकी' : 'প্রযুক্তি', slug: 'technology' },
    { label: locale === 'en' ? 'Lifestyle' : locale === 'hi' ? 'जीवन शैली' : 'লাইফস্টাইল', slug: 'lifestyle' },
    { label: locale === 'en' ? 'Health' : locale === 'hi' ? 'स्वास्थ्य' : 'স্বাস্থ্য', slug: 'health' },
    { label: locale === 'en' ? 'Education' : locale === 'hi' ? 'शिक्षा' : 'শিক্ষা', slug: 'education' },
    { label: locale === 'en' ? 'Crime' : locale === 'hi' ? 'अपराध' : 'অপরাধ', slug: 'crime' },
    { label: locale === 'en' ? 'Weather' : locale === 'hi' ? 'मौसम' : 'আবহাওয়া', slug: 'weather' },
    { label: locale === 'en' ? 'Video' : locale === 'hi' ? 'वीडियो' : 'ভিডিও', slug: 'video' },
    { label: locale === 'en' ? 'Live TV' : locale === 'hi' ? 'लाइव टीवी' : 'লাইভ টিভি', slug: 'live-tv' },
  ];

  // Workable Quick Links
  const quickLinks = [
    { label: locale === 'en' ? 'About Us' : locale === 'hi' ? 'हमारे बारे में' : 'আমাদের সম্পর্কে', path: '/about' },
    { label: locale === 'en' ? 'Editorial Policy' : locale === 'hi' ? 'संपादकीय नीति' : 'সম্পাদকীয় নীতি', path: '/editorial-policy' },
    { label: locale === 'en' ? 'Fact Checking' : locale === 'hi' ? 'तथ्य जांच' : 'ফ্যাক্ট চেক', path: '/editorial-policy' },
    { label: locale === 'en' ? 'Advertise With Us' : locale === 'hi' ? 'विज्ञापन दें' : 'বিজ্ঞাপন দিন', path: '/contact' },
    { label: locale === 'en' ? 'Career' : locale === 'hi' ? 'करियर' : 'ক্যারিয়ার', path: '/about' },
    { label: locale === 'en' ? 'Contact Us' : locale === 'hi' ? 'संपर्क करें' : 'যোগাযোগ করুন', path: '/contact' },
    { label: locale === 'en' ? 'Submit News' : locale === 'hi' ? 'समाचार सबमिट करें' : 'সংবাদ প্রদান করুন', path: '/submit-news' },
    { label: locale === 'en' ? 'Become a Reporter' : locale === 'hi' ? 'रिपोर्टर बनें' : 'রিপোর্টার হন', path: '/become-reporter' },
    { label: locale === 'en' ? 'RSS Feed' : locale === 'hi' ? 'आरएसएस फीड' : 'আরএসএস ফিড', path: '/rss' },
    { label: locale === 'en' ? 'Sitemap' : locale === 'hi' ? 'साइटमैप' : 'সাইটম্যাপ', path: '/sitemap' },
  ];

  // Social Links with real destination URLs
  const socialLinks = [
    { name: 'Facebook', icon: SocialIcons.facebook, color: 'text-[#1877f2]', url: 'https://facebook.com/nirbhikbangla' },
    { name: 'YouTube', icon: SocialIcons.youtube, color: 'text-red-600', url: 'https://youtube.com/@nirbhikbangla' },
    { name: 'Instagram', icon: SocialIcons.instagram, color: 'text-[#d62976]', url: 'https://instagram.com/nirbhikbangla' },
    { name: 'X (Twitter)', icon: SocialIcons.twitter, color: 'text-slate-900', url: 'https://x.com/nirbhikbangla' },
    { name: 'Telegram', icon: SocialIcons.telegram, color: 'text-[#24A1DE]', url: 'https://t.me/nirbhikbangla' },
    { name: 'WhatsApp Channel', icon: SocialIcons.whatsapp, color: 'text-[#25D366]', url: 'https://whatsapp.com/channel/nirbhikbangla' },
    { name: 'LinkedIn', icon: SocialIcons.linkedin, color: 'text-[#0A66C2]', url: 'https://linkedin.com/company/nirbhikbangla' },
  ];

  return (
    <footer className="w-full bg-[#fbfcfd] text-slate-700 font-outfit border-t border-slate-200/80">
      
      {/* 1. Top Newsletter & Mobile App Banner Section */}
      <div className="bg-[#fff6f6] border-b border-red-100/60 py-5 px-3 md:px-8">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
          
          {/* Left: Newsletter Subscription Box */}
          <div className="md:col-span-7 flex flex-col sm:flex-row items-center gap-3 md:gap-4 bg-white p-3.5 md:p-5 rounded-2xl border border-red-100 shadow-2xs">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#eb1c24] text-white flex items-center justify-center shrink-0 shadow-md">
              <Mail size={20} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-extrabold text-slate-900 text-xs md:text-base">
                {txt.newsletterTitle}
              </h3>
              <p className="text-[11px] md:text-xs text-slate-500 font-medium mt-0.5">
                {txt.newsletterSub}
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center w-full sm:w-auto gap-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={txt.emailPlaceholder}
                className="px-3 py-1.5 md:py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-800 outline-none focus:border-[#eb1c24] w-full sm:min-w-[190px]"
              />
              <button
                type="submit"
                className="bg-[#eb1c24] hover:bg-red-700 text-white font-extrabold text-xs px-3.5 py-1.5 md:py-2 rounded-xl flex items-center gap-1 shadow-md shadow-red-500/20 transition-all shrink-0 cursor-pointer"
              >
                <Send size={12} />
                <span>{subscribed ? txt.subscribedBtn : txt.subscribeBtn}</span>
              </button>
            </form>
          </div>

          {/* Right: Download App Box */}
          <div className="md:col-span-5 flex items-center justify-between gap-3 bg-white p-3.5 md:p-5 rounded-2xl border border-red-100 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-50 text-[#eb1c24] flex items-center justify-center shrink-0">
                <Smartphone size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-xs md:text-sm">{txt.downloadApp}</h3>
                <p className="text-[10px] md:text-xs text-slate-500 font-medium">{txt.appSub}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-900 transition-colors shadow-xs"
              >
                <SocialIcons.googlePlay className="w-3.5 h-3.5 text-white shrink-0" />
                <div className="text-left leading-none">
                  <span className="text-[6px] font-bold text-slate-300 block uppercase">GET IT ON</span>
                  <span className="text-[9px] font-extrabold">Google Play</span>
                </div>
              </a>
              <a
                href="https://apps.apple.com/app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-900 transition-colors shadow-xs"
              >
                <SocialIcons.apple className="w-3.5 h-3.5 text-white shrink-0" />
                <div className="text-left leading-none">
                  <span className="text-[6px] font-bold text-slate-300 block uppercase">Download on the</span>
                  <span className="text-[9px] font-extrabold">App Store</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MOBILE SPECIFIC ACCORDION FOOTER VIEW (Block on mobile, Hidden on Desktop) */}
      <div className="block md:hidden px-3 py-6 space-y-3">
        
        {/* Accordion 1: Categories */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <button
            onClick={() => toggleAccordion('categories')}
            className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                <LayoutGrid size={16} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{txt.categories}</h4>
                <p className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">
                  {categories.slice(0, 5).map(c => c.label).join(', ')}...
                </p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${openAccordions.categories ? 'rotate-180 text-red-600' : ''}`} />
          </button>
          
          {openAccordions.categories && (
            <div className="p-3.5 pt-0 border-t border-slate-100 bg-slate-50/50">
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                {categories.map(cat => (
                  <Link key={cat.slug} href={`/${locale}/category/${cat.slug}`} className="py-1 px-2 hover:text-[#eb1c24]">
                    • {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Live TV */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <button
            onClick={() => toggleAccordion('liveTv')}
            className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                <Tv size={16} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{txt.liveTv}</h4>
                <p className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">
                  {txt.liveTvList?.watchLive}, {txt.liveTvList?.upcoming}...
                </p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${openAccordions.liveTv ? 'rotate-180 text-red-600' : ''}`} />
          </button>

          {openAccordions.liveTv && (
            <div className="p-3.5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-2 text-xs font-semibold text-slate-700">
              <Link href={`/${locale}/live`} className="block py-1 px-2 hover:text-red-600">• {txt.liveTvList?.watchLive}</Link>
              <Link href={`/${locale}/live`} className="block py-1 px-2 hover:text-red-600">• {txt.liveTvList?.upcoming}</Link>
              <Link href={`/${locale}/live`} className="block py-1 px-2 hover:text-red-600">• {txt.liveTvList?.previous}</Link>
              <Link href={`/${locale}/schedule`} className="block py-1 px-2 hover:text-red-600">• {txt.liveTvList?.schedule}</Link>
              <Link href={`/${locale}/videos`} className="block py-1 px-2 hover:text-red-600">• {txt.liveTvList?.library}</Link>
            </div>
          )}
        </div>

        {/* Accordion 3: Quick Links */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <button
            onClick={() => toggleAccordion('quickLinks')}
            className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
                <Link2 size={16} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{txt.quickLinks}</h4>
                <p className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">
                  {quickLinks.slice(0, 4).map(l => l.label).join(', ')}...
                </p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${openAccordions.quickLinks ? 'rotate-180 text-red-600' : ''}`} />
          </button>

          {openAccordions.quickLinks && (
            <div className="p-3.5 pt-0 border-t border-slate-100 bg-slate-50/50">
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                {quickLinks.map(link => (
                  <Link key={link.path} href={`/${locale}${link.path}`} className="py-1 px-2 hover:text-red-600">
                    • {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Accordion 4: Languages */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <button
            onClick={() => toggleAccordion('languages')}
            className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Globe size={16} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{txt.languages}</h4>
                <p className="text-[10px] text-slate-400 font-medium">
                  বাংলা (BN) | English (EN) | हिंदी (HI)
                </p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${openAccordions.languages ? 'rotate-180 text-red-600' : ''}`} />
          </button>

          {openAccordions.languages && (
            <div className="p-3.5 pt-0 border-t border-slate-100 bg-slate-50/50 grid grid-cols-3 gap-2">
              <button
                onClick={() => setLanguage('bn')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  locale === 'bn' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-200'
                }`}
              >
                <SocialIcons.flagIndia className="w-4 h-3" />
                <span>বাংলা (BN)</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  locale === 'en' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-200'
                }`}
              >
                <SocialIcons.flagUK className="w-4 h-3" />
                <span>English (EN)</span>
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  locale === 'hi' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-200'
                }`}
              >
                <SocialIcons.flagIndia className="w-4 h-3" />
                <span>हिंदी (HI)</span>
              </button>
            </div>
          )}
        </div>

        {/* Accordion 5: Follow Us */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <button
            onClick={() => toggleAccordion('followUs')}
            className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Users size={16} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{txt.followUs}</h4>
                <p className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">
                  {socialLinks.slice(0, 4).map(s => s.name).join(', ')}...
                </p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${openAccordions.followUs ? 'rotate-180 text-red-600' : ''}`} />
          </button>

          {openAccordions.followUs && (
            <div className="p-3.5 pt-0 border-t border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-2 text-xs font-extrabold text-slate-700">
              {socialLinks.map(s => {
                const IconComp = s.icon;
                return (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-1 px-2 hover:text-red-600">
                    <IconComp className={`w-3.5 h-3.5 ${s.color}`} />
                    <span>{s.name}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Section: Trending Tags */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Tag size={15} />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">{txt.trendingTags}</h4>
            </div>
            <Link href={`/${locale}/tags`} className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1">
              <span>{txt.viewAll}</span>
              <span>→</span>
            </Link>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              'Election', 'Mamata Banerjee', 'BJP', 'India', 'Kolkata', 'IPL', 'Breaking News'
            ].map(tag => (
              <Link key={tag} href={`/${locale}/search?tag=${encodeURIComponent(tag)}`} className="px-2.5 py-1 bg-white border border-red-200 rounded-lg text-red-600 font-bold text-[11px] hover:bg-rose-50 transition-colors">
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Section: Popular Searches */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                <Search size={15} />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">{txt.popularSearches}</h4>
            </div>
            <Link href={`/${locale}/search`} className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1">
              <span>{txt.viewAll}</span>
              <span>→</span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-1 text-[11px] text-slate-600 font-medium">
            {['West Bengal News', 'Asansol News', 'India News', 'Jobs', 'Education'].map((term, i) => (
              <Link key={term} href={`/${locale}/search?q=${encodeURIComponent(term)}`} className="hover:text-red-600">
                {term}{i < 4 ? ',' : ''}
              </Link>
            ))}
          </div>
        </div>

        {/* Section: District News */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                <MapPin size={15} />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">{txt.districtNews}</h4>
            </div>
            <Link href={`/${locale}/districts`} className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1">
              <span>{txt.allDistricts}</span>
              <span>→</span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-1 text-[11px] text-slate-600 font-medium">
            {['Kolkata', 'Asansol', 'Durgapur', 'Howrah', 'Hooghly', 'Purulia', 'Bankura'].map((dist, i) => (
              <Link key={dist} href={`/${locale}/search?district=${encodeURIComponent(dist)}`} className="hover:text-red-600">
                {dist}{i < 6 ? ',' : ''}
              </Link>
            ))}
          </div>
        </div>

        {/* Section: Our Partners */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                <Award size={15} />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">{txt.ourPartners}</h4>
            </div>
            <Link href={`/${locale}/about`} className="text-[11px] font-bold text-red-600 hover:underline">
              {txt.becomePartner} →
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <Link href="https://newsinitiative.withgoogle.com" target="_blank" className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-[8px] font-bold text-slate-700 text-center flex items-center justify-center hover:border-red-200">
              Google News
            </Link>
            <Link href="#" className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-[8px] font-bold text-red-600 text-center flex items-center justify-center hover:border-red-200">
              PRESS ASSOC
            </Link>
            <Link href="#" className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-[8px] font-bold text-purple-700 text-center flex items-center justify-center hover:border-red-200">
              FACT CHECK
            </Link>
            <Link href="https://iamai.in" target="_blank" className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-[8px] font-bold text-blue-700 text-center flex items-center justify-center hover:border-red-200">
              IAMAI
            </Link>
          </div>
        </div>

        {/* Mobile Brand Card Box */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <img src="/images/logos/Nirbhik-Bangla-Logo-No-Bg.png" alt="Nirbhik Bangla" className="h-10 w-auto object-contain" />
            <div className="border-l border-slate-200 pl-3 text-[10px] text-slate-500 font-medium">
              <p className="font-bold text-slate-900">{txt.tagline}</p>
              <p>{txt.subTagline}</p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 font-medium">
            <a href="mailto:nirvikbanglaportal@gmail.com" className="flex items-center gap-2 hover:text-red-600">
              <Mail size={13} className="text-[#eb1c24] shrink-0" />
              <span>nirvikbanglaportal@gmail.com</span>
            </a>
            <a href="tel:03368288835" className="flex items-center gap-2 hover:text-red-600">
              <Phone size={13} className="text-[#eb1c24] shrink-0" />
              <span>033-68288835</span>
            </a>
            <a href="https://maps.google.com/?q=Kolkata,West+Bengal,India" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-red-600">
              <MapPin size={13} className="text-[#eb1c24] shrink-0 mt-0.5" />
              <span>{txt.address}</span>
            </a>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-2.5 pt-2 border-t border-slate-100">
            {socialLinks.map(s => {
              const IconComp = s.icon;
              const isImg = s.name === 'Instagram' || s.name.includes('WhatsApp');
              return (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className={`w-8 h-8 flex items-center justify-center text-xs hover:scale-110 transition-transform ${isImg ? 'bg-transparent' : `rounded-full ${s.url.includes('facebook') ? 'bg-[#1877f2]' : s.url.includes('youtube') ? 'bg-red-600' : s.url.includes('x.com') ? 'bg-slate-900' : s.url.includes('t.me') ? 'bg-[#24A1DE]' : 'bg-[#0A66C2]'} text-white shadow-xs`}`}>
                  <IconComp className={isImg ? "w-7 h-7 object-contain" : "w-4 h-4 fill-current"} />
                </a>
              );
            })}
          </div>
        </div>

      </div>

      {/* DESKTOP FOOTER VIEW (Hidden on Mobile, Block on Desktop) */}
      <div className="hidden md:block">
        
        {/* Main Multi-Column Footer Grid */}
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8">
            
            {/* Col 1: Brand Info & Address */}
            <div className="lg:col-span-3 space-y-4">
              <Link href={`/${locale}`} className="inline-flex items-center gap-2">
                <img
                  src="/images/logos/Nirbhik-Bangla-Logo-No-Bg.png"
                  alt="Nirbhik Bangla"
                  className="h-12 w-auto object-contain"
                />
              </Link>

              <div className="space-y-1 text-xs text-slate-600 font-medium">
                <p className="font-bold text-slate-900">{txt.tagline}</p>
                <p>{txt.subTagline}</p>
              </div>

              <Link href={`/${locale}/live`} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-black hover:bg-rose-100 transition-colors">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping inline-block" />
                <span>{txt.liveBadge}</span>
              </Link>

              <div className="space-y-2 text-xs text-slate-600 font-medium pt-1">
                <a href="mailto:nirvikbanglaportal@gmail.com" className="flex items-center gap-2 hover:text-red-600">
                  <Mail size={14} className="text-[#eb1c24] shrink-0" />
                  <span>nirvikbanglaportal@gmail.com</span>
                </a>
                <a href="tel:03368288835" className="flex items-center gap-2 hover:text-red-600">
                  <Phone size={14} className="text-[#eb1c24] shrink-0" />
                  <span>033-68288835</span>
                </a>
                <a href="https://maps.google.com/?q=Kolkata,West+Bengal,India" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-red-600">
                  <MapPin size={14} className="text-[#eb1c24] shrink-0 mt-0.5" />
                  <span className="leading-snug">{txt.address}</span>
                </a>
              </div>

              {/* Social Circle Icons Row */}
              <div className="flex items-center gap-2 pt-2">
                {socialLinks.slice(0, 6).map(s => {
                  const IconComponent = s.icon;
                  const isImg = s.name === 'Instagram' || s.name.includes('WhatsApp');
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className={`w-7 h-7 flex items-center justify-center text-xs hover:scale-110 transition-transform ${isImg ? 'bg-transparent' : `rounded-full ${s.url.includes('facebook') ? 'bg-[#1877f2]' : s.url.includes('youtube') ? 'bg-red-600' : s.url.includes('x.com') ? 'bg-slate-900' : s.url.includes('t.me') ? 'bg-[#24A1DE]' : 'bg-[#0A66C2]'} text-white shadow-2xs`}`}
                    >
                      <IconComponent className={isImg ? "w-6 h-6 object-contain" : "w-3.5 h-3.5 fill-current"} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Col 2: Categories */}
            <div className="lg:col-span-2 space-y-3">
              <div className="relative border-b border-slate-200 pb-2">
                <h4 className="font-extrabold text-slate-900 text-sm">{txt.categories}</h4>
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#eb1c24]" />
              </div>
              <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
                {categories.map(cat => (
                  <li key={cat.slug}>
                    <Link href={`/${locale}/category/${cat.slug}`} className="flex items-center justify-between hover:text-[#eb1c24] transition-colors">
                      <span>{cat.label}</span>
                      <ChevronRight size={12} className="text-slate-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Live TV */}
            <div className="lg:col-span-3 space-y-3">
              <div className="relative border-b border-slate-200 pb-2">
                <h4 className="font-extrabold text-slate-900 text-sm">{txt.liveTv}</h4>
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#eb1c24]" />
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li>
                  <Link href={`/${locale}/live`} className="flex items-center gap-2 hover:text-[#eb1c24] transition-colors">
                    <Radio size={14} className="text-[#eb1c24]" /> {txt.liveTvList.watchLive}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/live`} className="flex items-center gap-2 hover:text-[#eb1c24] transition-colors">
                    <Calendar size={14} className="text-slate-400" /> {txt.liveTvList.upcoming}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/live`} className="flex items-center gap-2 hover:text-[#eb1c24] transition-colors">
                    <History size={14} className="text-slate-400" /> {txt.liveTvList.previous}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/live`} className="flex items-center gap-2 hover:text-[#eb1c24] transition-colors">
                    <Clock size={14} className="text-slate-400" /> {txt.liveTvList.schedule}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/videos`} className="flex items-center gap-2 hover:text-[#eb1c24] transition-colors">
                    <Video size={14} className="text-slate-400" /> {txt.liveTvList.library}
                  </Link>
                </li>
              </ul>

              {/* Live TV Preview Card */}
              <div className="pt-2">
                <Link href={`/${locale}/live`} className="block bg-slate-900 rounded-xl p-3 text-white space-y-2 shadow-md relative overflow-hidden group">
                  <span className="bg-[#eb1c24] text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase inline-block">
                    {txt.liveNow}
                  </span>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <img src="/images/live-tv-cover-image.png" alt="Live TV" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                    <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg absolute group-hover:scale-110 transition-transform">
                      <Play size={18} fill="white" className="ml-0.5" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-white group-hover:text-red-400 transition-colors">{txt.watchLive}</h5>
                    <p className="text-[10px] text-red-400 font-bold">{txt.breakingNewsSub}</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Col 4: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <div className="relative border-b border-slate-200 pb-2">
                <h4 className="font-extrabold text-slate-900 text-sm">{txt.quickLinks}</h4>
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#eb1c24]" />
              </div>
              <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
                {quickLinks.map(link => (
                  <li key={link.path}>
                    <Link href={`/${locale}${link.path}`} className="flex items-center justify-between hover:text-[#eb1c24] transition-colors">
                      <span>{link.label}</span>
                      <ChevronRight size={12} className="text-slate-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5 & 6 Stacked: Languages & Follow Us */}
            <div className="lg:col-span-2 space-y-6">
              {/* Languages */}
              <div className="space-y-2.5">
                <div className="relative border-b border-slate-200 pb-2">
                  <h4 className="font-extrabold text-slate-900 text-sm">{txt.languages}</h4>
                  <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#eb1c24]" />
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setLanguage('bn')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      locale === 'bn' ? 'bg-rose-50 border-red-200 text-[#eb1c24]' : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <SocialIcons.flagIndia className="w-5 h-3.5 shrink-0" />
                    <div className="text-left">
                      <span className="block font-black text-xs">বাংলা</span>
                      <span className="block text-[9px] text-slate-400 font-medium">Bengali</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setLanguage('en')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      locale === 'en' ? 'bg-rose-50 border-red-200 text-[#eb1c24]' : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <SocialIcons.flagUK className="w-5 h-3.5 shrink-0" />
                    <div className="text-left">
                      <span className="block font-black text-xs">English</span>
                      <span className="block text-[9px] text-slate-400 font-medium">English</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setLanguage('hi')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      locale === 'hi' ? 'bg-rose-50 border-red-200 text-[#eb1c24]' : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <SocialIcons.flagIndia className="w-5 h-3.5 shrink-0" />
                    <div className="text-left">
                      <span className="block font-black text-xs">हिन्दी</span>
                      <span className="block text-[9px] text-slate-400 font-medium">Hindi</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Follow Us */}
              <div className="space-y-2.5">
                <div className="relative border-b border-slate-200 pb-2">
                  <h4 className="font-extrabold text-slate-900 text-sm">{txt.followUs}</h4>
                  <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#eb1c24]" />
                </div>
                <ul className="space-y-2 text-xs font-extrabold text-slate-700">
                  {socialLinks.map(s => {
                    const IconComp = s.icon;
                    return (
                      <li key={s.name}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between hover:text-[#eb1c24] transition-colors">
                          <span className="flex items-center gap-2.5">
                            <IconComp className={`w-3.5 h-3.5 ${s.color}`} />
                            <span>{s.name}</span>
                          </span>
                          <ChevronRight size={12} className="text-slate-300" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Grid: Trending Tags, Popular Searches, District News, Partners */}
        <div className="bg-[#f5f7fa] border-t border-slate-200/80 py-8 px-4 md:px-8">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 text-xs">
            
            {/* Col 1: Trending Tags */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                <Flame size={14} className="text-rose-600" /> {txt.trendingTags}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Election', 'Mamata Banerjee', 'BJP', 'India', 'Kolkata', 'Asansol',
                  'Durgapur', 'Weather', 'Cricket', 'IPL', 'Breaking News'
                ].map(tag => (
                  <Link key={tag} href={`/${locale}/search?tag=${encodeURIComponent(tag)}`} className="px-2.5 py-1 bg-white border border-slate-200/90 rounded-lg text-slate-600 font-bold hover:border-red-200 hover:text-[#eb1c24] transition-all cursor-pointer">
                    {tag}
                  </Link>
                ))}
              </div>
              <Link href="/search" className="inline-block text-[#eb1c24] font-bold text-xs hover:underline mt-1">
                {txt.viewAll} →
              </Link>
            </div>

            {/* Col 2: Popular Searches */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                <Search size={14} className="text-slate-600" /> {txt.popularSearches}
              </h4>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 font-medium text-slate-600">
                {['West Bengal News', 'Politics News', 'Breaking News', 'Kolkata News', 'Asansol News', 'Job News', 'Durgapur News', 'Education News', 'India News', 'Cricket News'].map((term) => (
                  <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} className="hover:text-red-600 transition-colors">
                    • {term}
                  </Link>
                ))}
              </div>
              <Link href="/search" className="inline-block text-[#eb1c24] font-bold text-xs hover:underline mt-1">
                {txt.viewAll} →
              </Link>
            </div>

            {/* Col 3: District News */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-600" /> {txt.districtNews}
              </h4>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 font-medium text-slate-600">
                {['Kolkata', 'Purulia', 'Asansol', 'Bankura', 'Durgapur', 'Birbhum', 'Howrah', 'Murshidabad', 'Hooghly', 'Malda'].map((dist) => (
                  <Link key={dist} href={`/search?district=${encodeURIComponent(dist)}`} className="hover:text-red-600 transition-colors">
                    • {dist}
                  </Link>
                ))}
              </div>
              <Link href="/search" className="inline-block text-[#eb1c24] font-bold text-xs hover:underline mt-1">
                {txt.allDistricts} →
              </Link>
            </div>

            {/* Col 4: Our Partners */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                <Award size={14} className="text-slate-600" /> {txt.ourPartners}
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <a href="https://newsinitiative.withgoogle.com" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-700 text-center flex items-center justify-center hover:border-red-200 transition-colors">
                  Google News
                </a>
                <Link href={`/${locale}/about`} className="bg-white p-2 rounded-xl border border-slate-200 text-[10px] font-bold text-red-600 text-center flex items-center justify-center hover:border-red-200 transition-colors">
                  PRESS ASSOC
                </Link>
                <Link href={`/${locale}/editorial-policy`} className="bg-white p-2 rounded-xl border border-slate-200 text-[10px] font-bold text-purple-700 text-center flex items-center justify-center hover:border-red-200 transition-colors">
                  FACT CHECK
                </Link>
                <a href="https://iamai.in" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-xl border border-slate-200 text-[10px] font-bold text-blue-700 text-center flex items-center justify-center col-span-3 hover:border-red-200 transition-colors">
                  IAMAI Member
                </a>
              </div>
              <Link href={`/${locale}/about`} className="inline-block text-[#eb1c24] font-bold text-xs hover:underline mt-1">
                {txt.becomePartner} →
              </Link>
            </div>

          </div>
        </div>

      </div>

      {/* 4. Bottom Dark Copyright Bar */}
      <div className="bg-[#090d16] text-slate-400 py-4 pb-24 md:pb-28 px-3 md:px-8 border-t border-slate-800">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span>{txt.copyright}</span>
              <ShieldCheck size={14} className="text-slate-500" />
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
              <span>Developed by</span>
              <a
                href="https://wa.me/918653446874"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-extrabold flex items-center gap-1 hover:underline transition-colors"
              >
                <SocialIcons.whatsapp className="w-4 h-4 shrink-0" />
                <span>Tagobuy Technology Pvt. Ltd.</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-1.5 py-0.2 rounded font-mono">(+91 8653446874)</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center font-medium text-[10px] md:text-[11px] text-slate-400">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-white transition-colors">{txt.privacy}</Link>
            <span>•</span>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{txt.terms}</Link>
            <span>•</span>
            <Link href={`/${locale}/disclaimer`} className="hover:text-white transition-colors">{txt.disclaimer}</Link>
            <span>•</span>
            <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">{txt.cookies}</Link>
            <span>•</span>
            <Link href={`/${locale}/dmca`} className="hover:text-white transition-colors">{txt.dmca}</Link>
            <span>•</span>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{txt.accessibility}</Link>
            <span>•</span>
            <Link href={`/${locale}/sitemap`} className="hover:text-white transition-colors">{txt.sitemap}</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
