import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Target,
  ChevronRight,
  Save,
  CheckCircle2,
  Monitor,
  Smartphone,
  Tablet,
  Info,
  Calendar,
  Clock,
  Globe,
  Sliders,
  Check,
  Lightbulb,
} from 'lucide-react';

export default function CreatePlacementPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  // 1. Placement Details State
  const [placementName, setPlacementName] = useState('');
  const [placementType, setPlacementType] = useState('');
  const [location, setLocation] = useState('');
  const [adSize, setAdSize] = useState('970x90');
  const [adFormat, setAdFormat] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');

  // 2. Placement Settings State
  const [devices, setDevices] = useState({
    desktop: true,
    mobile: true,
    tablet: false,
  });
  const [adFrequency, setAdFrequency] = useState('every_page');
  const [limitPages, setLimitPages] = useState('2');
  const [adRotation, setAdRotation] = useState('optimize');

  // 3. Targeting State
  const [targeting, setTargeting] = useState('');
  const [includePages, setIncludePages] = useState('');
  const [excludePages, setExcludePages] = useState('');

  // 4. Scheduling State
  const [startDate, setStartDate] = useState('2024-05-21');
  const [startTime, setStartTime] = useState('10:00');
  const [endDate, setEndDate] = useState('2024-05-28');
  const [endTime, setEndTime] = useState('23:59');
  const [setExpiration, setSetExpiration] = useState(true);

  // Preview Device State
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSave = (statusType) => {
    showToast(`অ্যাড প্লেসমেন্ট (${statusType === 'active' ? 'সক্রিয়' : 'ড্রাফট'}) সফলভাবে তৈরি হয়েছে!`);
    setTimeout(() => {
      navigate('/ad-placements');
    }, 1500);
  };

  const toggleDevice = (key) => {
    setDevices({ ...devices, [key]: !devices[key] });
  };

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-12">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Bar */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/ad-placements" className="hover:text-slate-900 transition-colors">
          Ad Placements
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-extrabold">Add New Placement</span>
      </div>

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target size={22} className="text-purple-600" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-outfit">
              Add New Placement
            </h1>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Create a new ad placement to display advertisements on your website or app.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('active')}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <CheckCircle2 size={15} />
            <span>Save & Activate</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column Form Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section 1: 1. Placement Details */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              1. Placement Details
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-700 font-bold">Placement Name <span className="text-red-500">*</span></label>
                    <span className="text-[10px] text-slate-400 font-mono">{placementName.length}/100</span>
                  </div>
                  <input
                    type="text"
                    maxLength={100}
                    placeholder="Enter placement name"
                    value={placementName}
                    onChange={(e) => setPlacementName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Placement Type <span className="text-red-500">*</span></label>
                  <select
                    value={placementType}
                    onChange={(e) => setPlacementType(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                  >
                    <option value="">Select placement type</option>
                    <option value="banner">Header Banner</option>
                    <option value="sidebar">Sidebar Widget</option>
                    <option value="in_feed">In-Feed Content</option>
                    <option value="popup">Popup Modal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Location <span className="text-red-500">*</span></label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                  >
                    <option value="">Select location</option>
                    <option value="homepage">Homepage Top</option>
                    <option value="article_sidebar">Article Sidebar</option>
                    <option value="category_top">Category Header</option>
                    <option value="footer">Footer Banner</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Ad Size <span className="text-red-500">*</span></label>
                  <select
                    value={adSize}
                    onChange={(e) => setAdSize(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                  >
                    <option value="970x90">Leaderboard (970 x 90)</option>
                    <option value="728x90">Standard Banner (728 x 90)</option>
                    <option value="300x250">Medium Rectangle (300 x 250)</option>
                    <option value="300x600">Half Page (300 x 600)</option>
                    <option value="320x50">Mobile Banner (320 x 50)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Ad Format <span className="text-red-500">*</span></label>
                  <select
                    value={adFormat}
                    onChange={(e) => setAdFormat(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                  >
                    <option value="">Select ad format</option>
                    <option value="image">Image Banner</option>
                    <option value="video">Video Ad</option>
                    <option value="html">Custom HTML / Script</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-8">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-700 font-bold">Description <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <span className="text-[10px] text-slate-400 font-mono">{description.length}/250</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={250}
                    placeholder="Enter a short description about this placement..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] resize-none"
                  />
                </div>

                <div className="md:col-span-4 space-y-2">
                  <label className="block text-slate-700 font-bold">Status <span className="text-red-500">*</span></label>

                  <div className="space-y-2 pt-1">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="placement_status"
                        checked={status === 'Active'}
                        onChange={() => setStatus('Active')}
                        className="mt-0.5 text-purple-600"
                      />
                      <div>
                        <span className="font-extrabold text-slate-900 block text-xs">Active</span>
                        <span className="text-[10px] text-slate-400 font-medium block leading-none">Placement is live and can display ads</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="placement_status"
                        checked={status === 'Inactive'}
                        onChange={() => setStatus('Inactive')}
                        className="mt-0.5 text-purple-600"
                      />
                      <div>
                        <span className="font-extrabold text-slate-900 block text-xs">Inactive</span>
                        <span className="text-[10px] text-slate-400 font-medium block leading-none">Placement is disabled</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="placement_status"
                        checked={status === 'Draft'}
                        onChange={() => setStatus('Draft')}
                        className="mt-0.5 text-purple-600"
                      />
                      <div>
                        <span className="font-extrabold text-slate-900 block text-xs">Draft</span>
                        <span className="text-[10px] text-slate-400 font-medium block leading-none">Save as draft for later</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 2. Placement Settings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              2. Placement Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold">
              {/* Devices */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold">Devices</label>
                <div className="space-y-2 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={devices.desktop}
                      onChange={() => toggleDevice('desktop')}
                      className="rounded border-slate-300 text-purple-600"
                    />
                    <Monitor size={14} className="text-slate-500" />
                    <span>Desktop</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={devices.mobile}
                      onChange={() => toggleDevice('mobile')}
                      className="rounded border-slate-300 text-purple-600"
                    />
                    <Smartphone size={14} className="text-slate-500" />
                    <span>Mobile</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={devices.tablet}
                      onChange={() => toggleDevice('tablet')}
                      className="rounded border-slate-300 text-purple-600"
                    />
                    <Tablet size={14} className="text-slate-500" />
                    <span>Tablet</span>
                  </label>
                </div>
              </div>

              {/* Ad Frequency */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold">Ad Frequency</label>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ad_frequency"
                      checked={adFrequency === 'every_page'}
                      onChange={() => setAdFrequency('every_page')}
                      className="text-purple-600"
                    />
                    <span>Show on every page view</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ad_frequency"
                      checked={adFrequency === 'limit'}
                      onChange={() => setAdFrequency('limit')}
                      className="text-purple-600"
                    />
                    <span className="flex items-center gap-1">
                      Limit (Show every
                      <input
                        type="number"
                        value={limitPages}
                        onChange={(e) => setLimitPages(e.target.value)}
                        className="w-10 h-6 px-1 text-center border border-slate-200 rounded text-xs outline-none"
                      />
                      page views)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ad_frequency"
                      checked={adFrequency === 'session'}
                      onChange={() => setAdFrequency('session')}
                      className="text-purple-600"
                    />
                    <span>Once per session</span>
                  </label>
                </div>
              </div>

              {/* Ad Rotation */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold">Ad Rotation</label>
                <div className="space-y-2.5">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ad_rotation"
                      checked={adRotation === 'optimize'}
                      onChange={() => setAdRotation('optimize')}
                      className="mt-0.5 text-purple-600"
                    />
                    <div>
                      <span className="font-extrabold text-slate-900 block text-xs">Optimize (Smart rotation)</span>
                      <span className="text-[10px] text-slate-400 font-medium block">Automatically rotate for best performance</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ad_rotation"
                      checked={adRotation === 'random'}
                      onChange={() => setAdRotation('random')}
                      className="mt-0.5 text-purple-600"
                    />
                    <div>
                      <span className="font-extrabold text-slate-900 block text-xs">Random</span>
                      <span className="text-[10px] text-slate-400 font-medium block">Show ads in random order</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ad_rotation"
                      checked={adRotation === 'fixed'}
                      onChange={() => setAdRotation('fixed')}
                      className="mt-0.5 text-purple-600"
                    />
                    <div>
                      <span className="font-extrabold text-slate-900 block text-xs">Fixed Order</span>
                      <span className="text-[10px] text-slate-400 font-medium block">Show ads in set order</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: 3. Targeting & Visibility (Optional) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              3. Targeting & Visibility <span className="text-slate-400 font-normal">(Optional)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Targeting</label>
                <select
                  value={targeting}
                  onChange={(e) => setTargeting(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="">Select targeting</option>
                  <option value="all">All Visitors</option>
                  <option value="logged_in">Logged-in Users Only</option>
                  <option value="mobile_only">Mobile Visitors Only</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Include Pages</label>
                <input
                  type="text"
                  placeholder="Enter page URL or path"
                  value={includePages}
                  onChange={(e) => setIncludePages(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
                <span className="text-[9.5px] text-slate-400 font-medium mt-0.5 block">e.g. /news, /politics (leave empty for all pages)</span>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Exclude Pages</label>
                <input
                  type="text"
                  placeholder="Enter page URL or path"
                  value={excludePages}
                  onChange={(e) => setExcludePages(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
                <span className="text-[9.5px] text-slate-400 font-medium mt-0.5 block">e.g. /login, /register (leave empty for none)</span>
              </div>
            </div>
          </div>

          {/* Section 4: 4. Scheduling (Optional) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              4. Scheduling <span className="text-slate-400 font-normal">(Optional)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Start Date</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-24 px-2 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">End Date</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-24 px-2 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Timezone</label>
                <select className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer">
                  <option>(GMT+06:00) Dhaka, Bangladesh</option>
                  <option>(GMT+00:00) UTC</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={setExpiration}
                  onChange={(e) => setSetExpiration(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600"
                />
                <span>Set expiration (end date)</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column Preview & Summary Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* 1. Placement Preview Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Placement Preview
            </h3>

            {/* Device Tabs */}
            <div className="flex items-center justify-center gap-2 border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1 text-xs font-extrabold flex items-center gap-1 rounded-lg transition-colors cursor-pointer ${
                  previewDevice === 'desktop' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Monitor size={14} />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1 text-xs font-extrabold flex items-center gap-1 rounded-lg transition-colors cursor-pointer ${
                  previewDevice === 'mobile' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Smartphone size={14} />
                <span>Mobile</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`px-3 py-1 text-xs font-extrabold flex items-center gap-1 rounded-lg transition-colors cursor-pointer ${
                  previewDevice === 'tablet' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Tablet size={14} />
                <span>Tablet</span>
              </button>
            </div>

            {/* Visual Container */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-3">
              <div className="text-[10px] font-mono text-center text-slate-400 font-bold">
                TOP BANNER ({adSize})
              </div>

              <div className="w-full h-8 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">
                Website Header
              </div>

              {/* Dashed Purple Highlight Ad Box */}
              <div className="w-full p-6 border-2 border-dashed border-purple-400 bg-purple-50/50 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="text-xs font-black text-purple-700">Your Ad Here</span>
                <span className="text-[10px] font-mono font-extrabold text-purple-500 mt-0.5">{adSize}</span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="w-3/4 h-2 bg-slate-200 rounded" />
                <div className="w-full h-2 bg-slate-200 rounded" />
                <div className="w-1/2 h-2 bg-slate-200 rounded" />
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Info size={12} className="text-slate-400" />
              <span>Note: This is a preview. Actual appearance may vary.</span>
            </p>
          </div>

          {/* 2. Placement Summary Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Placement Summary
            </h3>

            <div className="space-y-2 text-xs font-semibold text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Placement Name:</span>
                <span className="font-extrabold text-slate-900 truncate max-w-[150px]">{placementName || '--'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Type:</span>
                <span className="font-bold text-slate-800">{placementType || '--'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Location:</span>
                <span className="font-bold text-slate-800">{location || '--'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Size:</span>
                <span className="font-mono font-bold text-slate-800">{adSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Devices:</span>
                <span className="font-bold text-slate-800">
                  {[devices.desktop && 'Desktop', devices.mobile && 'Mobile', devices.tablet && 'Tablet'].filter(Boolean).join(', ') || '--'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Status:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                  status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Priority:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">
                  {priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Start Date:</span>
                <span className="font-mono text-slate-700 text-[11px]">{startDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">End Date:</span>
                <span className="font-mono text-slate-700 text-[11px]">{endDate}</span>
              </div>
            </div>
          </div>

          {/* 3. Tips Box */}
          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-200/80 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-extrabold text-purple-900">
              <Lightbulb size={16} className="text-purple-600" />
              <span>Tips</span>
            </div>

            <ul className="space-y-2 font-semibold text-purple-950 text-[11px]">
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Choose the right placement type for better visibility.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Top and sidebar placements usually perform best.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Test different placements to find what works best.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Monitor performance and optimize regularly.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
