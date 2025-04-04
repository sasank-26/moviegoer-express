
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { SupabaseMovie } from '@/types/supabase';

const AllMovies = () => {
  const navigate = useNavigate();
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const { data: movies, loading } = useSupabaseData<SupabaseMovie>('movies');
  
  // Extract unique genres and languages from the fetched movies
  const allGenres = React.useMemo(() => {
    const genres = movies.flatMap(movie => movie.genres || []);
    return Array.from(new Set(genres));
  }, [movies]);
  
  const allLanguages = React.useMemo(() => {
    const languages = movies.map(movie => movie.language);
    return Array.from(new Set(languages));
  }, [movies]);
  
  // Filter movies based on active filters
  const filteredMovies = React.useMemo(() => {
    return movies.filter(movie => {
      const genreMatch = !activeGenre || (movie.genres && movie.genres.includes(activeGenre));
      const languageMatch = !activeLanguage || movie.language === activeLanguage;
      return genreMatch && languageMatch;
    });
  }, [movies, activeGenre, activeLanguage]);
  
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 text-netflix-white"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-1" size={20} />
          Back
        </Button>
        
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-netflix-white mb-2">All Movies</h1>
          <p className="text-netflix-white/70">Browse all the latest movies by genre and language</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-netflix-white text-lg">Loading movies...</p>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="mb-8">
              <div className="flex items-center mb-3">
                <Filter size={18} className="mr-2 text-netflix-white/70" />
                <h2 className="text-netflix-white font-medium">Filters</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-netflix-white/70 mb-2">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={activeGenre === null ? "secondary" : "outline"}
                      size="sm"
                      className={activeGenre === null ? "bg-netflix-red text-white" : "text-netflix-white"}
                      onClick={() => setActiveGenre(null)}
                    >
                      All
                    </Button>
                    {allGenres.map(genre => (
                      <Button
                        key={genre}
                        variant={activeGenre === genre ? "secondary" : "outline"}
                        size="sm"
                        className={activeGenre === genre ? "bg-netflix-red text-white" : "text-netflix-white"}
                        onClick={() => setActiveGenre(genre)}
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-netflix-white/70 mb-2">Language</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={activeLanguage === null ? "secondary" : "outline"}
                      size="sm"
                      className={activeLanguage === null ? "bg-netflix-red text-white" : "text-netflix-white"}
                      onClick={() => setActiveLanguage(null)}
                    >
                      All
                    </Button>
                    {allLanguages.map(language => (
                      <Button
                        key={language}
                        variant={activeLanguage === language ? "secondary" : "outline"}
                        size="sm"
                        className={activeLanguage === language ? "bg-netflix-red text-white" : "text-netflix-white"}
                        onClick={() => setActiveLanguage(language)}
                      >
                        {language}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Movies Grid */}
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {filteredMovies.map(movie => (
                  <MovieCard 
                    key={movie.id} 
                    movie={{
                      id: movie.id,
                      title: movie.title,
                      posterUrl: movie.poster_path,
                      rating: movie.rating,
                      genres: movie.genres || [],
                      language: movie.language
                    }} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-netflix-white mb-2">No movies found</h3>
                <p className="text-netflix-white/60 mb-6">
                  Try changing your filter selections
                </p>
                <Button 
                  onClick={() => {
                    setActiveGenre(null);
                    setActiveLanguage(null);
                  }}
                  className="bg-netflix-red hover:bg-netflix-dark-red text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
