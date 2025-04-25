import React, { useState, useCallback } from 'react';
import Header from '@/components/layout/Header';
import BodySidebar from '@/components/layout/BodySidebar';
import Footer from '@/components/layout/Footer';

// Import UI Components for the main content area
import ImageGallery from '@/components/destination_detail_itinerary_page/ImageGallery';
import DestinationProfileCard from '@/components/destination_detail_itinerary_page/DestinationProfileCard';
import DescriptiveTextBlock from '@/components/destination_detail_itinerary_page/DescriptiveTextBlock';
import InteractiveMap from '@/components/destination_detail_itinerary_page/InteractiveMap';
import ItineraryStepper from '@/components/destination_detail_itinerary_page/ItineraryStepper';
import CostOverview from '@/components/destination_detail_itinerary_page/CostOverview';
import AiSuggestionPanel from '@/components/destination_detail_itinerary_page/AiSuggestionPanel';
import AccommodationList from '@/components/destination_detail_itinerary_page/AccommodationList';
import AccommodationFilterGroup, { Filters as AccommodationFiltersType } from '@/components/destination_detail_itinerary_page/AccommodationFilterGroup';
import ActionButtons from '@/components/destination_detail_itinerary_page/ActionButtons';
import GroupInviteModal from '@/components/destination_detail_itinerary_page/GroupInviteModal';

// Placeholder Data Generation

// 1. Image Gallery Data
const mockImages = [
  { src: 'https://via.placeholder.com/1200x600/0000FF/808080?text=Destination+View+1', alt: 'Scenic view of the destination' },
  { src: 'https://via.placeholder.com/1200x600/FF0000/FFFFFF?text=Attraction+Highlight', alt: 'Highlight attraction' },
  { src: 'https://via.placeholder.com/1200x600/00FF00/000000?text=Local+Culture', alt: 'Local cultural experience' },
];
const mockDestinationName = 'Paris, France';

// 2. Destination Profile Card Data
const mockDestinationProfile = {
  name: 'Paris, France',
  location: 'Western Europe',
  description: 'The City of Light, renowned for its art, fashion, gastronomy, and culture. Iconic landmarks include the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.',
  keyAttractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Arc de Triomphe'],
  bestSeasons: ['Spring (Apr-Jun)', 'Fall (Sep-Oct)'],
  featuredHighlights: [
    'World-class museums and art galleries.',
    'Romantic Seine River cruises.',
    'Charming neighborhoods like Montmartre.',
    'Exquisite French cuisine and patisseries.',
  ],
};

// 3. Descriptive Text Block Data
const mockDescriptiveContent = `
  <p>Paris's history stretches back over 2,000 years. From its origins as a Roman town to its role as the epicenter of the French Revolution and the Belle Époque, the city has shaped global culture.</p>
  <p>Explore the Marais district's historic architecture, wander through the Latin Quarter's intellectual haunts, or simply enjoy a coffee at a sidewalk café, soaking in the unique Parisian atmosphere. Each arrondissement offers a distinct flavor and experience.</p>
  <strong>Cultural Etiquette:</strong> Saying <em>"Bonjour"</em> (Hello) and <em>"Merci"</em> (Thank you) is customary when entering shops or interacting with locals.
`;

// 4. Interactive Map Data (Placeholder - requires library integration)
const mockRouteData = [
  {
    id: 'route1',
    stops: [
      { id: 'stop1', name: 'Eiffel Tower', coordinates: [2.2945, 48.8584] as [number, number] },
      { id: 'stop2', name: 'Louvre Museum', coordinates: [2.3376, 48.8606] as [number, number] },
    ],
  },
];

// 5. Itinerary Stepper Data
const mockItinerary = [
  {
    day: 1,
    title: 'Arrival & Iconic Landmarks',
    activities: [
      { id: 'act1', name: 'Arrive in Paris & Check-in', description: 'Settle into your accommodation.', time: 'Afternoon', location: 'Hotel', cost: 0, isCustomizable: false },
      { id: 'act2', name: 'Eiffel Tower Visit', description: 'Ascend the iconic tower for panoramic views.', time: 'Evening', location: 'Champ de Mars', cost: 25, isCustomizable: true },
      { id: 'act3', name: 'Seine River Cruise', description: 'Enjoy a relaxing cruise.', time: 'Night', location: 'Seine River', cost: 15, isCustomizable: true },
    ],
  },
  {
    day: 2,
    title: 'Art, History & Montmartre Charm',
    activities: [
      { id: 'act4', name: 'Louvre Museum Tour', description: 'Explore world-famous art collections.', time: 'Morning', location: 'Louvre', cost: 17, isCustomizable: true },
      { id: 'act5', name: 'Walk through Tuileries Garden', description: 'Stroll towards Place de la Concorde.', time: 'Afternoon', location: 'Tuileries Garden', cost: 0, isCustomizable: false },
      { id: 'act6', name: 'Explore Montmartre & Sacré-Cœur', description: 'Visit the artists\' square and basilica.', time: 'Late Afternoon', location: 'Montmartre', cost: 5, isCustomizable: true },
    ],
  },
];

