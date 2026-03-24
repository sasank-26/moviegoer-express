const mongoose = require('mongoose');

/**
 * Movie Model – demonstrates:
 *  - NoSQL document structure with varied data types (String, Number, Array, Date)
 *  - Nested documents (castMember sub-schema embedded in the cast array)
 *  - Indexing on title and genres for faster querying
 */

// Nested document: a single cast member embedded inside a Movie document
const castMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  photoUrl: { type: String, default: '' },
});

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    overview: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    posterPath: { type: String, default: '' },
    backdropPath: { type: String, default: '' },
    rating: { type: Number, min: 0, max: 10, default: 0 },
    runtime: { type: Number, min: 0, default: 0 },      // minutes
    genres: { type: [String], default: [] },             // Array data type
    certificate: { type: String, default: 'U' },
    language: { type: String, default: 'English' },
    cast: { type: [castMemberSchema], default: [] },     // Nested documents
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexing on commonly queried fields
movieSchema.index({ title: 'text' });
movieSchema.index({ genres: 1 });
movieSchema.index({ language: 1 });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
