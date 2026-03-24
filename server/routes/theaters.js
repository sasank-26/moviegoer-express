const express = require('express');
const Theater = require('../models/Theater');

const router = express.Router();

// GET /api/theaters/stats/aggregation – Average rating per location
// NOTE: must be defined before /:id to avoid Express treating 'stats' as an ID
router.get('/stats/aggregation', async (req, res) => {
  try {
    const stats = await Theater.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$location',
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: '$reviews' },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgRating: -1 } },
    ]);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/theaters – Read all theaters (supports ?location= filter)
router.get('/', async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.location) filter.location = new RegExp(req.query.location, 'i');

    const theaters = await Theater.find(filter).sort({ rating: -1 });
    res.json({ success: true, count: theaters.length, data: theaters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/theaters/:id – Read a single theater by ID
router.get('/:id', async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ success: false, message: 'Theater not found' });
    }
    res.json({ success: true, data: theater });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/theaters – Create a new theater
router.post('/', async (req, res) => {
  try {
    const theater = await Theater.create(req.body);
    res.status(201).json({ success: true, data: theater });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/theaters/:id – Update an existing theater
router.put('/:id', async (req, res) => {
  try {
    const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!theater) {
      return res.status(404).json({ success: false, message: 'Theater not found' });
    }
    res.json({ success: true, data: theater });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/theaters/:id – Soft-delete a theater
router.delete('/:id', async (req, res) => {
  try {
    const theater = await Theater.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!theater) {
      return res.status(404).json({ success: false, message: 'Theater not found' });
    }
    res.json({ success: true, message: 'Theater deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
