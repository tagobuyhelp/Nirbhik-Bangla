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
  console.log('=== Verifying Nirbhik Bangla Dedicated Ports (3050, 3051, 5050) ===\n');

  const clientRes = await checkUrl('http://72.61.235.235:3050/');
  console.log(`[Nirbhik Client (Port 3050)]: Status = ${clientRes.status}`);

  const apiRes = await checkUrl('http://72.61.235.235:5050/api/v1/public/news');
  console.log(`[Nirbhik API (Port 5050)]: Status = ${apiRes.status}`);

  const adminRes = await checkUrl('http://72.61.235.235:3051/');
  console.log(`[Nirbhik Admin (Port 3051)]: Status = ${adminRes.status}`);
}

verify();
