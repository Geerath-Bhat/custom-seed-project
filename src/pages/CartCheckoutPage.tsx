import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// UI Components for Cart & Checkout
import CheckoutStepper from '@/components/cart_and_checkout_page/CheckoutStepper';
import CartItemList from '@/components/cart_and_checkout_page/CartItemList';
import PromoCodeInput from '@/components/cart_and_checkout_page/PromoCodeInput';
import OrderSummaryPanel from '@/components/cart_and_checkout_page/OrderSummaryPanel';
import ShippingBillingForm from '@/components/cart_and_checkout_page/ShippingBillingForm';
import PaymentMethodSelector from '@/components/cart_and_checkout_page/PaymentMethodSelector';
import SecurityAssuranceBanner from '@/components/cart_and_checkout_page/SecurityAssuranceBanner';
import OrderConfirmationScreen from '@/components/cart_and_checkout_page/OrderConfirmationScreen';
import CheckoutActionButtons from '@/components/cart_and_checkout_page/CheckoutActionButtons';
import { Button } from '@/components/ui/button'; // For placeholder actions

// Types (derived from component props)
interface CartItem {
  id: string;
  type: 'Buy' | 'Rent';
  imageUrl: string;
  name: string;
  price: number;
  rentalPeriod?: number;
  platform: string;
  quantity: number;
}

interface ConfirmedItem {
  id: string;
  name: string;
  type: 'Buy' | 'Rent';
  platform: string;
  activationInfo?: string;
  downloadLink?: string;
}

interface PaymentMethod {
  id: string;
  type: 'CreditCard' | 'PayPal' | 'BankTransfer';
  label: string;
  icon?: React.ElementType;
  details?: string;
}

// Placeholder Data
const mockInitialCartItems: CartItem[] = [
  {
    id: 'game001',
    type: 'Buy',
    imageUrl: 'https://via.placeholder.com/150/0000FF/808080?text=CyberPulse',
    name: 'CyberPulse Arena',
    price: 59.99,
    platform: 'PC',
    quantity: 1,
  },
  {
    id: 'game002',
    type: 'Rent',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Galaxy+Quest',
    name: 'Galaxy Quest VII',
    price: 9.99, // Monthly rental price
    rentalPeriod: 30,
    platform: 'PS5',
    quantity: 1,
  },
  {
    id: 'game003',
    type: 'Buy',
    imageUrl: 'https://via.placeholder.com/150/00FF00/000000?text=MechWarriors',
    name: 'Mech Warriors: Iron Dawn',
    price: 49.99,
    platform: 'Xbox Series X',
    quantity: 1,
  },
];

const mockCheckoutSteps = ['Cart', 'Shipping', 'Payment', 'Review', 'Confirm'];

const mockPaymentMethods: PaymentMethod[] = [
  { id: 'pm_1', type: 'CreditCard', label: 'Visa ending in 4242', details: 'Expires 12/25' },
  { id: 'pm_2', type: 'PayPal', label: 'PayPal Account', details: 'user@example.com' },
];

const MOCK_TAX_RATE = 0.08; // 8% tax
const MOCK_SHIPPING_FEE = 0; // Assume digital or free shipping for now
const MOCK_SERVICE_FEE = 1.50;

