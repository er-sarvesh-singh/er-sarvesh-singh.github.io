import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '@/data/locales/en.json';

type Translations = typeof enTranslations;
type Language = 'en' | 'hi';

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Translations;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  const [translations, setTranslations] = useState<Translations>(enTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'en') {
        setTranslations(enTranslations);
      } else {
        // Dynamically import other language files
        try {
          const module = await import(`@/data/locales/${language}.json`);
          setTranslations(module.default);
        } catch (error) {
          console.error(`Failed to load translations for ${language}`, error);
          setTranslations(enTranslations);
        }
      }
    };

    loadTranslations();
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

// Helper hook for getting nested translation objects
export const useTranslation = <T = any>(path: string): T => {
  const { translations } = useLocalization();
  const keys = path.split('.');
  let value: any = translations;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Translation path not found: ${path}`);
      return {} as T;
    }
  }

  return value as T;
};