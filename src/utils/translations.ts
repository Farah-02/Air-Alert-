export type Language = 'en' | 'es' | 'fr' | 'ar' | 'zh';

export interface Translations {
  // Header & Navigation
  appName: string;
  appTagline: string;
  welcome: string;
  logout: string;
  
  // Tabs
  dashboard: string;
  profile: string;
  alerts: string;
  alertsAndSettings: string;
  pro: string;
  backend: string;
  settings: string;
  
  // Dashboard
  airQualityDashboard: string;
  lastUpdated: string;
  refresh: string;
  livePollutantLevels: string;
  quickActions: string;
  environmentalConditions: string;
  temperature: string;
  humidity: string;
  visibility: string;
  overallAQI: string;
  airQuality: string;
  
  // Air Quality Status
  good: string;
  moderate: string;
  unhealthySensitive: string;
  unhealthy: string;
  veryUnhealthy: string;
  hazardous: string;
  
  // Pollutant Status
  excellent: string;
  acceptable: string;
  
  // Alerts
  airQualityAlert: string;
  pollutantsExceed: string;
  aboveThresholds: string;
  allPollutantsSafe: string;
  greatTimeOutdoor: string;
  
  // Registration
  getStarted: string;
  createAccount: string;
  fullName: string;
  email: string;
  region: string;
  enterRegion: string;
  password: string;
  enableNotifications: string;
  receiveAlerts: string;
  register: string;
  alreadyHaveAccount: string;
  login: string;
  
  // Features
  realTimeAlerts: string;
  realTimeAlertsDesc: string;
  locationBased: string;
  locationBasedDesc: string;
  nasaData: string;
  nasaDataDesc: string;
  nasaChallengeProject: string;
  nasaChallengeDesc: string;
  
  // Pro Features
  upgradeToPro: string;
  chooseYourPlan: string;
  unlockAdvanced: string;
  currentPlan: string;
  upgradeNow: string;
  selectMonthly: string;
  select3Months: string;
  save: string;
  allProPlans: string;
  maybelater: string;
  billedMonthly: string;
  oneTimePayment: string;
  bestValue: string;
  
  // Plan Features
  basicPlan: string;
  proMonthly: string;
  pro3Months: string;
  everythingInBasic: string;
  urbanPlanningInsights: string;
  proDashboardHeatmaps: string;
  multiLocationMonitoring: string;
  historicalDataAnalysis: string;
  prioritySupport: string;
  healthcareFacilityRec: string;
  
  // Quick Actions
  perfectExercise: string;
  perfectExerciseDesc: string;
  takeWalk: string;
  takeWalkDesc: string;
  lightExercise: string;
  lightExerciseDesc: string;
  indoorActivities: string;
  indoorActivitiesDesc: string;
  stayIndoors: string;
  stayIndoorsDesc: string;
  useAirPurifier: string;
  useAirPurifierDesc: string;
  wearMask: string;
  wearMaskDesc: string;
  avoidMidday: string;
  avoidMiddayDesc: string;
  avoidBusyRoads: string;
  avoidBusyRoadsDesc: string;
  stayHydrated: string;
  stayHydratedDesc: string;
  freshAirTime: string;
  freshAirTimeDesc: string;
  
  // Pollutant Details
  pm25Desc: string;
  pm10Desc: string;
  no2Desc: string;
  so2Desc: string;
  o3Desc: string;
  coDesc: string;
  
  healthEffect: string;
  quickAction: string;
  liveValue: string;
  whoLimit: string;
  
  // Settings
  language: string;
  selectLanguage: string;
  
  // Common
  loading: string;
  error: string;
  retry: string;
  success: string;
  cancel: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header & Navigation
    appName: 'AirAlert NASA',
    appTagline: 'Real-time Air Quality Monitoring & Alerts',
    welcome: 'Welcome',
    logout: 'Logout',
    
    // Tabs
    dashboard: 'Dashboard',
    profile: 'Profile',
    alerts: 'Alerts',
    alertsAndSettings: 'Alerts & Settings',
    pro: 'Pro',
    backend: 'Backend',
    settings: 'Settings',
    
    // Dashboard
    airQualityDashboard: 'Air Quality Dashboard',
    lastUpdated: 'Last updated',
    refresh: 'Refresh',
    livePollutantLevels: 'Live Pollutant Levels',
    quickActions: 'Quick Actions',
    environmentalConditions: 'Environmental Conditions',
    temperature: 'Temperature',
    humidity: 'Humidity',
    visibility: 'Visibility',
    overallAQI: 'Overall Air Quality Index',
    airQuality: 'Air Quality',
    
    // Air Quality Status
    good: 'Good',
    moderate: 'Moderate',
    unhealthySensitive: 'Unhealthy for Sensitive Groups',
    unhealthy: 'Unhealthy',
    veryUnhealthy: 'Very Unhealthy',
    hazardous: 'Hazardous',
    
    // Pollutant Status
    excellent: 'Excellent',
    acceptable: 'Acceptable',
    
