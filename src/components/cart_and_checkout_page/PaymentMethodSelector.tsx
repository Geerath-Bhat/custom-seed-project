import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Landmark, DollarSign } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface PaymentMethod {
  id: string;
  type: 'CreditCard' | 'PayPal' | 'BankTransfer'; // Example types
  label: string;
  icon?: React.ElementType;
  details?: string; // e.g., last 4 digits of card
}

interface PaymentMethodSelectorProps {
  availableMethods: PaymentMethod[];
  selectedMethodId?: string;
  onSelectMethod: (id: string) => void;
  onAddNewCard?: () => void; // Optional: trigger a modal or form for adding a new card
  className?: string;
}

// Simple placeholder for a Credit Card form (replace with a real implementation)
const CreditCardForm: React.FC<{ onSave: () => void; onCancel: () => void }> = ({ onSave, onCancel }) => (
  <div className="space-y-4 p-4 border border-border rounded-md mt-4 bg-muted/50 animate-fade-in">
    <h4 className="font-medium text-foreground">Add New Credit Card</h4>
    <Input placeholder="Card Number" type="text" />
    <div className="flex gap-4">
      <Input placeholder="MM/YY" type="text" className="w-1/2" />
      <Input placeholder="CVC" type="text" className="w-1/2" />
    </div>
    <Input placeholder="Cardholder Name" type="text" />
    <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save Card</Button>
    </div>
  </div>
);

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  availableMethods,
  selectedMethodId,
  onSelectMethod,
  onAddNewCard, // In a real app, this would likely open a dialog/modal
  className
}) => {
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  const handleAddNewCard = () => {
    if (onAddNewCard) {
        onAddNewCard(); // Use prop handler if provided (e.g., for modal)
    } else {
        setShowAddCardForm(true); // Fallback to inline form
    }
  }

  const handleSaveCard = () => {
    // Logic to save the card details (API call, etc.)
    console.log("Saving new card...");
    setShowAddCardForm(false);
    // Potentially refresh availableMethods and select the new one
  }

  const getIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'CreditCard': return CreditCard;
      case 'PayPal': return DollarSign;
      case 'BankTransfer': return Landmark;
      default: return CreditCard; // Default icon
    }
  };

  return (
    <Card className={cn('shadow-sm border border-border', className)}>
      <CardHeader>
        <CardTitle className="text-xl font-heading">Payment Method</CardTitle>
        <CardDescription>Select how you'd like to pay.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedMethodId}
          onValueChange={onSelectMethod}
          className="space-y-3"
        >
          {availableMethods.map((method) => {
            const Icon = method.icon || getIcon(method.type);
            return (
              <Label
                key={method.id}
                htmlFor={method.id}
                className={cn(
                  'flex items-center space-x-3 rounded-md border border-border p-4 cursor-pointer hover:border-primary transition-colors',
                  selectedMethodId === method.id ? 'border-primary ring-1 ring-primary bg-primary/5' : ''
                )}
              >
                <RadioGroupItem value={method.id} id={method.id} />
                {Icon && <Icon className="h-6 w-6 text-muted-foreground" />}
                <div className="flex-grow">
                    <span className="font-medium text-foreground">{method.label}</span>
                    {method.details && <p className="text-sm text-muted-foreground">{method.details}</p>}
                </div>
              </Label>
            );
          })}
        </RadioGroup>

        {!showAddCardForm && (
            <Button variant="outline" onClick={handleAddNewCard} className="mt-6 w-full">
            Add New Payment Method
            </Button>
        )}

        {showAddCardForm && (
            <CreditCardForm
                onSave={handleSaveCard}
                onCancel={() => setShowAddCardForm(false)}
            />
        )}

      </CardContent>
    </Card>
  );
};

export default PaymentMethodSelector;
