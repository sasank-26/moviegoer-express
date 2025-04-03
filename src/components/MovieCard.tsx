
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Movie } from '../lib/data';
import { supabase } from '@/lib/supabase';

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isLarge = false }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState<string>(movie.posterUrl);
  
  // If the image is stored in Supabase storage, we'll get an optimized version
  React.useEffect(() => {
    const loadImage = async () => {
      if (movie.posterUrl.includes('supabase.co')) {
        try {
          // Get optimized image from Supabase storage
          const { data: imageUrl } = supabase.storage
            .from('movie-posters')
            .getPublicUrl(movie.posterUrl.split('/').pop() || '');
            
          if (imageUrl?.publicUrl) {
            setImageUrl(imageUrl.publicUrl);
          }
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }
    };
    
    loadImage();
  }, [movie.posterUrl]);

  return (
    <div 
      className={`movie-card ${isLarge ? 'w-full aspect-[2/3] md:aspect-[2/3]' : 'w-full aspect-[2/3]'} cursor-pointer`}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={imageUrl}
        alt={movie.title}
        className="rounded-md"
        loading="lazy"
      />
      <div className="movie-card-overlay">
        <h3 className="font-bold text-lg md:text-xl text-white mb-1">{movie.title}</h3>
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm text-white">{movie.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-white mr-1" />
            <span className="text-sm text-white">{movie.runtime} min</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="text-xs bg-netflix-red bg-opacity-70 px-2 py-0.5 rounded text-white"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="mt-2 text-xs text-white">{movie.language} • {movie.certificate}</div>
      </div>
    </div>
  );
};

export default MovieCard;
