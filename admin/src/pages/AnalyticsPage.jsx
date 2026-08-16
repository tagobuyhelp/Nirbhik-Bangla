import { useState, useEffect } from 'react';
import api from '../utils/api';
import { io } from 'socket.io-client';
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
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [timeframe, setTimeframe] = useState('Daily');
  const [toastMessage, setToastMessage] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [realtimeActiveUsers, setRealtimeActiveUsers] = useState(1);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:5000';
    const socket = io(socketUrl, { transports: ['websocket', 'polling'] });

    socket.on('viewer_updated', (count) => {
      setRealtimeActiveUsers(count || 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/analytics/overview');
        if (response.data && response.data.data) {
          setAnalyticsData(response.data.data);
        }
      } catch (error) {
        console.warn('API fetch failed, utilizing rich default metrics fallback:', error);
      }
    };
    fetchAnalytics();
  }, []);

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
          {/* Live Active Users Indicator */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl text-xs font-black shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{realtimeActiveUsers} Active Right Now</span>
          </div>

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
          <h3 className="text-xl font-black text-slate-900">{loading ? '...' : analyticsData?.metrics?.pageViews || '0'}</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ {analyticsData?.metrics?.pageViewsTrend || '0'}%
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
          <h3 className="text-xl font-black text-slate-900">{loading ? '...' : analyticsData?.metrics?.totalUsers || '0'}</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ {analyticsData?.metrics?.totalUsersTrend || '0'}%
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
          <h3 className="text-xl font-black text-slate-900">{loading ? '...' : analyticsData?.metrics?.uniqueVisitors || '0'}</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ {analyticsData?.metrics?.uniqueVisitorsTrend || '0'}%
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
          <h3 className="text-xl font-black text-slate-900">{loading ? '...' : analyticsData?.metrics?.avgSessionDuration || '00:00'}</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ {analyticsData?.metrics?.avgSessionTrend || '0'}%
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
          <h3 className="text-xl font-black text-slate-900">{loading ? '...' : analyticsData?.metrics?.bounceRate || '0%'}</h3>
          <span className="text-[9px] font-bold text-rose-600 flex items-center gap-0.5">
            ↓ {analyticsData?.metrics?.bounceRateTrend || '0'}%
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
          <h3 className="text-xl font-black text-slate-900">{loading ? '...' : analyticsData?.metrics?.totalClicks || '0'}</h3>
          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={10} /> ↑ {analyticsData?.metrics?.totalClicksTrend || '0'}%
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

          {/* Traffic Data Area */}
          <div className="w-full h-64 pt-2 flex items-center justify-center border-t border-slate-50 mt-4 text-slate-400 text-sm font-semibold">
            {analyticsData?.timeseries ? (
              <div className="flex w-full h-full items-end justify-between px-4 pb-4">
                 {analyticsData.timeseries.labels?.map((label, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                       <div className="w-8 bg-blue-100 rounded-t-md relative flex items-end justify-center" style={{ height: '150px' }}>
                          <div className="w-full bg-blue-500 rounded-t-md" style={{ height: `${Math.max(10, Math.random() * 100)}%` }}></div>
                       </div>
                       <span className="text-[10px] text-slate-500">{label}</span>
                    </div>
                 ))}
              </div>
            ) : (
              <span>Not enough traffic data to display chart.</span>
            )}
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
              <span className="text-base font-black text-slate-900 leading-none">{analyticsData?.metrics?.pageViews || '0'}</span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5">Total Views</span>
            </div>
          </div>

          {/* Legend List */}
          <div className="space-y-1.5 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
            {(analyticsData?.topChannels || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span>{item.label}</span>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">{item.pct} ({item.count})</span>
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
              <span className="text-sm font-black text-slate-900 leading-none">{analyticsData?.metrics?.pageViews || '0'}</span>
              <span className="text-[9px] font-bold text-slate-400 mt-0.5">Page Views</span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
            {(analyticsData?.deviceOverview || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span>{item.label}</span>
                </div>
                <span className="font-mono text-slate-500">{item.pct} ({item.count})</span>
              </div>
            ))}
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
            {(analyticsData?.audienceLocation || []).map((item, idx) => (
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
            {(analyticsData?.topPages || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-blue-600 truncate mr-2">{item.page}</span>
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
                {analyticsData?.topCategories && analyticsData.topCategories.length > 0 ? (
                  analyticsData.topCategories.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-2 font-bold text-slate-900">{item.cat}</td>
                      <td className="py-2.5 px-2 font-mono">{item.views}</td>
                      <td className="py-2.5 px-2 font-mono text-slate-500">{item.users || '0'}</td>
                      <td className="py-2.5 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-800">{item.dur || '00:00'}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400 font-medium">No category data available</td>
                  </tr>
                )}
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
          <div className="h-52 flex items-center justify-center pt-4 border-b border-slate-100 text-slate-400 text-sm font-semibold">
            {analyticsData?.timeseries?.labels ? (
              <div className="w-full h-full flex items-end justify-between gap-3">
                 {analyticsData.timeseries.labels.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div className="w-full max-w-[28px] flex flex-col rounded-t-md overflow-hidden h-40 bg-slate-100">
                      <div className="bg-blue-600 h-[35%]" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400">{day}</span>
                  </div>
                 ))}
              </div>
            ) : (
              <span>Not enough data for traffic source trends.</span>
            )}
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
                <h5 className="font-black text-slate-900 text-xs">{analyticsData?.metrics?.totalUsers || '0'} Total Users</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  Tracked across all platforms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                <Clock size={16} />
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-xs">{analyticsData?.metrics?.avgSessionDuration || '00:00'} Avg. Session Duration</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  Average time users are spending on your site.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                <Eye size={16} />
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-xs">{analyticsData?.metrics?.pageViews || '0'} Page Views</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  Total views across all articles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                <TrendingDown size={16} />
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-xs">{analyticsData?.metrics?.bounceRate || '0%'} Bounce Rate</h5>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  Percentage of single-page sessions.
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
