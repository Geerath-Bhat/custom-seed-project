import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming Shadcn's Textarea
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"; // Assuming Shadcn's Dialog
import { Calendar, Clock, MapPin, PlusCircle, Edit, Trash2, MessageSquare, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns'; // From date-fns library
import { cn } from '@/lib/utils';

// Define the structure for an itinerary item
interface ItineraryItem {
  id: string;
  title: string;
  date: Date;
  time?: string; // Optional time
  location?: string;
  description?: string;
  suggestedBy?: string; // For collaborative suggestions
  votes?: number; // For voting mechanism
}

interface ItineraryEditorProps {
  items: ItineraryItem[];
  onAddItem: (item: Omit<ItineraryItem, 'id'>) => void;
  onUpdateItem: (item: ItineraryItem) => void;
  onDeleteItem: (itemId: string) => void;
  // Add props for voting, commenting if needed
}

const ItineraryEditor: React.FC<ItineraryEditorProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);

  // Form state for adding/editing
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDate, setNewItemDate] = useState<Date | undefined>(new Date());
  const [newItemTime, setNewItemTime] = useState('');
  const [newItemLocation, setNewItemLocation] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  const resetForm = () => {
    setNewItemTitle('');
    setNewItemDate(new Date());
    setNewItemTime('');
    setNewItemLocation('');
    setNewItemDescription('');
    setIsAdding(false);
    setEditingItem(null);
  };

  const handleAddSubmit = () => {
    if (!newItemTitle || !newItemDate) return; // Basic validation
    onAddItem({
      title: newItemTitle,
      date: newItemDate,
      time: newItemTime,
      location: newItemLocation,
      description: newItemDescription,
      // suggestedBy: 'currentUser' // Add user context if needed
    });
    resetForm();
  };

  const handleEditSubmit = () => {
    if (!editingItem || !newItemTitle || !newItemDate) return;
    onUpdateItem({
      ...editingItem,
      title: newItemTitle,
      date: newItemDate,
      time: newItemTime,
      location: newItemLocation,
      description: newItemDescription,
    });
    resetForm();
  };

  const openEditDialog = (item: ItineraryItem) => {
    setEditingItem(item);
    setNewItemTitle(item.title);
    setNewItemDate(item.date);
    setNewItemTime(item.time || '');
    setNewItemLocation(item.location || '');
    setNewItemDescription(item.description || '');
    // Trigger dialog manually if not using DialogTrigger
  };

  const ItineraryForm = (
    <div className="space-y-4">
      <Input placeholder="Activity Title" value={newItemTitle} onChange={e => setNewItemTitle(e.target.value)} />
      {/* Replace with Shadcn DatePicker if available */}
      <Input type="date" value={newItemDate ? format(newItemDate, 'yyyy-MM-dd') : ''} onChange={e => setNewItemDate(new Date(e.target.value))} />
      <Input type="time" placeholder="Time (optional)" value={newItemTime} onChange={e => setNewItemTime(e.target.value)} />
      <Input placeholder="Location (optional)" value={newItemLocation} onChange={e => setNewItemLocation(e.target.value)} />
      <Textarea placeholder="Description (optional)" value={newItemDescription} onChange={e => setNewItemDescription(e.target.value)} />
    </div>
  );

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Group Itinerary</CardTitle>
          <CardDescription>Plan your trip activities together.</CardDescription>
        </div>
        <Dialog open={isAdding || !!editingItem} onOpenChange={(open) => !open && resetForm()}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAdding(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Activity' : 'Add New Activity'}</DialogTitle>
            </DialogHeader>
            {ItineraryForm}
            <DialogFooter>
              <DialogClose asChild>
                 <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={editingItem ? handleEditSubmit : handleAddSubmit}> {editingItem ? 'Save Changes' : 'Add Activity'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No itinerary items added yet.</p>
        ) : (
          <ul className="space-y-4 stagger-container">
            {items.sort((a,b) => a.date.getTime() - b.date.getTime()).map((item) => (
              <li key={item.id} className="p-4 border border-border rounded-lg bg-card stagger-item">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg text-foreground">{item.title}</h4>
                  <div className="flex space-x-1">
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditDialog(item)}><Edit className="h-4 w-4" /></Button>
                        </DialogTrigger>
                        {/* Reuse DialogContent structure if needed, controlled by editingItem state */} 
                     </Dialog>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive/80" onClick={() => onDeleteItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center"><Calendar className="mr-2 h-4 w-4" /> {format(item.date, 'PPP')}</div>
                  {item.time && <div className="flex items-center"><Clock className="mr-2 h-4 w-4" /> {item.time}</div>}
                  {item.location && <div className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> {item.location}</div>}
                </div>
                {item.description && <p className="mt-2 text-sm text-pretty text-foreground/90">{item.description}</p>}
                 {/* Optional: Collaborative features */}
                 <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground">
                    {item.suggestedBy && <span>Suggested by: {item.suggestedBy}</span>}
                    <div className="flex space-x-3">
                        {/* Example vote/comment buttons */} 
                        <button className="flex items-center hover:text-primary transition-colors"><ThumbsUp size={14} className="mr-1"/> ({item.votes ?? 0})</button>
                        <button className="flex items-center hover:text-primary transition-colors"><MessageSquare size={14} className="mr-1"/> Comment</button>
                    </div>
                 </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default ItineraryEditor;
