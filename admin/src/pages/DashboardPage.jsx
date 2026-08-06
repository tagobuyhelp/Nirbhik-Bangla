import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Download,
  TrendingUp,
  Eye,
  MoreVertical,
  PlusCircle,
  FolderTree,
  Radio,
  UploadCloud,
  UserPlus,
  MessageCircle,
  CalendarDays,
  BarChart3,
  Sliders,
  Server,
  Cpu,
  HardDrive,
  Database,
  Code2,
  Clock,
  RotateCw,
  FileText,
  Users,
  MessageSquare,
  BarChart3 as BarChartIcon
} from 'lucide-react';

const defaultKpis = [
  {
    id: 'posts',
    title: 'Total Posts',
    value: 0,
    trend: '0%',
    isUp: true,
    sub: 'vs last 30 days',
    bgIcon: 'bg-rose-600 text-white shadow-sm',
    icon: FileText,
    sparkColor: '#e11d48',
    sparkPath: 'M0 25 C10 20, 20 28, 30 15 C40 22, 50 10, 60 18 C70 12, 80 20, 90 8 L90 30 L0 30 Z',
    strokePath: 'M0 25 C10 20, 20 28, 30 15 C40 22, 50 10, 60 18 C70 12, 80 20, 90 8',
  },
  {
    id: 'views',
    title: 'Total Views',
    value: 0,
    trend: '0%',
    isUp: true,
    sub: 'vs last 30 days',
    bgIcon: 'bg-emerald-600 text-white shadow-sm',
    icon: Eye,
    sparkColor: '#059669',
    sparkPath: 'M0 22 C10 25, 20 12, 30 18 C40 8, 50 15, 60 10 C70 14, 80 5, 90 3 L90 30 L0 30 Z',
    strokePath: 'M0 22 C10 25, 20 12, 30 18 C40 8, 50 15, 60 10 C70 14, 80 5, 90 3',
  },
  {
    id: 'reporters',
    title: 'Total Reporters',
    value: 0,
    trend: '0%',
    isUp: true,
    sub: 'vs last 30 days',
    bgIcon: 'bg-blue-600 text-white shadow-sm',
    icon: Users,
    sparkColor: '#2563eb',
    sparkPath: 'M0 28 C10 20, 20 24, 30 16 C40 18, 50 12, 60 14 C70 8, 80 12, 90 6 L90 30 L0 30 Z',
    strokePath: 'M0 28 C10 20, 20 24, 30 16 C40 18, 50 12, 60 14 C70 8, 80 12, 90 6',
  },
  {
    id: 'impressions',
    title: 'Ad Impressions',
    value: 0,
    trend: '0%',
    isUp: true,
    sub: 'vs last 30 days',
    bgIcon: 'bg-amber-500 text-white shadow-sm',
    icon: MessageSquare,
    sparkColor: '#d97706',
    sparkPath: 'M0 20 C10 24, 20 15, 30 22 C40 14, 50 18, 60 10 C70 16, 80 9, 90 12 L90 30 L0 30 Z',
    strokePath: 'M0 20 C10 24, 20 15, 30 22 C40 14, 50 18, 60 10 C70 16, 80 9, 90 12',
  },
  {
    id: 'livestreams',
    title: 'Live Streams',
    value: 0,
    trend: '0%',
    isUp: true,
    sub: 'vs last 30 days',
    bgIcon: 'bg-purple-600 text-white shadow-sm',
    icon: Radio,
    sparkColor: '#9333ea',
    sparkPath: 'M0 24 C10 18, 20 26, 30 12 C40 20, 50 8, 60 16 C70 10, 80 14, 90 4 L90 30 L0 30 Z',
    strokePath: 'M0 24 C10 18, 20 26, 30 12 C40 20, 50 8, 60 16 C70 10, 80 14, 90 4',
  },
  {
    id: 'clicks',
    title: 'Ad Clicks',
    value: 0,
    trend: '0%',
    isUp: true,
    sub: 'vs last 30 days',
    bgIcon: 'bg-teal-600 text-white shadow-sm',
    icon: BarChartIcon,
    sparkColor: '#0d9488',
    sparkPath: 'M0 22 C10 16, 20 25, 30 10 C40 18, 50 12, 60 20 C70 9, 80 15, 90 5 L90 30 L0 30 Z',
    strokePath: 'M0 22 C10 16, 20 25, 30 10 C40 18, 50 12, 60 20 C70 9, 80 15, 90 5',
  },
];

