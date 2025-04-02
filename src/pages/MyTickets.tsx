
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronLeft, Ticket, Search } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';

// Sample ticket data structure
interface TicketData {
  id: string;
  movieTitle: string;
  posterUrl: string;
  theater: string;
  date: string;
  time: string;
  seats: string[];
  amount: number;
}

const MyTickets = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    // Load tickets from localStorage or generate sample tickets
    const storedTickets = localStorage.getItem(`movieapp_tickets_${user?.id}`);
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
      // Generate sample tickets for demo
      const sampleTickets = [
        {
          id: 'BMS123456',
          movieTitle: 'Avengers: Endgame',
          posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
          theater: 'PVR Cinemas, Phoenix Mall',
          date: '2023-11-12',
          time: '7:30 PM',
          seats: ['J12', 'J13'],
          amount: 450
        },
        {
          id: 'BMS789012',
          movieTitle: 'Joker',
          posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
          theater: 'INOX, City Centre',
          date: '2023-10-30',
          time: '9:00 PM',
          seats: ['D5', 'D6', 'D7'],
          amount: 600
        }
      ];
      setTickets(sampleTickets);
      localStorage.setItem(`movieapp_tickets_${user?.id}`, JSON.stringify(sampleTickets));
    }
  }, [isAuthenticated, navigate, user]);
  
  // Filter tickets based on search query
  const filteredTickets = tickets.filter(ticket => 
    ticket.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.theater.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return null;
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
        
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-netflix-white mb-2">My Tickets</h1>
          <p className="text-netflix-white/70">View all your booking history and upcoming movies</p>
        </div>
        
        {/* Search input */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-white/50" size={18} />
          <Input
            className="pl-10 bg-netflix-gray border-netflix-light-gray text-netflix-white"
            placeholder="Search by movie title or theater..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-netflix-gray rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col md:flex-row">
                  <img 
                    src={ticket.posterUrl} 
                    alt={ticket.movieTitle}
                    className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                  />
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-netflix-white text-lg">{ticket.movieTitle}</h3>
                      <span className="text-xs bg-netflix-red px-2 py-1 rounded text-white">
                        {ticket.seats.length} Tickets
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-netflix-white/80">
                        <MapPin size={14} className="mr-2 text-netflix-white/60" />
                        <span className="text-sm">{ticket.theater}</span>
                      </div>
                      <div className="flex items-center text-netflix-white/80">
                        <Calendar size={14} className="mr-2 text-netflix-white/60" />
                        <span className="text-sm">{format(new Date(ticket.date), 'EEEE, MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center text-netflix-white/80">
                        <Clock size={14} className="mr-2 text-netflix-white/60" />
                        <span className="text-sm">{ticket.time}</span>
                      </div>
                      <div className="flex items-center text-netflix-white/80">
                        <Ticket size={14} className="mr-2 text-netflix-white/60" />
                        <span className="text-sm">Seats: {ticket.seats.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-netflix-light-gray/30">
                      <div>
                        <span className="text-xs text-netflix-white/60">Booking ID</span>
                        <p className="text-sm font-medium text-netflix-white">{ticket.id}</p>
                      </div>
                      <p className="font-bold text-netflix-white">₹{ticket.amount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Ticket className="mx-auto text-netflix-white/40 mb-4" size={48} />
            <h3 className="text-xl font-medium text-netflix-white mb-2">No tickets found</h3>
            <p className="text-netflix-white/60 mb-6">
              {searchQuery ? 'No results match your search query' : 'You haven\'t booked any movie tickets yet'}
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-netflix-red hover:bg-netflix-dark-red text-white"
            >
              Explore Movies
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
