import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GuestAccessButtonProps {
  onGuestAccessClick: () => void;
  isLoading?: boolean;
  allowGuestAccess: boolean;
  className?: string;
}

const GuestAccessButton: React.FC<GuestAccessButtonProps> = ({
  onGuestAccessClick,
  isLoading = false,
  allowGuestAccess,
  className,
}) => {
  if (!allowGuestAccess) {
    return null;
  }

  return (
    <div className={cn('mt-6 text-center', className)}>
      <Button
        variant="secondary"
        className="w-full max-w-sm mx-auto"
        onClick={onGuestAccessClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Continue as Guest'}
      </Button>
    </div>
  );
};

export default GuestAccessButton;
