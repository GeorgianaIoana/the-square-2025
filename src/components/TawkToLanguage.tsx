import { useEffect, memo } from "react";
import { useLanguage } from "../contexts/LanguageContext";

declare global {
  interface Window {
    Tawk_API?: {
      setLocale?: (locale: string) => void;
      onLoad?: () => void;
    };
  }
}

function TawkToLanguage() {
  const { language } = useLanguage();

  useEffect(() => {
    const setTawkLanguage = () => {
      // Only try to set locale if Tawk.to is loaded (user gave consent)
      if (window.Tawk_API?.setLocale) {
        window.Tawk_API.setLocale(language === "ro" ? "ro" : "en");
      }
    };

    // Try to set immediately if Tawk is already loaded
    setTawkLanguage();

    // Also set when Tawk loads (after user consent)
    const originalOnLoad = window.Tawk_API?.onLoad;
    if (window.Tawk_API) {
      window.Tawk_API.onLoad = () => {
        if (originalOnLoad) originalOnLoad();
        setTawkLanguage();
      };
    }

    // Retry periodically in case Tawk loads after consent
    const retryInterval = setInterval(() => {
      if (window.Tawk_API?.setLocale) {
        setTawkLanguage();
        clearInterval(retryInterval);
      }
    }, 2000);

    // Clear after 30 seconds (user might never give consent)
    const timeout = setTimeout(() => clearInterval(retryInterval), 30000);

    return () => {
      clearInterval(retryInterval);
      clearTimeout(timeout);
    };
  }, [language]);

  return null;
}

export default memo(TawkToLanguage);
