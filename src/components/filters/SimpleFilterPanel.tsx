'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { BreweryFilters, BreweryType, SortOption } from '@/types/brewery';

interface SimpleFilterPanelProps {
  filters: BreweryFilters;
  onFiltersChange: (filters: BreweryFilters) => void;
  onClose: () => void;
  isOpen?: boolean;
  breweryCount?: number;
}

const FilterIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
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

export function SimpleFilterPanel({
  filters,
  onFiltersChange,
  onClose,
  isOpen = false,
  breweryCount,
}: SimpleFilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<BreweryFilters>(filters);

  const handleTypeChange = (type: BreweryType) => {
    const newFilters: BreweryFilters = {
      ...localFilters,
      type: localFilters.type === type ? '' as const : type
    };
    setLocalFilters(newFilters);
  };

  const handleCityChange = (city: string) => {
    const newFilters = { ...localFilters, city };
    setLocalFilters(newFilters);
  };

  const handleStateChange = (state: string) => {
    const newFilters = { ...localFilters, state };
    setLocalFilters(newFilters);
  };

  const handleSortChange = (sort: SortOption) => {
    const newFilters = { ...localFilters, sort };
    setLocalFilters(newFilters);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: BreweryFilters = {
      type: '',
      city: '',
      state: '',
      country: 'United States',
      sort: 'name',
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = 
    localFilters.type !== '' || 
    localFilters.city !== '' || 
    localFilters.state !== '';

  return (
    <>
      {/* Mobile Modal - Only shown on mobile when isOpen is true */}
      <div className="lg:hidden">
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
        
        {/* Modal Panel */}
        <div className={cn(
          'fixed inset-x-0 bottom-0 z-50 bg-surface rounded-t-2xl max-h-[90vh] overflow-hidden transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <FilterIcon />
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              {hasActiveFilters && (
                <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                  Active
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
              handleTypeChange={handleTypeChange}
              handleCityChange={handleCityChange}
              handleStateChange={handleStateChange}
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
              onClick={handleApply}
              className="flex-1"
            >
              Apply Filters
              {breweryCount !== undefined && ` (${breweryCount})`}
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Always visible on large screens */}
      <div className="w-80 bg-surface border-r border-border overflow-y-auto hidden lg:block">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FilterIcon />
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              {hasActiveFilters && (
                <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <FilterContent
            localFilters={localFilters}
            handleTypeChange={handleTypeChange}
            handleCityChange={handleCityChange}
            handleStateChange={handleStateChange}
            handleSortChange={handleSortChange}
          />

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-border">
            <Button
              onClick={handleApply}
              className="w-full"
            >
              Apply Filters
              {breweryCount !== undefined && ` (${breweryCount})`}
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
    </>
  );
}

// Filter content component
interface FilterContentProps {
  localFilters: BreweryFilters;
  handleTypeChange: (type: BreweryType) => void;
  handleCityChange: (city: string) => void;
  handleStateChange: (state: string) => void;
  handleSortChange: (sort: SortOption) => void;
}

function FilterContent({
  localFilters,
  handleTypeChange,
  handleCityChange,
  handleStateChange,
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
                type="radio"
                name="brewery-type"
                value={type.value}
                checked={localFilters.type === type.value}
                onChange={() => handleTypeChange(type.value)}
                className="w-4 h-4 text-primary-500 focus:ring-primary-500"
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-foreground">{type.label}</span>
                <p className="text-xs text-muted">{type.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Location
        </h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="city-filter" className="block text-xs text-muted mb-1">
              City
            </label>
            <input
              id="city-filter"
              type="text"
              value={localFilters.city || ''}
              onChange={(e) => handleCityChange(e.target.value)}
              placeholder="Enter city name"
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="state-filter" className="block text-xs text-muted mb-1">
              State
            </label>
            <input
              id="state-filter"
              type="text"
              value={localFilters.state || ''}
              onChange={(e) => handleStateChange(e.target.value)}
              placeholder="Enter state name"
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
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