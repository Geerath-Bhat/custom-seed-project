import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface Review {
  id: string;
  author: string;
  avatarUrl?: string;
  rating: number; // e.g., 4
  date: string | Date;
  title?: string;
  text: string;
}

interface HotelReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onSortChange?: (sortBy: string) => void;
  initialSort?: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {/* Placeholder for half star logic if needed */}
      {/* {halfStar && <StarHalf key="half" className="w-4 h-4 text-yellow-400 fill-yellow-400" />} */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/30" />
      ))}
    </div>
  );
};

const HotelReviews: React.FC<HotelReviewsProps> = ({
  reviews = [],
  averageRating,
  totalReviews,
  onLoadMore,
  isLoadingMore = false,
  hasMore = false,
  onSortChange,
  initialSort = 'newest',
}) => {
  const [sortBy, setSortBy] = useState<string>(initialSort);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <CardTitle className="text-xl font-semibold">Reviews & Ratings</CardTitle>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
             <StarRating rating={averageRating} />
             <span className="font-medium text-foreground">{averageRating.toFixed(1)} out of 5</span>
             <span>({totalReviews.toLocaleString()} reviews)</span>
          </div>
        </div>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <React.Fragment key={review.id}>
                <div className="flex gap-4 stagger-item">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={review.avatarUrl} alt={review.author} />
                    <AvatarFallback>{review.author.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
                      <p className="font-semibold text-foreground">{review.author}</p>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(review.date), 'PPP')} {/* Pretty date format */}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={review.rating} />
                        {review.title && <p className='font-medium text-sm text-foreground'>{review.title}</p>}
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed text-pretty">
                      {review.text}
                    </p>
                  </div>
                </div>
                {index < reviews.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        )}

        {hasMore && onLoadMore && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={onLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoadingMore ? 'Loading...' : 'Load More Reviews'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelReviews;
