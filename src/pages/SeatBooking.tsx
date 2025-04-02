
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { movies, generateSeats } from '@/lib/data';
import { useBooking } from '@/context/BookingContext';
import SeatSelection from '@/components/SeatSelection';

const SeatBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookingInfo } = useBooking();
  
  const movie = movies.find(m => m.id === id);
  
  // Generate theater seats
  const seats = React.useMemo(() => generateSeats(8, 12), []);
  
  if (!movie || !bookingInfo.theater || !bookingInfo.date || !bookingInfo.showTime) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl text-netflix-white">Booking information is incomplete</h1>
          <p className="text-netflix-white/70 mt-2 mb-4">Please start your booking process again</p>
          <Button 
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

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
        
        {/* Header Section */}
        <div className="bg-netflix-gray rounded-lg p-5 mb-8">
          <h1 className="text-2xl font-bold text-netflix-white mb-4">Select Your Seats</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <img 
                src={movie.posterUrl}
                alt={movie.title}
                className="w-16 h-24 object-cover rounded-md"
              />
              <div>
                <h2 className="font-semibold text-netflix-white">{movie.title}</h2>
                <p className="text-sm text-netflix-white/70">{movie.certificate} • {movie.runtime} min</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-netflix-white/80">
                <MapPin size={16} className="mr-2" />
                <span>{bookingInfo.theater.name}</span>
              </div>
              <div className="flex items-center text-netflix-white/80">
                <Calendar size={16} className="mr-2" />
                <span>{format(new Date(bookingInfo.date), 'EEE, MMM d')}</span>
              </div>
              <div className="flex items-center text-netflix-white/80">
                <Clock size={16} className="mr-2" />
                <span>{bookingInfo.showTime}</span>
              </div>
            </div>
            
            <div className="bg-netflix-light-gray/20 p-3 rounded-md">
              <div className="flex items-center text-netflix-white mb-2">
                <Users size={16} className="mr-2" />
                <span>Selected Seats: {bookingInfo.seats.length}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {bookingInfo.seats.map(seat => (
                  <span key={seat.id} className="bg-netflix-red text-white text-xs px-2 py-1 rounded">
                    {seat.row}{seat.number}
                  </span>
                ))}
              </div>
              {bookingInfo.seats.length > 0 && (
                <div className="mt-3 text-netflix-white font-medium">
                  Total: ${bookingInfo.totalAmount.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Seat Selection Area */}
        <div className="mb-8">
          <SeatSelection seats={seats} />
        </div>
        
        {/* Checkout button */}
        <div className="flex justify-between items-center mt-8">
          <div className="text-netflix-white">
            {bookingInfo.seats.length > 0 ? (
              <>
                <div className="text-sm text-netflix-white/70">Total Amount</div>
                <div className="text-xl font-bold">${bookingInfo.totalAmount.toFixed(2)}</div>
              </>
            ) : (
              <div>Select seats to proceed</div>
            )}
          </div>
          
          <Button
            className="bg-netflix-red hover:bg-netflix-dark-red text-white"
            disabled={bookingInfo.seats.length === 0}
            onClick={() => navigate('/checkout')}
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;
