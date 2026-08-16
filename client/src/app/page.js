import LanguageHomePage from './[lang]/HomeClientView';

export default function RootPage() {
  return <LanguageHomePage params={Promise.resolve({ lang: 'bn' })} />;
}
