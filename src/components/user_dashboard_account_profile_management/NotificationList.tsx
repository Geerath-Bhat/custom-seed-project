import React from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck, Trash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'; // Using date-fns from package.json

interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: Date | string; // Allow string for initial data, convert to Date
  link?: string; // Optional link for the notification
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkRead: (id: string | 'all') => void;
  onClearAll: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onMarkRead, onClearAll }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkRead = (e: Event, id: string) => {
      e.preventDefault(); // Prevent dropdown from closing
      onMarkRead(id);
  }

  const handleMarkAllRead = (e: Event) => {
      e.preventDefault();
      onMarkRead('all');
  }

   const handleClearAll = (e: Event) => {
      e.preventDefault();
      onClearAll();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">View Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 sm:w-96">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <div className='flex gap-1'>
             <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="h-auto p-1 text-xs text-primary hover:bg-primary/10" disabled={unreadCount === 0}>
                <CheckCheck className='h-3 w-3 mr-1'/> Mark all read
            </Button>
             <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-auto p-1 text-xs text-destructive hover:bg-destructive/10">
                 <Trash className='h-3 w-3 mr-1'/> Clear all
             </Button>
             </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-4 px-2">No new notifications</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start gap-3 p-3 ${!notification.read ? 'bg-muted/50' : ''} cursor-pointer`}
                onSelect={(e) => { if(notification.link) window.location.href = notification.link; else e.preventDefault(); }}
              >
                <div className={`mt-1 h-2 w-2 rounded-full ${!notification.read ? 'bg-primary' : 'bg-transparent'}`}></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground mb-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                  </p>
                </div>
                {!notification.read && (
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => handleMarkRead(e, notification.id)} title="Mark as read">
                        <CheckCheck className="h-4 w-4 text-muted-foreground hover:text-primary"/>
                    </Button>
                )}
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationList;
