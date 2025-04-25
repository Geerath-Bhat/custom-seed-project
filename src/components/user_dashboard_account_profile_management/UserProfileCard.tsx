import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, KeyRound, Settings, User } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  imageUrl?: string;
  contactInfo?: string;
}

interface UserProfileCardProps {
  user: UserProfile;
  onEditProfile: () => void;
  onResetPassword: () => void;
  onGoToPreferences: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, onEditProfile, onResetPassword, onGoToPreferences }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <Card className="w-full max-w-md animate-scale-in">
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.imageUrl} alt={`${user.name}'s profile picture`} />
          <AvatarFallback className="bg-muted text-muted-foreground">
            {user.imageUrl ? <User className="h-8 w-8" /> : getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl font-semibold text-foreground">{user.name}</CardTitle>
          <CardDescription className="text-muted-foreground">{user.email}</CardDescription>
          {user.contactInfo && <p className="text-sm text-muted-foreground mt-1">{user.contactInfo}</p>}
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        {/* Additional profile details could go here if needed */}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 border-t border-border">
        <Button variant="outline" size="sm" onClick={onEditProfile} className="w-full sm:w-auto">
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="ghost" size="sm" onClick={onResetPassword} className="flex-1 sm:flex-none">
            <KeyRound className="mr-2 h-4 w-4" /> Password
          </Button>
          <Button variant="ghost" size="sm" onClick={onGoToPreferences} className="flex-1 sm:flex-none">
            <Settings className="mr-2 h-4 w-4" /> Preferences
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfileCard;
