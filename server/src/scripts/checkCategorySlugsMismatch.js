const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');
const Category = require('../models/Category');

async function checkMismatch() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const categories = await Category.find().lean();
    console.log('=== Registered Categories in DB ===');
    categories.forEach((c) => {
      console.log(`- Name: ${JSON.stringify(c.name)}, Slug: "${c.slug}"`);
    });

    const articleCategorySlugs = await Article.distinct('categorySlug');
    console.log('\n=== Distinct categorySlug values in Article collection ===');
    console.log(articleCategorySlugs);

    // Group article counts by categorySlug
    const counts = await Article.aggregate([
      { $group: { _id: '$categorySlug', count: { $sum: 1 } } }
    ]);
    console.log('\n=== Article counts per categorySlug ===');
    counts.forEach((c) => {
      console.log(`- "${c._id}": ${c.count} articles`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkMismatch();
