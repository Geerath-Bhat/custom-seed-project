import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CalendarDays, Star } from 'lucide-react';

interface Destination {
  name: string;
  location: string;
  description: string;
  keyAttractions: string[];
  bestSeasons: string[];
  featuredHighlights: string[];
}

interface DestinationProfileCardProps {
  destination: Destination;
}

const DestinationProfileCard: React.FC<DestinationProfileCardProps> = ({ destination }) => {
  return (
    <Card className="w-full shadow-md border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary mb-1">{destination.name}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <MapPin className="mr-1.5 h-4 w-4" />
          <span>{destination.location}</span>
        </div>
        <CardDescription className="text-foreground text-base text-pretty">{destination.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-1.5">Key Attractions:</h4>
          <div className="flex flex-wrap gap-2">
            {destination.keyAttractions.map((attraction, index) => (
              <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                <Star className="mr-1 h-3 w-3" />
                {attraction}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1.5">Best Season(s) to Visit:</h4>
          <div className="flex flex-wrap gap-2">
            {destination.bestSeasons.map((season, index) => (
              <Badge key={index} variant="outline" className="border-primary/50 text-primary">
                <CalendarDays className="mr-1 h-3 w-3" />
                {season}
              </Badge>
            ))}
          </div>
        </div>
         {destination.featuredHighlights && destination.featuredHighlights.length > 0 && (
           <div>
              <h4 className="font-semibold text-foreground mb-1.5">Highlights:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {destination.featuredHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
           </div>
         )}
      </CardContent>
    </Card>
  );
};

export default DestinationProfileCard;
