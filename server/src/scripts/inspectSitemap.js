const https = require('https');

https.get('https://nirbhikbangla.com/sitemap.xml', { rejectUnauthorized: false }, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    console.log('=== SITEMAP.XML INSPECTION ===\n');
    console.log('Status Code:', res.statusCode);
    console.log('Content-Type:', res.headers['content-type']);
    console.log('Body Length:', body.length);
    console.log('\n--- First 1000 characters of sitemap.xml ---');
    console.log(body.substring(0, 1000));
  });
});
