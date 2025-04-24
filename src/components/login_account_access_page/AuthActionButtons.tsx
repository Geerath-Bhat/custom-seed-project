import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthActionButtonsProps {
  onLoginClick: () => void;
  onForgotPasswordClick: () => void;
  onSignUpClick: () => void; // Could trigger RegistrationModal
  isLoginLoading?: boolean;
  showSignUp?: boolean;
  className?: string;
}

const AuthActionButtons: React.FC<AuthActionButtonsProps> = ({
  onLoginClick,
  onForgotPasswordClick,
  onSignUpClick,
  isLoginLoading = false,
  showSignUp = true,
  className,
}) => {
  return (
    <div className={cn('space-y-3 mt-4', className)}>
      <Button onClick={onLoginClick} className="w-full" disabled={isLoginLoading}>
        {isLoginLoading ? 'Logging In...' : 'Login'}
      </Button>
      <div className="flex justify-between items-center text-sm">
        <Button variant="link" className="px-0 h-auto py-0 font-normal" onClick={onForgotPasswordClick}>
          Forgot Password?
        </Button>
        {showSignUp && (
          <Button variant="link" className="px-0 h-auto py-0 font-normal" onClick={onSignUpClick}>
            Sign Up
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthActionButtons;
