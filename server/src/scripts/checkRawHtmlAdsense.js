const https = require('https');

https.get('https://nirbhikbangla.com/', { rejectUnauthorized: false }, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    console.log('=== RAW HTML CHECK FOR ADSENSE SCRIPT ===\n');
    console.log('Contains ca-pub-4059248504896664:', body.includes('ca-pub-4059248504896664'));
    console.log('Contains pagead2.googlesyndication.com:', body.includes('pagead2.googlesyndication.com'));
    console.log('\nFirst 500 chars of HTML:\n', body.substring(0, 500));
  });
});
