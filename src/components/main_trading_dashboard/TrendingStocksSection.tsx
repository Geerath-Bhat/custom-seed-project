import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names
import StockNewsCards from './StockNewsCards'; // Import the news card component

// Placeholder data structure for a stock
interface StockData {
  id: string;
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  // Simplified chart data - replace with actual data structure
  chartData: { name: string; value: number }[];
  news: NewsItem[]; // Assuming NewsItem type is defined in StockNewsCards or shared
}

// Placeholder data for news item (adjust as needed)
interface NewsItem {
  id: string;
  headline: string;
  source: string;
  summary: string;
  timestamp: string;
  fullArticle: string;
}

interface TrendingStockCardProps {
  stock: StockData;
  onStockClick: (stockId: string) => void;
}

const TrendingStockCard: React.FC<TrendingStockCardProps> = ({ stock, onStockClick }) => {
  const isPositive = stock.changePercent >= 0;
  const colorClass = isPositive ? 'text-success' : 'text-destructive';
  const IconComponent = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card
      className="bg-card text-card-foreground border-border cursor-pointer hover:shadow-lg transition-shadow duration-200 stagger-item flex flex-col"
      onClick={() => onStockClick(stock.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{stock.ticker}</CardTitle>
          <div className={cn('flex items-center font-semibold', colorClass)}>
            <IconComponent className="h-4 w-4 mr-1" />
            {stock.changePercent.toFixed(2)}%
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{stock.name}</p>
        <p className="text-xl font-bold">${stock.price.toFixed(2)}</p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between pt-0">
        <div className="h-24 -mx-4 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stock.chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <defs>
                 <linearGradient id={`gradient-${stock.ticker}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
              />
              {/* Minimal axes for visual trend */}
              <XAxis dataKey="name" hide />
              <YAxis domain={['auto', 'auto']} hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
                strokeWidth={2}
                dot={false}
                fillOpacity={1}
                fill={`url(#gradient-${stock.ticker})`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Integrate News Cards Here */}
        <div className="mt-2 border-t border-border pt-2">
          <StockNewsCards newsItems={stock.news} maxVisible={2} /> {/* Limit initially visible news items */}
        </div>
      </CardContent>
    </Card>
  );
};

interface TrendingStocksSectionProps {
  stocks: StockData[];
  onStockClick: (stockId: string) => void;
}

const TrendingStocksSection: React.FC<TrendingStocksSectionProps> = ({ stocks, onStockClick }) => {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No trending stocks available.
      </div>
    );
  }

  // Ensure we only show top 3
  const top3Stocks = stocks.slice(0, 3);

  return (
    <section aria-labelledby="trending-stocks-title">
       <h2 id="trending-stocks-title" className="text-2xl font-semibold mb-4 flex items-center">
         <TrendingUp className="mr-2 h-6 w-6 text-primary" />
         Top 3 Trending Stocks
       </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-container">
        {top3Stocks.map((stock) => (
          <TrendingStockCard key={stock.id} stock={stock} onStockClick={onStockClick} />
        ))}
      </div>
    </section>
  );
};

export default TrendingStocksSection;
