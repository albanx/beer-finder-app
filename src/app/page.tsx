import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const BeerIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const DiscoverIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const DiceIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen beer-themed-bg beer-texture">
      {/* Header */}
      <header className="beer-page-header py-6">
        <div className="container-page">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-accent-600">
                <BeerIcon />
              </div>
              <h1 className="text-2xl font-bold text-primary-700">Beer Finder</h1>
            </div>
            <Link href="/search">
              <Button variant="outline" size="sm">
                Search Breweries
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container-page py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full mb-6 shadow-lg">
              <div className="text-accent-600">
                <BeerIcon />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Amazing
              <span className="block text-transparent bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text">
                Breweries
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Find the perfect brewery for your next adventure. Search by location, type, or simply discover something new.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/search">
              <Button variant="beer" size="lg" icon={<SearchIcon />} className="w-full sm:w-auto px-8">
                Start Searching
              </Button>
            </Link>
            <Link href="/random-beer">
              <Button variant="accent" size="lg" icon={<DiceIcon />} className="w-full sm:w-auto px-8">
                Random Beer
              </Button>
            </Link>
            <Link href="/search?random=true">
              <Button variant="outline" size="lg" icon={<DiscoverIcon />} className="w-full sm:w-auto px-8">
                Random Discovery
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100 beer-card-glow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <SearchIcon />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Find breweries by name, location, or type with our intelligent search system.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-accent-100 beer-card-glow">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <DiceIcon />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Random Beer</h3>
              <p className="text-gray-600">
                Discover amazing craft beers with detailed information, food pairings, and brewer's tips.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-primary-100 beer-card-glow">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <DiscoverIcon />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Random Adventure</h3>
              <p className="text-gray-600">
                Feeling adventurous? Let us surprise you with a random brewery discovery.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 p-8 bg-white rounded-2xl shadow-sm border border-gray-200 beer-bottle-gradient">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore Craft Beer Culture</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">8,000+</div>
                <div className="text-sm text-gray-600">Breweries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">States</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">100+</div>
                <div className="text-sm text-gray-600">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-1">∞</div>
                <div className="text-sm text-gray-600">Adventures</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="container-page">
          <div className="text-center text-gray-600">
            <p>© 2024 Beer Finder App. Built with Next.js and powered by Open Brewery DB.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
