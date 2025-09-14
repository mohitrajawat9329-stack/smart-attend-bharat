import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  Settings,
  Activity,
  Clock,
  BarChart3
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const systemStats = {
    totalStudents: 1248,
    totalTeachers: 45,
    activeClasses: 156,
    systemUptime: '99.8%',
    averageAttendance: 87,
    proxyDetections: 23,
    totalSessions: 45672,
    biometricScans: 12450
  };

  const recentActivities = [
    { time: '2 min ago', action: 'New student enrollment', user: 'Ravi Kumar', type: 'info' },
    { time: '5 min ago', action: 'Proxy attendance detected', user: 'Student ID: 1234', type: 'warning' },
    { time: '10 min ago', action: 'Teacher schedule updated', user: 'Anjali Mehta', type: 'info' },
    { time: '15 min ago', action: 'System backup completed', user: 'System', type: 'success' },
    { time: '20 min ago', action: 'Bluetooth connectivity issue', user: 'Room 205', type: 'error' },
  ];

  const departmentStats = [
    { name: 'Computer Science', students: 320, attendance: 91, teachers: 12 },
    { name: 'Electronics', students: 280, attendance: 89, teachers: 10 },
    { name: 'Mechanical', students: 245, attendance: 85, teachers: 8 },
    { name: 'Civil', students: 220, attendance: 88, teachers: 7 },
    { name: 'Chemical', students: 183, attendance: 86, teachers: 8 },
  ];

  const securityMetrics = [
    { metric: 'Face Recognition Accuracy', value: 98.5, status: 'excellent' },
    { metric: 'Bluetooth Detection Rate', value: 96.2, status: 'good' },
    { metric: 'Data Encryption Status', value: 100, status: 'excellent' },
    { metric: 'Proxy Detection Accuracy', value: 94.8, status: 'good' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'success': return <UserCheck className="h-4 w-4 text-success" />;
      default: return <Activity className="h-4 w-4 text-primary" />;
    }
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-card-gradient p-6 rounded-lg border">
        <h1 className="text-3xl font-bold mb-2">System Administration</h1>
        <p className="text-muted-foreground">Welcome, {user?.name}. Monitor and manage the Smart Attendance System.</p>
      </div>

      {/* System Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{systemStats.totalStudents.toLocaleString()}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Teachers</p>
                <p className="text-2xl font-bold">{systemStats.totalTeachers}</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold text-success">{systemStats.systemUptime}</p>
              </div>
              <Activity className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold text-primary">{systemStats.averageAttendance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <Progress value={systemStats.averageAttendance} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* System Metrics */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  System Metrics
                </CardTitle>
                <CardDescription>Real-time system performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Active Sessions</p>
                    <p className="text-xl font-bold">{systemStats.totalSessions.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Biometric Scans</p>
                    <p className="text-xl font-bold">{systemStats.biometricScans.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <Progress value={68} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Storage Usage</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Latest system activities and events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="font-medium">Manage Users</span>
                  <span className="text-sm text-muted-foreground">Add or modify user accounts</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Shield className="h-6 w-6 mb-2" />
                  <span className="font-medium">Security Settings</span>
                  <span className="text-sm text-muted-foreground">Configure security parameters</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span className="font-medium">Generate Reports</span>
                  <span className="text-sm text-muted-foreground">Create attendance reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
              <CardDescription>Attendance statistics by department</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{dept.name}</h4>
                    <Badge variant={dept.attendance >= 90 ? 'default' : dept.attendance >= 80 ? 'secondary' : 'destructive'}>
                      {dept.attendance}% Attendance
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Students</p>
                      <p className="font-medium">{dept.students}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Teachers</p>
                      <p className="font-medium">{dept.teachers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Attendance</p>
                      <Progress value={dept.attendance} className="mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Metrics
                </CardTitle>
                <CardDescription>System security performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <span className={`text-sm font-bold ${getMetricColor(metric.status)}`}>
                        {metric.value}%
                      </span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Security Alerts
                </CardTitle>
                <CardDescription>Recent security incidents and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm font-medium text-destructive">Multiple Failed Login Attempts</p>
                  <p className="text-xs text-muted-foreground">IP: 192.168.1.xxx - 15 minutes ago</p>
                </div>
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm font-medium text-warning">Proxy Detection Alert</p>
                  <p className="text-xs text-muted-foreground">Student ID: 1234 - Possible proxy attendance</p>
                </div>
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm font-medium text-primary">System Update Available</p>
                  <p className="text-xs text-muted-foreground">Security patch v2.1.3 ready for installation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>Comprehensive attendance analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Advanced Analytics Coming Soon</h3>
                <p className="text-muted-foreground">Detailed charts and graphs for attendance patterns, trends, and insights will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};