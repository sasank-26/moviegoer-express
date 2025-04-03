
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FeaturedSlider from '@/components/FeaturedSlider';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { SupabaseMovie } from '@/types/supabase';

const Index = () => {
  const navigate = useNavigate();
  const { data: moviesData, loading } = useSupabaseData<SupabaseMovie>('movies', {
    limit: 10,
    order: { column: 'release_date', ascending: false }
  });

  // Convert Supabase movies to the format expected by the FeaturedSlider
  const featuredMovies = React.useMemo(() => {
    return moviesData.slice(0, 3).map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterUrl: movie.poster_path,
      backdropUrl: movie.backdrop_path,
      rating: movie.rating,
      runtime: movie.runtime,
      certificate: movie.certificate,
      genres: movie.genres || [],
      language: movie.language
    }));
  }, [moviesData]);

  // Format movies for display in grids
  const formatMovieForCard = (movie: SupabaseMovie) => ({
    id: movie.id,
    title: movie.title,
    posterUrl: movie.poster_path,
    rating: movie.rating,
    genres: movie.genres || [],
    language: movie.language
  });

  const nowShowing = React.useMemo(() => 
    moviesData.slice(0, 5).map(formatMovieForCard),
    [moviesData]
  );
  
  const comingSoon = React.useMemo(() => 
    moviesData.slice(5, 10).map(formatMovieForCard),
    [moviesData]
  );

  return (
    <div className="min-h-screen bg-netflix-black text-netflix-white">
      <Navbar />
      
      {/* Featured Slider */}
      {loading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-xl text-netflix-white">Loading featured movies...</p>
        </div>
      ) : (
        <FeaturedSlider movies={featuredMovies} />
      )}
      
      {/* Now Showing */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Now Showing</h2>
          <Button 
            variant="ghost" 
            className="text-netflix-white hover:text-netflix-red"
            onClick={() => navigate('/movies')}
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
        
        {loading ? (
          <p className="text-center py-8">Loading movies...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {nowShowing.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
      
      {/* Coming Soon */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <Button 
            variant="ghost" 
            className="text-netflix-white hover:text-netflix-red"
            onClick={() => navigate('/movies')}
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
        
        {loading ? (
          <p className="text-center py-8">Loading movies...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {comingSoon.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
      
      {/* Book a movie banner */}
      <section className="bg-netflix-gray py-16 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Ready to watch a movie?</h2>
              <p className="text-netflix-white/70 max-w-md mx-auto md:mx-0">
                Book your tickets now and enjoy the latest movies at the best theaters in town.
              </p>
            </div>
            <div>
              <Button 
                className="bg-netflix-red hover:bg-netflix-dark-red text-white flex items-center"
                size="lg"
                onClick={() => navigate('/movies')}
              >
                <Ticket className="mr-2" size={18} />
                Book Tickets
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-netflix-black border-t border-netflix-gray py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 text-netflix-red mb-4">
                <Ticket size={24} />
                <span className="text-xl font-bold">MovieGoer</span>
              </div>
              <p className="text-netflix-white/70 max-w-xs">
                The best online movie ticket booking platform for a seamless cinema experience.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-netflix-white/70 hover:text-netflix-red">About</a></li>
                  <li><a href="#" className="text-netflix-white/70 hover:text-netflix-red">Careers</a></li>
                  <li><a href="#" className="text-netflix-white/70 hover:text-netflix-red">Contact Us</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Services</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-netflix-white/70 hover:text-netflix-red">Terms of Use</a></li>
                  <li><a href="#" className="text-netflix-white/70 hover:text-netflix-red">Privacy Policy</a></li>
                  <li><a href="#" className="text-netflix-white/70 hover:text-netflix-red">Help</a></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h3 className="font-bold text-lg mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-netflix-white hover:text-netflix-red">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-netflix-white hover:text-netflix-red">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-netflix-white hover:text-netflix-red">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-netflix-light-gray text-center">
            <p className="text-netflix-white/50 text-sm">
              © {new Date().getFullYear()} MovieGoer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
