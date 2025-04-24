import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming Shadcn UI structure

interface StockOption {
  value: string; // e.g., ticker 'AAPL'
  label: string; // e.g., 'Apple Inc. (AAPL)'
}

interface StockSelectorDropdownProps {
  stocks: StockOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const StockSelectorDropdown: React.FC<StockSelectorDropdownProps> = ({ 
  stocks = [], 
  selectedValue,
  onValueChange,
  placeholder = "Select stock...",
  className = ''
}) => {
  return (
    <Select value={selectedValue} onValueChange={onValueChange}>
      <SelectTrigger className={`w-[200px] ${className}`}> 
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {stocks.map((stock) => (
          <SelectItem key={stock.value} value={stock.value}>
            {stock.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StockSelectorDropdown;
