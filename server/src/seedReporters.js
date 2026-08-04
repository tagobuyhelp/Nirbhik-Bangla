require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const reportersToSeed = [
  {
    name: 'Amit Sen',
    email: 'amit.sen@nirbhikbangla.com',
    password: 'reporter123',
    phone: '+91 9830012345',
    role: 'Reporter',
    designation: 'Senior Reporter',
    specialization: 'Politics',
    location: 'West Bengal, India',
    reporterStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['Politics', 'Election Analysis', 'Interviews'],
    bio: 'Senior political analyst and field reporter covering local elections and policy decisions in West Bengal.',
    employeeId: 'RB010',
    gender: 'Male',
  },
  {
    name: 'Pooja Banerjee',
    email: 'pooja.b@nirbhikbangla.com',
    password: 'reporter123',
    phone: '+91 9831122334',
    role: 'Reporter',
    designation: 'Staff Reporter',
    specialization: 'Crime',
    location: 'Kolkata, West Bengal, India',
    reporterStatus: 'On Assignment',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['Investigative Journalism', 'Local Administration', 'Breaking News'],
    bio: 'Investigative journalist specializing in legal affairs and crime reporting in Kolkata.',
    employeeId: 'RB011',
    gender: 'Female',
  },
  {
    name: 'Rahul Roy',
    email: 'rahul.roy@nirbhikbangla.com',
    password: 'reporter123',
    phone: '+91 9832233445',
    role: 'Reporter',
    designation: 'District Correspondent',
    specialization: 'Sports',
    location: 'Asansol, West Bengal, India',
    reporterStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['Sports coverage', 'Photography', 'Match reports'],
    bio: 'Sports reporter covering local football, cricket leagues, and regional athletic tournaments.',
    employeeId: 'RB012',
    gender: 'Male',
  },
  {
    name: 'Anjali Das',
    email: 'anjali.das@nirbhikbangla.com',
    password: 'reporter123',
    phone: '+91 9833344556',
    role: 'Reporter',
    designation: 'Staff Reporter',
    specialization: 'Environment',
    location: 'Durgapur, West Bengal, India',
    reporterStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['Environmental reporting', 'Pollution tracking', 'Public Health'],
    bio: 'Passionate environmental reporter covering pollution control and industrial impact in Durgapur.',
    employeeId: 'RB013',
    gender: 'Female',
  },
  {
    name: 'Suresh Kumar',
    email: 'suresh.k@nirbhikbangla.com',
    password: 'reporter123',
    phone: '+91 9834455667',
    role: 'Reporter',
    designation: 'Photo Journalist',
    specialization: 'Culture',
    location: 'Siliguri, West Bengal, India',
    reporterStatus: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80',
    skills: ['Photojournalism', 'Culture features', 'Documentary photography'],
    bio: 'Photojournalist documenting cultural heritage, local festivals, and life across North Bengal.',
    employeeId: 'RB014',
    gender: 'Male',
  }
];

const seedReporters = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for reporter seeding');

    for (const reporterData of reportersToSeed) {
      // Check if already exists
      const exists = await User.findOne({ email: reporterData.email });
      if (exists) {
        console.log(`Reporter with email ${reporterData.email} already exists. Skipping.`);
        continue;
      }
      
      await User.create(reporterData);
      console.log(`Created reporter: ${reporterData.name}`);
    }

    console.log('Reporter seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding reporters:', error);
    process.exit(1);
  }
};

seedReporters();
