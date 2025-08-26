// Brewery Types based on Open Brewery DB API
export interface Brewery {
  id: string;
  name: string;
  brewery_type: BreweryType;
  address_1: string | null;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
  state: string;
  street: string;
}

export type BreweryType = 
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed';

export interface BrewerySearchParams {
  query?: string;
  by_city?: string;
  by_state?: string;
  by_postal?: string;
  by_type?: BreweryType[];
  by_name?: string;
  by_dist?: string;
  page?: number;
  per_page?: number;
  sort?: SortOption;
}

export type SortOption = 'name' | 'type' | 'city' | 'state';

export interface BrewerySearchResponse {
  breweries: Brewery[];
  total: number;
  page: number;
  per_page: number;
}

export interface FilterState {
  types: BreweryType[];
  locations: string[];
  distance?: number;
  sort: SortOption;
}

// Brewery filters interface for search page
export interface BreweryFilters {
  type?: BreweryType | '';
  city?: string;
  state?: string;
  country?: string;
  sort?: SortOption;
}

// Keep the PunkBeer import for potential future use with dedicated random beer page
import type { PunkBeer } from '../services/api/punkApi';

// Type alias for PunkBeer - preserved for dedicated random beer functionality
export type BeerData = PunkBeer;

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

// Location interface for location filtering
export interface Location {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Search suggestion interface
export interface SearchSuggestion {
  value: string;
  type: 'brewery' | 'city' | 'state';
  count?: number;
}