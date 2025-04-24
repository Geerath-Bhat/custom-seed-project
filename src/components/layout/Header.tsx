import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button path
import { cn } from '@/lib/utils'; // Assuming utility function path

interface HeaderProps {
  toggleSidebar?: () => void; // Optional prop to toggle a sidebar
  showSidebarToggle?: boolean; // Explicitly control if the toggle should be shown
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, showSidebarToggle = false }) => {
  const appName = 'vite_react_shadcn_ts'; // From package.json

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          {showSidebarToggle && toggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden" // Typically shown only on mobile for LSB/RSB
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center space-x-2">
             <Sparkles className="h-6 w-6 text-primary" />
             <span className="font-bold text-lg font-heading text-foreground hover:text-primary transition-colors">
                {appName}
             </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/games"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            Games
          </Link>
          <Link
            to="/shop"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            Shop Info
          </Link>
          {/* Add other main navigation links here */}
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" aria-label="Shopping Cart">
             <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
             </Link>
          </Button>
          {/* Placeholder for User Profile/Auth */}
          <Button variant="ghost" size="icon" aria-label="User Profile">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>
          {/* Placeholder for Theme Toggle - requires implementation with next-themes */}
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
