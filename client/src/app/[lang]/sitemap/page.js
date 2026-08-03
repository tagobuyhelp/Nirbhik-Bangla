'use client';

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Compass, LayoutGrid, Tv, FileText, ShieldCheck, MapPin, Search } from 'lucide-react';

export default function SitemapPage() {
  const { locale } = useLanguage();

  const categories = [
    { name: 'Politics (রাজনীতি)', slug: 'politics' },
    { name: 'State (রাজ্য)', slug: 'rajya' },
    { name: 'National (দেশ)', slug: 'desh' },
    { name: 'World (বিশ্ব)', slug: 'biswa' },
    { name: 'Business (ব্যবসা)', slug: 'business' },
    { name: 'Sports (খেলাধুলা)', slug: 'khela' },
    { name: 'Entertainment (বিনোদন)', slug: 'binodon' },
    { name: 'Technology (প্রযুক্তি)', slug: 'technology' },
    { name: 'Lifestyle (লাইফস্টাইল)', slug: 'lifestyle' },
    { name: 'Health (স্বাস্থ্য)', slug: 'health' },
    { name: 'Education (শিক্ষা)', slug: 'education' },
    { name: 'Crime (অপরাধ)', slug: 'crime' },
    { name: 'Weather (আবহাওয়া)', slug: 'weather' },
  ];

  const mainPages = [
    { title: 'Home Page', path: `/${locale}` },
    { title: 'Watch Live TV', path: `/${locale}/live` },
    { title: 'Video Library', path: `/${locale}/videos` },
    { title: 'About Us', path: `/${locale}/about` },
    { title: 'Contact Us', path: `/${locale}/contact` },
    { title: 'Search News & Archive', path: `/search` },
  ];

  const policyPages = [
    { title: 'Privacy Policy', path: `/${locale}/privacy-policy` },
    { title: 'Terms & Conditions', path: `/${locale}/terms` },
    { title: 'Disclaimer', path: `/${locale}/disclaimer` },
    { title: 'Cookies Policy', path: `/${locale}/cookies` },
    { title: 'Editorial Policy & Fact Checking', path: `/${locale}/editorial-policy` },
    { title: 'DMCA Takedown Notice', path: `/${locale}/dmca` },
  ];

  const districts = [
    'Asansol', 'Kolkata', 'Durgapur', 'Howrah', 'Hooghly', 'Purulia', 'Bankura', 'Birbhum', 'Murshidabad', 'Malda'
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-outfit">
      <div className="max-w-[1100px] mx-auto space-y-8">
        
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-[#eb1c24] font-extrabold text-xs uppercase tracking-wider">
            <Compass size={20} />
            <span>Site Navigation & Active Directory</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold">Nirbhik Bangla HTML Sitemap</h1>
          <p className="text-slate-300 text-xs md:text-sm font-medium">Explore all verified active news categories, broadcast channels, regional desks, and legal pages.</p>
        </div>

        {/* 4 Column Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Main Pages */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-2">
              <Tv size={18} className="text-[#eb1c24]" />
              <span>Main Channels</span>
            </h2>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              {mainPages.map((item, i) => (
                <li key={i}>
                  <Link href={item.path} className="hover:text-[#eb1c24] flex items-center gap-1.5 transition-colors">
                    <span>•</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-2">
              <LayoutGrid size={18} className="text-[#eb1c24]" />
              <span>News Categories</span>
            </h2>
            <ul className="space-y-1.5 text-xs font-semibold text-slate-700">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${locale}/category/${cat.slug}`} className="hover:text-[#eb1c24] flex items-center gap-1.5 transition-colors">
                    <span>•</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* District Desks */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-2">
              <MapPin size={18} className="text-[#eb1c24]" />
              <span>District Desks</span>
            </h2>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              {districts.map((dist) => (
                <li key={dist}>
                  <Link href={`/search?district=${encodeURIComponent(dist)}`} className="hover:text-[#eb1c24] flex items-center gap-1.5 transition-colors">
                    <span>•</span>
                    <span>{dist} News Desk</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policy */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck size={18} className="text-[#eb1c24]" />
              <span>Legal & Policies</span>
            </h2>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              {policyPages.map((item, i) => (
                <li key={i}>
                  <Link href={item.path} className="hover:text-[#eb1c24] flex items-center gap-1.5 transition-colors">
                    <span>•</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
