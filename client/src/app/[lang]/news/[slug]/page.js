import ArticleClientView from './ArticleClientView';

const knownSlugs = [
  'lok-sabha-vote-result',
  'election-result-political-debate',
  'bjp-tmc-clash-update',
  'new-government-delhi-prep',
  'us-election-date-announce',
  'finance-minister-budget-next-week',
  'kolkata-heavy-rain-warning',
  'ipl-final-kkr-vs-srh',
  'petrol-diesel-price-unchanged',
  'chandrayaan-4-mission-isro',
  'asansol-highway-traffic-update',
  'gold-price-drop-bengal',
  'railway-vande-bharat-expansion',
  'madhyamik-result-scrutiny-date',
  'smart-phone-ai-feature-launch',
];

const supportedLangs = ['bn', 'en', 'hi'];

export function generateStaticParams() {
  return supportedLangs.flatMap((lang) =>
    knownSlugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang = 'bn', slug = 'lok-sabha-vote-result' } = resolvedParams || {};

  return {
    title: 'লোকসভা ভোটের ফল ঘোষণা আজ, কড়া নিরাপত্তার প্রস্তুতি | নির্ভীক বাংলা',
    description: 'সারা দেশে ৪০০০ কেন্দ্রে ভোটগণনা হবে। কমিশনের পক্ষ থেকে জানানো হয়েছে, ফল প্রকাশ না হওয়া পর্যন্ত কড়া নিরাপত্তা বজায় রাখা হবে।',
    openGraph: {
      title: 'লোকসভা ভোটের ফল ঘোষণা আজ, কড়া নিরাপত্তার প্রস্তুতি',
      description: 'সারা দেশে ৪০০০ কেন্দ্রে ভোটগণনা হবে।',
      images: ['https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=85'],
    },
  };
}

export default async function LanguageNewsArticlePage({ params }) {
  const resolvedParams = await params;
  const { lang = 'bn', slug = 'lok-sabha-vote-result' } = resolvedParams || {};

  return <ArticleClientView lang={lang} slug={slug} />;
}
