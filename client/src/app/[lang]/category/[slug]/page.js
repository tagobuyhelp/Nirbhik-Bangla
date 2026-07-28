import CategoryClientView from '../../../category/[slug]/CategoryClientView';

const categorySlugs = [
  'all',
  'arthaniti',
  'asansol',
  'binodon',
  'biswa',
  'breaking',
  'desh',
  'durgapur',
  'khela',
  'latest',
  'lifestyle',
  'paschim-bardhaman',
  'popular',
  'projukti',
  'rajya',
  'rajniti',
  'special-report',
  'tech',
  'video',
];

const supportedLangs = ['bn', 'en', 'hi'];

export function generateStaticParams() {
  return supportedLangs.flatMap((lang) =>
    categorySlugs.map((slug) => ({ lang, slug }))
  );
}

export default function LanguageCategoryPage() {
  return <CategoryClientView />;
}
