import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Users, Loader2 } from 'lucide-react';

interface BookingActionsProps {
  onBook: () => void;
  onSaveToWishlist: () => void;
  onAddToGroup: () => void;
  isBookingLoading?: boolean;
  isWishlistLoading?: boolean;
  isGroupLoading?: boolean;
  canBook?: boolean; // e.g., based on form validity or availability
}

const BookingActions: React.FC<BookingActionsProps> = ({
  onBook,
  onSaveToWishlist,
  onAddToGroup,
  isBookingLoading = false,
  isWishlistLoading = false,
  isGroupLoading = false,
  canBook = true,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
      <Button
        size="lg"
        className="w-full sm:flex-1" // Takes full width on small screens, distributes space on larger
        onClick={onBook}
        disabled={isBookingLoading || isWishlistLoading || isGroupLoading || !canBook}
      >
        {isBookingLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {isBookingLoading ? 'Processing...' : 'Book / Reserve Now'}
      </Button>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={onSaveToWishlist}
          disabled={isBookingLoading || isWishlistLoading || isGroupLoading}
          aria-label="Save to Wishlist"
        >
          {isWishlistLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
           <span className="ml-2 hidden sm:inline">Wishlist</span>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={onAddToGroup}
          disabled={isBookingLoading || isWishlistLoading || isGroupLoading}
           aria-label="Add to Group Itinerary"
        >
          {isGroupLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Users className="h-4 w-4" />
          )}
          <span className="ml-2 hidden sm:inline">Group</span>
        </Button>
      </div>
    </div>
  );
};

export default BookingActions;
