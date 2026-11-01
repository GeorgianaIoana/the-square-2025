declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/acsthesquarechessclub";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

let loading: Promise<void> | null = null;

// Load the Calendly widget only when the visitor asks to schedule, so no request
// reaches Calendly on a normal page view.
function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = WIDGET_CSS;
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("Calendly failed to load"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export function openCalendly(): void {
  loadCalendly()
    .then(() => window.Calendly?.initPopupWidget({ url: CALENDLY_URL }))
    .catch(() => window.open(CALENDLY_URL, "_blank", "noopener,noreferrer"));
}
