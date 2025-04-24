import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface UserProfileCardProps {
  userName: string;
  email: string;
  avatarUrl?: string;
  avatarFallback: string; // e.g., initials
  onUpdateAvatarClick?: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  userName,
  email,
  avatarUrl,
  avatarFallback,
  onUpdateAvatarClick,
}) => {
  return (
    <Card className="w-full border-border bg-card text-card-foreground">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
        <CardDescription className="text-muted-foreground">
          Your personal details and avatar.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative group">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl} alt={`${userName}'s avatar`} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          {onUpdateAvatarClick && (
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background border-border hover:bg-muted group-hover:opacity-100 opacity-0 transition-opacity duration-200"
              onClick={onUpdateAvatarClick}
              aria-label="Update profile photo"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-medium text-foreground">{userName}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
