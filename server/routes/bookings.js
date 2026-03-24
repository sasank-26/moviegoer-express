const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');

const router = express.Router();

// GET /api/bookings/stats/aggregation – Total revenue per movie (aggregation pipeline)
// NOTE: must be defined before /:id to avoid Express treating 'stats' as an ID
router.get('/stats/aggregation', async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      {
        $group: {
          _id: '$movieTitle',
          totalRevenue: { $sum: '$totalAmount' },
          totalBookings: { $sum: 1 },
          totalSeats: { $sum: { $size: '$seats' } },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 10 },
    ]);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/bookings – Read all bookings (supports ?userId= filter)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;

    const bookings = await Booking.find(filter)
      .populate('movie', 'title posterPath')
      .populate('theater', 'name location')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/bookings/:id – Read a single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('movie', 'title posterPath runtime genres')
      .populate('theater', 'name location phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/bookings – Create a new booking (atomic operation)
router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const booking = await Booking.create([req.body], { session });
    await session.commitTransaction();
    res.status(201).json({ success: true, data: booking[0] });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ success: false, message: error.message });
  } finally {
    session.endSession();
  }
});

// PUT /api/bookings/:id – Update booking status
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/bookings/:id – Cancel a booking (atomic status update)
router.delete('/:id', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true, session }
    );
    if (!booking) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    await session.commitTransaction();
    res.json({ success: true, message: 'Booking cancelled successfully', data: booking });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
