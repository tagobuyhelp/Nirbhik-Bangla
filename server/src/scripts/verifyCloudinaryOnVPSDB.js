const mongoose = require('mongoose');

const VPS_URI = 'mongodb://tagobuy:tarikAziz%40703330@72.61.235.235:27017/nirbhik-bangla?authSource=admin';

async function verify() {
  try {
    const conn = await mongoose.createConnection(VPS_URI).asPromise();
    console.log('Connected to VPS MongoDB!');

    const articles = await conn.db.collection('articles').find({}).limit(5).toArray();
    console.log('\n--- Sample Article Image URLs on VPS MongoDB ---');
    articles.forEach((a, i) => {
      const title = a.title || 'Untitled';
      console.log(`[${i+1}] ${title.substring(0, 40)}... -> ${a.featuredImageUrl}`);
    });

    await conn.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

verify();
