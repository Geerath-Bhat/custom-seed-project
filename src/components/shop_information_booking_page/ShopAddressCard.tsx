import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShopAddressCardProps {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  email?: string;
  directionsLink?: string;
}

const ShopAddressCard: React.FC<ShopAddressCardProps> = ({
  addressLine1 = '1 Stark Tower Plaza',
  addressLine2 = 'Floor 90',
  city = 'New York',
  postalCode = '10001',
  country = 'USA',
  phone = '+1 (212) 970-4133',
  email = 'contact@ironmangames.com',
  directionsLink = '#',
}) => {
  return (
    <Card className="bg-card text-card-foreground border-primary/20 shadow-lg overflow-hidden relative">
      {/* Thematic Accent - Subtle Arc/Metallic Element */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary opacity-80"></div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-heading flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-primary" />
          Visit Our Store
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <address className="not-italic">
          <p>{addressLine1}</p>
          {addressLine2 && <p>{addressLine2}</p>}
          <p>{`${city}, ${postalCode}`}</p>
          <p>{country}</p>
        </address>

        <div className="space-y-2 pt-2">
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="mr-2 h-4 w-4" />
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="mr-2 h-4 w-4" />
              {email}
            </a>
          )}
        </div>

        {directionsLink && (
          <Button variant="outline" size="sm" asChild className="mt-4 border-primary/50 hover:bg-primary/10">
            <a href={directionsLink} target="_blank" rel="noopener noreferrer">
              Get Directions
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ShopAddressCard;
