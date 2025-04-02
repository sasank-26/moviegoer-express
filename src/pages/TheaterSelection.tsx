
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, ChevronLeft, Theater, MapPin, Clock } from 'lucide-react';
import { format, addDays } from 'date-fns';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { movies, theaters } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';
import AuthModal from '@/components/AuthModal';

const TheaterSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { bookingInfo, setMovie, setTheater, setDate, setShowTime } = useBooking();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const movie = movies.find(m => m.id === id);
  
  // Set movie in booking context when component mounts
  React.useEffect(() => {
    if (movie) {
      setMovie(movie);
    }
  }, [movie, setMovie]);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl text-netflix-white">Movie not found</h1>
          <Button 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setDate(format(date, 'yyyy-MM-dd'));
    }
  };

  const handleShowTimeSelect = (theater: typeof theaters[0], time: string) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    
    setTheater(theater);
    setShowTime(time);
    navigate(`/seat-booking/${movie.id}`);
  };
  
  // Calculate next 7 days
  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

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
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <img 
            src={movie.posterUrl}
            alt={movie.title}
            className="w-24 h-36 object-cover rounded-md"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-netflix-white">{movie.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genre.map(genre => (
                <span 
                  key={genre}
                  className="bg-netflix-light-gray/30 px-3 py-1 rounded-full text-sm text-netflix-white"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Date selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-netflix-white mb-4 flex items-center">
            <CalendarIcon size={20} className="mr-2" />
            Select Date
          </h2>
          
          <div className="flex space-x-2 overflow-x-auto pb-4 md:hidden">
            {nextDays.map((day, i) => (
              <button
                key={i}
                className={`flex flex-col items-center p-3 rounded-lg min-w-[70px] ${
                  selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                    ? 'bg-netflix-red text-white'
                    : 'bg-netflix-gray text-netflix-white'
                }`}
                onClick={() => handleDateSelect(day)}
              >
                <span className="text-sm font-medium">{format(day, 'EEE')}</span>
                <span className="text-xl font-bold">{format(day, 'd')}</span>
                <span className="text-xs">{format(day, 'MMM')}</span>
              </button>
            ))}
          </div>
          
          <div className="hidden md:block">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-netflix-gray border-netflix-light-gray">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  fromDate={new Date()}
                  toDate={addDays(new Date(), 14)}
                  className="bg-netflix-gray text-netflix-white"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Theaters */}
        <div>
          <h2 className="text-xl font-semibold text-netflix-white mb-4 flex items-center">
            <Theater size={20} className="mr-2" />
            Select Theater and Showtime
          </h2>
          
          <div className="space-y-6">
            {theaters.map((theater) => (
              <div 
                key={theater.id}
                className="bg-netflix-gray rounded-lg p-5"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-netflix-white">{theater.name}</h3>
                  <div className="flex items-center mt-1 text-sm text-netflix-white/70">
                    <MapPin size={14} className="mr-1" />
                    {theater.location} • {theater.distance} away
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {theater.showTimes.map(({ time, price, seatsAvailable }) => (
                    <button
                      key={time}
                      className={`px-4 py-2 rounded-md border ${
                        seatsAvailable 
                          ? 'border-netflix-light-gray hover:border-netflix-red text-netflix-white' 
                          : 'border-netflix-gray text-netflix-white/40 cursor-not-allowed'
                      }`}
                      disabled={!seatsAvailable}
                      onClick={() => handleShowTimeSelect(theater, time)}
                    >
                      <div className="flex items-center mb-1">
                        <Clock size={14} className="mr-1" />
                        {time}
                      </div>
                      <div className="text-sm text-netflix-white/70">
                        ₹{price.toFixed(0)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default TheaterSelection;
