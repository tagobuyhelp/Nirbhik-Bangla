const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

async function sampleArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    const articles = await Article.find({}).limit(25).lean();

    articles.forEach((art, idx) => {
      const title = art.translations?.get ? art.translations.get('bn')?.title : (art.translations?.bn?.title || 'No Title');
      console.log(`[${idx + 1}] Category: "${art.categorySlug}" | Title: "${title}"`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

sampleArticles();
