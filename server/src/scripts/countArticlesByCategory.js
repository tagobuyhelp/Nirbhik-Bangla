const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');
const Category = require('../models/Category');

async function countArticlesByCategory() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const categories = await Category.find().lean();
  console.log(`Checking category article distribution across ${categories.length} categories in DB...\n`);

  const categoryCounts = await Article.aggregate([
    {
      $group: {
        _id: '$categorySlug',
        count: { $sum: 1 },
        sampleName: { $first: '$categoryName' },
      },
    },
    { $sort: { count: -1 } },
  ]);

  console.log("================ CATEGORY DISTRIBUTION ================");
  let totalArticles = 0;
  for (const item of categoryCounts) {
    totalArticles += item.count;
    console.log(`📌 Slug: ${String(item._id).padEnd(22)} | Name: ${String(item.sampleName || '').padEnd(20)} | Posts: ${item.count}`);
  }
  console.log("=======================================================");
  console.log(`TOTAL ARTICLES: ${totalArticles}`);

  await mongoose.disconnect();
}

countArticlesByCategory();
