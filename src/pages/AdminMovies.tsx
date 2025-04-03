
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseCrud } from '@/hooks/useSupabaseCrud';
import { SupabaseMovie } from '@/types/supabase';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash } from 'lucide-react';
import MovieForm from '@/components/MovieForm';

const AdminMovies = () => {
  const navigate = useNavigate();
  const { getAll, remove, loading, error } = useSupabaseCrud<SupabaseMovie>('movies');
  const [movies, setMovies] = useState<SupabaseMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<SupabaseMovie | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<SupabaseMovie | null>(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setIsLoading(true);
    try {
      const data = await getAll();
      setMovies(data);
    } catch (err) {
      console.error('Error loading movies:', err);
      toast.error('Failed to load movies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (movie: SupabaseMovie) => {
    setSelectedMovie(movie);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!movieToDelete) return;
    
    try {
      const success = await remove(movieToDelete.id);
      if (success) {
        toast.success('Movie deleted successfully');
        loadMovies();
      } else {
        toast.error('Failed to delete movie');
      }
    } catch (err) {
      console.error('Error deleting movie:', err);
      toast.error('Failed to delete movie');
    } finally {
      setIsDeleteDialogOpen(false);
      setMovieToDelete(null);
    }
  };

  const confirmDelete = (movie: SupabaseMovie) => {
    setMovieToDelete(movie);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedMovie(null);
    loadMovies();
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-netflix-white">Movie Management</h1>
          <Button
            className="bg-netflix-red hover:bg-netflix-dark-red"
            onClick={() => {
              setSelectedMovie(null);
              setShowForm(true);
            }}
          >
            <Plus size={16} className="mr-2" />
            Add New Movie
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-netflix-white">Loading movies...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-netflix-white">
            <p>Error loading movies. Please try again.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={loadMovies}
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {movies.length === 0 ? (
              <div className="text-center py-8 text-netflix-white">
                <p>No movies found. Add your first movie!</p>
              </div>
            ) : (
              movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="bg-netflix-gray p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <img 
                    src={movie.poster_path} 
                    alt={movie.title} 
                    className="w-24 h-36 object-cover rounded-md" 
                  />
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-netflix-white mb-1">{movie.title}</h3>
                    <p className="text-sm text-netflix-white/70 mb-2">
                      {movie.certificate} • {movie.runtime} min • {movie.release_date}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {movie.genres.map(genre => (
                        <span 
                          key={genre} 
                          className="text-xs bg-netflix-light-gray/30 px-2 py-0.5 rounded-full text-netflix-white"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-netflix-white/70 line-clamp-2">
                      {movie.overview}
                    </p>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col gap-2 self-center sm:self-start">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-netflix-white border-netflix-white/20 hover:bg-netflix-light-gray/20"
                      onClick={() => handleEdit(movie)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-netflix-red border-netflix-white/20 hover:bg-netflix-light-gray/20"
                      onClick={() => confirmDelete(movie)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Movie Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-netflix-gray text-netflix-white border-netflix-light-gray/30 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMovie ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
            <DialogDescription className="text-netflix-white/70">
              {selectedMovie ? 'Update the details of this movie' : 'Fill in the details to add a new movie'}
            </DialogDescription>
          </DialogHeader>
          <MovieForm 
            movie={selectedMovie || undefined} 
            onSuccess={handleFormSuccess} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-netflix-gray text-netflix-white border-netflix-light-gray/30">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-netflix-white/70">
              Are you sure you want to delete "{movieToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMovies;
