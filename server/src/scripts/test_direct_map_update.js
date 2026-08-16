const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

const devanagariRegex = /[\u0900-\u097F]/;

async function testUpdate() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirbhik-bangla';
  await mongoose.connect(mongoUri);

  const art = await Article.findById('6a81412ff533fc086761e54d');
  const bnData = art.translations.get('bn');
  console.log("Before update Devanagari in bn.content?", devanagariRegex.test(bnData.content));

  // Translate bn content
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=bn&dt=t&q=${encodeURIComponent("अंतर्राष्ट्रीय युवा दिवस 2026 के अवसर पर सीमा सुरक्षा बल दक्षिण बंगाल")}`;
  const res = await fetch(url);
  const json = await res.json();
  const translatedStr = json[0].map(item => item[0]).join('');

  bnData.content = `<p>${translatedStr}</p>`;
  art.translations.set('bn', bnData);
  art.markModified('translations');
  await art.save();

  // Re-fetch from DB
  const updatedArt = await Article.findById('6a81412ff533fc086761e54d');
  const newBnData = updatedArt.translations.get('bn');
  console.log("After update Devanagari in bn.content?", devanagariRegex.test(newBnData.content));
  console.log("New content in DB:", newBnData.content);

  await mongoose.disconnect();
}

testUpdate();
