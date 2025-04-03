
import React from 'react';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SupabaseMovie } from '@/types/supabase';
import { useSupabaseCrud } from '@/hooks/useSupabaseCrud';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SupabaseImageUpload from '@/components/SupabaseImageUpload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  overview: z.string().min(10, "Overview should be at least 10 characters"),
  release_date: z.string().min(1, "Release date is required"),
  rating: z.coerce.number().min(0).max(10),
  runtime: z.coerce.number().min(1, "Runtime is required"),
  certificate: z.string().optional(),
  language: z.string().min(1, "Language is required"),
});

type MovieFormData = z.infer<typeof movieSchema>;

interface MovieFormProps {
  movie?: SupabaseMovie;
  onSuccess?: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSuccess }) => {
  const navigate = useNavigate();
  const { create, update, loading } = useSupabaseCrud<SupabaseMovie>('movies');
  const [posterUrl, setPosterUrl] = React.useState<string>(movie?.poster_path || '');
  const [backdropUrl, setBackdropUrl] = React.useState<string>(movie?.backdrop_path || '');
  const [genres, setGenres] = React.useState<string[]>(movie?.genres || []);
  const [newGenre, setNewGenre] = React.useState<string>('');
  
  const form = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: movie?.title || '',
      overview: movie?.overview || '',
      release_date: movie?.release_date || '',
      rating: movie?.rating || 0,
      runtime: movie?.runtime || 0,
      certificate: movie?.certificate || '',
      language: movie?.language || '',
    },
  });

  const onSubmit = async (data: MovieFormData) => {
    if (!posterUrl) {
      toast.error("Poster image is required");
      return;
    }

    // Ensure all required properties are present by casting with definite values
    const movieData: Omit<SupabaseMovie, 'id'> = {
      title: data.title,
      overview: data.overview,
      release_date: data.release_date,
      rating: data.rating,
      runtime: data.runtime,
      language: data.language,
      certificate: data.certificate || '',
      poster_path: posterUrl,
      backdrop_path: backdropUrl || posterUrl,
      genres: genres,
    };

    try {
      if (movie?.id) {
        await update(movie.id, movieData);
        toast.success("Movie updated successfully");
      } else {
        await create(movieData);
        toast.success("Movie added successfully");
        form.reset();
        setPosterUrl('');
        setBackdropUrl('');
        setGenres([]);
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to save movie");
      console.error(error);
    }
  };

  const handleAddGenre = () => {
    if (newGenre.trim() && !genres.includes(newGenre.trim())) {
      setGenres([...genres, newGenre.trim()]);
      setNewGenre('');
    }
  };

  const handleRemoveGenre = (genre: string) => {
    setGenres(genres.filter(g => g !== genre));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Movie title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="overview"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overview</FormLabel>
              <FormControl>
                <Textarea placeholder="Movie description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="release_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="runtime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Runtime (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (0-10)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" min="0" max="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input placeholder="Language" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="certificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate (PG, PG-13, R, etc.)</FormLabel>
                <FormControl>
                  <Input placeholder="Certificate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Genres */}
        <div className="space-y-2">
          <FormLabel>Genres</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {genres.map((genre) => (
              <div key={genre} className="flex items-center bg-netflix-gray rounded-full px-3 py-1">
                <span className="text-netflix-white mr-2">{genre}</span>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm"
                  className="h-5 w-5 p-0 text-netflix-white"
                  onClick={() => handleRemoveGenre(genre)}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex">
            <Input
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              placeholder="Add genre"
              className="mr-2"
            />
            <Button 
              type="button"
              onClick={handleAddGenre}
            >
              <Plus size={16} />
              Add
            </Button>
          </div>
        </div>

        {/* Image Uploads */}
        <div className="space-y-4">
          <div>
            <FormLabel>Poster Image</FormLabel>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {posterUrl && (
                <img 
                  src={posterUrl} 
                  alt="Movie poster" 
                  className="w-32 h-48 object-cover rounded-md"
                />
              )}
              <div>
                <SupabaseImageUpload 
                  bucketName="movie-posters" 
                  filePath="posters" 
                  onUploadComplete={setPosterUrl}
                />
                {!posterUrl && (
                  <p className="text-sm text-netflix-white/70 mt-2">
                    Please upload a poster image (required)
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <FormLabel>Backdrop Image</FormLabel>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {backdropUrl && (
                <img 
                  src={backdropUrl} 
                  alt="Movie backdrop" 
                  className="w-48 h-27 object-cover rounded-md"
                />
              )}
              <div>
                <SupabaseImageUpload 
                  bucketName="movie-posters" 
                  filePath="backdrops" 
                  onUploadComplete={setBackdropUrl}
                />
                {!backdropUrl && (
                  <p className="text-sm text-netflix-white/70 mt-2">
                    Optional: If not provided, poster will be used
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : movie ? 'Update Movie' : 'Add Movie'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MovieForm;
