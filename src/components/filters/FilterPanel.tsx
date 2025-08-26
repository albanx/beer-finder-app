'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';
import { FilterState, BreweryType } from '@/types/brewery';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isVisible: boolean;
  onClose: () => void;
  variant: 'modal' | 'sidebar';
  resultCount?: number;
}

const FilterIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707L11 21.414a1 1 0 01-1.414 0L7.293 19.121A1 1 0 017 18.414V13.414a1 1 0 00-.293-.707L.293 6.293A1 1 0 010 5.586V3a1 1 0 011-1z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BREWERY_TYPES: { value: BreweryType; label: string; description: string }[] = [
  { value: 'micro', label: 'Microbrewery', description: 'Small-scale brewery' },
  { value: 'nano', label: 'Nanobrewery', description: 'Very small brewery' },
  { value: 'regional', label: 'Regional Brewery', description: 'Medium-scale brewery' },
  { value: 'brewpub', label: 'Brewpub', description: 'Restaurant with brewery' },
  { value: 'large', label: 'Large Brewery', description: 'Large-scale brewery' },
  { value: 'planning', label: 'Planning', description: 'In planning phase' },
  { value: 'bar', label: 'Beer Bar', description: 'Bar specializing in beer' },
  { value: 'contract', label: 'Contract Brewery', description: 'Contract brewing' },
  { value: 'proprietor', label: 'Proprietor', description: 'Small proprietor brewery' },
];

