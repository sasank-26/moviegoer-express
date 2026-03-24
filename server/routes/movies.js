const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// GET /api/movies/stats/aggregation – Aggregation example (average rating per genre)
// NOTE: must be defined before /:id to avoid Express treating 'stats' as an ID
router.get('/stats/aggregation', async (req, res) => {
  try {
    const stats = await Movie.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$genres' },
      {
        $group: {
          _id: '$genres',
          avgRating: { $avg: '$rating' },
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

// GET /api/movies – Read all movies (supports ?genre= and ?language= filters)
router.get('/', async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.genre) filter.genres = req.query.genre;
    if (req.query.language) filter.language = req.query.language;

    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: movies.length, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/movies/:id – Read a single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/movies – Create a new movie
router.post('/', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/movies/:id – Update an existing movie
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/movies/:id – Soft-delete a movie (sets isActive = false)
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
