import React from 'react';
import { Star } from 'lucide-react';

interface HotelPrimaryInfoProps {
  name: string;
  starRating: number; // e.g., 4 or 5
  averageRating: number; // e.g., 4.5
  reviewCount: number;
}

const HotelPrimaryInfo: React.FC<HotelPrimaryInfoProps> = ({
  name,
  starRating,
  averageRating,
  reviewCount,
}) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < fullStars ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="space-y-2 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{name}</h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-1" title={`${starRating}-star hotel`}>
          {renderStars(starRating)}
          <span className="ml-1">{starRating}-Star Hotel</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="font-semibold text-foreground">{averageRating.toFixed(1)}</span>
          <span>({reviewCount.toLocaleString()} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default HotelPrimaryInfo;
