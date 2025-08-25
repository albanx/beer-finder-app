'use client';

import { useState, useEffect, useCallback } from 'react';
import { breweryApi, randomBeerGenerator } from '@/services/api/breweryApi';
import {
  Brewery,
  BrewerySearchParams,
  FilterState,
  BreweryWithRandomBeer,
  ApiResponse,
  BreweryFilters
} from '@/types/brewery';

interface UseBrewerySearchReturn {
  breweries: BreweryWithRandomBeer[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  hasMore: boolean;
  searchBreweries: (query?: string, location?: string, filters?: BreweryFilters) => Promise<void>;
  loadMoreBreweries: () => Promise<void>;
  clearSearch: () => void;
  retry: () => Promise<void>;
}

export function useBrewerySearch(): UseBrewerySearchReturn {
  const [breweries, setBreweries] = useState<BreweryWithRandomBeer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [lastSearchParams, setLastSearchParams] = useState<BrewerySearchParams | null>(null);

  // Add random beer to each brewery
  const enhanceBreweriesWithRandomBeer = useCallback((breweries: Brewery[]): BreweryWithRandomBeer[] => {
    return breweries.map(brewery => ({
      ...brewery,
      randomBeer: randomBeerGenerator.generateRandomBeer(),
    }));
  }, []);

  // Convert search parameters to API format
  const convertToApiParams = useCallback((query?: string, location?: string, filters?: BreweryFilters): BrewerySearchParams => {
    const params: BrewerySearchParams = {
      page: 1,
      per_page: 20,
    };

    if (query) {
      params.by_name = query;
    }

    if (location) {
      // Try to determine if location is city or state
      if (location.includes(',')) {
        const [city, state] = location.split(',').map(s => s.trim());
        params.by_city = city;
        params.by_state = state;
      } else {
        // Could be city or state, try city first
        params.by_city = location;
      }
    }

    if (filters) {
      if (filters.type) {
        params.by_type = [filters.type as any];
      }
      if (filters.city) {
        params.by_city = filters.city;
      }
      if (filters.state) {
        params.by_state = filters.state;
      }
      if (filters.sort) {
        params.sort = filters.sort;
      }
    }

    return params;
  }, []);

  const searchBreweries = useCallback(async (query?: string, location?: string, filters?: BreweryFilters) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(1);

      const params = convertToApiParams(query, location, filters);
      setLastSearchParams(params);

      const response = await breweryApi.searchBreweries(params);
      const enhancedBreweries = enhanceBreweriesWithRandomBeer(response.breweries);
      
      setBreweries(enhancedBreweries);
      setTotalResults(response.total);
      setHasMore(response.breweries.length >= (params.per_page || 20));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search breweries';
      setError(errorMessage);
      setBreweries([]);
      setTotalResults(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [convertToApiParams, enhanceBreweriesWithRandomBeer]);

  const loadMoreBreweries = useCallback(async () => {
    if (!lastSearchParams || loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const nextPage = currentPage + 1;
      const params = { ...lastSearchParams, page: nextPage };
      
      const response = await breweryApi.searchBreweries(params);
      const enhancedBreweries = enhanceBreweriesWithRandomBeer(response.breweries);
      
      setBreweries(prev => [...prev, ...enhancedBreweries]);
      setCurrentPage(nextPage);
      setHasMore(response.breweries.length >= (params.per_page || 20));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load more breweries';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [lastSearchParams, loading, hasMore, currentPage, enhanceBreweriesWithRandomBeer]);

  const clearSearch = useCallback(() => {
    setBreweries([]);
    setError(null);
    setTotalResults(0);
    setCurrentPage(1);
    setHasMore(false);
    setLastSearchParams(null);
  }, []);

  const retry = useCallback(async () => {
    if (lastSearchParams) {
      // Convert back to the new format
      const query = lastSearchParams.by_name || '';
      const location = lastSearchParams.by_city || lastSearchParams.by_state || '';
      const filters: BreweryFilters = {
        type: lastSearchParams.by_type?.[0] || '',
        city: lastSearchParams.by_city || '',
        state: lastSearchParams.by_state || '',
        country: 'United States',
        sort: lastSearchParams.sort || 'name',
      };
      await searchBreweries(query, location, filters);
    }
  }, [lastSearchParams, searchBreweries]);

  return {
    breweries,
    loading,
    error,
    totalResults,
    currentPage,
    hasMore,
    searchBreweries,
    loadMoreBreweries,
    clearSearch,
    retry,
  };
}

// Hook for managing filter state
interface UseBreweryFiltersReturn {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function useBreweryFilters(): UseBreweryFiltersReturn {
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    locations: [],
    sort: 'name',
  });

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K, 
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      types: [],
      locations: [],
      sort: 'name',
    });
  }, []);

  const hasActiveFilters = filters.types.length > 0 || 
                          filters.locations.length > 0 || 
                          filters.distance !== undefined;

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  };
}

// Hook for random brewery discovery
interface UseRandomBreweryReturn {
  brewery: BreweryWithRandomBeer | null;
  loading: boolean;
  error: string | null;
  getRandomBrewery: () => Promise<void>;
}

export function useRandomBrewery(): UseRandomBreweryReturn {
  const [brewery, setBrewery] = useState<BreweryWithRandomBeer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomBrewery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [randomBrewery] = await breweryApi.getRandomBreweries(1);
      const enhancedBrewery: BreweryWithRandomBeer = {
        ...randomBrewery,
        randomBeer: randomBeerGenerator.generateRandomBeer(),
      };
      
      setBrewery(enhancedBrewery);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get random brewery';
      setError(errorMessage);
      setBrewery(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    brewery,
    loading,
    error,
    getRandomBrewery,
  };
}

// Hook for search suggestions
interface UseSearchSuggestionsReturn {
  suggestions: string[];
  loading: boolean;
  getSuggestions: (query: string) => Promise<void>;
  clearSuggestions: () => void;
}

export function useSearchSuggestions(): UseSearchSuggestionsReturn {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const results = await breweryApi.getAutocompleteSuggestions(query);
      setSuggestions(results.slice(0, 8)); // Limit to 8 suggestions
    } catch (err) {
      console.warn('Failed to get suggestions:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    loading,
    getSuggestions,
    clearSuggestions,
  };
}

// Hook for managing localStorage state
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}