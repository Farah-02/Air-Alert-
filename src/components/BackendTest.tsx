import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { CheckCircle, AlertTriangle, Loader2, Database, Server, Users, Download, FileText, X } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  region: string;
  notifications_enabled: boolean;
}

interface BackendTestProps {
  user?: User;
}

export function BackendTest({ user }: BackendTestProps) {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportData, setExportData] = useState<any>(null);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    const results: any[] = [];

    // Test 1: Health Check
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/health`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      results.push({
        test: 'Server Health Check',
        status: response.ok ? 'pass' : 'fail',
        message: response.ok ? 'Server is running' : 'Server is not responding',
        data: response.ok ? await response.json() : null
      });
    } catch (error) {
      results.push({
        test: 'Server Health Check',
        status: 'fail',
        message: `Connection error: ${error}`,
        data: null
      });
    }

    // Test 2: Pollution Data (if user available)
    if (user) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/pollution/current?region=${encodeURIComponent(user.region)}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('supabase_token') || publicAnonKey}`,
            },
          }
        );

        const data = response.ok ? await response.json() : null;
        results.push({
          test: 'Pollution Data Fetch',
          status: response.ok ? 'pass' : 'fail',
          message: response.ok ? `Retrieved data for ${user.region}` : 'Failed to fetch pollution data',
          data: data
        });
      } catch (error) {
        results.push({
          test: 'Pollution Data Fetch',
          status: 'fail',
          message: `Error: ${error}`,
          data: null
        });
      }

      // Test 3: User Session Check
      try {
        const token = localStorage.getItem('supabase_token');
        if (token) {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/session`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          results.push({
            test: 'User Session Validation',
            status: response.ok ? 'pass' : 'fail',
            message: response.ok ? 'Session is valid' : 'Session validation failed',
            data: response.ok ? await response.json() : null
          });
        } else {
          results.push({
            test: 'User Session Validation',
            status: 'fail',
            message: 'No access token found',
            data: null
          });
        }
      } catch (error) {
        results.push({
          test: 'User Session Validation',
          status: 'fail',
          message: `Error: ${error}`,
          data: null
        });
      }

      // Test 4: Notification Preferences
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

        results.push({
          test: 'Notification Preferences',
          status: response.ok ? 'pass' : 'fail',
          message: response.ok ? 'Preferences retrieved' : 'Failed to get preferences',
          data: response.ok ? await response.json() : null
        });
      } catch (error) {
        results.push({
          test: 'Notification Preferences',
          status: 'fail',
          message: `Error: ${error}`,
          data: null
        });
      }

      // Test 5: Notifications List
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

        const data = response.ok ? await response.json() : null;
        results.push({
          test: 'User Notifications',
          status: response.ok ? 'pass' : 'fail',
          message: response.ok ? `Found ${data?.notifications?.length || 0} notifications` : 'Failed to get notifications',
          data: data
        });
      } catch (error) {
        results.push({
          test: 'User Notifications',
          status: 'fail',
          message: `Error: ${error}`,
          data: null
        });
      }

      // Test 6: Create Test Notification
      try {
        const token = localStorage.getItem('supabase_token') || publicAnonKey;
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/test-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user.id }),
        });

        results.push({
          test: 'Test Notification Creation',
          status: response.ok ? 'pass' : 'fail',
          message: response.ok ? 'Test notification created' : 'Failed to create test notification',
          data: response.ok ? await response.json() : null
        });
      } catch (error) {
        results.push({
          test: 'Test Notification Creation',
          status: 'fail',
          message: `Error: ${error}`,
          data: null
        });
      }

      // Test 7: User Statistics
      try {
        const token = localStorage.getItem('supabase_token');
        if (token) {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/stats`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const data = response.ok ? await response.json() : null;
          results.push({
            test: 'User Statistics',
            status: response.ok ? 'pass' : 'fail',
            message: response.ok ? 'User stats retrieved successfully' : 'Failed to get user stats',
            data: data
          });
        }
      } catch (error) {
        results.push({
          test: 'User Statistics',
          status: 'fail',
          message: `Error: ${error}`,
          data: null
        });
      }

      // Test 8: Data Export
      try {
        const token = localStorage.getItem('supabase_token');
        if (token) {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/export`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const data = response.ok ? await response.json() : null;
          results.push({
            test: 'Data Export',
            status: response.ok ? 'pass' : 'fail',
            message: response.ok ? 'User data exported successfully' : 'Failed to export user data',
            data: data ? { ...data, notifications: `${data.notifications?.length || 0} items` } : null // Summarize for display
          });
        }
      } catch (error) {
        results.push({
          test: 'Data Export',
          status: 'fail',
          message: `Error: ${error}`,
          data: null
        });
      }
    }

    setTestResults(results);
    setIsLoading(false);
  };

  const exportUserData = async () => {
    if (!user) return;
    
    setExportLoading(true);
    try {
      const token = localStorage.getItem('supabase_token');
      if (!token) {
        alert('No authentication token found');
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/export`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExportData(data);
        setShowExportDialog(true);
      } else {
        const error = await response.json();
        alert(`Export failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert(`Export error: ${error}`);
    } finally {
      setExportLoading(false);
    }
  };

  const downloadJSON = () => {
    if (!exportData) return;
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `airalert-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Pass</Badge>;
      case 'fail':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Fail</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Backend Integration Test
        </CardTitle>
        <CardDescription>
          Test the Supabase backend integration and verify all endpoints are working correctly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={runTests} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Server className="w-4 h-4" />
            )}
            {isLoading ? 'Running Tests...' : 'Run Backend Tests'}
          </Button>

          {user && (
            <>
              <Button 
                onClick={exportUserData} 
                disabled={exportLoading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {exportLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {exportLoading ? 'Exporting...' : 'Export My Data'}
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                Testing as: {user.name} ({user.region})
              </div>
            </>
          )}
        </div>

        {testResults.length > 0 && (
          <div className="space-y-3">
            <Separator />
            <h4 className="font-medium">Test Results</h4>
            
            {testResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{result.test}</span>
                  {getStatusBadge(result.status)}
                </div>
                
                <p className="text-sm text-gray-600">{result.message}</p>
                
                {result.data && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                      View Response Data
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-gray-800 overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">Summary</h5>
              <div className="text-sm text-blue-700">
                <div>Total Tests: {testResults.length}</div>
                <div>Passed: {testResults.filter(r => r.status === 'pass').length}</div>
                <div>Failed: {testResults.filter(r => r.status === 'fail').length}</div>
              </div>
            </div>
          </div>
        )}

        {!user && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please log in to run the complete backend test suite. Some tests require user authentication.
            </AlertDescription>
          </Alert>
        )}

        {/* Export Data Dialog */}
        <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  My Exported Data
                </span>
                <Button variant="outline" size="sm" onClick={downloadJSON}>
                  <Download className="w-4 h-4 mr-2" />
                  Download JSON
                </Button>
              </DialogTitle>
            </DialogHeader>

            {exportData && (
              <div className="space-y-6">
                {/* User Information */}
                <div>
                  <h3 className="mb-3">User Information</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Name</TableCell>
                        <TableCell>{exportData.user?.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Email</TableCell>
                        <TableCell>{exportData.user?.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Region</TableCell>
                        <TableCell>{exportData.user?.region}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">City</TableCell>
                        <TableCell>{exportData.user?.city || 'Not specified'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Notifications Enabled</TableCell>
                        <TableCell>{exportData.user?.notifications_enabled ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Created</TableCell>
                        <TableCell>{exportData.user?.created_at ? new Date(exportData.user.created_at).toLocaleString() : 'N/A'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                {/* Notification Preferences */}
                <div>
                  <h3 className="mb-3">Notification Preferences</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Notifications Enabled</TableCell>
                        <TableCell>{exportData.preferences?.enabled ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">AQI Threshold</TableCell>
                        <TableCell>{exportData.preferences?.aqiThreshold}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">PM2.5 Threshold</TableCell>
                        <TableCell>{exportData.preferences?.pm25Threshold} µg/m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">PM10 Threshold</TableCell>
                        <TableCell>{exportData.preferences?.pm10Threshold} µg/m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Frequency</TableCell>
                        <TableCell className="capitalize">{exportData.preferences?.frequency}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Quiet Hours</TableCell>
                        <TableCell>
                          {exportData.preferences?.quietHours?.enabled 
                            ? `${exportData.preferences.quietHours.start} - ${exportData.preferences.quietHours.end}`
                            : 'Disabled'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                {/* Recent Pollution Data */}
                {exportData.recentPollutionData && (
                  <>
                    <div>
                      <h3 className="mb-3">Recent Pollution Data</h3>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">AQI</TableCell>
                            <TableCell>{exportData.recentPollutionData.aqi}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">PM2.5</TableCell>
                            <TableCell>{exportData.recentPollutionData.pm25} µg/m³</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">PM10</TableCell>
                            <TableCell>{exportData.recentPollutionData.pm10} µg/m³</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">NO₂</TableCell>
                            <TableCell>{exportData.recentPollutionData.no2} µg/m³</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">SO₂</TableCell>
                            <TableCell>{exportData.recentPollutionData.so2} µg/m³</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">O₃</TableCell>
                            <TableCell>{exportData.recentPollutionData.o3} µg/m³</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">CO</TableCell>
                            <TableCell>{exportData.recentPollutionData.co} mg/m³</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Temperature</TableCell>
                            <TableCell>{exportData.recentPollutionData.temperature}°C</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Humidity</TableCell>
                            <TableCell>{exportData.recentPollutionData.humidity}%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Visibility</TableCell>
                            <TableCell>{exportData.recentPollutionData.visibility} km</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Last Updated</TableCell>
                            <TableCell>{new Date(exportData.recentPollutionData.last_updated).toLocaleString()}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Pollution History */}
                <div>
                  <h3 className="mb-3">Pollution Data History ({exportData.pollutionHistory?.length || 0} readings)</h3>
                  {exportData.pollutionHistory && exportData.pollutionHistory.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Timestamp</TableHead>
                              <TableHead>AQI</TableHead>
                              <TableHead>PM2.5</TableHead>
                              <TableHead>PM10</TableHead>
                              <TableHead>NO₂</TableHead>
                              <TableHead>SO₂</TableHead>
                              <TableHead>O₃</TableHead>
                              <TableHead>CO</TableHead>
                              <TableHead>Temp</TableHead>
                              <TableHead>Humidity</TableHead>
                              <TableHead>Visibility</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {exportData.pollutionHistory.map((reading: any, index: number) => {
                              // Determine AQI status color
                              const getAQIBadge = (aqi: number) => {
                                if (aqi <= 50) return <Badge className="bg-green-100 text-green-800">Good</Badge>;
                                if (aqi <= 100) return <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>;
                                if (aqi <= 150) return <Badge className="bg-orange-100 text-orange-800">Unhealthy (Sensitive)</Badge>;
                                if (aqi <= 200) return <Badge className="bg-red-100 text-red-800">Unhealthy</Badge>;
                                if (aqi <= 300) return <Badge className="bg-purple-100 text-purple-800">Very Unhealthy</Badge>;
                                return <Badge className="bg-amber-100 text-amber-800">Hazardous</Badge>;
                              };

                              return (
                                <TableRow key={index}>
                                  <TableCell className="text-sm whitespace-nowrap">
                                    {new Date(reading.last_updated).toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-col gap-1">
                                      <span>{reading.aqi}</span>
                                      {getAQIBadge(reading.aqi)}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <span className={reading.pm25 > 15 ? 'text-red-600' : ''}>
                                      {reading.pm25} µg/m³
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <span className={reading.pm10 > 45 ? 'text-red-600' : ''}>
                                      {reading.pm10} µg/m³
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <span className={reading.no2 > 25 ? 'text-red-600' : ''}>
                                      {reading.no2} µg/m³
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <span className={reading.so2 > 40 ? 'text-red-600' : ''}>
                                      {reading.so2} µg/m³
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <span className={reading.o3 > 100 ? 'text-red-600' : ''}>
                                      {reading.o3} µg/m³
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <span className={reading.co > 4 ? 'text-red-600' : ''}>
                                      {reading.co} mg/m³
                                    </span>
                                  </TableCell>
                                  <TableCell>{reading.temperature}°C</TableCell>
                                  <TableCell>{reading.humidity}%</TableCell>
                                  <TableCell>{reading.visibility} km</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No historical pollution data found</p>
                  )}
                </div>

                <Separator />

                {/* Notifications History */}
                <div>
                  <h3 className="mb-3">Notifications History ({exportData.notifications?.length || 0} total)</h3>
                  {exportData.notifications && exportData.notifications.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {exportData.notifications.map((notification: any, index: number) => (
                            <TableRow key={notification.id || index}>
                              <TableCell>
                                <Badge 
                                  variant="outline"
                                  className={
                                    notification.type === 'alert' ? 'bg-red-100 text-red-800' :
                                    notification.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                                    'bg-blue-100 text-blue-800'
                                  }
                                >
                                  {notification.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="max-w-md truncate">{notification.message}</TableCell>
                              <TableCell className="text-sm">{new Date(notification.timestamp).toLocaleString()}</TableCell>
                              <TableCell>
                                {notification.read ? (
                                  <Badge variant="outline" className="bg-gray-100">Read</Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-blue-100 text-blue-800">Unread</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No notifications found</p>
                  )}
                </div>

                <Separator />

                {/* Metadata */}
                <div>
                  <h3 className="mb-3">Export Metadata</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Exported At</TableCell>
                        <TableCell>{new Date(exportData.exportedAt).toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Total Pollution Readings</TableCell>
                        <TableCell>{exportData.metadata?.totalPollutionReadings || 0}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Total Notifications</TableCell>
                        <TableCell>{exportData.metadata?.totalNotifications || 0}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Unread Notifications</TableCell>
                        <TableCell>{exportData.metadata?.unreadNotifications || 0}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}