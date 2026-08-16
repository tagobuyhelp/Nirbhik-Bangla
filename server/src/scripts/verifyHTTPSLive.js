const https = require('https');

function checkHttps(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT' });
    });
  });
}

async function verify() {
  console.log('=== Verifying HTTPS for nirbhikbangla.com ===\n');

  const domainRes = await checkHttps('https://nirbhikbangla.com/');
  console.log(`[https://nirbhikbangla.com/]: Status = ${domainRes.status}`);

  const wwwRes = await checkHttps('https://www.nirbhikbangla.com/');
  console.log(`[https://www.nirbhikbangla.com/]: Status = ${wwwRes.status}`);
}

verify();
