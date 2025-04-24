import React from 'react';

interface BrandLogoBlockProps {
  logoUrl?: string;
  appName?: string;
  className?: string;
}

const BrandLogoBlock: React.FC<BrandLogoBlockProps> = ({ logoUrl, appName = 'Trading Dashboard', className }) => {
  return (
    <div className={`flex items-center justify-center mb-6 ${className}`}>
      {logoUrl ? (
        <img src={logoUrl} alt={`${appName} Logo`} className="h-10 w-auto" />
      ) : (
        <h1 className="text-2xl font-bold text-foreground">{appName}</h1>
      )}
    </div>
  );
};

export default BrandLogoBlock;
