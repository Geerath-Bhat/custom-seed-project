import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import IntegratedSidebar from '@/components/layout/IntegratedSidebar';
import Footer from '@/components/layout/Footer';
import UserProfileCard from '@/components/user_dashboard_account_profile_management/UserProfileCard';
import DashboardTabs from '@/components/user_dashboard_account_profile_management/DashboardTabs';
import DashboardMetrics from '@/components/user_dashboard_account_profile_management/DashboardMetrics';
import BookingList from '@/components/user_dashboard_account_profile_management/BookingList';
import SavedTripsGroup from '@/components/user_dashboard_account_profile_management/SavedTripsGroup';
import SupportWidget from '@/components/user_dashboard_account_profile_management/SupportWidget';
import NotificationList from '@/components/user_dashboard_account_profile_management/NotificationList';
import PaymentHistoryTable from '@/components/user_dashboard_account_profile_management/PaymentHistoryTable';
import DashboardActionButtons from '@/components/user_dashboard_account_profile_management/DashboardActionButtons';
import UserSettingsForm from '@/components/user_dashboard_account_profile_management/UserSettingsForm';

// --- Placeholder Data --- 

const mockUser = {
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  imageUrl: 'https://via.placeholder.com/150/0077CC/FFFFFF?text=AJ',
  contactInfo: '+1 123-456-7890',
};

const mockMetrics = {
  currentBookings: 2,
  upcomingTrips: 1,
  pastTravels: 5,
  totalRewards: '1250 pts',
  pendingPayments: 0,
  unreadNotifications: 3,
  groupInvitations: 1,
};

const mockBookings = [
  { id: 'b1', destination: 'Paris Getaway', startDate: '2024-08-15', endDate: '2024-08-22', status: 'active' as const, imageUrl: 'https://via.placeholder.com/150/771796' },
  { id: 'b2', destination: 'Tokyo Adventure', startDate: '2024-09-10', endDate: '2024-09-20', status: 'upcoming' as const, imageUrl: 'https://via.placeholder.com/150/FF6347' },
  { id: 'b3', destination: 'Rome Weekend', startDate: '2024-05-01', endDate: '2024-05-04', status: 'completed' as const },
  { id: 'b4', destination: 'London Business Trip', startDate: '2024-03-10', endDate: '2024-03-15', status: 'completed' as const },
  { id: 'b5', destination: 'Berlin Exploration', startDate: '2024-01-20', endDate: '2024-01-25', status: 'cancelled' as const },
];

const mockSavedTrips = [
  {
    id: 's1',
    title: 'Summer Italy Road Trip',
    type: 'itinerary' as const,
    imageUrl: 'https://via.placeholder.com/300/FFD700/000000?text=Italy',
    description: 'Plan for Aug 2025',
  },
  {
    id: 's2',
    title: 'Thailand Friends Trip',
    type: 'group' as const,
    imageUrl: 'https://via.placeholder.com/300/20B2AA/FFFFFF?text=Thailand',
    description: 'Dec 2024 - Finalizing details',
    participants: [
      { name: 'Sarah Lee', imageUrl: 'https://via.placeholder.com/40/FF69B4/FFFFFF?text=SL' },
      { name: 'Mike Brown', imageUrl: 'https://via.placeholder.com/40/1E90FF/FFFFFF?text=MB' },
      { name: 'Chloe Davis', imageUrl: 'https://via.placeholder.com/40/32CD32/FFFFFF?text=CD' },
      { name: 'Ben Evans' }, // No image, fallback to initials
    ],
  },
  {
    id: 's3',
    title: 'Kyoto Cherry Blossoms',
    type: 'destination' as const,
    imageUrl: 'https://via.placeholder.com/300/FFC0CB/000000?text=Kyoto',
    description: 'Saved for future planning',
  },
];

const mockNotifications = [
  { id: 'n1', message: 'Your booking for Paris is confirmed!', read: false, timestamp: new Date(Date.now() - 1000 * 60 * 5), link: '#' },
  { id: 'n2', message: 'Reminder: Payment due for Tokyo trip.', read: false, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), link: '#' },
  { id: 'n3', message: 'Mike Brown accepted your invite to Thailand Friends Trip.', read: false, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), link: '#' },
  { id: 'n4', message: 'Welcome to Ascendion! Explore your dashboard.', read: true, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
];

const mockPayments = [
  { id: 'p1', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), amount: 1250.00, method: 'Visa **** 1234', status: 'paid' as const, receiptUrl: '#' },
  { id: 'p2', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), amount: 800.50, method: 'Mastercard **** 5678', status: 'paid' as const, receiptUrl: '#' },
  { id: 'p3', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90), amount: 350.00, method: 'PayPal', status: 'paid' as const },
  { id: 'p4', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), amount: 50.00, method: 'Visa **** 1234', status: 'failed' as const },
];

const mockDefaultSettings = {
  theme: 'system' as const,
  language: 'en',
  emailNotifications: true,
  pushNotifications: false,
};

// --- Handler Functions (Placeholders) ---

