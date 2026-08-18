const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

const connectDB = require('./config/db');
const v1Router = require('./routes/v1');

// Connect to MongoDB
connectDB();

const app = express();
app.set('trust proxy', true); // Trust reverse proxy (Nginx) for correct req.protocol (HTTPS)
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Pass io to liveSessionController
const liveSessionController = require('./controllers/liveSessionController');
liveSessionController.setIo(io);

const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve local uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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

let liveViewersCount = 0;

io.on('connection', (socket) => {
  liveViewersCount++;
  console.log(`🔌 New client connected via Socket.IO: ${socket.id} (Live Viewers: ${liveViewersCount})`);
  io.emit('viewer_updated', liveViewersCount);

  socket.on('disconnect', () => {
    liveViewersCount = Math.max(0, liveViewersCount - 1);
    console.log(`🔌 Client disconnected: ${socket.id} (Live Viewers: ${liveViewersCount})`);
    io.emit('viewer_updated', liveViewersCount);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Nirbhik Bangla 2.0 Headless API Server running on port ${PORT}`);
});
