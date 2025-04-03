
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Phone, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { SupabaseTheater } from '@/types/supabase';

const AllTheaters = () => {
  const navigate = useNavigate();
  const { data: theaters, loading } = useSupabaseData<SupabaseTheater>('theaters');
  
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
          <h1 className="text-2xl md:text-3xl font-bold text-netflix-white mb-2">All Theaters</h1>
          <p className="text-netflix-white/70">Find the best theaters near you</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-netflix-white text-lg">Loading theaters...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theaters.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-netflix-white mb-2">No theaters found</h3>
                <p className="text-netflix-white/60">
                  Check back later for updates
                </p>
              </div>
            ) : (
              theaters.map((theater) => (
                <div 
                  key={theater.id} 
                  className="bg-netflix-gray rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${theater.image_url})` }}
                  >
                    <div className="h-full w-full bg-gradient-to-t from-netflix-black/90 to-transparent flex items-end p-4">
                      <div>
                        <h3 className="text-xl font-bold text-netflix-white">{theater.name}</h3>
                        <p className="text-netflix-white/70">{theater.type}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-netflix-white/60 mr-2 flex-shrink-0" />
                      <span className="text-netflix-white/80">{theater.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone size={16} className="text-netflix-white/60 mr-2 flex-shrink-0" />
                      <span className="text-netflix-white/80">{theater.phone || 'Not Available'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-netflix-light-gray/30">
                      <div className="flex items-center">
                        <Star size={18} className="text-yellow-500 mr-1" />
                        <span className="text-netflix-white font-medium">{theater.rating?.toFixed(1) || '0.0'}/5</span>
                        <span className="text-netflix-white/60 text-sm ml-1">({theater.reviews || 0} reviews)</span>
                      </div>
                      
                      <Button 
                        variant="link" 
                        className="text-netflix-red hover:text-netflix-dark-red p-0"
                        onClick={() => navigate(`/theaters/${theater.id}`)}
                      >
                        Now Showing
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTheaters;
