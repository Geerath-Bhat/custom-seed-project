import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Store } from 'lucide-react';

interface ShopCalloutProps {
  title: string;
  description: string;
  addressSnippet?: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

const ShopCallout: React.FC<ShopCalloutProps> = ({
  title,
  description,
  addressSnippet,
  imageUrl,
  buttonText,
  buttonLink,
}) => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 bg-card border border-border rounded-lg overflow-hidden shadow-lg animate-scale-in p-6 md:p-8 lg:p-12">
          <div className="md:w-1/2 lg:w-2/5 flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-auto object-cover rounded-md shadow-md aspect-video md:aspect-square lg:aspect-video"
            />
          </div>
          <div className="md:w-1/2 lg:w-3/5 text-center md:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4 text-primary">{title}</h2>
            <p className="text-lg text-foreground mb-4 text-pretty">{description}</p>
            {addressSnippet && (
              <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-6">
                <MapPin className="w-5 h-5 flex-shrink-0 text-secondary" />
                <span className="text-sm italic">{addressSnippet}</span>
              </div>
            )}
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href={buttonLink}>
                <Store className="mr-2 h-5 w-5" />
                {buttonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCallout;
