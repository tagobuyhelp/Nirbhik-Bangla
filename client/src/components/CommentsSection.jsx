'use client';

import { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Bold, 
  Italic, 
  Smile, 
  Image as ImageIcon, 
  List, 
  ShieldCheck, 
  ThumbsUp, 
  ThumbsDown, 
  MoreVertical, 
  Heart,
  ArrowRight,
  ShieldAlert,
  Reply,
  Share2,
  Flag,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

export default function CommentsSection({ articleId, locale = 'bn' }) {
  const [commentText, setCommentText] = useState('');

  // Dummy Comments Data
  const comments = [
    {
      id: 1,
      name: 'অভিজিৎ সেন',
      avatar: '/images/avatars/1.jpg',
      badge: 'Top Contributor',
      verified: true,
      time: '2 minutes ago',
      content: 'অন্নপূর্ণা প্রকল্পের মাধ্যমে সত্যিই অনেক গরিব পরিবার উপকৃত হবে। সরকারের এই পদক্ষেপকে সাধুবাদ জানাই।',
      likes: 24,
      replies: 2,
    },
    {
      id: 2,
      name: 'মৌসুমি দত্ত',
      avatar: '/images/avatars/2.jpg',
      badge: null,
      verified: false,
      time: '10 minutes ago',
      content: 'এই প্রকল্পে কারা কারা যোগ্য হবেন সে বিষয়ে আরও বিস্তারিত জানালে ভালো হতো।',
      likes: 15,
      replies: 0,
    },
    {
      id: 3,
      name: 'সৌরভ মুখার্জি',
      avatar: '/images/avatars/3.jpg',
      badge: null,
      verified: false,
      time: '25 minutes ago',
      content: 'রাজনৈতিক প্রচারের বদলে যদি সত্যিই কাজ হয়, তাহলে মানুষ উপকৃত হবে। দেখা যাক কতটা বাস্তবায়ন হয়।',
      likes: 9,
      replies: 0,
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Main Comments Area (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-outfit">
                Comments (128)
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">আপনার মতামত আমাদের জন্য গুরুত্বপূর্ণ</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-bold text-slate-700 cursor-pointer shadow-sm hover:bg-slate-50 transition-colors">
                <span>Sort by: Newest</span>
                <ChevronDown size={16} className="text-slate-400" />
              </div>
              <button className="flex items-center gap-1.5 bg-white border border-[#eb1c24] text-[#eb1c24] hover:bg-red-50 transition-colors px-3 py-2 rounded-lg text-sm font-bold shadow-sm">
                <Bell size={16} />
                <span className="hidden sm:inline">Notify me</span>
              </button>
            </div>
          </div>

          {/* Comment Input Box */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex gap-3 p-4">
            <div className="shrink-0 pt-1">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 overflow-hidden shadow-sm border border-slate-300/50">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-100 transition-all bg-slate-50/50">
                <textarea
                  className="w-full bg-transparent p-3 text-sm font-medium text-slate-800 placeholder-slate-400 resize-none outline-none min-h-[100px]"
                  placeholder="আপনার মতামত লিখুন..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  maxLength={1000}
                ></textarea>
                
                <div className="flex items-center justify-between p-2 border-t border-slate-200/60 bg-white">
                  <div className="flex items-center gap-1 text-slate-400">
                    <button className="p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-600 transition-colors"><Bold size={16} /></button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-600 transition-colors"><Italic size={16} /></button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-600 transition-colors"><Smile size={16} /></button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-600 transition-colors"><ImageIcon size={16} /></button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-600 transition-colors font-bold text-[10px]">GIF</button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-600 transition-colors"><List size={16} /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400">{commentText.length}/1000</span>
                    <button className="bg-[#e45055] hover:bg-[#d73f44] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-colors">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-2.5 text-[10px] font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg w-fit border border-slate-100">
                <ShieldCheck size={14} className="text-[#3b82f6]" />
                দয়া করে ভদ্র ভাষা ব্যবহার করুন। আপত্তিকর মন্তব্য মুছে দেওয়া হতে পারে।
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white border border-slate-200/70 p-4.5 rounded-2xl shadow-xs transition-colors hover:border-slate-300/80">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-200">
                      {/* Avatar Placeholder for now */}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-slate-400"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{comment.name}</h4>
                        {comment.badge && (
                          <span className="bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border border-red-100/50">
                            {comment.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 block mt-0.5">{comment.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {comment.verified && (
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-200/50 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    )}
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                <div className="pl-13 mt-1 space-y-3">
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">
                    {comment.content}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 hover:text-[#eb1c24] transition-colors"><ThumbsUp size={16} /> {comment.likes}</button>
                      <button className="flex items-center gap-1 hover:text-slate-700 transition-colors"><ThumbsDown size={16} /></button>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <button className="hover:text-slate-700 transition-colors">Reply</button>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <button className="hover:text-slate-700 transition-colors">Share</button>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <button className="hover:text-slate-700 transition-colors">Report</button>
                  </div>

                  {comment.replies > 0 && (
                    <div className="mt-2">
                      <button className="text-[#eb1c24] font-bold text-xs flex items-center gap-1.5 hover:underline">
                        <svg className="w-3 h-3 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                        {comment.replies} Replies
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-white border border-slate-200/80 text-slate-600 font-bold text-sm py-3 rounded-xl shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2">
            Load more comments <ChevronDown size={16} />
          </button>
        </div>

        {/* Right Column - Sidebars (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Comment Guidelines Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck size={18} className="text-slate-700" />
              <h3 className="font-extrabold text-sm text-slate-900">Comment Guidelines</h3>
            </div>
            <div className="p-4 bg-orange-50/40">
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] font-bold text-slate-600 leading-snug">সকলের মতামতকে সম্মান করুন</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] font-bold text-slate-600 leading-snug">আপত্তিকর বা বিদ্বেষমূলক মন্তব্য করবেন না</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] font-bold text-slate-600 leading-snug">ব্যক্তিগত আক্রমণ থেকে বিরত থাকুন</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] font-bold text-slate-600 leading-snug">ভুল তথ্য বা গুজব ছড়াবেন না</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] font-bold text-slate-600 leading-snug">নিয়ম ভঙ্গ করলে মন্তব্য মুছে দেওয়া হতে পারে</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Most Liked Comments Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-2">
              <Heart size={18} className="text-[#eb1c24] fill-[#eb1c24]" />
              <h3 className="font-extrabold text-sm text-slate-900">Most Liked Comments</h3>
            </div>
            <div className="p-1 divide-y divide-slate-100">
              {/* Liked Comment Item */}
              <div className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-200 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-slate-400"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <h5 className="font-bold text-xs text-slate-900">অভিজিৎ সেন</h5>
                      <div className="flex items-center gap-1 text-[10px] font-bold bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-slate-600">
                        <ThumbsUp size={10} /> 24
                      </div>
                    </div>
                    <span className="text-[9px] font-medium text-slate-400 block mb-1">2 minutes ago</span>
                    <p className="text-[11px] font-medium text-slate-600 leading-snug line-clamp-2">
                      অন্নপূর্ণা প্রকল্পের মাধ্যমে সত্যিই অনেক গরিব পরিবার উপকৃত হবে...
                    </p>
                  </div>
                </div>
              </div>

              {/* Liked Comment Item 2 */}
              <div className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-200 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-slate-400"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <h5 className="font-bold text-xs text-slate-900">মৌসুমি দত্ত</h5>
                      <div className="flex items-center gap-1 text-[10px] font-bold bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-slate-600">
                        <ThumbsUp size={10} /> 15
                      </div>
                    </div>
                    <span className="text-[9px] font-medium text-slate-400 block mb-1">10 minutes ago</span>
                    <p className="text-[11px] font-medium text-slate-600 leading-snug line-clamp-2">
                      এই প্রকল্পে কারা কারা যোগ্য হবেন সে বিষয়ে...
                    </p>
                  </div>
                </div>
              </div>

              {/* Liked Comment Item 3 */}
              <div className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-200 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-slate-400"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <h5 className="font-bold text-xs text-slate-900">সৌরভ মুখার্জি</h5>
                      <div className="flex items-center gap-1 text-[10px] font-bold bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-slate-600">
                        <ThumbsUp size={10} /> 9
                      </div>
                    </div>
                    <span className="text-[9px] font-medium text-slate-400 block mb-1">25 minutes ago</span>
                    <p className="text-[11px] font-medium text-slate-600 leading-snug line-clamp-2">
                      রাজনৈতিক প্রচারের বদলে যদি সত্যিই কাজ হয়...
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full p-3 bg-slate-50 hover:bg-slate-100 text-[11px] font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 border-t border-slate-100">
              View all comments <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
