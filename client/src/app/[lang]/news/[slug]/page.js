import ArticleClientView from './ArticleClientView';

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
