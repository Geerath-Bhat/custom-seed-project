import React from 'react';
import { cn } from "@/lib/utils";

interface GameDescriptionProps {
  title: string;
  description: string;
  thematicCopy?: string; // For Iron Man/Marvel tie-ins
  className?: string;
}

const GameDescription: React.FC<GameDescriptionProps> = ({ title, description, thematicCopy, className }) => {
  return (
    <div className={cn("space-y-4 text-foreground/90", className)}>
      <h1 className="text-3xl md:text-4xl font-bold font-family-heading text-gradient-primary animate-fade-in">
        {title}
      </h1>
      <p className="text-base md:text-lg text-pretty leading-relaxed animate-fade-in animation-delay-100">
        {description}
      </p>
      {thematicCopy && (
        <p className="text-sm text-muted-foreground italic border-l-4 border-primary/50 pl-4 animate-fade-in animation-delay-200">
          {thematicCopy}
        </p>
      )}
    </div>
  );
};

export default GameDescription;