import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, BedDouble, DollarSign } from 'lucide-react';
// import Image from 'next/image'; // Or use standard <img> if not using Next.js

interface Accommodation {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  pricePerNight: number;
  currency?: string;
  location?: string;
  type?: string; // e.g., Hotel, Hostel, Apartment
  detailsUrl?: string;
}

interface AccommodationListProps {
  accommodations: Accommodation[];
  onViewDetails?: (id: string) => void;
}

// Internal component for rendering a single accommodation card
const AccommodationCard: React.FC<{ accommodation: Accommodation; onViewDetails?: (id: string) => void }> = ({ accommodation, onViewDetails }) => {
  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
  };

  return (
    <Card className="overflow-hidden shadow-sm border border-border bg-card flex flex-col sm:flex-row card-hover-basic hover:shadow-md">
      <div className="relative w-full h-48 sm:w-1/3 sm:h-auto flex-shrink-0">
        {/* Use Next.js Image or standard img */}
        <img src={accommodation.imageUrl} alt={accommodation.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <CardContent className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{accommodation.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
            <span className="flex items-center font-medium text-amber-500">
              <Star className="h-4 w-4 mr-1 fill-current" /> {accommodation.rating.toFixed(1)}
            </span>
            {accommodation.type && (
              <span className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1" /> {accommodation.type}
              </span>
            )}
          </div>
          {accommodation.location && (
            <p className="text-xs text-muted-foreground flex items-center mb-3">
              <MapPin className="h-3 w-3 mr-1" /> {accommodation.location}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-semibold text-primary">
            {formatCurrency(accommodation.pricePerNight, accommodation.currency)}
            <span className="text-xs font-normal text-muted-foreground"> / night</span>
          </p>
          {onViewDetails && (
             <Button variant="outline" size="sm" onClick={() => onViewDetails(accommodation.id)}>
                View Details
             </Button>
          )}
           {/* Or Link to detailsUrl if provided */}
           {accommodation.detailsUrl && !onViewDetails && (
             <Button asChild variant="outline" size="sm">
                <a href={accommodation.detailsUrl} target="_blank" rel="noopener noreferrer">View Details</a>
             </Button>
           )}
        </div>
      </CardContent>
    </Card>
  );
};

const AccommodationList: React.FC<AccommodationListProps> = ({ accommodations = [], onViewDetails }) => {
  return (
    <div className="space-y-4">
      {accommodations.length === 0 ? (
        <div className="text-center py-8 px-4 bg-muted rounded-lg">
          <p className="text-muted-foreground">No accommodations found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 stagger-container">
          {accommodations.map((acc) => (
             <div key={acc.id} className="stagger-item">
                <AccommodationCard accommodation={acc} onViewDetails={onViewDetails} />
             </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccommodationList;
