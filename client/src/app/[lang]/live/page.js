import LiveClientView from '@/app/live/LiveClientView';

export function generateStaticParams() {
  return [{ lang: 'bn' }, { lang: 'en' }, { lang: 'hi' }];
}

export default async function LanguageLivePage() {
  return <LiveClientView />;
}
