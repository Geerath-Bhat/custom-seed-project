import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, Users, Settings } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui Button

interface IntegratedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

// Sidebar intended for 'LSI(C)' layout: Collapsible, Full Height (Integrated).
const IntegratedSidebar: React.FC<IntegratedSidebarProps> = ({ isOpen, onClose, className }) => {
  const location = useLocation();

  const sidebarLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/group', label: 'Group Trips', icon: Users },
    { path: '#settings', label: 'Settings', icon: Settings }, // Placeholder
  ];

  return (
    <>
      {/* Overlay for mobile/tablet when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-border bg-background',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:sticky lg:translate-x-0', // On large screens, make it sticky and always visible
          className
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4 shrink-0">
           <Link to="/home" className="flex items-center space-x-2" onClick={onClose}>
             {/* Placeholder Logo/Brand Name */}
             <span className="font-semibold text-lg text-foreground">ascendion</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={onClose} // Close sidebar on navigation (especially mobile)
                    className={cn(
                      'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <link.icon className="mr-3 h-5 w-5" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Optional Footer section within the sidebar */}
        {/* <div className="mt-auto p-4 border-t border-border">
            <p className="text-xs text-muted-foreground">Sidebar Footer</p>
        </div> */}
      </aside>
    </>
  );
};

export default IntegratedSidebar;
