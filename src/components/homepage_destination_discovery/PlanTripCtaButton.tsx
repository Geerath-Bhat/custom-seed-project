import React from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react'; // Using Send as an example icon

interface PlanTripCtaButtonProps {
  onClick?: () => void; // Callback for button click, e.g., navigation
}

const PlanTripCtaButton: React.FC<PlanTripCtaButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: navigate or log
      console.log('Navigate to trip planner page');
      // Example navigation (if using react-router-dom):
      // navigate('/plan-trip');
    }
  };

  return (
    <div className="my-12 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <Button
        size="lg" // Use large size for prominence
        onClick={handleClick}
        className="px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        <Send className="mr-3 h-5 w-5" />
        Plan Your Dream Trip
      </Button>
    </div>
  );
};

export default PlanTripCtaButton;
