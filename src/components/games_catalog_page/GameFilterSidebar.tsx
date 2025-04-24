import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Filter, ChevronDown, X } from 'lucide-react';

interface GameFilterSidebarProps {
  genres: string[];
  platforms: string[];
  initialFilters?: {
    genres?: string[];
    platforms?: string[];
    mode?: 'buy' | 'rent' | 'all';
    priceRange?: [number, number];
  };
  onFilterChange: (filters: any) => void; // Replace 'any' with a specific filter type
  className?: string;
}

const GameFilterSidebar: React.FC<GameFilterSidebarProps> = ({
  genres = ['Action', 'RPG', 'Strategy', 'Simulation', 'Sports'], // Example data
  platforms = ['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch'], // Example data
  initialFilters = { mode: 'all', priceRange: [0, 100] },
  onFilterChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open by default on larger screens maybe?
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialFilters.genres || []);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(initialFilters.platforms || []);
  const [selectedMode, setSelectedMode] = useState<'buy' | 'rent' | 'all'>(initialFilters.mode || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange || [0, 100]);

  const handleGenreChange = (genre: string, checked: boolean | 'indeterminate') => {
    const updatedGenres = checked
      ? [...selectedGenres, genre]
      : selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(updatedGenres);
    triggerFilterChange({ genres: updatedGenres });
  };

  const handlePlatformChange = (platform: string, checked: boolean | 'indeterminate') => {
    const updatedPlatforms = checked
      ? [...selectedPlatforms, platform]
      : selectedPlatforms.filter((p) => p !== platform);
    setSelectedPlatforms(updatedPlatforms);
    triggerFilterChange({ platforms: updatedPlatforms });
  };

  const handleModeChange = (mode: 'buy' | 'rent' | 'all') => {
    setSelectedMode(mode);
    triggerFilterChange({ mode });
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    // Debounce this in a real app
    triggerFilterChange({ priceRange: value });
  };

  const triggerFilterChange = (newFilter: any) => {
    onFilterChange({
      genres: selectedGenres,
      platforms: selectedPlatforms,
      mode: selectedMode,
      priceRange: priceRange,
      ...newFilter,
    });
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setSelectedMode('all');
    setPriceRange([0, 100]);
    onFilterChange({
      genres: [],
      platforms: [],
      mode: 'all',
      priceRange: [0, 100],
    });
  }

  return (
    <aside className={`w-full md:w-64 lg:w-72 bg-card text-card-foreground border-r border-border p-4 md:sticky md:top-0 md:h-screen overflow-y-auto no-scrollbar ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold font-heading flex items-center">
          <Filter className="w-5 h-5 mr-2 text-primary" />
          Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
          Clear All
        </Button>
      </div>

      {/* Optional Collapsible Trigger for Mobile/Small Screens */}
      {/* <CollapsibleTrigger className="md:hidden flex justify-between items-center w-full mb-4 p-2 bg-muted rounded-md">
        <span>Show Filters</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger> */}

      {/* <CollapsibleContent> or just render directly */}
      <div className="space-y-6">
        {/* Genre Filter */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold font-heading">
            Genre
            <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-2 animate-collapsible-down">
            {genres.map((genre) => (
              <div key={genre} className="flex items-center space-x-2">
                <Checkbox
                  id={`genre-${genre}`}
                  checked={selectedGenres.includes(genre)}
                  onCheckedChange={(checked) => handleGenreChange(genre, checked)}
                />
                <Label htmlFor={`genre-${genre}`} className="text-sm font-normal text-muted-foreground cursor-pointer hover:text-foreground">
                  {genre}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Platform Filter */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold font-heading">
            Platform
            <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-2 animate-collapsible-down">
            {platforms.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform}`}
                  checked={selectedPlatforms.includes(platform)}
                  onCheckedChange={(checked) => handlePlatformChange(platform, checked)}
                />
                <Label htmlFor={`platform-${platform}`} className="text-sm font-normal text-muted-foreground cursor-pointer hover:text-foreground">
                  {platform}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Purchase/Rent Mode Filter */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold font-heading">
            Mode
            <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 animate-collapsible-down">
            <RadioGroup defaultValue="all" value={selectedMode} onValueChange={handleModeChange} className="space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="mode-all" />
                <Label htmlFor="mode-all" className="text-sm font-normal text-muted-foreground cursor-pointer hover:text-foreground">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buy" id="mode-buy" />
                <Label htmlFor="mode-buy" className="text-sm font-normal text-muted-foreground cursor-pointer hover:text-foreground">Buy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rent" id="mode-rent" />
                <Label htmlFor="mode-rent" className="text-sm font-normal text-muted-foreground cursor-pointer hover:text-foreground">Rent</Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range Filter */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold font-heading">
            Price Range
            <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 animate-collapsible-down">
            <Slider
              defaultValue={[0, 100]}
              value={priceRange}
              max={100} // Adjust max price as needed
              step={5}
              minStepsBetweenThumbs={1}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      {/* </CollapsibleContent> */}
    </aside>
  );
};

export default GameFilterSidebar;
