
-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  overview TEXT NOT NULL,
  release_date TEXT,
  poster_path TEXT,
  backdrop_path TEXT,
  rating NUMERIC(3, 1) NOT NULL,
  runtime INTEGER NOT NULL,
  genres TEXT[] NOT NULL,
  certificate TEXT,
  language TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create theaters table
CREATE TABLE IF NOT EXISTS theaters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  type TEXT,
  rating NUMERIC(3, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create showtimes table
CREATE TABLE IF NOT EXISTS showtimes (
  id TEXT PRIMARY KEY,
  movie_id TEXT REFERENCES movies(id) ON DELETE CASCADE,
  theater_id TEXT REFERENCES theaters(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  price INTEGER NOT NULL,
  seats_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  movie_id TEXT REFERENCES movies(id) ON DELETE SET NULL,
  theater_id TEXT REFERENCES theaters(id) ON DELETE SET NULL,
  movie_title TEXT NOT NULL,
  theater_name TEXT NOT NULL,
  poster_url TEXT,
  show_date TEXT NOT NULL,
  show_time TEXT NOT NULL,
  seats TEXT[] NOT NULL,
  amount INTEGER NOT NULL,
  convenience_fee INTEGER NOT NULL,
  tax INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) policies

-- User profiles: users can read all profiles but only update their own
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Movies: public read access
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view all movies"
  ON movies FOR SELECT
  USING (true);

-- Theaters: public read access
ALTER TABLE theaters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view all theaters"
  ON theaters FOR SELECT
  USING (true);

-- Showtimes: public read access
ALTER TABLE showtimes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view all showtimes"
  ON showtimes FOR SELECT
  USING (true);

-- Bookings: users can only access their own bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
