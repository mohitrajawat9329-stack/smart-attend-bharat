import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Users, Shield, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  // Pre-filled demo accounts
  const demoAccounts = {
    student: [
      { name: 'Rahul Sharma', email: 'rahul.sharma@student.edu' },
      { name: 'Priya Verma', email: 'priya.verma@student.edu' },
      { name: 'Aman Singh', email: 'aman.singh@student.edu' },
    ],
    teacher: [
      { name: 'Anjali Mehta', email: 'anjali.mehta@teacher.edu' },
      { name: 'Rakesh Iyer', email: 'rakesh.iyer@teacher.edu' },
    ],
    admin: [
      { name: 'Arvind Rao', email: 'arvind.rao@admin.edu' },
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        onLogin();
      } else {
        setError('Invalid credentials. Use "password" as password for demo accounts.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case 'student': return <GraduationCap className="h-4 w-4" />;
      case 'teacher': return <Users className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      default: return null;
    }
  };

  const getRoleColor = (roleType: string) => {
    switch (roleType) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Smart Attendance System</CardTitle>
            <CardDescription className="text-center">
              Sign in to access the attendance monitoring system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Demo password: <code className="bg-muted px-1 rounded">password</code>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl">Demo Accounts</CardTitle>
            <CardDescription>
              Click on any account below to auto-fill login credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(demoAccounts).map(([roleType, accounts]) => (
              <div key={roleType} className="space-y-3">
                <div className="flex items-center gap-2">
                  {getRoleIcon(roleType)}
                  <h3 className="font-semibold capitalize">{roleType}s</h3>
                  <Badge className={getRoleColor(roleType)}>
                    {accounts.length} account{accounts.length > 1 ? 's' : ''}
                  </Badge>
                </div>
                <div className="grid gap-2">
                  {accounts.map((account) => (
                    <Button
                      key={account.email}
                      variant="outline"
                      className="justify-start h-auto p-3 text-left"
                      onClick={() => handleDemoLogin(account.email)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{account.name}</span>
                        <span className="text-xs text-muted-foreground">{account.email}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};