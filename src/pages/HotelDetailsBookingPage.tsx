import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to potentially use the hotel ID

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// UI Components for Hotel Details Page
import HotelImageGallery from '@/components/hotel_details_booking_page/HotelImageGallery';
import HotelPrimaryInfo from '@/components/hotel_details_booking_page/HotelPrimaryInfo';
import PriceAvailabilityDisplay from '@/components/hotel_details_booking_page/PriceAvailabilityDisplay';
import HotelAmenities from '@/components/hotel_details_booking_page/HotelAmenities';
import LocationMap from '@/components/hotel_details_booking_page/LocationMap';
import BookingOptionsForm from '@/components/hotel_details_booking_page/BookingOptionsForm';
import BookingCostSummary from '@/components/hotel_details_booking_page/BookingCostSummary';
import BookingFeedbackDisplay from '@/components/hotel_details_booking_page/BookingFeedbackDisplay';
import BookingActions from '@/components/hotel_details_booking_page/BookingActions';
import HotelReviews from '@/components/hotel_details_booking_page/HotelReviews';

// Placeholder Data
const mockHotelImages = [
  'https://via.placeholder.com/1200x600/0000FF/FFFFFF?text=Hotel+Facade',
  'https://via.placeholder.com/1200x600/FF0000/FFFFFF?text=Deluxe+Room',
  'https://via.placeholder.com/1200x600/00FF00/FFFFFF?text=Pool+Area',
  'https://via.placeholder.com/1200x600/FFFF00/000000?text=Restaurant',
  'https://via.placeholder.com/1200x600/FFA500/FFFFFF?text=Lobby',
];

const mockHotelInfo = {
  name: 'The Grand Coastal Resort',
  starRating: 5,
  averageRating: 4.7,
  reviewCount: 1258,
};

const mockPriceInfo = {
  basePrice: 250,
  discount: 25, // Example discount
  currency: 'USD',
  isAvailable: true,
};

const mockAmenities = [
  { iconName: 'Wifi', name: 'Free Wi-Fi' },
  { iconName: 'ParkingSquare', name: 'Valet Parking' },
  { iconName: 'UtensilsCrossed', name: 'On-site Restaurant' },
  { iconName: 'Dumbbell', name: 'Fitness Center' },
  { iconName: 'Waves', name: 'Outdoor Pool' },
  { iconName: 'ConciergeBell', name: 'Concierge Service' },
  { iconName: 'AirVent', name: 'Air Conditioning' },
  { iconName: 'Tv', name: 'Flat Screen TV' },
];

const mockLocation = {
  latitude: 34.0522,
  longitude: -118.2437, // Example coordinates (Los Angeles)
  hotelName: 'The Grand Coastal Resort',
};

const mockRoomTypes = [
  { value: 'standard', label: 'Standard Room' },
  { value: 'deluxe', label: 'Deluxe Room (Ocean View)' },
  { value: 'suite', label: 'Executive Suite' },
];

const mockCost = {
  subtotal: 450, // Example for 2 nights after discount
  taxes: 50,
  fees: 15,
  discountAmount: 50, // Total discount for 2 nights
  discountLabel: 'Early Bird Discount',
  total: 465,
  nights: 2,
};

const mockReviews = [
  {
    id: 'r1', author: 'Alice B.', avatarUrl: 'https://via.placeholder.com/40x40/avatar1', rating: 5,
    date: '2024-07-15T10:00:00Z', title: 'Absolutely Perfect!',
    text: 'From check-in to check-out, everything was flawless. The room was spacious and clean, the views were incredible, and the staff went above and beyond. Highly recommend!'
  },
  {
    id: 'r2', author: 'Charles D.', avatarUrl: 'https://via.placeholder.com/40x40/avatar2', rating: 4,
    date: '2024-07-10T14:30:00Z', title: 'Great Stay, Minor Issue',
    text: 'Loved the location and the amenities. The pool area was fantastic. Only minor issue was the Wi-Fi speed in the evenings, but overall a very enjoyable stay.'
  },
  {
    id: 'r3', author: 'Eva F.', avatarUrl: 'https://via.placeholder.com/40x40/avatar3', rating: 5,
    date: '2024-06-28T09:15:00Z', title: 'Family Vacation Heaven',
    text: 'We traveled with two young kids and this resort was perfect. Plenty of activities, kid-friendly dining options, and the staff were so accommodating. We will be back!'
  },
];

