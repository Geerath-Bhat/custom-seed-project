import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the structure for a chat message
interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: Date;
}

interface GroupChatWidgetProps {
  messages: ChatMessage[];
  currentUserId: string; // To differentiate user's messages
  onSendMessage: (text: string, file?: File) => void;
  isLoading?: boolean; // To show loading state
}

// Helper to get initials
const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};

const GroupChatWidget: React.FC<GroupChatWidgetProps> = ({
  messages,
  currentUserId,
  onSendMessage,
  isLoading = false,
}) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
         scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() || attachment) {
      onSendMessage(newMessage.trim(), attachment || undefined);
      setNewMessage('');
      setAttachment(null);
      // Clear the file input visually if needed (requires input ref)
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline
      handleSend();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     if (event.target.files && event.target.files[0]) {
        setAttachment(event.target.files[0]);
        // Optionally display file name or preview
     }
  };

  return (
    <Card className="w-full h-[500px] flex flex-col animate-slide-up">
      <CardHeader className="border-b border-border">
        <CardTitle>Group Chat</CardTitle>
        <CardDescription>Coordinate with your trip members.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => {
              const isCurrentUser = msg.senderId === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-start space-x-3',
                    isCurrentUser ? 'justify-end' : 'justify-start'
                  )}
                >
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={msg.senderAvatar} />
                      <AvatarFallback>{getInitials(msg.senderName)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg px-3 py-2 text-sm',
                      isCurrentUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    )}
                  >
                    {!isCurrentUser && <p className="font-semibold text-xs mb-1">{msg.senderName}</p>}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {isCurrentUser && (
                     <Avatar className="h-8 w-8 flex-shrink-0">
                       {/* Assuming current user avatar logic exists */}
                       <AvatarFallback><User size={16}/></AvatarFallback>
                     </Avatar>
                  )}
                </div>
              );
            })}
             {isLoading && <p className="text-center text-muted-foreground text-sm animate-pulse-gentle">Loading messages...</p>}
             {messages.length === 0 && !isLoading && <p className="text-center text-muted-foreground text-sm">No messages yet. Start the conversation!</p>}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t border-border">
         {attachment && (
            <div className="text-xs text-muted-foreground mb-2">Attached: {attachment.name}</div>
         )}
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
            disabled={isLoading}
          />
           <label htmlFor="file-upload" className="cursor-pointer">
              <Button variant="ghost" size="icon" asChild disabled={isLoading}>
                 <span><Paperclip className="h-5 w-5" /></span>
              </Button>
           </label>
           <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} disabled={isLoading}/>
          <Button onClick={handleSend} size="icon" disabled={isLoading || (!newMessage.trim() && !attachment)}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
         {/* Optional: Typing indicator area */}
         {/* <p className="text-xs text-muted-foreground mt-1">Alice is typing...</p> */}
      </CardFooter>
    </Card>
  );
};

export default GroupChatWidget;
