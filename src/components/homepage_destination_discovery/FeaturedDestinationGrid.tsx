import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Assuming Badge is available for tags
import { ArrowRight } from 'lucide-react';

// Placeholder data structure
interface FeaturedDestination {
  id: string;
  name: string;
  imageUrl: string;
  summary: string;
  tags?: string[]; // e.g., 'Popular', 'Exclusive'
}

interface FeaturedDestinationGridProps {
  destinations: FeaturedDestination[];
}

const FeaturedDestinationGrid: React.FC<FeaturedDestinationGridProps> = ({ destinations = [] }) => {
  // Placeholder data if none provided
  const defaultDestinations: FeaturedDestination[] = [
    { id: 'fd1', name: 'Andaman Islands', imageUrl: '/placeholder-andaman.jpg', summary: 'Pristine beaches and coral reefs.', tags: ['Popular', 'Beach'] },
    { id: 'fd2', name: 'Spiti Valley', imageUrl: '/placeholder-spiti.jpg', summary: 'Remote monasteries and stark beauty.', tags: ['Adventure', 'Exclusive'] },
    { id: 'fd3', name: 'Hampi Ruins', imageUrl: '/placeholder-hampi.jpg', summary: 'Explore ancient temples and boulders.', tags: ['History', 'Unique'] },
    { id: 'fd4', name: 'Sundarbans Mangroves', imageUrl: '/placeholder-sundarbans.jpg', summary: 'Home of the Royal Bengal Tiger.', tags: ['Wildlife', 'Nature'] },
  ];

  const displayDestinations = destinations.length > 0 ? destinations : defaultDestinations;

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Featured Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-container">
        {displayDestinations.map((destination, index) => (
          <Card 
            key={destination.id} 
            className="overflow-hidden flex flex-col card-hover-basic stagger-item transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-primary/10"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="p-0 relative">
              <img 
                src={destination.imageUrl} // Use placeholder image
                alt={destination.name} 
                className="w-full h-48 object-cover"
              />
              {destination.tags && destination.tags.length > 0 && (
                <div className="absolute top-2 right-2 flex flex-wrap gap-1">
                  {destination.tags.map(tag => (
                    <Badge key={tag} variant={tag === 'Exclusive' ? 'destructive' : 'secondary'} className="text-xs backdrop-blur-sm bg-black/30 text-white border-none">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-lg font-semibold mb-2 text-foreground">{destination.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground text-pretty">{destination.summary}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestinationGrid;
