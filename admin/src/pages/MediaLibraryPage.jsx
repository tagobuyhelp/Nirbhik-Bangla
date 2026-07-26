import { useState } from 'react';
import {
  Upload,
  FolderPlus,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Sparkles,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  HardDrive,
  LayoutGrid,
  List,
  CheckCircle2,
  Play,
  FileCode,
  Zap,
  Maximize2,
  Copy,
  Download,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CloudUpload,
  CloudDownload,
  PieChart,
} from 'lucide-react';

export default function MediaLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [folderName, setFolderName] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Initial Media Library Dataset (Exact match to reference UI image)
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      name: 'parliament-building.jpg',
      type: 'JPG',
      category: 'Images',
      size: '245 KB',
      date: 'May 21, 2024',
      dimensions: '1920x1080',
      url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 2,
      name: 'pm-modi-speech.webp',
      type: 'WEBP',
      category: 'Images',
      size: '180 KB',
      date: 'May 21, 2024',
      dimensions: '1200x800',
      url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 3,
      name: 'bjp-rally.jpg',
      type: 'JPG',
      category: 'Images',
      size: '320 KB',
      date: 'May 20, 2024',
      dimensions: '1920x1080',
      url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 4,
      name: 'india-win-highlights.mp4',
      type: 'MP4',
      category: 'Videos',
      size: '24.5 MB',
      date: 'May 20, 2024',
      duration: '02:45',
      url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80',
      isVideo: true,
    },
    {
      id: 5,
      name: 'isro-launch.jpg',
      type: 'JPG',
      category: 'Images',
      size: '210 KB',
      date: 'May 19, 2024',
      dimensions: '1600x900',
      url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 6,
      name: 'election-banner.png',
      type: 'PNG',
      category: 'Images',
      size: '450 KB',
      date: 'May 18, 2024',
      dimensions: '1200x630',
      url: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 7,
      name: 'stock-market.jpg',
      type: 'JPG',
      category: 'Images',
      size: '190 KB',
      date: 'May 18, 2024',
      dimensions: '1920x1080',
      url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 8,
      name: 'flood-news.jpg',
      type: 'JPG',
      category: 'Images',
      size: '310 KB',
      date: 'May 18, 2024',
      dimensions: '1600x1000',
      url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 9,
      name: 'report-document.pdf',
      type: 'PDF',
      category: 'Documents',
      size: '1.2 MB',
      date: 'May 17, 2024',
      isDoc: true,
    },
    {
      id: 10,
      name: 'news-audio.mp3',
      type: 'MP3',
      category: 'Audio',
      size: '2.4 MB',
      date: 'May 17, 2024',
      duration: '01:12',
      isAudio: true,
    },
    {
      id: 11,
      name: 'kolkata-bridge.jpg',
      type: 'JPG',
      category: 'Images',
      size: '230 KB',
      date: 'May 16, 2024',
      dimensions: '1920x1080',
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 12,
      name: 'health-care.webp',
      type: 'WEBP',
      category: 'Images',
      size: '160 KB',
      date: 'May 16, 2024',
      dimensions: '1200x800',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 13,
      name: 'education-news.jpg',
      type: 'JPG',
      category: 'Images',
      size: '200 KB',
      date: 'May 15, 2024',
      dimensions: '1600x1000',
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 14,
      name: 'indian-army.jpg',
      type: 'JPG',
      category: 'Images',
      size: '215 KB',
      date: 'May 15, 2024',
      dimensions: '1920x1080',
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
    {
      id: 15,
      name: 'solar-eclipse.jpg',
      type: 'JPG',
      category: 'Images',
      size: '205 KB',
      date: 'May 14, 2024',
      dimensions: '1600x900',
      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
      isImage: true,
    },
  ]);

  const handleToggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    showToast(`নতুন ফোল্ডার "${folderName}" তৈরি হয়েছে!`);
    setFolderName('');
    setShowFolderModal(false);
  };

  const filteredMedia = mediaFiles.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedType === 'All') return matchesSearch;
    if (selectedType === 'Images') return matchesSearch && item.category === 'Images';
    if (selectedType === 'Videos') return matchesSearch && item.category === 'Videos';
    if (selectedType === 'Documents') return matchesSearch && item.category === 'Documents';
    if (selectedType === 'Audio') return matchesSearch && item.category === 'Audio';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 text-slate-800 font-sans relative">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Header Title & Top Action Buttons Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Media Library</h1>
            <span className="bg-purple-100 text-purple-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={11} /> AI Powered
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Upload, manage and organize all your media files in one place.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <Upload size={15} />
            <span>Upload New</span>
          </button>

          <button
            onClick={() => setShowFolderModal(true)}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <FolderPlus size={15} className="text-slate-500" />
            <span>Create Folder</span>
          </button>

          <button
            onClick={() => showToast('Trash folder opened!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Trash2 size={15} className="text-slate-500" />
            <span>Trash</span>
          </button>
        </div>
      </div>

      {/* 2. Top 5 Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total Files */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Total Files</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">2,458</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">All media files</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <HardDrive size={18} />
          </div>
        </div>

        {/* Card 2: Images */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Images</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">1,842</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">75% of total</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <ImageIcon size={18} />
          </div>
        </div>

        {/* Card 3: Videos */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Videos</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">324</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">13% of total</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Video size={18} />
          </div>
        </div>

        {/* Card 4: Documents */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Documents</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">186</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">8% of total</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <FileText size={18} />
          </div>
        </div>

        {/* Card 5: Audio */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400">Audio</p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">106</h3>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5 block">4% of total</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Music size={18} />
          </div>
        </div>
      </div>

      {/* 3. Filter Controls Bar 1 & 2 */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        {/* Row 1: Category & Type Dropdowns + Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-2 text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">All Media</option>
              <option value="Images">Images Only</option>
              <option value="Videos">Videos Only</option>
              <option value="Documents">Documents Only</option>
              <option value="Audio">Audio Only</option>
            </select>

            <select className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold px-3 py-2 text-slate-700 outline-none cursor-pointer">
              <option>All Types</option>
              <option>JPG / PNG</option>
              <option>MP4 / WEBM</option>
              <option>PDF / DOCX</option>
            </select>

            <select className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold px-3 py-2 text-slate-700 outline-none cursor-pointer">
              <option>All Folders</option>
              <option>News Banners</option>
              <option>Reporters Uploads</option>
              <option>Ads Assets</option>
            </select>

            <select className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold px-3 py-2 text-slate-700 outline-none cursor-pointer">
              <option>All Dates</option>
              <option>May 2024</option>
              <option>April 2024</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 focus:bg-white transition-all font-medium"
              />
            </div>

            <button className="bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
              <Filter size={14} className="text-slate-500" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Row 2: Bulk Actions + Sort & Layout Mode Switcher */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <select className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold px-3 py-1.5 text-slate-700 outline-none cursor-pointer">
              <option value="">Bulk Actions</option>
              <option value="delete">Delete Selected</option>
              <option value="compress">Compress Selected</option>
            </select>
            <button
              onClick={() => selectedItems.length > 0 && showToast(`${selectedItems.length} files processed!`)}
              className="bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Sort by:</span>
              <select className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 px-2.5 py-1.5 outline-none cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>File Size (Largest)</option>
              </select>
            </div>

            <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-400 hover:text-slate-700'}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-400 hover:text-slate-700'}`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Grid Content Layout (Media Cards 9 Cols + AI & Storage Sidebar 3 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Side: Media Cards Grid (~75% - lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Media Grid Cards Container */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => setPreviewMedia(item)}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden group hover:shadow-md hover:border-purple-200 transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Media Preview Box */}
                <div className="relative h-32 bg-slate-900 overflow-hidden flex items-center justify-center">
                  {item.isImage && (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {item.isVideo && (
                    <div className="relative w-full h-full">
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#eb1c24] text-white flex items-center justify-center shadow-md">
                          <Play size={14} fill="white" className="ml-0.5" />
                        </div>
                      </div>
                      {item.duration && (
                        <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                          {item.duration}
                        </span>
                      )}
                    </div>
                  )}

                  {item.isDoc && (
                    <div className="flex flex-col items-center justify-center p-3 text-rose-500 bg-rose-50/60 w-full h-full">
                      <FileText size={36} />
                    </div>
                  )}

                  {item.isAudio && (
                    <div className="flex flex-col items-center justify-center p-3 text-purple-600 bg-purple-50/60 w-full h-full">
                      <Music size={32} />
                      <span className="text-[9px] font-mono font-bold text-purple-800 mt-1">{item.duration}</span>
                    </div>
                  )}

                  {/* Type Badge Overlay (Top Left) */}
                  <span className="absolute top-1.5 left-1.5 bg-white/90 text-slate-800 text-[9px] font-black px-1.5 py-0.2 rounded border border-slate-200 uppercase shadow-2xs">
                    {item.type}
                  </span>

                  {/* Select Checkbox (Top Right) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSelect(item.id);
                    }}
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-md bg-white/90 border border-slate-300 flex items-center justify-center cursor-pointer"
                  >
                    {selectedItems.includes(item.id) && (
                      <div className="w-3 h-3 bg-purple-600 rounded-sm" />
                    )}
                  </div>
                </div>

                {/* Card Details Footer */}
                <div className="p-2.5 bg-white space-y-1">
                  <h5 className="font-extrabold text-[11px] text-slate-900 truncate leading-tight group-hover:text-purple-700 transition-colors">
                    {item.name}
                  </h5>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                    <span>{item.date}</span>
                    <span className="font-mono">{item.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grid Pagination Footer */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500">
            <span>Showing 1 to {filteredMedia.length} of 2,458 files</span>

            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center shadow-2xs">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                2
              </button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                3
              </button>
              <span className="px-1 text-slate-400 font-bold">...</span>
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                123
              </button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>

            <select className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs outline-none cursor-pointer">
              <option value="20">20 / page</option>
              <option value="50">50 / page</option>
              <option value="100">100 / page</option>
            </select>
          </div>

        </div>

        {/* Right Side: AI Media Tools, Storage & Insights (~25% - lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">

          {/* 1. AI Media Tools Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-xs text-slate-900">AI Media Tools</h3>
              <span className="text-[9px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded">BETA</span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <button
                onClick={() => showToast('Auto Alt Text: অল্ট টেক্সট তৈরি করা হলো!')}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-purple-50 hover:border-purple-200 transition-all text-left cursor-pointer group"
              >
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs group-hover:text-purple-700">Auto Alt Text</h5>
                  <p className="text-[10px] text-slate-400 font-medium">Generate alt text for images</p>
                </div>
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded shrink-0">New</span>
              </button>

              <button
                onClick={() => showToast('Smart Compression: সাইজ ৩০% কমামোর কাজ চলছে...')}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-purple-50 hover:border-purple-200 transition-all text-left cursor-pointer group"
              >
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs group-hover:text-purple-700">Smart Compression</h5>
                  <p className="text-[10px] text-slate-400 font-medium">Reduce file size without quality loss</p>
                </div>
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded shrink-0">New</span>
              </button>

              <button
                onClick={() => showToast('Image Optimization: এসইও অপটিমাইজেশন সম্পন্ন!')}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-purple-50 hover:border-purple-200 transition-all text-left cursor-pointer group"
              >
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs group-hover:text-purple-700">Image Optimization</h5>
                  <p className="text-[10px] text-slate-400 font-medium">Optimize images for web & SEO</p>
                </div>
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded shrink-0">New</span>
              </button>

              <button
                onClick={() => showToast('Duplicate Finder: ডুুপ্লিকেট ফাইল খোঁজা হলো (০ টি পাওয়া গেছে)!')}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-purple-50 hover:border-purple-200 transition-all text-left cursor-pointer group"
              >
                <div>
                  <h5 className="font-extrabold text-slate-900 text-xs group-hover:text-purple-700">Duplicate Finder</h5>
                  <p className="text-[10px] text-slate-400 font-medium">Find and remove duplicate files</p>
                </div>
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded shrink-0">New</span>
              </button>
            </div>

            <button
              onClick={() => showToast('সমস্ত মিডিয়া ফাইল এআই দ্বারা বিশ্লেষণ করা হলো!')}
              className="w-full py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-1"
            >
              <Sparkles size={14} />
              <span>Analyze All Media</span>
            </button>
          </div>

          {/* 2. Storage Overview Donut Chart Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-xs text-slate-900">Storage Overview</h3>

            <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#9333ea" strokeWidth="16" strokeDasharray="157 238" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray="45 238" strokeDashoffset="-157" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#d97706" strokeWidth="16" strokeDasharray="24 238" strokeDashoffset="-202" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#059669" strokeWidth="16" strokeDasharray="10 238" strokeDashoffset="-226" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-black text-slate-900 leading-none">18.6 GB</span>
                <span className="text-[9px] font-bold text-slate-400 mt-0.5">Used</span>
              </div>
            </div>

            <div className="space-y-1 text-[11px] pt-1 border-t border-slate-100 font-medium">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                  <span className="font-bold text-slate-700">Images</span>
                </div>
                <span className="font-extrabold text-slate-500">12.4 GB (66%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="font-bold text-slate-700">Videos</span>
                </div>
                <span className="font-extrabold text-slate-500">3.6 GB (19%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="font-bold text-slate-700">Documents</span>
                </div>
                <span className="font-extrabold text-slate-500">1.8 GB (10%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="font-bold text-slate-700">Audio</span>
                </div>
                <span className="font-extrabold text-slate-500">0.8 GB (4%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span className="font-bold text-slate-700">Others</span>
                </div>
                <span className="font-extrabold text-slate-500">0.0 GB (1%)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-500">Total Storage: 25 GB</span>
                <span className="text-emerald-600">74% Used</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#eb1c24] rounded-full" style={{ width: '74%' }} />
              </div>
            </div>
          </div>

          {/* 3. Media Insights Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900">Media Insights</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 px-2 py-1 outline-none cursor-pointer">
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <CloudUpload size={16} className="text-purple-600" />
                  <span>Uploaded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900">245</span>
                  <span className="text-[10px] font-bold text-emerald-600">↑18%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <CloudDownload size={16} className="text-blue-600" />
                  <span>Downloaded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900">1,245</span>
                  <span className="text-[10px] font-bold text-emerald-600">↑25%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <Trash2 size={16} className="text-rose-600" />
                  <span>Deleted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900">36</span>
                  <span className="text-[10px] font-bold text-rose-600">↓12%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <PieChart size={16} className="text-amber-600" />
                  <span>Bandwidth Used</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900">3.2 GB</span>
                  <span className="text-[10px] font-bold text-emerald-600">↑22%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Upload Media Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900">Upload New Media</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2 bg-slate-50 cursor-pointer hover:border-purple-300">
              <Upload size={28} className="mx-auto text-purple-600" />
              <p className="text-xs font-bold text-slate-700">Drag & drop files here to upload</p>
              <span className="text-[10px] text-slate-400 font-semibold block">Supports JPG, PNG, WEBP, MP4, PDF, MP3 up to 50MB</span>
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  showToast('মিডিয়া ফাইল সফলভাবে আপলোড করা হয়েছে!');
                }}
                className="px-5 py-2 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl shadow-md cursor-pointer"
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900">Create New Folder</h3>
              <button onClick={() => setShowFolderModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Folder Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. News Banners, Ads Assets..."
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFolderModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#eb1c24] hover:bg-red-700 text-white font-black rounded-xl shadow-md cursor-pointer"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Detail Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-900 truncate">{previewMedia.name}</h3>
              <button onClick={() => setPreviewMedia(null)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {previewMedia.isImage && (
              <img src={previewMedia.url} alt={previewMedia.name} className="w-full h-56 object-cover rounded-2xl border border-slate-200" />
            )}

            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-400">File Type:</span>
                <span className="font-bold text-slate-900">{previewMedia.type}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-400">File Size:</span>
                <span className="font-mono font-bold text-slate-900">{previewMedia.size}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-400">Uploaded On:</span>
                <span className="font-bold text-slate-900">{previewMedia.date}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button onClick={() => setPreviewMedia(null)} className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 cursor-pointer">
                Close
              </button>
              <button onClick={() => { setPreviewMedia(null); showToast('ফাইল ইউআরএল কপি করা হয়েছে!'); }} className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl cursor-pointer">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
