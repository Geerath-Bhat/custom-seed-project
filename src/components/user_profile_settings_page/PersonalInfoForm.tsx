import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner'; // Assuming sonner is used for notifications

// Example Zod schema - adjust validation rules as needed
const formSchema = z.object({
  displayName: z.string().min(2, { message: 'Display name must be at least 2 characters.' }).max(50),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  currentPassword: z.string().optional(), // Optional for password change
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters.' }).optional().or(z.literal('')), // Optional, but requires min 8 if provided
  confirmNewPassword: z.string().optional(),
}).refine(data => {
  // Require current password if new password is set
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  // Require new passwords to match
  if (data.newPassword !== data.confirmNewPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords must match, and current password is required to set a new one.",
  path: ['confirmNewPassword'], // Attach error to confirmation field
});

type PersonalInfoFormData = z.infer<typeof formSchema>;

interface PersonalInfoFormProps {
  initialData: {
    displayName: string;
    email: string;
  };
  onSubmit: (data: PersonalInfoFormData) => Promise<void>; // Simulate async submission
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ initialData, onSubmit }) => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handleFormSubmit = async (data: PersonalInfoFormData) => {
    try {
      await onSubmit(data);
      toast.success('Profile updated successfully!');
      // Optionally reset password fields after successful submission
      form.reset({
        ...data,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    }
  };

  return (
    <Card className="w-full border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription className="text-muted-foreground">
          Update your display name, email, and password.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your display name" {...field} className="bg-input border-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} className="bg-input border-input" />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    Used for login and notifications.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Change Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-md font-medium text-foreground">Change Password</h3>
               <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter current password" {...field} className="bg-input border-input" />
                    </FormControl>
                     <FormDescription className="text-xs text-muted-foreground">
                        Required only if changing password.
                     </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password (min. 8 characters)" {...field} className="bg-input border-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your new password" {...field} className="bg-input border-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t border-border pt-6">
            <Button type="button" variant="outline" onClick={() => form.reset()} disabled={form.formState.isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PersonalInfoForm;
