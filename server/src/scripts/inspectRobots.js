const https = require('https');

https.get('https://nirbhikbangla.com/robots.txt', { rejectUnauthorized: false }, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    console.log('=== ROBOTS.TXT INSPECTION ===\n');
    console.log('Status Code:', res.statusCode);
    console.log('Content:\n', body);
  });
});
