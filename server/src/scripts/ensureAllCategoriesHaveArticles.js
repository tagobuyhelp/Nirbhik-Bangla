const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

async function ensureCoverage() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    // Ensure lifestyle has articles (health, hospital, lifestyle, medicine)
    const lifestyleQuery = {
      $or: [
        { 'translations.bn.title': /স্বাস্থ্য|ডাক্তার|হাসপাতাল|চিকিৎসা|রোগ|মেডিক্যাল/i },
        { 'translations.bn.content': /স্বাস্থ্য|ডাক্তার|হাসপাতাল|চিকিৎসা/i }
      ]
    };
    await Article.updateMany(lifestyleQuery, { $set: { categorySlug: 'lifestyle' } });
    const lifestyleCount = await Article.countDocuments({ categorySlug: 'lifestyle' });
    console.log(`Lifestyle articles count: ${lifestyleCount}`);

    // Ensure projukti has articles (technology, AI, smartphone, mobile, cyber)
    const projuktiQuery = {
      $or: [
        { 'translations.bn.title': /প্রযুক্তি|স্মার্টফোন|এআই|সাইবার|ইন্টারনেট|গ্যাজেট|মোবাইল|কম্পিউটার/i },
        { 'translations.bn.content': /প্রযুক্তি|স্মার্টফোন|এআই|সাইবার/i }
      ]
    };
    await Article.updateMany(projuktiQuery, { $set: { categorySlug: 'projukti' } });
    const projuktiCount = await Article.countDocuments({ categorySlug: 'projukti' });
    console.log(`Projukti articles count: ${projuktiCount}`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

ensureCoverage();
