'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { Brewery } from '@/types/brewery';
import { apiUtils } from '@/services/api/breweryApi';

interface BreweryCardProps {
  brewery: Brewery;
  variant?: 'compact' | 'standard' | 'featured';
  onFavoriteToggle?: (breweryId: string) => void;
  onViewDetails?: (breweryId: string) => void;
  onGetDirections?: (brewery: Brewery) => void;
  isFavorited?: boolean;
  className?: string;
}

// Icons
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg 
    className="h-5 w-5" 
    fill={filled ? "currentColor" : "none"} 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
    />
  </svg>
);

const DirectionsIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const ViewIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const BeerIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export function BreweryCard({
  brewery,
  variant = 'standard',
  onFavoriteToggle,
  onViewDetails,
  onGetDirections,
  isFavorited = false,
  className,
}: BreweryCardProps) {
  const [imageError, setImageError] = useState(false);

  const formattedType = apiUtils.formatBreweryType(brewery.brewery_type);
  const formattedAddress = apiUtils.formatBreweryAddress(brewery);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(brewery.id);
  };

  const handleDirectionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onGetDirections?.(brewery);
  };

  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails?.(brewery.id);
  };

  const handleCardClick = () => {
    onViewDetails?.(brewery.id);
  };

  // Compact variant (mobile)
  if (variant === 'compact') {
    return (
      <Card
        variant="interactive"
        className={cn('w-full cursor-pointer', className)}
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex gap-3">
            {/* Brewery Image */}
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
              {!imageError ? (
                <img
                  src={`https://via.placeholder.com/64x64/2563eb/ffffff?text=${encodeURIComponent(brewery.name.charAt(0))}`}
                  alt={`${brewery.name} logo`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-lg">
                    {brewery.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground truncate">
                {brewery.name}
              </h3>
              <p className="text-sm text-muted">
                {formattedType} • {brewery.city}, {brewery.state}
              </p>

            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className={cn(
                'p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
                isFavorited 
                  ? 'text-red-500 hover:bg-red-50' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              )}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HeartIcon filled={isFavorited} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <Button
              size="sm"
              variant="outline"
              onClick={handleDirectionsClick}
              icon={<DirectionsIcon />}
              className="flex-1"
            >
              Directions
            </Button>
            <Button
              size="sm"
              variant="beer"
              onClick={handleViewDetailsClick}
              icon={<ViewIcon />}
              className="flex-1"
            >
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Standard and Featured variants (tablet/desktop)
  return (
    <Card
      variant="interactive"
      className={cn(
        'overflow-hidden group',
        variant === 'featured' && 'ring-2 ring-primary-500',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Brewery Image */}
      <div className={cn(
        'w-full bg-gray-100 overflow-hidden relative',
        variant === 'featured' ? 'h-56' : 'h-48'
      )}>
        {!imageError ? (
          <img
            src={`https://via.placeholder.com/400x200/2563eb/ffffff?text=${encodeURIComponent(brewery.name)}`}
            alt={`${brewery.name} brewery`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-primary-100 flex items-center justify-center">
            <div className="text-center">
              <span className="text-primary-600 font-bold text-4xl">
                {brewery.name.charAt(0)}
              </span>
              <p className="text-primary-600 font-medium mt-2">
                {brewery.name}
              </p>
            </div>
          </div>
        )}

        {/* Favorite Button Overlay */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
            isFavorited 
              ? 'bg-red-500/90 text-white hover:bg-red-600/90' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
          )}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon filled={isFavorited} />
        </button>
      </div>

      <CardContent className={cn(
        'space-y-4',
        variant === 'featured' ? 'p-6' : 'p-5'
      )}>
        {/* Brewery Info */}
        <div>
          <h3 className={cn(
            'font-semibold text-foreground group-hover:text-primary-500 transition-colors',
            variant === 'featured' ? 'text-xl' : 'text-lg'
          )}>
            {brewery.name}
          </h3>
          <p className="text-sm text-muted mt-1">
            {formattedType} • {brewery.city}, {brewery.state}
          </p>
          {variant === 'featured' && formattedAddress && (
            <p className="text-sm text-muted mt-1">
              {formattedAddress}
            </p>
          )}
        </div>


        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDirectionsClick}
            icon={<DirectionsIcon />}
            className="flex-1"
          >
            Directions
          </Button>
          <Button
            size="sm"
            variant="beer"
            onClick={handleViewDetailsClick}
            icon={<ViewIcon />}
            className="flex-1"
          >
            View Details
          </Button>
        </div>

        {/* Additional info for featured variant */}
        {variant === 'featured' && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              {brewery.phone && (
                <span className="text-muted">
                  📞 {brewery.phone}
                </span>
              )}
              {brewery.website_url && (
                <a
                  href={apiUtils.formatWebsiteUrl(brewery.website_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Website →
                </a>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Loading skeleton for brewery cards
export function BreweryCardSkeleton({ variant = 'standard' }: { variant?: 'compact' | 'standard' | 'featured' }) {
  if (variant === 'compact') {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-lg skeleton" />
            <div className="flex-1 space-y-2">
              <div className="h-4 skeleton rounded w-3/4" />
              <div className="h-3 skeleton rounded w-1/2" />
              <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded skeleton" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 skeleton rounded w-3/4" />
                  <div className="h-3 skeleton rounded w-1/2" />
                </div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg skeleton" />
          </div>
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <div className="h-8 skeleton rounded flex-1" />
            <div className="h-8 skeleton rounded flex-1" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className={cn(
        'w-full skeleton',
        variant === 'featured' ? 'h-56' : 'h-48'
      )} />
      <CardContent className={cn(
        'space-y-4',
        variant === 'featured' ? 'p-6' : 'p-5'
      )}>
        <div className="space-y-2">
          <div className="h-6 skeleton rounded w-3/4" />
          <div className="h-4 skeleton rounded w-1/2" />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg skeleton" />
            <div className="flex-1 space-y-2">
              <div className="h-4 skeleton rounded w-3/4" />
              <div className="h-3 skeleton rounded w-1/2" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="h-9 skeleton rounded flex-1" />
          <div className="h-9 skeleton rounded flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}