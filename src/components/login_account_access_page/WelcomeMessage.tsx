import React from 'react';
import { cn } from '@/lib/utils'; // Assuming utils file exists for cn function

interface WelcomeMessageProps {
  title?: string;
  message: string;
  className?: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ title = "Welcome Back!", message, className }) => {
  return (
    <div className={cn('text-center mb-8', className)}>
      <h2 className="text-xl font-semibold text-foreground mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground text-balance">
        {message}
      </p>
    </div>
  );
};

export default WelcomeMessage;
