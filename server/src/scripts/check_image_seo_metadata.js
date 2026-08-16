const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

const realHindiRegex = /[\u0904-\u0939\u093D-\u0950\u0958-\u0963]/;

async function checkImageSeoMetadata() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const articles = await Article.find().limit(10).lean();
  for (const art of articles) {
    console.log("------------------------------------------------");
    console.log("ID:", art._id);
    console.log("Title (bn):", art.translations?.bn?.title);
    console.log("Top-level imageMetadata:", art.imageMetadata);
    console.log("BN imageMetadata:", art.translations?.bn?.imageMetadata);
    console.log("EN imageMetadata:", art.translations?.en?.imageMetadata);
    console.log("BN SEO:", art.translations?.bn?.seo);
    console.log("EN SEO:", art.translations?.en?.seo);
  }

  await mongoose.disconnect();
}

checkImageSeoMetadata();
