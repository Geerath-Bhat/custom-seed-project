import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Megaphone, ArrowRight } from 'lucide-react'; // Example icons

interface Offer {
  id: string;
  text: string;
  link?: string;
}

interface OffersBannerProps {
  offers: Offer[];
  // Variant could control appearance (e.g., 'top-strip', 'inline-section')
  variant?: 'top-strip' | 'inline-section'; 
}

const OffersBanner: React.FC<OffersBannerProps> = ({ offers = [], variant = 'inline-section' }) => {
  // Placeholder data if none provided
  const defaultOffers: Offer[] = [
    { id: 'o1', text: 'Flash Sale! Up to 30% off on selected Rajasthan tours. Ends Soon!', link: '/offers/flash-sale' },
    { id: 'o2', text: 'Group Booking Special: Get an extra 5% discount for groups of 10+.', link: '/group-bookings' },
  ];

  const displayOffers = offers.length > 0 ? offers : defaultOffers;

  if (displayOffers.length === 0) {
    return null; // Don't render if no offers
  }

  const currentOffer = displayOffers[0]; // Simple logic to display one offer, could be a carousel

  const bannerClasses = {
    'top-strip': 'w-full p-2 bg-accent text-accent-foreground text-sm font-medium text-center flex items-center justify-center space-x-2 shadow-md animate-fade-in',
    'inline-section': 'container mx-auto px-4 py-4 my-6 bg-gradient-to-r from-accent/80 to-primary/80 text-primary-foreground rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between animate-fade-in',
  }[variant];

  const icon = variant === 'top-strip' ? <Megaphone className="h-4 w-4" /> : <AlertCircle className="h-6 w-6 mb-2 sm:mb-0 sm:mr-3" />;
  const textClass = variant === 'top-strip' ? '' : 'text-center sm:text-left flex-grow mb-2 sm:mb-0';
  const buttonVariant = variant === 'top-strip' ? 'link' : 'secondary';
  const buttonSize = variant === 'top-strip' ? 'sm' : 'default';
  const buttonClass = variant === 'top-strip' ? 'text-accent-foreground hover:underline p-0 h-auto' : 'bg-white/20 hover:bg-white/30 text-white';

  return (
    <div className={bannerClasses}>
      {icon}
      <p className={textClass}>{currentOffer.text}</p>
      {currentOffer.link && (
        <Button 
          variant={buttonVariant}
          size={buttonSize}
          className={buttonClass} 
          onClick={() => console.log(`Navigate to ${currentOffer.link}`)} // Replace with actual navigation
        >
          Explore Offers <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      )}
      {/* Could add a close button if needed */} 
    </div>
  );
};

export default OffersBanner;
