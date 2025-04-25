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
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Eye } from 'lucide-react'; // Example icons

// Placeholder data structure
interface Journey {
  id: string;
  title: string;
  theme: string; // e.g., 'Backwaters Sojourn', 'Mountain Explorer'
  imageUrl: string;
  highlights: string[]; // Short list of highlights
}

interface JourneyPreviewCarouselProps {
  journeys: Journey[];
}

const JourneyPreviewCarousel: React.FC<JourneyPreviewCarouselProps> = ({ journeys = [] }) => {
  // Placeholder data if none provided
  const defaultJourneys: Journey[] = [
    { id: 'j1', title: 'Backwaters Sojourn', theme: 'Relaxation', imageUrl: '/placeholder-journey-kerala.jpg', highlights: ['Houseboat Stay', 'Village Life', 'Lush Scenery'] },
    { id: 'j2', title: 'Mountain Explorer', theme: 'Adventure', imageUrl: '/placeholder-journey-himachal.jpg', highlights: ['Trekking', 'Monasteries', 'Panoramic Views'] },
    { id: 'j3', title: 'Desert Kingdoms', theme: 'Culture', imageUrl: '/placeholder-journey-rajasthan.jpg', highlights: ['Forts & Palaces', 'Camel Safari', 'Local Markets'] },
    { id: 'j4', title: 'Coastal Wonders', theme: 'Beach', imageUrl: '/placeholder-journey-goa.jpg', highlights: ['Beach Hopping', 'Water Sports', 'Nightlife'] },
  ];

  const displayJourneys = journeys.length > 0 ? journeys : defaultJourneys;

  return (
    <div className="w-full bg-muted/50 dark:bg-muted/20 px-4 md:px-16 py-12 my-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Popular Journeys</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent className="-ml-4 py-4">
          {displayJourneys.map((journey, index) => (
            <CarouselItem key={journey.id} className="pl-4 md:basis-1/2 lg:basis-1/4 stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="p-1 h-full">
                <Card className="overflow-hidden h-full flex flex-col group card-hover-basic relative transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <CardContent className="relative p-0 flex-grow aspect-[3/4]">
                    <img
                      src={journey.imageUrl} // Use placeholder image
                      alt={journey.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-xl font-semibold mb-2 text-white text-balance">{journey.title}</h3>
                      <p className="text-sm font-medium text-primary-foreground/80 bg-primary/70 px-2 py-1 rounded inline-block self-start mb-2">{journey.theme}</p>
                      <ul className="text-xs text-gray-200 list-disc list-inside space-y-1 mb-4">
                        {journey.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                      {/* Quick View / Details Button */}
                      <Button size="sm" variant="secondary" className="w-full bg-secondary/90 text-secondary-foreground hover:bg-secondary">
                        <Eye className="mr-2 h-4 w-4" /> View Itinerary
                      </Button>
                    </div>
                  </CardContent>
                   {/* Potential 3D/Animation elements could be added here or via card styling */}
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex bg-card/80 hover:bg-card border-border/50" />
        <CarouselNext className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex bg-card/80 hover:bg-card border-border/50" />
      </Carousel>
    </div>
  );
};

export default JourneyPreviewCarousel;
