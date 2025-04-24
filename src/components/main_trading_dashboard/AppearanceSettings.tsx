import React from 'react';
import { useTheme } from 'next-themes';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Laptop, ZoomIn, ZoomOut, Settings } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface AppearanceSettingsProps {
  // Add props for font size control if state is managed externally
  // currentFontSize?: number;
  // onFontSizeChange?: (size: number) => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = () => {
  const { theme, setTheme } = useTheme();

  // Placeholder for font size state/logic - ideally use context or props
  const [fontSizeScale, setFontSizeScale] = React.useState(1); // Example local state

  const adjustFontSize = (delta: number) => {
    const newScale = Math.max(0.8, Math.min(1.5, fontSizeScale + delta)); // Clamp scale
    setFontSizeScale(newScale);
    // Apply the scale to the root element (or body)
    document.documentElement.style.setProperty('--text-scale', newScale.toString());
     // Persist preference if needed (e.g., localStorage)
  };

  return (
    <div className="p-4 bg-card text-card-foreground rounded-lg border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
             <Settings className="h-5 w-5 text-muted-foreground hidden sm:inline-block" />
             <Label className="text-sm font-medium hidden sm:inline-block">Appearance:</Label>
        </div>

        <div className="flex flex-wrap items-center gap-4">
            {/* Theme Toggle */}
            <div>
                <Label htmlFor="theme-toggle" className="text-xs text-muted-foreground mb-1 block text-center sm:hidden">Theme</Label>
                <ToggleGroup
                    id="theme-toggle"
                    type="single"
                    variant="outline"
                    value={theme}
                    onValueChange={(value) => { if (value) setTheme(value); }}
                    className="flex bg-background rounded-md p-0.5 border border-input"
                >
                    <ToggleGroupItem value="light" aria-label="Light theme" className="px-2 py-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                        <Sun className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dark" aria-label="Dark theme" className="px-2 py-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                        <Moon className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="system" aria-label="System theme" className="px-2 py-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                        <Laptop className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            {/* Font Size Control */}
            <div className="flex items-center gap-1">
                 <Label htmlFor="font-size-decrease" className="text-xs text-muted-foreground mb-1 block text-center sm:hidden">Font Size</Label>
                <Button
                    id="font-size-decrease"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-background border-input"
                    onClick={() => adjustFontSize(-0.1)}
                    aria-label="Decrease font size"
                    disabled={fontSizeScale <= 0.8}
                >
                    <ZoomOut className="h-4 w-4" />
                </Button>
                 <span className="text-xs w-8 text-center text-muted-foreground">{(fontSizeScale * 100).toFixed(0)}%</span>
                <Button
                    id="font-size-increase"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-background border-input"
                    onClick={() => adjustFontSize(0.1)}
                    aria-label="Increase font size"
                     disabled={fontSizeScale >= 1.5}
                >
                    <ZoomIn className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
  );
};

export default AppearanceSettings;
