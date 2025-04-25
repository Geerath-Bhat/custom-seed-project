import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  latitude: number;
  longitude: number;
  zoomLevel?: number;
  hotelName?: string;
  // markers?: { lat: number; lng: number; label: string }[]; // For nearby attractions
}

const LocationMap: React.FC<LocationMapProps> = ({
  latitude,
  longitude,
  zoomLevel = 14,
  hotelName = 'Hotel Location'
  // markers = [],
}) => {
  // Placeholder component: In a real app, integrate a map library (e.g., react-leaflet, google-maps-react)
  // using the provided latitude, longitude, zoomLevel, and markers.

  // Example static image URL (replace with dynamic map library)
  // Note: Requires configuring API keys and usage limits for production
  const staticMapImageUrl = `https://via.placeholder.com/600x400.png?text=Map+Placeholder+(${latitude.toFixed(4)},${longitude.toFixed(4)})`;

  return (
    <div className="animate-fade-in">
      <h3 className="text-lg font-semibold mb-3 text-foreground">Location</h3>
      <div className="aspect-video w-full rounded-lg border bg-muted overflow-hidden relative center text-muted-foreground">
        {/* Replace this div with your actual map component */}
        <div className='center flex-col p-4 text-center'>
            <MapPin className='w-12 h-12 text-primary mb-4'/>
            <p className='font-medium text-foreground'>{hotelName}</p>
            <p className='text-sm mb-4'>Map library integration needed</p>
            <p className='text-xs'>Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}</p>
            {/* <img src={staticMapImageUrl} alt={`Map showing location of ${hotelName}`} className="object-cover w-full h-full" /> */} 
        </div>
         {/* Add map controls (zoom, pan) and markers if using an interactive library */} 
      </div>
    </div>
  );
};

export default LocationMap;
