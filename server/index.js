require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const movieRoutes = require('./routes/movies');
const theaterRoutes = require('./routes/theaters');
const bookingRoutes = require('./routes/bookings');

// ── Connect to MongoDB ──────────────────────────────────────────────────────
connectDB();

// ── Express App ─────────────────────────────────────────────────────────────
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting – apply to all API routes (max 100 requests per 15 minutes per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', apiLimiter);

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/bookings', bookingRoutes);

// Health-check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`MovieGoer Express server running on port ${PORT}`);
});

module.exports = app;
