const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

const DEMO_SLUGS = [
  'paschim-bardhaman-new-industrial-park-500-crore',
  'paschim-bardhaman-rural-road-repair',
  'asansol-gt-road-new-flyover-plan',
  'asansol-hospital-new-icu-unit',
  'durgapur-steel-plant-green-tech',
  'nirbhik-bangla-live-bulletin-video-update',
  'lok-sabha-vote-result',
  'pm-new-scheme-10-lakh',
  'election-commission-meeting',
  'opposition-alliance-delhi-meeting',
];

const DEMO_TITLE_SUBSTRINGS = [
  'লোকসভা ভোটের ফল ঘোষণা আজ',
  'প্রধানমন্ত্রীর নতুন প্রকল্পে মিলবে ১০ লক্ষ টাকা',
  'নির্বাচন কমিশনের আধিকারিকদের বৈঠক',
  'জোট গঠন নিয়ে দিল্লিতে বৈঠকে',
  'আসানসোল জিটি রোডের যানজট নিরসনে',
  'পশ্চিম বর্ধমানে ৫০০ কোটি টাকা ব্যয়ে মেগা শিল্প পার্ক',
  'পশ্চিম বর্ধমানে গ্রামীণ সড়ক সংস্কারে জোর',
  'আসানসোল জেলা হাসপাতালে নতুন আইসিইউ',
  'দুর্গাপুর স্টিল প্ল্যান্টে পরিবেশবান্ধব গ্রিন স্টিল',
  'নির্ভীক বাংলা স্পেশাল ভিডিও বুলেটিন',
];

async function deleteDemoSeedArticles() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);
  console.log(`🍃 Connected to MongoDB: ${mongoUri}`);

  // Delete matching demo slugs or title substrings
  const deleteConditions = [
    { slug: { $in: DEMO_SLUGS } },
    { 'translations.bn.slug': { $in: DEMO_SLUGS } },
    { title: { $in: DEMO_TITLE_SUBSTRINGS } },
    { 'translations.bn.title': { $regex: new RegExp(DEMO_TITLE_SUBSTRINGS.join('|'), 'i') } },
  ];

  const result = await Article.deleteMany({ $or: deleteConditions });
  console.log(`🗑️ Deleted ${result.deletedCount} demo/placeholder seed articles from MongoDB.`);

  const remaining = await Article.countDocuments();
  console.log(`✅ Total authentic articles remaining in DB: ${remaining}`);

  await mongoose.disconnect();
}

deleteDemoSeedArticles();
