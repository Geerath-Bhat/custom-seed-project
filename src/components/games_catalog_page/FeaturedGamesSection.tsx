import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';

// Example Game Data Structure
interface FeaturedGame {
  id: string | number;
  title: string;
  imageUrl: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface FeaturedGamesSectionProps {
  games: FeaturedGame[];
  className?: string;
}

const FeaturedGamesSection: React.FC<FeaturedGamesSectionProps> = ({
  games = [], // Provide default empty array
  className = '',
}) => {
  if (!games || games.length === 0) {
    return null; // Don't render if no featured games
  }

  return (
    <section className={`w-full py-8 md:py-12 ${className}`} aria-labelledby="featured-games-heading">
      <h2 id="featured-games-heading" className="text-2xl md:text-3xl font-bold font-heading text-center mb-6 md:mb-8 text-gradient-primary">
        Featured Games
      </h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000, // Autoplay delay in ms
            stopOnInteraction: true,
          }),
        ]}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {games.map((game, index) => (
            <CarouselItem key={game.id} className="md:basis-1/2 lg:basis-1/3 animate-fade-in stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="overflow-hidden h-full card-hover-basic border-primary/30 shadow-lg shadow-primary/10 dark:shadow-primary/20 glass-effect">
                <CardContent className="p-0 flex flex-col">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={game.imageUrl || '/placeholder-game-banner.jpg'} // Placeholder image
                      alt={game.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold font-heading mb-2 truncate">{game.title}</h3>
                    {game.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                            {game.description}
                        </p>
                    )}
                    {game.ctaText && (
                        <Button
                            variant="default"
                            size="sm"
                            className="mt-auto w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            onClick={() => { /* Navigate to game.ctaLink or perform action */ }}
                        >
                           {game.ctaText}
                        </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-15px] top-1/2 -translate-y-1/2 hidden md:inline-flex bg-background/70 hover:bg-background border-primary text-primary hover:text-primary" />
        <CarouselNext className="absolute right-[-15px] top-1/2 -translate-y-1/2 hidden md:inline-flex bg-background/70 hover:bg-background border-primary text-primary hover:text-primary" />
      </Carousel>
    </section>
  );
};

export default FeaturedGamesSection;
