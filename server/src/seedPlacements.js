const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AdPlacement = require('./models/AdPlacement');

dotenv.config();

const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/nirbhik-bangla';

mongoose.connect(dbUri)
  .then(() => console.log('MongoDB Connected for Seeding Placements...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const placements = [
  {
    placementName: 'Top Banner',
    placementType: 'Banner',
    location: 'Top of Homepage',
    adSize: '970 x 90',
    isActive: true,
    devices: { desktop: true, mobile: true, tablet: true },
    impressionsCount: 1250000,
    clicksCount: 9850
  },
  {
    placementName: 'Article Sidebar 1',
    placementType: 'Sidebar',
    location: 'Right Sidebar (Articles)',
    adSize: '300 x 250',
    isActive: true,
    devices: { desktop: true, mobile: false, tablet: true },
    impressionsCount: 820000,
    clicksCount: 6250
  },
  {
    placementName: 'In-Content Ad',
    placementType: 'In-Content',
    location: 'Inside Article (After 3rd Para)',
    adSize: '728 x 90',
    isActive: true,
    devices: { desktop: true, mobile: true, tablet: true },
    impressionsCount: 640000,
    clicksCount: 4950
  },
  {
    placementName: 'Mobile In-Article',
    placementType: 'In-Content',
    location: 'Mobile Article (After 2nd Para)',
    adSize: '300 x 250',
    isActive: true,
    devices: { desktop: false, mobile: true, tablet: false },
    impressionsCount: 410000,
    clicksCount: 3120
  },
  {
    placementName: 'Homepage Middle',
    placementType: 'Banner',
    location: 'Homepage - Middle',
    adSize: '970 x 250',
    isActive: false,
    devices: { desktop: true, mobile: true, tablet: true },
    impressionsCount: 0,
    clicksCount: 0
  }
];

const seedPlacements = async () => {
  try {
    await AdPlacement.deleteMany();
    console.log('Placements cleared');
    await AdPlacement.insertMany(placements);
    console.log('Placements imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedPlacements();
