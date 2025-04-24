import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ShieldCheck, Utensils, Accessibility, Info } from 'lucide-react';

interface InfoItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ElementType;
}

interface ShopInfoSectionProps {
  items?: InfoItem[];
}

const defaultItems: InfoItem[] = [
  {
    id: 'policies',
    title: 'Shop Policies',
    icon: ShieldCheck,
    content: (
      <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
        <li>Minimum age for unaccompanied entry is 13.</li>
        <li>No outside food or drinks allowed, except water bottles.</li>
        <li>Respectful behavior towards staff and other patrons is required.</li>
        <li>Please handle equipment with care. Damages may incur fees.</li>
        <li>Current COVID-19 guidelines (if any) will be posted at the entrance.</li>
      </ul>
    ),
  },
  {
    id: 'amenities',
    title: 'Amenities',
    icon: Utensils,
    content: (
       <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
        <li>Snack bar with drinks and light refreshments available for purchase.</li>
        <li>Clean and accessible restrooms on site.</li>
        <li>Comfortable seating areas for non-gamers or breaks.</li>
        <li>Free Wi-Fi access for all visitors.</li>
      </ul>
    ),
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    icon: Accessibility,
    content: (
      <p className="text-sm text-muted-foreground">
        Our shop entrance is wheelchair accessible. Most gaming stations have adjustable seating.
        Restrooms are designed for accessibility. Please contact us if you have specific needs or questions.
      </p>
    ),
  },
];

const ShopInfoSection: React.FC<ShopInfoSectionProps> = ({ items = defaultItems }) => {
  if (!items || items.length === 0) {
    return null; // Don't render anything if there are no items
  }

  // If only one item, display it directly without accordion
  if (items.length === 1) {
    const item = items[0];
    return (
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold flex items-center mb-2">
          <item.icon className="w-5 h-5 mr-2 text-primary" /> {item.title}
        </h3>
        <div className="text-muted-foreground text-sm">{item.content}</div>
      </div>
    );
  }

  // If multiple items, use Accordion
  return (
    <div className="w-full">
      <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
          <Info className="mr-2 h-5 w-5 text-primary" /> Additional Information
      </h3>
      <Accordion type="single" collapsible className="w-full border rounded-lg px-4 bg-card divide-y divide-border">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-b-border/50">
            <AccordionTrigger className="text-base font-medium hover:no-underline py-4">
              <span className="flex items-center">
                <item.icon className="w-5 h-5 mr-3 text-primary/90" />
                {item.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ShopInfoSection;
