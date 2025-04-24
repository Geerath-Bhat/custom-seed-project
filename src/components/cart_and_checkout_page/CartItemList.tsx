import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

// Define interfaces for item data
interface CartItemProps {
  id: string;
  type: 'Buy' | 'Rent';
  imageUrl: string;
  name: string;
  price: number;
  rentalPeriod?: number; // Days, only if type is 'Rent'
  platform: string;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onRentalPeriodChange?: (id: string, period: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  type,
  imageUrl,
  name,
  price,
  rentalPeriod,
  platform,
  quantity,
  onQuantityChange,
  onRentalPeriodChange,
  onRemove
}) => {
  return (
    <Card className="mb-4 overflow-hidden border-border card-hover-basic relative bg-card/80 glass-effect">
      <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          {/* Using img tag as Next Image isn't guaranteed by package.json */}
          <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-md border border-border" />
           <span className="absolute top-1 left-1 bg-primary/80 text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">{type}</span>
        </div>

        <div className="flex-grow flex flex-col gap-1">
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">Platform: {platform}</p>
          <p className="text-lg font-bold text-primary">${price.toFixed(2)} {type === 'Rent' ? '/ month' : ''}</p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-shrink-0 mt-2 md:mt-0">
          {type === 'Rent' && onRentalPeriodChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Duration:</span>
              <Select
                value={rentalPeriod?.toString() ?? '30'}
                onValueChange={(value) => onRentalPeriodChange(id, parseInt(value))}
              >
                <SelectTrigger className="w-[80px] h-9">
                  <SelectValue placeholder="Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center gap-2">
             <span className="text-sm text-muted-foreground">Qty:</span>
             <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => onQuantityChange(id, parseInt(e.target.value) || 1)}
                className="w-16 h-9 text-center"
                disabled={type === 'Rent'} // Typically rent 1 item
             />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 md:ml-4"
            onClick={() => onRemove(id)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
      {/* Optional Iron Man inspired glow effect */}
      <div className="absolute inset-0 border border-primary/30 rounded-lg pointer-events-none animate-pulse-gentle opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </Card>
  );
};

interface CartItemListProps {
  items: Omit<CartItemProps, 'onQuantityChange' | 'onRentalPeriodChange' | 'onRemove'>[];
  // Add handler functions as props passed down from the parent managing cart state
  handleQuantityChange: (id: string, quantity: number) => void;
  handleRentalPeriodChange?: (id: string, period: number) => void;
  handleRemoveItem: (id: string) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({ items, handleQuantityChange, handleRentalPeriodChange, handleRemoveItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Your cart is empty.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] w-full pr-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onQuantityChange={handleQuantityChange}
            onRentalPeriodChange={item.type === 'Rent' ? handleRentalPeriodChange : undefined}
            onRemove={handleRemoveItem}
          />
        ))}
    </ScrollArea>
  );
};

export default CartItemList;
