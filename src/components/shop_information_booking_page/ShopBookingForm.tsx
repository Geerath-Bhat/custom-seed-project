import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Send, User, Mail, Phone, Clock } from 'lucide-react';

// Define Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(), // Optional phone number
  preferredDate: z.date({
    required_error: 'A preferred date is required.',
  }),
  preferredTime: z.string().min(1, { message: 'Please suggest a time.' }), // Simple time suggestion
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof formSchema>;

interface ShopBookingFormProps {
  onSubmit?: (data: BookingFormValues) => void;
}

const ShopBookingForm: React.FC<ShopBookingFormProps> = ({ onSubmit }) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredTime: '',
      message: '',
      // preferredDate: undefined // Let the calendar handle initial state
    },
  });

  const handleFormSubmit = (data: BookingFormValues) => {
    console.log('Booking Form Data:', data);
    // Replace console.log with actual submission logic (e.g., API call)
    if (onSubmit) {
      onSubmit(data);
    }
    // Optionally reset form after submission
    // form.reset();
    // Show success message (e.g., using Sonner toast)
  };

  return (
    <div className="p-6 md:p-8 bg-card text-card-foreground rounded-lg border border-border shadow-lg">
      <h3 className="text-xl font-heading font-semibold mb-6 text-center">Book Your Visit or Inquire</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><User className="w-4 h-4 mr-1"/> Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tony Stark" {...field} className="bg-input" />
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
                  <FormLabel className="flex items-center"><Mail className="w-4 h-4 mr-1"/> Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tony@starkindustries.com" {...field} className="bg-input"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Phone className="w-4 h-4 mr-1"/> Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 212-970-4133" {...field} className="bg-input"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">Preferred Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-input hover:bg-muted",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} // Disable past dates
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

           <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Clock className="w-4 h-4 mr-1"/> Preferred Time Slot</FormLabel>
                  <FormControl>
                     <Input placeholder="e.g., Afternoon, around 3 PM" {...field} className="bg-input" />
                  </FormControl>
                   <FormDescription className="text-xs">
                    We'll confirm the exact time based on availability.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message / Inquiry (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific games you're interested in? Special requests?"
                    className="resize-y min-h-[100px] bg-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 group">
             Send Request
            <Send className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
             {/* Thematic Button Accent */}
             <span className="absolute inset-0 border-2 border-transparent rounded-md group-hover:border-primary-foreground/30 transition-all duration-300"></span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShopBookingForm;
