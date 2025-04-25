import React from 'react';
import { Badge } from '@/components/ui/badge'; // Assuming Shadcn Badge component

interface PriceAvailabilityDisplayProps {
  basePrice: number;
  discount?: number; // Amount of discount
  currency?: string;
  isAvailable: boolean;
  selectedDates?: { from?: Date; to?: Date }; // Optional: Show 'for selected dates' text
  guestCount?: number; // Optional: Show context
  roomType?: string; // Optional: Show context
}

const PriceAvailabilityDisplay: React.FC<PriceAvailabilityDisplayProps> = ({
  basePrice,
  discount = 0,
  currency = 'USD',
  isAvailable,
  selectedDates,
  guestCount,
  roomType,
}) => {
  const finalPrice = basePrice - discount;
  const hasSelection = selectedDates?.from && selectedDates?.to && guestCount && roomType;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  return (
    <div className="p-4 border rounded-lg bg-card animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{formatCurrency(finalPrice)}</span>
          {discount > 0 && (
            <span className="text-sm line-through text-muted-foreground">
              {formatCurrency(basePrice)}
            </span>
          )}
          <span className="text-sm text-muted-foreground">per night</span>
        </div>
        {isAvailable ? (
          <Badge variant="default" className="bg-success hover:bg-success text-success-foreground w-fit">
            Available
          </Badge>
        ) : (
          <Badge variant="destructive" className="w-fit">Not Available</Badge>
        )}
      </div>
      {hasSelection && (
         <p className="text-xs text-muted-foreground mt-2">
           Price based on selected dates, {guestCount} guest(s), and {roomType} room.
         </p>
      )}
      {!isAvailable && hasSelection && (
        <p className="text-xs text-destructive mt-1">Try different dates or options.</p>
      )}
       {discount > 0 && (
          <p className="text-xs text-success mt-1">Discount applied!</p>
      )}
    </div>
  );
};

export default PriceAvailabilityDisplay;
