require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Tag = require('./models/Tag');

const categoriesToSeed = [
  { name: { bn: 'প্রচ্ছদ', en: 'Home', hi: 'होम' }, slug: 'home', order: 1 },
  { name: { bn: 'ব্রেকিং নিউজ', en: 'Breaking News', hi: 'ब्रेकिंग न्यूज़' }, slug: 'breaking', order: 2 },
  { name: { bn: 'পশ্চিম বর্ধমান', en: 'Paschim Bardhaman', hi: 'पश्चिम बर्धमान' }, slug: 'paschim-bardhaman', order: 3 },
  { name: { bn: 'আসানসোল', en: 'Asansol', hi: 'आसनसोल' }, slug: 'asansol', order: 4 },
  { name: { bn: 'দুর্গাপুর', en: 'Durgapur', hi: 'दुर्गापुर' }, slug: 'durgapur', order: 5 },
  { name: { bn: 'রাজ্য', en: 'State', hi: 'राज्य' }, slug: 'rajya', order: 6 },
  { name: { bn: 'দেশ', en: 'National', hi: 'राष्ट्रीय' }, slug: 'desh', order: 7 },
  { name: { bn: 'বিশ্ব', en: 'World', hi: 'विश्व' }, slug: 'biswa', order: 8 },
  { name: { bn: 'খেলা', en: 'Sports', hi: 'खेल' }, slug: 'khela', order: 9 },
  { name: { bn: 'বিনোদন', en: 'Entertainment', hi: 'मनोरंजन' }, slug: 'binodon', order: 10 },
  { name: { bn: 'লাইফস্টাইল', en: 'Lifestyle', hi: 'जीवन शैली' }, slug: 'lifestyle', order: 11 },
  { name: { bn: 'প্রযুক্তি', en: 'Technology', hi: 'प्रौद्योगिकी' }, slug: 'projukti', order: 12 },
  { name: { bn: 'ভিডিও', en: 'Video', hi: 'वीडियो' }, slug: 'video', order: 13 },
];

const tagsToSeed = [
  { name: { bn: 'ভারত', en: 'India' }, slug: 'india' },
  { name: { bn: 'পশ্চিমবঙ্গ', en: 'West Bengal' }, slug: 'west-bengal' },
  { name: { bn: 'রাজনীতি', en: 'Politics' }, slug: 'politics' },
  { name: { bn: 'ক্রিকেট', en: 'Cricket' }, slug: 'cricket' },
  { name: { bn: 'বলিউড', en: 'Bollywood' }, slug: 'bollywood' },
  { name: { bn: 'টলিউড', en: 'Tollywood' }, slug: 'tollywood' },
  { name: { bn: 'নির্বাচন', en: 'Election' }, slug: 'election' },
  { name: { bn: 'শেয়ার বাজার', en: 'Stock Market' }, slug: 'stock-market' },
  { name: { bn: 'কৃষি', en: 'Agriculture' }, slug: 'agriculture' },
  { name: { bn: 'শিক্ষা', en: 'Education' }, slug: 'education' },
  { name: { bn: 'আবহাওয়া', en: 'Weather' }, slug: 'weather' },
  { name: { bn: 'স্বাস্থ্য', en: 'Health' }, slug: 'health' },
  { name: { bn: 'বিজ্ঞান', en: 'Science' }, slug: 'science' },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing
    await Category.deleteMany({});
    await Tag.deleteMany({});
    console.log('Cleared existing categories and tags');

    // Insert new
    await Category.insertMany(categoriesToSeed);
    await Tag.insertMany(tagsToSeed);
    console.log('Successfully seeded Categories and Tags!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
