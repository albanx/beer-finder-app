'use client';

import { useEffect } from 'react';
import { useRandomBeer } from '@/hooks/useBrewerySearch';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import type { BeerData } from '@/types/brewery';

export default function RandomBeerPage() {
  const { beer, loading, error, getRandomBeer, refreshBeer } = useRandomBeer();

  // Load initial random beer on mount
  useEffect(() => {
    getRandomBeer();
  }, [getRandomBeer]);

  const handleRefresh = () => {
    refreshBeer();
  };

  const formatValue = (value: number | undefined, unit: string) => {
    return value !== undefined ? `${value}${unit}` : 'N/A';
  };

  if (loading && !beer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-4">
                Random Beer Discovery
              </h1>
              <p className="text-xl text-accent-700 mb-8">
                Finding your next favorite brew...
              </p>
            </div>
            
            <Card className="animate-pulse">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="bg-gray-200 rounded-lg h-96 w-full"></div>
                  </div>
                  <div className="lg:w-2/3 space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-4">
                Random Beer Discovery
              </h1>
            </div>
            
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h2>
                <p className="text-red-600 mb-6">{error}</p>
                <Button 
                  onClick={handleRefresh}
                  variant="accent"
                  size="lg"
                  loading={loading}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!beer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-4">
                Random Beer Discovery
              </h1>
              <p className="text-xl text-accent-700 mb-8">
                Ready to discover your next favorite beer?
              </p>
              <Button 
                onClick={getRandomBeer}
                variant="beer"
                size="lg"
                loading={loading}
              >
                Get Random Beer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-accent-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-4">
              Random Beer Discovery
            </h1>
            <p className="text-xl text-accent-700 mb-8">
              Discover amazing craft beers from around the world
            </p>
            <Button 
              onClick={handleRefresh}
              variant="beer"
              size="lg"
              loading={loading}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            >
              Get New Random Beer
            </Button>
          </div>

          {/* Beer Card */}
          <Card className="overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Beer Image */}
                <div className="lg:w-1/3 bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center p-8 lg:p-12">
                  <div className="relative">
                    {beer.image_url ? (
                      <img
                        src={beer.image_url}
                        alt={beer.name}
                        className="h-80 w-auto object-contain mx-auto drop-shadow-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : (
                      <img
                        src={`https://github.com/alxiw/punkapi/raw/master/img/${beer.id}.png`}
                        alt={beer.name}
                        className="h-80 w-auto object-contain mx-auto drop-shadow-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    )}
                    <div className={`${beer.image_url || beer.id ? 'hidden' : ''} h-80 w-32 bg-accent-300 rounded-lg flex items-center justify-center mx-auto shadow-lg`}>
                      <svg className="w-20 h-20 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12V7a1 1 0 011-1h1V4a2 2 0 012-2h6a2 2 0 012 2v2h1a1 1 0 011 1v5a7 7 0 01-14 0zM9 4v2h6V4H9zm-1 4v8a5 5 0 0010 0V8H8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Beer Details */}
                <div className="lg:w-2/3 p-8 lg:p-12">
                  <div className="space-y-6">
                    {/* Beer Name and Tagline */}
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        {beer.name}
                      </h2>
                      {beer.tagline && (
                        <p className="text-lg text-accent-600 font-medium italic">
                          "{beer.tagline}"
                        </p>
                      )}
                    </div>

                    {/* Beer Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-accent-50 rounded-lg">
                        <div className="text-2xl font-bold text-accent-700">
                          {formatValue(beer.abv, '%')}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">ABV</div>
                      </div>
                      <div className="text-center p-4 bg-accent-50 rounded-lg">
                        <div className="text-2xl font-bold text-accent-700">
                          {formatValue(beer.ibu, '')}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">IBU</div>
                      </div>
                      <div className="text-center p-4 bg-accent-50 rounded-lg">
                        <div className="text-2xl font-bold text-accent-700">
                          {formatValue(beer.ebc, '')}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">EBC</div>
                      </div>
                      <div className="text-center p-4 bg-accent-50 rounded-lg">
                        <div className="text-lg font-bold text-accent-700">
                          {beer.style || 'Craft Beer'}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Style</div>
                      </div>
                    </div>

                    {/* Description */}
                    {beer.description && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {beer.description}
                        </p>
                      </div>
                    )}

                    {/* First Brewed */}
                    {beer.first_brewed && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">First Brewed</h3>
                        <p className="text-gray-700">{beer.first_brewed}</p>
                      </div>
                    )}

                    {/* Food Pairing */}
                    {beer.food_pairing && beer.food_pairing.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Perfect Pairings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {beer.food_pairing.map((food, index) => (
                            <div key={index} className="bg-gradient-to-r from-accent-100 to-accent-50 p-3 rounded-lg border border-accent-200">
                              <p className="text-sm font-medium text-accent-800 text-center">
                                {food}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Brewer's Tips */}
                    {beer.brewers_tips && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Brewer's Tips</h3>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                          <p className="text-blue-800 italic">
                            "{beer.brewers_tips}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <Button 
              onClick={handleRefresh}
              variant="outline"
              size="lg"
              loading={loading}
              className="bg-white/80 hover:bg-white"
            >
              Discover Another Beer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}