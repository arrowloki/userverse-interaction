
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Save, 
  Globe, 
  Bell, 
  Lock, 
  Database, 
  ServerCrash, 
  Shield, 
  AlertCircle, 
  ChevronRight, 
  Check 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'UserOS',
    companyName: 'Acme Inc.',
    supportEmail: 'support@acme.com',
    timeZone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    mfaEnabled: true,
    passwordPolicyEnabled: true,
    minPasswordLength: 8,
    sessionTimeout: 30,
    loginAttempts: 5,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    dailyDigest: false,
    securityAlerts: true,
    systemUpdates: true,
  });

  const [apiSettings, setApiSettings] = useState({
    apiEnabled: true,
    rateLimiting: true,
    maxRequests: 100,
    apiKey: 'sk_test_12345678901234567890',
    loggingEnabled: true,
  });

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Success",
      description: "General settings saved successfully",
    });
  };
  
  const handleSaveSecuritySettings = () => {
    toast({
      title: "Success",
      description: "Security settings saved successfully",
    });
  };
  
  const handleSaveNotificationSettings = () => {
    toast({
      title: "Success",
      description: "Notification settings saved successfully",
    });
  };
  
  const handleSaveApiSettings = () => {
    toast({
      title: "Success",
      description: "API settings saved successfully",
    });
  };

  const regenerateApiKey = () => {
    const newApiKey = 'sk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiSettings({
      ...apiSettings,
      apiKey: newApiKey,
    });
    
    toast({
      title: "Success",
      description: "API key regenerated successfully",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Configure your user management system</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full lg:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">System Name</label>
                <Input 
                  value={generalSettings.systemName} 
                  onChange={(e) => setGeneralSettings({...generalSettings, systemName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input 
                  value={generalSettings.companyName} 
                  onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Support Email</label>
                <Input 
                  type="email" 
                  value={generalSettings.supportEmail} 
                  onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Zone</label>
                  <Select 
                    value={generalSettings.timeZone}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, timeZone: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Format</label>
                  <Select 
                    value={generalSettings.dateFormat}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, dateFormat: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                      <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Details about your system and environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">System Version</p>
                    <p className="font-medium">UserOS v1.0.0</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">June 10, 2023</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Environment</p>
                    <Badge>Production</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Database Status</p>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="font-medium">Connected</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">System Status</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-muted/30 rounded-md text-center">
                      <div className="mb-2 text-green-500">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-medium">API</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted/30 rounded-md text-center">
                      <div className="mb-2 text-green-500">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-medium">Database</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted/30 rounded-md text-center">
                      <div className="mb-2 text-green-500">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-medium">Authentication</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Multi-Factor Authentication</label>
                  <p className="text-xs text-muted-foreground">Require MFA for all users</p>
                </div>
                <Switch 
                  checked={securitySettings.mfaEnabled}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, mfaEnabled: checked})}
                />
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Password Policy</label>
                    <p className="text-xs text-muted-foreground">Enforce strong password requirements</p>
                  </div>
                  <Switch 
                    checked={securitySettings.passwordPolicyEnabled}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordPolicyEnabled: checked})}
                  />
                </div>
                
                <div className="space-y-4 pl-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Password Length</label>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number" 
                        min="6" 
                        max="32"
                        value={securitySettings.minPasswordLength} 
                        onChange={(e) => setSecuritySettings({...securitySettings, minPasswordLength: parseInt(e.target.value)})}
                        disabled={!securitySettings.passwordPolicyEnabled}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">characters</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      min="5" 
                      max="1440"
                      value={securitySettings.sessionTimeout} 
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">minutes</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Users will be logged out after this period of inactivity</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Failed Login Attempts</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={securitySettings.loginAttempts} 
                      onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)})}
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">attempts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Number of failed attempts before account lockout</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSecuritySettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>View recent security events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Failed login attempt', time: '2 minutes ago', ip: '192.168.1.1', severity: 'medium' },
                  { type: 'Password changed', time: '1 hour ago', ip: '192.168.1.2', severity: 'low' },
                  { type: 'New user created', time: '1 day ago', ip: '192.168.1.3', severity: 'low' },
                  { type: 'Multiple login attempts', time: '2 days ago', ip: '192.168.1.4', severity: 'high' },
                ].map((event, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md border">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center 
                        ${event.severity === 'high' ? 'bg-red-100 text-red-700' : 
                          event.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-blue-100 text-blue-700'}`}
                      >
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.type}</p>
                        <p className="text-xs text-muted-foreground">IP: {event.ip} • {event.time}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Email Notifications</label>
                  <p className="text-xs text-muted-foreground">Send notifications via email</p>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Push Notifications</label>
                  <p className="text-xs text-muted-foreground">Send notifications to mobile devices</p>
                </div>
                <Switch 
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm">Daily Digest</label>
                      <p className="text-xs text-muted-foreground">Receive a daily summary of activities</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.dailyDigest}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, dailyDigest: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm">Security Alerts</label>
                      <p className="text-xs text-muted-foreground">Receive notifications about security events</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm">System Updates</label>
                      <p className="text-xs text-muted-foreground">Receive notifications about system updates</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>Customize notification templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Welcome Email', description: 'Sent when a new user is created' },
                  { name: 'Password Reset', description: 'Sent when a user requests a password reset' },
                  { name: 'Account Locked', description: 'Sent when a user account is locked' },
                  { name: 'Login Alert', description: 'Sent when there is a suspicious login attempt' },
                ].map((template, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md border hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-medium">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Configure the API for third-party integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Enable API</label>
                  <p className="text-xs text-muted-foreground">Allow third-party applications to access your data</p>
                </div>
                <Switch 
                  checked={apiSettings.apiEnabled}
                  onCheckedChange={(checked) => setApiSettings({...apiSettings, apiEnabled: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Rate Limiting</label>
                  <p className="text-xs text-muted-foreground">Limit the number of API requests</p>
                </div>
                <Switch 
                  checked={apiSettings.rateLimiting}
                  onCheckedChange={(checked) => setApiSettings({...apiSettings, rateLimiting: checked})}
                />
              </div>
              
              {apiSettings.rateLimiting && (
                <div className="pl-6 space-y-2">
                  <label className="text-sm font-medium">Maximum Requests</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      min="10" 
                      max="1000"
                      value={apiSettings.maxRequests} 
                      onChange={(e) => setApiSettings({...apiSettings, maxRequests: parseInt(e.target.value)})}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">requests per minute</span>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">API Key</label>
                <div className="flex gap-2">
                  <Input 
                    value={apiSettings.apiKey} 
                    readOnly
                    type="password"
                  />
                  <Button variant="outline" onClick={regenerateApiKey}>
                    Regenerate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Use this key to authenticate API requests</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">API Request Logging</label>
                  <p className="text-xs text-muted-foreground">Log all API requests for auditing</p>
                </div>
                <Switch 
                  checked={apiSettings.loggingEnabled}
                  onCheckedChange={(checked) => setApiSettings({...apiSettings, loggingEnabled: checked})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveApiSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Resources for developers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col p-4 border rounded-md hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Globe className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">API Reference</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Comprehensive documentation of all API endpoints
                    </p>
                    <div className="mt-auto flex items-center text-sm text-primary">
                      <span>View documentation</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col p-4 border rounded-md hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Database className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">Examples & Tutorials</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Sample code and integration guides
                    </p>
                    <div className="mt-auto flex items-center text-sm text-primary">
                      <span>View examples</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col p-4 border rounded-md hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Lock className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">Authentication</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn how to authenticate your API requests
                    </p>
                    <div className="mt-auto flex items-center text-sm text-primary">
                      <span>View guide</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col p-4 border rounded-md hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div className="flex items-center mb-2">
                      <ServerCrash className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">Error Handling</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Understand API error codes and responses
                    </p>
                    <div className="mt-auto flex items-center text-sm text-primary">
                      <span>View guide</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
