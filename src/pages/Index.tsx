import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import { Navigation } from '@/components/Navigation';
import { StudentDashboard } from '@/components/dashboards/StudentDashboard';
import { TeacherDashboard } from '@/components/dashboards/TeacherDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { AttendanceScanner } from '@/components/AttendanceScanner';
import { AttendanceAnalytics } from '@/components/AttendanceAnalytics';
import { Settings } from '@/components/Settings';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="bg-card-gradient p-6 rounded-lg border">
              <h1 className="text-3xl font-bold mb-2">Mark Attendance</h1>
              <p className="text-muted-foreground">Use biometric verification to mark your attendance</p>
            </div>
            <AttendanceScanner />
          </div>
        );
      case 'analytics':
      case 'classes':
      case 'users':
      case 'security':
        return <AttendanceAnalytics />;
      case 'settings':
      case 'profile':
        return <Settings />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="container mx-auto p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
