import React from 'react';
import { AlertCircle, CheckCircle, Info, TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Assuming Shadcn Alert
import { cn } from '@/lib/utils';

type FeedbackType = 'error' | 'success' | 'info' | 'warning';

interface BookingFeedbackDisplayProps {
  message: string | null;
  type: FeedbackType;
  title?: string;
}

const icons: Record<FeedbackType, React.ElementType> = {
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
  warning: TriangleAlert,
};

const alertVariants: Record<FeedbackType, 'default' | 'destructive'> = {
  error: 'destructive',
  success: 'default', // Use default styling, maybe add specific success colors later if needed
  info: 'default',
  warning: 'default', // Use default styling, maybe add specific warning colors later if needed
};

const colorClasses: Record<FeedbackType, string> = {
    error: 'border-destructive text-destructive',
    success: 'border-success text-success',
    info: 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400', // Example info colors
    warning: 'border-warning text-warning',
}

const iconColorClasses: Record<FeedbackType, string> = {
    error: 'text-destructive',
    success: 'text-success',
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-warning',
}

const BookingFeedbackDisplay: React.FC<BookingFeedbackDisplayProps> = ({ message, type, title }) => {
  if (!message) {
    return null;
  }

  const Icon = icons[type];
  const variant = alertVariants[type];

  // Determine default title if not provided
  const defaultTitles: Record<FeedbackType, string> = {
    error: 'Error',
    success: 'Success',
    info: 'Information',
    warning: 'Warning',
  };
  const alertTitle = title || defaultTitles[type];

  return (
    <Alert
        variant={variant} // Primarily for destructive variant
        className={cn(
            'animate-fade-in',
            colorClasses[type], // Apply specific border/text colors
            variant !== 'destructive' && 'bg-background' // Ensure non-destructive variants have appropriate background
        )}
    >
      <Icon className={cn("h-4 w-4", iconColorClasses[type])} />
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default BookingFeedbackDisplay;
