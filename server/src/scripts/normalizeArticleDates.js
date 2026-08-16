const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

async function normalizeDates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const articles = await Article.find({}).sort({ publishedAt: -1, _id: -1 });
    console.log(`Normalizing dates for ${articles.length} articles...`);

    const now = new Date(); // Current live time!

    for (let i = 0; i < articles.length; i++) {
      const art = articles[i];
      let offsetMins = 0;

      if (i < 10) {
        // Top 10 articles: 15 to 120 minutes ago
        offsetMins = i * 15 + 5;
      } else if (i < 30) {
        // Next 20 articles: 2 to 12 hours ago
        offsetMins = 150 + (i - 10) * 30;
      } else if (i < 60) {
        // Next 30 articles: yesterday (12 to 36 hours ago)
        offsetMins = 750 + (i - 30) * 45;
      } else {
        // Rest: 2 to 3 hours apart
        offsetMins = 2100 + (i - 60) * 120;
      }

      const newDate = new Date(now.getTime() - offsetMins * 60 * 1000);

      art.publishedAt = newDate;
      art.createdAt = newDate;
      art.updatedAt = newDate;

      await art.save();
    }

    console.log(`\nSuccessfully normalized dates for ${articles.length} articles!`);
    console.log(`Top 1 date: ${articles[0].publishedAt}`);
    console.log(`Top 2 date: ${articles[1].publishedAt}`);
    console.log(`Top 5 date: ${articles[4].publishedAt}`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

normalizeDates();
