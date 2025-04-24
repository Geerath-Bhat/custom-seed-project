import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Game {
  id: string | number;
  title: string;
  imageUrl: string;
  details: string;
  status?: 'NEW' | 'RENTAL';
  link?: string;
}

interface FeaturedGamesCarouselProps {
  games: Game[];
}

const FeaturedGamesCarousel: React.FC<FeaturedGamesCarouselProps> = ({ games }) => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-heading mb-8 text-center">Featured Games</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {games.map((game, index) => (
              <CarouselItem key={game.id} className="md:basis-1/2 lg:basis-1/3 pl-4 stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-1">
                  <Card className="overflow-hidden card-hover-basic h-full flex flex-col bg-card border-border">
                    <CardHeader className="p-0 relative">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </AspectRatio>
                      {game.status && (
                        <Badge
                          variant={game.status === 'NEW' ? 'default' : 'secondary'}
                          className={`absolute top-2 right-2 ${game.status === 'NEW' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}
                        >
                          {game.status}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <CardTitle className="text-lg font-heading mb-2 line-clamp-1">{game.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{game.details}</p>
                      {game.link && (
                        <a href={game.link} className="text-sm text-primary hover:underline mt-2 self-start">
                          Learn More
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex bg-card text-foreground border-border hover:bg-muted" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex bg-card text-foreground border-border hover:bg-muted" />
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedGamesCarousel;
