import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { UserTypeSelection } from './UserTypeSelection';
import { UserRegistration } from './UserRegistration';
import { Dashboard } from './Dashboard';
import { UserProfile } from './UserProfile';
import { NotificationSettings } from './NotificationSettings';
import { ProFeatures } from './ProFeatures';
import { BackendTest } from './BackendTest';
import { AIChatbot } from './AIChatbot';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Bell, User, Settings, Home, LogOut, Crown, Database } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  region: string;
  notifications_enabled: boolean;
  userType: 'patient' | 'planner';
  isPro?: boolean;
  age?: number;
  gender?: string;
  weight?: number;
  healthRecord?: string;
}

export function AppContent() {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userType, setUserType] = useState<'patient' | 'planner' | null>(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const token = localStorage.getItem('supabase_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/session`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setActiveTab('dashboard');
      } else {
        // Invalid token, clear it
        localStorage.removeItem('supabase_token');
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      localStorage.removeItem('supabase_token');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setUserType(userData.userType);
    setIsPro(userData.isPro || false);
    setActiveTab('dashboard');
  };

  const handleUpgrade = () => {
    setIsPro(true);
    if (user) {
      setUser({ ...user, isPro: true });
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('supabase_token');
      if (token) {
        await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e46e887a/user/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
      localStorage.removeItem('supabase_token');
      setUser(null);
      setUserType(null);
      setActiveTab('register');
    } catch (error) {
      console.error('Error logging out:', error);
      localStorage.removeItem('supabase_token');
      setUser(null);
      setUserType(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    if (!userType) {
      return <UserTypeSelection onSelectType={setUserType} />;
    }
    
    return (
      <UserRegistration 
        onSuccess={handleLogin} 
        userType={userType} 
        onBack={() => setUserType(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl">{t.appName}</h1>
                <p className="text-sm text-gray-600">{t.welcome}, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <LanguageSelector variant="compact" showLabel={false} />
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                {t.logout}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${user.userType === 'planner' ? 'grid-cols-4' : 'grid-cols-5'} max-w-3xl mx-auto mb-8`}>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              {t.dashboard}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {t.profile}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-1.5">
              <div className="flex items-center -space-x-0.5">
                <Bell className="w-4 h-4" />
                <Settings className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline">{t.alertsAndSettings}</span>
              <span className="sm:hidden">{t.alerts}</span>
            </TabsTrigger>
            {user.userType === 'patient' && (
              <TabsTrigger value="pro" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                {t.pro}
              </TabsTrigger>
            )}
            <TabsTrigger value="backend" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              {t.backend}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard user={{ ...user, isPro }} />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile user={user} onUpdate={setUser} />
          </TabsContent>

          <TabsContent value="alerts">
            <NotificationSettings user={user} />
          </TabsContent>

          <TabsContent value="pro">
            <ProFeatures user={{ ...user, isPro }} onUpgrade={handleUpgrade} />
          </TabsContent>

          <TabsContent value="backend">
            <BackendTest user={user} />
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Chatbot - For Both User Types */}
      <AIChatbot user={user} isPro={isPro} />
    </div>
  );
}
