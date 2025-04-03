
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, ChevronLeft, ChevronRight, Play, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '../lib/data';

interface FeaturedSliderProps {
  movies: Movie[];
}

const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [movies.length]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const currentMovie = movies[currentIndex];

  return (
    <div className="featured-slider relative w-full overflow-hidden">
      {/* Previous button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full text-white focus:outline-none"
        onClick={goToPrevSlide}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Image and content */}
      <div 
        className="featured-slide"
        style={{
          backgroundImage: `url(${currentMovie.backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div className="featured-slide-content">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {currentMovie.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="text-white font-medium">{currentMovie.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-white mr-1" />
                <span className="text-white">{currentMovie.runtime} min</span>
              </div>
              <div className="text-white">{currentMovie.releaseYear}</div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {currentMovie.genres.map((genre) => (
                <span
                  key={genre}
                  className="text-sm bg-netflix-red bg-opacity-80 px-3 py-1 rounded-full text-white"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <p className="text-white text-sm md:text-base max-w-2xl mb-6 line-clamp-3">
              {currentMovie.description}
            </p>
            
            <div className="flex space-x-4">
              <Button 
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="bg-netflix-red hover:bg-netflix-dark-red text-white"
              >
                <Play className="mr-2 h-4 w-4" />
                Movie Details
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/20"
                onClick={() => navigate(`/theater-selection/${currentMovie.id}`)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Tickets
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Next button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full text-white focus:outline-none"
        onClick={goToNextSlide}
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-netflix-red' : 'bg-white bg-opacity-50'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSlider;
