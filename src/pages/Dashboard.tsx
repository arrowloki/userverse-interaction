
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUsers } from '@/context/UserContext';
import { PieChart, UserCheck, UserMinus, UserPlus, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard = () => {
  const { users, totalUsers } = useUsers();

  // Calculate statistics
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;
  const pendingUsers = users.filter(user => user.status === 'pending').length;

  const adminUsers = users.filter(user => user.role === 'admin').length;
  const regularUsers = users.filter(user => user.role === 'user').length;
  const editorUsers = users.filter(user => user.role === 'editor').length;

  // Generate mock activity data
  const getActivityData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      name: month,
      'New Users': Math.floor(Math.random() * 50) + 10,
      'Active Users': Math.floor(Math.random() * 200) + 50,
    }));
  };

  const activityData = getActivityData();

  const roleData = [
    { name: "Admins", value: adminUsers, color: "#9333ea" },
    { name: "Editors", value: editorUsers, color: "#4f46e5" },
    { name: "Users", value: regularUsers, color: "#0ea5e9" }
  ];

  const statusData = [
    { name: "Active", value: activeUsers, color: "#22c55e" },
    { name: "Inactive", value: inactiveUsers, color: "#6b7280" },
    { name: "Pending", value: pendingUsers, color: "#f59e0b" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your user management system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={totalUsers}
          icon={<Users className="h-4 w-4" />}
          description="Registered users"
        />
        <StatsCard
          title="Active Users"
          value={activeUsers}
          icon={<UserCheck className="h-4 w-4" />}
          change={5}
          description="From last month"
        />
        <StatsCard
          title="New Users"
          value="12"
          icon={<UserPlus className="h-4 w-4" />}
          change={8}
          description="This month"
        />
        <StatsCard
          title="Inactive Users"
          value={inactiveUsers}
          icon={<UserMinus className="h-4 w-4" />}
          change={-3}
          description="From last month"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>User growth and activity over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="New Users" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Active Users" fill="#9333ea" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-rows-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Roles</CardTitle>
                  <CardDescription>Distribution of user roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart layout="vertical" data={roleData}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {roleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Status</CardTitle>
                  <CardDescription>Distribution of user status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart layout="vertical" data={statusData}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed analytics of your user base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
                <div className="text-center">
                  <PieChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Advanced Analytics</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    This section will display advanced analytics and insights about your users, engagement patterns, and system performance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
