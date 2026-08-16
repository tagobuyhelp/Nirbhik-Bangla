const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

async function checkDates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const articles = await Article.find({}).sort({ publishedAt: -1, createdAt: -1 }).limit(30).lean();
    console.log('\n=== Top 30 Latest Articles by publishedAt / createdAt ===');

    articles.forEach((art, idx) => {
      const bn = art.translations?.get ? art.translations.get('bn') : art.translations?.bn;
      const title = bn?.title || art.title;
      console.log(`[${idx + 1}] Date: ${art.publishedAt || art.createdAt} | Cat: ${art.categorySlug} | Title: "${title?.substring(0, 60)}"`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDates();
