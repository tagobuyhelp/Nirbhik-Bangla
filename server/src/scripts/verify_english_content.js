const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

// Genuine Hindi Devanagari letters (excluding Bengali Danda । U+0964)
const realHindiRegex = /[\u0904-\u0939\u093D-\u0950\u0958-\u0963]/;

async function verifyEnglishContent() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const articles = await Article.find().lean();
  let hindiInEnglishCount = 0;
  let emptyEnglishCount = 0;

  for (const art of articles) {
    const enData = art.translations?.en || {};
    const title = enData.title || '';
    const excerpt = enData.excerpt || '';
    const content = enData.content || '';

    if (realHindiRegex.test(title) || realHindiRegex.test(excerpt) || realHindiRegex.test(content)) {
      hindiInEnglishCount++;
    }

    if (!title.trim() || !content.trim()) {
      emptyEnglishCount++;
    }
  }

  console.log(`====================================================`);
  console.log(`Total Articles in Database: ${articles.length}`);
  console.log(`Articles with Hindi text in EN slot: ${hindiInEnglishCount}`);
  console.log(`Articles with missing/empty EN content: ${emptyEnglishCount}`);
  console.log(`====================================================`);

  await mongoose.disconnect();
}

verifyEnglishContent();
