import { useEffect, useState } from "react";

export type CookieCategory =
  | "necessary"
  | "functional"
  | "analytics"
  | "performance"
  | "advertisement";

type CkyConsent = {
  categories?: Partial<Record<CookieCategory, boolean>>;
};

declare global {
  interface Window {
    getCkyConsent?: () => CkyConsent;
    revisitCkyConsent?: () => void;
  }
}

const hasConsent = (category: CookieCategory) => {
  try {
    return window.getCkyConsent?.().categories?.[category] === true;
  } catch {
    return false;
  }
};

/** Opens the CookieYes preference center so visitors can change or withdraw consent. */
export const openCookieSettings = () => {
  window.revisitCkyConsent?.();
};

/** Tracks whether the visitor has accepted a CookieYes category, updating live when they change it. */
export const useCookieConsent = (category: CookieCategory) => {
  const [granted, setGranted] = useState(() => hasConsent(category));

  useEffect(() => {
    const sync = () => setGranted(hasConsent(category));
    sync();
    document.addEventListener("cookieyes_banner_load", sync);
    document.addEventListener("cookieyes_consent_update", sync);
    return () => {
      document.removeEventListener("cookieyes_banner_load", sync);
      document.removeEventListener("cookieyes_consent_update", sync);
    };
  }, [category]);

  return granted;
};
