import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Link, Mail, QrCode, UserPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface GroupInviteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  tripName: string; // Name of the trip/destination being planned
  onInvite: (emails: string[], message?: string) => void;
}

const GroupInviteModal: React.FC<GroupInviteModalProps> = ({
  isOpen,
  onOpenChange,
  tripName,
  onInvite,
}) => {
  const [emails, setEmails] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [inviteLink, setInviteLink] = useState<string>('https://example.com/invite/xyz123'); // Placeholder link

  const handleInviteClick = () => {
    const emailList = emails.split(/[,;\s]+/).filter(email => email.trim() !== '');
    if (emailList.length > 0) {
      onInvite(emailList, message);
      // Optionally close modal after invite: onOpenChange(false);
      // Optionally clear fields
      // setEmails('');
      // setMessage('');
    }
    // Add error handling for invalid emails if needed
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    // Add toast notification for success
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl text-primary">
            <Users className="h-6 w-6 mr-2" />
            Invite Friends to Plan '{tripName}'
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Collaborate on your itinerary and trip details with friends.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Email Invite Section */}
          <div className="space-y-2">
            <Label htmlFor="emails" className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground"/>
              Invite via Email
            </Label>
            <Input
              id="emails"
              type="text"
              placeholder="Enter emails separated by commas or spaces"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="bg-input border-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Optional Message</Label>
            <Textarea
              id="message"
              placeholder="Add a personal message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-input border-input"
              rows={3}
            />
          </div>
           <Button onClick={handleInviteClick} disabled={!emails.trim()} className="w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-2"/> Send Invites
           </Button>
        </div>

        <Separator className="my-4 bg-border"/>

        {/* Shareable Link Section */}
        <div className="space-y-3">
            <Label htmlFor="invite-link" className="flex items-center">
               <Link className="h-4 w-4 mr-2 text-muted-foreground"/>
                Shareable Invite Link
            </Label>
            <div className="flex items-center space-x-2">
               <Input
                  id="invite-link"
                  value={inviteLink}
                  readOnly
                  className="flex-grow bg-input border-input"
                />
                <Button variant="outline" size="icon" onClick={handleCopyToClipboard}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
            </div>
           {/* Placeholder for QR Code generation */}
           {/* <Button variant="outline" className="w-full sm:w-auto mt-2">
              <QrCode className="h-4 w-4 mr-2"/> Generate QR Code
           </Button> */} 
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInviteModal;
