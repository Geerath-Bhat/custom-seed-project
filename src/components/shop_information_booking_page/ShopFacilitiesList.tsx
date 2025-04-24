import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Gamepad2, // Gaming Consoles
  Computer, // PC Gaming
  Headset, // VR/AR
  Sofa, // Lounge Area
  Wifi, // Wifi Access
  Coffee, // Snacks/Drinks
  ListChecks // General Facilities
} from 'lucide-react';

interface Facility {
  id: string | number;
  name: string;
  description?: string;
  icon: React.ElementType;
}

interface ShopFacilitiesListProps {
  facilities?: Facility[];
}

const defaultFacilities: Facility[] = [
  { id: 1, name: 'Latest Consoles', description: 'PS5, Xbox Series X, Nintendo Switch', icon: Gamepad2 },
  { id: 2, name: 'High-End PCs', description: 'Top spec PCs for competitive gaming', icon: Computer },
  { id: 3, name: 'VR/AR Zone', description: 'Immersive virtual and augmented reality experiences', icon: Headset },
  { id: 4, name: 'Comfortable Lounge', description: 'Relax and socialize between games', icon: Sofa },
  { id: 5, name: 'Free High-Speed Wi-Fi', description: 'Stay connected while you play', icon: Wifi },
  { id: 6, name: 'Snack Bar', description: 'Fuel your gaming sessions', icon: Coffee },
];

const ShopFacilitiesList: React.FC<ShopFacilitiesListProps> = ({
  facilities = defaultFacilities,
}) => {
  return (
    <Card className="bg-card text-card-foreground border-border">
      <CardHeader>
        <CardTitle className="text-xl font-heading flex items-center">
          <ListChecks className="mr-2 h-5 w-5 text-primary" />
          On-Site Facilities & Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {facilities.map((facility) => (
            <li key={facility.id} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary center mr-4">
                <facility.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{facility.name}</h4>
                {facility.description && (
                  <p className="text-sm text-muted-foreground">{facility.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ShopFacilitiesList;
