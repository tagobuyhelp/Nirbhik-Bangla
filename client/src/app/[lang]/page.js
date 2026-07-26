import HomeClientView from './HomeClientView';

export function generateStaticParams() {
  return [{ lang: 'bn' }, { lang: 'en' }, { lang: 'hi' }];
}

export default async function LanguageHomePage({ params }) {
  const resolvedParams = await params;
  return <HomeClientView params={Promise.resolve(resolvedParams)} />;
}
