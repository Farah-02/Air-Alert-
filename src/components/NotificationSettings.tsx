import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Bell, 
  BellRing, 
  CheckCircle, 
  AlertTriangle, 
  Settings,
  Clock,
  Loader2
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  region: string;
  notifications_enabled: boolean;
}

interface NotificationPreferences {
  enabled: boolean;
  aqiThreshold: number;
  pm25Threshold: number;
  pm10Threshold: number;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  frequency: 'immediate' | 'hourly' | 'daily';
}

interface Notification {
  id: string;
  message: string;
  type: 'warning' | 'alert' | 'info';
  timestamp: string;
  read: boolean;
}

interface NotificationSettingsProps {
  user: User;
}

export function NotificationSettings({ user }: NotificationSettingsProps) {
  const { t } = useLanguage();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    enabled: user.notifications_enabled,
    aqiThreshold: 100,
    pm25Threshold: 35,
    pm10Threshold: 150,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    frequency: 'immediate'
  });
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPreferences();
    fetchNotifications();
  }, []);

  const fetchPreferences = async () => {
    try {
      const token = localStorage.getItem('supabase_token') || publicAnonKey;
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/notification-preferences?userId=${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPreferences(data.preferences || preferences);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('supabase_token') || publicAnonKey;
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/notifications?userId=${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const savePreferences = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('supabase_token') || publicAnonKey;
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/notification-preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          preferences,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Notification preferences saved successfully!');
      } else {
        setError(result.error || 'Failed to save preferences');
      }
    } catch (error) {
      console.error('Save preferences error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const token = localStorage.getItem('supabase_token') || publicAnonKey;
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const sendTestNotification = async () => {
    try {
      const token = localStorage.getItem('supabase_token') || publicAnonKey;
      
      // First fetch current pollution data
      const pollutionResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/pollution/current?region=${encodeURIComponent(user.region)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!pollutionResponse.ok) {
        throw new Error('Failed to fetch pollution data');
      }

      const pollutionData = await pollutionResponse.json();
      
      // Create comprehensive test notification based on actual AQI and pollutants
      const aqiStatus = pollutionData.aqi <= 50 ? 'Good' : 
                       pollutionData.aqi <= 100 ? 'Moderate' : 
                       pollutionData.aqi <= 150 ? 'Unhealthy for Sensitive Groups' : 
                       pollutionData.aqi <= 200 ? 'Unhealthy' : 
                       pollutionData.aqi <= 300 ? 'Very Unhealthy' : 'Hazardous';
      
      // Check which pollutants exceed thresholds
      const pollutantThresholds = {
        pm25: 15,
        pm10: 45,
        no2: 25,
        so2: 40,
        o3: 100,
        co: 4
      };
      
      const exceededPollutants = [];
      if (pollutionData.pm25 > pollutantThresholds.pm25) exceededPollutants.push(`PM2.5 (${pollutionData.pm25} µg/m³)`);
      if (pollutionData.pm10 > pollutantThresholds.pm10) exceededPollutants.push(`PM10 (${pollutionData.pm10} µg/m³)`);
      if (pollutionData.no2 > pollutantThresholds.no2) exceededPollutants.push(`NO₂ (${pollutionData.no2} µg/m³)`);
      if (pollutionData.so2 > pollutantThresholds.so2) exceededPollutants.push(`SO₂ (${pollutionData.so2} µg/m³)`);
      if (pollutionData.o3 > pollutantThresholds.o3) exceededPollutants.push(`O₃ (${pollutionData.o3} µg/m³)`);
      if (pollutionData.co > pollutantThresholds.co) exceededPollutants.push(`CO (${pollutionData.co} mg/m³)`);
      
      let message = '';
      let type: 'info' | 'warning' | 'alert' = 'info';
      
      if (exceededPollutants.length > 0 && pollutionData.aqi > 100) {
        // Critical alert - both AQI and pollutants are high
        message = `🚨 AIR QUALITY ALERT: AQI is ${pollutionData.aqi} (${aqiStatus}). Elevated levels detected: ${exceededPollutants.join(', ')}. Limit outdoor activities and consider wearing a mask.`;
        type = 'alert';
      } else if (pollutionData.aqi > 100) {
        // AQI alert only
        message = `⚠️ AIR QUALITY WARNING: Overall AQI is ${pollutionData.aqi} (${aqiStatus}). Air quality is unhealthy. Sensitive groups should limit outdoor exposure.`;
        type = 'warning';
      } else if (exceededPollutants.length > 0) {
        // Pollutant alert only (but overall AQI is acceptable)
        message = `⚠️ POLLUTANT ALERT: Some pollutants exceed safe levels: ${exceededPollutants.join(', ')}. Overall AQI (${pollutionData.aqi}) is acceptable, but sensitive groups should be cautious.`;
        type = 'warning';
      } else {
        // Good air quality
        message = `✅ AIR QUALITY UPDATE: AQI is ${pollutionData.aqi} (${aqiStatus}). All pollutant levels are within safe WHO guidelines. Great time for outdoor activities!`;
        type = 'info';
      }
      
      const testNotification = {
        id: `test_${Date.now()}`,
        message: message,
        type: type,
        timestamp: new Date().toISOString(),
        read: false
      };

      // Send to backend
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/test-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          userId: user.id,
          notification: testNotification
        }),
      });

      if (response.ok) {
        setNotifications([testNotification, ...notifications]);
        setSuccess('Test notification sent based on current air quality data!');
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
      setError('Failed to send test notification');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">Alerts & Settings</h2>
        <p className="text-gray-600">Manage your air quality notifications and preferences</p>
      </div>

      {/* Hero Image */}
      <Card>
        <CardContent className="p-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1609162554108-6490759499ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RpZmljYXRpb24lMjBiZWxsJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc1ODk4MDM0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Notification settings"
            className="w-full h-48 object-cover rounded-lg"
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts & Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs px-1.5">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          {/* Test Notification Button */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="w-5 h-5" />
                Test Notification
              </CardTitle>
              <CardDescription>
                Send a test notification based on current air quality levels (AQI + Pollutants)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={sendTestNotification} className="w-full">
                Send Test Alert
              </Button>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Recent Alerts
              </CardTitle>
              <CardDescription>
                Your air quality notifications and warnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No notifications yet</p>
                  <p className="text-sm">You'll receive alerts when air quality changes</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? 'bg-gray-50' : 'bg-white border-blue-200'
                      } cursor-pointer transition-colors hover:bg-gray-100`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${getNotificationBadgeColor(notification.type)} text-xs`}>
                              {notification.type.toUpperCase()}
                            </Badge>
                            {!notification.read && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm mb-1">{notification.message}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {new Date(notification.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Alert Preferences
              </CardTitle>
              <CardDescription>
                Customize when and how you receive air quality notifications
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications-enabled">Enable Notifications</Label>
                  <div className="text-sm text-gray-600">
                    Receive alerts when air quality exceeds your thresholds
                  </div>
                </div>
                <Switch
                  id="notifications-enabled"
                  checked={preferences.enabled}
                  onCheckedChange={(checked) => 
                    setPreferences({ ...preferences, enabled: checked })
                  }
                />
              </div>

              {preferences.enabled && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="aqi-threshold">Overall AQI Alert Threshold</Label>
                      <Select 
                        value={preferences.aqiThreshold.toString()} 
                        onValueChange={(value) => 
                          setPreferences({ ...preferences, aqiThreshold: parseInt(value) })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50 - Good</SelectItem>
                          <SelectItem value="100">100 - Moderate</SelectItem>
                          <SelectItem value="150">150 - Unhealthy for Sensitive</SelectItem>
                          <SelectItem value="200">200 - Unhealthy</SelectItem>
                          <SelectItem value="300">300 - Very Unhealthy</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">
                        You'll be alerted when overall AQI exceeds this level
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="frequency">Notification Frequency</Label>
                      <Select 
                        value={preferences.frequency} 
                        onValueChange={(value: 'immediate' | 'hourly' | 'daily') => 
                          setPreferences({ ...preferences, frequency: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Summary</SelectItem>
                          <SelectItem value="daily">Daily Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="quiet-hours">Quiet Hours</Label>
                        <div className="text-sm text-gray-600">
                          Disable notifications during specific hours
                        </div>
                      </div>
                      <Switch
                        id="quiet-hours"
                        checked={preferences.quietHours.enabled}
                        onCheckedChange={(checked) => 
                          setPreferences({ 
                            ...preferences, 
                            quietHours: { ...preferences.quietHours, enabled: checked }
                          })
                        }
                      />
                    </div>

                    {preferences.quietHours.enabled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start-time">Start Time</Label>
                          <Select 
                            value={preferences.quietHours.start} 
                            onValueChange={(value) => 
                              setPreferences({ 
                                ...preferences, 
                                quietHours: { ...preferences.quietHours, start: value }
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => {
                                const hour = i.toString().padStart(2, '0');
                                return (
                                  <SelectItem key={hour} value={`${hour}:00`}>
                                    {hour}:00
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="end-time">End Time</Label>
                          <Select 
                            value={preferences.quietHours.end} 
                            onValueChange={(value) => 
                              setPreferences({ 
                                ...preferences, 
                                quietHours: { ...preferences.quietHours, end: value }
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => {
                                const hour = i.toString().padStart(2, '0');
                                return (
                                  <SelectItem key={hour} value={`${hour}:00`}>
                                    {hour}:00
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="border-t pt-4">
                <Button 
                  onClick={savePreferences} 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Preferences'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Criteria</CardTitle>
              <CardDescription>
                You receive alerts when:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Overall AQI exceeds threshold:</strong> When overall Air Quality Index goes above {preferences.aqiThreshold} ({preferences.aqiThreshold <= 50 ? 'Good' : preferences.aqiThreshold <= 100 ? 'Moderate' : preferences.aqiThreshold <= 150 ? 'Unhealthy for Sensitive' : preferences.aqiThreshold <= 200 ? 'Unhealthy' : 'Very Unhealthy'})
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Individual Pollutants exceed WHO limits:</strong> PM2.5 {'>'} 15 µg/m³, PM10 {'>'} 45 µg/m³, NO₂ {'>'} 25 µg/m³, SO₂ {'>'} 40 µg/m³, O₃ {'>'} 100 µg/m³, CO {'>'} 4 mg/m³
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Combined alerts:</strong> When both overall AQI AND specific pollutants exceed safe levels, you get comprehensive warnings
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
