import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock, UserCheck } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('math-12a');

  // Mock data for teacher
  const teacherData = {
    totalStudents: 156,
    presentToday: 142,
    averageAttendance: 89,
    totalClasses: 28,
    subjects: ['Mathematics', 'Statistics'],
    classes: [
      { id: 'math-12a', name: 'Mathematics 12-A', students: 32, attendance: 91 },
      { id: 'math-12b', name: 'Mathematics 12-B', students: 28, attendance: 87 },
      { id: 'stat-11a', name: 'Statistics 11-A', students: 24, attendance: 94 },
    ]
  };

  const todayClasses = [
    { 
      time: '09:00 AM', 
      subject: 'Mathematics 12-A', 
      room: 'Room 101', 
      students: 32, 
      present: 30, 
      status: 'completed' 
    },
    { 
      time: '11:00 AM', 
      subject: 'Mathematics 12-B', 
      room: 'Room 101', 
      students: 28, 
      present: 26, 
      status: 'ongoing' 
    },
    { 
      time: '02:00 PM', 
      subject: 'Statistics 11-A', 
      room: 'Room 205', 
      students: 24, 
      present: 0, 
      status: 'upcoming' 
    },
  ];

  const studentsList = [
    { id: '1', name: 'Rahul Sharma', attendance: 92, status: 'present', lastSeen: '9:15 AM' },
    { id: '2', name: 'Priya Verma', attendance: 85, status: 'present', lastSeen: '9:12 AM' },
    { id: '3', name: 'Aman Singh', attendance: 78, status: 'absent', lastSeen: 'Yesterday' },
    { id: '4', name: 'Neha Kapoor', attendance: 94, status: 'present', lastSeen: '9:10 AM' },
    { id: '5', name: 'Karan Malhotra', attendance: 82, status: 'present', lastSeen: '9:18 AM' },
    { id: '6', name: 'Sneha Patil', attendance: 88, status: 'late', lastSeen: '9:25 AM' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'status-success';
      case 'absent': return 'status-danger';
      case 'late': return 'status-warning';
      default: return '';
    }
  };

  const getClassStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'ongoing': return <Clock className="h-4 w-4 text-warning" />;
      case 'upcoming': return <Calendar className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-card-gradient p-6 rounded-lg border">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">Manage your classes and monitor student attendance.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{teacherData.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                <p className="text-2xl font-bold text-success">{teacherData.presentToday}</p>
              </div>
              <UserCheck className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Attendance</p>
                <p className="text-2xl font-bold text-primary">{teacherData.averageAttendance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <Progress value={teacherData.averageAttendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold">{teacherData.totalClasses}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayClasses.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getClassStatusIcon(classItem.status)}
                  <div>
                    <h4 className="font-medium">{classItem.subject}</h4>
                    <p className="text-sm text-muted-foreground">{classItem.room} • {classItem.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {classItem.present}/{classItem.students}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {classItem.status === 'completed' ? 'Completed' : 
                     classItem.status === 'ongoing' ? 'In Progress' : 'Upcoming'}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Class Performance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
            <CardDescription>Attendance overview by class</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherData.classes.map((classItem, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{classItem.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={classItem.attendance >= 85 ? 'default' : 'destructive'}>
                      {classItem.attendance}%
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {classItem.students} students
                    </span>
                  </div>
                </div>
                <Progress value={classItem.attendance} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Student Management */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Student Attendance Management</CardTitle>
          <CardDescription>View and manage individual student attendance</CardDescription>
          <div className="flex items-center gap-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {teacherData.classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {studentsList.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="font-medium text-primary">{student.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">Last seen: {student.lastSeen}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{student.attendance}%</p>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                  </div>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Attendance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm font-medium text-destructive">Low Attendance Alert</p>
            <p className="text-xs text-muted-foreground">Aman Singh's attendance has dropped to 78% in Mathematics</p>
          </div>
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm font-medium text-warning">Late Arrival</p>
            <p className="text-xs text-muted-foreground">Sneha Patil arrived 15 minutes late to Mathematics class</p>
          </div>
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium text-primary">Proxy Detection Alert</p>
            <p className="text-xs text-muted-foreground">Unusual attendance pattern detected for student ID: 1234</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};