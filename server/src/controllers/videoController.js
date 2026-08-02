const Video = require('../models/Video');

// Seed default sample videos if collection is empty
const seedDefaultVideos = async () => {
  const count = await Video.countDocuments();
  if (count === 0) {
    const defaultSeedData = [
      {
        title: { bn: 'লোকসভা নির্বাচন ২০২৪ LIVE', en: 'Lok Sabha Election 2024 LIVE', hi: 'लोकसभा चुनाव 2024 LIVE' },
        subtitle: { bn: 'সর্বশেষ আপডেট, ফলাফল, বিশ্লেষণ', en: 'Latest updates, results, analysis', hi: 'नवीनतम अपडेट, परिणाम, विश्लेषण' },
        description: { bn: 'নির্ভীক বাংলা লোকসভা নির্বাচন ২০২৪ লাইভ কভারেজ। সমস্ত কেন্দ্রের ফলাফল দেখুন।', en: 'Nirbhik Bangla Lok Sabha Election 2024 Live Coverage.', hi: 'निर्भीक बांग्ला लोकसभा चुनाव 2024 लाइव कवरेज।' },
        sourceType: 'yt_live',
        videoUrl: 'https://www.youtube.com/watch?v=live-demo',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=400&q=80',
        category: 'Politics',
        tags: ['Election', 'Live', 'Politics'],
        duration: '02:35:28',
        views: 125400,
        viewsTrend: '+12.5%',
        status: 'LIVE',
        isLive: true,
        isFeatured: true
      },
      {
        title: { bn: 'নতুন সেতু চালু: বদলে যাবে দক্ষিণবঙ্গ', en: 'New Bridge Opened: South Bengal to Transform', hi: 'नया पुल खुला: बदलेगा दक्षिण बंगाल' },
        subtitle: { bn: 'মুখ্যমন্ত্রীর উদ্বোধন', en: 'Inaugurated by Chief Minister', hi: 'मुख्यमंत्री ने किया उद्घाटन' },
        description: { bn: 'দক্ষিণবঙ্গের যাতায়াত ব্যবস্থায় নতুন দিগন্ত তৈরি করল নতুন সেতু।', en: 'New bridge creates new milestone for South Bengal transport.', hi: 'नए पुल ने दक्षिण बंगाल परिवहन में मील का पत्थर साबित किया।' },
        sourceType: 'yt_single',
        videoUrl: 'https://www.youtube.com/watch?v=bridge-demo',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80',
        category: 'State',
        tags: ['Kolkata', 'Development', 'WestBengal'],
        duration: '08:45',
        views: 82300,
        viewsTrend: '+8.3%',
        status: 'Published',
        isLive: false,
        isFeatured: true
      },
      {
        title: { bn: 'বাংলায় প্রবল বর্ষণ: কোন কোন জেলায় সতর্কতা?', en: 'Heavy Rains in Bengal: Alert in Which Districts?', hi: 'बंगाल में भारी बारिश: किन जिलों में अलर्ट?' },
        subtitle: { bn: 'আবহাওয়া সংবাদের আপডেট', en: 'Weather News Update', hi: 'मौसम समाचार अपडेट' },
        description: { bn: 'আবহাওয়া দপ্তর সূত্রে জানা গিয়েছে আগামী ২৪ ঘণ্টায় দক্ষিণবঙ্গের একাধিক জেলায় ভারী বৃষ্টির সম্ভাবনা।', en: 'Weather office predicts heavy rainfall across several South Bengal districts in next 24 hours.', hi: 'मौसम विभाग ने अगले 24 घंटों में भारी बारिश की चेतावनी दी है।' },
        sourceType: 'yt_single',
        videoUrl: 'https://www.youtube.com/watch?v=weather-demo',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80',
        category: 'Environment',
        tags: ['Weather', 'Rain', 'Alert'],
        duration: '06:12',
        views: 68500,
        viewsTrend: '+15.7%',
        status: 'Published',
        isLive: false,
        isFeatured: false
      },
      {
        title: { bn: 'ভারত বনাম বাংলাদেশ - ম্যাচ হাইলাইটস', en: 'India vs Bangladesh Match Highlights', hi: 'भारत बनाम बांग्लादेश मैच हाइलाइट्स' },
        subtitle: { bn: 'সম্পূর্ণ হাইলাইটস | T20 সিরিজ', en: 'Full Highlights | T20 Series', hi: 'पूरा हाइलाइट्स | T20 सीरीज' },
        description: { bn: 'ভারত বনাম বাংলাদেশ টি-টোয়েন্টি সিরিজের রোমাঞ্চকর ম্যাচ হাইলাইটস।', en: 'Thrilling T20 match highlights of India vs Bangladesh series.', hi: 'भारत बनाम बांग्लादेश T20 सीरीज का रोमांचक हाइलाइट्स।' },
        sourceType: 'yt_single',
        videoUrl: 'https://www.youtube.com/watch?v=sports-demo',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
        category: 'Sports',
        tags: ['India', 'Bangladesh', 'Cricket'],
        duration: '10:28',
        views: 56200,
        viewsTrend: '+22.4%',
        status: 'Published',
        isLive: false,
        isFeatured: true
      },
      {
        title: { bn: 'বিশেষ সাক্ষাৎকার - শিক্ষা ভবিষ্যৎ ও কর্মসংস্থান', en: 'Special Interview - Education & Employment', hi: 'विशेष साक्षात्कार - शिक्षा एवं रोजगार' },
        subtitle: { bn: 'বিশ্ববিদ্যালয়ের উপাচার্যের সঙ্গে বিশেষ আলোচনা', en: 'Special Discussion with VC', hi: 'कुलपति के साथ विशेष चर्चा' },
        description: { bn: 'শিক্ষার ভবিষ্যৎ ও তরুণ প্রজন্মের কর্মসংস্থান নিয়ে বিশেষ সাক্ষাৎকার।', en: 'Special interview discussing the future of education and youth employment.', hi: 'शिक्षा के भविष्य और युवाओं के रोजगार पर विशेष चर्चा।' },
        sourceType: 'yt_single',
        videoUrl: 'https://www.youtube.com/watch?v=interview-demo',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80',
        category: 'Education',
        tags: ['Education', 'Interview'],
        duration: '18:36',
        views: 42100,
        viewsTrend: '+9.8%',
        status: 'Published',
        isLive: false,
        isFeatured: false
      },
      {
        title: { bn: 'শেয়ার বাজার আজ কেমন?', en: 'Stock Market Today Status', hi: 'शेयर बाजार आज कैसा रहा?' },
        subtitle: { bn: 'বিনিয়োগকারীদের জন্য বিশেষ বিশ্লেষণ', en: 'Special Analysis for Investors', hi: 'निवेशकों के लिए विशेष विश्लेषण' },
        description: { bn: 'আজকের শেয়ার বাজার আপডেট ও সেনসেক্স সূচকের গতিপ্রকৃতি বিশ্লেষণ।', en: 'Today stock market updates and Sensex movements analysis.', hi: 'आज के शेयर बाजार अपडेट और सेंसेक्स के रुझान का विश्लेषण।' },
        sourceType: 'yt_single',
        videoUrl: 'https://www.youtube.com/watch?v=stock-demo',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=400&q=80',
        category: 'Business',
        tags: ['Business', 'StockMarket'],
        duration: '12:14',
        views: 38700,
        viewsTrend: '+6.2%',
        status: 'Published',
        isLive: false,
        isFeatured: false
      }
    ];
    await Video.insertMany(defaultSeedData);
    console.log('[Seed] Default videos collection populated successfully.');
  }
};

