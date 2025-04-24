import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Define Zod schema for validation
const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  addressLine1: z.string().min(5, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  phoneNumber: z.string().optional(),
});

const formSchema = z.object({
  shippingAddress: addressSchema,
  useShippingForBilling: z.boolean().default(true),
  billingAddress: addressSchema.optional(),
}).refine(data => data.useShippingForBilling || data.billingAddress, {
  message: 'Billing address is required if different from shipping',
  path: ['billingAddress'],
});

type ShippingBillingFormValues = z.infer<typeof formSchema>;

interface ShippingBillingFormProps {
  onSubmit: (data: ShippingBillingFormValues) => void;
  defaultValues?: Partial<ShippingBillingFormValues>;
  isDigitalOrder?: boolean; // If true, might simplify or skip parts
  className?: string;
}

const AddressFields: React.FC<{ control: any; namePrefix: string }> = ({ control, namePrefix }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormField
      control={control}
      name={`${namePrefix}.fullName`}
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input placeholder="Tony Stark" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name={`${namePrefix}.addressLine1`}
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Address Line 1</FormLabel>
          <FormControl>
            <Input placeholder="10880 Malibu Point" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
     <FormField
      control={control}
      name={`${namePrefix}.addressLine2`}
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Address Line 2 (Optional)</FormLabel>
          <FormControl>
            <Input placeholder="Apt, Suite, etc." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name={`${namePrefix}.city`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input placeholder="Malibu" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name={`${namePrefix}.state`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>State / Province</FormLabel>
          <FormControl>
            <Input placeholder="CA" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name={`${namePrefix}.postalCode`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Postal Code</FormLabel>
          <FormControl>
            <Input placeholder="90265" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name={`${namePrefix}.country`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <FormControl>
            <Input placeholder="USA" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
     <FormField
      control={control}
      name={`${namePrefix}.phoneNumber`}
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Phone Number (Optional)</FormLabel>
          <FormControl>
            <Input type="tel" placeholder="+1 (555) JARVIS" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

const ShippingBillingForm: React.FC<ShippingBillingFormProps> = ({ onSubmit, defaultValues, isDigitalOrder = false, className }) => {
  const form = useForm<ShippingBillingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || { useShippingForBilling: true },
  });

  const useShippingForBilling = form.watch('useShippingForBilling');

  if (isDigitalOrder) {
    return (
        <Card className={cn('shadow-sm border border-border', className)}>
            <CardHeader>
                <CardTitle className="text-xl font-heading">Confirm Account Details</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Your order contains only digital items. No shipping address is required. Billing information may be needed for payment processing.</p>
                {/* Optionally show minimal billing info confirmation if needed */}
                 <Button type="button" onClick={() => onSubmit(form.getValues())}>Confirm & Continue</Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <Card className="border border-border shadow-sm">
            <CardHeader>
                <CardTitle className="text-xl font-heading">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
                 <AddressFields control={form.control} namePrefix="shippingAddress" />
            </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="useShippingForBilling"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border border-border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use shipping address for billing
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {!useShippingForBilling && (
          <Card className="border border-border shadow-sm animate-fade-in">
             <CardHeader>
                <CardTitle className="text-xl font-heading">Billing Address</CardTitle>
             </CardHeader>
             <CardContent>
                <AddressFields control={form.control} namePrefix="billingAddress" />
             </CardContent>
          </Card>
        )}

        {/* The submit button might be part of a separate CheckoutActionButtons component */}
        {/* <Button type="submit">Continue to Payment</Button> */}
      </form>
    </Form>
  );
};

export default ShippingBillingForm;
