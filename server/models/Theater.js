const mongoose = require('mongoose');

/**
 * Theater Model – demonstrates:
 *  - NoSQL document structure with mixed data types
 *  - Nested document: amenities list embedded in the theater document
 *  - Indexing on location and name
 */

// Nested document: a single show-time slot
const showTimeSchema = new mongoose.Schema({
  time: { type: String, required: true },          // e.g. "10:00 AM"
  format: { type: String, default: '2D' },         // "2D" | "3D" | "IMAX"
  price: { type: Number, required: true, min: 0 },
});

const theaterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    type: { type: String, default: 'Multiplex' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: { type: Number, default: 0 },
    phone: { type: String, default: '' },
    amenities: { type: [String], default: [] },      // e.g. ["Parking", "F&B", "Wheelchair"]
    showTimes: { type: [showTimeSchema], default: [] }, // Nested documents
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexing for fast lookups
theaterSchema.index({ location: 1 });
theaterSchema.index({ name: 'text' });

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
