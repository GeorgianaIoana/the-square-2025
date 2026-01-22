import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ro' ? 'en' : 'ro');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-200 bg-[#badad5]/20 border border-[#badad5]/40 hover:bg-[#badad5]/30"
      title={language === 'ro' ? 'Switch to English' : 'Schimbă în română'}
    >
      <span className="text-lg">{language === 'ro' ? '🇷🇴' : '🇬🇧'}</span>
      <span className="text-xs font-archivo font-semibold text-[#badad5] hidden sm:inline">
        {language === 'ro' ? 'RO' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
