import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
)

// Helper function to generate mock pollution data
function generatePollutionData(region: string) {
  // Base pollution levels by region (simulated)
  const regionMultipliers: { [key: string]: number } = {
    'Asia': 1.5,
    'Europe': 0.8,
    'North America': 1.0,
    'South America': 1.2,
    'Africa': 1.3,
    'Australia/Oceania': 0.7
  }

  const multiplier = regionMultipliers[region] || 1.0
  const timeVariation = Math.random() * 0.4 + 0.8 // 0.8 to 1.2

  const pm25 = Math.round((15 + Math.random() * 40) * multiplier * timeVariation)
  const pm10 = Math.round((25 + Math.random() * 80) * multiplier * timeVariation)
  const co = Math.round((0.5 + Math.random() * 2) * multiplier * timeVariation * 10) / 10
  const no2 = Math.round((20 + Math.random() * 60) * multiplier * timeVariation)
  const o3 = Math.round((30 + Math.random() * 100) * multiplier * timeVariation)
  const so2 = Math.round((5 + Math.random() * 20) * multiplier * timeVariation)

  // Calculate AQI based on PM2.5 (simplified)
  let aqi = 0
  if (pm25 <= 12) aqi = Math.round((50 / 12) * pm25)
  else if (pm25 <= 35.4) aqi = Math.round(50 + ((100 - 50) / (35.4 - 12)) * (pm25 - 12))
  else if (pm25 <= 55.4) aqi = Math.round(100 + ((150 - 100) / (55.4 - 35.4)) * (pm25 - 35.4))
  else if (pm25 <= 150.4) aqi = Math.round(150 + ((200 - 150) / (150.4 - 55.4)) * (pm25 - 55.4))
  else if (pm25 <= 250.4) aqi = Math.round(200 + ((300 - 200) / (250.4 - 150.4)) * (pm25 - 150.4))
  else aqi = Math.round(300 + ((500 - 300) / (500.4 - 250.4)) * (pm25 - 250.4))

  let status: 'good' | 'moderate' | 'unhealthy_sensitive' | 'unhealthy' | 'very_unhealthy' | 'hazardous'
  if (aqi <= 50) status = 'good'
  else if (aqi <= 100) status = 'moderate'
  else if (aqi <= 150) status = 'unhealthy_sensitive'
  else if (aqi <= 200) status = 'unhealthy'
  else if (aqi <= 300) status = 'very_unhealthy'
  else status = 'hazardous'

  return {
    aqi,
    pm25,
    pm10,
    co,
    no2,
    o3,
    so2,
    temperature: Math.round(15 + Math.random() * 20),
    humidity: Math.round(40 + Math.random() * 40),
    visibility: Math.round(5 + Math.random() * 15),
    last_updated: new Date().toISOString(),
    status
  }
}

// User registration
app.post('/make-server-e46e887a/user/register', async (c) => {
  try {
    const { name, email, password, region, city, notifications_enabled } = await c.req.json()

    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, region, city },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (authError) {
      console.error('Auth registration error:', authError)
      return c.json({ error: authError.message }, 400)
    }

    // Store user data in KV store
    const userData = {
      id: authUser.user.id,
      name,
      email,
      region,
      city: city || '',
      notifications_enabled: notifications_enabled ?? true,
      created_at: new Date().toISOString()
    }

    await kv.set(`user:${authUser.user.id}`, userData)

    // Store default notification preferences
    const defaultPreferences = {
      enabled: notifications_enabled ?? true,
      aqiThreshold: 100,
      pm25Threshold: 35,
      pm10Threshold: 150,
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00'
      },
      frequency: 'immediate'
    }

    await kv.set(`user:${authUser.user.id}:preferences`, defaultPreferences)

    // Create sample notifications for new users
    const sampleNotifications = [
      {
        id: `welcome_${Date.now()}`,
        message: `Welcome to AirAlert NASA! You're now monitoring air quality for ${region}. We'll notify you when pollution levels exceed your thresholds.`,
        type: 'info',
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: `sample_${Date.now() - 1000}`,
        message: `Sample Alert: Air quality has improved to Good levels (AQI: 45) in your region. Great time for outdoor activities!`,
        type: 'info',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        read: true
      }
    ]

    await kv.set(`user:${authUser.user.id}:notifications`, sampleNotifications)

    return c.json({ 
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        region: userData.region,
        notifications_enabled: userData.notifications_enabled
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return c.json({ error: 'Registration failed' }, 500)
  }
})

