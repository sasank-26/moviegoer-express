
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseCrud } from '@/hooks/useSupabaseCrud';
import { SupabaseTheater } from '@/types/supabase';
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
import { Plus, Edit, Trash, MapPin, Phone, Star } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import SupabaseImageUpload from '@/components/SupabaseImageUpload';

const theaterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
  reviews: z.coerce.number().min(0).optional().default(0),
  phone: z.string().optional(),
});

type TheaterFormData = z.infer<typeof theaterSchema>;

const AdminTheaters = () => {
  const navigate = useNavigate();
  const { getAll, create, update, remove } = useSupabaseCrud<SupabaseTheater>('theaters');
  const [theaters, setTheaters] = useState<SupabaseTheater[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTheater, setSelectedTheater] = useState<SupabaseTheater | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [theaterToDelete, setTheaterToDelete] = useState<SupabaseTheater | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const form = useForm<TheaterFormData>({
    resolver: zodResolver(theaterSchema),
    defaultValues: {
      name: '',
      location: '',
      type: '',
      rating: 0,
      reviews: 0,
      phone: '',
    },
  });

  useEffect(() => {
    loadTheaters();
  }, []);

  useEffect(() => {
    if (selectedTheater) {
      form.reset({
        name: selectedTheater.name,
        location: selectedTheater.location,
        type: selectedTheater.type || '',
        rating: selectedTheater.rating,
        reviews: selectedTheater.reviews,
        phone: selectedTheater.phone || '',
      });
      setImageUrl(selectedTheater.image_url || '');
    } else {
      form.reset({
        name: '',
        location: '',
        type: '',
        rating: 0,
        reviews: 0,
        phone: '',
      });
      setImageUrl('');
    }
  }, [selectedTheater, form]);

  const loadTheaters = async () => {
    setIsLoading(true);
    try {
      const data = await getAll();
      setTheaters(data);
    } catch (err) {
      console.error('Error loading theaters:', err);
      toast.error('Failed to load theaters');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (theater: SupabaseTheater) => {
    setSelectedTheater(theater);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!theaterToDelete) return;
    
    try {
      const success = await remove(theaterToDelete.id);
      if (success) {
        toast.success('Theater deleted successfully');
        loadTheaters();
      } else {
        toast.error('Failed to delete theater');
      }
    } catch (err) {
      console.error('Error deleting theater:', err);
      toast.error('Failed to delete theater');
    } finally {
      setIsDeleteDialogOpen(false);
      setTheaterToDelete(null);
    }
  };

  const confirmDelete = (theater: SupabaseTheater) => {
    setTheaterToDelete(theater);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = async (data: TheaterFormData) => {
    try {
      // Ensure all required properties are present by explicitly defining them
      const theaterData: Omit<SupabaseTheater, 'id'> = {
        name: data.name,
        location: data.location,
        image_url: imageUrl,
        type: data.type || '',
        rating: data.rating || 0,
        reviews: data.reviews || 0,
        phone: data.phone || '',
      };

      if (selectedTheater) {
        await update(selectedTheater.id, theaterData);
        toast.success('Theater updated successfully');
      } else {
        await create(theaterData);
        toast.success('Theater added successfully');
      }

      setShowForm(false);
      setSelectedTheater(null);
      loadTheaters();
    } catch (err) {
      console.error('Error saving theater:', err);
      toast.error('Failed to save theater');
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-netflix-white">Theater Management</h1>
          <Button
            className="bg-netflix-red hover:bg-netflix-dark-red"
            onClick={() => {
              setSelectedTheater(null);
              setShowForm(true);
            }}
          >
            <Plus size={16} className="mr-2" />
            Add New Theater
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-netflix-white">Loading theaters...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {theaters.length === 0 ? (
              <div className="text-center py-8 text-netflix-white col-span-full">
                <p>No theaters found. Add your first theater!</p>
              </div>
            ) : (
              theaters.map((theater) => (
                <div 
                  key={theater.id} 
                  className="bg-netflix-gray rounded-lg overflow-hidden"
                >
                  <div 
                    className="h-36 bg-cover bg-center"
                    style={{ 
                      backgroundImage: theater.image_url ? `url(${theater.image_url})` : 'url(/placeholder.svg)' 
                    }}
                  />
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-netflix-white mb-1">{theater.name}</h3>
                    <p className="text-sm text-netflix-white/70 mb-2">{theater.type || 'Standard'}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-netflix-white/80">
                        <MapPin size={16} className="mr-2" />
                        <span>{theater.location}</span>
                      </div>
                      
                      {theater.phone && (
                        <div className="flex items-center text-netflix-white/80">
                          <Phone size={16} className="mr-2" />
                          <span>{theater.phone}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center text-netflix-white/80">
                        <Star size={16} className="text-yellow-500 mr-2" />
                        <span>{theater.rating.toFixed(1)}/5</span>
                        <span className="text-netflix-white/60 text-sm ml-1">({theater.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-netflix-white border-netflix-white/20 hover:bg-netflix-light-gray/20"
                        onClick={() => handleEdit(theater)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-netflix-red border-netflix-white/20 hover:bg-netflix-light-gray/20"
                        onClick={() => confirmDelete(theater)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Theater Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-netflix-gray text-netflix-white border-netflix-light-gray/30">
          <DialogHeader>
            <DialogTitle>{selectedTheater ? 'Edit Theater' : 'Add New Theater'}</DialogTitle>
            <DialogDescription className="text-netflix-white/70">
              {selectedTheater ? 'Update the details of this theater' : 'Fill in the details to add a new theater'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Theater name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Theater location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Theater Type</FormLabel>
                      <FormControl>
                        <Input placeholder="IMAX, Multiplex, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
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
                      <FormLabel>Rating (0-5)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" min="0" max="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reviews"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Reviews</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel>Theater Image</FormLabel>
                <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
                  {imageUrl && (
                    <img 
                      src={imageUrl} 
                      alt="Theater" 
                      className="w-40 h-24 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <SupabaseImageUpload 
                      bucketName="theater-images" 
                      filePath="theaters" 
                      onUploadComplete={setImageUrl}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-netflix-red hover:bg-netflix-dark-red"
                >
                  {selectedTheater ? 'Update Theater' : 'Add Theater'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-netflix-gray text-netflix-white border-netflix-light-gray/30">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-netflix-white/70">
              Are you sure you want to delete "{theaterToDelete?.name}"? This action cannot be undone.
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

export default AdminTheaters;
