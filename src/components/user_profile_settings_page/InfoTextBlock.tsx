import React from 'react';
import { cn } from '@/lib/utils'; // Assuming standard Shadcn setup with clsx/tailwind-merge

interface InfoTextBlockProps {
  id?: string; // Optional ID for linking or targeting
  title?: string;
  content: string | React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  variant?: 'default' | 'muted' | 'subtle'; // Example variants
}

const InfoTextBlock: React.FC<InfoTextBlockProps> = ({
  id,
  title,
  content,
  className,
  titleClassName,
  contentClassName,
  variant = 'default',
}) => {
  const containerClasses = cn(
    'w-full',
    {
      'p-4 border border-border rounded-md bg-background': variant === 'default',
      'p-4 border border-border rounded-md bg-muted': variant === 'muted',
      'text-sm text-muted-foreground': variant === 'subtle', // Less prominent style
    },
    className
  );

  const titleClasses = cn(
    'text-md font-medium mb-2 text-foreground',
    {
      'text-muted-foreground': variant === 'muted',
    },
    titleClassName
  );

  const contentClasses = cn(
    'text-sm',
    {
        'text-foreground': variant === 'default',
        'text-muted-foreground': variant === 'muted' || variant === 'subtle',
    },
    'leading-relaxed',
    contentClassName
  );

  return (
    <div id={id} className={containerClasses}>
      {title && <h4 className={titleClasses}>{title}</h4>}
      {typeof content === 'string' ? (
        <p className={contentClasses}>{content}</p>
      ) : (
        <div className={contentClasses}>{content}</div>
      )}
    </div>
  );
};

export default InfoTextBlock;
