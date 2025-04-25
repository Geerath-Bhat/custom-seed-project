import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Edit, Share2, Trash2, Users, MapPin } from 'lucide-react';

interface Participant {
  name: string;
  imageUrl?: string;
}

interface SavedTrip {
  id: string;
  title: string;
  imageUrl?: string;
  type: 'itinerary' | 'group' | 'destination';
  participants?: Participant[];
  description?: string; // Short description or dates
}

interface SavedTripsGroupProps {
  savedTrips: SavedTrip[];
  onEdit: (id: string) => void;
  onShare: (id: string) => void;
  onRemove: (id: string) => void;
}

const SavedTripsGroup: React.FC<SavedTripsGroupProps> = ({ savedTrips, onEdit, onShare, onRemove }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-foreground mb-4">Saved Itineraries & Trips</h2>
      {savedTrips.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">You haven't saved any trips or itineraries yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-container">
          {savedTrips.map((trip, index) => (
            <Card key={trip.id} className="overflow-hidden card-hover-basic stagger-item" style={{ animationDelay: `${index * 0.05}s` }}>
              {trip.imageUrl && (
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={trip.imageUrl}
                    alt={trip.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              )}
              <CardHeader className="p-4">
                <CardTitle className="text-lg flex items-center">
                   {trip.type === 'group' ? <Users className="mr-2 h-5 w-5 text-primary" /> : <MapPin className="mr-2 h-5 w-5 text-primary" />} {trip.title}
                </CardTitle>
                {trip.description && <CardDescription className="mt-1">{trip.description}</CardDescription>}
              </CardHeader>
              {trip.type === 'group' && trip.participants && trip.participants.length > 0 && (
                 <CardContent className="p-4 pt-0 flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">With:</span>
                  <div className="flex -space-x-2 overflow-hidden">
                    {trip.participants.slice(0, 3).map((p, idx) => (
                        <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={p.imageUrl} alt={p.name} />
                          <AvatarFallback className="text-xs bg-muted text-muted-foreground">{getInitials(p.name)}</AvatarFallback>
                        </Avatar>
                    ))}
                    {trip.participants.length > 3 && (
                       <Avatar className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-xs bg-muted text-muted-foreground">+{trip.participants.length - 3}</AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                 </CardContent>
              )}
              <CardFooter className="flex justify-end gap-2 p-4 border-t border-border bg-muted/50">
                <Button variant="outline" size="sm" onClick={() => onEdit(trip.id)}><Edit className="mr-1 h-4 w-4" /> Edit</Button>
                <Button variant="outline" size="sm" onClick={() => onShare(trip.id)}><Share2 className="mr-1 h-4 w-4" /> Share</Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onRemove(trip.id)}><Trash2 className="mr-1 h-4 w-4" /> Remove</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTripsGroup;
