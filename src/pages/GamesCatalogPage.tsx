import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GameFilterSidebar from '@/components/games_catalog_page/GameFilterSidebar';
import GameSearchBar from '@/components/games_catalog_page/GameSearchBar';
import CatalogTabs from '@/components/games_catalog_page/CatalogTabs';
import ViewModeToggle from '@/components/games_catalog_page/ViewModeToggle';
import FeaturedGamesSection from '@/components/games_catalog_page/FeaturedGamesSection';
import GameCardGrid from '@/components/games_catalog_page/GameCardGrid';
import CatalogPagination from '@/components/games_catalog_page/CatalogPagination';
import { cn } from '@/lib/utils';

// Define Game and Platform types (consistent with child components)
type Platform = 'pc' | 'playstation' | 'xbox' | 'switch' | 'mobile';
interface Game {
  id: string | number;
  title: string;
  imageUrl: string;
  price?: number;
  rentalPrice?: number;
  platforms: Platform[];
  isNew?: boolean;
  isRentalAvailable?: boolean;
  isBuyAvailable?: boolean;
  shortDescription?: string;
  genre: string; // Added genre for filtering
}
interface FeaturedGame {
  id: string | number;
  title: string;
  imageUrl: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}
interface Filters {
  genres?: string[];
  platforms?: Platform[];
  mode?: 'buy' | 'rent' | 'all';
  priceRange?: [number, number];
}

// --- Placeholder Data --- START
const mockGenres: string[] = ['Action', 'RPG', 'Strategy', 'Simulation', 'Sports', 'Adventure', 'Puzzle'];
const mockPlatforms: Platform[] = ['pc', 'playstation', 'xbox', 'switch', 'mobile'];

const mockFeaturedGames: FeaturedGame[] = [
  { id: 'fg1', title: 'Cyberpunk 2077: Ultimate Edition', imageUrl: '/placeholder-images/featured-game-1.jpg', description: 'Experience the definitive Cyberpunk 2077 journey.', ctaText: 'View Now', ctaLink: '/games/cyberpunk-2077' },
  { id: 'fg2', title: 'Elden Ring: Shadow of the Erdtree', imageUrl: '/placeholder-images/featured-game-2.jpg', description: 'Explore the Land of Shadow in the acclaimed expansion.', ctaText: 'Pre-order', ctaLink: '/games/elden-ring-dlc' },
  { id: 'fg3', title: 'Stardew Valley - Now Rentable!', imageUrl: '/placeholder-images/featured-game-3.jpg', description: 'Farm, explore, and build a life in this beloved indie hit.', ctaText: 'Rent Now', ctaLink: '/games/stardew-valley' }
];

