const http = require('http');

const routesToTest = [
  '/',
  '/bn',
  '/en',
  '/hi',
  '/bn/about',
  '/bn/contact',
  '/bn/privacy-policy',
  '/bn/terms',
  '/bn/disclaimer',
  '/bn/dmca',
  '/bn/editorial-policy',
  '/bn/cookies',
  '/bn/sitemap',
  '/sitemap.xml',
  '/robots.txt',
  '/bn/category/paschim-bardhaman',
  '/bn/category/asansol',
  '/bn/category/durgapur',
  '/bn/category/rajya',
  '/bn/category/desh',
  '/bn/category/biswa',
  '/bn/category/khela',
  '/bn/category/binodon',
  '/bn/category/latest'
];

function checkRoute(path) {
  return new Promise((resolve) => {
    function get(urlPath) {
      http.get(`http://localhost:3000${urlPath}`, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = res.headers.location.startsWith('http')
            ? new URL(res.headers.location).pathname
            : res.headers.location;
          get(loc);
        } else {
          resolve({ path, finalPath: urlPath, status: res.statusCode });
        }
      }).on('error', (err) => {
        resolve({ path, status: 'ERROR', error: err.message });
      });
    }
    get(path);
  });
}

async function auditAllRoutes() {
  console.log('=== Auditing Client App Routes (Following Redirects) ===\n');

  let passed = 0;
  let failed = 0;

  for (const route of routesToTest) {
    const res = await checkRoute(route);
    if (res.status === 200) {
      console.log(`[OK 200] ${res.path} -> ${res.finalPath || res.path}`);
      passed++;
    } else {
      console.log(`[FAILED ${res.status}] ${res.path}`);
      failed++;
    }
  }

  console.log(`\n=== Audit Result ===`);
  console.log(`Passed (HTTP 200): ${passed}`);
  console.log(`Failed: ${failed}`);
}

auditAllRoutes();
