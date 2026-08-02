const Playlist = require('../models/Playlist');

// @desc    Get all playlists
// @route   GET /api/v1/playlists
// @access  Public / Admin
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ isActive: true }).sort({ createdAt: -1 });

    // Auto-seed sample playlists if collection is empty
    if (playlists.length === 0) {
      const samplePlaylists = [
        { name: 'নির্বাচন ২০২৬ বুলেটিন', slug: 'election-2026', description: 'নির্বাচনী সব খবরের বিশেষ বুলেটিন', videoCount: 12 },
        { name: 'পশ্চিমবঙ্গ খবর', slug: 'west-bengal-news', description: 'রাজ্যের প্রতি মুহূর্তের গুরুত্বপূর্ণ ঘটনা', videoCount: 24 },
        { name: 'খেলার দুনিয়া', slug: 'khelar-duniya', description: 'আইপিএল ও বিশ্বকাপ ক্রিকেটের স্পেশাল রিপোর্ট', videoCount: 18 },
        { name: 'লাইভ টিভি বুলেটিন', slug: 'live-tv-bulletin', description: 'লাইভ নিউজ আপডেট ও সরাসরি সম্প্রচার', videoCount: 8 }
      ];
      const seeded = await Playlist.insertMany(samplePlaylists);
      return res.status(200).json({
        success: true,
        count: seeded.length,
        data: seeded
      });
    }

    return res.status(200).json({
      success: true,
      count: playlists.length,
      data: playlists
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch playlists',
      error: error.message
    });
  }
};

// @desc    Create new playlist
// @route   POST /api/v1/playlists
// @access  Admin
exports.createPlaylist = async (req, res) => {
  try {
    const { name, description, thumbnail } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Playlist name is required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `playlist-${Date.now()}`;
    const newPlaylist = await Playlist.create({
      name,
      slug,
      description: description || '',
      thumbnail: thumbnail || ''
    });

    return res.status(201).json({
      success: true,
      message: 'Playlist created successfully',
      data: newPlaylist
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create playlist',
      error: error.message
    });
  }
};
