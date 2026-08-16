const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

async function deleteDuplicateArticles() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  const articles = await Article.find().sort({ createdAt: -1 }).lean();
  console.log(`Checking ${articles.length} articles for duplicates...`);

  const seenTitles = new Set();
  const idsToDelete = [];

  for (const art of articles) {
    const title = art.translations?.bn?.title || art.title || '';
    const normalizedTitle = title.trim().toLowerCase().slice(0, 30);

    if (seenTitles.has(normalizedTitle)) {
      idsToDelete.push(art._id);
    } else {
      seenTitles.add(normalizedTitle);
    }
  }

  if (idsToDelete.length > 0) {
    const res = await Article.deleteMany({ _id: { $in: idsToDelete } });
    console.log(`🗑️ Deleted ${res.deletedCount} duplicate articles from MongoDB.`);
  } else {
    console.log(`✅ Zero duplicate articles found in DB.`);
  }

  const remaining = await Article.countDocuments();
  console.log(`✅ Total unique articles remaining in DB: ${remaining}`);

  await mongoose.disconnect();
}

deleteDuplicateArticles();
