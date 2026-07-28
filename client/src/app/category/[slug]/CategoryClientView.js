'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  Bookmark,
  CheckCircle,
  ArrowRight,
  Send,
  CalendarDays,
  Clock,
  Bell,
  Share2,
  RotateCw,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const categoryNamesFallback = {
  'paschim-bardhaman': 'পশ্চিম বর্ধমান',
  asansol: 'আসানসোল',
  durgapur: 'দুর্গাপুর',
  rajya: 'রাজ্য',
  desh: 'দেশ',
  biswa: 'বিশ্ব',
  khela: 'খেলা',
  binodon: 'বিনোদন',
  lifestyle: 'লাইফস্টাইল',
  projukti: 'প্রযুক্তি',
  video: 'ভিডিও',
  breaking: 'ব্রেকিং নিউজ',
  latest: 'সর্বশেষ খবর',
  popular: 'জনপ্রিয় খবর',
};

const categorySubTopicsByLang = {
  bn: {
    desh: ['রাজনীতি', 'নির্বাচন', 'সরকার', 'প্রশাসন', 'আইন-আদালত', 'শিক্ষা', 'স্বাস্থ্য', 'অপরাধ'],
    'paschim-bardhaman': ['আসানসোল', 'দুর্গাপুর', 'রানীগঞ্জ', 'জামুড়িয়া', 'আমনপুর', 'কয়লাখনি', 'পৌরসভা'],
    asansol: ['পৌরসভা', 'ট্রাফিক', 'অপরাধ', 'উন্নয়ন', 'স্বাস্থ্য', 'শিক্ষা', 'বাণিজ্য'],
    durgapur: ['ইস্পাত নগরী', 'স্মার্ট সিটি', 'শিল্প', 'শিক্ষা', 'অপরাধ', 'পৌরসভা'],
    rajya: ['কলকাতা', 'উত্তরবঙ্গ', 'দক্ষিণবঙ্গ', 'রাজনীতি', 'প্রশাসন', 'আইন-আদালত'],
    biswa: ['আমেরিকা', 'ইউরোপ', 'এশিয়া', 'মধ্যপ্রাচ্য', 'কূটনীতি', 'যুদ্ধ-সংঘাত'],
    khela: ['ক্রিকেট', 'ফুটবল', 'আইপিএল', 'অলিম্পিক', 'টেনিস', 'ব্যাডমিন্টন'],
    binodon: ['বলিউড', 'টলিউড', 'ওটিটি', 'টেলিভিশন', 'সঙ্গীত', 'ফ্যাশন'],
    lifestyle: ['স্বাস্থ্য', 'রূপচর্চা', 'ভ্রমণ', 'রান্নাঘর', 'সম্পর্ক', 'জ্যোতিষ'],
    projukti: ['স্মার্টফোন', 'এআই', 'অ্যাপস', 'গ্যাজেট', 'সাইবার নিরাপত্তা'],
    video: ['বিশেষ রিপোর্ট', 'সাক্ষাৎকার', 'লাইভ', 'ব্রেকিং'],
    breaking: ['রাজনীতি', 'দুর্ঘটনা', 'অপরাধ', 'হট নিউজ'],
    latest: ['সকল খবর', 'রাজনীতি', 'বিনোদন', 'খেলা', 'বাণিজ্য'],
  },
  en: {
    desh: ['Politics', 'Elections', 'Government', 'Administration', 'Judiciary', 'Education', 'Health', 'Crime'],
    'paschim-bardhaman': ['Asansol', 'Durgapur', 'Raniganj', 'Jamuria', 'Amanpur', 'Colliery', 'Municipality'],
    asansol: ['Municipality', 'Traffic', 'Crime', 'Development', 'Health', 'Education', 'Business'],
    durgapur: ['Steel City', 'Smart City', 'Industry', 'Education', 'Crime', 'Municipality'],
    rajya: ['Kolkata', 'North Bengal', 'South Bengal', 'Politics', 'Administration', 'Judiciary'],
    biswa: ['USA', 'Europe', 'Asia', 'Middle East', 'Diplomacy', 'Conflict'],
    khela: ['Cricket', 'Football', 'IPL', 'Olympics', 'Tennis', 'Badminton'],
    binodon: ['Bollywood', 'Tollywood', 'OTT', 'Television', 'Music', 'Fashion'],
    lifestyle: ['Health', 'Beauty', 'Travel', 'Kitchen', 'Relationships', 'Astrology'],
    projukti: ['Smartphones', 'AI', 'Apps', 'Gadgets', 'Cybersecurity'],
    video: ['Special Report', 'Interviews', 'Live', 'Breaking'],
    breaking: ['Politics', 'Accidents', 'Crime', 'Hot News'],
    latest: ['All News', 'Politics', 'Entertainment', 'Sports', 'Business'],
  },
  hi: {
    desh: ['राजनीति', 'चुनाव', 'सरकार', 'प्रशासन', 'न्यायपालिका', 'शिक्षा', 'स्वास्थ्य', 'अपराध'],
    'paschim-bardhaman': ['आसनसोल', 'दुर्गापुर', 'रानीगंज', 'जामुड़िया', 'अमनपुर', 'कोयला खदान', 'नगर पालिका'],
    asansol: ['नगर पालिका', 'ट्रैफिक', 'अपराध', 'विकास', 'स्वास्थ्य', 'शिक्षा', 'व्यापार'],
    durgapur: ['स्टील सिटी', 'स्मार्ट सिटी', 'उद्योग', 'शिक्षा', 'अपराध', 'नगर पालिका'],
    rajya: ['कोलकाता', 'उत्तर बंगाल', 'दक्षिण बंगाल', 'राजनीति', 'प्रशासन', 'न्यायपालिका'],
    biswa: ['अमेरिका', 'यूरोप', 'एशिया', 'मिडिल ईस्ट', 'कूटनीति', 'संघर्ष'],
    khela: ['क्रिकेट', 'फुटबॉल', 'आईपीएल', 'ओलंपिक', 'टेनिस', 'बैडमिंटन'],
    binodon: ['बॉलीवुड', 'टॉलीवुड', 'ओटीटी', 'टेलीविज़न', 'संगीत', 'फैशन'],
    lifestyle: ['स्वास्थ्य', 'सुंदरता', 'यात्रा', 'रसोई', 'रिश्ते', 'ज्योतिष'],
    projukti: ['स्मार्टफोन', 'एआई', 'एप्स', 'गैजेट्स', 'साइबर सुरक्षा'],
    video: ['विशेष रिपोर्ट', 'साक्षात्कार', 'लाइव', 'ब्रेकिंग'],
    breaking: ['राजनीति', 'दुर्घटना', 'अपराध', 'हॉट न्यूज़'],
    latest: ['सभी खबरें', 'राजनीति', 'मनोरंजन', 'खेल', 'व्यापार'],
  },
};

