import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import {
  UserPlus,
  ChevronRight,
  UploadCloud,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Check,
  Lightbulb,
  Save,
  RotateCcw,
  ArrowLeft,
  X,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function CreateReporterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit'); // edit mode when ?edit=reporterId
  const isEditMode = Boolean(editId);
  const avatarInputRef = useRef(null);

  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Custom country code dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Country codes list (India first as default)
  const COUNTRY_CODES = [
    { flag: '🇮🇳', iso: 'in', code: '+91',  name: 'India' },
    { flag: '🇧🇩', iso: 'bd', code: '+880', name: 'Bangladesh' },
    { flag: '🇵🇰', iso: 'pk', code: '+92',  name: 'Pakistan' },
    { flag: '🇳🇵', iso: 'np', code: '+977', name: 'Nepal' },
    { flag: '🇱🇰', iso: 'lk', code: '+94',  name: 'Sri Lanka' },
    { flag: '🇲🇲', iso: 'mm', code: '+95',  name: 'Myanmar' },
    { flag: '🇸🇦', iso: 'sa', code: '+966', name: 'Saudi Arabia' },
    { flag: '🇦🇪', iso: 'ae', code: '+971', name: 'UAE' },
    { flag: '🇬🇧', iso: 'gb', code: '+44',  name: 'UK' },
    { flag: '🇺🇸', iso: 'us', code: '+1',   name: 'USA' },
  ];

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [designation, setDesignation] = useState('Staff Reporter');
  const [employeeId, setEmployeeId] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [dateOfJoin, setDateOfJoin] = useState('');
  const [reporterStatus, setReporterStatus] = useState('Active');
  const [profileImage, setProfileImage] = useState('');

  const [specialization, setSpecialization] = useState('National');
  const [primaryLocation, setPrimaryLocation] = useState('West Bengal, India');
  const [shortBio, setShortBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const [userRole, setUserRole] = useState('Reporter');

  const [fbUrl, setFbUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [ytUrl, setYtUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instaUrl, setInstaUrl] = useState('');

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage({ text: '', type: 'success' }), 3500);
  };

  // Load existing reporter data in edit mode
  useEffect(() => {
    if (!isEditMode) return;
    const fetchReporter = async () => {
      try {
        setIsLoadingData(true);
        const res = await api.get(`/reporters/${editId}`);
        const r = res.data.data;
        setFullName(r.name || '');
        setEmail(r.email || '');
        // Parse phone: "+880 01700123456" → code="+880", number="01700123456"
        if (r.phone) {
          const knownCodes = ['+880','+91','+92','+977','+94','+95','+966','+971','+44','+1'];
          const matchedCode = knownCodes.find(c => r.phone.startsWith(c + ' '));
          if (matchedCode) {
            setCountryCode(matchedCode);
            setPhone(r.phone.slice(matchedCode.length + 1));
          } else {
            setPhone(r.phone);
          }
        }
        setDesignation(r.designation || 'Staff Reporter');
        setEmployeeId(r.employeeId || '');
        setGender(r.gender || 'Male');
        setDob(r.dateOfBirth ? r.dateOfBirth.split('T')[0] : '');
        setDateOfJoin(r.dateOfJoin ? r.dateOfJoin.split('T')[0] : '');
        setReporterStatus(r.reporterStatus || 'Active');
        setProfileImage(r.avatar || '');
        setSpecialization(r.specialization || 'National');
        setPrimaryLocation(r.location || 'Dhaka, Bangladesh');
        setShortBio(r.bio || '');
        setSkills(r.skills || []);
        setUserRole(r.role || 'Reporter');
        setFbUrl(r.socialLinks?.facebook || '');
        setTwitterUrl(r.socialLinks?.twitter || '');
        setYtUrl(r.socialLinks?.youtube || '');
        setLinkedinUrl(r.socialLinks?.linkedin || '');
        setInstaUrl(r.socialLinks?.instagram || '');
      } catch (err) {
        showToast('রিপোর্টারের তথ্য লোড করা যায়নি', 'error');
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchReporter();
  }, [editId, isEditMode]);

  // Avatar file picker & upload
  const handleAvatarClick = () => avatarInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('শুধুমাত্র ইমেজ ফাইল আপলোড করা যাবে', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('ফাইলের আকার ৫MB-এর বেশি হতে পারবে না', 'error');
      return;
    }

    // Optimistic local preview
    const localUrl = URL.createObjectURL(file);
    setProfileImage(localUrl);

    try {
      setAvatarUploading(true);
      const formData = new FormData();
      formData.append('avatar', file);
      if (editId) formData.append('reporterId', editId);

      const res = await api.post('/reporters/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const uploadedUrl = res.data.data?.url;
      if (uploadedUrl) {
        setProfileImage(uploadedUrl);
        showToast('ছবি সফলভাবে আপলোড হয়েছে!');
      }
    } catch (err) {
      showToast(err?.response?.data?.message || 'ছবি আপলোড করা যায়নি', 'error');
      setProfileImage(''); // revert
    } finally {
      setAvatarUploading(false);
      URL.revokeObjectURL(localUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      showToast('নাম ও ইমেইল আবশ্যক', 'error');
      return;
    }
    if (!isEditMode && !password) {
      showToast('নতুন রিপোর্টারের জন্য পাসওয়ার্ড দিতে হবে', 'error');
      return;
    }

    setIsSaving(true);
    const payload = {
      name: fullName,
      email,
      phone: phone ? `${countryCode} ${phone}` : '',
      role: userRole,
      designation,
      employeeId,
      gender,
      dateOfBirth: dob || undefined,
      dateOfJoin: dateOfJoin || undefined,
      reporterStatus,
      avatar: profileImage,
      specialization,
      location: primaryLocation,
      bio: shortBio,
      skills,
      socialLinks: {
        facebook: fbUrl,
        twitter: twitterUrl,
        youtube: ytUrl,
        linkedin: linkedinUrl,
        instagram: instaUrl,
      }
    };

    if (!isEditMode) payload.password = password;

    try {
      if (isEditMode) {
        await api.put(`/reporters/${editId}`, payload);
        showToast(`রিপোর্টার ${fullName} সফলভাবে আপডেট হয়েছে!`);
      } else {
        await api.post('/reporters', payload);
        showToast(`রিপোর্টার ${fullName} সফলভাবে তৈরি হয়েছে!`);
      }
      setTimeout(() => navigate('/reporters'), 1200);
    } catch (err) {
      showToast(err?.response?.data?.message || 'সংরক্ষণ করতে সমস্যা হয়েছে', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };
  const removeSkill = (s) => setSkills(skills.filter((sk) => sk !== s));

  const handleReset = () => {
    if (!isEditMode) {
      setFullName(''); setEmail(''); setPassword(''); setPhone('');
      setDesignation('Staff Reporter'); setEmployeeId(''); setGender('Male');
      setDob(''); setDateOfJoin(''); setReporterStatus('Active');
      setProfileImage(''); setSpecialization('National');
      setPrimaryLocation('Dhaka, Bangladesh'); setShortBio('');
      setSkills([]); setFbUrl(''); setTwitterUrl('');
      setYtUrl(''); setLinkedinUrl(''); setInstaUrl('');
      showToast('ফর্ম রিসেট করা হয়েছে!');
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <Loader2 size={36} className="animate-spin text-[#eb1c24] mx-auto" />
          <p className="text-sm font-bold text-slate-400">রিপোর্টারের তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-outfit text-slate-800 relative pb-12">

      {/* Toast */}
      {toastMessage.text && (
        <div className={`fixed top-20 right-6 z-50 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border ${toastMessage.type === 'error' ? 'bg-red-600 border-red-700' : 'bg-slate-900 border-slate-700'}`}>
          {toastMessage.type === 'error'
            ? <AlertCircle size={16} />
            : <CheckCircle2 size={16} className="text-emerald-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/reporters" className="hover:text-slate-900 transition-colors">Reporters</Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-extrabold">{isEditMode ? 'Edit Reporter' : 'Add New Reporter'}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <UserPlus size={22} className="text-purple-600" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {isEditMode ? `Edit: ${fullName}` : 'Add New Reporter'}
            </h1>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            {isEditMode ? 'Update reporter profile and permissions.' : 'Add a new reporter to your team.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-[#eb1c24] hover:bg-red-700 disabled:opacity-60 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            {isSaving
              ? <Loader2 size={15} className="animate-spin" />
              : <CheckCircle2 size={15} />}
            <span>{isSaving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Publish Reporter'}</span>
          </button>
        </div>
      </div>

      {/* Main Form Grid */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">

            {/* Section 1: Personal Info */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">1. Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs font-semibold">

                {/* Input Fields */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" required placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bold text-slate-900" />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" required placeholder="reporter@nirbhik.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]" />
                  </div>

                  {!isEditMode && (
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required={!isEditMode}
                          placeholder="Create a strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3.5 py-2 pr-10 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-slate-400 hover:text-slate-700">
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Phone Number</label>
                    <div className="flex items-center gap-1.5">
                      {/* Custom country code selector */}
                      <div className="relative shrink-0" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="h-9 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-2 hover:bg-slate-100/50 transition-colors"
                          style={{ minWidth: '95px' }}
                        >
                          <img
                            src={`https://flagcdn.com/w40/${COUNTRY_CODES.find(c => c.code === countryCode)?.iso}.png`}
                            alt=""
                            className="w-5 h-3.5 object-cover rounded-xs border border-slate-200 shrink-0"
                          />
                          <span>{countryCode}</span>
                        </button>
                        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▾</span>

                        {isDropdownOpen && (
                          <div className="absolute left-0 mt-1 w-52 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1 font-outfit text-xs">
                            {COUNTRY_CODES.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  setCountryCode(c.code);
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-3.5 transition-colors text-slate-700 hover:text-slate-900"
                              >
                                <img
                                  src={`https://flagcdn.com/w40/${c.iso}.png`}
                                  alt={c.name}
                                  className="w-5 h-3.5 object-cover rounded-xs border border-slate-200 shrink-0"
                                />
                                <span className="font-bold flex-1">{c.name}</span>
                                <span className="text-slate-400 font-mono font-bold">{c.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 h-9 px-3.5 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] text-xs"
                      />
                    </div>
                    {/* Hint showing full formatted number */}
                    {phone && (
                      <p className="text-[10px] text-slate-400 font-mono mt-1">
                        Will save as: {countryCode} {phone}
                      </p>
                    )}
                  </div>

                </div>

                {/* Avatar Upload Box */}
                <div className="md:col-span-4 border-2 border-dashed border-purple-200 bg-purple-50/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <label className="block text-slate-700 font-bold text-xs mb-1">Profile Photo</label>

                  <div
                    onClick={handleAvatarClick}
                    className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-300 shadow-md cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    {profileImage ? (
                      <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-500">
                        <UploadCloud size={24} />
                      </div>
                    )}
                    {avatarUploading && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <Loader2 size={20} className="animate-spin text-[#eb1c24]" />
                      </div>
                    )}
                  </div>

                  <input type="file" ref={avatarInputRef} accept="image/*" className="hidden" onChange={handleAvatarChange} />

                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    disabled={avatarUploading}
                    className="px-3 py-1 bg-white border border-purple-200 text-purple-700 text-xs font-bold rounded-xl hover:bg-purple-50 shadow-2xs cursor-pointer flex items-center gap-1 disabled:opacity-50"
                  >
                    <UploadCloud size={14} />
                    <span>{avatarUploading ? 'Uploading...' : 'Upload Photo'}</span>
                  </button>

                  <p className="text-[9.5px] text-slate-400 font-medium">JPG, PNG or WEBP (Max: 5MB)</p>

                  {profileImage && !avatarUploading && (
                    <button type="button" onClick={() => setProfileImage('')} className="text-[10px] text-red-500 hover:underline font-semibold">
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Designation <span className="text-red-500">*</span></label>
                  <select value={designation} onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer">
                    <option>Staff Reporter</option>
                    <option>Senior Reporter</option>
                    <option>Chief Reporter</option>
                    <option>District Correspondent</option>
                    <option>Photo Journalist</option>
                    <option>Video Journalist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Employee ID</label>
                  <input type="text" placeholder="e.g. RB001" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono" />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Date of Birth</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold pt-1">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Date of Join</label>
                  <input type="date" value={dateOfJoin} onChange={(e) => setDateOfJoin(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]" />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Status <span className="text-red-500">*</span></label>
                  <select value={reporterStatus} onChange={(e) => setReporterStatus(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer font-bold text-emerald-700">
                    <option value="Active">● Active</option>
                    <option value="On Assignment">● On Assignment</option>
                    <option value="Inactive">● Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Professional Info */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">2. Professional Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Specialization <span className="text-red-500">*</span></label>
                  <select value={specialization} onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer">
                    {['Politics','Crime','Education','Health','Sports','Business','Environment','Culture','Technology','International','National'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">User Role <span className="text-red-500">*</span></label>
                  <select value={userRole} onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer">
                    <option value="Reporter">Reporter</option>
                    <option value="Senior Reporter">Senior Reporter</option>
                    <option value="Chief Reporter">Chief Reporter</option>
                    <option value="District Correspondent">District Correspondent</option>
                    <option value="Photo Journalist">Photo Journalist</option>
                    <option value="Video Journalist">Video Journalist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Primary Location <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-2.5 text-slate-400" />
                    <input type="text" placeholder="e.g. Dhaka, Bangladesh" value={primaryLocation} onChange={(e) => setPrimaryLocation(e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold items-start pt-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-700 font-bold">Short Bio</label>
                    <span className="text-[10px] text-slate-400 font-mono">{shortBio.length}/500</span>
                  </div>
                  <textarea rows={4} maxLength={500} placeholder="Write a short bio..." value={shortBio} onChange={(e) => setShortBio(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-700 font-bold">Skills / Expertise</label>
                  <input type="text" placeholder="Add skill and press Enter..." value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={addSkill}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]" />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-extrabold px-2 py-0.5 rounded-lg flex items-center gap-1">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-600"><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Social Links */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">3. Social Links <span className="text-slate-400 font-normal">(Optional)</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs font-semibold">
                {[
                  { label: 'Facebook', icon: 'f', bg: 'bg-blue-600', val: fbUrl, set: setFbUrl, ph: 'facebook.com/...' },
                  { label: 'Twitter / X', icon: '𝕏', bg: 'bg-slate-900', val: twitterUrl, set: setTwitterUrl, ph: 'twitter.com/...' },
                  { label: 'YouTube', icon: '▶', bg: 'bg-red-600', val: ytUrl, set: setYtUrl, ph: 'youtube.com/...' },
                  { label: 'LinkedIn', icon: 'in', bg: 'bg-blue-700', val: linkedinUrl, set: setLinkedinUrl, ph: 'linkedin.com/...' },
                  { label: 'Instagram', icon: '📷', bg: 'bg-gradient-to-tr from-amber-500 to-purple-600', val: instaUrl, set: setInstaUrl, ph: 'instagram.com/...' },
                ].map(({ label, icon, bg, val, set, ph }) => (
                  <div key={label} className="space-y-1">
                    <label className="flex items-center gap-1 text-slate-700 font-bold">
                      <span className={`w-4 h-4 rounded ${bg} text-white font-black text-[9px] flex items-center justify-center`}>{icon}</span>
                      <span>{label}</span>
                    </label>
                    <input type="text" placeholder={ph} value={val} onChange={(e) => set(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Preview + Actions */}
          <div className="lg:col-span-4 space-y-6">

            {/* Reporter Preview Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">Reporter Preview</h3>
              <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-200/70 text-center space-y-3">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-300 mx-auto shadow-md">
                  {profileImage ? (
                    <img src={profileImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-purple-100 flex items-center justify-center text-2xl font-black text-purple-400">
                      {fullName?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base leading-tight">{fullName || 'Reporter Name'}</h4>
                  <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block mt-1">{designation}</span>
                </div>
                <div className="space-y-1.5 text-xs font-semibold text-slate-600 text-left pt-2 border-t border-purple-200/60">
                  <div className="flex items-center gap-2"><MapPin size={13} className="text-purple-600 shrink-0" /><span className="truncate">{primaryLocation}</span></div>
                  <div className="flex items-center gap-2"><Mail size={13} className="text-purple-600 shrink-0" /><span className="truncate">{email || 'email@nirbhik.com'}</span></div>
                  {phone && <div className="flex items-center gap-2"><Phone size={13} className="text-purple-600 shrink-0" /><span>{phone}</span></div>}
                </div>
                <div className="pt-2 border-t border-purple-200/60 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-bold text-purple-700">
                  <span className="bg-purple-200/70 px-2 py-0.5 rounded-md">{specialization}</span>
                  <span className="bg-purple-200/70 px-2 py-0.5 rounded-md">{reporterStatus}</span>
                </div>
                {shortBio && <p className="text-[11px] text-slate-500 font-medium italic text-left pt-1 line-clamp-3">"{shortBio}"</p>}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-200/80 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-extrabold text-purple-900">
                <Lightbulb size={16} className="text-purple-600" /> <span>Quick Tips</span>
              </div>
              <ul className="space-y-2 font-semibold text-purple-950 text-[11px]">
                {['Add a clear, professional profile photo.','Write a short bio to build credibility.','Assign the correct role for access control.','Set the status correctly on creation.'].map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check size={14} className="text-purple-600 shrink-0 mt-0.5" /><span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">Actions</h3>
              <div className="space-y-2 text-xs font-bold text-slate-700">
                <button type="submit" disabled={isSaving}
                  className="w-full p-2.5 bg-[#eb1c24] hover:bg-red-700 disabled:opacity-50 text-white rounded-xl flex items-center gap-2 justify-center cursor-pointer transition-colors font-extrabold uppercase tracking-wider">
                  {isSaving ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
                  {isSaving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Publish Reporter'}
                </button>

                {!isEditMode && (
                  <button type="button" onClick={handleReset}
                    className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center gap-2 transition-colors cursor-pointer">
                    <RotateCcw size={15} className="text-purple-600" /> <span>Reset Form</span>
                  </button>
                )}

                <Link to="/reporters" className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer block">
                  <ArrowLeft size={15} className="text-purple-600" /> <span>Back to Reporters</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
