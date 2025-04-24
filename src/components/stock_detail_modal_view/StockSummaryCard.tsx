import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'; // Assuming Shadcn UI structure
import { cn } from '@/lib/utils'; // Assuming Shadcn utility function for class merging

interface StockSummaryCardProps {
  ticker: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  className?: string;
}

const StockSummaryCard: React.FC<StockSummaryCardProps> = ({ 
  ticker,
  name,
  currentPrice,
  priceChange,
  priceChangePercent,
  className = ''
}) => {

  const isPositiveChange = priceChange >= 0;
  const changeColor = isPositiveChange ? 'text-success' : 'text-destructive';

  return (
    <Card className={cn('bg-card text-card-foreground', className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-baseline">
          <CardTitle className="text-2xl font-bold">{ticker}</CardTitle>
          <span className="text-sm text-muted-foreground">{name}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <p className="text-3xl font-semibold">${currentPrice.toFixed(2)}</p>
          <p className={cn('text-lg font-medium', changeColor)}>
            {isPositiveChange ? '+' : ''}{priceChange.toFixed(2)} ({isPositiveChange ? '+' : ''}{priceChangePercent.toFixed(2)}%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockSummaryCard;
