export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nirbhikbangla.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-bn.xml`,
      `${baseUrl}/sitemap-en.xml`,
      `${baseUrl}/sitemap-hi.xml`,
    ],
  };
}