const categoryDescriptions = {
  desh: {
    bn: 'দেশের রাজনৈতিক খবর, নির্বাচন, সরকার, প্রশাসন, নীতি নির্ধারণ ও গুরুত্বপূর্ণ আপডেট',
    en: 'National political news, elections, government, administration, policy and key updates',
    hi: 'देश की राजनीतिक खबरें, चुनाव, सरकार, प्रशासन, नीति निर्धारण और महत्वपूर्ण अपडेट',
  },
  'paschim-bardhaman': {
    bn: 'পশ্চিম বর্ধমান জেলার সমস্ত থানার খবর, নগর প্রশাসন, উন্নয়ন কর্মকাণ্ড এবং সর্বশেষ আপডেট',
    en: 'All police station news, urban administration, development activities & updates of Paschim Bardhaman',
    hi: 'पश्चिम बर्धमान जिले की सभी खबरें, नगर प्रशासन, विकास कार्य और नवीनतम अपडेट',
  },
  asansol: {
    bn: 'আসানসোল শহর ও পার্শ্ববর্তী শিল্পাঞ্চলের রাজনীতি, উন্নয়ন, খনি এবং আঞ্চলিক সর্বশেষ খবর',
    en: 'Politics, development, mining and regional news of Asansol city and industrial area',
    hi: 'आसनसोल शहर और आसपास के औद्योगिक क्षेत्र की राजनीति, विकास, खनन और समाचार',
  },
  durgapur: {
    bn: 'দুর্গাপুর ইস্পাত নগরী ও আশেপাশের টাউনশিপের নাগরিক সমস্যা, বাণিজ্য, শিক্ষা এবং তাজা খবর',
    en: 'Civic issues, business, education and fresh news of Durgapur Steel City',
    hi: 'दुर्गापुर स्टील सिटी और आसपास के टाउनशिप की नागरिक समस्याएं, व्यापार, शिक्षा और खबरें',
  },
  rajya: {
    bn: 'পশ্চিমবঙ্গের রাজনীতি, রাজ্য সরকারি সিদ্ধান্ত, প্রশাসনিক পদক্ষেপ এবং জেলার যাবতীয় আপডেট',
    en: 'West Bengal politics, state government decisions, administrative steps & district updates',
    hi: 'पश्चिम बंगाल की राजनीति, राज्य सरकार के फैसले, प्रशासनिक कदम और जिले के अपडेट',
  },
  biswa: {
    bn: 'আন্তর্জাতিক কূটনীতি, বিশ্ব রাজনীতি, অর্থনীতি এবং গ্লোবাল খবরের বিশ্বস্ত কভারেজ',
    en: 'Trusted coverage of international diplomacy, world politics, economy & global news',
    hi: 'अंतर्राष्ट्रीय कूटनीति, विश्व राजनीति, अर्थव्यवस्था और वैश्विक समाचारों का कवरेज',
  },
  khela: {
    bn: 'ক্রিকেট, ফুটবল, আইপিএল সহ দেশি-বিদেশি খেলাধুলার টাটকা খবর, স্কোরবোর্ড এবং বিশ্লেষণ',
    en: 'Fresh news, scoreboards & analysis of cricket, football, IPL and sports',
    hi: 'क्रिकेट, फुटबॉल, आईपीएल सहित खेल-कूद की ताज़ा खबरें, स्कोरबोर्ड और विश्लेषण',
  },
  binodon: {
    bn: 'বলিউড, টলিউড, ওটিটি সিরিজ, তারকাদের গল্প এবং বিনোদন জগতের চটপটা খবরের সমাহার',
    en: 'Bollywood, Tollywood, OTT series, celebrity stories & entertainment news',
    hi: 'बॉलीवुड, टॉलीवुड, ओटीटी सीरीज़, सितारों की कहानियां और मनोरंजन जगत की खबरें',
  },
  lifestyle: {
    bn: 'স্বাস্থ্য পরামর্শ, লাইফস্টাইল ট্রেন্ড, ভ্রমণ গাইড, ফ্যাশন এবং সম্পর্কের সুস্থ টিপস',
    en: 'Health advice, lifestyle trends, travel guides, fashion & relationship tips',
    hi: 'स्वास्थ्य सलाह, लाइफस्टाइल ट्रेंड्स, ट्रैवल गाइड, फैशन और टिप्स',
  },
  projukti: {
    bn: 'বিজ্ঞান-প্রযুক্তি, এআই, নতুন স্মার্টফোন, গ্যাজেট রিভিউ এবং সাইবার ওয়ার্ল্ডের খবরাখবর',
    en: 'Science & technology, AI, new smartphones, gadget reviews & cyber world news',
    hi: 'विज्ञान-तकनीक, एआई, नए स्मार्टफोन, गैजेट समीक्षाएं और साइबर दुनिया की खबरें',
  },
  video: {
    bn: 'নির্ভীক বাংলার এক্সক্লুসিভ ভিডিও রিপোর্ট, সাক্ষাৎকার এবং তাজা ভিডিও ফুটেজ',
    en: 'Nirbhik Bangla exclusive video reports, interviews and fresh video footage',
    hi: 'निर्भीक बांग्ला की एक्सक्लूसिव वीडियो रिपोर्ट, साक्षात्कार और वीडियो फुटेज',
  },
  breaking: {
    bn: 'ঘটনার মুহূর্তের ব্রেকিং নিউজ এবং জরুরি খবরের লাইভ আপডেট',
    en: 'Instant breaking news and live updates of urgent events',
    hi: 'घटनाओं के क्षणों की ब्रेकिंग न्यूज़ और लाइव अपडेट',
  },
  latest: {
    bn: 'সবশেষ পাওয়া নির্ভীক বাংলার তাজা খবরের আপডেট তালিকা',
    en: 'Latest fresh news updates list from Nirbhik Bangla',
    hi: 'निर्भीक बांग्ला से प्राप्त ताज़ा समाचारों की सूची',
  },
};

