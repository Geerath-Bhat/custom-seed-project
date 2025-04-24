import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Assuming Shadcn UI structure
import { cn } from '@/lib/utils';

interface NewsItem {
  id: string | number;
  title: string;
  summary: string;
  source?: string; // Optional: source like 'Reuters', 'Bloomberg'
  publishedDate?: string; // Optional: formatted date string
  url?: string; // Optional: link to full article
}

interface NewsHeadlineListProps {
  newsItems: NewsItem[];
  className?: string;
}

const NewsHeadlineList: React.FC<NewsHeadlineListProps> = ({ 
  newsItems = [],
  className = '' 
}) => {
  if (!newsItems || newsItems.length === 0) {
    return <p className={cn('text-muted-foreground text-sm', className)}>No recent news available for this stock.</p>;
  }

  return (
    <Accordion type="multiple" className={cn('w-full space-y-2', className)}>
      {newsItems.map((item, index) => (
        <AccordionItem key={item.id || index} value={`item-${index}`} className="border border-border rounded-md px-4 bg-card">
          <AccordionTrigger className="text-left hover:no-underline py-3">
            <div className="flex flex-col">
              <span className="font-medium text-card-foreground text-sm">{item.title}</span>
              {(item.source || item.publishedDate) && (
                <span className="text-xs text-muted-foreground mt-1">
                  {item.source}{item.source && item.publishedDate && ' • '}{item.publishedDate}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-sm text-muted-foreground">
            {item.summary}
            {item.url && (
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline ml-2 text-xs"
              >
                Read more
              </a>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default NewsHeadlineList;