// User login
app.post('/make-server-e46e887a/user/login', async (c) => {
  try {
    const { email, password } = await c.req.json()

    console.log('Attempting login for email:', email)

    // Create a client with anon key for sign in
    const authClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || ''
    )

    const { data: { session }, error } = await authClient.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Auth login error:', error)
      return c.json({ error: error.message }, 400)
    }

    if (!session?.user) {
      console.error('No user session after login')
      return c.json({ error: 'No user session' }, 400)
    }

    console.log('Login successful for user:', session.user.id)

    // Get user data from KV store
    const userData = await kv.get(`user:${session.user.id}`)
    
    if (!userData) {
      console.error('User data not found in KV store for:', session.user.id)
      return c.json({ error: 'User data not found' }, 404)
    }

    return c.json({ 
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        region: userData.region,
        notifications_enabled: userData.notifications_enabled
      },
      access_token: session.access_token
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ error: 'Login failed' }, 500)
  }
})

// Check user session
app.get('/make-server-e46e887a/user/session', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      console.log('No authorization header provided')
      return c.json({ error: 'No authorization header' }, 401)
    }

    const token = authHeader.split(' ')[1]
    
    // Use anon key client for getting user from token
    const authClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || ''
    )

    const { data: { user }, error } = await authClient.auth.getUser(token)

    if (error || !user) {
      console.log('Invalid session:', error?.message)
      return c.json({ error: 'Invalid session' }, 401)
    }

    // Get user data from KV store
    const userData = await kv.get(`user:${user.id}`)
    
    if (!userData) {
      console.log('User data not found for:', user.id)
      return c.json({ error: 'User data not found' }, 404)
    }

    return c.json({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      region: userData.region,
      notifications_enabled: userData.notifications_enabled
    })
  } catch (error) {
    console.error('Session check error:', error)
    return c.json({ error: 'Session check failed' }, 500)
  }
})

// User logout
app.post('/make-server-e46e887a/user/logout', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      
      // Use anon key client for logout
      const authClient = createClient(
        Deno.env.get('SUPABASE_URL') || '',
        Deno.env.get('SUPABASE_ANON_KEY') || ''
      )
      
      // Set the token for this client session
      await authClient.auth.setSession({
        access_token: token,
        refresh_token: '' // We don't have refresh token in this flow
      })
      
      // Sign out
      await authClient.auth.signOut()
    }
    return c.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return c.json({ success: true }) // Return success anyway since we're logging out
  }
})

// Update user profile
app.put('/make-server-e46e887a/user/profile', async (c) => {
  try {
    const { userId, name, email, region } = await c.req.json()

    const userData = await kv.get(`user:${userId}`)
    if (!userData) {
      return c.json({ error: 'User not found' }, 404)
    }

    const updatedUser = {
      ...userData,
      name,
      email,
      region,
      updated_at: new Date().toISOString()
    }

    await kv.set(`user:${userId}`, updatedUser)

    return c.json({ 
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        region: updatedUser.region,
        notifications_enabled: updatedUser.notifications_enabled
      }
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return c.json({ error: 'Profile update failed' }, 500)
  }
})

// Get current pollution data
app.get('/make-server-e46e887a/pollution/current', async (c) => {
  try {
    const region = c.req.query('region')
    if (!region) {
      return c.json({ error: 'Region parameter required' }, 400)
    }

    // Check if we have recent cached data
    const cacheKey = `pollution:${region}`
    const cachedData = await kv.get(cacheKey)
    
    if (cachedData && cachedData.last_updated) {
      const lastUpdate = new Date(cachedData.last_updated)
      const now = new Date()
      const diffMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60)
      
      // Use cached data if less than 10 minutes old
      if (diffMinutes < 10) {
        return c.json(cachedData)
      }
    }

    // Generate new pollution data
    const pollutionData = generatePollutionData(region)
    
    // Cache the data
    await kv.set(cacheKey, pollutionData)
    
    // Store in history
    const historyKey = `pollution:${region}:history`
    const history = await kv.get(historyKey) || []
    
    // Add current reading to history
    history.unshift(pollutionData)
    
    // Keep only last 100 readings
    if (history.length > 100) {
      history.splice(100)
    }
    
    await kv.set(historyKey, history)
    
    return c.json(pollutionData)
  } catch (error) {
    console.error('Pollution data error:', error)
    return c.json({ error: 'Failed to fetch pollution data' }, 500)
  }
})

// Get notification preferences
app.get('/make-server-e46e887a/user/notification-preferences', async (c) => {
  try {
    const userId = c.req.query('userId')
    if (!userId) {
      return c.json({ error: 'User ID required' }, 400)
    }

    const preferences = await kv.get(`user:${userId}:preferences`)
    
    return c.json({ preferences: preferences || null })
  } catch (error) {
    console.error('Get preferences error:', error)
    return c.json({ error: 'Failed to fetch preferences' }, 500)
  }
})

