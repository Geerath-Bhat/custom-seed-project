import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Imported for potential use within placeholder data/functions if needed

// Layout Components
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// UI Components for this page
import UserProfileCard from '@/components/user_profile_settings_page/UserProfileCard';
import PersonalInfoForm from '@/components/user_profile_settings_page/PersonalInfoForm';
import PreferencesPanel from '@/components/user_profile_settings_page/PreferencesPanel';
import SavedItemsList from '@/components/user_profile_settings_page/SavedItemsList';
import LogoutButton from '@/components/user_profile_settings_page/LogoutButton';
import AccountManagementActions from '@/components/user_profile_settings_page/AccountManagementActions';
import InfoTextBlock from '@/components/user_profile_settings_page/InfoTextBlock';

// Placeholder Data Generation

// For UserProfileCard (id: 1)
const mockUserProfile = {
  userName: "Jane Doe",
  email: "jane.doe@example.com",
  avatarFallback: "JD",
  // avatarUrl: "https://github.com/shadcn.png", // Optional: Add a real image URL if desired
};
const handleUpdateAvatar = () => {
  console.log("Update avatar clicked - Placeholder");
  alert("Avatar update functionality placeholder");
};

// For PersonalInfoForm (id: 2)
const mockInitialInfo = {
  displayName: "Jane Doe",
  email: "jane.doe@example.com",
};
// Define the type for the form data based on the component's schema expectation (can be refined)
type PersonalInfoFormData = {
  displayName: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};
const handleProfileSubmit = async (data: PersonalInfoFormData) => {
  console.log("Submitting profile info (Placeholder):", data);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // The toast notification is handled within the PersonalInfoForm component itself
  console.log("Profile update simulation finished.");
  // Example: Throw an error to test error handling in the form
  // throw new Error("Simulated API Error");
};

// For PreferencesPanel (id: 3)
const mockInitialPrefs = {
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
  fontSizeScale: 1.0, // 100%
};
// Define the type based on component props
type PreferenceData = typeof mockInitialPrefs;
const handlePrefsChange = (prefs: PreferenceData) => {
  console.log("Preferences changed (Placeholder):", prefs);
  // In a real app, you would likely persist these settings (e.g., API call, localStorage)
};

// For SavedItemsList (id: 4)
const mockSavedItems = [
  { id: 'wl1', name: 'Tech Stocks Watchlist', description: 'My favorite tech companies', manageLink: '/dashboard' }, // Using /dashboard as placeholder link
  { id: 'wl2', name: 'Dividend Plays', manageLink: '/market-overview' }, // Using /market-overview as placeholder link
  { id: 'al1', name: 'AAPL Price Alert', description: 'Alert when AAPL > $200', manageLink: '/profile' }, // Using /profile as placeholder link
];
const handleDeleteItem = (id: string) => {
  console.log("Delete item (Placeholder):", id);
  alert(`Placeholder: Delete item ${id}`);
  // Update mockSavedItems state here in a real scenario
};
const handleRenameItem = (id: string, newName: string) => {
    console.log(`Rename item ${id} to (Placeholder): ${newName}`);
    alert(`Placeholder: Rename item ${id} to ${newName}`);
     // Update mockSavedItems state here in a real scenario
};

// For LogoutButton (id: 5)
const handleLogout = () => {
  console.log("Logout action initiated (Placeholder)");
  alert("Placeholder: Logging out...");
  // Add actual logout logic (e.g., clear session/token, redirect)
  // Example redirect: window.location.href = '/login';
};

// For AccountManagementActions (id: 6)
const handleDeleteAccount = () => {
  console.log("Delete account action initiated (Placeholder)");
  // Actual deletion logic would go here, likely involving API calls and state updates
};
const handleExportData = () => {
  console.log("Export data action initiated (Placeholder)");
  // Actual data export logic would go here
};

// For InfoTextBlock (id: 7)
const infoTextContent = `
  Manage your account details and preferences here.
  Changes to your profile information require clicking 'Save Changes'.
  Notification settings control how you receive updates. Theme and font size adjustments enhance your user experience.
  Be cautious with actions in the 'Danger Zone' as they are irreversible.
  Your privacy is important to us. Refer to our Privacy Policy for more details.
`;

export default function UserProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} hasCollapsibleSidebar={true} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Component 1: User Profile Card */}
            <UserProfileCard
              userName={mockUserProfile.userName}
              email={mockUserProfile.email}
              avatarFallback={mockUserProfile.avatarFallback}
              // avatarUrl={mockUserProfile.avatarUrl} // Uncomment to add image URL
              onUpdateAvatarClick={handleUpdateAvatar}
            />

            {/* Component 2: Personal Information Form */}
            <PersonalInfoForm
              initialData={mockInitialInfo}
              onSubmit={handleProfileSubmit}
            />

            {/* Component 3: Preferences Panel */}
            <PreferencesPanel
              initialPreferences={mockInitialPrefs}
              onPreferencesChange={handlePrefsChange}
            />

            {/* Component 4: Saved Items List */}
            <SavedItemsList
              title="Saved Watchlists & Alerts"
              items={mockSavedItems}
              onDeleteItem={handleDeleteItem}
              onRenameItem={handleRenameItem}
              emptyStateMessage="You haven't saved any watchlists or alerts yet."
            />

            {/* Component 7: Explanatory Text Block (Positioned before actions based on input order) */}
            <InfoTextBlock
              content={infoTextContent}
              variant="subtle"
              className="mt-8"
            />

             {/* Component 5: Logout Button (often placed near account actions) */}
             <div className="mt-6 flex justify-start">
                <LogoutButton onLogout={handleLogout} useConfirmation={true} />
             </div>

            {/* Component 6: Account Management Actions (Danger Zone) */}
            <AccountManagementActions
              onDeleteAccount={handleDeleteAccount}
              onExportData={handleExportData}
            />

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
