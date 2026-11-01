import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCookieConsent } from "../hooks/useCookieConsent";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.234567890123!2d26.1147312!3d44.4394113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff0048fa6941%3A0x152bced0c3995902!2sClubul%20Sportiv%20de%20%C8%98ah%20ACS%20THE%20SQUARE!5e0!3m2!1sro!2sro!4v1234567890123!5m2!1sro!2sro";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=ACS+THE+SQUARE+Strada+Corbeni+34+Bucuresti";

const COPY = {
  ro: {
    notice:
      "Harta este furnizată de Google Maps, care poate plasa cookie-uri. Se încarcă doar dacă alegeți să o afișați.",
    show: "Afișează harta",
    open: "Deschide în Google Maps",
  },
  en: {
    notice:
      "The map is provided by Google Maps, which may set cookies. It only loads if you choose to show it.",
    show: "Show map",
    open: "Open in Google Maps",
  },
};

// Google Maps sets Google cookies, so the iframe only loads after functional
// consent in CookieYes or an explicit click on the placeholder.
const ContactMap = React.memo(function ContactMap() {
  const { language } = useLanguage();
  const hasConsent = useCookieConsent("functional");
  const [clickedToLoad, setClickedToLoad] = useState(false);
  const copy = COPY[language];

  return (
    <div className="w-full h-[260px] sm:h-[320px] lg:h-[420px] rounded-xl overflow-hidden shadow-lg font-archivo tracking-[0.1em] relative bg-[#233d36]">
      {hasConsent || clickedToLoad ? (
        <iframe
          title="Locație THE SQUARE Chess Club - Str. Corbeni 34, Sector 2, București"
          src={MAP_SRC}
          className="w-full h-full"
          style={{
            border: 0,
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-6 text-center text-[#badad5]">
          <MapPin className="w-10 h-10" aria-hidden="true" />
          <p className="text-sm max-w-sm leading-relaxed">{copy.notice}</p>
          <button
            type="button"
            onClick={() => setClickedToLoad(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] font-bold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            {copy.show}
          </button>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline text-[#badad5]/80 hover:text-white"
          >
            {copy.open}
          </a>
        </div>
      )}
    </div>
  );
});

export default ContactMap;
