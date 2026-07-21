const Article = require('../models/Article');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nirbhikbangla.com';

const generateSitemapXml = (urls) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls
    .map(
      (u) => `
    <url>
      <loc>${u.loc}</loc>
      <lastmod>${u.lastmod}</lastmod>
      <changefreq>hourly</changefreq>
      <priority>${u.priority || '0.8'}</priority>
      ${u.alternates
        ? u.alternates
            .map(
              (alt) => `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />`
            )
            .join('\n      ')
        : ''}
    </url>`
    )
    .join('')}
</urlset>`;
};

exports.getSitemapIndex = async (req, res) => {
  const sitemaps = [
    `${SITE_URL}/sitemap-bn.xml`,
    `${SITE_URL}/sitemap-en.xml`,
    `${SITE_URL}/sitemap-hi.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (loc) => `
    <sitemap>
      <loc>${loc}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>`
    )
    .join('')}
</sitemapindex>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
};

exports.getLanguageSitemap = async (req, res) => {
  const lang = req.params.lang || 'bn';
  const articles = await Article.find().sort({ updatedAt: -1 }).limit(1000);

  const urls = [
    { loc: `${SITE_URL}/${lang}`, lastmod: new Date().toISOString(), priority: '1.0' },
  ];

  articles.forEach((art) => {
    const langData = art.translations.get(lang);
    if (langData && langData.status === 'published') {
      const bnSlug = art.translations.get('bn')?.slug;
      const enSlug = art.translations.get('en')?.slug;
      const hiSlug = art.translations.get('hi')?.slug;

      urls.push({
        loc: `${SITE_URL}/${lang}/news/${langData.slug}`,
        lastmod: (art.updatedAt || new Date()).toISOString(),
        priority: art.isBreaking ? '1.0' : '0.8',
        alternates: [
          bnSlug ? { lang: 'bn', href: `${SITE_URL}/bn/news/${bnSlug}` } : null,
          enSlug ? { lang: 'en', href: `${SITE_URL}/en/news/${enSlug}` } : null,
          hiSlug ? { lang: 'hi', href: `${SITE_URL}/hi/news/${hiSlug}` } : null,
        ].filter(Boolean),
      });
    }
  });

  const xml = generateSitemapXml(urls);
  res.header('Content-Type', 'application/xml');
  res.send(xml);
};
