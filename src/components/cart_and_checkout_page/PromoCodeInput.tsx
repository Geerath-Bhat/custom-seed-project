import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Assuming utils file for clsx/tailwind-merge
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

type PromoCodeStatus = 'idle' | 'loading' | 'success' | 'error';

interface PromoCodeInputProps {
  onApplyPromoCode: (code: string) => Promise<boolean>; // Returns true on success, false on failure
  className?: string;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ onApplyPromoCode, className }) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<PromoCodeStatus>('idle');
  const [message, setMessage] = useState('');

  const handleApply = async () => {
    if (!code.trim()) return;
    setStatus('loading');
    setMessage('');
    try {
      const success = await onApplyPromoCode(code.trim());
      if (success) {
        setStatus('success');
        setMessage('Promo code applied successfully!');
      } else {
        setStatus('error');
        setMessage('Invalid or expired promo code.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to apply promo code. Please try again.');
      console.error('Promo code application error:', error);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-success';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

   const getBorderColor = () => {
    switch (status) {
      case 'success': return 'border-success';
      case 'error': return 'border-destructive';
      default: return 'border-input';
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor="promo-code" className="text-sm font-medium text-foreground">Promo Code</label>
      <div className="flex items-center space-x-2">
        <Input
          id="promo-code"
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setStatus('idle'); // Reset status on input change
            setMessage('');
          }}
          className={cn('flex-grow', getBorderColor())}
          disabled={status === 'loading' || status === 'success'}
        />
        <Button
          onClick={handleApply}
          disabled={!code.trim() || status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Apply'
          )}
        </Button>
      </div>
      {message && (
        <p className={cn('text-sm', getStatusColor())}>
          {status === 'success' && <CheckCircle className="inline-block w-4 h-4 mr-1" />}
          {status === 'error' && <XCircle className="inline-block w-4 h-4 mr-1" />}
          {message}
        </p>
      )}
    </div>
  );
};

export default PromoCodeInput;
