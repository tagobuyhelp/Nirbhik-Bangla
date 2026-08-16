const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

async function checkSpecificArticle() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const article = await Article.findOne({
    $or: [
      { 'translations.bn.title': /আন্তর্জাতিক যুব দিবস/i },
      { 'translations.en.title': /international youth day/i }
    ]
  });

  if (article) {
    console.log("-----------------------------------------");
    console.log("ID:", article._id);
    console.log("Author:", article.authorName);
    console.log("BN Title:", article.translations.get('bn')?.title);
    console.log("BN Excerpt:", article.translations.get('bn')?.excerpt);
    console.log("BN Content Preview:", article.translations.get('bn')?.content?.slice(0, 300));
    console.log("-----------------------------------------");
  } else {
    console.log("Article not found!");
  }

  await mongoose.disconnect();
}

checkSpecificArticle();
