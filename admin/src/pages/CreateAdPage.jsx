import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Send,
  Save,
  Upload,
  CloudUpload,
  Info,
  Calendar,
  Clock,
  Globe2,
  Monitor,
  Smartphone,
  Tablet,
  Sparkles,
  CheckCircle2,
  Eye,
  Check,
  X,
  HelpCircle,
} from 'lucide-react';

export default function CreateAdPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [adTitle, setAdTitle] = useState('');
  const [adType, setAdType] = useState('Image');
  const [adFormat, setAdFormat] = useState('Top Banner (970 x 90)');
  const [adCategory, setAdCategory] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Active');

  const [destinationUrl, setDestinationUrl] = useState('https://example.com');
  const [altText, setAltText] = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [ctaButton, setCtaButton] = useState('Learn More');
  const [customCta, setCustomCta] = useState('');

  const [placement, setPlacement] = useState('Top of Homepage');
  const [devices, setDevices] = useState({ desktop: true, mobile: true, tablet: false });
  const [targeting, setTargeting] = useState('');

  const [startDate, setStartDate] = useState('2024-05-21');
  const [startTime, setStartTime] = useState('10:00');
  const [endDate, setEndDate] = useState('2024-05-28');
  const [endTime, setEndTime] = useState('23:59');
  const [timezone, setTimezone] = useState('(GMT+06:00) Dhaka, Bangladesh');
  const [frequencyCap, setFrequencyCap] = useState(true);

  const [previewTab, setPreviewTab] = useState('desktop');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('বিজ্ঞাপন প্রচারণা সফলভাবে তৈরি এবং সাবমিট করা হয়েছে!');
    setTimeout(() => {
      navigate('/ads-manager');
    }, 1500);
  };

  return (
    <div className="space-y-6 text-slate-800 font-sans relative pb-10">

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <NavLink to="/ads-manager" className="hover:text-[#eb1c24] transition-colors">Ad Manager</NavLink>
        <span>›</span>
        <span className="text-slate-900 font-bold">Create New Ad</span>
      </nav>

      {/* 1. Header Title & Top Action Buttons Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Send size={22} className="text-purple-600 transform -rotate-45" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Create New Ad</h1>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Create and configure a new advertisement for your website.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => showToast('ড্রাফট হিসেবে ড্রাফট ফোল্ডারে সেভ করা হয়েছে!')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Save size={14} className="text-slate-500" />
            <span>Save as Draft</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <span>Save & Continue</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* 2. Main 2-Column Form Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Form Sections (~65% - lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section 1: Ad Details */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              1. Ad Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="md:col-span-1">
                <div className="flex justify-between mb-1">
                  <label className="text-slate-700 font-bold">Ad Title <span className="text-red-500">*</span></label>
                  <span className="text-[10px] text-slate-400 font-mono">{adTitle.length}/100</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Enter ad title"
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Ad Type <span className="text-red-500">*</span></label>
                <select
                  value={adType}
                  onChange={(e) => setAdType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Image">Image</option>
                  <option value="Video">Video</option>
                  <option value="HTML5">HTML5 Code</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Ad Format <span className="text-red-500">*</span></label>
                <select
                  value={adFormat}
                  onChange={(e) => setAdFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Top Banner (970 x 90)">Top Banner (970 x 90)</option>
                  <option value="Sidebar (300 x 250)">Sidebar (300 x 250)</option>
                  <option value="In-Content (728 x 90)">In-Content (728 x 90)</option>
                  <option value="Sticky Bottom (320 x 50)">Sticky Bottom (320 x 50)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold pt-1">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Ad Category</label>
                <select
                  value={adCategory}
                  onChange={(e) => setAdCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer text-slate-500"
                >
                  <option value="">Select category (optional)</option>
                  <option value="Sponsor">Sponsor</option>
                  <option value="Affiliate">Affiliate</option>
                  <option value="Direct Sales">Direct Sales</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold flex items-center gap-1">
                  <span>Priority</span>
                  <HelpCircle size={12} className="text-slate-400" />
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer font-bold text-emerald-700 bg-emerald-50/50"
                >
                  <option value="Active">● Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Ad Content */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              2. Ad Content
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Creative Upload Drag & Drop */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Upload Creative <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-2xl p-6 text-center space-y-2 hover:border-purple-400 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
                    <CloudUpload size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-700">Drag & drop your file here</p>
                  <span className="text-[10px] text-slate-400 font-semibold block">or</span>
                  <button
                    type="button"
                    onClick={() => showToast('ফাইল ম্যানেজার চালু করা হয়েছে!')}
                    className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer inline-block"
                  >
                    Choose File
                  </button>
                  <p className="text-[9px] text-slate-400 font-medium pt-1">
                    Supported formats: JPG, PNG, GIF, WebP, MP4 (Max: 5MB for images, 20MB for videos)
                  </p>
                </div>
              </div>

              {/* Right Stacked Input Fields */}
              <div className="space-y-3.5 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Destination URL <span className="text-red-500">*</span></label>
                  <input
                    type="url"
                    required
                    value={destinationUrl}
                    onChange={(e) => setDestinationUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono text-xs"
                  />
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">
                    Enter the URL where users will be redirected when they click the ad.
                  </span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-slate-700 font-bold">Alt Text <span className="text-slate-400 font-normal">(for images)</span></label>
                    <span className="text-[10px] text-slate-400 font-mono">{altText.length}/150</span>
                  </div>
                  <input
                    type="text"
                    maxLength={150}
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Enter alt text for the ad image"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold pt-1">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-slate-700 font-bold">Ad Description <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <span className="text-[10px] text-slate-400 font-mono">{adDescription.length}/250</span>
                </div>
                <textarea
                  rows={3}
                  maxLength={250}
                  value={adDescription}
                  onChange={(e) => setAdDescription(e.target.value)}
                  placeholder="Write a short description about this ad..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Call to Action Button <span className="text-slate-400 font-normal">(Optional)</span></label>
                <select
                  value={ctaButton}
                  onChange={(e) => setCtaButton(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Select CTA">Select CTA</option>
                  <option value="Learn More">Learn More</option>
                  <option value="Buy Now">Buy Now</option>
                  <option value="Contact Us">Contact Us</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Custom CTA Text <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  value={customCta}
                  onChange={(e) => setCustomCta(e.target.value)}
                  placeholder="Enter custom CTA text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  Leave blank to use default text
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Ad Placement & Targeting */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              3. Ad Placement & Targeting
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Ad Placement <span className="text-red-500">*</span></label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Top of Homepage">Top of Homepage</option>
                  <option value="Right Sidebar (Articles)">Right Sidebar (Articles)</option>
                  <option value="Inside Article (After 3rd Para)">Inside Article (After 3rd Para)</option>
                  <option value="Bottom of Homepage">Bottom of Homepage</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-2 font-bold">Devices</label>
                <div className="flex items-center gap-4 text-slate-700 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={devices.desktop}
                      onChange={(e) => setDevices({ ...devices, desktop: e.target.checked })}
                      className="rounded border-slate-300 text-[#eb1c24]"
                    />
                    <span>Desktop</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={devices.mobile}
                      onChange={(e) => setDevices({ ...devices, mobile: e.target.checked })}
                      className="rounded border-slate-300 text-[#eb1c24]"
                    />
                    <span>Mobile</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={devices.tablet}
                      onChange={(e) => setDevices({ ...devices, tablet: e.target.checked })}
                      className="rounded border-slate-300 text-[#eb1c24]"
                    />
                    <span>Tablet</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Targeting <span className="text-slate-400 font-normal">(Optional)</span></label>
                <select
                  value={targeting}
                  onChange={(e) => setTargeting(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer text-slate-500"
                >
                  <option value="">Select targeting</option>
                  <option value="Bangladesh Readers">Bangladesh Readers</option>
                  <option value="Global Visitors">Global Visitors</option>
                  <option value="Mobile Only">Mobile Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Scheduling */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              4. Scheduling
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Start Date <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="px-2.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">End Date <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="px-2.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="(GMT+06:00) Dhaka, Bangladesh">(GMT+06:00) Dhaka, Bangladesh</option>
                  <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="freqCap"
                checked={frequencyCap}
                onChange={(e) => setFrequencyCap(e.target.checked)}
                className="w-4 h-4 rounded text-[#eb1c24] cursor-pointer"
              />
              <label htmlFor="freqCap" className="text-xs font-bold text-slate-700 cursor-pointer">
                Set frequency cap (limit how often the ad is shown to the same user)
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Live Ad Preview, Summary & Quick Tips (~35% - lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-5">

          {/* 1. Ad Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900">Ad Preview</h3>

            {/* Desktop / Mobile Toggle Tabs */}
            <div className="flex border-b border-slate-100 text-xs font-extrabold">
              <button
                type="button"
                onClick={() => setPreviewTab('desktop')}
                className={`flex-1 py-2 text-center transition-colors cursor-pointer ${
                  previewTab === 'desktop' ? 'text-purple-700 border-b-2 border-purple-600' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Desktop Preview
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('mobile')}
                className={`flex-1 py-2 text-center transition-colors cursor-pointer ${
                  previewTab === 'mobile' ? 'text-purple-700 border-b-2 border-purple-600' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Mobile Preview
              </button>
            </div>

            {/* Banner Graphic Canvas Box */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest text-center block">
                TOP BANNER - 970 x 90
              </span>

              <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs relative overflow-hidden flex items-center justify-between">
                <div className="space-y-1 max-w-[65%] z-10">
                  <h4 className="font-black text-slate-900 text-sm leading-tight">
                    Stay Updated With Real News
                  </h4>
                  <p className="text-[10px] font-extrabold text-red-600 tracking-wider">
                    NIRBHIK BANGLA
                  </p>
                  <button type="button" className="mt-1 px-3 py-1 bg-[#eb1c24] text-white text-[10px] font-black rounded-lg shadow-2xs">
                    {customCta || ctaButton}
                  </button>
                </div>

                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-black text-xl border-2 border-white shadow-xs">
                  ন
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Info size={12} /> This is a preview. Actual appearance may vary based on placement.
            </p>
          </div>

          {/* 2. Ad Summary Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Ad Summary
            </h3>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-400">Ad Type:</span>
                <span className="font-bold text-slate-900">{adType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ad Format:</span>
                <span className="font-bold text-slate-900">{adFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Placement:</span>
                <span className="font-bold text-slate-900">{placement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Devices:</span>
                <span className="font-bold text-slate-900">Desktop, Mobile</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Start Date:</span>
                <span className="font-mono text-slate-900">May 21, 2024 10:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">End Date:</span>
                <span className="font-mono text-slate-900">May 28, 2024 11:59 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Status:</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md text-[10px] font-black">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Priority:</span>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md text-[10px] font-black">
                  {priority}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Quick Tips Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Quick Tips
            </h3>

            <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Use high quality images for better engagement.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Keep your ad message clear and concise.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Test different placements to find the most effective one.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Monitor ad performance regularly and optimize.</span>
              </li>
            </ul>
          </div>

        </div>

      </form>

    </div>
  );
}
