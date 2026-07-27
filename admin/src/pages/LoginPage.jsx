import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Newspaper,
  Shield,
  Users,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      showToast('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // If already logged in, redirect
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-3 sm:p-6 md:p-10 font-outfit text-slate-800 relative">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. DESKTOP VIEW (lg:grid) - 100% UNCHANGED DESKTOP DESIGN */}
      {/* ========================================================= */}
      <div className="hidden lg:grid w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid-cols-12 min-h-[640px] border border-slate-200/80">

        {/* Left Hero & Branding Section (5 Cols) */}
        <div className="col-span-5 bg-gradient-to-br from-[#800000] via-[#8B0000] to-[#3a0000] p-8 md:p-10 text-white relative flex flex-col justify-between overflow-hidden">
          
          {/* Generated Background Image */}
          <img
            src="/login_hero_bg.png"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 pointer-events-none"
          />

          {/* Dark Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#800000]/40 to-[#800000]/70 pointer-events-none" />

          {/* Subtle Concentric Rings & Glow Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-900/20 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              {/* Original Lion Logo emblem */}
              <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-xl shrink-0 overflow-hidden border-2 border-white/80">
                <img
                  src="/images/logos/Nirbhik-Bangla-Icon.png"
                  alt="Nirbhik Bangla Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight leading-none text-white font-outfit uppercase">
                  NIRBHIK <span className="text-red-500">BANGLA</span>
                </h2>
                <span className="text-[9px] font-extrabold tracking-widest text-slate-300 block mt-1 uppercase">
                  FRIENDS OF NEWS —
                </span>
              </div>
            </div>

            {/* Taglines */}
            <div className="space-y-3 pt-4">
              <h1 className="text-3xl md:text-4xl font-black font-bangla leading-tight">
                <span className="block text-white">নির্ভীক কণ্ঠ,</span>
                <span className="block text-[#ff3b42]">সত্যের পথ</span>
              </h1>
              <p className="text-xs font-bangla text-slate-300 font-medium leading-relaxed max-w-sm">
                সত্য, সাহস আর জনগণের পক্ষে আমরাই নির্ভীক বাংলা।
              </p>
            </div>
          </div>

          {/* Bottom City Silhouette & Crowd Illustration Mockup */}
          <div className="relative z-10 pt-12 space-y-6">
            <div className="w-full h-16 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-2 opacity-60">
              <div className="text-[10px] font-mono text-red-200/60 font-bold tracking-widest">
                🏙 🏛 🏙 🏛 🏙 🏛 🏙 🏛 🏙 🏛
              </div>
            </div>

            {/* 3 Feature Badges */}
            <div className="grid grid-cols-3 gap-2 text-center border-t border-red-500/30 pt-4 font-outfit">
              <div className="space-y-1 flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Newspaper size={16} />
                </div>
                <h5 className="text-[10px] font-bold text-white">Trusted News</h5>
                <span className="text-[8.5px] font-bangla text-slate-300 block">সত্য ও নির্ভরযোগ্য খবর</span>
              </div>

              <div className="space-y-1 flex flex-col items-center border-x border-red-500/20 px-1">
                <div className="w-8 h-8 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Shield size={16} />
                </div>
                <h5 className="text-[10px] font-bold text-white">Bold & Fearless</h5>
                <span className="text-[8.5px] font-bangla text-slate-300 block">নির্ভীক ও সাহসী প্রতিবেদন</span>
              </div>

              <div className="space-y-1 flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Users size={16} />
                </div>
                <h5 className="text-[10px] font-bold text-white">For The People</h5>
                <span className="text-[8.5px] font-bangla text-slate-300 block">জনগণের জন্য, জনগণের পাশে</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Form Section (7 Cols) */}
        <div className="col-span-7 p-8 md:p-12 flex flex-col justify-between bg-white relative">

          {/* Main Form Content */}
          <div className="max-w-md mx-auto w-full space-y-6 my-auto py-4">

            {/* Form Title */}
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-outfit">
                Welcome Back!
              </h2>
              <p className="text-xs font-semibold text-slate-500 font-outfit">
                Login to continue to your account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs font-semibold">

              {/* Email Input */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Email Address</label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Password</label>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-3.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 transition-all font-medium text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs font-bold pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#eb1c24] focus:ring-red-500"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => showToast('Password recovery link sent to your email!')}
                  className="text-[#eb1c24] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#eb1c24] hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black text-xs rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider mt-2"
              >
                <LogIn size={16} />
                <span>{isLoading ? 'Logging in...' : 'Login'}</span>
              </button>

            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 absolute">
                or continue with
              </span>
            </div>

            {/* Social Login Buttons (3 Buttons Grid) */}
            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => showToast('Google login simulation...')}
                className="py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Google</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => showToast('Facebook login simulation...')}
                className="py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4 text-[#1877F2] fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => showToast('Apple login simulation...')}
                className="py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4 text-slate-900 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.66-.82 1.12-1.96.99-3.1-.96.04-2.15.65-2.83 1.45-.6.69-1.13 1.83-.98 2.94 1.08.08 2.19-.48 2.82-1.29z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Sign Up Footer */}
            <div className="text-center text-xs font-semibold text-slate-500 pt-2">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => showToast('Redirecting to sign up...')}
                className="text-[#eb1c24] font-black hover:underline cursor-pointer ml-1"
              >
                Sign Up
              </button>
            </div>

          </div>

          {/* Footer Copyright */}
          <div className="text-center text-[11px] font-semibold text-slate-400 pt-4">
            © 2024 Nirbhik Bangla. All rights reserved.
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE VIEW (lg:hidden) - EXACT MATCH TO REFERENCE UI  */}
      {/* ========================================================= */}
      <div className="lg:hidden w-full max-w-md mx-auto flex flex-col justify-between min-h-screen py-6 px-2 space-y-6 relative">

        {/* Centered Top Branding Header */}
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          {/* Centered Red Lion Logo */}
          <div className="w-20 h-20 rounded-full bg-white p-1 shadow-xl border-2 border-red-500/20 flex items-center justify-center shrink-0">
            <img
              src="/images/logos/Nirbhik-Bangla-Icon.png"
              alt="Nirbhik Bangla Emblem"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          {/* Brand Name Text */}
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight leading-none font-outfit uppercase">
              <span className="text-slate-900">NIRBHIK </span>
              <span className="text-[#eb1c24]">BANGLA</span>
            </h1>
            <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
              — FRIENDS OF NEWS —
            </p>
          </div>

          {/* Bengali Tagline */}
          <div className="space-y-1 pt-1">
            <h2 className="text-xl font-black font-bangla">
              <span className="text-slate-900">নির্ভীক কণ্ঠ, </span>
              <span className="text-[#eb1c24]">সত্যের পথ</span>
            </h2>
            <p className="text-xs font-bangla text-slate-500 font-semibold max-w-xs mx-auto leading-relaxed">
              সত্য, সাহস আর জনগণের পক্ষে আমরাই নির্ভীক বাংলা।
            </p>
          </div>
        </div>

        {/* Centered Floating White Card (Login Form) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100/80 space-y-5 my-auto">

          {/* Card Title */}
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black text-slate-900 font-outfit">
              Welcome Back!
            </h3>
            <p className="text-xs text-slate-500 font-semibold font-outfit">
              Login to continue to your account
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs font-semibold font-outfit">

            {/* Email Field */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#eb1c24] focus:ring-2 focus:ring-red-100 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#eb1c24] focus:ring-red-500"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => showToast('Password recovery link sent to your email!')}
                className="text-[#eb1c24] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 text-[11px] font-bold p-3 rounded-xl border border-red-200 mt-2">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#eb1c24] hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black text-[11px] rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider mt-2"
              >
                <LogIn size={15} />
                <span>{isLoading ? 'Logging in...' : 'Login'}</span>
              </button>

          </form>

          {/* Or Continue Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 absolute font-outfit">
              or continue with
            </span>
          </div>

          {/* Social Login 3 Buttons */}
          <div className="grid grid-cols-3 gap-2.5 font-outfit">
            <button
              type="button"
              onClick={() => showToast('Google login simulation...')}
              className="py-2.5 px-2 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Facebook login simulation...')}
              className="py-2.5 px-2 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4 text-[#1877F2] fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Apple login simulation...')}
              className="py-2.5 px-2 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4 text-slate-900 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.66-.82 1.12-1.96.99-3.1-.96.04-2.15.65-2.83 1.45-.6.69-1.13 1.83-.98 2.94 1.08.08 2.19-.48 2.82-1.29z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-xs font-semibold text-slate-500 pt-1 font-outfit">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => showToast('Redirecting to sign up...')}
              className="text-[#eb1c24] font-black hover:underline cursor-pointer ml-1 font-outfit"
            >
              Sign Up
            </button>
          </div>

        </div>

        {/* Bottom Red City Skyline & Crowd Background Illustration */}
        <div className="relative pt-6 pb-2 text-center space-y-3 font-outfit">
          <div className="w-full h-24 bg-gradient-to-t from-red-600/30 via-red-500/10 to-transparent flex items-end justify-center rounded-b-3xl overflow-hidden pointer-events-none">
            <div className="text-xs font-mono text-red-600/50 font-black tracking-widest uppercase">
              🏙 🏛 🏙 🏛 🏙 🏛 🏙 🏛 🏙 🏛 🏙
            </div>
          </div>

          {/* Mobile Footer Copyright */}
          <div className="text-center text-[10.5px] font-semibold text-slate-500 font-outfit">
            © 2024 Nirbhik Bangla. All rights reserved.
          </div>
        </div>

      </div>

    </div>
  );
}