const HotelDetailsBookingPage: React.FC = () => {
  // const { id } = useParams(); // Get hotel ID from route, e.g., to fetch specific hotel data
  // console.log('Hotel ID:', id);

  // State for interactive elements (example)
  const [bookingData, setBookingData] = useState<any>(null); // Store form data
  const [feedback, setFeedback] = useState<{ message: string | null; type: 'error' | 'success' | 'info' | 'warning' }>({ message: null, type: 'info' });
  const [isLoading, setIsLoading] = useState(false);

  const handleBookingFormSubmit = (data: any) => {
    console.log('Booking Options Submitted:', data);
    setBookingData(data); // Update state with form selections
    // Simulate updating price or checking availability
    setFeedback({ message: 'Price updated based on your selection.', type: 'info' });
    // In a real app, you'd likely trigger an API call here
  };

  const handleBookNow = () => {
    if (!bookingData) {
      setFeedback({ message: 'Please select your booking options first.', type: 'warning' });
      return;
    }
    console.log('Attempting to book with data:', bookingData);
    setIsLoading(true);
    setFeedback({ message: null, type: 'info' }); // Clear previous feedback
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success or failure
      const success = Math.random() > 0.2; // 80% chance of success
      if (success) {
        setFeedback({ message: 'Booking confirmed! Check your email for details.', type: 'success' });
      } else {
        setFeedback({ message: 'Booking failed. Please try again or contact support.', type: 'error' });
      }
    }, 2000);
  };

  const handleSaveToWishlist = () => {
    console.log('Save to Wishlist clicked');
    // Add wishlist logic here (e.g., API call)
    setFeedback({ message: 'Hotel added to your wishlist!', type: 'success' });
    setTimeout(() => setFeedback({ message: null, type: 'info'}), 3000); // Clear after 3s
  };

  const handleAddToGroup = () => {
    console.log('Add to Group Itinerary clicked');
    // Add group itinerary logic here (e.g., API call)
     setFeedback({ message: 'Hotel added to group itinerary.', type: 'success' });
     setTimeout(() => setFeedback({ message: null, type: 'info'}), 3000); // Clear after 3s
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (or Main Content on smaller screens) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Component 1: Gallery */}
            <HotelImageGallery images={mockHotelImages} />

            {/* Component 2: Key Metric Display */}
            <HotelPrimaryInfo
              name={mockHotelInfo.name}
              starRating={mockHotelInfo.starRating}
              averageRating={mockHotelInfo.averageRating}
              reviewCount={mockHotelInfo.reviewCount}
            />

            {/* Component 4: Amenities List */}
            <HotelAmenities amenities={mockAmenities} />

            {/* Component 5: Embedded Map */}
            <LocationMap
              latitude={mockLocation.latitude}
              longitude={mockLocation.longitude}
              hotelName={mockLocation.hotelName}
            />

             {/* Component 10: Reviews & Ratings */}
            <HotelReviews
              reviews={mockReviews}
              averageRating={mockHotelInfo.averageRating}
              totalReviews={mockHotelInfo.reviewCount}
              // Add handlers for onLoadMore, onSortChange if implementing those features
            />

          </div>

          {/* Right Column (Booking/Actions - sticky potentially) */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start"> {/* sticky top matches header height + padding */}
            {/* Component 3: Price & Availability Tracker */}
            <PriceAvailabilityDisplay
              basePrice={mockPriceInfo.basePrice}
              discount={mockPriceInfo.discount}
              currency={mockPriceInfo.currency}
              isAvailable={mockPriceInfo.isAvailable}
              // Pass dynamic data based on form state if needed
              selectedDates={bookingData?.dates}
              guestCount={bookingData?.guests}
              roomType={bookingData?.roomType}
            />

            {/* Component 6: Booking Options Form */}
            <BookingOptionsForm
              onSubmit={handleBookingFormSubmit}
              availableRoomTypes={mockRoomTypes}
              isLoading={isLoading}
              // Provide default values or sync with state
            />

             {/* Component 7: Cost Summary - Conditionally render if booking data exists? */}
            {bookingData && (
                <BookingCostSummary
                  subtotal={mockCost.subtotal} // Should calculate dynamically based on bookingData
                  taxes={mockCost.taxes}
                  fees={mockCost.fees}
                  discountAmount={mockCost.discountAmount}
                  discountLabel={mockCost.discountLabel}
                  total={mockCost.total} // Should calculate dynamically
                  currency={mockPriceInfo.currency}
                  nights={mockCost.nights} // Should calculate dynamically
                />
            )}

            {/* Component 8: Validation & Feedback */}
            <BookingFeedbackDisplay
              message={feedback.message}
              type={feedback.type}
            />

            {/* Component 9: Button Group */}
            <BookingActions
              onBook={handleBookNow}
              onSaveToWishlist={handleSaveToWishlist}
              onAddToGroup={handleAddToGroup}
              isBookingLoading={isLoading}
              canBook={!!bookingData && mockPriceInfo.isAvailable} // Example condition
            />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HotelDetailsBookingPage;
