
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Film, User, Calendar, ChevronLeft, Ticket, Play } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { movies } from '@/lib/data';
import { useBooking } from '@/context/BookingContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMovie } = useBooking();
  const [trailerOpen, setTrailerOpen] = useState(false);
  
  const movie = movies.find(m => m.id === id);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl text-netflix-white">Movie not found</h1>
          <Button 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleBookTickets = () => {
    setMovie(movie);
    navigate(`/theater-selection/${movie.id}`);
  };

  // Sample trailer URLs based on movie title
  const getTrailerUrl = (movieTitle) => {
    const trailerMap = {
      "Avengers: Endgame": "https://www.youtube.com/embed/TcMBFSGVi1c",
      "Joker": "https://www.youtube.com/embed/zAGVQLHvwOY",
      "The Lion King": "https://www.youtube.com/embed/7TavVZMewpY",
      "Parasite": "https://www.youtube.com/embed/5xH0HfJHsaY",
      "1917": "https://www.youtube.com/embed/YqNYrYUiMfg",
      "Tenet": "https://www.youtube.com/embed/LdOM0x0XDMo",
      "Black Widow": "https://www.youtube.com/embed/ybji16u608U",
      "No Time to Die": "https://www.youtube.com/embed/BIhNsAtPbPI"
    };
    
    return trailerMap[movieTitle] || "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Default trailer
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      {/* Hero Section with Backdrop */}
      <div 
        className="relative h-[50vh] md:h-[70vh]"
        style={{
          backgroundImage: `url(${movie.backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent"></div>
        
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 text-netflix-white flex items-center hover:bg-netflix-black/40"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-1" size={20} />
          Back
        </Button>
      </div>
      
      {/* Movie Details */}
      <div className="container mx-auto px-4 -mt-32 md:-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Movie Poster */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="relative">
              <img 
                src={movie.posterUrl} 
                alt={movie.title}
                className="w-full rounded-xl shadow-xl md:max-w-xs mx-auto"
              />
              <Button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-netflix-red/80 hover:bg-netflix-red rounded-full w-16 h-16 flex items-center justify-center"
                onClick={() => setTrailerOpen(true)}
              >
                <Play fill="white" size={28} />
              </Button>
            </div>
          </div>
          
          {/* Movie Info */}
          <div className="md:w-2/3 lg:w-3/4 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              <div className="bg-netflix-light-gray/30 rounded-full px-3 py-1 flex items-center">
                <Calendar size={16} className="mr-1" />
                {movie.releaseYear}
              </div>
              <div className="bg-netflix-light-gray/30 rounded-full px-3 py-1 flex items-center">
                <Clock size={16} className="mr-1" />
                {movie.runtime} min
              </div>
              <div className="bg-netflix-light-gray/30 rounded-full px-3 py-1">
                {movie.certificate}
              </div>
              <div className="bg-netflix-light-gray/30 rounded-full px-3 py-1">
                {movie.language}
              </div>
              <div className="bg-yellow-600/20 rounded-full px-3 py-1 flex items-center">
                <Star size={16} className="mr-1 text-yellow-500" />
                {movie.rating.toFixed(1)}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map(genre => (
                <span 
                  key={genre}
                  className="bg-netflix-red bg-opacity-20 text-netflix-red px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Film size={20} className="mr-2" />
                Synopsis
              </h2>
              <p className="text-netflix-white/80 leading-relaxed">
                {movie.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <User size={20} className="mr-2" />
                Cast & Crew
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {movie.cast.map(person => (
                  <div key={person.name} className="flex items-center space-x-3">
                    <img 
                      src={person.imageUrl} 
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-netflix-white">{person.name}</h3>
                      <p className="text-sm text-netflix-white/70">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <span className="text-netflix-white/70 text-sm">Director: </span>
                <span className="text-netflix-white">{movie.director}</span>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                className="bg-netflix-red hover:bg-netflix-dark-red text-white text-lg py-6 px-8"
                onClick={handleBookTickets}
              >
                <Ticket className="mr-2" size={20} />
                Book Tickets
              </Button>
              
              <Button
                variant="outline" 
                className="border-netflix-white text-netflix-white hover:bg-netflix-white/10"
                onClick={() => setTrailerOpen(true)}
              >
                <Play size={18} className="mr-2" />
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Dialog */}
      <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
        <DialogContent className="max-w-4xl bg-netflix-black border-netflix-light-gray p-0">
          <div className="relative pt-[56.25%] w-full">
            <iframe 
              src={getTrailerUrl(movie.title)}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${movie.title} Trailer`}
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieDetails;
