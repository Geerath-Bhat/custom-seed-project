import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Chrome, Building } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

type Provider = 'google' | 'microsoft' | string; // Allow other providers

interface SocialLoginButtonsProps {
  providers: Provider[];
  onSocialLogin: (provider: Provider) => void;
  isLoading?: Provider | false; // Track which provider is loading
  className?: string;
}

const providerDetails: Record<Provider, { name: string; icon: React.ElementType }> = {
  google: { name: 'Google', icon: Chrome },
  microsoft: { name: 'Microsoft', icon: Building }, // Placeholder
  // Add more providers here as needed
};

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  providers,
  onSocialLogin,
  isLoading = false,
  className,
}) => {
  if (!providers || providers.length === 0) {
    return null;
  }

  return (
    <div className={cn('mt-6 space-y-4', className)}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {providers.map((provider) => {
          const details = providerDetails[provider];
          const Icon = details?.icon;
          const providerName = details?.name || provider.charAt(0).toUpperCase() + provider.slice(1);
          const loading = isLoading === provider;

          return (
            <Button
              key={provider}
              variant="outline"
              className="w-full"
              onClick={() => onSocialLogin(provider)}
              disabled={!!isLoading} // Disable all if any is loading
            >
              {loading ? (
                 <span className="animate-pulse">Connecting...</span>
              ) : (
                <>
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {providerName}
                </>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLoginButtons;
