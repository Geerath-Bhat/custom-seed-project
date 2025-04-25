import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ItineraryCustomizationControls } from './ItineraryCustomizationControls'; // Assuming controls component
import { MapPin, Clock } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  description: string;
  time?: string;
  location?: string;
  cost?: number;
  isCustomizable?: boolean;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
}

interface ItineraryStepperProps {
  itinerary: ItineraryDay[];
  onAddActivity?: (day: number, activity: Activity) => void; // Placeholder callbacks
  onRemoveActivity?: (day: number, activityId: string) => void;
}

const ItineraryStepper: React.FC<ItineraryStepperProps> = ({ 
  itinerary = [], 
  onAddActivity, 
  onRemoveActivity 
}) => {
  if (!itinerary || itinerary.length === 0) {
    return <p className="text-muted-foreground p-4 text-center">No itinerary details available.</p>;
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {itinerary.map((dayData) => (
        <AccordionItem key={dayData.day} value={`day-${dayData.day}`} className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="px-4 py-3 text-left hover:bg-muted/50 transition-colors">
            <span className="font-semibold text-primary">Day {dayData.day}:</span>
            <span className="ml-2 text-foreground font-medium flex-1 truncate">{dayData.title}</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4 border-t border-border bg-background/50">
            <ul className="space-y-3 list-none pl-0">
              {dayData.activities.map((activity) => (
                <li key={activity.id} className="relative pl-6 border-l-2 border-primary/50 py-1">
                   <div className="absolute left-[-9px] top-[7px] h-4 w-4 rounded-full bg-primary border-2 border-background"></div>
                   <div className="flex justify-between items-start">
                     <div>
                        <p className="font-medium text-foreground">{activity.name}</p>
                        {activity.description && <p className="text-sm text-muted-foreground mt-0.5 text-pretty">{activity.description}</p>}
                        <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                          {activity.time && <span className="flex items-center"><Clock className="mr-1 h-3 w-3" /> {activity.time}</span>}
                          {activity.location && <span className="flex items-center"><MapPin className="mr-1 h-3 w-3" /> {activity.location}</span>}
                        </div>
                     </div>
                     {activity.isCustomizable && onRemoveActivity && (
                        <ItineraryCustomizationControls
                            activityId={activity.id}
                            day={dayData.day}
                            onRemove={() => onRemoveActivity(dayData.day, activity.id)}
                            // onAdd could be triggered elsewhere or via AI suggestions
                        />
                     )}
                   </div>
                </li>
              ))}
            </ul>
            {/* Optionally add a button here to add custom activities via onAddActivity */}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ItineraryStepper;
