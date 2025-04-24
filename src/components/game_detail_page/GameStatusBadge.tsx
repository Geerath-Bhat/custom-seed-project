import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type GameStatus = 'Owned' | 'Active Rental' | 'Rental Expired' | null;

interface GameStatusBadgeProps {
  status: GameStatus;
  className?: string;
}

const GameStatusBadge: React.FC<GameStatusBadgeProps> = ({ status, className }) => {
  if (!status) {
    return null;
  }

  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
  let text = status;

  switch (status) {
    case 'Owned':
      variant = 'default'; // Use primary color for owned
      text = 'OWNED';
      break;
    case 'Active Rental':
      variant = 'default'; // Could use a different color like success if defined
      text = 'RENTED';
      break;
    case 'Rental Expired':
      variant = 'destructive';
      text = 'EXPIRED';
      break;
  }

  return (
    <Badge
      variant={variant}
      className={cn(
        "absolute top-4 right-4 text-xs font-bold uppercase tracking-wider py-1 px-2",
        "border-2 border-primary/50 shadow-lg", // HUD Style
        status === 'Owned' && 'bg-primary text-primary-foreground',
        status === 'Active Rental' && 'bg-accent text-accent-foreground',
        status === 'Rental Expired' && 'bg-destructive text-destructive-foreground',
        className
      )}
    >
      {text}
    </Badge>
  );
};

export default GameStatusBadge;