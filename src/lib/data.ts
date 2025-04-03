import { v4 as uuidv4 } from 'uuid';

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  releaseDate: string;
  releaseYear: number;
  runtime: number;
  language: string;
  certificate: string;
  genres: string[];
  director: string;
  cast: {
    name: string;
    role: string;
    imageUrl: string;
  }[];
  featured?: boolean;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  showTimes: {
    time: string;
    price: number;
    seatsAvailable: boolean;
  }[];
  imageUrl: string;
  type: string;
  phone: string;
  rating: number;
  reviews: number;
  distance?: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  price: number;
  status: 'available' | 'booked' | 'selected';
}

// Movie data
export const movies: Movie[] = [
  {
    id: '1',
    title: 'Avengers: Endgame',
    description: 'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
    backdropUrl: 'https://wallpapers.com/images/hd/avengers-endgame-desktop-ypu9hbdctag6quxi.jpg',
    rating: 8.4,
    releaseDate: '2019-04-26',
    releaseYear: 2019,
    runtime: 181,
    language: 'English',
    certificate: 'PG-13',
    genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
    director: 'Anthony Russo, Joe Russo',
    cast: [
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man', imageUrl: 'https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_.jpg' },
      { name: 'Chris Evans', role: 'Steve Rogers / Captain America', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTU2NTg1OTQzMF5BMl5BanBnXkFtZTcwNjIyMjkyMg@@._V1_.jpg' },
      { name: 'Mark Ruffalo', role: 'Bruce Banner / Hulk', imageUrl: 'https://m.media-amazon.com/images/M/MV5BNWIzZTI1ODUtZTUzMC00NTdiLWFlOTYtZTg4MGZkYmU4YzNlXkEyXkFqcGdeQXVyNTExOTk5Nzg@._V1_.jpg' },
      { name: 'Chris Hemsworth', role: 'Thor', imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTU2MTI0NTIyNV5BMl5BanBnXkFtZTcwMTA4Nzc3OA@@._V1_.jpg' },
      { name: 'Scarlett Johansson', role: 'Natasha Romanoff / Black Widow', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_.jpg' }
    ],
    featured: true
  },
  {
    id: '2',
    title: 'Joker',
    description: 'Arthur Fleck, a party clown, leads an impoverished life with his ailing mother. However, when society shuns him and brands him as a freak, he decides to embrace the life of crime and chaos.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    backdropUrl: 'https://wallpaperaccess.com/full/1837200.jpg',
    rating: 8.4,
    releaseDate: '2019-10-02',
    releaseYear: 2019,
    runtime: 122,
    language: 'English',
    certificate: 'R',
    genres: ['Crime', 'Drama', 'Thriller'],
    director: 'Todd Phillips',
    cast: [
      { name: 'Joaquin Phoenix', role: 'Arthur Fleck / Joker', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZGMyY2Q4NTEtMWVkZS00NzcwLTkzNmQtYzBlMWZhZGNhMDhkXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg' },
      { name: 'Robert De Niro', role: 'Murray Franklin', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_.jpg' },
      { name: 'Zazie Beetz', role: 'Sophie Dumond', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMGUzZjY2ZmMtMWY5YS00Y2RlLWJlMmItMmU4YzA0YzQyNDMwXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg' }
    ],
    featured: true
  },
  {
    id: '3',
    title: 'The Dark Knight',
    description: 'After Gordon, Dent and Batman begin an assault on Gotham\'s organised crime, the mobs hire the Joker, a psychopathic criminal mastermind who offers to kill Batman and bring the city to its knees.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    backdropUrl: 'https://wallpapercave.com/wp/wp2162756.jpg',
    rating: 9.0,
    releaseDate: '2008-07-18',
    releaseYear: 2008,
    runtime: 152,
    language: 'English',
    certificate: 'PG-13',
    genres: ['Action', 'Crime', 'Drama', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    featured: true
  },
  {
    id: '4',
    title: 'The Lion King',
    description: 'Simba, a young lion prince, flees his kingdom after the murder of his father, Mufasa. Years later, a chance encounter with Nala, a lioness, causes him to return and take back what is rightfully his.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg',
    backdropUrl: 'https://wallpapercave.com/wp/wp1994783.jpg',
    rating: 8.5,
    releaseDate: '1994-06-24',
    releaseYear: 1994,
    runtime: 88,
    language: 'English',
    certificate: 'G',
    genres: ['Animation', 'Adventure', 'Drama'],
    director: 'Roger Allers, Rob Minkoff',
    cast: ['Matthew Broderick', 'Jeremy Irons', 'James Earl Jones'],
    featured: false
  },
  {
    id: '5',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    backdropUrl: 'https://wallpapercave.com/wp/wp1917154.jpg',
    rating: 8.8,
    releaseDate: '2010-07-16',
    releaseYear: 2010,
    runtime: 148,
    language: 'English',
    certificate: 'PG-13',
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    featured: true
  },
  {
    id: '6',
    title: 'Interstellar',
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    backdropUrl: 'https://wallpapercave.com/wp/wp1817941.jpg',
    rating: 8.6,
    releaseDate: '2014-11-07',
    releaseYear: 2014,
    runtime: 169,
    language: 'English',
    certificate: 'PG-13',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    featured: false
  },
  {
    id: '7',
    title: 'RRR',
    description: 'A tale of two legendary revolutionaries and their journey far away from home. After their journey they return home to start fighting back against British colonialists in the 1920s.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BOGEzYzcxYjAtZmZiNi00YzI0LWIyY2YtOTM0MDlmYzdhOWNiXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg',
    backdropUrl: 'https://images.indianexpress.com/2022/03/RRR-movie-review-1200.jpg',
    rating: 7.8,
    releaseDate: '2022-03-24',
    releaseYear: 2022,
    runtime: 187,
    language: 'Telugu',
    certificate: 'PG-13',
    genres: ['Action', 'Drama', 'Historical'],
    director: 'S. S. Rajamouli',
    cast: ['N.T. Rama Rao Jr.', 'Ram Charan', 'Ajay Devgn', 'Alia Bhatt'],
    featured: true
  },
  {
    id: '8',
    title: 'Dune',
    description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://images.hdqwalls.com/wallpapers/dune-2021-movie-4k-d6.jpg',
    rating: 8.0,
    releaseDate: '2021-10-22',
    releaseYear: 2021,
    runtime: 155,
    language: 'English',
    certificate: 'PG-13',
    genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac', 'Zendaya'],
    featured: true
  },
  {
    id: '9',
    title: 'Parasite',
    description: 'The struggling Kim family sees an opportunity when the son starts working for the wealthy Park family. Soon, all of them find a way to work within the same household and start living a parasitic life.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    backdropUrl: 'https://wallpapercave.com/wp/wp5294666.jpg',
    rating: 8.5,
    releaseDate: '2019-11-08',
    releaseYear: 2019,
    runtime: 132,
    language: 'Korean',
    certificate: 'R',
    genres: ['Comedy', 'Drama', 'Thriller'],
    director: 'Bong Joon Ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
    featured: false
  },
  {
    id: '10',
    title: 'Top Gun: Maverick',
    description: 'After more than 30 years of service as one of the Navy\'s top aviators, Pete "Maverick" Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
    backdropUrl: 'https://wallpapercave.com/wp/wp11254898.jpg',
    rating: 8.3,
    releaseDate: '2022-05-27',
    releaseYear: 2022,
    runtime: 130,
    language: 'English',
    certificate: 'PG-13',
    genres: ['Action', 'Drama'],
    director: 'Joseph Kosinski',
    cast: ['Tom Cruise', 'Jennifer Connelly', 'Miles Teller'],
    featured: true
  }
];

// Theater data
export const theaters: Theater[] = [
  {
    id: 't1',
    name: 'PVR Cinemas',
    location: 'Phoenix Mall, Mumbai',
    showTimes: [
      { time: '09:00', price: 250, seatsAvailable: true },
      { time: '12:30', price: 300, seatsAvailable: true },
      { time: '15:45', price: 300, seatsAvailable: true },
      { time: '19:00', price: 350, seatsAvailable: true },
      { time: '22:15', price: 350, seatsAvailable: true }
    ],
    imageUrl: 'https://content.jdmagicbox.com/comp/mumbai/47/022p8700447/catalogue/pvr-cinemas-phoenix-marketcity-mall-kurla-west-mumbai-cinema-halls-nc6z82l.jpg',
    type: 'Multiplex',
    phone: '+91 22 6180 1234',
    rating: 4.5,
    reviews: 3245,
    distance: '2.5 km'
  },
  {
    id: 't2',
    name: 'INOX Leisure',
    location: 'Nariman Point, Mumbai',
    showTimes: [
      { time: '10:15', price: 280, seatsAvailable: true },
      { time: '13:45', price: 320, seatsAvailable: true },
      { time: '17:00', price: 320, seatsAvailable: false },
      { time: '20:30', price: 380, seatsAvailable: true },
      { time: '23:00', price: 380, seatsAvailable: true }
    ],
    imageUrl: 'https://content3.jdmagicbox.com/comp/kolkata/g3/033pxx33.xx33.180308132131.g4g3/catalogue/inox-quest-mall-ballygunge-kolkata-cinema-halls-3zq3hgq-250.jpg',
    type: 'Luxury Cinema',
    phone: '+91 22 6643 8765',
    rating: 4.7,
    reviews: 2178,
    distance: '3.8 km'
  },
  {
    id: 't3',
    name: 'Cinepolis',
    location: 'Andheri West, Mumbai',
    showTimes: [
      { time: '09:30', price: 250, seatsAvailable: true },
      { time: '12:00', price: 300, seatsAvailable: true },
      { time: '14:30', price: 300, seatsAvailable: true },
      { time: '18:15', price: 350, seatsAvailable: true },
      { time: '21:45', price: 350, seatsAvailable: true }
    ],
    imageUrl: 'https://content.jdmagicbox.com/comp/hyderabad/x6/040pxx40.xx40.170220142635.t2x6/catalogue/cinemax-cinemas-attapur-hyderabad-cinema-halls-inggiyi.jpg',
    type: 'Multiplex',
    phone: '+91 22 2632 9090',
    rating: 4.3,
    reviews: 1956
  },
  {
    id: 't4',
    name: 'Carnival Cinemas',
    location: 'Borivali, Mumbai',
    showTimes: [
      { time: '09:15', price: 250, seatsAvailable: true },
      { time: '12:45', price: 300, seatsAvailable: true },
      { time: '16:30', price: 300, seatsAvailable: true },
      { time: '19:30', price: 350, seatsAvailable: true },
      { time: '22:45', price: 350, seatsAvailable: true }
    ],
    imageUrl: 'https://content.jdmagicbox.com/comp/delhi/l4/011pxx11.xx11.190325153605.u1l4/catalogue/carnival-cinemas-delhi-4lih2.jpg',
    type: 'Standard Cinema',
    phone: '+91 22 2898 7654',
    rating: 4.0,
    reviews: 1458
  },
  {
    id: 't5',
    name: 'Regal Cinema',
    location: 'Colaba, Mumbai',
    showTimes: [
      { time: '10:00', price: 250, seatsAvailable: true },
      { time: '14:00', price: 300, seatsAvailable: true },
      { time: '18:00', price: 300, seatsAvailable: true },
      { time: '21:00', price: 350, seatsAvailable: true }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Eros_Cinema_Mumbai.jpg',
    type: 'Heritage Cinema',
    phone: '+91 22 2202 1017',
    rating: 4.2,
    reviews: 2540
  }
];

// Function to generate seats
export const generateSeats = (rows: number, seatsPerRow: number, basePrice: number = 200): Seat[] => {
  const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(0, rows);
  const seats: Seat[] = [];

  // Function to calculate the price based on row
  const calculatePrice = (rowIndex: number): number => {
    // Front rows (first 20%) are premium
    if (rowIndex < Math.floor(rows * 0.2)) {
      return basePrice + 100; // Premium seats
    } 
    // Middle rows (40%-70%) are standard
    else if (rowIndex >= Math.floor(rows * 0.4) && rowIndex < Math.floor(rows * 0.7)) {
      return basePrice + 50; // Standard seats
    } 
    // Back rows are basic
    else {
      return basePrice; // Basic seats
    }
  };

  for (let i = 0; i < rowLetters.length; i++) {
    const row = rowLetters[i];
    const price = calculatePrice(i);
    
    for (let j = 1; j <= seatsPerRow; j++) {
      const randomStatus = Math.random() < 0.15 ? 'booked' : 'available';
      seats.push({
        id: uuidv4(),
        row,
        number: j,
        price,
        status: randomStatus
      });
    }
  }

  return seats;
};
