
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";

// Pages
import Index from "./pages/Index";
import MovieDetails from "./pages/MovieDetails";
import TheaterSelection from "./pages/TheaterSelection";
import SeatBooking from "./pages/SeatBooking";
import Checkout from "./pages/Checkout";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyTickets from "./pages/MyTickets";
import NotFound from "./pages/NotFound";
import AllMovies from "./pages/AllMovies";
import AllTheaters from "./pages/AllTheaters";
import TheaterDetails from "./pages/TheaterDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BookingProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/theater-selection/:id" element={<TheaterSelection />} />
              <Route path="/seat-booking/:id" element={<SeatBooking />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/my-tickets" element={<MyTickets />} />
              <Route path="/movies" element={<AllMovies />} />
              <Route path="/theaters" element={<AllTheaters />} />
              <Route path="/theaters/:id" element={<TheaterDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BookingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
