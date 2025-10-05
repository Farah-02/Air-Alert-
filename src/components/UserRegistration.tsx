import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, MapPin, UserPlus, ArrowLeft } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  region: string;
  notifications_enabled: boolean;
  userType: 'patient' | 'planner';
  // Patient-specific fields
  age?: number;
  gender?: string;
  weight?: number;
  healthRecord?: string;
}

interface UserRegistrationProps {
  onSuccess: (user: User) => void;
  userType: 'patient' | 'planner';
  onBack: () => void;
}

export function UserRegistration({ onSuccess, userType, onBack }: UserRegistrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Registration form state for patients
  const [patientRegisterData, setPatientRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    region: '',
    city: '',
    age: '',
    gender: '',
    weight: '',
    healthRecord: '',
    notifications_enabled: true,
    termsAccepted: false
  });

  // Registration form state for planners
  const [plannerRegisterData, setPlannerRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    region: '',
    city: '',
    notifications_enabled: true,
    termsAccepted: false
  });

  const regions = [
    'North America',
    'South America', 
    'Europe',
    'Asia',
    'Africa',
    'Australia/Oceania'
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ ...loginData, userType }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.access_token) {
          localStorage.setItem('supabase_token', result.access_token);
        }
        onSuccess({ ...result.user, userType });
      } else {
        const errorMessage = result.error || 'Login failed';
        if (errorMessage.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials or register for a new account.');
        } else {
          setError(errorMessage);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const registerData = userType === 'patient' ? patientRegisterData : plannerRegisterData;

    if (!registerData.termsAccepted) {
      setError('Please accept the terms and conditions to continue');
      setIsLoading(false);
      return;
    }

    if (!registerData.name || !registerData.email || !registerData.password || !registerData.region) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    // Additional validation for patient
    if (userType === 'patient') {
      if (!patientRegisterData.age || !patientRegisterData.gender) {
        setError('Please fill in all required fields for patient registration');
        setIsLoading(false);
        return;
      }
    }

    try {
      const dataToSend = {
        ...registerData,
        userType,
        age: userType === 'patient' ? parseInt(patientRegisterData.age) : undefined,
        weight: userType === 'patient' && patientRegisterData.weight ? parseFloat(patientRegisterData.weight) : undefined,
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        // For registration, we need to login immediately to get the access token
        const loginResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: registerData.email,
            password: registerData.password,
            userType
          }),
        });

        if (loginResponse.ok) {
          const loginResult = await loginResponse.json();
          if (loginResult.access_token) {
            localStorage.setItem('supabase_token', loginResult.access_token);
          }
          onSuccess({ ...loginResult.user, userType });
        } else {
          onSuccess({ ...result.user, userType });
        }
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const createDemoUser = async () => {
    setIsLoading(true);
    setError('');

    const demoEmail = `demo${userType}${Date.now()}@airalert.nasa`;
    const demoData = {
      name: userType === 'patient' ? 'Demo Patient' : 'Demo Planner',
      email: demoEmail,
      password: 'demo123',
      region: 'North America',
      city: 'Demo City',
      notifications_enabled: true,
      userType,
      ...(userType === 'patient' && {
        age: 35,
        gender: 'prefer-not-to-say',
        weight: 70,
        healthRecord: 'Demo health record - Asthma, occasional respiratory issues'
      })
    };

    try {
      const registerResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(demoData),
      });

      const registerResult = await registerResponse.json();

      if (registerResponse.ok) {
        const loginResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: demoData.email,
            password: demoData.password,
            userType
          }),
        });

        if (loginResponse.ok) {
          const loginResult = await loginResponse.json();
          if (loginResult.access_token) {
            localStorage.setItem('supabase_token', loginResult.access_token);
          }
          onSuccess({ ...loginResult.user, userType });
        } else {
          onSuccess({ ...registerResult.user, userType });
        }
      } else {
        setError(registerResult.error || 'Failed to create demo account');
      }
    } catch (error) {
      console.error('Demo user creation error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isPatient = userType === 'patient';
  const registerData = isPatient ? patientRegisterData : plannerRegisterData;
  const setRegisterData = isPatient ? setPatientRegisterData : setPlannerRegisterData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to User Type Selection
        </Button>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              {isPatient ? 'Respiratory Patient' : 'Urban Planner'} Portal
            </CardTitle>
            <CardDescription>
              {isPatient 
                ? 'Monitor air quality and manage your respiratory health' 
                : 'Access advanced analytics and urban planning tools'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg mb-4">
                  <p className="text-sm text-blue-700">
                    <strong>Demo:</strong> Try a demo account or use the Register tab to create a new account.
                  </p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={createDemoUser}
                    disabled={isLoading}
                  >
                    Try Demo Account
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region">Region *</Label>
                    <Select 
                      value={registerData.region} 
                      onValueChange={(value) => setRegisterData({ ...registerData, region: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {region}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Patient-specific fields */}
                  {isPatient && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age *</Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="Your age"
                            value={patientRegisterData.age}
                            onChange={(e) => setPatientRegisterData({ ...patientRegisterData, age: e.target.value })}
                            required
                            min="1"
                            max="120"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender *</Label>
                          <Select 
                            value={patientRegisterData.gender} 
                            onValueChange={(value) => setPatientRegisterData({ ...patientRegisterData, gender: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg) - Optional</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Your weight in kg"
                          value={patientRegisterData.weight}
                          onChange={(e) => setPatientRegisterData({ ...patientRegisterData, weight: e.target.value })}
                          min="1"
                          max="500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="healthRecord">Health Record - Optional</Label>
                        <Textarea
                          id="healthRecord"
                          placeholder="e.g., Asthma, COPD, allergies, or any respiratory conditions"
                          value={patientRegisterData.healthRecord}
                          onChange={(e) => setPatientRegisterData({ ...patientRegisterData, healthRecord: e.target.value })}
                          rows={3}
                        />
                        <p className="text-xs text-gray-500">
                          This information helps us provide better health recommendations
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifications"
                      checked={registerData.notifications_enabled}
                      onCheckedChange={(checked) => 
                        setRegisterData({ ...registerData, notifications_enabled: !!checked })
                      }
                    />
                    <Label htmlFor="notifications" className="text-sm">
                      Enable air quality notifications
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={registerData.termsAccepted}
                      onCheckedChange={(checked) => 
                        setRegisterData({ ...registerData, termsAccepted: !!checked })
                      }
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the <span className="text-blue-600 underline cursor-pointer">Terms and Conditions</span> and <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span> *
                    </Label>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
