import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils file for clsx/tailwind-merge

interface StepProps {
  stepNumber: number;
  label: string;
  isCurrent: boolean;
  isCompleted: boolean;
}

const Step: React.FC<StepProps> = ({ stepNumber, label, isCurrent, isCompleted }) => {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-full border-2',
          isCompleted ? 'bg-primary border-primary text-primary-foreground'
            : isCurrent ? 'border-primary text-primary'
            : 'border-border text-muted-foreground'
        )}
      >
        {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
      </div>
      <p
        className={cn(
          'mt-2 text-sm font-medium',
          isCurrent ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {label}
      </p>
    </div>
  );
};

interface CheckoutStepperProps {
  currentStep: number;
  steps: string[];
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full px-4 py-6 bg-card rounded-lg border border-border shadow-sm">
      <div className="flex justify-between items-start relative">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          return (
            <React.Fragment key={label}>
              {index > 0 && (
                <div className="flex-1 h-px bg-border absolute top-5 left-0 right-0 mx-auto"
                     style={{
                       width: `calc(100% / ${steps.length -1 } * ${index - 0.5})`,
                       left: `calc(100% / ${steps.length } / 2)`,
                       right: `calc(100% / ${steps.length } / 2)`
                     }} />
              )}
              {index > 0 && (
                  <div
                    className={cn(
                      'absolute top-5 h-px bg-primary transition-all duration-300',
                    )}
                    style={{
                      width: isCompleted || isCurrent ? `calc(100% / ${steps.length - 1} * ${index - 1} + 50% / ${steps.length - 1})` : '0',
                      left: `calc(100% / ${steps.length } / 2)`,
                      maxWidth: `calc(100% - 100% / ${steps.length })`
                    }}
                  />
              )}
              <Step
                stepNumber={stepNumber}
                label={label}
                isCurrent={isCurrent}
                isCompleted={isCompleted}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutStepper;
