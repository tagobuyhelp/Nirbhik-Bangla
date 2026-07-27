require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

const resetCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Category.deleteMany({});
    console.log('Categories collection reset successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetCategories();
