import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const RomanianFlag = () => (
  <svg width="16" height="12" viewBox="0 0 30 20" className="rounded-[2px] shrink-0">
    <rect width="10" height="20" fill="#002B7F" />
    <rect x="10" width="10" height="20" fill="#FCD116" />
    <rect x="20" width="10" height="20" fill="#CE1126" />
  </svg>
);

const UKFlag = () => (
  <svg width="16" height="12" viewBox="0 0 60 30" className="rounded-[2px] shrink-0">
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

  const toggle = () => setLanguage(language === 'ro' ? 'en' : 'ro');

  return (
    <>
      {/* Mobile: single toggle button */}
      <button
        onClick={toggle}
        className="sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#badad5]/10 border border-[#badad5]/20 text-[#badad5] text-xs font-archivo font-semibold transition-all duration-300 active:scale-95 touch-manipulation"
        title={language === 'ro' ? 'Switch to English' : 'Schimbă în Română'}
      >
        {language === 'ro' ? <RomanianFlag /> : <UKFlag />}
        {language === 'ro' ? 'RO' : 'EN'}
      </button>

      {/* Desktop: dual-button pill */}
      <div className="hidden sm:flex items-center rounded-lg bg-[#badad5]/10 border border-[#badad5]/20 p-[3px] gap-[2px]">
        <button
          onClick={() => setLanguage('ro')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-archivo font-semibold transition-all duration-300 ${
            language === 'ro'
              ? 'bg-[#badad5]/20 text-[#badad5] shadow-sm'
              : 'text-[#badad5]/50 hover:text-[#badad5]/80'
          }`}
          title="Română"
        >
          <RomanianFlag />
          <span>RO</span>
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-archivo font-semibold transition-all duration-300 ${
            language === 'en'
              ? 'bg-[#badad5]/20 text-[#badad5] shadow-sm'
              : 'text-[#badad5]/50 hover:text-[#badad5]/80'
          }`}
          title="English"
        >
          <UKFlag />
          <span>EN</span>
        </button>
      </div>
    </>
  );
};

export default LanguageSwitcher;
