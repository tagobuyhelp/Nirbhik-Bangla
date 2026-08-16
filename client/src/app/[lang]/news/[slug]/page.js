import ArticleClientView from './ArticleClientView';

export const dynamicParams = true;

async function fetchArticle(slug, lang) {
  if (!slug) return null;
  const cleanSlug = slug.trim().replace(/\/+$/, '');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

  try {
    const res = await fetch(`${apiUrl}/public/news/by-slug/${encodeURIComponent(cleanSlug)}?lang=${lang}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch (err) {
    console.error('[SSR fetchArticle Error]:', err.message);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang = 'bn', slug = '' } = resolvedParams || {};
  const article = await fetchArticle(slug, lang);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nirbhikbangla.com';
  const currentUrl = `${baseUrl}/${lang}/news/${slug}`;

  if (!article) {
    return {
      title: 'সংবাদ পাওয়া যায়নি | নির্ভীক বাংলা',
      description: 'অনুসন্ধানকৃত সংবাদটি এই মুহূর্তে পাওয়া যায়নি।',
      robots: { index: false, follow: true },
    };
  }

  const title = article.seo?.title || article.title || 'নির্ভীক বাংলা সংবাদ';
  const description = article.seo?.description || article.excerpt || title;
  const imageUrl = article.featuredImageUrl || `${baseUrl}/images/logos/Nirbhik-Bangla-Logo-No-Bg.png`;
  const keywords = article.seo?.keywords?.length > 0 ? article.seo.keywords : (article.tags || []);

  return {
    title: `${title} | নির্ভীক বাংলা`,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        bn: `${baseUrl}/bn/news/${slug}`,
        en: `${baseUrl}/en/news/${slug}`,
        hi: `${baseUrl}/hi/news/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | নির্ভীক বাংলা`,
      description,
      url: currentUrl,
      siteName: 'Nirbhik Bangla (নির্ভীক বাংলা)',
      locale: lang === 'en' ? 'en_US' : lang === 'hi' ? 'hi_IN' : 'bn_IN',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author || 'নির্ভীক বাংলা সংবাদ প্রতিনিধি'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.imageAltText || title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | নির্ভীক বাংলা`,
      description,
      site: '@NirbhikBangla',
      creator: '@NirbhikBangla',
      images: [imageUrl],
    },
  };
}

export default async function LanguageNewsArticlePage({ params }) {
  const resolvedParams = await params;
  const { lang = 'bn', slug = '' } = resolvedParams || {};
  const article = await fetchArticle(slug, lang);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nirbhikbangla.com';
  const canonicalUrl = `${baseUrl}/${lang}/news/${slug}`;

  // NewsArticle JSON-LD Structured Data Schema for Search Engines & Google News
  const newsArticleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        headline: article.title,
        description: article.excerpt || article.title,
        image: article.featuredImageUrl ? [article.featuredImageUrl] : [`${baseUrl}/images/logos/Nirbhik-Bangla-Logo-No-Bg.png`],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: {
          '@type': 'Person',
          name: article.author || 'নির্ভীক বাংলা সংবাদ প্রতিনিধি',
        },
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: 'Nirbhik Bangla',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logos/Nirbhik-Bangla-Logo-No-Bg.png`,
          },
        },
        articleSection: article.categoryName || 'সংবাদ',
        keywords: (article.tags || []).join(', '),
      }
    : null;

  return (
    <>
      {newsArticleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
        />
      )}
      <ArticleClientView lang={lang} slug={slug} initialArticle={article} />
    </>
  );
}
