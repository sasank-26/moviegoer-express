/**
 * es6Classes.ts
 *
 * Module 4 – ES6 Features
 * Demonstrates: classes, constructors, data members, inheritance, super,
 * arrow functions, default parameters, and destructuring within a
 * movie-booking domain.
 */

// ── Base class ─────────────────────────────────────────────────────────────

export class MediaItem {
  title: string;
  releaseYear: number;
  rating: number;

  constructor(title: string, releaseYear: number, rating = 0) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.rating = rating;
  }

  getInfo(): string {
    return `${this.title} (${this.releaseYear}) – Rating: ${this.rating}`;
  }

  static compareRatings(a: MediaItem, b: MediaItem): number {
    return b.rating - a.rating;
  }
}

// ── Inheritance: Movie extends MediaItem ───────────────────────────────────

export class Movie extends MediaItem {
  genres: string[];
  runtime: number;
  certificate: string;

  constructor(
    title: string,
    releaseYear: number,
    rating: number,
    genres: string[],
    runtime: number,
    certificate = 'U'
  ) {
    super(title, releaseYear, rating);   // super() calls parent constructor
    this.genres = genres;
    this.runtime = runtime;
    this.certificate = certificate;
  }

  // Override parent method, extending it via super
  getInfo(): string {
    return (
      `${super.getInfo()} | Genres: ${this.genres.join(', ')} ` +
      `| ${this.durationFormatted} [${this.certificate}]`
    );
  }

  // Arrow function as a getter (default parameter used in constructor)
  get durationFormatted(): string {
    const h = Math.floor(this.runtime / 60);
    const m = this.runtime % 60;
    return `${h}h ${m}m`;
  }
}

// ── Inheritance: Series extends MediaItem ─────────────────────────────────

export class Series extends MediaItem {
  seasons: number;
  episodesPerSeason: number;

  constructor(
    title: string,
    releaseYear: number,
    rating: number,
    seasons: number,
    episodesPerSeason: number
  ) {
    super(title, releaseYear, rating);
    this.seasons = seasons;
    this.episodesPerSeason = episodesPerSeason;
  }

  getInfo(): string {
    return `${super.getInfo()} | ${this.seasons} seasons`;
  }

  get totalEpisodes(): number {
    return this.seasons * this.episodesPerSeason;
  }
}

// ── Base Venue class ───────────────────────────────────────────────────────

export class Venue {
  name: string;
  location: string;
  rating: number;

  constructor(name: string, location: string, rating = 0) {
    this.name = name;
    this.location = location;
    this.rating = rating;
  }

  getDetails(): string {
    return `${this.name} – ${this.location} (★ ${this.rating})`;
  }
}

// ── Inheritance: Theater extends Venue ────────────────────────────────────

export class Theater extends Venue {
  type: string;
  amenities: string[];

  constructor(
    name: string,
    location: string,
    rating: number,
    type: string,
    amenities: string[] = []   // default parameter
  ) {
    super(name, location, rating);
    this.type = type;
    this.amenities = amenities;
  }

  getDetails(): string {
    return (
      `${super.getDetails()} | Type: ${this.type}` +
      (this.amenities.length ? ` | Amenities: ${this.amenities.join(', ')}` : '')
    );
  }

  hasAmenity = (amenity: string): boolean =>   // arrow function as class field
    this.amenities.includes(amenity);
}

// ── Booking class with destructuring in constructor ────────────────────────

export interface BookingParams {
  movie: Movie;
  theater: Theater;
  seats: string[];
  showDate: string;
  showTime: string;
  ticketPrice: number;
  convenienceFee?: number;
}

export class Booking {
  readonly confirmationId: string;
  movie: Movie;
  theater: Theater;
  seats: string[];
  showDate: string;
  showTime: string;
  ticketPrice: number;
  convenienceFee: number;

  // Destructuring in constructor parameters
  constructor({
    movie,
    theater,
    seats,
    showDate,
    showTime,
    ticketPrice,
    convenienceFee = 30,        // default parameter
  }: BookingParams) {
    this.confirmationId = `BMS${Date.now().toString(36).toUpperCase()}`;
    this.movie = movie;
    this.theater = theater;
    this.seats = seats;
    this.showDate = showDate;
    this.showTime = showTime;
    this.ticketPrice = ticketPrice;
    this.convenienceFee = convenienceFee;
  }

  // Arrow function getters
  get subtotal(): number {
    return this.ticketPrice * this.seats.length;
  }

  get tax(): number {
    return this.subtotal * 0.18;
  }

  get totalAmount(): number {
    return this.subtotal + this.tax + this.convenienceFee;
  }

  getSummary() {
    // Object destructuring from this
    const { confirmationId, showDate, showTime, seats } = this;
    return {
      confirmationId,
      movie: this.movie.title,
      theater: this.theater.name,
      seats,
      showDate,
      showTime,
      totalAmount: this.totalAmount.toFixed(2),
    };
  }
}

// ── Higher-Order Function utilities ───────────────────────────────────────

/** Filter movies by minimum rating using a higher-order function. */
export const filterByRating =
  (minRating: number) =>
  (movies: Movie[]): Movie[] =>
    movies.filter((m) => m.rating >= minRating);

/** Sort an array of MediaItems by rating (descending). */
export const sortByRating = <T extends MediaItem>(items: T[]): T[] =>
  [...items].sort(MediaItem.compareRatings);

/** Map movies to their display strings. */
export const toDisplayList = (movies: MediaItem[]): string[] =>
  movies.map((m) => m.getInfo());
