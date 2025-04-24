import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const appName = 'vite_react_shadcn_ts'; // From package.json

  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 px-4 md:flex-row md:py-6 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
           <Link to="/" className="flex items-center space-x-2 mb-2 md:mb-0">
             <Sparkles className="h-5 w-5 text-primary" />
             <span className="text-sm font-semibold text-foreground">
                {appName}
             </span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} {appName}. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-end">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/games" className="hover:text-foreground transition-colors">
            Games
          </Link>
          <Link to="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          {/* Add other footer links like Terms, Privacy, etc. */}
          <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
          <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
