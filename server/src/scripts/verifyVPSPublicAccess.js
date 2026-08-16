const http = require('http');

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
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
  console.log('=== Verifying VPS Deployment URLs ===\n');

  const clientRes = await checkUrl('http://72.61.235.235:3000/');
  console.log(`[Client Portal (Port 3000)]: Status = ${clientRes.status}`);

  const apiRes = await checkUrl('http://72.61.235.235:5000/api/v1/public/news');
  console.log(`[Backend API (Port 5000)]: Status = ${apiRes.status}`);

  const adminRes = await checkUrl('http://72.61.235.235:3001/');
  console.log(`[Admin Panel (Port 3001)]: Status = ${adminRes.status}`);
}

verify();
