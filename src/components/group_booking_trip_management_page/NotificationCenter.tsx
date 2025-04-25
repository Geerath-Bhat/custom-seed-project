import React from 'react';
import { Bell, Info, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';

// Note: This component acts as a visual placeholder or display area for notifications.
// Actual toast notifications are typically triggered globally using a library like `sonner`.
// You would call `toast('Message')` from other components/logic.
// Include <Toaster /> from 'sonner' in your main layout (e.g., App.tsx).

type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'update';

interface NotificationItem {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: Date;
  read?: boolean;
}

interface NotificationCenterProps {
  notifications: NotificationItem[]; // Prop to potentially display recent notifications in a panel
  maxDisplayCount?: number;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />;
    case 'error':
      return <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />;
    case 'update':
       return <Bell className="h-5 w-5 text-primary flex-shrink-0" />;
    case 'info':
    default:
      return <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />;
  }
};

const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications = [], maxDisplayCount = 5 }) => {

  const displayedNotifications = notifications
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, maxDisplayCount);

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5 text-primary" />
          Notifications & Updates
        </CardTitle>
        <CardDescription>
          Recent activity and updates for your group trip.
          (Real-time toasts provided by Sonner)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {displayedNotifications.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No recent notifications.</p>
        ) : (
          <ScrollArea className="h-[250px] pr-3">
            <ul className="space-y-3">
              {displayedNotifications.map((notification) => (
                <li
                  key={notification.id}
                  className={cn(
                    "flex items-start space-x-3 p-3 border border-border rounded-md bg-card stagger-item",
                    !notification.read && "bg-muted/50 font-medium"
                  )}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-grow">
                    <p className="text-sm text-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.timestamp.toLocaleTimeString()} - {notification.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                   {!notification.read && (
                       <div className="h-2 w-2 rounded-full bg-primary mt-1 flex-shrink-0" title="Unread"></div>
                   )}
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
       {/* Reminder Comment */}
       {/* <CardFooter className="text-xs text-muted-foreground">
         Remember to include &lt;Toaster richColors position="top-right" /&gt; in your main layout for real-time pop-up notifications.
       </CardFooter> */} 
    </Card>
  );
};

// Example Usage Data (if displaying a list)
/*
const exampleNotifications: NotificationItem[] = [
  { id: '1', type: 'success', message: 'Jane Doe accepted the invite!', timestamp: new Date(Date.now() - 60000 * 5), read: false },
  { id: '2', type: 'update', message: 'Itinerary updated: Added Museum Visit.', timestamp: new Date(Date.now() - 60000 * 15), read: false },
  { id: '3', type: 'info', message: 'Payment reminder sent to Bob.', timestamp: new Date(Date.now() - 60000 * 60), read: true },
  { id: '4', type: 'warning', message: 'Hotel option A is filling up fast!', timestamp: new Date(Date.now() - 60000 * 120), read: true },
];

const ParentComponent = () => {
  return <NotificationCenter notifications={exampleNotifications} />;
}
*/

export default NotificationCenter;
