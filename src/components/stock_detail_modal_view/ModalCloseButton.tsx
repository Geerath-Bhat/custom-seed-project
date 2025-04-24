import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI structure
import { DialogClose } from '@/components/ui/dialog'; // Assuming Shadcn UI structure
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalCloseButtonProps {
  className?: string;
  ariaLabel?: string;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ 
  className = '',
  ariaLabel = 'Close dialog'
}) => {
  return (
    <DialogClose asChild>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
          className
        )}
        aria-label={ariaLabel}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">{ariaLabel}</span>
      </Button>
    </DialogClose>
  );
};

export default ModalCloseButton;
