import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface GameSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
  className?: string;
}

const GameSearchBar: React.FC<GameSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search games by title or keyword...',
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-lg ${className}`}> {/* Adjust max-width as needed */}
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-md focus:ring-1 focus:ring-ring focus:border-primary"
        aria-label="Search games"
      />
      {/* Add suggestions/autocomplete dropdown here if needed */}
    </div>
  );
};

export default GameSearchBar;
