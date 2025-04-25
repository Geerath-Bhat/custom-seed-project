import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast"; // Assuming Shadcn's useToast hook
import { Mail, Link, Send, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InviteControlsProps {
  groupId?: string; // Example prop
}

const InviteControls: React.FC<InviteControlsProps> = ({ groupId }) => {
  const [email, setEmail] = useState<string>('');
  const [inviteLink, setInviteLink] = useState<string>('');
  const [isGeneratingLink, setIsGeneratingLink] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSendEmailInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Error", description: "Please enter an email address.", variant: "destructive" });
      return;
    }
    setIsSendingEmail(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Sending invite to ${email} for group ${groupId}`);
    setIsSendingEmail(false);
    setEmail('');
    toast({ title: "Success", description: `Invite sent to ${email}.` });
  };

  const handleGenerateLink = async () => {
    setIsGeneratingLink(true);
    // Simulate API call to generate a link
    await new Promise(resolve => setTimeout(resolve, 1000));
    const generatedLink = `https://example.com/join?group=${groupId || 'demo123'}&token=${Math.random().toString(36).substring(7)}`;
    setInviteLink(generatedLink);
    setIsGeneratingLink(false);
    toast({ title: "Link Generated", description: "Shareable invite link created." });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
      .then(() => {
        toast({ title: "Copied!", description: "Invite link copied to clipboard." });
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({ title: "Error", description: "Failed to copy link.", variant: "destructive" });
      });
  };

  return (
    <Card className="w-full animate-scale-in">
      <CardHeader>
        <CardTitle>Invite Members</CardTitle>
        <CardDescription>Add people to your trip group.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Invite Form */}
        <form onSubmit={handleSendEmailInvite} className="space-y-3">
          <Label htmlFor="email-invite" className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            Invite via Email
          </Label>
          <div className="flex space-x-2">
            <Input
              id="email-invite"
              type="email"
              placeholder="friend@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSendingEmail}
              required
              className="flex-grow"
            />
            <Button type="submit" disabled={isSendingEmail} className="whitespace-nowrap">
              <Send className="mr-2 h-4 w-4" />
              {isSendingEmail ? 'Sending...' : 'Send Invite'}
            </Button>
          </div>
        </form>

        {/* Invite Link Section */}
        <div className="space-y-3">
          <Label htmlFor="invite-link-input" className="flex items-center">
            <Link className="mr-2 h-4 w-4 text-muted-foreground" />
            Invite via Link
          </Label>
          {inviteLink ? (
            <div className="flex space-x-2">
              <Input
                id="invite-link-input"
                type="text"
                readOnly
                value={inviteLink}
                className="flex-grow bg-muted"
              />
              <Button variant="outline" size="icon" onClick={handleCopyLink} title="Copy link">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={handleGenerateLink} disabled={isGeneratingLink} variant="secondary" className="w-full md:w-auto">
              <Link className="mr-2 h-4 w-4" />
              {isGeneratingLink ? 'Generating...' : 'Generate Invite Link'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteControls;
