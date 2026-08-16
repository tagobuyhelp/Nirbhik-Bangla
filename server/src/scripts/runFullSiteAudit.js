const https = require('https');
const http = require('http');

function requestUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { rejectUnauthorized: false }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, bodyLength: body.length, bodySnippet: body.substring(0, 300) }));
    });
    req.on('error', (err) => resolve({ status: 'ERROR', error: err.message }));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ status: 'TIMEOUT' });
    });
  });
}

async function fullAudit() {
  console.log('=== STARTING COMPREHENSIVE FULL-SITE AUDIT ===\n');

  const routesToTest = [
    // Public Client Pages
    'https://nirbhikbangla.com/',
    'https://nirbhikbangla.com/bn',
    'https://nirbhikbangla.com/en',
    'https://nirbhikbangla.com/hi',
    'https://nirbhikbangla.com/bn/category/politics',
    'https://nirbhikbangla.com/bn/category/paschim-bardhaman',
    'https://nirbhikbangla.com/bn/category/asansol',
    'https://nirbhikbangla.com/bn/category/durgapur',
    'https://nirbhikbangla.com/bn/category/binodon',
    'https://nirbhikbangla.com/bn/category/khela',
    'https://nirbhikbangla.com/bn/category/lifestyle',
    'https://nirbhikbangla.com/bn/category/projukti',
    'https://nirbhikbangla.com/bn/category/business',
    'https://nirbhikbangla.com/bn/about',
    'https://nirbhikbangla.com/bn/contact',
    'https://nirbhikbangla.com/bn/privacy-policy',
    'https://nirbhikbangla.com/bn/terms',
    'https://nirbhikbangla.com/bn/disclaimer',
    'https://nirbhikbangla.com/bn/cookies',
    'https://nirbhikbangla.com/bn/dmca',
    'https://nirbhikbangla.com/bn/editorial-policy',
    'https://nirbhikbangla.com/sitemap.xml',
    'https://nirbhikbangla.com/robots.txt',
    'https://nirbhikbangla.com/sw.js',

    // API Endpoints
    'https://nirbhikbangla.com/api/v1/health',
    'https://nirbhikbangla.com/api/v1/public/news?category=politics&limit=5',
    'https://nirbhikbangla.com/api/v1/public/news?category=binodon&limit=5',
    'https://nirbhikbangla.com/api/v1/public/news?category=khela&limit=5',
    'https://nirbhikbangla.com/api/v1/notifications/vapid-public-key',

    // Admin Subdomain
    'https://admin.nirbhikbangla.com/'
  ];

  let passed = 0;
  let failed = 0;
  const issues = [];

  for (const route of routesToTest) {
    const res = await requestUrl(route);
    if (res.status === 200 || res.status === 307 || res.status === 308) {
      console.log(`✓ [PASS] ${res.status} : ${route}`);
      passed++;
    } else {
      console.log(`❌ [FAIL] ${res.status} : ${route}`);
      failed++;
      issues.push({ route, status: res.status, snippet: res.bodySnippet });
    }
  }

  console.log(`\n=== AUDIT SUMMARY ===`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (issues.length > 0) {
    console.log('\n--- ISSUES DETECTED ---');
    console.log(JSON.stringify(issues, null, 2));
  } else {
    console.log('\n🎉 ALL CLIENT, API, AND ADMIN ROUTES ARE 100% HEALTHY AND RESPONSIVE!');
  }

  process.exit(0);
}

fullAudit();
