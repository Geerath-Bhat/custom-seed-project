import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutDashboard, BarChartHorizontalBig } from 'lucide-react';

interface MarketNavigationLinksProps {
  dashboardPath?: string;
  sectorAnalysisPath?: string; // Base path, could append specific sectors
}

const MarketNavigationLinks: React.FC<MarketNavigationLinksProps> = ({
  dashboardPath = '/dashboard', // Default path
  sectorAnalysisPath = '/sectors', // Default path
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center py-4">
      <Button asChild variant="outline">
        <Link to={dashboardPath}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <Button asChild variant="secondary">
        <Link to={sectorAnalysisPath}> {/* Link to general sectors page or a specific one */} 
          <BarChartHorizontalBig className="mr-2 h-4 w-4" />
          Explore Sectors
        </Link>
      </Button>
      
       {/* Add more navigation links as needed */} 
    </div>
  );
};

export default MarketNavigationLinks;
