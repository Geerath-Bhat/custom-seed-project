import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CalendarDays, Hotel } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface BodySidebarProps {
  className?: string;
}

// Sidebar intended for 'LSB(S)' layout: Static, below Header, alongside Body content.
// Its positioning is typically managed by the parent layout component (e.g., using Flexbox or Grid).
const BodySidebar: React.FC<BodySidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        'hidden lg:block w-64 shrink-0 border-r border-border bg-muted/40 p-4 lg:p-6',
        className // Allow overriding/extending classes
      )}
    >
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Details</h3>
        {/* Placeholder Content for Destination Detail Page Sidebar */}
        <nav className="space-y-2">
          <Link
            to="#location" // Example internal link or specific route
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/10"
          >
            <MapPin className="h-4 w-4" />
            <span>Location Info</span>
          </Link>
          <Link
            to="#itinerary" // Example internal link or specific route
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/10"
          >
            <CalendarDays className="h-4 w-4" />
            <span>Itinerary</span>
          </Link>
          <Link
             to="/hotel/some-id" // Example link to related page type
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/10"
          >
            <Hotel className="h-4 w-4" />
            <span>Nearby Hotels</span>
          </Link>
        </nav>
        {/* Add more sections as needed */}
      </div>
    </aside>
  );
};

export default BodySidebar;
