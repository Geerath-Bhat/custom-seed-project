import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

// Define types for filter options if needed, using placeholders for now
type Sector = string;
type MarketSegment = string;
type Timeframe = '1D' | '1W' | '1M' | '1Y' | 'ALL';

interface Filters {
  sector?: Sector;
  marketSegment?: MarketSegment;
  timeframe?: Timeframe;
  // Add more filter keys as needed, e.g., using checkboxes for multiple selections
}

interface DashboardFilterGroupProps {
  availableSectors: Sector[];
  availableMarketSegments: MarketSegment[];
  initialFilters?: Filters;
  onFilterChange: (filters: Filters) => void;
}

const DashboardFilterGroup: React.FC<DashboardFilterGroupProps> = ({
  availableSectors,
  availableMarketSegments,
  initialFilters = { timeframe: '1D' },
  onFilterChange,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleSelectChange = (key: keyof Filters) => (value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Example handler for checkboxes if needed
  // const handleCheckboxChange = (key: string, checked: boolean) => { ... }

  const timeframes: Timeframe[] = ['1D', '1W', '1M', '1Y', 'ALL'];

  return (
    <Card className="w-full bg-card text-card-foreground border-border">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center text-lg">
          <Filter className="mr-2 h-5 w-5 text-primary" />
          Filter Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sector-select">Sector</Label>
          <Select onValueChange={handleSelectChange('sector')} value={filters.sector}>
            <SelectTrigger id="sector-select" className="w-full bg-background border-input">
              <SelectValue placeholder="Select Sector" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="all">All Sectors</SelectItem>
              {availableSectors.map((sector) => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="market-segment-select">Market Segment</Label>
          <Select onValueChange={handleSelectChange('marketSegment')} value={filters.marketSegment}>
            <SelectTrigger id="market-segment-select" className="w-full bg-background border-input">
              <SelectValue placeholder="Select Segment" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
               <SelectItem value="all">All Segments</SelectItem>
              {availableMarketSegments.map((segment) => (
                <SelectItem key={segment} value={segment}>{segment}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeframe-select">Timeframe</Label>
          <Select onValueChange={handleSelectChange('timeframe')} value={filters.timeframe}>
            <SelectTrigger id="timeframe-select" className="w-full bg-background border-input">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              {timeframes.map((tf) => (
                <SelectItem key={tf} value={tf}>{tf}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Example Checkbox group - uncomment and adapt if needed */}
        {/* <div className="space-y-2">
          <Label>Additional Filters</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="filter-option-1" />
            <Label htmlFor="filter-option-1" className="font-normal">Option 1</Label>
          </div>
           <div className="flex items-center space-x-2">
            <Checkbox id="filter-option-2" />
            <Label htmlFor="filter-option-2" className="font-normal">Option 2</Label>
          </div>
        </div> */}

        {/* Optional: Add an Apply button if changes shouldn't be instant */}
        {/* <Button onClick={() => onFilterChange(filters)} className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          Apply Filters
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default DashboardFilterGroup;