const fallbackCategoryArticlesByLang = {
  bn: [
    {
      id: 'hero-1',
      slug: 'lok-sabha-vote-result',
      title: 'লোকসভা ভোটের ফল ঘোষণা আজ, কড়া নিরাপত্তার প্রস্তুতি',
      excerpt: 'সারা দেশে ৪০০০ কেন্দ্রে ভোটগণনা হবে। কমিশনের পক্ষ থেকে জানানো হয়েছে, ফল প্রকাশ না হওয়া পর্যন্ত কড়া নিরাপত্তা বজায় রাখা হবে।',
      featuredImageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=85',
      author: 'নিজস্ব সংবাদদাতা',
      publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      categoryName: 'দেশ',
      isHero: true,
    },
    {
      id: 'sec-1',
      slug: 'cm-new-project-announcement',
      title: 'প্রধানমন্ত্রীর নতুন প্রকল্পে মিলবে ১০ লক্ষ টাকা পর্যন্ত সাহায্য',
      featuredImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      author: 'নিজস্ব সংবাদদাতা',
      publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      categoryName: 'দেশ',
    },
    {
      id: 'sec-2',
      slug: 'election-commission-meeting-prep',
      title: 'নির্বাচন কমিশনের আধিকারিকদের বৈঠক, ভোট প্রস্তুতি খতিয়ে দেখা হল',
      featuredImageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
      author: 'নিজস্ব সংবাদদাতা',
      publishedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      categoryName: 'দেশ',
    },
    {
      id: 'sec-3',
      slug: 'coalition-govt-delhi-meeting',
      title: 'জোট গঠন নিয়ে দিল্লিতে বৈঠকে বিরোধী দলগুলির শীর্ষ নেতারা',
      featuredImageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80',
      author: 'নিজস্ব সংবাদদাতা',
      publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      categoryName: 'দেশ',
    },
    {
      id: 'bot-1',
      slug: 'south-bengal-rain-forecast',
      title: 'দক্ষিণবঙ্গে দুর্যোগ, আজও চলবে বৃষ্টির সম্ভাবনা',
      featuredImageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
      author: 'নিজস্ব সংবাদদাতা',
      publishedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      categoryName: 'দেশ',
    },
    {
      id: 'bot-2',
      slug: 'high-court-job-interview-stay',
      title: 'হাইকোর্টের নির্দেশে চাকরির ইন্টারভিউ স্থগিত',
      featuredImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      author: 'নিজস্ব সংবাদদাতা',
      publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      categoryName: 'দেশ',
    },
  ],
  en: [
    {
      id: 'hero-1',
      slug: 'lok-sabha-vote-result',
      title: 'Lok Sabha election results today, strict security measures in place',
      excerpt: 'Vote counting will take place across 4,000 centers nationwide. Commission confirms tight security until final results.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=85',
      author: 'Staff Reporter',
      publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      categoryName: 'National',
      isHero: true,
    },
    {
      id: 'sec-1',
      slug: 'cm-new-project-announcement',
      title: 'New government scheme offers assistance up to ₹10 Lakhs',
      featuredImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      author: 'Staff Reporter',
      publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      categoryName: 'National',
    },
    {
      id: 'sec-2',
      slug: 'election-commission-meeting-prep',
      title: 'Election Commission officials hold key meeting to review poll readiness',
      featuredImageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
      author: 'Staff Reporter',
      publishedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      categoryName: 'National',
    },
    {
      id: 'sec-3',
      slug: 'coalition-govt-delhi-meeting',
      title: 'Opposition leaders gather in Delhi for high-stakes coalition talks',
      featuredImageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80',
      author: 'Staff Reporter',
      publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      categoryName: 'National',
    },
    {
      id: 'bot-1',
      slug: 'south-bengal-rain-forecast',
      title: 'Heavy rain forecast continues for South Bengal today',
      featuredImageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
      author: 'Staff Reporter',
      publishedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      categoryName: 'National',
    },
    {
      id: 'bot-2',
      slug: 'high-court-job-interview-stay',
      title: 'High Court issues stay order on recruitment job interviews',
      featuredImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      author: 'Staff Reporter',
      publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      categoryName: 'National',
    },
  ],
  hi: [
    {
      id: 'hero-1',
      slug: 'lok-sabha-vote-result',
      title: 'लोकसभा चुनाव के नतीजे आज, कड़े सुरक्षा के बीच मतगणना जारी',
      excerpt: 'देशभर के ४०००० केंद्रों पर मतगणना होगी। चुनाव आयोग की ओर से कड़ी सुरक्षा का आश्वासन दिया गया है।',
      featuredImageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=85',
      author: 'निज प्रतिनिधि',
      publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      categoryName: 'देश',
      isHero: true,
    },
    {
      id: 'sec-1',
      slug: 'cm-new-project-announcement',
      title: 'नई सरकारी योजना से मिलेगा १० लाख रुपये तक का सहयोग',
      featuredImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      author: 'निज प्रतिनिधि',
      publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      categoryName: 'देश',
    },
    {
      id: 'sec-2',
      slug: 'election-commission-meeting-prep',
      title: 'चुनाव आयोग की महत्वपूर्ण बैठक, तैयारियों का लिया गया जायजा',
      featuredImageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
      author: 'निज प्रतिनिधि',
      publishedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      categoryName: 'देश',
    },
    {
      id: 'sec-3',
      slug: 'coalition-govt-delhi-meeting',
      title: 'गठबंधन सरकार की रणनीति को लेकर दिल्ली में विपक्षी दिग्गजों की बैठक',
      featuredImageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80',
      author: 'निज प्रतिनिधि',
      publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      categoryName: 'देश',
    },
    {
      id: 'bot-1',
      slug: 'south-bengal-rain-forecast',
      title: 'दक्षिण बंगाल में मौसम का मिजाज बदला, भारी बारिश की चेतावनी',
      featuredImageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
      author: 'निज प्रतिनिधि',
      publishedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      categoryName: 'देश',
    },
    {
      id: 'bot-2',
      slug: 'high-court-job-interview-stay',
      title: 'हाईकोर्ट का बड़ा फैसला: नौकरी के इंटरव्यू पर लगी रोक',
      featuredImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      author: 'निज प्रतिनिधि',
      publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      categoryName: 'देश',
    },
  ],
};

