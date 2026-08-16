const https = require('https');

https.get('https://nirbhikbangla.com/ads.txt', { rejectUnauthorized: false }, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    console.log('=== ADS.TXT HTTPS CHECK ===');
    console.log('Status:', res.statusCode);
    console.log('Content:\n', body);
  });
});
