'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useSearchSuggestions } from '@/hooks/useBrewerySearch';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showSuggestions?: boolean;
  loading?: boolean;
}

const SearchIcon = () => (
  <svg 
    className="h-5 w-5" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
    />
  </svg>
);

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search breweries by name, city, or type...",
  variant = 'primary',
  size = 'md',
  showSuggestions = true,
  loading = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const { suggestions, getSuggestions, clearSuggestions } = useSearchSuggestions();

  // Debounced suggestions
  useEffect(() => {
    if (!showSuggestions || !value.trim() || value.length < 2) {
      clearSuggestions();
      setShowSuggestionsList(false);
      return;
    }

    const timer = setTimeout(() => {
      getSuggestions(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, showSuggestions, getSuggestions, clearSuggestions]);

  // Show/hide suggestions based on focus and available suggestions
  useEffect(() => {
    if (suggestions.length > 0 && isFocused && value.length >= 2) {
      setShowSuggestionsList(true);
    } else {
      setShowSuggestionsList(false);
    }
  }, [suggestions, isFocused, value]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        searchInputRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestionsList(false);
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (suggestions.length > 0 && value.length >= 2) {
      setShowSuggestionsList(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestionsList(false);
    }, 150);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
      setShowSuggestionsList(false);
      searchInputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    onSearch(suggestion);
    setShowSuggestionsList(false);
    searchInputRef.current?.blur();
  };

  const handleClear = () => {
    onChange('');
    clearSuggestions();
    setShowSuggestionsList(false);
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestionsList(false);
      searchInputRef.current?.blur();
    }
  };

  const containerVariants = {
    primary: 'w-full max-w-2xl',
    secondary: 'w-full',
  };

  return (
    <div className={cn('relative', containerVariants[variant])}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={searchInputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            variant="search"
            size={size}
            startIcon={<SearchIcon />}
            onClear={value ? handleClear : undefined}
            className="w-full"
            aria-label="Search breweries"
            aria-expanded={showSuggestionsList}
            aria-haspopup="listbox"
            role="combobox"
            autoComplete="off"
          />

          {/* Search Suggestions */}
          {showSuggestionsList && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 z-50 mt-1 bg-surface border border-border rounded-lg shadow-lg max-h-60 overflow-auto"
              role="listbox"
              aria-label="Search suggestions"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg border-b border-border last:border-b-0 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                  role="option"
                  tabIndex={-1}
                >
                  <div className="flex items-center gap-3">
                    <SearchIcon />
                    <span className="text-foreground">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {variant === 'primary' && (
          <Button
            type="submit"
            size={size}
            loading={loading}
            disabled={!value.trim() || loading}
            className="shrink-0"
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        )}
      </form>
    </div>
  );
}

// Location Filter Component
interface LocationFilterProps {
  value: string;
  onChange: (location: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LocationIcon = () => (
  <svg 
    className="h-5 w-5" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" 
    />
  </svg>
);

export function LocationFilter({
  value,
  onChange,
  placeholder = "Enter city or state",
  size = 'md',
}: LocationFilterProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      size={size}
      startIcon={<LocationIcon />}
      onClear={value ? handleClear : undefined}
      aria-label="Filter by location"
    />
  );
}

// Combined Search and Location Filter Component
interface SearchWithLocationProps {
  searchValue: string;
  locationValue: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: (searchQuery: string, location: string) => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function SearchWithLocation({
  searchValue,
  locationValue,
  onSearchChange,
  onLocationChange,
  onSearch,
  loading = false,
  variant = 'primary',
}: SearchWithLocationProps) {
  const handleSearch = () => {
    onSearch(searchValue, locationValue);
  };

  const handleSearchBarSubmit = (query: string) => {
    onSearch(query, locationValue);
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="w-full space-y-3">
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        onSearch={handleSearchBarSubmit}
        variant="secondary"
        loading={loading}
      />
      
      <form onSubmit={handleLocationSubmit} className="flex gap-3">
        <div className="flex-1">
          <LocationFilter
            value={locationValue}
            onChange={onLocationChange}
          />
        </div>
        
        <Button
          type="submit"
          loading={loading}
          disabled={(!searchValue.trim() && !locationValue.trim()) || loading}
          className="shrink-0"
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </div>
  );
}