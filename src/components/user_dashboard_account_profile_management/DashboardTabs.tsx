import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardTabsProps {
  defaultTab?: string;
  bookingsComponent: React.ReactNode;
  itinerariesComponent: React.ReactNode;
  groupTripsComponent: React.ReactNode;
  historyComponent: React.ReactNode;
  paymentsComponent: React.ReactNode;
  preferencesComponent?: React.ReactNode;
  rewardsComponent?: React.ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  defaultTab = "bookings",
  bookingsComponent,
  itinerariesComponent,
  groupTripsComponent,
  historyComponent,
  paymentsComponent,
  preferencesComponent,
  rewardsComponent,
}) => {
  const tabs = [
    { value: "bookings", label: "Bookings", content: bookingsComponent },
    { value: "itineraries", label: "Itineraries", content: itinerariesComponent },
    { value: "group_trips", label: "Group Trips", content: groupTripsComponent },
    { value: "history", label: "History", content: historyComponent },
    { value: "payments", label: "Payments", content: paymentsComponent },
  ];

  if (preferencesComponent) {
    tabs.push({ value: "preferences", label: "Preferences", content: preferencesComponent });
  }
  if (rewardsComponent) {
    tabs.push({ value: "rewards", label: "Rewards", content: rewardsComponent });
  }

  return (
    <Tabs defaultValue={defaultTab} className="w-full animate-fade-in">
      <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mb-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DashboardTabs;
