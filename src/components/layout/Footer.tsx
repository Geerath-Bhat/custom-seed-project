import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Assuming cn utility exists

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-muted text-muted-foreground border-t border-border")}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand/About */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">ascendion</h3>
            <p className="text-sm">
              Explore the world with us. Curated travel experiences and seamless booking.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/home" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Destinations</Link></li> {/* Placeholder */} 
              <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li> {/* Placeholder */} 
              <li><Link to="#" className="hover:text-primary transition-colors">Contact</Link></li> {/* Placeholder */} 
            </ul>
          </div>

          {/* Column 3: Legal/Social */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link></li> {/* Placeholder */} 
              <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li> {/* Placeholder */} 
            </ul>
             {/* Add Social Media Icons here if needed */}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-xs">
          &copy; {currentYear} ascendion. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