export default function DashboardPage() {
  const [dateRange] = useState('Last 30 Days');
  const [kpis, setKpis] = useState(defaultKpis);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [activeStreams, setActiveStreams] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get('/analytics/dashboard');
        const metrics = data.data;

        setKpis([
          { ...defaultKpis[0], value: metrics.totalArticles },
          { ...defaultKpis[1], value: metrics.totalViews },
          { ...defaultKpis[2], value: metrics.totalReporters },
          { ...defaultKpis[3], value: metrics.adStats?.totalImpressions || 0 },
          { ...defaultKpis[4], value: metrics.totalStreams },
          { ...defaultKpis[5], value: metrics.adStats?.totalClicks || 0 },
        ]);

        setRecentPosts(metrics.recentPosts || []);
        setActiveStreams(metrics.activeStreams || []);
        setCategoryStats(metrics.categoryStats || []);
      } catch (error) {
        console.error('Failed to fetch dashboard metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const quickActions = [
    { label: 'Add New Post', sub: 'Write Bengali news with AI', path: '/posts/add', icon: PlusCircle, bg: 'bg-[#eb1c24] text-white', shortcut: 'Ctrl + N' },
    { label: 'Go Live TV', sub: 'Start live broadcast', path: '/live-tv', icon: Radio, bg: 'bg-emerald-600 text-white', shortcut: 'Alt + L' },
    { label: 'Add Category', sub: 'Organize news topics', path: '/categories/add', icon: FolderTree, bg: 'bg-amber-600 text-white', shortcut: 'Alt + C' },
    { label: 'Manage Ads', sub: 'Campaigns & zones', path: '/ads-manager', icon: BarChart3, bg: 'bg-purple-600 text-white', shortcut: 'Alt + A' },
    { label: 'Site Settings', sub: 'Global portal config', path: '/settings', icon: Sliders, bg: 'bg-slate-700 text-white', shortcut: 'Alt + S' },
  ];

  return (
    <div className="space-y-6 font-outfit">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
            Dashboard
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Welcome back, Super Admin! Here's what's happening on your portal.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer font-outfit">
            <Calendar size={14} className="text-slate-500" />
            <span>{dateRange}</span>
          </button>
          <button className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 shadow-md shadow-red-500/20 transition-all cursor-pointer font-outfit uppercase tracking-wider">
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {loading ? (
          <div className="col-span-full h-32 flex items-center justify-center text-slate-400 font-semibold text-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              Loading Metrics...
            </div>
          </div>
        ) : kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${kpi.bgIcon}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex items-center gap-0.5 text-[11px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-mono">
                    <TrendingUp size={11} />
                    <span>{kpi.trend}</span>
                  </div>
                </div>

                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider font-outfit">
                  {kpi.title}
                </p>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1 tracking-tight font-outfit">
                  {kpi.value}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5 font-outfit">
                  {kpi.sub}
                </p>
              </div>

              <div className="mt-3 w-full h-8 overflow-hidden">
                <svg viewBox="0 0 90 30" className="w-full h-full">
                  <defs>
                    <linearGradient id={`grad-dash-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={kpi.sparkColor} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={kpi.sparkColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d={kpi.sparkPath} fill={`url(#grad-dash-${kpi.id})`} />
                  <path d={kpi.strokePath} fill="none" stroke={kpi.sparkColor} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Middle Section: Traffic Line Chart, Categories Donut & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Traffic Chart */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Website Traffic Overview</h3>
              <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#eb1c24] rounded-full inline-block" />
                  <span>Page Views</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-slate-400 rounded-full inline-block" />
                  <span>Visitors</span>
                </div>
              </div>
            </div>

            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1.5 rounded-lg outline-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>

          <div className="w-full h-56 pt-2">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              <line x1="30" y1="20" x2="490" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="24" fill="#94a3b8" fontSize="10" fontWeight="600">50K</text>

              <line x1="30" y1="60" x2="490" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="64" fill="#94a3b8" fontSize="10" fontWeight="600">40K</text>

              <line x1="30" y1="100" x2="490" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="104" fill="#94a3b8" fontSize="10" fontWeight="600">30K</text>

              <line x1="30" y1="140" x2="490" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <text x="5" y="144" fill="#94a3b8" fontSize="10" fontWeight="600">20K</text>

              <line x1="30" y1="180" x2="490" y2="180" stroke="#e2e8f0" strokeWidth="1" />
              <text x="5" y="184" fill="#94a3b8" fontSize="10" fontWeight="600">10K</text>

              <polyline
                fill="none"
                stroke="#eb1c24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="30,120 70,105 110,130 150,90 190,115 230,55 270,95 310,60 350,85 390,45 430,70 470,40"
              />
              {[[30,120], [70,105], [110,130], [150,90], [190,115], [230,55], [270,95], [310,60], [350,85], [390,45], [430,70], [470,40]].map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="3.5" fill="#eb1c24" stroke="white" strokeWidth="2" />
              ))}

              <polyline
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 2"
                points="30,145 70,130 110,150 150,120 190,135 230,95 270,125 310,100 350,130 390,85 430,110 470,75"
              />
              {[[30,145], [70,130], [110,150], [150,120], [190,135], [230,95], [270,125], [310,100], [350,130], [390,85], [430,110], [470,75]].map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="3" fill="#64748b" stroke="white" strokeWidth="1.5" />
              ))}

              {['21 May', '25 May', '29 May', '2 Jun', '6 Jun', '10 Jun', '14 Jun', '18 Jun', '20 Jun'].map((d, i) => (
                <text key={i} x={30 + i * 55} y="198" fill="#94a3b8" fontSize="9" fontWeight="600" textAnchor="middle">
                  {d}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Categories Donut Chart */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 mb-2">Top Performing Categories</h3>

          <div className="relative w-40 h-40 mx-auto my-2 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
              {categoryStats.length > 0 ? (
                <>
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#eb1c24" strokeWidth="18" strokeDasharray="67 238" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f97316" strokeWidth="18" strokeDasharray="52 238" strokeDashoffset="-67" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#eab308" strokeWidth="18" strokeDasharray="38 238" strokeDashoffset="-119" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#22c55e" strokeWidth="18" strokeDasharray="33 238" strokeDashoffset="-157" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#06b6d4" strokeWidth="18" strokeDasharray="24 238" strokeDashoffset="-190" />
                </>
              ) : (
                <circle cx="50" cy="50" r="38" fill="none" stroke="#e2e8f0" strokeWidth="18" />
              )}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-black text-slate-900 leading-tight">
                {kpis[0]?.value || 0}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">Total</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs pt-2">
            {categoryStats.length > 0 ? categoryStats.map((item, i) => {
              const colors = ['bg-[#eb1c24]', 'bg-orange-500', 'bg-amber-500', 'bg-green-500', 'bg-cyan-500', 'bg-blue-500'];
              return (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${colors[i % colors.length]}`} />
                    <span className="font-bold text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-500">{item.count}</span>
                </div>
              );
            }) : (
              <div className="col-span-2 text-center text-slate-400 py-2">No categories found</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Quick Actions</h3>
              <p className="text-[11px] text-slate-400 font-medium">Shortcuts to manage your news portal</p>
            </div>
            <span className="text-[10px] font-black bg-rose-50 text-[#eb1c24] border border-red-200 px-2 py-0.5 rounded-full">
              6 Shortcuts
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link
                  key={idx}
                  to={action.path}
                  className="p-3 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-[#eb1c24]/40 flex flex-col justify-between transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-md group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-xs shrink-0 ${action.bg}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.2 rounded group-hover:border-red-200 group-hover:text-red-600 transition-colors">
                      {action.shortcut}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-[#eb1c24] transition-colors leading-tight">
                      {action.label}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-tight mt-0.5 truncate">
                      {action.sub}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Lower Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Recent Posts */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-sm text-slate-900">Recent Posts</h3>
            <button className="text-xs font-bold text-[#eb1c24] hover:underline cursor-pointer">
              View All Posts
            </button>
          </div>

          <div className="space-y-3">
            {recentPosts.length > 0 ? recentPosts.map((post) => (
              <div key={post._id} className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors group">
                <img
                  src={post.featuredImageUrl || 'https://via.placeholder.com/150'}
                  alt=""
                  className="w-14 h-12 rounded-lg object-cover bg-slate-100 shrink-0 shadow-2xs"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-900 truncate group-hover:text-[#eb1c24] transition-colors font-bangla">
                    {post.translations?.bn?.title || post.translations?.en?.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold mt-0.5">
                    <span>{post.authorName || 'Admin'}</span>
                    <span>•</span>
                    <span className="font-bold text-slate-600 font-bangla">{post.categoryName || 'Uncategorized'}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${(post.translations?.bn?.status || 'draft') === 'published' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {(post.translations?.bn?.status || 'draft').toUpperCase()}
                  </span>
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center py-4 text-slate-400 font-medium">No recent posts</div>
            )}
          </div>
        </div>

        {/* Live Streams */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-sm text-slate-900">Live Streams</h3>
            <button className="text-xs font-bold text-[#eb1c24] hover:underline cursor-pointer">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {activeStreams.length > 0 ? activeStreams.map((stream) => (
              <div key={stream._id} className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="relative w-16 h-11 rounded-lg overflow-hidden shrink-0 shadow-2xs">
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <Radio size={16} className="text-slate-400" />
                  </div>
                  <span className="absolute top-1 left-1 bg-[#eb1c24] text-white text-[8px] font-black px-1 rounded uppercase">
                    LIVE
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-900 truncate group-hover:text-[#eb1c24] transition-colors font-bangla">
                    {stream.title}
                  </h4>
                  <p className="text-[10px] font-semibold text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>{stream.platform}</span>
                  </p>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${stream.platform.toLowerCase() === 'youtube' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                  {stream.platform}
                </span>
              </div>
            )) : (
              <div className="text-center py-4 text-slate-400 font-medium">No active streams</div>
            )}
          </div>
        </div>

        {/* System Overview */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-4">System Overview</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-600">
                  <Server size={14} className="text-slate-400" />
                  <span>Server Status</span>
                </div>
                <span className="text-[11px] font-black text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between font-bold text-slate-600 mb-1">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-slate-400" />
                    <span>CPU Usage</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">32%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[32%]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between font-bold text-slate-600 mb-1">
                  <div className="flex items-center gap-2">
                    <Sliders size={14} className="text-slate-400" />
                    <span>Memory Usage</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">58%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[58%]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between font-bold text-slate-600 mb-1">
                  <div className="flex items-center gap-2">
                    <HardDrive size={14} className="text-slate-400" />
                    <span>Disk Usage</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">67%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[67%]" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-600">
                  <Database size={14} className="text-slate-400" />
                  <span>Database</span>
                </div>
                <span className="text-[11px] font-black text-emerald-600">Active</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-600">
                  <Code2 size={14} className="text-slate-400" />
                  <span>Runtime</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-800">Node.js / Express</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-600">
                  <Clock size={14} className="text-slate-400" />
                  <span>Last Backup</span>
                </div>
                <span className="text-[10px] font-bold text-slate-700">Automated / Daily</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-[#eb1c24] rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <RotateCw size={14} />
            <span>Backup Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
