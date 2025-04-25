import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Repeat, XCircle, Share2, Filter } from 'lucide-react';

type BookingStatus = 'active' | 'upcoming' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  destination: string;
  startDate: string; // Consider using Date objects in real implementation
  endDate: string;
  status: BookingStatus;
  imageUrl?: string; // Optional image for visual flair
}

interface BookingListProps {
  bookings: Booking[];
  onView: (id: string) => void;
  onRepeat: (id: string) => void;
  onCancel: (id: string) => void;
  onShare: (id: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onView, onRepeat, onCancel, onShare }) => {
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === filter);

  const getStatusBadgeVariant = (status: BookingStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'active': return 'default'; // Or maybe success
      case 'upcoming': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Your Bookings</h2>
        <Select onValueChange={(value) => setFilter(value as BookingStatus | 'all')} defaultValue="all">
          <SelectTrigger className="w-[180px]">
             <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredBookings.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No bookings match the current filter.</p>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden card-hover-basic animate-slide-up">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
                 {/* Optional image could go here */}
                 {/* {booking.imageUrl && <img src={booking.imageUrl} alt={booking.destination} className="w-24 h-24 object-cover rounded-md" />} */}
                <div className="flex-1">
                  <CardTitle className="text-lg">{booking.destination}</CardTitle>
                  <CardDescription>{booking.startDate} - {booking.endDate}</CardDescription>
                </div>
                <Badge variant={getStatusBadgeVariant(booking.status)} className="capitalize">{booking.status}</Badge>
              </CardHeader>
              <CardFooter className="flex flex-wrap justify-end gap-2 p-4 border-t border-border bg-muted/50">
                <Button variant="outline" size="sm" onClick={() => onView(booking.id)}><Eye className="mr-1 h-4 w-4" /> View</Button>
                {(booking.status === 'completed' || booking.status === 'active') && (
                   <Button variant="outline" size="sm" onClick={() => onRepeat(booking.id)}><Repeat className="mr-1 h-4 w-4" /> Repeat</Button>
                )}
                {(booking.status === 'active' || booking.status === 'upcoming') && (
                   <Button variant="outline" size="sm" onClick={() => onCancel(booking.id)}><XCircle className="mr-1 h-4 w-4" /> Cancel</Button>
                )}
                 <Button variant="outline" size="sm" onClick={() => onShare(booking.id)}><Share2 className="mr-1 h-4 w-4" /> Share</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
