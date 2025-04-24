import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Placeholder data structure
interface SectorPerformance {
  name: string;
  change: number; // e.g., percentage change
  volume?: number;
}

interface SectorHeatMapProps {
  sectors: SectorPerformance[];
}

// Helper function to get color based on performance
const getColorForChange = (change: number): string => {
  if (change > 1.5) return 'bg-success/80 hover:bg-success'; // Strong green for > 1.5%
  if (change > 0.5) return 'bg-success/50 hover:bg-success/70'; // Medium green for 0.5% to 1.5%
  if (change > 0) return 'bg-success/20 hover:bg-success/40'; // Light green for > 0%
  if (change === 0) return 'bg-muted hover:bg-muted/80'; // Neutral for 0%
  if (change < -1.5) return 'bg-destructive/80 hover:bg-destructive'; // Strong red for < -1.5%
  if (change < -0.5) return 'bg-destructive/50 hover:bg-destructive/70'; // Medium red for -0.5% to -1.5%
  return 'bg-destructive/20 hover:bg-destructive/40'; // Light red for < 0%
};

const SectorHeatMap: React.FC<SectorHeatMapProps> = ({ sectors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sector Performance Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider delayDuration={100}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {sectors.length === 0 ? (
              <p className="text-muted-foreground col-span-full text-center py-4">No sector data available.</p>
            ) : (
              sectors.map((sector) => (
                <Tooltip key={sector.name}>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-3 rounded-md text-center transition-colors duration-200 cursor-pointer ${getColorForChange(sector.change)}`}
                    >
                      <div className="font-medium text-sm truncate text-card-foreground dark:text-primary-foreground">{sector.name}</div>
                      <div className="text-xs font-semibold mt-1 ${sector.change >= 0 ? 'text-success-foreground' : 'text-destructive-foreground'}">
                         {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground border border-border rounded-md shadow-lg p-2 text-xs">
                    <p className="font-semibold">{sector.name}</p>
                    <p>Change: {sector.change.toFixed(2)}%</p>
                    {sector.volume && <p>Volume: {sector.volume.toLocaleString()}</p>}
                  </TooltipContent>
                </Tooltip>
              ))
            )}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

// Add some default props for demonstration
SectorHeatMap.defaultProps = {
  sectors: [
    { name: 'Technology', change: 1.85 },
    { name: 'Healthcare', change: -0.5 },
    { name: 'Financials', change: 0.2 },
    { name: 'Energy', change: 2.5 },
    { name: 'Consumer Discretionary', change: -1.9 },
    { name: 'Industrials', change: 0.75 },
    { name: 'Utilities', change: -0.1 },
    { name: 'Real Estate', change: 1.1 },
  ],
};

export default SectorHeatMap;
