import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI structure
import { Plus, Check, Minus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WatchlistActionButtonProps {
  stockTicker: string;
  isInWatchlist: boolean;
  isSignedIn: boolean; // To disable/hide if not logged in
  isLoading?: boolean; // To show loading state during API call
  onToggleWatchlist: (ticker: string, shouldAdd: boolean) => void; // Function to call on click
  className?: string;
}

const WatchlistActionButton: React.FC<WatchlistActionButtonProps> = ({ 
  stockTicker,
  isInWatchlist,
  isSignedIn,
  isLoading = false,
  onToggleWatchlist,
  className = ''
}) => {

  const handleClick = () => {
    if (!isLoading && isSignedIn) {
      onToggleWatchlist(stockTicker, !isInWatchlist);
    }
  };

  const buttonText = isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist';
  const Icon = isInWatchlist ? Minus : Plus;

  if (!isSignedIn) {
    // Optionally render a disabled button or hide it completely
    return (
      <Button 
        variant="outline" 
        className={cn('w-full md:w-auto', className)} 
        disabled
        title="Sign in to manage watchlist"
      >
         <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
      </Button>
    );
  }

  return (
    <Button 
      variant={isInWatchlist ? "secondary" : "default"} 
      className={cn('w-full md:w-auto', className)} 
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon className="mr-2 h-4 w-4" />
      )}
      {isLoading ? 'Processing...' : buttonText}
    </Button>
  );
};

export default WatchlistActionButton;
