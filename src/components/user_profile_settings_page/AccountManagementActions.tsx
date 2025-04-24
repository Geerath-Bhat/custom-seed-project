import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Download, AlertTriangle } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';

interface AccountManagementActionsProps {
  onDeleteAccount: () => void; // Function to call when account deletion is confirmed
  onExportData: () => void; // Function to call when data export is requested
}

const AccountManagementActions: React.FC<AccountManagementActionsProps> = ({ onDeleteAccount, onExportData }) => {

  const handleDelete = () => {
      console.log('Deleting account...');
      // Add actual account deletion logic here
      onDeleteAccount();
  };

  const handleExport = () => {
      console.log('Exporting data...');
      // Add actual data export logic here
      onExportData();
  };

  return (
    <div className="p-6 border border-destructive/50 rounded-lg bg-destructive/10 space-y-4">
      <h3 className="text-lg font-semibold text-destructive flex items-center">
         <AlertTriangle className="mr-2 h-5 w-5"/> Danger Zone
      </h3>
       <p className="text-sm text-destructive/90">
          These actions are permanent and cannot be undone. Please proceed with caution.
       </p>
        <Separator className="bg-destructive/30" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
         <div>
            <p className="font-medium text-foreground">Export My Data</p>
            <p className="text-sm text-muted-foreground">
                Download a copy of your account data.
            </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
           className="border-input hover:bg-muted w-full sm:w-auto"
        >
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>

      <Separator className="bg-destructive/30" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
         <div>
            <p className="font-medium text-destructive">Delete Account</p>
            <p className="text-sm text-destructive/90">
                Permanently remove your account and all associated data.
            </p>
         </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-card border-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive flex items-center">
                 <AlertTriangle className="mr-2 h-5 w-5"/> Confirm Account Deletion
                </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                Are you absolutely sure you want to delete your account?
                This action cannot be undone and will permanently erase all your data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-input hover:bg-muted">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
               >
                Yes, Delete My Account
                </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AccountManagementActions;
