import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// UI Components for Game Detail Page
import GameImageBanner from '@/components/game_detail_page/GameImageBanner';
import GameStatusBadge from '@/components/game_detail_page/GameStatusBadge';
import GameDescription from '@/components/game_detail_page/GameDescription';
import PlatformList from '@/components/game_detail_page/PlatformList';
import PricingOptions from '@/components/game_detail_page/PricingOptions';
import ActionButtons from '@/components/game_detail_page/ActionButtons';
import RatingsSummary from '@/components/game_detail_page/RatingsSummary';
import UserReviewsSection from '@/components/game_detail_page/UserReviewsSection';
import ReviewSubmissionForm from '@/components/game_detail_page/ReviewSubmissionForm';
import RelatedGamesCarousel from '@/components/game_detail_page/RelatedGamesCarousel';

// Type Definitions (assuming these might not be exported from components)
type GameStatus = 'Owned' | 'Active Rental' | 'Rental Expired' | null;

interface PriceOption {
  type: 'buy' | 'rent';
  price: number;
  currency?: string;
  duration?: string; // e.g., '24h', '48h', '7 days'
}

interface Review {
  id: string | number;
  author: string;
  avatarUrl?: string;
  rating: number; // 1-5
  comment: string;
  timestamp: Date | string;
}

interface ReviewFormData {
  rating: number;
  comment: string;
}

interface RelatedGame {
  id: string | number;
  title: string;
  imageUrl: string;
  link: string; // Link to the game's detail page
}

// Placeholder Data Generation
const generateMockData = (gameId: string | undefined) => {

  const mockGameBannerData = {
    imageUrl: `https://picsum.photos/seed/${gameId || 'game'}/1200/500`,
    altText: `Game ${gameId} Banner`,
  };

  const mockGameStatus: GameStatus = Math.random() > 0.7 ? 'Owned' : (Math.random() > 0.4 ? 'Active Rental' : null);

  const mockGameDescriptionData = {
    title: `Awesome Iron Game ${gameId || ''}`.trim(),
    description: `Dive into the thrilling world of Awesome Iron Game ${gameId || ''}. Experience cutting-edge graphics, intense action, and a storyline deeply integrated with the Marvel universe. Take control of advanced tech and save the world! This description is detailed and engaging. `,
    thematicCopy: 'Featuring iconic Iron Man suits and tie-ins to major Stark Industries events. Prepare for a high-tech adventure like no other.',
  };

  const mockPlatformsData = ['pc', 'xbox', 'playstation'];

  const mockPricingOptionsData: PriceOption[] = [
    { type: 'buy', price: 59.99, currency: '$' },
    { type: 'rent', price: 4.99, currency: '$', duration: '24h' },
    { type: 'rent', price: 7.99, currency: '$', duration: '48h' },
    { type: 'rent', price: 14.99, currency: '$', duration: '7 days' },
  ];

  const mockRatingsData = {
    averageRating: 4.3,
    ratingCount: 285,
  };

  const mockReviewsData: Review[] = [
    {
      id: 1,
      author: 'HeroFan123',
      avatarUrl: 'https://i.pravatar.cc/150?u=herofan123',
      rating: 5,
      comment: 'Absolutely fantastic game! The Iron Man mechanics feel great and the story is top-notch.',
      timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    },
    {
      id: 2,
      author: 'GamerGirl_99',
      avatarUrl: 'https://i.pravatar.cc/150?u=gamergirl99',
      rating: 4,
      comment: 'Really enjoyed it, though some missions felt a bit repetitive. Graphics are stunning!',
      timestamp: new Date(Date.now() - 86400000 * 5), // 5 days ago
    },
    { 
      id: 3, 
      author: 'CasualPlayerX',
      rating: 4, 
      comment: 'Good fun for a weekend rental. Controls took a bit to get used to.',
      timestamp: new Date(Date.now() - 86400000 * 10) // 10 days ago 
    },
  ];

  const mockRelatedGamesData: RelatedGame[] = [
    { id: 'rg1', title: 'Marvel\'s Avengers', imageUrl: 'https://picsum.photos/seed/avengers/300/400', link: '#' },
    { id: 'rg2', title: 'Spider-Man Remastered', imageUrl: 'https://picsum.photos/seed/spiderman/300/400', link: '#' },
    { id: 'rg3', title: 'Guardians of the Galaxy', imageUrl: 'https://picsum.photos/seed/gotg/300/400', link: '#' },
    { id: 'rg4', title: 'Iron Man VR Experience', imageUrl: 'https://picsum.photos/seed/ironmanvr/300/400', link: '#' },
    { id: 'rg5', title: 'Mech Warrior 5', imageUrl: 'https://picsum.photos/seed/mech5/300/400', link: '#' },
  ];

  return {
    mockGameBannerData,
    mockGameStatus,
    mockGameDescriptionData,
    mockPlatformsData,
    mockPricingOptionsData,
    mockRatingsData,
    mockReviewsData,
    mockRelatedGamesData,
  };
};

const GameDetailPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [selectedPriceOption, setSelectedPriceOption] = useState<PriceOption | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Generate mock data based on gameId
  const {
    mockGameBannerData,
    mockGameStatus,
    mockGameDescriptionData,
    mockPlatformsData,
    mockPricingOptionsData,
    mockRatingsData,
    mockReviewsData,
    mockRelatedGamesData,
  } = generateMockData(gameId);

  const handleBuyClick = useCallback(() => {
    console.log('Buy clicked for game:', gameId);
    // Add to cart logic or navigate to checkout
    alert('Adding to cart (placeholder)');
  }, [gameId]);

  const handleRentClick = useCallback(() => {
    if (selectedPriceOption && selectedPriceOption.type === 'rent') {
      console.log('Rent clicked for game:', gameId, 'Option:', selectedPriceOption);
      // Add rental to cart or process rental
      alert(`Renting for ${selectedPriceOption.duration} at ${selectedPriceOption.currency}${selectedPriceOption.price} (placeholder)`);
    } else {
      console.warn('No rental option selected');
      alert('Please select a rental duration first.');
    }
  }, [gameId, selectedPriceOption]);

  const handleReviewSubmit = useCallback(async (data: ReviewFormData) => {
    console.log('Submitting review for game:', gameId, 'Data:', data);
    setIsSubmittingReview(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Review submitted successfully (mock)');
    alert('Review submitted! (placeholder)');
    setIsSubmittingReview(false);
    // Potentially refetch reviews or add the new review optimistically
  }, [gameId]);

  const buyOption = mockPricingOptionsData.find(opt => opt.type === 'buy');
  const canRent = mockPricingOptionsData.some(opt => opt.type === 'rent');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-8 animate-fade-in">
          <GameImageBanner {...mockGameBannerData} />
          {mockGameStatus && (
             <GameStatusBadge status={mockGameStatus} className="absolute top-6 right-6 z-10" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Left Column (or Top on Mobile) */}
          <div className="md:col-span-2 space-y-6">
            <GameDescription {...mockGameDescriptionData} className="animate-slide-up"/>
            <PlatformList platforms={mockPlatformsData} className="animate-slide-up stagger-item" />
          </div>

          {/* Right Column (or Bottom on Mobile) */}
          <div className="md:col-span-1 space-y-6">
             <PricingOptions
                 options={mockPricingOptionsData}
                 onSelectionChange={setSelectedPriceOption}
                 className="animate-slide-up stagger-item"
             />
             <ActionButtons
                canBuy={!!buyOption}
                buyPrice={buyOption?.price}
                canRent={canRent}
                selectedRentalOption={selectedPriceOption?.type === 'rent' ? { price: selectedPriceOption.price, duration: selectedPriceOption.duration || '' } : undefined}
                onBuyClick={handleBuyClick}
                onRentClick={handleRentClick}
                className="animate-slide-up stagger-item"
             />
             <RatingsSummary {...mockRatingsData} className="animate-slide-up stagger-item" />
          </div>
        </div>

        {/* Full Width Sections Below Grid */}
        <div className="space-y-12">
          <UserReviewsSection reviews={mockReviewsData} className="animate-slide-up stagger-item" />

          {/* Conditionally render Review Submission Form (e.g., based on auth status - mocked here) */}
          {mockGameStatus !== 'Owned' && mockGameStatus !== 'Active Rental' && (
              <ReviewSubmissionForm
                onSubmit={handleReviewSubmit}
                isSubmitting={isSubmittingReview}
                className="animate-slide-up stagger-item"
              />
          )}

          <RelatedGamesCarousel games={mockRelatedGamesData} className="animate-slide-up stagger-item" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GameDetailPage;
