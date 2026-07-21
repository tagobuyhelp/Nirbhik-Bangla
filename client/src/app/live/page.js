'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import LiveTVPlayer from '@/components/LiveTVPlayer';
import NewsCard from '@/components/NewsCard';
import { Radio, Clock, Calendar } from 'lucide-react';

const DEMO_STREAMS = [
  {
    title: { bn: 'নির্ভীক বাংলা লাইভ', hi: 'निर्भीक बांग्ला लाइव', en: 'Nirbhik Bangla Live' },
    streamType: 'youtube',
    streamUrl: '',
    isLive: false,
    isDefault: true,
  },
  {
    title: { bn: 'নির্ভীক বাংলা YouTube', hi: 'निर्भीक बांग्ला YouTube', en: 'Nirbhik Bangla YouTube' },
    streamType: 'youtube',
    streamUrl: '',
    isLive: false,
  },
];

const DEMO_SCHEDULE = [
  { time: '০৬:০০ AM', title: { bn: 'সকালের খবর', hi: 'सुबह की खबरें', en: 'Morning News' } },
  { time: '০৯:০০ AM', title: { bn: 'রাজনৈতিক বিশ্লেষণ', hi: 'राजनीतिक विश्लेषण', en: 'Political Analysis' } },
  { time: '১২:০০ PM', title: { bn: 'দুপুরের বুলেটিন', hi: 'दोपहर बुलेटिन', en: 'Afternoon Bulletin' } },
  { time: '০৩:০০ PM', title: { bn: 'খেলার খবর', hi: 'खेल समाचार', en: 'Sports Update' } },
  { time: '০৬:০০ PM', title: { bn: 'সন্ধ্যার প্রধান সংবাদ', hi: 'शाम की मुख्य ख़बरें', en: 'Evening Prime News' } },
  { time: '০৯:০০ PM', title: { bn: 'রাতের বিশেষ বুলেটিন', hi: 'रात का विशेष बुलेटिन', en: 'Night Special Bulletin' } },
];

export default function LivePage() {
  const { t, localized } = useLanguage();

  return (
    <div style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-[1400px] mx-auto px-4 py-6">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="p-2.5 rounded-xl" style={{ background: 'var(--gradient-live)' }}>
            <Radio size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {t('live.title')}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('live.subtitle')}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Player */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <LiveTVPlayer stream={DEMO_STREAMS[0]} />
            </motion.div>

            {/* Stream Sources */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {DEMO_STREAMS.map((stream, i) => (
                <button
                  key={i}
                  className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{
                    borderColor: i === 0 ? 'var(--brand-primary)' : 'var(--border-default)',
                    background: i === 0 ? 'var(--brand-primary-light)' : 'var(--bg-card)',
                    color: i === 0 ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {localized(stream.title)}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Sidebar */}
          <aside>
            <div
              className="rounded-xl p-5"
              style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} style={{ color: 'var(--brand-primary)' }} />
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {t('live.schedule')}
                </h3>
              </div>
              <div className="flex flex-col gap-0.5">
                {DEMO_SCHEDULE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 hover:bg-[var(--bg-secondary)]"
                  >
                    <span
                      className="shrink-0 text-xs font-mono font-bold w-[72px]"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      {item.time}
                    </span>
                    <div className="w-px h-6 rounded-full" style={{ background: 'var(--border-default)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {localized(item.title)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}
