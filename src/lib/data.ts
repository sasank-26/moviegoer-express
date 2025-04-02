export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  releaseYear: number;
  runtime: number;
  genre: string[];
  rating: number;
  language: string;
  certificate: string;
  description: string;
  cast: {
    name: string;
    role: string;
    imageUrl: string;
  }[];
  director: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  distance: string;
  imageUrl: string;
  type: string;
  phone: string;
  rating: number;
  reviews: number;
  showTimes: {
    time: string;
    price: number;
    seatsAvailable: boolean;
  }[];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'booked';
  price: number;
}

// Mock data for movies
export const movies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    posterUrl: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5jZXB0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    releaseYear: 2010,
    runtime: 148,
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    rating: 8.8,
    language: 'English',
    certificate: 'PG-13',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    cast: [
      { name: 'Leonardo DiCaprio', role: 'Cobb', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
      { name: 'Joseph Gordon-Levitt', role: 'Arthur', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
      { name: 'Elliot Page', role: 'Ariadne', imageUrl: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    ],
    director: 'Christopher Nolan'
  },
  {
    id: '2',
    title: 'The Dark Knight',
    posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmF0bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    backdropUrl: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    releaseYear: 2008,
    runtime: 152,
    genre: ['Action', 'Crime', 'Drama'],
    rating: 9.0,
    language: 'English',
    certificate: 'PG-13',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    cast: [
      { name: 'Christian Bale', role: 'Bruce Wayne', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
      { name: 'Heath Ledger', role: 'Joker', imageUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
      { name: 'Aaron Eckhart', role: 'Harvey Dent', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
    ],
    director: 'Christopher Nolan'
  },
  {
    id: '3',
    title: 'Interstellar',
    posterUrl: 'https://images.unsplash.com/photo-1590907047706-ee9c08cf3189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    backdropUrl: 'https://images.unsplash.com/photo-1537420327992-d6e192287183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    releaseYear: 2014,
    runtime: 169,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    rating: 8.6,
    language: 'English',
    certificate: 'PG-13',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper', imageUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
      { name: 'Anne Hathaway', role: 'Brand', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
      { name: 'Jessica Chastain', role: 'Murph', imageUrl: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
    ],
    director: 'Christopher Nolan'
  },
  {
    id: '4',
    title: 'Dune',
    posterUrl: 'https://images.unsplash.com/photo-1560809451-9e77c2e8214a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVzZXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    backdropUrl: 'https://images.unsplash.com/photo-1579858740738-62d00b2bfc4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    releaseYear: 2021,
    runtime: 155,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    rating: 8.1,
    language: 'English',
    certificate: 'PG-13',
    description: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
      { name: 'Oscar Isaac', role: 'Duke Leto Atreides', imageUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    ],
    director: 'Denis Villeneuve'
  },
  {
    id: '5',
    title: 'The Avengers',
    posterUrl: 'https://images.unsplash.com/photo-1635863138275-d9b33299680d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZlbmdlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    backdropUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    releaseYear: 2012,
    runtime: 143,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 8.0,
    language: 'English',
    certificate: 'PG-13',
    description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
    cast: [
      { name: 'Robert Downey Jr.', role: 'Tony Stark', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
      { name: 'Chris Evans', role: 'Steve Rogers', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
      { name: 'Scarlett Johansson', role: 'Natasha Romanoff', imageUrl: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    ],
    director: 'Joss Whedon'
  },
  {
    id: '6',
    title: 'Parasite',
    posterUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a29yZWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    backdropUrl: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    releaseYear: 2019,
    runtime: 132,
    genre: ['Drama', 'Thriller'],
    rating: 8.5,
    language: 'Korean',
    certificate: 'R',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    cast: [
      { name: 'Song Kang-ho', role: 'Kim Ki-taek', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
      { name: 'Lee Sun-kyun', role: 'Park Dong-ik', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
      { name: 'Cho Yeo-jeong', role: 'Choi Yeon-gyo', imageUrl: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    ],
    director: 'Bong Joon Ho'
  }
];

// Mock data for theaters
export const theaters: Theater[] = [
  {
    id: '1',
    name: 'Cinema City',
    location: 'Downtown Center Mall',
    distance: '2.5 km',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2luZW1hfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    type: 'IMAX & 4DX',
    phone: '+91 98765 43210',
    rating: 4.5,
    reviews: 1245,
    showTimes: [
      { time: '10:30 AM', price: 399, seatsAvailable: true },
      { time: '1:45 PM', price: 499, seatsAvailable: true },
      { time: '4:30 PM', price: 599, seatsAvailable: true },
      { time: '8:00 PM', price: 699, seatsAvailable: true },
    ]
  },
  {
    id: '2',
    name: 'MovieMax Multiplex',
    location: 'West Side Shopping Complex',
    distance: '4.8 km',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2luZW1hfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    type: 'Dolby Atmos',
    phone: '+91 98765 43211',
    rating: 4.2,
    reviews: 987,
    showTimes: [
      { time: '11:15 AM', price: 399, seatsAvailable: true },
      { time: '2:30 PM', price: 499, seatsAvailable: true },
      { time: '5:45 PM', price: 599, seatsAvailable: true },
      { time: '9:00 PM', price: 699, seatsAvailable: true },
    ]
  },
  {
    id: '3',
    name: 'Royal Cinema',
    location: 'North Plaza',
    distance: '3.2 km',
    imageUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNpbmVtYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    type: 'Standard & VIP',
    phone: '+91 98765 43212',
    rating: 4.7,
    reviews: 1578,
    showTimes: [
      { time: '10:00 AM', price: 449, seatsAvailable: true },
      { time: '1:00 PM', price: 549, seatsAvailable: true },
      { time: '4:15 PM', price: 649, seatsAvailable: true },
      { time: '7:30 PM', price: 749, seatsAvailable: true },
    ]
  }
];

// Generate seats for a theater
export const generateSeats = (rowCount: number, seatsPerRow: number): Seat[] => {
  const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, rowCount);
  const seats: Seat[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 1; j <= seatsPerRow; j++) {
      const randomStatus = Math.random() < 0.3 ? 'booked' : 'available';
      seats.push({
        id: `${row}${j}`,
        row,
        number: j,
        status: randomStatus,
        price: i < 3 ? 12.99 : 9.99,
      });
    }
  }

  return seats;
};
