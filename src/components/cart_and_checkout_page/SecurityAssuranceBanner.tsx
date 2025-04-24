import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils file

interface SecurityAssuranceBannerProps {
  className?: string;
}

const SecurityAssuranceBanner: React.FC<SecurityAssuranceBannerProps> = ({ className }) => {
  return (
    <div className={cn(
      'flex items-center justify-center gap-4 p-3 border border-success/30 bg-success/10 rounded-lg text-success',
      className
    )}>
      <ShieldCheck className="h-6 w-6 flex-shrink-0" />
      <p className="text-sm font-medium">
        Your payment information is secure. Transactions are encrypted.
      </p>
      <Lock className="h-5 w-5 flex-shrink-0" />
    </div>
  );
};

export default SecurityAssuranceBanner;
