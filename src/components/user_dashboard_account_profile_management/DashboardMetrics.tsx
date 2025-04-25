import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Plane, History, Award, CreditCard, Bell, Users, AlertCircle } from 'lucide-react';

interface MetricsData {
  currentBookings?: number;
  upcomingTrips?: number;
  pastTravels?: number;
  totalRewards?: number | string; // Could be points or amount
  pendingPayments?: number;
  unreadNotifications?: number;
  groupInvitations?: number;
}

interface DashboardMetricsProps {
  metrics: MetricsData;
}

const MetricCard: React.FC<{ title: string; value: number | string | undefined; icon: React.ElementType, delay: number }> = ({ title, value, icon: Icon, delay }) => {
  if (value === undefined || value === null) return null;

  return (
    <Card className="stagger-item shadow-sm" style={{ animationDelay: `${delay * 0.05}s` }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
};

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ metrics }) => {
  const metricItems = [
    { title: 'Current Bookings', value: metrics.currentBookings, icon: Calendar },
    { title: 'Upcoming Trips', value: metrics.upcomingTrips, icon: Plane },
    { title: 'Past Travels', value: metrics.pastTravels, icon: History },
    { title: 'Rewards/Coupons', value: metrics.totalRewards, icon: Award },
    { title: 'Pending Payments', value: metrics.pendingPayments, icon: CreditCard, alert: metrics.pendingPayments && metrics.pendingPayments > 0 },
    { title: 'Unread Notifications', value: metrics.unreadNotifications, icon: Bell, alert: metrics.unreadNotifications && metrics.unreadNotifications > 0 },
    { title: 'Group Invitations', value: metrics.groupInvitations, icon: Users, alert: metrics.groupInvitations && metrics.groupInvitations > 0 },
  ].filter(item => item.value !== undefined && item.value !== null);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-container mb-6">
      {metricItems.map((item, index) => (
          <MetricCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.alert ? AlertCircle : item.icon} // Use AlertCircle if there's an alert condition
            delay={index}
          />
      ))}
    </div>
  );
};

export default DashboardMetrics;
