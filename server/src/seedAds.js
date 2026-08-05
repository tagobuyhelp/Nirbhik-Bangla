const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Advertisement = require('./models/Advertisement');

// Load env vars
dotenv.config({ path: __dirname + '/../.env' });

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

const ads = [
  {
    title: 'Evaly Anniversary Sale',
    adType: 'Image',
    locationSlot: 'Homepage - Top Banner',
    adCategory: 'Sponsor',
    priority: 'High',
    isActive: true,
    targetUrl: 'https://evaly.com.bd',
    imageUrl: 'https://res.cloudinary.com/dvfpt3ubn/image/upload/v1704257134/evaly_banner.jpg', // dummy url
    altText: 'Evaly Sale',
    description: 'Huge discounts on all electronics',
    ctaButton: 'Buy Now',
    customCta: '',
    devices: { desktop: true, mobile: true, tablet: true },
    frequencyCap: true,
    timezone: '(GMT+06:00) Dhaka, Bangladesh',
    impressionsCount: 230500,
    clicksCount: 1540
  },
  {
    title: 'Walton Smart TV',
    adType: 'Video',
    locationSlot: 'Article Page - Sidebar',
    adCategory: 'Direct Sales',
    priority: 'Medium',
    isActive: true,
    targetUrl: 'https://waltonbd.com',
    imageUrl: 'https://res.cloudinary.com/dvfpt3ubn/image/upload/v1704257134/walton_tv.jpg',
    altText: 'Walton TV',
    description: 'Experience 4K like never before',
    ctaButton: 'Learn More',
    customCta: '',
    devices: { desktop: true, mobile: false, tablet: false },
    frequencyCap: true,
    timezone: '(GMT+06:00) Dhaka, Bangladesh',
    impressionsCount: 140000,
    clicksCount: 890
  }
];

const seedAds = async () => {
  try {
    await Advertisement.deleteMany(); // Clear existing ads
    console.log('Ads collection cleared.');
    
    await Advertisement.insertMany(ads);
    console.log('Sample ads seeded successfully.');
    
    process.exit();
  } catch (err) {
    console.error('Error with data seeding', err);
    process.exit(1);
  }
};

seedAds();
