import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProFeatures } from './ProFeatures';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  MapPin,
  Calendar,
  TrendingUp,
  Zap,
  Factory,
  CloudRain,
  Car,
  Flame,
  Info
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  region: string;
  notifications_enabled: boolean;
  userType: 'patient' | 'planner';
  isPro?: boolean;
}

interface PollutionData {
  aqi: number;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
  o3: number;
  so2: number;
  temperature: number;
  humidity: number;
  visibility: number;
  last_updated: string;
  status: 'good' | 'moderate' | 'unhealthy_sensitive' | 'unhealthy' | 'very_unhealthy' | 'hazardous';
}

interface PollutantInfo {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  icon: React.ComponentType<any>;
  description: string;
  healthEffect: string;
  quickAction: string;
}

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const [pollutionData, setPollutionData] = useState<PollutionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [selectedPollutant, setSelectedPollutant] = useState<PollutantInfo | null>(null);

  useEffect(() => {
    fetchPollutionData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchPollutionData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user.region]);

  useEffect(() => {
    // Check for threshold alerts when pollution data updates
    if (pollutionData) {
      checkAndSendAlerts();
    }
  }, [pollutionData]);

  const fetchPollutionData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('supabase_token') || publicAnonKey;
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/pollution/current?region=${encodeURIComponent(user.region)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPollutionData(data);
        setLastRefresh(new Date());
      } else {
        setError('Failed to fetch pollution data');
      }
    } catch (error) {
      console.error('Error fetching pollution data:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkAndSendAlerts = async () => {
    if (!pollutionData) return;

    const pollutants = getPollutants();
    const activeAlerts = pollutants.filter(p => p.value > p.threshold);

    if (activeAlerts.length === 0) return;

    // Check overall air quality - only send alerts if AQI indicates unhealthy conditions
    // AQI > 100 means "Unhealthy for Sensitive Groups" or worse
    const overallAQI = pollutionData.aqi;
    const aqiThreshold = 100; // Moderate to Unhealthy transition point
    
    if (overallAQI <= aqiThreshold) {
      // Overall air quality is acceptable, don't spam with individual pollutant alerts
      console.log(`Individual pollutants exceeded but overall AQI (${overallAQI}) is acceptable. No alerts sent.`);
      return;
    }

    // Check if we've already sent an alert recently (prevent spam)
    const lastAlertTime = localStorage.getItem(`last_alert_${user.id}`);
    const now = Date.now();
    
    if (lastAlertTime && (now - parseInt(lastAlertTime)) < 10 * 60 * 1000) {
      // Don't send alerts more than once every 10 minutes
      return;
    }

    try {
      const token = localStorage.getItem('supabase_token') || publicAnonKey;
      
      // Send a comprehensive alert about overall air quality
      const aqiStatus = overallAQI <= 50 ? 'Good' : 
                       overallAQI <= 100 ? 'Moderate' : 
                       overallAQI <= 150 ? 'Unhealthy for Sensitive Groups' : 
                       overallAQI <= 200 ? 'Unhealthy' : 
                       overallAQI <= 300 ? 'Very Unhealthy' : 'Hazardous';
      
      const pollutantsList = activeAlerts.map(a => `${a.name} (${a.value} ${a.unit})`).join(', ');
      
      const comprehensiveAlert = {
        id: `alert_comprehensive_${Date.now()}`,
        message: `🚨 AIR QUALITY ALERT: AQI is ${overallAQI} (${aqiStatus}). Elevated levels detected: ${pollutantsList}. Limit outdoor activities and consider wearing a mask.`,
        type: 'alert',
        timestamp: new Date().toISOString(),
        read: false
      };

      // Send single comprehensive notification instead of multiple individual ones
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/test-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          userId: user.id,
          notification: comprehensiveAlert
        }),
      });

      // Update last alert time
      localStorage.setItem(`last_alert_${user.id}`, now.toString());
      
      console.log(`Sent comprehensive air quality alert (AQI: ${overallAQI}, ${activeAlerts.length} pollutants exceeded)`);
    } catch (error) {
      console.error('Error sending threshold alerts:', error);
    }
  };

  const getPollutantStatus = (value: number, threshold: number) => {
    const ratio = value / threshold;
    if (ratio <= 0.5) return { 
      text: 'Excellent', 
      color: 'text-green-600', 
      bg: 'bg-green-100', 
      border: 'border-green-200',
      indicator: 'bg-green-500' 
    };
    if (ratio <= 0.8) return { 
      text: 'Acceptable', 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100', 
      border: 'border-yellow-200',
      indicator: 'bg-yellow-500' 
    };
    if (ratio <= 1.0) return { 
      text: 'Moderate', 
      color: 'text-orange-600', 
      bg: 'bg-orange-100', 
      border: 'border-orange-200',
      indicator: 'bg-orange-500' 
    };
    if (ratio <= 1.5) return { 
      text: 'Unhealthy', 
      color: 'text-red-600', 
      bg: 'bg-red-100', 
      border: 'border-red-200',
      indicator: 'bg-red-500' 
    };
    if (ratio <= 2.0) return { 
      text: 'Very Unhealthy', 
      color: 'text-purple-600', 
      bg: 'bg-purple-100', 
      border: 'border-purple-200',
      indicator: 'bg-purple-500' 
    };
    return { 
      text: 'Hazardous', 
      color: 'text-amber-800', 
      bg: 'bg-amber-100', 
      border: 'border-amber-200',
      indicator: 'bg-amber-700' 
    };
  };

  const getPollutants = (): PollutantInfo[] => {
    if (!pollutionData) return [];
    
    return [
      {
        name: 'PM2.5',
        value: pollutionData.pm25,
        unit: 'µg/m³',
        threshold: 15,
        icon: Wind,
        description: 'Fine particles that can penetrate deep into lungs and bloodstream',
        healthEffect: 'Dangerous fine particles detected, avoid outdoor activity.',
        quickAction: 'Wear N95 mask outdoors'
      },
      {
        name: 'PM10',
        value: pollutionData.pm10,
        unit: 'µg/m³',
        threshold: 45,
        icon: Droplets,
        description: 'Coarse particles from dust, pollen, and combustion',
        healthEffect: 'High dust level, wear a mask.',
        quickAction: 'Limit outdoor exercise'
      },
      {
        name: 'NO₂',
        value: pollutionData.no2,
        unit: 'µg/m³',
        threshold: 25,
        icon: Car,
        description: 'Nitrogen dioxide from vehicle emissions and industrial sources',
        healthEffect: 'Elevated nitrogen oxides, risky for asthma patients.',
        quickAction: 'Avoid busy roads'
      },
      {
        name: 'SO₂',
        value: pollutionData.so2,
        unit: 'µg/m³',
        threshold: 40,
        icon: Factory,
        description: 'Sulfur dioxide from fossil fuel combustion',
        healthEffect: 'High sulfur emissions, may cause respiratory irritation.',
        quickAction: 'Stay away from industrial areas'
      },
      {
        name: 'O₃',
        value: pollutionData.o3,
        unit: 'µg/m³',
        threshold: 100,
        icon: Zap,
        description: 'Ground-level ozone formed by sunlight and pollutants',
        healthEffect: 'Ozone level high, reduce outdoor activity.',
        quickAction: 'Exercise indoors during midday'
      },
      {
        name: 'CO',
        value: pollutionData.co,
        unit: 'mg/m³',
        threshold: 4,
        icon: Flame,
        description: 'Carbon monoxide from incomplete combustion',
        healthEffect: 'Carbon monoxide detected at high level, risk of headache and dizziness.',
        quickAction: 'Ensure proper ventilation'
      }
    ];
  };

  const getActiveAlerts = () => {
    const pollutants = getPollutants();
    return pollutants.filter(p => p.value > p.threshold);
  };

  const getQuickActions = () => {
    const pollutants = getPollutants();
    const activeAlerts = getActiveAlerts();
    const overallAQI = pollutionData?.aqi || 0;
    
    let actions = [];
    
    // Based on overall air quality
    if (overallAQI <= 50) {
      actions.push({
        icon: '🏃‍♂️',
        title: 'Perfect for Exercise',
        description: 'Great air quality! Go for a run or outdoor workout.',
        color: 'bg-green-100 text-green-800 border-green-200'
      });
      actions.push({
        icon: '🚶‍♀️',
        title: 'Take a Walk',
        description: 'Enjoy fresh air with a leisurely walk outside.',
        color: 'bg-green-100 text-green-800 border-green-200'
      });
    } else if (overallAQI <= 100) {
      actions.push({
        icon: '⚠️',
        title: 'Light Exercise Only',
        description: 'Limit intense outdoor activities, especially for sensitive groups.',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
      });
      actions.push({
        icon: '🏠',
        title: 'Indoor Activities',
        description: 'Consider exercising indoors or in well-ventilated areas.',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
      });
    } else {
      actions.push({
        icon: '🏠',
        title: 'Stay Indoors',
        description: 'Air quality is poor. Avoid outdoor activities.',
        color: 'bg-red-100 text-red-800 border-red-200'
      });
      actions.push({
        icon: '💨',
        title: 'Use Air Purifier',
        description: 'Keep windows closed and use air filtration.',
        color: 'bg-red-100 text-red-800 border-red-200'
      });
    }
    
    // Specific pollutant actions
    if (pollutants.find(p => p.name === 'PM2.5' && p.value > p.threshold)) {
      actions.push({
        icon: '😷',
        title: 'Wear N95 Mask',
        description: 'Fine particles detected. Use proper mask if going outside.',
        color: 'bg-orange-100 text-orange-800 border-orange-200'
      });
    }
    
    if (pollutants.find(p => p.name === 'O₃' && p.value > p.threshold)) {
      actions.push({
        icon: '🌅',
        title: 'Avoid Midday Sun',
        description: 'Ozone levels peak during afternoon. Stay indoors 10am-4pm.',
        color: 'bg-purple-100 text-purple-800 border-purple-200'
      });
    }
    
    if (pollutants.find(p => p.name === 'NO₂' && p.value > p.threshold)) {
      actions.push({
        icon: '🚗',
        title: 'Avoid Busy Roads',
        description: 'High traffic pollution. Use alternate routes or public transport.',
        color: 'bg-blue-100 text-blue-800 border-blue-200'
      });
    }
    
    // Always add hydration and ventilation advice
    actions.push({
      icon: '💧',
      title: 'Stay Hydrated',
      description: 'Drink plenty of water to help your body cope with pollutants.',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    });
    
    if (activeAlerts.length === 0) {
      actions.push({
        icon: '🌬️',
        title: 'Fresh Air Time',
        description: 'Open windows and let fresh air circulate in your home.',
        color: 'bg-green-100 text-green-800 border-green-200'
      });
    }
    
    return actions.slice(0, 6); // Limit to 6 actions
  };

  // For Urban Planners without Pro, show ProFeatures as dashboard
  if (user.userType === 'planner' && !user.isPro) {
    return <ProFeatures user={user} onUpgrade={() => {}} />;
  }

  if (loading && !pollutionData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading air quality data...</p>
        </div>
      </div>
    );
  }

  if (error && !pollutionData) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          {error}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchPollutionData}
            className="ml-2"
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!pollutionData) return null;

  const pollutants = getPollutants();
  const activeAlerts = getActiveAlerts();

  // Section components for conditional rendering
  const PollutantsSection = () => (
    <div>
      <h3 className="text-lg mb-4">Live Pollutant Levels</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pollutants.map((pollutant, index) => {
          const status = getPollutantStatus(pollutant.value, pollutant.threshold);
          const IconComponent = pollutant.icon;
          const isAlert = pollutant.value > pollutant.threshold;
          
          return (
            <Dialog key={pollutant.name}>
              <DialogTrigger asChild>
                <Card className={`cursor-pointer transition-all hover:shadow-md ${status.border} ${isAlert ? 'ring-2 ring-red-200' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${status.bg}`}>
                          <IconComponent className={`w-4 h-4 ${status.color}`} />
                        </div>
                        {pollutant.name}
                        {isAlert && <AlertTriangle className="w-4 h-4 text-red-500" />}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-2xl mb-1">{pollutant.value}</div>
                        <div className="text-sm text-gray-600">{pollutant.unit}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full ${status.indicator}`}></div>
                    </div>
                    <div className="space-y-2">
                      <Badge className={`${status.color} ${status.bg} border-0 text-xs`}>
                        {status.text}
                      </Badge>
                      <div className="text-xs text-gray-500">
                        Limit: {pollutant.threshold} {pollutant.unit}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${status.bg}`}>
                      <IconComponent className={`w-6 h-6 ${status.color}`} />
                    </div>
                    {pollutant.name} Details
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Live Value</div>
                      <div className="text-2xl">{pollutant.value} {pollutant.unit}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">WHO Limit</div>
                      <div className="text-2xl">{pollutant.threshold} {pollutant.unit}</div>
                    </div>
                  </div>
                  
                  <div>
                    <Badge className={`${status.color} ${status.bg} border-0 mb-2`}>
                      {status.text}
                    </Badge>
                    <p className="text-sm text-gray-600">{pollutant.description}</p>
                  </div>
                  
                  {isAlert && (
                    <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                      <h4 className="text-sm mb-1">Health Impact</h4>
                      <p className="text-sm text-red-700">{pollutant.healthEffect}</p>
                    </div>
                  )}
                  
                  <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                    <h4 className="text-sm mb-1">Quick Action</h4>
                    <p className="text-sm text-blue-700">{pollutant.quickAction}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );

  const QuickActionsSection = () => (
    <div>
      <h3 className="text-lg mb-4">Quick Actions</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getQuickActions().map((action, index) => (
          <Card key={index} className={`border ${action.color.includes('border') ? action.color.split(' ').find(c => c.includes('border')) : 'border-gray-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{action.icon}</div>
                <div className="flex-1">
                  <h4 className="mb-1">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const EnvironmentalSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Environmental Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xl">{pollutionData.temperature}°C</div>
              <div className="text-sm text-gray-600">Temperature</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl">{pollutionData.humidity}%</div>
              <div className="text-sm text-gray-600">Humidity</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xl">{pollutionData.visibility} km</div>
              <div className="text-sm text-gray-600">Visibility</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AQISection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Overall Air Quality Index
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl mb-2">{pollutionData.aqi}</div>
            <div className="text-sm text-gray-600">AQI</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Air Quality</span>
              <Badge variant="outline">
                {pollutionData.aqi <= 50 ? 'Good' : 
                 pollutionData.aqi <= 100 ? 'Moderate' : 
                 pollutionData.aqi <= 150 ? 'Unhealthy for Sensitive' : 
                 pollutionData.aqi <= 200 ? 'Unhealthy' : 
                 pollutionData.aqi <= 300 ? 'Very Unhealthy' : 'Hazardous'}
              </Badge>
            </div>
            <Progress value={Math.min((pollutionData.aqi / 300) * 100, 100)} className="mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>50</span>
              <span>100</span>
              <span>150</span>
              <span>200</span>
              <span>300+</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const isPatient = user.userType === 'patient';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Air Quality Dashboard</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{user.region}</span>
            <span>•</span>
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={fetchPollutionData}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>🚨 Air Quality Alert:</strong> {activeAlerts.length} pollutant{activeAlerts.length > 1 ? 's' : ''} exceed safe levels. 
            {activeAlerts.map(p => ` ${p.name} (${p.value}${p.unit})`).join(',')} above WHO thresholds.
          </AlertDescription>
        </Alert>
      )}

      {/* Conditional Section Rendering based on User Type */}
      {isPatient ? (
        <>
          {/* Patient Order: AQI -> Environmental -> Quick Actions -> Pollutants */}
          <AQISection />
          <EnvironmentalSection />
          <QuickActionsSection />
          <PollutantsSection />
        </>
      ) : (
        <>
          {/* Planner Order: Pollutants -> Quick Actions -> Environmental -> AQI */}
          <PollutantsSection />
          <QuickActionsSection />
          <EnvironmentalSection />
          <AQISection />
        </>
      )}

      {/* Data Sources Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">🛰️</span>
            </div>
            NASA Data Integration
          </CardTitle>
          <CardDescription>
            Powered by NASA Earth Observing System Data and Information System (EOSDIS)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="mb-2">Data Sources:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• MODIS Aerosol Optical Depth</li>
                <li>• OMI Nitrogen Dioxide</li>
                <li>• AIRS Carbon Monoxide</li>
                <li>• Ground-based PM sensors</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2">Update Frequency:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Satellite data: Daily</li>
                <li>• Ground sensors: Hourly</li>
                <li>• AQI calculations: Real-time</li>
                <li>• Forecasts: 3-day outlook</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Summary */}
      {activeAlerts.length === 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            All pollutant levels are within safe WHO guidelines. Great time for outdoor activities!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}