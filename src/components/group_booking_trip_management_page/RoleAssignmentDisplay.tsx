import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Users, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the structure for a member with a role
interface RoleMember {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string; // e.g., 'Group Leader', 'Planner', 'Member'
  permissions?: string[]; // Optional list of specific permissions
}

interface RoleAssignmentDisplayProps {
  members: RoleMember[];
  groupLeaderId?: string; // Optionally highlight the group leader
}

// Helper to get initials
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const RoleAssignmentDisplay: React.FC<RoleAssignmentDisplayProps> = ({ members, groupLeaderId }) => {

  const getRoleBadgeVariant = (role: string) => {
      if (role.toLowerCase().includes('leader')) return 'default';
      if (role.toLowerCase().includes('admin') || role.toLowerCase().includes('planner')) return 'secondary';
      return 'outline';
  }

  const getRoleIcon = (role: string) => {
      if (role.toLowerCase().includes('leader')) return <ShieldCheck className="h-4 w-4 mr-1 text-primary-foreground" />;
      if (role.toLowerCase().includes('admin') || role.toLowerCase().includes('planner')) return <UserCog className="h-4 w-4 mr-1 text-secondary-foreground" />;
      return <Users className="h-4 w-4 mr-1 text-muted-foreground" />;
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
           <UserCog className="mr-2 h-5 w-5 text-primary" />
           Group Roles & Permissions
        </CardTitle>
        <CardDescription>Identify roles and responsibilities within the group.</CardDescription>
      </CardHeader>
      <CardContent>
        {members.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No members with assigned roles.</p>
        ) : (
          <ul className="space-y-3">
            {members.sort((a, b) => (a.id === groupLeaderId ? -1 : b.id === groupLeaderId ? 1 : 0)) // Bring leader to top
              .map((member) => (
              <li
                key={member.id}
                className={cn(
                  "flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-border rounded-lg bg-card stagger-item",
                  member.id === groupLeaderId && "bg-primary/10 border-primary/30"
                )}
              >
                <div className="flex items-center space-x-3 mb-2 sm:mb-0 flex-grow">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{member.name}</span>
                </div>
                <Badge variant={getRoleBadgeVariant(member.role)} className="flex items-center self-start sm:self-center text-xs px-2 py-1 whitespace-nowrap">
                   {getRoleIcon(member.role)}
                   {member.role}
                </Badge>
                {/* Optionally display permissions */}
                {/* {member.permissions && member.permissions.length > 0 && (
                  <div className="mt-2 text-xs text-muted-foreground pl-12 sm:pl-0 sm:ml-4">
                    Permissions: {member.permissions.join(', ')}
                  </div>
                )} */} 
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

// Example Usage Data
const exampleRoleMembers: RoleMember[] = [
  { id: 'leader-1', name: 'Alice Leader', avatarUrl: '/avatars/alice.png', role: 'Group Leader' },
  { id: 'member-2', name: 'Bob Member', avatarUrl: '/avatars/bob.png', role: 'Member' },
  { id: 'planner-3', name: 'Charlie Planner', role: 'Trip Planner', permissions: ['Edit Itinerary', 'Add Hotels'] },
  { id: 'member-4', name: 'Diana Viewer', role: 'Member' },
];

/* Example Parent Component
const ParentComponent = () => {
    return <RoleAssignmentDisplay members={exampleRoleMembers} groupLeaderId="leader-1" />
}
*/

export default RoleAssignmentDisplay;
