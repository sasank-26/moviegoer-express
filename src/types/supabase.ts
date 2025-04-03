
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface SupabaseMovie {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  rating: number;
  runtime: number;
  genres: string[];
  certificate: string;
  language: string;
}

export interface SupabaseTheater {
  id: string;
  name: string;
  location: string;
  image_url: string;
  type: string;
  rating: number;
  reviews: number;
  phone: string;
}

export interface Booking {
  id: string;
  user_id: string;
  movie_id: string;
  theater_id: string;
  movie_title: string;
  theater_name: string;
  poster_url: string;
  show_date: string;
  show_time: string;
  seats: string[];
  amount: number;
  convenience_fee: number;
  tax: number;
  total_amount: number;
  created_at: string;
}
