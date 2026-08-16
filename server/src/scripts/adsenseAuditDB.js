const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

async function auditArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const articles = await Article.find({}).lean();
    console.log(`Total Articles in DB: ${articles.length}`);

    let emptyContentCount = 0;
    let missingImageCount = 0;
    let shortContentCount = 0; // < 150 chars
    let invalidSlugCount = 0;

    const badArticleIds = [];

    articles.forEach((art) => {
      const bn = art.translations?.get ? art.translations.get('bn') : art.translations?.bn;
      const title = bn?.title || '';
      const content = bn?.content || '';
      const image = art.featuredImageUrl;
      const slug = bn?.slug;

      let isBad = false;

      if (!content || content.trim().length === 0) {
        emptyContentCount++;
        isBad = true;
      } else if (content.trim().length < 150) {
        shortContentCount++;
      }

      if (!image || image.trim().length === 0 || image.includes('undefined') || image.includes('null')) {
        missingImageCount++;
        isBad = true;
      }

      if (!slug || slug.trim().length === 0 || slug.includes('undefined')) {
        invalidSlugCount++;
        isBad = true;
      }

      if (isBad) {
        badArticleIds.push(art._id);
      }
    });

    console.log('\n=== AdSense Quality Audit Report for Articles ===');
    console.log(`- Empty Content Articles: ${emptyContentCount}`);
    console.log(`- Thin Content Articles (<150 chars): ${shortContentCount}`);
    console.log(`- Missing/Invalid Image Articles: ${missingImageCount}`);
    console.log(`- Invalid Slug Articles: ${invalidSlugCount}`);
    console.log(`- Total Substandard/Unusable Articles flagged for cleanup: ${badArticleIds.length}`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

auditArticles();
