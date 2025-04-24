import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Gamepad2, Computer, Smartphone, ShoppingCart, Info } from 'lucide-react'; // Example platform icons

// Define platform types more robustly if needed
type Platform = 'pc' | 'playstation' | 'xbox' | 'switch' | 'mobile';

interface GameCardProps {
  game: {
    id: string | number;
    title: string;
    imageUrl: string;
    price?: number; // Optional price for 'buy'
    rentalPrice?: number; // Optional price for 'rent'
    platforms: Platform[];
    isNew?: boolean;
    isRentalAvailable?: boolean;
    isBuyAvailable?: boolean;
    shortDescription?: string;
  };
  onBuyClick?: (gameId: string | number) => void;
  onRentClick?: (gameId: string | number) => void;
  onViewDetailsClick: (gameId: string | number) => void;
  className?: string;
}

const PlatformIcon: React.FC<{ platform: Platform }> = ({ platform }) => {
  switch (platform) {
    case 'pc': return <Computer className="w-4 h-4 text-muted-foreground" title="PC" />;
    case 'playstation': return <Gamepad2 className="w-4 h-4 text-muted-foreground" title="PlayStation" />; // Use a better icon if available
    case 'xbox': return <Gamepad2 className="w-4 h-4 text-muted-foreground" title="Xbox" />; // Use a better icon if available
    case 'switch': return <Gamepad2 className="w-4 h-4 text-muted-foreground" title="Nintendo Switch" />; // Use a better icon if available
    case 'mobile': return <Smartphone className="w-4 h-4 text-muted-foreground" title="Mobile" />;
    default: return null;
  }
};

const GameCard: React.FC<GameCardProps> = ({
  game,
  onBuyClick,
  onRentClick,
  onViewDetailsClick,
  className = '',
}) => {
  const showPrice = game.price !== undefined && game.price !== null;
  const showRentalPrice = game.rentalPrice !== undefined && game.rentalPrice !== null;

  return (
    <Card className={`overflow-hidden flex flex-col h-full bg-card text-card-foreground border-border card-hover-basic group relative animate-scale-in ${className}`}>
       {/* Badge Overlays */} 
       <div className="absolute top-2 right-2 z-10 flex flex-col items-end space-y-1">
         {game.isNew && <Badge variant="destructive" className="animate-pulse-gentle">NEW</Badge>}
         {game.isRentalAvailable && <Badge variant="secondary">RENTAL</Badge>}
         {/* Add more badges as needed (e.g., 'ON SALE') */} 
       </div>

      <CardHeader className="p-0">
        <AspectRatio ratio={3 / 4}> {/* Common box art ratio */}
          <img
            src={game.imageUrl || '/placeholder-game-cover.jpg'} // Provide a placeholder
            alt={`${game.title} cover art`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold font-heading mb-1 truncate group-hover:text-primary transition-colors">
          {game.title}
        </CardTitle>
        {game.shortDescription && (
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {game.shortDescription}
            </p>
        )}
        <div className="flex items-center space-x-2 mb-3">
          {game.platforms.map((platform) => (
            <PlatformIcon key={platform} platform={platform} />
          ))}
        </div>
        <div className="flex items-baseline space-x-2">
             {showPrice && <span className="text-xl font-bold text-primary">${game.price?.toFixed(2)}</span>}
             {showRentalPrice && (
                <span className={`text-md font-semibold ${showPrice ? 'text-secondary' : 'text-primary'}`}>
                  ${game.rentalPrice?.toFixed(2)} <span className="text-xs text-muted-foreground">/ rent</span>
                </span>
             )}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <div className="flex-grow flex gap-2">
            {game.isBuyAvailable && onBuyClick && (
                <Button variant="default" size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => onBuyClick(game.id)}>
                    <ShoppingCart className="w-4 h-4 mr-1" /> Buy
                </Button>
            )}
            {game.isRentalAvailable && onRentClick && (
                <Button variant="secondary" size="sm" className="flex-1" onClick={() => onRentClick(game.id)}>
                     Rent
                </Button>
            )}
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => onViewDetailsClick(game.id)}>
            <Info className="w-4 h-4 mr-1 sm:mr-0" />
            <span className="sm:hidden ml-1">Details</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
