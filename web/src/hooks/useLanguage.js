import { useState, useEffect } from 'react';

const LANGUAGE_KEY = 'gpt4o-gallery-language';

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return saved || 'en'; // Default to English
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return { language, setLanguage, toggleLanguage };
}

