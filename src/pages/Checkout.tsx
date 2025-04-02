
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Calendar as CalendarIcon, Clock, MapPin, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { bookingInfo, completeBooking } = useBooking();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                  <span>${bookingInfo.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-netflix-white/80">
                  <span>Convenience Fee</span>
                  <span>$1.99</span>
                </div>
                <div className="flex justify-between text-netflix-white/80">
                  <span>Tax</span>
                  <span>${(bookingInfo.totalAmount * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-netflix-white font-bold mt-3 pt-3 border-t border-netflix-light-gray">
                  <span>Total</span>
                  <span>${(bookingInfo.totalAmount + 1.99 + bookingInfo.totalAmount * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment section */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="bg-netflix-gray rounded-lg p-6">
              <h2 className="text-xl font-semibold text-netflix-white mb-6">Payment Details</h2>
              
              <Tabs defaultValue="credit-card" value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                
                <TabsContent value="credit-card">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number" className="text-netflix-white">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-white/50" size={18} />
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          className="pl-10 bg-netflix-gray border-netflix-light-gray text-netflix-white"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={19}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-name" className="text-netflix-white">Name on Card</Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry" className="text-netflix-white">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-netflix-white">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          className="bg-netflix-gray border-netflix-light-gray text-netflix-white"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength={4}
                        />
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-netflix-red hover:bg-netflix-dark-red text-white mt-6"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : 'Pay & Confirm Booking'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="paypal">
                  <div className="text-center py-8">
                    <div className="text-2xl font-bold text-netflix-white mb-4">Pay with PayPal</div>
                    <p className="text-netflix-white/70 mb-6">Click the button below to continue to PayPal</p>
                    <Button
                      className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white"
                      onClick={() => {
                        toast.info("PayPal integration is not available in this demo");
                      }}
                    >
                      Continue to PayPal
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 pt-6 border-t border-netflix-light-gray">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-netflix-red flex items-center justify-center mr-3">
                    <User size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-netflix-white font-medium">{user?.name}</div>
                    <div className="text-sm text-netflix-white/70">{user?.email}</div>
                  </div>
                </div>
                
                <p className="text-netflix-white/60 text-sm">
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

// Add missing User icon import
const User = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default Checkout;
