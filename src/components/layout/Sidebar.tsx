import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, Gamepad2, Settings, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  // Add any other props needed, e.g., navigation items
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const sidebarNavItems = [
    { href: '/', label: 'Home', icon: LayoutDashboard },
    { href: '/games', label: 'Games Catalog', icon: Gamepad2 },
    { href: '/shop', label: 'Shop Info', icon: Store },
    // Add more sidebar links as needed
    { href: '#', label: 'Settings', icon: Settings }, // Placeholder
  ];

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-border bg-background transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
      aria-label="Sidebar"
    >
      {/* Sidebar Header (Optional) */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <span className="font-semibold text-lg font-heading text-foreground">Menu</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden" // Hide close button on larger screens where sidebar is part of layout
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {sidebarNavItems.map((item) => {
             const isActive = location.pathname === item.href;
             return (
                <li key={item.href}>
                <Link
                    to={item.href}
                    onClick={onClose} // Close sidebar on navigation (useful for mobile overlay)
                    className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                </Link>
                </li>
             );
            })
          }
        </ul>
      </nav>

      {/* Sidebar Footer (Optional) */}
      {/* <div className="mt-auto border-t border-border p-4">
        <p className="text-xs text-muted-foreground">Sidebar Footer Content</p>
      </div> */}

      {/* Mobile Overlay Background (closes sidebar on click) */}
       {isOpen && (
         <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
       )}
    </aside>
  );
};

export default Sidebar;
