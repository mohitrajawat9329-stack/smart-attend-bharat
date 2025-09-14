import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Camera, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  User,
  GraduationCap,
  Users,
  Shield
} from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    if (user?.role === 'student') {
      return [
        ...commonItems.slice(0, 1),
        { id: 'attendance', label: 'Mark Attendance', icon: Camera },
        { id: 'analytics', label: 'My Analytics', icon: BarChart3 },
        ...commonItems.slice(1),
      ];
    }

    if (user?.role === 'teacher') {
      return [
        ...commonItems.slice(0, 1),
        { id: 'classes', label: 'My Classes', icon: Users },
        { id: 'analytics', label: 'Class Analytics', icon: BarChart3 },
        ...commonItems.slice(1),
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...commonItems.slice(0, 1),
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'analytics', label: 'System Analytics', icon: BarChart3 },
        { id: 'security', label: 'Security', icon: Shield },
        ...commonItems.slice(1),
      ];
    }

    return commonItems;
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'student': return <GraduationCap className="h-4 w-4" />;
      case 'teacher': return <Users className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = () => {
    switch (user?.role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="border-b bg-card-gradient backdrop-blur-lg sticky top-0 z-50">
      <div className="flex h-16 items-center px-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Smart Attendance</h1>
            <p className="text-xs text-muted-foreground">Monitoring System</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1 ml-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className={`flex items-center gap-2 ${isActive ? 'bg-primary text-primary-foreground' : ''}`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <div className="flex items-center gap-1">
                    <Badge className={`text-xs ${getRoleColor()}`}>
                      <span className="flex items-center gap-1">
                        {getRoleIcon()}
                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                      </span>
                    </Badge>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onViewChange('profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};