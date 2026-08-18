const Article = require('../models/Article');
const User = require('../models/User');
const LiveSession = require('../models/LiveSession');
const Advertisement = require('../models/Advertisement');
const Category = require('../models/Category');
const sendResponse = require('../utils/responseHandler');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

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
    const totalStreams = await LiveSession.countDocuments();

    // Total Ad Impressions & Clicks
    const adAggregation = await Advertisement.aggregate([
      {
        $group: {
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
    const activeStreams = await LiveSession.find({ status: 'live' })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get total video views
    const videoViewsAggregation = await require('../models/Video').aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    const totalVideoViews = videoViewsAggregation.length > 0 ? videoViewsAggregation[0].totalViews : 0;

    return sendResponse(res, 200, 'Dashboard metrics fetched', {
      totalArticles,
      totalReporters,
      totalViews,
      totalVideoViews,
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

// @desc    Get extended analytics overview from GA4 (or fallback data)
// @route   GET /api/v1/analytics/overview
// @access  Private/Admin
exports.getAnalyticsOverview = async (req, res, next) => {
  try {
    const propertyId = process.env.GA4_PROPERTY_ID;

    if (!propertyId || !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Return 200 to avoid console 400 errors when GA4 is not configured
      return res.status(200).json({
        success: true,
        message: 'Google Analytics credentials or Property ID not configured. Using fallback metrics.',
        data: null
      });
    }

    // Initialize GA4 Client
    const analyticsDataClient = new BetaAnalyticsDataClient();

    // 1. Fetch Core Metrics (Last 7 Days)
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        { name: 'date' },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'totalUsers' },
        { name: 'activeUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    });

    // 2. Fetch Top Pages
    const [pagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 5,
    });

    // 3. Fetch Top Countries
    const [countriesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 5,
    });

    // 4. Fetch Devices
    const [devicesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'screenPageViews' }],
    });

    // Process data to match frontend requirements
    let totalPageViews = 0;
    let totalUsersCount = 0;
    let activeUsersCount = 0;

    const timeseriesLabels = [];
    const timeseriesPageViews = [];
    const timeseriesSessions = [];
    const timeseriesUnique = [];

    if (response && response.rows) {
      response.rows.forEach(row => {
        timeseriesLabels.push(row.dimensionValues[0].value); // date YYYYMMDD
        timeseriesPageViews.push(parseInt(row.metricValues[0].value) || 0);
        timeseriesUnique.push(parseInt(row.metricValues[1].value) || 0);
        timeseriesSessions.push(parseInt(row.metricValues[2].value) || 0);

        totalPageViews += parseInt(row.metricValues[0].value) || 0;
        totalUsersCount += parseInt(row.metricValues[1].value) || 0;
        activeUsersCount += parseInt(row.metricValues[2].value) || 0;
      });
    }

    // Format top pages
    const topPages = [];
    if (pagesResponse && pagesResponse.rows) {
      pagesResponse.rows.forEach(row => {
        topPages.push({
          page: row.dimensionValues[0].value,
          views: row.metricValues[0].value
        });
      });
    }

    // Format countries
    const audienceLocation = [];
    if (countriesResponse && countriesResponse.rows) {
      countriesResponse.rows.forEach(row => {
        audienceLocation.push({
          flag: '🌐', // We can map country code to flag later
          country: row.dimensionValues[0].value,
          pct: ((parseInt(row.metricValues[0].value) / (totalPageViews || 1)) * 100).toFixed(1) + '%'
        });
      });
    }

    // Format devices
    const deviceOverview = [];
    const colors = ['bg-blue-600', 'bg-sky-600', 'bg-emerald-500'];
    if (devicesResponse && devicesResponse.rows) {
      devicesResponse.rows.forEach((row, idx) => {
        deviceOverview.push({
          label: row.dimensionValues[0].value,
          count: row.metricValues[0].value,
          pct: ((parseInt(row.metricValues[0].value) / (totalPageViews || 1)) * 100).toFixed(1) + '%',
          color: colors[idx % colors.length]
        });
      });
    }

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          pageViews: totalPageViews.toLocaleString(),
          pageViewsTrend: 0,
          totalUsers: totalUsersCount.toLocaleString(),
          totalUsersTrend: 0,
          uniqueVisitors: activeUsersCount.toLocaleString(),
          uniqueVisitorsTrend: 0,
          avgSessionDuration: 'N/A', // Compute from GA
          avgSessionTrend: 0,
          bounceRate: 'N/A', // Compute from GA
          bounceRateTrend: 0,
          totalClicks: 'N/A', // Not supported easily
          totalClicksTrend: 0,
        },
        timeseries: {
          labels: timeseriesLabels,
          pageViews: timeseriesPageViews,
          uniqueVisitors: timeseriesUnique,
          sessions: timeseriesSessions,
        },
        topChannels: [
          { label: 'Organic Search', pct: '50%', count: '-', color: 'bg-blue-600' },
          { label: 'Direct', pct: '30%', count: '-', color: 'bg-emerald-500' },
          { label: 'Referral', pct: '20%', count: '-', color: 'bg-amber-500' }
        ], // Simplified for now
        deviceOverview,
        audienceLocation,
        topPages,
      },
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Sync GA4 views to Database Articles
// @route   POST /api/v1/analytics/sync-views
// @access  Private/Admin
exports.syncArticleViews = async (req, res, next) => {
  try {
    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!propertyId || !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return res.status(400).json({ success: false, message: 'Google Analytics not configured.' });
    }

    const analyticsDataClient = new BetaAnalyticsDataClient();

    // Fetch page views grouped by pagePath for the last 30 days
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 10000,
    });

    let updatedCount = 0;

    // We process the report and update articles by slug
    for (const row of response.rows) {
      const pagePath = row.dimensionValues[0].value;
      const views = parseInt(row.metricValues[0].value) || 0;

      // Extract slug from path (e.g. /bn/news/my-slug)
      const match = pagePath.match(/\/news\/([^/?]+)/);
      if (match && match[1]) {
        const slug = match[1];
        const result = await Article.updateOne(
          { $or: [{ slug: slug }, { 'translations.bn.slug': slug }] },
          { $set: { viewsCount: views } } // Override DB with actual GA4 views
        );
        if (result.modifiedCount > 0) updatedCount++;
      }
    }

    return sendResponse(res, 200, `Successfully synced views for ${updatedCount} articles`, { updatedCount });
  } catch (error) {
    console.error('GA4 Sync Error:', error);
    next(error);
  }
};
