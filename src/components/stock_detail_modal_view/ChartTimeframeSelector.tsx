import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // Assuming Shadcn UI structure
import { cn } from '@/lib/utils'; // Assuming Shadcn utility function

interface ChartTimeframeSelectorProps {
  timeframes: string[]; // e.g., ['1D', '5D', '1M', '6M', '1Y']
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  className?: string;
}

const ChartTimeframeSelector: React.FC<ChartTimeframeSelectorProps> = ({ 
  timeframes = ['1D', '5D', '1M', '6M', '1Y'], 
  selectedTimeframe, 
  onTimeframeChange,
  className = ''
}) => {
  return (
    <ToggleGroup 
      type="single" 
      value={selectedTimeframe}
      onValueChange={(value) => {
        if (value) { // Prevent unselecting all
          onTimeframeChange(value);
        }
      }}
      className={cn('flex justify-center space-x-1', className)}
      aria-label="Select chart timeframe"
    >
      {timeframes.map((tf) => (
        <ToggleGroupItem 
          key={tf} 
          value={tf} 
          aria-label={`Select ${tf} timeframe`} 
          className="px-3 py-1 h-8 text-xs rounded-md data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          {tf}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ChartTimeframeSelector;
