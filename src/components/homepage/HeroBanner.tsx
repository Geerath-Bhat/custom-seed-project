import React from 'react';
import { Button } from '@/components/ui/button';
import { Atom, Zap } from 'lucide-react'; // Using Atom or Zap as placeholder for arc reactor animation

interface CtaButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  icon?: React.ElementType;
}

interface HeroBannerProps {
  headline: string;
  tagline: string;
  ctaPrimary: CtaButtonProps;
  ctaSecondary?: CtaButtonProps;
  // Add props for background image/video if needed
}

const HeroBanner: React.FC<HeroBannerProps> = ({ headline, tagline, ctaPrimary, ctaSecondary }) => {
  return (
    <section className="relative flex items-center justify-center w-full h-[60vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-zinc-900 via-red-900 to-yellow-600 text-primary-foreground py-12 md:py-24 animate-fade-in">
      {/* Optional: Animated Background Elements (like glowing reactor) */}
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Example using icons, could be replaced with more complex SVG/CSS animation */}
        <Atom className="absolute top-1/4 left-1/4 w-24 h-24 text-primary opacity-50 animate-pulse-gentle" />
        <Zap className="absolute bottom-1/4 right-1/4 w-20 h-20 text-accent opacity-40 animate-pulse-gentle delay-500" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-4 text-gradient-primary animate-slide-up">
          {headline}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto text-balance animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            variant={ctaPrimary.variant || 'default'}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary-foreground/50 border"
            onClick={ctaPrimary.onClick}
            asChild={!!ctaPrimary.href}
          >
            {ctaPrimary.href ? (
              <a href={ctaPrimary.href}>{ctaPrimary.icon && <ctaPrimary.icon className="mr-2 h-5 w-5" />} {ctaPrimary.text}</a>
            ) : (
              <>{ctaPrimary.icon && <ctaPrimary.icon className="mr-2 h-5 w-5" />} {ctaPrimary.text}</>
            )}
          </Button>
          {ctaSecondary && (
            <Button
              size="lg"
              variant={ctaSecondary.variant || 'secondary'}
              className="bg-secondary/80 hover:bg-secondary/90 text-secondary-foreground backdrop-blur-sm border-border"
              onClick={ctaSecondary.onClick}
              asChild={!!ctaSecondary.href}
            >
              {ctaSecondary.href ? (
                <a href={ctaSecondary.href}>{ctaSecondary.icon && <ctaSecondary.icon className="mr-2 h-5 w-5" />} {ctaSecondary.text}</a>
              ) : (
                <>{ctaSecondary.icon && <ctaSecondary.icon className="mr-2 h-5 w-5" />} {ctaSecondary.text}</>
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
