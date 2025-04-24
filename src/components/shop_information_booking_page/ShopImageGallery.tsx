import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge'; // Example for thematic badge

interface ShopImageGalleryProps {
  images?: { src: string; alt: string; id: string | number }[];
}

const placeholderImages = [
  { id: 1, src: 'https://via.placeholder.com/600x400/222/888?text=Shop+Interior+1', alt: 'View of the main gaming area' },
  { id: 2, src: 'https://via.placeholder.com/600x400/333/999?text=VR+Setup', alt: 'Close-up of the VR gaming station' },
  { id: 3, src: 'https://via.placeholder.com/600x400/444/aaa?text=Lounge+Area', alt: 'Comfortable lounge seating' },
  { id: 4, src: 'https://via.placeholder.com/600x400/555/bbb?text=Game+Shelves', alt: 'Shelves stocked with games' },
  { id: 5, src: 'https://via.placeholder.com/600x400/666/ccc?text=Exterior+View', alt: 'Front view of the Iron Man Game Store' },
];

const ShopImageGallery: React.FC<ShopImageGalleryProps> = ({ images = placeholderImages }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Card className="bg-card border border-border overflow-hidden shadow-sm relative">
      {/* Thematic Accent - Badge Overlay Example */}
       <Badge variant="destructive" className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground shadow-md">
         IRON MAN THEMED
       </Badge>

      <CardContent className="p-0">
        <Carousel
          // plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id} className="relative">
                {/* Subtle Metallic Border Effect */}
                <div className="p-1 border border-primary/10 rounded-lg bg-background">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </AspectRatio>
                   {/* Optional Subtle Animated Accent - Example: Corner Flash */}
                   <div className="absolute bottom-2 left-2 w-4 h-4 bg-accent opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-full animate-pulse-gentle"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex" />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default ShopImageGallery;
