import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HealthcareFacilityRecommendations } from './HealthcareFacilityRecommendations';
import { 
  Crown, 
  MapPin, 
  BarChart3, 
  Building2, 
  Heart, 
  Zap, 
  Users, 
  TrendingUp,
  Check,
  Star,
  Globe,
  Shield,
  Clock,
  Target,
  GraduationCap,
  Home,
  ShoppingBag,
  Construction
} from 'lucide-react';

interface ProFeaturesProps {
  user: {
    id: string;
    email: string;
    name: string;
    region: string;
    userType: 'patient' | 'planner';
  };
  onUpgrade: () => void;
}

export function ProFeatures({ user, onUpgrade }: ProFeaturesProps) {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [activeFeature, setActiveFeature] = useState('healthcare');

  const facilityCategories = [
    {
      id: 'healthcare',
      icon: Heart,
      title: 'Healthcare Facilities',
      description: 'Advanced recommendations for hospitals, clinics, and medical centers based on comprehensive environmental and demographic analysis.',
      status: 'active',
      features: [
        'Air quality & environmental factor analysis',
        'Population health needs assessment',
        'Accessibility & infrastructure scoring',
        'Optimal location recommendations'
      ]
    },
    {
      id: 'educational',
      icon: GraduationCap,
      title: 'Educational Facilities',
      description: 'Optimize school and university placements for maximum student safety and accessibility.',
      status: 'coming-soon',
      features: [
        'Child-safe air quality zones',
        'Traffic safety analysis',
        'Community accessibility',
        'Future enrollment projections'
      ]
    },
    {
      id: 'residential',
      icon: Home,
      title: 'Residential Developments',
      description: 'Identify the healthiest neighborhoods for sustainable residential growth.',
      status: 'coming-soon',
      features: [
        'Long-term air quality trends',
        'Quality of life indicators',
        'Infrastructure readiness',
        'Community amenities mapping'
      ]
    },
    {
      id: 'commercial',
      icon: ShoppingBag,
      title: 'Commercial Zones',
      description: 'Strategic placement of retail and business districts for economic and environmental balance.',
      status: 'coming-soon',
      features: [
        'Economic impact modeling',
        'Environmental sustainability',
        'Transportation hub analysis',
        'Market demand forecasting'
      ]
    }
  ];

  // Different pricing for patients vs planners
  const patientPricingTiers = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      current: true,
      features: [
        'Real-time air quality monitoring',
        'Basic health alerts',
        'Single location tracking',
        'Standard dashboard',
        'Limited AI chat assistance (5 messages/day)'
      ]
    },
    {
      name: 'Pro - 1 Month',
      price: '$15',
      period: '1 month',
      features: [
        'Everything in Basic',
        'Unlimited AI chat assistance',
        'Personalized health recommendations',
        'Advanced pollutant tracking',
        'Historical health data',
        'Priority support'
      ]
    },
    {
      name: 'Pro - 3 Months',
      price: '$30',
      period: '3 months',
      recommended: true,
      savings: 'Save $15 - Get 1 Month Free!',
      features: [
        'Everything in Basic',
        'Unlimited AI chat assistance',
        'Personalized health recommendations',
        'Advanced pollutant tracking',
        'Historical health data',
        'Priority support',
        'Best value - 3rd month FREE!'
      ]
    }
  ];

  const plannerPricingTiers = [
    {
      name: 'Pro - 1 Month',
      price: '$19',
      period: '1 month',
      features: [
        'Full urban planning insights',
        'Pro dashboard & heatmaps',
        'Multi-location monitoring',
        'Historical data analysis',
        'Healthcare facility recommendations',
        'Priority support'
      ]
    },
    {
      name: 'Pro - 3 Months',
      price: '$45',
      period: '3 months',
      recommended: true,
      savings: 'Save $12',
      features: [
        'Full urban planning insights',
        'Pro dashboard & heatmaps',
        'Multi-location monitoring',
        'Historical data analysis',
        'Healthcare facility recommendations',
        'Priority support',
        'Best value offer'
      ]
    }
  ];

  const pricingTiers = user.userType === 'patient' ? patientPricingTiers : plannerPricingTiers;
  const isPatient = user.userType === 'patient';

  return (
    <div className="space-y-8">
      {/* Hero Section - Different for Patients and Planners */}
      {!isPatient ? (
        // Urban Planner Hero
        <>
          <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="w-6 h-6 text-yellow-600" />
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      Pro Features
                    </Badge>
                  </div>
                  <h2 className="text-3xl mb-4">Plan a Healthier Future</h2>
                  <p className="text-gray-600 mb-6">
                    Our flagship Healthcare Facility Recommendations feature uses NASA satellite data, 
                    environmental factors, and urban analytics to identify optimal locations for medical facilities. 
                    Build healthier communities with comprehensive data-driven insights.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={() => setShowSubscriptionModal(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Upgrade to Pro
                    </Button>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1673158195534-3737053d143a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBsYW5uaW5nJTIwaGVhdG1hcCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc1OTA2NDU2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Urban planning data visualization and heatmaps"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facility Planning Categories - Only for Planners */}
          <div>
            <h3 className="text-2xl mb-6 text-center">Smart Facility Planning & Urban Development</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {facilityCategories.map((category) => {
            const IconComponent = category.icon;
            const isActive = category.status === 'active';
            const isSelected = activeFeature === category.id;
            
            return (
              <Card 
                key={category.id} 
                className={`relative cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500' : ''
                } ${!isActive ? 'opacity-75' : ''}`}
                onClick={() => isActive && setActiveFeature(category.id)}
              >
                <div className="absolute top-3 right-3">
                  {isActive ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-600">
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-lg ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <IconComponent className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    </div>
                  </div>
                  <CardTitle className="text-sm">{category.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {category.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                    {!isActive && (
                      <div className="text-xs text-gray-500 mt-2">+ {category.features.length - 2} more features</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Active Feature Content */}
        {activeFeature === 'healthcare' && (
          <Card className="border-2 border-blue-200 bg-blue-50/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Healthcare Facility Recommendations</CardTitle>
                  <CardDescription>
                    Active Feature: Data-driven location analysis for optimal healthcare placement
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200 ml-auto">
                  🎯 Live Feature
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <HealthcareFacilityRecommendations user={user} />
            </CardContent>
          </Card>
        )}

        {/* Coming Soon Features */}
        {activeFeature !== 'healthcare' && (
          <Card className="border-2 border-gray-200 bg-gray-50/30">
            <CardContent className="p-12 text-center">
              <Construction className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl mb-2">Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                {facilityCategories.find(c => c.id === activeFeature)?.title} recommendations 
                are currently in development. Healthcare Facilities is our flagship active feature.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setActiveFeature('healthcare')}
                className="flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Explore Healthcare Recommendations
              </Button>
            </CardContent>
          </Card>
        )}
          </div>

          {/* Use Cases - Only for Planners */}
          <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Who Benefits from Pro Features?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="mb-2">City Planners</h4>
              <p className="text-sm text-gray-600">Design healthier urban spaces with pollution data insights</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mb-2">Healthcare Providers</h4>
              <p className="text-sm text-gray-600">Optimize facility locations for maximum public health impact</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="mb-2">Real Estate Developers</h4>
              <p className="text-sm text-gray-600">Build in the cleanest areas with historical pollution trends</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="mb-2">Environmental Consultants</h4>
              <p className="text-sm text-gray-600">Provide data-driven recommendations to clients</p>
            </div>
          </div>
        </CardContent>
          </Card>

          {/* Data Resources - Only for Planners */}
          <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            NASA Data Resources & Integration
          </CardTitle>
          <CardDescription>
            Our platform integrates authoritative NASA environmental data sources for comprehensive air quality analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                NASA EOSDIS Satellite Data
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>MODIS</strong> – Aerosol Optical Depth measurements for atmospheric particulate matter
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>OMI</strong> – Nitrogen Dioxide (NO₂) concentration monitoring
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>AIRS</strong> – Carbon Monoxide (CO) atmospheric measurements
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                Ground & Statistical Data
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Ground-based PM sensors</strong> – Local particulate matter monitoring
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>CIESIN SEDAC</strong> – Country Trends in Major Air Pollutants (CTMAP)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>EarthData NASA Catalog</strong> – Comprehensive environmental datasets
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-gray-700">
                  <strong>Pro members</strong> get access to advanced data visualizations, historical trend analysis, 
                  and the ability to cross-reference multiple data sources for comprehensive environmental assessments 
                  in urban planning and facility placement decisions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
          </Card>
        </>
      ) : null}

      {/* Pricing - For Both User Types */}
      <div>
        <h3 className="text-2xl mb-6 text-center">Choose Your Plan</h3>
        <div className={`grid ${isPatient ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-3xl mx-auto'} gap-6`}>
          {pricingTiers.map((tier, index) => (
            <Card key={index} className={`relative ${tier.recommended ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="mt-2">
                  <div className="text-3xl">
                    {tier.price}
                  </div>
                  {tier.period && (
                    <p className="text-sm text-gray-600 mt-1">{tier.period}</p>
                  )}
                  {tier.savings && (
                    <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">
                      {tier.savings}
                    </Badge>
                  )}
                </div>
                {tier.current && (
                  <Badge variant="outline" className="mx-auto mt-2">
                    Current Plan
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className={`w-full mt-6 ${tier.recommended ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={tier.current ? 'outline' : tier.recommended ? 'default' : 'outline'}
                  onClick={() => {
                    if (!tier.current) {
                      onUpgrade();
                    }
                  }}
                  disabled={tier.current}
                >
                  {tier.current ? 'Current Plan' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      {!isPatient && (
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl mb-4">Stay Informed. Protect Your Health. Plan a Healthier Future.</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of professionals using AirAlert NASA Pro to build healthier communities 
              with real-world environmental data and advanced air quality analytics.
            </p>
            <Button 
              size="lg"
              onClick={() => setShowSubscriptionModal(true)}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Your Pro Journey
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Subscription Modal */}
      <Dialog open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              Choose Your Pro Plan
            </DialogTitle>
            <DialogDescription>
              {isPatient 
                ? 'Get unlimited AI chat assistance and personalized health recommendations.' 
                : 'Unlock advanced urban planning tools and healthcare facility recommendations with comprehensive environmental analytics.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Pricing Options */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* 1 Month Plan */}
              <div className="border rounded-lg p-6 hover:border-blue-500 transition-colors">
                <div className="text-center mb-4">
                  <h4 className="mb-2">Pro - 1 Month</h4>
                  <div className="text-3xl mb-1">${isPatient ? '15' : '19'}</div>
                  <p className="text-sm text-gray-600">Billed monthly</p>
                </div>
                <Button className="w-full" variant="outline" onClick={() => { onUpgrade(); setShowSubscriptionModal(false); }}>
                  Select Monthly
                </Button>
              </div>

              {/* 3 Month Plan */}
              <div className="border-2 border-blue-500 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Star className="w-3 h-3 mr-1" />
                    {isPatient ? 'Save $15 - 1 Month FREE' : 'Save $12'}
                  </Badge>
                </div>
                <div className="text-center mb-4">
                  <h4 className="mb-2">Pro - 3 Months</h4>
                  <div className="text-3xl mb-1">${isPatient ? '30' : '45'}</div>
                  <p className="text-sm text-gray-600">One-time payment</p>
                  <p className="text-xs text-green-700 mt-1">{isPatient ? 'Only $10/month' : 'Only $15/month'}</p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => { onUpgrade(); setShowSubscriptionModal(false); }}>
                  Select 3 Months
                </Button>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-3">
              <h4 className="text-sm">All Pro plans include:</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {(isPatient ? [
                  'Unlimited AI chat assistance',
                  'Personalized health recommendations',
                  'Advanced pollutant tracking',
                  'Historical health data',
                  'Priority customer support',
                  'Health impact analysis'
                ] : [
                  'Urban planning insights & analytics',
                  'Interactive pollution heatmaps',
                  'Multi-location monitoring',
                  'Historical data analysis',
                  'Priority customer support',
                  'Healthcare facility recommendations'
                ]).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our terms of service and privacy policy.
              </p>
              <Button variant="ghost" onClick={() => setShowSubscriptionModal(false)}>
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}