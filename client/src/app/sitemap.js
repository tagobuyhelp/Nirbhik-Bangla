export default async function sitemap() {
  const baseUrl = 'https://nirbhikbangla.com';
  const locales = ['bn', 'en', 'hi'];

  // Verified active existing page routes
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
    '/sitemap',
  ];

  const categories = [
    'politics', 'rajya', 'desh', 'biswa', 'business',
    'khela', 'binodon', 'technology', 'lifestyle',
    'health', 'education', 'crime', 'weather'
  ];

  const routes = [];

  // Generate localized active pages
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

  return routes;
}