    // Alerts
    airQualityAlert: 'Air Quality Alert',
    pollutantsExceed: 'pollutant(s) exceed safe levels',
    aboveThresholds: 'above WHO thresholds',
    allPollutantsSafe: 'All pollutant levels are within safe WHO guidelines',
    greatTimeOutdoor: 'Great time for outdoor activities!',
    
    // Registration
    getStarted: 'Get Started',
    createAccount: 'Create Your Account',
    fullName: 'Full Name',
    email: 'Email',
    region: 'Region',
    enterRegion: 'Enter your city or region',
    password: 'Password',
    enableNotifications: 'Enable Notifications',
    receiveAlerts: 'Receive alerts when air quality is poor',
    register: 'Register',
    alreadyHaveAccount: 'Already have an account?',
    login: 'Login',
    
    // Features
    realTimeAlerts: 'Real-time Alerts',
    realTimeAlertsDesc: 'Get notified when air quality reaches unhealthy levels in your area',
    locationBased: 'Location-based',
    locationBasedDesc: 'Monitor air quality specifically for your region and neighborhood',
    nasaData: 'NASA Data Integration',
    nasaDataDesc: 'Powered by NASA satellite data and earth science research',
    nasaChallengeProject: 'NASA Challenge Project',
    nasaChallengeDesc: 'This application was developed for NASA\'s Earth Science Challenge, connecting real-time air pollution monitoring with community health initiatives. By leveraging NASA\'s satellite data and Earth observation systems, we provide accessible air quality information to help communities make informed decisions about outdoor activities and health protection.',
    
    // Pro Features
    upgradeToPro: 'Upgrade to Pro',
    chooseYourPlan: 'Choose Your Pro Plan',
    unlockAdvanced: 'Unlock advanced urban planning tools and healthcare facility recommendations with comprehensive environmental analytics.',
    currentPlan: 'Current Plan',
    upgradeNow: 'Upgrade Now',
    selectMonthly: 'Select Monthly',
    select3Months: 'Select 3 Months',
    save: 'Save',
    allProPlans: 'All Pro plans include:',
    maybelater: 'Maybe Later',
    billedMonthly: 'Billed monthly',
    oneTimePayment: 'One-time payment',
    bestValue: 'Best value offer',
    
    // Plan Features
    basicPlan: 'Basic',
    proMonthly: 'Pro - 1 Month',
    pro3Months: 'Pro - 3 Months',
    everythingInBasic: 'Everything in Basic',
    urbanPlanningInsights: 'Urban planning insights & analytics',
    proDashboardHeatmaps: 'Pro dashboard & heatmaps',
    multiLocationMonitoring: 'Multi-location monitoring',
    historicalDataAnalysis: 'Historical data analysis',
    prioritySupport: 'Priority customer support',
    healthcareFacilityRec: 'Healthcare facility recommendations',
    
    // Quick Actions
    perfectExercise: 'Perfect for Exercise',
    perfectExerciseDesc: 'Great air quality! Go for a run or outdoor workout.',
    takeWalk: 'Take a Walk',
    takeWalkDesc: 'Enjoy fresh air with a leisurely walk outside.',
    lightExercise: 'Light Exercise Only',
    lightExerciseDesc: 'Limit intense outdoor activities, especially for sensitive groups.',
    indoorActivities: 'Indoor Activities',
    indoorActivitiesDesc: 'Consider exercising indoors or in well-ventilated areas.',
    stayIndoors: 'Stay Indoors',
    stayIndoorsDesc: 'Air quality is poor. Avoid outdoor activities.',
    useAirPurifier: 'Use Air Purifier',
    useAirPurifierDesc: 'Keep windows closed and use air filtration.',
    wearMask: 'Wear N95 Mask',
    wearMaskDesc: 'Fine particles detected. Use proper mask if going outside.',
    avoidMidday: 'Avoid Midday Sun',
    avoidMiddayDesc: 'Ozone levels peak during afternoon. Stay indoors 10am-4pm.',
    avoidBusyRoads: 'Avoid Busy Roads',
    avoidBusyRoadsDesc: 'High traffic pollution. Use alternate routes or public transport.',
    stayHydrated: 'Stay Hydrated',
    stayHydratedDesc: 'Drink plenty of water to help your body cope with pollutants.',
    freshAirTime: 'Fresh Air Time',
    freshAirTimeDesc: 'Open windows and let fresh air circulate in your home.',
    
    // Pollutant Details
    pm25Desc: 'Fine particles that can penetrate deep into lungs and bloodstream',
    pm10Desc: 'Coarse particles from dust, pollen, and combustion',
    no2Desc: 'Nitrogen dioxide from vehicle emissions and industrial sources',
    so2Desc: 'Sulfur dioxide from fossil fuel combustion',
    o3Desc: 'Ground-level ozone formed by sunlight and pollutants',
    coDesc: 'Carbon monoxide from incomplete combustion',
    
    healthEffect: 'Health Impact',
    quickAction: 'Quick Action',
    liveValue: 'Live Value',
    whoLimit: 'WHO Limit',
    
