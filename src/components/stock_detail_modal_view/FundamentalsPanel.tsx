import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming Shadcn UI structure
import { cn } from '@/lib/utils';

interface FundamentalsData {
  marketCap?: number | string;
  peRatio?: number | string;
  dividendYield?: number | string;
  sector?: string;
  industry?: string;
  volume?: number | string;
  avgVolume?: number | string;
  yearHigh?: number | string;
  yearLow?: number | string;
  // Add more fundamental data points as needed
}

interface FundamentalsPanelProps {
  data: FundamentalsData;
  className?: string;
}

const formatValue = (value: number | string | undefined): string => {
  if (value === undefined || value === null) return 'N/A';
  if (typeof value === 'number') {
    // Simple formatting example, adjust as needed
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (Math.abs(value) < 100 && !Number.isInteger(value)) return value.toFixed(2);
    return value.toLocaleString();
  }
  return value;
};

const FundamentalItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-border last:border-b-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-foreground">{value}</span>
  </div>
);

const FundamentalsPanel: React.FC<FundamentalsPanelProps> = ({ 
  data,
  className = '' 
}) => {
  return (
    <Card className={cn('bg-card text-card-foreground', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Key Fundamentals</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-1">
          <FundamentalItem label="Market Cap" value={formatValue(data.marketCap)} />
          <FundamentalItem label="P/E Ratio" value={formatValue(data.peRatio)} />
          <FundamentalItem label="Dividend Yield" value={data.dividendYield !== undefined ? `${formatValue(data.dividendYield)}%` : 'N/A'} />
          <FundamentalItem label="Sector" value={data.sector || 'N/A'} />
          <FundamentalItem label="Industry" value={data.industry || 'N/A'} />
          <FundamentalItem label="Volume" value={formatValue(data.volume)} />
          <FundamentalItem label="Avg Volume" value={formatValue(data.avgVolume)} />
          <FundamentalItem label="52 Week High" value={data.yearHigh !== undefined ? `$${formatValue(data.yearHigh)}` : 'N/A'} />
          <FundamentalItem label="52 Week Low" value={data.yearLow !== undefined ? `$${formatValue(data.yearLow)}` : 'N/A'} />
          {/* Add more items here */}
        </div>
      </CardContent>
    </Card>
  );
};

export default FundamentalsPanel;
