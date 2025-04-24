import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShopAddressCard from '@/components/shop_information_booking_page/ShopAddressCard';
import ShopLocationMap from '@/components/shop_information_booking_page/ShopLocationMap';
import ShopImageGallery from '@/components/shop_information_booking_page/ShopImageGallery';
import ShopOpeningHours from '@/components/shop_information_booking_page/ShopOpeningHours';
import ShopFacilitiesList from '@/components/shop_information_booking_page/ShopFacilitiesList';
import ShopEventsPromotions from '@/components/shop_information_booking_page/ShopEventsPromotions';
import ShopBookingForm from '@/components/shop_information_booking_page/ShopBookingForm';
import CustomerSupportLinks from '@/components/shop_information_booking_page/CustomerSupportLinks';
import ShopInfoSection from '@/components/shop_information_booking_page/ShopInfoSection';
import CommunityActivitiesPanel from '@/components/shop_information_booking_page/CommunityActivitiesPanel';
import ThematicVisualOverlay from '@/components/shop_information_booking_page/ThematicVisualOverlay';

// Placeholder data (Many components have defaults, but we can define specifics if needed)

// Example: Customizing Address Details (if defaults aren't sufficient)
const shopAddressData = {
  addressLine1: 'Iron Man Game Central',
  addressLine2: '1 Avengers Way, Suite 101',
  city: 'New York',
  postalCode: '10001',
  country: 'USA',
  phone: '+1 (212) 555-GAME',
  email: 'visit@ironmangames.com',
  directionsLink: 'https://maps.google.com/?q=Avengers+Tower+New+York',
};

// Example: Holiday Info for Opening Hours
const holidayInfo = 'Closed on major holidays. Special hours for New Year\'s Eve: 10 AM - 6 PM.';

// Example: Function to handle booking form submission
const handleBookingSubmit = (data: any) => {
  console.log('Booking Request Received:', data);
  // In a real app, you would send this data to a backend API
  alert('Booking request submitted! We will contact you shortly.');
};

// Other components use default data defined within them, but you could override here:
// const customImages = [...];
// const customFacilities = [...];
// const customEvents = [...];
// const customSupportLinks = {...};
// const customInfoItems = [...];
// const customCommunityData = {...};

const ShopInformationBookingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ThematicVisualOverlay /> {/* Render theme overlay; likely uses fixed positioning */}
      <Header />

      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title/Intro (Optional, based on design) */}
        <h1 className="text-3xl font-heading font-bold mb-8 text-center text-primary">Iron Man Gaming Shop</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Explore our state-of-the-art gaming facility! Find our location, check opening hours, see what we offer, and book your visit.
        </p>

        <div className="space-y-12 md:space-y-16">
          {/* Section 1: Location & Map (Grid Layout) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              {/* Component ID: 1 - Address Card */}
              <ShopAddressCard {...shopAddressData} />
            </div>
            <div className="md:col-span-2">
              {/* Component ID: 2 - Embedded Map */}
              <ShopLocationMap />
            </div>
          </section>

          {/* Section 2: Gallery */}
          <section>
            {/* Component ID: 3 - Gallery/Carousel */}
            <ShopImageGallery /* images={customImages} */ />
          </section>

          {/* Section 3: Core Info (Grid Layout) */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {/* Component ID: 4 - Opening Hours Panel */}
              <ShopOpeningHours holidayInfo={holidayInfo} />
            </div>
            <div>
              {/* Component ID: 5 - Facilities List */}
              <ShopFacilitiesList /* facilities={customFacilities} */ />
            </div>
          </section>

          {/* Section 4: Events & Promotions */}
          <section>
            {/* Component ID: 6 - Events/Promotions Highlights Card Group */}
            <ShopEventsPromotions /* items={customEvents} */ />
          </section>

          {/* Section 5: Booking & Support */}
          <section id="booking-form" className="scroll-mt-20">
             <h2 className="text-2xl font-heading font-bold mb-6 text-center">Plan Your Visit</h2>
            {/* Component ID: 7 - Call-to-Action Form */}
            <ShopBookingForm onSubmit={handleBookingSubmit} />
            {/* Component ID: 8 - Customer Support Links */}
            <CustomerSupportLinks /* {...customSupportLinks} */ />
          </section>

          {/* Section 6: Additional Information (Grid Layout) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                {/* Component ID: 9 - Policies & Amenities Section */}
                <ShopInfoSection /* items={customInfoItems} */ />
             </div>
             <div>
                {/* Component ID: 10 - Community Activities Panel */}
                <CommunityActivitiesPanel /* {...customCommunityData} */ />
             </div>
          </section>

          {/* Component ID: 11 - Thematic Visual Overlay is rendered at the top level */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopInformationBookingPage;
