import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Users, Send } from 'lucide-react';

interface ActionButtonsProps {
  isInWishlist?: boolean;
  onToggleWishlist?: () => void;
  onBookNow?: () => void;
  onStartGroupPlanning?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isInWishlist = false,
  onToggleWishlist,
  onBookNow,
  onStartGroupPlanning,
}) => {
  return (
    <div className="flex flex-wrap gap-2 sticky top-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-lg justify-center sm:justify-start glass-effect">
      {onToggleWishlist && (
        <Button variant={isInWishlist ? "secondary" : "outline"} onClick={onToggleWishlist} className="flex-grow sm:flex-grow-0">
          <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-destructive text-destructive' : ''}`} />
          {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </Button>
      )}
      {onBookNow && (
        <Button onClick={onBookNow} className="flex-grow sm:flex-grow-0 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Send className="h-4 w-4 mr-2" />
          Book Now
        </Button>
      )}
      {onStartGroupPlanning && (
        <Button variant="outline" onClick={onStartGroupPlanning} className="flex-grow sm:flex-grow-0">
          <Users className="h-4 w-4 mr-2" />
          Start Group Planning
        </Button>
      )}
       {/* Optional Share Button */}
        {/* <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
        </Button> */} 
    </div>
  );
};

export default ActionButtons;
