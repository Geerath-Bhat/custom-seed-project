import React from 'react';
import { cn } from "@/lib/utils"; // Assuming Shadcn's utility setup

interface GameImageBannerProps {
  imageUrl: string;
  altText: string;
  className?: string;
}

const GameImageBanner: React.FC<GameImageBannerProps> = ({ imageUrl, altText, className }) => {
  return (
    <div className={cn("relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden", className)}>
      <img
        src={imageUrl}
        alt={altText}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* HUD-style overlay example - adjust colors and design as needed */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 border-4 border-primary/30 pointer-events-none" style={{ clipPath: 'inset(10px 10px 10px 10px)' }}></div>
      {/* Optional corner elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
    </div>
  );
};

export default GameImageBanner;