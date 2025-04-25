import React, { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Assuming utils for cn function exists

interface HotelImageGalleryProps {
  images: string[];
  videos?: string[]; // Placeholder for potential video integration
}

const HotelImageGallery: React.FC<HotelImageGalleryProps> = ({ images = [], videos = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect(); // Set initial index
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Combine images and video thumbnails if needed
  const galleryItems = [...images]; // Add video thumbnails later if required

  if (!galleryItems || galleryItems.length === 0) {
    return <div className="aspect-video bg-muted rounded-lg center text-muted-foreground">No images available</div>;
  }

  return (
    <section className="relative group animate-fade-in" aria-label="Hotel Image Gallery">
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <div className="overflow-hidden rounded-lg border bg-card" ref={emblaRef}>
          <div className="flex">
            {galleryItems.map((src, index) => (
              <div className="flex-grow-0 flex-shrink-0 w-full min-w-0 relative" key={index}>
                <DialogTrigger asChild>
                  <button
                    className="block w-full aspect-video cursor-zoom-in relative"
                    onClick={() => setSelectedIndex(index)} // Open lightbox at clicked image
                    aria-label={`View image ${index + 1} fullscreen`}
                  >
                    <img
                      src={src}
                      alt={`Hotel view ${index + 1}`}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 center">
                      <Expand className="w-8 h-8 text-white" />
                    </div>
                  </button>
                </DialogTrigger>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        {galleryItems.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 h-10 w-10 bg-background/80 hover:bg-background"
              onClick={scrollPrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 h-10 w-10 bg-background/80 hover:bg-background"
              onClick={scrollNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
                {galleryItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={cn(
                      'h-2 w-2 rounded-full transition-colors duration-200',
                      index === selectedIndex ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
                    )}
                    aria-label={`Go to image ${index + 1}`}
                    aria-current={index === selectedIndex}
                  />
                ))}
            </div>
          </>
        )}

        {/* Lightbox Content */}
        <DialogContent className="max-w-none w-[95vw] h-[90vh] p-0 border-0 bg-transparent flex items-center justify-center">
          <div className="relative w-full h-full">
            <img
              src={galleryItems[selectedIndex]}
              alt={`Hotel view ${selectedIndex + 1} fullscreen`}
              className="object-contain w-full h-full"
            />
             {/* Ideally, Lightbox would have its own carousel controls */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-black/50 text-white hover:bg-black/75"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HotelImageGallery;
