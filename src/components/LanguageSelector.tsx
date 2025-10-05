import React from 'react';
import { useLanguage } from './LanguageContext';
import { Language } from '../utils/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Globe } from 'lucide-react';

const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

interface LanguageSelectorProps {
  variant?: 'default' | 'compact';
  showLabel?: boolean;
}

export function LanguageSelector({ variant = 'default', showLabel = true }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="flex items-center gap-2">
      {showLabel && variant === 'default' && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Globe className="w-4 h-4" />
          <span>{t.language}:</span>
        </div>
      )}
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className={variant === 'compact' ? 'w-[140px]' : 'w-[180px]'}>
          <SelectValue>
            <div className="flex items-center gap-2">
              <span>{currentLanguage?.flag}</span>
              <span>{variant === 'compact' ? currentLanguage?.code.toUpperCase() : currentLanguage?.nativeName}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
                {variant === 'default' && (
                  <span className="text-xs text-gray-500">({lang.name})</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
