import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Filter, ChevronDown, Tag, Map, Clock, Star } from 'lucide-react'; // Example icons

// Define possible filter criteria and their state
interface FilterState {
  themes: string[];
  locations: string[];
  tripTypes: string[];
  duration?: string; // e.g., 'short', 'medium', 'long'
  sortBy?: string; // e.g., 'popularity', 'name'
}

interface DestinationFilterGroupProps {
  availableFilters: {
    themes?: string[];
    locations?: string[];
    tripTypes?: string[];
    durations?: { label: string; value: string }[];
    sortOptions?: { label: string; value: string }[];
  };
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const DestinationFilterGroup: React.FC<DestinationFilterGroupProps> = ({ 
  availableFilters = {}, 
  onFilterChange 
}) => {
  const [selectedThemes, setSelectedThemes] = React.useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>([]);
  const [selectedTripTypes, setSelectedTripTypes] = React.useState<string[]>([]);
  const [selectedSortBy, setSelectedSortBy] = React.useState<string>('popularity');

  // Example handler for theme changes
  const handleThemeChange = (theme: string, checked: boolean) => {
    const newThemes = checked 
      ? [...selectedThemes, theme]
      : selectedThemes.filter(t => t !== theme);
    setSelectedThemes(newThemes);
    onFilterChange({ themes: newThemes });
  };

  // Example handler for sort change (using ToggleGroup)
  const handleSortChange = (value: string) => {
    if (value) { // Prevent unselecting all
      setSelectedSortBy(value);
      onFilterChange({ sortBy: value });
    }
  };

  // Simplified rendering - add more filters as needed (locations, tripTypes, duration)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/30 shadow-sm my-6 animate-fade-in">
      <span className="text-sm font-medium text-muted-foreground mr-2 hidden sm:inline">Filter by:</span>
      
      {/* Theme Filter Dropdown */}
      {availableFilters.themes && availableFilters.themes.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 px-3 text-sm">
              <Tag className="h-4 w-4 mr-2" /> Themes <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Select Themes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableFilters.themes.map(theme => (
              <DropdownMenuCheckboxItem
                key={theme}
                checked={selectedThemes.includes(theme)}
                onCheckedChange={(checked) => handleThemeChange(theme, Boolean(checked))}
              >
                {theme}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Add more dropdowns for Locations, Trip Types, Duration similarly */} 
       {/* Example: Location Filter Placeholder */}
      <Button variant="outline" className="h-9 px-3 text-sm" disabled>
          <Map className="h-4 w-4 mr-2" /> Location <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
      </Button>

      {/* Sort By Toggle Group */} 
      {availableFilters.sortOptions && availableFilters.sortOptions.length > 0 && (
        <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm font-medium text-muted-foreground mr-1 hidden md:inline">Sort:</span>
            <ToggleGroup type="single" value={selectedSortBy} onValueChange={handleSortChange} className="gap-1">
                {availableFilters.sortOptions.map(option => (
                    <ToggleGroupItem key={option.value} value={option.value} aria-label={`Sort by ${option.label}`} size="sm" className="h-9 px-3 data-[state=on]:bg-primary/10 data-[state=on]:text-primary">
                        {option.value === 'popularity' && <Star className="h-4 w-4 mr-1" />}
                        {option.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
      )}

      {/* Optional: Clear Filters Button */}
      {/* <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Filter className="h-4 w-4 mr-1" /> Clear
      </Button> */} 
    </div>
  );
};

// Default props providing example filter options
DestinationFilterGroup.defaultProps = {
  availableFilters: {
    themes: ['Adventure', 'Relaxation', 'Culture', 'Wildlife', 'Beach'],
    locations: ['North India', 'South India', 'West India', 'East India'],
    tripTypes: ['Solo', 'Couple', 'Family', 'Group'],
    sortOptions: [
        { label: 'Popularity', value: 'popularity' }, 
        { label: 'Name', value: 'name' }
    ]
  },
  onFilterChange: (filters) => console.log('Filters changed:', filters),
};

export default DestinationFilterGroup;
