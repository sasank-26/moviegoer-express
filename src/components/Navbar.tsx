
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Ticket, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-netflix-black/90 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Ticket size={24} className="text-netflix-red" />
              <span className="text-netflix-white font-bold text-xl ml-2">MovieGoer</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-netflix-white/80 hover:text-netflix-white">Home</Link>
            <Link to="/movies" className="text-netflix-white/80 hover:text-netflix-white">Movies</Link>
            <Link to="/theaters" className="text-netflix-white/80 hover:text-netflix-white">Theaters</Link>
            {isAuthenticated && (
              <Link to="/my-tickets" className="text-netflix-white/80 hover:text-netflix-white">My Tickets</Link>
            )}
          </div>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <span className="text-netflix-white/80 mr-2">{user?.name}</span>
                  <button 
                    onClick={() => logout()}
                    className="text-netflix-white/60 hover:text-netflix-white"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                className="text-netflix-red hover:text-white hover:bg-netflix-red"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={() => setIsAuthModalOpen(true)}>
              <UserIcon size={20} className="text-netflix-white" />
            </button>
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <X size={24} className="text-netflix-white" />
              ) : (
                <Menu size={24} className="text-netflix-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-netflix-black/95`}>
        <div className="pt-2 pb-4 px-4 space-y-1">
          <SearchBar />
        </div>
        <div className="pt-2 pb-4">
          <Link 
            to="/" 
            className="block px-4 py-2 text-netflix-white hover:bg-netflix-gray"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/movies" 
            className="block px-4 py-2 text-netflix-white hover:bg-netflix-gray"
            onClick={closeMenu}
          >
            Movies
          </Link>
          <Link 
            to="/theaters" 
            className="block px-4 py-2 text-netflix-white hover:bg-netflix-gray"
            onClick={closeMenu}
          >
            Theaters
          </Link>
          {isAuthenticated && (
            <Link 
              to="/my-tickets" 
              className="block px-4 py-2 text-netflix-white hover:bg-netflix-gray"
              onClick={closeMenu}
            >
              My Tickets
            </Link>
          )}
          {isAuthenticated && (
            <button 
              className="flex w-full items-center px-4 py-2 text-netflix-white hover:bg-netflix-gray"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
