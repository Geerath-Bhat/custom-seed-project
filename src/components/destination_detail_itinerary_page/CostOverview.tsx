import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';

interface CostBreakdown {
  [category: string]: number;
}

interface CostOverviewProps {
  totalCost: number;
  breakdown?: CostBreakdown;
  currency?: string;
}

const CostOverview: React.FC<CostOverviewProps> = ({ totalCost, breakdown = {}, currency = 'USD' }) => {

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
  };

  return (
    <Card className="w-full shadow-sm border border-border bg-card sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary flex items-center">
          <DollarSign className="mr-2 h-5 w-5" />
          Estimated Trip Cost
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center py-2">
          <p className="text-sm text-muted-foreground mb-1">Total Estimated</p>
          <p className="text-3xl font-bold text-foreground">{formatCurrency(totalCost)}</p>
        </div>

        {Object.keys(breakdown).length > 0 && (
          <>
            <Separator className="my-3 bg-border" />
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Breakdown:</h4>
            <ul className="space-y-1.5 text-sm">
              {Object.entries(breakdown).map(([category, cost]) => (
                <li key={category} className="flex justify-between items-center">
                  <span className="text-foreground capitalize">{category.replace(/_/g, ' ')}</span>
                  <span className="font-medium text-foreground/90">{formatCurrency(cost)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="text-xs text-muted-foreground/80 text-center pt-2">
          *Costs are estimates and may vary. Updates in real-time based on selections.
        </p>
      </CardContent>
    </Card>
  );
};

export default CostOverview;
