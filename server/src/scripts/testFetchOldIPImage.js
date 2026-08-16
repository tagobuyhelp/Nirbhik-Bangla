const https = require('https');

function fetchHttpsFromIp(ip, path) {
  return new Promise((resolve) => {
    const req = https.request({
      host: ip,
      port: 443,
      path: path,
      method: 'GET',
      rejectUnauthorized: false,
      headers: {
        'Host': 'nirbhikbangla.com'
      }
    }, (res) => {
      resolve({ ip, status: res.statusCode, length: res.headers['content-length'], contentType: res.headers['content-type'] });
    });
    req.on('error', (err) => {
      resolve({ ip, status: 'ERROR', error: err.message });
    });
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ ip, status: 'TIMEOUT' });
    });
    req.end();
  });
}

async function test() {
  const path = '/wp-content/uploads/2024/02/IMG-20240205-WA0090-scaled.jpg';
  console.log('Testing HTTPS fetch directly from IP 93.127.173.33 for:', path);

  const res = await fetchHttpsFromIp('93.127.173.33', path);
  console.log('HTTPS 93.127.173.33 result:', res);
}

test();
