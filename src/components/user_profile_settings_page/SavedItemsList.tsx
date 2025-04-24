import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { List, Trash2, Edit } from 'lucide-react'; // Or other relevant icons
import { Link } from 'react-router-dom'; // Assuming react-router is used for navigation

interface SavedItem {
  id: string;
  name: string;
  description?: string;
  manageLink: string; // Route to manage this specific item
}

interface SavedItemsListProps {
  title: string; // e.g., "Saved Watchlists", "Alert Settings"
  items: SavedItem[];
  onDeleteItem?: (id: string) => void;
  onRenameItem?: (id: string, newName: string) => void; // Optional rename functionality
  emptyStateMessage?: string;
}

const SavedItemsList: React.FC<SavedItemsListProps> = ({
  title,
  items,
  onDeleteItem,
  onRenameItem, // Include rename handler if needed
  emptyStateMessage = 'No items saved yet.',
}) => {
  return (
    <Card className="w-full border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          View and manage your saved {title.toLowerCase()}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground italic">{emptyStateMessage}</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <div className="flex-grow">
                    <Link to={item.manageLink} className="hover:underline">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                    </Link>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                    {onRenameItem && (
                       <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const newName = prompt(`Enter new name for ${item.name}:`, item.name);
                            if (newName !== null && newName.trim() !== '' && newName !== item.name) {
                                onRenameItem(item.id, newName.trim());
                            }
                         }}
                        aria-label={`Rename ${item.name}`}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Rename
                      </Button>
                    )}
                     <Link to={item.manageLink}>
                       <Button variant="secondary" size="sm" aria-label={`Manage ${item.name}`}>
                        <List className="h-4 w-4 mr-1" />
                        Manage
                       </Button>
                     </Link>
                    {onDeleteItem && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDeleteItem(item.id)}
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </li>
                {index < items.length - 1 && <Separator className="my-3 bg-border" />}
              </React.Fragment>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedItemsList;
