import React from 'react';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';

interface ActionButton {
  text: string;
  link?: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  iconName?: keyof typeof LucideIcons; // Optional icon
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  alignment?: 'start' | 'center' | 'end';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons, alignment = 'center' }) => {
  const alignmentClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  }[alignment];

  return (
    <section className="py-8 md:py-12 bg-transparent">
      <div className={`container mx-auto px-4 flex flex-wrap gap-4 ${alignmentClass} animate-fade-in`}>
        {buttons.map((button, index) => {
          const IconComponent = button.iconName ? LucideIcons[button.iconName] : null;
          const buttonVariant = button.variant || (index === 0 ? 'default' : 'secondary'); // Example logic for variants
          
          return (
            <Button
              key={index}
              size="lg"
              variant={buttonVariant}
              className={`${buttonVariant === 'default' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''} ${buttonVariant === 'secondary' ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' : ''} ${buttonVariant === 'outline' ? 'border-primary text-primary hover:bg-primary/10' : ''}`}
              onClick={button.onClick}
              asChild={!!button.link}
            >
              {button.link ? (
                <a href={button.link}>
                  {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
                  {button.text}
                </a>
              ) : (
                <>
                  {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
                  {button.text}
                </>
              )}
            </Button>
          );
        })}
      </div>
    </section>
  );
};

export default ActionButtons;