const sidebarTopRankedByLang = {
  bn: [
    { rank: 1, slug: 'cm-new-project-announcement', title: 'প্রধানমন্ত্রীর নতুন প্রকল্পে মিলবে ১০ লক্ষ টাকা পর্যন্ত সাহায্য', featuredImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 2, slug: 'election-commission-meeting-prep', title: 'নির্বাচন কমিশনের বৈঠক, ভোট প্রস্তুতি খতিয়ে দেখা হল', featuredImageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 3, slug: 'south-bengal-rain-forecast', title: 'দক্ষিণবঙ্গে দুর্যোগ, আজও চলবে বৃষ্টির সম্ভাবনা', featuredImageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 4, slug: 'high-court-job-interview-stay', title: 'হাইকোর্টের নির্দেশে চাকরির ইন্টারভিউ স্থগিত', featuredImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 5, slug: 'coalition-govt-delhi-meeting', title: 'জোট গঠন নিয়ে দিল্লিতে বৈঠকে বিরোধী দলগুলির', featuredImageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
  ],
  en: [
    { rank: 1, slug: 'cm-new-project-announcement', title: 'New government scheme offers assistance up to ₹10 Lakhs', featuredImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 2, slug: 'election-commission-meeting-prep', title: 'Election Commission holds key meeting to review poll readiness', featuredImageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 3, slug: 'south-bengal-rain-forecast', title: 'Heavy rain forecast continues for South Bengal today', featuredImageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 4, slug: 'high-court-job-interview-stay', title: 'High Court issues stay order on recruitment interviews', featuredImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 5, slug: 'coalition-govt-delhi-meeting', title: 'Opposition leaders gather in Delhi for high-stakes talks', featuredImageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
  ],
  hi: [
    { rank: 1, slug: 'cm-new-project-announcement', title: 'नई सरकारी योजना से मिलेगा १० लाख रुपये तक का सहयोग', featuredImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 2, slug: 'election-commission-meeting-prep', title: 'चुनाव आयोग की महत्वपूर्ण बैठक, तैयारियों का लिया जायजा', featuredImageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 3, slug: 'south-bengal-rain-forecast', title: 'दक्षिण बंगाल में मौसम का मिजाज बदला, भारी बारिश की चेतावनी', featuredImageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 4, slug: 'high-court-job-interview-stay', title: 'हाईकोर्ट का बड़ा फैसला: नौकरी के इंटरव्यू पर लगी रोक', featuredImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
    { rank: 5, slug: 'coalition-govt-delhi-meeting', title: 'गठबंधन सरकार को लेकर दिल्ली में विपक्षी दिग्गजों की बैठक', featuredImageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=200&q=80', publishedAt: new Date().toISOString() },
  ],
};

const formatArticleDate = (dateStr, loc) => {
  if (!dateStr) return loc === 'en' ? 'Just now' : loc === 'hi' ? 'अभी' : 'এইমাত্র';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString(loc === 'en' ? 'en-US' : loc === 'hi' ? 'hi-IN' : 'bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch (e) {
    return String(dateStr);
  }
};

export default function CategoryClientView() {
  const params = useParams();
  const slug = params?.slug || 'desh';
  const { locale, t } = useLanguage();

  const [articles, setArticles] = useState([]);
  const [latestNewsList, setLatestNewsList] = useState([]);
  const [sidebarTopRanked, setSidebarTopRanked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTopic, setActiveSubTopic] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [displayCount, setDisplayCount] = useState(6);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  const currentFallbackArticles = fallbackCategoryArticlesByLang[locale] || fallbackCategoryArticlesByLang.bn;
  const currentFallbackTopRanked = sidebarTopRankedByLang[locale] || sidebarTopRankedByLang.bn;

  // Fetch Category News Dynamically from Backend API
  useEffect(() => {
    setLoading(true);
    let url = `http://localhost:5000/api/v1/public/news?lang=${locale}`;
    if (slug !== 'all' && slug !== 'latest') {
      if (slug === 'breaking') {
        url += '&isBreaking=true';
      } else if (slug === 'popular') {
        url += '&isTrending=true';
      } else {
        url += `&category=${encodeURIComponent(slug)}`;
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setArticles(data.data);
        } else {
          setArticles(currentFallbackArticles);
        }
      })
      .catch((err) => {
        console.log('Category news fetch error:', err);
        setArticles(currentFallbackArticles);
      })
      .finally(() => setLoading(false));

    // Fetch Latest News Dynamically for "সর্বশেষ খবর" Section
    fetch(`http://localhost:5000/api/v1/public/news?lang=${locale}&limit=9`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setLatestNewsList(data.data);
        } else {
          setLatestNewsList(currentFallbackArticles);
        }
      })
      .catch(() => {
        setLatestNewsList(currentFallbackArticles);
      });

    // Fetch Top Stories for Sidebar Dynamically
    fetch(`http://localhost:5000/api/v1/public/news?isTrending=true&limit=5&lang=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const ranked = data.data.slice(0, 5).map((art, i) => ({
            rank: i + 1,
            slug: art.slug,
            title: art.title,
            featuredImageUrl: art.featuredImageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
            publishedAt: formatArticleDate(art.publishedAt, locale),
          }));
          setSidebarTopRanked(ranked);
        } else {
          setSidebarTopRanked(currentFallbackTopRanked);
        }
      })
      .catch(() => {
        setSidebarTopRanked(currentFallbackTopRanked);
      });
  }, [slug, locale]);

  // Load saved follow state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFollow = localStorage.getItem(`follow_cat_${slug}`);
      if (savedFollow === 'true') setIsFollowing(true);
    }
  }, [slug]);

  const toggleFollow = () => {
    const nextState = !isFollowing;
    setIsFollowing(nextState);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`follow_cat_${slug}`, String(nextState));
    }
  };

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const translatedCatName = t(`category_names.${slug}`);
  const categoryTitle = translatedCatName && !translatedCatName.startsWith('category_names.')
    ? translatedCatName
    : categoryNamesFallback[slug] || (locale === 'en' ? 'National' : locale === 'hi' ? 'देश' : 'দেশ');

  const categoryDesc = (categoryDescriptions[slug] && categoryDescriptions[slug][locale])
    || (categoryDescriptions[slug] && categoryDescriptions[slug].bn)
    || categoryDescriptions.desh[locale]
    || categoryDescriptions.desh.bn;

  const subTopicsList = (categorySubTopicsByLang[locale] && categorySubTopicsByLang[locale][slug])
    || (categorySubTopicsByLang.bn && categorySubTopicsByLang.bn[slug])
    || categorySubTopicsByLang.bn.desh;

  // Subtopic filtering
  const filteredArticles = activeSubTopic === 'all'
    ? articles
    : articles.filter((art) => (art.title + ' ' + (art.excerpt || '')).includes(activeSubTopic));

  const displayArticles = filteredArticles.length > 0 ? filteredArticles : currentFallbackArticles;

  // Partition articles into Hero, Secondary, Bottom list
  const heroArticle = displayArticles[0] || currentFallbackArticles[0];
  const secondaryArticles = displayArticles.slice(1, 4).length > 0 ? displayArticles.slice(1, 4) : currentFallbackArticles.slice(1, 4);

  // Dynamic "সর্বশেষ খবর" articles
  const dynamicLatestArticles = (latestNewsList.length > 0 ? latestNewsList : currentFallbackArticles).slice(0, 6);

  const homeBreadcrumb = t('nav.home') || (locale === 'en' ? 'Home' : locale === 'hi' ? 'मुख्य पृष्ठ' : 'হোম');
  const topStoriesTitle = locale === 'en' ? `${categoryTitle} Top Stories` : locale === 'hi' ? `${categoryTitle} की शीर्ष खबरें` : `${categoryTitle}ের শীর্ষ খবর`;
  const viewMoreText = t('category_page.view_more') || (locale === 'en' ? 'View More' : locale === 'hi' ? 'और देखें' : 'আরও দেখুন');
  const latestNewsText = t('category_page.latest_news') || (locale === 'en' ? 'Latest News' : locale === 'hi' ? 'नवीनतम समाचार' : 'সর্বশেষ খবর');
  const viewAllText = t('category_page.view_all') || (locale === 'en' ? 'View All' : locale === 'hi' ? 'सभी देखें' : 'সব দেখুন');
  const followText = isFollowing ? (t('category_page.following') || (locale === 'en' ? 'Following' : locale === 'hi' ? 'फ़ॉलो कर रहे हैं' : 'ফলো করছেন')) : (t('category_page.follow') || (locale === 'en' ? 'Follow' : locale === 'hi' ? 'फ़ॉलो करें' : 'ফলো করুন'));
  const topStoryBadge = t('category_page.top_story') || (locale === 'en' ? 'Top Story' : locale === 'hi' ? 'शीर्ष खबर' : 'শীর্ষ খবর');
  const loadMoreText = t('category_page.load_more') || (locale === 'en' ? 'Load More News' : locale === 'hi' ? 'और खबरें देखें' : 'আরও খবর দেখুন');
  const staffReporterText = t('category_page.staff_reporter') || (locale === 'en' ? 'Staff Reporter' : locale === 'hi' ? 'निज प्रतिनिधि' : 'নিজস্ব সংবাদদাতা');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      fetch('http://localhost:5000/api/v1/public/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim() }),
      }).catch(() => {});
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="bg-slate-50/60 min-h-screen pb-20 md:pb-16 text-slate-900 font-['var(--font-bangla)',sans-serif]">
      
      {/* ===== MOBILE SPECIFIC VIEW (< MD) MATCHING USER SCREENSHOT EXACTLY ===== */}
      <div className="block md:hidden px-3 pt-3">
        
        {/* ── 1. Mobile Category Banner Hero Card ── */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0a1122] text-white p-5 shadow-md mb-4 border border-slate-800">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: `url(${heroArticle.featuredImageUrl || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=85'})` }}
          />
          
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0 pr-2">
              <h1 className="text-3xl font-black text-white tracking-tight">{categoryTitle}</h1>
              <p className="mt-1.5 text-xs font-medium text-white/85 leading-relaxed line-clamp-3">
                {categoryDesc}
              </p>

              {/* Follow Pill Button */}
              <button
                onClick={toggleFollow}
                className={`mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-extrabold text-xs transition-all shadow-sm ${
                  isFollowing
                    ? 'bg-[#d70b18] text-white'
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Bell size={13} className={isFollowing ? 'text-white' : 'text-slate-700'} />
                <span>{followText}</span>
              </button>
            </div>

            {/* Share & Followers metric */}
            <div className="flex flex-col items-center shrink-0 pt-1">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(window.location.href);
                    alert(locale === 'en' ? 'Link copied!' : locale === 'hi' ? 'लिंक कॉपी हो गया!' : 'লিঙ্ক কপি করা হয়েছে!');
                  }
                }}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors backdrop-blur-xs border border-white/10"
                aria-label="Share category"
              >
                <Share2 size={17} />
              </button>
              <span className="mt-1 text-[10px] font-black text-white/90 tracking-tight">254K</span>
              <span className="text-[9px] font-bold text-white/70">{t('category_page.followers') || (locale === 'en' ? 'Followers' : locale === 'hi' ? 'फ़ॉलोअर्स' : 'ফলোয়ার্স')}</span>
            </div>
          </div>
        </div>

        {/* ── 2. Mobile Sub-category Pills & Filter Bar ── */}
        <div className="mb-4 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none py-1">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1">
            <button
              onClick={() => setActiveSubTopic('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all ${
                activeSubTopic === 'all'
                  ? 'bg-white border border-red-200 text-[#d70b18] shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold'
              }`}
            >
              {t('category_page.all_news') || (locale === 'en' ? 'All News' : locale === 'hi' ? 'सभी खबरें' : 'সব খবর')}
            </button>

            {subTopicsList.map((topic, i) => (
              <button
                key={i}
                onClick={() => setActiveSubTopic(topic)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  activeSubTopic === topic
                    ? 'bg-white border border-red-200 text-[#d70b18] shadow-2xs font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0 pl-1">
            <button
              onClick={() => setSortBy(sortBy === 'latest' ? 'popular' : 'latest')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-2xs"
            >
              <span>{sortBy === 'latest' ? (t('category_page.latest') || (locale === 'en' ? 'Latest' : locale === 'hi' ? 'नवीनतम' : 'সর্বশেষ')) : (t('category_page.popular') || (locale === 'en' ? 'Popular' : locale === 'hi' ? 'लोकप्रिय' : 'জনপ্রিয়'))}</span>
              <ChevronDown size={12} />
            </button>
            <button className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs" aria-label="Filter">
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* ── 3. Mobile Horizontal Stacked News List ── */}
        <div className="space-y-3">
          {displayArticles.slice(0, displayCount).map((item, idx) => {
            const formattedDate = formatArticleDate(item.publishedAt, locale);
            const isSaved = bookmarkedIds.has(item.id);
            return (
              <div
                key={item.id || idx}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-2xs hover:shadow-xs transition-all group"
              >
                {/* Image on left */}
                <div className="relative h-[92px] w-[125px] sm:w-[140px] min-w-[125px] overflow-hidden rounded-xl bg-slate-100 shrink-0">
                  <img
                    src={item.featuredImageUrl || item.img}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {idx === 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-[#d70b18] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-2xs uppercase tracking-wider">
                      {topStoryBadge}
                    </span>
                  )}
                </div>

                {/* Content on right */}
                <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-0.5">
                  <Link href={`/${locale}/news/${item.slug}`}>
                    <h2 className="line-clamp-2 text-xs sm:text-sm font-black text-slate-900 leading-snug group-hover:text-[#d70b18] transition-colors">
                      {item.title}
                    </h2>
                  </Link>

                  <div className="mt-1.5 flex flex-col gap-0.5">
                    <span className="font-black text-[11px] text-slate-800 flex items-center gap-1">
                      {item.author || staffReporterText}
                      <CheckCircle size={11} className="text-[#d70b18] fill-[#d70b18] text-white shrink-0" />
                    </span>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {formattedDate}
                      </span>
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`transition-colors p-0.5 ${isSaved ? 'text-[#d70b18]' : 'text-slate-400 hover:text-[#d70b18]'}`}
                        aria-label="Bookmark"
                      >
                        <Bookmark size={15} fill={isSaved ? '#d70b18' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 4. Mobile "আরও খবর দেখুন" Load More Button ── */}
        <button
          onClick={() => setDisplayCount((prev) => prev + 6)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-[#d70b18] font-black text-sm rounded-2xl hover:bg-red-50/50 transition-colors shadow-2xs mt-5"
        >
          <RotateCw size={16} className="text-[#d70b18]" />
          <span>{loadMoreText}</span>
        </button>

      </div>


      {/* ===== DESKTOP SPECIFIC VIEW (MD & UP) ===== */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-[1360px] px-3 pt-3">

          {/* ── 1. Breadcrumb ── */}
          <nav className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Link href={`/${locale}`} className="hover:text-[#d70b18] transition-colors">{homeBreadcrumb}</Link>
            <ChevronRight size={13} className="text-slate-400 shrink-0" />
            <span className="text-slate-800 font-black">{categoryTitle}</span>
          </nav>

          {/* ── 2. Category Title & Subtitle ── */}
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{categoryTitle}</h1>
            <p className="mt-1 text-xs md:text-sm font-semibold text-slate-600 leading-relaxed max-w-4xl">
              {categoryDesc}
            </p>
          </div>

          {/* ── 3. Sub-category Filter Bar ── */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">

            {/* Sub-category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 flex-1">
              <button
                onClick={() => setActiveSubTopic('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-black transition-all shrink-0 ${
                  activeSubTopic === 'all'
                    ? 'bg-[#d70b18] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-extrabold'
                }`}
              >
                {t('category_page.all_news') || (locale === 'en' ? 'All News' : locale === 'hi' ? 'सभी खबरें' : 'সব খবর')}
              </button>

              {subTopicsList.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSubTopic(topic)}
                  className={`px-3 py-1.5 rounded-md text-xs font-extrabold transition-all shrink-0 ${
                    activeSubTopic === topic
                      ? 'bg-[#d70b18] text-white shadow-xs font-black'
                      : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {topic}
                </button>
              ))}

              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-extrabold bg-slate-100/80 text-slate-700 hover:bg-slate-200 shrink-0">
                <span>{t('category_page.more') || (locale === 'en' ? 'More' : locale === 'hi' ? 'और' : 'আরও')}</span>
                <ChevronDown size={13} />
              </button>
            </div>

            {/* Right Sort & Filter Dropdowns */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSortBy(sortBy === 'latest' ? 'popular' : 'latest')}
                className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-700 hover:border-slate-300"
              >
                <span>{sortBy === 'latest' ? (t('category_page.latest') || (locale === 'en' ? 'Latest' : locale === 'hi' ? 'नवीनतम' : 'সর্বশেষ')) : (t('category_page.popular') || (locale === 'en' ? 'Popular' : locale === 'hi' ? 'लोकप्रिय' : 'জনপ্রিয়'))}</span>
                <ChevronDown size={13} />
              </button>
              <button className="flex items-center justify-center p-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-[#d70b18] transition-colors" aria-label="Filter">
                <SlidersHorizontal size={14} />
              </button>
            </div>
          </div>

          {/* ── 4. Main 12-Column Layout ── */}
          <div className="grid grid-cols-12 gap-6 items-start">

            {/* Left Column (col-span-12 lg:col-span-8) */}
            <main className="col-span-12 lg:col-span-8 min-w-0 space-y-8">

              {/* ── Hero Grid Section (Featured + 3 Stacked) ── */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                {/* Large Featured Main Card (md:col-span-7) */}
                <div className="md:col-span-7 flex flex-col rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-xs group">
                  <div className="relative h-[220px] sm:h-[260px] md:h-[290px] w-full overflow-hidden bg-slate-100">
                    <img
                      src={heroArticle.featuredImageUrl || heroArticle.img}
                      alt={heroArticle.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#d70b18] text-white text-[11px] font-black px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
                      {topStoryBadge}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/${locale}/news/${heroArticle.slug}`}>
                        <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900 leading-snug group-hover:text-[#d70b18] transition-colors">
                          {heroArticle.title}
                        </h2>
                      </Link>
                      {heroArticle.excerpt && (
                        <p className="mt-2 text-xs sm:text-sm font-bold text-slate-600 leading-relaxed line-clamp-3">
                          {heroArticle.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-[#d70b18]/10 text-[#d70b18] font-black text-xs">
                          N
                        </div>
                        <div className="flex flex-col">
                          <span className="font-extrabold text-slate-900 flex items-center gap-1">
                            {heroArticle.author || staffReporterText}
                            <CheckCircle size={12} className="text-[#d70b18] fill-[#d70b18] text-white" />
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {formatArticleDate(heroArticle.publishedAt, locale)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleBookmark(heroArticle.id)}
                        className={`transition-colors p-1 ${bookmarkedIds.has(heroArticle.id) ? 'text-[#d70b18]' : 'text-slate-400 hover:text-[#d70b18]'}`}
                        aria-label="Bookmark"
                      >
                        <Bookmark size={16} fill={bookmarkedIds.has(heroArticle.id) ? '#d70b18' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Stacked 3 Secondary Cards (md:col-span-5) */}
                <div className="md:col-span-5 flex flex-col gap-3">
                  {secondaryArticles.map((item, idx) => (
                    <div key={idx} className="flex gap-3 rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs hover:shadow-xs transition-all group shrink-0">
                      <div className="h-[76px] w-[100px] sm:w-[110px] min-w-[100px] overflow-hidden rounded-lg bg-slate-100 relative shrink-0">
                        <img
                          src={item.featuredImageUrl || item.img}
                          alt={item.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                        <Link href={`/${locale}/news/${item.slug}`}>
                          <h3 className="line-clamp-2 text-xs font-black text-slate-900 leading-snug group-hover:text-[#d70b18] transition-colors">
                            {item.title}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-1">
                          <span>{formatArticleDate(item.publishedAt, locale)}</span>
                          <button
                            onClick={() => toggleBookmark(item.id)}
                            className={`transition-colors ${bookmarkedIds.has(item.id) ? 'text-[#d70b18]' : 'text-slate-400 hover:text-[#d70b18]'}`}
                            aria-label="Bookmark"
                          >
                            <Bookmark size={13} fill={bookmarkedIds.has(item.id) ? '#d70b18' : 'none'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 5. Bottom Section ("সর্বশেষ খবর" - Fully Dynamic Latest News API Grid) ── */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span className="h-4 w-1 bg-[#d70b18] rounded-full" />
                    {latestNewsText}
                  </h2>
                  <Link href={`/${locale}/category/latest`} className="flex items-center gap-1 text-xs font-bold text-[#d70b18] hover:underline">
                    {viewAllText} <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {dynamicLatestArticles.map((item, idx) => (
                    <div key={item.id || idx} className="flex flex-col rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-2xs hover:shadow-md transition-all group">
                      <div className="h-[140px] w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.featuredImageUrl || item.img}
                          alt={item.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <Link href={`/${locale}/news/${item.slug}`}>
                          <h3 className="line-clamp-2 text-xs font-black text-slate-900 leading-snug group-hover:text-[#d70b18] transition-colors">
                            {item.title}
                          </h3>
                        </Link>

                        <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-slate-400 border-t border-slate-100 pt-2">
                          <span>{formatArticleDate(item.publishedAt, locale)}</span>
                          <button
                            onClick={() => toggleBookmark(item.id)}
                            className={`transition-colors ${bookmarkedIds.has(item.id) ? 'text-[#d70b18]' : 'text-slate-400 hover:text-[#d70b18]'}`}
                            aria-label="Bookmark"
                          >
                            <Bookmark size={13} fill={bookmarkedIds.has(item.id) ? '#d70b18' : 'none'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </main>

            {/* ── 6. Right Sidebar (col-span-12 lg:col-span-4) — Sticky Scroll ── */}
            <aside className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-[120px] self-start">

              {/* Widget 1: Top Ranked Stories ("দেশের শীর্ষ খবর") */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <h2 className="text-base font-black text-[#d70b18] border-b border-slate-100 pb-2.5 mb-3">
                  {topStoriesTitle}
                </h2>

                <div className="space-y-3.5 divide-y divide-slate-100">
                  {sidebarTopRanked.map((story) => (
                    <div key={story.rank} className="flex items-start gap-3 pt-3 first:pt-0 group">
                      <span className="font-black text-2xl text-[#d70b18] leading-none shrink-0 w-4 text-center">
                        {story.rank}
                      </span>

                      <div className="h-[58px] w-[74px] min-w-[74px] overflow-hidden rounded-lg bg-slate-100 shrink-0">
                        <img
                          src={story.featuredImageUrl}
                          alt={story.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Link href={`/${locale}/news/${story.slug}`}>
                          <h3 className="line-clamp-2 text-xs font-black text-slate-900 leading-snug group-hover:text-[#d70b18] transition-colors">
                            {story.title}
                          </h3>
                        </Link>
                        <span className="mt-1 block text-[10px] font-semibold text-slate-400">
                          {story.publishedAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-2">
                  <Link
                    href={`/${locale}/category/popular`}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-black text-xs hover:border-[#d70b18] hover:text-[#d70b18] transition-colors"
                  >
                    <span>{viewMoreText}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Widget 2: Newsletter Subscription Box */}
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-red-50/40 to-slate-100 border border-slate-200/80 p-5 shadow-sm overflow-hidden">
                {/* Decorative paper plane graphic icon */}
                <div className="absolute top-3 right-3 opacity-15 pointer-events-none">
                  <Send size={54} className="text-[#d70b18]" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-sm font-black text-slate-900 leading-snug">
                    {t('category_page.inbox_heading') || (locale === 'en' ? `Get Best ${categoryTitle} News in Your Inbox` : locale === 'hi' ? `अपने इनबॉक्स में पाएँ ${categoryTitle} की श्रेष्ठ ख़बरें` : `আপনার ইনবক্সে ${categoryTitle}ের সেরা খবর`)}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-slate-500 leading-relaxed">
                    {t('category_page.inbox_desc') || (locale === 'en' ? 'Subscribe to get all important daily updates' : locale === 'hi' ? 'दैनिक महत्वपूर्ण सब अपडेट पाने के लिए सब्सक्राइब करें' : 'দৈনিক গুরুত্বপূর্ণ सब अपडेट पाने के लिए सब्सक्राइब करें')}
                  </p>

                  {subscribed ? (
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center">
                      ✓ {t('category_page.subscribed_success') || (locale === 'en' ? 'Thank you for subscribing!' : locale === 'hi' ? 'सब्सक्राइब करने के लिए धन्यवाद!' : 'সাবস্ক্রাইব করার জন্য আপনাকে ধন্যবাদ!')}
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="mt-4 space-y-2.5">
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder={t('category_page.email_placeholder') || (locale === 'en' ? 'Enter your email' : locale === 'hi' ? 'अपना ईमेल दर्ज करें' : 'আপনার ইমেইল দিন')}
                        required
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 outline-none focus:border-[#d70b18] focus:ring-2 focus:ring-red-100 font-medium transition-all shadow-2xs"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#d70b18] hover:bg-[#b90813] text-white rounded-xl text-xs font-black transition-all shadow-md hover:shadow-lg active:scale-98"
                      >
                        {t('category_page.subscribe') || (locale === 'en' ? 'Subscribe' : locale === 'hi' ? 'सब्सक्राइब करें' : 'সাবস্ক্রাইব করুন')}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}
