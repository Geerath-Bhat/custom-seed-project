import React from 'react';
import { Megaphone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnnouncementBarProps {
  message: string;
  link?: string;
  linkText?: string;
  onClose?: () => void; // Optional close handler
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ message, link, linkText = 'Learn More', onClose }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="relative bg-accent text-accent-foreground py-2 px-4 animate-fade-in">
      <div className="container mx-auto flex items-center justify-center text-sm">
        <Megaphone className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="flex-grow text-center md:text-left">{message}</span>
        {link && (
          <a href={link} className="underline hover:text-accent-foreground/80 font-semibold ml-2 hidden md:inline-block">
            {linkText}
          </a>
        )}
        {onClose && (
           <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 h-6 w-6 text-accent-foreground hover:bg-accent/20"
           >
             <X className="h-4 w-4" />
             <span className="sr-only">Close announcement</span>
           </Button>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBar;
