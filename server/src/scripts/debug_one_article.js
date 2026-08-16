const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

const devanagariRegex = /[\u0900-\u097F]/;

async function debugArticle() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const articles = await Article.find().limit(5).lean();
  for (const art of articles) {
    console.log("==========================================");
    console.log("ID:", art._id);
    console.log("Raw translations keys:", Object.keys(art.translations || {}));
    console.log("translations.bn title:", art.translations?.bn?.title);
    console.log("translations.bn content (first 200 chars):", art.translations?.bn?.content?.slice(0, 200));
    console.log("Has Devanagari in bn.content?", devanagariRegex.test(art.translations?.bn?.content || ''));
  }

  await mongoose.disconnect();
}

debugArticle();
