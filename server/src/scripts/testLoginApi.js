const https = require('https');

function testLogin() {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      email: 'admin@nirbhikbangla.com',
      password: 'admin123'
    });

    const req = https.request('https://nirbhikbangla.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => resolve({ status: res.statusCode, bodySnippet: body.substring(0, 200) }));
    });

    req.on('error', (err) => resolve({ status: 'ERROR', error: err.message }));
    req.write(data);
    req.end();
  });
}

async function run() {
  console.log('=== Testing Production Auth Login API ===\n');
  const res = await testLogin();
  console.log('Result:', res);
}

run();
