import VideosClientView from './VideosClientView';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'bn';

  const titles = {
    bn: 'ভিডিও বুলেটিন ও গ্যালারি - নির্ভীক বাংলা',
    en: 'Video Bulletin & Gallery - Nirbhik Bangla',
    hi: 'वीडियो बुलेटिन और गैलरी - निर्भीक बांग्ला',
  };

  const descriptions = {
    bn: 'নির্ভীক বাংলার বিশেষ ভিডিও বুলেটিন, এক্সক্লুসিভ কভারেজ, খবর এবং ভিডিও গ্যালারি দেখুন।',
    en: 'Watch special video bulletins, exclusive coverage, news, and video galleries on Nirbhik Bangla.',
    hi: 'निर्भीक बांग्ला पर विशेष वीडियो बुलेटिन, एक्सक्लूसिव कवरेज, समाचार और वीडियो गैलरी देखें।',
  };

  return {
    title: titles[lang] || titles.bn,
    description: descriptions[lang] || descriptions.bn,
    openGraph: {
      title: titles[lang] || titles.bn,
      description: descriptions[lang] || descriptions.bn,
      type: 'website',
    },
  };
}

export default async function VideosPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'bn';

  return <VideosClientView lang={lang} />;
}
