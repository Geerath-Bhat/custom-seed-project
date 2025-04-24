import React from 'react';
import { PcCase, Gamepad2, Clapperboard, HelpCircle } from 'lucide-react'; // Example icons
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Map platform names (adjust keys as needed based on your data)
// to Lucide icons
const platformIcons: { [key: string]: React.ElementType } = {
  pc: PcCase,
  xbox: Gamepad2, // Generic gamepad
  playstation: Clapperboard, // Placeholder, consider a specific PS icon if available
  // Add more platforms as needed
};

interface PlatformListProps {
  platforms: string[];
  className?: string;
}

const PlatformList: React.FC<PlatformListProps> = ({ platforms = [], className }) => {
  if (!platforms || platforms.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <h4 className="text-sm font-semibold text-muted-foreground mr-2">Platforms:</h4>
      <TooltipProvider delayDuration={100}>
        {platforms.map((platform) => {
          const IconComponent = platformIcons[platform.toLowerCase()] || HelpCircle; // Fallback icon
          return (
            <Tooltip key={platform}>
              <TooltipTrigger asChild>
                <div className="p-1.5 bg-muted rounded-md border border-border/50 hover:bg-accent/20 transition-colors">
                  <IconComponent className="h-5 w-5 text-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-popover text-popover-foreground rounded-md text-xs px-2 py-1">
                <p>{platform}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

export default PlatformList;