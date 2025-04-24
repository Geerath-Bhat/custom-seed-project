import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CreditCard, ShoppingCart, Check } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils file

interface CheckoutActionButtonsProps {
  currentStep: number; // e.g., 1 for Cart, 2 for Shipping, 3 for Payment, 4 for Review
  totalSteps: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onPlaceOrder?: () => void; // Only relevant on the final step before confirmation
  isNextDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const CheckoutActionButtons: React.FC<CheckoutActionButtonsProps> = ({
  currentStep,
  totalSteps,
  onNextStep,
  onPrevStep,
  onPlaceOrder,
  isNextDisabled = false,
  isLoading = false,
  className
}) => {
  const isFirstStep = currentStep === 1;
  const isLastReviewStep = currentStep === totalSteps; // Assumes last step is review before placing order

  const getNextButtonText = () => {
    if (isLastReviewStep) return 'Place Order';
    if (currentStep === 1) return 'Proceed to Checkout';
    if (currentStep === 2) return 'Continue to Payment';
    if (currentStep === 3) return 'Review Order';
    return 'Continue';
  };

  const getNextButtonIcon = () => {
     if (isLastReviewStep) return Check;
     if (currentStep === 1) return ArrowRight;
     if (currentStep === 2) return CreditCard;
     if (currentStep === 3) return ShoppingCart;
     return ArrowRight;
  }

  const NextIcon = getNextButtonIcon();

  const handleNext = () => {
    if (isLastReviewStep && onPlaceOrder) {
      onPlaceOrder();
    } else {
      onNextStep();
    }
  };

  return (
    <div className={cn('flex w-full justify-between items-center pt-6 border-t border-border mt-8', className)}>
      <Button
        variant="outline"
        onClick={onPrevStep}
        disabled={isFirstStep || isLoading}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Button
        onClick={handleNext}
        disabled={isNextDisabled || isLoading}
        className={cn(isLastReviewStep ? 'bg-success hover:bg-success/90' : '')}
      >
        {isLoading ? 'Processing...' : getNextButtonText()}
        {!isLoading && <NextIcon className="h-4 w-4 ml-2" />}
      </Button>
    </div>
  );
};

export default CheckoutActionButtons;
