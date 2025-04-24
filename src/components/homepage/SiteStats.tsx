import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface Stat {
  id: string | number;
  value: string | number;
  label: string;
  iconName: keyof typeof LucideIcons; // Use keyof to ensure valid icon name
}

interface SiteStatsProps {
  stats: Stat[];
}

const SiteStats: React.FC<SiteStatsProps> = ({ stats }) => {
  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 stagger-container">
          {stats.map((stat, index) => {
            const IconComponent = LucideIcons[stat.iconName] as React.ComponentType<React.SVGProps<SVGSVGElement>> || LucideIcons.HelpCircle; // Fallback icon
            return (
              <Card key={stat.id} className="text-center bg-card border-border shadow-sm stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-2">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mx-auto mb-2">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-3xl font-bold font-heading text-foreground">
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SiteStats;
