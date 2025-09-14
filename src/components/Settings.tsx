import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Camera, 
  Bluetooth,
  Lock,
  Eye,
  Settings as SettingsIcon,
  Save
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    attendance: true,
    reminders: true,
    alerts: false,
    email: true,
    sms: false,
  });

  const [privacy, setPrivacy] = useState({
    faceRecognition: true,
    bluetoothScanning: true,
    locationTracking: false,
    dataSharing: false,
  });

  const [preferences, setPreferences] = useState({
    language: 'english',
    timezone: 'asia-kolkata',
    theme: 'light',
    scanSensitivity: 'medium',
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Settings saved:', { notifications, privacy, preferences });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card-gradient p-6 rounded-lg border">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and system settings.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={user?.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={user?.role} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell us about yourself" />
              </div>

              <Button onClick={handleSave} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Attendance Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when attendance is marked</p>
                  </div>
                  <Switch
                    checked={notifications.attendance}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, attendance: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Class Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminders before classes start</p>
                  </div>
                  <Switch
                    checked={notifications.reminders}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, reminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important security and system alerts</p>
                  </div>
                  <Switch
                    checked={notifications.alerts}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, alerts: checked }))
                    }
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <Label>Email Notifications</Label>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, email: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <Label>SMS Notifications</Label>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, sms: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy & Security Settings
              </CardTitle>
              <CardDescription>Control your privacy settings and biometric data usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Camera className="h-5 w-5 text-primary" />
                    <div className="space-y-0.5">
                      <Label>Facial Recognition</Label>
                      <p className="text-sm text-muted-foreground">Allow facial recognition for attendance</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacy.faceRecognition}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, faceRecognition: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bluetooth className="h-5 w-5 text-primary" />
                    <div className="space-y-0.5">
                      <Label>Bluetooth Scanning</Label>
                      <p className="text-sm text-muted-foreground">Enable Bluetooth proximity detection</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacy.bluetoothScanning}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, bluetoothScanning: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-primary" />
                    <div className="space-y-0.5">
                      <Label>Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">Share anonymized data for system improvement</p>
                    </div>
                  </div>
                  <Switch
                    checked={privacy.dataSharing}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, dataSharing: checked }))
                    }
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Security Status</h4>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                    <span className="text-sm font-medium">Two-Factor Authentication</span>
                    <Badge className="status-success">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                    <span className="text-sm font-medium">Data Encryption</span>
                    <Badge className="status-success">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <span className="text-sm font-medium">Last Security Scan</span>
                    <Badge>2 hours ago</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                System Preferences
              </CardTitle>
              <CardDescription>Configure system-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, language: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                      <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, timezone: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="asia-mumbai">Asia/Mumbai</SelectItem>
                      <SelectItem value="asia-delhi">Asia/Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sensitivity">Scanner Sensitivity</Label>
                <Select value={preferences.scanSensitivity} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, scanSensitivity: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Less sensitive, fewer false positives</SelectItem>
                    <SelectItem value="medium">Medium - Balanced sensitivity (Recommended)</SelectItem>
                    <SelectItem value="high">High - More sensitive, may have false positives</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">System Information</h4>
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">App Version</span>
                    <span className="text-sm font-medium">v2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Update</span>
                    <span className="text-sm font-medium">Dec 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Device ID</span>
                    <span className="text-sm font-medium">ATD-{user?.id}-2024</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};