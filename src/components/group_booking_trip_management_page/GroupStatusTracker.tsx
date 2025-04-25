import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX, Clock, MailWarning } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define member status types
type MemberStatus = 'accepted' | 'pending' | 'declined';

// Define the structure for a group member
interface GroupMember {
  id: string;
  name: string;
  avatarUrl?: string;
  status: MemberStatus;
}

interface GroupStatusTrackerProps {
  members: GroupMember[];
  onRemind?: (memberId: string) => void; // Optional callback for reminding
}

// Helper to get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

// Helper to get status styles and icon
const getStatusAttributes = (status: MemberStatus) => {
  switch (status) {
    case 'accepted':
      return {
        icon: <UserCheck className="h-4 w-4 mr-1" />,
        badgeVariant: 'default' as const, // Use specific literal type
        text: 'Accepted',
      };
    case 'pending':
      return {
        icon: <Clock className="h-4 w-4 mr-1" />,
        badgeVariant: 'secondary' as const,
        text: 'Pending',
      };
    case 'declined':
      return {
        icon: <UserX className="h-4 w-4 mr-1" />,
        badgeVariant: 'destructive' as const,
        text: 'Declined',
      };
    default:
      return {
        icon: null,
        badgeVariant: 'outline' as const,
        text: 'Unknown',
      };
  }
};

const GroupStatusTracker: React.FC<GroupStatusTrackerProps> = ({ members, onRemind }) => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Group Members & Status</CardTitle>
        <CardDescription>Track who has joined the trip group.</CardDescription>
      </CardHeader>
      <CardContent>
        {members.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No members invited yet.</p>
        ) : (
          <ul className="space-y-4">
            {members.map((member) => {
              const { icon, badgeVariant, text } = getStatusAttributes(member.status);
              return (
                <li
                  key={member.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-card border border-border rounded-lg stagger-item"
                >
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{member.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <Badge variant={badgeVariant} className="flex items-center capitalize text-xs px-2 py-1">
                      {icon}
                      {text}
                    </Badge>
                    {member.status === 'pending' && onRemind && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemind(member.id)}
                        className="text-xs text-primary hover:text-primary/80"
                      >
                        <MailWarning className="h-4 w-4 mr-1" />
                        Remind
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

// Example Usage Data (replace with actual props)
const exampleMembers: GroupMember[] = [
  { id: '1', name: 'Alice Wonderland', avatarUrl: '/avatars/alice.png', status: 'accepted' },
  { id: '2', name: 'Bob The Builder', avatarUrl: '/avatars/bob.png', status: 'pending' },
  { id: '3', name: 'Charlie Chaplin', status: 'declined' },
  { id: '4', name: 'Diana Prince', avatarUrl: '/avatars/diana.png', status: 'pending' },
];

// Example parent component providing the handler
/*
const ParentComponent = () => {
  const handleRemind = (memberId: string) => {
    console.log(`Reminding member ${memberId}...`);
    // Add logic to send reminder
  };

  return <GroupStatusTracker members={exampleMembers} onRemind={handleRemind} />;
}
*/

export default GroupStatusTracker;
