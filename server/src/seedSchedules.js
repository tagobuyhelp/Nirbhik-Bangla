const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
const Schedule = require('./models/Schedule');

const sampleSchedules = [
  {
    title: { bn: 'সকালের প্রথম খবর', en: 'Morning First News' },
    host: 'নুসরাত জাহান',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80',
    category: 'সংবাদ',
    startTime: '07:00 AM',
    endTime: '08:00 AM',
    startDate: new Date(),
    duration: '01:00:00',
    status: 'Live Now',
    isLive: true,
    platforms: ['web', 'yt', 'fb'],
    description: 'সারাদিনের দেশ-বিদেশের টাটকা খবরের আপডেট নিয়ে সকালের প্রথম বুলেটিন।'
  },
  {
    title: { bn: 'প্রাইম টাইম পলিটিক্স ডিবেট', en: 'Prime Time Politics Debate' },
    host: 'আরিফ হোসেন',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=400&q=80',
    category: 'রাজনীতি',
    startTime: '12:00 PM',
    endTime: '01:00 PM',
    startDate: new Date(),
    duration: '01:00:00',
    status: 'Upcoming',
    isLive: false,
    platforms: ['web', 'yt', 'fb'],
    description: 'রাজনীতির সাম্প্রতিক উত্তপ্ত বিষয় নিয়ে বিশেষজ্ঞ ও প্রতিনিধিদের মুখোমুখি তরকা।'
  },
  {
    title: { bn: 'খেলার খবর সারাদিন', en: 'Sports Today' },
    host: 'কাজী এনামুল',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
    category: 'খেলাধুলা',
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    startDate: new Date(),
    duration: '01:00:00',
    status: 'Upcoming',
    isLive: false,
    platforms: ['web', 'yt'],
    description: 'আইপিএল, ফুটবল ক্লাব কাপ ও আন্তর্জাতিক ক্রীড়াঙ্গনের সব খবর।'
  },
  {
    title: { bn: 'পশ্চিম বর্ধমান বিশেষ বুলেটিন', en: 'Paschim Bardhaman Special Bulletin' },
    host: 'মিতালী চৌধুরী',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80',
    category: 'আঞ্চলিক',
    startTime: '06:00 PM',
    endTime: '07:00 PM',
    startDate: new Date(),
    duration: '01:00:00',
    status: 'Upcoming',
    isLive: false,
    platforms: ['web', 'yt', 'fb'],
    description: 'আসানসোল, দুর্গাপুর ও সংলগ্ন এলাকার তাজা তথ্য নিয়ে বিশেষ কভারেজ।'
  },
  {
    title: { bn: 'সংধ্যার প্রধান খবর', en: 'Evening Prime News' },
    host: 'তানজিল আহমদ',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=400&q=80',
    category: 'সংবাদ',
    startTime: '08:00 PM',
    endTime: '09:00 PM',
    startDate: new Date(),
    duration: '01:00:00',
    status: 'Upcoming',
    isLive: false,
    platforms: ['web', 'yt', 'fb'],
    description: 'দিনের সবচাইতে বড় খবরগুলির সমাহার নিয়ে সন্ধ্যার প্রাইম টাইম বুলেটিন।'
  }
];

async function seedSchedules() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding Schedules...');

    await Schedule.deleteMany({});
    console.log('Existing schedules cleared.');

    const created = await Schedule.insertMany(sampleSchedules);
    console.log(`Successfully added ${created.length} program schedules to database!`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
}

seedSchedules();