// 7. Cost Overview Data
const mockTotalCost = 1250;
const mockCostBreakdown = {
  accommodation: 600,
  activities: 150,
  food: 350,
  transport: 150,
};

// 8. AI Suggestion Panel Data
const mockSuggestions = [
  { id: 'sug1', type: 'activity' as const, title: 'Visit Musée d\'Orsay', description: 'Focuses on Impressionist art.', reason: 'Similar to Louvre interest' },
  { id: 'sug2', type: 'accommodation' as const, title: 'Hotel Le Littré', description: '4-star hotel near Montparnasse.', reason: 'Matches budget, good reviews' },
  { id: 'sug3', type: 'route' as const, title: 'Day trip to Versailles', description: 'Explore the grand palace.', reason: 'Popular excursion from Paris' },
];

// 9. Accommodation List Data
const mockAccommodations = [
  { id: 'acc1', name: 'Hotel Regina Louvre', imageUrl: 'https://via.placeholder.com/300x200/cccccc/000000?text=Hotel+Regina', rating: 4.8, pricePerNight: 450, currency: 'EUR', location: 'Opposite Louvre', type: 'Hotel', detailsUrl: '#' },
  { id: 'acc2', name: 'Generator Paris Hostel', imageUrl: 'https://via.placeholder.com/300x200/cccccc/000000?text=Generator+Hostel', rating: 4.2, pricePerNight: 40, currency: 'EUR', location: '10th Arrondissement', type: 'Hostel', detailsUrl: '#' },
  { id: 'acc3', name: 'Citadines Apart\'hotel Saint-Germain-des-Prés', imageUrl: 'https://via.placeholder.com/300x200/cccccc/000000?text=Citadines+Apart', rating: 4.5, pricePerNight: 220, currency: 'EUR', location: 'Saint-Germain', type: 'Apartment', detailsUrl: '#' },
];

// Component Definition

