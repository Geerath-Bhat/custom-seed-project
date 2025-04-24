import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, CalendarClock } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  canBuy: boolean;
  buyPrice?: number;
  canRent: boolean;
  selectedRentalOption?: { price: number; duration: string };
  onBuyClick: () => void;
  onRentClick: () => void;
  isLoading?: boolean;
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  canBuy,
  buyPrice,
  canRent,
  selectedRentalOption,
  onBuyClick,
  onRentClick,
  isLoading = false,
  className
}) => {

  const formatPrice = (price: number | undefined, prefix = '$') => {
    return price !== undefined ? `${prefix}${price.toFixed(2)}` : '';
  }

  return (
    <div className={cn("flex flex-col sm:flex-row gap-3 w-full", className)}>
      {canBuy && (
        <Button
          size="lg"
          onClick={onBuyClick}
          disabled={isLoading}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Buy Now {formatPrice(buyPrice)}
        </Button>
      )}
      {canRent && (
        <Button
          size="lg"
          variant="outline"
          onClick={onRentClick}
          disabled={isLoading || !selectedRentalOption}
          className={cn(
            "flex-1 border-primary text-primary hover:bg-primary/10 text-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105",
            !selectedRentalOption && "opacity-50 cursor-not-allowed"
          )}
        >
          <CalendarClock className="mr-2 h-5 w-5" />
          Rent {selectedRentalOption ? `(${selectedRentalOption.duration} / ${formatPrice(selectedRentalOption.price)})` : '(Select Duration)'}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;