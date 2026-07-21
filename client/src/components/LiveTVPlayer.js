'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Tv, Radio } from 'lucide-react';

export default function LiveTVPlayer({ stream }) {
  const { t } = useLanguage();

  const streamUrl = stream?.streamUrl || '';
  const streamType = stream?.streamType || 'youtube';
  const isLive = stream?.isLive ?? false;

  // Extract YouTube video ID
  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1` : url;
  };

  // Determine embed src based on stream type
  const getEmbedSrc = () => {
    switch (streamType) {
      case 'youtube':
        return getYouTubeEmbedUrl(streamUrl);
      case 'facebook':
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(streamUrl)}&autoplay=true`;
      case 'iframe':
      case 'hls':
      case 'm3u8':
      case 'rtmp':
      default:
        return streamUrl;
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ background: '#000' }}>
      {/* Live Badge */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'rgba(0,0,0,0.8)' }}>
        <div className="flex items-center gap-2">
          <Tv size={16} className="text-white/80" />
          <span className="text-white/90 text-sm font-semibold">{t('live.subtitle')}</span>
        </div>
        {isLive && (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full" style={{ background: 'var(--gradient-live)' }}>
            <span className="live-dot w-2 h-2 rounded-full bg-white inline-block" />
            <span className="text-white text-xs font-bold uppercase tracking-wider">LIVE</span>
          </div>
        )}
      </div>

      {/* Player */}
      {streamUrl ? (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={getEmbedSrc()}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={t('live.title')}
          />
        </div>
      ) : (
        <div
          className="w-full flex flex-col items-center justify-center gap-3 py-20"
          style={{ background: 'linear-gradient(180deg, #0f172a, #1e293b)' }}
        >
          <Radio size={48} className="text-white/20" />
          <p className="text-white/50 text-sm">{t('live.offline')}</p>
        </div>
      )}
    </div>
  );
}
