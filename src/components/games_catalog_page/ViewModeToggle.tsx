import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, List } from 'lucide-react'; // Using List as a proxy for Carousel/List view
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


interface ViewModeToggleProps {
  viewMode: 'grid' | 'carousel'; // 'carousel' can represent list/carousel view
  onViewModeChange: (mode: 'grid' | 'carousel') => void;
  className?: string;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
  className = '',
}) => {
  const handleValueChange = (value: string) => {
    if (value) { // ToggleGroup returns empty string if deselected, ensure we have a value
      onViewModeChange(value as 'grid' | 'carousel');
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <ToggleGroup
        type="single"
        value={viewMode}
        onValueChange={handleValueChange}
        className={`bg-muted p-1 rounded-md ${className}`}
        aria-label="Toggle view mode"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem
                value="grid"
                aria-label="Grid view"
                className="data-[state=on]:bg-background data-[state=on]:shadow-sm px-2"
            >
              <LayoutGrid className="h-4 w-4 text-foreground" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent className="bg-popover text-popover-foreground">
            <p>Grid View</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
             <ToggleGroupItem
                value="carousel"
                aria-label="List view"
                 className="data-[state=on]:bg-background data-[state=on]:shadow-sm px-2"
             >
              <List className="h-4 w-4 text-foreground" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent className="bg-popover text-popover-foreground">
             <p>List/Carousel View</p>
          </TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </TooltipProvider>
  );
};

export default ViewModeToggle;
