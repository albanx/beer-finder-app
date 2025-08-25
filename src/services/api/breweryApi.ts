import { Brewery, BrewerySearchParams, BrewerySearchResponse, RandomBeer } from '@/types/brewery';

const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

// API Error class for better error handling
export class BreweryApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'BreweryApiError';
  }
}

// Core API client with error handling and request formatting
class BreweryApiClient {
  private async request<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const url = new URL(endpoint, BASE_URL);
      
      // Add query parameters
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              // Handle array parameters (e.g., multiple brewery types)
              value.forEach(v => url.searchParams.append(key, v.toString()));
            } else {
              url.searchParams.append(key, value.toString());
            }
          }
        });
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new BreweryApiError(
          `API request failed: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof BreweryApiError) {
        throw error;
      }
      
      // Handle network errors, parsing errors, etc.
      throw new BreweryApiError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // Search breweries with filtering and pagination
  async searchBreweries(params: BrewerySearchParams): Promise<BrewerySearchResponse> {
    const apiParams: Record<string, any> = {};

    // Map our parameter names to API parameter names
    if (params.query) {
      // Use the main endpoint with by_name parameter for text queries
      const searchResults = await this.request<Brewery[]>('', {
        by_name: params.query,
        per_page: params.per_page || 20,
      });
      
      return {
        breweries: searchResults,
        total: searchResults.length,
        page: 1,
        per_page: params.per_page || 20,
      };
    }

    // For non-text searches, use the main endpoint with filters
    if (params.by_city) apiParams.by_city = params.by_city;
    if (params.by_state) apiParams.by_state = params.by_state;
    if (params.by_postal) apiParams.by_postal = params.by_postal;
    if (params.by_name) apiParams.by_name = params.by_name;
    if (params.by_dist) apiParams.by_dist = params.by_dist;
    if (params.by_type && params.by_type.length > 0) {
      apiParams.by_type = params.by_type.join(',');
    }
    if (params.page) apiParams.page = params.page;
    if (params.per_page) apiParams.per_page = params.per_page;
    if (params.sort) apiParams.sort = params.sort;

    const breweries = await this.request<Brewery[]>('', apiParams);
    
    return {
      breweries,
      total: breweries.length, // API doesn't provide total count
      page: params.page || 1,
      per_page: params.per_page || 20,
    };
  }

  // Get a single brewery by ID
  async getBrewery(id: string): Promise<Brewery> {
    return this.request<Brewery>(`/${id}`);
  }

  // Get random brewery(ies)
  async getRandomBreweries(count: number = 1): Promise<Brewery[]> {
    return this.request<Brewery[]>('/random', { size: count });
  }

  // Get autocomplete suggestions
  async getAutocompleteSuggestions(query: string): Promise<string[]> {
    try {
      // Use main endpoint with by_name parameter for autocomplete
      const suggestions = await this.request<Brewery[]>('', {
        by_name: query,
        per_page: 5, // Limit results for autocomplete
      });
      // Extract unique brewery names for suggestions
      const uniqueNames = [...new Set(suggestions.map(brewery => brewery.name))];
      return uniqueNames.slice(0, 5); // Limit to 5 suggestions
    } catch (error) {
      // Graceful fallback if autocomplete fails
      console.warn('Autocomplete failed:', error);
      return [];
    }
  }

  // Get breweries by location (city/state)
  async getBreweriesByLocation(city?: string, state?: string): Promise<Brewery[]> {
    const params: Record<string, string> = {};
    if (city) params.by_city = city;
    if (state) params.by_state = state;
    
    return this.request<Brewery[]>('', params);
  }

  // Get breweries by type
  async getBreweriesByType(types: string[]): Promise<Brewery[]> {
    return this.request<Brewery[]>('', {
      by_type: types.join(','),
    });
  }
}

// Create singleton instance
export const breweryApi = new BreweryApiClient();

// Random Beer Generator (Mock implementation)
// This simulates the random beer feature since Open Brewery DB doesn't provide beer data
export class RandomBeerGenerator {
  private beerStyles = [
    'IPA', 'Stout', 'Lager', 'Pilsner', 'Wheat Beer', 'Porter', 'Amber Ale',
    'Pale Ale', 'Belgian Ale', 'Sour Beer', 'Saison', 'Brown Ale', 'ESB',
    'Barleywine', 'Imperial Stout', 'Double IPA', 'Tripel', 'Quadrupel'
  ];

  private beerNames = [
    'Hop Heaven', 'Dark Knight', 'Golden Glory', 'Wheat Wonder', 'Bitter Truth',
    'Smooth Operator', 'Liquid Gold', 'Black Magic', 'Citrus Burst', 'Caramel Dream',
    'Roasted Delight', 'Tropical Storm', 'Vanilla Sky', 'Coffee Kick', 'Berry Blast',
    'Honey Crisp', 'Spice Route', 'Ocean Breeze', 'Mountain High', 'Valley Low'
  ];

  generateRandomBeer(): RandomBeer {
    const style = this.beerStyles[Math.floor(Math.random() * this.beerStyles.length)];
    const name = this.beerNames[Math.floor(Math.random() * this.beerNames.length)];
    const abv = Math.round((Math.random() * 8 + 3) * 10) / 10; // 3.0 - 11.0 ABV
    const ibu = Math.floor(Math.random() * 80 + 10); // 10-90 IBU

    return {
      id: `beer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${name} ${style}`,
      style,
      abv,
      ibu,
      description: `A delicious ${style.toLowerCase()} with ${abv}% alcohol content and ${ibu} IBU.`,
      image_url: '', // Remove placeholder images to avoid network errors
    };
  }
}

export const randomBeerGenerator = new RandomBeerGenerator();

// Utility functions for API integration
export const apiUtils = {
  // Format brewery type for display
  formatBreweryType: (type: string): string => {
    const typeMap: Record<string, string> = {
      micro: 'Microbrewery',
      nano: 'Nanobrewery',
      regional: 'Regional Brewery',
      brewpub: 'Brewpub',
      large: 'Large Brewery',
      planning: 'Planning',
      bar: 'Beer Bar',
      contract: 'Contract Brewery',
      proprietor: 'Proprietor',
      closed: 'Closed',
    };
    return typeMap[type] || type;
  },

  // Format brewery address
  formatBreweryAddress: (brewery: Brewery): string => {
    const parts = [
      brewery.street || brewery.address_1,
      brewery.city,
      brewery.state_province || brewery.state,
      brewery.postal_code,
    ].filter(Boolean);
    
    return parts.join(', ');
  },

  // Check if brewery has coordinates
  hasCoordinates: (brewery: Brewery): boolean => {
    return !!(brewery.latitude && brewery.longitude);
  },

  // Create Google Maps directions URL
  getDirectionsUrl: (brewery: Brewery): string => {
    const address = apiUtils.formatBreweryAddress(brewery);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  },

  // Create phone number URL
  getPhoneUrl: (phone: string): string => {
    return `tel:${phone.replace(/[^\d+]/g, '')}`;
  },

  // Validate and format website URL
  formatWebsiteUrl: (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  },
};