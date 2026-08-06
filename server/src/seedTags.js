const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tag = require('./models/Tag');

// Load env vars
dotenv.config();

// Connect Database
const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/nirbhik-bangla';
mongoose.connect(dbUri)
  .then(() => console.log('MongoDB Connected for Seeding Tags...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const dummyTags = [
  {
    name: {
      bn: 'রাজনীতি',
      en: 'Politics',
      hi: 'राजनीति'
    },
    slug: 'politics',
    usageCount: 154
  },
  {
    name: {
      bn: 'খেলাধুলা',
      en: 'Sports',
      hi: 'खेल'
    },
    slug: 'sports',
    usageCount: 89
  },
  {
    name: {
      bn: 'বিনোদন',
      en: 'Entertainment',
      hi: 'मनोरंजन'
    },
    slug: 'entertainment',
    usageCount: 120
  },
  {
    name: {
      bn: 'বাংলাদেশ',
      en: 'Bangladesh',
      hi: 'बांग्लादेश'
    },
    slug: 'bangladesh',
    usageCount: 350
  },
  {
    name: {
      bn: 'কলকাতা',
      en: 'Kolkata',
      hi: 'कोलकाता'
    },
    slug: 'kolkata',
    usageCount: 205
  },
  {
    name: {
      bn: 'অর্থনীতি',
      en: 'Economy',
      hi: 'अर्थव्यवस्था'
    },
    slug: 'economy',
    usageCount: 45
  },
  {
    name: {
      bn: 'আবহাওয়া',
      en: 'Weather',
      hi: 'मौसम'
    },
    slug: 'weather',
    usageCount: 78
  },
  {
    name: {
      bn: 'বিজ্ঞান ও প্রযুক্তি',
      en: 'Science & Tech',
      hi: 'विज्ञान और प्रौद्योगिकी'
    },
    slug: 'science-tech',
    usageCount: 30
  },
  {
    name: {
      bn: 'নির্বাচন',
      en: 'Election',
      hi: 'चुनाव'
    },
    slug: 'election',
    usageCount: 0
  },
  {
    name: {
      bn: 'লাইফস্টাইল',
      en: 'Lifestyle',
      hi: 'जीवनशैली'
    },
    slug: 'lifestyle',
    usageCount: 65
  }
];

const seedTags = async () => {
  try {
    await Tag.deleteMany();
    console.log('Existing tags cleared');
    await Tag.insertMany(dummyTags);
    console.log('Tags imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedTags();