const handleEditProfile = () => alert('Edit Profile clicked');
const handleResetPassword = () => alert('Reset Password clicked');
const handleGoToPreferences = () => alert('Go To Preferences clicked (likely scroll or tab switch)');
const handleViewBooking = (id: string) => alert(`View Booking ${id}`);
const handleRepeatBooking = (id: string) => alert(`Repeat Booking ${id}`);
const handleCancelBooking = (id: string) => alert(`Cancel Booking ${id}`);
const handleShareBooking = (id: string) => alert(`Share Booking ${id}`);
const handleEditSavedTrip = (id: string) => alert(`Edit Saved Trip ${id}`);
const handleShareSavedTrip = (id: string) => alert(`Share Saved Trip ${id}`);
const handleRemoveSavedTrip = (id: string) => alert(`Remove Saved Trip ${id}`);
const handleOpenChat = () => alert('Open Chat clicked');
const handleSubmitSupportRequest = async (data: { subject: string; message: string }) => {
  alert(`Support Request Submitted: ${JSON.stringify(data)}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
};
const handleMarkReadNotification = (id: string | 'all') => alert(`Mark Notification Read: ${id}`);
const handleClearAllNotifications = () => alert('Clear All Notifications');
const handleInviteFriends = () => alert('Invite Friends clicked');
const handleShareProfile = () => alert('Share Profile clicked');
const handleManageInvites = () => alert('Manage Invites clicked');
const handleRedeemRewards = () => alert('Redeem Rewards clicked');
const handleSubmitSettings = async (data: typeof mockDefaultSettings) => {
  alert(`Settings Submitted: ${JSON.stringify(data)}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
};

// --- Page Component --- 

export default function UserDashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // State for notifications (in a real app, this would come from context or state management)
  const [notifications, setNotifications] = useState(mockNotifications);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

   // Example handler logic that modifies state
  const handleMarkRead = (id: string | 'all') => {
    setNotifications(prev =>
      prev.map(n => (id === 'all' || n.id === id ? { ...n, read: true } : n))
    );
    console.log(`Mark Notification Read: ${id}`);
  };

  const handleClearAll = () => {
    setNotifications([]);
    console.log('Clear All Notifications');
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} hasCollapsibleSidebar={true} />
      <div className="flex flex-1">
        <IntegratedSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Row 1: Profile, Metrics, Actions, Support, Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1 flex flex-col space-y-6">
              <UserProfileCard
                user={mockUser}
                onEditProfile={handleEditProfile}
                onResetPassword={handleResetPassword}
                onGoToPreferences={handleGoToPreferences} // Could trigger tab switch later
              />
              <SupportWidget
                  onOpenChat={handleOpenChat}
                  onSubmitSupportRequest={handleSubmitSupportRequest}
              />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <DashboardMetrics metrics={mockMetrics} />
              <div className="flex flex-wrap items-center gap-2">
                <DashboardActionButtons
                  onInviteFriends={handleInviteFriends}
                  onShareProfile={handleShareProfile}
                  onManageInvites={handleManageInvites}
                  onRedeemRewards={handleRedeemRewards}
                  onRepeatBooking={() => handleRepeatBooking('b3')} // Example: repeat last completed
                />
                <NotificationList
                  notifications={notifications}
                  onMarkRead={handleMarkRead} // Use state-modifying handler
                  onClearAll={handleClearAll} // Use state-modifying handler
                />
              </div>
            </div>
          </div>

          {/* Row 2: Tabs and Content */}
          <DashboardTabs
            defaultTab="bookings"
            bookingsComponent={
              <BookingList
                bookings={mockBookings}
                onView={handleViewBooking}
                onRepeat={handleRepeatBooking}
                onCancel={handleCancelBooking}
                onShare={handleShareBooking}
              />
            }
            itinerariesComponent={
              <SavedTripsGroup
                savedTrips={mockSavedTrips.filter(t => t.type === 'itinerary' || t.type === 'destination')}
                onEdit={handleEditSavedTrip}
                onShare={handleShareSavedTrip}
                onRemove={handleRemoveSavedTrip}
              />
            }
            groupTripsComponent={
              // You might reuse SavedTripsGroup filtered differently or use a dedicated component
              <SavedTripsGroup
                 savedTrips={mockSavedTrips.filter(t => t.type === 'group')}
                 onEdit={handleEditSavedTrip}
                 onShare={handleShareSavedTrip}
                 onRemove={handleRemoveSavedTrip}
              />
              // Or a placeholder:
              // <div className="text-center p-8 bg-muted rounded-md"><p className="text-muted-foreground">Group Trips Section</p></div>
            }
            historyComponent={
              // You might reuse BookingList filtered for completed/cancelled or a dedicated component
               <BookingList
                 bookings={mockBookings.filter(b => b.status === 'completed' || b.status === 'cancelled')}
                 onView={handleViewBooking}
                 onRepeat={handleRepeatBooking}
                 onCancel={handleCancelBooking} // Maybe disable cancel for history
                 onShare={handleShareBooking}
               />
              // Or a placeholder:
              // <div className="text-center p-8 bg-muted rounded-md"><p className="text-muted-foreground">Booking History Section</p></div>
            }
            paymentsComponent={
              <PaymentHistoryTable payments={mockPayments} />
            }
            preferencesComponent={
              <UserSettingsForm
                defaultSettings={mockDefaultSettings}
                onSubmit={handleSubmitSettings}
              />
            }
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
