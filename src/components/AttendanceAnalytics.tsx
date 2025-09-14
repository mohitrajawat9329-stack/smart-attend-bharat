import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Clock, 
  Target, 
  Award,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

export const AttendanceAnalytics: React.FC = () => {
  const { user } = useAuth();

  // Mock analytics data based on user role
  const getAnalyticsData = () => {
    if (user?.role === 'student') {
      return {
        title: 'My Attendance Analytics',
        description: 'Track your attendance patterns and performance',
        monthlyData: [
          { month: 'Aug', attendance: 89, target: 85 },
          { month: 'Sep', attendance: 92, target: 85 },
          { month: 'Oct', attendance: 87, target: 85 },
          { month: 'Nov', attendance: 94, target: 85 },
          { month: 'Dec', attendance: 91, target: 85 },
        ],
        insights: [
          { title: 'Attendance Goal', value: '85%', status: 'achieved', trend: 'up' },
          { title: 'Best Subject', value: 'Mathematics', status: 'good', trend: 'up' },
          { title: 'Improvement Needed', value: 'English', status: 'warning', trend: 'down' },
          { title: 'Current Streak', value: '5 days', status: 'good', trend: 'up' },
        ]
      };
    } else if (user?.role === 'teacher') {
      return {
        title: 'Class Analytics',
        description: 'Monitor your students\' attendance patterns',
        monthlyData: [
          { month: 'Aug', attendance: 86, target: 80 },
          { month: 'Sep', attendance: 89, target: 80 },
          { month: 'Oct', attendance: 84, target: 80 },
          { month: 'Nov', attendance: 91, target: 80 },
          { month: 'Dec', attendance: 88, target: 80 },
        ],
        insights: [
          { title: 'Class Average', value: '88%', status: 'good', trend: 'up' },
          { title: 'Best Performing Class', value: 'Math 12-A', status: 'good', trend: 'up' },
          { title: 'Needs Attention', value: 'Math 12-B', status: 'warning', trend: 'down' },
          { title: 'Students at Risk', value: '3 students', status: 'warning', trend: 'up' },
        ]
      };
    } else {
      return {
        title: 'System Analytics',
        description: 'Comprehensive attendance system overview',
        monthlyData: [
          { month: 'Aug', attendance: 85, target: 80 },
          { month: 'Sep', attendance: 87, target: 80 },
          { month: 'Oct', attendance: 83, target: 80 },
          { month: 'Nov', attendance: 89, target: 80 },
          { month: 'Dec', attendance: 86, target: 80 },
        ],
        insights: [
          { title: 'System Average', value: '86%', status: 'good', trend: 'up' },
          { title: 'Best Department', value: 'Computer Science', status: 'good', trend: 'up' },
          { title: 'Total Students', value: '1,248', status: 'good', trend: 'up' },
          { title: 'Proxy Detections', value: '23 this month', status: 'warning', trend: 'down' },
        ]
      };
    }
  };

  const analyticsData = getAnalyticsData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved':
      case 'good': return 'status-success';
      case 'warning': return 'status-warning';
      case 'danger': return 'status-danger';
      default: return '';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-success" /> : 
      <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  const subjectAnalytics = [
    { subject: 'Mathematics', attendance: 92, classes: 28, present: 26, trend: 'up' },
    { subject: 'Physics', attendance: 85, classes: 24, present: 20, trend: 'stable' },
    { subject: 'Chemistry', attendance: 90, classes: 22, present: 20, trend: 'up' },
    { subject: 'English', attendance: 78, classes: 18, present: 14, trend: 'down' },
    { subject: 'Biology', attendance: 88, classes: 20, present: 18, trend: 'up' },
  ];

  const timePatterns = [
    { timeSlot: '08:00 - 10:00', attendance: 95, description: 'Morning classes show highest attendance' },
    { timeSlot: '10:00 - 12:00', attendance: 92, description: 'Consistent attendance in mid-morning' },
    { timeSlot: '12:00 - 14:00', attendance: 78, description: 'Lunch break impact on attendance' },
    { timeSlot: '14:00 - 16:00', attendance: 85, description: 'Post-lunch recovery period' },
    { timeSlot: '16:00 - 18:00', attendance: 88, description: 'Evening classes maintain good attendance' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card-gradient p-6 rounded-lg border">
        <h1 className="text-3xl font-bold mb-2">{analyticsData.title}</h1>
        <p className="text-muted-foreground">{analyticsData.description}</p>
      </div>

      {/* Key Insights */}
      <div className="grid md:grid-cols-4 gap-4">
        {analyticsData.insights.map((insight, index) => (
          <Card key={index} className="glass-card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
                  <p className="text-2xl font-bold">{insight.value}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {getTrendIcon(insight.trend)}
                  <Badge className={getStatusColor(insight.status)}>
                    {insight.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Monthly Attendance Trend
            </CardTitle>
            <CardDescription>Attendance performance over the last 5 months</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.monthlyData.map((month, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{month.month}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${month.attendance >= month.target ? 'text-success' : 'text-warning'}`}>
                      {month.attendance}%
                    </span>
                    <span className="text-sm text-muted-foreground">Target: {month.target}%</span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={month.attendance} className="h-3" />
                  <div 
                    className="absolute top-0 h-3 w-0.5 bg-destructive"
                    style={{ left: `${month.target}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Time Pattern Analysis */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Time Pattern Analysis
            </CardTitle>
            <CardDescription>Attendance patterns by time of day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {timePatterns.map((pattern, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{pattern.timeSlot}</span>
                  <span className={`font-bold ${
                    pattern.attendance >= 90 ? 'text-success' : 
                    pattern.attendance >= 80 ? 'text-primary' : 'text-warning'
                  }`}>
                    {pattern.attendance}%
                  </span>
                </div>
                <Progress value={pattern.attendance} className="h-2" />
                <p className="text-xs text-muted-foreground">{pattern.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Analysis */}
      {user?.role === 'student' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Subject-wise Performance
            </CardTitle>
            <CardDescription>Detailed breakdown of attendance by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {subjectAnalytics.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{subject.subject}</h4>
                      {getTrendIcon(subject.trend)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{subject.present}/{subject.classes} classes</span>
                      <span>•</span>
                      <span>{subject.attendance}% attendance</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      subject.attendance >= 90 ? 'status-success' :
                      subject.attendance >= 80 ? 'status-warning' : 'status-danger'
                    }>
                      {subject.attendance}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Goals */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Performance Goals & Achievements
          </CardTitle>
          <CardDescription>Track your progress towards attendance goals</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
            <Award className="h-8 w-8 text-success mx-auto mb-2" />
            <h4 className="font-medium text-success">Perfect Week</h4>
            <p className="text-sm text-muted-foreground">100% attendance this week</p>
          </div>
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
            <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-medium text-primary">Consistency</h4>
            <p className="text-sm text-muted-foreground">5-day attendance streak</p>
          </div>
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg text-center">
            <Calendar className="h-8 w-8 text-warning mx-auto mb-2" />
            <h4 className="font-medium text-warning">Monthly Goal</h4>
            <p className="text-sm text-muted-foreground">Need 3% more for target</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};