'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { API_BASE_URL } from '@/utils/config';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const { locale } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setErrorMsg(data.message || 'Could not send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const content = {
    en: {
      title: 'Contact Nirbhik Bangla Newsroom',
      subtitle: 'Have a news tip, press release, feedback, or business inquiry? Get in touch with our team.',
      formTitle: 'Send Us a Message',
      nameLabel: 'Your Full Name',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone Number (Optional)',
      subjectLabel: 'Subject',
      messageLabel: 'Your Message',
      sendBtn: 'Send Message',
      successMsg: 'Thank you! Your message has been sent to our news desk.',
      contactInfoTitle: 'Direct Contact Details',
      addressTitle: 'Headquarters Office (Editor: AMAR DEB)',
      addressText: 'NH19, ASANSOL, KALIPHARI, PASCHIM BURDWAN, WEST BENGAL, PIN 713303',
      bureauText: 'Editor: AMAR DEB | Asansol, Paschim Burdwan, WB',
      email: 'nirvikbanglaportal@gmail.com',
      phone: '033-68288835',
      whatsapp: '+91 8653446874'
    },
    bn: {
      title: 'নির্ভীক বাংলা নিউজডেস্কে যোগাযোগ করুন',
      subtitle: 'খবরের তথ্য, প্রেস রিলিজ, মতামত বা বিজ্ঞাপনের বিষয়ে আমাদের টিমের সাথে সরাসরি যোগাযোগ করুন।',
      formTitle: 'আমাদের বার্তা পাঠান',
      nameLabel: 'আপনার নাম',
      emailLabel: 'ইমেইল ঠিকানা',
      phoneLabel: 'ফোন নম্বর (ঐচ্ছিক)',
      subjectLabel: 'বিষয়',
      messageLabel: 'আপনার বার্তা',
      sendBtn: 'বার্তা পাঠান',
      successMsg: 'ধন্যবাদ! আপনার বার্তা আমাদের নিউজডেস্কে প্রাপ্ত হয়েছে।',
      contactInfoTitle: 'সরাসরি যোগাযোগের ঠিকানা',
      addressTitle: 'প্রধান কার্যালয় (সম্পাদক: অমর দেব)',
      addressText: 'NH19, আসানসোল, কালিপাহাড়ী, পশ্চিম বর্ধমান, পশ্চিমবঙ্গ, পিন ৭১৩৩০৩',
      bureauText: 'সম্পাদক: অমর দেব | আসানসোল, পশ্চিম বর্ধমান',
      email: 'nirvikbanglaportal@gmail.com',
      phone: '033-68288835',
      whatsapp: '+91 8653446874'
    },
    hi: {
      title: 'निर्भीक बांग्ला समाचार कक्ष से संपर्क करें',
      subtitle: 'समाचार, प्रेस विज्ञप्ति, प्रतिक्रिया या व्यावसायिक पूछताछ के लिए हमारी टीम से संपर्क करें।',
      formTitle: 'हमें संदेश भेजें',
      nameLabel: 'आपका नाम',
      emailLabel: 'ईमेल पता',
      phoneLabel: 'फोन नंबर (वैकल्पिक)',
      subjectLabel: 'विषय',
      messageLabel: 'आपका संदेश',
      sendBtn: 'संदेश भेजें',
      successMsg: 'धन्यवाद! आपका संदेश हमारे समाचार डेस्क को प्राप्त हो गया है।',
      contactInfoTitle: 'प्रत्यक्ष संपर्क विवरण',
      addressTitle: 'मुख्य कार्यालय (संपादक: अमर देब)',
      addressText: 'NH19, आसनसोल, कालीपहाड़ी, पश्चिम बर्धमान, पश्चिम बंगाल, पिन 713303',
      bureauText: 'संपादक: अमर देब | आसनसोल, पश्चिम बर्धमान',
      email: 'nirvikbanglaportal@gmail.com',
      phone: '033-68288835',
      whatsapp: '+91 8653446874'
    }
  };

  const t = content[locale] || content.bn;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-outfit">
      <div className="max-w-[1100px] mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-xl space-y-2">
          <h1 className="text-2xl md:text-4xl font-extrabold">{t.title}</h1>
          <p className="text-slate-300 text-xs md:text-sm font-medium">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <MessageSquare size={20} className="text-[#eb1c24]" />
              <span>{t.formTitle}</span>
            </h2>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle size={24} className="shrink-0" />
                <p className="text-xs md:text-sm font-bold">{t.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">{t.nameLabel}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#eb1c24] bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">{t.emailLabel}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#eb1c24] bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">{t.phoneLabel}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#eb1c24] bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">{t.subjectLabel}</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#eb1c24] bg-slate-50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">{t.messageLabel}</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#eb1c24] bg-slate-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#eb1c24] hover:bg-red-700 text-white font-extrabold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-red-500/20 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <Send size={16} />
                  <span>{t.sendBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-2">
                {t.contactInfoTitle}
              </h3>

              <div className="space-y-4 text-xs md:text-sm text-slate-600 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#eb1c24] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.addressTitle}</h4>
                    <p>{t.addressText}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{t.bureauText}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-[#eb1c24] shrink-0" />
                  <a href={`mailto:${t.email}`} className="hover:text-[#eb1c24]">{t.email}</a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-[#eb1c24] shrink-0" />
                  <a href={`tel:${t.phone}`} className="hover:text-[#eb1c24]">{t.phone}</a>
                </div>

                <div className="flex items-center gap-3">
                  <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
                  <a href={`https://wa.me/${t.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 font-bold text-emerald-700">
                    WhatsApp: {t.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="bg-slate-900 rounded-2xl p-4 text-white space-y-2">
              <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase">HQ LOCATION</span>
              <p className="text-xs text-slate-300 font-medium">Kolkata, West Bengal, India</p>
              <div className="w-full h-32 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400">
                Interactive Map View Available Online
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
