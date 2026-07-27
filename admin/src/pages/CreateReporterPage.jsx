import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserPlus,
  ChevronRight,
  UploadCloud,
  CheckCircle2,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Check,
  Lightbulb,
  Save,
  RotateCcw,
  ArrowLeft,
  X,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export default function CreateReporterPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  // 1. Personal Info State
  const [fullName, setFullName] = useState('Md. Arif Hossain');
  const [email, setEmail] = useState('arif.hossain@example.com');
  const [phone, setPhone] = useState('+880 1712 345678');
  const [designation, setDesignation] = useState('Senior Reporter');
  const [employeeId, setEmployeeId] = useState('RB001');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1992-08-15');
  const [dateOfJoin, setDateOfJoin] = useState('2022-01-10');
  const [status, setStatus] = useState('Active');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');

  // 2. Professional Info State
  const [specialization, setSpecialization] = useState('Politics');
  const [experience, setExperience] = useState('5');
  const [primaryLocation, setPrimaryLocation] = useState('Dhaka, Bangladesh');
  const [shortBio, setShortBio] = useState('Experienced journalist with a strong background in politics and investigative reporting.');
  const [skills, setSkills] = useState(['Politics', 'Investigative Reporting', 'Breaking News']);
  const [skillInput, setSkillInput] = useState('');

  // 3. Social Links State
  const [fbUrl, setFbUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [ytUrl, setYtUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instaUrl, setInstaUrl] = useState('');

  // 4. Assignments & Permissions State
  const [assignedCats, setAssignedCats] = useState(['Politics', 'National', 'Election']);
  const [assignedLocs, setAssignedLocs] = useState(['Dhaka', 'Chattogram']);
  const [userRole, setUserRole] = useState('Reporter');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    showToast(`রিপোর্টার ${fullName} এর প্রোফাইল সফলভাবে তৈরি ও পাবলিশ করা হয়েছে!`);
    setTimeout(() => {
      navigate('/reporters');
    }, 1500);
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const removeCat = (catToRemove) => {
    setAssignedCats(assignedCats.filter((c) => c !== catToRemove));
  };

  const removeLoc = (locToRemove) => {
    setAssignedLocs(assignedLocs.filter((l) => l !== locToRemove));
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
        <Link to="/reporters" className="hover:text-slate-900 transition-colors">
          Reporters
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-900 font-extrabold">Add New Reporter</span>
      </div>

      {/* 1. Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <UserPlus size={22} className="text-purple-600" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-outfit">
              Add New Reporter
            </h1>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 font-outfit">
            Add a new reporter to your team and manage their profile and access.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          <button
            type="button"
            onClick={() => showToast('ড্রাফট সেভ করা হয়েছে!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => showToast('প্রোফাইল সেভ করে আরেকটি যোগ করার ফর্ম রিফ্রেশ করা হলো!')}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>+ Save & Add Another</span>
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="bg-[#eb1c24] hover:bg-red-700 text-white text-xs font-black px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <CheckCircle2 size={15} />
            <span>Publish Reporter</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column Form Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section 1: 1. Personal Information */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              1. Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs font-semibold">

              {/* Input Left Fields (8 Cols) */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Phone Number</label>
                  <div className="flex items-center gap-2">
                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 outline-none font-bold text-slate-700">
                      <option>🇧🇩 +880</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                    />
                  </div>
                </div>
              </div>

              {/* Photo Upload Box (4 Cols) */}
              <div className="md:col-span-4 border-2 border-dashed border-purple-200 bg-purple-50/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2">
                <label className="block text-slate-700 font-bold text-xs mb-1">Profile Image <span className="text-red-500">*</span></label>

                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-300 shadow-md">
                  <img src={profileImage} alt="" className="w-full h-full object-cover" />
                </div>

                <button
                  type="button"
                  onClick={() => showToast('নতুন ছবি নির্বাচন করুন!')}
                  className="px-3 py-1 bg-white border border-purple-200 text-purple-700 text-xs font-bold rounded-xl hover:bg-purple-50 shadow-2xs cursor-pointer flex items-center gap-1"
                >
                  <UploadCloud size={14} />
                  <span>Upload Photo</span>
                </button>

                <p className="text-[9.5px] text-slate-400 font-medium">
                  JPG, PNG or WEBP (Max: 5MB)
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold pt-2 border-t border-slate-100">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Designation / Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Senior Reporter"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Employee ID <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  placeholder="e.g. RB001"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold pt-1">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Date of Join</label>
                <input
                  type="date"
                  value={dateOfJoin}
                  onChange={(e) => setDateOfJoin(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Status <span className="text-red-500">*</span></label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer font-bold text-emerald-700"
                >
                  <option value="Active">● Active</option>
                  <option value="Inactive">● Inactive</option>
                  <option value="On Assignment">● On Assignment</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: 2. Professional Information */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              2. Professional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Specialization / Beat <span className="text-red-500">*</span></label>
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
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
                <label className="block text-slate-700 mb-1 font-bold">Experience (Years)</label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Primary Location <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Select location"
                    value={primaryLocation}
                    onChange={(e) => setPrimaryLocation(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold items-start pt-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">Short Bio <span className="text-red-500">*</span></label>
                  <span className="text-[10px] text-slate-400 font-mono">{shortBio.length}/500</span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Write a short bio about the reporter..."
                  value={shortBio}
                  onChange={(e) => setShortBio(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-slate-700 font-bold">Skills / Expertise <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  placeholder="Add skills and press Enter..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24]"
                />

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-extrabold px-2 py-0.5 rounded-lg flex items-center gap-1">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-600">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: 3. Social Links (Optional) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              3. Social Links <span className="text-slate-400 font-normal">(Optional)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs font-semibold">
              <div className="space-y-1">
                <label className="flex items-center gap-1 text-slate-700 font-bold">
                  <span className="w-4 h-4 rounded bg-blue-600 text-white font-black text-[9px] flex items-center justify-center">f</span>
                  <span>Facebook</span>
                </label>
                <input
                  type="text"
                  placeholder="Facebook profile URL"
                  value={fbUrl}
                  onChange={(e) => setFbUrl(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1 text-slate-700 font-bold">
                  <span className="w-4 h-4 rounded bg-slate-900 text-white font-black text-[9px] flex items-center justify-center">𝕏</span>
                  <span>Twitter / X</span>
                </label>
                <input
                  type="text"
                  placeholder="Twitter profile URL"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1 text-slate-700 font-bold">
                  <span className="w-4 h-4 rounded bg-red-600 text-white font-black text-[9px] flex items-center justify-center">▶</span>
                  <span>YouTube</span>
                </label>
                <input
                  type="text"
                  placeholder="YouTube channel URL"
                  value={ytUrl}
                  onChange={(e) => setYtUrl(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1 text-slate-700 font-bold">
                  <span className="w-4 h-4 rounded bg-blue-700 text-white font-black text-[9px] flex items-center justify-center">in</span>
                  <span>LinkedIn</span>
                </label>
                <input
                  type="text"
                  placeholder="LinkedIn profile URL"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24]"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-1 text-slate-700 font-bold">
                  <span className="w-4 h-4 rounded bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-black text-[9px] flex items-center justify-center">📷</span>
                  <span>Instagram</span>
                </label>
                <input
                  type="text"
                  placeholder="Instagram profile URL"
                  value={instaUrl}
                  onChange={(e) => setInstaUrl(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-[11px] outline-none focus:border-[#eb1c24]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: 4. Assignments & Permissions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              4. Assignments & Permissions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">Assign to Categories / Beats</label>
                <select className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer">
                  <option value="">Select categories</option>
                  <option value="Politics">Politics</option>
                  <option value="National">National</option>
                  <option value="Election">Election</option>
                </select>

                <div className="flex flex-wrap gap-1 pt-1">
                  {assignedCats.map((cat, i) => (
                    <span key={i} className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                      {cat}
                      <button type="button" onClick={() => removeCat(cat)} className="hover:text-red-600">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">Assign to Locations</label>
                <select className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer">
                  <option value="">Select locations</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                </select>

                <div className="flex flex-wrap gap-1 pt-1">
                  {assignedLocs.map((loc, i) => (
                    <span key={i} className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                      {loc}
                      <button type="button" onClick={() => removeLoc(loc)} className="hover:text-red-600">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">User Access & Permissions</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] cursor-pointer"
                >
                  <option value="Reporter">Reporter</option>
                  <option value="Senior Editor">Senior Editor</option>
                  <option value="Correspondent">Correspondent</option>
                </select>

                <div className="pt-1">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md inline-block">
                    {userRole}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">
                    Can create stories and upload media
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column Preview & Actions Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* 1. Reporter Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Reporter Preview
            </h3>

            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-200/70 text-center space-y-3">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-300 mx-auto shadow-md">
                <img src={profileImage} alt="" className="w-full h-full object-cover" />
              </div>

              <div>
                <h4 className="font-black text-slate-900 text-base leading-tight">{fullName || 'Reporter Name'}</h4>
                <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block mt-1">
                  {designation}
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-semibold text-slate-600 text-left pt-2 border-t border-purple-200/60">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-purple-600 shrink-0" />
                  <span className="truncate">{primaryLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-purple-600 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-purple-600 shrink-0" />
                  <span>{phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-200/60 flex items-center justify-center gap-1.5 text-[10px] font-bold text-purple-700">
                <span className="bg-purple-200/70 px-2 py-0.5 rounded-md">{specialization}</span>
                <span>•</span>
                <span className="bg-purple-200/70 px-2 py-0.5 rounded-md">{experience} yrs exp</span>
              </div>

              <p className="text-[11px] text-slate-500 font-medium italic text-left pt-1 line-clamp-3">
                "{shortBio}"
              </p>
            </div>
          </div>

          {/* 2. Quick Tips Card */}
          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-200/80 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-extrabold text-purple-900">
              <Lightbulb size={16} className="text-purple-600" />
              <span>Quick Tips</span>
            </div>

            <ul className="space-y-2 font-semibold text-purple-950 text-[11px]">
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Add a clear and professional profile photo.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Write a short bio to build credibility.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Assign relevant categories and locations.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-purple-600 shrink-0 mt-0.5" />
                <span>Set appropriate permissions for access.</span>
              </li>
            </ul>
          </div>

          {/* 3. Actions Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Actions
            </h3>

            <div className="space-y-2 text-xs font-bold text-slate-700">
              <button
                onClick={() => showToast('ড্রাফট সেভ করা হলো!')}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Save size={15} className="text-purple-600" />
                <span>Save as Draft</span>
              </button>

              <button
                onClick={() => {
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  showToast('ফর্ম রিসেট করা হলো!');
                }}
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw size={15} className="text-purple-600" />
                <span>Reset Form</span>
              </button>

              <Link
                to="/reporters"
                className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors cursor-pointer block"
              >
                <ArrowLeft size={15} className="text-purple-600" />
                <span>Back to Reporters</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
