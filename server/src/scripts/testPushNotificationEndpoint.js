const https = require('https');

function testSendPush() {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      title: 'নির্ভীক বাংলা - ব্রেকিং আপডেট',
      body: 'নতুন খবর পোস্ট টেস্ট সফলভাবে সম্পন্ন হয়েছে!',
      url: 'https://nirbhikbangla.com'
    });

    const req = https.request('https://nirbhikbangla.com/api/v1/notifications/send-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });

    req.on('error', (err) => resolve({ status: 'ERROR', error: err.message }));
    req.write(data);
    req.end();
  });
}

async function run() {
  console.log('=== Testing Push Notification Endpoint over HTTPS ===\n');
  const res = await testSendPush();
  console.log('Result:', res);
}

run();
