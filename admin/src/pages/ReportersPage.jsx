import { useState } from 'react';
import {
  Users,
  UserCheck,
  Award,
  FileText,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  CheckCircle2,
  MoreVertical,
  Pencil,
  Eye,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export default function ReportersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const reportersList = [
    {
      id: 1,
      name: 'আরিফ হোসেন',
      role: 'Senior Reporter',
      dept: 'রাজনীতি ও অপরাধ',
      email: 'arif.hossain@nirbhikbangla.com',
      phone: '+880 1711-223344',
      articles: 342,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 2,
      name: 'শামীমা আক্তার',
      role: 'Staff Reporter',
      dept: 'অর্থনীতি ও বাণিজ্য',
      email: 'shamima.akter@nirbhikbangla.com',
      phone: '+880 1812-334455',
      articles: 215,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 3,
      name: 'মেহেদী রহমান',
      role: 'Foreign Correspondent',
      dept: 'আন্তর্জাতিক বার্তা',
      email: 'mehedi.rahman@nirbhikbangla.com',
      phone: '+880 1913-445566',
      articles: 189,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 4,
      name: 'তারেক আজিজ',
      role: 'Sports Editor',
      dept: 'খেলাধুলো',
      email: 'tarik.aziz@nirbhikbangla.com',
      phone: '+880 1614-556677',
      articles: 298,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 5,
      name: 'নাসরিন সুলতানা',
      role: 'Sub Editor',
      dept: 'শিক্ষা ও তথ্যপ্রযুক্তি',
      email: 'nasrin.sultana@nirbhikbangla.com',
      phone: '+880 1515-667788',
      articles: 142,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    },
  ];

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-10">

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
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
            Reporters & Editorial Team
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Manage journalists, news desk assignments, and editorial staff accounts.
          </p>
        </div>

        <button
          onClick={() => showToast('নতুন রিপোর্টার যোগ করার ফর্ম ওপেন করা হলো!')}
          className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer font-outfit uppercase tracking-wider self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Reporter</span>
        </button>
      </div>

      {/* 2. Top 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Reporters</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">48</h3>
            <span className="text-[9.5px] font-bold text-slate-400">Editorial Staff</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Users size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active Today</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">36</h3>
            <span className="text-[9.5px] font-bold text-emerald-600">75% on desk</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <UserCheck size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Articles Written</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">1,186</h3>
            <span className="text-[9.5px] font-bold text-slate-400">This month</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <FileText size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Top Performer</p>
            <h3 className="text-sm font-black text-slate-900 mt-0.5 font-bangla">আরিফ হোসেন</h3>
            <span className="text-[9.5px] font-bold text-purple-600">342 Articles</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Award size={18} />
          </div>
        </div>
      </div>

      {/* 3. Reporters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportersList.map((reporter) => (
          <div key={reporter.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3.5 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <img src={reporter.avatar} alt={reporter.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shrink-0" />
              <div>
                <h4 className="font-bangla font-black text-slate-900 text-base leading-tight">{reporter.name}</h4>
                <span className="text-xs font-extrabold text-purple-700 block">{reporter.role}</span>
                <span className="text-[10px] font-bold text-slate-400 font-bangla">{reporter.dept}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-slate-400" />
                <span className="font-mono text-slate-800 text-[11px] truncate">{reporter.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-slate-400" />
                <span className="font-mono text-slate-800 text-[11px]">{reporter.phone}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Total Published: <strong className="font-mono text-slate-900">{reporter.articles}</strong></span>
              <button
                onClick={() => showToast(`রিপোর্টার ${reporter.name}-এর প্রোফাইল খোলা হলো`)}
                className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold rounded-lg transition-colors cursor-pointer"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
