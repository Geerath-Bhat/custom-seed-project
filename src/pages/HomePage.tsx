import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import UI Components for the Homepage
import DestinationSearchBar from '@/components/homepage_destination_discovery/DestinationSearchBar';
import TrendingDestinationsCarousel from '@/components/homepage_destination_discovery/TrendingDestinationsCarousel';
import FeaturedDestinationGrid from '@/components/homepage_destination_discovery/FeaturedDestinationGrid';
import JourneyPreviewCarousel from '@/components/homepage_destination_discovery/JourneyPreviewCarousel';
import GroupDealsSection from '@/components/homepage_destination_discovery/GroupDealsSection';
import PlanTripCtaButton from '@/components/homepage_destination_discovery/PlanTripCtaButton';
import OffersBanner from '@/components/homepage_destination_discovery/OffersBanner';
import DestinationFilterGroup from '@/components/homepage_destination_discovery/DestinationFilterGroup';
import IntroductoryTextBlock from '@/components/homepage_destination_discovery/IntroductoryTextBlock';

// Placeholder Data for UI Components

// Data for Introductory Text Block (ID: 9)
const introHeadline = "Discover Exotic India";
const introTagline = "Like Never Before.";

// Data for Offers Banner (ID: 7)
const mockOffers = [
  { id: 'offer1', text: 'Early Bird Special: 10% off all Kerala backwater tours booked this month!', link: '/offers/kerala-early' },
  { id: 'offer2', text: 'Group Discount: Save 15% on Ladakh adventures for groups of 6+.', link: '/group' },
];

// Data for Search Bar (ID: 1) - Primarily handles interaction via callback
const handleSearch = (query: string) => {
  console.log('Search initiated for:', query);
  // In a real app, navigate to a search results page or update state
};

// Data for Filter Group (ID: 8) - Using component defaults for available filters, providing callback
const handleFilterChange = (filters: any) => {
  console.log('Filters updated:', filters);
  // Apply filters to relevant components (e.g., carousels, grids)
};

// Data for Trending Destinations Carousel (ID: 2)
const mockTrendingDestinations = [
  { id: 'trend1', name: 'Majuli Island, Assam', imageUrl: '/placeholder-majuli.jpg', description: 'World\'s largest river island, unique culture.' },
  { id: 'trend2', name: 'Valley of Flowers, Uttarakhand', imageUrl: '/placeholder-valleyofflowers.jpg', description: 'Alpine meadows vibrant with flora.' },
  { id: 'trend3', name: 'Rann of Kutch, Gujarat', imageUrl: '/placeholder-kutch.jpg', description: 'Vast salt marsh, stunning sunsets.' },
  { id: 'trend4', name: 'Gokarna Beaches, Karnataka', imageUrl: '/placeholder-gokarna.jpg', description: 'Laid-back beaches, spiritual vibe.' },
  { id: 'trend5', name: 'Ziro Valley, Arunachal', imageUrl: '/placeholder-ziro.jpg', description: 'Lush landscapes, home to Apatani tribe.' },
];

// Data for Featured Destination Grid (ID: 3)
const mockFeaturedDestinations = [
  { id: 'feat1', name: 'Andaman Islands', imageUrl: '/placeholder-andaman.jpg', summary: 'Pristine beaches, clear waters, coral reefs.', tags: ['Popular', 'Beach', 'Water Sports'] },
  { id: 'feat2', name: 'Spiti Valley', imageUrl: '/placeholder-spiti.jpg', summary: 'Remote monasteries, stark mountains, adventure.', tags: ['Adventure', 'Exclusive', 'Mountains'] },
  { id: 'feat3', name: 'Hampi Ruins', imageUrl: '/placeholder-hampi.jpg', summary: 'Explore ancient temples and unique boulder landscapes.', tags: ['History', 'Unique', 'Culture'] },
  { id: 'feat4', name: 'Sundarbans Mangroves', imageUrl: '/placeholder-sundarbans.jpg', summary: 'Home of the Royal Bengal Tiger, dense mangrove forest.', tags: ['Wildlife', 'Nature', 'Boating'] },
];

// Data for Journey Preview Carousel (ID: 4)
const mockJourneys = [
  { id: 'journey1', title: 'Kerala Backwaters Sojourn', theme: 'Relaxation', imageUrl: '/placeholder-journey-kerala.jpg', highlights: ['Houseboat Stay', 'Village Life', 'Ayurvedic Spa'] },
  { id: 'journey2', title: 'Himalayan Heights Trek', theme: 'Adventure', imageUrl: '/placeholder-journey-himachal.jpg', highlights: ['High-Altitude Trekking', 'Monastery Visits', 'Panoramic Views'] },
  { id: 'journey3', title: 'Rajasthan Royal Route', theme: 'Culture', imageUrl: '/placeholder-journey-rajasthan.jpg', highlights: ['Explore Forts & Palaces', 'Camel Safari', 'Cultural Shows'] },
  { id: 'journey4', title: 'Goan Coastal Escape', theme: 'Beach & Party', imageUrl: '/placeholder-journey-goa.jpg', highlights: ['Beach Hopping', 'Water Sports', 'Vibrant Nightlife'] },
];

// Data for Group Deals Section (ID: 5)
const mockGroupDeals = [
  { id: 'deal1', title: 'Golden Triangle Group Tour', destination: 'Delhi-Agra-Jaipur', discount: '10% Off for 4+', minGroupSize: 4, validUntil: 'Ends Oct 31st' },
  { id: 'deal2', title: 'South India Cultural Trip', destination: 'Tamil Nadu & Kerala', discount: 'Book 8, Pay for 7', minGroupSize: 8 },
];

// Data for Plan Trip CTA Button (ID: 6) - Primarily handles interaction via callback
const handlePlanTripClick = () => {
  console.log('Navigating to Plan Your Trip page...');
  // Use react-router-dom navigate function here, e.g., navigate('/plan-trip');
};

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Render UI components in the specified order */}

        {/* 9. Introductory Text Block */}
        <IntroductoryTextBlock headline={introHeadline} tagline={introTagline} />

        {/* 7. Offers Banner */}
        <OffersBanner offers={mockOffers} variant="inline-section" />

        {/* 1. Search Bar */}
        <DestinationSearchBar onSearch={handleSearch} />

        {/* 8. Filter Group */}
        <DestinationFilterGroup onFilterChange={handleFilterChange} /* Uses default availableFilters */ availableFilters={{
          themes: [],
          locations: [],
          tripTypes: [],
          durations: [],
          sortOptions: []
        }} /* Uses default availableFilters */ />

        {/* 2. Trending Destinations Carousel (3-D) */}
        <TrendingDestinationsCarousel destinations={mockTrendingDestinations} />

        {/* 3. Featured Destination Grid */}
        <FeaturedDestinationGrid destinations={mockFeaturedDestinations} />

        {/* 4. Journey Preview Carousel */}
        <JourneyPreviewCarousel journeys={mockJourneys} />

        {/* 5. Group Deals Section Card */}
        <GroupDealsSection deals={mockGroupDeals} />

        {/* 6. Plan Your Trip CTA Button */}
        <PlanTripCtaButton onClick={handlePlanTripClick} />

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
