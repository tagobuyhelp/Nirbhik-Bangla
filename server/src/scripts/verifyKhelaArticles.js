const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

async function inspectKhela() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const khelaArticles = await Article.find({ categorySlug: 'khela' }).lean();
    console.log(`\n=== Total ${khelaArticles.length} articles currently categorized as 'khela' ===`);

    for (const art of khelaArticles) {
      const title = art.translations?.get ? art.translations.get('bn')?.title : (art.translations?.bn?.title || art.title);
      console.log(`- ID: ${art._id} | Title: "${title}"`);
    }

    const businessArticles = await Article.find({ categorySlug: 'business' }).lean();
    console.log(`\n=== Total ${businessArticles.length} articles currently categorized as 'business' ===`);
    for (const art of businessArticles) {
      const title = art.translations?.get ? art.translations.get('bn')?.title : (art.translations?.bn?.title || art.title);
      console.log(`- ID: ${art._id} | Title: "${title}"`);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

inspectKhela();
