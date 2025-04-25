import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility exists
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui Button
// import { useTheme } from 'next-themes'; // Placeholder for theme toggle functionality

type HeaderProps = {
  // Prop to toggle a collapsible sidebar, only passed when relevant
  toggleSidebar?: () => void;
  // Flag to indicate if the current layout uses a collapsible sidebar
  hasCollapsibleSidebar?: boolean;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar, hasCollapsibleSidebar }) => {
  // const { theme, setTheme } = useTheme(); // Placeholder for theme toggle

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          {/* Conditionally render Menu button only if a collapsible sidebar exists */}
          {hasCollapsibleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden" // Often hidden on larger screens where sidebar might be static
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/home" className="flex items-center space-x-2">
            {/* Placeholder Logo/Brand Name */}
            {/* <img src="/logo.svg" alt="Ascendion Logo" className="h-6 w-auto" /> */}
            <span className="font-semibold text-lg text-foreground">ascendion</span>
          </Link>
        </div>

        {/* Placeholder Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/home"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          {/* Example link - adjust based on actual routes */}
          <Link
            to="/destination/some-id" // Example path
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Destinations
          </Link>
           <Link
            to="/group"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Group Trips
          </Link>
        </nav>

        {/* Placeholder User Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Placeholder */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button> */}
          <Button variant="ghost" size="icon" aria-label="User Profile">
             <Link to="/dashboard">
                <User className="h-5 w-5" />
             </Link>
          </Button>
          {/* Add other icons like Cart, Notifications if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;
