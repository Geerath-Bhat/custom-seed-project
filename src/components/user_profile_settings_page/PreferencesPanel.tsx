import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Sun, Moon, Laptop } from 'lucide-react';

interface PreferencesPanelProps {
  initialPreferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    fontSizeScale: number; // e.g., 1 for 100%, 1.1 for 110%
  };
  onPreferencesChange: (preferences: PreferencesPanelProps['initialPreferences']) => void;
}

const PreferencesPanel: React.FC<PreferencesPanelProps> = ({ initialPreferences, onPreferencesChange }) => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(initialPreferences.notifications);
  const [fontSizeScale, setFontSizeScale] = useState(initialPreferences.fontSizeScale);

  // Update parent when local state changes
  useEffect(() => {
    onPreferencesChange({ notifications, fontSizeScale });
    // Apply font size scaling dynamically
    document.documentElement.style.setProperty('--text-scale', String(fontSizeScale));
    // Optional: Persist font size scale preference (e.g., in localStorage)
  }, [notifications, fontSizeScale, onPreferencesChange]);

  const handleNotificationChange = (type: keyof typeof notifications, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: checked }));
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSizeScale(value[0]);
  };

  return (
    <Card className="w-full border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage your notification, theme, and accessibility settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Notification Preferences */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-foreground">Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-md border border-input bg-background">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive updates and alerts via email.
                </span>
              </Label>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                aria-label="Toggle email notifications"
              />
            </div>
             <div className="flex items-center justify-between p-3 rounded-md border border-input bg-background">
              <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
                <span>SMS Notifications</span>
                 <span className="font-normal text-xs text-muted-foreground">
                  Receive critical alerts via SMS (if available).
                </span>
              </Label>
              <Switch
                id="sms-notifications"
                checked={notifications.sms}
                onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                aria-label="Toggle SMS notifications"
              />
            </div>
             <div className="flex items-center justify-between p-3 rounded-md border border-input bg-background">
              <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                <span>Push Notifications</span>
                 <span className="font-normal text-xs text-muted-foreground">
                  Get real-time updates on your device.
                </span>
              </Label>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                aria-label="Toggle push notifications"
              />
            </div>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-foreground">Theme</h3>
          <RadioGroup
            value={theme}
            onValueChange={setTheme}
            className="grid grid-cols-3 gap-4"
          >
            <Label htmlFor="light-theme" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
              <RadioGroupItem value="light" id="light-theme" className="sr-only" />
              <Sun className="mb-3 h-6 w-6" />
              Light
            </Label>
             <Label htmlFor="dark-theme" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
              <RadioGroupItem value="dark" id="dark-theme" className="sr-only" />
              <Moon className="mb-3 h-6 w-6" />
              Dark
            </Label>
             <Label htmlFor="system-theme" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
              <RadioGroupItem value="system" id="system-theme" className="sr-only" />
              <Laptop className="mb-3 h-6 w-6" />
              System
            </Label>
          </RadioGroup>
        </div>

        {/* Font Size Scaling */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-foreground">Font Size</h3>
          <div className="flex items-center space-x-4">
            <Label htmlFor="font-size-slider" className="text-muted-foreground">Scale</Label>
            <Slider
              id="font-size-slider"
              min={0.8} // 80%
              max={1.3} // 130%
              step={0.1}
              value={[fontSizeScale]}
              onValueChange={handleFontSizeChange}
              className="w-[60%]"
              aria-label="Adjust font size scale"
            />
            <span className="text-sm text-foreground w-12 text-right">{Math.round(fontSizeScale * 100)}%</span>
          </div>
            <p className="text-xs text-muted-foreground">
                Adjust the text size across the application for better readability.
            </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesPanel;
