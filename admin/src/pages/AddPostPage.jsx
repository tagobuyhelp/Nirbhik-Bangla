import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Save,
  Eye,
  Rocket,
  Sparkles,
  Wand2,
  Check,
  RotateCw,
  Plus,
  ChevronDown,
  Link as LinkIcon,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
  Video,
  Table as TableIcon,
  Code,
  Undo,
  Redo,
  Clock,
  Share2,
  Globe2,
  CheckCircle2,
  FileText,
  Tag,
  FolderTree,
  Send,
  PenTool,
  Heading,
  Maximize2,
  Minimize2,
  Languages,
  SearchCheck,
  ShieldCheck,
  Bot,
  MessageCircle,
  X,
  Upload,
  Calendar,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function AddPostPage() {
  const navigate = useNavigate();

  // 1. Form Core States
  const [title, setTitle] = useState('ভারত-ইংল্যান্ড টেস্ট সিরিজ: দ্বিতীয় টেস্ট ভারতের ঐতিহাসিক জয়');
  const [slug, setSlug] = useState('bharat-england-test-series-2nd-test-india-historic-win');
  const [excerpt, setExcerpt] = useState('দ্বিতীয় টেস্ট অসাধারণ পারফরম্যান্সের মাধ্যমে ইংল্যান্ডকে ২৮০ রানে হারিয়ে সিরিজে ২-০ ব্যবধানে এগিয়ে গেল ভারত।');
  const [seoTitle, setSeoTitle] = useState('ভারত-ইংল্যান্ড দ্বিতীয় টেস্ট: ২৮০ রানে জয় পেয়ে সিরিজে ২-০ তে ভারত এগিয়ে');
  const [metaDescription, setMetaDescription] = useState('দ্বিতীয় টেস্টে রোহিত শর্মা ও যশস্বী জয়সওয়ালের দূরন্ত ব্যাটিংয়ে ইংল্যান্ডকে ২৮০ রানে হারিয়ে সিরিজ ২-০ তে এগিয়ে টিম ইন্ডিয়া।');
  const [focusKeywords, setFocusKeywords] = useState(['india vs england', '2nd test', 'india win', 'test series', 'rohit sharma']);
  
  // 2. Categories & Tags States
  const [categoryList, setCategoryList] = useState(['ক্রিকেট', 'আন্তর্জাতিক', 'খেলা', 'রাজনীতি', 'বিনোদন', 'অন্যান্য']);
  const [selectedCategories, setSelectedCategories] = useState(['ক্রিকেট', 'আন্তর্জাতিক']);
  const [tags, setTags] = useState(['ভারত', 'ইংল্যান্ড', 'টেস্ট সিরিজ', 'রোহিত শর্মা', 'যশস্বী জয়সওয়াল', 'ক্রিকেট']);
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');

  // 3. Publish & Social Options States
  const [publishOptions, setPublishOptions] = useState({
    immediately: true,
    allowComments: true,
    showHomepage: true,
    featured: false,
    breaking: false,
  });
  const [scheduleDate, setScheduleDate] = useState('2024-05-21');
  const [scheduleTime, setScheduleTime] = useState('10:30');
  const [socialShares, setSocialShares] = useState({
    subscribers: true,
    pushNotification: true,
    facebook: true,
    twitter: true,
  });

  // 4. Social Media Captions State
  const [socialCaptions, setSocialCaptions] = useState({
    facebook: 'দ্বিতীয় টেস্ট ভারতের ঐতিহাসিক জয়...',
    twitter: 'INDIA WIN! Historic 280-run victory in 2nd test...',
    whatsapp: 'ভারত-ইংল্যান্ড দ্বিতীয় টেস্টে ২৮০ রানে বিশাল জয়...',
    telegram: 'ভারতের মারকুটে জয় সিরিজে ২-০ এগিয়ে টিম ইন্ডিয়া...',
  });
  const [editingCaptions, setEditingCaptions] = useState(false);

  // 5. Featured Image State
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80');
  const [altText, setAltText] = useState('ভারতীয় ক্রিকেট দল জয়ের পর উদযাপন করছে');
  const [caption, setCaption] = useState('দ্বিতীয় টেস্ট জয়ের পর ভারতীয় দলের উদযাপন');
  const [credit, setCredit] = useState('Nirbhik Bangla | Image: BCCI');

  // 6. Toast & Modal Feedback States
  const [toastMessage, setToastMessage] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // 7. Editor Interactive State
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(352);
  const [charCount, setCharCount] = useState(2145);
  const [readingTime, setReadingTime] = useState(4);
  const [activeHeading, setActiveHeading] = useState('p');

  // Show Toast Feedback Message
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Editor Input Listener
  const handleEditorInput = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const chars = text.length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const minutes = Math.max(1, Math.ceil(words / 150));
      setCharCount(chars);
      setWordCount(words);
      setReadingTime(minutes);
    }
  };

  // Execute Formatting Commands
  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Generate AI Title
  const handleAiGenerateTitle = () => {
    const titles = [
      'দ্বিতীয় টেস্টে ভারতের মারকুটে জয়: ২৮০ রানে হারল ইংল্যান্ড',
      'ইংল্যান্ডকে উড়িয়ে ২-০ তে সিরিজে এগিয়ে গেল রোহিত বাহিনী',
      'যশস্বী ও রোহিতের দুর্দান্ত ব্যাটিংয়ে ভারতে এল ঐতিহাসিক টেস্ট জয়',
    ];
    const newTitle = titles[Math.floor(Math.random() * titles.length)];
    setTitle(newTitle);
    handleAiOptimizeSlug(newTitle);
    showToast('AI Generate Title: নতুন আকর্ষণীয় টাইটেল তৈরি হয়েছে!');
  };

  // Auto Generate / Optimize Slug
  const handleAiOptimizeSlug = (customTitle = null) => {
    const targetTitle = customTitle || title;
    const cleanSlug = targetTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 70);
    setSlug(cleanSlug || 'bharat-england-test-series-historic-win');
    showToast('AI Optimize Slug: এসইও ফ্রেন্ডলি ইউআরএল স্ল্যাগ তৈরি হয়েছে!');
  };

  // Add / Remove Category
  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleAddNewCategory = () => {
    if (newCatInput.trim() && !categoryList.includes(newCatInput.trim())) {
      const added = newCatInput.trim();
      setCategoryList([...categoryList, added]);
      setSelectedCategories([...selectedCategories, added]);
      setNewCatInput('');
      setShowAddCatModal(false);
      showToast(`নতুন ক্যাটাগরি "${added}" যুক্ত হয়েছে!`);
    }
  };

  // Add / Remove Tags
  const addTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
      showToast('নতুন ট্যাগ যুক্ত করা হয়েছে!');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Apply AI Suggestion directly into form
  const applyAiSuggestion = (type, val) => {
    if (type === 'excerpt') setExcerpt(val);
    if (type === 'seoTitle') setSeoTitle(val);
    if (type === 'metaDescription') setMetaDescription(val);
    showToast(`AI ${type} সফলভাবে পোস্টে যুক্ত করা হয়েছে!`);
  };

  // Handle Image Change
  const handleFeaturedImageChange = () => {
    const url = prompt('নতুন ফিচার্ড ইমেজের URL দিন:', featuredImage);
    if (url) {
      setFeaturedImage(url);
      showToast('ফিচার্ড ইমেজ পরিবর্তন করা হয়েছে!');
    }
  };

  // AI Regenerate Image Details
  const handleAiRegenerateImageDetails = () => {
    setAltText('ভারতীয় টেস্ট দলের ঐতিহাসিক জয়ের স্মরণীয় মুহূর্ত');
    setCaption('২৮০ রানে জয় পাওয়ার পর মাঠে ভারতীয় ক্রিকেট দলের সেলিব্রেশন');
    setCredit('Nirbhik Bangla Sports Desk | Photo Credit: BCCI');
    showToast('AI ইমেজের ক্যাপশন ও অল্ট টেক্সট তৈরি করেছে!');
  };

  // Publish Post Function
  const handlePublishPost = () => {
    if (!title.trim()) {
      alert('অনুগ্রহ করে পোস্টের টাইটেল প্রদান করুন!');
      return;
    }
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert('🎉 পোস্টটি সফলভাবে প্রকাশ (Publish) করা হয়েছে!');
      navigate('/posts');
    }, 800);
  };

  // Calculate SEO Score dynamically
  const calcSeoScore = () => {
    let score = 50;
    if (title.length > 20) score += 15;
    if (metaDescription.length > 20) score += 15;
    if (focusKeywords.length > 0) score += 10;
    if (featuredImage) score += 10;
    return Math.min(100, score);
  };

  return (
    <div className="space-y-5 text-slate-800 font-sans relative">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar inside Add Post */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
        {/* Breadcrumb + Status */}
        <div className="flex items-center gap-3 flex-wrap">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <NavLink to="/" className="hover:text-[#eb1c24] transition-colors">Dashboard</NavLink>
            <span>›</span>
            <NavLink to="/posts" className="hover:text-[#eb1c24] transition-colors">Posts</NavLink>
            <span>›</span>
            <span className="text-slate-900 font-bold">Add New Post</span>
          </nav>

          <span className="h-3.5 w-px bg-slate-300 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
            <CheckCircle2 size={15} />
            <span>Draft saved 2 minutes ago</span>
          </div>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => showToast('খসড়া (Draft) সফলভাবে সংরক্ষণ করা হয়েছে!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Save size={15} className="text-slate-500" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => setShowPreviewModal(true)}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Eye size={15} className="text-slate-500" />
            <span>Preview</span>
          </button>

          <div className="relative">
            <button
              onClick={handlePublishPost}
              disabled={isPublishing}
              className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <Rocket size={15} />
              <span>{isPublishing ? 'PUBLISHING...' : 'PUBLISH'}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

        {/* ================= COLUMN 1: MAIN FORM EDITOR (~50% - xl:col-span-6) ================= */}
        <div className="xl:col-span-6 space-y-5">

          {/* Title & Subtitle Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Add New Post</h1>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Create engaging content with the power of AI.
              </p>
            </div>

            {/* Title Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Title <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter news title..."
                    className="w-full h-10 px-3.5 pr-14 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all font-bangla"
                  />
                  <span className="absolute right-3 top-3 text-[10px] font-bold text-slate-400">
                    {title.length}/100
                  </span>
                </div>
                <button
                  onClick={handleAiGenerateTitle}
                  className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
                >
                  <Sparkles size={14} />
                  <span>AI Generate Title</span>
                </button>
              </div>
            </div>

            {/* Slug Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Slug</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 h-10 px-3.5 text-xs font-mono font-medium text-slate-700 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all"
                />
                <button
                  onClick={() => handleAiOptimizeSlug()}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
                >
                  <Wand2 size={14} />
                  <span>AI Optimize Slug</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://nirbhikbangla.com/news/${slug}`);
                    showToast('লিংক কপি করা হয়েছে!');
                  }}
                  className="p-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Copy News Link"
                >
                  <LinkIcon size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Rich Text Editor Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            {/* AI Tools Toolbar Header (Solid Slate Dark Toolbar) */}
            <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2 flex items-center gap-3 overflow-x-auto scrollbar-none text-xs font-extrabold">
              <span className="flex items-center gap-1.5 text-white bg-[#eb1c24] px-2.5 py-0.5 rounded-md shrink-0 shadow-xs">
                <Sparkles size={13} />
                AI Tools
              </span>
              <button onClick={() => { execCmd('insertHTML', '<p className="font-bangla">নতুন এআই অনুচ্ছেদ যুক্ত হলো...</p>'); showToast('AI Auto-Write: নতুন অনুচ্ছেদ লেখা হলো!'); }} className="hover:text-red-400 shrink-0 flex items-center gap-1 cursor-pointer">
                <PenTool size={13} /> Write
              </button>
              <button onClick={() => { execCmd('insertHTML', '<h3 className="font-bangla text-base font-extrabold pt-2">নতুন এআই সাব-হেডিং</h3>'); showToast('AI Headline যুক্ত করা হলো!'); }} className="hover:text-red-400 shrink-0 flex items-center gap-1 cursor-pointer">
                <Heading size={13} /> Headlines
              </button>
              <button onClick={() => showToast('AI Rewrite: লেখাটিকে মার্জিত রূপ প্রদান করা হলো!')} className="hover:text-red-400 shrink-0 flex items-center gap-1 cursor-pointer">
                <RotateCw size={13} /> Rewrite
              </button>
              <button onClick={() => showToast('AI Expand: কন্টেন্ট সংবর্ধিত করা হলো!')} className="hover:text-red-400 shrink-0 flex items-center gap-1 cursor-pointer">
                <Maximize2 size={13} /> Expand
              </button>
              <button onClick={() => showToast('AI Shorten: কন্টেন্ট সংক্ষেপ করা হলো!')} className="hover:text-red-400 shrink-0 flex items-center gap-1 cursor-pointer">
                <Minimize2 size={13} /> Shorten
              </button>
              <button onClick={() => showToast('AI Translate: খবরটি ইংরেজিতে রূপান্তর করা হলো!')} className="hover:text-red-400 shrink-0 flex items-center gap-1 cursor-pointer">
                <Languages size={13} /> Translate
              </button>
              <button onClick={() => showToast('AI SEO Optimization: কিউওয়ার্ড অপটিমাইজ করা হলো!')} className="hover:text-red-400 shrink-0 flex items-center gap-1 cursor-pointer">
                <SearchCheck size={13} /> SEO
              </button>
              <button onClick={() => showToast('AI Fact Check: কোনো অসত্য তথ্য পাওয়া যায়নি (Verified)!')} className="hover:text-red-400 shrink-0 flex items-center gap-1 cursor-pointer">
                <ShieldCheck size={13} /> Fact Check
              </button>
            </div>

            {/* Standard Editor Formatting Toolbar */}
            <div className="border-b border-slate-200 px-3 py-2 flex items-center gap-1 flex-wrap bg-slate-50/50 text-slate-600 text-xs">
              <select
                value={activeHeading}
                onChange={(e) => {
                  setActiveHeading(e.target.value);
                  execCmd('formatBlock', e.target.value);
                }}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
              </select>
              <div className="h-4 w-px bg-slate-300 mx-1" />
              <button onClick={() => execCmd('bold')} className="p-1.5 hover:bg-slate-200 rounded font-black cursor-pointer" title="Bold"><Bold size={15} /></button>
              <button onClick={() => execCmd('italic')} className="p-1.5 hover:bg-slate-200 rounded italic cursor-pointer" title="Italic"><Italic size={15} /></button>
              <button onClick={() => execCmd('underline')} className="p-1.5 hover:bg-slate-200 rounded underline cursor-pointer" title="Underline"><Underline size={15} /></button>
              <button onClick={() => execCmd('strikeThrough')} className="p-1.5 hover:bg-slate-200 rounded line-through cursor-pointer" title="Strikethrough"><Strikethrough size={15} /></button>
              <button onClick={() => execCmd('formatBlock', 'blockquote')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Quote"><Quote size={15} /></button>
              <div className="h-4 w-px bg-slate-300 mx-1" />
              <button onClick={() => execCmd('insertUnorderedList')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Bullet List"><List size={15} /></button>
              <button onClick={() => execCmd('insertOrderedList')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Numbered List"><ListOrdered size={15} /></button>
              <div className="h-4 w-px bg-slate-300 mx-1" />
              <button onClick={() => execCmd('justifyLeft')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Align Left"><AlignLeft size={15} /></button>
              <button onClick={() => execCmd('justifyCenter')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Align Center"><AlignCenter size={15} /></button>
              <button onClick={() => execCmd('justifyRight')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Align Right"><AlignRight size={15} /></button>
              <button onClick={() => execCmd('justifyFull')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Justify"><AlignJustify size={15} /></button>
              <div className="h-4 w-px bg-slate-300 mx-1" />
              <button onClick={() => { const url = prompt('ইউআরএল লিংক প্রদান করুন:'); if (url) execCmd('createLink', url); }} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Insert Link"><LinkIcon size={15} /></button>
              <button onClick={() => { const url = prompt('ইমেজ ইউআরএল লিংক প্রদান করুন:'); if (url) execCmd('insertImage', url); }} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Insert Image"><ImageIcon size={15} /></button>
              <button onClick={() => execCmd('undo')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Undo"><Undo size={15} /></button>
              <button onClick={() => execCmd('redo')} className="p-1.5 hover:bg-slate-200 rounded cursor-pointer" title="Redo"><Redo size={15} /></button>
            </div>

            {/* Original Interactive WYSIWYG Editor Canvas */}
            <div className="editor-content p-5 text-sm leading-relaxed text-slate-800 font-bangla min-h-[320px]">
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                className="outline-none min-h-[300px] space-y-4"
                suppressContentEditableWarning
              >
                <p>
                  দ্বিতীয় টেস্ট অসাধারণ পারফরম্যান্সের মাধ্যমে ইংল্যান্ডকে ২৮০ রানে হারিয়ে সিরিজে ২-০ ব্যবধানে এগিয়ে গেল ভারত। দলের হয়ে <strong className="text-[#eb1c24]">রোহিত শর্মা</strong> ও <strong className="text-[#eb1c24]">যশস্বী জয়সওয়াল</strong> ব্যাট হাতে দুর্দান্ত পারফরম্যান্স করেন।
                </p>

                <div className="my-3 rounded-xl overflow-hidden shadow-sm border border-slate-200 contenteditable-false select-none">
                  <img
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80"
                    alt="Match Celebration"
                    className="w-full h-64 object-cover"
                  />
                </div>

                <h3 className="text-base font-extrabold text-slate-900 pt-2 font-bangla">
                  ম্যাচের সংক্ষিপ্ত বিবরণ
                </h3>

                <p className="text-slate-600">
                  প্রথম ইনিংসে ভারত করে ৪৫০ রান। জবাবে ইংল্যান্ডের প্রথম ইনিংস থামে ২৮০ রানে। দ্বিতীয় ইনিংসে ভারত ২৩৮ রানে অলআউট হয় এবং ইংল্যান্ডের জয়ের জন্য প্রয়োজন ছিল ৪৮১ রান। কিন্তু শেষ পর্যন্ত ইংল্যান্ড করতে পারে মাত্র ২০০ রান।
                </p>
              </div>
            </div>

            {/* Editor Status Footer */}
            <div className="border-t border-slate-100 px-4 py-2.5 bg-slate-50/50 flex items-center justify-between text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-4">
                <span>Words: <strong>{wordCount}</strong></span>
                <span>Characters: <strong>{charCount}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 font-bold">
                <Clock size={14} className="text-slate-400" />
                <span>Reading Time: {readingTime} min</span>
              </div>
            </div>
          </div>

          {/* Bottom 4 Panels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Categories Panel */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-900">Categories</h4>
                <span className="text-[10px] font-extrabold text-white bg-[#eb1c24] px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                  <Sparkles size={11} /> AI Suggested
                </span>
              </div>
              <div className="space-y-2 text-xs font-semibold text-slate-700 font-bangla max-h-40 overflow-y-auto pr-1">
                {categoryList.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-slate-300 text-[#eb1c24] focus:ring-red-200"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>

              {/* Add New Category Dialog */}
              {showAddCatModal ? (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="ক্যাটাগরির নাম..."
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNewCategory()}
                    className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg font-bangla outline-none focus:border-[#eb1c24]"
                  />
                  <button onClick={handleAddNewCategory} className="px-2.5 py-1 bg-[#eb1c24] text-white text-xs font-bold rounded-lg cursor-pointer">
                    Save
                  </button>
                  <button onClick={() => setShowAddCatModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowAddCatModal(true)} className="text-xs font-extrabold text-[#eb1c24] hover:underline flex items-center gap-1 pt-1 cursor-pointer">
                  <Plus size={13} /> Add New Category
                </button>
              )}
            </div>

            {/* Tags Panel */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-900">Tags</h4>
                <span className="text-[10px] font-extrabold text-white bg-[#eb1c24] px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                  <Sparkles size={11} /> AI Generated
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 font-bangla">
                {tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="cursor-pointer text-slate-400 hover:text-red-600">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="New tag..."
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg font-bangla outline-none focus:border-[#eb1c24]"
                />
                <button onClick={addTag} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer">
                  Add
                </button>
              </div>
            </div>

            {/* Publish Options Panel */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900">Publish Options</h4>
              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Publish Immediately</span>
                  <input type="checkbox" checked={publishOptions.immediately} onChange={(e) => setPublishOptions({ ...publishOptions, immediately: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Allow Comments</span>
                  <input type="checkbox" checked={publishOptions.allowComments} onChange={(e) => setPublishOptions({ ...publishOptions, allowComments: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Show on Homepage</span>
                  <input type="checkbox" checked={publishOptions.showHomepage} onChange={(e) => setPublishOptions({ ...publishOptions, showHomepage: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Featured Post</span>
                  <input type="checkbox" checked={publishOptions.featured} onChange={(e) => setPublishOptions({ ...publishOptions, featured: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Breaking News</span>
                  <input type="checkbox" checked={publishOptions.breaking} onChange={(e) => setPublishOptions({ ...publishOptions, breaking: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                </label>
              </div>
            </div>

            {/* Social Media Panel */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-900">Social Media</h4>
                <span className="text-[10px] font-extrabold text-white bg-[#eb1c24] px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                  <Sparkles size={11} /> AI Generated
                </span>
              </div>

              {editingCaptions ? (
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    value={socialCaptions.facebook}
                    onChange={(e) => setSocialCaptions({ ...socialCaptions, facebook: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-200 rounded font-bangla text-xs"
                    placeholder="Facebook Caption..."
                  />
                  <input
                    type="text"
                    value={socialCaptions.twitter}
                    onChange={(e) => setSocialCaptions({ ...socialCaptions, twitter: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                    placeholder="Twitter Caption..."
                  />
                  <button onClick={() => { setEditingCaptions(false); showToast('সোশাল মিডিয়া ক্যাপশন সেভ হয়েছে!'); }} className="py-1 px-3 bg-[#eb1c24] text-white text-xs font-bold rounded cursor-pointer">
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-2 text-[11px] font-bangla">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 truncate flex items-center gap-1.5">
                    <Share2 size={13} className="text-blue-600 shrink-0" />
                    <span className="truncate"><strong>Facebook:</strong> {socialCaptions.facebook}</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 truncate flex items-center gap-1.5">
                    <Share2 size={13} className="text-slate-900 shrink-0" />
                    <span className="truncate"><strong>Twitter (X):</strong> {socialCaptions.twitter}</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 truncate flex items-center gap-1.5">
                    <MessageCircle size={13} className="text-emerald-600 shrink-0" />
                    <span className="truncate"><strong>WhatsApp:</strong> {socialCaptions.whatsapp}</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 truncate flex items-center gap-1.5">
                    <Send size={13} className="text-cyan-600 shrink-0" />
                    <span className="truncate"><strong>Telegram:</strong> {socialCaptions.telegram}</span>
                  </div>
                </div>
              )}

              <button onClick={() => setEditingCaptions(true)} className="text-xs font-bold text-[#eb1c24] hover:underline cursor-pointer">
                Edit All Captions
              </button>
            </div>

          </div>
        </div>

        {/* ================= COLUMN 2: AI GENERATED SUGGESTIONS (~25% - xl:col-span-3) ================= */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <Sparkles size={15} className="text-[#eb1c24]" />
                AI Generated Suggestions
              </h3>
              <button onClick={() => showToast('সমস্ত AI সাজেশন রি-জেনারেট করা হয়েছে!')} className="text-[11px] font-bold text-[#eb1c24] hover:underline flex items-center gap-1 cursor-pointer">
                <RotateCw size={12} /> Regenerate All
              </button>
            </div>

            {/* 1. Excerpt */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <FileText size={13} className="text-[#eb1c24]" />
                <span>Excerpt</span>
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-bangla">
                {excerpt}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => applyAiSuggestion('excerpt', excerpt)}
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                >
                  <Check size={12} /> Accept
                </button>
                <button onClick={() => showToast('AI Excerpt রিফ্রেশ করা হয়েছে!')} className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer">
                  <RotateCw size={11} />
                </button>
              </div>
            </div>

            {/* 2. SEO Title */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <SearchCheck size={13} className="text-[#eb1c24]" />
                <span>SEO Title</span>
              </p>
              <p className="text-[11px] text-slate-600 font-semibold font-bangla">
                {seoTitle}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => applyAiSuggestion('seoTitle', seoTitle)}
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                >
                  <Check size={12} /> Accept
                </button>
                <button onClick={() => showToast('AI SEO Title রিফ্রেশ করা হয়েছে!')} className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer">
                  <RotateCw size={11} />
                </button>
              </div>
            </div>

            {/* 3. Meta Description */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <FileText size={13} className="text-[#eb1c24]" />
                <span>Meta Description</span>
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-bangla">
                {metaDescription}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => applyAiSuggestion('metaDescription', metaDescription)}
                  className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                >
                  <Check size={12} /> Accept
                </button>
                <button onClick={() => showToast('AI Meta Description রিফ্রেশ করা হয়েছে!')} className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer">
                  <RotateCw size={11} />
                </button>
              </div>
            </div>

            {/* 4. Focus Keywords */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <Tag size={13} className="text-[#eb1c24]" />
                <span>Focus Keywords</span>
              </p>
              <div className="flex flex-wrap gap-1">
                {focusKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-900 text-[10px] font-bold rounded">
                    {kw}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={() => showToast('Focus Keywords যুক্ত করা হয়েছে!')} className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs">
                  <Check size={12} /> Accept
                </button>
                <button onClick={() => showToast('Keywords রিফ্রেশ করা হয়েছে!')} className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer">
                  <RotateCw size={11} />
                </button>
              </div>
            </div>

            {/* 5. Tags */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <Tag size={13} className="text-[#eb1c24]" />
                <span>Tags</span>
              </p>
              <div className="flex flex-wrap gap-1 font-bangla">
                {['ভারত', 'ইংল্যান্ড', 'টেস্ট সিরিজ', 'রোহিত শর্মা', 'যশস্বী জয়সওয়াল', 'ক্রিকেট'].map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-900 text-[10px] font-bold rounded">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={() => showToast('Tags গ্রহণ করা হয়েছে!')} className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs">
                  <Check size={12} /> Accept
                </button>
                <button onClick={() => showToast('Tags রিফ্রেশ করা হয়েছে!')} className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer">
                  <RotateCw size={11} />
                </button>
              </div>
            </div>

            {/* 6. Suggested Category */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <FolderTree size={13} className="text-[#eb1c24]" />
                <span>Suggested Category</span>
              </p>
              <p className="text-[11px] font-extrabold text-slate-800 font-bangla">
                খেলা › ক্রিকেট <span className="text-emerald-600 ml-1 font-bold">Confidence: 95%</span>
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={() => showToast('Suggested Category গ্রহণ করা হয়েছে!')} className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs">
                  <Check size={12} /> Accept
                </button>
                <button onClick={() => showToast('Category রিফ্রেশ করা হয়েছে!')} className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer">
                  <RotateCw size={11} />
                </button>
              </div>
            </div>

            {/* 7. AI Summary */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                <Bot size={13} className="text-[#eb1c24]" />
                <span>AI Summary</span>
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-bangla">
                ভারত দ্বিতীয় টেস্টে দাপুটে জয় নিয়ে সিরিজে ২-০ তে অগ্রগতি করেছে। ব্যাটিং ও বোলিং দুই বিভাগেই ভারত দেখিয়েছে অসাধারণ পারফরম্যান্স।
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={() => showToast('AI Summary সংক্ষেপ গ্রহণ করা হয়েছে!')} className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 cursor-pointer shadow-2xs">
                  <Check size={12} /> Accept
                </button>
                <button onClick={() => showToast('AI Summary রিফ্রেশ করা হয়েছে!')} className="px-2 py-1 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-100 cursor-pointer">
                  <RotateCw size={11} />
                </button>
              </div>
            </div>

            {/* 8. Fact Check */}
            <div className="p-3 bg-emerald-600 text-white rounded-xl flex items-center justify-between shadow-xs">
              <div>
                <span className="bg-white text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">Verified</span>
                <p className="text-[10px] font-bold text-white mt-1">No major factual issues found.</p>
              </div>
              <button onClick={() => alert('Fact Check Details: ঘটনা ও তারিখের সমস্ত তথ্য ১০০% সত্য ও বিসিসিআই রিপোর্ট দ্বারা সামঞ্জস্যপূর্ণ।')} className="text-[10px] font-extrabold text-white underline cursor-pointer">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 3: PUBLISHING, SEO & FEATURED IMAGE (~25% - xl:col-span-3) ================= */}
        <div className="xl:col-span-3 space-y-4">

          {/* 1. Languages Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900">Languages</h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-800 text-white rounded-xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2 font-bold">
                  <Globe2 size={15} className="text-white" />
                  <span className="font-bangla">বাংলা (Default)</span>
                </div>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
                  Active
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">English</div>
                  <div className="text-[10px] text-slate-400">Generated by AI</div>
                </div>
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                  Ready
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800 font-bangla">हिंदी</div>
                  <div className="text-[10px] text-slate-400">Generated by AI</div>
                </div>
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                  Ready
                </span>
              </div>
            </div>

            <button onClick={() => showToast('নতুন ভাষা সংস্করণ তৈরি করার সুবিধা চালু হয়েছে!')} className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer">
              <Plus size={14} /> Add New Language
            </button>
          </div>

          {/* 2. SEO Score Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-xs text-slate-900">SEO</h3>

            {/* Circular SEO Score Meter */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 block">SEO Score</span>
                <span className="text-emerald-600 font-black text-sm">
                  {calcSeoScore() > 80 ? 'Excellent' : 'Good'}
                </span>
              </div>

              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90 transform">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray={`${calcSeoScore()}, 100`} />
                </svg>
                <span className="absolute font-black text-base text-slate-900">{calcSeoScore()}</span>
              </div>
            </div>

            {/* SEO Checklist */}
            <div className="space-y-1.5 text-xs font-semibold text-slate-700 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Meta Title</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Meta Description</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Keywords</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Readability</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Images</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Schema</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Links</div>
            </div>

            <button onClick={() => showToast('SEO Score পুনঃপরীক্ষা করা হলো: 94/100!')} className="w-full py-1.5 text-[#eb1c24] text-xs font-extrabold hover:underline flex items-center justify-center gap-1 cursor-pointer">
              <RotateCw size={12} /> Analyze Again
            </button>
          </div>

          {/* 3. Featured Image Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900">Featured Image</h3>
            {featuredImage ? (
              <div className="rounded-xl overflow-hidden border border-slate-200 relative group">
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full h-36 object-cover"
                />
              </div>
            ) : (
              <div className="h-36 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <Upload size={24} />
                <span className="text-xs font-bold mt-1">Upload Featured Image</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button onClick={handleFeaturedImageChange} className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer">
                Change Image
              </button>
              {featuredImage && (
                <button onClick={() => setFeaturedImage('')} className="py-1.5 px-3 border border-slate-200 hover:bg-rose-50 text-rose-600 text-xs font-bold rounded-lg transition-colors cursor-pointer">
                  Remove
                </button>
              )}
            </div>

            {/* AI Generated Image Details */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <p className="font-extrabold text-[#eb1c24] flex items-center gap-1">
                <Sparkles size={13} /> AI Generated Details
              </p>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Alt Text</label>
                <p className="text-[11px] font-semibold text-slate-700 font-bangla">{altText}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Caption</label>
                <p className="text-[11px] font-semibold text-slate-700 font-bangla">{caption}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Credit</label>
                <p className="text-[11px] font-semibold text-slate-700 font-bangla">{credit}</p>
              </div>
              <button onClick={handleAiRegenerateImageDetails} className="text-[11px] font-extrabold text-[#eb1c24] hover:underline flex items-center gap-1 pt-1 cursor-pointer">
                <Sparkles size={12} /> Regenerate with AI
              </button>
            </div>
          </div>

          {/* 4. Publishing Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-xs text-slate-900">Publishing</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-bold text-slate-600">Schedule</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 outline-none"
                  />
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 font-semibold text-slate-700 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={socialShares.subscribers} onChange={(e) => setSocialShares({ ...socialShares, subscribers: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  <span>Notify Subscribers</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={socialShares.pushNotification} onChange={(e) => setSocialShares({ ...socialShares, pushNotification: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  <span>Send Push Notification</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={socialShares.facebook} onChange={(e) => setSocialShares({ ...socialShares, facebook: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  <span>Share to Facebook Page</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={socialShares.twitter} onChange={(e) => setSocialShares({ ...socialShares, twitter: e.target.checked })} className="rounded border-slate-300 text-[#eb1c24]" />
                  <span>Share to Twitter (X)</span>
                </label>
              </div>
            </div>

            <button
              onClick={handlePublishPost}
              disabled={isPublishing}
              className="w-full py-2.5 bg-[#eb1c24] hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md shadow-red-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <Rocket size={15} />
              <span>{isPublishing ? 'PUBLISHING...' : 'PUBLISH NOW'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Interactive Post Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4 font-bangla border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#eb1c24] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">Live Preview</span>
                <span className="text-xs text-slate-400 font-sans font-semibold">https://nirbhikbangla.com/news/{slug}</span>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Simulated Client Website Article View */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                {selectedCategories.map((c) => (
                  <span key={c} className="bg-[#eb1c24] text-white px-2.5 py-0.5 rounded-md text-[11px]">{c}</span>
                ))}
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-sans border-y border-slate-100 py-2.5">
                <span>By Nirbhik Bangla Editorial Desk</span>
                <span>•</span>
                <span>Published May 21, 2024</span>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>

              {featuredImage && (
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img src={featuredImage} alt={altText} className="w-full h-80 object-cover" />
                  {caption && <p className="p-2.5 bg-slate-50 text-xs text-slate-500 text-center italic">{caption}</p>}
                </div>
              )}

              <div className="text-base leading-relaxed text-slate-800 space-y-4">
                <p className="font-semibold text-slate-900 border-l-4 border-[#eb1c24] pl-3 py-1 bg-slate-50 rounded-r-lg">{excerpt}</p>
                <p>দ্বিতীয় টেস্ট অসাধারণ পারফরম্যান্সের মাধ্যমে ইংল্যান্ডকে ২৮০ রানে হারিয়ে সিরিজে ২-০ ব্যবধানে এগিয়ে গেল ভারত। দলের হয়ে রোহিত শর্মা ও যশস্বী জয়সওয়াল ব্যাট হাতে দুর্দান্ত পারফরম্যান্স করেন।</p>
                <h3 className="text-lg font-bold text-slate-900">ম্যাচের সংক্ষিপ্ত বিবরণ</h3>
                <p>প্রথম ইনিংসে ভারত করে ৪৫০ রান। জবাবে ইংল্যান্ডের প্রথম ইনিংস থামে ২৮০ রানে। দ্বিতীয় ইনিংসে ভারত ২৩৮ রানে অলআউট হয় এবং ইংল্যান্ডের জয়ের জন্য প্রয়োজন ছিল ৪৮১ রান। কিন্তু শেষ পর্যন্ত ইংল্যান্ড করতে পারে মাত্র ২০০ রান।</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 font-sans">
              <button onClick={() => setShowPreviewModal(false)} className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 cursor-pointer">
                Close Preview
              </button>
              <button onClick={() => { setShowPreviewModal(false); handlePublishPost(); }} className="px-5 py-2 bg-[#eb1c24] text-white text-xs font-black rounded-xl hover:bg-red-700 cursor-pointer">
                Publish Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