// Update notification preferences
app.put('/make-server-e46e887a/user/notification-preferences', async (c) => {
  try {
    const { userId, preferences } = await c.req.json()

    await kv.set(`user:${userId}:preferences`, preferences)
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Update preferences error:', error)
    return c.json({ error: 'Failed to update preferences' }, 500)
  }
})

// Get user notifications
app.get('/make-server-e46e887a/user/notifications', async (c) => {
  try {
    const userId = c.req.query('userId')
    if (!userId) {
      return c.json({ error: 'User ID required' }, 400)
    }

    const notifications = await kv.get(`user:${userId}:notifications`) || []
    
    return c.json({ notifications })
  } catch (error) {
    console.error('Get notifications error:', error)
    return c.json({ error: 'Failed to fetch notifications' }, 500)
  }
})

// Mark notification as read
app.put('/make-server-e46e887a/user/notifications/:id/read', async (c) => {
  try {
    const notificationId = c.req.param('id')
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader) {
      return c.json({ error: 'Authorization required' }, 401)
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return c.json({ error: 'Invalid session' }, 401)
    }

    const notifications = await kv.get(`user:${user.id}:notifications`) || []
    const updatedNotifications = notifications.map((n: any) => 
      n.id === notificationId ? { ...n, read: true } : n
    )
    
    await kv.set(`user:${user.id}:notifications`, updatedNotifications)
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Mark notification read error:', error)
    return c.json({ error: 'Failed to mark notification as read' }, 500)
  }
})

// Create a test notification endpoint
app.post('/make-server-e46e887a/user/test-notification', async (c) => {
  try {
    const { userId, notification } = await c.req.json()

    // Use provided notification or create default test notification
    const newNotification = notification || {
      id: `test_${Date.now()}`,
      message: 'Test notification: Air quality index has reached moderate levels (AQI: 85) in your region.',
      type: 'warning',
      timestamp: new Date().toISOString(),
      read: false
    }

    const notifications = await kv.get(`user:${userId}:notifications`) || []
    notifications.unshift(newNotification)
    
    // Keep only last 50 notifications
    if (notifications.length > 50) {
      notifications.splice(50)
    }
    
    await kv.set(`user:${userId}:notifications`, notifications)
    
    return c.json({ success: true, notification: newNotification })
  } catch (error) {
    console.error('Test notification error:', error)
    return c.json({ error: 'Failed to create test notification' }, 500)
  }
})

// Export user data
app.get('/make-server-e46e887a/user/export', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ error: 'Authorization required' }, 401)
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return c.json({ error: 'Invalid session' }, 401)
    }

    // Get all user data
    const userData = await kv.get(`user:${user.id}`)
    const preferences = await kv.get(`user:${user.id}:preferences`)
    const notifications = await kv.get(`user:${user.id}:notifications`) || []

    // Get recent pollution data for user's region
    const pollutionData = await kv.get(`pollution:${userData.region}`)
    
    // Get pollution data history for user's region
    const pollutionHistory = await kv.get(`pollution:${userData.region}:history`) || []

    const exportData = {
      user: userData,
      preferences,
      notifications,
      recentPollutionData: pollutionData,
      pollutionHistory: pollutionHistory,
      exportedAt: new Date().toISOString(),
      metadata: {
        totalNotifications: notifications.length,
        unreadNotifications: notifications.filter((n: any) => !n.read).length,
        totalPollutionReadings: pollutionHistory.length,
        accountCreated: userData?.created_at,
        lastUpdated: userData?.updated_at
      }
    }

    return c.json(exportData)
  } catch (error) {
    console.error('Data export error:', error)
    return c.json({ error: 'Failed to export data' }, 500)
  }
})

// Get user statistics
app.get('/make-server-e46e887a/user/stats', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ error: 'Authorization required' }, 401)
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return c.json({ error: 'Invalid session' }, 401)
    }

    const userData = await kv.get(`user:${user.id}`)
    const notifications = await kv.get(`user:${user.id}:notifications`) || []
    const preferences = await kv.get(`user:${user.id}:preferences`)

    const stats = {
      accountAge: userData?.created_at ? 
        Math.floor((Date.now() - new Date(userData.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0,
      totalNotifications: notifications.length,
      unreadNotifications: notifications.filter((n: any) => !n.read).length,
      notificationsEnabled: preferences?.enabled || false,
      region: userData?.region,
      lastProfileUpdate: userData?.updated_at,
      thresholds: {
        aqi: preferences?.aqiThreshold || 100,
        pm25: preferences?.pm25Threshold || 35,
        pm10: preferences?.pm10Threshold || 150
      }
    }

    return c.json({ stats })
  } catch (error) {
    console.error('Stats error:', error)
    return c.json({ error: 'Failed to get stats' }, 500)
  }
})

// Health check endpoint
app.get('/make-server-e46e887a/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

serve(app.fetch)