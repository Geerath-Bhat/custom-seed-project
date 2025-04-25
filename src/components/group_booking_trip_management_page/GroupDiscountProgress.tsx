import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Percent, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroupDiscountProgressProps {
  currentGroupSize: number;
  requiredSizeForDiscount: number;
  discountPercentage?: number; // Optional: Show the discount % if achieved
  discountDescription?: string; // e.g., "Group Rate Unlocked!"
}

const GroupDiscountProgress: React.FC<GroupDiscountProgressProps> = ({
  currentGroupSize,
  requiredSizeForDiscount,
  discountPercentage,
  discountDescription = "Group Discount",
}) => {
  const [progressValue, setProgressValue] = useState(0);

  const progress = Math.min((currentGroupSize / requiredSizeForDiscount) * 100, 100);
  const discountAchieved = currentGroupSize >= requiredSizeForDiscount;

  // Animate progress bar on load or update
  useEffect(() => {
    // Set a timeout to trigger the animation shortly after mount/update
    const timer = setTimeout(() => setProgressValue(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <Card className="w-full animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5 text-primary" />
          {discountDescription}
        </CardTitle>
        <CardDescription>
          Reach the required group size to unlock special rates or benefits.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center text-sm font-medium mb-1">
          <span className="flex items-center text-muted-foreground">
            <Users className="mr-1.5 h-4 w-4" />
            Current Group Size
          </span>
          <span className="text-foreground font-semibold">{currentGroupSize} / {requiredSizeForDiscount}</span>
        </div>

        <Progress
           value={progressValue}
           className={cn(
             "h-3 transition-all duration-500 ease-out",
             discountAchieved ? "[&>div]:bg-success" : "[&>div]:bg-primary"
           )}
           aria-label={`${discountDescription} progress`}
        />

        <div className="text-center text-sm mt-2">
          {discountAchieved ? (
            <p className="text-success font-semibold flex items-center justify-center">
              <Percent className="mr-1 h-4 w-4" />
              {discountPercentage ? `${discountPercentage}% Discount Unlocked!` : 'Group Discount Achieved!'}
            </p>
          ) : (
            <p className="text-muted-foreground">
              {requiredSizeForDiscount - currentGroupSize} more participant(s) needed for the discount.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupDiscountProgress;
