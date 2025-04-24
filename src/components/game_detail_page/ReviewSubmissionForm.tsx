import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";

const reviewSchema = z.object({
  rating: z.number().min(1, { message: 'Rating is required.' }).max(5),
  comment: z.string().min(10, { message: 'Comment must be at least 10 characters.' }).max(1000, { message: 'Comment cannot exceed 1000 characters.' }),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewSubmissionFormProps {
  onSubmit: (data: ReviewFormData) => Promise<void>; // Function to handle submission
  isSubmitting?: boolean;
  className?: string;
}

const ReviewSubmissionForm: React.FC<ReviewSubmissionFormProps> = ({ onSubmit, isSubmitting = false, className }) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    form.setValue('rating', rating, { shouldValidate: true });
  };

  const submitHandler: SubmitHandler<ReviewFormData> = async (data) => {
    await onSubmit(data);
    // Optionally reset form after successful submission
    // form.reset();
    // setSelectedRating(0);
  };

  return (
    <Card className={cn("w-full bg-card border-border", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-family-heading">Leave a Review</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-2 block'>Your Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => {
                        const ratingValue = i + 1;
                        return (
                          <Star
                            key={ratingValue}
                            className={cn(
                              "h-6 w-6 cursor-pointer transition-colors",
                              ratingValue <= (hoveredRating || selectedRating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-muted-foreground/30"
                            )}
                            onMouseEnter={() => setHoveredRating(ratingValue)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => handleRatingClick(ratingValue)}
                          />
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts on the game..."
                      className="resize-none bg-input border-input focus-visible:ring-primary"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ReviewSubmissionForm;