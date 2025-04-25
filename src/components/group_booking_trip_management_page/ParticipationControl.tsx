import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Assuming Shadcn RadioGroup
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"; // Assuming Shadcn AlertDialog
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define participation status types
type ParticipationStatus = 'confirmed' | 'pending' | 'declined';

interface ParticipationControlProps {
  currentStatus: ParticipationStatus;
  onStatusChange: (newStatus: ParticipationStatus) => void;
  isLoading?: boolean; // For async operations
  tripName?: string; // Optional: for confirmation messages
}

const ParticipationControl: React.FC<ParticipationControlProps> = ({
  currentStatus,
  onStatusChange,
  isLoading = false,
  tripName = 'the trip'
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ParticipationStatus>(currentStatus);

  const handleConfirm = () => {
    onStatusChange(selectedStatus);
    // AlertDialog will close automatically via AlertDialogAction
  };

  const getStatusInfo = (status: ParticipationStatus) => {
    switch (status) {
      case 'confirmed':
        return { icon: <CheckCircle className="h-5 w-5 text-success mr-2" />, text: 'You have confirmed your participation.', color: 'text-success' };
      case 'declined':
        return { icon: <XCircle className="h-5 w-5 text-destructive mr-2" />, text: 'You have declined to participate.', color: 'text-destructive' };
      case 'pending':
      default:
        return { icon: <HelpCircle className="h-5 w-5 text-muted-foreground mr-2" />, text: 'Your participation status is pending.', color: 'text-muted-foreground' };
    }
  };

  const statusInfo = getStatusInfo(currentStatus);

  return (
    <Card className="w-full animate-scale-in">
      <CardHeader>
        <CardTitle>Confirm Your Participation</CardTitle>
        <CardDescription>Let the group know if you'll be joining {tripName}.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={cn("flex items-center p-3 rounded-md border", statusInfo.color === 'text-success' ? 'border-success/30 bg-success/10' : statusInfo.color === 'text-destructive' ? 'border-destructive/30 bg-destructive/10' : 'border-border bg-muted/50')}>
          {statusInfo.icon}
          <span className={cn("text-sm font-medium", statusInfo.color)}>{statusInfo.text}</span>
        </div>

        <RadioGroup
          value={selectedStatus}
          onValueChange={(value: ParticipationStatus) => setSelectedStatus(value)}
          className="space-y-2"
          disabled={isLoading}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="confirmed" id="status-confirmed" />
            <Label htmlFor="status-confirmed" className="font-medium">Yes, I'm going!</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="declined" id="status-declined" />
            <Label htmlFor="status-declined" className="font-medium">No, I can't make it.</Label>
          </div>
           {/* Maybe a 'Maybe' option if needed */}
           {/* <div className="flex items-center space-x-2">
            <RadioGroupItem value="pending" id="status-pending" />
            <Label htmlFor="status-pending">Maybe / Deciding</Label>
           </div> */} 
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={isLoading || selectedStatus === currentStatus} className="w-full sm:w-auto">
              {isLoading ? 'Updating...' : 'Update Status'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to set your participation status for {tripName} to{' '}
                <span className={cn("font-semibold", selectedStatus === 'confirmed' ? 'text-success' : 'text-destructive')}>
                  {selectedStatus === 'confirmed' ? 'Confirmed' : 'Declined'}
                </span>?
                This will notify the group leader.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm} disabled={isLoading} className={selectedStatus === 'confirmed' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'}>
                {isLoading ? 'Confirming...' : 'Confirm'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ParticipationControl;