export default function DestinationDetailItineraryPage() {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [filters, setFilters] = useState<AccommodationFiltersType>({});
  const [currentItinerary, setCurrentItinerary] = useState(mockItinerary);
  const [currentSuggestions, setCurrentSuggestions] = useState(mockSuggestions);
  const [currentTotalCost, setCurrentTotalCost] = useState(mockTotalCost);
  const [currentCostBreakdown, setCurrentCostBreakdown] = useState(mockCostBreakdown);

  // Handler Functions (Placeholders)
  const handleToggleWishlist = useCallback(() => {
    setIsInWishlist(prev => !prev);
    console.log('Wishlist toggled');
    // Add logic to update backend/state
  }, []);

  const handleBookNow = useCallback(() => {
    console.log('Book Now clicked');
    // Add logic to navigate to booking page or process
  }, []);

  const handleStartGroupPlanning = useCallback(() => {
    console.log('Start Group Planning clicked');
    setIsInviteModalOpen(true);
  }, []);

  const handleInvite = useCallback((emails: string[], message?: string) => {
    console.log('Inviting emails:', emails, 'with message:', message);
    // Add logic to send invites
    setIsInviteModalOpen(false); // Close modal after sending
  }, []);

  const handleFilterChange = useCallback((newFilters: AccommodationFiltersType) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
    // Add logic to re-fetch or filter accommodations based on newFilters
  }, []);

  const handleResetFilters = useCallback(() => {
    console.log('Resetting filters');
    setFilters({});
     // Add logic to reset accommodation list
  }, []);

  const handleRemoveActivity = useCallback((day: number, activityId: string) => {
    console.log(`Removing activity ${activityId} from day ${day}`);
    setCurrentItinerary(prevItinerary => {
        // Recalculate cost/update state based on removal
        // This is a simplified example
        return prevItinerary.map(d => {
            if (d.day === day) {
                return { ...d, activities: d.activities.filter(a => a.id !== activityId) };
            }
            return d;
        });
    });
    // Update cost overview
    // setCurrentTotalCost(...);
    // setCurrentCostBreakdown(...);
  }, []);

  const handleAddSuggestion = useCallback((suggestion: typeof mockSuggestions[0]) => {
    console.log('Adding suggestion:', suggestion);
    // Logic to add suggestion to itinerary or handle differently based on type
    if (suggestion.type === 'activity') {
        // Example: Add to day 1 for simplicity
        const newActivity = { id: suggestion.id, name: suggestion.title, description: suggestion.description || '', time: 'TBD', location: 'Unknown', cost: 0, isCustomizable: true };
        setCurrentItinerary(prev => prev.map(d => d.day === 1 ? {...d, activities: [...d.activities, newActivity]} : d));
    }
    // Remove the suggestion from the list after adding
    setCurrentSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
     // Update cost overview
    // setCurrentTotalCost(...);
    // setCurrentCostBreakdown(...);
  }, []);

  // Filter accommodations based on state (simple example)
  const filteredAccommodations = mockAccommodations.filter(acc => {
    if (filters.budget && (acc.pricePerNight < filters.budget[0] || acc.pricePerNight > filters.budget[1])) return false;
    if (filters.rating && acc.rating < filters.rating) return false;
    if (filters.type && acc.type !== filters.type) return false;
    if (filters.amenities && filters.amenities.length > 0) {
      // Placeholder: Assume accommodation object has an 'amenities' array
      // const accAmenities = acc.amenities || [];
      // if (!filters.amenities.every(fa => accAmenities.includes(fa))) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Static Left Sidebar (as per layout key LSB(S)) */} 
        <BodySidebar className="w-64" />

        {/* Main Content Area (as per layout key B) */} 
        <main className="flex-1 lg:ml-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Column */} 
          <div className="lg:col-span-2 space-y-6">
            {/* Action Buttons (Component 11) */} 
            <ActionButtons
              isInWishlist={isInWishlist}
              onToggleWishlist={handleToggleWishlist}
              onBookNow={handleBookNow}
              onStartGroupPlanning={handleStartGroupPlanning}
            />

            {/* Image Gallery (Component 1) */} 
            <ImageGallery images={mockImages} destinationName={mockDestinationName} />

            {/* Destination Profile Card (Component 2) */} 
            <DestinationProfileCard destination={mockDestinationProfile} />

            {/* Descriptive Text Block (Component 3) */} 
            <DescriptiveTextBlock title="Discover More" content={mockDescriptiveContent} />

            {/* Interactive Map (Component 4) */} 
            <InteractiveMap routeData={mockRouteData} />

            {/* Itinerary Stepper (Component 5) - Includes Customization (Component 6 internally) */} 
             <h2 className="text-2xl font-semibold mt-8 mb-0">Proposed Itinerary</h2>
            <ItineraryStepper 
                itinerary={currentItinerary} 
                onRemoveActivity={handleRemoveActivity} 
                // onAddActivity could be implemented here or via AI panel
            />

            {/* Accommodation List Section Title */} 
            <h2 className="text-2xl font-semibold mt-8 mb-4">Accommodation Options</h2>
            
            {/* Accommodation List (Component 9) */} 
            <AccommodationList accommodations={filteredAccommodations} />

          </div>

          {/* Sidebar-like Column within Main Content */} 
          <div className="lg:col-span-1 space-y-6">
             {/* Accommodation Filter Group (Component 10) */} 
             <AccommodationFilterGroup 
                initialFilters={filters} 
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                // Pass available amenities/types/maxPrice if needed from real data
            />

             {/* Cost Overview (Component 7) */} 
             <CostOverview 
                totalCost={currentTotalCost} 
                breakdown={currentCostBreakdown} 
                currency="EUR"
            />

             {/* AI Suggestion Panel (Component 8) */} 
             <AiSuggestionPanel 
                suggestions={currentSuggestions} 
                onAddSuggestion={handleAddSuggestion} 
            />
          </div>

        </main>
      </div>
      <Footer />

      {/* Group Invite Modal (Component 12) - Rendered outside layout flow */} 
      <GroupInviteModal
        isOpen={isInviteModalOpen}
        onOpenChange={setIsInviteModalOpen}
        tripName={mockDestinationName}
        onInvite={handleInvite}
      />
    </div>
  );
}
