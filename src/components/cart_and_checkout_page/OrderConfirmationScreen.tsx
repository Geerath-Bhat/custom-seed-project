import React from 'react';
import { CheckCircle, Download, Gamepad2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Example structure for confirmed items
interface ConfirmedItem {
  id: string;
  name: string;
  type: 'Buy' | 'Rent';
  platform: string;
  activationInfo?: string; // e.g., key or instructions
  downloadLink?: string;
}

interface OrderConfirmationScreenProps {
  orderId: string;
  confirmedItems: ConfirmedItem[];
  onContinueShopping: () => void;
  onViewOrderHistory: () => void;
  className?: string;
}

const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  orderId,
  confirmedItems,
  onContinueShopping,
  onViewOrderHistory,
  className
}) => {
  return (
    <Card className={cn('w-full max-w-2xl mx-auto border border-success shadow-lg animate-scale-in', className)}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-success" />
        </div>
        <CardTitle className="text-2xl font-heading text-success">Order Confirmed!</CardTitle>
        <CardDescription className="text-muted-foreground">
          Thank you for your purchase/rental. Your Order ID is: <span className="font-semibold text-foreground">{orderId}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Your Items:</h3>
          <ul className="space-y-4">
            {confirmedItems.map((item) => (
              <li key={item.id} className="p-4 border border-border rounded-md bg-card">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-foreground">{item.name} ({item.type})</p>
                    <p className="text-sm text-muted-foreground">Platform: {item.platform}</p>
                  </div>
                   <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.type === 'Buy' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>{item.type}</span>
                </div>
                {item.activationInfo && (
                  <p className="text-sm text-foreground mt-1">
                    <span className="font-medium">Activation:</span> {item.activationInfo}
                  </p>
                )}
                {item.downloadLink && (
                  <Button variant="outline" size="sm" asChild className="mt-2">
                    <a href={item.downloadLink} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" /> Download Now
                    </a>
                  </Button>
                )}
                {!item.activationInfo && !item.downloadLink && (
                     <p className="text-sm text-muted-foreground mt-1 italic">Check your library or email for access details.</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-border" />

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={onContinueShopping} variant="outline">
            <ShoppingBag className="h-4 w-4 mr-2" /> Continue Shopping
          </Button>
          <Button onClick={onViewOrderHistory}>
            <Gamepad2 className="h-4 w-4 mr-2" /> View Order History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderConfirmationScreen;
