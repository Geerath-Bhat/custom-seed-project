import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

// Define placeholder data types and values
interface FilterOptions {
  exchanges: string[];
  regions: string[];
  sectors: string[];
}

interface MarketFilterGroupProps {
  options: FilterOptions;
  onFilterChange: (filters: { exchange?: string; region?: string; sector?: string }) => void;
}

const MarketFilterGroup: React.FC<MarketFilterGroupProps> = ({ options, onFilterChange }) => {
  const [selectedExchange, setSelectedExchange] = useState<string | undefined>();
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
  const [selectedSector, setSelectedSector] = useState<string | undefined>();

  const handleApplyFilters = () => {
    onFilterChange({
      exchange: selectedExchange,
      region: selectedRegion,
      sector: selectedSector,
    });
  };

  const handleResetFilters = () => {
    setSelectedExchange(undefined);
    setSelectedRegion(undefined);
    setSelectedSector(undefined);
    onFilterChange({});
  };

  return (
    <div className="p-4 bg-card border border-border rounded-lg shadow-sm flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[150px]">
        <Label htmlFor="exchange-select" className="text-sm font-medium text-muted-foreground">Exchange</Label>
        <Select value={selectedExchange} onValueChange={setSelectedExchange}>
          <SelectTrigger id="exchange-select" className="w-full mt-1">
            <SelectValue placeholder="Select Exchange" />
          </SelectTrigger>
          <SelectContent>
            {options.exchanges.map((exchange) => (
              <SelectItem key={exchange} value={exchange}>{exchange}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <Label htmlFor="region-select" className="text-sm font-medium text-muted-foreground">Region</Label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger id="region-select" className="w-full mt-1">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            {options.regions.map((region) => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <Label htmlFor="sector-select" className="text-sm font-medium text-muted-foreground">Sector</Label>
        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger id="sector-select" className="w-full mt-1">
            <SelectValue placeholder="Select Sector" />
          </SelectTrigger>
          <SelectContent>
            {options.sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleApplyFilters} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Filter className="mr-2 h-4 w-4" /> Apply
        </Button>
        <Button variant="outline" onClick={handleResetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default MarketFilterGroup;
