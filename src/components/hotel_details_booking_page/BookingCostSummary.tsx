import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface BookingCostSummaryProps {
  subtotal: number;
  taxes?: number;
  fees?: number;
  discountAmount?: number;
  discountLabel?: string;
  total: number;
  currency?: string;
  nights?: number; // Optional: to display price per night breakdown
}

const BookingCostSummary: React.FC<BookingCostSummaryProps> = ({
  subtotal,
  taxes = 0,
  fees = 0,
  discountAmount = 0,
  discountLabel = 'Discount',
  total,
  currency = 'USD',
  nights,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {nights && subtotal > 0 && (
           <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatCurrency(subtotal / nights)} x {nights} night{nights !== 1 ? 's' : ''}</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        )}
        {!nights && subtotal > 0 && (
             <div className="flex justify-between text-sm text-muted-foreground">
                <span>Room Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
             </div>
        )}

        {(taxes > 0 || fees > 0) && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Taxes & Fees</span>
            <span>{formatCurrency(taxes + fees)}</span>
          </div>
        )}

        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-success">
            <span>{discountLabel}</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <Separator className="my-2" />

        <div className="flex justify-between text-base font-semibold text-foreground">
          <span>Total Price</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCostSummary;
