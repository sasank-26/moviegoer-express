
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Movie } from '@/lib/data';
import { supabase } from '@/lib/supabase';

interface SearchResultsProps {
  results: Movie[];
  onClose: () => void;
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose, query }) => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = React.useState<Record<string, string>>({});
  
  React.useEffect(() => {
    // Load optimized images for search results
    const loadImages = async () => {
      const newImageUrls: Record<string, string> = {};
      
      for (const movie of results) {
        if (movie.posterUrl.includes('supabase.co')) {
          try {
            const { data: imageUrl } = supabase.storage
              .from('movie-posters')
              .getPublicUrl(movie.posterUrl.split('/').pop() || '');
              
            if (imageUrl?.publicUrl) {
              newImageUrls[movie.id] = imageUrl.publicUrl;
            }
          } catch (error) {
            console.error('Error loading image:', error);
          }
        }
      }
      
      setImageUrls(newImageUrls);
    };
    
    if (results.length > 0) {
      loadImages();
    }
  }, [results]);
  
  if (query.length < 2) return null;
  
  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
    onClose();
  };
  
  return (
    <div className="absolute top-full left-0 w-full bg-netflix-black border border-netflix-light-gray/30 rounded-b-lg shadow-lg max-h-96 overflow-y-auto z-50">
      {results.length > 0 ? (
        results.map(movie => (
          <div
            key={movie.id}
            className="flex items-center p-3 hover:bg-netflix-gray cursor-pointer"
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={imageUrls[movie.id] || movie.posterUrl}
              alt={movie.title}
              className="w-12 h-16 object-cover rounded mr-3"
            />
            <div className="flex-1">
              <h4 className="text-netflix-white font-medium">{movie.title}</h4>
              <div className="flex items-center mt-1 text-xs text-netflix-white/70">
                <span className="flex items-center mr-2">
                  <Star size={12} className="text-yellow-500 mr-1" />
                  {movie.rating.toFixed(1)}
                </span>
                <span className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {movie.runtime} min
                </span>
                <span className="ml-2 px-1.5 py-0.5 bg-netflix-light-gray/30 rounded text-xs">
                  {movie.certificate}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {movie.genres.slice(0, 2).map(g => (
                  <span key={g} className="text-xs bg-netflix-red bg-opacity-20 text-netflix-red px-1.5 py-0.5 rounded">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-netflix-white/70">
          No movies found matching "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchResults;
