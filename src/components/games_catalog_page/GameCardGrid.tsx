import React from 'react';
import GameCard from './GameCard'; // Assuming GameCard.tsx is in the same directory
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Same Game type as in GameCard for consistency
type Platform = 'pc' | 'playstation' | 'xbox' | 'switch' | 'mobile';
interface Game {
  id: string | number;
  title: string;
  imageUrl: string;
  price?: number;
  rentalPrice?: number;
  platforms: Platform[];
  isNew?: boolean;
  isRentalAvailable?: boolean;
  isBuyAvailable?: boolean;
  shortDescription?: string;
}

interface GameCardGridProps {
  games: Game[];
  viewMode: 'grid' | 'carousel';
  onBuyClick?: (gameId: string | number) => void;
  onRentClick?: (gameId: string | number) => void;
  onViewDetailsClick: (gameId: string | number) => void;
  className?: string;
}

const GameCardGrid: React.FC<GameCardGridProps> = ({
  games = [],
  viewMode,
  onBuyClick,
  onRentClick,
  onViewDetailsClick,
  className = '',
}) => {
  if (!games || games.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 text-muted-foreground ${className}`}>
        <p>No games found matching your criteria.</p>
      </div>
    );
  }

  if (viewMode === 'carousel') {
    return (
      <Carousel
        opts={{ align: 'start' }}
        className={`w-full ${className}`}
      >
        <CarouselContent className="-ml-4 stagger-container">
          {games.map((game, index) => (
            <CarouselItem key={game.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 stagger-item" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="h-full p-1">
                 <GameCard
                    game={game}
                    onBuyClick={onBuyClick}
                    onRentClick={onRentClick}
                    onViewDetailsClick={onViewDetailsClick}
                    className="h-full"
                 />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 bg-background/70 hover:bg-background border-primary text-primary hover:text-primary" />
        <CarouselNext className="mr-12 bg-background/70 hover:bg-background border-primary text-primary hover:text-primary" />
      </Carousel>
    );
  }

  // Default to Grid view
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 stagger-container ${className}`}>
      {games.map((game, index) => (
        <div key={game.id} className="stagger-item" style={{ animationDelay: `${index * 0.05}s` }}>
             <GameCard
                game={game}
                onBuyClick={onBuyClick}
                onRentClick={onRentClick}
                onViewDetailsClick={onViewDetailsClick}
                className="h-full"
             />
        </div>
      ))}
    </div>
  );
};

export default GameCardGrid;
