import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, User, LineChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming exists for clsx/tailwind-merge
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui Button

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/market-overview', label: 'Market Overview', icon: LineChart },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings }, // Example placeholder route
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ease-in-out md:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex h-full w-64 flex-col',
          'border-r border-[hsl(var(--sidebar-border))]',
          'bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]',
          'transition-transform duration-300 ease-in-out',
          // Mobile/Overlay State
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop Static/Collapsible State (adjust if needed for always-static desktop)
          'md:sticky md:top-0 md:z-30 md:block' // Adjust positioning as needed for desktop layout
          // If desktop should also collapse, add classes like:
          // 'md:transition-[width] md:duration-300 md:ease-in-out',
          // isOpen ? 'md:w-64' : 'md:w-16' // Example desktop collapse width
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--sidebar-border))]">
          {/* Sidebar Header / Logo Area */}
          <Link to="/dashboard" className="flex items-center space-x-2" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[hsl(var(--sidebar-primary))]">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="font-bold">Ascendion</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden" // Only show close button on mobile/overlay
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose} // Close sidebar on navigation (mobile)
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                  'transition-colors',
                  isActive
                    ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]'
                    : 'hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]'
                )}
              >
                <item.icon className={cn('mr-3 h-5 w-5', isActive ? 'text-[hsl(var(--sidebar-accent-foreground))]' : 'text-[hsl(var(--sidebar-foreground))] group-hover:text-[hsl(var(--sidebar-accent-foreground))]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Optional Footer section in Sidebar */}
        {/* <div className="p-4 mt-auto border-t border-[hsl(var(--sidebar-border))] text-xs text-muted-foreground">
          Sidebar Footer Content
        </div> */}
      </aside>
    </>
  );
};

export default Sidebar;
