import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Users, Clock } from 'lucide-react'; // Example icons

// Placeholder data structure
interface GroupDeal {
  id: string;
  title: string;
  destination: string;
  discount: string; // e.g., 'Up to 25% off'
  validUntil?: string; // e.g., '2024-12-31'
  minGroupSize: number;
}

interface GroupDealsSectionProps {
  deals: GroupDeal[];
}

const GroupDealsSection: React.FC<GroupDealsSectionProps> = ({ deals = [] }) => {
  // Placeholder data if none provided
  const defaultDeals: GroupDeal[] = [
    { id: 'gd1', title: 'Himalayan Group Trek', destination: 'Himachal Pradesh', discount: '15% Off', minGroupSize: 5, validUntil: 'Ends Dec 31st' },
    { id: 'gd2', title: 'South India Temple Tour', destination: 'Tamil Nadu', discount: '20% Off for 8+', minGroupSize: 8, validUntil: 'Limited Time Offer' },
    { id: 'gd3', title: 'Rajasthan Cultural Fiesta', destination: 'Rajasthan', discount: 'Book 10, Get 1 Free', minGroupSize: 10 },
  ];

  const displayDeals = deals.length > 0 ? deals : defaultDeals;

  // Basic countdown logic placeholder (replace with actual library if needed)
  const CountdownTimer: React.FC<{ dateString?: string }> = ({ dateString }) => {
    if (!dateString || !dateString.includes('Dec 31st')) return null; // Simple placeholder logic
    // In a real app, calculate remaining time from dateString
    const timeLeft = 'Limited Time!'; // Placeholder
    return <span className="text-xs text-destructive font-medium flex items-center"><Clock className="h-3 w-3 mr-1"/>{timeLeft}</span>;
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-scale-in">
      <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20 shadow-lg overflow-hidden">
        <CardHeader className="text-center">
          <Tag className="mx-auto h-10 w-10 text-primary mb-2" />
          <CardTitle className="text-3xl font-bold text-primary">Special Group Deals</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-1 text-balance">
            Travel together and save more! Explore exclusive offers for group bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          {displayDeals.length > 0 ? (
            <div className="space-y-4">
              {displayDeals.map((deal) => (
                <div key={deal.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-card/80 dark:bg-card/50 rounded-lg border border-border/50 shadow-sm stagger-item">
                  <div className="mb-3 sm:mb-0">
                    <h4 className="font-semibold text-foreground">{deal.title} - <span className="text-muted-foreground">{deal.destination}</span></h4>
                    <div className="flex items-center space-x-3 text-sm mt-1">
                      <span className="flex items-center text-success font-medium"><Tag className="h-4 w-4 mr-1" />{deal.discount}</span>
                      <span className="flex items-center text-secondary"><Users className="h-4 w-4 mr-1" />Min. {deal.minGroupSize} people</span>
                      {deal.validUntil && <CountdownTimer dateString={deal.validUntil} />}
                    </div>
                  </div>
                  <div className="flex space-x-2 w-full sm:w-auto">
                     <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Learn More</Button>
                     <Button size="sm" className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90">Book Now</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No group deals available at the moment. Check back soon!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupDealsSection;
