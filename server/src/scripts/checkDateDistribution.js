const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

async function inspectDates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const articles = await Article.find({}, { publishedAt: 1, createdAt: 1 }).lean();
    console.log(`Total Articles: ${articles.length}`);

    const yearCounts = {};

    articles.forEach((art) => {
      const d = new Date(art.publishedAt || art.createdAt);
      const yr = d.getFullYear();
      yearCounts[yr] = (yearCounts[yr] || 0) + 1;
    });

    console.log('\n=== Article Year Counts ===');
    console.log(yearCounts);

    const newest = await Article.findOne({}).sort({ publishedAt: -1 }).lean();
    const oldest = await Article.findOne({}).sort({ publishedAt: 1 }).lean();

    console.log('\nNewest Article publishedAt:', newest?.publishedAt);
    console.log('Oldest Article publishedAt:', oldest?.publishedAt);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

inspectDates();
