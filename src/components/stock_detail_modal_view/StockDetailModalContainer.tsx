import React from 'react';
import {
  Dialog, 
  DialogContent, 
  DialogOverlay, 
  DialogPortal
} from '@/components/ui/dialog'; // Assuming Shadcn UI structure

interface StockDetailModalContainerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const StockDetailModalContainer: React.FC<StockDetailModalContainerProps> = ({ 
  isOpen, 
  onOpenChange, 
  children, 
  className = '' 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogContent 
          className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full text-card-foreground ${className}`}
          onInteractOutside={(e) => {
            // Prevent closing on click outside if needed, or allow default behavior
            // e.preventDefault(); 
          }}
        >
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default StockDetailModalContainer;
