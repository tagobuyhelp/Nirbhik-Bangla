const mongoose = require('mongoose');
require('dotenv').config();

const vpsURI = 'mongodb://tagobuy:tarikAziz%40703330@72.61.235.235:27017/nirbhik-bangla?authSource=admin';

async function checkImages() {
  try {
    await mongoose.connect(vpsURI);
    console.log('Connected to VPS MongoDB!');

    const Article = mongoose.model('Article', new mongoose.Schema({}, { strict: false }));

    const articles = await Article.find({});
    console.log(`Total articles in VPS DB: ${articles.length}`);

    let wpImagesCount = 0;
    let unsplashImagesCount = 0;
    let cloudinaryImagesCount = 0;
    let otherImagesCount = 0;

    const sampleWpUrls = [];

    for (const art of articles) {
      const url = art.featuredImageUrl || '';
      if (url.includes('nirbhikbangla.com') || url.includes('wp-content')) {
        wpImagesCount++;
        if (sampleWpUrls.length < 10) sampleWpUrls.push(url);
      } else if (url.includes('unsplash.com')) {
        unsplashImagesCount++;
      } else if (url.includes('cloudinary.com')) {
        cloudinaryImagesCount++;
      } else if (url) {
        otherImagesCount++;
        if (sampleWpUrls.length < 10) sampleWpUrls.push(url);
      }
    }

    console.log('\n--- Image URL Breakdown in DB ---');
    console.log(`WordPress / Old Domain Images: ${wpImagesCount}`);
    console.log(`Unsplash Royalty-Free Stock Images: ${unsplashImagesCount}`);
    console.log(`Cloudinary Images: ${cloudinaryImagesCount}`);
    console.log(`Other Images: ${otherImagesCount}`);

    console.log('\nSample WordPress / Old Domain URLs:');
    console.log(sampleWpUrls);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkImages();
