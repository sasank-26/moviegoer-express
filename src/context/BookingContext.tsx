
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Movie, Theater, Seat } from '../lib/data';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

interface BookingInfo {
  movie: Movie | null;
  theater: Theater | null;
  showTime: string | null;
  date: string | null;
  seats: Seat[];
  totalAmount: number;
  bookingId?: string;
  bookingDate?: Date;
}

interface BookingContextType {
  bookingInfo: BookingInfo;
  setMovie: (movie: Movie | null) => void;
  setTheater: (theater: Theater | null) => void;
  setShowTime: (time: string | null) => void;
  setDate: (date: string | null) => void;
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: string) => void;
  clearBooking: () => void;
  completeBooking: () => Promise<boolean>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBookingState: BookingInfo = {
  movie: null,
  theater: null,
  showTime: null,
  date: null,
  seats: [],
  totalAmount: 0
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>(initialBookingState);
  const { user } = useAuth();

  const setMovie = (movie: Movie | null) => {
    setBookingInfo(prev => ({ ...prev, movie }));
  };

  const setTheater = (theater: Theater | null) => {
    setBookingInfo(prev => ({ ...prev, theater }));
  };

  const setShowTime = (showTime: string | null) => {
    setBookingInfo(prev => ({ ...prev, showTime }));
  };

  const setDate = (date: string | null) => {
    setBookingInfo(prev => ({ ...prev, date }));
  };

  const addSeat = (seat: Seat) => {
    if (seat.status === 'booked') {
      toast.error('This seat is already booked');
      return;
    }

    // Check if seat is already selected
    if (bookingInfo.seats.some(s => s.id === seat.id)) {
      toast.info('This seat is already selected');
      return;
    }
    
    const updatedSeat = { ...seat, status: 'selected' as const };
    
    setBookingInfo(prev => ({
      ...prev,
      seats: [...prev.seats, updatedSeat],
      totalAmount: prev.totalAmount + updatedSeat.price
    }));
  };

  const removeSeat = (seatId: string) => {
    const seatToRemove = bookingInfo.seats.find(s => s.id === seatId);
    
    if (!seatToRemove) return;
    
    setBookingInfo(prev => ({
      ...prev,
      seats: prev.seats.filter(s => s.id !== seatId),
      totalAmount: prev.totalAmount - seatToRemove.price
    }));
  };

  const clearBooking = () => {
    setBookingInfo(initialBookingState);
  };

  const saveBookingToSupabase = async (
    bookingId: string, 
    amount: number, 
    convenienceFee: number,
    tax: number
  ) => {
    if (!user || !bookingInfo.movie || !bookingInfo.theater || 
        !bookingInfo.date || !bookingInfo.showTime || 
        bookingInfo.seats.length === 0) {
      return false;
    }

    try {
      // Save booking to Supabase
      const { error } = await supabase.from('bookings').insert({
        id: bookingId,
        user_id: user.id,
        movie_id: bookingInfo.movie.id,
        theater_id: bookingInfo.theater.id,
        movie_title: bookingInfo.movie.title,
        theater_name: bookingInfo.theater.name,
        poster_url: bookingInfo.movie.posterUrl,
        show_date: bookingInfo.date,
        show_time: bookingInfo.showTime,
        seats: bookingInfo.seats.map(s => `${s.row}${s.number}`),
        amount: amount,
        convenience_fee: convenienceFee,
        tax: tax,
        total_amount: amount + convenienceFee + tax,
        created_at: new Date().toISOString()
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving booking:', error);
      return false;
    }
  };

  const completeBooking = async (): Promise<boolean> => {
    try {
      // In a real app, this would be an API call to reserve seats
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate booking has all required info
      if (!bookingInfo.movie || !bookingInfo.theater || 
          !bookingInfo.date || !bookingInfo.showTime || 
          bookingInfo.seats.length === 0) {
        toast.error('Please complete all booking information');
        return false;
      }

      if (!user) {
        toast.error('You must be logged in to complete a booking');
        return false;
      }

      // Generate a unique booking ID
      const bookingId = `BMS${uuidv4().substring(0, 8)}`;
      const bookingDate = new Date();
      
      // Calculate final amount (including convenience fee and tax)
      const convenienceFee = 49;
      const tax = Math.round(bookingInfo.totalAmount * 0.18);
      const finalAmount = bookingInfo.totalAmount + convenienceFee + tax;
      
      // Save booking to Supabase
      const success = await saveBookingToSupabase(
        bookingId,
        bookingInfo.totalAmount, 
        convenienceFee,
        tax
      );
      
      if (!success) {
        toast.error('Failed to save booking. Please try again.');
        return false;
      }
      
      // Update booking info with ID and booking date
      setBookingInfo(prev => ({
        ...prev,
        bookingId,
        bookingDate
      }));

      // Send an email confirmation (this would be handled by a Supabase Edge Function in production)
      // In this demo we'll just simulate it
      setTimeout(() => {
        toast.success('Booking confirmation email sent!');
      }, 2000);

      toast.success('Booking completed successfully!');
      return true;
    } catch (error) {
      toast.error('Booking failed. Please try again.');
      console.error('Booking error:', error);
      return false;
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookingInfo,
        setMovie,
        setTheater,
        setShowTime,
        setDate,
        addSeat,
        removeSeat,
        clearBooking,
        completeBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
