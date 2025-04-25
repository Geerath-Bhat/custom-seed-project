import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MinusCircle, PlusCircle } from 'lucide-react';

interface ItineraryCustomizationControlsProps {
  activityId: string;
  day: number;
  onRemove?: () => void;
  onAdd?: () => void; // Add might be for variations or adding similar
  // Could add other controls like dropdowns if needed
}

export const ItineraryCustomizationControls: React.FC<ItineraryCustomizationControlsProps> = ({ onRemove, onAdd }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
        {onAdd && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-success hover:text-success hover:bg-success/10" onClick={onAdd}>
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">Add Alternative/Similar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Alternative/Similar</p>
            </TooltipContent>
          </Tooltip>
        )}
        {onRemove && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={onRemove}>
                <MinusCircle className="h-4 w-4" />
                <span className="sr-only">Remove Activity</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove Activity</p>
            </TooltipContent>
          </Tooltip>
        )}
        {/* Add other controls like dropdowns here if needed */}
      </div>
    </TooltipProvider>
  );
};

// Note: This component is likely used within ItineraryStepper, so default export might not be needed
// but adhering to instruction to export default.
export default ItineraryCustomizationControls;
