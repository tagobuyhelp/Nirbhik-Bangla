import { useState, useEffect } from 'react';
import { Mail, Search, Trash2, Download, RefreshCw, CheckCircle2, Globe } from 'lucide-react';
import { API_BASE_URL } from '../utils/api';

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSubscribers = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/public/subscribers`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setSubscribers(data.data);
        }
      })
      .catch((err) => console.error('Fetch subscribers error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to remove this subscriber?')) return;
    fetch(`${API_BASE_URL}/public/subscribers/${id}`, { method: 'DELETE' })
      .then(() => {
        setSubscribers(subscribers.filter((s) => s._id !== id));
      })
      .catch((err) => console.error('Delete subscriber error:', err));
  };

  const exportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + ['Email,Source,SubscribedAt', ...subscribers.map((s) => `${s.email},${s.source || 'website'},${s.createdAt}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'nirbhik_bangla_subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = subscribers.filter((s) =>
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-400 font-extrabold text-xs uppercase tracking-wider">
            <Mail size={18} />
            <span>Newsletter Audience</span>
          </div>
          <h1 className="text-2xl font-black">Newsletter Subscribers ({subscribers.length})</h1>
          <p className="text-xs text-slate-300">Manage all reader emails subscribed to daily news bulletins and breaking alerts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchSubscribers}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        
        {/* Search */}
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subscriber email..."
              className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#eb1c24]"
            />
          </div>
          <span className="text-xs font-bold text-slate-400">Total: {filtered.length} active readers</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 font-extrabold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Subscribed Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-bold">Loading subscribers list...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-bold">No subscribers found.</td>
                </tr>
              ) : (
                filtered.map((sub, i) => (
                  <tr key={sub._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-slate-400 font-mono">{i + 1}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <Mail size={14} className="text-[#eb1c24]" />
                      <span>{sub.email}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold">
                        {sub.source || 'website'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 size={10} /> Active
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove subscriber"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
