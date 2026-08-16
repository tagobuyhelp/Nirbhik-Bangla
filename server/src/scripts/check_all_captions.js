const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

const realHindiRegex = /[\u0904-\u0939\u093D-\u0950\u0958-\u0963]/;

async function checkAllCaptions() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const articles = await Article.find().limit(5).lean();
  for (const art of articles) {
    console.log("=========================================");
    console.log("Article ID:", art._id);
    console.log("BN Caption:", art.translations?.bn?.imageMetadata?.caption);
    console.log("EN Caption:", art.translations?.en?.imageMetadata?.caption);
    console.log("HI Caption:", art.translations?.hi?.imageMetadata?.caption);
  }

  await mongoose.disconnect();
}

checkAllCaptions();
