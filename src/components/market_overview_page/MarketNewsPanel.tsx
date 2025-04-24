import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

// Placeholder data structure
interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  publishTime: Date;
  source: string;
  url: string;
}

interface MarketNewsPanelProps {
  newsItems: NewsItem[];
  title?: string;
  maxHeight?: string;
}

const MarketNewsPanel: React.FC<MarketNewsPanelProps> = ({ newsItems, title = 'Market News & Economic Indicators', maxHeight = '400px' }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          {newsItems.length > 0 ? (
            <ul className="space-y-4">
              {newsItems.map((item) => (
                <li key={item.id} className="border-b border-border pb-4 last:border-b-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:bg-muted/50 p-2 rounded-md transition-colors duration-150 group"
                  >
                    <h4 className="text-base font-medium text-foreground group-hover:text-primary mb-1">
                      {item.headline}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="text-xs text-muted-foreground flex justify-between items-center">
                      <span>{item.source}</span>
                      <time dateTime={item.publishTime.toISOString()}>
                        {formatDistanceToNow(item.publishTime, { addSuffix: true })}
                      </time>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-10">No news available.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Add default props for demonstration
MarketNewsPanel.defaultProps = {
    newsItems: [
        {
            id: '1',
            headline: 'Fed Holds Rates Steady, Signals Patience on Cuts',
            summary: 'The Federal Reserve kept interest rates unchanged as expected, emphasizing the need for more confidence in inflation control before considering rate cuts.',
            publishTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
            source: 'Reuters',
            url: '#',
        },
        {
            id: '2',
            headline: 'Tech Sector Leads Market Rally Amid Strong Earnings Reports',
            summary: 'Major technology companies reported better-than-expected earnings, boosting the overall market sentiment and driving major indices higher.',
            publishTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
            source: 'Bloomberg',
            url: '#',
        },
        {
            id: '3',
            headline: 'Oil Prices Dip Slightly on Inventory Build Data',
            summary: 'Crude oil futures saw a minor pullback after weekly inventory data showed a larger-than-anticipated build in stockpiles.',
            publishTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
            source: 'MarketWatch',
            url: '#',
        },
         {
            id: '4',
            headline: 'US Jobless Claims Remain Low, Pointing to Labor Market Strength',
            summary: 'Initial claims for unemployment benefits stayed near historic lows, indicating continued resilience in the U.S. labor market despite higher interest rates.',
            publishTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            source: 'Associated Press',
            url: '#',
        },
    ]
}

export default MarketNewsPanel;
