import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Filter, RotateCcw } from 'lucide-react';

export interface Filters {
  budget?: [number, number];
  rating?: number; // Minimum rating
  amenities?: string[];
  type?: string;
}

interface AccommodationFilterGroupProps {
  initialFilters?: Filters;
  availableAmenities?: string[];
  availableTypes?: string[];
  maxPrice?: number;
  onFilterChange: (newFilters: Filters) => void;
  onResetFilters?: () => void;
}

const AccommodationFilterGroup: React.FC<AccommodationFilterGroupProps> = ({
  initialFilters = {},
  availableAmenities = ['WiFi', 'Pool', 'Parking', 'Gym', 'Pet Friendly'],
  availableTypes = ['Hotel', 'Hostel', 'Apartment', 'Resort'],
  maxPrice = 1000,
  onFilterChange,
  onResetFilters,
}) => {
  // Ideally, manage filter state here or lift it up
  // For simplicity, this example calls onFilterChange directly, assuming parent manages state.

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...initialFilters, budget: [value[0], value[1]] });
  };

  const handleRatingChange = (value: string) => {
    onFilterChange({ ...initialFilters, rating: parseInt(value) });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = initialFilters.amenities || [];
    const newAmenities = checked
      ? [...currentAmenities, amenity]
      : currentAmenities.filter(a => a !== amenity);
    onFilterChange({ ...initialFilters, amenities: newAmenities });
  };

  const handleTypeChange = (type: string) => {
     onFilterChange({ ...initialFilters, type: type === 'all' ? undefined : type });
  }

  return (
    <Card className="w-full shadow-sm border border-border bg-card sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-primary flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filter Accommodations
        </CardTitle>
        {onResetFilters && (
           <Button variant="ghost" size="sm" onClick={onResetFilters} className="text-muted-foreground hover:text-primary">
              <RotateCcw className="h-4 w-4 mr-1"/>
              Reset
           </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range Slider */}
        <div className="space-y-2">
          <Label htmlFor="price-range" className="font-medium">Price Range (per night)</Label>
          <Slider
            id="price-range"
            min={0}
            max={maxPrice}
            step={10}
            defaultValue={initialFilters.budget || [0, maxPrice]}
            onValueCommit={handlePriceChange} // Use onValueCommit to avoid too many updates while dragging
            className="mt-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${initialFilters.budget?.[0] ?? 0}</span>
            <span>${initialFilters.budget?.[1] ?? maxPrice}</span>
          </div>
        </div>

        {/* Rating Select */}
         <div className="space-y-2">
           <Label htmlFor="rating-select" className="font-medium">Minimum Rating</Label>
            <Select onValueChange={handleRatingChange} value={initialFilters.rating?.toString()}> 
              <SelectTrigger id="rating-select">
                 <SelectValue placeholder="Any Rating" />
              </SelectTrigger>
              <SelectContent>
                 <SelectItem value="0">Any Rating</SelectItem>
                 <SelectItem value="4">4 Stars & Up</SelectItem>
                 <SelectItem value="3">3 Stars & Up</SelectItem>
                 <SelectItem value="2">2 Stars & Up</SelectItem>
              </SelectContent>
            </Select>
         </div>

        {/* Accommodation Type Radio/Select */}
        <div className="space-y-2">
          <Label className="font-medium">Accommodation Type</Label>
          <RadioGroup defaultValue={initialFilters.type || 'all'} onValueChange={handleTypeChange} className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center space-x-2">
                 <RadioGroupItem value="all" id="type-all" />
                 <Label htmlFor="type-all">All</Label>
               </div>
            {availableTypes.map(type => (
               <div key={type} className="flex items-center space-x-2">
                 <RadioGroupItem value={type} id={`type-${type}`} />
                 <Label htmlFor={`type-${type}`}>{type}</Label>
               </div>
            ))}
          </RadioGroup>
        </div>

        {/* Amenities Checkboxes */}
        <div className="space-y-2">
          <Label className="font-medium">Amenities</Label>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {availableAmenities.map(amenity => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox 
                    id={`amenity-${amenity}`}
                    checked={initialFilters.amenities?.includes(amenity)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)}
                 />
                <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">{amenity}</Label>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default AccommodationFilterGroup;
