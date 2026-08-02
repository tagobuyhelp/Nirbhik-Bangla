import VideoClientView from './VideoClientView';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const dynamicParams = true;

async function fetchVideoData(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/videos/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang = 'bn', slug } = resolvedParams || {};
  const video = await fetchVideoData(slug);

  const titleText = video?.seoTitle?.[lang] || video?.title?.[lang] || video?.title?.bn || 'ভিডিও সংকলন | নির্ভীক বাংলা';
  const descText = video?.seoDescription?.[lang] || video?.description?.[lang] || video?.description?.bn || 'নির্ভীক বাংলা পোর্টালে সর্বশেষ ভিডিও সংবাদ দেখুন।';
  const posterUrl = video?.thumbnail || 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=85';
  const pageUrl = `https://nirbhikbangla.com/${lang}/videos/${slug}`;

  return {
    title: `${titleText} | নির্ভীক বাংলা (Nirbhik Bangla)`,
    description: descText,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'video.other',
      title: titleText,
      description: descText,
      url: pageUrl,
      images: [
        {
          url: posterUrl,
          width: 1200,
          height: 630,
          alt: video?.altText?.[lang] || titleText,
        },
      ],
      videos: video?.youtubeId ? [
        {
          url: `https://www.youtube.com/embed/${video.youtubeId}`,
          secureUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
          type: 'text/html',
          width: 1280,
          height: 720,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: descText,
      images: [posterUrl],
    },
  };
}

export default async function VideoDetailPage({ params }) {
  const resolvedParams = await params;
  const { lang = 'bn', slug } = resolvedParams || {};
  const video = await fetchVideoData(slug);

  // Schema.org VideoObject Structured Data (JSON-LD)
  const titleText = video?.seoTitle?.[lang] || video?.title?.[lang] || video?.title?.bn || 'ভিডিও | নির্ভীক বাংলা';
  const descText = video?.seoDescription?.[lang] || video?.description?.[lang] || video?.description?.bn || 'নির্ভীক বাংলা পোর্টালে ভিডিও সংবাদ।';
  const posterUrl = video?.thumbnail || 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=85';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: titleText,
    description: descText,
    thumbnailUrl: [posterUrl],
    uploadDate: video?.createdAt || new Date().toISOString(),
    embedUrl: video?.youtubeId ? `https://www.youtube.com/embed/${video.youtubeId}` : video?.videoUrl,
    contentUrl: video?.videoUrl || `https://www.youtube.com/watch?v=${video?.youtubeId}`,
    duration: video?.duration ? `PT${video.duration.replace(':', 'M')}S` : 'PT5M0S',
    publisher: {
      '@type': 'Organization',
      name: 'Nirbhik Bangla (নির্ভীক বাংলা)',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nirbhikbangla.com/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideoClientView lang={lang} slug={slug} initialVideo={video} />
    </>
  );
}
