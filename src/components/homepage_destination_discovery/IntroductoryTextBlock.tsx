import React from 'react';

interface IntroductoryTextBlockProps {
  headline?: string;
  tagline?: string;
}

const IntroductoryTextBlock: React.FC<IntroductoryTextBlockProps> = ({ 
  headline = "Discover Exotic India", 
  tagline = "Like Never Before."
}) => {
  return (
    <div className="text-center py-8 px-4 animate-slide-up">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-foreground">
        {headline}
      </h1>
      <p className="text-xl md:text-2xl text-gradient-primary font-semibold text-pretty">
        {tagline}
      </p>
    </div>
  );
};

export default IntroductoryTextBlock;
