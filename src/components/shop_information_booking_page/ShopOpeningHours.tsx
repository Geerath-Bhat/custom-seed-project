import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertTriangle } from 'lucide-react';

interface OpeningHours {
  day: string;
  hours: string;
}

interface ShopOpeningHoursProps {
  hours?: OpeningHours[];
  holidayInfo?: string;
}

const defaultHours: OpeningHours[] = [
  { day: 'Monday', hours: '10:00 AM - 8:00 PM' },
  { day: 'Tuesday', hours: '10:00 AM - 8:00 PM' },
  { day: 'Wednesday', hours: '10:00 AM - 8:00 PM' },
  { day: 'Thursday', hours: '10:00 AM - 10:00 PM' },
  { day: 'Friday', hours: '10:00 AM - 11:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 11:00 PM' },
  { day: 'Sunday', hours: '11:00 AM - 7:00 PM' },
];

const ShopOpeningHours: React.FC<ShopOpeningHoursProps> = ({
  hours = defaultHours,
  holidayInfo,
}) => {
  return (
    <Card className="bg-card text-card-foreground border-border">
      <CardHeader>
        <CardTitle className="text-xl font-heading flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Opening Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2 text-sm">
          {hours.map((item) => (
            <div key={item.day} className="flex justify-between">
              <dt className="font-medium text-foreground">{item.day}</dt>
              <dd className="text-muted-foreground">{item.hours}</dd>
            </div>
          ))}
        </dl>

        {holidayInfo && (
          <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded-lg flex items-start text-sm">
            <AlertTriangle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-accent-foreground">{holidayInfo}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShopOpeningHours;
