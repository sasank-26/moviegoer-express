
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { bookingInfo } = useBooking();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!bookingInfo.movie) {
      navigate('/');
    }
  }, [bookingInfo.movie, navigate]);

  if (!bookingInfo.movie || !bookingInfo.theater || !bookingInfo.seats.length) {
    return null;
  }

  // Generate a random booking ID
  const bookingId = `BMS${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 mb-4">
              <Check className="text-white" size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-netflix-white">Booking Confirmed!</h1>
            <p className="text-netflix-white/70 mt-2">Thank you for your booking. Your tickets are ready.</p>
          </div>
          
          {/* Ticket */}
          <div className="bg-netflix-gray rounded-lg overflow-hidden shadow-xl mb-8">
            {/* Movie backdrop */}
            <div 
              className="h-32 bg-cover bg-center"
              style={{ backgroundImage: `url(${bookingInfo.movie.backdropUrl})` }}
            ></div>
            
            {/* Ticket content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-netflix-white">{bookingInfo.movie.title}</h2>
                  <p className="text-sm text-netflix-white/70">{bookingInfo.movie.certificate} • {bookingInfo.movie.language}</p>
                </div>
                <div className="bg-netflix-red px-3 py-1 rounded text-white text-sm">
                  {bookingInfo.seats.length} Ticket{bookingInfo.seats.length > 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-netflix-white/80">
                    <Calendar className="mr-2" size={16} />
                    <span>{format(new Date(bookingInfo.date), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-netflix-white/80">
                    <Clock className="mr-2" size={16} />
                    <span>{bookingInfo.showTime}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-netflix-white/80">
                    <MapPin className="mr-2" size={16} />
                    <span>{bookingInfo.theater.name}</span>
                  </div>
                  <div className="flex items-center text-netflix-white/80">
                    <Ticket className="mr-2" size={16} />
                    <span>
                      Seats: {bookingInfo.seats.map(s => `${s.row}${s.number}`).join(', ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-netflix-light-gray/20 p-4 rounded-md flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-netflix-white/70">Booking ID</p>
                  <p className="text-netflix-white font-medium">{bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-netflix-white/70">Booked By</p>
                  <p className="text-netflix-white font-medium">{user?.name || 'Guest User'}</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="py-3 border-t border-dashed border-netflix-light-gray mb-4">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`} 
                    alt="QR Code" 
                    className="mx-auto w-32 h-32"
                  />
                </div>
                <p className="text-xs text-netflix-white/50">Scan this QR code at the theater entrance</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/my-tickets')}
              className="bg-netflix-gray hover:bg-netflix-light-gray text-white"
            >
              <Ticket className="mr-2" size={16} />
              View My Tickets
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="bg-netflix-red hover:bg-netflix-dark-red text-white"
            >
              Continue Exploring
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