// Page Component
export default function CartCheckoutPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>(mockInitialCartItems);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState<string | undefined>(undefined);
  const [shippingInfo, setShippingInfo] = useState<any>(null); // Store submitted shipping/billing
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | undefined>(mockPaymentMethods[0]?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [confirmedItems, setConfirmedItems] = useState<ConfirmedItem[]>([]);

  // --- Cart Item Handlers ---
  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRentalPeriodChange = (id: string, period: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, rentalPeriod: period } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // --- Promo Code Handler ---
  const handleApplyPromoCode = async (code: string): Promise<boolean> => {
    console.log('Applying promo code:', code);
    // Simulate API call & validation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code.toUpperCase() === 'IRONMAN10') {
          setDiscountAmount(subtotal * 0.1); // 10% discount
          setDiscountCode(code);
          resolve(true);
        } else {
          setDiscountAmount(0);
          setDiscountCode(undefined);
          resolve(false);
        }
      }, 1000);
    });
  };

  // --- Form Handlers ---
  const handleShippingSubmit = (data: any) => {
    console.log('Shipping/Billing Data:', data);
    setShippingInfo(data);
    handleNextStep(); // Move to next step after successful submission
  };

  // --- Calculated Values ---
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const taxes = useMemo(() => subtotal * MOCK_TAX_RATE, [subtotal]);
  const fees = useMemo(() => MOCK_SERVICE_FEE + MOCK_SHIPPING_FEE, []); // Example fees
  const total = useMemo(() => subtotal - discountAmount + taxes + fees, [subtotal, discountAmount, taxes, fees]);

  // --- Step Navigation ---
  const handleNextStep = () => {
    // Add validation logic here if needed for specific steps before proceeding
     if (currentStep === 1 && cartItems.length === 0) {
         alert("Your cart is empty!");
         return;
     }
     if (currentStep < mockCheckoutSteps.length -1) { // Don't go past 'Review'
       setCurrentStep((prev) => prev + 1);
     }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // --- Place Order Handler ---
  const handlePlaceOrder = async () => {
    console.log('Placing order...');
    setIsLoading(true);
    // Simulate API call to place the order
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success
    const generatedOrderId = `ORD-${Date.now().toString().slice(-6)}`;
    const itemsForConfirmation: ConfirmedItem[] = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        platform: item.platform,
        // Simulate activation/download info
        activationInfo: item.type === 'Buy' ? `KEY-${item.id.toUpperCase()}-XYZ` : undefined,
        downloadLink: item.type === 'Rent' ? `/download/${item.id}` : undefined,
    }));

    setOrderId(generatedOrderId);
    setConfirmedItems(itemsForConfirmation);
    setOrderCompleted(true);
    setIsLoading(false);
    setCurrentStep(mockCheckoutSteps.length); // Move stepper to final 'Confirm' state
    // Optionally clear cart state here or on navigating away
    // setCartItems([]);
    // setDiscountAmount(0);
    // setDiscountCode(undefined);
  };

  // --- Confirmation Screen Actions ---
  const handleContinueShopping = () => {
    navigate('/games'); // Navigate to games catalog or home
  };

  const handleViewOrderHistory = () => {
    navigate('#'); // Navigate to user's order history page (placeholder)
    alert('Navigate to Order History (Not Implemented)');
  };

  // --- Determine if current order needs shipping ---
  const needsShipping = useMemo(() => {
      // Simple check: if any item is 'Buy' and platform isn't obviously digital-only like 'PC Download'
      // A more robust check might look at product metadata
      return cartItems.some(item => item.type === 'Buy');
  }, [cartItems]);

  // --- Render Logic ---
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Cart
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-heading font-semibold">Your Cart</h2>
              <CartItemList
                items={cartItems}
                handleQuantityChange={handleQuantityChange}
                handleRentalPeriodChange={handleRentalPeriodChange}
                handleRemoveItem={handleRemoveItem}
              />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-heading font-semibold">Summary</h2>
              <OrderSummaryPanel
                subtotal={subtotal}
                discountAmount={discountAmount}
                discountCode={discountCode}
                taxes={taxes}
                fees={fees}
              />
              <PromoCodeInput onApplyPromoCode={handleApplyPromoCode} />
            </div>
          </div>
        );
      case 2: // Shipping
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
             <div className="lg:col-span-2 space-y-6">
                <ShippingBillingForm onSubmit={handleShippingSubmit} isDigitalOrder={!needsShipping} />
             </div>
             <div className="lg:col-span-1">
                <OrderSummaryPanel
                    subtotal={subtotal}
                    discountAmount={discountAmount}
                    discountCode={discountCode}
                    taxes={taxes}
                    fees={fees}
                />
             </div>
          </div>
        );
      case 3: // Payment
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
             <div className="lg:col-span-2 space-y-6">
                <PaymentMethodSelector
                    availableMethods={mockPaymentMethods}
                    selectedMethodId={selectedPaymentMethodId}
                    onSelectMethod={setSelectedPaymentMethodId}
                    // onAddNewCard={() => alert('Add New Card Modal (Not Implemented)')}
                />
                <SecurityAssuranceBanner />
             </div>
             <div className="lg:col-span-1">
                <OrderSummaryPanel
                    subtotal={subtotal}
                    discountAmount={discountAmount}
                    discountCode={discountCode}
                    taxes={taxes}
                    fees={fees}
                />
             </div>
           </div>
        );
      case 4: // Review
         return (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-heading font-semibold">Review Your Order</h2>
                    {/* Display read-only summaries of previous steps */}
                    <div className="p-4 border rounded-lg bg-card space-y-2">
                        <h3 className="font-semibold">Shipping To:</h3>
                        {shippingInfo ? (
                            <p className="text-sm text-muted-foreground">
                                {shippingInfo.shippingAddress.fullName}<br />
                                {shippingInfo.shippingAddress.addressLine1}{shippingInfo.shippingAddress.addressLine2 ? `, ${shippingInfo.shippingAddress.addressLine2}` : ''}<br />
                                {shippingInfo.shippingAddress.city}, {shippingInfo.shippingAddress.state} {shippingInfo.shippingAddress.postalCode}<br />
                                {shippingInfo.shippingAddress.country}
                            </p>
                        ) : (!needsShipping ? <p className='text-sm text-muted-foreground'>Digital Order - No shipping address needed.</p> : <p className='text-sm text-muted-foreground'>Shipping info pending.</p>)}
                    </div>
                     <div className="p-4 border rounded-lg bg-card space-y-2">
                        <h3 className="font-semibold">Payment Method:</h3>
                        <p className="text-sm text-muted-foreground">
                            {mockPaymentMethods.find(m => m.id === selectedPaymentMethodId)?.label || 'Not selected'}
                        </p>
                    </div>
                     <div className="p-4 border rounded-lg bg-card space-y-2">
                        <h3 className="font-semibold">Items:</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            {cartItems.map(item => <li key={item.id}>{item.name} (x{item.quantity}) - {item.type}</li>)}
                        </ul>
                    </div>
                    <SecurityAssuranceBanner />
                </div>
                <div className="lg:col-span-1">
                     <OrderSummaryPanel
                        subtotal={subtotal}
                        discountAmount={discountAmount}
                        discountCode={discountCode}
                        taxes={taxes}
                        fees={fees}
                    />
                </div>
             </div>
         );
        // Step 5 (Confirm) is handled outside this switch by the OrderConfirmationScreen conditional render
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

         {!orderCompleted ? (
            <> 
            {/* Stepper */} 
                <div className="mb-8">
                     <CheckoutStepper currentStep={currentStep} steps={mockCheckoutSteps} />
                </div>

                {/* Step Content */} 
                <div className="mb-8">
                     {renderStepContent()}
                </div>

                 {/* Action Buttons */} 
                 <CheckoutActionButtons
                     currentStep={currentStep}
                     totalSteps={mockCheckoutSteps.length -1} // -1 because 'Confirm' isn't an interactive step
                     onNextStep={currentStep === 2 ? () => form.handleSubmit(handleShippingSubmit)() : handleNextStep} // Trigger form submit on step 2
                     onPrevStep={handlePrevStep}
                     onPlaceOrder={handlePlaceOrder} // Only used on the 'Review' step (step 4)
                     isLoading={isLoading}
                     // Disable next if required info is missing (basic examples)
                     isNextDisabled={
                        (currentStep === 2 && !shippingInfo && needsShipping) || 
                        (currentStep === 3 && !selectedPaymentMethodId) ||
                        (currentStep === 1 && cartItems.length === 0)
                     }
                  />
             </>
             ) : (
                 // Confirmation Screen 
                 <OrderConfirmationScreen
                     orderId={orderId || 'N/A'}
                     confirmedItems={confirmedItems}
                     onContinueShopping={handleContinueShopping}
                     onViewOrderHistory={handleViewOrderHistory}
                 />
             )
         }

      </main>
      <Footer />
    </div>
  );
}

// Helper reference for ShippingBillingForm's submit trigger
// We need access to the form instance if we trigger validation outside the form component.
// This implementation simplifies by calling handleNextStep *within* the onSubmit handler passed to ShippingBillingForm.
// To handle triggering form validation from CheckoutActionButtons requires lifting form state or using refs/imperative handles, which adds complexity.
let form: any; // Placeholder reference if needed, though the current approach avoids it.
