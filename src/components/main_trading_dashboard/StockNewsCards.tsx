import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'; // For relative time

// Define the structure for a single news item
export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  summary: string;
  timestamp: string; // Expecting ISO date string or Date object
  fullArticle: string;
}

interface StockNewsCardsProps {
  newsItems: NewsItem[];
  maxVisible?: number; // Optionally limit initially visible items
}

const StockNewsCards: React.FC<StockNewsCardsProps> = ({ newsItems, maxVisible }) => {
  const itemsToShow = maxVisible ? newsItems.slice(0, maxVisible) : newsItems;

  if (!itemsToShow || itemsToShow.length === 0) {
    return <p className="text-sm text-muted-foreground px-1 py-2">No recent news available.</p>;
  }

  return (
    <div className="space-y-2">
       <h4 className="text-sm font-medium text-muted-foreground flex items-center mb-1">
         <Newspaper className="h-4 w-4 mr-1.5" /> Related News
       </h4>
      <Accordion type="single" collapsible className="w-full">
        {itemsToShow.map((item, index) => (
          <AccordionItem key={item.id} value={`item-${index}`} className="border-b-0 mb-1 last:mb-0">
             {/* Using a Card for subtle visual grouping */}
            <Card className="bg-muted/50 border-none overflow-hidden">
               <AccordionTrigger className="text-sm font-medium px-3 py-2 text-left hover:no-underline hover:bg-muted/70 transition-colors">
                 <span className="flex-1 mr-2 truncate" title={item.headline}>{item.headline}</span>
               </AccordionTrigger>
               <AccordionContent className="px-3 pb-3 pt-1 text-sm text-muted-foreground bg-muted/30">
                 <p className="mb-2 text-pretty">{item.summary}</p>
                 <div className="flex justify-between items-center text-xs">
                   <span className="font-medium text-foreground/80">{item.source}</span>
                   <span title={new Date(item.timestamp).toLocaleString()}>
                     {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                   </span>
                 </div>
                 {/* Optional: Add a link to the full article if available */}
                 {/* <a href="#" className="text-primary text-xs mt-1 hover:underline">Read more</a> */}
               </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
       {/* Optional: Show more button if maxVisible is used */}
       {maxVisible && newsItems.length > maxVisible && (
         <button className="text-xs text-primary hover:underline mt-1 px-1">
           Show more news...
         </button>
       )}
    </div>
  );
};

export default StockNewsCards;
