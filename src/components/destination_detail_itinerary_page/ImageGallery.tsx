import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'; // Assuming Shadcn UI setup
// import Image from 'next/image'; // Or use standard <img> if not using Next.js

interface ImageItem {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  destinationName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images = [], destinationName }) => {
  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">No images available.</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full rounded-lg overflow-hidden shadow-lg bg-card" opts={{ loop: true }}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="aspect-video relative">
              {/* If using Next.js Image */}
              {/* <Image
                src={image.src}
                alt={image.alt || `Image of ${destinationName} ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              /> */}

              {/* If using standard <img> */}
              <img
                src={image.src}
                alt={image.alt || `Image of ${destinationName} ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground" />
    </Carousel>
  );
};

export default ImageGallery;
