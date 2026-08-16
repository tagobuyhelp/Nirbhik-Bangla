const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

async function checkSlugs() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const articles = await Article.find().limit(10).lean();
  for (const art of articles) {
    console.log("-----------------------------------------");
    console.log("ID:", art._id);
    console.log("BN Title:", art.translations?.bn?.title);
    console.log("BN Slug:", art.translations?.bn?.slug);
    console.log("EN Slug:", art.translations?.en?.slug);
    console.log("HI Slug:", art.translations?.hi?.slug);
  }

  await mongoose.disconnect();
}

checkSlugs();
