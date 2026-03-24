const mongoose = require('mongoose');

/**
 * Booking Model – demonstrates:
 *  - References to other collections (movie, theater) using ObjectId
 *  - Atomic operations support via Mongoose transactions
 *  - Aggregation-friendly structure (amount fields for pipeline totals)
 *  - Indexing on userId and showDate for efficient queries
 */
const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater',
      required: true,
    },
    movieTitle: { type: String, required: true },
    theaterName: { type: String, required: true },
    posterUrl: { type: String, default: '' },
    showDate: { type: Date, required: true },
    showTime: { type: String, required: true },
    seats: { type: [String], required: true },       // e.g. ["A1", "A2"]
    amount: { type: Number, required: true, min: 0 },
    convenienceFee: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'pending'],
      default: 'confirmed',
    },
  },
  { timestamps: true }
);

// Indexing for common query patterns
bookingSchema.index({ userId: 1 });
bookingSchema.index({ showDate: 1 });
bookingSchema.index({ movie: 1, theater: 1, showDate: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
