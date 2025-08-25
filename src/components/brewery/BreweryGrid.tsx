'use client';

import { useState } from 'react';
import { BreweryCard, BreweryCardSkeleton } from './BreweryCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { BreweryWithRandomBeer } from '@/types/brewery';

interface BreweryGridProps {
  breweries: BreweryWithRandomBeer[];
  loading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  variant?: 'grid' | 'list';
  onFavoriteToggle?: (breweryId: string) => void;
  onViewDetails?: (breweryId: string) => void;
  onGetDirections?: (brewery: BreweryWithRandomBeer) => void;
  favoriteBreweries?: string[];
  className?: string;
}

// Icons
const GridIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export function BreweryGrid({
  breweries,
  loading = false,
  error = null,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
  variant = 'grid',
  onFavoriteToggle,
  onViewDetails,
  onGetDirections,
  favoriteBreweries = [],
  className,
}: BreweryGridProps) {
  const [currentVariant, setCurrentVariant] = useState<'grid' | 'list'>(variant);

  const handleGetDirections = (brewery: BreweryWithRandomBeer) => {
    // Default implementation - open Google Maps
    if (onGetDirections) {
      onGetDirections(brewery);
    } else {
      const address = [
        brewery.street || brewery.address_1,
        brewery.city,
        brewery.state_province || brewery.state,
        brewery.postal_code,
      ].filter(Boolean).join(', ');
      
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
      window.open(mapsUrl, '_blank');
    }
  };

  // Grid layout classes based on variant
  const gridClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
    list: 'flex flex-col space-y-4',
  };

  // Card variant based on grid variant
  const cardVariant = currentVariant === 'list' ? 'compact' : 'standard';

  if (loading && breweries.length === 0) {
    return (
      <div className={cn('container-page', className)}>
        {/* Loading skeletons */}
        <div className={gridClasses[currentVariant]}>
          {Array.from({ length: 8 }).map((_, index) => (
            <BreweryCardSkeleton key={`skeleton-${index}`} variant={cardVariant} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('container-page', className)}>
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-red-50 rounded-full p-3 mb-4">
            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-muted mb-6 max-w-md">
            {error}
          </p>
          <Button
            onClick={() => window.location.reload()}
            icon={<RefreshIcon />}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (breweries.length === 0 && !loading) {
    return (
      <div className={cn('container-page', className)}>
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="bg-gray-50 rounded-full p-3 mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No breweries found
          </h3>
          <p className="text-muted mb-6 max-w-md">
            We couldn't find any breweries matching your search criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('container-page space-y-6', className)}>
      {/* View Toggle and Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-muted">
            {breweries.length} {breweries.length === 1 ? 'brewery' : 'breweries'} found
          </p>
        </div>

        {/* View Toggle (Desktop only) */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setCurrentVariant('grid')}
            className={cn(
              'p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
              currentVariant === 'grid'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            )}
            aria-label="Grid view"
          >
            <GridIcon />
          </button>
          <button
            onClick={() => setCurrentVariant('list')}
            className={cn(
              'p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
              currentVariant === 'list'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            )}
            aria-label="List view"
          >
            <ListIcon />
          </button>
        </div>
      </div>

      {/* Brewery Grid/List */}
      <div className={gridClasses[currentVariant]}>
        {breweries.map((brewery) => (
          <BreweryCard
            key={brewery.id}
            brewery={brewery}
            variant={cardVariant}
            onFavoriteToggle={onFavoriteToggle}
            onViewDetails={onViewDetails}
            onGetDirections={handleGetDirections}
            isFavorited={favoriteBreweries.includes(brewery.id)}
          />
        ))}

        {/* Loading more skeletons */}
        {loadingMore && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <BreweryCardSkeleton key={`loading-skeleton-${index}`} variant={cardVariant} />
            ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && !loadingMore && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={onLoadMore}
            loading={loadingMore}
            variant="outline"
            size="lg"
          >
            Load More Breweries
          </Button>
        </div>
      )}

      {/* End of results indicator */}
      {!hasMore && breweries.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted">
            You've reached the end of the results
          </p>
        </div>
      )}
    </div>
  );
}

// Results Header Component
interface ResultsHeaderProps {
  totalResults: number;
  currentPage: number;
  resultsPerPage: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function ResultsHeader({
  totalResults,
  currentPage,
  resultsPerPage,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ResultsHeaderProps) {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-b border-border">
      {/* Results count */}
      <div>
        <p className="text-foreground font-medium">
          {totalResults.toLocaleString()} {totalResults === 1 ? 'brewery' : 'breweries'}
        </p>
        <p className="text-sm text-muted">
          Showing {startResult.toLocaleString()} - {endResult.toLocaleString()} of {totalResults.toLocaleString()}
        </p>
      </div>

      {/* Sort and view controls */}
      <div className="flex items-center gap-4">
        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-muted whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-surface"
          >
            <option value="name">Name (A-Z)</option>
            <option value="type">Type</option>
            <option value="city">City</option>
            <option value="state">State</option>
          </select>
        </div>

        {/* View toggle (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
              viewMode === 'grid'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            )}
            aria-label="Grid view"
          >
            <GridIcon />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
              viewMode === 'list'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            )}
            aria-label="List view"
          >
            <ListIcon />
          </button>
        </div>
      </div>
    </div>
  );
}