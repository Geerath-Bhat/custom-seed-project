import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, LifeBuoy } from 'lucide-react';
// Assuming react-hook-form is set up for form handling
// import { useForm } from 'react-hook-form';

interface SupportWidgetProps {
  onOpenChat?: () => void; // Optional: if chat is handled externally
  onSubmitSupportRequest: (data: { subject: string; message: string }) => Promise<void>;
}

const SupportWidget: React.FC<SupportWidgetProps> = ({ onOpenChat, onSubmitSupportRequest }) => {
  // Placeholder form state handling. Replace with react-hook-form if complex validation is needed.
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmitSupportRequest({ subject, message });
      // Optionally clear form or show success message
      setSubject('');
      setMessage('');
      setIsDialogOpen(false); // Close dialog on success
      // Consider showing a toast notification here (using Sonner if available)
    } catch (error) {
      console.error("Support request failed:", error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <LifeBuoy className="h-5 w-5 text-primary" />
          Need Help?
        </CardTitle>
        <CardDescription>Get support via chat or submit a request.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-3">
        {onOpenChat && (
          <Button onClick={onOpenChat} className="flex-1">
            <MessageCircle className="mr-2 h-4 w-4" /> Start Chat
          </Button>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <Send className="mr-2 h-4 w-4" /> Contact Support
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact Support</DialogTitle>
              <DialogDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., Issue with booking #123"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="message" className="text-right pt-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="col-span-3 min-h-[100px]"
                  placeholder="Describe your issue in detail..."
                  required
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SupportWidget;