export function FilterPanel({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  isVisible,
  onClose,
  variant,
  resultCount,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [locationInput, setLocationInput] = useState('');

  // Sync local filters with prop changes
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleTypeToggle = (type: BreweryType) => {
    const newTypes = localFilters.types.includes(type)
      ? localFilters.types.filter(t => t !== type)
      : [...localFilters.types, type];
    
    setLocalFilters(prev => ({ ...prev, types: newTypes }));
  };

  const handleLocationAdd = () => {
    if (locationInput.trim() && !localFilters.locations.includes(locationInput.trim())) {
      setLocalFilters(prev => ({
        ...prev,
        locations: [...prev.locations, locationInput.trim()]
      }));
      setLocationInput('');
    }
  };

  const handleLocationRemove = (location: string) => {
    setLocalFilters(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l !== location)
    }));
  };

  const handleDistanceChange = (distance: number) => {
    setLocalFilters(prev => ({ ...prev, distance }));
  };

  const handleSortChange = (sort: FilterState['sort']) => {
    setLocalFilters(prev => ({ ...prev, sort }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    if (variant === 'modal') {
      onClose();
    }
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      types: [],
      locations: [],
      sort: 'name',
    };
    setLocalFilters(clearedFilters);
    setLocationInput('');
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = localFilters.types.length > 0 || 
                          localFilters.locations.length > 0 || 
                          localFilters.distance !== undefined;

  // Modal variant (mobile)
  if (variant === 'modal') {
    return (
      <>
        {/* Overlay */}
        {isVisible && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
        
        {/* Modal Panel */}
        <div className={cn(
          'fixed inset-x-0 bottom-0 z-50 bg-surface rounded-t-2xl max-h-[90vh] overflow-hidden transform transition-transform duration-300 ease-in-out md:hidden',
          isVisible ? 'translate-y-0' : 'translate-y-full'
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <FilterIcon />
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              {hasActiveFilters && (
                <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                  {localFilters.types.length + localFilters.locations.length}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Close filters"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <FilterContent
              localFilters={localFilters}
              locationInput={locationInput}
              setLocationInput={setLocationInput}
              handleTypeToggle={handleTypeToggle}
              handleLocationAdd={handleLocationAdd}
              handleLocationRemove={handleLocationRemove}
              handleDistanceChange={handleDistanceChange}
              handleSortChange={handleSortChange}
            />
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-border bg-surface-elevated flex gap-3">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!hasActiveFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              variant="beer"
              onClick={handleApply}
              className="flex-1"
            >
              🍺 Apply Filters
              {resultCount !== undefined && ` (${resultCount})`}
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Sidebar variant (desktop)
  return (
    <div className={cn(
      'w-80 bg-surface border-r border-border overflow-y-auto hidden md:block',
      !isVisible && 'md:hidden'
    )}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FilterIcon />
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            {hasActiveFilters && (
              <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                {localFilters.types.length + localFilters.locations.length}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <FilterContent
          localFilters={localFilters}
          locationInput={locationInput}
          setLocationInput={setLocationInput}
          handleTypeToggle={handleTypeToggle}
          handleLocationAdd={handleLocationAdd}
          handleLocationRemove={handleLocationRemove}
          handleDistanceChange={handleDistanceChange}
          handleSortChange={handleSortChange}
        />

        {/* Actions */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Button
            variant="beer"
            onClick={handleApply}
            className="w-full"
          >
            🍺 Apply Filters
            {resultCount !== undefined && ` (${resultCount})`}
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!hasActiveFilters}
            className="w-full"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}

// Filter content component (shared between modal and sidebar)
interface FilterContentProps {
  localFilters: FilterState;
  locationInput: string;
  setLocationInput: (value: string) => void;
  handleTypeToggle: (type: BreweryType) => void;
  handleLocationAdd: () => void;
  handleLocationRemove: (location: string) => void;
  handleDistanceChange: (distance: number) => void;
  handleSortChange: (sort: FilterState['sort']) => void;
}

function FilterContent({
  localFilters,
  locationInput,
  setLocationInput,
  handleTypeToggle,
  handleLocationAdd,
  handleLocationRemove,
  handleDistanceChange,
  handleSortChange,
}: FilterContentProps) {
  return (
    <>
      {/* Brewery Type Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Brewery Type
        </h3>
        <div className="space-y-2">
          {BREWERY_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md px-2 -mx-2"
            >
              <input
                type="checkbox"
                checked={localFilters.types.includes(type.value)}
                onChange={() => handleTypeToggle(type.value)}
                className="w-4 h-4 rounded border-2 border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-foreground">{type.label}</span>
                <p className="text-xs text-muted">{type.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Location
        </h3>
        <div className="flex gap-2">
          <Input
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Enter city or state"
            size="sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleLocationAdd();
              }
            }}
          />
          <Button
            onClick={handleLocationAdd}
            disabled={!locationInput.trim()}
            size="sm"
            variant="outline"
          >
            Add
          </Button>
        </div>
        
        {/* Selected Locations */}
        {localFilters.locations.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {localFilters.locations.map((location, index) => (
              <div
                key={`location-${index}`}
                className="flex items-center gap-1 bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
              >
                <span>{location}</span>
                <button
                  onClick={() => handleLocationRemove(location)}
                  className="ml-1 hover:bg-accent-300 rounded-full p-1 transition-colors"
                  aria-label={`Remove ${location}`}
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Distance Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Distance
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={localFilters.distance || 25}
            onChange={(e) => handleDistanceChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted">
            <span>5km</span>
            <span className="font-medium text-foreground">
              {localFilters.distance || 25}km
            </span>
            <span>100km</span>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Sort By
        </h3>
        <div className="space-y-2">
          {[
            { value: 'name' as const, label: 'Name (A-Z)' },
            { value: 'type' as const, label: 'Type' },
            { value: 'city' as const, label: 'City' },
            { value: 'state' as const, label: 'State' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md px-2 -mx-2"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={localFilters.sort === option.value}
                onChange={() => handleSortChange(option.value)}
                className="w-4 h-4 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

// Filter Toggle Button (for mobile)
interface FilterToggleProps {
  onClick: () => void;
  hasActiveFilters: boolean;
  activeCount: number;
}

export function FilterToggle({ onClick, hasActiveFilters, activeCount }: FilterToggleProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Open filters"
    >
      <FilterIcon />
      <span className="text-sm font-medium">Filters</span>
      {hasActiveFilters && (
        <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
          {activeCount}
        </span>
      )}
    </button>
  );
}