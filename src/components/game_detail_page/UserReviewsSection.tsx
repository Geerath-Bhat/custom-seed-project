import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns'; // Using date-fns from package.json
import { Separator } from '@/components/ui/separator';

interface Review {
  id: string | number;
  author: string;
  avatarUrl?: string;
  rating: number; // 1-5
  comment: string;
  timestamp: Date | string;
}

interface UserReviewsSectionProps {
  reviews: Review[];
  className?: string;
}

const UserReviewsSection: React.FC<UserReviewsSectionProps> = ({ reviews = [], className }) => {

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className={cn("w-full bg-card border-border", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-family-heading">User Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((review, index) => (
            <React.Fragment key={review.id}>
              <div className="flex space-x-4 animate-slide-up stagger-item">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={review.avatarUrl} alt={review.author} />
                  <AvatarFallback>{review.author.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-card-foreground">{review.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(review.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  {renderStars(review.rating)}
                  <p className="text-sm text-foreground/90 text-pretty">
                    {review.comment}
                  </p>
                </div>
              </div>
              {index < reviews.length - 1 && <Separator className="my-4 bg-border/50" />}
            </React.Fragment>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default UserReviewsSection;