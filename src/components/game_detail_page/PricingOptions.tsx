import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Separator } from '@/components/ui/separator';

interface PriceOption {
  type: 'buy' | 'rent';
  price: number;
  currency?: string;
  duration?: string; // e.g., '24h', '48h', '7 days'
}

interface PricingOptionsProps {
  options: PriceOption[];
  onSelectionChange?: (selectedOption: PriceOption | null) => void;
  className?: string;
}

const PricingOptions: React.FC<PricingOptionsProps> = ({ options = [], onSelectionChange, className }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleValueChange = (value: string) => {
    setSelectedOptionId(value);
    const selected = options.find(opt => `${opt.type}-${opt.duration || 'buy'}` === value) || null;
    if (onSelectionChange) {
      onSelectionChange(selected);
    }
  };

  const buyOption = options.find(opt => opt.type === 'buy');
  const rentalOptions = options.filter(opt => opt.type === 'rent');

  const formatPrice = (price: number, currency: string = '$') => {
    return `${currency}${price.toFixed(2)}`;
  }

  return (
    <div className={cn("p-4 bg-card border border-border rounded-lg shadow-sm space-y-4", className)}>
      {buyOption && (
        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold text-card-foreground">Buy Now</Label>
          <span className="text-xl font-bold text-primary">{formatPrice(buyOption.price, buyOption.currency)}</span>
        </div>
      )}

      {buyOption && rentalOptions.length > 0 && <Separator className="my-4 bg-border/50" />}

      {rentalOptions.length > 0 && (
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-card-foreground">Rent Game</Label>
          <RadioGroup onValueChange={handleValueChange} value={selectedOptionId || undefined} className="space-y-2">
            {rentalOptions.map((option) => {
              const id = `${option.type}-${option.duration || 'rent'}`;
              return (
                <Label
                  key={id}
                  htmlFor={id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-md border border-input cursor-pointer transition-colors",
                    "hover:bg-muted/50",
                    selectedOptionId === id ? "border-primary ring-1 ring-primary bg-muted/50" : "bg-transparent"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={id} id={id} className="border-primary text-primary ring-offset-background focus:ring-ring focus:ring-offset-2" />
                    <span className="font-medium text-card-foreground">{option.duration}</span>
                  </div>
                  <span className="font-semibold text-primary">{formatPrice(option.price, option.currency)}</span>
                </Label>
              );
            })}
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default PricingOptions;