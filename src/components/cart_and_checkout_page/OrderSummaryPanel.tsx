import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils'; // Assuming utils file

interface OrderSummaryPanelProps {
  subtotal: number;
  discountAmount?: number;
  discountCode?: string;
  taxes: number;
  fees: number;
  className?: string;
}

const OrderSummaryPanel: React.FC<OrderSummaryPanelProps> = ({
  subtotal,
  discountAmount = 0,
  discountCode,
  taxes,
  fees,
  className
}) => {
  const total = subtotal - discountAmount + taxes + fees;

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <Card className={cn('shadow-lg border border-border sticky top-4', className)}>
      <CardHeader>
        <CardTitle className="text-xl font-heading">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center text-foreground">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-success">
            <span>Discount {discountCode ? `(${discountCode})` : ''}</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Taxes</span>
          <span>{formatCurrency(taxes)}</span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Fees</span>
          <span>{formatCurrency(fees)}</span>
        </div>
        <Separator className="my-3 bg-border" />
        <div className="flex justify-between items-center text-xl font-bold text-foreground">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryPanel;
