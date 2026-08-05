const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Media = require('./models/Media');

dotenv.config();

const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/nirbhik-bangla';

mongoose.connect(dbUri)
  .then(() => console.log('MongoDB Connected for Seeding Media...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const dummyMedia = [
  {
    title: 'Nirbhik Logo Main',
    type: 'image',
    mime: 'image/png',
    size: 24500,
    width: 800,
    height: 600,
    url: 'https://placehold.co/800x600/png',
    thumbnailUrl: 'https://placehold.co/800x600/png',
    uploadedBy: new mongoose.Types.ObjectId()
  },
  {
    title: 'News Headline Cover',
    type: 'image',
    mime: 'image/jpeg',
    size: 154300,
    width: 1200,
    height: 675,
    url: 'https://placehold.co/1200x675/jpeg',
    thumbnailUrl: 'https://placehold.co/1200x675/jpeg',
    uploadedBy: new mongoose.Types.ObjectId()
  },
  {
    title: 'Interview With CM',
    type: 'video',
    mime: 'video/mp4',
    size: 15430000,
    width: 1920,
    height: 1080,
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://placehold.co/1920x1080/000000/FFF?text=Video',
    uploadedBy: new mongoose.Types.ObjectId()
  },
  {
    title: 'Press Release PDF',
    type: 'document',
    mime: 'application/pdf',
    size: 320000,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    uploadedBy: new mongoose.Types.ObjectId()
  },
  {
    title: 'Podcast Intro',
    type: 'audio',
    mime: 'audio/mpeg',
    size: 1024000,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    uploadedBy: new mongoose.Types.ObjectId()
  }
];

const seedMedia = async () => {
  try {
    await Media.deleteMany();
    console.log('Media cleared');
    await Media.insertMany(dummyMedia);
    console.log('Media imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedMedia();
