// Punk API Service for real beer data
// API Documentation: https://github.com/alxiw/punkapi

// Punk API response interfaces based on the documented structure
export interface PunkBeerHops {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
  add: string;
  attribute: string;
}

export interface PunkBeerMalt {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
}

export interface PunkBeerIngredients {
  malt: PunkBeerMalt[];
  hops: PunkBeerHops[];
  yeast: string;
}

export interface PunkBeerMethod {
  mash_temp: Array<{
    temp: {
      value: number;
      unit: string;
    };
    duration: number;
  }>;
  fermentation: {
    temp: {
      value: number;
      unit: string;
    };
  };
  twist?: string;
}

export interface PunkBeerResponse {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image?: string;
  abv: number;
  ibu?: number;
  target_fg: number;
  target_og: number;
  ebc?: number;
  srm?: number;
  ph?: number;
  attenuation_level: number;
  volume: {
    value: number;
    unit: string;
  };
  boil_volume: {
    value: number;
    unit: string;
  };
  method: PunkBeerMethod;
  ingredients: PunkBeerIngredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

// Simplified beer interface for our app
export interface PunkBeer {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  abv: number;
  ibu?: number;
  ebc?: number;
  image_url?: string;
  first_brewed?: string;
  food_pairing?: string[];
  brewers_tips?: string;
  style?: string; // Derived from ingredients/characteristics
}

// Error class for Punk API
class PunkApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'PunkApiError';
  }
}

// Punk API Client
class PunkApiClient {
  private readonly baseUrl = 'https://punkapi.online/v3';
  private cache = new Map<string, { data: PunkBeer; timestamp: number }>();
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private async request<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new PunkApiError(
          `Punk API request failed: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof PunkApiError) {
        throw error;
      }
      
      // Handle network errors, parsing errors, etc.
      throw new PunkApiError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
  private padWithZeros(num: number, length = 3) {
    return num.toString().padStart(length, '0');
  }
  private transformPunkBeerResponse(punkBeer: PunkBeerResponse): PunkBeer {
    // Derive a beer style from the characteristics
    const style = this.deriveBeerStyle(punkBeer);
    const imageId = this.padWithZeros(punkBeer.id);
    return {
      id: punkBeer.id.toString(),
      name: punkBeer.name,
      tagline: punkBeer.tagline,
      description: punkBeer.description,
      abv: punkBeer.abv,
      ibu: punkBeer.ibu,
      ebc: punkBeer.ebc,
      image_url: punkBeer.image ? `https://raw.githubusercontent.com/alxiw/punkapi/refs/heads/master/img/${imageId}.png` : '',
      first_brewed: punkBeer.first_brewed,
      food_pairing: punkBeer.food_pairing,
      brewers_tips: punkBeer.brewers_tips,
      style,
    };
  }

  private deriveBeerStyle(beer: PunkBeerResponse): string {
    // Simple style derivation based on ABV, IBU, and EBC
    const { abv, ibu = 0, ebc = 0 } = beer;

    // High hop content beers
    if (ibu > 60) {
      return abv > 7 ? 'Double IPA' : 'IPA';
    }
    
    // Dark beers
    if (ebc > 40) {
      return abv > 8 ? 'Imperial Stout' : abv > 5 ? 'Stout' : 'Porter';
    }
    
    // Light colored, low hop beers
    if (ebc < 10 && ibu < 25) {
      return abv < 5 ? 'Lager' : 'Pilsner';
    }
    
    // Medium range beers
    if (abv > 6) {
      return 'Strong Ale';
    }
    
    // Default categorization
    if (ibu > 30) {
      return 'Pale Ale';
    }
    
    return 'Ale';
  }

  private getCacheKey(endpoint: string): string {
    return `punk_api_${endpoint}`;
  }

  private getCachedData(key: string): PunkBeer | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    
    // Clean up expired cache
    if (cached) {
      this.cache.delete(key);
    }
    
    return null;
  }

  private setCachedData(key: string, data: PunkBeer): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getRandomBeer(): Promise<PunkBeer> {
    const cacheKey = this.getCacheKey('random');
    
    // Check cache first (but allow random to be fetched more frequently)
    const cached = this.getCachedData(cacheKey);
    if (cached && Math.random() > 0.3) { // 70% chance to use cache, 30% to fetch new
      return cached;
    }

    try {
      const response = await this.request<PunkBeerResponse>('/beers/random');
      
      if (!response ) {
        throw new PunkApiError('No beer data received from Punk API');
      }

      const beer = this.transformPunkBeerResponse(response);
      this.setCachedData(cacheKey, beer);
      
      return beer;
    } catch (error) {
      // If API fails, return a fallback beer
      console.warn('Punk API failed, using fallback:', error);
      return this.getFallbackBeer();
    }
  }

  async getBeerById(id: string): Promise<PunkBeer | null> {
    const cacheKey = this.getCacheKey(`beer_${id}`);
    
    // Check cache first
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await this.request<PunkBeerResponse[]>(`/beers/${id}`);
      
      if (!response || response.length === 0) {
        return null;
      }

      const beer = this.transformPunkBeerResponse(response[0]);
      this.setCachedData(cacheKey, beer);
      
      return beer;
    } catch (error) {
      console.warn(`Failed to fetch beer ${id}:`, error);
      return null;
    }
  }

  private getFallbackBeer(): PunkBeer {
    // Fallback beer data in case API is unavailable
    const fallbackBeers: PunkBeer[] = [
      {
        id: 'fallback_1',
        name: 'Punk IPA',
        tagline: 'Post Modern Classic',
        description: 'A hoppy, full-flavored beer with citrus and tropical fruit notes.',
        abv: 5.6,
        ibu: 35,
        ebc: 17,
        style: 'IPA',
        image_url: '',
      },
      {
        id: 'fallback_2',
        name: 'Dead Pony Club',
        tagline: 'Sessionable IPA',
        description: 'A light, hoppy session beer perfect for any occasion.',
        abv: 3.8,
        ibu: 35,
        ebc: 12,
        style: 'Session IPA',
        image_url: '',
      },
      {
        id: 'fallback_3',
        name: 'Tactical Nuclear Penguin',
        tagline: 'Uber Imperial Stout',
        description: 'An intense, dark imperial stout with complex flavors.',
        abv: 32.0,
        ibu: 45,
        ebc: 300,
        style: 'Imperial Stout',
        image_url: '',
      },
    ];

    return fallbackBeers[Math.floor(Math.random() * fallbackBeers.length)];
  }

  // Clear cache method for testing or manual refresh
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache stats for debugging
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Create singleton instance
export const punkApi = new PunkApiClient();

// Export error class for error handling
export { PunkApiError };