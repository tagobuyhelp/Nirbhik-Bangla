import { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Trash2,
  Mail,
  Phone,
  Calendar,
  User,
  CheckCircle2,
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { API_BASE_URL } from '../utils/api';

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/public/contact-messages`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setMessages(data.data);
          if (data.data.length > 0 && !selectedMessage) {
            setSelectedMessage(data.data[0]);
          }
        }
      })
      .catch((err) => console.error('Fetch contact messages error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    fetch(`${API_BASE_URL}/public/contact-messages/${id}`, { method: 'DELETE' })
      .then(() => {
        setMessages(messages.filter((m) => m._id !== id));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      })
      .catch((err) => console.error('Delete message error:', err));
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-400 font-extrabold text-xs uppercase tracking-wider">
            <Inbox size={18} />
            <span>Inquiries & Messages</span>
          </div>
          <h1 className="text-2xl font-black">Contact Form Messages ({messages.length})</h1>
          <p className="text-xs text-slate-300">View and respond to news tips, inquiries, and messages sent by readers via the Contact Page.</p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Grid: Messages List (Left) + Message Detail View (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Search & Inbox List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sender, email, subject..."
              className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#eb1c24]"
            />
          </div>

          {/* List */}
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500 font-bold">Loading messages...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 font-medium">No messages found.</div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredMessages.map((msg) => {
                const isSelected = selectedMessage && selectedMessage._id === msg._id;
                const formattedDate = new Date(msg.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={msg._id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-red-50/70 border-red-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-extrabold text-xs text-slate-900 truncate">{msg.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{formattedDate}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 truncate">{msg.subject}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{msg.message}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Selected Message Reader */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          {selectedMessage ? (
            <div className="space-y-6">
              
              {/* Reader Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <span className="bg-red-50 text-[#eb1c24] border border-red-200 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    Contact Message
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-1">{selectedMessage.subject}</h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete message"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Sender Info Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-slate-400 shrink-0" />
                  <span className="font-bold text-slate-900">Sender Name:</span>
                  <span className="text-slate-700 font-medium">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#eb1c24] shrink-0" />
                  <span className="font-bold text-slate-900">Email:</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 font-medium hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-emerald-600 shrink-0" />
                    <span className="font-bold text-slate-900">Phone:</span>
                    <a href={`tel:${selectedMessage.phone}`} className="text-slate-700 font-medium hover:underline">
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Message Body */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">Message Content</h3>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-colors"
                >
                  <Mail size={14} />
                  <span>Reply via Email</span>
                </a>
              </div>

            </div>
          ) : (
            <div className="py-24 text-center space-y-2 text-slate-400">
              <MessageSquare size={36} className="mx-auto text-slate-300" />
              <p className="text-xs font-bold">Select a message from the inbox list to read details.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
