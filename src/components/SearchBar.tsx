
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SearchResults from './SearchResults';
import { movies } from '@/lib/data';
import { Movie } from '@/lib/data';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = movies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
        movie.cast.some(c => c.name.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleClearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setIsExpanded(false);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      <div className={`flex items-center ${isExpanded ? 'bg-netflix-gray' : 'bg-netflix-black/50'} rounded-lg transition-all duration-200`}>
        <div className="relative flex-1">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-white/60" 
          />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search movies, theaters..."
            className={`pl-9 ${isExpanded ? 'pr-9' : ''} border-none bg-transparent text-netflix-white focus-visible:ring-0 focus-visible:ring-offset-0`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
          />
          {isExpanded && query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-auto text-netflix-white/60 hover:text-netflix-white"
              onClick={handleClearSearch}
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <SearchResults results={results} onClose={handleClose} query={query} />
      )}
    </div>
  );
};

export default SearchBar;
