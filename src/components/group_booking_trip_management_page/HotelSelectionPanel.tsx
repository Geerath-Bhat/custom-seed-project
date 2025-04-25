import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Assuming Shadcn's AspectRatio
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Assuming Shadcn's Carousel
import { Star, MapPin, Wifi, Utensils, ThumbsUp, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the structure for a hotel option
interface HotelOption {
  id: string;
  name: string;
  imageUrl: string;
  rating: number; // e.g., 4.5
  pricePerNight: number;
  currency?: string; // e.g., 'USD'
  amenities: string[];
  location: string;
  isSelected?: boolean; // Indicates if this is the group's final choice
  votes?: number; // For voting
}

interface HotelSelectionPanelProps {
  hotelOptions: HotelOption[];
  selectedHotelId?: string | null;
  onSelectHotel?: (hotelId: string) => void;
  onVote?: (hotelId: string) => void;
  onComment?: (hotelId: string) => void;
}

const HotelSelectionPanel: React.FC<HotelSelectionPanelProps> = ({
  hotelOptions,
  selectedHotelId,
  onSelectHotel,
  onVote,
  onComment,
}) => {
  // Example amenity icons map
  const amenityIcons: { [key: string]: React.ElementType } = {
    wifi: Wifi,
    restaurant: Utensils,
    // Add more mappings
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Hotel Selection</CardTitle>
        <CardDescription>Review and choose the accommodation for the group.</CardDescription>
      </CardHeader>
      <CardContent>
        {hotelOptions.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No hotel options added yet.</p>
        ) : (
          <Carousel
            opts={{ align: "start", loop: hotelOptions.length > 1 }}
            className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-4xl mx-auto"
          >
            <CarouselContent>
              {hotelOptions.map((hotel) => (
                <CarouselItem key={hotel.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <Card className={cn(
                      "overflow-hidden h-full flex flex-col card-hover-basic",
                      selectedHotelId === hotel.id && "ring-2 ring-primary border-primary"
                    )}
                  >
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={hotel.imageUrl || '/placeholder-image.jpg'} // Provide a fallback image
                        alt={`Image of ${hotel.name}`}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold truncate">{hotel.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin size={14} className="mr-1 flex-shrink-0" />
                        <span className="truncate">{hotel.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2 py-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-amber-500">
                          <Star size={16} className="mr-1 fill-current" /> {hotel.rating.toFixed(1)}
                        </div>
                        <div className="font-semibold text-foreground">
                          {hotel.currency || '$'}{hotel.pricePerNight}
                          <span className="text-xs text-muted-foreground"> / night</span>
                        </div>
                      </div>
                      <div className="text-xs space-x-1">
                        {hotel.amenities.slice(0, 3).map((amenity) => {
                          const Icon = amenityIcons[amenity.toLowerCase()] || Star; // Default icon
                          return (
                            <Badge key={amenity} variant="secondary" className="capitalize">
                              <Icon size={12} className="mr-1" /> {amenity}
                            </Badge>
                          );
                        })}
                        {hotel.amenities.length > 3 && <Badge variant="outline">...</Badge>}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch pt-3 border-t">
                       {/* Collaborative Actions */} 
                       <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                            <span>Votes: {hotel.votes ?? 0}</span>
                            <div className="flex space-x-2">
                                {onVote && (
                                    <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={() => onVote(hotel.id)}>
                                        <ThumbsUp size={14} className="mr-1" /> Vote
                                    </Button>
                                )}
                                {onComment && (
                                    <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={() => onComment(hotel.id)}>
                                        <MessageSquare size={14} className="mr-1" /> Comment
                                    </Button>
                                )}
                            </div>
                       </div>
                       {/* Selection Button */}
                      {onSelectHotel && (
                        <Button
                          variant={selectedHotelId === hotel.id ? 'default' : 'outline'}
                          className="w-full mt-auto"
                          onClick={() => onSelectHotel(hotel.id)}
                          disabled={selectedHotelId === hotel.id}
                        >
                          {selectedHotelId === hotel.id ? 'Selected' : 'Select this Hotel'}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {hotelOptions.length > 1 && (
                <>
                    <CarouselPrevious className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background" />
                    <CarouselNext className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background" />
                </>
            )}
          </Carousel>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelSelectionPanel;
