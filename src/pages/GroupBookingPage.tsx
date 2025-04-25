import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import IntegratedSidebar from '@/components/layout/IntegratedSidebar';
import Footer from '@/components/layout/Footer';
import GroupBookingStepper from '@/components/group_booking_trip_management_page/GroupBookingStepper';
import InviteControls from '@/components/group_booking_trip_management_page/InviteControls';
import GroupStatusTracker from '@/components/group_booking_trip_management_page/GroupStatusTracker';
import GroupChatWidget from '@/components/group_booking_trip_management_page/GroupChatWidget';
import ItineraryEditor from '@/components/group_booking_trip_management_page/ItineraryEditor';
import HotelSelectionPanel from '@/components/group_booking_trip_management_page/HotelSelectionPanel';
import GroupDiscountProgress from '@/components/group_booking_trip_management_page/GroupDiscountProgress';
import CostSplitPaymentTable from '@/components/group_booking_trip_management_page/CostSplitPaymentTable';
import RoleAssignmentDisplay from '@/components/group_booking_trip_management_page/RoleAssignmentDisplay';
import ParticipationControl from '@/components/group_booking_trip_management_page/ParticipationControl';
import BookingHistoryList from '@/components/group_booking_trip_management_page/BookingHistoryList';
import NotificationCenter from '@/components/group_booking_trip_management_page/NotificationCenter';
import { useToast } from '@/components/ui/use-toast'; // For invite controls feedback

// --- Mock Data Structures Definition ---
interface GroupMember { id: string; name: string; avatarUrl?: string; status: 'accepted' | 'pending' | 'declined'; }
interface ChatMessage { id: string; senderId: string; senderName: string; senderAvatar?: string; text: string; timestamp: Date; }
interface ItineraryItem { id: string; title: string; date: Date; time?: string; location?: string; description?: string; suggestedBy?: string; votes?: number; }
interface HotelOption { id: string; name: string; imageUrl: string; rating: number; pricePerNight: number; currency?: string; amenities: string[]; location: string; isSelected?: boolean; votes?: number; }
interface ParticipantCost { id: string; name: string; role?: string; shareAmount: number; paidAmount: number; paymentMethod?: string; isPaymentConfirmed: boolean; }
interface RoleMember { id: string; name: string; avatarUrl?: string; role: string; permissions?: string[]; }
type ParticipationStatus = 'confirmed' | 'pending' | 'declined';
interface BookingHistoryItem { id: string; tripName: string; destination: string; startDate: Date; endDate: Date; status: 'ongoing' | 'completed' | 'cancelled' | 'pending'; bookingReference?: string; viewDetailsLink?: string; }
interface NotificationItem { id: string; type: 'info' | 'success' | 'warning' | 'error' | 'update'; message: string; timestamp: Date; read?: boolean; }

// --- Placeholder Data ---

const mockGroupMembers: GroupMember[] = [
  { id: 'leader-alice', name: 'Alice Wonderland', avatarUrl: '/placeholder-avatar.png', status: 'accepted' },
  { id: 'user-bob', name: 'Bob The Builder', avatarUrl: '/placeholder-avatar.png', status: 'pending' },
  { id: 'user-charlie', name: 'Charlie Chaplin', status: 'declined' },
  { id: 'user-diana', name: 'Diana Prince', avatarUrl: '/placeholder-avatar.png', status: 'pending' },
];

const mockMessages: ChatMessage[] = [
  { id: 'msg1', senderId: 'leader-alice', senderName: 'Alice', text: 'Hey team, excited for the Paris trip!', timestamp: new Date(Date.now() - 60000 * 10) },
  { id: 'msg2', senderId: 'userMe', senderName: 'You', text: 'Me too! Can we discuss hotel options?', timestamp: new Date(Date.now() - 60000 * 5) },
  { id: 'msg3', senderId: 'user-diana', senderName: 'Diana', text: 'Sounds good!', timestamp: new Date(Date.now() - 60000 * 2) },
];

const mockItineraryItems: ItineraryItem[] = [
  { id: 'iti1', title: 'Arrival & Check-in', date: new Date(2024, 10, 15), time: '14:00', location: 'Hotel Le Grand', description: 'Settle in and relax', votes: 3 },
  { id: 'iti2', title: 'Eiffel Tower Visit', date: new Date(2024, 10, 16), time: '10:00', location: 'Champ de Mars', description: 'Iconic landmark tour', suggestedBy: 'Alice', votes: 5 },
  { id: 'iti3', title: 'Louvre Museum', date: new Date(2024, 10, 17), time: '09:30', location: 'Louvre Museum', description: 'Explore world-class art', votes: 4 },
];

