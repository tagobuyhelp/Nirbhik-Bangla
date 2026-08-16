const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => resolve({ url, status: res.statusCode, contentType: res.headers['content-type'], length: body.length, snippet: body.substring(0, 400) }));
    });
  });
}

async function run() {
  console.log('=== TESTING BOTH SITEMAPS LIVE ON VPS ===\n');
  const res1 = await fetchUrl('https://nirbhikbangla.com/sitemap.xml');
  console.log('Master Sitemap:', res1);

  console.log('\n----------------------------------------\n');
  const res2 = await fetchUrl('https://nirbhikbangla.com/news-sitemap.xml');
  console.log('Google News Sitemap:', res2);
}

run();
