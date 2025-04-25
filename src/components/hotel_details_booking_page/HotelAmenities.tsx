import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Helper type for valid Lucide icon names
type LucideIconName = keyof typeof LucideIcons;

interface Amenity {
  iconName: LucideIconName;
  name: string;
}

interface HotelAmenitiesProps {
  amenities: Amenity[];
}

// Function to safely get a Lucide icon component
const getLucideIcon = (name: LucideIconName): React.ElementType => {
  const IconComponent = LucideIcons[name];
  // Return a fallback or default icon if the name is invalid
  return IconComponent || LucideIcons.HelpCircle; // Default to HelpCircle if not found
};

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities = [] }) => {
  if (!amenities || amenities.length === 0) {
    return null; // Don't render the section if there are no amenities
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Amenities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
          {amenities.map((amenity, index) => {
            const Icon = getLucideIcon(amenity.iconName);
            return (
              <div key={index} className="flex items-center gap-2 stagger-item">
                <Icon className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{amenity.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelAmenities;
