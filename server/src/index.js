const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

const connectDB = require('./config/db');
const v1Router = require('./routes/v1');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Versioned API Routes (/api/v1)
app.use('/api/v1', v1Router);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Nirbhik Bangla 2.0 Headless AI News CMS Platform',
    version: '2.0.0',
    documentation: '/api/docs',
    apiV1: '/api/v1/health'
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[API ERROR]: ${err.stack || err.message}`);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Nirbhik Bangla 2.0 Headless API Server running on port ${PORT}`);
});
