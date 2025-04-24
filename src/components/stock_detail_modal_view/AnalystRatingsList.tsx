import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming Shadcn UI structure
import { cn } from '@/lib/utils';

interface AnalystRating {
  id: string | number;
  analyst: string;
  institution?: string;
  rating: 'Buy' | 'Hold' | 'Sell' | 'Strong Buy' | 'Underperform' | string; // Allow custom ratings
  rationale?: string;
  date?: string; // Optional: date of rating
  priceTarget?: number; // Optional
}

interface AnalystRatingsListProps {
  ratings: AnalystRating[];
  className?: string;
}

const getRatingColor = (rating: string): string => {
  const lowerRating = rating.toLowerCase();
  if (lowerRating.includes('buy')) return 'text-success';
  if (lowerRating.includes('sell') || lowerRating.includes('underperform')) return 'text-destructive';
  if (lowerRating.includes('hold')) return 'text-warning-foreground'; // Using warning-foreground for hold
  return 'text-muted-foreground'; // Default for neutral/unknown
};

const AnalystRatingsList: React.FC<AnalystRatingsListProps> = ({ 
  ratings = [],
  className = ''
}) => {
  if (!ratings || ratings.length === 0) {
    return (
      <Card className={cn('bg-card text-card-foreground', className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Analyst Ratings</CardTitle>
        </CardHeader>
        <CardContent>
            <p className='text-muted-foreground text-sm'>No analyst ratings available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('bg-card text-card-foreground', className)}>
      <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Analyst Ratings</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="space-y-3">
          {ratings.map((rating) => (
            <li key={rating.id} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="text-sm font-medium text-foreground">{rating.analyst}</p>
                  {rating.institution && <p className="text-xs text-muted-foreground">{rating.institution}</p>}
                </div>
                <div className="text-right">
                    <p className={cn('text-sm font-semibold', getRatingColor(rating.rating))}>{rating.rating}</p>
                    {rating.priceTarget && <p className="text-xs text-muted-foreground">Target: ${rating.priceTarget.toFixed(2)}</p>}
                </div>
              </div>
              {rating.rationale && (
                <p className="text-sm text-muted-foreground mt-1">{rating.rationale}</p>
              )}
              {rating.date && (
                  <p className="text-xs text-muted-foreground mt-1 text-right">{rating.date}</p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AnalystRatingsList;
