import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Assuming exists for clsx/tailwind-merge

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      'mt-auto border-t border-border',
      'bg-muted text-muted-foreground'
    )}>
      <div className="container mx-auto px-4 py-8 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand/About */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Ascendion</h3>
            <p className="text-sm">
              Empowering your financial decisions.
            </p>
            {/* Placeholder Social Links */}
            <div className="flex space-x-3 mt-4">
              {/* Replace with actual icons/links */}
              <span className="text-xs">Social</span>
              <span className="text-xs">Links</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/market-overview" className="hover:text-foreground transition-colors">Market</Link></li>
              <li><Link to="/profile" className="hover:text-foreground transition-colors">Profile</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li> {/* Placeholder */} 
            </ul>
          </div>

          {/* Column 3: Legal/Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li> {/* Placeholder */} 
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li> {/* Placeholder */} 
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li> {/* Placeholder */} 
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm">
          <p>&copy; {currentYear} Ascendion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
