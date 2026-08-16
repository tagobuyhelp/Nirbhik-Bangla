const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Article = require('../models/Article');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
  const total = await Article.countDocuments();
  const bn = await Article.countDocuments({ originalLanguage: 'bn' });
  const hi = await Article.countDocuments({ originalLanguage: 'hi' });
  const sampleBn = await Article.findOne({ originalLanguage: 'bn' });
  const sampleHi = await Article.findOne({ originalLanguage: 'hi' });

  console.log('=== DATABASE VERIFICATION ===');
  console.log(`Total Articles: ${total}`);
  console.log(`Bengali Articles: ${bn}`);
  console.log(`Hindi Articles: ${hi}`);
  console.log('\nSample Bengali Article:', {
    title: sampleBn?.translations.get('bn')?.title,
    slug: sampleBn?.translations.get('bn')?.slug,
    category: sampleBn?.categoryName,
    image: sampleBn?.featuredImageUrl,
  });
  console.log('\nSample Hindi Article:', {
    title: sampleHi?.translations.get('hi')?.title,
    slug: sampleHi?.translations.get('hi')?.slug,
    category: sampleHi?.categoryName,
    image: sampleHi?.featuredImageUrl,
  });

  await mongoose.disconnect();
}

check();
