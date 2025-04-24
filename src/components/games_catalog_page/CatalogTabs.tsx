import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface CatalogTabsProps {
  activeTab: 'buy' | 'rent' | 'new';
  onTabChange: (tab: 'buy' | 'rent' | 'new') => void;
  className?: string;
}

const CatalogTabs: React.FC<CatalogTabsProps> = ({
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue={activeTab} onValueChange={(value) => onTabChange(value as 'buy' | 'rent' | 'new')} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-muted">
          <TabsTrigger
            value="buy"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Buy
          </TabsTrigger>
          <TabsTrigger
            value="rent"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Rent
          </TabsTrigger>
          <TabsTrigger
            value="new"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            New Releases
          </TabsTrigger>
        </TabsList>
        {/* Note: TabsContent is typically used to *render* content based on the tab.
            Here, we're using Tabs for navigation state only. The actual content filtering
            will likely happen in the parent component managing the game list. */}
      </Tabs>
    </div>
  );
};

export default CatalogTabs;
