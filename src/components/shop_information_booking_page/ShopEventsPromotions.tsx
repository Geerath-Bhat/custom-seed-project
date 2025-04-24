import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Ticket, Zap } from 'lucide-react';

interface EventPromotion {
  id: string | number;
  title: string;
  date: string;
  summary: string;
  type: 'event' | 'promotion';
  link?: string;
}

interface ShopEventsPromotionsProps {
  items?: EventPromotion[];
}

const defaultItems: EventPromotion[] = [
  {
    id: 1,
    title: 'Weekly Smash Bros Tournament',
    date: 'Every Friday @ 7 PM',
    summary: 'Compete for glory and prizes in our weekly Smash Ultimate bracket.',
    type: 'event',
    link: '#',
  },
  {
    id: 2,
    title: 'VR Experience Discount',
    date: 'Limited Time Offer',
    summary: 'Get 20% off all VR sessions booked this month. Use code VR20!',
    type: 'promotion',
    link: '#booking-form',
  },
  {
    id: 3,
    title: 'Iron Man Themed Game Night',
    date: 'Last Saturday of the Month',
    summary: 'Join us for Marvel-themed games, trivia, and cosplay contest.',
    type: 'event',
  },
];

const ShopEventsPromotions: React.FC<ShopEventsPromotionsProps> = ({ items = defaultItems }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold flex items-center">
        <Zap className="mr-2 h-6 w-6 text-primary" />
        Events & Promotions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
        {items.map((item, index) => (
          <Card
            key={item.id}
            className="bg-card text-card-foreground border-border shadow-md hover:shadow-lg transition-shadow duration-300 card-hover-basic stagger-item"
            style={{ animationDelay: `${index * 0.1}s` }} // Stagger animation delay
          >
            {/* Thematic Top Border */}
            <div className={`h-1.5 w-full ${item.type === 'event' ? 'bg-primary' : 'bg-accent'} rounded-t-lg`}></div>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                {item.type === 'event' ? (
                  <Calendar className="mr-2 h-5 w-5 text-primary/80" />
                ) : (
                  <Ticket className="mr-2 h-5 w-5 text-accent/80" />
                )}
                {item.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-1">
                {item.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-foreground/90">{item.summary}</p>
              {item.link && (
                <Button variant="outline" size="sm" asChild>
                  <a href={item.link}>{item.type === 'event' ? 'Learn More' : 'Book Now'}</a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopEventsPromotions;
