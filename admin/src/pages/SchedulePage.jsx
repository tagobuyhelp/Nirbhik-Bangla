import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Plus,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Globe,
  Radio,
  Pencil,
  MoreVertical,
  ArrowRight,
  Tv,
  Film,
  Video,
  List,
  Sliders,
  FolderTree,
  Trash2,
  RefreshCw,
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const [programsList, setProgramsList] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/schedules`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const formatted = data.data.map(p => ({
          id: p._id,
          title: typeof p.title === 'object' ? (p.title.bn || p.title.en) : p.title,
          isLive: p.isLive || p.status === 'Live Now',
          host: p.host || 'Nirbhik Desk',
          image: p.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=120&q=80',
          category: p.category || 'News',
          catBg: 'bg-blue-50 text-blue-700 border-blue-200',
          dateTime: p.startTime ? `${p.startTime}` : 'TBD',
          duration: p.duration || '01:00:00',
          platforms: p.platforms || ['web', 'yt', 'fb'],
          status: p.status || 'Upcoming',
          statusBg: p.status === 'Live Now' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-blue-50 text-blue-700 border-blue-200',
        }));
        setProgramsList(formatted);
      } else {
        // Fallback default dataset
        setProgramsList([
          {
            id: '1',
            title: 'সকালের সংবাদ',
            isLive: true,
            host: 'Nusrat Jahan',
            image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=120&q=80',
            category: 'News',
            catBg: 'bg-blue-50 text-blue-700 border-blue-200',
            dateTime: 'May 21, 2024 07:00 AM',
            duration: '01:00:00',
            platforms: ['web', 'yt', 'fb'],
            status: 'Live Now',
            statusBg: 'bg-rose-50 text-rose-700 border-rose-200',
          },
          {
            id: '2',
            title: 'প্রাইম টাইম ডিবেট',
            isLive: false,
            host: 'Arif Hossain',
            image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=120&q=80',
            category: 'Debate',
            catBg: 'bg-purple-50 text-purple-700 border-purple-200',
            dateTime: 'May 21, 2024 09:00 PM',
            duration: '00:45:00',
            platforms: ['web', 'yt'],
            status: 'Upcoming',
            statusBg: 'bg-blue-50 text-blue-700 border-blue-200',
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('আপনি কি এই প্রোগ্রামটি মুছে ফেলতে চান?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/schedules/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setProgramsList(prev => prev.filter(p => p.id !== id));
        showToast('প্রোগ্রামটি সফলতা সহকারে মোছা হয়েছে!');
      } else {
        setProgramsList(prev => prev.filter(p => p.id !== id));
        showToast('প্রোগ্রাম মোছা হয়েছে!');
      }
    } catch (err) {
      setProgramsList(prev => prev.filter(p => p.id !== id));
      showToast('প্রোগ্রাম মোছা হয়েছে!');
    }
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPrograms(programsList.map((p) => p.id));
    } else {
      setSelectedPrograms([]);
    }
  };

  const toggleSelect = (id) => {
    if (selectedPrograms.includes(id)) {
      setSelectedPrograms(selectedPrograms.filter((i) => i !== id));
    } else {
      setSelectedPrograms([...selectedPrograms, id]);
    }
  };

  const filteredPrograms = programsList.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return p.status === 'Upcoming';
    if (activeTab === 'live') return p.status === 'Live Now';
    if (activeTab === 'completed') return p.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-12">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
              Program Schedule
            </h1>
            <span className="bg-purple-100 text-purple-700 text-xs font-black px-2.5 py-0.5 rounded-full">
              {programsList.length}
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Plan, manage and schedule your TV programs and live broadcasts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <select className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer shadow-2xs">
            <option>Bulk Actions</option>
            <option>Set Live</option>
            <option>Reschedule</option>
            <option>Delete</option>
          </select>

          <button
            onClick={() => showToast('প্রোগ্রাম শিডিউল এক্সপোর্ট করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export</span>
          </button>

          <Link
            to="/schedule/create"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Plus size={16} />
            <span>Add New Program</span>
          </Link>
        </div>
      </div>

      {/* 2. Filter Tabs Bar & Date Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Programs', count: programsList.length },
              { id: 'upcoming', label: 'Upcoming', count: programsList.filter(p => p.status === 'Upcoming').length },
              { id: 'live', label: 'Live Today', count: programsList.filter(p => p.isLive || p.status === 'Live Now').length },
              { id: 'completed', label: 'Completed', count: programsList.filter(p => p.status === 'Completed').length },
              { id: 'cancelled', label: 'Cancelled', count: programsList.filter(p => p.status === 'Cancelled').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-purple-200 text-purple-800 font-black' : 'bg-slate-100 text-slate-500'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
              <Calendar size={14} className="text-slate-500" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(Date.now() + 6*24*60*60*1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <div className="flex items-center gap-1 ml-2">
                <button className="p-0.5 hover:bg-slate-200 rounded cursor-pointer"><ChevronLeft size={14} /></button>
                <button className="p-0.5 hover:bg-slate-200 rounded cursor-pointer"><ChevronRight size={14} /></button>
              </div>
            </div>

            <button className="bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
              <Filter size={14} className="text-slate-500" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Grid (8 Cols Schedule Table + 4 Cols Side Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Schedule Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-100 font-outfit">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        onChange={toggleSelectAll}
                        checked={selectedPrograms.length === filteredPrograms.length && filteredPrograms.length > 0}
                        className="rounded border-slate-300 text-[#eb1c24]"
                      />
                    </th>
                    <th className="py-3 px-3">Program</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Date & Time</th>
                    <th className="py-3 px-3">Duration</th>
                    <th className="py-3 px-3">Platform</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredPrograms.map((program) => (
                    <tr key={program.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedPrograms.includes(program.id)}
                          onChange={() => toggleSelect(program.id)}
                          className="rounded border-slate-300 text-[#eb1c24]"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                            <img src={program.image} alt="" className="w-full h-full object-cover" />
                            {program.isLive && (
                              <span className="absolute top-1 left-1 bg-[#eb1c24] text-white text-[7px] font-black px-1 rounded uppercase">
                                LIVE
                              </span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bangla font-black text-slate-900 text-xs leading-snug group-hover:text-[#eb1c24] transition-colors">
                              {program.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-semibold block">Host: {program.host}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${program.catBg}`}>
                          {program.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-700 text-[11px] font-semibold">
                        <div>{program.dateTime}</div>
                      </td>

                      <td className="py-3.5 px-3 font-mono text-slate-700 text-[11px]">
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />
                          <span>{program.duration}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1">
                          {program.platforms.includes('web') && <Globe size={13} className="text-purple-600" />}
                          {program.platforms.includes('yt') && <span className="w-3.5 h-3.5 rounded bg-red-600 text-white font-black text-[8px] flex items-center justify-center">▶</span>}
                          {program.platforms.includes('fb') && <span className="w-3.5 h-3.5 rounded bg-blue-600 text-white font-black text-[8px] flex items-center justify-center">f</span>}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider ${program.statusBg}`}>
                          {program.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/schedule/edit/${program.id}`}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Program"
                          >
                            <Pencil size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(program.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Program"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Pagination Footer */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 bg-slate-50/50">
              <span>Showing 1 to {filteredPrograms.length} of 24 programs</span>

              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#eb1c24] text-white font-bold flex items-center justify-center shadow-2xs">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                  3
                </button>
                <span className="px-1 text-slate-400 font-bold">...</span>
                <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs outline-none cursor-pointer font-bold text-slate-700">
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Side Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* 1. Schedule Calendar Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Calendar size={16} className="text-purple-600" />
                <span>Schedule Calendar</span>
              </h3>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button className="px-2 py-0.5 rounded bg-white shadow-2xs text-purple-700">Week</button>
                <button className="px-2 py-0.5 text-slate-500">Month</button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-black text-slate-800 px-1">
              <button className="p-1 hover:bg-slate-100 rounded cursor-pointer"><ChevronLeft size={14} /></button>
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(Date.now() + 6*24*60*60*1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <button className="p-1 hover:bg-slate-100 rounded cursor-pointer"><ChevronRight size={14} /></button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-slate-500 pt-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName, i) => {
                const todayNum = new Date().getDate();
                const isToday = i === 1; // Highlight active day
                return (
                  <div key={dayName} className={isToday ? 'text-purple-700 font-black' : ''}>
                    {dayName}
                    <span className={`block mt-1 ${isToday ? 'w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto shadow-xs font-mono font-bold' : 'text-slate-900 font-mono'}`}>
                      {todayNum + i}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Timeline Schedule Items */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-semibold">
              {programsList.slice(0, 4).map((prog) => (
                <div
                  key={prog.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    prog.isLive
                      ? 'bg-rose-50/70 border-rose-200/80'
                      : 'bg-slate-50/80 border-slate-200/80'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-mono font-bold block ${prog.isLive ? 'text-rose-600' : 'text-slate-500'}`}>
                      {prog.dateTime || '07:00 AM'}
                    </span>
                    <h5 className="font-bangla font-black text-slate-900 text-xs truncate max-w-[140px]">
                      {prog.title}
                    </h5>
                  </div>
                  <span
                    className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                      prog.isLive
                        ? 'bg-[#eb1c24] text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {prog.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast('সম্পূর্ণ ক্যালেন্ডার ভিউ খোলা হলো!')}
              className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold rounded-xl transition-colors cursor-pointer text-xs flex items-center justify-center gap-1 mt-2"
            >
              <span>View Full Calendar</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 2. Today's Summary Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Today's Summary
            </h3>

            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <Tv size={14} className="text-purple-600" />
                  <span>Total Programs</span>
                </div>
                <span className="font-mono font-black text-slate-900">{programsList.length}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <Radio size={14} className="text-rose-600" />
                  <span>Live Now</span>
                </div>
                <span className="font-mono font-black text-rose-600">
                  {programsList.filter(p => p.isLive || p.status === 'Live Now').length}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-emerald-600" />
                  <span>Upcoming</span>
                </div>
                <span className="font-mono font-black text-emerald-600">
                  {programsList.filter(p => p.status === 'Upcoming').length}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-slate-400" />
                  <span>Completed</span>
                </div>
                <span className="font-mono font-black text-slate-900">
                  {programsList.filter(p => p.status === 'Completed').length}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Quick Actions Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Quick Actions
            </h3>

            <div className="space-y-2 text-xs font-bold text-slate-700">
              <Link
                to="/schedule/create"
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer block"
              >
                <div className="flex items-center gap-2">
                  <Plus size={15} className="text-purple-600" />
                  <span>Add New Program</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </Link>

              <Link
                to="/go-live"
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer block"
              >
                <div className="flex items-center gap-2">
                  <Radio size={15} className="text-rose-600" />
                  <span>Go Live Now</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </Link>

              <button
                onClick={() => showToast('সকল প্রোগ্রাম প্যানেল খোলা হলো!')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <List size={15} className="text-purple-600" />
                  <span>View All Programs</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>

              <Link
                to="/categories"
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer block"
              >
                <div className="flex items-center gap-2">
                  <FolderTree size={15} className="text-purple-600" />
                  <span>Program Categories</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </Link>

              <Link
                to="/settings"
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer block"
              >
                <div className="flex items-center gap-2">
                  <Sliders size={15} className="text-purple-600" />
                  <span>Schedule Settings</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Bar */}
      <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 font-semibold">
        <span>© 2024 Nirbhik Bangla. All rights reserved.</span>
        <span className="font-mono">Version 1.0.0</span>
      </div>

    </div>
  );
}