// GET /api/v1/videos/live-recordings
exports.getLiveRecordings = async (req, res) => {
  try {
    // Fake logic for demo: return videos that have 'Live' or 'Recording' in tags or title, or just recent ones.
    const videos = await Video.find({ $or: [{ tags: { $in: ['Live', 'Recording'] } }, { isLive: false }] })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json({ success: true, count: videos.length, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// GET /api/v1/videos/highlights
exports.getHighlights = async (req, res) => {
  try {
    // Fake logic for demo: return videos that have 'Highlight' in tags or just featured ones
    const videos = await Video.find({ isFeatured: true })
      .sort({ views: -1 })
      .limit(5);
    res.json({ success: true, count: videos.length, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// GET /api/v1/videos
exports.getVideos = async (req, res) => {
  try {
    await seedDefaultVideos();

    const { status, category, search, isFeatured, isLive, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      if (status === 'published') query.status = 'Published';
      else if (status === 'draft') query.status = 'Draft';
      else if (status === 'scheduled') query.status = 'Scheduled';
      else if (status === 'processing') query.status = 'Processing';
      else if (status === 'private') query.status = 'Private';
      else if (status === 'live') query.status = 'LIVE';
      else query.status = status;
    }

    if (category && category !== 'all') {
      query.category = new RegExp(category, 'i');
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }

    if (isLive !== undefined) {
      query.isLive = isLive === 'true';
    }

    if (search) {
      query.$or = [
        { 'title.bn': { $regex: search, $options: 'i' } },
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.hi': { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Video.countDocuments(query);
    const videos = await Video.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.json({
      success: true,
      data: videos,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching videos', error: error.message });
  }
};

// Helper to generate clean slug
const generateSlug = (text, id = '') => {
  if (!text || typeof text !== 'string') return `video-${Date.now()}`;
  let clean = text.trim().toLowerCase()
    .replace(/[^\w\u0980-\u09FF\s-]/g, '') // Keep alphanumeric, Bengali characters, spaces, hyphens
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  if (!clean || clean === '-') clean = `video-${Date.now()}`;
  return clean;
};

// GET /api/v1/videos/:idOrSlug
exports.getVideoById = async (req, res) => {
  try {
    const { id: param } = req.params;
    let video;
    const mongoose = require('mongoose');
    if (mongoose.Types.ObjectId.isValid(param)) {
      video = await Video.findById(param);
    }
    if (!video) {
      video = await Video.findOne({ slug: param });
    }
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    return res.json({ success: true, data: video });
  } catch (error) {
    console.error('Error fetching video by ID or slug:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// POST /api/v1/videos
exports.createVideo = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      sourceType,
      videoUrl,
      thumbnail,
      category,
      playlist,
      tags,
      duration,
      resolution,
      fileSize,
      status,
      isLive,
      visibility,
      ageRestriction,
      commentsPolicy,
      embeddable,
      isFeatured,
      sendNotification,
      slug,
      seoTitle,
      seoDescription,
      altText,
      keywords
    } = req.body;

    let youtubeId = '';
    if (videoUrl) {
      youtubeId = Video.extractYoutubeId(videoUrl);
    }

    // Handle Title parsing if passed as simple string vs object
    const formattedTitle = typeof title === 'object' ? title : { bn: title, en: title, hi: title };
    const formattedSub = typeof subtitle === 'object' ? subtitle : { bn: subtitle || '', en: subtitle || '', hi: subtitle || '' };
    const formattedDesc = typeof description === 'object' ? description : { bn: description || '', en: description || '', hi: description || '' };

    const formattedSeoTitle = typeof seoTitle === 'object' ? seoTitle : { bn: seoTitle || formattedTitle.bn || '', en: seoTitle || formattedTitle.en || '', hi: seoTitle || formattedTitle.hi || '' };
    const formattedSeoDesc = typeof seoDescription === 'object' ? seoDescription : { bn: seoDescription || formattedSub.bn || formattedDesc.bn || '', en: seoDescription || formattedSub.en || formattedDesc.en || '', hi: seoDescription || formattedSub.hi || formattedDesc.hi || '' };
    const formattedAlt = typeof altText === 'object' ? altText : { bn: altText || formattedTitle.bn || '', en: altText || formattedTitle.en || '', hi: altText || formattedTitle.hi || '' };

    const baseSlug = slug ? generateSlug(slug) : generateSlug(formattedTitle.bn || formattedTitle.en || 'video');
    let finalSlug = baseSlug;
    const existing = await Video.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newVideo = new Video({
      title: formattedTitle,
      subtitle: formattedSub,
      description: formattedDesc,
      slug: finalSlug,
      seoTitle: formattedSeoTitle,
      seoDescription: formattedSeoDesc,
      altText: formattedAlt,
      keywords: Array.isArray(keywords) ? keywords : (tags ? tags : []),
      sourceType: sourceType || 'yt_single',
      videoUrl: videoUrl || '',
      youtubeId: youtubeId || '',
      thumbnail: thumbnail || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : ''),
      category: category || 'Politics',
      playlist: playlist || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      duration: duration || '05:20',
      resolution: resolution || '1080p',
      fileSize: fileSize || '',
      status: status || 'Published',
      isLive: isLive || false,
      visibility: visibility || 'Public',
      ageRestriction: ageRestriction || "No, it's not made for kids",
      commentsPolicy: commentsPolicy || 'Allow all comments',
      embeddable: embeddable !== undefined ? embeddable : true,
      isFeatured: isFeatured || false,
      sendNotification: sendNotification || false
    });

    await newVideo.save();

    return res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: newVideo
    });
  } catch (error) {
    console.error('Error creating video:', error);
    return res.status(500).json({ success: false, message: 'Server error creating video', error: error.message });
  }
};

// PUT /api/v1/videos/:id
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    const fields = req.body;
    if (fields.videoUrl) {
      fields.youtubeId = Video.extractYoutubeId(fields.videoUrl);
    }

    Object.assign(video, fields);
    await video.save();

    return res.json({
      success: true,
      message: 'Video updated successfully',
      data: video
    });
  } catch (error) {
    console.error('Error updating video:', error);
    return res.status(500).json({ success: false, message: 'Server error updating video', error: error.message });
  }
};

// DELETE /api/v1/videos/:id
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    return res.json({
      success: true,
      message: 'Video deleted successfully',
      deletedId: req.params.id
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting video', error: error.message });
  }
};

// POST /api/v1/videos/bulk-delete
exports.bulkDeleteVideos = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'No video IDs provided for bulk delete' });
    }

    await Video.deleteMany({ _id: { $in: ids } });

    return res.json({
      success: true,
      message: `${ids.length} videos deleted successfully`,
      deletedIds: ids
    });
  } catch (error) {
    console.error('Error in bulk delete videos:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// POST /api/v1/videos/fetch-info
exports.fetchYoutubeDetails = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: 'URL is required' });
    }

    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    const youtubeId = match ? match[1] : (url.length === 11 ? url : '');

    if (!youtubeId) {
      return res.status(400).json({ success: false, message: 'Invalid YouTube URL' });
    }

    let title = '';
    let description = '';
    let author = '';
    let thumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

    try {
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`);
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        if (oembedData.title) title = oembedData.title;
        if (oembedData.author_name) author = oembedData.author_name;
      }
    } catch (e) {}

    try {
      const pageRes = await fetch(`https://www.youtube.com/watch?v=${youtubeId}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });
      if (pageRes.ok) {
        const html = await pageRes.text();
        const descMatch = html.match(/<meta name="description" content="([^"]*)">/i) || html.match(/<meta property="og:description" content="([^"]*)">/i);
        if (descMatch && descMatch[1]) {
          description = descMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&');
        }
        if (!title) {
          const titleMatch = html.match(/<meta property="og:title" content="([^"]*)">/i);
          if (titleMatch && titleMatch[1]) title = titleMatch[1];
        }
      }
    } catch (e) {}

    if (!description && author) {
      description = `Video by ${author} on YouTube. Published for Nirbhik Bangla News.`;
    }

    return res.status(200).json({
      success: true,
      data: {
        youtubeId,
        title: title || 'YouTube Video',
        description: description || '',
        thumbnail,
        author
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch YouTube details',
      error: error.message
    });
  }
};
