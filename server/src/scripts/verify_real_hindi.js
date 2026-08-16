const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

// Genuine Hindi Devanagari letters (excluding Bengali Danda । U+0964)
const realHindiRegex = /[\u0904-\u0939\u093D-\u0950\u0958-\u0963]/;

async function verifyRealHindi() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const articles = await Article.find().lean();
  let remainingHindiCount = 0;

  for (const art of articles) {
    const bnData = art.translations?.bn || {};
    const content = bnData.content || '';
    if (realHindiRegex.test(content)) {
      remainingHindiCount++;
    }
  }

  console.log(`====================================================`);
  console.log(`Total Articles in Database: ${articles.length}`);
  console.log(`Remaining Articles with actual Hindi text: ${remainingHindiCount}`);
  console.log(`====================================================`);

  await mongoose.disconnect();
}

verifyRealHindi();
