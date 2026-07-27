import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Briefcase,
  FileText,
  Award,
  Download,
  Plus,
  Search,
  Filter,
  List,
  Grid,
  MapPin,
  Eye,
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  UserPlus,
  Calendar,
  BarChart2,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function ReportersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReporters, setSelectedReporters] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Reporter Form State
  const [newReporter, setNewReporter] = useState({
    name: '',
    email: '',
    phone: '',
    dept: 'Politics',
    role: 'Staff Reporter',
    location: 'Dhaka, Bangladesh',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Mock Dataset
  const [reportersList, setReportersList] = useState([
    {
      id: 'RB001',
      name: 'Arif Hossain',
      badge: 'Senior Reporter',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      location: 'Dhaka, Bangladesh',
      specialization: 'Politics',
      specBg: 'bg-purple-50 text-purple-700 border-purple-200',
      stories: 12,
      status: 'Active',
      lastActive: 'Today, 10:30 AM',
    },
    {
      id: 'RB002',
      name: 'Nusrat Jahan',
      badge: '',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
      location: 'Chattogram, Bangladesh',
      specialization: 'Crime',
      specBg: 'bg-pink-50 text-pink-700 border-pink-200',
      stories: 8,
      status: 'On Assignment',
      lastActive: 'Today, 09:15 AM',
    },
    {
      id: 'RB003',
      name: 'Rifat Hasan',
      badge: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      location: 'Sylhet, Bangladesh',
      specialization: 'Education',
      specBg: 'bg-blue-50 text-blue-700 border-blue-200',
      stories: 6,
      status: 'Active',
      lastActive: 'Yesterday, 08:45 PM',
    },
    {
      id: 'RB004',
      name: 'Tasnima Akter',
      badge: '',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
      location: 'Rajshahi, Bangladesh',
      specialization: 'Health',
      specBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      stories: 4,
      status: 'Active',
      lastActive: 'Yesterday, 06:20 PM',
    },
    {
      id: 'RB005',
      name: 'Sabbir Ahmed',
      badge: '',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      location: 'Khulna, Bangladesh',
      specialization: 'Sports',
      specBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      stories: 7,
      status: 'Active',
      lastActive: 'Yesterday, 05:10 PM',
    },
    {
      id: 'RB006',
      name: 'Mim Akter',
      badge: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      location: 'Rangpur, Bangladesh',
      specialization: 'Environment',
      specBg: 'bg-green-50 text-green-700 border-green-200',
      stories: 3,
      status: 'Inactive',
      lastActive: '2 days ago',
    },
    {
      id: 'RB007',
      name: 'Mahmudul Hasan',
      badge: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      location: 'Barishal, Bangladesh',
      specialization: 'Business',
      specBg: 'bg-amber-50 text-amber-700 border-amber-200',
      stories: 5,
      status: 'On Assignment',
      lastActive: 'Today, 11:45 AM',
    },
    {
      id: 'RB008',
      name: 'Farhana Islam',
      badge: '',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
      location: 'Mymensingh, Bangladesh',
      specialization: 'Culture',
      specBg: 'bg-rose-50 text-rose-700 border-rose-200',
      stories: 2,
      status: 'Active',
      lastActive: '3 days ago',
    },
  ]);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReporters(reportersList.map((r) => r.id));
    } else {
      setSelectedReporters([]);
    }
  };

  const toggleSelect = (id) => {
    if (selectedReporters.includes(id)) {
      setSelectedReporters(selectedReporters.filter((i) => i !== id));
    } else {
      setSelectedReporters([...selectedReporters, id]);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newReporter.name) return;

    const added = {
      id: `RB00${reportersList.length + 1}`,
      name: newReporter.name,
      badge: newReporter.role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      location: newReporter.location,
      specialization: newReporter.dept,
      specBg: 'bg-purple-50 text-purple-700 border-purple-200',
      stories: 0,
      status: 'Active',
      lastActive: 'Just now',
    };

    setReportersList([added, ...reportersList]);
    setShowAddModal(false);
    showToast(`নতুন রিপোর্টার ${newReporter.name} সফলভাবে যোগ করা হয়েছে!`);
    setNewReporter({ name: '', email: '', phone: '', dept: 'Politics', role: 'Staff Reporter', location: 'Dhaka, Bangladesh' });
  };

  const filteredReporters = reportersList.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.specialization.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && r.status === 'Active';
    if (activeTab === 'assignment') return matchesSearch && r.status === 'On Assignment';
    if (activeTab === 'inactive') return matchesSearch && r.status === 'Inactive';
    return matchesSearch;
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

      {/* Add Reporter Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">Add New Reporter</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arif Hossain"
                  value={newReporter.name}
                  onChange={(e) => setNewReporter({ ...newReporter, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Email</label>
                  <input
                    type="email"
                    placeholder="reporter@nirbhik.com"
                    value={newReporter.email}
                    onChange={(e) => setNewReporter({ ...newReporter, email: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Phone</label>
                  <input
                    type="text"
                    placeholder="+880 1700-000000"
                    value={newReporter.phone}
                    onChange={(e) => setNewReporter({ ...newReporter, phone: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Department</label>
                  <select
                    value={newReporter.dept}
                    onChange={(e) => setNewReporter({ ...newReporter, dept: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                  >
                    <option value="Politics">Politics</option>
                    <option value="Crime">Crime</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Sports">Sports</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Role</label>
                  <select
                    value={newReporter.role}
                    onChange={(e) => setNewReporter({ ...newReporter, role: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                  >
                    <option value="Staff Reporter">Staff Reporter</option>
                    <option value="Senior Reporter">Senior Reporter</option>
                    <option value="District Correspondent">District Correspondent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka, Bangladesh"
                  value={newReporter.location}
                  onChange={(e) => setNewReporter({ ...newReporter, location: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl shadow-md cursor-pointer uppercase tracking-wider"
                >
                  Save Reporter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
              Reporters
            </h1>
            <span className="bg-purple-100 text-purple-700 text-xs font-black px-2.5 py-0.5 rounded-full">
              {reportersList.length}
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Manage all reporters and their profiles, assignments and activities.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <select className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer shadow-2xs">
            <option>Bulk Actions</option>
            <option>Set Active</option>
            <option>Assign Task</option>
            <option>Delete</option>
          </select>

          <button
            onClick={() => showToast('রিপোর্টারদের তালিকা এক্সপোর্ট করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export</span>
          </button>

          <Link
            to="/reporters/create"
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <Plus size={16} />
            <span>Add New Reporter</span>
          </Link>
        </div>
      </div>

      {/* 2. Top 5 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Reporters</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">18</h3>
            <span className="text-[9.5px] font-bold text-slate-400">Active reporters</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active Reporters</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">15</h3>
            <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp size={10} /> ↑ 12.5% Currently active
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">On Assignment</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">6</h3>
            <span className="text-[9.5px] font-bold text-amber-600">Currently on field</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Briefcase size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Stories Filed <span className="text-[9px] font-normal text-slate-400">(This Month)</span></p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">24</h3>
            <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp size={10} /> ↑ 18.2% Total stories
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Top Performer</p>
            <h3 className="text-sm font-black text-slate-900 mt-0.5 truncate">Arif Hossain</h3>
            <span className="text-[9.5px] font-bold text-purple-600">12 Stories</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Award size={18} />
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar & Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Reporters' },
              { id: 'active', label: 'Active', count: 15 },
              { id: 'assignment', label: 'On Assignment', count: 6 },
              { id: 'inactive', label: 'Inactive', count: 3 },
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
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-purple-200 text-purple-800 font-black' : 'bg-slate-100 text-slate-500'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reporters..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] font-medium"
              />
            </div>

            <button className="bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
              <Filter size={14} className="text-slate-500" />
              <span>Filter</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <button className="p-1 rounded-lg bg-white shadow-2xs text-slate-800">
                <List size={14} />
              </button>
              <button className="p-1 rounded-lg text-slate-400 hover:text-slate-800">
                <Grid size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Grid (8 Cols Table + 4 Cols Side Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Reporters Table (8 Cols) */}
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
                        checked={selectedReporters.length === filteredReporters.length && filteredReporters.length > 0}
                        className="rounded border-slate-300 text-[#eb1c24]"
                      />
                    </th>
                    <th className="py-3 px-3">Reporter</th>
                    <th className="py-3 px-3">Location</th>
                    <th className="py-3 px-3">Specialization</th>
                    <th className="py-3 px-3">Stories</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Last Active</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredReporters.map((reporter) => (
                    <tr key={reporter.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedReporters.includes(reporter.id)}
                          onChange={() => toggleSelect(reporter.id)}
                          className="rounded border-slate-300 text-[#eb1c24]"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img src={reporter.avatar} alt={reporter.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-extrabold text-slate-900 text-xs leading-tight group-hover:text-[#eb1c24] transition-colors">{reporter.name}</h4>
                              {reporter.badge && (
                                <span className="bg-purple-100 text-purple-700 text-[9px] font-black px-1.5 py-0.2 rounded">
                                  {reporter.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">ID: {reporter.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          <span className="truncate max-w-[130px]">{reporter.location}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${reporter.specBg}`}>
                          {reporter.specialization}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-mono font-black text-slate-900 text-xs">
                        {reporter.stories}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider ${
                            reporter.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : reporter.status === 'On Assignment'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {reporter.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                        {reporter.lastActive}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => showToast(`রিপোর্টার ${reporter.name}-এর প্রোফাইল খোলা হলো!`)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="View Profile"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => showToast(`রিপোর্টার ${reporter.name}-এর তথ্য এডিট করুন!`)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Reporter"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Options"
                          >
                            <MoreVertical size={14} />
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
              <span>Showing 1 to {filteredReporters.length} of 18 reporters</span>

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

          {/* 1. Reporter Overview Donut Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Reporter Overview
            </h3>

            <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#22c55e" strokeWidth="18" strokeDasharray="198 238" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="18" strokeDasharray="79 238" strokeDashoffset="-198" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#94a3b8" strokeWidth="18" strokeDasharray="40 238" strokeDashoffset="-277" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-slate-900 leading-tight">18</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Active</span>
                </div>
                <span className="font-mono font-bold text-slate-900">15 <span className="text-slate-400 font-normal text-[10px]">(83%)</span></span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>On Assignment</span>
                </div>
                <span className="font-mono font-bold text-slate-900">6 <span className="text-slate-400 font-normal text-[10px]">(33%)</span></span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>Inactive</span>
                </div>
                <span className="font-mono font-bold text-slate-900">3 <span className="text-slate-400 font-normal text-[10px]">(17%)</span></span>
              </div>
            </div>
          </div>

          {/* 2. Top Locations Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <MapPin size={16} className="text-purple-600" />
                <span>Top Locations</span>
              </h3>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-700">
              {[
                { name: 'Dhaka', count: 6 },
                { name: 'Chattogram', count: 3 },
                { name: 'Sylhet', count: 2 },
                { name: 'Rajshahi', count: 2 },
                { name: 'Others', count: 5 },
              ].map((loc, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                  <span className="font-bold text-slate-800">{loc.name}</span>
                  <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{loc.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Recent Activities Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Recent Activities
            </h3>

            <div className="space-y-2.5 text-xs font-semibold text-slate-700">
              {[
                { text: 'Arif Hossain filed a new story', time: '10:30 AM' },
                { text: 'Nusrat Jahan went on assignment', time: '09:15 AM' },
                { text: 'Rifat Hasan uploaded 2 photos', time: 'Yesterday' },
                { text: 'Mahmudul Hasan filed a new story', time: 'Yesterday' },
              ].map((act, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] py-1 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2 truncate">
                    <Users size={13} className="text-slate-400 shrink-0" />
                    <span className="font-bold text-slate-800 truncate">{act.text}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold shrink-0 ml-2">{act.time}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast('সকল অ্যাটিভিটি লগ খোলা হলো!')}
              className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold rounded-xl transition-colors cursor-pointer text-xs flex items-center justify-center gap-1 mt-2"
            >
              <span>View All Activities</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4. Quick Actions Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Quick Actions
            </h3>

            <div className="space-y-2 text-xs font-bold text-slate-700">
              <Link
                to="/reporters/create"
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer block"
              >
                <div className="flex items-center gap-2">
                  <UserPlus size={15} className="text-purple-600" />
                  <span>Add New Reporter</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </Link>

              <button
                onClick={() => showToast('অ্যালাইনমেন্ট অ্যাসাইনমেন্ট প্যানেল খোলা হলো!')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Briefcase size={15} className="text-purple-600" />
                  <span>Assign Reporter to Story</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>

              <button
                onClick={() => showToast('পারফরম্যান্স রিপোর্ট জেনারেট করা হলো!')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BarChart2 size={15} className="text-purple-600" />
                  <span>View Performance Report</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>

              <button
                onClick={() => showToast('রিপোর্টার উপস্থিতির প্যানেল খোলা হলো!')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-purple-600" />
                  <span>Reporter Attendance</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
