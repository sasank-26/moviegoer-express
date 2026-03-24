/**
 * es6Features.js
 *
 * Module 4 – ES6 Features Demonstration
 * Covers: var vs let vs const, arrow functions, default parameters,
 * destructuring, higher-order functions, classes, constructors,
 * inheritance, and super.
 */

'use strict';

/* ─────────────────────────────────────────────────────────────
 * 1. var vs let vs const (Scoping)
 * ───────────────────────────────────────────────────────────── */

function scopingDemo() {
  // var – function-scoped, hoisted
  var movieTitle = 'The Dark Knight';

  // let – block-scoped, not hoisted into usable state
  let ticketCount = 5;

  // const – block-scoped, cannot be reassigned
  const MAX_SEATS = 100;

  if (ticketCount > 0) {
    let localMsg = 'Tickets available';   // block-scoped
    var sharedMsg = 'Show is on';         // function-scoped (leaks out)
    console.log(localMsg);
  }

  // localMsg is not accessible here (block-scoped), sharedMsg is accessible
  console.log(sharedMsg);
  console.log(`${movieTitle} | Seats: ${ticketCount}/${MAX_SEATS}`);
}

/* ─────────────────────────────────────────────────────────────
 * 2. Arrow Functions
 * ───────────────────────────────────────────────────────────── */

// Traditional function
function getMovieRating(rating) {
  return `Rating: ${rating}/10`;
}

// Arrow function – concise syntax
const getMovieRatingArrow = (rating) => `Rating: ${rating}/10`;

// Arrow function with default parameter
const applyDiscount = (price, discount = 0.1) => price - price * discount;

/* ─────────────────────────────────────────────────────────────
 * 3. Default Parameters
 * ───────────────────────────────────────────────────────────── */

const calculateTotal = (ticketPrice, seats = 1, convenienceFee = 30) => {
  const subtotal = ticketPrice * seats;
  const tax = subtotal * 0.18;
  return subtotal + tax + convenienceFee;
};

/* ─────────────────────────────────────────────────────────────
 * 4. Destructuring
 * ───────────────────────────────────────────────────────────── */

function destructuringDemo() {
  // Object destructuring
  const movie = {
    title: 'Interstellar',
    rating: 8.6,
    genres: ['Sci-Fi', 'Drama'],
    director: 'Christopher Nolan',
  };
  const { title, rating, genres, director = 'Unknown' } = movie;
  console.log(`${title} by ${director} – Rating: ${rating}`);

  // Array destructuring
  const [firstGenre, secondGenre = 'General'] = genres;
  console.log(`Primary genre: ${firstGenre}, Secondary: ${secondGenre}`);

  // Nested destructuring
  const booking = { user: { name: 'Alice', id: 'u001' }, seats: ['A1', 'A2'] };
  const { user: { name: userName }, seats: [firstSeat] } = booking;
  console.log(`${userName} booked seat ${firstSeat}`);
}

/* ─────────────────────────────────────────────────────────────
 * 5. Higher-Order Functions
 * ───────────────────────────────────────────────────────────── */

const movies = [
  { title: 'Inception', rating: 8.8, genre: 'Sci-Fi', price: 250 },
  { title: 'The Godfather', rating: 9.2, genre: 'Drama', price: 200 },
  { title: 'The Dark Knight', rating: 9.0, genre: 'Action', price: 300 },
  { title: 'Pulp Fiction', rating: 8.9, genre: 'Crime', price: 220 },
];

// map – transform each element
const movieTitles = movies.map((m) => m.title);

// filter – select elements matching a condition
const topRatedMovies = movies.filter((m) => m.rating >= 9.0);

// reduce – accumulate a single value
const totalRevenue = movies.reduce((acc, m) => acc + m.price, 0);

// find – locate the first matching element
const sciFiMovie = movies.find((m) => m.genre === 'Sci-Fi');

// sort – order elements (non-mutating via spread)
const sortedByRating = [...movies].sort((a, b) => b.rating - a.rating);

