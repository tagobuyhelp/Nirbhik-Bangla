const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Article = require('../models/Article');

async function checkHindiContent() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const articles = await Article.find();
  console.log(`Checking ${articles.length} articles for Hindi devanagari content...`);

  // Devanagari Unicode range: \u0900-\u097F
  const devanagariRegex = /[\u0900-\u097F]/;

  let hindiCount = 0;
  for (const art of articles) {
    const bnData = art.translations.get('bn') || art.translations.bn || {};
    const bnContent = bnData.content || '';
    if (devanagariRegex.test(bnContent)) {
      hindiCount++;
    }
  }

  console.log(`Found ${hindiCount} articles with Devanagari/Hindi text in Bengali content!`);
  await mongoose.disconnect();
}

checkHindiContent();
