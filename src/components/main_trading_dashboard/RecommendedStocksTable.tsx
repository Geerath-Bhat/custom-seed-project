import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown, HelpCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the structure for a stock row
interface StockRowData {
  id: string;
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  analystRating?: string;
  recommendationReason?: string;
}

type SortKey = keyof Pick<StockRowData, 'ticker' | 'name' | 'price' | 'changePercent' | 'analystRating'>;
type SortDirection = 'asc' | 'desc';

interface RecommendedStocksTableProps {
  stocks: StockRowData[];
  onStockClick: (stockId: string) => void;
  title?: string;
}

const RecommendedStocksTable: React.FC<RecommendedStocksTableProps> = ({
  stocks,
  onStockClick,
  title = 'Top 10 Recommended Stocks',
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('changePercent'); // Default sort
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc'); // Default to ascending when changing column
    }
  };

  const sortedStocks = React.useMemo(() => {
    return [...stocks].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      // Handle undefined or null values (e.g., analystRating)
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;

      let comparison = 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        // Fallback for mixed types or other types (treat as strings)
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [stocks, sortKey, sortDirection]);

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="ml-2 h-3 w-3 text-muted-foreground/70" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-2 h-3 w-3 text-primary" />
    ) : (
      <ArrowDown className="ml-2 h-3 w-3 text-primary" />
    );
  };

  return (
    <Card className="bg-card text-card-foreground border-border overflow-hidden">
      <CardHeader className="border-b border-border pb-3 pt-4 px-4">
          <CardTitle className="text-xl font-semibold flex items-center">
             <TrendingUp className="mr-2 h-5 w-5 text-primary" />
             {title}
           </CardTitle>
       </CardHeader>
       <CardContent className="p-0">
          <TooltipProvider delayDuration={100}>
            <Table className="w-full">
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border">
                  <TableHead className="px-4 py-2 cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('ticker')}>Ticker {renderSortIcon('ticker')}</TableHead>
                  <TableHead className="px-4 py-2 cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('name')}>Name {renderSortIcon('name')}</TableHead>
                  <TableHead className="px-4 py-2 text-right cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('price')}>Price {renderSortIcon('price')}</TableHead>
                  <TableHead className="px-4 py-2 text-right cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('changePercent')}>% Change {renderSortIcon('changePercent')}</TableHead>
                  <TableHead className="px-4 py-2 text-center cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('analystRating')}>Rating {renderSortIcon('analystRating')}</TableHead>
                  <TableHead className="px-4 py-2 text-center">Why?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStocks.map((stock) => {
                  const isPositive = stock.changePercent >= 0;
                  const colorClass = isPositive ? 'text-success' : 'text-destructive';
                  return (
                    <TableRow
                      key={stock.id}
                      className="border-border hover:bg-muted/30 cursor-pointer transition-colors duration-150 animate-fade-in"
                      onClick={() => onStockClick(stock.id)}
                    >
                      <TableCell className="font-medium px-4 py-2.5">{stock.ticker}</TableCell>
                      <TableCell className="text-muted-foreground px-4 py-2.5 truncate max-w-xs">{stock.name}</TableCell>
                      <TableCell className="text-right px-4 py-2.5">${stock.price.toFixed(2)}</TableCell>
                      <TableCell className={cn('text-right font-medium px-4 py-2.5', colorClass)}>
                        {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-center px-4 py-2.5">{stock.analystRating ?? '-'}</TableCell>
                      <TableCell className="text-center px-4 py-2.5">
                        {stock.recommendationReason ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()} >
                                <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-popover text-popover-foreground border-border max-w-xs">
                              <p>{stock.recommendationReason}</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                           <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {sortedStocks.length === 0 && (
                   <TableRow>
                     <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                       No recommended stocks found.
                     </TableCell>
                   </TableRow>
                )}
              </TableBody>
            </Table>
          </TooltipProvider>
       </CardContent>
    </Card>
  );
};

export default RecommendedStocksTable;

// Re-usable Card components if not globally available
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
