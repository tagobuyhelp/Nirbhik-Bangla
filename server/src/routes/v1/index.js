const express = require('express');
const router = express.Router();

const publicRoutes = require('./publicRoutes');
const aiRoutes = require('./aiRoutes');

// Mount Versioned Routes
router.use('/public', publicRoutes);
router.use('/ai', aiRoutes);

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
