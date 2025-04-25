import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface DestinationSearchBarProps {
  // Placeholder for potential props like initial value, suggestions, onSearch callback
  onSearch?: (query: string) => void;
}

const DestinationSearchBar: React.FC<DestinationSearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    // Add search logic here or trigger callback
    console.log('Searching for:', searchQuery);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex w-full max-w-2xl items-center space-x-2 p-4 bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-lg shadow-lg border border-border/50 mx-auto my-8 animate-slide-up"
      style={{ animationDelay: '0.1s' }} // Example of staggering entry animation
    >
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search destinations by name, theme, or feature..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-3 h-12 text-base bg-background border-input focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-md shadow-sm"
        />
        {/* Potential location for auto-suggestion dropdown */}
      </div>
      <Button 
        type="submit" 
        className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-md transition-colors duration-200"
      >
        Search
      </Button>
    </form>
  );
};

export default DestinationSearchBar;
