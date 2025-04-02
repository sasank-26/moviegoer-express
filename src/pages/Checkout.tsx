
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar as CalendarIcon, Clock, MapPin, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { bookingInfo, completeBooking } = useBooking();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  if (!bookingInfo.movie || !bookingInfo.theater || !bookingInfo.seats.length || !bookingInfo.date || !bookingInfo.showTime) {
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

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const success = await completeBooking();
      if (success) {
        navigate('/booking-confirmation');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = bookingInfo.totalAmount;
  const convenienceFee = 49;
  const tax = Math.round(totalAmount * 0.18);
  const finalAmount = totalAmount + convenienceFee + tax;

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
        
        <h1 className="text-2xl md:text-3xl font-bold text-netflix-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order summary section */}
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-netflix-gray rounded-lg p-5 sticky top-20">
              <h2 className="text-xl font-semibold text-netflix-white mb-4">Order Summary</h2>
              
              <div className="flex items-start space-x-3 mb-4 pb-4 border-b border-netflix-light-gray">
                <img 
                  src={bookingInfo.movie.posterUrl}
                  alt={bookingInfo.movie.title}
                  className="w-16 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium text-netflix-white">{bookingInfo.movie.title}</h3>
                  <p className="text-sm text-netflix-white/70">{bookingInfo.movie.certificate} • {bookingInfo.movie.runtime} min</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-netflix-light-gray">
                <div className="flex items-center text-netflix-white/80">
                  <MapPin size={16} className="mr-2 text-netflix-white/60" />
                  <span>{bookingInfo.theater.name}</span>
                </div>
                <div className="flex items-center text-netflix-white/80">
                  <CalendarIcon size={16} className="mr-2 text-netflix-white/60" />
                  <span>{format(new Date(bookingInfo.date), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center text-netflix-white/80">
                  <Clock size={16} className="mr-2 text-netflix-white/60" />
                  <span>{bookingInfo.showTime}</span>
                </div>
                <div className="flex items-center text-netflix-white/80">
                  <Ticket size={16} className="mr-2 text-netflix-white/60" />
                  <span>
                    {bookingInfo.seats.length} {bookingInfo.seats.length === 1 ? 'Ticket' : 'Tickets'} (
                    {bookingInfo.seats.map(s => `${s.row}${s.number}`).join(', ')})
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-netflix-white/80">
                  <span>Ticket Price</span>
                  <span>₹{totalAmount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-netflix-white/80">
                  <span>Convenience Fee</span>
                  <span>₹{convenienceFee}</span>
                </div>
                <div className="flex justify-between text-netflix-white/80">
                  <span>GST (18%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between text-netflix-white font-bold mt-3 pt-3 border-t border-netflix-light-gray">
                  <span>Total</span>
                  <span>₹{finalAmount}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment section */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="bg-netflix-gray rounded-lg p-6">
              <h2 className="text-xl font-semibold text-netflix-white mb-6">Payment Details</h2>
              
              <div className="text-center py-8">
                <div className="max-w-md mx-auto">
                  <p className="text-netflix-white mb-8">Click the button below to proceed with payment.</p>
                  <Button
                    className="w-full bg-netflix-red hover:bg-netflix-dark-red text-white py-6"
                    size="lg"
                    disabled={isLoading}
                    onClick={handlePayment}
                  >
                    {isLoading ? 'Processing...' : `Pay ₹${finalAmount} & Confirm Booking`}
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-netflix-light-gray">
                <p className="text-netflix-white/60 text-sm text-center">
                  By confirming the payment, you agree to our terms and conditions and cancellation policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
