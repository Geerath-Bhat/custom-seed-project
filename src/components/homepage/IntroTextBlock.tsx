import React from 'react';

interface IntroTextBlockProps {
  title?: string;
  paragraphs: string[];
}

const IntroTextBlock: React.FC<IntroTextBlockProps> = ({ title, paragraphs }) => {
  return (
    <section className="py-8 md:py-12 bg-background animate-fade-in">
      <div className="container mx-auto px-4 max-w-3xl">
        {title && (
          <h3 className="text-2xl font-bold font-heading mb-4 text-center md:text-left text-foreground">
            {title}
          </h3>
        )}
        <div className="space-y-4 text-foreground/90 text-pretty">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroTextBlock;
