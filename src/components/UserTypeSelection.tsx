import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Heart, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserTypeSelectionProps {
  onSelectType: (type: 'patient' | 'planner') => void;
}

export function UserTypeSelection({ onSelectType }: UserTypeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl">Welcome to AirAlert</h1>
          <p className="text-xl text-gray-600">Choose your account type to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Respiratory Patient */}
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => onSelectType('patient')}>
            <CardContent className="p-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Respiratory Patient"
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardContent>
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-center text-2xl">Respiratory Patient</CardTitle>
              <CardDescription className="text-center text-base">
                Monitor air quality for your health. Get personalized alerts, health recommendations, and AI assistance to manage respiratory conditions.
              </CardDescription>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Personalized health tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>AI health assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Real-time air quality alerts</span>
                </div>
              </div>
              <Button className="w-full mt-4" size="lg">
                Continue as Patient
              </Button>
            </CardHeader>
          </Card>

          {/* Urban Planner */}
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => onSelectType('planner')}>
            <CardContent className="p-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Urban Planner"
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardContent>
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-center text-2xl">Urban Planner</CardTitle>
              <CardDescription className="text-center text-base">
                Access advanced analytics, satellite data, and urban planning tools to create healthier cities.
              </CardDescription>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  <span>NASA satellite data access</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  <span>Advanced analytics & forecasting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  <span>Urban planning recommendations</span>
                </div>
              </div>
              <Button className="w-full mt-4" size="lg" variant="secondary">
                Continue as Planner
              </Button>
            </CardHeader>
          </Card>
        </div>

        <p className="text-center text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
