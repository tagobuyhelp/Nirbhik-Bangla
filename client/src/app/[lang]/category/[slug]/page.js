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

export const dynamicParams = true;

export default function LanguageCategoryPage() {
  return <CategoryClientView />;
}
