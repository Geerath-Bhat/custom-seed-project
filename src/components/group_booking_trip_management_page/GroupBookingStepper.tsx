import React, { useState } from 'react';
import { cn } from "@/lib/utils"; // Assuming lib/utils for cn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from 'lucide-react';

// Define the steps for the wizard
const steps = [
  { id: 1, name: 'Create/Join Group', description: 'Start a new group or join an existing one.' },
  { id: 2, name: 'Invite Members', description: 'Send invites via email or link.' },
  { id: 3, name: 'Plan Itinerary', description: 'Collaboratively decide on activities.' },
  { id: 4, name: 'Confirm Participants', description: 'Finalize the group list.' },
  { id: 5, name: 'Group Payment', description: 'Manage costs and payments.' },
];

interface GroupBookingStepperProps {
  initialStep?: number;
}

const GroupBookingStepper: React.FC<GroupBookingStepperProps> = ({ initialStep = 1 }) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center text-xl md:text-2xl font-semibold text-primary">Group Booking Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-8 overflow-x-auto pb-4 no-scrollbar">
          {steps.map((step, index) => {
            const stepIndex = index + 1;
            const isActive = stepIndex === currentStep;
            const isCompleted = stepIndex < currentStep;

            return (
              <div key={step.id} className="flex items-center space-x-2 flex-shrink-0">
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300',
                    isCompleted ? 'bg-primary border-primary text-primary-foreground'
                      : isActive ? 'border-primary text-primary'
                      : 'border-border text-muted-foreground'
                  )}
                >
                  {isCompleted ? <CheckCircle size={16} /> : <span className="font-medium text-sm">{step.id}</span>}
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    'text-sm font-medium transition-colors duration-300',
                    isCompleted ? 'text-primary'
                      : isActive ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}>
                    {step.name}
                  </span>
                  {/* Optional: Show description on hover or always */}
                  {/* <span className="text-xs text-muted-foreground hidden md:block">{step.description}</span> */}
                </div>
                {stepIndex < steps.length && (
                  <div className="hidden md:block h-px w-8 bg-border flex-grow mx-2"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Placeholder for the content of the current step */}
        <div className="mt-6 p-4 border border-border rounded-lg min-h-[150px] animate-slide-up bg-card">
          <h3 className="text-lg font-semibold mb-2">{steps[currentStep - 1].name}</h3>
          <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
          <p className="mt-4">Content for step {currentStep} goes here...</p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <Button onClick={handlePrev} disabled={currentStep === 1} variant="outline">
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentStep === steps.length}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupBookingStepper;
