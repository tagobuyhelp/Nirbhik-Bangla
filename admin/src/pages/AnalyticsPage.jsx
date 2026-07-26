import { useState } from 'react';
import {
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  MousePointer,
  Percent,
  FileText,
  Globe2,
  Monitor,
  Smartphone,
  Tablet,
  Sparkles,
  ArrowRight,
  ChevronDown,
  BarChart2,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('May 15 – May 21, 2024');
  const [timeframe, setTimeframe] = useState('Daily');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-6 text-slate-800 font-sans relative">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Title & Top Action Buttons Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Analytics</h1>
            <span className="bg-purple-100 text-purple-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={11} /> AI Insights
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Track your website performance and audience insights.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs cursor-pointer">
            <Calendar size={14} className="text-slate-500" />
            <span>{dateRange}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>

          <button
            onClick={() => showToast('Analytics Report PDF exported successfully!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. Top 6 KPI Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Page Views */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Page Views</span>
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <FileText size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">3.25M</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ 18.5% <span className="text-slate-400 font-semibold">vs May 8 - May 14</span>
          </span>
        </div>

        {/* Card 2: Total Users */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Total Users</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Users size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">1.24M</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ 15.3% <span className="text-slate-400 font-semibold">vs May 8 - May 14</span>
          </span>
        </div>

        {/* Card 3: Unique Visitors */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Unique Visitors</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Eye size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">965K</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ 14.2% <span className="text-slate-400 font-semibold">vs May 8 - May 14</span>
          </span>
        </div>

        {/* Card 4: Avg. Session Duration */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Avg. Session Duration</span>
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Clock size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">02:48</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ 8.7% <span className="text-slate-400 font-semibold">vs May 8 - May 14</span>
          </span>
        </div>

        {/* Card 5: Bounce Rate */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Bounce Rate</span>
            <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <TrendingDown size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">42.51%</h3>
          <span className="text-[9px] font-bold text-rose-600 flex items-center gap-0.5">
            ↓ 6.4% <span className="text-slate-400 font-semibold">vs May 8 - May 14</span>
          </span>
        </div>

        {/* Card 6: Total Clicks */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">Total Clicks</span>
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <MousePointer size={14} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900">128.6K</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ 21.5% <span className="text-slate-400 font-semibold">vs May 8 - May 14</span>
          </span>
        </div>
      </div>

      {/* 3. Middle Section Row 1: Traffic Line Chart & Top Channels Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Traffic Overview Multi-Line Chart (~70% - lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Traffic Overview</h3>
              <div className="flex items-center gap-4 mt-2 text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-blue-600 rounded-full inline-block" />
                  <span className="text-slate-700">Page Views</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-emerald-500 rounded-full inline-block" />
                  <span className="text-slate-700">Unique Visitors</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-purple-600 rounded-full inline-block" />
                  <span className="text-slate-700">Sessions</span>
                </div>
              </div>
            </div>

            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          {/* SVG Line Chart Graphic */}
          <div className="w-full h-64 pt-2">
            <svg viewBox="0 0 500 210" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="30" y1="20" x2="490" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="24" fill="#94a3b8" fontSize="10" fontWeight="600">800K</text>

              <line x1="30" y1="60" x2="490" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="64" fill="#94a3b8" fontSize="10" fontWeight="600">600K</text>

              <line x1="30" y1="100" x2="490" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="104" fill="#94a3b8" fontSize="10" fontWeight="600">400K</text>

              <line x1="30" y1="140" x2="490" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="144" fill="#94a3b8" fontSize="10" fontWeight="600">200K</text>

              <line x1="30" y1="180" x2="490" y2="180" stroke="#e2e8f0" strokeWidth="1" />
              <text x="5" y="184" fill="#94a3b8" fontSize="10" fontWeight="600">0</text>

              {/* Line 1: Page Views (Blue) */}
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="30,120 106,85 183,60 260,110 336,90 413,105 490,105"
              />
              {[[30,120], [106,85], [183,60], [260,110], [336,90], [413,105], [490,105]].map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="3.5" fill="#2563eb" stroke="white" strokeWidth="2" />
              ))}

              {/* Line 2: Unique Visitors (Green) */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="30,145 106,120 183,100 260,135 336,115 413,140 490,130"
              />
              {[[30,145], [106,120], [183,100], [260,135], [336,115], [413,140], [490,130]].map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="3.5" fill="#10b981" stroke="white" strokeWidth="2" />
              ))}

              {/* Line 3: Sessions (Purple) */}
              <polyline
                fill="none"
                stroke="#9333ea"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 2"
                points="30,165 106,150 183,135 260,160 336,145 413,168 490,160"
              />
              {[[30,165], [106,150], [183,135], [260,160], [336,145], [413,168], [490,160]].map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="3" fill="#9333ea" stroke="white" strokeWidth="1.5" />
              ))}

              {/* X Axis Date Labels */}
              {['May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20', 'May 21'].map((d, i) => (
                <text key={i} x={30 + i * 76.6} y="198" fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="middle">
                  {d}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Top Channels Donut Chart (~30% - lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 mb-2">Top Channels</h3>

          {/* Donut Chart */}
          <div className="relative w-40 h-40 mx-auto my-2 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray="116 238" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="58 238" strokeDashoffset="-116" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray="36 238" strokeDashoffset="-174" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray="18 238" strokeDashoffset="-210" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#9333ea" strokeWidth="16" strokeDasharray="10 238" strokeDashoffset="-228" />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-black text-slate-900 leading-none">3.25M</span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5">Total</span>
            </div>
          </div>

          {/* Legend List */}
          <div className="space-y-1.5 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
            {[
              { color: 'bg-blue-600', label: 'Organic Search', pct: '48.7% (1.58M)' },
              { color: 'bg-emerald-500', label: 'Direct', pct: '24.6% (799K)' },
              { color: 'bg-amber-500', label: 'Social Media', pct: '15.3% (498K)' },
              { color: 'bg-rose-500', label: 'Referral', pct: '7.8% (254K)' },
              { color: 'bg-purple-600', label: 'Other', pct: '3.6% (116K)' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span>{item.label}</span>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">{item.pct}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Middle Section Row 2: Device Overview, Audience Location & Top Pages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Card 1: Device Overview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 mb-2">Device Overview</h3>

          <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray="129 238" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#0284c7" strokeWidth="16" strokeDasharray="95 238" strokeDashoffset="-129" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="14 238" strokeDashoffset="-224" />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-black text-slate-900 leading-none">3.25M</span>
              <span className="text-[9px] font-bold text-slate-400 mt-0.5">Page Views</span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Desktop</span>
              </div>
              <span className="font-mono text-slate-500">54.2% (1.76M)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                <span>Mobile</span>
              </div>
              <span className="font-mono text-slate-500">40.1% (1.30M)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Tablet</span>
              </div>
              <span className="font-mono text-slate-500">5.7% (186K)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Audience Location */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 mb-2">Audience Location</h3>

          {/* World Map SVG Graphic */}
          <div className="h-28 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center relative my-1 overflow-hidden">
            <Globe2 size={64} className="text-slate-200 opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50/40">
              Global Audience Map
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
            {[
              { flag: '🇧🇩', country: 'Bangladesh', pct: '72.6%' },
              { flag: '🇮🇳', country: 'India', pct: '11.8%' },
              { flag: '🇺🇸', country: 'United States', pct: '5.6%' },
              { flag: '🇬🇧', country: 'United Kingdom', pct: '2.4%' },
              { flag: '🌐', country: 'Other Countries', pct: '7.6%' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{item.flag}</span>
                  <span>{item.country}</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{item.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Top Pages Ranking */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Top Pages</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Page Views</span>
          </div>

          <div className="space-y-2 text-xs font-mono font-bold text-slate-800 my-2">
            {[
              { page: '/', views: '812K' },
              { page: '/politics', views: '456K' },
              { page: '/bangladesh', views: '325K' },
              { page: '/international', views: '289K' },
              { page: '/sports', views: '201K' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-blue-600">{item.page}</span>
                <span className="text-slate-900">{item.views}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => showToast('Full Page Analytics Report loaded!')}
            className="w-full py-1.5 text-purple-700 text-xs font-extrabold hover:underline flex items-center justify-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
          >
            <span>View All Pages</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>

      {/* 5. Bottom Section Row 3: Top Categories, Traffic Source Trend & Audience Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Top Categories Performance Table (~35% - lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Top Categories Performance</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-400 font-extrabold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-2 px-2">Category</th>
                  <th className="py-2 px-2">Page Views</th>
                  <th className="py-2 px-2">Users</th>
                  <th className="py-2 px-2">Avg. Session Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {[
                  { cat: 'Politics', views: '1.25M', users: '485K', dur: '03:12', pct: '85%' },
                  { cat: 'Bangladesh', views: '920K', users: '362K', dur: '02:46', pct: '70%' },
                  { cat: 'International', views: '480K', users: '201K', dur: '02:35', pct: '50%' },
                  { cat: 'Sports', views: '310K', users: '142K', dur: '02:22', pct: '40%' },
                  { cat: 'Entertainment', views: '180K', users: '84K', dur: '02:10', pct: '25%' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-2 font-bold text-slate-900">{item.cat}</td>
                    <td className="py-2.5 px-2 font-mono">{item.views}</td>
                    <td className="py-2.5 px-2 font-mono text-slate-500">{item.users}</td>
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-800">{item.dur}</span>
                        <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: item.pct }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Source Trend Stacked Bar Chart (~45% - lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">Traffic Source Trend</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 flex-wrap">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-600" /> Organic</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500" /> Direct</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-rose-500" /> Social</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500" /> Referral</span>
            </div>
          </div>

          {/* Stacked Bar Chart Graphic */}
          <div className="h-52 flex items-end justify-between gap-3 pt-4 border-b border-slate-100">
            {['May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20', 'May 21'].map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full max-w-[28px] flex flex-col rounded-t-md overflow-hidden h-40">
                  <div className="bg-purple-600 h-[8%]" />
                  <div className="bg-amber-500 h-[12%]" />
                  <div className="bg-rose-500 h-[20%]" />
                  <div className="bg-emerald-500 h-[25%]" />
                  <div className="bg-blue-600 h-[35%]" />
                </div>
                <span className="text-[9px] font-bold text-slate-400">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Highlights (~20% - lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 mb-2">Audience Highlights</h3>

          <div className="space-y-3.5 text-xs font-semibold">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                <TrendingUp size={16} />
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-xs">1.24M Total Users</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  15.3% more users compared to May 8 - May 14.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                <Clock size={16} />
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-xs">02:48 Avg. Session Duration</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  Users are spending more time on your site.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                <Eye size={16} />
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-xs">4.3 Pages / Session</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  Page depth increased by 9.1% this week.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                <TrendingDown size={16} />
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-xs">42.51% Bounce Rate</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  Bounce rate decreased by 6.4% this week.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast('Full Audience Deep-Dive Report exported!')}
            className="w-full py-1.5 text-purple-700 text-xs font-extrabold hover:underline flex items-center justify-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
          >
            <span>View Full Audience Report</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>

    </div>
  );
}
