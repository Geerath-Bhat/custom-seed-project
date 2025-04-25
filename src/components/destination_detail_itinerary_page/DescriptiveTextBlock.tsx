import React from 'react';

interface DescriptiveTextBlockProps {
  title?: string;
  content: string; // Can be plain text or HTML string
}

const DescriptiveTextBlock: React.FC<DescriptiveTextBlockProps> = ({ title, content }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      {title && <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>}
      {/* Use prose for rich text formatting if content is HTML/Markdown */}
      {/* Ensure @tailwindcss/typography plugin is installed and configured */}
      <div
        className="prose prose-sm sm:prose-base max-w-none dark:prose-invert prose-p:text-foreground/90 prose-headings:text-primary prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
        dangerouslySetInnerHTML={{ __html: content }} // Be careful with XSS if content is user-generated
      />
      {/* Or for plain text: */}
      {/* <p className="text-foreground/90 text-base text-pretty">{content}</p> */}
    </div>
  );
};

export default DescriptiveTextBlock;
