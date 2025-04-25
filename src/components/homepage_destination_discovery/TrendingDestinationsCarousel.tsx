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
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Placeholder data structure
interface Destination {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

interface TrendingDestinationsCarouselProps {
  destinations: Destination[];
}

const TrendingDestinationsCarousel: React.FC<TrendingDestinationsCarouselProps> = ({ destinations = [] }) => {
  // Placeholder data if none provided
  const defaultDestinations: Destination[] = [
    { id: '1', name: 'Kerala Backwaters', imageUrl: '/placeholder-kerala.jpg', description: 'Tranquil waterways and lush greenery.' },
    { id: '2', name: 'Ladakh Mountains', imageUrl: '/placeholder-ladakh.jpg', description: 'High-altitude desert landscapes.' },
    { id: '3', name: 'Rajasthan Palaces', imageUrl: '/placeholder-rajasthan.jpg', description: 'Royal heritage and vibrant culture.' },
    { id: '4', name: 'Goa Beaches', imageUrl: '/placeholder-goa.jpg', description: 'Sun, sand, and coastal charm.' },
    { id: '5', name: 'Varanasi Ghats', imageUrl: '/placeholder-varanasi.jpg', description: 'Spiritual heart of India.' },
  ];

  const displayDestinations = destinations.length > 0 ? destinations : defaultDestinations;

  return (
    <div className="w-full px-4 md:px-16 py-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Trending Destinations</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          // Add options for 3D effect if desired (might need custom styling or a different library)
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-4 py-4">
          {displayDestinations.map((destination, index) => (
            <CarouselItem key={destination.id} className="pl-4 md:basis-1/2 lg:basis-1/3 stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="p-1 h-full">
                <Card className="overflow-hidden h-full flex flex-col group card-hover-basic transform transition-transform duration-500 ease-out hover:scale-105">
                  <CardContent className="relative p-0 flex-grow aspect-[4/3]">
                    <img
                      src={destination.imageUrl} // Use placeholder image
                      alt={destination.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Add overlay for better text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-semibold mb-1 text-balance">{destination.name}</h3>
                        <p className="text-sm text-gray-200 text-pretty">{destination.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 bg-card border-t border-border/50">
                     <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto">View Details <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex bg-card/80 hover:bg-card border-border/50" />
        <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex bg-card/80 hover:bg-card border-border/50" />
      </Carousel>
    </div>
  );
};

export default TrendingDestinationsCarousel;
