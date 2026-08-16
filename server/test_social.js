require('dotenv').config();
const AIService = require('./src/services/aiService');

async function testAutoPost() {
  const title = "কলকাতায় ভারী বৃষ্টির পূর্বাভাস, তৈরি হচ্ছে নিম্নচাপ";
  const excerpt = "আগামী ২৪ ঘণ্টায় দক্ষিণবঙ্গের একাধিক জেলায় ভারী থেকে অতি ভারী বৃষ্টির পূর্বাভাস দিয়েছে আলিপুর আবহাওয়া দপ্তর। মৎস্যজীবীদের সমুদ্রে যেতে নিষেধ করা হয়েছে।";
  
  console.log("Generating AI Captions...");
  try {
    const start = Date.now();
    const captions = await AIService.generateSocialCaptions(title, excerpt, 'bn');
    console.log(`Generated in ${Date.now() - start}ms:`);
    console.log(JSON.stringify(captions, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
}

testAutoPost();

testAutoPost();
