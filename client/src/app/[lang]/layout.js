export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'bn';

  const metaDataByLang = {
    bn: {
      title: 'নির্ভীক বাংলা | পশ্চিমবঙ্গের বিশ্বস্ত সর্বশেষ সংবাদ, ব্রেকিং নিউজ ও সরাসরি খবর',
      description: 'নির্ভীক বাংলা - পশ্চিম বর্ধমান, আসানসোল, দুর্গাপুর সহ সমগ্র পশ্চিমবঙ্গের সত্য ও নিরপেক্ষ ব্রেকিং নিউজ, রাজনীতি, জেলা খবর, ভিডিও ও লাইভ টিভি সম্প্রচার।',
      keywords: ['নির্ভীক বাংলা', 'Nirbhik Bangla', 'পশ্চিম বর্ধমান খবর', 'আসানসোল খবর', 'দুর্গাপুর খবর', 'বাংলা খবর', 'ব্রেকিং নিউজ', 'লাইভ টিভি', 'পশ্চিমবঙ্গ নিউজ'],
      locale: 'bn_IN',
    },
    en: {
      title: 'Nirbhik Bangla | Latest Bengali News, Breaking News & West Bengal Live Updates',
      description: 'Nirbhik Bangla - Your trusted 24x7 news portal for authentic breaking news from Paschim Bardhaman, Asansol, Durgapur, West Bengal, India & World.',
      keywords: ['Nirbhik Bangla', 'Bengali News', 'West Bengal Breaking News', 'Asansol News', 'Durgapur News', 'Paschim Bardhaman News', 'Live News India'],
      locale: 'en_US',
    },
    hi: {
      title: 'निर्भीक बांग्ला | पश्चिम बंगाल समाचार, ताजा खबरें और लाइव न्यूज़',
      description: 'निर्भीक बांग्ला - पश्चिम बर्धमान, आसनसोल, दुर्गापुर और पश्चिम बंगाल की ताजा और निष्पक्ष खबरें। पढ़ें राजनीति, खेल और लाइव टीवी।',
      keywords: ['निर्भीक बांग्ला', 'Nirbhik Bangla', 'पश्चिम बंगाल समाचार', 'आसनसोल न्यूज', 'दुर्गापुर समाचार', 'ताजा खबरें'],
      locale: 'hi_IN',
    },
  };

  const currentMeta = metaDataByLang[lang] || metaDataByLang.bn;
  const baseUrl = 'https://nirbhikbangla.com';

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        bn: `${baseUrl}/bn`,
        en: `${baseUrl}/en`,
        hi: `${baseUrl}/hi`,
      },
    },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: `${baseUrl}/${lang}`,
      siteName: 'Nirbhik Bangla (নির্ভীক বাংলা)',
      locale: currentMeta.locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/logos/Nirbhik-Bangla-Logo-No-Bg.png`,
          width: 1200,
          height: 630,
          alt: 'Nirbhik Bangla News',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description,
      site: '@NirbhikBangla',
      creator: '@NirbhikBangla',
      images: [`${baseUrl}/images/logos/Nirbhik-Bangla-Logo-No-Bg.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function LanguageLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsMediaOrganization',
        '@id': 'https://nirbhikbangla.com/#organization',
        name: 'Nirbhik Bangla',
        alternateName: 'নির্ভীক বাংলা',
        url: 'https://nirbhikbangla.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nirbhikbangla.com/images/logos/Nirbhik-Bangla-Logo-No-Bg.png',
        },
        sameAs: [
          'https://facebook.com',
          'https://youtube.com',
          'https://twitter.com',
          'https://instagram.com',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://nirbhikbangla.com/#website',
        url: 'https://nirbhikbangla.com',
        name: 'Nirbhik Bangla News',
        publisher: {
          '@id': 'https://nirbhikbangla.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://nirbhikbangla.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
