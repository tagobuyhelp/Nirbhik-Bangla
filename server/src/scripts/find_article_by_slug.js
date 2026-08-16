const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

async function findArticle() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const searchSlug = "on-the-occasion-of-international-youth-day-2026-bsf-south-bengal-frontier-organized-a-magnificent-15-kilometer-cycle-rally-bn";
  const baseSlug = searchSlug.replace(/-(en|bn|hi)$/i, '');

  console.log("Searching for slug:", searchSlug);
  console.log("Base slug:", baseSlug);

  const article = await Article.findOne({
    $or: [
      { 'translations.bn.slug': searchSlug },
      { 'translations.en.slug': searchSlug },
      { 'translations.hi.slug': searchSlug },
      { 'translations.bn.slug': baseSlug },
      { 'translations.en.slug': baseSlug },
      { 'translations.hi.slug': baseSlug },
      { 'translations.bn.slug': new RegExp(`^${baseSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') },
      { 'translations.en.slug': new RegExp(`^${baseSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') },
      { 'translations.hi.slug': new RegExp(`^${baseSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') },
    ],
  });

  if (article) {
    console.log("FOUND ARTICLE:", article._id);
    console.log("BN Title:", article.translations.get('bn')?.title);
    console.log("BN Slug:", article.translations.get('bn')?.slug);
    console.log("EN Slug:", article.translations.get('en')?.slug);
  } else {
    console.log("NOT FOUND!");
    // Find any article matching "international-youth-day"
    const partial = await Article.findOne({
      $or: [
        { 'translations.bn.title': /international youth day|আন্তর্জাতিক যুব দিবস/i },
        { 'translations.en.title': /international youth day|আন্তর্জাতিক যুব দিবস/i },
        { 'translations.hi.title': /international youth day|अंतरराष्ट्रीय युवा दिवस/i },
      ]
    });
    if (partial) {
      console.log("Found partial match:", partial._id);
      console.log("BN Slug:", partial.translations.get('bn')?.slug);
      console.log("EN Slug:", partial.translations.get('en')?.slug);
    }
  }

  await mongoose.disconnect();
}

findArticle();
