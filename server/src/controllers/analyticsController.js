const Article = require('../models/Article');
const User = require('../models/User');
const LiveStream = require('../models/LiveStream');
const Advertisement = require('../models/Advertisement');
const Category = require('../models/Category');
const sendResponse = require('../utils/responseHandler');

// @desc    Get dashboard metrics
// @route   GET /api/v1/analytics/dashboard
// @access  Private/Admin
exports.getDashboardMetrics = async (req, res, next) => {
  try {
    const totalArticles = await Article.countDocuments();
    const totalReporters = await User.countDocuments({ role: { $in: ['Reporter', 'Photo Journalist', 'Video Editor'] } });
    
    // Total Views (Sum of viewsCount in Articles)
    const viewsAggregation = await Article.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$viewsCount' } } }
    ]);
    const totalViews = viewsAggregation.length > 0 ? viewsAggregation[0].totalViews : 0;

    // Total Live Streams
    const totalStreams = await LiveStream.countDocuments();

    // Total Ad Impressions & Clicks
    const adAggregation = await Advertisement.aggregate([
      { $group: { 
          _id: null, 
          totalImpressions: { $sum: '$impressionsCount' },
          totalClicks: { $sum: '$clicksCount' }
        } 
      }
    ]);
    
    const adStats = adAggregation.length > 0 ? adAggregation[0] : { totalImpressions: 0, totalClicks: 0 };

    // Category distribution
    const categoryStats = await Article.aggregate([
      { $group: { _id: '$categoryName', count: { $sum: 1 } } },
      { $project: { name: { $ifNull: ['$_id', 'Unknown'] }, count: 1 } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Recent Posts
    const recentPosts = await Article.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Active Live Streams
    const activeStreams = await LiveStream.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5);

    return sendResponse(res, 200, 'Dashboard metrics fetched', {
      totalArticles,
      totalReporters,
      totalViews,
      totalStreams,
      adStats,
      categoryStats,
      recentPosts,
      activeStreams
    });
  } catch (error) {
    next(error);
  }
};
