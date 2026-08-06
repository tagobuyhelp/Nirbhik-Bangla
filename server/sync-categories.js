require('dotenv').config();
const connectDB = require('./src/config/db.js');
const Category = require('./src/models/Category.js');

const categoriesToInsert = [
  { bn: 'ব্রেকিং নিউজ', en: 'Breaking News', hi: 'ब्रेकिंग न्यूज़', slug: 'breaking' },
  { bn: 'পশ্চিম বর্ধমান', en: 'Paschim Bardhaman', hi: 'पश्चिम बर्धमान', slug: 'paschim-bardhaman' },
  { bn: 'আসানসোল', en: 'Asansol', hi: 'आसनसोल', slug: 'asansol' },
  { bn: 'দুর্গাপুর', en: 'Durgapur', hi: 'दुर्गापुर', slug: 'durgapur' },
  { bn: 'রাজ্য', en: 'State', hi: 'राज्य', slug: 'rajya' },
  { bn: 'দেশ', en: 'National', hi: 'राष्ट्रीय', slug: 'desh' },
  { bn: 'বিশ্ব', en: 'World', hi: 'विश्व', slug: 'biswa' },
  { bn: 'রাজনীতি', en: 'Politics', hi: 'राजनीति', slug: 'politics' },
  { bn: 'ব্যবসা', en: 'Business', hi: 'व्यापार', slug: 'business' },
  { bn: 'খেলা', en: 'Sports', hi: 'खेल', slug: 'khela' },
  { bn: 'বিনোদন', en: 'Entertainment', hi: 'मनोरंजन', slug: 'binodon' },
  { bn: 'লাইফস্টাইল', en: 'Lifestyle', hi: 'जीवन शैली', slug: 'lifestyle' },
  { bn: 'প্রযুক্তি', en: 'Technology', hi: 'प्रौद्योगिकी', slug: 'projukti' },
  { bn: 'স্বাস্থ্য', en: 'Health', hi: 'स्वास्थ्य', slug: 'health' },
  { bn: 'শিক্ষা', en: 'Education', hi: 'शिक्षा', slug: 'education' },
  { bn: 'অপরাধ', en: 'Crime', hi: 'अपराध', slug: 'crime' },
  { bn: 'আবহাওয়া', en: 'Weather', hi: 'मौसम', slug: 'weather' },
  { bn: 'ভিডিও', en: 'Video', hi: 'वीडियो', slug: 'video' },
];

async function syncCategories() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // 1. Delete all existing categories
    await Category.deleteMany({});
    console.log('Deleted all existing categories from the DB');

    // 2. Insert predefined ones
    const newCategories = categoriesToInsert.map((c, index) => ({
      name: { bn: c.bn, en: c.en, hi: c.hi },
      slug: c.slug,
      description: {
        bn: `${c.bn} - সংবাদ, খবর এবং আপডেট`,
        en: `${c.en} - News, reports and updates`,
        hi: `${c.hi} - समाचार, खबर और अपडेट`
      },
      seo: {
        title: `${c.bn} | Nirbhik Bangla`,
        metaDesc: `${c.bn} সম্পর্কে সব খবর জানুন নির্লিপ্ত বাংলায়।`,
        canonicalUrl: `https://nirbhikbangla.com/category/${c.slug}`
      },
      priority: index < 5 ? 'High' : 'Medium',
      isActive: true,
      color: '#eb1c24'
    }));

    const result = await Category.insertMany(newCategories);
    console.log(`Successfully inserted ${result.length} categories`);

    process.exit(0);
  } catch (error) {
    console.error('Error syncing categories:', error);
    process.exit(1);
  }
}

syncCategories();
