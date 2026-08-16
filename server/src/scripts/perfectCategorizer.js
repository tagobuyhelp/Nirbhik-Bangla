const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

async function perfectCategorize() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla');
    console.log('Connected to DB');

    const articles = await Article.find({});
    console.log(`Total Articles in DB: ${articles.length}`);

    const counts = {};
    let updatedCount = 0;

    for (const art of articles) {
      const bn = art.translations?.get ? art.translations.get('bn') : art.translations?.bn;
      const title = (bn?.title || art.title || '').trim();
      const content = (bn?.content || art.content || '').trim();
      const text = `${title} ${content}`.toLowerCase();

      let category = 'rajya'; // default

      // 1. SPORTS (খেলা) - Must be actual sports, not political campaigns
      if (
        (text.includes('ক্রিকেট') || text.includes('ফুটবল') || text.includes('আইপিএল') || text.includes('ipl') ||
         text.includes('বিশ্বকাপ') || text.includes('টি-টোয়েন্টি') || text.includes('অলিম্পিক') || text.includes('মেসি') ||
         text.includes('রোনালদো') || text.includes('কোহলি') || text.includes('ধোনি') || text.includes('রোহিত শর্মা') ||
         text.includes('ডুরান্ড কাপ') || text.includes('আইএসএল') || text.includes('অনূর্ধ্ব-১৯') || text.includes('সাইকেল র‍যেলি') ||
         text.includes('স্পোর্টিং ক্লাব') || text.includes('টুর্নামেন্ট')) &&
        !title.includes('ভোট') && !title.includes('প্রচারে') && !title.includes('রোড শো') && !title.includes('ইউসুফ পাঠান') &&
        !title.includes('মুখ্যমন্ত্রী') && !title.includes('শুভেন্দু') && !title.includes('তৃণমূল') && !title.includes('বিজেপি')
      ) {
        category = 'khela';
      }

      // 2. ENTERTAINMENT (বিনোদন) - Must be movies/entertainment, not NIA/police/politics
      else if (
        (text.includes('সিনেমা') || text.includes('চলচ্চিত্র') || text.includes('বলিউড') || text.includes('টলিউড') ||
         text.includes('হলিউড') || text.includes('অভিনেতা') || text.includes('অভিনেত্রী') || text.includes('সোহম মল্লিক') ||
         text.includes('সিরিয়াল') || text.includes('ওটিটি') || text.includes('ট্রেলার') || text.includes('মিউজিক ভিডিও') ||
         text.includes('শাহরুখ') || text.includes('সালমান') || text.includes('অমিতাভ')) &&
        !title.includes('এনআইএ') && !title.includes('তল্লাশি') && !title.includes('মূর্তি উধাও') &&
        !title.includes('বিক্ষোভ') && !title.includes('যানজট') && !title.includes('ট্রাফিক')
      ) {
        category = 'binodon';
      }

      // 3. BUSINESS / ECONOMY (ব্যবসা) - Must be corporate/economy, not sand/coal mining or politics
      else if (
        (text.includes('শেয়ার বাজার') || text.includes('শেয়ার মার্কেট') || text.includes('সেনসেক্স') || text.includes('নিফটি') ||
         text.includes('জিএসটি') || text.includes('রিজার্ভ ব্যাংক') || text.includes('সুদের হার') || text.includes('বাজেট') ||
         text.includes('অর্থনীতি') || text.includes('শ্যাম সেল অ্যান্ড পাওয়ার') || text.includes('সার্কাস')) &&
        !title.includes('অবৈধ বালি') && !title.includes('কয়লা') && !title.includes('SIR ইস্যুতে') && !title.includes('ইডির')
      ) {
        category = 'business';
      }

      // 4. WORLD (বিশ্ব) - International news only
      else if (
        (title.includes('আমেরিকা') || title.includes('ইউরোপ') || title.includes('ইউক্রেন') || title.includes('রাশিয়া') ||
         title.includes('গাজা') || title.includes('ইজরায়েল') || title.includes('ট্রাম্প') || title.includes('বাইডেন') ||
         title.includes('পুতিন') || title.includes('চীন') || title.includes('গ্রিন কার্ড') || title.includes('আন্তর্জাতিক')) &&
        !title.includes('কল্যাণেশ্বরী') && !title.includes('আসানসোল') && !title.includes('পশ্চিমবঙ্গ')
      ) {
        category = 'biswa';
      }

      // 5. NATIONAL (দেশ) - India national news
      else if (
        title.includes('প্রধানমন্ত্রী') || title.includes('মোদী') || title.includes('নরেন্দ্র মোদী') ||
        title.includes('সুপ্রিম কোর্ট') || title.includes('লোকসভা') || title.includes('স্বরাষ্ট্রমন্ত্রী') ||
        title.includes('অমিত শাহ') || title.includes('রাহুল গান্ধী') || title.includes('দিল্লি') ||
        title.includes('ধানবাদে ইডির') || title.includes('দেবঘরে')
      ) {
        category = 'desh';
      }

      // 6. POLITICS (রাজনীতি) - Political rallies, statements, campaigns
      else if (
        title.includes('তৃণমূল') || title.includes('বিজেপি') || title.includes('সিপিএম') || title.includes('কংগ্রেস') ||
        title.includes('শুভেন্দু') || title.includes('মমতা') || title.includes('অভিষেক') || title.includes('অগ্নিমিত্রা') ||
        title.includes('ভোট') || title.includes('নির্বাচন') || title.includes('এমপি') || title.includes('বিধায়ক') ||
        title.includes('ইউসুফ পাঠান') || title.includes('রাজনীতি') || title.includes('SIR ইস্যুতে') ||
        title.includes('বিক্ষোভ') || title.includes('মূর্তি উধাও') || title.includes('স্মারকলিপি')
      ) {
        category = 'politics';
      }

      // 7. REGIONAL - ASANSOL
      else if (
        title.includes('আসানসোল') || title.includes('asansol') || title.includes('জিতেন্দ্র তিওয়ারি') ||
        title.includes('অন্ডাল') || title.includes('জামুড়িয়া') || title.includes('রানীগঞ্জ') || title.includes('রাণীগঞ্জ') ||
        title.includes('কল্যাণেশ্বরী') || title.includes('বার্নপুর') || title.includes('অবৈধ বালি')
      ) {
        category = 'asansol';
      }

      // 8. REGIONAL - DURGAPUR
      else if (
        title.includes('দুর্গাপুর') || title.includes('durgapur') || title.includes('পানাগড়') ||
        title.includes('ডিএসপি') || title.includes('ডিপিএল') || title.includes('এনআইএ\'র তল্লাশি')
      ) {
        category = 'durgapur';
      }

      // 9. REGIONAL - PASCHIM BARDHAMAN
      else if (
        title.includes('পশ্চিম বর্ধমান') || title.includes('সালানপুর') || title.includes('কয়লাখনি') || title.includes('ইসিএল')
      ) {
        category = 'paschim-bardhaman';
      }

      counts[category] = (counts[category] || 0) + 1;

      if (art.categorySlug !== category) {
        art.categorySlug = category;
        await art.save();
        updatedCount++;
      }
    }

    console.log('\n=== Perfect Categorization Report ===');
    console.log(counts);
    console.log(`\nTotal updated articles: ${updatedCount}`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

perfectCategorize();
