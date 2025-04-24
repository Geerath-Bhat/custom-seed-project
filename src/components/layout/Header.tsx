import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, Settings, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming exists for clsx/tailwind-merge
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui Button
// import { useTheme } from 'next-themes'; // Uncomment if theme toggle implemented

interface HeaderProps {
  toggleSidebar?: () => void; // Optional: Only needed if a collapsible sidebar exists
  hasCollapsibleSidebar?: boolean; // Flag to conditionally render menu toggle
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, hasCollapsibleSidebar }) => {
  // const { theme, setTheme } = useTheme(); // Uncomment for theme toggle

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full',
      'border-b border-border',
      'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
    )}>
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        <div className="mr-4 flex items-center">
          {/* Conditionally render menu toggle button for collapsible sidebar */}
          {hasCollapsibleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden" // Hide on medium screens and up where sidebar might become static
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
            {/* Placeholder Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="font-bold inline-block text-foreground">Ascendion</span>
          </Link>
        </div>

        {/* Placeholder Navigation (can be expanded) */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/dashboard"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Dashboard
          </Link>
          <Link
            to="/market-overview"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Market
          </Link>
          {/* Add more links as needed */}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Placeholder User Actions */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle Theme"
          >
            <Sun className="h-5 w-5 scale-100 dark:scale-0 transition-all" />
            <Moon className="h-5 w-5 absolute scale-0 dark:scale-100 transition-all" />
          </Button> */}
           <Button variant="ghost" size="icon" aria-label="Settings Placeholder">
            <Settings className="h-5 w-5 text-foreground/60 hover:text-foreground/80 transition-colors" />
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="icon" aria-label="User Profile">
              <User className="h-5 w-5 text-foreground/60 hover:text-foreground/80 transition-colors" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
