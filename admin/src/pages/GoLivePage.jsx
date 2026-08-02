import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Radio,
  Users,
  BarChart3,
  Clock,
  FileText,
  Play,
  Square,
  CheckCircle2,
  Globe,
  Plus,
  Send,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Download,
  Calendar,
  Activity,
  ArrowRight,
  Smile,
  Shield,
  ThumbsUp,
  Share2,
  UserCheck,
  Video,
  VideoOff,
  Camera,
  Mic,
  MicOff,
  Monitor,
  Disc,
} from 'lucide-react';

export default function GoLivePage() {
  const [toastMessage, setToastMessage] = useState('');
  const [isLive, setIsLive] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [liveStreamInfo, setLiveStreamInfo] = useState(null);
  const [liveSchedules, setLiveSchedules] = useState([]);

  // In-Browser Native Studio WebRTC States
  const [isStudioCamActive, setIsStudioCamActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isMicMuted, setIsMicMuted] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  const [stats, setStats] = useState(null);
  const [poll, setPoll] = useState(null);
  const [liveRecordings, setLiveRecordings] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    // Fetch live stream info and chat if active
    fetch(`${API_BASE_URL}/live-streams`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const activeStream = data.data.find(stream => stream.isLive) || data.data[0] || null;
          setLiveStreamInfo(activeStream);
          if (activeStream && typeof activeStream.isLive === 'boolean') {
            setIsLive(activeStream.isLive);
            // Fetch chat for this stream
            fetch(`${API_BASE_URL}/live-streams/${activeStream._id}/chat`)
              .then(res => res.json())
              .then(chatData => {
                if (chatData.success) setChatList(chatData.data);
              })
              .catch(err => console.error('Error fetching chat:', err));
          } else {
            setIsLive(false);
          }
        }
      })
      .catch(err => console.error('Error fetching live streams:', err));

    // Fetch schedules
    fetch(`${API_BASE_URL}/schedules`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setLiveSchedules(data.data);
        }
      })
      .catch(err => console.error('Error fetching schedules:', err));

    // Fetch Dashboard Stats (Requires Token)
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_BASE_URL}/analytics/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.data);
      })
      .catch(err => console.error('Error fetching stats:', err));
    }

    // Fetch Poll
    fetch(`${API_BASE_URL}/polls/active`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPoll(data.data);
      })
      .catch(err => console.error('Error fetching poll:', err));

    // Fetch Live Recordings
    fetch(`${API_BASE_URL}/videos/live-recordings`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setLiveRecordings(data.data);
      })
      .catch(err => console.error('Error fetching recordings:', err));

    // Fetch Highlights
    fetch(`${API_BASE_URL}/videos/highlights`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setHighlights(data.data);
      })
      .catch(err => console.error('Error fetching highlights:', err));
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim() || !liveStreamInfo?._id) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/live-streams/${liveStreamInfo._id}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderName: 'Super Admin', text: chatMessage.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setChatList([data.data, ...chatList]);
        setChatMessage('');
      }
    } catch (err) {
      console.error('Failed to post chat', err);
    }
  };

  const handleGoLiveToggle = async () => {
    if (!liveStreamInfo?._id) {
      showToast('No active stream configuration found!');
      return;
    }
    const newStatus = !isLive;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/live-streams/${liveStreamInfo._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: newStatus, isLive: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setIsLive(newStatus);
        showToast(newStatus ? 'ব্রডকাস্ট শুরু হয়েছে (LIVE)!' : 'ব্রডকাস্ট বন্ধ করা হয়েছে (OFFLINE)');
      } else {
        showToast('Error updating status');
      }
    } catch (err) {
      showToast('Failed to update live status');
    }
  };

  // WebRTC Native Studio Camera Controller
  const toggleStudioCam = async () => {
    if (isStudioCamActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsStudioCamActive(false);
      showToast('স্টুডিও ক্যামেরা অফ করা হয়েছে');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsStudioCamActive(true);
        showToast('স্টুডিও ক্যামেরা ও মাইক্রোফোন অন হয়েছে!');
      } catch (err) {
        console.error('Camera Access Error:', err);
        showToast('ক্যামেরা বা মাইক্রোফোন এক্সেস পাওয়া যায়নি!');
      }
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = isMicMuted;
        setIsMicMuted(!isMicMuted);
        showToast(!isMicMuted ? 'মাইক্রোফোন মিউট করা হলো' : 'মাইক্রোফোন আনমিউট করা হলো');
      }
    }
  };

  const startStudioRecording = () => {
    if (!streamRef.current) {
      showToast('আগে স্টুডিও ক্যামেরা অন করুন!');
      return;
    }

    try {
      recordedChunksRef.current = [];
      const options = { mimeType: 'video/webm;codecs=vp9,opus' };
      const recorder = new MediaRecorder(
        streamRef.current,
        MediaRecorder.isTypeSupported(options.mimeType) ? options : undefined
      );

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.start(1000); // chunk every 1 sec
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      showToast('🔴 স্টুডিও রেকর্ডিং শুরু হয়েছে!');
    } catch (err) {
      console.error('Recording error:', err);
      showToast('রেকর্ডিং শুরু করা যায়নি');
    }
  };

  const stopStudioRecordingAndSave = async () => {
    if (!mediaRecorderRef.current || !isRecording) return;

    mediaRecorderRef.current.stop();
    setIsRecording(false);
    clearInterval(timerIntervalRef.current);

    showToast('রেকর্ডিং প্রসেস হচ্ছে ও সেভ করা হচ্ছে...');

    setTimeout(async () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      
      // Auto register to recordings via API
      try {
        const formData = new FormData();
        const durationFormatted = `${Math.floor(recordingSeconds / 60)}:${recordingSeconds % 60 < 10 ? '0' : ''}${recordingSeconds % 60}`;
        
        // Save as Video
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/videos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            title: { bn: `Studio Recording ${new Date().toLocaleTimeString()}`, en: `Studio Recording ${new Date().toLocaleTimeString()}` },
            sourceType: 'local_upload',
            duration: durationFormatted,
            status: 'Published',
            category: 'Studio Live',
            tags: ['Live', 'Recording', 'Studio'],
            views: 0
          })
        });

        const data = await res.json();
        if (data.success) {
          showToast('✅ স্টুডিও রেকর্ডিং সেভ করে Recent Recordings-এ যুক্ত করা হয়েছে!');
          // Refresh recordings
          fetch(`${API_BASE_URL}/videos/live-recordings`)
            .then(res => res.json())
            .then(recData => { if (recData.success) setLiveRecordings(recData.data); });
        }
      } catch (err) {
        console.error('Failed to save studio recording:', err);
        showToast('রেকর্ডিং সেভ করতে ব্যর্থ হয়েছে');
      }
    }, 1200);
  };

  const formatRecordingTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
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

      {/* 1. Header & Primary Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Radio size={24} className={isLive ? "text-rose-600 animate-pulse" : "text-slate-400"} />
            <span>Live TV Dashboard</span>
          </h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">Manage live broadcasts, engage with audience, and monitor stream health</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            to="/live-streams"
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <Video size={14} className="text-slate-500" />
            <span>All Streams</span>
          </Link>

          <Link
            to="/schedule/create"
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <Calendar size={14} className="text-slate-500" />
            <span>Schedule Live</span>
          </Link>

          <button
            onClick={handleGoLiveToggle}
            className={`${isLive ? 'bg-slate-800 hover:bg-slate-900' : 'bg-[#eb1c24] hover:bg-red-700'} text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md ${isLive ? 'shadow-slate-500/20' : 'shadow-red-500/20'} transition-all cursor-pointer uppercase tracking-wider`}
          >
            {isLive ? <VideoOff size={15} /> : <Radio size={15} />}
            <span>{isLive ? 'End Stream' : 'Go Live Now'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top 6 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* Current Status */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Current Status</p>
            <h3 className={`text-sm font-black mt-0.5 flex items-center gap-1 ${isLive ? 'text-rose-600' : 'text-slate-500'}`}>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-rose-600 animate-ping' : 'bg-slate-500'}`} />
              {isLive ? 'LIVE' : 'OFFLINE'}
            </h3>
            <span className="text-[9.5px] font-bold text-slate-400">{isLive ? 'You are live now' : 'Stream is offline'}</span>
          </div>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isLive ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
            <Radio size={18} />
          </div>
        </div>

        {/* Current Viewers */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Video Views</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">
              {stats?.totalVideoViews?.toLocaleString() || '0'}
            </h3>
            <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp size={10} /> Live Data
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
        </div>

        {/* Peak Viewers */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Articles</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">
              {stats?.totalArticles?.toLocaleString() || '0'}
            </h3>
            <span className="text-[9.5px] font-bold text-slate-400">Total Published</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BarChart3 size={18} />
          </div>
        </div>

        {/* Watch Time */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Streams</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">
              {stats?.totalStreams || '0'}
            </h3>
            <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
              Platform wide
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Clock size={18} />
          </div>
        </div>

        {/* Total Broadcasts */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Broadcasts</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-outfit">
              {liveSchedules.filter(s => new Date(s.startDate).toDateString() === new Date().toDateString()).length}
            </h3>
            <span className="text-[9.5px] font-bold text-slate-400">Today</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileText size={18} />
          </div>
        </div>

        {/* Duration */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Duration</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5 font-mono">02:35:28</h3>
            <span className="text-[9.5px] font-bold text-slate-400">Live Since 06:45 PM</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* 3. Upper Grid (3 Columns: Current Live Stream, Stream Health, Live Chat) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Column 1: Native In-Browser Studio & Broadcast Feed (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Camera size={16} className="text-purple-600" />
                <span>Nirbhik Native Studio</span>
              </h3>
              {isRecording ? (
                <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse">
                  <Disc size={12} />
                  <span>REC {formatRecordingTime(recordingSeconds)}</span>
                </span>
              ) : (
                <span className="bg-slate-100 text-slate-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                  {isStudioCamActive ? 'CAM ACTIVE' : 'CAM OFFLINE'}
                </span>
              )}
            </div>

            {/* Studio Screen / Webcam Feed */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group bg-slate-950 min-h-[220px] flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isMicMuted}
                className={`w-full h-56 object-cover ${isStudioCamActive ? 'block' : 'hidden'}`}
              />

              {!isStudioCamActive && (
                <div className="text-center p-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <Camera size={22} />
                  </div>
                  <h4 className="text-white text-xs font-extrabold">In-Browser Studio Ready</h4>
                  <p className="text-slate-400 text-[11px] max-w-[220px] mx-auto">
                    Turn on camera to broadcast or record news directly from your browser without third-party software.
                  </p>
                </div>
              )}

              <span className={`absolute top-3 left-3 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-md ${isLive ? 'bg-[#eb1c24] animate-pulse' : 'bg-slate-800'}`}>
                {isLive ? 'LIVE' : 'OFFLINE'}
              </span>

              {/* Top-Right Channel Watermark Logo */}
              <div className="absolute top-3 right-3 z-10 bg-white/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 shadow-lg">
                <img
                  src="/images/logos/Nirbhik-Bangla-Logo-No-Bg.png"
                  alt="Nirbhik Bangla Logo"
                  className="h-7 w-auto object-contain filter drop-shadow-md"
                />
              </div>

              {/* Lower Third Ticker Banner */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 pt-6 text-white space-y-1">
                <div className="bg-[#eb1c24] text-white text-[10px] font-black px-2 py-0.5 rounded inline-block uppercase font-bangla">
                  {liveStreamInfo ? 'নির্ভীক বাংলা স্টুডিও' : 'বিশেষ কভারেজ'}
                </div>
                <p className="text-xs font-bold font-bangla truncate">
                  {typeof liveStreamInfo?.title === 'object' ? (liveStreamInfo.title.bn || liveStreamInfo.title.en) : (liveStreamInfo?.title || 'সরাসরি স্টুডিও ব্রডকাস্টের জন্য নির্ভীক বাংলায় চোখ রাখুন')}
                </p>
              </div>
            </div>

            {/* Studio Action Control Bar */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={toggleStudioCam}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                  isStudioCamActive
                    ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                    : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800'
                }`}
              >
                {isStudioCamActive ? <VideoOff size={14} /> : <Camera size={14} />}
                <span>{isStudioCamActive ? 'Turn Off Cam' : 'Turn On Cam'}</span>
              </button>

              <button
                type="button"
                onClick={toggleMic}
                disabled={!isStudioCamActive}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                  !isStudioCamActive
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : isMicMuted
                    ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {isMicMuted ? <MicOff size={14} /> : <Mic size={14} />}
                <span>{isMicMuted ? 'Unmute Mic' : 'Mute Mic'}</span>
              </button>

              {!isRecording ? (
                <button
                  type="button"
                  onClick={startStudioRecording}
                  disabled={!isStudioCamActive}
                  className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                    !isStudioCamActive
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 cursor-pointer'
                  }`}
                >
                  <Disc size={14} />
                  <span>Start Record</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopStudioRecordingAndSave}
                  className="py-2 px-3 bg-slate-900 hover:bg-black text-white text-xs font-black rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer animate-pulse"
                >
                  <Square size={14} />
                  <span>Stop & Save</span>
                </button>
              )}
            </div>

            {/* Stream Metadata Grid */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400 font-bold">Studio Mode</span>
                <span className="font-bangla font-black text-purple-700">Native Browser Studio</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Encoding Format</span>
                <span className="font-mono font-bold text-slate-800 text-[10px] uppercase">WebM / VP9 High-Def</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Auto Recording</span>
                <span className="font-bold text-emerald-600 text-[11px]">Enabled (Direct to Database)</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              if (liveStreamInfo?._id) {
                try {
                  const token = localStorage.getItem('token');
                  await fetch(`${API_BASE_URL}/live-streams/${liveStreamInfo._id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ isLive: false })
                  });
                } catch (error) {
                  console.error('Failed to end stream', error);
                }
              }
              setIsLive(false);
              showToast('লাইভ সম্প্রচার সফলভাবে সমাপ্ত করা হলো!');
            }}
            className="w-full py-2.5 bg-[#eb1c24] hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer uppercase tracking-wider"
          >
            <Square size={14} fill="white" />
            <span>End Stream</span>
          </button>
        </div>

        {/* Column 2: Stream Health & Real-time Metrics (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Stream Health</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                All systems normal
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-slate-400" />
                  <span>RTMP Connection</span>
                </div>
                <span className="font-bold text-emerald-600">Connected</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video size={15} className="text-slate-400" />
                  <span>Video Bitrate</span>
                </div>
                <span className="font-mono font-bold text-slate-900">6000 kbps</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-slate-400" />
                  <span>Dropped Frames</span>
                </div>
                <span className="font-mono font-bold text-emerald-600">0 (0%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 size={15} className="text-slate-400" />
                  <span>CPU Usage</span>
                </div>
                <span className="font-mono font-bold text-slate-900">23%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-slate-400" />
                  <span>Memory Usage</span>
                </div>
                <span className="font-mono font-bold text-slate-900">46%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-slate-400" />
                  <span>Latency</span>
                </div>
                <span className="font-mono font-bold text-emerald-600">2.3 sec</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={15} className="text-slate-400" />
                  <span>Network</span>
                </div>
                <span className="font-bold text-emerald-600">Excellent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Live Chat Panel (3 Cols) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <MessageSquare size={15} className="text-purple-600" />
              <span>Live Chat</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              🟢 1.2K Online
            </span>
          </div>

          {/* Chat Messages Stream */}
          <div className="space-y-2.5 overflow-y-auto max-h-56 pr-1 custom-scrollbar text-xs">
            {chatList.map((msg) => (
              <div key={msg._id || msg.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-[11px] font-bangla">{msg.senderName || msg.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (msg.time || '')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 font-bangla font-semibold leading-tight">{msg.text}</p>
                <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold pt-0.5">
                  <ThumbsUp size={10} className="text-purple-600" />
                  <span>{msg.likesCount ?? msg.likes ?? 0}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendChat} className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#eb1c24] font-bangla"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-[#eb1c24] text-white flex items-center justify-center shadow-2xs hover:bg-red-700 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </div>
            <span className="text-[9.5px] text-slate-400 font-semibold block text-center">
              ⏱ Slow Mode is ON
            </span>
          </form>
        </div>

      </div>

      {/* 4. Middle Row: Multi Platform, Stream Analytics, Live Poll, AI Live Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Widget 1: Multi Platform Streaming */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Multi Platform Streaming
          </h3>

          <div className="space-y-2.5 text-xs font-semibold">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <Globe size={15} className="text-purple-600" />
                <span className="font-bold text-slate-800">Website</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">LIVE</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-red-600 text-white font-black text-[9px] flex items-center justify-center">▶</span>
                <span className="font-bold text-slate-800">YouTube</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">LIVE</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">👁 8,542</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-blue-600 text-white font-black text-[9px] flex items-center justify-center">f</span>
                <span className="font-bold text-slate-800">Facebook</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">LIVE</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">👁 3,128</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-slate-900 text-white font-black text-[9px] flex items-center justify-center">𝕏</span>
                <span className="font-bold text-slate-800">X (Twitter)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded">LIVE</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">👁 1,245</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast('নতুন প্ল্যাটফর্ম যোগ করার উইন্ডো খোলা হলো!')}
            className="w-full py-2 bg-purple-50 text-purple-700 font-extrabold text-xs rounded-xl hover:bg-purple-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <Plus size={14} />
            <span>Add Platform</span>
          </button>
        </div>

        {/* Widget 2: Stream Analytics (Live) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Stream Analytics (Live)</h3>
            <button className="text-xs font-bold text-purple-700 hover:underline">View All Analytics →</button>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Live Viewers</span>
              <span className="font-mono text-purple-700 font-black">15,248</span>
            </div>
            {/* SVG Trend Wave */}
            <div className="w-full h-20 pt-1">
              <svg viewBox="0 0 300 80" className="w-full h-full">
                <path d="M0 60 Q 40 40, 80 50 T 160 20 T 240 10 T 300 40 L 300 80 L 0 80 Z" fill="rgba(147, 51, 234, 0.15)" />
                <path d="M0 60 Q 40 40, 80 50 T 160 20 T 240 10 T 300 40" fill="none" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1 text-[9.5px] font-bold text-slate-600 text-center pt-1 border-t border-slate-100">
            <div><span className="block font-mono font-black text-slate-900 text-xs">125h</span>Watch</div>
            <div><span className="block font-mono font-black text-slate-900 text-xs">8,654</span>Likes</div>
            <div><span className="block font-mono font-black text-slate-900 text-xs">2,356</span>Comments</div>
            <div><span className="block font-mono font-black text-slate-900 text-xs">1,248</span>Shares</div>
            <div><span className="block font-mono font-black text-slate-900 text-xs">345</span>Subs</div>
          </div>
        </div>

        {/* Widget 3: Live Poll */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Live Poll</h3>
            {poll?.isActive ? (
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-md">Active</span>
            ) : (
              <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-0.5 rounded-md">Closed</span>
            )}
          </div>

          {poll ? (
            <div className="space-y-2 text-xs font-semibold">
              <h4 className="font-bangla font-black text-slate-900 text-xs">{poll.question}</h4>
              
              {poll.options.map((opt, idx) => {
                const totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);
                const percent = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                return (
                  <div key={idx} className="space-y-1.5 cursor-pointer" onClick={() => {
                    fetch(`${API_BASE_URL}/polls/${poll._id}/vote`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ optionIndex: idx })
                    }).then(res => res.json()).then(data => {
                      if (data.success) setPoll(data.data);
                    });
                  }}>
                    <div className="flex justify-between text-[11px] font-bangla font-bold">
                      <span>{opt.text}</span>
                      <span className={`font-mono font-extrabold text-${opt.color || 'purple-600'}`}>{percent}% ({opt.votes})</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-${opt.color || 'purple-600'} rounded-full`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-bold text-xs">
              No active polls
            </div>
          )}

          <span className="text-[10px] text-slate-400 font-bold block pt-1 border-t border-slate-100">
            Total Votes: {poll ? poll.options.reduce((sum, o) => sum + (o.votes || 0), 0) : 0}
          </span>
        </div>

        {/* Widget 4: AI Live Tools (BETA) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <Sparkles size={15} className="text-purple-600" />
              <span>AI Live Tools</span>
            </h3>
            <span className="bg-purple-100 text-purple-700 text-[9px] font-black px-1.5 py-0.2 rounded">BETA</span>
          </div>

          <div className="space-y-2 text-xs font-semibold text-slate-700">
            <div className="flex justify-between items-center">
              <span>AI Live Captions</span>
              <span className="font-bold text-emerald-600">ON</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AI Translation (EN)</span>
              <span className="font-bold text-emerald-600">ON</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AI Translation (HI)</span>
              <span className="font-bold text-emerald-600">ON</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AI Highlights</span>
              <span className="font-bold text-amber-600 animate-pulse">Detecting...</span>
            </div>
            <div className="flex justify-between items-center">
              <span>AI Moderation</span>
              <span className="font-bold text-emerald-600">Active</span>
            </div>
          </div>

          <button
            onClick={() => showToast('AI ব্রডকাস্ট ডিরেক্টর খোলা হলো!')}
            className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1 mt-1"
          >
            <span>Open AI Broadcast Director</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* 5. Bottom Row (4 Cards Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Upcoming Scheduled Streams */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Upcoming Scheduled Streams</h3>
            <button className="text-[11px] font-bold text-purple-700 hover:underline">View All →</button>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            {liveSchedules.length > 0 ? (
              liveSchedules.slice(0, 3).map((item) => (
                <div key={item._id} className="p-2 rounded-xl bg-slate-50 space-y-0.5 border border-slate-200/50">
                  <h5 className="font-bangla font-black text-slate-900 text-xs">
                    {typeof item.title === 'object' ? (item.title.bn || item.title.en) : item.title}
                  </h5>
                  <span className="text-[9.5px] font-mono text-slate-400 block">{item.startTime || 'Scheduled'}</span>
                </div>
              ))
            ) : (
              [
                { title: 'বিশেষ সংবাদ বুলেটিন', time: 'Today - 07:00 PM' },
                { title: 'আন্তর্জাতিক সংবাদ', time: 'Today - 09:00 PM' },
              ].map((item, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-slate-50 space-y-0.5 border border-slate-200/50">
                  <h5 className="font-bangla font-black text-slate-900 text-xs">{item.title}</h5>
                  <span className="text-[9.5px] font-mono text-slate-400 block">{item.time}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Card 2: Recent Recordings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Recent Recordings</h3>
            <button className="text-[11px] font-bold text-purple-700 hover:underline">View All →</button>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            {liveRecordings.length > 0 ? liveRecordings.map((item) => (
              <div key={item._id} className="p-2 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-200/50">
                <h5 className="font-bangla font-black text-slate-900 text-xs truncate max-w-[150px]">
                  {typeof item.title === 'object' ? (item.title.bn || item.title.en) : item.title}
                </h5>
                <span className="text-[10px] font-mono font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {item.duration || '00:00'}
                </span>
              </div>
            )) : (
              <div className="text-center text-slate-400 py-2">No recordings found</div>
            )}
          </div>
        </div>

        {/* Card 3: AI Generated Highlights */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">AI Generated Highlights</h3>
            <button className="text-[11px] font-bold text-purple-700 hover:underline">View All →</button>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            {highlights.length > 0 ? highlights.map((item) => (
              <div key={item._id} className="p-2 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-200/50">
                <h5 className="font-extrabold text-slate-900 font-bangla text-xs truncate max-w-[130px]">
                  {typeof item.title === 'object' ? (item.title.bn || item.title.en) : item.title}
                </h5>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{item.duration || '00:00'}</span>
                  <button className="p-1 text-purple-700 hover:bg-purple-100 rounded cursor-pointer" title="Download Highlight">
                    <Download size={13} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center text-slate-400 py-2">No highlights available</div>
            )}
          </div>
        </div>

        {/* Card 4: Quick Stats */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">Platform Quick Stats</h3>
            <span className="text-[10px] font-bold text-slate-500">Live ˅</span>
          </div>

          <div className="space-y-2.5 text-xs font-semibold text-slate-700">
            <div className="flex justify-between items-center">
              <span>Total Broadcasts</span>
              <span className="font-mono font-black text-slate-900">{stats?.totalStreams || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Video Views</span>
              <span className="font-mono font-black text-slate-900">{stats?.totalVideoViews?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Article Views</span>
              <span className="font-mono font-black text-slate-900">{stats?.totalViews?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Published Articles</span>
              <span className="font-mono font-black text-slate-900">{stats?.totalArticles || 0}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
