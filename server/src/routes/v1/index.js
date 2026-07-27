const express = require('express');
const router = express.Router();

const publicRoutes = require('./publicRoutes');
const aiRoutes = require('./aiRoutes');
const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');
const tagRoutes = require('./tagRoutes');
const mediaRoutes = require('./mediaRoutes');
const articleRoutes = require('./articleRoutes');
const liveStreamRoutes = require('./liveStreamRoutes');
const adRoutes = require('./adRoutes');
const analyticsRoutes = require('./analyticsRoutes');

// Mount Versioned Routes
router.use('/public', publicRoutes);
router.use('/ai', aiRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/tags', tagRoutes);
router.use('/media', mediaRoutes);
router.use('/articles', articleRoutes);
router.use('/live-streams', liveStreamRoutes);
router.use('/ads', adRoutes);
router.use('/analytics', analyticsRoutes);

// Health check endpoint for v1
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    version: 'v1',
    message: 'Nirbhik Bangla 2.0 Headless AI News CMS API v1 Service Operational',
    timestamp: new Date()
  });
});

module.exports = router;
