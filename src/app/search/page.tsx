'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchWithLocation } from '@/components/search/SearchBar';
import { SimpleFilterPanel } from '@/components/filters/SimpleFilterPanel';
import { BreweryGrid, ResultsHeader } from '@/components/brewery/BreweryGrid';
import { Button } from '@/components/ui/Button';
import { useBrewerySearch } from '@/hooks/useBrewerySearch';
import { BreweryFilters, SortOption, BreweryType } from '@/types/brewery';
import { cn } from '@/utils/cn';

// Filter icon
const FilterIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteBreweries, setFavoriteBreweries] = useState<string[]>([]);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filters, setFilters] = useState<BreweryFilters>({
    type: '',
    city: '',
    state: '',
    country: 'United States',
    sort: 'name',
  });

  // Custom hooks
  const {
    breweries,
    loading,
    error,
    hasMore,
    searchBreweries,
    loadMoreBreweries,
    clearSearch,
  } = useBrewerySearch();

  // Initialize from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const location = searchParams.get('location') || '';
    const type = (searchParams.get('type') || '') as BreweryType | '';
    const city = searchParams.get('city') || '';
    const state = searchParams.get('state') || '';
    const sort = searchParams.get('sort') || 'name';

    setSearchQuery(query);
    setLocationFilter(location);
    setFilters({
      type,
      city,
      state,
      country: 'United States',
      sort: sort as SortOption,
    });

    // Trigger initial search if params exist
    if (query || location || type || city || state) {
      handleSearch(query, location, {
        type,
        city,
        state,
        country: 'United States',
        sort: sort as SortOption,
      });
    }
  }, [searchParams]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteBreweries');
    if (savedFavorites) {
      try {
        setFavoriteBreweries(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = useCallback((favorites: string[]) => {
    try {
      localStorage.setItem('favoriteBreweries', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, []);

  // Update URL with current search state
  const updateUrl = useCallback((query: string, location: string, searchFilters: BreweryFilters) => {
    const params = new URLSearchParams();
    
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    if (searchFilters.type) params.set('type', searchFilters.type);
    if (searchFilters.city) params.set('city', searchFilters.city);
    if (searchFilters.state) params.set('state', searchFilters.state);
    if (searchFilters.sort && searchFilters.sort !== 'name') params.set('sort', searchFilters.sort);

    const newUrl = params.toString() ? `?${params.toString()}` : '/search';
    router.replace(newUrl, { scroll: false });
  }, [router]);

  // Handle search
  const handleSearch = useCallback(async (query: string, location: string, searchFilters?: BreweryFilters) => {
    const currentFilters = searchFilters || filters;
    
    setCurrentPage(1);
    updateUrl(query, location, currentFilters);
    
    try {
      await searchBreweries(query, location, currentFilters);
    } catch (error) {
      console.error('Search error:', error);
    }
  }, [filters, searchBreweries, updateUrl]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: BreweryFilters) => {
    setFilters(newFilters);
    handleSearch(searchQuery, locationFilter, newFilters);
  }, [searchQuery, locationFilter, handleSearch]);

  // Handle sort change
  const handleSortChange = useCallback((sort: string) => {
    const newFilters = { ...filters, sort: sort as SortOption };
    handleFiltersChange(newFilters);
  }, [filters, handleFiltersChange]);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      try {
        await loadMoreBreweries();
      } catch (error) {
        console.error('Load more error:', error);
      }
    }
  }, [loading, hasMore, currentPage, loadMoreBreweries]);

  // Handle favorite toggle
  const handleFavoriteToggle = useCallback((breweryId: string) => {
    setFavoriteBreweries(prev => {
      const newFavorites = prev.includes(breweryId)
        ? prev.filter(id => id !== breweryId)
        : [...prev, breweryId];
      
      saveFavorites(newFavorites);
      return newFavorites;
    });
  }, [saveFavorites]);

  // Handle view details
  const handleViewDetails = useCallback((breweryId: string) => {
    router.push(`/brewery/${breweryId}`);
  }, [router]);

  // Handle get directions
  const handleGetDirections = useCallback((brewery: any) => {
    const address = [
      brewery.street || brewery.address_1,
      brewery.city,
      brewery.state_province || brewery.state,
      brewery.postal_code,
    ].filter(Boolean).join(', ');
    
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  }, []);

  // Handle clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setLocationFilter('');
    setFilters({
      type: '',
      city: '',
      state: '',
      country: 'United States',
      sort: 'name',
    });
    setCurrentPage(1);
    clearSearch();
    router.replace('/search');
  }, [clearSearch, router]);

  const hasResults = breweries.length > 0;
  const hasActiveSearch = searchQuery || locationFilter || filters.type || filters.city || filters.state;

  return (
    <div className="min-h-screen beer-themed-bg beer-texture">
      {/* Header */}
      <div className="beer-page-header border-b border-primary-200 sticky top-0 z-40 backdrop-blur-sm">
        <div className="container-page py-6">
          <div className="flex flex-col space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary-800 flex items-center justify-center gap-3 mb-2">
                🍺 Brewery Search
              </h1>
              <p className="text-primary-600">Discover amazing craft breweries and beer experiences</p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto w-full">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary-200">
                <SearchWithLocation
                  searchValue={searchQuery}
                  locationValue={locationFilter}
                  onSearchChange={setSearchQuery}
                  onLocationChange={setLocationFilter}
                  onSearch={handleSearch}
                  loading={loading}
                />
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Button
                onClick={() => setIsFilterPanelOpen(true)}
                variant="beer"
                icon={<FilterIcon />}
                className="w-full justify-center"
              >
                🔧 Filters & Sort
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-page py-8">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-200 overflow-hidden">
                <SimpleFilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClose={() => {}} // Not used in desktop mode
                  isOpen={true} // Always open in desktop mode
                  breweryCount={breweries.length}
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {hasActiveSearch && (
              <>
                {/* Results Header */}
                {hasResults && (
                  <ResultsHeader
                    totalResults={breweries.length}
                    currentPage={currentPage}
                    resultsPerPage={20}
                    sortBy={filters.sort || 'name'}
                    onSortChange={handleSortChange}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  />
                )}

                {/* Brewery Grid */}
                <BreweryGrid
                  breweries={breweries}
                  loading={loading}
                  error={error}
                  onLoadMore={handleLoadMore}
                  hasMore={hasMore}
                  loadingMore={loading && currentPage > 1}
                  variant={viewMode}
                  onFavoriteToggle={handleFavoriteToggle}
                  onViewDetails={handleViewDetails}
                  onGetDirections={handleGetDirections}
                  favoriteBreweries={favoriteBreweries}
                  className="pt-6"
                />
              </>
            )}

            {/* Welcome State */}
            {!hasActiveSearch && (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="bg-gradient-to-br from-accent-100 to-accent-200 rounded-full p-6 mb-8 shadow-lg">
                  <svg className="h-16 w-16 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  🍺 Find Your Perfect Brewery
                </h2>
                <p className="text-gray-600 max-w-lg mb-12 text-lg">
                  Search by name, location, or browse by brewery type to discover amazing local breweries and craft beer experiences near you.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
                  {[
                    { type: 'micro' as BreweryType, label: 'Microbreweries', emoji: '🏭' },
                    { type: 'brewpub' as BreweryType, label: 'Brewpubs', emoji: '🍽️' },
                    { type: 'large' as BreweryType, label: 'Large Breweries', emoji: '🏢' },
                    { type: 'regional' as BreweryType, label: 'Regional', emoji: '🗺️' },
                  ].map(({ type, label, emoji }) => (
                    <Button
                      key={type}
                      variant="outline"
                      onClick={() => {
                        const newFilters = { ...filters, type };
                        handleFiltersChange(newFilters);
                      }}
                      className="h-auto py-6 flex-col bg-white/80 backdrop-blur-sm border-primary-200 hover:border-accent-300 hover:bg-accent-50 transition-all duration-200 beer-card-glow"
                    >
                      <span className="text-2xl mb-2">{emoji}</span>
                      <span className="text-sm font-semibold text-gray-700">{label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <SimpleFilterPanel
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClose={() => setIsFilterPanelOpen(false)}
        isOpen={isFilterPanelOpen}
        breweryCount={breweries.length}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen beer-themed-bg beer-texture flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
          <p className="text-accent-700 font-medium">Loading brewery search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}