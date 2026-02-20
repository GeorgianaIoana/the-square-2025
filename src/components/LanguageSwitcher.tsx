import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const RomanianFlag = () => (
  <svg width="20" height="14" viewBox="0 0 30 20" className="rounded-sm">
    <rect width="10" height="20" fill="#002B7F" />
    <rect x="10" width="10" height="20" fill="#FCD116" />
    <rect x="20" width="10" height="20" fill="#CE1126" />
  </svg>
);

const UKFlag = () => (
  <svg width="20" height="14" viewBox="0 0 60 30" className="rounded-sm">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#ukClip)" />
    <clipPath id="ukClip">
      <path d="M30,0 L30,15 L0,15 L0,0 Z M30,30 L30,15 L60,15 L60,30 Z" />
    </clipPath>
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

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
      {language === 'ro' ? <RomanianFlag /> : <UKFlag />}
      <span className="text-xs font-archivo font-semibold text-[#badad5] hidden sm:inline">
        {language === 'ro' ? 'RO' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
