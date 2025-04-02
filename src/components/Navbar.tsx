
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Search, User, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <header className="bg-netflix-black border-b border-netflix-light-gray sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-netflix-red">
          <Film size={24} />
          <span className="text-xl font-bold">MovieGoer</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-netflix-white hover:text-netflix-red transition-colors">
            Home
          </Link>
          <Link to="/movies" className="text-netflix-white hover:text-netflix-red transition-colors">
            Movies
          </Link>
          <Link to="/theaters" className="text-netflix-white hover:text-netflix-red transition-colors">
            Theaters
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search movies..."
              className="pl-10 pr-4 py-2 bg-netflix-gray border border-netflix-light-gray rounded-full focus:outline-none focus:ring-1 focus:ring-netflix-red w-52"
            />
          </div>
        </nav>

        {/* User section */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-netflix-white">Hi, {user?.name}</span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              variant="default" 
              className="bg-netflix-red hover:bg-netflix-dark-red text-white"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-netflix-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-netflix-gray border-t border-netflix-light-gray">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-netflix-white hover:text-netflix-red transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="text-netflix-white hover:text-netflix-red transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link 
              to="/theaters" 
              className="text-netflix-white hover:text-netflix-red transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Theaters
            </Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search movies..."
                className="pl-10 pr-4 py-2 bg-netflix-black border border-netflix-light-gray rounded-full focus:outline-none focus:ring-1 focus:ring-netflix-red w-full"
              />
            </div>
            {isAuthenticated ? (
              <div className="space-y-2">
                <p className="text-netflix-white">Hi, {user?.name}</p>
                <Button variant="outline" onClick={logout} className="w-full">
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                className="w-full bg-netflix-red hover:bg-netflix-dark-red text-white"
                onClick={() => {
                  setAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </nav>
        </div>
      )}

      {/* Auth modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
};

export default Navbar;
