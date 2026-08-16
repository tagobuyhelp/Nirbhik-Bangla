export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nirbhikbangla.com';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  const locales = ['bn', 'en', 'hi'];

  const pages = [
    '',
    '/live',
    '/videos',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/cookies',
    '/editorial-policy',
    '/dmca',
  ];

  const categories = [
    'paschim-bardhaman', 'asansol', 'durgapur', 'rajya', 'desh', 'biswa',
    'khela', 'binodon', 'technology', 'lifestyle', 'health', 'education', 'crime', 'weather'
  ];

  const routes = [];

  // 1. Static localized pages & categories
  locales.forEach((lang) => {
    pages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date().toISOString(),
        changeFrequency: page === '' || page === '/live' ? 'always' : 'daily',
        priority: page === '' ? 1.0 : page === '/live' ? 0.9 : 0.7,
      });
    });

    categories.forEach((cat) => {
      routes.push({
        url: `${baseUrl}/${lang}/category/${cat}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'hourly',
        priority: 0.8,
      });
    });
  });

  // 2. Fetch dynamic articles from backend API
  try {
    const res = await fetch(`${apiUrl}/public/news?limit=200`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const articles = data.data || [];

      articles.forEach((art) => {
        if (!art.slug) return;
        locales.forEach((lang) => {
          routes.push({
            url: `${baseUrl}/${lang}/news/${art.slug}`,
            lastModified: art.publishedAt ? new Date(art.publishedAt).toISOString() : new Date().toISOString(),
            changeFrequency: 'hourly',
            priority: art.isBreaking ? 1.0 : 0.8,
          });
        });
      });
    }
  } catch (err) {
    console.error('[Sitemap Dynamic Fetch Error]:', err.message);
  }

  return routes;
}
