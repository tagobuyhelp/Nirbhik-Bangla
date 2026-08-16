const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

const strictSportsKeywords = [
  'ক্রিকেট', 'ফুটবল', 'আইপিএল', 'ipl', 'বিশ্বকাপ', 'টি-টোয়েন্টি', 'অনূর্ধ্ব-১৯',
  'মেসি', 'রোনালদো', 'কোহলি', 'ধোনি', 'রোহিত', 'অলিম্পিক', 'হকি', 'আইএসএল',
  'ডুরান্ড কাপ', 'মোহনবাগান', 'ইস্টবেঙ্গল', 'সাইকেল র‍যেলি', 'ব্যাডমিন্টন', 'টেনিস'
];

const strictEntKeywords = [
  'সিনেমা', 'চলচ্চিত্র', 'অভিনেতা', 'অভিনেত্রী', 'বলিউড', 'টলিউড', 'হলিউড',
  'সিরিয়াল', 'নায়ক', 'নায়িকা', 'শাহরুখ', 'সালমান', 'অমিতাভ', 'প্রসেনজিৎ',
  'ট্রেলার', 'মিউজিক ভিডিও', 'গায়ক', 'গায়িকা', 'সোহম মল্লিক'
];

const strictBusinessKeywords = [
  'শেয়ার বাজার', 'শেয়ার মার্কেট', 'সেনসেক্স', 'নিফটি', 'অর্থনীতি', 'জিএসটি',
  'রিজার্ভ ব্যাংক', 'সুদের হার', 'বাজেট', 'মেগা শিল্প পার্ক', 'কারখানা বন্ধ',
  'শ্যাম সেল অ্যান্ড পাওয়ার', 'ব্যাংক'
];

const strictPoliticsKeywords = [
  'রাজনীতি', 'তৃণমূল', 'বিজেপি', 'সিপিএম', 'কংগ্রেস', 'ভোট', 'নির্বাচন',
  'এমপি', 'বিধায়ক', 'প্রার্থী', 'দলীয়', 'শুভেন্দু', 'মমতা', 'অভিষেক',
  'নির্বাচন কমিশন', 'সাহজাহান', 'অগ্নিমিত্রা পাল'
];

const strictBiswaKeywords = [
  'আন্তর্জাতিক', 'আমেরিকা', 'ইউরোপ', 'চীন', 'ইউক্রেন', 'রাশিয়া',
  'গাজা', 'ইজরায়েল', 'ট্রাম্প', 'বাইডেন', 'পুতিন'
];

const strictDeshKeywords = [
  'কেন্দ্রীয়', 'প্রধানমন্ত্রী', 'মোদী', 'সুপ্রিম কোর্ট', 'লোকসভা',
  'স্বরাষ্ট্রমন্ত্রী', 'অমিত শাহ', 'রাহুল গান্ধী', 'দিল্লি', 'ধানবাদ'
];

async function reCategorizeStrictly() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const articles = await Article.find({});
    console.log(`Total Articles: ${articles.length}`);

    let updatedCount = 0;
    const catCounts = {};

    for (const art of articles) {
      const bn = art.translations?.get ? art.translations.get('bn') : art.translations?.bn;
      const title = (bn?.title || '').toLowerCase();
      const content = (bn?.content || '').toLowerCase();
      const excerpt = (bn?.excerpt || '').toLowerCase();
      const fullText = `${title} ${excerpt} ${content}`;

      let targetCat = null;

      // 1. Check Sports (MUST NOT be political)
      if (strictSportsKeywords.some((kw) => title.includes(kw) || fullText.includes(kw))) {
        if (!title.includes('শুভেন্দু') && !title.includes('মমতা') && !title.includes('তৃণমূল') && !title.includes('বিজেপি') && !title.includes('হাই কোর্ট')) {
          targetCat = 'khela';
        }
      }

      // 2. Check Entertainment
      if (!targetCat && strictEntKeywords.some((kw) => title.includes(kw) || fullText.includes(kw))) {
        targetCat = 'binodon';
      }

      // 3. Check Business/Economy
      if (!targetCat && strictBusinessKeywords.some((kw) => title.includes(kw) || fullText.includes(kw))) {
        targetCat = 'business';
      }

      // 4. Check Regional Asansol
      if (!targetCat && (title.includes('আসানসোল') || title.includes('asansol') || title.includes('জিতেন্দ্র তিওয়ারি') || title.includes('অন্ডাল') || title.includes('জামুড়িয়া') || title.includes('রানীগঞ্জ'))) {
        targetCat = 'asansol';
      }

      // 5. Check Regional Durgapur
      if (!targetCat && (title.includes('দুর্গাপুর') || title.includes('durgapur') || title.includes('পানাগড়') || title.includes('ডিএসপি') || title.includes('ডিপিএল'))) {
        targetCat = 'durgapur';
      }

      // 6. Check Regional Paschim Bardhaman
      if (!targetCat && (title.includes('পশ্চিম বর্ধমান') || title.includes('বার্নপুর') || title.includes('সালানপুর') || title.includes('কয়লাখনি'))) {
        targetCat = 'paschim-bardhaman';
      }

      // 7. Check World News
      if (!targetCat && strictBiswaKeywords.some((kw) => title.includes(kw))) {
        targetCat = 'biswa';
      }

      // 8. Check National News
      if (!targetCat && strictDeshKeywords.some((kw) => title.includes(kw))) {
        targetCat = 'desh';
      }

      // 9. Check Politics News
      if (!targetCat && (strictPoliticsKeywords.some((kw) => title.includes(kw)) || title.includes('বিক্ষোভ') || title.includes('মিছিল'))) {
        targetCat = 'politics';
      }

      // Default fallback
      if (!targetCat) {
        targetCat = 'rajya';
      }

      catCounts[targetCat] = (catCounts[targetCat] || 0) + 1;

      if (art.categorySlug !== targetCat) {
        art.categorySlug = targetCat;
        await art.save();
        updatedCount++;
      }
    }

    console.log('\n=== Re-categorization Summary ===');
    console.log(catCounts);
    console.log(`\nUpdated articles count: ${updatedCount}`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

reCategorizeStrictly();
