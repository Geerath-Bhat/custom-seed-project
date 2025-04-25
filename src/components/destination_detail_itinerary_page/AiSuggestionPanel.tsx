import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2, PlusCircle } from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'activity' | 'accommodation' | 'route';
  title: string;
  description?: string;
  reason?: string; // Why AI suggested this
}

interface AiSuggestionPanelProps {
  suggestions: Suggestion[];
  onAddSuggestion: (suggestion: Suggestion) => void;
}

const AiSuggestionPanel: React.FC<AiSuggestionPanelProps> = ({ suggestions = [], onAddSuggestion }) => {
  return (
    <Card className="w-full shadow-sm border border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary flex items-center">
          <Wand2 className="mr-2 h-5 w-5" />
          Personalized Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No suggestions available right now.</p>
        ) : (
          <ul className="space-y-3">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="p-3 rounded-md border border-border/70 bg-background/50 flex justify-between items-start gap-3">
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{suggestion.title}</p>
                  {suggestion.description && <p className="text-xs text-muted-foreground mt-0.5 text-pretty">{suggestion.description}</p>}
                  {suggestion.reason && <p className="text-xs text-primary/80 mt-1 italic">Reason: {suggestion.reason}</p>}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 text-primary hover:bg-primary/10 hover:text-primary border-primary/50"
                  onClick={() => onAddSuggestion(suggestion)}
                >
                  <PlusCircle className="h-4 w-4 mr-1.5" />
                  Add
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default AiSuggestionPanel;
