const http = require('http');

const headerSlugs = [
  'breaking',
  'paschim-bardhaman',
  'asansol',
  'durgapur',
  'rajya',
  'desh',
  'biswa',
  'politics',
  'rajniti',
  'business',
  'khela',
  'binodon',
  'lifestyle',
  'projukti',
  'video',
  'latest'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function testFetch() {
  console.log('=== Testing API response for each Header Category ===\n');

  for (const slug of headerSlugs) {
    try {
      let url = `http://localhost:5000/api/v1/public/news?lang=bn&limit=12`;
      if (slug === 'breaking') {
        url += '&isBreaking=true';
      } else if (slug === 'popular') {
        url += '&isTrending=true';
      } else if (slug !== 'latest' && slug !== 'all') {
        url += `&category=${slug}`;
      }

      const json = await fetchUrl(url);

      const count = json.data ? json.data.length : 0;
      const total = json.meta ? json.meta.total : count;
      console.log(`[Category: "${slug}"] => Articles returned: ${count}, Total in DB: ${total}`);
      if (count > 0) {
        console.log(`   Sample article title: "${json.data[0].title}"`);
      } else {
        console.log(`   WARNING: 0 articles returned for category "${slug}"`);
      }
      console.log('----------------------------------------------------');
    } catch (err) {
      console.error(`Error testing ${slug}:`, err.message);
    }
  }
}

testFetch();
