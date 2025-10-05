import React from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { AppContent } from './components/AppContent';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
