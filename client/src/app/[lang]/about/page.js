'use client';

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { ShieldCheck, Target, Award, Users, Globe, Building, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const { locale } = useLanguage();

  const content = {
    en: {
      title: 'About Nirbhik Bangla',
      subtitle: 'Fearless Journalism • Trusted Information • Multilingual News Platform',
      intro: 'Nirbhik Bangla is a premier digital news organization dedicated to delivering unbiased, transparent, and fearless journalism. Headquartered in West Bengal, India, we provide round-the-clock news coverage spanning politics, local state news, national developments, international affairs, sports, and live broadcasting.',
      missionTitle: 'Our Mission & Vision',
      missionText: 'Our primary objective is to empower citizens with accurate, verified, and timely news. We strictly adhere to journalistic ethics, ensuring that truth and public interest remain at the heart of everything we report.',
      valuesTitle: 'Our Core Values',
      values: [
        { icon: ShieldCheck, title: 'Unbiased Integrity', desc: 'Independent reporting free from political or commercial influence.' },
        { icon: Target, title: 'Fact-Checked Accuracy', desc: 'Rigorous multi-layer verification before any story is published.' },
        { icon: Globe, title: 'Multilingual Reach', desc: 'Publishing simultaneously in Bengali, English, and Hindi.' },
        { icon: Sparkles, title: 'AI-Enhanced Delivery', desc: 'Leveraging cutting-edge digital tech for ultra-fast news delivery.' },
      ],
      stats: [
        { num: '24/7', label: 'Live Coverage' },
        { num: '3+', label: 'Languages' },
        { num: '100%', label: 'Fact-Checked News' },
        { num: '1M+', label: 'Monthly Readers' }
      ],
      addressTitle: 'Newsroom & Office Headquarters (Editor: Amar Deb)',
      addressText: 'NH19, ASANSOL, KALIPHARI, PASCHIM BURDWAN, WEST BENGAL, PIN 713303',
      bureauText: 'Editor: AMAR DEB | Regional Bureau: Asansol & Paschim Bardhaman, West Bengal',
      email: 'nirvikbanglaportal@gmail.com',
      phone: '033-68288835',
      whatsapp: '+91 8653446874'
    },
    bn: {
      title: 'নির্ভীক বাংলা সম্পর্কে',
      subtitle: 'নির্ভীক সাংবাদিকতা • বিশ্বস্ত তথ্য • বহুমাত্রিক ডিজিটাল নিউজ প্ল্যাটফর্ম',
      intro: 'নির্ভীক বাংলা (Nirbhik Bangla) একটি স্বনামধন্য ডিজিটাল সংবাদ মাধ্যম, যা সত্য, নিরপেক্ষ ও নির্ভীক সংবাদ পরিবেশনে বদ্ধপরিকর। পশ্চিমবঙ্গ ভিত্তিক এই পোর্টাল থেকে রাজনীতি, রাজ্য, জাতীয়, আন্তর্জাতিক খবর, খেলাধুলা ও ২৪x৭ লাইভ টিভি প্রচার করা হয়।',
      missionTitle: 'আমাদের লক্ষ্য ও উদ্দেশ্য',
      missionText: 'আমাদের প্রধান লক্ষ্য সাধারণ মানুষকে সঠিক ও যাচাইকৃত সংবাদ দ্রুত পৌঁছে দেওয়া। সাংবাদিকতার নীতিমালা ও বস্তুনিষ্ঠতা বজায় রেখে জনগণের কণ্ঠস্বর হয়ে ওঠাই আমাদের অঙ্গীকার।',
      valuesTitle: 'আমাদের মূল স্তম্ভসমূহ',
      values: [
        { icon: ShieldCheck, title: 'সম্পূর্ণ নিরপেক্ষতা', desc: 'রাজনৈতিক বা বাণিজ্যিক প্রভাবমুক্ত স্বাধীন সাংবাদিকতা।' },
        { icon: Target, title: 'যাচাইকৃত সঠিক তথ্য', desc: 'সংবাদ প্রকাশের পূর্বে কঠোর ফ্যাক্ট-চেকিং প্রক্রিয়া।' },
        { icon: Globe, title: 'বহুভাষিক প্রচার', desc: 'বাংলা, ইংরেজি ও হিন্দি ভাষায় সমানভাবে সংবাদ পরিবেশন।' },
        { icon: Sparkles, title: 'আধুনিক এআই প্রযুক্তি', desc: 'দ্রুততম সংবাদ পরিবেশনে সর্বাধুনিক ডিজিটাল প্রযুক্তির ব্যবহার।' },
      ],
      stats: [
        { num: '২৪/৭', label: 'লাইভ সংবাদ' },
        { num: '৩+', label: 'ভাষায় সম্প্রচার' },
        { num: '১০০%', label: 'সত্য ও সততা' },
        { num: '১০ লাখ+', label: 'মাসিক পাঠক' }
      ],
      addressTitle: 'নিউজডেস্ক ও প্রধান কার্যালয় (সম্পাদক: অমর দেব)',
      addressText: 'NH19, আসানসোল, কালিপাহাড়ী, পশ্চিম বর্ধমান, পশ্চিমবঙ্গ, পিন ৭১৩৩০৩',
      bureauText: 'সম্পাদক: অমর দেব | প্রধান কার্যালয়: আসানসোল, পশ্চিম বর্ধমান',
      email: 'nirvikbanglaportal@gmail.com',
      phone: '033-68288835',
      whatsapp: '+91 8653446874'
    },
    hi: {
      title: 'निर्भीक बांग्ला के बारे में',
      subtitle: 'निर्भीक पत्रकारिता • विश्वसनीय जानकारी • बहुभाषी डिजिटल समाचार मंच',
      intro: 'निर्भीक बांग्ला (Nirbhik Bangla) एक प्रमुख डिजिटल समाचार संगठन है जो निष्पक्ष, पारदर्शी और निर्भीक पत्रकारिता के लिए समर्पित है। पश्चिम बंगाल से संचालित, हम राजनीति, राज्य, राष्ट्रीय, खेल और 24x7 लाइव प्रसारण की लाइव कवरेज प्रदान करते हैं।',
      missionTitle: 'हमारा मिशन और दृष्टिकोण',
      missionText: 'हमारा प्राथमिक उद्देश्य नागरिकों को सटीक और सत्यापित समाचार प्रदान करना है। हम पत्रकारिता के नैतिकता और जनहित के सिद्धांतों का कड़ाई से पालन करते हैं।',
      valuesTitle: 'हमारे मुख्य मूल्य',
      values: [
        { icon: ShieldCheck, title: 'निष्पक्ष पत्रकारिता', desc: 'राजनीतिक या व्यावसायिक प्रभाव से मुक्त स्वतंत्र रिपोर्टिंग।' },
        { icon: Target, title: 'सत्यापित सटीकता', desc: 'प्रकाशन से पहले सख्त तथ्य-जांच प्रक्रिया।' },
        { icon: Globe, title: 'बहुभाषी पहुंच', desc: 'बांग्ला, अंग्रेजी और हिंदी में एक साथ प्रकाशन।' },
        { icon: Sparkles, title: 'एआई संचालित तकनीक', desc: 'तेज समाचार वितरण के लिए नवीनतम डिजिटल तकनीक।' },
      ],
      stats: [
        { num: '24/7', label: 'लाइव कवरेज' },
        { num: '3+', label: 'भाषाएं' },
        { num: '100%', label: 'सत्यापित खबरें' },
        { num: '10 लाख+', label: 'मासिक पाठक' }
      ],
      addressTitle: 'समाचार कार्यालय और मुख्यालय (संपादक: अमर देब)',
      addressText: 'NH19, आसनसोल, कालीपहाड़ी, पश्चिम बर्धमान, पश्चिम बंगाल, पिन 713303',
      bureauText: 'संपादक: अमर देब | मुख्य कार्यालय: आसनसोल, पश्चिम बर्धमान',
      email: 'nirvikbanglaportal@gmail.com',
      phone: '033-68288835',
      whatsapp: '+91 8653446874'
    }
  };

  const t = content[locale] || content.bn;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-outfit">
      <div className="max-w-[1100px] mx-auto space-y-8">
        
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden text-center md:text-left">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="bg-[#eb1c24] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Nirbhik Bangla
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
              {t.title}
            </h1>
            <p className="text-red-200 text-sm md:text-base font-medium">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Intro Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
            {t.missionTitle}
          </h2>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            {t.intro}
          </p>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            {t.missionText}
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900">{t.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#eb1c24] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{v.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t.stats.map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl md:text-3xl font-black text-[#eb1c24]">{s.num}</div>
              <div className="text-xs text-slate-500 font-bold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Contact & Address Box */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building size={20} className="text-[#eb1c24]" />
            <span>{t.addressTitle}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-600 font-medium">
            <div className="flex items-start gap-2.5">
              <MapPin size={18} className="text-[#eb1c24] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">{t.addressText}</p>
                <p className="text-slate-500 text-xs mt-0.5">{t.bureauText}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#eb1c24] shrink-0" />
                <span>{t.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#eb1c24] shrink-0" />
                <span>{t.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain shrink-0" />
                <span>WhatsApp: {t.whatsapp}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
