import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Heart, 
  BarChart3, 
  Users, 
  Car, 
  Wind,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Star,
  Navigation,
  Clock,
  Shield,
  Target,
  Zap
} from 'lucide-react';

interface HealthcareFacilityRecommendationsProps {
  user: {
    id: string;
    email: string;
    name: string;
    region: string;
  };
}

interface ZoneRecommendation {
  id: string;
  name: string;
  score: number;
  rank: number;
  coordinates: { lat: number; lng: number };
  airQualityScore: number;
  accessibilityScore: number;
  populationScore: number;
  environmentalScore: number;
  expansionPotential: number;
  existingFacilities: number;
  demographics: {
    population: number;
    averageAge: number;
    healthRisk: 'Low' | 'Moderate' | 'High';
  };
  environmental: {
    avgAQI: number;
    noiseLevel: number;
    greenSpace: number;
    waterQuality: number;
  };
  infrastructure: {
    publicTransport: number;
    roadAccess: number;
    utilities: number;
    emergencyServices: number;
  };
  recommendations: string[];
  concerns: string[];
}

export function HealthcareFacilityRecommendations({ user }: HealthcareFacilityRecommendationsProps) {
  const [selectedZone, setSelectedZone] = useState<ZoneRecommendation | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real implementation, this would come from API
  const zoneRecommendations: ZoneRecommendation[] = [
    {
      id: 'zone-1',
      name: 'Greenfield District',
      score: 92,
      rank: 1,
      coordinates: { lat: 40.7589, lng: -73.9851 },
      airQualityScore: 95,
      accessibilityScore: 88,
      populationScore: 85,
      environmentalScore: 94,
      expansionPotential: 92,
      existingFacilities: 2,
      demographics: {
        population: 45000,
        averageAge: 38,
        healthRisk: 'Low'
      },
      environmental: {
        avgAQI: 28,
        noiseLevel: 42,
        greenSpace: 78,
        waterQuality: 92
      },
      infrastructure: {
        publicTransport: 85,
        roadAccess: 90,
        utilities: 95,
        emergencyServices: 88
      },
      recommendations: [
        'Optimal air quality with AQI consistently below 30',
        'High accessibility via multiple transport routes',
        'Growing population with healthcare needs',
        'Excellent infrastructure readiness'
      ],
      concerns: [
        'Limited parking space may require planning',
        'Consider noise mitigation near main roads'
      ]
    },
    {
      id: 'zone-2',
      name: 'Riverside Commons',
      score: 87,
      rank: 2,
      coordinates: { lat: 40.7505, lng: -73.9934 },
      airQualityScore: 82,
      accessibilityScore: 92,
      populationScore: 90,
      environmentalScore: 85,
      expansionPotential: 78,
      existingFacilities: 4,
      demographics: {
        population: 62000,
        averageAge: 42,
        healthRisk: 'Moderate'
      },
      environmental: {
        avgAQI: 38,
        noiseLevel: 48,
        greenSpace: 65,
        waterQuality: 88
      },
      infrastructure: {
        publicTransport: 95,
        roadAccess: 85,
        utilities: 90,
        emergencyServices: 92
      },
      recommendations: [
        'High population density justifies new facility',
        'Excellent public transport connectivity',
        'Aging population with increased healthcare needs',
        'Strong emergency services network'
      ],
      concerns: [
        'Moderate air quality requires monitoring',
        'Higher competition from existing facilities',
        'Limited expansion potential'
      ]
    },
    {
      id: 'zone-3',
      name: 'Innovation Quarter',
      score: 81,
      rank: 3,
      coordinates: { lat: 40.7282, lng: -73.9942 },
      airQualityScore: 78,
      accessibilityScore: 80,
      populationScore: 75,
      environmentalScore: 82,
      expansionPotential: 95,
      existingFacilities: 1,
      demographics: {
        population: 35000,
        averageAge: 32,
        healthRisk: 'Low'
      },
      environmental: {
        avgAQI: 42,
        noiseLevel: 52,
        greenSpace: 58,
        waterQuality: 85
      },
      infrastructure: {
        publicTransport: 75,
        roadAccess: 82,
        utilities: 88,
        emergencyServices: 78
      },
      recommendations: [
        'Rapidly growing tech district needs healthcare',
        'Excellent expansion potential for specialized care',
        'Young professional population',
        'Modern infrastructure and utilities'
      ],
      concerns: [
        'Air quality affected by construction activities',
        'Limited public transport options',
        'Higher real estate costs'
      ]
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
      setSelectedZone(zoneRecommendations[0]);
    }, 1500);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing optimal healthcare facility locations...</p>
          <p className="text-sm text-gray-500 mt-2">Processing environmental data, demographics, and infrastructure</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-3xl">Healthcare Facility Recommendations</h2>
            <p className="text-gray-600">Data-driven location analysis for optimal healthcare placement</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          Powered by NASA Environmental Data + Urban Analytics
        </Badge>
      </div>

      {/* Map Visualization Mockup */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Interactive Zone Analysis Map
          </CardTitle>
          <CardDescription>
            Click on zones to view detailed recommendations and environmental factors
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1673158195534-3737053d143a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBsYW5uaW5nJTIwaGVhdG1hcCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc1OTA2NDU2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Healthcare facility location heatmap"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Zone Markers */}
            <div className="absolute top-6 left-8">
              <Button
                size="sm"
                onClick={() => setSelectedZone(zoneRecommendations[0])}
                className={`rounded-full ${selectedZone?.id === 'zone-1' ? 'bg-green-600' : 'bg-green-500'} hover:bg-green-700`}
              >
                🥇 92
              </Button>
            </div>
            <div className="absolute top-20 right-12">
              <Button
                size="sm"
                onClick={() => setSelectedZone(zoneRecommendations[1])}
                className={`rounded-full ${selectedZone?.id === 'zone-2' ? 'bg-blue-600' : 'bg-blue-500'} hover:bg-blue-700`}
              >
                🥈 87
              </Button>
            </div>
            <div className="absolute bottom-8 left-12">
              <Button
                size="sm"
                onClick={() => setSelectedZone(zoneRecommendations[2])}
                className={`rounded-full ${selectedZone?.id === 'zone-3' ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-700`}
              >
                🥉 81
              </Button>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Excellent (90+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Good (80-89)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Fair (70-79)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Rankings */}
      <div className="grid md:grid-cols-3 gap-4">
        {zoneRecommendations.map((zone) => (
          <Card 
            key={zone.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedZone?.id === zone.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedZone(zone)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{zone.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getRankBadge(zone.rank)}</span>
                  <Badge className={getScoreColor(zone.score)}>
                    {zone.score}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-600">Population</div>
                    <div>{zone.demographics.population.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Avg AQI</div>
                    <div className={zone.environmental.avgAQI <= 50 ? 'text-green-600' : 'text-yellow-600'}>
                      {zone.environmental.avgAQI}
                    </div>
                  </div>
                </div>
                <Progress value={zone.score} className="h-2" />
                <div className="text-xs text-gray-500">
                  {zone.existingFacilities} existing facilities in area
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Zone Analysis */}
      {selectedZone && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">{getRankBadge(selectedZone.rank)}</span>
                  {selectedZone.name}
                  <Badge className={getScoreColor(selectedZone.score)}>
                    Overall Score: {selectedZone.score}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Comprehensive analysis for healthcare facility placement
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="environmental">Environmental</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Wind className="w-5 h-5 text-blue-600" />
                      <span>Air Quality</span>
                    </div>
                    <div className="text-2xl mb-1">{selectedZone.airQualityScore}</div>
                    <Progress value={selectedZone.airQualityScore} className="h-2" />
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Navigation className="w-5 h-5 text-green-600" />
                      <span>Accessibility</span>
                    </div>
                    <div className="text-2xl mb-1">{selectedZone.accessibilityScore}</div>
                    <Progress value={selectedZone.accessibilityScore} className="h-2" />
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span>Population</span>
                    </div>
                    <div className="text-2xl mb-1">{selectedZone.populationScore}</div>
                    <Progress value={selectedZone.populationScore} className="h-2" />
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      <span>Expansion</span>
                    </div>
                    <div className="text-2xl mb-1">{selectedZone.expansionPotential}</div>
                    <Progress value={selectedZone.expansionPotential} className="h-2" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Key Recommendations
                    </h4>
                    <div className="space-y-2">
                      {selectedZone.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      Considerations
                    </h4>
                    <div className="space-y-2">
                      {selectedZone.concerns.map((concern, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{concern}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="environmental" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Average AQI</span>
                      <Badge className={selectedZone.environmental.avgAQI <= 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {selectedZone.environmental.avgAQI}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Noise Level (dB)</span>
                      <span>{selectedZone.environmental.noiseLevel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Green Space Coverage</span>
                      <span>{selectedZone.environmental.greenSpace}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Water Quality Index</span>
                      <span>{selectedZone.environmental.waterQuality}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3">Environmental Scoring</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Air Quality</span>
                          <span>{selectedZone.environmental.avgAQI <= 50 ? 'Excellent' : 'Good'}</span>
                        </div>
                        <Progress value={selectedZone.environmental.avgAQI <= 50 ? 95 : 75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Noise Level</span>
                          <span>{selectedZone.environmental.noiseLevel <= 45 ? 'Low' : 'Moderate'}</span>
                        </div>
                        <Progress value={selectedZone.environmental.noiseLevel <= 45 ? 90 : 60} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Green Spaces</span>
                          <span>{selectedZone.environmental.greenSpace}%</span>
                        </div>
                        <Progress value={selectedZone.environmental.greenSpace} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="demographics" className="space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl mb-1">{selectedZone.demographics.population.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Population</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl mb-1">{selectedZone.demographics.averageAge}</div>
                      <div className="text-sm text-gray-600">Average Age</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl mb-1">{selectedZone.demographics.healthRisk}</div>
                      <div className="text-sm text-gray-600">Health Risk Level</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="infrastructure" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Public Transport Access</span>
                        <span>{selectedZone.infrastructure.publicTransport}%</span>
                      </div>
                      <Progress value={selectedZone.infrastructure.publicTransport} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Road Network Access</span>
                        <span>{selectedZone.infrastructure.roadAccess}%</span>
                      </div>
                      <Progress value={selectedZone.infrastructure.roadAccess} className="h-2" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Utilities Infrastructure</span>
                        <span>{selectedZone.infrastructure.utilities}%</span>
                      </div>
                      <Progress value={selectedZone.infrastructure.utilities} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Emergency Services</span>
                        <span>{selectedZone.infrastructure.emergencyServices}%</span>
                      </div>
                      <Progress value={selectedZone.infrastructure.emergencyServices} className="h-2" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}