import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, CheckCircle, XCircle, Clock, ExternalLink, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Define booking status types
type BookingStatus = 'ongoing' | 'completed' | 'cancelled' | 'pending';

// Define the structure for a booking history item
interface BookingHistoryItem {
  id: string;
  tripName: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  bookingReference?: string; // Optional booking ref
  viewDetailsLink?: string; // Link to the specific trip page
}

interface BookingHistoryListProps {
  bookings: BookingHistoryItem[];
}

// Helper to get status attributes
const getStatusAttributes = (status: BookingStatus) => {
  switch (status) {
    case 'ongoing':
      return { icon: <Clock className="h-3 w-3 mr-1" />, variant: 'secondary' as const, text: 'Ongoing' };
    case 'completed':
      return { icon: <CheckCircle className="h-3 w-3 mr-1" />, variant: 'success' as const, text: 'Completed' };
    case 'cancelled':
      return { icon: <XCircle className="h-3 w-3 mr-1" />, variant: 'destructive' as const, text: 'Cancelled' };
    case 'pending':
       return { icon: <Clock className="h-3 w-3 mr-1" />, variant: 'warning' as const, text: 'Pending Confirmation' };
    default:
      return { icon: null, variant: 'outline' as const, text: 'Unknown' };
  }
};

const BookingHistoryList: React.FC<BookingHistoryListProps> = ({ bookings }) => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Group Trip History</CardTitle>
        <CardDescription>Review past and current group bookings.</CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">No booking history found.</p>
        ) : (
          <ScrollArea className="h-[300px] pr-3">
            <ul className="space-y-4">
              {bookings.map((booking) => {
                const statusAttrs = getStatusAttributes(booking.status);
                return (
                  <li key={booking.id} className="p-4 border border-border rounded-lg bg-card flex flex-col sm:flex-row justify-between items-start stagger-item">
                    <div className="flex-grow mb-3 sm:mb-0 sm:mr-4">
                      <h4 className="font-semibold text-md text-foreground mb-1">{booking.tripName} - {booking.destination}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <CalendarDays className="h-4 w-4 mr-1.5 flex-shrink-0" />
                        <span>{format(booking.startDate, 'MMM d, yyyy')}</span>
                        <span className="mx-1">-</span>
                        <span>{format(booking.endDate, 'MMM d, yyyy')}</span>
                      </div>
                      <Badge variant={statusAttrs.variant} className="text-xs px-2 py-0.5">
                        {statusAttrs.icon}
                        {statusAttrs.text}
                      </Badge>
                      {booking.bookingReference && (
                         <p className="text-xs text-muted-foreground mt-1">Ref: {booking.bookingReference}</p>
                      )}
                    </div>
                    {booking.viewDetailsLink && (
                      <Button
                         variant="outline"
                         size="sm"
                         className="w-full sm:w-auto self-start sm:self-center"
                         asChild // Use asChild if linking with react-router-dom Link
                      >
                        {/* Replace <a> with <Link> from react-router-dom if using it */}
                        <a href={booking.viewDetailsLink} target="_blank" rel="noopener noreferrer">
                           <Eye className="h-4 w-4 mr-2" />
                           View Details
                        </a>
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingHistoryList;
