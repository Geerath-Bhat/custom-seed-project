import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Placeholder data structure
interface MarketStats {
  advancing: number;
  declining: number;
  unchanged: number;
  sentiment?: 'Bullish' | 'Bearish' | 'Neutral';
  marketHigh?: number;
  marketLow?: number;
}

interface MarketStatCardsProps {
  stats: MarketStats;
}

const MarketStatCards: React.FC<MarketStatCardsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Advancing</CardTitle>
          <ArrowUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{stats.advancing?.toLocaleString() ?? 'N/A'}</div>
          <p className="text-xs text-muted-foreground">Stocks gaining value</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Declining</CardTitle>
          <ArrowDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{stats.declining?.toLocaleString() ?? 'N/A'}</div>
          <p className="text-xs text-muted-foreground">Stocks losing value</p>
        </CardContent>
      </Card>

       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Unchanged</CardTitle>
          <Minus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-muted-foreground">{stats.unchanged?.toLocaleString() ?? 'N/A'}</div>
          <p className="text-xs text-muted-foreground">Stocks with no price change</p>
        </CardContent>
      </Card>

      {stats.sentiment && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sentiment</CardTitle>
            {stats.sentiment === 'Bullish' && <TrendingUp className="h-4 w-4 text-success" />}
            {stats.sentiment === 'Bearish' && <TrendingDown className="h-4 w-4 text-destructive" />}
            {stats.sentiment === 'Neutral' && <Minus className="h-4 w-4 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.sentiment === 'Bullish' ? 'text-success' : stats.sentiment === 'Bearish' ? 'text-destructive' : 'text-muted-foreground'}`}>
                {stats.sentiment}
            </div>
            <p className="text-xs text-muted-foreground">Overall market mood</p>
          </CardContent>
        </Card>
      )}

      {/* Add more cards for marketHigh, marketLow etc. if needed */} 

    </div>
  );
};

// Add default props for demonstration
MarketStatCards.defaultProps = {
    stats: {
        advancing: 1850,
        declining: 1230,
        unchanged: 320,
        sentiment: 'Bullish',
        marketHigh: 5100.50,
        marketLow: 5050.75
    }
}

export default MarketStatCards;
