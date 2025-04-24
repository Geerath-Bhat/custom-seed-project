import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay"; // Import autoplay plugin

interface RelatedGame {
  id: string | number;
  title: string;
  imageUrl: string;
  link: string; // Link to the game's detail page
}

interface RelatedGamesCarouselProps {
  games: RelatedGame[];
  title?: string;
  className?: string;
}

const RelatedGamesCarousel: React.FC<RelatedGamesCarouselProps> = ({ games = [], title = "Related Games", className }) => {
  if (!games || games.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <h2 className="text-2xl font-bold font-family-heading text-foreground">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
            Autoplay({
              delay: 5000, // Autoplay delay in ms
              stopOnInteraction: true,
            }),
          ]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {games.map((game) => (
            <CarouselItem key={game.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 animate-slide-up stagger-item">
              <Card className="overflow-hidden bg-card border-border card-hover-basic h-full flex flex-col">
                <CardContent className="p-0 flex flex-col flex-grow">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img src={game.imageUrl} alt={game.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <h3 className="font-semibold text-lg leading-tight mb-2 text-card-foreground truncate">{game.title}</h3>
                    {/* Assuming routing is handled elsewhere, potentially via react-router-dom Link */}
                    <Button variant="outline" size="sm" className="w-full mt-auto border-primary text-primary hover:bg-primary/10" asChild>
                      {/* Use an 'a' tag or Link component here */}
                      <a href={game.link}> 
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border-border text-foreground disabled:opacity-50" />
        <CarouselNext className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border-border text-foreground disabled:opacity-50" />
      </Carousel>
    </div>
  );
};

export default RelatedGamesCarousel;