const mockHotelOptions: HotelOption[] = [
  { id: 'hotel1', name: 'Hotel Le Grand', imageUrl: '/placeholder-hotel1.jpg', rating: 4.5, pricePerNight: 150, currency: 'EUR', amenities: ['wifi', 'restaurant', 'gym'], location: 'Central Paris', votes: 3 },
  { id: 'hotel2', name: 'Parisian Charm Inn', imageUrl: '/placeholder-hotel2.jpg', rating: 4.2, pricePerNight: 120, currency: 'EUR', amenities: ['wifi', 'breakfast'], location: 'Near Montmartre', votes: 1 },
  { id: 'hotel3', name: 'Riverside Suites', imageUrl: '/placeholder-hotel3.jpg', rating: 4.8, pricePerNight: 180, currency: 'EUR', amenities: ['wifi', 'pool', 'spa'], location: 'Seine Riverfront', votes: 0 },
];

const mockParticipantsCost: ParticipantCost[] = [
  { id: 'leader-alice', name: 'Alice Wonderland', role: 'Group Leader', shareAmount: 375, paidAmount: 375, paymentMethod: 'Card', isPaymentConfirmed: true },
  { id: 'user-bob', name: 'Bob The Builder', shareAmount: 375, paidAmount: 0, isPaymentConfirmed: false },
  { id: 'user-diana', name: 'Diana Prince', shareAmount: 375, paidAmount: 100, paymentMethod: 'Bank Transfer', isPaymentConfirmed: false },
  // Assuming Charlie declined, not in cost split
];

const mockRoleMembers: RoleMember[] = [
  { id: 'leader-alice', name: 'Alice Wonderland', avatarUrl: '/placeholder-avatar.png', role: 'Group Leader', permissions: ['Manage Invites', 'Edit Itinerary'] },
  { id: 'user-bob', name: 'Bob The Builder', avatarUrl: '/placeholder-avatar.png', role: 'Member' },
  { id: 'user-diana', name: 'Diana Prince', avatarUrl: '/placeholder-avatar.png', role: 'Member' },
];

const mockBookingHistory: BookingHistoryItem[] = [
  { id: 'hist1', tripName: 'Rome Getaway', destination: 'Rome, Italy', startDate: new Date(2023, 5, 10), endDate: new Date(2023, 5, 15), status: 'completed', bookingReference: 'ROM123', viewDetailsLink: '#' },
  { id: 'hist2', tripName: 'Tokyo Exploration', destination: 'Tokyo, Japan', startDate: new Date(2024, 1, 20), endDate: new Date(2024, 1, 28), status: 'completed', viewDetailsLink: '#' },
  { id: 'hist3', tripName: 'Paris Adventure', destination: 'Paris, France', startDate: new Date(2024, 10, 15), endDate: new Date(2024, 10, 20), status: 'ongoing' },
];

const mockNotifications: NotificationItem[] = [
    { id: 'n1', type: 'success', message: 'Diana Prince accepted the invite!', timestamp: new Date(Date.now() - 60000 * 5), read: false },
    { id: 'n2', type: 'update', message: 'Itinerary updated: Added Louvre Museum.', timestamp: new Date(Date.now() - 60000 * 15), read: false },
    { id: 'n3', type: 'info', message: 'Payment reminder sent to Bob The Builder.', timestamp: new Date(Date.now() - 60000 * 60), read: true },
];


const GroupBookingPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();

  // --- State Management for Interactive Components ---
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>(mockGroupMembers);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>(mockItineraryItems);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [hotelOptions, setHotelOptions] = useState<HotelOption[]>(mockHotelOptions);
  const [participantsCost, setParticipantsCost] = useState<ParticipantCost[]>(mockParticipantsCost);
  const [participationStatus, setParticipationStatus] = useState<ParticipationStatus>('pending'); // Example for current user

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // --- Placeholder Handlers ---
  const handleRemind = (memberId: string) => {
    console.log(`Reminding member ${memberId}...`);
    toast({ title: 'Reminder Sent', description: `Reminder sent to ${groupMembers.find(m => m.id === memberId)?.name}.` });
  };

  const handleSendMessage = (text: string, file?: File) => {
    console.log('Sending message:', text, file);
    const newMessage: ChatMessage = {
      id: `msg${Date.now()}`,
      senderId: 'userMe',
      senderName: 'You',
      text: text,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleAddItinerary = (item: Omit<ItineraryItem, 'id'>) => {
    console.log('Adding itinerary item:', item);
    const newItem = { ...item, id: `iti${Date.now()}`, votes: 0 };
    setItineraryItems([...itineraryItems, newItem]);
    toast({ title: 'Itinerary Updated', description: `Added: ${item.title}` });
  };

  const handleUpdateItinerary = (updatedItem: ItineraryItem) => {
    console.log('Updating itinerary item:', updatedItem);
    setItineraryItems(itineraryItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    toast({ title: 'Itinerary Updated', description: `Updated: ${updatedItem.title}` });
  };

  const handleDeleteItinerary = (itemId: string) => {
    console.log('Deleting itinerary item:', itemId);
    const deletedItem = itineraryItems.find(item => item.id === itemId);
    setItineraryItems(itineraryItems.filter(item => item.id !== itemId));
    if (deletedItem) {
        toast({ title: 'Itinerary Updated', description: `Removed: ${deletedItem.title}`, variant: 'destructive' });
    }
  };

  const handleSelectHotel = (hotelId: string) => {
    console.log('Selecting hotel:', hotelId);
    setSelectedHotel(hotelId);
    toast({ title: 'Hotel Selected', description: `Group selection set to ${hotelOptions.find(h => h.id === hotelId)?.name}.` });
  };

  const handleVoteHotel = (hotelId: string) => {
      console.log('Voting for hotel:', hotelId);
      setHotelOptions(prevOptions =>
        prevOptions.map(h => h.id === hotelId ? {...h, votes: (h.votes || 0) + 1} : h)
      );
      toast({ title: 'Vote Cast', description: `You voted for ${hotelOptions.find(h => h.id === hotelId)?.name}.` });
  };

   const handleCommentHotel = (hotelId: string) => {
      console.log('Commenting on hotel:', hotelId);
      // Add actual comment logic/UI trigger here
      toast({ title: 'Comment Added (Placeholder)', description: `Comment added for ${hotelOptions.find(h => h.id === hotelId)?.name}.` });
   };

  const handleUpdatePayment = (participantId: string, paidAmount: number, paymentMethod?: string) => {
    console.log(`Updating payment for ${participantId}: Amount ${paidAmount}, Method: ${paymentMethod}`);
    setParticipantsCost(prevCosts =>
      prevCosts.map(p =>
        p.id === participantId ? { ...p, paidAmount, paymentMethod: paymentMethod || p.paymentMethod } : p
      )
    );
    // Add toast feedback if needed
  };

  const handleConfirmPayment = (participantId: string, isConfirmed: boolean) => {
    console.log(`Confirming payment for ${participantId}: ${isConfirmed}`);
    setParticipantsCost(prevCosts =>
      prevCosts.map(p => (p.id === participantId ? { ...p, isPaymentConfirmed: isConfirmed } : p))
    );
     toast({ title: 'Payment Confirmation Updated', description: `Payment for ${participantsCost.find(p => p.id === participantId)?.name} marked as ${isConfirmed ? 'confirmed' : 'unconfirmed'}.` });
  };

  const handleStatusChange = (newStatus: ParticipationStatus) => {
    console.log('Updating participation status:', newStatus);
    setParticipationStatus(newStatus);
    toast({ title: 'Participation Status Updated', description: `Your status is now ${newStatus}.` });
  };

  const currentGroupSize = groupMembers.filter(m => m.status === 'accepted').length;
  const requiredSizeForDiscount = 5; // Example threshold
  const totalCost = 1500; // Example total cost

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} hasCollapsibleSidebar={true} />
      <div className="flex flex-1 overflow-hidden">
        <IntegratedSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto space-y-6">
          {/* Render UI components in order specified in Page Data JSON */}
          <GroupBookingStepper initialStep={1} />
          <InviteControls groupId="paris2024" />
          <GroupStatusTracker members={groupMembers} onRemind={handleRemind} />
          <GroupChatWidget
            messages={messages}
            currentUserId="userMe" // Assume 'userMe' is the ID of the logged-in user
            onSendMessage={handleSendMessage}
          />
          <ItineraryEditor
            items={itineraryItems}
            onAddItem={handleAddItinerary}
            onUpdateItem={handleUpdateItinerary}
            onDeleteItem={handleDeleteItinerary}
          />
          <HotelSelectionPanel
             hotelOptions={hotelOptions}
             selectedHotelId={selectedHotel}
             onSelectHotel={handleSelectHotel}
             onVote={handleVoteHotel}
             onComment={handleCommentHotel}
          />
          <GroupDiscountProgress
            currentGroupSize={currentGroupSize}
            requiredSizeForDiscount={requiredSizeForDiscount}
            discountPercentage={10} // Example discount
            discountDescription="Paris Trip Group Discount"
          />
          <CostSplitPaymentTable
             participants={participantsCost}
             totalCost={totalCost}
             currency="EUR"
             onUpdatePayment={handleUpdatePayment}
             onConfirmPayment={handleConfirmPayment}
          />
          <RoleAssignmentDisplay members={mockRoleMembers} groupLeaderId="leader-alice" />
          <ParticipationControl
             currentStatus={participationStatus}
             onStatusChange={handleStatusChange}
             tripName="Paris Adventure"
          />
          <BookingHistoryList bookings={mockBookingHistory} />
          <NotificationCenter notifications={mockNotifications} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default GroupBookingPage;
