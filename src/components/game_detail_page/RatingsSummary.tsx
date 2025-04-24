import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from "@/lib/utils";

interface RatingsSummaryProps {
  averageRating: number; // e.g., 4.5
  ratingCount: number;
  className?: string;
}

const RatingsSummary: React.FC<RatingsSummaryProps> = ({ averageRating, ratingCount, className }) => {
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center space-x-2 bg-card p-3 rounded-lg border border-border", className)}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf key="half" className="h-5 w-5 text-yellow-400 fill-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground/50" />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">{averageRating.toFixed(1)}</span>
      <span className="text-sm text-muted-foreground">({ratingCount} ratings)</span>
    </div>
  );
};

export default RatingsSummary;