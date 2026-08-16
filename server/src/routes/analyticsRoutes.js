const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Define Analytics Routes
router.get('/overview', analyticsController.getAnalyticsOverview);

module.exports = router;