    // Settings
    language: 'Language',
    selectLanguage: 'Select Language',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    success: 'Success',
    cancel: 'Cancel',
  },
  
  es: {
    // Header & Navigation
    appName: 'AirAlert NASA',
    appTagline: 'Monitoreo y Alertas de Calidad del Aire en Tiempo Real',
    welcome: 'Bienvenido',
    logout: 'Cerrar Sesión',
    
    // Tabs
    dashboard: 'Panel',
    profile: 'Perfil',
    alerts: 'Alertas',
    alertsAndSettings: 'Alertas y Configuración',
    pro: 'Pro',
    backend: 'Backend',
    settings: 'Configuración',
    
    // Dashboard
    airQualityDashboard: 'Panel de Calidad del Aire',
    lastUpdated: 'Última actualización',
    refresh: 'Actualizar',
    livePollutantLevels: 'Niveles de Contaminantes en Vivo',
    quickActions: 'Acciones Rápidas',
    environmentalConditions: 'Condiciones Ambientales',
    temperature: 'Temperatura',
    humidity: 'Humedad',
    visibility: 'Visibilidad',
    overallAQI: 'Índice de Calidad del Aire General',
    airQuality: 'Calidad del Aire',
    
    // Air Quality Status
    good: 'Bueno',
    moderate: 'Moderado',
    unhealthySensitive: 'Insalubre para Grupos Sensibles',
    unhealthy: 'Insalubre',
    veryUnhealthy: 'Muy Insalubre',
    hazardous: 'Peligroso',
    
    // Pollutant Status
    excellent: 'Excelente',
    acceptable: 'Aceptable',
    
    // Alerts
    airQualityAlert: 'Alerta de Calidad del Aire',
    pollutantsExceed: 'contaminante(s) exceden niveles seguros',
    aboveThresholds: 'por encima de los umbrales de la OMS',
    allPollutantsSafe: 'Todos los niveles de contaminantes están dentro de las pautas seguras de la OMS',
    greatTimeOutdoor: '¡Buen momento para actividades al aire libre!',
    
    // Registration
    getStarted: 'Comenzar',
    createAccount: 'Crea tu Cuenta',
    fullName: 'Nombre Completo',
    email: 'Correo Electrónico',
    region: 'Región',
    enterRegion: 'Ingresa tu ciudad o región',
    password: 'Contraseña',
    enableNotifications: 'Habilitar Notificaciones',
    receiveAlerts: 'Recibir alertas cuando la calidad del aire sea mala',
    register: 'Registrarse',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    login: 'Iniciar Sesión',
    
    // Features
    realTimeAlerts: 'Alertas en Tiempo Real',
    realTimeAlertsDesc: 'Recibe notificaciones cuando la calidad del aire alcance niveles insalubres en tu área',
    locationBased: 'Basado en Ubicación',
    locationBasedDesc: 'Monitorea la calidad del aire específicamente para tu región y vecindario',
    nasaData: 'Integración de Datos de NASA',
    nasaDataDesc: 'Impulsado por datos satelitales de NASA e investigación de ciencias de la Tierra',
    nasaChallengeProject: 'Proyecto del Desafío NASA',
    nasaChallengeDesc: 'Esta aplicación fue desarrollada para el Desafío de Ciencias de la Tierra de NASA, conectando el monitoreo de contaminación del aire en tiempo real con iniciativas de salud comunitaria. Al aprovechar los datos satelitales de NASA y los sistemas de observación de la Tierra, proporcionamos información accesible sobre la calidad del aire para ayudar a las comunidades a tomar decisiones informadas sobre actividades al aire libre y protección de la salud.',
    
    // Pro Features
    upgradeToPro: 'Actualizar a Pro',
    chooseYourPlan: 'Elige tu Plan Pro',
    unlockAdvanced: 'Desbloquea herramientas avanzadas de planificación urbana y recomendaciones de centros de salud con análisis ambiental completo.',
    currentPlan: 'Plan Actual',
    upgradeNow: 'Actualizar Ahora',
    selectMonthly: 'Seleccionar Mensual',
    select3Months: 'Seleccionar 3 Meses',
    save: 'Ahorrar',
    allProPlans: 'Todos los planes Pro incluyen:',
    maybelater: 'Quizás Más Tarde',
    billedMonthly: 'Facturación mensual',
    oneTimePayment: 'Pago único',
    bestValue: 'Mejor oferta',
    
    // Plan Features
    basicPlan: 'Básico',
    proMonthly: 'Pro - 1 Mes',
    pro3Months: 'Pro - 3 Meses',
    everythingInBasic: 'Todo en Básico',
    urbanPlanningInsights: 'Análisis e información de planificación urbana',
    proDashboardHeatmaps: 'Panel Pro y mapas de calor',
    multiLocationMonitoring: 'Monitoreo de múltiples ubicaciones',
    historicalDataAnalysis: 'Análisis de datos históricos',
    prioritySupport: 'Soporte prioritario',
    healthcareFacilityRec: 'Recomendaciones de centros de salud',
    
    // Quick Actions
    perfectExercise: 'Perfecto para Ejercicio',
    perfectExerciseDesc: '¡Gran calidad del aire! Ve a correr o hacer ejercicio al aire libre.',
    takeWalk: 'Da un Paseo',
    takeWalkDesc: 'Disfruta del aire fresco con un paseo tranquilo afuera.',
    lightExercise: 'Solo Ejercicio Ligero',
    lightExerciseDesc: 'Limita las actividades intensas al aire libre, especialmente para grupos sensibles.',
    indoorActivities: 'Actividades en Interiores',
    indoorActivitiesDesc: 'Considera hacer ejercicio en interiores o en áreas bien ventiladas.',
    stayIndoors: 'Permanece en Interiores',
    stayIndoorsDesc: 'La calidad del aire es mala. Evita actividades al aire libre.',
    useAirPurifier: 'Usa Purificador de Aire',
    useAirPurifierDesc: 'Mantén las ventanas cerradas y usa filtración de aire.',
    wearMask: 'Usa Mascarilla N95',
    wearMaskDesc: 'Partículas finas detectadas. Usa mascarilla apropiada si sales.',
    avoidMidday: 'Evita el Sol del Mediodía',
    avoidMiddayDesc: 'Los niveles de ozono alcanzan su punto máximo por la tarde. Permanece en interiores de 10am-4pm.',
    avoidBusyRoads: 'Evita Carreteras Concurridas',
    avoidBusyRoadsDesc: 'Alta contaminación de tráfico. Usa rutas alternativas o transporte público.',
    stayHydrated: 'Mantente Hidratado',
    stayHydratedDesc: 'Bebe mucha agua para ayudar a tu cuerpo a lidiar con los contaminantes.',
    freshAirTime: 'Tiempo de Aire Fresco',
    freshAirTimeDesc: 'Abre las ventanas y deja que el aire fresco circule en tu hogar.',
    
    // Pollutant Details
    pm25Desc: 'Partículas finas que pueden penetrar profundamente en los pulmones y el torrente sanguíneo',
    pm10Desc: 'Partículas gruesas de polvo, polen y combustión',
    no2Desc: 'Dióxido de nitrógeno de emisiones vehiculares y fuentes industriales',
    so2Desc: 'Dióxido de azufre de la combustión de combustibles fósiles',
    o3Desc: 'Ozono a nivel del suelo formado por la luz solar y los contaminantes',
    coDesc: 'Monóxido de carbono de combustión incompleta',
    
    healthEffect: 'Impacto en la Salud',
    quickAction: 'Acción Rápida',
    liveValue: 'Valor en Vivo',
    whoLimit: 'Límite OMS',
    
    // Settings
    language: 'Idioma',
    selectLanguage: 'Seleccionar Idioma',
    
    // Common
    loading: 'Cargando...',
    error: 'Error',
    retry: 'Reintentar',
    success: 'Éxito',
    cancel: 'Cancelar',
  },
  
  fr: {
    // Header & Navigation
    appName: 'AirAlert NASA',
    appTagline: 'Surveillance et Alertes de la Qualité de l\'Air en Temps Réel',
    welcome: 'Bienvenue',
    logout: 'Déconnexion',
    
    // Tabs
    dashboard: 'Tableau de Bord',
    profile: 'Profil',
    alerts: 'Alertes',
    alertsAndSettings: 'Alertes et Paramètres',
    pro: 'Pro',
    backend: 'Backend',
    settings: 'Paramètres',
    
    // Dashboard
    airQualityDashboard: 'Tableau de Bord de la Qualité de l\'Air',
    lastUpdated: 'Dernière mise à jour',
    refresh: 'Actualiser',
    livePollutantLevels: 'Niveaux de Polluants en Direct',
    quickActions: 'Actions Rapides',
    environmentalConditions: 'Conditions Environnementales',
    temperature: 'Température',
    humidity: 'Humidité',
    visibility: 'Visibilité',
    overallAQI: 'Indice Global de Qualité de l\'Air',
    airQuality: 'Qualité de l\'Air',
    
    // Air Quality Status
    good: 'Bon',
    moderate: 'Modéré',
    unhealthySensitive: 'Malsain pour les Groupes Sensibles',
    unhealthy: 'Malsain',
    veryUnhealthy: 'Très Malsain',
    hazardous: 'Dangereux',
    
    // Pollutant Status
    excellent: 'Excellent',
    acceptable: 'Acceptable',
    
    // Alerts
    airQualityAlert: 'Alerte Qualité de l\'Air',
    pollutantsExceed: 'polluant(s) dépassent les niveaux sûrs',
    aboveThresholds: 'au-dessus des seuils de l\'OMS',
    allPollutantsSafe: 'Tous les niveaux de polluants sont dans les directives sûres de l\'OMS',
    greatTimeOutdoor: 'Excellent moment pour les activités de plein air!',
    
    // Registration
    getStarted: 'Commencer',
    createAccount: 'Créez Votre Compte',
    fullName: 'Nom Complet',
    email: 'Email',
    region: 'Région',
    enterRegion: 'Entrez votre ville ou région',
    password: 'Mot de Passe',
    enableNotifications: 'Activer les Notifications',
    receiveAlerts: 'Recevoir des alertes lorsque la qualité de l\'air est mauvaise',
    register: 'S\'inscrire',
    alreadyHaveAccount: 'Vous avez déjà un compte?',
    login: 'Se Connecter',
    
    // Features
    realTimeAlerts: 'Alertes en Temps Réel',
    realTimeAlertsDesc: 'Soyez averti lorsque la qualité de l\'air atteint des niveaux malsains dans votre région',
    locationBased: 'Basé sur la Localisation',
    locationBasedDesc: 'Surveillez la qualité de l\'air spécifiquement pour votre région et quartier',
    nasaData: 'Intégration des Données NASA',
    nasaDataDesc: 'Alimenté par les données satellitaires de la NASA et la recherche en sciences de la Terre',
    nasaChallengeProject: 'Projet du Défi NASA',
    nasaChallengeDesc: 'Cette application a été développée pour le Défi des Sciences de la Terre de la NASA, reliant la surveillance de la pollution de l\'air en temps réel aux initiatives de santé communautaire. En exploitant les données satellitaires de la NASA et les systèmes d\'observation de la Terre, nous fournissons des informations accessibles sur la qualité de l\'air pour aider les communautés à prendre des décisions éclairées sur les activités de plein air et la protection de la santé.',
    
    // Pro Features
    upgradeToPro: 'Passer à Pro',
    chooseYourPlan: 'Choisissez Votre Plan Pro',
    unlockAdvanced: 'Débloquez des outils avancés de planification urbaine et des recommandations d\'établissements de santé avec des analyses environnementales complètes.',
    currentPlan: 'Plan Actuel',
    upgradeNow: 'Mettre à Niveau',
    selectMonthly: 'Sélectionner Mensuel',
    select3Months: 'Sélectionner 3 Mois',
    save: 'Économiser',
    allProPlans: 'Tous les plans Pro incluent:',
    maybelater: 'Peut-être Plus Tard',
    billedMonthly: 'Facturé mensuellement',
    oneTimePayment: 'Paiement unique',
    bestValue: 'Meilleure offre',
    
    // Plan Features
    basicPlan: 'Basique',
    proMonthly: 'Pro - 1 Mois',
    pro3Months: 'Pro - 3 Mois',
    everythingInBasic: 'Tout dans Basique',
    urbanPlanningInsights: 'Analyses et informations de planification urbaine',
    proDashboardHeatmaps: 'Tableau de bord Pro et cartes thermiques',
    multiLocationMonitoring: 'Surveillance multi-localisation',
    historicalDataAnalysis: 'Analyse des données historiques',
    prioritySupport: 'Support prioritaire',
    healthcareFacilityRec: 'Recommandations d\'établissements de santé',
    
    // Quick Actions
    perfectExercise: 'Parfait pour l\'Exercice',
    perfectExerciseDesc: 'Excellente qualité de l\'air! Allez courir ou faire de l\'exercice en plein air.',
    takeWalk: 'Promenez-vous',
    takeWalkDesc: 'Profitez de l\'air frais avec une promenade tranquille à l\'extérieur.',
    lightExercise: 'Exercice Léger Seulement',
    lightExerciseDesc: 'Limitez les activités intenses en plein air, surtout pour les groupes sensibles.',
    indoorActivities: 'Activités Intérieures',
    indoorActivitiesDesc: 'Envisagez de faire de l\'exercice à l\'intérieur ou dans des zones bien ventilées.',
    stayIndoors: 'Restez à l\'Intérieur',
    stayIndoorsDesc: 'La qualité de l\'air est mauvaise. Évitez les activités de plein air.',
    useAirPurifier: 'Utilisez un Purificateur d\'Air',
    useAirPurifierDesc: 'Gardez les fenêtres fermées et utilisez la filtration de l\'air.',
    wearMask: 'Portez un Masque N95',
    wearMaskDesc: 'Particules fines détectées. Utilisez un masque approprié si vous sortez.',
    avoidMidday: 'Évitez le Soleil de Midi',
    avoidMiddayDesc: 'Les niveaux d\'ozone culminent l\'après-midi. Restez à l\'intérieur de 10h à 16h.',
    avoidBusyRoads: 'Évitez les Routes Fréquentées',
    avoidBusyRoadsDesc: 'Forte pollution due au trafic. Utilisez des itinéraires alternatifs ou les transports en commun.',
    stayHydrated: 'Restez Hydraté',
    stayHydratedDesc: 'Buvez beaucoup d\'eau pour aider votre corps à faire face aux polluants.',
    freshAirTime: 'Temps d\'Air Frais',
    freshAirTimeDesc: 'Ouvrez les fenêtres et laissez l\'air frais circuler dans votre maison.',
    
    // Pollutant Details
    pm25Desc: 'Particules fines pouvant pénétrer profondément dans les poumons et le sang',
    pm10Desc: 'Particules grossières de poussière, pollen et combustion',
    no2Desc: 'Dioxyde d\'azote provenant des émissions des véhicules et sources industrielles',
    so2Desc: 'Dioxyde de soufre provenant de la combustion de combustibles fossiles',
    o3Desc: 'Ozone au sol formé par la lumière du soleil et les polluants',
    coDesc: 'Monoxyde de carbone provenant d\'une combustion incomplète',
    
    healthEffect: 'Impact sur la Santé',
    quickAction: 'Action Rapide',
    liveValue: 'Valeur en Direct',
    whoLimit: 'Limite OMS',
    
    // Settings
    language: 'Langue',
    selectLanguage: 'Sélectionner la Langue',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    retry: 'Réessayer',
    success: 'Succès',
    cancel: 'Annuler',
  },
  
  ar: {
    // Header & Navigation
    appName: 'AirAlert NASA',
    appTagline: 'مراقبة جودة الهواء والتنبيهات في الوقت الفعلي',
    welcome: 'مرحباً',
    logout: 'تسجيل الخروج',
    
    // Tabs
    dashboard: 'لوحة التحكم',
    profile: 'الملف الشخصي',
    alerts: 'التنبيهات',
    alertsAndSettings: 'التنبيهات والإعدادات',
    pro: 'برو',
    backend: 'الخلفية',
    settings: 'الإعدادات',
    
    // Dashboard
    airQualityDashboard: 'لوحة معلومات جودة الهواء',
    lastUpdated: 'آخر تحديث',
    refresh: 'تحديث',
    livePollutantLevels: 'مستويات الملوثات المباشرة',
    quickActions: 'إجراءات سريعة',
    environmentalConditions: 'الظروف البيئية',
    temperature: 'درجة الحرارة',
    humidity: 'الرطوبة',
    visibility: 'الرؤية',
    overallAQI: 'مؤشر جودة الهواء الإجمالي',
    airQuality: 'جودة الهواء',
    
    // Air Quality Status
    good: 'جيد',
    moderate: 'معتدل',
    unhealthySensitive: 'غير صحي للفئات الحساسة',
    unhealthy: 'غير صحي',
    veryUnhealthy: 'غير صحي جداً',
    hazardous: 'خطير',
    
    // Pollutant Status
    excellent: 'ممتاز',
    acceptable: 'مقبول',
    
    // Alerts
    airQualityAlert: 'تنبيه جودة الهواء',
    pollutantsExceed: 'الملوثات تتجاوز المستويات الآمنة',
    aboveThresholds: 'فوق عتبات منظمة الصحة العالمية',
    allPollutantsSafe: 'جميع مستويات الملوثات ضمن الإرشادات الآمنة لمنظمة الصحة العالمية',
    greatTimeOutdoor: 'وقت رائع للأنشطة الخارجية!',
    
    // Registration
    getStarted: 'ابدأ',
    createAccount: 'إنشاء حسابك',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    region: 'المنطقة',
    enterRegion: 'أدخل مدينتك أو منطقتك',
    password: 'كلمة المرور',
    enableNotifications: 'تفعيل الإشعارات',
    receiveAlerts: 'تلقي التنبيهات عندما تكون جودة الهواء سيئة',
    register: 'تسجيل',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    login: 'تسجيل الدخول',
    
    // Features
    realTimeAlerts: 'تنبيهات في الوقت الفعلي',
    realTimeAlertsDesc: 'احصل على إشعارات عندما تصل جودة الهواء إلى مستويات غير صحية في منطقتك',
    locationBased: 'حسب الموقع',
    locationBasedDesc: 'مراقبة جودة الهواء خصيصاً لمنطقتك وحيك',
    nasaData: 'تكامل بيانات ناسا',
    nasaDataDesc: 'مدعوم ببيانات الأقمار الصناعية لناسا وأبحاث علوم الأرض',
    nasaChallengeProject: 'مشروع تحدي ناسا',
    nasaChallengeDesc: 'تم تطوير هذا التطبيق لتحدي علوم الأرض التابع لناسا، لربط مراقبة تلوث الهواء في الوقت الفعلي بمبادرات الصحة المجتمعية. من خلال الاستفادة من بيانات الأقمار الصناعية لناسا وأنظمة مراقبة الأرض، نوفر معلومات متاحة حول جودة الهواء لمساعدة المجتمعات على اتخاذ قرارات مستنيرة حول الأنشطة الخارجية وحماية الصحة.',
    
    // Pro Features
    upgradeToPro: 'الترقية إلى برو',
    chooseYourPlan: 'اختر خطة برو الخاصة بك',
    unlockAdvanced: 'افتح أدوات التخطيط الحضري المتقدمة وتوصيات المرافق الصحية مع التحليلات البيئية الشاملة.',
    currentPlan: 'الخطة الحالية',
    upgradeNow: 'قم بالترقية الآن',
    selectMonthly: 'اختر شهرياً',
    select3Months: 'اختر 3 أشهر',
    save: 'وفر',
    allProPlans: 'جميع خطط برو تشمل:',
    maybelater: 'ربما لاحقاً',
    billedMonthly: 'فاتورة شهرية',
    oneTimePayment: 'دفعة واحدة',
    bestValue: 'أفضل قيمة',
    
    // Plan Features
    basicPlan: 'أساسي',
    proMonthly: 'برو - شهر واحد',
    pro3Months: 'برو - 3 أشهر',
    everythingInBasic: 'كل شيء في الأساسي',
    urbanPlanningInsights: 'رؤى وتحليلات التخطيط الحضري',
    proDashboardHeatmaps: 'لوحة معلومات برو وخرائط حرارية',
    multiLocationMonitoring: 'مراقبة متعددة المواقع',
    historicalDataAnalysis: 'تحليل البيانات التاريخية',
    prioritySupport: 'دعم ذو أولوية',
    healthcareFacilityRec: 'توصيات المرافق الصحية',
    
    // Quick Actions
    perfectExercise: 'مثالي للتمرين',
    perfectExerciseDesc: 'جودة هواء ممتازة! اذهب للركض أو التمرين في الهواء الطلق.',
    takeWalk: 'تنزه',
    takeWalkDesc: 'استمتع بالهواء النقي مع نزهة مريحة في الخارج.',
    lightExercise: 'تمرين خفيف فقط',
    lightExerciseDesc: 'قلل من الأنشطة الخارجية المكثفة، خاصة للفئات الحساسة.',
    indoorActivities: 'أنشطة داخلية',
    indoorActivitiesDesc: 'فكر في ممارسة الرياضة في الداخل أو في المناطق جيدة التهوية.',
    stayIndoors: 'ابق في الداخل',
    stayIndoorsDesc: 'جودة الهواء سيئة. تجنب الأنشطة الخارجية.',
    useAirPurifier: 'استخدم منقي هواء',
    useAirPurifierDesc: 'أبق النوافذ مغلقة واستخدم تنقية الهواء.',
    wearMask: 'ارتد كمامة N95',
    wearMaskDesc: 'تم اكتشاف جزيئات دقيقة. استخدم كمامة مناسبة إذا كنت خارجاً.',
    avoidMidday: 'تجنب شمس منتصف النهار',
    avoidMiddayDesc: 'مستويات الأوزون تبلغ ذروتها خلال فترة الظهيرة. ابق في الداخل من 10 صباحاً-4 مساءً.',
    avoidBusyRoads: 'تجنب الطرق المزدحمة',
    avoidBusyRoadsDesc: 'تلوث مروري عالٍ. استخدم طرق بديلة أو وسائل النقل العام.',
    stayHydrated: 'حافظ على الترطيب',
    stayHydratedDesc: 'اشرب الكثير من الماء لمساعدة جسمك على التعامل مع الملوثات.',
    freshAirTime: 'وقت الهواء النقي',
    freshAirTimeDesc: 'افتح النوافذ ودع الهواء النقي ينتشر في منزلك.',
    
    // Pollutant Details
    pm25Desc: 'جزيئات دقيقة يمكن أن تخترق عمق الرئتين ومجرى الدم',
    pm10Desc: 'جزيئات خشنة من الغبار وحبوب اللقاح والاحتراق',
    no2Desc: 'ثاني أكسيد النيتروجين من انبعاثات المركبات والمصادر الصناعية',
    so2Desc: 'ثاني أكسيد الكبريت من احتراق الوقود الأحفوري',
    o3Desc: 'الأوزون الأرضي المتكون من ضوء الشمس والملوثات',
    coDesc: 'أول أكسيد الكربون من الاحتراق غير الكامل',
    
    healthEffect: 'التأثير الصحي',
    quickAction: 'إجراء سريع',
    liveValue: 'القيمة المباشرة',
    whoLimit: 'حد منظمة الصحة العالمية',
    
    // Settings
    language: 'اللغة',
    selectLanguage: 'اختر اللغة',
    
    // Common
    loading: 'جاري التحميل...',
    error: 'خطأ',
    retry: 'إعادة المحاولة',
    success: 'نجاح',
    cancel: 'إلغاء',
  },
  
  zh: {
    // Header & Navigation
    appName: 'AirAlert NASA',
    appTagline: '实时空气质量监测与预警',
    welcome: '欢迎',
    logout: '登出',
    
    // Tabs
    dashboard: '仪表板',
    profile: '个人资料',
    alerts: '警报',
    alertsAndSettings: '警报和设置',
    pro: '专业版',
    backend: '后端',
    settings: '设置',
    
    // Dashboard
    airQualityDashboard: '空气质量仪表板',
    lastUpdated: '最后更新',
    refresh: '刷新',
    livePollutantLevels: '实时污染物水平',
    quickActions: '快速操作',
    environmentalConditions: '环境条件',
    temperature: '温度',
    humidity: '湿度',
    visibility: '能见度',
    overallAQI: '总体空气质量指数',
    airQuality: '空气质量',
    
    // Air Quality Status
    good: '良好',
    moderate: '中等',
    unhealthySensitive: '对敏感群体不健康',
    unhealthy: '不健康',
    veryUnhealthy: '非常不健康',
    hazardous: '危险',
    
    // Pollutant Status
    excellent: '优秀',
    acceptable: '可接受',
    
    // Alerts
    airQualityAlert: '空气质量警报',
    pollutantsExceed: '污染物超过安全水平',
    aboveThresholds: '高于世卫组织阈值',
    allPollutantsSafe: '所有污染物水平均在世卫组织安全指南范围内',
    greatTimeOutdoor: '户外活动的好时机！',
    
    // Registration
    getStarted: '开始使用',
    createAccount: '创建您的账户',
    fullName: '全名',
    email: '电子邮件',
    region: '地区',
    enterRegion: '输入您的城市或地区',
    password: '密码',
    enableNotifications: '启用通知',
    receiveAlerts: '在空气质量不佳时接收警报',
    register: '注册',
    alreadyHaveAccount: '已有账户？',
    login: '登录',
    
    // Features
    realTimeAlerts: '实时警报',
    realTimeAlertsDesc: '当您所在地区的空气质量达到不健康水平时收到通知',
    locationBased: '基于位置',
    locationBasedDesc: '专门监测您所在地区和社区的空气质量',
    nasaData: 'NASA数据集成',
    nasaDataDesc: '由NASA卫星数据和地球科学研究提供支持',
    nasaChallengeProject: 'NASA挑战项目',
    nasaChallengeDesc: '该应用程序是为NASA地球科学挑战赛开发的，将实时空气污染监测与社区健康倡议联系起来。通过利用NASA的卫星数据和地球观测系统，我们提供可访问的空气质量信息，帮助社区就户外活动和健康保护做出明智决策。',
    
    // Pro Features
    upgradeToPro: '升级到专业版',
    chooseYourPlan: '选择您的专业版计划',
    unlockAdvanced: '通过综合环境分析解锁先进的城市规划工具和医疗设施推荐。',
    currentPlan: '当前计划',
    upgradeNow: '立即升级',
    selectMonthly: '选择月付',
    select3Months: '选择3个月',
    save: '节省',
    allProPlans: '所有专业版计划包括：',
    maybelater: '稍后再说',
    billedMonthly: '按月计费',
    oneTimePayment: '一次性付款',
    bestValue: '最佳优惠',
    
    // Plan Features
    basicPlan: '基础版',
    proMonthly: '专业版 - 1个月',
    pro3Months: '专业版 - 3个月',
    everythingInBasic: '基础版的所有功能',
    urbanPlanningInsights: '城市规划见解与分析',
    proDashboardHeatmaps: '专业仪表板和热力图',
    multiLocationMonitoring: '多位置监测',
    historicalDataAnalysis: '历史数据分析',
    prioritySupport: '优先客户支持',
    healthcareFacilityRec: '医疗设施推荐',
    
    // Quick Actions
    perfectExercise: '适合锻炼',
    perfectExerciseDesc: '空气质量很好！去跑步或户外锻炼吧。',
    takeWalk: '散步',
    takeWalkDesc: '在户外悠闲散步，享受新鲜空气。',
    lightExercise: '仅轻度运动',
    lightExerciseDesc: '限制剧烈的户外活动，特别是对敏感群体。',
    indoorActivities: '室内活动',
    indoorActivitiesDesc: '考虑在室内或通风良好的区域锻炼。',
    stayIndoors: '待在室内',
    stayIndoorsDesc: '空气质量较差。避免户外活动。',
    useAirPurifier: '使用空气净化器',
    useAirPurifierDesc: '关闭窗户并使用空气过滤。',
    wearMask: '佩戴N95口罩',
    wearMaskDesc: '检测到细颗粒物。如外出请使用适当口罩。',
    avoidMidday: '避开正午阳光',
    avoidMiddayDesc: '臭氧水平在下午达到峰值。上午10点至下午4点待在室内。',
    avoidBusyRoads: '避开繁忙道路',
    avoidBusyRoadsDesc: '交通污染严重。使用替代路线或公共交通。',
    stayHydrated: '保持水分',
    stayHydratedDesc: '多喝水帮助身体应对污染物。',
    freshAirTime: '新鲜空气时间',
    freshAirTimeDesc: '打开窗户，让新鲜空气在家中流通。',
    
    // Pollutant Details
    pm25Desc: '可深入肺部和血液的细颗粒物',
    pm10Desc: '来自灰尘、花粉和燃烧的粗颗粒',
    no2Desc: '来自车辆排放和工业来源的二氧化氮',
    so2Desc: '来自化石燃料燃烧的二氧化硫',
    o3Desc: '由阳光和污染物形成的地面臭氧',
    coDesc: '来自不完全燃烧的一氧化碳',
    
    healthEffect: '健康影响',
    quickAction: '快速行动',
    liveValue: '实时值',
    whoLimit: '世卫组织限值',
    
    // Settings
    language: '语言',
    selectLanguage: '选择语言',
    
    // Common
    loading: '加载中...',
    error: '错误',
    retry: '重��',
    success: '成功',
    cancel: '取消',
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations.en;
}
