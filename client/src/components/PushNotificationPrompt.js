'use client';

import { useState, useEffect } from 'react';
import { Bell, X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { API_BASE_URL } from '@/utils/config';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushNotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    // Check existing permission
    if (Notification.permission === 'granted') {
      registerServiceWorker();
      return;
    }

    if (Notification.permission === 'default') {
      const dismissed = localStorage.getItem('nirbhik_push_prompt_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => setShowPrompt(true), 4000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      return await navigator.serviceWorker.register('/sw.js');
    } catch (err) {
      console.error('Service Worker registration error:', err);
    }
  };

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setShowPrompt(false);
        localStorage.setItem('nirbhik_push_prompt_dismissed', 'true');
        return;
      }

      const swReg = await registerServiceWorker();
      if (!swReg) return;

      // Fetch VAPID Public Key from server
      const keyRes = await fetch(`${API_BASE_URL}/notifications/vapid-public-key`);
      const keyData = await keyRes.json();
      const vapidPublicKey = keyData.data?.publicKey;

      if (!vapidPublicKey) {
        console.error('VAPID key not available');
        return;
      }

      const convertedKey = urlBase64ToUint8Array(vapidPublicKey);
      let subscription = await swReg.pushManager.getSubscription();

      if (!subscription) {
        subscription = await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey
        });
      }

      // Send Subscription to backend
      const res = await fetch(`${API_BASE_URL}/notifications/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription })
      });

      if (res.ok) {
        setSubscribedSuccess(true);
        setTimeout(() => setShowPrompt(false), 3000);
      }
    } catch (err) {
      console.error('Push Subscription error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('nirbhik_push_prompt_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-3 md:left-6 z-50 max-w-sm w-[calc(100%-24px)] bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-red-500/30 font-outfit animate-bounce-in">
      <button
        onClick={handleDismiss}
        className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>

      {subscribedSuccess ? (
        <div className="flex items-center gap-3 py-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-white">ধন্যবাদ!</h4>
            <p className="text-[11px] text-emerald-300 font-medium mt-0.5">আপনি সফলভাবে পুশ নোটিফিকেশন সাবস্ক্রাইব করেছেন।</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d70b18] text-white flex items-center justify-center shrink-0 shadow-md">
              <Bell size={20} className="animate-pulse" />
            </div>
            <div>
              <h4 className="font-black text-xs md:text-sm text-white flex items-center gap-1.5">
                <span>ব্রেকিং নিউজ আপডেট পান</span>
                <ShieldCheck size={14} className="text-red-400" />
              </h4>
              <p className="text-[11px] text-slate-300 font-medium leading-tight mt-1">
                পশ্চিমবঙ্গ, দেশ ও বিদেশের তাজা খবর এবং লাইভ ভিডিওর তাত্ক্ষণিক অ্যালার্ট পান ব্রাউজারে।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="flex-1 bg-[#d70b18] hover:bg-red-700 text-white text-xs font-extrabold py-2 px-3 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {loading ? 'প্রসেসিং হচ্ছে...' : 'অনুমতি দিন (Allow)'}
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              পরে দেখুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
