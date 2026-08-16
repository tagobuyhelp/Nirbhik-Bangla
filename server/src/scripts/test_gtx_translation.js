const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Article = require('../models/Article');

async function testTranslation() {
  const text = "अंतरराष्ट्रीय युवा दिवस 2026 के अवसर पर बीएसएफ दक्षिण बंगाल सीमांत के तत्वावधान में साइकिल रैली का आयोजन किया गया।";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=bn&dt=t&q=${encodeURIComponent(text)}`;
  
  const res = await fetch(url);
  const json = await res.json();
  const translated = json[0].map(item => item[0]).join('');
  console.log("Original Hindi:", text);
  console.log("Translated Bengali:", translated);
}

testTranslation();
