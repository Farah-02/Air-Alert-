import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User as UserIcon,
  Crown,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatbotProps {
  user: {
    id: string;
    name: string;
    userType: 'patient' | 'planner';
  };
  isPro: boolean;
}

export function AIChatbot({ user, isPro }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: user.userType === 'patient' 
        ? `Hello ${user.name}! I'm your AI health assistant. I can help you understand air quality data and provide personalized health recommendations. ${!isPro ? 'You have 5 free messages remaining today. Upgrade to Pro for unlimited access!' : 'As a Pro member, you have unlimited access to my assistance!'}`
        : `Hello ${user.name}! I'm your AI urban planning assistant. I can help you with air quality analysis, infrastructure planning, healthcare facility placement, zoning recommendations, and sustainable city development strategies. ${!isPro ? 'Subscribe to Pro to unlock unlimited AI recommendations!' : 'As a Pro member, you have unlimited access to my planning expertise!'}`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const maxFreeMessages = 5;

  const healthResponses = [
    "Based on current air quality levels, I recommend limiting outdoor activities during peak pollution hours (typically 6-9 AM and 4-7 PM).",
    "For respiratory patients, wearing an N95 mask when AQI exceeds 150 can significantly reduce exposure to harmful particulates.",
    "Stay hydrated and consider using an air purifier indoors. HEPA filters can remove up to 99.97% of airborne particles.",
    "If you're experiencing shortness of breath, consult your healthcare provider. Keep your rescue inhaler accessible.",
    "Monitor your symptoms closely. Common signs of air quality impact include coughing, wheezing, and chest tightness.",
    "Consider checking air quality before planning outdoor exercise. Indoor alternatives are safer when AQI is unhealthy.",
    "Green spaces with dense vegetation can help filter air. Parks and tree-lined areas often have better local air quality."
  ];

  const plannerResponses = [
    "Urban green spaces can reduce local air pollution by 10-20%. Consider implementing green corridors in high-traffic areas and creating vegetation barriers between residential zones and pollution sources.",
    "Traffic management strategies like congestion pricing have shown to reduce urban air pollution by up to 15%. Pair this with expanded public transit to maximize impact.",
    "Promoting public transportation and cycling infrastructure can significantly improve urban air quality over time. Dedicated bike lanes and EV charging stations are key investments.",
    "Industrial zoning should be carefully planned to maintain buffer zones of at least 500m between high-emission sources and residential areas, schools, and hospitals.",
    "Real-time air quality monitoring stations should be placed in diverse locations to capture pollution gradients. I recommend stations near major roads, industrial areas, residential zones, and green spaces.",
    "Green building standards and energy-efficient construction can reduce overall urban emissions by 30-40%. LEED certification and passive building design are excellent starting points.",
    "Consider implementing Low Emission Zones (LEZ) in city centers to restrict high-polluting vehicles. Cities like London have seen 44% reduction in roadside NO₂ with LEZ.",
    "Healthcare facilities should be located in areas with historically lower pollution levels. Use air quality heatmaps to identify optimal zones for new hospital construction.",
    "Urban tree canopy coverage of 30-40% can significantly reduce heat island effect and improve air quality. Focus on native species that require less water.",
    "School locations should be prioritized in low-pollution areas. If near major roads, install vegetation barriers and air filtration systems in buildings.",
    "Wind corridors can help disperse urban pollution. Preserve natural ventilation paths and avoid high-rise construction that blocks airflow in polluted areas.",
    "Mixed-use development reduces transportation emissions by enabling walkable neighborhoods. Target 15-minute city planning principles for better air quality.",
    "Industrial parks should have mandatory emission monitoring and reporting. Real-time data sharing helps track pollution sources and enforce compliance.",
    "Electric vehicle infrastructure should be expanded near transit hubs and residential areas. Every EV replaces 1.5 tons of CO₂ emissions annually.",
    "Urban planning should prioritize vulnerable populations. Place healthcare facilities, fresh air zones, and green spaces within walking distance of elderly and low-income communities."
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Check message limit for non-pro users
    if (!isPro && messageCount >= maxFreeMessages) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        text: "You've reached your daily message limit. Upgrade to Pro for unlimited AI assistance!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([...messages, limitMessage]);
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Increment message count for non-pro users
    if (!isPro) {
      setMessageCount(messageCount + 1);
    }

    // Simulate bot response
    setTimeout(() => {
      const responses = user.userType === 'patient' ? healthResponses : plannerResponses;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group hover:scale-110"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
          <Bot className="w-3 h-3" />
        </span>
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="w-80 shadow-xl">
          <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <CardTitle className="text-base">AI Assistant {!isPro && <Crown className="w-4 h-4 inline ml-1 text-yellow-300" />}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(false)}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[600px] shadow-2xl flex flex-col">
        <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <CardTitle className="text-base">AI Assistant</CardTitle>
                <CardDescription className="text-xs text-white/80">
                  {user.userType === 'patient' ? 'Health Advisor' : 'Urban Planning Expert'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {!isPro && (
            <div className="mt-2">
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">
                {maxFreeMessages - messageCount} messages remaining
              </Badge>
            </div>
          )}
        </CardHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                }`}>
                  {message.sender === 'user' ? (
                    <UserIcon className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`max-w-[75%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <CardContent className="p-4 border-t flex-shrink-0">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isPro && messageCount >= maxFreeMessages}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || (!isPro && messageCount >= maxFreeMessages)}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {!isPro && messageCount >= maxFreeMessages && (
            <p className="text-xs text-center text-gray-500 mt-2">
              Upgrade to Pro for unlimited messages
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
