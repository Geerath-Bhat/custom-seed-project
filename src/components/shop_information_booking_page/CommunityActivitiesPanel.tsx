import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Heart, MessageCircle } from 'lucide-react';

interface Testimonial {
  name: string;
  quote: string;
  avatar?: string;
}

interface CommunityActivitiesPanelProps {
  title?: string;
  description?: string;
  activities?: string[];
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  { name: 'GamerGuy42', quote: '"Awesome community nights! Met great people here."', avatar: 'https://github.com/shadcn.png' }, // Placeholder avatar
  { name: 'Sarah P.', quote: '"The board game club is super welcoming and fun."' },
];

const CommunityActivitiesPanel: React.FC<CommunityActivitiesPanelProps> = ({
  title = 'Join Our Community',
  description = 'We host regular meetups, workshops, and social events. Connect with fellow gamers!',
  activities = [
    'Weekly Board Game Nights (Wednesdays)',
    'Monthly RPG One-Shots', 
    'Learn-to-Play Workshops',
    'Charity Gaming Marathons',
  ],
  testimonials = defaultTestimonials,
}) => {
  return (
    <Card className="bg-gradient-to-br from-card to-muted/50 text-card-foreground border border-border shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-heading flex items-center">
          <Users className="mr-2 h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Regular Activities</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3 flex items-center">
              <MessageCircle className="w-4 h-4 mr-1.5"/> What People Say
            </h4>
            <div className="space-y-3">
              {testimonials.map((testimonial, index) => (
                <blockquote key={index} className="flex items-start space-x-3 p-3 bg-background/50 rounded-lg border border-border/50">
                   <Avatar className="h-9 w-9 border border-primary/20">
                     <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                     <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                   </Avatar>
                  <div className="text-sm">
                    <p className="italic text-foreground/90">{testimonial.quote}</p>
                    <footer className="text-xs text-muted-foreground mt-1">- {testimonial.name}</footer>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityActivitiesPanel;
