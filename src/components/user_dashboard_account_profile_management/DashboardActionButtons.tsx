import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus, Share2, Users, Award, Repeat } from 'lucide-react';

interface DashboardActionButtonsProps {
  onInviteFriends?: () => void;
  onShareProfile?: () => void;
  onManageInvites?: () => void;
  onRedeemRewards?: () => void;
  onRepeatBooking?: () => void; // Might need booking ID context
}

const DashboardActionButtons: React.FC<DashboardActionButtonsProps> = ({
  onInviteFriends,
  onShareProfile,
  onManageInvites,
  onRedeemRewards,
  onRepeatBooking,
}) => {
  const actions = [
    { handler: onInviteFriends, label: 'Invite Friends', icon: UserPlus, condition: !!onInviteFriends },
    { handler: onShareProfile, label: 'Share Profile', icon: Share2, condition: !!onShareProfile },
    { handler: onManageInvites, label: 'Manage Invites', icon: Users, condition: !!onManageInvites },
    { handler: onRedeemRewards, label: 'Redeem Rewards', icon: Award, condition: !!onRedeemRewards },
    { handler: onRepeatBooking, label: 'Repeat Last Booking', icon: Repeat, condition: !!onRepeatBooking }, // Simplified label
  ].filter(action => action.condition);

  if (actions.length === 0) {
      return null;
  }

  return (
    <div className="flex flex-wrap gap-2 my-6 animate-fade-in">
      {actions.map((action) => (
        <Button key={action.label} variant="default" onClick={action.handler}>
          <action.icon className="mr-2 h-4 w-4" />
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default DashboardActionButtons;
