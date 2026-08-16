import ArticleDetailClientView from './ArticleDetailClientView';

const articleIds = [
  'asansol-accident-update',
  'chandrayaan-4-mission-isro',
  'cm-new-project-announcement',
  'finance-minister-budget-next-week',
  'gold-price-drop-bengal',
  'ipl-final-kkr-vs-srh',
  'kolkata-heavy-rain-alert',
  'kolkata-metro-new-route',
  'lok-sabha-vote-result',
  'paschim-bardhaman-new-industrial-park-500-crore',
  'railway-vande-bharat-expansion',
];

export const dynamicParams = true;

export default function ArticleDetailPage() {
  return <ArticleDetailClientView />;
}
