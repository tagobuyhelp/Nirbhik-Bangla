const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');
const Category = require('../models/Category');

const categoryRules = [
  {
    slug: 'asansol',
    keywords: [
      'আসানসোল', 'Asansol', 'জিতেন্দ্র তিওয়ারি', 'জিতেন্দ্র', 'কল্যানেশ্বরী', 'কল্যাণেশ্বরী',
      'দেন্দুয়া', 'বারাবনি', 'কুলটি', 'হীরাপুর', 'রানীগঞ্জ', 'জামুড়িয়া', 'জামুরিয়া',
      'বরাকর', 'নিয়ামতপুর', 'আসানসোল উত্তর', 'আসানসোল দক্ষিণ', 'পৌরনিগম'
    ]
  },
  {
    slug: 'durgapur',
    keywords: [
      'দুর্গাপুর', 'Durgapur', 'ডিএসপি', 'ডিপিএল', 'পানাগড়', 'পানাগড়', 'কঙ্কসা',
      'অণ্ডাল', 'অন্ডাল', 'অণ্ডাল বিমানবন্দর', 'নিউ টাউনশিপ', 'সিটি সেন্টার দুর্গাপুর', 'ইস্পাত নগরী'
    ]
  },
  {
    slug: 'paschim-bardhaman',
    keywords: [
      'পশ্চিম বর্ধমান', 'Paschim Bardhaman', 'বর্ধমান', 'বার্নপুর', 'সালানপুর',
      'কয়লাখনি', 'কোলিয়ারি', 'কাঁকসা', 'পান্ডবেশ্বর', 'পাণ্ডবেশ্বর'
    ]
  },
  {
    slug: 'khela',
    keywords: [
      'খেলা', 'ক্রিকেট', 'ফুটবল', 'আইপিএল', 'IPL', 'ম্যাচ', 'ট্রফি', 'গোল',
      'অলিম্পিক', 'অস্ট্রেলিয়া', 'কোহলি', 'ধোনি', 'রোহিত', 'মেসি', 'রোনালদো',
      'সাইকেল র‍যেলি', 'সাইকেল', 'সাইক্লিং', 'টুর্নামেন্ট', 'চ্যাম্পিয়ন', 'উইকেট', 'স্পোর্টস', 'ক্যারাটে', 'গেমস'
    ]
  },
  {
    slug: 'binodon',
    keywords: [
      'বিনোদন', 'সিনেমা', 'চলচ্চিত্র', 'অভিনেতা', 'অভিনেত্রী', 'নাটক', 'সিরিয়াল',
      'বলিউড', 'টলিউড', 'হলিউড', 'গান', 'মিউজিক', 'মুভি', 'ট্রেলার', 'স্টার', 'শুটিং'
    ]
  },
  {
    slug: 'biswa',
    keywords: [
      'আন্তর্জাতিক', 'বিশ্ব', 'আমেরিকা', 'ইউরোপ', 'চীন', 'বাংলাদেশ', 'ইউক্রেন',
      'রাশিয়া', 'গাজা', 'ইজরায়েল', 'ট্রাম্প', 'বাইডেন', 'পুতিন', 'নেপাল', 'পাকিস্তান', 'গ্রিন কার্ড'
    ]
  },
  {
    slug: 'desh',
    keywords: [
      'কেন্দ্র', 'কেন্দ্রীয়', 'প্রধানমন্ত্রী', 'মোদী', 'নরেন্দ্র মোদী', 'দিল্লি',
      'সুপ্রিম কোর্ট', 'লোকসভা', 'স্বরাষ্ট্রমন্ত্রী', 'অমিত শাহ', 'রাহুল গান্ধী', 'কেন্দ্রের', 'সংসদ'
    ]
  },
  {
    slug: 'politics',
    keywords: [
      'রাজনীতি', 'তৃণমূল', 'বিজেপি', 'সিপিএম', 'কংগ্রেস', 'ভোট', 'নির্বাচন',
      'এমপি', 'বিধায়ক', 'প্রার্থী', 'দলীয়', 'শুভেন্দু', 'মমতা', 'অভিষেক',
      'কমিশন', 'প্রচার', 'নমিনেশন', 'নবান্ন', 'ব্রেগেড', 'ব্রিগেড'
    ]
  },
  {
    slug: 'business',
    keywords: [
      'ব্যবসা', 'বাণিজ্য', 'টাকা', 'কোটি', 'শিল্প', 'শেয়ার', 'ব্যাংক', 'জিএসটি', 'বাজেট', 'অর্থনীতি', 'মেগা শিল্প পার্ক'
    ]
  },
  {
    slug: 'lifestyle',
    keywords: [
      'লাইফস্টাইল', 'স্বাস্থ্য', 'রোগ', 'হাসপাতাল', 'ডাক্তার', 'রূপচর্চা', 'ভ্রমণ', 'রান্না', 'সম্পর্ক', 'জ্যোতিষ', 'ভ্যাকসিন'
    ]
  },
  {
    slug: 'projukti',
    keywords: [
      'প্রযুক্তি', 'স্মার্টফোন', 'এআই', 'গ্যাজেট', 'ইন্টারনেট', 'সাইবার', 'কম্পিউটার', 'মোবাইল'
    ]
  }
];

async function categorize() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const articles = await Article.find({}).lean();
    console.log(`Total Articles in DB: ${articles.length}`);

    const counts = {};
    let updatedCount = 0;

    const bulkOps = [];

    for (const art of articles) {
      const titleBn = art.translations?.get ? art.translations.get('bn')?.title : (art.translations?.bn?.title || '');
      const contentBn = art.translations?.get ? art.translations.get('bn')?.content : (art.translations?.bn?.content || '');
      const excerptBn = art.translations?.get ? art.translations.get('bn')?.excerpt : (art.translations?.bn?.excerpt || '');
      const fullText = `${titleBn} ${excerptBn} ${contentBn} ${(art.tags || []).join(' ')}`;

      let matchedSlug = null;

      for (const rule of categoryRules) {
        const hasMatch = rule.keywords.some((kw) => fullText.includes(kw));
        if (hasMatch) {
          matchedSlug = rule.slug;
          break;
        }
      }

      if (!matchedSlug) {
        matchedSlug = art.categorySlug || 'rajya';
      }

      counts[matchedSlug] = (counts[matchedSlug] || 0) + 1;

      if (matchedSlug !== art.categorySlug) {
        updatedCount++;
        bulkOps.push({
          updateOne: {
            filter: { _id: art._id },
            update: { $set: { categorySlug: matchedSlug } }
          }
        });
      }
    }

    console.log('\n=== Article Counts After Re-categorization ===');
    console.log(counts);
    console.log(`\nArticles to update: ${updatedCount}`);

    if (bulkOps.length > 0) {
      await Article.bulkWrite(bulkOps);
      console.log('Successfully updated article categorySlugs in MongoDB!');
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

categorize();
