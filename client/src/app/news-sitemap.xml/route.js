export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nirbhikbangla.com';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://nirbhikbangla.com/api/v1';

  let articles = [];
  try {
    const res = await fetch(`${apiUrl}/public/news?limit=100`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      articles = data.data || [];
    }
  } catch (err) {
    console.error('Error fetching articles for news-sitemap:', err);
  }

  // Filter articles from the last 48 hours, or fallback to latest 50
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  let recentArticles = articles.filter(art => art.publishedAt && new Date(art.publishedAt) >= cutoff);
  if (recentArticles.length === 0) {
    recentArticles = articles.slice(0, 50);
  }

  const xmlItems = recentArticles.map((art) => {
    const pubDate = new Date(art.publishedAt || art.createdAt || Date.now()).toISOString();
    const title = (art.translations?.bn?.title || art.title || 'নির্ভীক বাংলা সংবাদ').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    const url = `${baseUrl}/bn/news/${art.slug}`;

    return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>নির্ভীক বাংলা</news:name>
        <news:language>bn</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlItems}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=3600'
    }
  });
}
