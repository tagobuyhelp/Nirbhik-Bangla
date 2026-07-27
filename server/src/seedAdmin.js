require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');

    const email = process.env.ADMIN_EMAIL || 'admin@nirbhikbangla.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if super admin already exists
    let admin = await User.findOne({ email });

    if (admin) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Create new super admin
    admin = await User.create({
      name: 'Super Admin',
      email,
      password,
      role: 'Super Admin',
      isActive: true,
      bio: 'System Administrator'
    });

    console.log(`Admin user created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
