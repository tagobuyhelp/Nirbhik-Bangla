const mongoose = require('mongoose');
const Video = require('./src/models/Video');
mongoose.connect('mongodb://localhost:27017/nirbhik-bangla').then(async () => {
  await Video.updateMany({}, { $set: { views: 0 } });
  console.log('Reset dummy video views to 0');
  process.exit(0);
});
