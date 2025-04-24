import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface LogoutButtonProps {
  onLogout: () => void; // Function to call when logout is confirmed
  useConfirmation?: boolean; // Whether to show a confirmation dialog
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout, useConfirmation = true }) => {

  const handleLogout = () => {
    console.log('Logging out...');
    // Add actual logout logic here (e.g., clear tokens, redirect)
    onLogout();
  };

  if (!useConfirmation) {
    return (
      <Button
        variant="destructive"
        onClick={handleLogout}
        className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
      >
        <LogOut className="mr-2 h-4 w-4" /> Log Out
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
           className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Are you sure you want to log out of your account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-input hover:bg-muted">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
           >
            Log Out
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
