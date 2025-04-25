import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Minus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input'; // Used indirectly by number counter

// Define Zod schema for validation
const bookingFormSchema = z.object({
  dates: z.object({
    from: z.date({ required_error: 'Check-in date is required.' }),
    to: z.date({ required_error: 'Check-out date is required.' }),
  }).refine(data => data.from < data.to, {
    message: 'Check-out date must be after check-in date.',
    path: ['to'], // Error attached to the 'to' date field
  }),
  roomType: z.string().min(1, 'Please select a room type.'),
  guests: z.number().min(1, 'At least one guest is required.').max(10, 'Maximum 10 guests allowed.'), // Example range
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingOptionsFormProps {
  onSubmit: (data: BookingFormData) => void;
  defaultValues?: Partial<BookingFormData>;
  availableRoomTypes: { value: string; label: string }[];
  isLoading?: boolean; // To disable form during submission
}

const BookingOptionsForm: React.FC<BookingOptionsFormProps> = ({
  onSubmit,
  defaultValues,
  availableRoomTypes = [],
  isLoading = false,
}) => {
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guests: 1,
      ...defaultValues,
    },
  });

  const guests = watch('guests');

  const handleGuestChange = (amount: number) => {
    const currentGuests = guests || 0;
    const newGuests = Math.max(1, Math.min(10, currentGuests + amount)); // Clamp between 1 and 10
    setValue('guests', newGuests, { shouldValidate: true });
  };

  const handleFormSubmit = (data: BookingFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 animate-fade-in">
      {/* Date Range Picker */}
      <div className="space-y-2">
        <Label htmlFor="date-range" className={cn(errors.dates && 'text-destructive')}>Dates</Label>
        <Controller
          name="dates"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-range"
                  variant={"outline"}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value?.from && 'text-muted-foreground',
                    errors.dates && 'border-destructive'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>{format(field.value.from, 'LLL dd, y')} - {format(field.value.to, 'LLL dd, y')}</>
                    ) : (
                      format(field.value.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={field.value?.from}
                  selected={{ from: field.value?.from!, to: field.value?.to! }} // Use non-null assertion as Controller handles value
                  onSelect={(range) => field.onChange(range)}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} // Disable past dates
                />
              </PopoverContent>
            </Popover>
          )}
        />
         {(errors.dates?.from || errors.dates?.to || errors.dates?.root) && (
          <p className="text-sm text-destructive">{errors.dates?.from?.message || errors.dates?.to?.message || errors.dates?.root?.message}</p>
         )}
      </div>

      {/* Room Type Select */}
      <div className="space-y-2">
        <Label htmlFor="roomType" className={cn(errors.roomType && 'text-destructive')}>Room Type</Label>
        <Controller
          name="roomType"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
              <SelectTrigger id="roomType" className={cn(errors.roomType && 'border-destructive')}>
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {availableRoomTypes.map((room) => (
                  <SelectItem key={room.value} value={room.value}>
                    {room.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.roomType && <p className="text-sm text-destructive">{errors.roomType.message}</p>}
      </div>

      {/* Guest Counter */}
      <div className="space-y-2">
        <Label htmlFor="guests" className={cn(errors.guests && 'text-destructive')}>Guests</Label>
        <div className="flex items-center space-x-2">
          <Button type="button" variant="outline" size="icon" onClick={() => handleGuestChange(-1)} disabled={guests <= 1 || isLoading} aria-label="Decrease guests">
            <Minus className="h-4 w-4" />
          </Button>
          {/* Hidden input for react-hook-form registration */}
          <input type="hidden" {...register('guests', { valueAsNumber: true })} />
          {/* Display div acting like an input */}
          <div className="flex-1 text-center border border-input rounded-md px-3 py-2 text-sm bg-background">
            {guests} guest{guests !== 1 ? 's' : ''}
          </div>
          <Button type="button" variant="outline" size="icon" onClick={() => handleGuestChange(1)} disabled={guests >= 10 || isLoading} aria-label="Increase guests">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {errors.guests && <p className="text-sm text-destructive">{errors.guests.message}</p>}
      </div>

      {/* Submit Button - Often placed outside this form in a parent structure, but included here for completeness */}
      {/* <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Checking...' : 'Check Availability / Update Price'}
      </Button> */}
    </form>
  );
};

export default BookingOptionsForm;