/* ─────────────────────────────────────────────────────────────
 * 6. Classes, Constructors, Accessing Data Members
 * ───────────────────────────────────────────────────────────── */

class MediaItem {
  constructor(title, releaseYear, rating = 0) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.rating = rating;
  }

  // Instance method
  getInfo() {
    return `${this.title} (${this.releaseYear}) – Rating: ${this.rating}`;
  }

  // Static method
  static compareRatings(a, b) {
    return b.rating - a.rating;
  }
}

/* ─────────────────────────────────────────────────────────────
 * 7. Inheritance & super
 * ───────────────────────────────────────────────────────────── */

class Movie extends MediaItem {
  constructor(title, releaseYear, rating, genres, runtime, certificate = 'U') {
    super(title, releaseYear, rating);   // call parent constructor
    this.genres = genres;
    this.runtime = runtime;             // in minutes
    this.certificate = certificate;
  }

  // Override parent method
  getInfo() {
    const base = super.getInfo();       // call parent method via super
    return `${base} | Genres: ${this.genres.join(', ')} | ${this.runtime} min [${this.certificate}]`;
  }

  get durationFormatted() {
    const h = Math.floor(this.runtime / 60);
    const m = this.runtime % 60;
    return `${h}h ${m}m`;
  }
}

class Series extends MediaItem {
  constructor(title, releaseYear, rating, seasons, episodesPerSeason) {
    super(title, releaseYear, rating);
    this.seasons = seasons;
    this.episodesPerSeason = episodesPerSeason;
  }

  getInfo() {
    return `${super.getInfo()} | ${this.seasons} seasons`;
  }

  get totalEpisodes() {
    return this.seasons * this.episodesPerSeason;
  }
}

/* ─────────────────────────────────────────────────────────────
 * 8. Domain-Specific Classes (Theater, Booking)
 * ───────────────────────────────────────────────────────────── */

class Venue {
  constructor(name, location, rating = 0) {
    this.name = name;
    this.location = location;
    this.rating = rating;
  }

  getDetails() {
    return `${this.name} – ${this.location} (★ ${this.rating})`;
  }
}

class Theater extends Venue {
  constructor(name, location, rating, type, amenities = []) {
    super(name, location, rating);
    this.type = type;
    this.amenities = amenities;
  }

  getDetails() {
    return `${super.getDetails()} | Type: ${this.type} | Amenities: ${this.amenities.join(', ')}`;
  }

  hasAmenity(amenity) {
    return this.amenities.includes(amenity);
  }
}

class Booking {
  #confirmationId;        // Private field (ES2022 – supported in Node ≥12)

  constructor({ movie, theater, seats, showDate, showTime, ticketPrice, convenienceFee = 30 }) {
    this.#confirmationId = `BMS${Date.now().toString(36).toUpperCase()}`;
    this.movie = movie;
    this.theater = theater;
    this.seats = seats;
    this.showDate = showDate;
    this.showTime = showTime;
    this.ticketPrice = ticketPrice;
    this.convenienceFee = convenienceFee;
  }

  get confirmationId() {
    return this.#confirmationId;
  }

  get subtotal() {
    return this.ticketPrice * this.seats.length;
  }

  get tax() {
    return this.subtotal * 0.18;
  }

  get totalAmount() {
    return this.subtotal + this.tax + this.convenienceFee;
  }

  getSummary() {
    return {
      confirmationId: this.#confirmationId,
      movie: this.movie.title,
      theater: this.theater.name,
      seats: this.seats,
      showDate: this.showDate,
      showTime: this.showTime,
      totalAmount: this.totalAmount.toFixed(2),
    };
  }
}

/* ─────────────────────────────────────────────────────────────
 * Exports
 * ───────────────────────────────────────────────────────────── */

module.exports = {
  scopingDemo,
  applyDiscount,
  calculateTotal,
  destructuringDemo,
  movieTitles,
  topRatedMovies,
  totalRevenue,
  sciFiMovie,
  sortedByRating,
  MediaItem,
  Movie,
  Series,
  Venue,
  Theater,
  Booking,
};
