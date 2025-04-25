import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Assuming Input is needed for payment methods or privacy
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Assuming Form components are available
import { Save, Palette, Languages, BellRing, CreditCard, ShieldCheck } from 'lucide-react';
// Import useTheme if using next-themes
// import { useTheme } from 'next-themes';

// Define Zod schema for validation
const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional(),
  language: z.string().optional(),
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  // Add fields for saved payment methods and privacy options as needed
  // savedPaymentMethod: z.string().optional(),
  // dataSharingConsent: z.boolean().optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface UserSettingsFormProps {
  defaultSettings: SettingsFormData;
  onSubmit: (data: SettingsFormData) => Promise<void>;
}

const UserSettingsForm: React.FC<UserSettingsFormProps> = ({ defaultSettings, onSubmit }) => {
  // If using next-themes, get setTheme function
  // const { setTheme } = useTheme();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettings,
  });

  const { handleSubmit, control, formState: { isSubmitting } } = form;

  const handleFormSubmit = async (data: SettingsFormData) => {
    // If using next-themes, apply theme immediately
    // if (data.theme) {
    //   setTheme(data.theme);
    // }
    await onSubmit(data);
    // Optionally reset form or show success message
    form.reset(data); // Reset with submitted data to reflect changes
    // Consider showing a toast notification (Sonner)
  };

  return (
    <Card className="w-full max-w-2xl animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Account Settings & Preferences
        </CardTitle>
        <CardDescription>Manage your theme, language, notifications, and privacy settings.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="space-y-6">
            {/* Theme Preference - Example using Select */}
            <FormField
              control={control}
              name="theme"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                   <div className="space-y-0.5">
                     <FormLabel className="text-base flex items-center gap-2"><Palette className="h-4 w-4"/> Theme</FormLabel>
                     <FormDescription>Select your preferred interface theme.</FormDescription>
                   </div>
                   <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value || 'system'}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                   </FormControl>
                </FormItem>
              )}
            />

            {/* Language Preference - Example */}
            <FormField
              control={control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center gap-2"><Languages className="h-4 w-4"/> Language</FormLabel>
                    <FormDescription>Choose your display language.</FormDescription>
                  </div>
                   <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value || 'en'}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                                {/* Add more languages as needed */}
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
              )}
            />

            {/* Notification Preferences - Example */}
             <div className='rounded-lg border p-4 space-y-4'>
                 <FormLabel className="text-base flex items-center gap-2"><BellRing className="h-4 w-4"/> Notification Preferences</FormLabel>
                <FormField
                  control={control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <FormDescription>Receive email notifications</FormDescription>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={control}
                  name="pushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <FormDescription>Enable push notifications</FormDescription>
                       <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
             </div>

             {/* Placeholder sections for Payment Methods and Privacy */}
             <div className='rounded-lg border p-4'>
                  <FormLabel className="text-base flex items-center gap-2"><CreditCard className="h-4 w-4"/> Saved Payment Methods</FormLabel>
                  <FormDescription className='mt-2'>Manage your saved payment details here. (Feature coming soon)</FormDescription>
                  {/* Add form fields for payment methods later */}
             </div>

              <div className='rounded-lg border p-4'>
                  <FormLabel className="text-base flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Privacy Options</FormLabel>
                  <FormDescription className='mt-2'>Control your data sharing and privacy settings. (Feature coming soon)</FormDescription>
                  {/* Add form fields for privacy options later */}
             </div>

          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" /> {isSubmitting ? 'Saving...' : 'Save Preferences'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UserSettingsForm;
