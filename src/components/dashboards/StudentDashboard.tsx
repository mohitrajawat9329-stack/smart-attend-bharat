import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { AttendanceScanner } from '@/components/AttendanceScanner';
import { Calendar, Clock, TrendingUp, Award, Camera, Bluetooth, Bell } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock attendance data
  const attendanceData = {
    overall: 87,
    thisWeek: 95,
    thisMonth: 89,
    streak: 5,
    totalClasses: 156,
    attendedClasses: 136,
    subjects: [
      { name: 'Mathematics', attendance: 92, total: 28, attended: 26 },
      { name: 'Physics', attendance: 85, total: 24, attended: 20 },
      { name: 'Chemistry', attendance: 90, total: 22, attended: 20 },
      { name: 'English', attendance: 78, total: 18, attended: 14 },
    ]
  };

  const todaySchedule = [
    { time: '09:00 AM', subject: 'Mathematics', teacher: 'Anjali Mehta', room: 'Room 101', status: 'present' },
    { time: '11:00 AM', subject: 'Physics', teacher: 'Rakesh Iyer', room: 'Room 205', status: 'upcoming' },
    { time: '02:00 PM', subject: 'Chemistry', teacher: 'Anjali Mehta', room: 'Lab 1', status: 'upcoming' },
  ];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 90) return 'status-success';
    if (percentage >= 75) return 'status-warning';
    return 'status-danger';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-card-gradient p-6 rounded-lg border">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Track your attendance and stay on top of your academic progress.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Attendance</p>
                <p className={`text-2xl font-bold ${getAttendanceColor(attendanceData.overall)}`}>
                  {attendanceData.overall}%
                </p>
              </div>
              <TrendingUp className={`h-8 w-8 ${getAttendanceColor(attendanceData.overall)}`} />
            </div>
            <Progress value={attendanceData.overall} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className={`text-2xl font-bold ${getAttendanceColor(attendanceData.thisWeek)}`}>
                  {attendanceData.thisWeek}%
                </p>
              </div>
              <Calendar className={`h-8 w-8 ${getAttendanceColor(attendanceData.thisWeek)}`} />
            </div>
            <Progress value={attendanceData.thisWeek} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Streak</p>
                <p className="text-2xl font-bold text-success">{attendanceData.streak} days</p>
              </div>
              <Award className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Classes Attended</p>
                <p className="text-2xl font-bold">{attendanceData.attendedClasses}/{attendanceData.totalClasses}</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySchedule.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{classItem.subject}</h4>
                    <Badge variant={classItem.status === 'present' ? 'default' : 'outline'}>
                      {classItem.status === 'present' ? 'Present' : 'Upcoming'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{classItem.teacher} • {classItem.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{classItem.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Subject-wise Attendance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
            <CardDescription>Your attendance breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceData.subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{subject.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge className={getAttendanceBadge(subject.attendance)}>
                      {subject.attendance}%
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {subject.attended}/{subject.total}
                    </span>
                  </div>
                </div>
                <Progress value={subject.attendance} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Attendance Scanner */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Camera className="h-5 w-5 text-primary" />
              <Bluetooth className="h-5 w-5 text-primary" />
            </div>
            Mark Attendance
          </CardTitle>
          <CardDescription>
            Use facial recognition and Bluetooth proximity to mark your attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceScanner />
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm font-medium text-success">Attendance Marked Successfully</p>
            <p className="text-xs text-muted-foreground">Mathematics class - Today at 9:15 AM</p>
          </div>
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium text-primary">Reminder: Upcoming Class</p>
            <p className="text-xs text-muted-foreground">Physics class starts in 30 minutes - Room 205</p>
          </div>
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm font-medium text-warning">Attendance Below Threshold</p>
            <p className="text-xs text-muted-foreground">English subject attendance is 78% - Target: 80%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};