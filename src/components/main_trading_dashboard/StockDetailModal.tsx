import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import StockNewsCards, { NewsItem } from './StockNewsCards'; // Import news component and type

// Placeholder data structure for detailed stock info
interface StockDetailData {
  id: string;
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  dayHigh: number;
  dayLow: number;
  yearHigh: number;
  yearLow: number;
  analystRating?: string; // e.g., 'Buy', 'Hold', 'Sell'
  // More detailed chart data for historical performance
  historicalData: { date: string; price: number }[];
  news: NewsItem[];
}

interface StockDetailModalProps {
  stockData: StockDetailData | null; // Pass null when modal is closed or loading
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const StockDetailModal: React.FC<StockDetailModalProps> = ({ stockData, isOpen, onOpenChange }) => {
  if (!stockData) {
    return null; // Don't render anything if no stock data
  }

  const isPositive = stockData.changePercent >= 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-card text-card-foreground border-border p-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border sticky top-0 bg-card z-10">
          <DialogTitle className="text-2xl font-semibold">{stockData.name} ({stockData.ticker})</DialogTitle>
          <DialogDescription className="flex items-center space-x-4">
             <span className="text-xl font-bold">${stockData.price.toFixed(2)}</span>
             <span className={`font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
               {isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%
             </span>
          </DialogDescription>
           {/* Close button inside header */}
           <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
          {/* Performance Chart Section */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Historical Performance</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockData.historicalData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                  <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }}/>
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                    itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                    cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Key Metrics Section */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 text-sm">
              <div className="bg-muted/50 p-3 rounded-md"><span className="text-muted-foreground">Market Cap:</span> <span className="font-medium text-foreground">{stockData.marketCap}</span></div>
              <div className="bg-muted/50 p-3 rounded-md"><span className="text-muted-foreground">Volume:</span> <span className="font-medium text-foreground">{stockData.volume}</span></div>
              <div className="bg-muted/50 p-3 rounded-md"><span className="text-muted-foreground">Day High:</span> <span className="font-medium text-foreground">${stockData.dayHigh.toFixed(2)}</span></div>
              <div className="bg-muted/50 p-3 rounded-md"><span className="text-muted-foreground">Day Low:</span> <span className="font-medium text-foreground">${stockData.dayLow.toFixed(2)}</span></div>
              <div className="bg-muted/50 p-3 rounded-md"><span className="text-muted-foreground">52 Week High:</span> <span className="font-medium text-foreground">${stockData.yearHigh.toFixed(2)}</span></div>
              <div className="bg-muted/50 p-3 rounded-md"><span className="text-muted-foreground">52 Week Low:</span> <span className="font-medium text-foreground">${stockData.yearLow.toFixed(2)}</span></div>
              {stockData.analystRating && (
                 <div className="bg-muted/50 p-3 rounded-md"><span className="text-muted-foreground">Analyst Rating:</span> <span className="font-medium text-foreground">{stockData.analystRating}</span></div>
              )}
            </div>
          </section>

          {/* News Section */}
          <section>
             <h3 className="text-lg font-semibold mb-3">Related News</h3>
             <StockNewsCards newsItems={stockData.news} /> {/* Show all news here */}
          </section>

           {/* Advanced Analytics Placeholder */}
          {/* <section>
             <h3 className="text-lg font-semibold mb-3">Advanced Analytics</h3>
             <p className="text-muted-foreground">Advanced analytics content goes here...</p>
          </section> */}
        </div>

        <DialogFooter className="p-4 border-t border-border sticky bottom-0 bg-card z-10">
          {/* Add actions if needed, e.g., Add to Watchlist */}
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StockDetailModal;
