
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Phone, Clock, Star, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { theaters, movies } from '@/lib/data';
import { format } from 'date-fns';
import MovieCard from '@/components/MovieCard';

const TheaterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const theater = theaters.find(t => t.id === id);
  
  if (!theater) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl text-netflix-white">Theater not found</h1>
          <Button 
            className="mt-4"
            onClick={() => navigate('/theaters')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Theaters
          </Button>
        </div>
      </div>
    );
  }
  
  // Shows for today (just for demo)
  const today = format(new Date(), 'EEEE, MMMM d, yyyy');
  const showingMovies = movies.slice(0, 5); // Just show some movies
  
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div 
        className="h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${theater.imageUrl})` }}
      >
        <div className="h-full w-full bg-gradient-to-t from-netflix-black via-netflix-black/80 to-transparent flex items-end p-6">
          <Button 
            variant="ghost" 
            className="absolute top-4 left-4 text-netflix-white flex items-center hover:bg-netflix-black/40"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-1" size={20} />
            Back
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full">
            <div className="bg-netflix-gray rounded-lg p-6 shadow-lg mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-netflix-white mb-2">{theater.name}</h1>
              <p className="text-netflix-white/70 mb-4">{theater.type}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin size={18} className="text-netflix-white/60 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-netflix-white/80">{theater.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone size={18} className="text-netflix-white/60 mr-2 flex-shrink-0" />
                    <span className="text-netflix-white/80">{theater.phone || 'Not Available'}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Star size={18} className="text-yellow-500 mr-2" />
                    <span className="text-netflix-white font-medium">{theater.rating.toFixed(1)}/5</span>
                    <span className="text-netflix-white/60 text-sm ml-1">({theater.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={18} className="text-netflix-white/60 mr-2" />
                    <span className="text-netflix-white/80">Open from 9:00 AM to 12:00 AM</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-netflix-light-gray/30 pt-4 mt-4">
                <h3 className="text-lg font-medium text-netflix-white mb-2">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-netflix-light-gray/30 text-netflix-white px-3 py-1 rounded-full text-sm">Dolby Atmos</span>
                  <span className="bg-netflix-light-gray/30 text-netflix-white px-3 py-1 rounded-full text-sm">IMAX</span>
                  <span className="bg-netflix-light-gray/30 text-netflix-white px-3 py-1 rounded-full text-sm">4K</span>
                  <span className="bg-netflix-light-gray/30 text-netflix-white px-3 py-1 rounded-full text-sm">Food Court</span>
                  <span className="bg-netflix-light-gray/30 text-netflix-white px-3 py-1 rounded-full text-sm">Parking</span>
                  <span className="bg-netflix-light-gray/30 text-netflix-white px-3 py-1 rounded-full text-sm">Wheelchair Accessible</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Calendar size={20} className="text-netflix-white mr-2" />
                <h2 className="text-xl font-bold text-netflix-white">Now Showing — {today}</h2>
              </div>
              
              {showingMovies.map(movie => (
                <div key={movie.id} className="bg-netflix-gray rounded-lg p-4 mb-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title} 
                      className="w-full md:w-32 rounded"
                    />
                    
                    <div className="flex flex-col flex-1">
                      <h3 className="text-lg font-medium text-netflix-white mb-1">{movie.title}</h3>
                      <p className="text-netflix-white/70 text-sm mb-4">{movie.certificate} • {movie.language} • {movie.runtime} min</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-netflix-light-gray/20 border-netflix-light-gray/30 text-netflix-white hover:bg-netflix-light-gray/40"
                          onClick={() => navigate(`/seat-booking/${movie.id}`)}
                        >
                          10:30 AM
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-netflix-light-gray/20 border-netflix-light-gray/30 text-netflix-white hover:bg-netflix-light-gray/40"
                          onClick={() => navigate(`/seat-booking/${movie.id}`)}
                        >
                          1:15 PM
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-netflix-light-gray/20 border-netflix-light-gray/30 text-netflix-white hover:bg-netflix-light-gray/40"
                          onClick={() => navigate(`/seat-booking/${movie.id}`)}
                        >
                          4:30 PM
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-netflix-light-gray/20 border-netflix-light-gray/30 text-netflix-white hover:bg-netflix-light-gray/40"
                          onClick={() => navigate(`/seat-booking/${movie.id}`)}
                        >
                          7:45 PM
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-netflix-light-gray/20 border-netflix-light-gray/30 text-netflix-white hover:bg-netflix-light-gray/40"
                          onClick={() => navigate(`/seat-booking/${movie.id}`)}
                        >
                          10:30 PM
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheaterDetails;