const mockGames: Game[] = [
  { id: 1, title: 'Cosmic Frontier', imageUrl: '/placeholder-images/game-cover-1.jpg', price: 59.99, rentalPrice: 5.99, platforms: ['pc', 'playstation'], isNew: true, isBuyAvailable: true, isRentalAvailable: true, shortDescription: 'Explore galaxies unknown.', genre: 'Action' },
  { id: 2, title: "Dragon's Path", imageUrl: '/placeholder-images/game-cover-2.jpg', price: 49.99, platforms: ['pc', 'xbox', 'switch'], isBuyAvailable: true, isRentalAvailable: false, shortDescription: 'Embark on an epic fantasy quest.', genre: 'RPG' },
  { id: 3, title: 'City Builders Deluxe', imageUrl: '/placeholder-images/game-cover-3.jpg', price: 39.99, platforms: ['pc'], isBuyAvailable: true, isRentalAvailable: false, shortDescription: 'Design your dream metropolis.', genre: 'Simulation' },
  { id: 4, title: 'Galactic Gridiron', imageUrl: '/placeholder-images/game-cover-4.jpg', price: 29.99, rentalPrice: 2.99, platforms: ['xbox', 'playstation'], isBuyAvailable: true, isRentalAvailable: true, shortDescription: 'Interstellar football action!', genre: 'Sports' },
  { id: 5, title: 'Ninja Legends', imageUrl: '/placeholder-images/game-cover-5.jpg', price: 19.99, platforms: ['switch', 'mobile'], isNew: true, isBuyAvailable: true, isRentalAvailable: false, shortDescription: 'Master the shadows.', genre: 'Action' },
  { id: 6, title: 'Wizard Academy', imageUrl: '/placeholder-images/game-cover-6.jpg', rentalPrice: 4.99, platforms: ['pc', 'switch'], isBuyAvailable: false, isRentalAvailable: true, shortDescription: 'Learn magical arts.', genre: 'Adventure' },
  { id: 7, title: 'Puzzle Realms', imageUrl: '/placeholder-images/game-cover-7.jpg', price: 9.99, platforms: ['mobile', 'pc'], isBuyAvailable: true, isRentalAvailable: false, shortDescription: 'Challenge your mind.', genre: 'Puzzle' },
  { id: 8, title: 'Space Settlers', imageUrl: '/placeholder-images/game-cover-8.jpg', price: 45.00, rentalPrice: 4.50, platforms: ['pc', 'xbox'], isBuyAvailable: true, isRentalAvailable: true, shortDescription: 'Colonize distant worlds.', genre: 'Strategy' },
  { id: 9, title: 'Racing Rivals', imageUrl: '/placeholder-images/game-cover-9.jpg', price: 55.00, platforms: ['playstation', 'xbox', 'pc'], isNew: true, isBuyAvailable: true, isRentalAvailable: false, shortDescription: 'High-speed competitive racing.', genre: 'Sports' },
  { id: 10, title: 'Mythic Legends RPG', imageUrl: '/placeholder-images/game-cover-10.jpg', price: 69.99, rentalPrice: 6.99, platforms: ['pc', 'playstation', 'xbox'], isBuyAvailable: true, isRentalAvailable: true, shortDescription: 'Forge your legend.', genre: 'RPG' },
  { id: 11, title: 'Cyber Runner', imageUrl: '/placeholder-images/game-cover-11.jpg', price: 24.99, platforms: ['pc', 'switch'], isBuyAvailable: true, isRentalAvailable: false, shortDescription: 'Dash through neon streets.', genre: 'Action' },
  { id: 12, title: 'Farm Life Sim', imageUrl: '/placeholder-images/game-cover-12.jpg', rentalPrice: 1.99, platforms: ['pc', 'mobile'], isBuyAvailable: false, isRentalAvailable: true, shortDescription: 'Relaxing farm simulation.', genre: 'Simulation' }
];
// --- Placeholder Data --- END

const ITEMS_PER_PAGE = 8; // Number of games per page

const GamesCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({ mode: 'all', priceRange: [0, 100] });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'new'>('buy'); // Default tab
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search change
  }, []);

  const handleTabChange = useCallback((tab: 'buy' | 'rent' | 'new') => {
    setActiveTab(tab);
    // Reset relevant filters when switching tabs, could be more sophisticated
    setFilters(prev => ({ ...prev, mode: tab === 'buy' ? 'buy' : tab === 'rent' ? 'rent' : 'all' })); 
    setCurrentPage(1); // Reset to first page on tab change
  }, []);

  const handleViewModeChange = useCallback((mode: 'grid' | 'carousel') => {
    setViewMode(mode);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  }, []);

  const handleViewDetailsClick = useCallback((gameId: string | number) => {
    navigate(`/games/${gameId}`);
    console.log('View Details:', gameId);
  }, [navigate]);

  const handleBuyClick = useCallback((gameId: string | number) => {
    // Add logic to add to cart (buy)
    console.log('Buy Clicked:', gameId);
    // Possibly navigate to cart or show toast
    navigate('/cart');
  }, [navigate]);

  const handleRentClick = useCallback((gameId: string | number) => {
    // Add logic to add to cart (rent)
    console.log('Rent Clicked:', gameId);
    // Possibly navigate to cart or show toast
    navigate('/cart');
  }, [navigate]);

  // --- Filtering and Pagination Logic --- START
  const filteredGames = useMemo(() => {
    return mockGames.filter(game => {
      // Search Term Filter
      if (searchTerm && !game.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Tab Filter (simplistic: checks availability based on tab)
      if (activeTab === 'buy' && !game.isBuyAvailable) return false;
      if (activeTab === 'rent' && !game.isRentalAvailable) return false;
      if (activeTab === 'new' && !game.isNew) return false;

      // Sidebar Filters
      if (filters.genres && filters.genres.length > 0 && !filters.genres.includes(game.genre)) {
        return false;
      }
      if (filters.platforms && filters.platforms.length > 0 && !filters.platforms.some(p => game.platforms.includes(p))) {
        return false;
      }
      if (filters.mode && filters.mode !== 'all') {
        if (filters.mode === 'buy' && !game.isBuyAvailable) return false;
        if (filters.mode === 'rent' && !game.isRentalAvailable) return false;
      }
      if (filters.priceRange) {
        const price = game.price ?? (filters.mode === 'rent' ? game.rentalPrice : null);
        // Apply price filter only if relevant price exists
        if (price !== null && price !== undefined && (price < filters.priceRange[0] || price > filters.priceRange[1])) {
           return false;
        }
        // If filtering by 'buy' or 'all' but only rental price exists, it shouldn't match unless price is 0
        if ((filters.mode === 'buy' || filters.mode === 'all') && game.price === undefined && (game.rentalPrice !== undefined && game.rentalPrice !== null) && filters.priceRange[0] > 0) {
            return false;
        }
        // If filtering by 'rent' but only buy price exists...
         if (filters.mode === 'rent' && game.rentalPrice === undefined && (game.price !== undefined && game.price !== null) && filters.priceRange[0] > 0) {
            return false;
        }
      }

      return true;
    });
  }, [searchTerm, activeTab, filters, mockGames]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);

  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredGames.slice(startIndex, endIndex);
  }, [filteredGames, currentPage]);
  // --- Filtering and Pagination Logic --- END

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} showSidebarToggle={true} />

      <div className="flex flex-1 container max-w-full px-0"> {/* Full width container for sidebar layout */}
        {/* Sidebar */} 
        <div className={cn(
            'fixed inset-y-0 left-0 z-30 h-screen transition-transform duration-300 ease-in-out md:sticky md:top-16 md:!transform-none md:block md:shrink-0 md:h-[calc(100vh-4rem)]', // 4rem = header height (h-16)
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
            <GameFilterSidebar
                genres={mockGenres}
                platforms={mockPlatforms}
                initialFilters={filters}
                onFilterChange={handleFilterChange}
                className="h-full border-r border-border shadow-md md:shadow-none"
            />
        </div>

         {/* Mobile Overlay */} 
         {isSidebarOpen && (
             <div
                onClick={toggleSidebar}
                className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm md:hidden"
                aria-hidden="true"
            />
         )}

        {/* Main Content Area */} 
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Top Controls: Search and View Toggle */} 
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <GameSearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                className="w-full md:max-w-md lg:max-w-lg"
              />
              <ViewModeToggle
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
              />
            </div>

            {/* Tabs */} 
            <CatalogTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              className="mb-6"
            />

            {/* Featured Section */} 
            <FeaturedGamesSection games={mockFeaturedGames} className="mb-8 md:mb-12" />

            {/* Game Grid / Carousel */} 
            <GameCardGrid
              games={paginatedGames}
              viewMode={viewMode}
              onBuyClick={handleBuyClick}
              onRentClick={handleRentClick}
              onViewDetailsClick={handleViewDetailsClick}
            />

            {/* Pagination */} 
            <CatalogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={filteredGames.length}
              className="mt-8 md:mt-12"
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default GamesCatalogPage;
